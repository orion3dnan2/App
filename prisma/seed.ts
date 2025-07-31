import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 بدء إدخال البيانات التجريبية...");

  // إنشاء كلمة مرور مشفرة للمديرين
  const hashedAdminPassword = await bcrypt.hash("admin", 12);
  const hashedUserPassword = await bcrypt.hash("user123", 12);

  // إنشاء المستخدم المدير
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@baytsudani.com" },
    update: {},
    create: {
      username: "admin",
      email: "admin@baytsudani.com",
      password: hashedAdminPassword,
      role: "SUPER_ADMIN",
      isActive: true,
      profile: {
        create: {
          name: "مدير النظام",
          language: "AR",
          street: "شارع النيل",
          city: "ا��خرطوم",
          state: "الخرطوم",
          country: "السودان",
          zipCode: "11111",
        },
      },
      permissions: {
        create: [{ resource: "*", actions: ["*"] }],
      },
    },
  });

  // إنشاء مستخدم تاجر
  const merchantUser = await prisma.user.upsert({
    where: { email: "merchant@baytsudani.com" },
    update: {},
    create: {
      username: "merchant1",
      email: "merchant@baytsudani.com",
      password: hashedUserPassword,
      role: "MERCHANT",
      isActive: true,
      profile: {
        create: {
          name: "أحمد محمد التاجر",
          phone: "+249123456789",
          language: "AR",
          street: "شارع الجمهورية",
          city: "الخرطوم",
          state: "الخرطوم",
          country: "السودان",
          zipCode: "11112",
          businessName: "متجر أحمد للإلكترونيات",
          businessType: "إلكترونيات",
          description: "متجر متخصص في بيع الأجهزة الإلكترونية والهواتف الذكية",
        },
      },
      permissions: {
        create: [
          { resource: "store", actions: ["read", "write", "delete"] },
          { resource: "products", actions: ["read", "write", "delete"] },
          { resource: "orders", actions: ["read", "write"] },
        ],
      },
    },
  });

  // إنشاء عميل
  const customerUser = await prisma.user.upsert({
    where: { email: "customer@baytsudani.com" },
    update: {},
    create: {
      username: "customer1",
      email: "customer@baytsudani.com",
      password: hashedUserPassword,
      role: "CUSTOMER",
      isActive: true,
      profile: {
        create: {
          name: "فاطمة عبد الله",
          phone: "+249987654321",
          language: "AR",
          street: "شارع الستين",
          city: "الخرطوم",
          state: "الخرطوم",
          country: "السودان",
          zipCode: "11113",
        },
      },
      permissions: {
        create: [
          { resource: "profile", actions: ["read", "write"] },
          { resource: "orders", actions: ["read", "write"] },
        ],
      },
    },
  });

  // إنشاء متجر للتاجر
  const store = await prisma.store.upsert({
    where: { id: "store-1" },
    update: {},
    create: {
      id: "store-1",
      merchantId: merchantUser.id,
      name: "متجر أحمد للإلكترونيات",
      description:
        "متجر متخصص في بيع الأجهزة الإلكت��ونية والهواتف الذكية بأفضل الأسعار",
      category: "إلكترونيات",
      status: "ACTIVE",
      settings: {
        create: {
          primaryColor: "#3B82F6",
          secondaryColor: "#F59E0B",
          layout: "GRID",
          newOrders: true,
          lowStock: true,
          reviews: true,
          freeShippingThreshold: 100,
          shippingRates: {
            create: [
              {
                zone: "الخرطوم",
                rate: 5,
                estimatedDays: 1,
              },
              {
                zone: "باقي الولايات",
                rate: 15,
                estimatedDays: 3,
              },
            ],
          },
        },
      },
      analytics: {
        create: {
          totalViews: 1250,
          totalOrders: 45,
          totalRevenue: 2350,
          monthlyStats: {
            create: [
              {
                month: "2024-01",
                views: 420,
                orders: 15,
                revenue: 750,
              },
              {
                month: "2024-02",
                views: 380,
                orders: 12,
                revenue: 580,
              },
              {
                month: "2024-03",
                views: 450,
                orders: 18,
                revenue: 1020,
              },
            ],
          },
        },
      },
    },
  });

  // إنشاء منتجات
  const products = await Promise.all([
    prisma.product.upsert({
      where: { sku: "PHONE-001" },
      update: {},
      create: {
        storeId: store.id,
        name: "هاتف سامسونج جالاكسي A54",
        description: "هاتف ذكي بمواصفات عالية وكاميرا مميزة",
        price: 450,
        salePrice: 420,
        images: ["/placeholder.svg", "/placeholder.svg"],
        category: "هواتف ذكية",
        tags: ["سامسونج", "أندرويد", "كاميرا"],
        quantity: 25,
        sku: "PHONE-001",
        lowStockThreshold: 5,
        specifications: {
          الشاشة: "6.4 بوصة",
          الذاكرة: "128 جيجا",
          الرام: "6 جيجا",
          الكاميرا: "50 ميجا بكسل",
        },
        status: "ACTIVE",
      },
    }),
    prisma.product.upsert({
      where: { sku: "LAPTOP-001" },
      update: {},
      create: {
        storeId: store.id,
        name: "لابتوب لينوفو ThinkPad",
        description: "لابتوب للأعمال بأداء قوي وتصميم أنيق",
        price: 850,
        images: ["/placeholder.svg"],
        category: "أجهزة حاسوب",
        tags: ["لينوفو", "لابتوب", "أعمال"],
        quantity: 12,
        sku: "LAPTOP-001",
        lowStockThreshold: 3,
        specifications: {
          المعالج: "Intel i5",
          الذاكرة: "512 جيجا SSD",
          الرام: "16 جيجا",
          الشاشة: "14 بوصة",
        },
        status: "ACTIVE",
      },
    }),
  ]);

  // إنشاء طلب تجريبي
  const order = await prisma.order.create({
    data: {
      customerId: customerUser.id,
      storeId: store.id,
      subtotal: 420,
      shipping: 5,
      tax: 42,
      total: 467,
      status: "CONFIRMED",
      shippingStreet: "شارع الستين",
      shippingCity: "الخرطوم",
      shippingState: "الخرطوم",
      shippingCountry: "السودان",
      shippingZip: "11113",
      billingStreet: "شارع الستين",
      billingCity: "الخرطوم",
      billingState: "الخرطوم",
      billingCountry: "السودان",
      billingZip: "11113",
      paymentMethod: "نقد عند التسليم",
      notes: "يرجى التسليم في المساء",
      items: {
        create: {
          productId: products[0].id,
          productName: products[0].name,
          productImage: "/placeholder.svg",
          quantity: 1,
          price: 420,
          total: 420,
        },
      },
    },
  });

  // إنشاء فئات
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: "electronics" },
      update: {},
      create: {
        name: "إلكترونيات",
        slug: "electronics",
        description: "جميع الأجهزة الإلكترونية والتقنية",
        color: "#3B82F6",
        icon: "smartphone",
        count: 2,
      },
    }),
    prisma.category.upsert({
      where: { slug: "phones" },
      update: {},
      create: {
        name: "هواتف ذكية",
        slug: "phones",
        description: "هواتف ذكية بأحدث التقنيات",
        color: "#10B981",
        icon: "phone",
        count: 1,
      },
    }),
  ]);

  // إنشاء صفحات المحتوى
  const pages = await Promise.all([
    prisma.contentPage.upsert({
      where: { slug: "about-us" },
      update: {},
      create: {
        title: "من نحن",
        slug: "about-us",
        content:
          "<h1>مرحباً بكم في بيت السوداني</h1><p>منصة التجارة الإلكترونية الرائدة في السودان</p>",
        excerpt: "تعرف على قصتنا ورؤيتنا",
        status: "PUBLISHED",
        type: "PAGE",
        language: "AR",
        metaTitle: "من نحن - بيت السوداني",
        metaDescription:
          "تعرف على بيت السوداني، منصة التجارة الإلكترونية الرائدة في السودان",
        keywords: ["بيت السوداني", "التجارة الإلكترونية", "السودان"],
        authorId: adminUser.id,
        publishedAt: new Date(),
        tags: ["عن الشركة", "رؤية"],
      },
    }),
    prisma.contentPage.upsert({
      where: { slug: "privacy-policy" },
      update: {},
      create: {
        title: "سياسة الخصوصية",
        slug: "privacy-policy",
        content:
          "<h1>سياسة الخصوصية</h1><p>نحن نحترم خصوصيتك ونحمي بياناتك الشخصية</p>",
        excerpt: "كيف نتعامل مع بياناتك الشخصية",
        status: "PUBLISHED",
        type: "PAGE",
        language: "AR",
        metaTitle: "سياسة الخصوصية - بيت السوداني",
        metaDescription: "تعرف على كيفية حماية بياناتك في بيت السوداني",
        keywords: ["سياسة الخصوصية", "حماية البيانات"],
        authorId: adminUser.id,
        publishedAt: new Date(),
        tags: ["سياسة", "خصوصية"],
      },
    }),
  ]);

  // إنشاء إعدادات التطبيق
  const appSettings = await prisma.appSettings.upsert({
    where: { id: "main-settings" },
    update: {},
    create: {
      id: "main-settings",
      appName: "بيت السوداني",
      tagline: "منصة التجارة الإلكترونية الرائدة في السودان",
      defaultLanguage: "AR",
      supportedLanguages: ["ar", "en"],
      rtlSupport: true,
      enableMarketplace: true,
      enableProducts: true,
      enableCompanies: true,
      enableJobs: true,
      enableServices: true,
      enableAds: true,
      enableReviews: true,
      enableChat: true,
      visibleSections: ["marketplace", "products", "companies", "jobs"],
      customOrder: ["home", "marketplace", "products", "companies", "jobs"],
    },
  });

  // إنشاء إعدادات النظام
  const systemSettings = await prisma.systemSettings.upsert({
    where: { id: "main-system" },
    update: {},
    create: {
      id: "main-system",
      jwtSecret: process.env.JWT_SECRET || "default-jwt-secret",
      enableTwoFactor: false,
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      enableEmailVerification: false,
      rateLimitEnabled: true,
      requestsPerMinute: 100,
      corsEnabled: true,
      allowedOrigins: ["http://localhost:8080"],
      allowCredentials: true,
      maxConnections: 100,
      queryTimeout: 30000,
      enableSlowQueryLog: true,
      logLevel: "info",
      enableFileLogging: true,
      enableDatabaseLogging: true,
      maxLogFileSize: 10485760,
      logRetentionDays: 30,
    },
  });

  // إنشاء ترجمات
  const translations = await Promise.all([
    prisma.translation.upsert({
      where: { key_language: { key: "welcome", language: "AR" } },
      update: {},
      create: {
        key: "welcome",
        language: "AR",
        value: "أهلاً وسهلاً",
        category: "common",
      },
    }),
    prisma.translation.upsert({
      where: { key_language: { key: "welcome", language: "EN" } },
      update: {},
      create: {
        key: "welcome",
        language: "EN",
        value: "Welcome",
        category: "common",
      },
    }),
  ]);

  // إنشاء قوائم التنقل
  const menu = await prisma.menu.upsert({
    where: { id: "main-menu" },
    update: {},
    create: {
      id: "main-menu",
      name: "القائمة الرئيسية",
      location: "HEADER",
      language: "AR",
      isActive: true,
      items: {
        create: [
          {
            label: "الرئيسية",
            url: "/",
            type: "CUSTOM",
            order: 1,
          },
          {
            label: "المتاجر",
            url: "/marketplace",
            type: "CUSTOM",
            order: 2,
          },
          {
            label: "المنتجات",
            url: "/products",
            type: "CUSTOM",
            order: 3,
          },
          {
            label: "الشركات",
            url: "/companies",
            type: "CUSTOM",
            order: 4,
          },
          {
            label: "الوظائف",
            url: "/jobs",
            type: "CUSTOM",
            order: 5,
          },
        ],
      },
    },
  });

  console.log("✅ تم إدخال البيانات التجريبية بنجاح!");
  console.log(`👤 المدير: ${adminUser.email} (كلمة المرور: admin)`);
  console.log(`🏪 التاجر: ${merchantUser.email} (كلمة المرور: user123)`);
  console.log(`🛒 العميل: ${customerUser.email} (كلمة المرور: user123)`);
  console.log(`🏬 المتجر: ${store.name}`);
  console.log(`📦 المنتجات: ${products.length}`);
  console.log(`🛍️ الطلبات: 1`);
}

main()
  .catch((e) => {
    console.error("❌ خطأ في إدخال البيانات:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
