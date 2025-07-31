import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Wrench,
  Search,
  Filter,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { useServices } from "@/lib/stores";
import { useState } from "react";

export default function Services() {
  const { services } = useServices();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredServices = services.filter(
    (service) =>
      searchQuery === "" ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      maintenance: "🔧",
      design: "🎨",
      cooking: "👩‍🍳",
      education: "📚",
    };
    return icons[category] || "⚙️";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      maintenance: "bg-blue-500",
      design: "bg-purple-500",
      cooking: "bg-orange-500",
      education: "bg-green-500",
    };
    return colors[category] || "bg-gray-500";
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Wrench className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            الخدمات المهنية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            مقدمو خدمات ومهنيون ماهرون لجميع احتياجاتك
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4" />
              <span className="arabic">{services.length} خدمة متاحة</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="arabic">تقييمات ممتازة</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="arabic">استجابة سريعة</span>
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
                  placeholder="ابحث في الخدمات..."
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredServices.map((service) => (
            <Card
              key={service.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`arabic text-white ${getCategoryColor(service.category)}`}
                  >
                    {getCategoryIcon(service.category)} خدمة
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className="arabic bg-green-500 text-white">متاح</Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 arabic group-hover:text-blue-600 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm arabic leading-relaxed mb-3">
                    {service.description}
                  </p>
                  <p className="text-sm text-gray-500 arabic">
                    مقدم الخدمة:{" "}
                    <span className="font-semibold">{service.provider}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="arabic">
                      {service.rating} ({service.reviewsCount} تقييم)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="arabic text-gray-600">
                      {service.location}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 arabic">السعر</span>
                    <span className="text-lg font-bold text-green-600 arabic">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 arabic">التوفر</span>
                    <span className="text-sm text-blue-600 arabic">
                      {service.availability}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {service.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs arabic"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {service.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs arabic">
                      +{service.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 arabic" size="sm">
                    احجز الآن
                  </Button>
                  <Button variant="outline" size="sm" className="arabic">
                    <Phone className="w-4 h-4 ml-1" />
                    اتصل
                  </Button>
                  <Button variant="outline" size="sm" className="arabic">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              الفئات الشائعة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "صيانة منزلية", icon: "🔧", count: "25 مقدم خدمة" },
                { name: "تصميم جرافيكي", icon: "🎨", count: "18 مصمم" },
                { name: "طبخ منز��ي", icon: "👩‍🍳", count: "12 طباخة" },
                { name: "دروس خصوصية", icon: "📚", count: "30 معلم" },
              ].map((category, index) => (
                <div
                  key={index}
                  className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="text-3xl mb-2">{category.icon}</div>
                  <h4 className="font-semibold text-gray-800 text-sm arabic mb-1">
                    {category.name}
                  </h4>
                  <p className="text-gray-500 text-xs arabic">
                    {category.count}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <Wrench className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد خدمات مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث أو تصفح الفئات المختلفة
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
