import { StoreAnalytics, MonthlyStats } from "../../shared/types";

export interface AnalyticsData {
  overview: {
    totalViews: number;
    totalOrders: number;
    totalRevenue: number;
    conversionRate: number;
    averageOrderValue: number;
    returningCustomers: number;
  };
  monthly: MonthlyStats[];
  topProducts: {
    id: string;
    name: string;
    views: number;
    orders: number;
    revenue: number;
  }[];
  customerMetrics: {
    newCustomers: number;
    returningCustomers: number;
    totalCustomers: number;
    customerRetentionRate: number;
  };
  salesByCategory: {
    category: string;
    orders: number;
    revenue: number;
    percentage: number;
  }[];
  recentActivity: {
    type: "order" | "view" | "review";
    description: string;
    timestamp: string;
    value?: number;
  }[];
}

export class AnalyticsService {
  private static readonly STORAGE_KEY = "bayt_al_sudani_analytics";

  // Demo analytics data
  private static demoAnalytics: Record<string, AnalyticsData> = {
    "store-001": {
      overview: {
        totalViews: 15420,
        totalOrders: 234,
        totalRevenue: 45670.5,
        conversionRate: 1.52,
        averageOrderValue: 195.18,
        returningCustomers: 78,
      },
      monthly: [
        { month: "2024-01", views: 1200, orders: 18, revenue: 3456.78 },
        { month: "2024-02", views: 1450, orders: 22, revenue: 4123.45 },
        { month: "2024-03", views: 1678, orders: 28, revenue: 5234.67 },
        { month: "2024-04", views: 2340, orders: 35, revenue: 6789.12 },
        { month: "2024-05", views: 2567, orders: 42, revenue: 8234.56 },
        { month: "2024-06", views: 3890, orders: 56, revenue: 10456.78 },
        { month: "2024-07", views: 2345, orders: 33, revenue: 7375.14 },
      ],
      topProducts: [
        {
          id: "prod-001",
          name: "عطر صندل سوداني أصلي",
          views: 3450,
          orders: 89,
          revenue: 3555.11,
        },
        {
          id: "prod-002",
          name: "كركديه سوداني طبيعي",
          views: 2340,
          orders: 67,
          revenue: 1038.5,
        },
        {
          id: "prod-003",
          name: "حقيبة جلدية سودانية",
          views: 1890,
          orders: 45,
          revenue: 4049.55,
        },
      ],
      customerMetrics: {
        newCustomers: 156,
        returningCustomers: 78,
        totalCustomers: 234,
        customerRetentionRate: 33.3,
      },
      salesByCategory: [
        {
          category: "عطور ومستحضرات",
          orders: 89,
          revenue: 15678.9,
          percentage: 34.3,
        },
        {
          category: "إكسسوارات",
          orders: 67,
          revenue: 12345.67,
          percentage: 27.0,
        },
        {
          category: "أطعمة ومشروبات",
          orders: 45,
          revenue: 8234.56,
          percentage: 18.0,
        },
        {
          category: "ملابس تراثية",
          orders: 33,
          revenue: 9411.37,
          percentage: 20.7,
        },
      ],
      recentActivity: [
        {
          type: "order",
          description: "طلب جديد - عطر صندل سوداني",
          timestamp: "2024-01-25T14:30:00Z",
          value: 45.99,
        },
        {
          type: "view",
          description: "مشاهدة صفحة المنتج - كركديه طبيعي",
          timestamp: "2024-01-25T14:25:00Z",
        },
        {
          type: "order",
          description: "طلب جديد - حقيبة جلدية",
          timestamp: "2024-01-25T13:45:00Z",
          value: 89.99,
        },
        {
          type: "review",
          description: "تقييم جديد - 5 نجوم",
          timestamp: "2024-01-25T13:20:00Z",
        },
        {
          type: "view",
          description: "مشاهدة صفحة المتجر",
          timestamp: "2024-01-25T13:15:00Z",
        },
      ],
    },
  };

  static getAnalytics(storeId: string): AnalyticsData {
    try {
      const analyticsStr = localStorage.getItem(this.STORAGE_KEY);
      const analytics = analyticsStr
        ? JSON.parse(analyticsStr)
        : this.demoAnalytics;
      return analytics[storeId] || this.getDefaultAnalytics();
    } catch {
      return this.demoAnalytics[storeId] || this.getDefaultAnalytics();
    }
  }

  private static getDefaultAnalytics(): AnalyticsData {
    return {
      overview: {
        totalViews: 0,
        totalOrders: 0,
        totalRevenue: 0,
        conversionRate: 0,
        averageOrderValue: 0,
        returningCustomers: 0,
      },
      monthly: [],
      topProducts: [],
      customerMetrics: {
        newCustomers: 0,
        returningCustomers: 0,
        totalCustomers: 0,
        customerRetentionRate: 0,
      },
      salesByCategory: [],
      recentActivity: [],
    };
  }

  static getDateRange(period: "week" | "month" | "quarter" | "year"): {
    start: Date;
    end: Date;
  } {
    const end = new Date();
    const start = new Date();

    switch (period) {
      case "week":
        start.setDate(end.getDate() - 7);
        break;
      case "month":
        start.setMonth(end.getMonth() - 1);
        break;
      case "quarter":
        start.setMonth(end.getMonth() - 3);
        break;
      case "year":
        start.setFullYear(end.getFullYear() - 1);
        break;
    }

    return { start, end };
  }

  static calculateGrowth(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat("ar-SA", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  static formatPercentage(value: number): string {
    return new Intl.NumberFormat("ar-SA", {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(value / 100);
  }

  static getMonthName(monthKey: string): string {
    const monthNames = {
      "01": "يناير",
      "02": "فبراير",
      "03": "مارس",
      "04": "أبريل",
      "05": "مايو",
      "06": "يونيو",
      "07": "يوليو",
      "08": "أغسطس",
      "09": "سبتمبر",
      "10": "أكتوبر",
      "11": "نوفمبر",
      "12": "ديسمبر",
    };

    const month = monthKey.split("-")[1];
    return monthNames[month as keyof typeof monthNames] || monthKey;
  }

  static exportToCSV(data: AnalyticsData, storeId: string): string {
    const headers = ["التاريخ", "المشاهدات", "الط��بات", "الإيرادات"];
    const rows = data.monthly.map((item) => [
      this.getMonthName(item.month),
      item.views.toString(),
      item.orders.toString(),
      item.revenue.toFixed(2),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    return csvContent;
  }

  static generateInsights(data: AnalyticsData): string[] {
    const insights: string[] = [];

    // Conversion rate insights
    if (data.overview.conversionRate < 1) {
      insights.push("معدل التحويل منخفض - فكر في تحسين صفحات المنتجات");
    } else if (data.overview.conversionRate > 3) {
      insights.push("معدل تحويل ممتاز! تواصل مع ما تفعله");
    }

    // Growth insights
    if (data.monthly.length >= 2) {
      const lastMonth = data.monthly[data.monthly.length - 1];
      const previousMonth = data.monthly[data.monthly.length - 2];
      const growth = this.calculateGrowth(
        lastMonth.revenue,
        previousMonth.revenue,
      );

      if (growth > 10) {
        insights.push(
          `نمو ممتاز في الإيرادات بنسبة ${growth.toFixed(1)}% هذا الشهر`,
        );
      } else if (growth < -10) {
        insights.push("انخفاض في الإيرادات - راجع ا��تراتيجية التسويق");
      }
    }

    // Customer retention insights
    if (data.customerMetrics.customerRetentionRate < 20) {
      insights.push("معدل الاحتفاظ بالعملاء منخفض - فكر في برامج الولاء");
    }

    // Top product insights
    if (data.topProducts.length > 0) {
      const topProduct = data.topProducts[0];
      insights.push(
        `منتجك الأكثر مبيعاً: ${topProduct.name} بإيرادات ${this.formatCurrency(topProduct.revenue)}`,
      );
    }

    return insights;
  }
}

// React hook for analytics
export const useAnalytics = (storeId: string) => {
  const analytics = AnalyticsService.getAnalytics(storeId);

  return {
    analytics,
    formatCurrency: AnalyticsService.formatCurrency,
    formatPercentage: AnalyticsService.formatPercentage,
    calculateGrowth: AnalyticsService.calculateGrowth,
    getMonthName: AnalyticsService.getMonthName,
    exportToCSV: (data: AnalyticsData) =>
      AnalyticsService.exportToCSV(data, storeId),
    generateInsights: AnalyticsService.generateInsights,
    getDateRange: AnalyticsService.getDateRange,
  };
};
