import { Router } from "express";
import { prisma } from "../../lib/prisma";
import { authenticateToken } from "./auth";

const router = Router();

// Get all users (للمديرين فقط)
router.get("/", authenticateToken, async (req: any, res) => {
  try {
    // التحقق من صلاحيات المدير
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const users = await prisma.user.findMany({
      include: {
        profile: true,
        permissions: true,
        stores: {
          select: {
            id: true,
            name: true,
            status: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // إزالة كلمات المرور من النتائج
    const usersWithoutPasswords = users.map(({ password, ...user }) => user);

    res.json(usersWithoutPasswords);
  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// Get single user
router.get("/:id", authenticateToken, async (req: any, res) => {
  try {
    const userId = req.params.id;

    // التحقق من الصلاحيات - المديرون أو المستخدم نفسه فقط
    if (req.user.role !== "SUPER_ADMIN" && req.user.id !== userId) {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        permissions: true,
        stores: {
          select: {
            id: true,
            name: true,
            status: true,
            category: true,
            createdAt: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "خط�� في الخادم" });
  }
});

// Update user profile
router.put("/:id", authenticateToken, async (req: any, res) => {
  try {
    const userId = req.params.id;
    const { profile, ...userData } = req.body;

    // التحقق من الصلاحيات - المديرون أو المستخدم نفسه فقط
    if (req.user.role !== "SUPER_ADMIN" && req.user.id !== userId) {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        profile: profile
          ? {
              update: profile,
            }
          : undefined,
      },
      include: {
        profile: true,
        permissions: true,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// Delete user (للمديرين فقط)
router.delete("/:id", authenticateToken, async (req: any, res) => {
  try {
    // التحقق من صلاحيات المدير
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "غير مصرح لك بالو��ول" });
    }

    const userId = req.params.id;

    // لا يمكن حذف المدير نفسه
    if (req.user.id === userId) {
      return res.status(400).json({ error: "لا يمكن حذف حسابك الخاص" });
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    res.json({ message: "تم حذف المستخدم بنجاح" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// Toggle user status (للمديرين فقط)
router.patch("/:id/toggle-status", authenticateToken, async (req: any, res) => {
  try {
    // التحقق من صلاحيات المدير
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const userId = req.params.id;

    // لا يمكن إيقاف المدير نفسه
    if (req.user.id === userId) {
      return res.status(400).json({ error: "لا يمكن تغيير حالة حسابك الخاص" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
      include: {
        profile: true,
      },
    });

    const { password, ...userWithoutPassword } = updatedUser;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Toggle user status error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// Get user statistics (للمديرين فقط)
router.get("/stats/summary", authenticateToken, async (req: any, res) => {
  try {
    // التحقق من صلاحيات المدير
    if (req.user.role !== "SUPER_ADMIN") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const [totalUsers, activeUsers, merchantsCount, customersCount] =
      await Promise.all([
        prisma.user.count(),
        prisma.user.count({ where: { isActive: true } }),
        prisma.user.count({ where: { role: "MERCHANT" } }),
        prisma.user.count({ where: { role: "CUSTOMER" } }),
      ]);

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      merchantsCount,
      customersCount,
      adminCount: totalUsers - merchantsCount - customersCount,
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export { router as userRoutes };
