import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Layout } from "@/components/Layout";
import { LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // تحقق من البيانات
    if (!formData.username.trim()) {
      setError("يرجى إدخال اسم المستخدم");
      setIsLoading(false);
      return;
    }

    if (!formData.password.trim()) {
      setError("يرجى إدخال كلمة المرور");
      setIsLoading(false);
      return;
    }

    try {
      const user = await login({
        username: formData.username,
        password: formData.password,
      });

      console.log("Login successful:", user);

      // Redirect based on user role
      const from = location.state?.from?.pathname || "/";
      if (user.role === "super_admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "merchant") {
        navigate("/merchant/dashboard");
      } else {
        navigate(from);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "حدث خطأ في تسجيل الدخول. يرجى المحاولة مرة أخرى.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-8 md:py-12 px-4">
        <div className="w-full max-w-md">
          {/* Login Form */}
          <Card className="shadow-2xl border-0 rounded-3xl bg-white backdrop-blur-sm">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center shadow-lg">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-2xl font-bold text-secondary-800 arabic">
                تسجيل الدخول
              </h1>
              <p className="text-secondary-600 arabic">
                أدخل بيانات تسجيل دخولك
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="username"
                      className="text-right block mb-2 arabic text-secondary-700 font-semibold"
                    >
                      🧑 اسم المستخدم
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="أدخل اسم المستخدم"
                      value={formData.username}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      className="text-right arabic rounded-xl border-secondary-200 focus:border-primary-600 focus:ring-primary-600"
                      required
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="password"
                      className="text-right block mb-2 arabic text-secondary-700 font-semibold"
                    >
                      🔐 كلمة المرور
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="أدخل كلمة المرور"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            password: e.target.value,
                          }))
                        }
                        className="text-right arabic pr-12 rounded-xl border-secondary-200 focus:border-primary-600 focus:ring-primary-600"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-600"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          rememberMe: checked as boolean,
                        }))
                      }
                    />
                    <Label
                      htmlFor="remember"
                      className="text-sm arabic text-secondary-600"
                    >
                      تذكرني
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-primary-600 hover:underline arabic font-semibold"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </div>

                {error && (
                  <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-xl text-center arabic">
                    ⚠️ {error}
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-lg py-4 arabic rounded-xl font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                      جاري تسجيل الدخول...
                    </>
                  ) : (
                    "تسجيل الدخول →"
                  )}
                </Button>

                <div className="text-center">
                  <span className="text-secondary-600 arabic">
                    ليس لديك حساب؟{" "}
                  </span>
                  <Link
                    to="/register"
                    className="text-primary-600 hover:underline arabic font-semibold"
                  >
                    انشئ حساب جديد
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Demo Instructions */}
          <Card className="mt-6 bg-gradient-to-br from-primary-50 to-primary-100 border-primary-200 rounded-2xl">
            <CardContent className="p-6">
              <h3 className="font-semibold text-primary-800 mb-3 arabic">
                حسابات التجربة
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border">
                  <h4 className="font-bold text-primary-700 arabic mb-1">
                    مدير التطبيق (Super Admin)
                  </h4>
                  <div className="text-sm space-y-1">
                    <div>
                      اسم المستخدم:{" "}
                      <code className="bg-primary-200 px-2 py-1 rounded-lg">
                        admin
                      </code>
                    </div>
                    <div>
                      ك��مة المرور:{" "}
                      <code className="bg-primary-200 px-2 py-1 rounded-lg">
                        admin
                      </code>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <h4 className="font-bold text-secondary-700 arabic mb-1">
                    صاحب متجر (Merchant)
                  </h4>
                  <div className="text-sm space-y-1">
                    <div>
                      اسم المستخدم:{" "}
                      <code className="bg-secondary-200 px-2 py-1 rounded-lg">
                        merchant
                      </code>
                    </div>
                    <div>
                      كلمة المرور:{" "}
                      <code className="bg-secondary-200 px-2 py-1 rounded-lg">
                        merchant
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
