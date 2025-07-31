import { Router } from "express";
import { UserDatabase, StoreDatabase } from "../../lib/database";
import { authenticateToken } from "./auth-dev";
import fs from "fs";
import path from "path";

const router = Router();

// Get database info (للمديرين فقط)
router.get("/info", authenticateToken, async (req: any, res) => {
  try {
    // التحقق من صلاحيات المدير
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const users = UserDatabase.getAllUsers();
    const stores = StoreDatabase.getAllStores();

    // معلومات الملفات
    const dataPath = path.join(process.cwd(), "data");
    const usersFile = path.join(dataPath, "users.json");
    const storesFile = path.join(dataPath, "stores.json");

    let usersFileSize = 0;
    let storesFileSize = 0;
    let usersLastModified = null;
    let storesLastModified = null;

    try {
      if (fs.existsSync(usersFile)) {
        const usersStat = fs.statSync(usersFile);
        usersFileSize = usersStat.size;
        usersLastModified = usersStat.mtime;
      }
    } catch (error) {
      console.warn("لا يمكن قراءة معلومات ملف المستخدمين");
    }

    try {
      if (fs.existsSync(storesFile)) {
        const storesStat = fs.statSync(storesFile);
        storesFileSize = storesStat.size;
        storesLastModified = storesStat.mtime;
      }
    } catch (error) {
      console.warn("لا يمكن قراءة معلومات ملف المتاجر");
    }

    // إحصائيات المستخدمين
    const userStats = {
      total: users.length,
      active: users.filter((u) => u.isActive).length,
      merchants: users.filter((u) => u.role === "merchant").length,
      customers: users.filter((u) => u.role === "customer").length,
      admins: users.filter((u) => u.role === "super_admin").length,
      recentRegistrations: users.filter((u) => {
        const registrationDate = new Date(u.createdAt);
        const daysSince =
          (Date.now() - registrationDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysSince <= 7;
      }).length,
    };

    // إحصائيات المتاجر
    const storeStats = {
      total: stores.length,
      active: stores.filter((s) => s.status === "active").length,
      pending: stores.filter((s) => s.status === "pending").length,
      suspended: stores.filter((s) => s.status === "suspended").length,
      inactive: stores.filter((s) => s.status === "inactive").length,
      recentStores: stores.filter((s) => {
        const creationDate = new Date(s.createdAt);
        const daysSince =
          (Date.now() - creationDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysSince <= 7;
      }).length,
    };

    // معلومات النسخ الاحتياطية
    const backupPath = path.join(dataPath, "backups");
    let backupCount = 0;
    let lastBackup = null;

    try {
      if (fs.existsSync(backupPath)) {
        const backupFiles = fs.readdirSync(backupPath);
        backupCount = backupFiles.length;

        if (backupFiles.length > 0) {
          const latestBackup = backupFiles
            .map((file) => ({
              name: file,
              time: fs.statSync(path.join(backupPath, file)).mtime,
            }))
            .sort((a, b) => b.time.getTime() - a.time.getTime())[0];
          lastBackup = latestBackup.time;
        }
      }
    } catch (error) {
      console.warn("لا يمكن قراءة معلومات النسخ الاحتياطية");
    }

    const databaseInfo = {
      users: {
        stats: userStats,
        fileSize: `${(usersFileSize / 1024).toFixed(2)} KB`,
        lastModified: usersLastModified,
        exists: fs.existsSync(usersFile),
      },
      stores: {
        stats: storeStats,
        fileSize: `${(storesFileSize / 1024).toFixed(2)} KB`,
        lastModified: storesLastModified,
        exists: fs.existsSync(storesFile),
      },
      backups: {
        count: backupCount,
        lastBackup: lastBackup,
        path: backupPath,
      },
      system: {
        dataPath: dataPath,
        serverStartTime: new Date().toISOString(),
        nodeVersion: process.version,
        platform: process.platform,
      },
    };

    res.json(databaseInfo);
  } catch (error) {
    console.error("Get database info error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// Create manual backup (للمديرين فقط)
router.post("/backup", authenticateToken, async (req: any, res) => {
  try {
    if (req.user.role !== "super_admin") {
      return res.status(403).json({ error: "غير مصرح لك بالوصول" });
    }

    const { createBackup } = await import("../../lib/database");
    createBackup();

    res.json({
      message: "تم إنشاء النسخة الاحتياطية بنجاح",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Create backup error:", error);
    res.status(500).json({ error: "خطأ في إنشاء النسخة الاحتياطية" });
  }
});

export { router as databaseInfoRoutes };
