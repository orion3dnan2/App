import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  Palette,
  Globe,
  Shield,
  ArrowLeft,
  Save,
  RotateCcw,
  Type,
  Image,
  Monitor,
  Smartphone,
  Eye,
  Upload,
} from "lucide-react";
import { useAppSettings } from "@/lib/appSettings";
import { useAuth } from "@/lib/auth";

export default function AdminSettings() {
  const { user } = useAuth();
  const {
    settings,
    updateTheme,
    updateBranding,
    updateFeatures,
    saveSettings,
    resetToDefaults,
    colorPalettes,
    fontFamilies,
  } = useAppSettings();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleThemeChange = (key: string, value: any) => {
    const updatedSettings = {
      ...localSettings,
      theme: { ...localSettings.theme, [key]: value },
    };
    setLocalSettings(updatedSettings);
    setUnsavedChanges(true);
  };

  const handleBrandingChange = (key: string, value: any) => {
    const updatedSettings = {
      ...localSettings,
      branding: { ...localSettings.branding, [key]: value },
    };
    setLocalSettings(updatedSettings);
    setUnsavedChanges(true);
  };

  const handleFeatureChange = (key: string, value: boolean) => {
    const updatedSettings = {
      ...localSettings,
      features: { ...localSettings.features, [key]: value },
    };
    setLocalSettings(updatedSettings);
    setUnsavedChanges(true);
  };

  const handleSave = () => {
    saveSettings(localSettings);
    setUnsavedChanges(false);
    // Optionally show success message
  };

  const handleReset = () => {
    resetToDefaults();
    window.location.reload(); // Reload to apply changes
  };

  const applyColorPalette = (palette: {
    primary: string;
    secondary: string;
  }) => {
    handleThemeChange("primaryColor", palette.primary);
    handleThemeChange("secondaryColor", palette.secondary);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">
                  إعدادات التطبيق
                </h1>
                <p className="text-gray-600 arabic">
                  تخصيص المظهر والإعدادات العامة
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              {unsavedChanges && (
                <Badge variant="secondary" className="arabic">
                  تغييرات غير محفوظة
                </Badge>
              )}
              <Button
                variant="outline"
                onClick={handleReset}
                className="arabic"
              >
                <RotateCcw className="w-4 h-4 ml-2" />
                إعادة تعيين
              </Button>
              <Button
                onClick={handleSave}
                disabled={!unsavedChanges}
                className="arabic"
              >
                <Save className="w-4 h-4 ml-2" />
                حفظ التغييرات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="theme" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="theme" className="arabic">
              المظهر
            </TabsTrigger>
            <TabsTrigger value="branding" className="arabic">
              العلامة التجارية
            </TabsTrigger>
            <TabsTrigger value="features" className="arabic">
              الميزات
            </TabsTrigger>
            <TabsTrigger value="content" className="arabic">
              المحتوى
            </TabsTrigger>
            <TabsTrigger value="advanced" className="arabic">
              متقدم
            </TabsTrigger>
          </TabsList>

          {/* Theme Settings */}
          <TabsContent value="theme" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Color Palette */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center arabic">
                    <Palette className="w-5 h-5 ml-2" />
                    نظام الألوان
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold arabic">الألوان الحالية</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="arabic">اللون الأساسي</Label>
                        <div className="flex items-center space-x-2 space-x-reverse mt-2">
                          <div
                            className="w-8 h-8 rounded-lg border-2 border-gray-300"
                            style={{
                              backgroundColor: localSettings.theme.primaryColor,
                            }}
                          ></div>
                          <Input
                            type="color"
                            value={localSettings.theme.primaryColor}
                            onChange={(e) =>
                              handleThemeChange("primaryColor", e.target.value)
                            }
                            className="w-20 h-8 p-0 border-0"
                          />
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {localSettings.theme.primaryColor}
                          </code>
                        </div>
                      </div>
                      <div>
                        <Label className="arabic">اللون الثانوي</Label>
                        <div className="flex items-center space-x-2 space-x-reverse mt-2">
                          <div
                            className="w-8 h-8 rounded-lg border-2 border-gray-300"
                            style={{
                              backgroundColor:
                                localSettings.theme.secondaryColor,
                            }}
                          ></div>
                          <Input
                            type="color"
                            value={localSettings.theme.secondaryColor}
                            onChange={(e) =>
                              handleThemeChange(
                                "secondaryColor",
                                e.target.value,
                              )
                            }
                            className="w-20 h-8 p-0 border-0"
                          />
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {localSettings.theme.secondaryColor}
                          </code>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold arabic">الألوان المقترحة</h3>
                    <div className="grid grid-cols-1 gap-3">
                      {Object.entries(colorPalettes).map(([name, palette]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center space-x-3 space-x-reverse">
                            <div className="flex space-x-1 space-x-reverse">
                              <div
                                className="w-6 h-6 rounded-md"
                                style={{ backgroundColor: palette.primary }}
                              ></div>
                              <div
                                className="w-6 h-6 rounded-md"
                                style={{ backgroundColor: palette.secondary }}
                              ></div>
                            </div>
                            <span className="text-sm arabic">{name}</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => applyColorPalette(palette)}
                            className="arabic"
                          >
                            تطبيق
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Typography */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center arabic">
                    <Type className="w-5 h-5 ml-2" />
                    الخطوط والنصوص
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="arabic">عائلة الخط</Label>
                    <select
                      value={localSettings.theme.fontFamily}
                      onChange={(e) =>
                        handleThemeChange("fontFamily", e.target.value)
                      }
                      className="w-full mt-2 p-2 border rounded-lg arabic"
                    >
                      {Object.entries(fontFamilies).map(([name, value]) => (
                        <option key={name} value={name}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label className="arabic">تخطيط التطبيق</Label>
                    <select
                      value={localSettings.theme.layout}
                      onChange={(e) =>
                        handleThemeChange("layout", e.target.value)
                      }
                      className="w-full mt-2 p-2 border rounded-lg arabic"
                    >
                      <option value="modern">عصري</option>
                      <option value="classic">كلاسيكي</option>
                      <option value="minimal">بسيط</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold arabic">معاينة النص</h3>
                    <div className="p-4 border rounded-lg bg-gray-50">
                      <h4
                        className="text-xl font-bold mb-2 arabic"
                        style={{
                          fontFamily:
                            fontFamilies[
                              localSettings.theme
                                .fontFamily as keyof typeof fontFamilies
                            ],
                        }}
                      >
                        البيت السوداني
                      </h4>
                      <p
                        className="text-gray-600 arabic"
                        style={{
                          fontFamily:
                            fontFamilies[
                              localSettings.theme
                                .fontFamily as keyof typeof fontFamilies
                            ],
                        }}
                      >
                        سوق الخدمات وشركات السودان في الخليج والعالم
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center arabic">
                  <Eye className="w-5 h-5 ml-2" />
                  معاينة المظهر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Monitor className="w-5 h-5" />
                      <span className="arabic">سطح المكتب</span>
                    </div>
                    <div className="border rounded-lg p-4 bg-white">
                      <div
                        className="h-3 rounded mb-3"
                        style={{
                          backgroundColor: localSettings.theme.primaryColor,
                        }}
                      ></div>
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        <div
                          className="h-8 rounded"
                          style={{
                            backgroundColor: localSettings.theme.secondaryColor,
                            opacity: 0.3,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Smartphone className="w-5 h-5" />
                      <span className="arabic">الجوال</span>
                    </div>
                    <div className="border rounded-lg p-3 bg-white max-w-48">
                      <div
                        className="h-2 rounded mb-2"
                        style={{
                          backgroundColor: localSettings.theme.primaryColor,
                        }}
                      ></div>
                      <div className="space-y-1">
                        <div className="h-1 bg-gray-200 rounded w-full"></div>
                        <div className="h-1 bg-gray-200 rounded w-2/3"></div>
                        <div
                          className="h-4 rounded mt-2"
                          style={{
                            backgroundColor: localSettings.theme.secondaryColor,
                            opacity: 0.3,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branding Settings */}
          <TabsContent value="branding" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center arabic">
                    <Image className="w-5 h-5 ml-2" />
                    المعلومات الأساسية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="arabic">اسم التطبيق</Label>
                    <Input
                      value={localSettings.branding.appName}
                      onChange={(e) =>
                        handleBrandingChange("appName", e.target.value)
                      }
                      className="mt-2 arabic text-right"
                      placeholder="البيت السوداني"
                    />
                  </div>

                  <div>
                    <Label className="arabic">الشعار الفرعي</Label>
                    <Input
                      value={localSettings.branding.tagline}
                      onChange={(e) =>
                        handleBrandingChange("tagline", e.target.value)
                      }
                      className="mt-2 arabic text-right"
                      placeholder="سوق الخدمات وشركات السودان في الخليج والعالم"
                    />
                  </div>

                  <div>
                    <Label className="arabic">رابط الشعار</Label>
                    <Input
                      value={localSettings.branding.logo}
                      onChange={(e) =>
                        handleBrandingChange("logo", e.target.value)
                      }
                      className="mt-2"
                      placeholder="https://example.com/logo.png"
                    />
                    <Button variant="outline" size="sm" className="mt-2 arabic">
                      <Upload className="w-4 h-4 ml-2" />
                      رفع صورة
                    </Button>
                  </div>

                  <div>
                    <Label className="arabic">أيقونة الموقع (Favicon)</Label>
                    <Input
                      value={localSettings.branding.favicon}
                      onChange={(e) =>
                        handleBrandingChange("favicon", e.target.value)
                      }
                      className="mt-2"
                      placeholder="/favicon.ico"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center arabic">
                    <Image className="w-5 h-5 ml-2" />
                    صورة الخلفية
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="arabic">رابط صورة الخلفية</Label>
                    <Textarea
                      value={localSettings.branding.heroBackground}
                      onChange={(e) =>
                        handleBrandingChange("heroBackground", e.target.value)
                      }
                      className="mt-2"
                      rows={3}
                      placeholder="https://example.com/background.jpg"
                    />
                    <Button variant="outline" size="sm" className="mt-2 arabic">
                      <Upload className="w-4 h-4 ml-2" />
                      رفع صور�� جديدة
                    </Button>
                  </div>

                  {localSettings.branding.heroBackground && (
                    <div>
                      <Label className="arabic">معاينة الصورة</Label>
                      <div className="mt-2 border rounded-lg overflow-hidden">
                        <img
                          src={localSettings.branding.heroBackground}
                          alt="Hero Background Preview"
                          className="w-full h-32 object-cover"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Features Settings */}
          <TabsContent value="features" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center arabic">
                  <Shield className="w-5 h-5 ml-2" />
                  تفعيل/إلغاء الميزات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(localSettings.features).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <Label className="font-medium arabic">
                            {key === "enableMarketplace" && "السوق التجاري"}
                            {key === "enableProducts" && "المنتجات"}
                            {key === "enableCompanies" && "الشركات"}
                            {key === "enableJobs" && "الوظائف"}
                            {key === "enableServices" && "الخدمات"}
                            {key === "enableAds" && "الإعلانات"}
                            {key === "enableReviews" && "التقييمات"}
                            {key === "enableChat" && "الدردشة"}
                          </Label>
                          <p className="text-sm text-gray-600 arabic">
                            {key === "enableMarketplace" &&
                              "تفعيل قسم السوق التجاري"}
                            {key === "enableProducts" &&
                              "تفعيل قسم بيع المنتجات"}
                            {key === "enableCompanies" && "تفعيل دليل الشركات"}
                            {key === "enableJobs" && "تفعيل لوحة الوظائف"}
                            {key === "enableServices" && "تفعيل قائمة الخدمات"}
                            {key === "enableAds" && "تفعيل الإعلانات المدفوعة"}
                            {key === "enableReviews" && "تفعيل نظام التقييمات"}
                            {key === "enableChat" && "تفعيل الدردشة المباشرة"}
                          </p>
                        </div>
                        <Switch
                          checked={value}
                          onCheckedChange={(checked) =>
                            handleFeatureChange(key, checked)
                          }
                        />
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Settings */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center arabic">
                    <Globe className="w-5 h-5 ml-2" />
                    السياسات والشروط
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="arabic">الشر��ط والأحكام</Label>
                    <Textarea
                      value={localSettings.policies.termsOfService}
                      onChange={(e) =>
                        handleBrandingChange("termsOfService", e.target.value)
                      }
                      className="mt-2 arabic text-right"
                      rows={4}
                      placeholder="أدخل الشروط والأحكام..."
                    />
                  </div>

                  <div>
                    <Label className="arabic">سياسة الخصوصية</Label>
                    <Textarea
                      value={localSettings.policies.privacyPolicy}
                      onChange={(e) =>
                        handleBrandingChange("privacyPolicy", e.target.value)
                      }
                      className="mt-2 arabic text-right"
                      rows={4}
                      placeholder="أدخل سياسة الخصوصية..."
                    />
                  </div>

                  <div>
                    <Label className="arabic">سياسة الإرجاع</Label>
                    <Textarea
                      value={localSettings.policies.refundPolicy}
                      onChange={(e) =>
                        handleBrandingChange("refundPolicy", e.target.value)
                      }
                      className="mt-2 arabic text-right"
                      rows={4}
                      placeholder="أدخل سياسة الإرجاع..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Settings */}
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center arabic">
                  <Settings className="w-5 h-5 ml-2" />
                  الإعدادات المتقدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-yellow-800 arabic">
                    ⚠️ تحذير: الإعدادات المتقدمة قد تؤثر على أداء التطبيق. يُنصح
                    بعدم تغييرها إلا إذا كنت تعرف ما تفعل.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="arabic">اللغة الافتراضية</Label>
                    <select
                      value={localSettings.localization.defaultLanguage}
                      onChange={(e) =>
                        setLocalSettings({
                          ...localSettings,
                          localization: {
                            ...localSettings.localization,
                            defaultLanguage: e.target.value as "ar" | "en",
                          },
                        })
                      }
                      className="w-full mt-2 p-2 border rounded-lg arabic"
                    >
                      <option value="ar">العربية</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="font-medium arabic">
                        دعم الكتابة من اليمين لليسار
                      </Label>
                      <p className="text-sm text-gray-600 arabic">
                        تفعيل RTL للغة العربية
                      </p>
                    </div>
                    <Switch
                      checked={localSettings.localization.rtlSupport}
                      onCheckedChange={(checked) =>
                        setLocalSettings({
                          ...localSettings,
                          localization: {
                            ...localSettings.localization,
                            rtlSupport: checked,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="pt-6 border-t">
                  <Button
                    variant="destructive"
                    onClick={handleReset}
                    className="arabic"
                  >
                    <RotateCcw className="w-4 h-4 ml-2" />
                    إعادة تعيين جميع الإعدادات
                  </Button>
                  <p className="text-sm text-gray-600 mt-2 arabic">
                    سيتم حذف جميع التخصيصات والعودة للإعدادات الافتراضية
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
