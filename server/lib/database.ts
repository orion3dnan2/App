import fs from "fs";
import path from "path";

// مسار ملف قاعدة البيانات المحلية
const DB_PATH = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DB_PATH, "users.json");
const STORES_FILE = path.join(DB_PATH, "stores.json");

// التأكد من وجود مجلد البيانات
if (!fs.existsSync(DB_PATH)) {
  fs.mkdirSync(DB_PATH, { recursive: true });
}

// وظائف إدارة المستخدمين
export class UserDatabase {
  private static users: any[] = [];
  private static isLoaded = false;

  // تحميل المستخدمين من الملف
  static loadUsers() {
    if (this.isLoaded) return this.users;

    try {
      if (fs.existsSync(USERS_FILE)) {
        const data = fs.readFileSync(USERS_FILE, "utf8");
        this.users = JSON.parse(data);
      } else {
        // إنشاء بيانات أولية
        this.users = [
          {
            id: "admin-001",
            username: "admin",
            email: "admin@baytsudani.com",
            password: "$2b$10$hashed_password",
            role: "super_admin",
            profile: {
              name: "مدير التطبيق",
              language: "ar",
              avatar: "/placeholder.svg",
            },
            permissions: [{ resource: "*", actions: ["*"] }],
            createdAt: new Date().toISOString(),
            isActive: true,
          },
        ];
        this.saveUsers();
      }
      this.isLoaded = true;
    } catch (error) {
      console.error("خطأ في تحميل بيانات المستخدمين:", error);
      this.users = [];
    }

    return this.users;
  }

  // حفظ المستخدمين في الملف
  static saveUsers() {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2), "utf8");
      console.log("✅ تم حفظ بيانات المستخدمين بنجاح");
    } catch (error) {
      console.error("❌ خطأ في حفظ بيانات المستخدمين:", error);
    }
  }

  // إضافة مستخدم جديد
  static addUser(user: any) {
    this.loadUsers();
    this.users.push(user);
    this.saveUsers();
    return user;
  }

  // البحث عن مستخدم
  static findUser(condition: (user: any) => boolean) {
    this.loadUsers();
    return this.users.find(condition);
  }

  // البحث عن مستخدمين
  static findUsers(condition?: (user: any) => boolean) {
    this.loadUsers();
    return condition ? this.users.filter(condition) : this.users;
  }

  // تحديث مستخدم
  static updateUser(id: string, updates: any) {
    this.loadUsers();
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...updates };
      this.saveUsers();
      return this.users[index];
    }
    return null;
  }

  // حذف مستخدم
  static deleteUser(id: string) {
    this.loadUsers();
    const index = this.users.findIndex((u) => u.id === id);
    if (index !== -1) {
      const deletedUser = this.users.splice(index, 1)[0];
      this.saveUsers();
      return deletedUser;
    }
    return null;
  }

  // الحصول على جميع المستخدمين
  static getAllUsers() {
    return this.loadUsers();
  }
}

// وظائف إدارة المتاجر
export class StoreDatabase {
  private static stores: any[] = [];
  private static isLoaded = false;

  // تحميل المتاجر من الملف
  static loadStores() {
    if (this.isLoaded) return this.stores;

    try {
      if (fs.existsSync(STORES_FILE)) {
        const data = fs.readFileSync(STORES_FILE, "utf8");
        this.stores = JSON.parse(data);
      } else {
        this.stores = [];
        this.saveStores();
      }
      this.isLoaded = true;
    } catch (error) {
      console.error("خطأ في تحميل بيانات المتاجر:", error);
      this.stores = [];
    }

    return this.stores;
  }

  // حفظ المتاجر في الملف
  static saveStores() {
    try {
      fs.writeFileSync(
        STORES_FILE,
        JSON.stringify(this.stores, null, 2),
        "utf8",
      );
      console.log("✅ تم حفظ بيانات المتاجر بنجاح");
    } catch (error) {
      console.error("❌ خطأ في حفظ بيانات المتاجر:", error);
    }
  }

  // إضافة متجر جديد
  static addStore(store: any) {
    this.loadStores();
    this.stores.push(store);
    this.saveStores();
    return store;
  }

  // البحث عن متجر
  static findStore(condition: (store: any) => boolean) {
    this.loadStores();
    return this.stores.find(condition);
  }

  // البحث عن متاجر
  static findStores(condition?: (store: any) => boolean) {
    this.loadStores();
    return condition ? this.stores.filter(condition) : this.stores;
  }

  // تحديث متجر
  static updateStore(id: string, updates: any) {
    this.loadStores();
    const index = this.stores.findIndex((s) => s.id === id);
    if (index !== -1) {
      this.stores[index] = { ...this.stores[index], ...updates };
      this.saveStores();
      return this.stores[index];
    }
    return null;
  }

  // حذف متجر
  static deleteStore(id: string) {
    this.loadStores();
    const index = this.stores.findIndex((s) => s.id === id);
    if (index !== -1) {
      const deletedStore = this.stores.splice(index, 1)[0];
      this.saveStores();
      return deletedStore;
    }
    return null;
  }

  // الحصول على جميع المتاجر
  static getAllStores() {
    return this.loadStores();
  }
}

// دالة للنسخ الاحتياطي
export function createBackup() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const backupDir = path.join(DB_PATH, "backups");

  if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
  }

  try {
    if (fs.existsSync(USERS_FILE)) {
      fs.copyFileSync(
        USERS_FILE,
        path.join(backupDir, `users-${timestamp}.json`),
      );
    }

    if (fs.existsSync(STORES_FILE)) {
      fs.copyFileSync(
        STORES_FILE,
        path.join(backupDir, `stores-${timestamp}.json`),
      );
    }

    console.log(`✅ تم إنشاء نسخة احتياطية: ${timestamp}`);
  } catch (error) {
    console.error("❌ خطأ في إنشاء النسخة الاحتياطية:", error);
  }
}

// إنشاء نسخة احتياطية يومية
setInterval(createBackup, 24 * 60 * 60 * 1000); // كل 24 ساعة
