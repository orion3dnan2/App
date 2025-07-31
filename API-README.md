# API البيت السوداني 🇸🇩

API شامل يخدم منصة البيت السوداني للويب والتطبيق الجوال، يوفر خدمات متكاملة للشركات، المنتجات، الوظائف، والخدمات السودانية.

## 📋 جدول المحتويات

- [البدء السريع](#البدء-السريع)
- [التثبيت والإعداد](#التثبيت-والإعداد)
- [المصادقة](#المصادقة)
- [المسارات المتوفرة](#المسارات-المتوفرة)
- [أمثلة الاستخدام](#أمثلة-الاستخدام)
- [ربط التطبيق الجوال](#ربط-التطبيق-الجوال)
- [معالجة الأخطاء](#معالجة-الأخطاء)
- [نشر API](#نشر-api)

## 🚀 البدء السريع

### المتطلبات الأساسية

- Node.js 18+
- npm أو yarn
- قاعدة بيانات (MongoDB أو PostgreSQL) - اختياري للمرحلة الحالية

### تشغيل سريع

```bash
# استنساخ المشروع
git clone https://github.com/your-repo/bayt-al-sudani.git
cd bayt-al-sudani

# تثبيت الحزم
npm install

# إعداد متغيرات البيئة
cp .env.example .env

# تشغيل الخادم
npm run dev:api
```

الـ API سيعمل على: `http://localhost:3001`

## ⚙️ التثبيت والإعداد

### 1. تثبيت المكتبات المطلوبة

```bash
# مكتبات الخادم الأساسية
npm install express cors dotenv

# مكتبات المصادقة والأمان
npm install jsonwebtoken bcrypt helmet

# مكتبات قاعدة البيانات (اختياري)
npm install mongoose # للـ MongoDB
# أو
npm install pg sequelize # للـ PostgreSQL

# مكتبات التطوير
npm install -D nodemon ts-node typescript @types/node @types/express
```

### 2. إعداد متغيرات البيئة

أنشئ ملف `.env` في المجلد الجذر:

```env
# إعدادات الخادم
PORT=3001
NODE_ENV=development

# إعدادات المصادقة
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
JWT_MOBILE_EXPIRES_IN=30d

# إعدادات قاعدة البيانات (اختياري)
DATABASE_URL=mongodb://localhost:27017/bayt-sudani
# أو
DATABASE_URL=postgresql://username:password@localhost:5432/bayt_sudani

# إعدادات CORS
WEB_URL=http://localhost:5173
MOBILE_SCHEME=sudanapp://

# إعدادات الملفات
UPLOAD_DIR=./uploads
MAX_FILE_SIZE=10MB

# إعدادات الإشعارات (اختياري)
FCM_SERVER_KEY=your-fcm-server-key
APPLE_PUSH_KEY=your-apple-push-key
```

### 3. بنية المشروع

```
server/
├── api/
│   ├── index.ts              # نقطة دخول الـ API
│   ├── middleware/           # Middleware مخصص
│   │   ├── auth.ts          # مصادقة JWT
│   │   ├── cors.ts          # إعدادات CORS
│   │   └── validation.ts    # التحقق من البيانات
│   └── routes/              # مسارات الـ API
│       ├── auth.ts          # مصادقة المستخدمين
│       ├── companies.ts     # إدارة الشركات
│       ├── products.ts      # إدارة المنتجات
│       ├── jobs.ts          # إدارة الوظائف
│       ├── stores.ts        # إدارة المتاجر
│       ├── services.ts      # إدارة الخدمات
│       ├── users.ts         # إدارة المستخدمين
│       ├── mobile.ts        # خدمات خاصة بالجوال
│       └── upload.ts        # رفع الملفات
├── models/                  # نماذج قاعدة البيانات
├── utils/                   # أدوات مساعدة
└── package.json
```

### 4. إعداد Scripts في package.json

```json
{
  "scripts": {
    "dev:api": "nodemon server/api/index.ts",
    "build:api": "tsc -p server/tsconfig.json",
    "start:api": "node dist/server/api/index.js",
    "test:api": "jest server/",
    "deploy:api": "npm run build:api && pm2 start dist/server/api/index.js"
  }
}
```

## 🔐 المصادقة

الـ API يستخدم JWT (JSON Web Tokens) للمصادقة.

### تسجيل الدخول

```bash
POST /api/auth/login
Content-Type: application/json
X-Platform: web # أو mobile

{
  "username": "admin",
  "password": "admin",
  "platform": "web"
}
```

**الاستجابة:**

```json
{
  "user": {
    "id": "admin-001",
    "username": "admin",
    "email": "admin@baytsudani.com",
    "role": "super_admin",
    "profile": {
      "name": "مدير التطبيق",
      "language": "ar"
    }
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "platform": "web",
  "expiresIn": "7d"
}
```

### استخدام الرمز المميز

```bash
# أضف الرمز في header لجميع الطلبات المحمية
Authorization: Bearer your-jwt-token-here
X-Platform: web # أو mobile
```

### تسجيل مستخدم جديد

```bash
POST /api/auth/register
Content-Type: application/json

{
  "fullName": "أحمد محمد",
  "email": "ahmed@example.com",
  "phone": "+966501234567",
  "password": "password123",
  "accountType": "customer", # أو "merchant"
  "platform": "web"
}
```

## 🛣️ المسارات المتوفرة

### المصادقة (`/api/auth`)

| الطريقة | المسار      | الوصف                  |
| ------- | ----------- | ---------------------- |
| `POST`  | `/login`    | تسجيل الدخول           |
| `POST`  | `/register` | تسجيل مستخدم جديد      |
| `GET`   | `/me`       | بيانات المستخدم الحالي |
| `POST`  | `/refresh`  | تحديث الرمز المميز     |
| `POST`  | `/logout`   | تسجيل الخروج           |

### الشركات (`/api/companies`)

| الطريقة  | المسار | الوصف              |
| -------- | ------ | ------------------ |
| `GET`    | `/`    | قائمة الشركات      |
| `GET`    | `/:id` | تفاصيل شركة        |
| `POST`   | `/`    | إضافة شركة جديدة\* |
| `PUT`    | `/:id` | تحديث شركة\*       |
| `DELETE` | `/:id` | حذف شركة\*         |

### المنتجات (`/api/products`)

| الطريقة  | المسار | الوصف             |
| -------- | ------ | ----------------- |
| `GET`    | `/`    | قائمة المنتجات    |
| `GET`    | `/:id` | تفاصيل منتج       |
| `POST`   | `/`    | إضافة منتج جديد\* |
| `PUT`    | `/:id` | تحديث منتج\*      |
| `DELETE` | `/:id` | حذف منتج\*        |

### الوظائف (`/api/jobs`)

| الطريقة  | المسار | الوصف               |
| -------- | ------ | ------------------- |
| `GET`    | `/`    | قائمة الوظائف       |
| `GET`    | `/:id` | تفاصيل وظيفة        |
| `POST`   | `/`    | إضافة وظيفة جديدة\* |
| `PUT`    | `/:id` | تحديث وظيفة\*       |
| `DELETE` | `/:id` | حذف وظيفة\*         |

### المتاجر (`/api/stores`)

| الطريقة | المسار | الوصف             |
| ------- | ------ | ----------------- |
| `GET`   | `/`    | قائمة المتاجر     |
| `GET`   | `/:id` | تفاصيل متجر       |
| `POST`  | `/`    | إضافة متجر جديد\* |
| `PUT`   | `/:id` | تحديث متجر\*      |

### الخدمات (`/api/services`)

| الطريقة | المسار | الوصف              |
| ------- | ------ | ------------------ |
| `GET`   | `/`    | قائمة الخدمات      |
| `GET`   | `/:id` | تفاصيل خدمة        |
| `POST`  | `/`    | إضافة خدمة جديدة\* |

### خدمات الجوال (`/api/mobile`)

| الطريقة | المسار            | الوصف           |
| ------- | ----------------- | --------------- |
| `GET`   | `/config`         | إعدادات التطبيق |
| `POST`  | `/sync`           | مزامنة البيانات |
| `POST`  | `/register-token` | تسجيل رمز FCM   |

**ملاحظة:** \* تتطلب مصادقة وصلاحيات

## 📚 أمثلة الاستخدام

### مثال شامل - JavaScript/TypeScript

```typescript
// إعداد خدمة API
class BaytSudaniAPI {
  private baseURL = "http://localhost:3001/api";
  private token: string | null = null;

  // تعيين الرمز المميز
  setToken(token: string) {
    this.token = token;
  }

  // طلب عام
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      "X-Platform": "web",
      ...options.headers,
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
  }

  // تسجيل الدخول
  async login(username: string, password: string) {
    const response = await this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password, platform: "web" }),
    });

    this.setToken(response.token);
    return response;
  }

  // الحصول على الشركات
  async getCompanies(filters?: any) {
    const params = new URLSearchParams(filters);
    return this.request(`/companies?${params}`);
  }

  // الحصول على المنتجات
  async getProducts(filters?: any) {
    const params = new URLSearchParams(filters);
    return this.request(`/products?${params}`);
  }

  // إضافة منتج جديد
  async createProduct(productData: any) {
    return this.request("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    });
  }
}

// الاستخدام
const api = new BaytSudaniAPI();

// تسجيل الدخول
await api.login("admin", "admin");

// الحصول على الشركات
const companies = await api.getCompanies({
  industry: "تقنية المعلومات",
  country: "السعودية",
});

console.log("الشركات:", companies);
```

### مثال React Hook

```typescript
// Hook للاستخدام في React
import { useState, useEffect } from 'react';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callAPI = async (apiCall: () => Promise<any>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'خطأ غير معروف');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, callAPI };
};

// استخدام الـ Hook في مكون
export const CompaniesPage = () => {
  const [companies, setCompanies] = useState([]);
  const { loading, error, callAPI } = useAPI();

  useEffect(() => {
    const loadCompanies = async () => {
      const result = await callAPI(() =>
        fetch('/api/companies').then(res => res.json())
      );
      if (result) {
        setCompanies(result);
      }
    };

    loadCompanies();
  }, []);

  if (loading) return <div>جاري التحميل...</div>;
  if (error) return <div>خطأ: {error}</div>;

  return (
    <div>
      {companies.map(company => (
        <div key={company.id}>{company.name}</div>
      ))}
    </div>
  );
};
```

### مثال cURL

```bash
# تسجيل الدخول
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -H "X-Platform: web" \
  -d '{
    "username": "admin",
    "password": "admin",
    "platform": "web"
  }'

# الحصول على الشركات (مع الرمز المميز)
curl -X GET "http://localhost:3001/api/companies?industry=تقنية المعلومات" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "X-Platform: web"

# إضافة منتج جديد
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "X-Platform: web" \
  -d '{
    "name": "منتج جديد",
    "description": "وصف المنتج",
    "price": 100,
    "storeId": "store-001",
    "category": "إلكترونيات"
  }'
```

## 📱 ربط التطبيق الجوال

### إعداد React Native

```typescript
// services/ApiService.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

export class MobileApiService {
  private static baseURL = "http://your-api-domain.com/api";

  // حفظ الرمز محلياً
  static async setToken(token: string) {
    await AsyncStorage.setItem("auth_token", token);
  }

  // استرجاع الرمز
  static async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem("auth_token");
  }

  // طلب مع المصادقة
  static async authenticatedRequest(endpoint: string, options: any = {}) {
    const token = await this.getToken();

    return fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "X-Platform": "mobile",
        Authorization: token ? `Bearer ${token}` : "",
        ...options.headers,
      },
    });
  }

  // تسجيل الدخول للجوال
  static async login(credentials: any) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Platform": "mobile",
      },
      body: JSON.stringify({
        ...credentials,
        platform: "mobile",
      }),
    });

    const data = await response.json();

    if (data.token) {
      await this.setToken(data.token);
    }

    return data;
  }
}
```

### مزامنة البيانات للجوال

```typescript
// services/SyncService.ts
export class SyncService {
  static async syncAllData() {
    try {
      // جلب جميع البيانات
      const [companies, products, jobs] = await Promise.all([
        MobileApiService.authenticatedRequest("/companies"),
        MobileApiService.authenticatedRequest("/products"),
        MobileApiService.authenticatedRequest("/jobs"),
      ]);

      // حفظ البيانات محلياً
      await AsyncStorage.setItem("companies", JSON.stringify(companies));
      await AsyncStorage.setItem("products", JSON.stringify(products));
      await AsyncStorage.setItem("jobs", JSON.stringify(jobs));
      await AsyncStorage.setItem("last_sync", new Date().toISOString());

      return true;
    } catch (error) {
      console.error("Sync failed:", error);
      return false;
    }
  }

  // تحميل البيانات المحفوظة محلياً
  static async loadCachedData() {
    const [companies, products, jobs] = await Promise.all([
      AsyncStorage.getItem("companies"),
      AsyncStorage.getItem("products"),
      AsyncStorage.getItem("jobs"),
    ]);

    return {
      companies: companies ? JSON.parse(companies) : [],
      products: products ? JSON.parse(products) : [],
      jobs: jobs ? JSON.parse(jobs) : [],
    };
  }
}
```

## ❌ معالجة الأخطاء

### أكواد الأخطاء المعيارية

| الكود | المعنى           | الوصف                     |
| ----- | ---------------- | ------------------------- |
| `200` | نجح              | تم تنفيذ الطلب بنجاح      |
| `201` | تم إنشاؤه        | تم إنشاء المورد بنجاح     |
| `400` | طلب خاطئ         | بيانات الطلب غير صحيحة    |
| `401` | غير مصرح         | مطلوب تسجيل دخول          |
| `403` | محظور            | لا توجد صلاحية كافية      |
| `404` | غير موجود        | المورد غير موجود          |
| `422` | بيانات غير صالحة | فشل في التحقق من البيانات |
| `500` | خطأ خادم         | خطأ داخلي في الخادم       |

### تنسيق الأخطاء

```json
{
  "error": "الرسالة الأساسية",
  "message": "تفاصيل إضافية عن الخطأ",
  "code": "ERROR_CODE",
  "details": {
    "field": "اسم الحقل الذي فيه خطأ",
    "value": "القيمة الخاطئة"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### معالجة الأخطاء في الكود

```typescript
// معالج أخطاء شامل
const handleAPIError = (error: any) => {
  if (error.status === 401) {
    // إعادة توجيه لصفحة تسجيل الدخول
    window.location.href = "/login";
  } else if (error.status === 403) {
    // عرض رسالة عدم الصلاحية
    alert("ليس لديك صلاحية للوصول إلى هذا المورد");
  } else if (error.status >= 500) {
    // خطأ خادم
    alert("حدث خطأ في الخادم، يرجى المحاولة لاحقاً");
  } else {
    // أخطاء أخرى
    alert(error.message || "حدث خطأ غير متوقع");
  }
};
```

## 🚀 نشر API

### نشر على Vercel

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel

# تحديد المتغيرات
vercel env add JWT_SECRET
vercel env add DATABASE_URL
```

### إعداد `vercel.json`

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/api/index.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "server/api/index.ts"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### نشر على Railway

```bash
# تثبيت Railway CLI
npm install -g @railway/cli

# تسجيل الدخول
railway login

# إنشاء مشروع جديد
railway init

# نشر
railway up
```

### نشر على Heroku

```bash
# تثبيت Heroku CLI
npm install -g heroku

# تسجيل الدخول
heroku login

# إنشاء تطبيق
heroku create bayt-sudani-api

# إضافة متغيرات البيئة
heroku config:set JWT_SECRET=your-secret
heroku config:set NODE_ENV=production

# نشر
git push heroku main
```

### نشر على خادم شخصي (VPS)

```bash
# تثبيت PM2
npm install -g pm2

# بناء المشروع
npm run build:api

# تشغيل بـ PM2
pm2 start dist/server/api/index.js --name "bayt-sudani-api"

# حفظ إعدادات PM2
pm2 save
pm2 startup
```

### إعداد Nginx (للخادم الشخصي)

```nginx
server {
    listen 80;
    server_name api.baytsudani.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 📝 اختبار API

### تثبيت أدوات الاختبار

```bash
npm install -D jest supertest @types/jest @types/supertest
```

### مثال اختبار

```typescript
// tests/auth.test.ts
import request from "supertest";
import app from "../server/api/index";

describe("Auth API", () => {
  test("تسجيل الدخول بنجاح", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "admin",
      platform: "web",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.user.username).toBe("admin");
  });

  test("فشل تسجيل الدخول - كلمة مرور خاطئة", async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "admin",
      password: "wrong-password",
      platform: "web",
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});
```

### تشغيل الاختبارات

```bash
npm test
```

## 🤝 المساهمة

1. Fork المشروع
2. إنشاء فرع للميزة الجديدة (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push للفرع (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## 📄 الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للتفاصيل.

## 📞 الدعم

للحصول على المساعدة:

- البريد الإلكتروني: api-support@baytsudani.com
- GitHub Issues: [فتح issue جديد](https://github.com/your-repo/issues)
- التوثيق: [docs.baytsudani.com](https://docs.baytsudani.com)

---

**تم إنشاؤه بـ ❤️ للمجتمع السوداني**
