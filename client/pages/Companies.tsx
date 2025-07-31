import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Building,
  Search,
  Filter,
  MapPin,
  Users,
  Star,
  Verified,
  Globe,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Award,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // جلب الشركات من API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/stores/companies");
        if (response.ok) {
          const data = await response.json();
          setCompanies(data);
        }
      } catch (error) {
        console.error("خطأ في جلب الشركات:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("all");
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      searchQuery === "" ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesIndustry =
      selectedIndustry === "all" || company.category === selectedIndustry;
    const matchesCountry =
      selectedCountry === "all" || company.country === selectedCountry;

    return matchesSearch && matchesIndustry && matchesCountry;
  });

  // استخراج القطاعات والدول من البيانات
  const industries = [...new Set(companies.map((c) => c.category))];
  const countries = [...new Set(companies.map((c) => c.country))];
  const sizes = ["صغيرة", "متوسطة", "كبيرة"];

  // الشركات المميزة (أول 3 شركات نشطة)
  const featuredCompanies = companies
    .filter((c) => c.status === "active")
    .slice(0, 3);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Building className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            دليل الشركات
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            دليل شامل للشركات والأعمال السودانية في الخليج والعالم
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4" />
              <span className="arabic">{companies.length} شركة</span>
            </div>
            <div className="flex items-center gap-2">
              <Verified className="w-4 h-4" />
              <span className="arabic">
                {companies.filter((c) => c.status === "active").length} شركة
                نشطة
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="arabic">
                {new Set(companies.map((c) => c.category)).size} قطاع
              </span>
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
                  placeholder="ابحث في الشركات، الخدمات، الصناعات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-3 border border-gray-300 rounded-lg text-right arabic"
                />
              </div>
              <select
                value={selectedIndustry}
                onChange={(e) => setSelectedIndustry(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                <option value="all">جميع الصناعات</option>
                {industries.map((industry) => (
                  <option key={industry} value={industry}>
                    🏢 {industry}
                  </option>
                ))}
              </select>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                <option value="all">جميع البلدان</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                <option value="all">جميع الأحجام</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    📏 {size}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600 arabic">
                  {filteredCompanies.length} شركة
                </span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showVerifiedOnly}
                    onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-600 arabic">
                    الشركات الموثقة فقط
                  </span>
                </label>
                {(searchQuery ||
                  selectedIndustry !== "all" ||
                  selectedCountry !== "all" ||
                  selectedSize !== "all" ||
                  showVerifiedOnly) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedIndustry("all");
                      setSelectedCountry("all");
                      setSelectedSize("all");
                      setShowVerifiedOnly(false);
                    }}
                    className="text-xs arabic"
                  >
                    إعادة تعيين
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Companies */}
        {featuredCompanies.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-bold text-orange-800 arabic">
                  الشركات المميزة
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {featuredCompanies.slice(0, 3).map((company) => (
                  <div
                    key={company.id}
                    className="bg-white rounded-lg p-4 border border-orange-200"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 arabic text-sm mb-1 truncate">
                          {company.name}
                        </h3>
                        <p className="text-orange-600 text-xs arabic mb-2">
                          {company.category}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-600 arabic">
                              {company.city}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-xs text-gray-600">
                              {company.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCompanies.map((company) => (
            <Card
              key={company.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={company.coverImage || "/placeholder.svg"}
                  alt={company.name}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-orange-500 text-white text-xs arabic">
                    🏢 {company.category}
                  </Badge>
                </div>
                <div className="absolute top-2 left-2 flex gap-1">
                  {company.status === "active" && (
                    <Badge className="bg-green-500 text-white text-xs arabic">
                      <Verified className="w-3 h-3 ml-1" />
                      نشط
                    </Badge>
                  )}
                  {company.isFeatured && (
                    <Badge className="bg-yellow-500 text-white text-xs arabic">
                      <Award className="w-3 h-3 ml-1" />
                      مميز
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-4">
                  <img
                    src={company.logo || "/placeholder.svg"}
                    alt={company.name}
                    className="w-12 h-12 object-cover rounded-lg border-2 border-gray-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 mb-1 arabic group-hover:text-orange-600 transition-colors line-clamp-2">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-600 arabic line-clamp-2 leading-relaxed">
                      {company.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 arabic">
                      {company.city}, {company.country}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 arabic">
                      متعدد الموظفين
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600 arabic">
                      تأسست في {company.founded}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-semibold arabic">
                      {company.rating}
                    </span>
                    <span className="text-sm text-gray-500 arabic">
                      ({company.reviewsCount} تقييم)
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs arabic">
                    📏 شركة كبيرة
                  </Badge>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2 arabic">
                    الخدمات:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {company.services.slice(0, 3).map((service, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="text-xs arabic"
                      >
                        {service}
                      </Badge>
                    ))}
                    {company.services.length > 3 && (
                      <Badge variant="secondary" className="text-xs arabic">
                        +{company.services.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 arabic" size="sm">
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" className="arabic">
                    <ExternalLink className="w-4 h-4 ml-1" />
                    موقع
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Industries Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              تصفح حسب الصناعة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {industries.map((industry) => {
                const industryCount = companies.filter(
                  (c) => c.category === industry,
                ).length;
                return (
                  <div
                    key={industry}
                    className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedIndustry(industry)}
                  >
                    <div className="text-3xl mb-2">🏢</div>
                    <h4 className="font-semibold text-gray-800 text-sm arabic mb-1">
                      {industry}
                    </h4>
                    <p className="text-gray-500 text-xs arabic">
                      {industryCount} شركة
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Section */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              إحصائيات الدليل
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Building className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {companies.length}
                </div>
                <div className="text-sm text-gray-600 arabic">
                  إجمالي الشركات
                </div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Verified className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {companies.filter((c) => c.status === "active").length}
                </div>
                <div className="text-sm text-gray-600 arabic">شركة موثقة</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {countries.length}
                </div>
                <div className="text-sm text-gray-600 arabic">دولة</div>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  {Math.round((companies.length * 50) / 1000)}
                  k+
                </div>
                <div className="text-sm text-gray-600 arabic">موظف</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-20">
            <Building className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد شركات مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث أو الفلاتر المختارة
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedIndustry("all");
                setSelectedCountry("all");
                setSelectedSize("all");
                setShowVerifiedOnly(false);
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
