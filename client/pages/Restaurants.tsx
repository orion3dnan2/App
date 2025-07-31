import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChefHat,
  Filter,
  Search,
  MapPin,
  Star,
  Clock,
  Phone,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // جلب المطاعم من API
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/stores/restaurants");
        if (response.ok) {
          const data = await response.json();
          setRestaurants(data);
        }
      } catch (error) {
        console.error("خطأ في جلب المطاعم:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      searchQuery === "" ||
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl flex items-center justify-center shadow-lg">
              <ChefHat className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            المطاعم السودانية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            أشهى الأطباق السودانية الأصيلة في جميع أنحاء العالم
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4" />
              <span className="arabic">{restaurants.length} مطعم</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="arabic">تقييم ممتاز</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="arabic">توصيل سريع</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في المطاعم..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg text-right arabic"
                />
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 arabic"
              >
                <Filter className="w-4 h-4" />
                تصفية النتائج
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={restaurant.coverImage || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="arabic bg-red-500 text-white">
                    🍽️ مطعم
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="arabic bg-green-500 text-white">
                    مفتوح الآن
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm arabic">
                  توصيل 30 دقيقة
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={restaurant.logo || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1 arabic group-hover:text-red-600 transition-colors">
                      {restaurant.name}
                    </h3>
                    <p className="text-gray-600 text-sm arabic leading-relaxed">
                      {restaurant.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="arabic">4.8 (125 تقييم)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="arabic">الرياض</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 arabic">
                      رسوم التوصيل
                    </span>
                    <span className="text-sm font-semibold text-green-600 arabic">
                      مجاني فوق 100 ريال
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-600 arabic">
                      أقل طلب
                    </span>
                    <span className="text-sm font-semibold arabic">
                      50 ريال
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 arabic bg-red-600 hover:bg-red-700"
                    size="sm"
                  >
                    اطلب الآن
                  </Button>
                  <Button variant="outline" size="sm" className="arabic">
                    <Phone className="w-4 h-4 ml-1" />
                    اتصل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Dishes Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              الأطباق الشعبية
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: "الفتة السودانية",
                  image: "/placeholder.svg",
                  price: "25 ريال",
                },
                {
                  name: "الكسرة واللحم",
                  image: "/placeholder.svg",
                  price: "35 ريال",
                },
                {
                  name: "الملاح الأخضر",
                  image: "/placeholder.svg",
                  price: "20 ريال",
                },
                {
                  name: "العصيدة بالملح",
                  image: "/placeholder.svg",
                  price: "18 ريال",
                },
              ].map((dish, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-24 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform"
                  />
                  <h4 className="font-semibold text-gray-800 text-sm arabic">
                    {dish.name}
                  </h4>
                  <p className="text-green-600 font-bold text-sm arabic">
                    {dish.price}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredRestaurants.length === 0 && (
          <div className="text-center py-20">
            <ChefHat className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد مطاعم مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث
            </p>
            <Button
              variant="outline"
              onClick={() => setSearchQuery("")}
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
