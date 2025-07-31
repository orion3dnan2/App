import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Settings,
  Users,
  Store,
  Package,
  TrendingUp,
  Shield,
  Palette,
  Globe,
  Eye,
  Activity,
  MessageSquare,
  Star,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats] = useState({
    totalUsers: 1247,
    totalMerchants: 89,
    totalProducts: 3456,
    totalOrders: 892,
    monthlyRevenue: 125670,
    activeStores: 67,
    pendingApprovals: 12,
    newRegistrations: 23,
  });

  const quickActions = [
    {
      title: "إعدادات التطبيق",
      description: "إدارة الإعدادات العامة والتكوينات الأساسية",
      icon: Settings,
      href: "/admin/settings",
      color: "from-blue-500 to-blue-600",
      urgent: false,
    },
    {
      title: "إدارة المستخدمين",
      description: "إضافة وتعديل وحذف المستخدمين والأذونات",
      icon: Users,
      href: "/admin/users",
      color: "from-green-500 to-green-600",
      urgent: false,
    },
    {
      title: "إدارة المتاجر",
      description: "مراجعة واعتماد المتاجر الجديدة",
      icon: Store,
      href: "/admin/stores",
      color: "from-purple-500 to-purple-600",
      urgent: stats.pendingApprovals > 0,
    },
    {
      title: "المظهر والثيمات",
      description: "تخصيص ألوان وثيمات الموقع",
      icon: Palette,
      href: "/admin/appearance",
      color: "from-pink-500 to-pink-600",
      urgent: false,
    },
    {
      title: "إعدادات النظام",
      description: "إعدادات الأمان والأذونات المتقدمة",
      icon: Shield,
      href: "/admin/system",
      color: "from-red-500 to-red-600",
      urgent: false,
    },
    {
      title: "إدارة المحتوى",
      description: "إدارة الصفحات والمحتوى الثابت",
      icon: Globe,
      href: "/admin/content",
      color: "from-orange-500 to-orange-600",
      urgent: false,
    },
  ];

  const recentActivity = [
    {
      action: "تسجيل متجر جديد",
      user: "أحمد محمد",
      time: "منذ 15 دقيقة",
      type: "store",
    },
    {
      action: "طلب اعتماد منتج",
      user: "فاطمة عبدالله",
      time: "منذ 30 دقيقة",
      type: "product",
    },
    {
      action: "مراجعة سلبية",
      user: "محمد علي",
      time: "منذ ساعة",
      type: "review",
    },
    {
      action: "طلب دعم فني",
      user: "عائشة أحمد",
      time: "منذ ساعتين",
      type: "support",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white arabic">
                  لوحة التحكم الإدارية
                </h1>
                <p className="text-gray-600 dark:text-gray-300 arabic">
                  أهلاً وسهلاً {user?.profile.name || "المدير"}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Badge variant="secondary" className="arabic">
                مدير عام
              </Badge>
              <Link to="/">
                <Button variant="outline" size="sm" className="arabic">
                  <Eye className="w-4 h-4 ml-2" />
                  عرض الموقع
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">
                    {stats.totalUsers.toLocaleString('ar-SA')}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm arabic">
                    إجمالي المستخدمين
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                    {stats.totalMerchants.toLocaleString('ar-SA')}
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm arabic">
                    المتاجر المسجلة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Package className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-purple-800 dark:text-purple-200">
                    {stats.totalProducts.toLocaleString('ar-SA')}
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 text-sm arabic">
                    إجمالي المنتجات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-orange-800 dark:text-orange-200">
                    {stats.monthlyRevenue.toLocaleString('ar-SA')} ج.س
                  </p>
                  <p className="text-orange-600 dark:text-orange-400 text-sm arabic">
                    الإيرادات الشهرية
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center arabic text-gray-900 dark:text-white">
              <Activity className="w-5 h-5 ml-2" />
              الإجراءات السريعة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.href}>
                  <Card className="hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-200 hover:scale-105 group cursor-pointer dark:bg-gray-700 dark:border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div
                            className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <action.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white arabic flex items-center">
                              {action.title}
                              {action.urgent && (
                                <Badge
                                  variant="destructive"
                                  className="mr-2 text-xs"
                                >
                                  عاجل
                                </Badge>
                              )}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 arabic mt-1">
                              {action.description}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center arabic text-gray-900 dark:text-white">
                <MessageSquare className="w-5 h-5 ml-2" />
                الأنشطة الحديثة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 space-x-reverse p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activity.type === "store"
                          ? "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"
                          : activity.type === "product"
                            ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                            : activity.type === "review"
                              ? "bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400"
                              : "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-600 dark:text-yellow-400"
                      }`}
                    >
                      {activity.type === "store" && (
                        <Store className="w-4 h-4" />
                      )}
                      {activity.type === "product" && (
                        <Package className="w-4 h-4" />
                      )}
                      {activity.type === "review" && (
                        <Star className="w-4 h-4" />
                      )}
                      {activity.type === "support" && (
                        <MessageSquare className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white arabic">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 arabic">
                        بواسطة {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t dark:border-gray-600">
                <Link to="/admin/activity">
                  <Button variant="outline" size="sm" className="w-full arabic">
                    عرض جميع الأنشطة
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center arabic text-gray-900 dark:text-white">
                <BarChart3 className="w-5 h-5 ml-2" />
                إحصائيات سريعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-sm font-medium text-blue-900 dark:text-blue-200 arabic">
                    المتاجر ��لنشطة
                  </span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {stats.activeStores.toLocaleString('ar-SA')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <span className="text-sm font-medium text-yellow-900 dark:text-yellow-200 arabic">
                    طلبات الاعتماد
                  </span>
                  <span className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                    {stats.pendingApprovals.toLocaleString('ar-SA')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-sm font-medium text-green-900 dark:text-green-200 arabic">
                    تسجيلات جديدة
                  </span>
                  <span className="text-lg font-bold text-green-600 dark:text-green-400">
                    {stats.newRegistrations.toLocaleString('ar-SA')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <span className="text-sm font-medium text-purple-900 dark:text-purple-200 arabic">
                    إجمالي الطلبات
                  </span>
                  <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    {stats.totalOrders.toLocaleString('ar-SA')}
                  </span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t dark:border-gray-600">
                <Link to="/admin/analytics">
                  <Button variant="outline" size="sm" className="w-full arabic">
                    عرض التقارير التفصيلية
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
