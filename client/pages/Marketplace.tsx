import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Filter,
  Search,
  MapPin,
  Star,
  Eye,
  ShoppingCart,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Marketplace() {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // جلب المتاجر العامة من API
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/stores/general");
        if (response.ok) {
          const data = await response.json();
          setStores(data);
        }
      } catch (error) {
        console.error("خطأ في جلب المتاجر:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredStores = stores.filter((store) => {
    const matchesSearch =
      searchQuery === "" ||
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || store.category === selectedCategory;

    return matchesSearch && matchesCategory && store.status === "active";
  });

  const categories = [
    { value: "all", label: "جميع الفئات" },
    { value: "traditional", label: "تراثي" },
    { value: "perfumes", label: "عطور" },
    { value: "food", label: "مطاعم" },
    { value: "fashion", label: "أزياء" },
    { value: "grocery", label: "بقالة" },
    { value: "services", label: "خدمات" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg">
              <ShoppingBag className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            السوق التجاري
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            اكتشف أفضل المتاجر ال��ودانية في الخليج والعالم
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              <span className="arabic">{stores.length} متجر</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="arabic">أكثر من 500 تقييم</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="arabic">متوفر في الخليج</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في المتاجر..."
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
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredStores.map((store) => (
            <Card
              key={store.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={store.coverImage || "/placeholder.svg"}
                  alt={store.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className="arabic bg-white/90 text-gray-700"
                  >
                    {StoresService.getCategoryIcon(store.category)}{" "}
                    {categories.find((c) => c.value === store.category)?.label}
                  </Badge>
                </div>
                {store.status === "active" && (
                  <div className="absolute top-4 left-4">
                    <Badge className="arabic bg-green-500 text-white">
                      نشط
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={store.logo || "/placeholder.svg"}
                    alt={store.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 arabic group-hover:text-primary-600 transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-gray-600 text-sm arabic leading-relaxed">
                      {store.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span className="arabic">
                      {store.analytics.totalViews.toLocaleString()} مشاهدة
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span className="arabic">
                      {store.analytics.totalOrders} طلب
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link to={`/store/${store.id}/visit`} className="flex-1">
                    <Button className="w-full arabic" size="sm">
                      زيارة المتجر
                    </Button>
                  </Link>
                  <Link to={`/store/${store.id}`}>
                    <Button variant="outline" size="sm" className="arabic">
                      تفاصيل
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredStores.length === 0 && (
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد متاجر مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث أو اختيار فئة مختلفة
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
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
