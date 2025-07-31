export interface Company {
  id: string;
  name: string;
  description: string;
  logo?: string;
  coverImage?: string;
  industry: string;
  category: string;
  size: "startup" | "small" | "medium" | "large" | "enterprise";
  founded: string;
  location: {
    city: string;
    country: string;
    region: string;
  };
  contact: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  services: string[];
  employees: number;
  revenue?: string;
  isVerified: boolean;
  isFeatured: boolean;
  rating: number;
  reviewsCount: number;
  establishedIn: string;
  certifications?: string[];
  awards?: string[];
  keyClients?: string[];
  specializations: string[];
  languages: string[];
  workingHours?: string;
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
}

export class CompaniesService {
  private static demoCompanies: Company[] = [
    {
      id: "comp-001",
      name: "شركة الخرطوم للتقنية والابتكار",
      description:
        "شركة رائدة في مجال تطوير البرمجيات والحلول التقنية المتقدمة. نخدم العملاء في منطقة الخليج والشرق الأوسط بأحدث التقنيات والمعايير العالمية.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "تقنية المعلومات",
      category: "software",
      size: "medium",
      founded: "2018",
      location: {
        city: "الرياض",
        country: "السعودية",
        region: "الخليج",
      },
      contact: {
        email: "info@khartoumtech.com",
        phone: "+966 11 234 5678",
        website: "www.khartoumtech.com",
        address: "طريق الملك فهد، الرياض 11564",
      },
      socialLinks: {
        linkedin: "linkedin.com/company/khartoumtech",
        twitter: "@khartoumtech",
        facebook: "facebook.com/khartoumtech",
      },
      services: [
        "تطوير تطبيقات الجوال",
        "تطوير مواقع الويب",
        "أنظمة إدارة المحتوى",
        "الذكاء الاصطناعي",
        "الأمن السيبراني",
      ],
      employees: 45,
      revenue: "5 مليون ريال",
      isVerified: true,
      isFeatured: true,
      rating: 4.8,
      reviewsCount: 156,
      establishedIn: "السعودية",
      certifications: ["ISO 9001", "ISO 27001", "Google Partner"],
      awards: ["أفضل شركة تقنية ناشئة 2023"],
      keyClients: ["أرامكو", "سابك", "البنك الأهلي"],
      specializations: ["React", "Node.js", "Cloud Computing", "Mobile Apps"],
      languages: ["العربية", "الإنجليزية"],
      workingHours: "الأحد - الخميس: 8:00 - 17:00",
      status: "active",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-02-20T14:30:00Z",
    },
    {
      id: "comp-002",
      name: "مجموعة النيل للاستثمار",
      description:
        "مجموعة استثمارية متنوعة تعمل في قطاعات العقارات، التجارة، والخدمات المالية. تأسست لتكون جسراً بين السودان ودول الخليج.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "الاستثمار والمال",
      category: "investment",
      size: "large",
      founded: "2015",
      location: {
        city: "دبي",
        country: "الإمارات",
        region: "الخليج",
      },
      contact: {
        email: "info@nilegroup.ae",
        phone: "+971 4 123 4567",
        website: "www.nilegroup.ae",
        address: "برج الإمارات، شيخ زايد رود، دبي",
      },
      socialLinks: {
        linkedin: "linkedin.com/company/nilegroup",
        instagram: "@nilegroup_uae",
      },
      services: [
        "الاستثمار العقاري",
        "الخدمات المصرفية",
        "التجارة الدولية",
        "إدارة المحافظ",
        "الاستشارات المالية",
      ],
      employees: 120,
      revenue: "50 مليون درهم",
      isVerified: true,
      isFeatured: true,
      rating: 4.6,
      reviewsCount: 89,
      establishedIn: "الإمارات",
      certifications: ["ADGM License", "DFSA Regulated"],
      awards: ["أفضل مجموعة استثمارية للعام 2022"],
      keyClients: ["بنك الإمارات", "شركة الاتصالات", "موانئ دبي"],
      specializations: ["Real Estate", "Banking", "Trade Finance"],
      languages: ["العربية", "الإنجليزية", "الفرنسية"],
      workingHours: "الأحد - الخميس: 9:00 - 18:00",
      status: "active",
      createdAt: "2024-01-10T08:00:00Z",
      updatedAt: "2024-02-15T16:45:00Z",
    },
    {
      id: "comp-003",
      name: "شركة أم درمان للمقاولات والبناء",
      description:
        "شركة متخصصة في المقاولات العامة وأعمال البناء والتشييد. خبرة واسعة في تنفيذ المشاريع السكنية والتجارية والصناعية.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "البناء والتشييد",
      category: "construction",
      size: "large",
      founded: "2012",
      location: {
        city: "الدوحة",
        country: "قطر",
        region: "الخليج",
      },
      contact: {
        email: "projects@omdurman-contracting.qa",
        phone: "+974 4444 5555",
        website: "www.omdurman-contracting.qa",
        address: "المنطقة الصناعية، الدوحة، قطر",
      },
      services: [
        "المقاولات العامة",
        "البناء السكني",
        "المشاريع التجارية",
        "الأعمال الصناعية",
        "الصيانة والتشغيل",
      ],
      employees: 200,
      revenue: "80 مليون ريال قطري",
      isVerified: true,
      isFeatured: false,
      rating: 4.4,
      reviewsCount: 67,
      establishedIn: "قطر",
      certifications: ["ISO 9001", "OHSAS 18001", "Qatar Construction License"],
      keyClients: ["أشغال قطر", "با��وا", "قطر للبترول"],
      specializations: ["مقاولات عامة", "إدارة مشاريع", "هندسة مدنية"],
      languages: ["العربية", "الإنجليزية", "الهندية"],
      workingHours: "السبت - الخميس: 7:00 - 16:00",
      status: "active",
      createdAt: "2024-01-05T12:00:00Z",
      updatedAt: "2024-02-10T09:15:00Z",
    },
    {
      id: "comp-004",
      name: "مطاعم كردفان الأصيلة",
      description:
        "سلسلة مطاعم متخصصة في تقديم الأطباق السودانية التقليدية بأعلى معايير الجودة والنظافة. نقدم تجربة طعام أصيلة للمغتربين السودانيين.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "المطاعم والضيافة",
      category: "restaurants",
      size: "medium",
      founded: "2020",
      location: {
        city: "الكويت",
        country: "الكويت",
        region: "الخليج",
      },
      contact: {
        email: "info@kordofan-restaurants.com",
        phone: "+965 2222 3333",
        website: "www.kordofan-restaurants.com",
        address: "شارع سالم المبارك، السالمية، الكويت",
      },
      socialLinks: {
        instagram: "@kordofan_kw",
        facebook: "facebook.com/kordofanrestaurants",
        twitter: "@kordofan_kw",
      },
      services: [
        "مطعم شعبي",
        "خدمة التوصيل",
        "تنظيم المناسبات",
        "الوجبات الجاهزة",
        "الكيترينغ",
      ],
      employees: 35,
      revenue: "2 مليون دينار كويتي",
      isVerified: true,
      isFeatured: false,
      rating: 4.7,
      reviewsCount: 234,
      establishedIn: "الكويت",
      certifications: ["شهادة سلامة الغذاء", "رخصة وزارة التجارة"],
      specializations: ["المطبخ السوداني", "إدارة مطاعم", "خدمة العملاء"],
      languages: ["العربية", "الإنجليزية"],
      workingHours: "يومياً: 10:00 - 24:00",
      status: "active",
      createdAt: "2024-01-20T14:00:00Z",
      updatedAt: "2024-02-25T11:30:00Z",
    },
    {
      id: "comp-005",
      name: "عيادات دار الشفاء الطبية",
      description:
        "مجموعة عيادات طبية متخصصة تقدم خدمات طبية شاملة بأحدث التقنيات الطبية وكادر طبي متخصص من ذوي الخبرة العالية.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "الرعاية الصحية",
      category: "healthcare",
      size: "medium",
      founded: "2019",
      location: {
        city: "مسقط",
        country: "عُمان",
        region: "الخليج",
      },
      contact: {
        email: "info@darshifa-clinics.om",
        phone: "+968 2444 5566",
        website: "www.darshifa-clinics.om",
        address: "شارع السلطان قابوس، الخوير، مسقط",
      },
      services: [
        "طب الأسرة",
        "طب الأطفال",
        "أمراض النساء والولادة",
        "الطب الباطني",
        "الفحوصات الطبية",
      ],
      employees: 55,
      revenue: "3 مليون ريال عماني",
      isVerified: true,
      isFeatured: true,
      rating: 4.9,
      reviewsCount: 312,
      establishedIn: "عُمان",
      certifications: ["اعتماد وزارة الصحة العمانية", "JCI Accreditation"],
      awards: ["أفضل عيادة طبية خاصة 2023"],
      specializations: ["طب الأسرة", "رعاية الأمومة", "طب الأطفال"],
      languages: ["العربية", "الإنجليزية", "الأردية"],
      workingHours: "السبت - الخميس: 8:00 - 20:00",
      status: "active",
      createdAt: "2024-01-25T16:00:00Z",
      updatedAt: "2024-03-01T13:45:00Z",
    },
    {
      id: "comp-006",
      name: "شركة النهر الأزرق للاستيراد والتصدير",
      description:
        "شركة متخصصة في استيراد وتصدير المنتجات الزراعية والغذائية بين السودان ودول الخليج. نربط المنتجين بالمستهلكين بأعلى معايير الجودة.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "التجارة والاستيراد",
      category: "trading",
      size: "medium",
      founded: "2016",
      location: {
        city: "المنامة",
        country: "البحرين",
        region: "الخليج",
      },
      contact: {
        email: "trade@blueriver-trading.bh",
        phone: "+973 1777 8888",
        website: "www.blueriver-trading.bh",
        address: "المنطقة التجارية، المنامة، البحرين",
      },
      services: [
        "است��راد المنتجات الزراعية",
        "تصدير السلع الغذائية",
        "التخزين والتوزيع",
        "الخدمات اللوجستية",
        "استشارات التجارة الدولية",
      ],
      employees: 28,
      revenue: "15 مليون دينار بحريني",
      isVerified: false,
      isFeatured: false,
      rating: 4.2,
      reviewsCount: 45,
      establishedIn: "البحرين",
      certifications: ["رخصة التجارة البحرينية", "شهادة HACCP"],
      specializations: ["تجارة دولية", "منتجات زراعية", "خدمات لوجستية"],
      languages: ["العربية", "الإنجليزية"],
      workingHours: "الأحد - الخميس: 8:00 - 17:00",
      status: "active",
      createdAt: "2024-02-01T10:30:00Z",
      updatedAt: "2024-02-28T15:20:00Z",
    },
    {
      id: "comp-007",
      name: "أكاديمية السودان للتعليم والتدريب",
      description:
        "مؤسسة تعليمية رائدة تقدم برامج تدريبية وتعليمية متخصصة للمهنيين السودانيين. نركز على تطوير المهارات والقدرات المهنية.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "التعليم والتدريب",
      category: "education",
      size: "small",
      founded: "2021",
      location: {
        city: "أبوظبي",
        country: "الإمارات",
        region: "الخليج",
      },
      contact: {
        email: "info@sudan-academy.ae",
        phone: "+971 2 555 6677",
        website: "www.sudan-academy.ae",
        address: "شارع الكورنيش، أبوظبي، الإمارات",
      },
      socialLinks: {
        linkedin: "linkedin.com/company/sudan-academy",
        youtube: "youtube.com/sudanacademy",
      },
      services: [
        "دورات تدريبية مهنية",
        "برامج التطوير الإداري",
        "التدريب التقني",
        "اللغة الإنجليزية",
        "شهادات مهنية",
      ],
      employees: 22,
      isVerified: true,
      isFeatured: false,
      rating: 4.5,
      reviewsCount: 128,
      establishedIn: "الإمارات",
      certifications: ["رخصة هيئة المعرفة والتنمية البشرية"],
      specializations: ["تدريب مهني", "تطوير مهارات", "تعليم إلكتروني"],
      languages: ["العربية", "الإنجليزية"],
      workingHours: "السبت - الخميس: 9:00 - 18:00",
      status: "active",
      createdAt: "2024-02-05T11:00:00Z",
      updatedAt: "2024-03-03T14:15:00Z",
    },
    {
      id: "comp-008",
      name: "شركة الصحراء للنقل واللوجستيات",
      description:
        "شركة متخصصة في خدمات النقل والشحن واللوجستيات بين دول الخليج والسودان. نوفر حلول شحن متكاملة وموثوقة.",
      logo: "/placeholder.svg",
      coverImage: "/placeholder.svg",
      industry: "النقل واللوجستيات",
      category: "logistics",
      size: "large",
      founded: "2014",
      location: {
        city: "جدة",
        country: "السعودية",
        region: "الخليج",
      },
      contact: {
        email: "logistics@sahara-transport.sa",
        phone: "+966 12 666 7777",
        website: "www.sahara-transport.sa",
        address: "الميناء الجاف، جدة 21589",
      },
      services: [
        "النقل البري",
        "النقل البحري",
        "النقل الجوي",
        "التخزين",
        "التخليص الجمركي",
      ],
      employees: 150,
      revenue: "40 مليون ريال",
      isVerified: true,
      isFeatured: true,
      rating: 4.3,
      reviewsCount: 89,
      establishedIn: "السعودية",
      certifications: ["ISO 9001", "رخصة النقل السعودية"],
      specializations: ["شحن دولي", "خدمات جمركية", "إدارة سلسلة التوريد"],
      languages: ["العربية", "الإنجليزية", "الأردية"],
      workingHours: "على مدار الساعة",
      status: "active",
      createdAt: "2024-02-08T13:30:00Z",
      updatedAt: "2024-03-05T10:45:00Z",
    },
  ];

  static getAllCompanies(): Company[] {
    return this.demoCompanies.filter((company) => company.status === "active");
  }

  static getFeaturedCompanies(): Company[] {
    return this.demoCompanies.filter(
      (company) => company.isFeatured && company.status === "active",
    );
  }

  static getVerifiedCompanies(): Company[] {
    return this.demoCompanies.filter(
      (company) => company.isVerified && company.status === "active",
    );
  }

  static getCompaniesByIndustry(industry: string): Company[] {
    return this.demoCompanies.filter(
      (company) => company.industry === industry && company.status === "active",
    );
  }

  static getCompaniesByCategory(category: string): Company[] {
    return this.demoCompanies.filter(
      (company) => company.category === category && company.status === "active",
    );
  }

  static getCompaniesByLocation(country: string): Company[] {
    return this.demoCompanies.filter(
      (company) =>
        company.location.country === country && company.status === "active",
    );
  }

  static getCompaniesBySize(size: string): Company[] {
    return this.demoCompanies.filter(
      (company) => company.size === size && company.status === "active",
    );
  }

  static searchCompanies(query: string): Company[] {
    if (!query) return this.getAllCompanies();

    const searchTerm = query.toLowerCase();
    return this.demoCompanies.filter(
      (company) =>
        company.status === "active" &&
        (company.name.toLowerCase().includes(searchTerm) ||
          company.description.toLowerCase().includes(searchTerm) ||
          company.industry.toLowerCase().includes(searchTerm) ||
          company.location.city.toLowerCase().includes(searchTerm) ||
          company.location.country.toLowerCase().includes(searchTerm) ||
          company.services.some((service) =>
            service.toLowerCase().includes(searchTerm),
          ) ||
          company.specializations.some((spec) =>
            spec.toLowerCase().includes(searchTerm),
          )),
    );
  }

  static getCompanyById(id: string): Company | null {
    return this.demoCompanies.find((company) => company.id === id) || null;
  }

  static getIndustries(): string[] {
    const industries = [
      ...new Set(this.demoCompanies.map((company) => company.industry)),
    ];
    return industries.sort();
  }

  static getCountries(): string[] {
    const countries = [
      ...new Set(this.demoCompanies.map((company) => company.location.country)),
    ];
    return countries.sort();
  }

  static getSizes(): Array<{ value: string; label: string }> {
    return [
      { value: "startup", label: "ناشئة (1-10)" },
      { value: "small", label: "صغيرة (11-50)" },
      { value: "medium", label: "متوسطة (51-200)" },
      { value: "large", label: "كبيرة (201-1000)" },
      { value: "enterprise", label: "مؤسسة (+1000)" },
    ];
  }

  static getIndustryIcon(industry: string): string {
    const icons: Record<string, string> = {
      "تقنية المعلومات": "💻",
      "الاستثمار والمال": "💰",
      "البناء والتشييد": "🏗️",
      "المطاعم والضيافة": "🍽️",
      "الرعاية الصحية": "🏥",
      "التجارة والاستيراد": "📦",
      "التعليم والتدريب": "📚",
      "النقل واللوجستيات": "🚛",
    };
    return icons[industry] || "🏢";
  }

  static getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      software: "bg-blue-500",
      investment: "bg-green-500",
      construction: "bg-orange-500",
      restaurants: "bg-red-500",
      healthcare: "bg-teal-500",
      trading: "bg-purple-500",
      education: "bg-indigo-500",
      logistics: "bg-yellow-500",
    };
    return colors[category] || "bg-gray-500";
  }

  static getSizeIcon(size: string): string {
    const icons: Record<string, string> = {
      startup: "🌱",
      small: "🏪",
      medium: "🏢",
      large: "🏬",
      enterprise: "🏛️",
    };
    return icons[size] || "🏢";
  }

  static formatEmployeeCount(count: number): string {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k+ موظف`;
    }
    return `${count} موظف`;
  }

  static getYearsSinceEstablishment(founded: string): number {
    return new Date().getFullYear() - parseInt(founded);
  }
}

// React hooks
export const useCompanies = () => {
  return {
    companies: CompaniesService.getAllCompanies(),
    featuredCompanies: CompaniesService.getFeaturedCompanies(),
    verifiedCompanies: CompaniesService.getVerifiedCompanies(),
    searchCompanies: CompaniesService.searchCompanies,
    getCompaniesByIndustry: CompaniesService.getCompaniesByIndustry,
    getCompaniesByCategory: CompaniesService.getCompaniesByCategory,
    getCompaniesByLocation: CompaniesService.getCompaniesByLocation,
    getCompaniesBySize: CompaniesService.getCompaniesBySize,
    getCompanyById: CompaniesService.getCompanyById,
    industries: CompaniesService.getIndustries(),
    countries: CompaniesService.getCountries(),
    sizes: CompaniesService.getSizes(),
  };
};
