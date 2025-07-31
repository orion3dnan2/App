import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Save,
  X,
} from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.profile.name || "",
    email: user?.email || "",
    phone: user?.profile.phone || "",
    city: user?.profile.city || "",
    country: user?.profile.country || "",
  });

  const handleSave = () => {
    // هنا يمكن إضافة منطق حفظ البيانات
    console.log("Saving profile data:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // إعادة تعيين البيانات
    setFormData({
      name: user?.profile.name || "",
      email: user?.email || "",
      phone: user?.profile.phone || "",
      city: user?.profile.city || "",
      country: user?.profile.country || "",
    });
    setIsEditing(false);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "super_admin":
        return <Badge variant="destructive">مدير عام</Badge>;
      case "merchant":
        return <Badge variant="secondary">تاجر</Badge>;
      case "customer":
        return <Badge variant="outline">عميل</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">يجب تسجيل الدخول أولاً</p>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* عنوان الصفحة */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white arabic">
              الملف الشخصي
            </h1>
            <p className="text-muted-foreground mt-2 arabic">
              إدارة معلوماتك الشخصية
            </p>
          </div>

          {/* بطاقة الملف الشخصي */}
          <Card>
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage
                    src={user.profile.avatar}
                    alt={user.profile.name}
                  />
                  <AvatarFallback className="text-lg">
                    {getInitials(user.profile.name)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="space-y-2">
                <CardTitle className="text-2xl arabic">
                  {user.profile.name}
                </CardTitle>
                <div className="flex justify-center">
                  {getRoleBadge(user.role)}
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* أزرار التحكم */}
              <div className="flex justify-center gap-3">
                {!isEditing ? (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="gap-2 arabic"
                  >
                    <Edit className="w-4 h-4" />
                    تعديل المعلومات
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="gap-2 arabic">
                      <Save className="w-4 h-4" />
                      حفظ
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      className="gap-2 arabic"
                    >
                      <X className="w-4 h-4" />
                      إلغ��ء
                    </Button>
                  </div>
                )}
              </div>

              {/* معلومات المستخدم */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="arabic flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      الاسم الكامل
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="arabic"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md arabic">
                        {user.profile.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="arabic flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      البريد الإلكتروني
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="arabic"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="arabic flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      رقم الهاتف
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="arabic"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md">
                        {user.profile.phone || "غير محدد"}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="arabic flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      المدينة
                    </Label>
                    {isEditing ? (
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                        className="arabic"
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground p-2 bg-muted rounded-md arabic">
                        {user.profile.city || "غير محدد"}
                      </p>
                    )}
                  </div>
                </div>

                {/* معلومات إضافية */}
                <div className="border-t pt-4 space-y-3">
                  <h3 className="font-semibold arabic">معلومات الحساب</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground arabic">
                        تاريخ التسجيل:
                      </span>
                      <span className="arabic">
                        {new Date(user.createdAt).toLocaleDateString("ar")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground arabic">
                        نوع الحساب:
                      </span>
                      {getRoleBadge(user.role)}
                    </div>
                  </div>
                </div>

                {/* معلومات العمل للتجار */}
                {user.role === "merchant" && user.profile.businessName && (
                  <div className="border-t pt-4 space-y-3">
                    <h3 className="font-semibold arabic">معلومات العمل</h3>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="text-muted-foreground arabic">
                          اسم المتجر:{" "}
                        </span>
                        <span className="arabic">
                          {user.profile.businessName}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="text-muted-foreground arabic">
                          نوع العمل:{" "}
                        </span>
                        <span className="arabic">
                          {user.profile.businessType}
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
