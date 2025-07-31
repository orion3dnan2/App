import express from "express";
import cors from "cors";
import { UserDatabase, StoreDatabase } from "./lib/database";
import { handleDemo } from "./routes/demo";
import { authDevRoutes } from "./api/routes/auth-dev";
import { companiesRoutes } from "./api/routes/companies";
import { productsRoutes } from "./api/routes/products";
import { jobsRoutes } from "./api/routes/jobs";
import { storesRoutes } from "./api/routes/stores";
import { servicesRoutes } from "./api/routes/services";
import { userDevRoutes } from "./api/routes/users-dev";
import { mobileRoutes } from "./api/routes/mobile";
import { databaseInfoRoutes } from "./api/routes/database-info";
import {
  getSystemSettings,
  updateSystemSettings,
  getSystemHealth,
  getSystemLogs,
  testEmailConfig,
  testSMSConfig,
  backupDatabase,
  clearCache,
} from "./routes/system";
import {
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getMedia,
  uploadMedia,
  deleteMedia,
  getTranslations,
  updateTranslation,
  getMenus,
  updateMenu,
  getTemplates,
  createTemplate,
  getContentSettings,
  updateContentSettings,
} from "./routes/content";

export function createServer() {
  const app = express();

  // تهيئة قواعد البيانات
  console.log("🗄️ تهيئة قواعد البيانات...");
  UserDatabase.loadUsers();
  StoreDatabase.loadStores();
  console.log("✅ تم تحميل قواعد البيانات بنجاح");

  // تهيئة قاعدة البيانات في production فقط
  if (process.env.NODE_ENV === "production") {
    import("./lib/prisma").then(({ connectDatabase }) => {
      connectDatabase().catch((error) => {
        console.error("فشل في الاتصال بقاعدة البيانات:", error);
      });
    });
  }

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // API routes
  app.use("/api/auth", authDevRoutes);
  app.use("/api/companies", companiesRoutes);
  app.use("/api/products", productsRoutes);
  app.use("/api/jobs", jobsRoutes);
  app.use("/api/stores", storesRoutes);
  app.use("/api/services", servicesRoutes);
  app.use("/api/users", userDevRoutes);
  app.use("/api/mobile", mobileRoutes);
  app.use("/api/database", databaseInfoRoutes);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      server: "express",
      database: "postgresql",
    });
  });

  // System Settings API routes
  app.get("/api/system/settings", getSystemSettings);
  app.put("/api/system/settings", updateSystemSettings);
  app.get("/api/system/health", getSystemHealth);
  app.get("/api/system/logs", getSystemLogs);
  app.post("/api/system/test-email", testEmailConfig);
  app.post("/api/system/test-sms", testSMSConfig);
  app.post("/api/system/backup", backupDatabase);
  app.post("/api/system/clear-cache", clearCache);

  // Content Management API routes
  // Pages
  app.get("/api/content/pages", getPages);
  app.get("/api/content/pages/:id", getPage);
  app.post("/api/content/pages", createPage);
  app.put("/api/content/pages/:id", updatePage);
  app.delete("/api/content/pages/:id", deletePage);

  // Categories
  app.get("/api/content/categories", getCategories);
  app.post("/api/content/categories", createCategory);
  app.put("/api/content/categories/:id", updateCategory);
  app.delete("/api/content/categories/:id", deleteCategory);

  // Media
  app.get("/api/content/media", getMedia);
  app.post("/api/content/media", uploadMedia);
  app.delete("/api/content/media/:id", deleteMedia);

  // Translations
  app.get("/api/content/translations", getTranslations);
  app.put("/api/content/translations/:id", updateTranslation);

  // Menus
  app.get("/api/content/menus", getMenus);
  app.put("/api/content/menus/:id", updateMenu);

  // Templates
  app.get("/api/content/templates", getTemplates);
  app.post("/api/content/templates", createTemplate);

  // Content Settings
  app.get("/api/content/settings", getContentSettings);
  app.put("/api/content/settings", updateContentSettings);

  return app;
}
