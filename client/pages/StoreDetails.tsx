import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  Users,
  Package,
  Calendar,
  Clock,
  Shield,
  Heart,
  Share2,
  MessageCircle,
  Truck,
  CreditCard,
  Award,
  TrendingUp,
  Eye,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { StoresService } from "@/lib/stores";
import { ProductService } from "@/lib/products";
import { SmartLinkButton } from "@/components/MobileIntegration";
import { useState } from "react";

export default function StoreDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<"products" | "reviews" | "info">(
    "products",
  );

  // الحصول على بيانات المتجر
  const stores = StoresService.getAllStores();
  const store = stores.find((s) => s.id === id);

  // الحصول على منتجات المتجر
  const storeProducts = ProductService.getProducts(id).slice(0, 6);

  if (!store) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <Store className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
            المتجر غير موجود
          </h2>
          <Link to="/marketplace">
            <Button className="arabic">العودة للسوق</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getCategoryName = (category: string) => {
    const categories: Record<string, string> = {
      traditional: "تراثي",
      perfumes: "عطور",
      food: "مطاعم وأغذية",
      services: "خدمات",
      fashion: "أزياء",
      grocery: "بقالة",
    };
    return categories[category] || category;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Cover Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={store.coverImage || "/placeholder.svg"}
            alt={store.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          {/* Store Logo & Basic Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-end gap-4">
              <img
                src={store.logo || "/placeholder.svg"}
                alt={store.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-4 border-white shadow-lg"
              />
              <div className="flex-1 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h1 className="text-2xl md:text-3xl font-bold arabic">
                    {store.name}
                  </h1>
                  {store.status === "active" && (
                    <Badge className="bg-green-500 text-white">
                      <Shield className="w-3 h-3 ml-1" />
                      متجر موثق
                    </Badge>
                  )}
                </div>
                <p className="text-gray-200 arabic text-sm md:text-base">
                  {store.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.8 (125 تقييم)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{store.analytics.totalViews} مشاهدة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    <span>{storeProducts.length} منتج</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute top-6 right-6 flex gap-2">
            <Button size="sm" variant="secondary" className="arabic">
              <Heart className="w-4 h-4 ml-1" />
              متابعة
            </Button>
            <SmartLinkButton
              type="store"
              id={store.id}
              title={store.name}
              className="arabic"
            >
              <Share2 className="w-4 h-4 ml-1" />
              مشاركة
            </SmartLinkButton>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Quick Actions */}
              <div className="flex gap-3 mb-6">
                <Link to={`/store/${store.id}/visit`}>
                  <Button className="arabic bg-green-600 hover:bg-green-700">
                    <Store className="w-4 h-4 ml-1" />
                    زيارة المتجر
                  </Button>
                </Link>
                <Button variant="outline" className="arabic">
                  <MessageCircle className="w-4 h-4 ml-1" />
                  راسل البائع
                </Button>
                <Button variant="outline" className="arabic">
                  <Phone className="w-4 h-4 ml-1" />
                  اتصل
                </Button>
              </div>

              {/* Tabs */}
              <div className="flex border-b mb-6">
                <button
                  onClick={() => setActiveTab("products")}
                  className={`px-4 py-2 arabic font-medium ${
                    activeTab === "products"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  المنتجات ({storeProducts.length})
                </button>
                <button
                  onClick={() => setActiveTab("reviews")}
                  className={`px-4 py-2 arabic font-medium ${
                    activeTab === "reviews"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  التقييمات (125)
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`px-4 py-2 arabic font-medium ${
                    activeTab === "info"
                      ? "border-b-2 border-green-500 text-green-600"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  معلومات إضافية
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "products" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {storeProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="block"
                    >
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex gap-3">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold arabic text-sm mb-1">
                                {product.name}
                              </h3>
                              <p className="text-xs text-gray-600 arabic line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1">
                                  <span className="text-green-600 font-bold text-sm">
                                    {product.salePrice || product.price} ريال
                                  </span>
                                  {product.salePrice && (
                                    <span className="text-gray-400 line-through text-xs">
                                      {product.price}
                                    </span>
                                  )}
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs arabic"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  عرض
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                  <div className="md:col-span-2 text-center mt-4">
                    <Link to={`/store/${store.id}/visit`}>
                      <Button variant="outline" className="arabic">
                        عرض جميع المنتجات
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {[1, 2, 3].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold text-sm arabic">
                                أحمد محمد
                              </span>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className="w-3 h-3 text-yellow-400 fill-current"
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 arabic mb-2">
                              متجر ممتاز وخدمة عملاء رائعة. المنتجات أصلية وجودة
                              عالية. أنصح بالتسوق من هنا.
                            </p>
                            <span className="text-xs text-gray-400">
                              منذ أسبوع
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  <div className="text-center">
                    <Button variant="outline" className="arabic">
                      عرض المزيد من التقييمات
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "info" && (
                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 arabic">
                        عن المتجر
                      </h3>
                      <p className="text-gray-600 arabic leading-relaxed">
                        {store.description}
                      </p>
                      <p className="text-gray-600 arabic leading-relaxed mt-4">
                        نحن متخصصون في تقديم أفضل المنتجات السودانية الأصيلة
                        بجودة عالية وأسعار منافسة. فريقنا ملتزم بتقديم خدمة
                        عملاء ممتازة وضمان رضا العملاء.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold mb-4 arabic">
                        سياسات المتجر
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Truck className="w-5 h-5 text-green-600 mt-1" />
                          <div>
                            <h4 className="font-semibold arabic">
                              الشحن والتوصيل
                            </h4>
                            <p className="text-sm text-gray-600 arabic">
                              شحن مجاني للطلبات فوق{" "}
                              {store.settings.shipping.freeShippingThreshold}{" "}
                              ريال. التوصيل خلال 2-5 أيام عمل.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
                          <div>
                            <h4 className="font-semibold arabic">طرق الدفع</h4>
                            <p className="text-sm text-gray-600 arabic">
                              نقبل جميع طرق الدفع: البطاقات الائتمانية، التحويل
                              البنكي، الدفع عند التسليم.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-purple-600 mt-1" />
                          <div>
                            <h4 className="font-semibold arabic">
                              سياسة الإرجاع
                            </h4>
                            <p className="text-sm text-gray-600 arabic">
                              إمكانية الإرجاع خلال 15 يوم من تاريخ الاستلام مع
                              ضمان استرداد المبلغ كاملاً.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Store Stats */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 arabic">
                    إحصائيات المتجر
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 arabic">
                        إجمالي المشاهدات
                      </span>
                      <span className="font-semibold">
                        {store.analytics.totalViews.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 arabic">
                        إجمالي الطلبات
                      </span>
                      <span className="font-semibold">
                        {store.analytics.totalOrders}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 arabic">
                        تاريخ التأسيس
                      </span>
                      <span className="font-semibold arabic">
                        {formatDate(store.createdAt)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600 arabic">الفئة</span>
                      <Badge variant="outline" className="arabic">
                        {StoresService.getCategoryIcon(store.category)}{" "}
                        {getCategoryName(store.category)}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 arabic">
                    معلومات التواصل
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        info@{store.name.replace(/\s+/g, "").toLowerCase()}.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">+966 50 123 4567</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">
                        www.{store.name.replace(/\s+/g, "").toLowerCase()}.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm arabic">
                        السبت - الخميس: 9:00 - 18:00
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Featured Badge */}
              <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
                <CardContent className="p-6 text-center">
                  <Award className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h3 className="font-bold text-green-800 mb-2 arabic">
                    متجر موثق
                  </h3>
                  <p className="text-sm text-green-700 arabic">
                    هذا المتجر معتمد ومتوافق مع معايير الجودة والأمان
                  </p>
                </CardContent>
              </Card>

              {/* Similar Stores */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 arabic">
                    متاجر مشابهة
                  </h3>
                  <div className="space-y-3">
                    {stores
                      .filter(
                        (s) =>
                          s.category === store.category && s.id !== store.id,
                      )
                      .slice(0, 3)
                      .map((similarStore) => (
                        <Link
                          key={similarStore.id}
                          to={`/store/${similarStore.id}`}
                        >
                          <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors">
                            <img
                              src={similarStore.logo || "/placeholder.svg"}
                              alt={similarStore.name}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm arabic">
                                {similarStore.name}
                              </h4>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-400" />
                                <span className="text-xs">4.8</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
