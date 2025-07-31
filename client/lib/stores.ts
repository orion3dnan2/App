import { Store } from "../../shared/types";

export class StoresService {
  private static demoStores: Store[] = [
    {
      id: "store-001",
      merchantId: "merchant-001",
      name: "متجر التراث السوداني",
      description:
        "متخصص في المنتجات التراثية والحرف اليدوية السودانية الأصيلة",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      category: "traditional",
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z",
      settings: {
        theme: {
          primaryColor: "#22C55E",
          secondaryColor: "#16A34A",
          layout: "grid",
        },
        notifications: {
          newOrders: true,
          lowStock: true,
          reviews: true,
        },
        shipping: {
          freeShippingThreshold: 200,
          shippingRates: [
            { zone: "الخليج", rate: 25, estimatedDays: 3 },
            { zone: "أوروبا", rate: 50, estimatedDays: 7 },
          ],
        },
      },
      analytics: {
        totalViews: 1250,
        totalOrders: 85,
        totalRevenue: 12750,
        monthlyStats: [],
      },
    },
    {
      id: "store-002",
      merchantId: "merchant-002",
      name: "عطور الشرق",
      description: "أجود أنواع العطور والبخور السودانية المستخرجة من الطبيعة",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      category: "perfumes",
      status: "active",
      createdAt: "2024-01-20T14:30:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
      settings: {
        theme: {
          primaryColor: "#8B5CF6",
          secondaryColor: "#7C3AED",
          layout: "list",
        },
        notifications: {
          newOrders: true,
          lowStock: false,
          reviews: true,
        },
        shipping: {
          freeShippingThreshold: 150,
          shippingRates: [
            { zone: "الخليج", rate: 20, estimatedDays: 2 },
            { zone: "أمريكا", rate: 75, estimatedDays: 10 },
          ],
        },
      },
      analytics: {
        totalViews: 950,
        totalOrders: 62,
        totalRevenue: 8900,
        monthlyStats: [],
      },
    },
    {
      id: "store-003",
      merchantId: "merchant-003",
      name: "مطعم أم درمان",
      description: "أشهى الأطباق السودانية التقليدية محضرة بحب وعناية",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      category: "food",
      status: "active",
      createdAt: "2024-02-01T09:15:00Z",
      updatedAt: "2024-02-01T09:15:00Z",
      settings: {
        theme: {
          primaryColor: "#EF4444",
          secondaryColor: "#DC2626",
          layout: "grid",
        },
        notifications: {
          newOrders: true,
          lowStock: true,
          reviews: true,
        },
        shipping: {
          freeShippingThreshold: 100,
          shippingRates: [{ zone: "محلي", rate: 15, estimatedDays: 1 }],
        },
      },
      analytics: {
        totalViews: 2100,
        totalOrders: 156,
        totalRevenue: 18500,
        monthlyStats: [],
      },
    },
    {
      id: "store-004",
      merchantId: "merchant-004",
      name: "خدمات التقنية السودانية",
      description: "حلول تقنية متطورة وخدمات البرمجة والتصميم",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      category: "services",
      status: "active",
      createdAt: "2024-02-10T16:45:00Z",
      updatedAt: "2024-02-10T16:45:00Z",
      settings: {
        theme: {
          primaryColor: "#3B82F6",
          secondaryColor: "#2563EB",
          layout: "list",
        },
        notifications: {
          newOrders: true,
          lowStock: false,
          reviews: true,
        },
        shipping: {
          freeShippingThreshold: 0,
          shippingRates: [],
        },
      },
      analytics: {
        totalViews: 680,
        totalOrders: 24,
        totalRevenue: 15600,
        monthlyStats: [],
      },
    },
    {
      id: "store-005",
      merchantId: "merchant-005",
      name: "أزياء النيل",
      description: "أحدث صيحات الموضة والأزياء السودانية العصرية",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      category: "fashion",
      status: "active",
      createdAt: "2024-02-15T11:20:00Z",
      updatedAt: "2024-02-15T11:20:00Z",
      settings: {
        theme: {
          primaryColor: "#EC4899",
          secondaryColor: "#DB2777",
          layout: "grid",
        },
        notifications: {
          newOrders: true,
          lowStock: true,
          reviews: true,
        },
        shipping: {
          freeShippingThreshold: 300,
          shippingRates: [
            { zone: "الخليج", rate: 30, estimatedDays: 4 },
            { zone: "أفريقيا", rate: 60, estimatedDays: 8 },
          ],
        },
      },
      analytics: {
        totalViews: 1580,
        totalOrders: 98,
        totalRevenue: 22400,
        monthlyStats: [],
      },
    },
    {
      id: "store-006",
      merchantId: "merchant-006",
      name: "سوبر ماركت الخرطوم",
      description:
        "جميع احتياجاتك اليومية من المواد الغذائية والمنتجات المنزلية",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      category: "grocery",
      status: "active",
      createdAt: "2024-02-20T08:30:00Z",
      updatedAt: "2024-02-20T08:30:00Z",
      settings: {
        theme: {
          primaryColor: "#10B981",
          secondaryColor: "#059669",
          layout: "list",
        },
        notifications: {
          newOrders: true,
          lowStock: true,
          reviews: false,
        },
        shipping: {
          freeShippingThreshold: 120,
          shippingRates: [
            { zone: "الخرطوم", rate: 10, estimatedDays: 1 },
            { zone: "الخليج", rate: 45, estimatedDays: 5 },
          ],
        },
      },
      analytics: {
        totalViews: 3200,
        totalOrders: 245,
        totalRevenue: 35600,
        monthlyStats: [],
      },
    },
  ];

  private static demoServices = [
    {
      id: "service-001",
      name: "خدمات الصيانة المنزلية",
      description:
        "صيانة جميع الأجهزة المنزلية والكهربائية بخبرة سودانية متميزة",
      category: "maintenance",
      provider: "شركة الخرطوم للصيانة",
      rating: 4.8,
      reviewsCount: 156,
      price: "يبدأ من 50 ريال",
      image: "/placeholder.svg",
      tags: ["صيانة", "كهرباء", "سباكة", "تكييف"],
      availability: "متاح على مدار الساعة",
      location: "الرياض، جدة، الدمام",
    },
    {
      id: "service-002",
      name: "خدمات التصميم الجرافيكي",
      description: "تصميم شعارات، هوية بصرية، ومواد تسويقية احترافية",
      category: "design",
      provider: "استوديو النيل للتصميم",
      rating: 4.9,
      reviewsCount: 89,
      price: "يبدأ من 200 ريال",
      image: "/placeholder.svg",
      tags: ["تصميم", "شعارات", "هوية بصرية", "تسويق"],
      availability: "من الأحد إلى الخميس",
      location: "عن بُعد - جميع المناطق",
    },
    {
      id: "service-003",
      name: "خدمات الطبخ المنزلي",
      description: "طبخ الوجبات السودانية التقليدية في منزلك",
      category: "cooking",
      provider: "طباخات أم درمان",
      rating: 4.7,
      reviewsCount: 203,
      price: "يبدأ من 80 ريال",
      image: "/placeholder.svg",
      tags: ["طبخ", "وجبات تقليدية", "مناسبات", "ضيافة"],
      availability: "يجب الحجز مسبقاً",
      location: "الرياض والمناطق المجاورة",
    },
    {
      id: "service-004",
      name: "خدمات التدريس الخصوصي",
      description: "دروس خصوصية في المواد العلمية واللغات",
      category: "education",
      provider: "معهد الخرطوم التعليمي",
      rating: 4.6,
      reviewsCount: 127,
      price: "يبدأ من 60 ريال/ساعة",
      image: "/placeholder.svg",
      tags: ["تعليم", "رياضيات", "فيزياء", "لغات"],
      availability: "مساءً وعطلة نهاية الأسبوع",
      location: "عن بُعد أو في المنزل",
    },
  ];

  private static demoAds = [
    {
      id: "ad-001",
      title: "خصم 50% على جميع العطور",
      description:
        "عرض خاص لفترة محدودة على جميع أنواع العطور والبخور السودانية",
      image: "/placeholder.svg",
      advertiser: "عطور الشرق",
      category: "perfumes",
      discount: 50,
      validUntil: "2024-03-31",
      originalPrice: 200,
      salePrice: 100,
      location: "جميع فروعنا في الخليج",
      featured: true,
    },
    {
      id: "ad-002",
      title: "وجبة مجانية عند طلب وجبتين",
      description: "استمتع بوجبة ثالثة مجاناً عند طلب وجبتين من مطعم أم درمان",
      image: "/placeholder.svg",
      advertiser: "مطعم أم درمان",
      category: "food",
      discount: 33,
      validUntil: "2024-03-15",
      originalPrice: 150,
      salePrice: 100,
      location: "فرع الرياض فقط",
      featured: true,
    },
    {
      id: "ad-003",
      title: "تطبيق جوال مجاني لمتجرك",
      description: "احصل على تطبيق جوال احترافي لمتجرك مع خصم 30%",
      image: "/placeholder.svg",
      advertiser: "خدمات التقنية السودانية",
      category: "services",
      discount: 30,
      validUntil: "2024-04-30",
      originalPrice: 5000,
      salePrice: 3500,
      location: "خدمة عن بُعد",
      featured: false,
    },
    {
      id: "ad-004",
      title: "مجموعة أزياء الصيف بأسعار مخفضة",
      description: "تشكيلة واسعة من الأزياء الصيفية بتخفيضات تصل إلى 40%",
      image: "/placeholder.svg",
      advertiser: "أزياء النيل",
      category: "fashion",
      discount: 40,
      validUntil: "2024-03-20",
      originalPrice: 250,
      salePrice: 150,
      location: "المتجر الإلكتروني",
      featured: true,
    },
  ];

  static getAllStores(): Store[] {
    return this.demoStores;
  }

  static getStoresByCategory(category: string): Store[] {
    return this.demoStores.filter((store) => store.category === category);
  }

  static getRestaurants(): Store[] {
    return this.getStoresByCategory("food");
  }

  static getActiveStores(): Store[] {
    return this.demoStores.filter((store) => store.status === "active");
  }

  static searchStores(query: string): Store[] {
    const searchTerm = query.toLowerCase();
    return this.demoStores.filter(
      (store) =>
        store.name.toLowerCase().includes(searchTerm) ||
        store.description.toLowerCase().includes(searchTerm) ||
        store.category.toLowerCase().includes(searchTerm),
    );
  }

  static getServices() {
    return this.demoServices;
  }

  static searchServices(query: string) {
    const searchTerm = query.toLowerCase();
    return this.demoServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.category.toLowerCase().includes(searchTerm) ||
        service.tags.some((tag) => tag.toLowerCase().includes(searchTerm)),
    );
  }

  static getAds() {
    return this.demoAds;
  }

  static getFeaturedAds() {
    return this.demoAds.filter((ad) => ad.featured);
  }

  static searchAds(query: string) {
    const searchTerm = query.toLowerCase();
    return this.demoAds.filter(
      (ad) =>
        ad.title.toLowerCase().includes(searchTerm) ||
        ad.description.toLowerCase().includes(searchTerm) ||
        ad.advertiser.toLowerCase().includes(searchTerm) ||
        ad.category.toLowerCase().includes(searchTerm),
    );
  }

  static getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      traditional: "🏺",
      perfumes: "🌹",
      food: "🍽️",
      services: "🔧",
      fashion: "👗",
      grocery: "🛒",
      maintenance: "🔧",
      design: "🎨",
      cooking: "👩‍🍳",
      education: "📚",
    };
    return icons[category] || "🏪";
  }
}

// React hooks
export const useStores = () => {
  return {
    stores: StoresService.getAllStores(),
    restaurants: StoresService.getRestaurants(),
    activeStores: StoresService.getActiveStores(),
    searchStores: StoresService.searchStores,
    getStoresByCategory: StoresService.getStoresByCategory,
  };
};

export const useServices = () => {
  return {
    services: StoresService.getServices(),
    searchServices: StoresService.searchServices,
  };
};

export const useAds = () => {
  return {
    ads: StoresService.getAds(),
    featuredAds: StoresService.getFeaturedAds(),
    searchAds: StoresService.searchAds,
  };
};
