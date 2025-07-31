import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  ShoppingCart,
  DollarSign,
  Users,
  ArrowLeft,
  Download,
  Calendar,
  Target,
  Award,
  Activity,
  PieChart,
  LineChart,
  Sparkles,
  Plus,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function MerchantAnalytics() {
  const { user } = useAuth();
  const [isNewMerchant, setIsNewMerchant] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<
    "week" | "month" | "quarter" | "year"
  >("month");

  // تحديد إذا كان التاجر جديد
  useEffect(() => {
    if (user?.createdAt) {
      const accountAge = Date.now() - new Date(user.createdAt).getTime();
      const daysSinceCreation = accountAge / (1000 * 60 * 60 * 24);
      setIsNewMerchant(daysSinceCreation < 7);
    }
  }, [user]);

  // بيانات تحليلية فارغة للتجار الجدد
  const analytics = isNewMerchant
    ? {
        overview: {
          totalViews: 0,
          totalOrders: 0,
          totalRevenue: 0,
          conversionRate: 0,
          averageOrderValue: 0,
          returningCustomers: 0,
        },
        monthly: [],
        customerMetrics: {
          totalCustomers: 0,
          customerRetentionRate: 0,
        },
        topProducts: [],
        salesByCategory: [],
        recentActivity: [],
      }
    : {
        overview: {
          totalViews: 2340,
          totalOrders: 128,
          totalRevenue: 15420,
          conversionRate: 5.47,
          averageOrderValue: 120.47,
          returningCustomers: 45,
        },
        monthly: [
          { month: "2024-01", views: 1200, orders: 65, revenue: 7800 },
          { month: "2024-02", views: 1500, orders: 85, revenue: 10200 },
          { month: "2024-03", views: 2340, orders: 128, revenue: 15420 },
        ],
        customerMetrics: {
          totalCustomers: 89,
          customerRetentionRate: 67.8,
        },
        topProducts: [
          {
            id: "1",
            name: "عطر الورد السوداني",
            views: 450,
            orders: 25,
            revenue: 11250,
          },
          {
            id: "2",
            name: "عسل السدر الطبيعي",
            views: 380,
            orders: 18,
            revenue: 7200,
          },
          {
            id: "3",
            name: "تمر السكري",
            views: 320,
            orders: 15,
            revenue: 4500,
          },
        ],
        salesByCategory: [
          { category: "عطور", orders: 45, revenue: 13500, percentage: 87.6 },
          { category: "أغذية", orders: 25, revenue: 7500, percentage: 48.7 },
          {
            category: "حرف يدوية",
            orders: 15,
            revenue: 4500,
            percentage: 29.2,
          },
        ],
        recentActivity: [
          {
            type: "order",
            description: "طلب جديد من أحمد محمد",
            timestamp: new Date().toISOString(),
            value: 450,
          },
          {
            type: "view",
            description: "زيارة جديدة للمتجر",
            timestamp: new Date().toISOString(),
          },
          {
            type: "review",
            description: "تقييم جديد للمنتج",
            timestamp: new Date().toISOString(),
          },
        ],
      };

  const formatCurrency = (amount: number) => `${amount.toLocaleString()} ر.س`;
  const getMonthName = (month: string) => {
    const months: Record<string, string> = {
      "2024-01": "يناير 2024",
      "2024-02": "فبراير 2024",
      "2024-03": "مارس 2024",
    };
    return months[month] || month;
  };

  const insights = isNewMerchant
    ? [
        "ابدأ بإضافة منتجاتك الأولى لجذب العملاء",
        "قم بتحسين وصف متجرك وإضافة صور جذابة",
        "شارك رابط متجرك مع الأصدقاء والعائلة",
      ]
    : [
        "أداء ممتاز هذا الشهر مع نمو في المبيعات",
        "معدل التحويل جيد، استمر في تحسين المنتجات",
        "العملاء المتكررون يشكلون نسبة جيدة من المبيعات",
      ];

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <div className="w-4 h-4" />;
  };

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  const handleExportCSV = () => {
    const csvData = exportToCSV(analytics);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `analytics-${Date.now()}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calculate growth for previous month comparison
  const currentMonth = analytics.monthly[analytics.monthly.length - 1];
  const previousMonth = analytics.monthly[analytics.monthly.length - 2];

  const viewsGrowth = previousMonth
    ? calculateGrowth(currentMonth?.views || 0, previousMonth.views)
    : 0;
  const ordersGrowth = previousMonth
    ? calculateGrowth(currentMonth?.orders || 0, previousMonth.orders)
    : 0;
  const revenueGrowth = previousMonth
    ? calculateGrowth(currentMonth?.revenue || 0, previousMonth.revenue)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/merchant/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">
                  إحصائيات المتجر
                </h1>
                <p className="text-gray-600 arabic">تحليل شامل لأداء متجرك</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                variant="outline"
                onClick={handleExportCSV}
                className="arabic"
              >
                <Download className="w-4 h-4 ml-2" />
                تصدير البيانات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Message for New Merchants */}
        {isNewMerchant && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 arabic">
                    تحليلاتك ستظهر هنا قريباً! 📊
                  </h2>
                  <p className="text-gray-700 mb-4 arabic">
                    مرحباً {user?.profile?.name}! بمجرد أن تبدأ في بيع منتجاتك،
                    ستحصل على تحليلات مفصلة لأداء متجرك ومبيعاتك هنا.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link to="/merchant/products/new">
                      <Button className="w-full arabic bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 ml-2" />
                        أضف منتجات
                      </Button>
                    </Link>
                    <Link to="/merchant/settings">
                      <Button variant="outline" className="w-full arabic">
                        إعداد المتجر
                      </Button>
                    </Link>
                    <Link to="/merchant/dashboard">
                      <Button variant="outline" className="w-full arabic">
                        العودة للوحة التحكم
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm arabic font-medium">
                    إجمالي المشاهدات
                  </p>
                  <p className="text-2xl font-bold text-blue-800">
                    {analytics.overview.totalViews.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(viewsGrowth)}
                    <span
                      className={`text-sm mr-1 ${getGrowthColor(viewsGrowth)}`}
                    >
                      {Math.abs(viewsGrowth).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <Eye className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm arabic font-medium">
                    إجمالي الطلبات
                  </p>
                  <p className="text-2xl font-bold text-green-800">
                    {analytics.overview.totalOrders}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(ordersGrowth)}
                    <span
                      className={`text-sm mr-1 ${getGrowthColor(ordersGrowth)}`}
                    >
                      {Math.abs(ordersGrowth).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm arabic font-medium">
                    إجمالي الإيرادات
                  </p>
                  <p className="text-2xl font-bold text-purple-800">
                    {formatCurrency(analytics.overview.totalRevenue)}
                  </p>
                  <div className="flex items-center mt-1">
                    {getGrowthIcon(revenueGrowth)}
                    <span
                      className={`text-sm mr-1 ${getGrowthColor(revenueGrowth)}`}
                    >
                      {Math.abs(revenueGrowth).toFixed(1)}%
                    </span>
                  </div>
                </div>
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-600 text-sm arabic font-medium">
                    معدل التحويل
                  </p>
                  <p className="text-2xl font-bold text-orange-800">
                    {analytics.overview.conversionRate.toFixed(2)}%
                  </p>
                  <p className="text-xs text-orange-600 arabic">
                    من المشاهدات للطلبات
                  </p>
                </div>
                <Target className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights and Key Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Insights */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center arabic">
                  <Award className="w-5 h-5 ml-2" />
                  رؤى ذكية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 space-x-reverse p-3 bg-blue-50 rounded-lg"
                    >
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <p className="text-blue-800 arabic text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Key Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <Activity className="w-5 h-5 ml-2" />
                مقاييس رئيسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm arabic">متوسط قيمة الطلب</span>
                <span className="font-bold">
                  {formatCurrency(analytics.overview.averageOrderValue)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm arabic">العملاء المتكررون</span>
                <span className="font-bold">
                  {analytics.overview.returningCustomers}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm arabic">معدل الاحتفاظ</span>
                <span className="font-bold">
                  {analytics.customerMetrics.customerRetentionRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm arabic">إجمالي العملاء</span>
                <span className="font-bold">
                  {analytics.customerMetrics.totalCustomers}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <LineChart className="w-5 h-5 ml-2" />
                الأداء الشهري
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.monthly.slice(-6).map((month) => (
                  <div
                    key={month.month}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium arabic">
                        {getMonthName(month.month)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {month.views} مشاهدة • {month.orders} طلب
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">
                        {formatCurrency(month.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <Award className="w-5 h-5 ml-2" />
                أفضل المنتجات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="flex items-center space-x-3 space-x-reverse p-3 border rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === 0
                          ? "bg-yellow-100 text-yellow-800"
                          : index === 1
                            ? "bg-gray-100 text-gray-800"
                            : "bg-orange-100 text-orange-800"
                      }`}
                    >
                      <span className="text-sm font-bold">#{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium arabic">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        {product.views} مشاهدة • {product.orders} طلب
                      </p>
                    </div>
                    <div className="text-left">
                      <p className="font-bold">
                        {formatCurrency(product.revenue)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sales by Category and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sales by Category */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <PieChart className="w-5 h-5 ml-2" />
                المبيعات حسب الفئة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.salesByCategory.map((category) => (
                  <div key={category.category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm arabic">
                        {category.category}
                      </span>
                      <span className="text-sm font-medium">
                        {category.percentage.toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${category.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>{category.orders} طلب</span>
                      <span>{formatCurrency(category.revenue)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <Activity className="w-5 h-5 ml-2" />
                النشاط الأخير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "order"
                          ? "bg-green-100 text-green-600"
                          : activity.type === "view"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {activity.type === "order" && (
                        <ShoppingCart className="w-4 h-4" />
                      )}
                      {activity.type === "view" && <Eye className="w-4 h-4" />}
                      {activity.type === "review" && (
                        <Award className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm arabic">{activity.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(activity.timestamp).toLocaleDateString(
                          "ar-SA",
                        )}{" "}
                        •
                        {new Date(activity.timestamp).toLocaleTimeString(
                          "ar-SA",
                          { hour: "2-digit", minute: "2-digit" },
                        )}
                      </p>
                    </div>
                    {activity.value && (
                      <div className="text-left">
                        <p className="font-bold text-sm">
                          {formatCurrency(activity.value)}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
