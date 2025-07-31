import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Layout } from "@/components/Layout";
import { ShieldX, Home, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Unauthorized() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 py-8 md:py-12 px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-0 rounded-3xl bg-white backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <ShieldX className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-red-800 arabic">
                غير مسموح بالوصول
              </h1>
              <p className="text-red-600 arabic">
                ليس لديك صلاحية للوصول إلى هذه الصفحة
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-4 rounded-xl text-center arabic">
                <p className="mb-2">🚫 الوصول مرفوض</p>
                {user && (
                  <p className="text-sm">
                    مرحباً {user.profile.name}، صلاحيتك الحالية:{" "}
                    <strong>{user.role}</strong>
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  asChild
                  size="lg"
                  className="w-full text-lg py-4 arabic rounded-xl font-semibold"
                >
                  <Link to="/">
                    <Home className="w-5 h-5 ml-2" />
                    العودة للصفحة الرئيسية
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleLogout}
                  className="w-full text-lg py-4 arabic rounded-xl font-semibold"
                >
                  <LogOut className="w-5 h-5 ml-2" />
                  تسجيل الخروج
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600 arabic">
                  إذا كنت تعتقد أن هذا خطأ، يرجى التواصل مع المسؤول
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
