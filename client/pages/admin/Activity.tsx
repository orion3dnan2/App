import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  Activity,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  Store,
  Package,
  Star,
  MessageSquare,
  Shield,
  Eye,
  AlertTriangle
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  target?: string;
  type: 'store' | 'product' | 'review' | 'support' | 'user' | 'system';
  time: string;
  details: string;
  status: 'success' | 'warning' | 'error';
}

export default function AdminActivity() {
  const { t, isRTL } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Mock activity data
  const [activities] = useState<ActivityLog[]>([
    {
      id: "act-001",
      action: "تسجيل متجر جديد",
      user: "أحمد محمد",
      target: "متجر الخير السوداني",
      type: "store",
      time: "منذ 15 دقيقة",
      details: "تم تسجيل متجر جديد وهو في انتظار المراجعة",
      status: "success"
    },
    {
      id: "act-002", 
      action: "طلب اعتماد منتج",
      user: "فاطمة عبدالله",
      target: "عطر الورد السوداني",
      type: "product",
      time: "منذ 30 دقيقة",
      details: "تم رفع منتج جديد للمراجعة والاعتماد",
      status: "success"
    },
    {
      id: "act-003",
      action: "مراجعة سلبية",
      user: "محمد علي",
      target: "متجر الحرف اليدوية",
      type: "review",
      time: "منذ ساعة",
      details: "تم تقديم مراجعة سلبية تحتاج للمتابعة",
      status: "warning"
    },
    {
      id: "act-004",
      action: "طلب دعم فني",
      user: "عائشة أحمد",
      target: "مشكلة في الدفع",
      type: "support", 
      time: "منذ ساعتين",
      details: "تم تقديم طلب دعم فني لمشكلة في نظام الدفع",
      status: "warning"
    },
    {
      id: "act-005",
      action: "تعليق حساب مستخدم",
      user: "النظام",
      target: "مستخدم مشبوه",
      type: "user",
      time: "منذ 3 ساعات",
      details: "تم تعليق حساب مستخدم بسبب نشاط مشبوه",
      status: "error"
    },
    {
      id: "act-006",
      action: "نسخ احتياطي للنظام",
      user: "النظام",
      type: "system",
      time: "منذ 6 ساعات",
      details: "تم إنشاء نسخة احتياطية للنظام بنجاح",
      status: "success"
    },
    {
      id: "act-007",
      action: "اعتماد متجر",
      user: "المدير الأعلى",
      target: "متجر الملابس التراثية",
      type: "store",
      time: "منذ يوم",
      details: "تم اعتماد المتجر وتفعيله للعمل",
      status: "success"
    },
    {
      id: "act-008",
      action: "محاولة دخول فاشلة",
      user: "غير معروف",
      type: "system",
      time: "منذ يوم",
      details: "محاولة دخول غير مصرح بها للوحة الإدارة",
      status: "error"
    }
  ]);

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (activity.target && activity.target.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || activity.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'store': return <Store className="w-4 h-4" />;
      case 'product': return <Package className="w-4 h-4" />;
      case 'review': return <Star className="w-4 h-4" />;
      case 'support': return <MessageSquare className="w-4 h-4" />;
      case 'user': return <User className="w-4 h-4" />;
      case 'system': return <Shield className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'store': return 'bg-blue-100 text-blue-600';
      case 'product': return 'bg-green-100 text-green-600';
      case 'review': return 'bg-yellow-100 text-yellow-600';
      case 'support': return 'bg-purple-100 text-purple-600';
      case 'user': return 'bg-orange-100 text-orange-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <span className="text-green-600">✓</span>;
      case 'warning': return <AlertTriangle className="w-3 h-3 text-yellow-600" />;
      case 'error': return <span className="text-red-600">✗</span>;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'success': return 'نجح';
      case 'warning': return 'تحذير';
      case 'error': return 'خطأ';
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'store': return 'متجر';
      case 'product': return 'منتج';
      case 'review': return 'مراجعة';
      case 'support': return 'دعم';
      case 'user': return 'مستخدم';
      case 'system': return 'نظام';
      default: return type;
    }
  };

  const totalActivities = activities.length;
  const successCount = activities.filter(a => a.status === 'success').length;
  const warningCount = activities.filter(a => a.status === 'warning').length;
  const errorCount = activities.filter(a => a.status === 'error').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex justify-between items-center py-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`flex items-center space-x-4 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  {t('common.back')}
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">سجل الأنشطة</h1>
                <p className="text-gray-600 arabic">{totalActivities} نشاط مسجل</p>
              </div>
            </div>
            <div className={`flex items-center space-x-2 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Badge variant="secondary" className="arabic">{t('dashboard.super_admin')}</Badge>
              <Button variant="outline" size="sm">
                <Eye className="w-4 h-4 ml-2" />
                تصدير التقرير
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-blue-600" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-blue-800">{totalActivities}</p>
                  <p className="text-blue-600 text-sm arabic">إجمالي الأنشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <span className="text-2xl text-green-600">✓</span>
                <div className="mr-4">
                  <p className="text-2xl font-bold text-green-800">{successCount}</p>
                  <p className="text-green-600 text-sm arabic">عمليات ناجحة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-yellow-800">{warningCount}</p>
                  <p className="text-yellow-600 text-sm arabic">تحذيرات</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center">
                <span className="text-2xl text-red-600">✗</span>
                <div className="mr-4">
                  <p className="text-2xl font-bold text-red-800">{errorCount}</p>
                  <p className="text-red-600 text-sm arabic">أخطاء</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? 'right-3' : 'left-3'}`} />
                <Input
                  placeholder="البحث في الأنشطة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? 'pr-10 text-right' : 'pl-10'} arabic`}
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 arabic text-right"
              >
                <option value="all">جميع الأنواع</option>
                <option value="store">متاجر</option>
                <option value="product">منتجات</option>
                <option value="review">مراجعات</option>
                <option value="support">دعم فني</option>
                <option value="user">مستخدمين</option>
                <option value="system">نظام</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 arabic text-right"
              >
                <option value="all">جميع الحالات</option>
                <option value="success">نجح</option>
                <option value="warning">تحذير</option>
                <option value="error">خطأ</option>
              </select>

              <div className={`flex items-center space-x-2 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 arabic">
                  {filteredActivities.length} من {totalActivities} نشاط
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activity List */}
        <div className="space-y-4">
          {filteredActivities.map((activity) => (
            <Card key={activity.id} className="hover:shadow-lg transition-all duration-200 hover:scale-[1.01]">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className={`flex items-start space-x-4 space-x-reverse flex-1 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Type Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getTypeColor(activity.type)}`}>
                      {getTypeIcon(activity.type)}
                    </div>

                    {/* Activity Details */}
                    <div className="flex-1">
                      <div className={`flex items-center space-x-2 space-x-reverse mb-2 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <h3 className="font-semibold text-gray-900 arabic">{activity.action}</h3>
                        <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                          <div className={`flex items-center space-x-1 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            {getStatusIcon(activity.status)}
                            <span className="arabic">{getStatusText(activity.status)}</span>
                          </div>
                        </Badge>
                      </div>

                      <p className="text-sm text-gray-600 arabic mb-2">{activity.details}</p>

                      <div className={`flex items-center space-x-4 space-x-reverse text-xs text-gray-500 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`flex items-center space-x-1 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          <User className="w-3 h-3" />
                          <span className="arabic">{activity.user}</span>
                        </div>
                        {activity.target && (
                          <div className={`flex items-center space-x-1 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                            <span className="arabic">الهدف:</span>
                            <span className="arabic font-medium">{activity.target}</span>
                          </div>
                        )}
                        <div className={`flex items-center space-x-1 space-x-reverse ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
                          <Clock className="w-3 h-3" />
                          <span className="arabic">{activity.time}</span>
                        </div>
                        <Badge variant="outline" className="text-xs arabic">
                          {getTypeText(activity.type)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredActivities.length === 0 && (
          <div className="text-center py-12">
            <Activity className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 arabic">لا توجد أنشطة</h3>
            <p className="text-gray-600 arabic">لم يتم العثور على أنشطة تطابق معايير البحث</p>
          </div>
        )}

        {/* Load More Button */}
        {filteredActivities.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="arabic">
              تحميل المزيد من الأنشطة
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
