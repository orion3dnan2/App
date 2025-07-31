import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell, Package, Star, Mail, Settings, CheckCircle } from "lucide-react";

interface NotificationSettings {
  newOrders: boolean;
  orderUpdates: boolean;
  paymentReceived: boolean;
  lowStock: boolean;
  reviews: boolean;
  promotions: boolean;
  smsNotifications: boolean;
  emailNotifications: boolean;
}

interface NotificationsSettingsProps {
  notifications: NotificationSettings;
  setNotifications: (notifications: NotificationSettings) => void;
}

export default function NotificationsSettings({
  notifications,
  setNotifications,
}: NotificationsSettingsProps) {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-br from-purple-50 via-white to-blue-50 border-purple-100">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="arabic text-xl text-gray-900">
                  إعدادات الإشعارات
                </CardTitle>
                <p className="text-sm text-gray-600 arabic mt-1">
                  تخصيص طريقة استلام الإشعارات المهمة لمتجرك
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <Badge
                variant="outline"
                className="arabic text-xs bg-purple-50 text-purple-700 border-purple-200"
              >
                {Object.values(notifications).filter(Boolean).length} من{" "}
                {Object.keys(notifications).length} مفعل
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Order Notifications */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 arabic text-lg">
                إشعارات الطلبات
              </h3>
              <p className="text-sm text-gray-500 arabic">
                تنبيهات حول طلبات العملاء والمدفوعات
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              key: "newOrders",
              label: "طلبات جديدة",
              desc: "إشعارات فورية عند وصول طلبات جديدة من العملاء",
              icon: "🛍️",
              priority: "عالية",
            },
            {
              key: "orderUpdates",
              label: "تحديثات الطلبات",
              desc: "إشعارات عند تغيير حالة الطلبات أو إلغاءها من العملاء",
              icon: "📝",
              priority: "متوسطة",
            },
            {
              key: "paymentReceived",
              label: "استلام الدفعات",
              desc: "إشعارات عند استلام المدفوعات وتأكيد المعاملات المالية",
              icon: "💰",
              priority: "عالية",
            },
          ].map((item) => (
            <div
              key={item.key}
              className={`group relative p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                notifications[item.key as keyof NotificationSettings]
                  ? "bg-green-50 border-green-200 shadow-md ring-2 ring-green-100"
                  : "bg-gray-50 border-gray-200 hover:border-green-200 hover:bg-white"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4 space-x-reverse flex-1">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-900 arabic text-base">
                        {item.label}
                      </h4>
                      <Badge
                        variant={
                          item.priority === "عالية"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs arabic"
                      >
                        {item.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 arabic leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <div className="mr-4">
                  <Switch
                    checked={
                      notifications[item.key as keyof NotificationSettings]
                    }
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        [item.key]: checked,
                      })
                    }
                    className="data-[state=checked]:bg-green-600 scale-110"
                  />
                </div>
              </div>
              {notifications[item.key as keyof NotificationSettings] && (
                <div className="mt-4 p-3 bg-green-100 rounded-lg border border-green-200">
                  <div className="flex items-center text-green-700">
                    <CheckCircle className="w-4 h-4 ml-2" />
                    <span className="text-sm font-medium arabic">
                      مفعل ويعمل بشكل طبيعي
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Inventory & Reviews Notifications */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 arabic text-lg">
                المخزون والتفاعل
              </h3>
              <p className="text-sm text-gray-500 arabic">
                تنبيهات المخزون ومراجعات العملاء
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                key: "lowStock",
                label: "نفاد المخزون",
                desc: "تنبيه مبكر عند انخفاض كمية المنتجات تحت الحد المحدد",
                icon: "📦",
                priority: "عالية",
              },
              {
                key: "reviews",
                label: "المراجعات الجديدة",
                desc: "إشعارات عند وصول مراجعات وتقييمات جديدة من العملاء",
                icon: "⭐",
                priority: "متوسطة",
              },
            ].map((item) => (
              <div
                key={item.key}
                className={`group relative p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  notifications[item.key as keyof NotificationSettings]
                    ? "bg-orange-50 border-orange-200 shadow-md ring-2 ring-orange-100"
                    : "bg-gray-50 border-gray-200 hover:border-orange-200 hover:bg-white"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 arabic text-base">
                        {item.label}
                      </h4>
                      <Badge
                        variant={
                          item.priority === "عالية"
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-xs arabic mt-1"
                      >
                        {item.priority}
                      </Badge>
                    </div>
                  </div>
                  <Switch
                    checked={
                      notifications[item.key as keyof NotificationSettings]
                    }
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        [item.key]: checked,
                      })
                    }
                    className="data-[state=checked]:bg-orange-600 scale-110"
                  />
                </div>
                <p className="text-sm text-gray-600 arabic leading-relaxed">
                  {item.desc}
                </p>
                {notifications[item.key as keyof NotificationSettings] && (
                  <div className="mt-4 p-3 bg-orange-100 rounded-lg border border-orange-200">
                    <div className="flex items-center text-orange-700">
                      <CheckCircle className="w-4 h-4 ml-2" />
                      <span className="text-sm font-medium arabic">
                        مفعل ويعمل بشكل طبيعي
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Methods */}
      <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 arabic text-lg">
                طرق الإشعار
              </h3>
              <p className="text-sm text-gray-500 arabic">
                اختر كيفية استلام الإشعارات
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                key: "smsNotifications",
                label: "رسائل SMS",
                desc: "استقبال الإشعارات العاجلة عبر الرسائل النصية للتنبيهات السريعة",
                icon: "📱",
                feature: "سريع ومباشر",
              },
              {
                key: "emailNotifications",
                label: "البريد الإلكتروني",
                desc: "استقبال الإشعارات المفصلة والتقارير عبر البريد الإلكتروني",
                icon: "📧",
                feature: "تفاصيل شاملة",
              },
            ].map((item) => (
              <div
                key={item.key}
                className={`group relative p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  notifications[item.key as keyof NotificationSettings]
                    ? "bg-blue-50 border-blue-200 shadow-md ring-2 ring-blue-100"
                    : "bg-white border-gray-200 hover:border-blue-200"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 arabic text-base">
                        {item.label}
                      </h4>
                      <p className="text-xs text-blue-600 arabic font-medium">
                        {item.feature}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={
                      notifications[item.key as keyof NotificationSettings]
                    }
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        [item.key]: checked,
                      })
                    }
                    className="data-[state=checked]:bg-blue-600 scale-110"
                  />
                </div>
                <p className="text-sm text-gray-600 arabic leading-relaxed">
                  {item.desc}
                </p>

                {notifications[item.key as keyof NotificationSettings] && (
                  <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                    <div className="flex items-center text-blue-700">
                      <CheckCircle className="w-4 h-4 ml-2" />
                      <span className="text-sm font-medium arabic">
                        مفعل ويعمل بشكل طبيعي
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 hover:shadow-lg transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 arabic text-lg">
                  إعدادات سريعة
                </h4>
                <p className="text-sm text-gray-600 arabic">
                  تحكم سريع في جميع الإشعارات
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3 space-x-reverse">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const allEnabled =
                    Object.values(notifications).every(Boolean);
                  const newState = Object.keys(notifications).reduce(
                    (acc, key) => {
                      acc[key as keyof NotificationSettings] = !allEnabled;
                      return acc;
                    },
                    {} as NotificationSettings,
                  );
                  setNotifications(newState);
                }}
                className="arabic text-sm border-purple-200 hover:bg-purple-50 hover:border-purple-300"
              >
                {Object.values(notifications).every(Boolean)
                  ? "إيقاف الكل"
                  : "تفعيل الكل"}
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  setNotifications({
                    newOrders: true,
                    orderUpdates: true,
                    paymentReceived: true,
                    lowStock: true,
                    reviews: false,
                    promotions: false,
                    smsNotifications: false,
                    emailNotifications: true,
                  });
                }}
                className="arabic text-sm bg-purple-600 hover:bg-purple-700 shadow-lg"
              >
                ⚡ الإعدادات المُوصى بها
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
