import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Package,
  Search,
  Filter,
  Store,
  ShoppingCart,
  Eye,
  Star,
  Grid3X3,
  List,
  Tag,
  TrendingUp,
  Heart,
} from "lucide-react";
import { ProductService, useProducts } from "@/lib/products";
import { useState } from "react";

export default function Products() {
  const { products } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStore, setSelectedStore] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const productsWithStore = ProductService.getProductsWithStore();

  const filteredProducts = productsWithStore.filter((product) => {
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      product.storeName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStore =
      selectedStore === "all" || product.storeId === selectedStore;

    let matchesPrice = true;
    if (priceRange !== "all") {
      const price = product.salePrice || product.price;
      switch (priceRange) {
        case "under-20":
          matchesPrice = price < 20;
          break;
        case "20-50":
          matchesPrice = price >= 20 && price <= 50;
          break;
        case "50-100":
          matchesPrice = price > 50 && price <= 100;
          break;
        case "over-100":
          matchesPrice = price > 100;
          break;
      }
    }

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStore &&
      matchesPrice &&
      product.status === "active"
    );
  });

  const categories = ProductService.getCategories();
  const stores = [
    { id: "all", name: "جميع المتاجر" },
    { id: "store-001", name: "متجر التراث السوداني" },
    { id: "store-002", name: "عطور الشرق" },
    { id: "store-003", name: "مطعم أم درمان" },
    { id: "store-004", name: "خدمات التقنية السودانية" },
    { id: "store-005", name: "أزياء النيل" },
    { id: "store-006", name: "سوبر ماركت الخرطوم" },
  ];

  const priceRanges = [
    { value: "all", label: "جميع الأسعار" },
    { value: "under-20", label: "أقل من 20 ريال" },
    { value: "20-50", label: "20 - 50 ريال" },
    { value: "50-100", label: "50 - 100 ريال" },
    { value: "over-100", label: "أكثر من 100 ريال" },
  ];

  const formatPrice = (price: number) => {
    return `${price.toFixed(2)} ريال`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Package className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            المنتجات السودانية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            أفضل المنتجات التقليدية والحديثة من السودان
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="arabic">{productsWithStore.length} منتج</span>
            </div>
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4" />
              <span className="arabic">{stores.length - 1} متجر</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="arabic">أسعار تنافسية</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في المنتجات، المتاجر، الوصف..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg text-right arabic"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                <option value="all">جميع الفئات</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {ProductService.getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
              <select
                value={selectedStore}
                onChange={(e) => setSelectedStore(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                {stores.map((store) => (
                  <option key={store.id} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                {priceRanges.map((range) => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 arabic">
                  {filteredProducts.length} منتج
                </span>
                {(searchQuery ||
                  selectedCategory !== "all" ||
                  selectedStore !== "all" ||
                  priceRange !== "all") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                      setSelectedStore("all");
                      setPriceRange("all");
                    }}
                    className="text-xs arabic"
                  >
                    إعادة تعيين
                  </Button>
                )}
              </div>
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
          </CardContent>
        </Card>

        {/* Products Grid/List */}
        <div
          className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"} mb-8`}
        >
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
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
                      <Badge
                        className={`text-white text-xs arabic ${ProductService.getStatusBadgeColor(product.status)}`}
                      >
                        {ProductService.getStatusText(product.status)}
                      </Badge>
                    </div>
                    <div className="absolute top-2 left-2">
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
                  </div>

                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="text-lg font-bold text-gray-800 mb-1 arabic group-hover:text-blue-600 transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 arabic line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Store className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-blue-600 arabic font-medium">
                        {product.storeName}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs arabic">
                          {ProductService.getCategoryIcon(product.category)}{" "}
                          {product.category}
                        </Badge>
                      </div>
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
                        <span className="arabic">120 مشاهدة</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button className="flex-1 arabic" size="sm">
                        <ShoppingCart className="w-4 h-4 ml-1" />
                        أضف للسلة
                      </Button>
                      <Button variant="outline" size="sm" className="arabic">
                        تفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <img
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 arabic mb-1">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-600 arabic line-clamp-2">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-right">
                          {product.salePrice ? (
                            <div>
                              <span className="text-xl font-bold text-green-600 arabic">
                                {formatPrice(product.salePrice)}
                              </span>
                              <span className="text-sm text-gray-500 line-through arabic mr-2">
                                {formatPrice(product.price)}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xl font-bold text-gray-800 arabic">
                              {formatPrice(product.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex items-center gap-2">
                          <Store className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-blue-600 arabic font-medium">
                            {product.storeName}
                          </span>
                        </div>
                        <Badge variant="outline" className="text-xs arabic">
                          {ProductService.getCategoryIcon(product.category)}{" "}
                          {product.category}
                        </Badge>
                        <Badge
                          className={`text-white text-xs arabic ${ProductService.getStatusBadgeColor(product.status)}`}
                        >
                          {ProductService.getStatusText(product.status)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="arabic">
                            المخزون: {product.inventory.quantity}
                          </span>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="arabic">120 مشاهدة</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="arabic" size="sm">
                            <ShoppingCart className="w-4 h-4 ml-1" />
                            أضف للسلة
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="arabic"
                          >
                            تفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Categories Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              تصفح حسب الفئة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category) => {
                const categoryCount = productsWithStore.filter(
                  (p) => p.category === category && p.status === "active",
                ).length;
                return (
                  <div
                    key={category}
                    className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="text-3xl mb-2">
                      {ProductService.getCategoryIcon(category)}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm arabic mb-1">
                      {category}
                    </h4>
                    <p className="text-gray-500 text-xs arabic">
                      {categoryCount} منتج
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد منتجات مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث أو الفئات المختارة
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedStore("all");
                setPriceRange("all");
              }}
              className="arabic"
            >
              إعادة تعيين البحث
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
