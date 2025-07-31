import { Router } from "express";
import { UserDatabase } from "../../lib/database";
import { authenticateToken } from "./auth-dev";

const router = Router();

// Get all users (للمديرين فقط)
router.get("/", authenticateToken, async (req: any, res) => {
  try {
    // التحقق من صلاحيات المدير
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const users = UserDatabase.getAllUsers();

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
    if (req.user.role !== "super_admin" && req.user.id !== userId) {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const user = UserDatabase.findUser((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// Update user profile
router.put("/:id", authenticateToken, async (req: any, res) => {
  try {
    const userId = req.params.id;
    const { profile, ...userData } = req.body;

    // التحقق من الصلاحيات - المديرون أو المستخدم نفسه فقط
    if (req.user.role !== "super_admin" && req.user.id !== userId) {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const updates: any = {
      ...userData,
      updatedAt: new Date().toISOString(),
    };

    if (profile) {
      const currentUser = UserDatabase.findUser((u) => u.id === userId);
      if (currentUser) {
        updates.profile = { ...currentUser.profile, ...profile };
      }
    }

    const updatedUser = UserDatabase.updateUser(userId, updates);

    if (!updatedUser) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

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
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const userId = req.params.id;

    // لا يمكن حذف المدير نفسه
    if (req.user.id === userId) {
      return res.status(400).json({ error: "لا يمكن حذف حسابك الخاص" });
    }

    const deletedUser = UserDatabase.deleteUser(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

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
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const userId = req.params.id;

    // لا يمكن إيقاف المدير نفسه
    if (req.user.id === userId) {
      return res.status(400).json({ error: "لا يمكن تغيير حالة حسابك الخاص" });
    }

    const user = UserDatabase.findUser((u) => u.id === userId);

    if (!user) {
      return res.status(404).json({ error: "المستخدم غير موجود" });
    }

    const updatedUser = UserDatabase.updateUser(userId, {
      isActive: !user.isActive,
      updatedAt: new Date().toISOString(),
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
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const allUsers = UserDatabase.getAllUsers();

    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter((u) => u.isActive).length;
    const merchantsCount = allUsers.filter((u) => u.role === "merchant").length;
    const customersCount = allUsers.filter((u) => u.role === "customer").length;
    const adminCount = allUsers.filter((u) => u.role === "super_admin").length;

    // إحصائيات إضافية
    const recentUsers = allUsers.filter((u) => {
      const createdDate = new Date(u.createdAt);
      const daysSince =
        (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysSince <= 7;
    }).length;

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      merchantsCount,
      customersCount,
      adminCount,
      recentRegistrations: recentUsers,
      growthRate:
        totalUsers > 0 ? ((recentUsers / totalUsers) * 100).toFixed(2) : "0.00",
    });
  } catch (error) {
    console.error("Get user stats error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export { router as userDevRoutes };
