import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Search,
  Filter,
  MapPin,
  Clock,
  Users,
  Eye,
  ExternalLink,
  Star,
  DollarSign,
  Calendar,
  Zap,
} from "lucide-react";
import { useJobs, JobsService } from "@/lib/jobs";
import { useState } from "react";

export default function Jobs() {
  const { jobs, featuredJobs, urgentJobs } = useJobs();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;
    const matchesType = selectedType === "all" || job.type === selectedType;

    return matchesSearch && matchesCategory && matchesType;
  });

  const categories = [
    { value: "all", label: "جميع المجالات" },
    { value: "technology", label: "تقنية المعلومات" },
    { value: "finance", label: "المالية والمحاسبة" },
    { value: "education", label: "التعليم" },
    { value: "healthcare", label: "الصحة والطب" },
    { value: "marketing", label: "التسويق" },
    { value: "engineering", label: "الهندسة" },
  ];

  const jobTypes = [
    { value: "all", label: "جميع الأنواع" },
    { value: "full-time", label: "دوام كامل" },
    { value: "part-time", label: "دوام جزئي" },
    { value: "remote", label: "عمل عن بُعد" },
    { value: "contract", label: "تعاقد" },
    { value: "internship", label: "تدريب" },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-800 rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4 arabic">
            لوحة الوظائف
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto arabic">
            فرص عمل متنوعة للمهنيين السودانيين في الخليج والعالم
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              <span className="arabic">{jobs.length} وظيفة متاحة</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span className="arabic">{featuredJobs.length} وظيفة مميزة</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span className="arabic">{urgentJobs.length} وظيفة عاجلة</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="ابحث في الوظائف، الشركات، المهارات..."
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
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-right arabic bg-white"
              >
                {jobTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Featured Jobs */}
        {featuredJobs.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-bold text-green-800 arabic">
                  الوظائف المميزة
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredJobs.slice(0, 2).map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-lg p-4 border border-green-200"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={job.companyLogo || "/placeholder.svg"}
                        alt={job.company}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 arabic text-sm mb-1">
                          {job.title}
                        </h3>
                        <p className="text-green-600 text-xs arabic mb-2">
                          {job.company}
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-green-500 text-white text-xs arabic">
                            {JobsService.getCategoryIcon(job.category)}{" "}
                            {JobsService.getCategoryName(job.category)}
                          </Badge>
                          <span className="text-green-600 font-bold text-sm arabic">
                            {JobsService.formatSalary(job.salary)}
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

        {/* Jobs List */}
        <div className="space-y-4 mb-8">
          {filteredJobs.map((job) => (
            <Card
              key={job.id}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Company Logo */}
                  <div className="flex-shrink-0">
                    <img
                      src={job.companyLogo || "/placeholder.svg"}
                      alt={job.company}
                      className="w-16 h-16 object-cover rounded-lg border-2 border-gray-100"
                    />
                  </div>

                  {/* Job Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-800 arabic group-hover:text-green-600 transition-colors">
                            {job.title}
                          </h3>
                          {job.isUrgent && (
                            <Badge className="bg-red-500 text-white text-xs arabic">
                              <Zap className="w-3 h-3 ml-1" />
                              عاجل
                            </Badge>
                          )}
                          {job.isFeatured && (
                            <Badge className="bg-yellow-500 text-white text-xs arabic">
                              <Star className="w-3 h-3 ml-1" />
                              ممي��
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <span className="font-semibold arabic">
                              {job.company}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="arabic">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span className="arabic">
                              {JobsService.getTimeAgo(job.postedAt)}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm arabic leading-relaxed mb-3 line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline" className="text-xs arabic">
                            {JobsService.getTypeIcon(job.type)}{" "}
                            {JobsService.getTypeName(job.type)}
                          </Badge>
                          <Badge variant="outline" className="text-xs arabic">
                            {JobsService.getCategoryIcon(job.category)}{" "}
                            {JobsService.getCategoryName(job.category)}
                          </Badge>
                          <Badge variant="outline" className="text-xs arabic">
                            {job.experience}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 4).map((skill, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs arabic"
                            >
                              {skill}
                            </Badge>
                          ))}
                          {job.skills.length > 4 && (
                            <Badge
                              variant="secondary"
                              className="text-xs arabic"
                            >
                              +{job.skills.length - 4}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Job Stats & Actions */}
                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <div className="text-lg font-bold text-green-600 arabic mb-1">
                            {JobsService.formatSalary(job.salary)}
                          </div>
                          <div className="text-sm text-gray-500 arabic">
                            /
                            {job.salary.period === "monthly"
                              ? "شهرياً"
                              : job.salary.period === "yearly"
                                ? "سنوياً"
                                : "بالساعة"}
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span className="arabic">
                              {job.applicationsCount} متقدم
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span className="arabic">{job.views} مشاهدة</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 text-sm text-orange-600">
                          <Calendar className="w-4 h-4" />
                          <span className="arabic">
                            ينتهي خلال{" "}
                            {JobsService.getDaysUntilExpiry(job.expiresAt)} يوم
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="arabic bg-green-600 hover:bg-green-700"
                            size="sm"
                          >
                            تقدم الآن
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="arabic"
                          >
                            <ExternalLink className="w-4 h-4 ml-1" />
                            تفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Job Categories */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 arabic">
              تصفح حسب المجال
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.slice(1).map((category) => {
                const jobCount = jobs.filter(
                  (job) => job.category === category.value,
                ).length;
                return (
                  <div
                    key={category.value}
                    className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedCategory(category.value)}
                  >
                    <div className="text-3xl mb-2">
                      {JobsService.getCategoryIcon(category.value)}
                    </div>
                    <h4 className="font-semibold text-gray-800 text-sm arabic mb-1">
                      {category.label}
                    </h4>
                    <p className="text-gray-500 text-xs arabic">
                      {jobCount} وظيفة
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <Briefcase className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-400 mb-4 arabic">
              لا توجد وظائف مطابقة للبحث
            </h2>
            <p className="text-gray-500 mb-8 arabic max-w-md mx-auto">
              جرب تغيير كلمات البحث أو الفئات المختارة
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedType("all");
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
