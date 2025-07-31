export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "remote" | "internship";
  category: string;
  salary: {
    min?: number;
    max?: number;
    currency: string;
    period: "monthly" | "yearly" | "hourly";
  };
  description: string;
  requirements: string[];
  benefits: string[];
  skills: string[];
  experience: string;
  education: string;
  postedAt: string;
  expiresAt: string;
  applicationUrl?: string;
  contactEmail?: string;
  contactPhone?: string;
  isUrgent: boolean;
  isFeatured: boolean;
  applicationsCount: number;
  views: number;
  status: "active" | "closed" | "draft";
}

export class JobsService {
  private static demoJobs: Job[] = [
    {
      id: "job-001",
      title: "مطور برامج أول - React/Node.js",
      company: "شركة التقنية السودانية",
      companyLogo: "/placeholder.svg",
      location: "الرياض، السعودية",
      type: "full-time",
      category: "technology",
      salary: {
        min: 8000,
        max: 12000,
        currency: "ريال سعودي",
        period: "monthly",
      },
      description:
        "نبحث عن مطور برامج متمرس لانضمام إلى فريقنا المتنامي. ستكون مسؤولاً عن تطوير تطبيقات ويب حديثة باستخدام React و Node.js، والعمل مع فريق متعدد الجنسيات في بيئة عمل محفزة ومرنة.",
      requirements: [
        "خبرة 3+ سنوات في تطوير تطبيقات React",
        "معرفة قوية بـ Node.js و Express",
        "خبرة في قواعد البيانات MongoDB أو PostgreSQL",
        "إجادة Git و GitHub",
        "معرفة بـ TypeScript مطلوبة",
      ],
      benefits: [
        "راتب تنافسي مع مراجعة سنوية",
        "تأمين صحي شامل للموظف والعائلة",
        "إجازة سنوية 30 يوم",
        "بدل مواصلات وسكن",
        "بيئة عمل مرنة وإمكانية العمل عن بُعد",
      ],
      skills: ["React", "Node.js", "TypeScript", "MongoDB", "Git"],
      experience: "3-5 سنوات",
      education: "بكالوريوس هندسة حاسوب أو ما يعادلها",
      postedAt: "2024-02-20T10:00:00Z",
      expiresAt: "2024-03-20T23:59:59Z",
      applicationUrl: "https://company.com/apply/job-001",
      contactEmail: "hr@sudantech.com",
      isUrgent: true,
      isFeatured: true,
      applicationsCount: 24,
      views: 156,
      status: "active",
    },
    {
      id: "job-002",
      title: "محاسب أول",
      company: "مجموعة الخليج التجارية",
      companyLogo: "/placeholder.svg",
      location: "دبي، الإمارات",
      type: "full-time",
      category: "finance",
      salary: {
        min: 6000,
        max: 9000,
        currency: "درهم إماراتي",
        period: "monthly",
      },
      description:
        "مطلوب محاسب أول للعمل مع شركة رائدة في التجارة والاستيراد. المرشح المثالي يجب أن يكون لديه خبرة واسعة في المحاسبة المالية وإعداد التقارير المالية.",
      requirements: [
        "بكالوريوس محاسبة أو إدارة أعمال",
        "خبرة 5+ سنوات في المحاسبة",
        "شهادة CPA أو ACCA مفضلة",
        "خبرة في أنظمة ERP",
        "إجادة اللغة العربية والإنجليزية",
      ],
      benefits: [
        "راتب أساسي + عمولات",
        "تأمين صحي شامل",
        "تذكرة سفر سنوية للوطن",
        "بدل سكن ومواصلات",
        "فرص تطوير مهني",
      ],
      skills: ["محاسبة مالية", "ERP", "Excel", "تحليل مالي", "تدقيق"],
      experience: "5-8 سنوات",
      education: "بكالوريوس محاسبة",
      postedAt: "2024-02-18T14:30:00Z",
      expiresAt: "2024-03-15T23:59:59Z",
      contactEmail: "jobs@gulfgroup.ae",
      contactPhone: "+971501234567",
      isUrgent: false,
      isFeatured: true,
      applicationsCount: 31,
      views: 89,
      status: "active",
    },
    {
      id: "job-003",
      title: "مدرس لغة إنجليزية",
      company: "مدارس النيل الدولية",
      companyLogo: "/placeholder.svg",
      location: "الدوحة، قطر",
      type: "full-time",
      category: "education",
      salary: {
        min: 12000,
        max: 15000,
        currency: "ريال قطري",
        period: "monthly",
      },
      description:
        "مطلوب مدرس لغة إنجليزية متمرس للعمل في مدرسة دولية رائدة. المرشح يجب أن يكون حاصل على شهادة تدريس معتمدة ولديه خبرة في التدريس للطلاب العرب.",
      requirements: [
        "بكالوريوس في اللغة الإنجليزية أو الأدب",
        "شهادة TESOL أو CELTA",
        "خبرة 3+ سنوات في تدريس اللغة الإنجليزية",
        "إجادة اللغة العربية مرغوبة",
        "خبرة في المناهج البريطانية أو الأمريكية",
      ],
      benefits: [
        "راتب معفى من الضرائب",
        "تأمين صحي عائلي",
        "إجازة صيفية مدفوعة الأجر",
        "بدل سكن وتعليم الأطفال",
        "بيئة تعليمية متطورة",
      ],
      skills: [
        "تدريس اللغة الإنجليزية",
        "تطوير مناهج",
        "إدارة صف",
        "تقييم",
        "تكنولوجيا تعليم",
      ],
      experience: "3-6 سنوات",
      education: "بكالوريوس + شهادة تدريس",
      postedAt: "2024-02-15T09:00:00Z",
      expiresAt: "2024-03-10T23:59:59Z",
      contactEmail: "recruitment@nileischools.qa",
      isUrgent: false,
      isFeatured: false,
      applicationsCount: 18,
      views: 67,
      status: "active",
    },
    {
      id: "job-004",
      title: "مهندس طبي",
      company: "مستشفى الملك فيصل التخصصي",
      companyLogo: "/placeholder.svg",
      location: "الرياض، السعودية",
      type: "full-time",
      category: "healthcare",
      salary: {
        min: 10000,
        max: 14000,
        currency: "ريال سعودي",
        period: "monthly",
      },
      description:
        "مطلوب مهندس طبي للعمل في قسم الصيانة الطبية. المرشح سيكون مسؤولاً عن صيانة وإصلاح الأجهزة الطبية المتطورة وضمان جودة الخدمات الطبية.",
      requirements: [
        "بكالوريوس هندسة طبية أو إلكترونيات",
        "خبرة 2+ سنوات في صيانة الأجهزة الطبية",
        "معرفة بأنظمة الجودة الطبية",
        "رخصة مزاولة مهنة",
        "إجادة اللغة الإنجليزية",
      ],
      benefits: [
        "راتب تنافسي حسب الخبرة",
        "تأمين طبي شامل",
        "فرص تدريب متقدمة",
        "بيئة عمل احترافية",
        "استقرار وظيفي",
      ],
      skills: [
        "صيانة أجهزة طبية",
        "إلكترونيات",
        "جودة طبية",
        "استكشاف أعطال",
        "معايرة أجهزة",
      ],
      experience: "2-4 سنوات",
      education: "بكالوريوس هندسة طبية",
      postedAt: "2024-02-12T11:00:00Z",
      expiresAt: "2024-03-05T23:59:59Z",
      contactEmail: "hr@kfshrc.edu.sa",
      isUrgent: true,
      isFeatured: false,
      applicationsCount: 12,
      views: 45,
      status: "active",
    },
    {
      id: "job-005",
      title: "مصمم جرافيك وتسويق رقمي",
      company: "وكالة الإبداع للدعاية والإعلان",
      companyLogo: "/placeholder.svg",
      location: "الكويت، الكويت",
      type: "full-time",
      category: "marketing",
      salary: {
        min: 400,
        max: 600,
        currency: "دينار كويتي",
        period: "monthly",
      },
      description:
        "نبحث عن مصمم جرافيك مبدع لديه خبرة في التسويق الرقمي. ستكون مسؤولاً عن تصميم المواد الإعلانية وإدارة حملات التسويق الرقمي للعملاء.",
      requirements: [
        "بكالوريوس تصميم جرافيك أو فنون تطبيقية",
        "خبرة 2+ سنوات في التصميم والتسويق الرقمي",
        "إتقان Adobe Creative Suite",
        "خبرة في إدارة وسائل التواصل الاجتماعي",
        "معرفة بـ Google Ads و Facebook Ads",
      ],
      benefits: [
        "راتب أساسي + حوافز",
        "تأمين صحي",
        "بيئة إبداعية محفزة",
        "فرص السفر والتدريب",
        "مرونة في ساعات العمل",
      ],
      skills: [
        "تصميم جرافيك",
        "Adobe Creative Suite",
        "تسويق رقمي",
        "وسائل التواصل",
        "إعلانات رقمية",
      ],
      experience: "2-4 سنوات",
      education: "بكالوريوس تصميم أو ما يعادلها",
      postedAt: "2024-02-10T16:00:00Z",
      expiresAt: "2024-03-01T23:59:59Z",
      contactEmail: "careers@creativekw.com",
      isUrgent: false,
      isFeatured: false,
      applicationsCount: 28,
      views: 93,
      status: "active",
    },
    {
      id: "job-006",
      title: "طبيب عام - عمل عن بُعد",
      company: "منصة الصحة الرقمية",
      companyLogo: "/placeholder.svg",
      location: "عمل عن بُعد",
      type: "remote",
      category: "healthcare",
      salary: {
        min: 50,
        max: 100,
        currency: "دولار أمريكي",
        period: "hourly",
      },
      description:
        "فرصة عمل مرنة لطبيب عام للعمل عن بُعد في تقديم الاستشارات الطبية عبر المنصة الرقمية. ساعات عمل مرنة ومناسبة للأطباء العاملين.",
      requirements: [
        "بكالوريوس طب وجراحة",
        "رخصة مزاولة مهنة سارية",
        "خبرة 3+ سنوات في الطب العام",
        "إجادة استخدام التكنولوجيا الطبية",
        "مهارات تواصل ممتازة",
      ],
      benefits: [
        "مرونة كاملة في ساعات العمل",
        "أجر بالساعة تنافسي",
        "لا يوجد التزام بساعات ثابتة",
        "فرصة للعمل من أي مكان",
        "دعم تقني متكامل",
      ],
      skills: [
        "طب عام",
        "استشارات طبية",
        "تقنيات طبية",
        "تواصل المرضى",
        "طب رقمي",
      ],
      experience: "3+ سنوات",
      education: "بكالوريوس طب وجراحة",
      postedAt: "2024-02-08T13:00:00Z",
      expiresAt: "2024-04-08T23:59:59Z",
      contactEmail: "doctors@healthplatform.com",
      isUrgent: false,
      isFeatured: true,
      applicationsCount: 45,
      views: 234,
      status: "active",
    },
  ];

  static getAllJobs(): Job[] {
    return this.demoJobs.filter((job) => job.status === "active");
  }

  static getFeaturedJobs(): Job[] {
    return this.demoJobs.filter(
      (job) => job.isFeatured && job.status === "active",
    );
  }

  static getUrgentJobs(): Job[] {
    return this.demoJobs.filter(
      (job) => job.isUrgent && job.status === "active",
    );
  }

  static getJobsByCategory(category: string): Job[] {
    return this.demoJobs.filter(
      (job) => job.category === category && job.status === "active",
    );
  }

  static getJobsByType(type: string): Job[] {
    return this.demoJobs.filter(
      (job) => job.type === type && job.status === "active",
    );
  }

  static getJobsByLocation(location: string): Job[] {
    return this.demoJobs.filter(
      (job) =>
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        job.status === "active",
    );
  }

  static searchJobs(query: string): Job[] {
    if (!query) return this.getAllJobs();

    const searchTerm = query.toLowerCase();
    return this.demoJobs.filter(
      (job) =>
        job.status === "active" &&
        (job.title.toLowerCase().includes(searchTerm) ||
          job.company.toLowerCase().includes(searchTerm) ||
          job.location.toLowerCase().includes(searchTerm) ||
          job.category.toLowerCase().includes(searchTerm) ||
          job.description.toLowerCase().includes(searchTerm) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchTerm))),
    );
  }

  static getJobById(id: string): Job | null {
    return this.demoJobs.find((job) => job.id === id) || null;
  }

  static getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      technology: "💻",
      finance: "💰",
      education: "📚",
      healthcare: "🏥",
      marketing: "📢",
      engineering: "⚙️",
      sales: "📈",
      hr: "👥",
    };
    return icons[category] || "💼";
  }

  static getCategoryName(category: string): string {
    const names: Record<string, string> = {
      technology: "تقنية المعلومات",
      finance: "المالية والمحاسب��",
      education: "التعليم والتدريب",
      healthcare: "الصحة والطب",
      marketing: "التسويق والإعلان",
      engineering: "الهندسة",
      sales: "المبيعات",
      hr: "الموارد البشرية",
    };
    return names[category] || category;
  }

  static getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      "full-time": "🕘",
      "part-time": "⏰",
      contract: "📝",
      remote: "🌐",
      internship: "🎓",
    };
    return icons[type] || "💼";
  }

  static getTypeName(type: string): string {
    const names: Record<string, string> = {
      "full-time": "دوام كامل",
      "part-time": "دوام جزئي",
      contract: "تعاقد",
      remote: "عمل عن بُعد",
      internship: "تدريب",
    };
    return names[type] || type;
  }

  static formatSalary(salary: Job["salary"]): string {
    if (salary.min && salary.max) {
      return `${salary.min.toLocaleString()} - ${salary.max.toLocaleString()} ${salary.currency}`;
    } else if (salary.min) {
      return `من ${salary.min.toLocaleString()} ${salary.currency}`;
    } else if (salary.max) {
      return `حتى ${salary.max.toLocaleString()} ${salary.currency}`;
    }
    return "راتب تنافسي";
  }

  static getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "منذ يوم واحد";
    if (diffDays < 7) return `منذ ${diffDays} أيام`;
    if (diffDays < 30) return `منذ ${Math.ceil(diffDays / 7)} أسابيع`;
    return `منذ ${Math.ceil(diffDays / 30)} شهور`;
  }

  static getDaysUntilExpiry(dateString: string): number {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}

// React hooks
export const useJobs = () => {
  return {
    jobs: JobsService.getAllJobs(),
    featuredJobs: JobsService.getFeaturedJobs(),
    urgentJobs: JobsService.getUrgentJobs(),
    searchJobs: JobsService.searchJobs,
    getJobsByCategory: JobsService.getJobsByCategory,
    getJobsByType: JobsService.getJobsByType,
    getJobsByLocation: JobsService.getJobsByLocation,
    getJobById: JobsService.getJobById,
  };
};
