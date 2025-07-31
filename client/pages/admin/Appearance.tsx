import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Palette, ConstructionIcon } from "lucide-react";

export default function AdminAppearance() {
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
              <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-700 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">
                  تخصيص المظهر
                </h1>
                <p className="text-gray-600 arabic">قريباً - قيد التطوير</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="text-center">
          <CardContent className="p-12">
            <ConstructionIcon className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4 arabic">
              صفحة قيد التطوير
            </h2>
            <p className="text-gray-600 arabic mb-6">
              صفحة تخصيص المظهر ستكون متاحة قريباً لتغيير الألوان والصور
              والخلفيات
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/admin/settings">
                <Button variant="outline" className="arabic">
                  إعدادا�� التطبيق الحالية
                </Button>
              </Link>
              <Link to="/admin/dashboard">
                <Button className="arabic">العودة للوحة الرئيسية</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
