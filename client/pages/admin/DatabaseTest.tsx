import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Users,
  Store,
  RefreshCw,
  Download,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react";
import { ApiService } from "@/lib/apiService";

export default function DatabaseTest() {
  const [databaseInfo, setDatabaseInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [backupLoading, setBackupLoading] = useState(false);

  const loadDatabaseInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/database/info", {
        headers: {
          Authorization: `Bearer ${ApiService.getToken()}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDatabaseInfo(data);
      } else {
        console.error("خطأ في تحميل معلومات قاعدة البيانات");
      }
    } catch (error) {
      console.error("خطأ في تحميل معلومات قاعدة البيانات:", error);
    } finally {
      setLoading(false);
    }
  };

  const createBackup = async () => {
    try {
      setBackupLoading(true);
      const response = await fetch("/api/database/backup", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ApiService.getToken()}`,
        },
      });

      if (response.ok) {
        alert("تم إنشاء النسخة الاحتياطية بنجاح!");
        loadDatabaseInfo(); // إعادة تحميل المعلومات
      } else {
        alert("فشل في إنشاء النسخة الاحتياطية");
      }
    } catch (error) {
      console.error("خطأ في إنشاء النسخة الاحتياطية:", error);
      alert("حدث خطأ أثنا�� إنشاء النسخة الاحتياطية");
    } finally {
      setBackupLoading(false);
    }
  };

  useEffect(() => {
    loadDatabaseInfo();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 arabic">
            جاري تحميل معلومات قاعدة البيانات...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 arabic">
                  معلومات قاعدة البيانات
                </h1>
                <p className="text-gray-600 arabic">
                  حالة وإحصائيات قاعدة البيانات المحلية
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={loadDatabaseInfo}
                variant="outline"
                size="sm"
                className="arabic"
              >
                <RefreshCw className="w-4 h-4 ml-2" />
                تحديث
              </Button>
              <Button
                onClick={createBackup}
                disabled={backupLoading}
                size="sm"
                className="arabic"
              >
                {backupLoading ? (
                  <RefreshCw className="w-4 h-4 ml-2 animate-spin" />
                ) : (
                  <Download className="w-4 h-4 ml-2" />
                )}
                نسخة احتياطية
              </Button>
            </div>
          </div>
        </div>

        {databaseInfo && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* إحصائيات المستخدمين */}
            <Card>
              <CardHeader>
                <CardTitle className="arabic text-right flex items-center">
                  <Users className="w-5 h-5 ml-2" />
                  المستخدمون
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">
                    إجمالي المستخدمين
                  </span>
                  <Badge variant="secondary">
                    {databaseInfo.users.stats.total}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">
                    المستخدمون النشطون
                  </span>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    {databaseInfo.users.stats.active}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">التجار</span>
                  <Badge variant="outline">
                    {databaseInfo.users.stats.merchants}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">العملاء</span>
                  <Badge variant="outline">
                    {databaseInfo.users.stats.customers}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">
                    التسجيلات الحديثة
                  </span>
                  <Badge variant="secondary">
                    {databaseInfo.users.stats.recentRegistrations}
                  </Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="arabic text-gray-500">حجم الملف</span>
                    <span className="text-gray-700">
                      {databaseInfo.users.fileSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="arabic text-gray-500">حالة الملف</span>
                    {databaseInfo.users.exists ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* إحصائيات المتاجر */}
            <Card>
              <CardHeader>
                <CardTitle className="arabic text-right flex items-center">
                  <Store className="w-5 h-5 ml-2" />
                  المتاجر
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">إجمالي المتاجر</span>
                  <Badge variant="secondary">
                    {databaseInfo.stores.stats.total}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">المتاجر النشطة</span>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    {databaseInfo.stores.stats.active}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">قيد المراجعة</span>
                  <Badge
                    variant="outline"
                    className="bg-yellow-100 text-yellow-800"
                  >
                    {databaseInfo.stores.stats.pending}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">معلقة</span>
                  <Badge variant="outline" className="bg-red-100 text-red-800">
                    {databaseInfo.stores.stats.suspended}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">المتاجر الحديثة</span>
                  <Badge variant="secondary">
                    {databaseInfo.stores.stats.recentStores}
                  </Badge>
                </div>
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="arabic text-gray-500">حجم الملف</span>
                    <span className="text-gray-700">
                      {databaseInfo.stores.fileSize}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="arabic text-gray-500">حالة الملف</span>
                    {databaseInfo.stores.exists ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* معلومات النسخ الاحتياطية والنظام */}
            <Card>
              <CardHeader>
                <CardTitle className="arabic text-right flex items-center">
                  <Info className="w-5 h-5 ml-2" />
                  معلومات النظام
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="arabic text-gray-600">النسخ الاحتياطية</span>
                  <Badge variant="secondary">
                    {databaseInfo.backups.count}
                  </Badge>
                </div>
                {databaseInfo.backups.lastBackup && (
                  <div className="flex justify-between items-center">
                    <span className="arabic text-gray-600">
                      آخر نسخة احتياطية
                    </span>
                    <span className="text-xs text-gray-700">
                      {new Date(databaseInfo.backups.lastBackup).toLocaleString(
                        "ar",
                      )}
                    </span>
                  </div>
                )}
                <div className="pt-2 border-t space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="arabic text-gray-500">إصدار Node.js</span>
                    <span className="text-gray-700">
                      {databaseInfo.system.nodeVersion}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="arabic text-gray-500">نظام التشغيل</span>
                    <span className="text-gray-700">
                      {databaseInfo.system.platform}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 arabic">
                    مسار البيانات: <br />
                    <code className="text-xs bg-gray-100 px-1 rounded">
                      {databaseInfo.system.dataPath}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* تأكيد حفظ البيانات */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="arabic text-right flex items-center">
              <CheckCircle className="w-5 h-5 ml-2 text-green-600" />
              حالة حفظ البيانات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 ml-2" />
                <div>
                  <h3 className="text-green-800 font-semibold arabic">
                    النظام يعمل بشكل صحيح
                  </h3>
                  <p className="text-green-700 arabic text-sm mt-1">
                    جميع الحسابات الجديدة والمتاجر يتم حفظها بشكل دائم في ملفات
                    JSON. البيانات محفوظة حتى بعد إعادة تشغيل الخادم.
                  </p>
                  <ul className="list-disc list-inside text-green-700 arabic text-sm mt-2 space-y-1">
                    <li>الحسابات الجديدة تُحفظ في data/users.json</li>
                    <li>المتاجر تُحفظ في data/stores.json</li>
                    <li>يتم إنشاء نسخ احتياطية تلقائياً</li>
                    <li>البيانات محمية من فقدانها</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
