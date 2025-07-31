export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  profile: UserProfile;
  permissions: Permission[];
  createdAt: string;
  lastLogin?: string;
  isActive: boolean;
}

export type UserRole = "super_admin" | "merchant" | "customer";

export interface UserProfile {
  name: string;
  phone?: string;
  avatar?: string;
  language: "ar" | "en";
  address?: Address;
  businessInfo?: BusinessInfo;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface BusinessInfo {
  businessName: string;
  businessType: string;
  taxId?: string;
  description: string;
  logo?: string;
  coverImage?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface Permission {
  resource: string;
  actions: string[];
}

export interface Store {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  category: string;
  status: "active" | "inactive" | "pending" | "suspended";
  settings: StoreSettings;
  analytics: StoreAnalytics;
  createdAt: string;
  updatedAt: string;
}

export interface StoreSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    layout: "grid" | "list";
  };
  notifications: {
    newOrders: boolean;
    lowStock: boolean;
    reviews: boolean;
  };
  shipping: {
    freeShippingThreshold?: number;
    shippingRates: ShippingRate[];
  };
}

export interface ShippingRate {
  zone: string;
  rate: number;
  estimatedDays: number;
}

export interface StoreAnalytics {
  totalViews: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyStats: MonthlyStats[];
}

export interface MonthlyStats {
  month: string;
  views: number;
  orders: number;
  revenue: number;
}

export interface Product {
  id: string;
  storeId: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  images: string[];
  category: string;
  tags: string[];
  inventory: {
    quantity: number;
    sku: string;
    lowStockThreshold: number;
  };
  specifications?: Record<string, string>;
  status: "active" | "inactive" | "out_of_stock";
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  customerId: string;
  storeId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  total: number;
}

export interface AppSettings {
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: "modern" | "classic" | "minimal";
  };
  branding: {
    appName: string;
    logo: string;
    favicon: string;
    heroBackground: string;
    tagline: string;
  };
  features: {
    enableMarketplace: boolean;
    enableProducts: boolean;
    enableCompanies: boolean;
    enableJobs: boolean;
    enableServices: boolean;
    enableAds: boolean;
    enableReviews: boolean;
    enableChat: boolean;
  };
  navigation: {
    visibleSections: string[];
    customOrder: string[];
  };
  localization: {
    defaultLanguage: "ar" | "en";
    supportedLanguages: string[];
    rtlSupport: boolean;
  };
  policies: {
    termsOfService: string;
    privacyPolicy: string;
    refundPolicy: string;
  };
}

export interface SystemSettings {
  security: {
    enableTwoFactor: boolean;
    sessionTimeout: number;
    maxLoginAttempts: number;
    passwordMinLength: number;
    passwordRequireSpecialChars: boolean;
    enableEmailVerification: boolean;
    enableSMSVerification: boolean;
  };
  api: {
    rateLimit: {
      enabled: boolean;
      requestsPerMinute: number;
      burstLimit: number;
    };
    cors: {
      enabled: boolean;
      allowedOrigins: string[];
      allowCredentials: boolean;
    };
    authentication: {
      jwtSecret: string;
      jwtExpiresIn: string;
      refreshTokenExpiresIn: string;
    };
    webhooks: {
      enabled: boolean;
      endpoints: WebhookEndpoint[];
    };
  };
  database: {
    backupFrequency: "daily" | "weekly" | "monthly";
    maxConnections: number;
    queryTimeout: number;
    enableSlowQueryLog: boolean;
  };
  notifications: {
    email: {
      enabled: boolean;
      smtpHost: string;
      smtpPort: number;
      smtpUser: string;
      smtpPassword: string;
      fromEmail: string;
      fromName: string;
    };
    sms: {
      enabled: boolean;
      provider: "twilio" | "nexmo" | "custom";
      apiKey: string;
      apiSecret: string;
      fromNumber: string;
    };
    push: {
      enabled: boolean;
      fcmServerKey: string;
      apnsCertificate: string;
    };
  };
  integrations: {
    payment: {
      enabled: boolean;
      providers: PaymentProvider[];
    };
    analytics: {
      googleAnalytics: {
        enabled: boolean;
        trackingId: string;
      };
      facebookPixel: {
        enabled: boolean;
        pixelId: string;
      };
    };
    social: {
      facebook: {
        enabled: boolean;
        appId: string;
        appSecret: string;
      };
      google: {
        enabled: boolean;
        clientId: string;
        clientSecret: string;
      };
      twitter: {
        enabled: boolean;
        apiKey: string;
        apiSecret: string;
      };
    };
  };
  maintenance: {
    enabled: boolean;
    message: string;
    allowedIPs: string[];
    scheduledDowntime?: {
      startTime: string;
      endTime: string;
      reason: string;
    };
  };
  logging: {
    level: "error" | "warn" | "info" | "debug";
    enableFileLogging: boolean;
    enableDatabaseLogging: boolean;
    maxLogFileSize: number;
    logRetentionDays: number;
  };
}

export interface WebhookEndpoint {
  id: string;
  name: string;
  url: string;
  events: string[];
  enabled: boolean;
  secret: string;
  headers?: Record<string, string>;
}

export interface PaymentProvider {
  id: string;
  name: string;
  enabled: boolean;
  testMode: boolean;
  credentials: Record<string, string>;
  supportedCurrencies: string[];
}

export interface SystemHealth {
  status: "healthy" | "warning" | "critical";
  services: {
    database: ServiceStatus;
    redis: ServiceStatus;
    email: ServiceStatus;
    storage: ServiceStatus;
    api: ServiceStatus;
  };
  metrics: {
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
    activeConnections: number;
    responseTime: number;
  };
  lastChecked: string;
}

export interface ServiceStatus {
  status: "online" | "offline" | "degraded";
  responseTime?: number;
  lastChecked: string;
  error?: string;
}

export interface SystemLog {
  id: string;
  level: "error" | "warn" | "info" | "debug";
  message: string;
  metadata?: Record<string, any>;
  userId?: string;
  ipAddress?: string;
  userAgent?: string;
  timestamp: string;
}

// Content Management Types
export interface ContentPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  status: "published" | "draft" | "private";
  type: "page" | "post" | "news";
  language: "ar" | "en";
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  author: {
    id: string;
    name: string;
  };
  categories: Category[];
  tags: string[];
  featuredImage?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  color?: string;
  icon?: string;
  count: number;
}

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  alt?: string;
  caption?: string;
  description?: string;
  uploadedBy: {
    id: string;
    name: string;
  };
  createdAt: string;
}

export interface Translation {
  id: string;
  key: string;
  language: "ar" | "en";
  value: string;
  category: string;
  context?: string;
  isPlural?: boolean;
  pluralForms?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface Menu {
  id: string;
  name: string;
  location: "header" | "footer" | "sidebar" | "custom";
  items: MenuItem[];
  language: "ar" | "en";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  type: "page" | "category" | "custom" | "external";
  target: "_self" | "_blank";
  icon?: string;
  order: number;
  parentId?: string;
  children?: MenuItem[];
}

export interface ContentTemplate {
  id: string;
  name: string;
  description?: string;
  type: "page" | "post" | "email";
  content: string;
  variables: TemplateVariable[];
  preview?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  key: string;
  label: string;
  type: "text" | "image" | "date" | "number" | "boolean";
  required: boolean;
  defaultValue?: any;
}

export interface ContentSettings {
  general: {
    siteName: string;
    tagline: string;
    description: string;
    logo: string;
    favicon: string;
    language: "ar" | "en";
    timezone: string;
  };
  seo: {
    defaultMetaTitle: string;
    defaultMetaDescription: string;
    defaultKeywords: string[];
    googleAnalyticsId?: string;
    googleSearchConsoleId?: string;
    facebookPixelId?: string;
  };
  social: {
    facebookUrl?: string;
    twitterUrl?: string;
    instagramUrl?: string;
    linkedinUrl?: string;
    youtubeUrl?: string;
  };
  comments: {
    enabled: boolean;
    requireApproval: boolean;
    allowGuests: boolean;
    notifyOnNewComment: boolean;
  };
  editor: {
    allowHtml: boolean;
    allowScripts: boolean;
    uploadMaxSize: number;
    allowedFileTypes: string[];
  };
}
