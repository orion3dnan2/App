import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/contexts/ThemeContext";
import {
  FontFamilySelector,
  ThemeToggle,
  LanguageToggle,
} from "@/components/ThemeToggle";
import {
  Palette,
  Type,
  Moon,
  Sun,
  Languages,
  Eye,
  Smartphone,
  Monitor,
  Check,
  Star,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function ThemeShowcase() {
  const { theme, language, fontFamily, t, isRTL } = useTheme();

  const colorPalettes = [
    {
      name: "Primary",
      colors: [
        "primary-50",
        "primary-100",
        "primary-200",
        "primary-300",
        "primary-400",
        "primary-500",
        "primary-600",
        "primary-700",
        "primary-800",
        "primary-900",
      ],
    },
    {
      name: "Secondary",
      colors: [
        "secondary-50",
        "secondary-100",
        "secondary-200",
        "secondary-300",
        "secondary-400",
        "secondary-500",
        "secondary-600",
        "secondary-700",
        "secondary-800",
        "secondary-900",
      ],
    },
  ];

  const sampleComponents = [
    {
      type: "button",
      variants: ["default", "secondary", "outline", "destructive"],
    },
    {
      type: "badge",
      variants: ["default", "secondary", "outline", "destructive"],
    },
    { type: "card", variants: ["default"] },
  ];

  const sampleText = {
    ar: {
      title: "نص تجريبي باللغة العربية",
      paragraph:
        "هذا نص تجريبي لعرض الخط العربي المختار. يمكنك تغيير نوع الخط من القائمة أعلاه لمشاهدة الفرق في المظهر والوضوح.",
      short: "نص قصير",
      numbers: "١٢٣٤٥٦٧٨٩٠",
    },
    en: {
      title: "Sample English Text",
      paragraph:
        "This is a sample text to showcase the selected Arabic font. You can change the font type from the menu above to see the difference in appearance and clarity.",
      short: "Short text",
      numbers: "1234567890",
    },
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Header */}
          <div
            className={`text-center mb-12 ${isRTL ? "text-right" : "text-center"}`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 arabic">
              {isRTL ? "عرض المظاهر والثيمات" : "Theme & UI Showcase"}
            </h1>
            <p className="text-lg text-muted-foreground arabic max-w-3xl mx-auto">
              {isRTL
                ? "استكشف جميع إمكانيات التخصيص المتاحة في البيت السوداني"
                : "Explore all customization options available in Sudan House"}
            </p>
          </div>

          {/* Theme Controls */}
          <Card className="mb-8 card-dark">
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Palette className="w-6 h-6" />
                {isRTL ? "عناصر التحكم في المظهر" : "Theme Controls"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Theme Toggle */}
                <div
                  className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <Label className="text-sm font-medium arabic">
                    {isRTL ? "نمط العرض" : "Display Mode"}
                  </Label>
                  <div
                    className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <ThemeToggle />
                    <span className="text-sm text-muted-foreground arabic">
                      {theme === "light"
                        ? isRTL
                          ? "الوضع النهاري"
                          : "Light Mode"
                        : isRTL
                          ? "الوضع الليلي"
                          : "Dark Mode"}
                    </span>
                  </div>
                </div>

                {/* Language Toggle */}
                <div
                  className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <Label className="text-sm font-medium arabic">
                    {isRTL ? "اللغة" : "Language"}
                  </Label>
                  <div
                    className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <LanguageToggle />
                    <span className="text-sm text-muted-foreground arabic">
                      {language === "ar"
                        ? isRTL
                          ? "العربية"
                          : "Arabic"
                        : isRTL
                          ? "الإنجليزية"
                          : "English"}
                    </span>
                  </div>
                </div>

                {/* Font Family */}
                <div
                  className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <Label className="text-sm font-medium arabic">
                    {isRTL ? "نوع الخط" : "Font Family"}
                  </Label>
                  <FontFamilySelector />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palettes */}
          <Card className="mb-8 card-dark">
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Palette className="w-6 h-6" />
                {isRTL ? "لوحة الألوان" : "Color Palette"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {colorPalettes.map((palette) => (
                  <div key={palette.name} className="space-y-3">
                    <h3
                      className={`font-semibold text-foreground arabic ${isRTL ? "text-right" : "text-left"}`}
                    >
                      {palette.name} Colors
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {palette.colors.map((color) => (
                        <div
                          key={color}
                          className={`aspect-square rounded-lg bg-${color} border border-border`}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Typography Showcase */}
          <Card className="mb-8 card-dark">
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Type className="w-6 h-6" />
                {isRTL ? "عرض الخطوط" : "Typography Showcase"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Current Language Text */}
                <div
                  className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <h3 className="text-2xl font-bold text-foreground arabic">
                    {sampleText[language].title}
                  </h3>
                  <p className="text-lg text-muted-foreground arabic leading-relaxed">
                    {sampleText[language].paragraph}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium arabic">
                        {isRTL ? "نص قصير" : "Short Text"}
                      </Label>
                      <p className="text-foreground arabic">
                        {sampleText[language].short}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium arabic">
                        {isRTL ? "الأرقام" : "Numbers"}
                      </Label>
                      <p className="text-foreground arabic">
                        {sampleText[language].numbers}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Font Sizes */}
                <div
                  className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <h4 className="text-lg font-semibold text-foreground arabic">
                    {isRTL ? "أحجام الخط" : "Font Sizes"}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground arabic">
                      Extra Small (12px)
                    </p>
                    <p className="text-sm text-muted-foreground arabic">
                      Small (14px)
                    </p>
                    <p className="text-base text-foreground arabic">
                      Base (16px)
                    </p>
                    <p className="text-lg text-foreground arabic">
                      Large (18px)
                    </p>
                    <p className="text-xl text-foreground arabic">
                      Extra Large (20px)
                    </p>
                    <p className="text-2xl text-foreground arabic">
                      2XL (24px)
                    </p>
                    <p className="text-3xl text-foreground arabic">
                      3XL (30px)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Component Showcase */}
          <Card className="mb-8 card-dark">
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Eye className="w-6 h-6" />
                {isRTL ? "عرض المكونات" : "Component Showcase"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {/* Buttons */}
                <div
                  className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <h4 className="text-lg font-semibold text-foreground arabic">
                    {isRTL ? "الأزرار" : "Buttons"}
                  </h4>
                  <div
                    className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Button variant="default" className="arabic">
                      {isRTL ? "افتراضي" : "Default"}
                    </Button>
                    <Button variant="secondary" className="arabic">
                      {isRTL ? "ثانوي" : "Secondary"}
                    </Button>
                    <Button variant="outline" className="arabic">
                      {isRTL ? "محدد" : "Outline"}
                    </Button>
                    <Button variant="destructive" className="arabic">
                      {isRTL ? "حذف" : "Destructive"}
                    </Button>
                    <Button variant="ghost" className="arabic">
                      {isRTL ? "شفاف" : "Ghost"}
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div
                  className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <h4 className="text-lg font-semibold text-foreground arabic">
                    {isRTL ? "الشارات" : "Badges"}
                  </h4>
                  <div
                    className={`flex flex-wrap gap-3 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Badge variant="default" className="arabic">
                      {isRTL ? "افتراضي" : "Default"}
                    </Badge>
                    <Badge variant="secondary" className="arabic">
                      {isRTL ? "ثانوي" : "Secondary"}
                    </Badge>
                    <Badge variant="outline" className="arabic">
                      {isRTL ? "محدد" : "Outline"}
                    </Badge>
                    <Badge variant="destructive" className="arabic">
                      {isRTL ? "حذف" : "Destructive"}
                    </Badge>
                  </div>
                </div>

                {/* Form Elements */}
                <div
                  className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <h4 className="text-lg font-semibold text-foreground arabic">
                    {isRTL ? "عناصر النموذج" : "Form Elements"}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="arabic">
                        {isRTL ? "حقل النص" : "Text Input"}
                      </Label>
                      <Input
                        placeholder={
                          isRTL ? "أدخل النص هنا..." : "Enter text here..."
                        }
                        className="arabic"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">
                        {isRTL ? "مفتاح التبديل" : "Toggle Switch"}
                      </Label>
                      <div
                        className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <Switch />
                        <span className="text-sm text-muted-foreground arabic">
                          {isRTL ? "تفعيل الخاصية" : "Enable Feature"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Icons */}
                <div
                  className={`space-y-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <h4 className="text-lg font-semibold text-foreground arabic">
                    {isRTL ? "الأيقونات" : "Icons"}
                  </h4>
                  <div
                    className={`flex flex-wrap gap-4 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="flex items-center gap-2">
                      <Check className="w-5 h-5 text-green-600" />
                      <span className="text-sm arabic">
                        {isRTL ? "مكتمل" : "Complete"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm arabic">
                        {isRTL ? "مفضل" : "Favorite"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      <span className="text-sm arabic">
                        {isRTL ? "أعجبني" : "Like"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-sm arabic">
                        {isRTL ? "رسالة" : "Message"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responsive Design */}
          <Card className="mb-8 card-dark">
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                <Smartphone className="w-6 h-6" />
                {isRTL ? "التصميم التجاوبي" : "Responsive Design"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                  className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Smartphone className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold arabic">
                      {isRTL ? "الهواتف المحمولة" : "Mobile Devices"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground arabic">
                    {isRTL
                      ? "التصميم محسّن للهواتف الذكية مع نصوص واضحة وأزرار قابلة للنقر بسهولة"
                      : "Design optimized for smartphones with clear text and easily tappable buttons"}
                  </p>
                </div>
                <div
                  className={`space-y-3 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <div
                    className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <Monitor className="w-5 h-5 text-primary-600" />
                    <span className="font-semibold arabic">
                      {isRTL ? "أجهزة سطح المكتب" : "Desktop Devices"}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground arabic">
                    {isRTL
                      ? "استغلال أمثل للمساحة المتاحة مع تجربة مستخدم محسّنة للشاشات الكبيرة"
                      : "Optimal use of available space with enhanced user experience for large screens"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cultural Elements */}
          <Card className="card-dark">
            <CardHeader>
              <CardTitle
                className={`flex items-center gap-2 arabic ${isRTL ? "flex-row-reverse" : "flex-row"}`}
              >
                🇸🇩
                {isRTL
                  ? "العناصر الثقافية السودانية"
                  : "Sudanese Cultural Elements"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div
                  className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg text-white">
                    <h5 className="font-semibold arabic mb-2">
                      {isRTL ? "أزرق النيل" : "Nile Blue"}
                    </h5>
                    <p className="text-sm text-white/80 arabic">
                      {isRTL
                        ? "مستوحى من نهر النيل العظيم"
                        : "Inspired by the great Nile River"}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg text-white">
                    <h5 className="font-semibold arabic mb-2">
                      {isRTL ? "ذهبي الصحراء" : "Desert Gold"}
                    </h5>
                    <p className="text-sm text-white/80 arabic">
                      {isRTL
                        ? "يعكس جمال الصحراء السودانية"
                        : "Reflects the beauty of Sudanese desert"}
                    </p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg text-white">
                    <h5 className="font-semibold arabic mb-2">
                      {isRTL ? "غروب سوداني" : "Sudanese Sunset"}
                    </h5>
                    <p className="text-sm text-white/80 arabic">
                      {isRTL ? "ألوان الغروب الدافئة" : "Warm sunset colors"}
                    </p>
                  </div>
                </div>

                <div
                  className={`text-center py-8 bg-sudanese-pattern rounded-lg ${isRTL ? "text-right" : "text-center"}`}
                >
                  <h4 className="text-xl font-bold text-foreground arabic mb-2">
                    {isRTL ? "البيت السوداني" : "Sudan House"}
                  </h4>
                  <p className="text-muted-foreground arabic">
                    {isRTL
                      ? "حيث التراث يلتقي بالحداثة"
                      : "Where heritage meets modernity"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
