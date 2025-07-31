import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Search,
  Filter,
  ArrowLeft,
  Eye,
  Check,
  X,
  AlertTriangle,
  Calendar,
  MapPin,
  User,
  Package,
  TrendingUp,
  Phone,
  Mail,
  Star,
  Clock,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTheme } from "@/contexts/ThemeContext";

interface StoreData {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  status: "active" | "pending" | "suspended";
  category: string;
  location: string;
  products: number;
  orders: number;
  revenue: number;
  rating: number;
  reviews: number;
  joinDate: string;
  lastActive: string;
}

export default function AdminStores() {
  const { user } = useAuth();
  const { t, isRTL } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedStore, setSelectedStore] = useState<StoreData | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<{
    type: string;
    storeId: string;
    storeName: string;
  } | null>(null);

  // Mock store data with state management
  const [stores, setStores] = useState<StoreData[]>([
    {
      id: "store-001",
      name: "متجر الخير السوداني",
      owner: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "+966501234567",
      status: "active",
      category: "مواد غذائية",
      location: "الرياض، السعودية",
      products: 45,
      orders: 128,
      revenue: 15420,
      rating: 4.6,
      reviews: 89,
      joinDate: "2024-01-15",
      lastActive: "منذ ساعة",
    },
    {
      id: "store-002",
      name: "العطور السودانية الأصيلة",
      owner: "فاطمة عبدالله",
      email: "fatima@example.com",
      phone: "+966509876543",
      status: "pending",
      category: "عطور ومستحضرات",
      location: "جدة، السعودية",
      products: 23,
      orders: 67,
      revenue: 8900,
      rating: 4.8,
      reviews: 34,
      joinDate: "2024-02-20",
      lastActive: "منذ 3 ساعات",
    },
    {
      id: "store-003",
      name: "الحرف اليدوية السودانية",
      owner: "محمد علي",
      email: "mohamed@example.com",
      phone: "+966507654321",
      status: "suspended",
      category: "حرف يدوية",
      location: "الدمام، السعودية",
      products: 12,
      orders: 34,
      revenue: 2100,
      rating: 3.9,
      reviews: 15,
      joinDate: "2024-03-10",
      lastActive: "منذ يومين",
    },
    {
      id: "store-004",
      name: "الملابس التراثية السودانية",
      owner: "عائشة أحمد",
      email: "aisha@example.com",
      phone: "+966505555555",
      status: "active",
      category: "ملابس",
      location: "الخبر، السعودية",
      products: 67,
      orders: 234,
      revenue: 28750,
      rating: 4.7,
      reviews: 156,
      joinDate: "2023-12-01",
      lastActive: "منذ 30 دقيقة",
    },
  ]);

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === "all" || store.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط";
      case "pending":
        return "في الانتظار";
      case "suspended":
        return "معلق";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="w-4 h-4" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4" />;
      case "suspended":
        return <X className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // View store details
  const handleViewDetails = (store: StoreData) => {
    setSelectedStore(store);
    setIsDetailModalOpen(true);
  };

  // Approve store
  const handleApproveStore = (storeId: string) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? { ...store, status: "active" as const, lastActive: "منذ دقائق" }
          : store,
      ),
    );

    // Show success message
    alert("تم اعتماد المتجر بنجاح! ✅");
  };

  // Suspend store
  const handleSuspendStore = (storeId: string) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? { ...store, status: "suspended" as const }
          : store,
      ),
    );

    // Show success message
    alert("تم تعليق المتجر بنجاح! ⚠️");
  };

  // Reactivate store
  const handleReactivateStore = (storeId: string) => {
    setStores((prevStores) =>
      prevStores.map((store) =>
        store.id === storeId
          ? { ...store, status: "active" as const, lastActive: "منذ دقائق" }
          : store,
      ),
    );

    // Show success message
    alert("تم إعادة تفعيل المتجر بنجاح! ✅");
  };

  // Confirm action modal
  const openConfirmModal = (
    type: string,
    storeId: string,
    storeName: string,
  ) => {
    setConfirmAction({ type, storeId, storeName });
    setIsConfirmModalOpen(true);
  };

  const executeAction = () => {
    if (!confirmAction) return;

    switch (confirmAction.type) {
      case "approve":
        handleApproveStore(confirmAction.storeId);
        break;
      case "suspend":
        handleSuspendStore(confirmAction.storeId);
        break;
      case "reactivate":
        handleReactivateStore(confirmAction.storeId);
        break;
    }

    setIsConfirmModalOpen(false);
    setConfirmAction(null);
  };

  const totalStores = stores.length;
  const activeStores = stores.filter((s) => s.status === "active").length;
  const pendingStores = stores.filter((s) => s.status === "pending").length;
  const suspendedStores = stores.filter((s) => s.status === "suspended").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex justify-between items-center py-6 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
          >
            <div
              className={`flex items-center space-x-4 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
            >
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  {t("common.back")}
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">
                  {t("stores.title")}
                </h1>
                <p className="text-gray-600 arabic">
                  {totalStores} {t("stores.subtitle")}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className="arabic">
              مدير أعلى
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Store className="w-8 h-8 text-blue-600" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-blue-800">
                    {totalStores}
                  </p>
                  <p className="text-blue-600 text-sm arabic">إجمالي المتاجر</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Check className="w-8 h-8 text-green-600" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-green-800">
                    {activeStores}
                  </p>
                  <p className="text-green-600 text-sm arabic">متاجر نشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-yellow-800">
                    {pendingStores}
                  </p>
                  <p className="text-yellow-600 text-sm arabic">في الانتظار</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center">
                <X className="w-8 h-8 text-red-600" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-red-800">
                    {suspendedStores}
                  </p>
                  <p className="text-red-600 text-sm arabic">معلقة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search
                  className={`absolute top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 ${isRTL ? "right-3" : "left-3"}`}
                />
                <Input
                  placeholder="البحث في المتاجر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${isRTL ? "pr-10 text-right" : "pl-10"} arabic`}
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 arabic text-right"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="pending">في الانتظار</option>
                <option value="suspended">معلق</option>
              </select>

              <div
                className={`flex items-center space-x-2 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 arabic">
                  {filteredStores.length} من {totalStores} متجر
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stores List */}
        <div className="grid grid-cols-1 gap-6">
          {filteredStores.map((store) => (
            <Card
              key={store.id}
              className="hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Store Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 arabic mb-2">
                          {store.name}
                        </h3>
                        <div
                          className={`flex items-center space-x-4 space-x-reverse text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <User className="w-4 h-4" />
                            <span className="arabic">{store.owner}</span>
                          </div>
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <MapPin className="w-4 h-4" />
                            <span className="arabic">{store.location}</span>
                          </div>
                        </div>
                        <div
                          className={`flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mt-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <Mail className="w-4 h-4" />
                            <span>{store.email}</span>
                          </div>
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <Phone className="w-4 h-4" />
                            <span>{store.phone}</span>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`${getStatusColor(store.status)} border animate-pulse`}
                      >
                        <div
                          className={`flex items-center space-x-1 space-x-reverse arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          {getStatusIcon(store.status)}
                          <span>{getStatusText(store.status)}</span>
                        </div>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 arabic">الفئة: </span>
                        <span className="font-medium arabic">
                          {store.category}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 arabic">
                          تاريخ الانضمام:{" "}
                        </span>
                        <span className="font-medium">{store.joinDate}</span>
                      </div>
                      <div>
                        <span className="text-gray-600 arabic">آخر نشاط: </span>
                        <span className="font-medium arabic">
                          {store.lastActive}
                        </span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <span className="text-gray-600 arabic">التقييم: </span>
                        <div
                          className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{store.rating}</span>
                          <span className="text-gray-500">
                            ({store.reviews})
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2 hover:bg-blue-200 transition-colors">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {store.products}
                      </div>
                      <div className="text-sm text-gray-600 arabic">منتج</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2 hover:bg-green-200 transition-colors">
                        <Store className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        {store.orders}
                      </div>
                      <div className="text-sm text-gray-600 arabic">طلب</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2 hover:bg-purple-200 transition-colors">
                        <DollarSign className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">
                        ${store.revenue}
                      </div>
                      <div className="text-sm text-gray-600 arabic">إيراد</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="arabic hover:bg-blue-50 hover:border-blue-300 transition-colors"
                      onClick={() => handleViewDetails(store)}
                    >
                      <Eye className="w-4 h-4 ml-2" />
                      عرض التفاصيل
                    </Button>

                    {store.status === "pending" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          openConfirmModal("approve", store.id, store.name)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white arabic transition-colors"
                      >
                        <Check className="w-4 h-4 ml-2" />
                        اعتماد المتجر
                      </Button>
                    )}

                    {store.status === "active" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() =>
                          openConfirmModal("suspend", store.id, store.name)
                        }
                        className="arabic hover:bg-red-700 transition-colors"
                      >
                        <X className="w-4 h-4 ml-2" />
                        تعليق المتجر
                      </Button>
                    )}

                    {store.status === "suspended" && (
                      <Button
                        size="sm"
                        onClick={() =>
                          openConfirmModal("reactivate", store.id, store.name)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white arabic transition-colors"
                      >
                        <Check className="w-4 h-4 ml-2" />
                        إعادة تفعيل
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStores.length === 0 && (
          <div className="text-center py-12">
            <Store className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2 arabic">
              لا توجد متاجر
            </h3>
            <p className="text-gray-600 arabic">
              لم يتم العثور على متاجر تطابق معايير البحث
            </p>
          </div>
        )}
      </div>

      {/* Store Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="arabic text-right">
              تفاصيل المتجر
            </DialogTitle>
            <DialogDescription className="arabic text-right">
              معلومات شامل�� عن المتجر ونشاطه
            </DialogDescription>
          </DialogHeader>
          {selectedStore && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="arabic text-right">
                    المعلومات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-semibold arabic">اسم المتجر: </span>
                    <span className="arabic">{selectedStore.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">المالك: </span>
                    <span className="arabic">{selectedStore.owner}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">
                      البريد الإلكتروني:{" "}
                    </span>
                    <span>{selectedStore.email}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">رقم الهاتف: </span>
                    <span>{selectedStore.phone}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">الموقع: </span>
                    <span className="arabic">{selectedStore.location}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">الفئة: </span>
                    <span className="arabic">{selectedStore.category}</span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="font-semibold arabic">الحالة: </span>
                    <Badge className={getStatusColor(selectedStore.status)}>
                      {getStatusText(selectedStore.status)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="arabic text-right">
                    إحصائيات الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">إجمالي المنتجات:</span>
                    <span className="font-bold text-blue-600">
                      {selectedStore.products}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">إجمالي الطلبات:</span>
                    <span className="font-bold text-green-600">
                      {selectedStore.orders}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">الإيرادات:</span>
                    <span className="font-bold text-purple-600">
                      ${selectedStore.revenue}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">التقييم:</span>
                    <div
                      className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold">{selectedStore.rating}</span>
                      <span className="text-gray-500">
                        ({selectedStore.reviews} تقييم)
                      </span>
                    </div>
                  </div>
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">تاريخ الانضمام:</span>
                    <span className="font-medium">
                      {selectedStore.joinDate}
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">آخر نشاط:</span>
                    <span className="font-medium arabic">
                      {selectedStore.lastActive}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDetailModalOpen(false)}
              className="arabic"
            >
              إغلاق
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={isConfirmModalOpen} onOpenChange={setIsConfirmModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="arabic text-right">
              تأكيد الإجراء
            </DialogTitle>
            <DialogDescription className="arabic text-right">
              {confirmAction?.type === "approve" &&
                "هل أنت متأكد من اعتماد هذا المتجر؟"}
              {confirmAction?.type === "suspend" &&
                "هل أنت متأكد من تعليق هذا المتجر؟"}
              {confirmAction?.type === "reactivate" &&
                "هل أنت متأكد من إعادة تفعيل هذا المتجر؟"}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-center arabic">
              <strong>{confirmAction?.storeName}</strong>
            </p>
          </div>
          <DialogFooter
            className={`${isRTL ? "flex-row-reverse" : "flex-row"}`}
          >
            <Button
              variant="outline"
              onClick={() => setIsConfirmModalOpen(false)}
              className="arabic"
            >
              إلغاء
            </Button>
            <Button
              onClick={executeAction}
              className={`arabic ${
                confirmAction?.type === "suspend"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              } text-white`}
            >
              {confirmAction?.type === "approve" && "اعتماد"}
              {confirmAction?.type === "suspend" && "تعليق"}
              {confirmAction?.type === "reactivate" && "إعادة تفعيل"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
