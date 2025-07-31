import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Store,
  Search,
  Filter,
  Grid3X3,
  List,
  ShoppingCart,
  Heart,
  Star,
  Plus,
  Minus,
  Eye,
  ArrowLeft,
  Phone,
  MessageCircle,
  Share2,
  Info,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { StoresService } from "@/lib/stores";
import { ProductService } from "@/lib/products";
import { useState } from "react";

export default function StoreVisit() {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [cart, setCart] = useState<Record<string, number>>({});

  // الحصول على بيانات المتجر
  const stores = StoresService.getAllStores();
  const store = stores.find((s) => s.id === id);

  // الحصول على منتجات المتجر
  const allProducts = ProductService.getProducts(id);

  // تصفية المنتجات
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesSearch && matchesCategory && product.status === "active";
  });

  // ترتيب المنتجات
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-high":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return a.name.localeCompare(b.name);
    }
  });

  // الحصول على الفئات المتوفرة
  const availableCategories = [...new Set(allProducts.map((p) => p.category))];

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

  const addToCart = (productId: string) => {
    setCart((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ريال`;
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Store Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link to={`/store/${store.id}`}>
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 ml-1" />
                    تفاصيل المتجر
                  </Button>
                </Link>
                <img
                  src={store.logo || "/placeholder.svg"}
                  alt={store.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div>
                  <h1 className="text-xl font-bold arabic">{store.name}</h1>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>4.8 (125 تقييم)</span>
                    <span className="text-gray-400">•</span>
                    <span className="arabic">{allProducts.length} منتج</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="arabic">
                  <MessageCircle className="w-4 h-4 ml-1" />
                  راسلنا
                </Button>
                <Button variant="outline" size="sm" className="arabic">
                  <Phone className="w-4 h-4 ml-1" />
                  اتصل
                </Button>
                <div className="relative">
                  <Button className="arabic" size="sm">
                    <ShoppingCart className="w-4 h-4 ml-1" />
                    السلة ({getTotalCartItems()})
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في منتجات المتجر..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg text-right arabic"
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                <option value="all">جميع الفئات</option>
                {availableCategories.map((category) => (
                  <option key={category} value={category}>
                    {ProductService.getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                <option value="name">الاسم أ-ي</option>
                <option value="price-low">السعر: ��ن الأقل</option>
                <option value="price-high">السعر: من الأعلى</option>
                <option value="newest">الأحدث</option>
              </select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-600 arabic">
                {sortedProducts.length} منتج متوفر
              </span>
              {(searchQuery || selectedCategory !== "all") && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                  className="text-xs arabic"
                >
                  إعادة تعيين
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="container mx-auto px-4 py-6">
          {sortedProducts.length === 0 ? (
            <div className="text-center py-12">
              <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-400 mb-2 arabic">
                لا توجد منتجات
              </h3>
              <p className="text-gray-500 arabic">
                جرب تغيير كلمات البحث أو الفئات
              </p>
            </div>
          ) : (
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                  : "space-y-4"
              }`}
            >
              {sortedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="bg-white/80 hover:bg-white p-2"
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                        {product.salePrice && (
                          <div className="absolute bottom-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs arabic font-bold">
                            خصم{" "}
                            {Math.round(
                              (1 - product.salePrice / product.price) * 100,
                            )}
                            %
                          </div>
                        )}
                        <div className="absolute top-2 left-2">
                          <Badge
                            className={`text-white text-xs arabic ${ProductService.getStatusBadgeColor(product.status)}`}
                          >
                            {ProductService.getStatusText(product.status)}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-4">
                        <h3 className="font-bold text-gray-800 mb-2 arabic group-hover:text-green-600 transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-600 arabic line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="text-xs arabic">
                            {ProductService.getCategoryIcon(product.category)}{" "}
                            {product.category}
                          </Badge>
                          <div className="text-right">
                            {product.salePrice ? (
                              <div>
                                <span className="text-lg font-bold text-green-600 arabic">
                                  {formatPrice(product.salePrice)}
                                </span>
                                <span className="text-sm text-gray-500 line-through arabic mr-2">
                                  {formatPrice(product.price)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-lg font-bold text-gray-800 arabic">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span className="arabic">
                            المخزون: {product.inventory.quantity}
                          </span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>120 مشاهدة</span>
                          </div>
                        </div>

                        {cart[product.id] ? (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => removeFromCart(product.id)}
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="font-semibold">
                                {cart[product.id]}
                              </span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => addToCart(product.id)}
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="arabic"
                            >
                              <Eye className="w-4 h-4 ml-1" />
                              عرض
                            </Button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <Button
                              className="flex-1 arabic"
                              size="sm"
                              onClick={() => addToCart(product.id)}
                              disabled={product.inventory.quantity === 0}
                            >
                              <ShoppingCart className="w-4 h-4 ml-1" />
                              أضف للسلة
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="arabic"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </>
                  ) : (
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className="font-bold text-gray-800 arabic mb-1">
                                {product.name}
                              </h3>
                              <p className="text-sm text-gray-600 arabic line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="text-right ml-4">
                              {product.salePrice ? (
                                <div>
                                  <span className="text-lg font-bold text-green-600 arabic">
                                    {formatPrice(product.salePrice)}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through arabic mr-2">
                                    {formatPrice(product.price)}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-lg font-bold text-gray-800 arabic">
                                  {formatPrice(product.price)}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <Badge
                                variant="outline"
                                className="text-xs arabic"
                              >
                                {product.category}
                              </Badge>
                              <span className="arabic">
                                المخزون: {product.inventory.quantity}
                              </span>
                            </div>

                            {cart[product.id] ? (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => removeFromCart(product.id)}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="font-semibold">
                                  {cart[product.id]}
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => addToCart(product.id)}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                onClick={() => addToCart(product.id)}
                                disabled={product.inventory.quantity === 0}
                                className="arabic"
                              >
                                <ShoppingCart className="w-4 h-4 ml-1" />
                                أضف للسلة
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Floating Cart Button */}
        {getTotalCartItems() > 0 && (
          <div className="fixed bottom-6 right-6 z-50">
            <Button className="arabic shadow-lg rounded-full px-6 py-3">
              <ShoppingCart className="w-5 h-5 ml-2" />
              عرض السلة ({getTotalCartItems()})
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
