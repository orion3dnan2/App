import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Star,
  TrendingUp,
  Users,
  MapPin,
  Phone,
  Mail,
  ShoppingBag,
  Building2,
  Briefcase,
  Wrench,
  Megaphone,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function Index() {
  const { isRTL } = useTheme();

  const heroStats = [
    {
      icon: Users,
      number: "100K+",
      label: "مستخدم نشط",
    },
    {
      icon: Building2,
      number: "5K+",
      label: "شركة مسجلة",
    },
    {
      icon: ShoppingBag,
      number: "50K+",
      label: "منتج متوفر",
    },
    {
      icon: Briefcase,
      number: "2K+",
      label: "فرصة عمل",
    },
  ];

  const services = [
    {
      icon: ShoppingBag,
      title: "السوق التجاري",
      description: "اكتشف منتجات سودانية أصيلة من تجار موثوقين",
      href: "/marketplace",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: Building2,
      title: "دليل الشركات",
      description: "تواصل مع الشركات والمؤسسات السودانية في الخليج",
      href: "/companies",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: Briefcase,
      title: "لوحة الوظائف",
      description: "ابحث عن فرص عمل مناسبة أو أعلن عن وظائف شاغرة",
      href: "/jobs",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
    },
    {
      icon: Wrench,
      title: "الخدمات المهنية",
      description: "احصل على خدمات مهنية متخصصة من خبراء سودانيين",
      href: "/services",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
    },
    {
      icon: Megaphone,
      title: "الإعلانات",
      description: "روج لأعمالك وخدماتك للمجتمع السوداني",
      href: "/ads",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  const testimonials = [
    {
      name: "أحمد محمد",
      role: "صاحب متجر",
      content:
        "البيت السوداني ساعدني في الوصول لعملاء جدد وتنمية تجارتي بشكل كبير",
      rating: 5,
    },
    {
      name: "فاطمة عبدالله",
      role: "مديرة شركة",
      content: "منصة ممتازة للتواصل مع الشركات السودانية وإقامة شراكات تجارية",
      rating: 5,
    },
    {
      name: "عمر الحسن",
      role: "باحث عن عمل",
      content: "وجدت وظيفة أحلامي من خلال البيت السوداني في وقت قياسي",
      rating: 5,
    },
  ];

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fb1a0c751ea8f428fb17cf787dc4c95b1%2Fada8ce46064846e687a3341dd0ab9c15?format=webp&width=1200')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-primary-800/70 to-secondary-800/80 dark:from-primary-950/90 dark:via-primary-900/80 dark:to-secondary-900/90" />

        {/* Content */}
        <div className="relative container mx-auto px-4 py-12 md:py-20 lg:py-28">
          <div
            className={`max-w-4xl mx-auto text-center ${isRTL ? "text-right" : "text-center"}`}
          >
            {/* Main Title - Fixed Arabic Name */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 md:mb-6 arabic animate-fade-in leading-tight">
              البيت السوداني
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 arabic leading-relaxed animate-slide-up px-4 md:px-0">
              سوق وخدمات وشركات السودان في الخليج والعالم
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col xs:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 px-4 ${isRTL ? "xs:flex-row-reverse" : ""}`}
            >
              <Link to="/marketplace" className="w-full xs:w-auto">
                <Button
                  size="lg"
                  className="button-cultural w-full xs:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg arabic"
                >
                  استكشف السوق
                  <ArrowIcon
                    className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? "mr-2" : "ml-2"}`}
                  />
                </Button>
              </Link>
              <Link to="/register" className="w-full xs:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full xs:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-700 arabic"
                >
                  انضم إلينا
                </Button>
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8">
              {heroStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-2 md:mb-3">
                    <stat.icon className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <div className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm lg:text-base text-white/80 arabic px-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : "text-center"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 arabic">
              خدماتنا
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground arabic max-w-3xl mx-auto px-4">
              مجموعة شاملة من الخدمات المصممة خصيصاً للمجتمع السوداني في الخليج
              والعالم
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="card-dark hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 mx-auto ${service.bgColor} rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon
                      className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br ${service.color} bg-clip-text text-transparent`}
                    />
                  </div>
                  <CardTitle
                    className={`text-lg md:text-xl font-bold arabic ${isRTL ? "text-right" : "text-center"}`}
                  >
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent
                  className={`${isRTL ? "text-right" : "text-center"} pb-6`}
                >
                  <p className="text-sm md:text-base text-muted-foreground arabic mb-4 md:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <Link to={service.href}>
                    <Button
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 transition-opacity arabic text-sm md:text-base`}
                    >
                      اكتشف المزيد
                      <ArrowIcon
                        className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`}
                      />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div
            className={`text-center mb-12 md:mb-16 ${isRTL ? "text-right" : "text-center"}`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4 arabic">
              آراء عملائنا
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground arabic">
              ماذا يقول عملاؤنا عن تجربتهم معنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="card-dark animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-4 md:p-6">
                  <div
                    className={`flex items-center gap-1 mb-3 md:mb-4 ${isRTL ? "flex-row-reverse justify-end" : "justify-start"}`}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p
                    className={`text-sm md:text-base text-muted-foreground arabic mb-4 md:mb-6 leading-relaxed ${isRTL ? "text-right" : "text-left"}`}
                  >
                    "{testimonial.content}"
                  </p>
                  <div
                    className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm md:text-base">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <div className="font-semibold text-foreground arabic text-sm md:text-base">
                        {testimonial.name}
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground arabic">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 lg:py-24 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 dark:from-primary-800 dark:via-primary-900 dark:to-secondary-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4 arabic">
            ابدأ رحلتك معنا اليوم
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 md:mb-8 arabic max-w-2xl mx-auto px-4">
            ��نضم إلى آلاف السودانيين الذين يستخدمون البيت السوداني لتنمية أعمالهم وخدماتهم
          </p>
          <div
            className={`flex flex-col xs:flex-row gap-3 md:gap-4 justify-center px-4 ${isRTL ? "xs:flex-row-reverse" : ""}`}
          >
            <Link to="/register" className="w-full xs:w-auto">
              <Button
                size="lg"
                variant="secondary"
                className="w-full xs:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg arabic bg-white text-primary-700 hover:bg-white/90"
              >
                إنشاء حساب مجاني
                <ArrowIcon
                  className={`w-4 h-4 md:w-5 md:h-5 ${isRTL ? "mr-2" : "ml-2"}`}
                />
              </Button>
            </Link>
            <Link to="/login" className="w-full xs:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full xs:w-auto px-6 md:px-8 py-3 md:py-4 text-base md:text-lg border-white/20 text-white hover:bg-white/10 arabic"
              >
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
