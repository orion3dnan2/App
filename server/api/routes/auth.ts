import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma";

const router = Router();

// JWT secret - في الإنتاج يجب أن يكون في متغيرات البيئة
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Middleware للتحقق من صحة الرمز المميز
export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const { username, password, platform = "web" } = req.body;

    // البحث عن المستخدم في قاعدة البيانات
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
      include: {
        profile: true,
        permissions: true,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة" });
    }

    // التحقق من حالة المستخدم
    if (!user.isActive) {
      return res
        .status(401)
        .json({ error: "تم إيقاف الحساب، تواصل مع الإدارة" });
    }

    // التحقق من كلمة المرور
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ error: "اسم المستخدم أو كلمة المرور غير صحيحة" });
    }

    // تحديث آخر تسجيل دخول
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // إنشاء رمز الوصول
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        role: user.role,
        platform,
      },
      JWT_SECRET,
      { expiresIn: platform === "mobile" ? "30d" : "7d" },
    );

    // إرجاع بيانات المستخدم والرمز
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      user: userWithoutPassword,
      token,
      platform,
      expiresIn: platform === "mobile" ? "30d" : "7d",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      username,
      email,
      phone,
      password,
      accountType = "customer",
      platform = "web",
      country,
      city,
      businessName,
      businessType,
    } = req.body;

    // التحقق من البيانات
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({ error: "جميع الحقول مطلوبة" });
    }

    // التحقق من وجود المستخدم
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: username }],
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "المستخدم موجود بالفعل" });
    }

    // التحقق من حقول التاجر إذا كان نوع الحساب تاجر
    if (accountType === "merchant") {
      if (!businessName || !businessType) {
        return res.status(400).json({ error: "بيانات العمل التجاري مطلوبة" });
      }
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 12);

    // إنشاء مستخدم جديد في قاعدة البيانات
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email,
        password: hashedPassword,
        role: accountType === "merchant" ? "MERCHANT" : "CUSTOMER",
        profile: {
          create: {
            name: fullName,
            phone,
            language: "AR",
            street: "",
            city: city || "",
            state: "",
            country: country || "SD",
            zipCode: "",
            businessName: accountType === "merchant" ? businessName : undefined,
            businessType: accountType === "merchant" ? businessType : undefined,
          },
        },
        permissions: {
          create:
            accountType === "merchant"
              ? [
                  { resource: "store", actions: ["read", "write", "delete"] },
                  {
                    resource: "products",
                    actions: ["read", "write", "delete"],
                  },
                ]
              : [{ resource: "profile", actions: ["read", "write"] }],
        },
      },
      include: {
        profile: true,
        permissions: true,
      },
    });

    // إنشاء رمز الوصول
    const token = jwt.sign(
      {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
        platform,
      },
      JWT_SECRET,
      { expiresIn: platform === "mobile" ? "30d" : "7d" },
    );

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({
      user: userWithoutPassword,
      token,
      platform,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// تحديث الرمز المميز
router.post("/refresh", authenticateToken, (req: any, res) => {
  const { user } = req;
  const platform = req.headers["x-platform"] || "web";

  const newToken = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      platform,
    },
    JWT_SECRET,
    { expiresIn: platform === "mobile" ? "30d" : "7d" },
  );

  res.json({ token: newToken });
});

// الحصول على بيانات المستخدم الحالي
router.get("/me", authenticateToken, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        profile: true,
        permissions: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// تسجيل الخروج
router.post("/logout", authenticateToken, (req: any, res) => {
  // في التطبيق الحقيقي، يمكن إضافة الرمز إلى قائمة سوداء
  res.json({ message: "تم تسجيل الخروج بنجاح" });
});

export { router as authRoutes };
