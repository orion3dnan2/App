import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Search,
  Filter,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Eye,
  Download,
  Phone,
  MapPin,
  User,
  Calendar,
  DollarSign,
  MoreHorizontal,
  Edit,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Sparkles,
  Plus,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  status:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";
  total: number;
  orderDate: string;
  deliveryDate?: string;
  items: OrderItem[];
  notes?: string;
  trackingNumber?: string;
}

export default function MerchantOrders() {
  const { t, isRTL } = useTheme();
  const { user } = useAuth();
  const [isNewMerchant, setIsNewMerchant] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // تحديد إذا كان التاجر جديد
  useEffect(() => {
    if (user?.createdAt) {
      const accountAge = Date.now() - new Date(user.createdAt).getTime();
      const daysSinceCreation = accountAge / (1000 * 60 * 60 * 24);
      setIsNewMerchant(daysSinceCreation < 7);
    }
  }, [user]);

  // Mock orders data - فارغة للتجار الجدد
  const [orders, setOrders] = useState<Order[]>(
    isNewMerchant
      ? []
      : [
          {
            id: "ORD-001",
            customerName: "أحمد محمد",
            customerPhone: "+966501234567",
            customerAddress: "الرياض، حي النرجس، شارع الملك فهد",
            status: "pending",
            total: 850,
            orderDate: "2024-01-20",
            items: [
              {
                id: "1",
                name: "عطر الورد السوداني",
                price: 450,
                quantity: 1,
                image: "/placeholder.svg",
              },
              {
                id: "2",
                name: "عسل السدر الطبيعي",
                price: 400,
                quantity: 1,
                image: "/placeholder.svg",
              },
            ],
            notes: "يرجى التوصيل في المساء",
          },
          {
            id: "ORD-002",
            customerName: "فاطمة عبدالله",
            customerPhone: "+966509876543",
            customerAddress: "جدة، حي الزهراء، شارع فلسطين",
            status: "confirmed",
            total: 1200,
            orderDate: "2024-01-19",
            deliveryDate: "2024-01-22",
            items: [
              {
                id: "3",
                name: "تمر السكري الفاخر",
                price: 300,
                quantity: 2,
                image: "/placeholder.svg",
              },
              {
                id: "4",
                name: "حناء سودانية أصلية",
                price: 150,
                quantity: 4,
                image: "/placeholder.svg",
              },
            ],
          },
          {
            id: "ORD-003",
            customerName: "محمد علي",
            customerPhone: "+966507654321",
            customerAddress: "الدمام، حي الفيصلية، شارع الأمير سلطان",
            status: "processing",
            total: 675,
            orderDate: "2024-01-18",
            trackingNumber: "TRK-789456123",
            items: [
              {
                id: "5",
                name: "زيت السمسم السوداني",
                price: 275,
                quantity: 1,
                image: "/placeholder.svg",
              },
              {
                id: "6",
                name: "كركديه سوداني مطحون",
                price: 200,
                quantity: 2,
                image: "/placeholder.svg",
              },
            ],
          },
          {
            id: "ORD-004",
            customerName: "عائشة أحمد",
            customerPhone: "+966505555555",
            customerAddress: "الخبر، حي العليا، شارع الكورنيش",
            status: "shipped",
            total: 950,
            orderDate: "2024-01-17",
            deliveryDate: "2024-01-20",
            trackingNumber: "TRK-456789012",
            items: [
              {
                id: "7",
                name: "بخور اللبان السوداني",
                price: 350,
                quantity: 1,
                image: "/placeholder.svg",
              },
              {
                id: "8",
                name: "قماش سوداني تقليدي",
                price: 600,
                quantity: 1,
                image: "/placeholder.svg",
              },
            ],
          },
          {
            id: "ORD-005",
            customerName: "خالد حسن",
            customerPhone: "+966502222222",
            customerAddress: "مكة المكرمة، حي العزيزية، شارع إبراهيم",
            status: "delivered",
            total: 480,
            orderDate: "2024-01-15",
            deliveryDate: "2024-01-18",
            items: [
              {
                id: "9",
                name: "شاي كشاري سوداني",
                price: 180,
                quantity: 2,
                image: "/placeholder.svg",
              },
              {
                id: "10",
                name: "أكواب فخارية",
                price: 120,
                quantity: 1,
                image: "/placeholder.svg",
              },
            ],
          },
          {
            id: "ORD-006",
            customerName: "نورا السليم",
            customerPhone: "+966503333333",
            customerAddress: "المدينة المنورة، حي قباء، شارع سلمان الفارسي",
            status: "cancelled",
            total: 320,
            orderDate: "2024-01-14",
            items: [
              {
                id: "11",
                name: "زبدة الشيا السو��انية",
                price: 320,
                quantity: 1,
                image: "/placeholder.svg",
              },
            ],
            notes: "ألغى العميل الطلب لأسباب شخصية",
          },
        ],
  );

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery);
    const matchesStatus =
      selectedStatus === "all" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "processing":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "shipped":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "في الانتظار";
      case "confirmed":
        return "مؤكد";
      case "processing":
        return "قيد التحضير";
      case "shipped":
        return "تم الشحن";
      case "delivered":
        return "تم التسليم";
      case "cancelled":
        return "ملغى";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />;
      case "processing":
        return <RefreshCw className="w-4 h-4" />;
      case "shipped":
        return <Truck className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              trackingNumber:
                newStatus === "shipped"
                  ? `TRK-${Date.now()}`
                  : order.trackingNumber,
            }
          : order,
      ),
    );
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;
  const confirmedOrders = orders.filter((o) => o.status === "confirmed").length;
  const processingOrders = orders.filter(
    (o) => o.status === "processing",
  ).length;
  const shippedOrders = orders.filter((o) => o.status === "shipped").length;
  const deliveredOrders = orders.filter((o) => o.status === "delivered").length;
  const totalRevenue = orders
    .filter((o) => o.status === "delivered")
    .reduce((sum, order) => sum + order.total, 0);

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
              <Link to="/merchant/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  {t("common.back")}
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">
                  إدارة الطلبات
                </h1>
                <p className="text-gray-600 arabic">{totalOrders} طلب إجمالي</p>
              </div>
            </div>
            <div
              className={`flex items-center space-x-2 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
            >
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 ml-2" />
                تصدير البيانات
              </Button>
              <Badge variant="secondary" className="arabic">
                متجر
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-blue-800">{totalOrders}</p>
                <p className="text-blue-600 text-xs arabic">إجمالي الطلبات</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-yellow-800">
                  {pendingOrders}
                </p>
                <p className="text-yellow-600 text-xs arabic">في الانتظار</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-blue-800">
                  {confirmedOrders}
                </p>
                <p className="text-blue-600 text-xs arabic">مؤكدة</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <RefreshCw className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-purple-800">
                  {processingOrders}
                </p>
                <p className="text-purple-600 text-xs arabic">قيد التحضير</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <Truck className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-orange-800">
                  {shippedOrders}
                </p>
                <p className="text-orange-600 text-xs arabic">مشحونة</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-xl font-bold text-green-800">
                  {deliveredOrders}
                </p>
                <p className="text-green-600 text-xs arabic">مُسلمة</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-lg font-bold text-emerald-800">
                  {totalRevenue} ر.س
                </p>
                <p className="text-emerald-600 text-xs arabic">الإيرادات</p>
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
                  placeholder="البحث في الطلبات (رقم الطلب، اسم العميل، رقم الهاتف)..."
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
                <option value="pending">في الانتظار</option>
                <option value="confirmed">مؤكد</option>
                <option value="processing">قيد التحضير</option>
                <option value="shipped">تم الشحن</option>
                <option value="delivered">تم التسليم</option>
                <option value="cancelled">ملغى</option>
              </select>

              <div
                className={`flex items-center space-x-2 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 arabic">
                  {filteredOrders.length} من {totalOrders} طلب
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card
              key={order.id}
              className="hover:shadow-xl transition-all duration-300 hover:scale-[1.01]"
            >
              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* Order Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div
                          className={`flex items-center space-x-2 space-x-reverse mb-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <h3 className="text-lg font-bold text-gray-900 arabic">
                            {order.id}
                          </h3>
                          <Badge
                            className={`${getStatusColor(order.status)} border`}
                          >
                            <div
                              className={`flex items-center space-x-1 space-x-reverse arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                            >
                              {getStatusIcon(order.status)}
                              <span>{getStatusText(order.status)}</span>
                            </div>
                          </Badge>
                        </div>
                        <div
                          className={`flex items-center space-x-4 space-x-reverse text-sm text-gray-600 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <User className="w-4 h-4" />
                            <span className="arabic">{order.customerName}</span>
                          </div>
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <Phone className="w-4 h-4" />
                            <span>{order.customerPhone}</span>
                          </div>
                        </div>
                        <div
                          className={`flex items-center space-x-1 space-x-reverse text-sm text-gray-600 mt-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <MapPin className="w-4 h-4" />
                          <span className="arabic">
                            {order.customerAddress}
                          </span>
                        </div>
                        <div
                          className={`flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mt-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div
                            className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <Calendar className="w-4 h-4" />
                            <span className="arabic">تاريخ الطلب:</span>
                            <span>{order.orderDate}</span>
                          </div>
                          {order.trackingNumber && (
                            <div
                              className={`flex items-center space-x-1 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                            >
                              <Truck className="w-4 h-4" />
                              <span className="arabic">رقم التتبع:</span>
                              <span className="font-mono">
                                {order.trackingNumber}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 arabic">
                        المنتجات ({order.items.length})
                      </h4>
                      <div className="space-y-1">
                        {order.items.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className={`flex items-center space-x-2 space-x-reverse text-sm ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <Package className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="arabic flex-1">{item.name}</span>
                            <span className="text-gray-600">
                              {item.quantity}x
                            </span>
                            <span className="font-medium">
                              {item.price} ر.س
                            </span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <div className="text-sm text-gray-500 arabic">
                            و {order.items.length - 2} منتج آخر...
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Order Total */}
                  <div className="text-center">
                    <div className="bg-green-50 rounded-lg p-4 mb-4">
                      <div className="text-2xl font-bold text-green-800">
                        {order.total} ر.س
                      </div>
                      <div className="text-sm text-green-600 arabic">
                        إجمالي الطلب
                      </div>
                    </div>
                    {order.deliveryDate && (
                      <div className="text-sm text-gray-600 arabic">
                        <div className="flex items-center justify-center space-x-1 space-x-reverse">
                          <Calendar className="w-4 h-4" />
                          <span>موعد التسليم:</span>
                        </div>
                        <div className="font-medium mt-1">
                          {order.deliveryDate}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewOrderDetails(order)}
                      className="arabic hover:bg-blue-50 hover:border-blue-300 transition-colors"
                    >
                      <Eye className="w-4 h-4 ml-2" />
                      عرض التفاصيل
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="arabic">
                          <MoreHorizontal className="w-4 h-4 ml-2" />
                          إجراءات
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align={isRTL ? "start" : "end"}
                        className="w-48"
                      >
                        {order.status === "pending" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "confirmed")
                            }
                          >
                            <CheckCircle className="w-4 h-4 ml-2" />
                            تأكيد الطلب
                          </DropdownMenuItem>
                        )}
                        {order.status === "confirmed" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "processing")
                            }
                          >
                            <RefreshCw className="w-4 h-4 ml-2" />
                            بدء التحضير
                          </DropdownMenuItem>
                        )}
                        {order.status === "processing" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "shipped")
                            }
                          >
                            <Truck className="w-4 h-4 ml-2" />
                            تأكيد الشحن
                          </DropdownMenuItem>
                        )}
                        {order.status === "shipped" && (
                          <DropdownMenuItem
                            onClick={() =>
                              updateOrderStatus(order.id, "delivered")
                            }
                          >
                            <CheckCircle className="w-4 h-4 ml-2" />
                            تأكيد التسليم
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Download className="w-4 h-4 ml-2" />
                          طباعة الفاتورة
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Phone className="w-4 h-4 ml-2" />
                          اتصال بالعميل
                        </DropdownMenuItem>
                        {["pending", "confirmed"].includes(order.status) && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                updateOrderStatus(order.id, "cancelled")
                              }
                              className="text-red-600"
                            >
                              <XCircle className="w-4 h-4 ml-2" />
                              إلغاء الطلب
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            {isNewMerchant ? (
              <Card className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 arabic">
                    في انتظار طلباتك الأولى! 📦
                  </h3>
                  <p className="text-gray-700 mb-6 arabic">
                    مرحباً {user?.profile?.name}! عندما يبدأ العملاء في طلب
                    منتجاتك، ستظهر جميع الطلبات هنا ويمكنك إدارتها بسهولة.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/merchant/products/new">
                      <Button className="arabic bg-blue-600 hover:bg-blue-700">
                        <Plus className="w-4 h-4 ml-2" />
                        أضف منتجات جديدة
                      </Button>
                    </Link>
                    <Link to="/merchant/settings">
                      <Button variant="outline" className="arabic">
                        إعداد بيانات المتجر
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2 arabic">
                  لا توجد طلبات
                </h3>
                <p className="text-gray-600 arabic">
                  لم يتم العثور على طلبات تطابق معايير البحث
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="arabic text-right">
              تفاصيل الطلب {selectedOrder?.id}
            </DialogTitle>
            <DialogDescription className="arabic text-right">
              معلومات شاملة عن الطلب والمنتجات
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="arabic text-right">
                    معلومات العميل
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <span className="font-semibold arabic">اسم العميل: </span>
                    <span className="arabic">{selectedOrder.customerName}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">رقم الهاتف: </span>
                    <span>{selectedOrder.customerPhone}</span>
                  </div>
                  <div>
                    <span className="font-semibold arabic">
                      عنوان التسليم:{" "}
                    </span>
                    <span className="arabic">
                      {selectedOrder.customerAddress}
                    </span>
                  </div>
                  <div
                    className={`flex items-center space-x-2 space-x-reverse ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="font-semibold arabic">حالة الطلب: </span>
                    <Badge className={getStatusColor(selectedOrder.status)}>
                      {getStatusText(selectedOrder.status)}
                    </Badge>
                  </div>
                  {selectedOrder.notes && (
                    <div>
                      <span className="font-semibold arabic">ملاحظات: </span>
                      <span className="arabic">{selectedOrder.notes}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="arabic text-right">
                    تفاصيل الطلب
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">تاريخ الطلب:</span>
                    <span>{selectedOrder.orderDate}</span>
                  </div>
                  {selectedOrder.deliveryDate && (
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <span className="arabic">موعد التسليم:</span>
                      <span>{selectedOrder.deliveryDate}</span>
                    </div>
                  )}
                  {selectedOrder.trackingNumber && (
                    <div
                      className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <span className="arabic">رقم التتبع:</span>
                      <span className="font-mono">
                        {selectedOrder.trackingNumber}
                      </span>
                    </div>
                  )}
                  <div
                    className={`flex items-center justify-between text-lg font-bold ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <span className="arabic">إجمالي الطلب:</span>
                    <span className="text-green-600">
                      {selectedOrder.total} ر.س
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="arabic text-right">
                    المنتجات المطلوبة
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div
                        key={item.id}
                        className={`flex items-center space-x-4 space-x-reverse p-4 border rounded-lg ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-500" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold arabic">{item.name}</h4>
                          <div
                            className={`flex items-center space-x-4 space-x-reverse text-sm text-gray-600 mt-1 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                          >
                            <span className="arabic">
                              الكمية: {item.quantity}
                            </span>
                            <span className="arabic">
                              السعر: {item.price} ر.س
                            </span>
                            <span className="arabic font-medium">
                              المجموع: {item.quantity * item.price} ر.س
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
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
            <Button className="arabic">
              <Download className="w-4 h-4 ml-2" />
              طباعة الفاتورة
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
