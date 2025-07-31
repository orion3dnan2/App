import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Search,
  Filter,
  Calendar,
  MapPin,
  Tag,
  ExternalLink,
  Star,
} from "lucide-react";
import { useAds } from "@/lib/stores";
import { useState } from "react";

export default function Ads() {
  const { ads, featuredAds } = useAds();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const filteredAds = (showFeaturedOnly ? featuredAds : ads).filter(
    (ad) =>
      searchQuery === "" ||
      ad.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.advertiser.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ad.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      perfumes: "🌹",
      food: "🍽️",
      services: "⚙️",
      fashion: "👗",
    };
    return icons[category] || "🏪";
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      perfumes: "bg-purple-500",
      food: "bg-red-500",
      services: "bg-blue-500",
      fashion: "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-SA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpiringSoon = (dateString: string) => {
    const expiryDate = new Date(dateString);
    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays > 0;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
              <Megaphone className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            الإعلانات والعروض
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            أحدث العروض والإعلانات التجارية من المتاجر السودانية
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Megaphone className="w-4 h-4" />
              <span className="arabic">{ads.length} إعلان نشط</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="arabic">{featuredAds.length} عرض مميز</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="arabic">توفير يصل إلى 50%</span>
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
                  placeholder="ابحث في الإعلانات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg text-right arabic"
                />
              </div>
              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="flex items-center gap-2 arabic"
              >
                <Star className="w-4 h-4" />
                العروض المميزة فقط
              </Button>
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

        {/* Featured Ads Banner */}
        {!showFeaturedOnly && featuredAds.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-purple-800 arabic">
                  العروض المميزة
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredAds.slice(0, 2).map((ad) => (
                  <div
                    key={ad.id}
                    className="bg-white rounded-lg p-4 border border-purple-200"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 arabic text-sm">
                          {ad.title}
                        </h3>
                        <p className="text-gray-600 text-xs arabic mt-1">
                          {ad.advertiser}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <Badge className="bg-red-500 text-white text-xs arabic">
                            خصم {ad.discount}%
                          </Badge>
                          <span className="text-green-600 font-bold text-sm arabic">
                            {ad.salePrice} ريال
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Ads Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredAds.map((ad) => (
            <Card
              key={ad.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={ad.image}
                  alt={ad.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    className={`arabic text-white ${getCategoryColor(ad.category)}`}
                  >
                    {getCategoryIcon(ad.category)} إعلان
                  </Badge>
                </div>
                <div className="absolute top-4 left-4">
                  {ad.featured && (
                    <Badge className="arabic bg-yellow-500 text-white">
                      ⭐ مميز
                    </Badge>
                  )}
                </div>
                <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold arabic">
                  خصم {ad.discount}%
                </div>
                {isExpiringSoon(ad.validUntil) && (
                  <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs arabic">
                    ينتهي قريباً
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 arabic group-hover:text-purple-600 transition-colors">
                    {ad.title}
                  </h3>
                  <p className="text-gray-600 text-sm arabic leading-relaxed mb-2">
                    {ad.description}
                  </p>
                  <p className="text-sm text-purple-600 font-semibold arabic">
                    {ad.advertiser}
                  </p>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 arabic">
                      السعر الأصلي
                    </span>
                    <span className="text-sm text-gray-500 line-through arabic">
                      {ad.originalPrice} ريال
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 arabic">
                      سعر العرض
                    </span>
                    <span className="text-lg font-bold text-green-600 arabic">
                      {ad.salePrice} ريال
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 arabic">
                      ينتهي في
                    </span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-red-600 arabic">
                        {formatDate(ad.validUntil)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600 arabic">
                    {ad.location}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 arabic bg-purple-600 hover:bg-purple-700"
                    size="sm"
                  >
                    استفد من العرض
                  </Button>
                  <Button variant="outline" size="sm" className="arabic">
                    <ExternalLink className="w-4 h-4 ml-1" />
                    تفاصيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Discount Categories */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              تصفح حسب نوع الخصم
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  range: "خصم 50% فأكثر",
                  icon: "🔥",
                  count: "2 عرض",
                  color: "bg-red-500",
                },
                {
                  range: "خصم 30-49%",
                  icon: "💸",
                  count: "3 عروض",
                  color: "bg-orange-500",
                },
                {
                  range: "خصم 20-29%",
                  icon: "💰",
                  count: "5 عروض",
                  color: "bg-yellow-500",
                },
                {
                  range: "خصم أقل من 20%",
                  icon: "🏷️",
                  count: "4 عروض",
                  color: "bg-green-500",
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div
                    className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-2`}
                  >
                    <span className="text-xl">{category.icon}</span>
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm arabic mb-1">
                    {category.range}
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
        {filteredAds.length === 0 && (
          <div className="text-center py-20">
            <Megaphone className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد إعلانات مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث أو تصفح العروض المميزة
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setShowFeaturedOnly(false);
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
