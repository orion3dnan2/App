import React, { createContext, useContext, useEffect, useState } from "react";

// Types for theme and language
export type Theme = "light" | "dark";
export type Language = "ar" | "en";
export type FontFamily = "cairo" | "tajawal" | "noto-kufi" | "amiri";

interface ThemeContextType {
  theme: Theme;
  language: Language;
  fontFamily: FontFamily;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  setFontFamily: (font: FontFamily) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Translation dictionary
const translations = {
  ar: {
    // Navigation
    "nav.home": "الرئيسية",
    "nav.marketplace": "السوق",
    "nav.products": "المنتجات",
    "nav.companies": "الشركات",
    "nav.jobs": "الوظائف",
    "nav.services": "الخدمات",
    "nav.ads": "الإعلانات",

    // Common
    "common.search": "ابحث في البيت السوداني...",
    "common.login": "تسجيل الدخول",
    "common.logout": "تسجيل الخروج",
    "common.register": "تسجيل",
    "common.welcome": "مرحباً بكم في البيت السوداني",
    "common.users_count": "+100 ألف سوداني في البيت",
    "common.notifications": "الإشعارات",
    "common.messages": "الرسائل",
    "common.back": "العودة",
    "common.close": "إغلاق",
    "common.cancel": "إلغاء",
    "common.confirm": "تأكيد",
    "common.save": "حفظ",
    "common.edit": "تعديل",
    "common.delete": "حذف",
    "common.view": "عرض",
    "common.details": "التفاصيل",
    "common.more": "المزيد",
    "common.loading": "جاري التحميل...",
    "common.success": "تم بنجاح",
    "common.error": "حدث خطأ",

    // Branding
    "brand.name": "البيت السوداني",
    "brand.tagline": "سوق وخدمات السودان",
    "brand.description":
      "منصة شاملة للخدمات والتجارة السودانية في الخليج والعالم",

    // Homepage
    "home.hero.title": "البيت السوداني",
    "home.hero.subtitle": "سوق وخدمات وشركات السودان في الخليج والعالم",
    "home.hero.explore_market": "استكشف السوق",
    "home.hero.join_us": "انضم إلينا",
    "home.services.title": "خدماتنا",
    "home.services.subtitle":
      "مجموعة شاملة من الخدمات المصممة خصيصاً للمجتمع السوداني في الخليج والعالم",
    "home.services.marketplace": "السوق التجاري",
    "home.services.marketplace_desc":
      "اكتشف منتجات سودانية أصيلة من تجار موثوقين",
    "home.services.companies": "دليل الشركات",
    "home.services.companies_desc":
      "تواصل مع الشركات والمؤسسات السودانية في الخليج",
    "home.services.jobs": "لوحة الوظائف",
    "home.services.jobs_desc": "ابحث عن فرص عمل مناسبة أو أعلن عن وظائف شاغرة",
    "home.services.professional": "الخدمات ا��مهنية",
    "home.services.professional_desc":
      "احصل على خدمات مهنية متخصصة من خبراء سودانيين",
    "home.services.ads": "الإعلانات",
    "home.services.ads_desc": "روج لأعمالك وخدماتك للمجتمع السوداني",
    "home.services.discover": "اكتشف المزيد",
    "home.testimonials.title": "آراء عملائنا",
    "home.testimonials.subtitle": "ماذا يقول عملاؤنا عن تجربتهم معنا",
    "home.cta.title": "ابدأ رحلتك معنا اليوم",
    "home.cta.subtitle":
      "انضم إلى آلاف السودانيين الذين يستخدمون البيت السوداني لتنمية أعمالهم وخدماتهم",
    "home.cta.create_account": "إنشاء حساب مجاني",
    "home.stats.users": "مستخدم نشط",
    "home.stats.companies": "شركة مسجلة",
    "home.stats.products": "منتج متوفر",
    "home.stats.jobs": "فرصة عمل",

    // Footer
    "footer.services": "الخدمات",
    "footer.business": "الأعمال",
    "footer.contact": "تواصل معنا",
    "footer.email": "البريد الإلكتروني",
    "footer.phone": "الهاتف",
    "footer.rights": "جميع الحقوق محفوظة",

    // Theme Settings
    "theme.light": "الوضع النهاري",
    "theme.dark": "الوضع الليلي",
    "theme.toggle": "تبديل الثيم",
    "language.toggle": "تبديل اللغة",

    // Dashboard
    "dashboard.admin": "لوحة إدارة التطبيق",
    "dashboard.merchant": "لوحة إدارة المتجر",
    "dashboard.welcome": "مرحباً",
    "dashboard.overview": "نظرة عامة",
    "dashboard.analytics": "الإحصائيات",
    "dashboard.settings": "الإعدادات",
    "dashboard.quick_actions": "الإجراءات السريعة",
    "dashboard.recent_activity": "النشاط الأخير",
    "dashboard.quick_stats": "إحصائيات سريعة",
    "dashboard.view_all_activities": "عرض جميع الأنشطة",
    "dashboard.view_detailed_reports": "عرض التقارير التفصيلية",
    "dashboard.total_users": "إجمالي المستخدمين",
    "dashboard.registered_stores": "المتاجر المسجلة",
    "dashboard.total_products": "إجمالي المنتجات",
    "dashboard.monthly_revenue": "إيرادات الشهر",
    "dashboard.active_stores": "المتاجر النشطة",
    "dashboard.pending_approvals": "طلبات الاعتماد",
    "dashboard.new_registrations": "تسجيلات جديدة",
    "dashboard.total_orders": "إجمالي الطلبات",
    "dashboard.app_settings": "إعدادات التطبيق",
    "dashboard.app_settings_desc": "تخصيص المظهر والألوان والخطوط",
    "dashboard.user_management": "إدارة المستخدمين",
    "dashboard.user_management_desc": "عرض وإدارة حسابات المستخدمين",
    "dashboard.store_management": "إدارة المتاجر",
    "dashboard.store_management_desc": "مراجعة وإدارة المتاجر المسجلة",
    "dashboard.appearance": "تخصيص المظهر",
    "dashboard.appearance_desc": "تغيير الألوان والصور والخلفيات",
    "dashboard.system_settings": "إعدادات النظام",
    "dashboard.system_settings_desc": "صلاحيات وإعدادات الأمان",
    "dashboard.content_management": "إدارة المحتوى",
    "dashboard.content_management_desc": "النصوص والصور والترجمات",
    "dashboard.view_site": "عرض الموقع",
    "dashboard.super_admin": "مدير أعلى",
    "dashboard.urgent": "عاجل",

    // Store Management
    "stores.title": "إدارة المتاجر",
    "stores.subtitle": "متجر مسجل",
    "stores.total_stores": "إجمالي المتاجر",
    "stores.active_stores": "مت��جر نشطة",
    "stores.pending_stores": "في الانتظار",
    "stores.suspended_stores": "معلقة",
    "stores.search_placeholder": "البحث في المتاجر...",
    "stores.all_statuses": "جميع الحالات",
    "stores.status_active": "نشط",
    "stores.status_pending": "في الانتظار",
    "stores.status_suspended": "معلق",
    "stores.category": "الفئة",
    "stores.join_date": "تاريخ الانضمام",
    "stores.last_active": "آخر نشاط",
    "stores.rating": "التقييم",
    "stores.products": "منتج",
    "stores.orders": "طلب",
    "stores.revenue": "إيراد",
    "stores.view_details": "عرض التفاصيل",
    "stores.approve_store": "اعتماد المتجر",
    "stores.suspend_store": "تعليق المتجر",
    "stores.reactivate_store": "إعادة تفعيل",
    "stores.no_stores_found": "لا توجد متاجر",
    "stores.no_stores_match": "لم يتم العثور على متاجر تطابق معايير البحث",
    "stores.filter_results": "من",
    "stores.store_details": "تفاصيل المتجر",
    "stores.store_details_desc": "معلومات شاملة عن المتجر ونشاطه",
    "stores.basic_info": "المعلومات الأساسية",
    "stores.performance_stats": "إحصائيات الأداء",
    "stores.store_name": "اسم المتجر",
    "stores.owner": "المالك",
    "stores.email": "البريد الإلكتروني",
    "stores.phone": "رقم الهاتف",
    "stores.location": "الموقع",
    "stores.status": "الحالة",
    "stores.total_products": "إجمالي المنتجات",
    "stores.total_orders": "إجمالي الطلبات",
    "stores.revenues": "الإيرادات",
    "stores.confirm_action": "تأكيد الإجراء",
    "stores.confirm_approve": "هل أنت متأكد من اعتماد هذ�� المتجر؟",
    "stores.confirm_suspend": "هل أنت متأكد من تعليق هذا المتجر؟",
    "stores.confirm_reactivate": "هل أنت متأكد من إعادة تفعيل هذا المتجر؟",
    "stores.action_approve": "اعتماد",
    "stores.action_suspend": "تعليق",
    "stores.action_reactivate": "إعادة تفعيل",
    "stores.success_approve": "تم اعتماد المتجر بنجاح! ✅",
    "stores.success_suspend": "تم تعليق المتجر بنجاح! ⚠️",
    "stores.success_reactivate": "تم إعادة تفعيل المتجر بنجاح! ✅",
    "stores.reviews_count": "تقييم",

    // Error messages
    "error.404": "الصفحة غير موجودة",
    "error.unauthorized": "غير مسموح بالوصول",
    "error.general": "حدث خطأ غير متوقع",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.marketplace": "Marketplace",
    "nav.products": "Products",
    "nav.companies": "Companies",
    "nav.jobs": "Jobs",
    "nav.services": "Services",
    "nav.ads": "Advertisements",

    // Common
    "common.search": "Search in Sudan House...",
    "common.login": "Login",
    "common.logout": "Logout",
    "common.register": "Register",
    "common.welcome": "Welcome to Sudan House",
    "common.users_count": "+100K Sudanese in the House",
    "common.notifications": "Notifications",
    "common.messages": "Messages",
    "common.back": "Back",
    "common.close": "Close",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.details": "Details",
    "common.more": "More",
    "common.loading": "Loading...",
    "common.success": "Success",
    "common.error": "Error",

    // Branding
    "brand.name": "Sudan House",
    "brand.tagline": "Sudan Market & Services",
    "brand.description":
      "Comprehensive platform for Sudanese services and commerce in the Gulf and worldwide",

    // Homepage
    "home.hero.title": "Sudan House",
    "home.hero.subtitle":
      "Sudan market, services and companies in the Gulf and worldwide",
    "home.hero.explore_market": "Explore Market",
    "home.hero.join_us": "Join Us",
    "home.services.title": "Our Services",
    "home.services.subtitle":
      "Comprehensive services designed specifically for the Sudanese community in the Gulf and worldwide",
    "home.services.marketplace": "Commercial Market",
    "home.services.marketplace_desc":
      "Discover authentic Sudanese products from trusted merchants",
    "home.services.companies": "Company Directory",
    "home.services.companies_desc":
      "Connect with Sudanese companies and institutions in the Gulf",
    "home.services.jobs": "Job Board",
    "home.services.jobs_desc":
      "Find suitable job opportunities or post job vacancies",
    "home.services.professional": "Professional Services",
    "home.services.professional_desc":
      "Get specialized professional services from Sudanese experts",
    "home.services.ads": "Advertisements",
    "home.services.ads_desc":
      "Promote your business and services to the Sudanese community",
    "home.services.discover": "Discover More",
    "home.testimonials.title": "Customer Reviews",
    "home.testimonials.subtitle":
      "What our customers say about their experience with us",
    "home.cta.title": "Start Your Journey With Us Today",
    "home.cta.subtitle":
      "Join thousands of Sudanese who use Sudan House to grow their businesses and services",
    "home.cta.create_account": "Create Free Account",
    "home.stats.users": "Active Users",
    "home.stats.companies": "Registered Companies",
    "home.stats.products": "Available Products",
    "home.stats.jobs": "Job Opportunities",

    // Footer
    "footer.services": "Services",
    "footer.business": "Business",
    "footer.contact": "Contact Us",
    "footer.email": "Email",
    "footer.phone": "Phone",
    "footer.rights": "All Rights Reserved",

    // Theme Settings
    "theme.light": "Light Mode",
    "theme.dark": "Dark Mode",
    "theme.toggle": "Toggle Theme",
    "language.toggle": "Toggle Language",

    // Dashboard
    "dashboard.admin": "Admin Dashboard",
    "dashboard.merchant": "Merchant Dashboard",
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Overview",
    "dashboard.analytics": "Analytics",
    "dashboard.settings": "Settings",
    "dashboard.quick_actions": "Quick Actions",
    "dashboard.recent_activity": "Recent Activity",
    "dashboard.quick_stats": "Quick Stats",
    "dashboard.view_all_activities": "View All Activities",
    "dashboard.view_detailed_reports": "View Detailed Reports",
    "dashboard.total_users": "Total Users",
    "dashboard.registered_stores": "Registered Stores",
    "dashboard.total_products": "Total Products",
    "dashboard.monthly_revenue": "Monthly Revenue",
    "dashboard.active_stores": "Active Stores",
    "dashboard.pending_approvals": "Pending Approvals",
    "dashboard.new_registrations": "New Registrations",
    "dashboard.total_orders": "Total Orders",
    "dashboard.app_settings": "App Settings",
    "dashboard.app_settings_desc": "Customize appearance, colors and fonts",
    "dashboard.user_management": "User Management",
    "dashboard.user_management_desc": "View and manage user accounts",
    "dashboard.store_management": "Store Management",
    "dashboard.store_management_desc": "Review and manage registered stores",
    "dashboard.appearance": "Appearance Customization",
    "dashboard.appearance_desc": "Change colors, images and backgrounds",
    "dashboard.system_settings": "System Settings",
    "dashboard.system_settings_desc": "Permissions and security settings",
    "dashboard.content_management": "Content Management",
    "dashboard.content_management_desc": "Text, images and translations",
    "dashboard.view_site": "View Site",
    "dashboard.super_admin": "Super Admin",
    "dashboard.urgent": "Urgent",

    // Store Management
    "stores.title": "Store Management",
    "stores.subtitle": "registered stores",
    "stores.total_stores": "Total Stores",
    "stores.active_stores": "Active Stores",
    "stores.pending_stores": "Pending",
    "stores.suspended_stores": "Suspended",
    "stores.search_placeholder": "Search stores...",
    "stores.all_statuses": "All Statuses",
    "stores.status_active": "Active",
    "stores.status_pending": "Pending",
    "stores.status_suspended": "Suspended",
    "stores.category": "Category",
    "stores.join_date": "Join Date",
    "stores.last_active": "Last Active",
    "stores.rating": "Rating",
    "stores.products": "Products",
    "stores.orders": "Orders",
    "stores.revenue": "Revenue",
    "stores.view_details": "View Details",
    "stores.approve_store": "Approve Store",
    "stores.suspend_store": "Suspend Store",
    "stores.reactivate_store": "Reactivate",
    "stores.no_stores_found": "No Stores Found",
    "stores.no_stores_match": "No stores found matching search criteria",
    "stores.filter_results": "of",
    "stores.store_details": "Store Details",
    "stores.store_details_desc":
      "Comprehensive information about the store and its activity",
    "stores.basic_info": "Basic Information",
    "stores.performance_stats": "Performance Statistics",
    "stores.store_name": "Store Name",
    "stores.owner": "Owner",
    "stores.email": "Email",
    "stores.phone": "Phone",
    "stores.location": "Location",
    "stores.status": "Status",
    "stores.total_products": "Total Products",
    "stores.total_orders": "Total Orders",
    "stores.revenues": "Revenues",
    "stores.confirm_action": "Confirm Action",
    "stores.confirm_approve": "Are you sure you want to approve this store?",
    "stores.confirm_suspend": "Are you sure you want to suspend this store?",
    "stores.confirm_reactivate":
      "Are you sure you want to reactivate this store?",
    "stores.action_approve": "Approve",
    "stores.action_suspend": "Suspend",
    "stores.action_reactivate": "Reactivate",
    "stores.success_approve": "Store approved successfully! ✅",
    "stores.success_suspend": "Store suspended successfully! ⚠️",
    "stores.success_reactivate": "Store reactivated successfully! ✅",
    "stores.reviews_count": "reviews",

    // Error messages
    "error.404": "Page Not Found",
    "error.unauthorized": "Access Denied",
    "error.general": "An unexpected error occurred",
  },
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

const STORAGE_KEYS = {
  THEME: "bayt-al-sudani-theme",
  LANGUAGE: "bayt-al-sudani-language",
  FONT_FAMILY: "bayt-al-sudani-font-family",
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");
  const [language, setLanguage] = useState<Language>("ar");
  const [fontFamily, setFontFamilyState] = useState<FontFamily>("cairo");

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) as Theme;
    const savedLanguage = localStorage.getItem(
      STORAGE_KEYS.LANGUAGE,
    ) as Language;
    const savedFont = localStorage.getItem(
      STORAGE_KEYS.FONT_FAMILY,
    ) as FontFamily;

    if (savedTheme) setTheme(savedTheme);
    if (savedLanguage) setLanguage(savedLanguage);
    if (savedFont) setFontFamilyState(savedFont);
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const root = document.documentElement;

    // Remove previous theme classes
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Apply language and direction to document
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Set direction
    root.dir = language === "ar" ? "rtl" : "ltr";
    body.dir = language === "ar" ? "rtl" : "ltr";

    // Set language attribute
    root.lang = language;

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
  }, [language]);

  // Apply font family
  useEffect(() => {
    const root = document.documentElement;

    // Remove previous font classes
    root.classList.remove(
      "font-cairo",
      "font-tajawal",
      "font-noto-kufi",
      "font-amiri",
    );
    root.classList.add(`font-${fontFamily}`);

    // Store in localStorage
    localStorage.setItem(STORAGE_KEYS.FONT_FAMILY, fontFamily);
  }, [fontFamily]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "ar" ? "en" : "ar"));
  };

  const setFontFamily = (font: FontFamily) => {
    setFontFamilyState(font);
  };

  // Translation function
  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const isRTL = language === "ar";

  const contextValue: ThemeContextType = {
    theme,
    language,
    fontFamily,
    toggleTheme,
    toggleLanguage,
    setFontFamily,
    t,
    isRTL,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Provide a safe fallback during initial render
    return {
      theme: 'light' as Theme,
      language: 'ar' as Language,
      fontFamily: 'cairo' as FontFamily,
      toggleTheme: () => {},
      toggleLanguage: () => {},
      setFontFamily: () => {},
      t: (key: string) => key,
      isRTL: true
    };
  }
  return context;
}

// Font loading utilities
export const loadFonts = () => {
  const fonts = [
    {
      family: "Cairo",
      weights: ["300", "400", "500", "600", "700"],
      url: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap",
    },
    {
      family: "Tajawal",
      weights: ["300", "400", "500", "700"],
      url: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700&display=swap",
    },
    {
      family: "Noto Kufi Arabic",
      weights: ["400", "500", "600", "700"],
      url: "https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;500;600;700&display=swap",
    },
    {
      family: "Amiri",
      weights: ["400", "700"],
      url: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap",
    },
  ];

  fonts.forEach((font) => {
    const link = document.createElement("link");
    link.href = font.url;
    link.rel = "stylesheet";
    link.type = "text/css";
    document.head.appendChild(link);
  });
};
