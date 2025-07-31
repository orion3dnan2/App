import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ArrowLeft, 
  Shield, 
  Save, 
  RefreshCw, 
  Database, 
  Mail, 
  MessageSquare, 
  Settings,
  Server,
  Activity,
  FileText,
  TestTube,
  Download,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";
import { SystemSettings, SystemHealth, SystemLog } from "@shared/types";
import { toast } from "@/hooks/use-toast";

export default function AdminSystem() {
  const [activeTab, setActiveTab] = useState("security");
  const [settings, setSettings] = useState<SystemSettings | null>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState(false);

  // Load settings on component mount
  useEffect(() => {
    loadSystemSettings();
    loadSystemHealth();
    loadSystemLogs();
  }, []);

  const loadSystemSettings = async () => {
    try {
      const response = await fetch('/api/system/settings');
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل إعدادات النظام",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadSystemHealth = async () => {
    try {
      const response = await fetch('/api/system/health');
      const data = await response.json();
      setHealth(data);
    } catch (error) {
      console.error("Failed to load system health:", error);
    }
  };

  const loadSystemLogs = async () => {
    try {
      const response = await fetch('/api/system/logs?limit=20');
      const data = await response.json();
      setLogs(data.logs);
    } catch (error) {
      console.error("Failed to load system logs:", error);
    }
  };

  const saveSettings = async () => {
    if (!settings) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/system/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast({
          title: "نجح الحفظ",
          description: "تم حفظ إعدادات النظام بنجاح",
        });
      } else {
        throw new Error('Failed to save settings');
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ إعدادات النظام",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const testEmailConfig = async () => {
    const testEmail = prompt("أدخل البريد الإلكتروني للاختبار:");
    if (!testEmail) return;

    try {
      const response = await fetch('/api/system/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testEmail }),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "نجح الاختبار",
          description: data.message,
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في اختبار البريد الإلكتروني",
        variant: "destructive",
      });
    }
  };

  const testSMSConfig = async () => {
    const testNumber = prompt("أدخل رقم الهاتف للاختبار:");
    if (!testNumber) return;

    try {
      const response = await fetch('/api/system/test-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testNumber }),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "نجح الاختبار",
          description: data.message,
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في اختبار الرسائل النصية",
        variant: "destructive",
      });
    }
  };

  const backupDatabase = async () => {
    if (!confirm("هل أنت متأكد من إنشاء نسخة احتياطية؟")) return;

    try {
      const response = await fetch('/api/system/backup', {
        method: 'POST',
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "نجحت العملية",
          description: `تم إنشاء النسخة الاحتياطية: ${data.filename} (${data.size})`,
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إنشاء النسخة الاحتياطية",
        variant: "destructive",
      });
    }
  };

  const clearCache = async () => {
    if (!confirm("هل أنت متأكد من مسح الذاكرة المؤقتة؟")) return;

    try {
      const response = await fetch('/api/system/clear-cache', {
        method: 'POST',
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "نجحت العملية",
          description: `تم مسح ${data.clearedItems} عنصر من الذاكرة المؤقتة`,
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في مسح الذاكرة المؤقتة",
        variant: "destructive",
      });
    }
  };

  const updateSettings = (path: string, value: any) => {
    if (!settings) return;
    
    const keys = path.split('.');
    const newSettings = { ...settings };
    let current: any = newSettings;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setSettings(newSettings);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 arabic">جاري تحميل إعدادات النظام...</p>
        </div>
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <Alert className="max-w-md">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription className="arabic">
            فشل في تحميل إعدادات النظام. يرجى إعادة تحميل الصفحة.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white arabic">
                  إعدادات النظام
                </h1>
                <p className="text-gray-600 dark:text-gray-300 arabic">
                  إدارة الأمان والتكامل والصيانة
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <Button 
                variant="outline" 
                onClick={() => setShowSecrets(!showSecrets)}
                size="sm"
              >
                {showSecrets ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button 
                onClick={saveSettings} 
                disabled={saving}
                className="arabic"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 ml-2" />
                )}
                حفظ الإعدادات
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* System Health Overview */}
        {health && (
          <Card className="mb-8 dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center arabic text-gray-900 dark:text-white">
                <Activity className="w-5 h-5 ml-2" />
                حالة النظام
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                {Object.entries(health.services).map(([service, status]) => (
                  <div key={service} className="text-center">
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${
                      status.status === 'online' ? 'bg-green-100 dark:bg-green-900/50' :
                      status.status === 'degraded' ? 'bg-yellow-100 dark:bg-yellow-900/50' :
                      'bg-red-100 dark:bg-red-900/50'
                    }`}>
                      {status.status === 'online' ? (
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      ) : status.status === 'degraded' ? (
                        <AlertTriangle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white arabic">
                      {service === 'database' ? 'قاعدة البيانات' :
                       service === 'redis' ? 'ذاكرة التخزين' :
                       service === 'email' ? 'البريد الإلكتروني' :
                       service === 'storage' ? 'التخزين' :
                       'واجهة البرمجة'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {status.responseTime}ms
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {health.metrics.uptime}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic">وقت التشغيل</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {health.metrics.memoryUsage}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic">استخدام الذاكرة</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {health.metrics.cpuUsage}%
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic">استخدام المعالج</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {health.metrics.activeConnections}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic">الاتصالات النشطة</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="security" className="arabic">الأمان</TabsTrigger>
            <TabsTrigger value="api" className="arabic">واجهة البرمجة</TabsTrigger>
            <TabsTrigger value="notifications" className="arabic">الإشعارات</TabsTrigger>
            <TabsTrigger value="integrations" className="arabic">التكامل</TabsTrigger>
            <TabsTrigger value="maintenance" className="arabic">الصيانة</TabsTrigger>
            <TabsTrigger value="logs" className="arabic">السجلات</TabsTrigger>
          </TabsList>

          {/* Security Settings */}
          <TabsContent value="security">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="arabic text-gray-900 dark:text-white">إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="arabic">المصادقة الثنائية</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 arabic">
                        تفعيل المصادقة الثنائية للمستخدمين
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.enableTwoFactor}
                      onCheckedChange={(checked) => updateSettings('security.enableTwoFactor', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="arabic">التحقق من البريد الإلكتروني</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 arabic">
                        طلب التحقق من البريد عند التسجيل
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.enableEmailVerification}
                      onCheckedChange={(checked) => updateSettings('security.enableEmailVerification', checked)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="arabic">مهلة انتهاء الجلسة (بالثواني)</Label>
                    <Input
                      type="number"
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSettings('security.sessionTimeout', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="arabic">الحد الأقصى لمحاولات تسجيل الدخول</Label>
                    <Input
                      type="number"
                      value={settings.security.maxLoginAttempts}
                      onChange={(e) => updateSettings('security.maxLoginAttempts', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="arabic">الحد الأدنى لطول كلمة المرور</Label>
                    <Input
                      type="number"
                      value={settings.security.passwordMinLength}
                      onChange={(e) => updateSettings('security.passwordMinLength', parseInt(e.target.value))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="arabic">طلب رموز خاصة في كلمة المرور</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 arabic">
                        طلب رموز خاصة (!@#$%) في كلمة المرور
                      </p>
                    </div>
                    <Switch
                      checked={settings.security.passwordRequireSpecialChars}
                      onCheckedChange={(checked) => updateSettings('security.passwordRequireSpecialChars', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">تحديد معدل الطلبات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="arabic">تفعيل تحديد معدل الطلبات</Label>
                    <Switch
                      checked={settings.api.rateLimit.enabled}
                      onCheckedChange={(checked) => updateSettings('api.rateLimit.enabled', checked)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="arabic">الطلبات في الدقيقة</Label>
                      <Input
                        type="number"
                        value={settings.api.rateLimit.requestsPerMinute}
                        onChange={(e) => updateSettings('api.rateLimit.requestsPerMinute', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">حد الاندفاع</Label>
                      <Input
                        type="number"
                        value={settings.api.rateLimit.burstLimit}
                        onChange={(e) => updateSettings('api.rateLimit.burstLimit', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">إعدادات CORS</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="arabic">تفعيل CORS</Label>
                    <Switch
                      checked={settings.api.cors.enabled}
                      onCheckedChange={(checked) => updateSettings('api.cors.enabled', checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="arabic">المصادر المسموحة</Label>
                    <Textarea
                      value={settings.api.cors.allowedOrigins.join('\n')}
                      onChange={(e) => updateSettings('api.cors.allowedOrigins', e.target.value.split('\n').filter(Boolean))}
                      placeholder="https://example.com
https://app.example.com"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">إعدادات المصادقة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="arabic">مفتاح JWT السري</Label>
                    <div className="relative">
                      <Input
                        type={showSecrets ? "text" : "password"}
                        value={settings.api.authentication.jwtSecret}
                        onChange={(e) => updateSettings('api.authentication.jwtSecret', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="arabic">مدة انتهاء JWT</Label>
                      <Input
                        value={settings.api.authentication.jwtExpiresIn}
                        onChange={(e) => updateSettings('api.authentication.jwtExpiresIn', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">مدة انتهاء Refresh Token</Label>
                      <Input
                        value={settings.api.authentication.refreshTokenExpiresIn}
                        onChange={(e) => updateSettings('api.authentication.refreshTokenExpiresIn', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Notifications Settings */}
          <TabsContent value="notifications">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between arabic text-gray-900 dark:text-white">
                    <span>البريد الإلكتروني</span>
                    <Button variant="outline" size="sm" onClick={testEmailConfig}>
                      <TestTube className="w-4 h-4 ml-2" />
                      اختبار
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="arabic">تفعيل البريد الإلكتروني</Label>
                    <Switch
                      checked={settings.notifications.email.enabled}
                      onCheckedChange={(checked) => updateSettings('notifications.email.enabled', checked)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="arabic">خادم SMTP</Label>
                      <Input
                        value={settings.notifications.email.smtpHost}
                        onChange={(e) => updateSettings('notifications.email.smtpHost', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">منفذ SMTP</Label>
                      <Input
                        type="number"
                        value={settings.notifications.email.smtpPort}
                        onChange={(e) => updateSettings('notifications.email.smtpPort', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">اسم المستخدم</Label>
                      <Input
                        value={settings.notifications.email.smtpUser}
                        onChange={(e) => updateSettings('notifications.email.smtpUser', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">كلمة المرور</Label>
                      <Input
                        type={showSecrets ? "text" : "password"}
                        value={settings.notifications.email.smtpPassword}
                        onChange={(e) => updateSettings('notifications.email.smtpPassword', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">البريد المرسل</Label>
                      <Input
                        value={settings.notifications.email.fromEmail}
                        onChange={(e) => updateSettings('notifications.email.fromEmail', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">اسم المرسل</Label>
                      <Input
                        value={settings.notifications.email.fromName}
                        onChange={(e) => updateSettings('notifications.email.fromName', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between arabic text-gray-900 dark:text-white">
                    <span>الرسائل النصية</span>
                    <Button variant="outline" size="sm" onClick={testSMSConfig}>
                      <TestTube className="w-4 h-4 ml-2" />
                      اختبار
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label className="arabic">تفعيل الرسائل النصية</Label>
                    <Switch
                      checked={settings.notifications.sms.enabled}
                      onCheckedChange={(checked) => updateSettings('notifications.sms.enabled', checked)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="arabic">مقدم الخدمة</Label>
                      <Select 
                        value={settings.notifications.sms.provider}
                        onValueChange={(value) => updateSettings('notifications.sms.provider', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="twilio">Twilio</SelectItem>
                          <SelectItem value="nexmo">Nexmo</SelectItem>
                          <SelectItem value="custom">مخصص</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">رقم المرسل</Label>
                      <Input
                        value={settings.notifications.sms.fromNumber}
                        onChange={(e) => updateSettings('notifications.sms.fromNumber', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">مفتاح API</Label>
                      <Input
                        type={showSecrets ? "text" : "password"}
                        value={settings.notifications.sms.apiKey}
                        onChange={(e) => updateSettings('notifications.sms.apiKey', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">سر API</Label>
                      <Input
                        type={showSecrets ? "text" : "password"}
                        value={settings.notifications.sms.apiSecret}
                        onChange={(e) => updateSettings('notifications.sms.apiSecret', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integrations Settings */}
          <TabsContent value="integrations">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">تسجيل الدخول الاجتماعي</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium arabic">Google</h4>
                    <div className="flex items-center justify-between">
                      <Label className="arabic">تفعيل تسجيل الدخول بـ Google</Label>
                      <Switch
                        checked={settings.integrations.social.google.enabled}
                        onCheckedChange={(checked) => updateSettings('integrations.social.google.enabled', checked)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="arabic">Client ID</Label>
                        <Input
                          value={settings.integrations.social.google.clientId}
                          onChange={(e) => updateSettings('integrations.social.google.clientId', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="arabic">Client Secret</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={settings.integrations.social.google.clientSecret}
                          onChange={(e) => updateSettings('integrations.social.google.clientSecret', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium arabic">Facebook</h4>
                    <div className="flex items-center justify-between">
                      <Label className="arabic">تفعيل تسجيل الدخول بـ Facebook</Label>
                      <Switch
                        checked={settings.integrations.social.facebook.enabled}
                        onCheckedChange={(checked) => updateSettings('integrations.social.facebook.enabled', checked)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="arabic">App ID</Label>
                        <Input
                          value={settings.integrations.social.facebook.appId}
                          onChange={(e) => updateSettings('integrations.social.facebook.appId', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="arabic">App Secret</Label>
                        <Input
                          type={showSecrets ? "text" : "password"}
                          value={settings.integrations.social.facebook.appSecret}
                          onChange={(e) => updateSettings('integrations.social.facebook.appSecret', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">التحليلات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium arabic">Google Analytics</h4>
                    <div className="flex items-center justify-between">
                      <Label className="arabic">تفعيل Google Analytics</Label>
                      <Switch
                        checked={settings.integrations.analytics.googleAnalytics.enabled}
                        onCheckedChange={(checked) => updateSettings('integrations.analytics.googleAnalytics.enabled', checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">معرف التتبع</Label>
                      <Input
                        value={settings.integrations.analytics.googleAnalytics.trackingId}
                        onChange={(e) => updateSettings('integrations.analytics.googleAnalytics.trackingId', e.target.value)}
                        placeholder="GA-XXXXXXXXX-X"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium arabic">Facebook Pixel</h4>
                    <div className="flex items-center justify-between">
                      <Label className="arabic">تفعيل Facebook Pixel</Label>
                      <Switch
                        checked={settings.integrations.analytics.facebookPixel.enabled}
                        onCheckedChange={(checked) => updateSettings('integrations.analytics.facebookPixel.enabled', checked)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">معرف Pixel</Label>
                      <Input
                        value={settings.integrations.analytics.facebookPixel.pixelId}
                        onChange={(e) => updateSettings('integrations.analytics.facebookPixel.pixelId', e.target.value)}
                        placeholder="1234567890123456"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Maintenance Settings */}
          <TabsContent value="maintenance">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">وضع الصيانة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="arabic">تفعيل وضع الصيانة</Label>
                      <p className="text-sm text-gray-600 dark:text-gray-400 arabic">
                        سيتم إظهار صفحة الصيانة للزوار
                      </p>
                    </div>
                    <Switch
                      checked={settings.maintenance.enabled}
                      onCheckedChange={(checked) => updateSettings('maintenance.enabled', checked)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="arabic">رسالة الصي��نة</Label>
                    <Textarea
                      value={settings.maintenance.message}
                      onChange={(e) => updateSettings('maintenance.message', e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="arabic">عناوين IP المسموحة</Label>
                    <Textarea
                      value={settings.maintenance.allowedIPs.join('\n')}
                      onChange={(e) => updateSettings('maintenance.allowedIPs', e.target.value.split('\n').filter(Boolean))}
                      placeholder="127.0.0.1
192.168.1.100"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">إدارة النظام</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button onClick={backupDatabase} variant="outline" className="arabic">
                      <Download className="w-4 h-4 ml-2" />
                      إنشاء نسخة احتياطية
                    </Button>
                    <Button onClick={clearCache} variant="outline" className="arabic">
                      <Trash2 className="w-4 h-4 ml-2" />
                      مسح الذاكرة المؤقتة
                    </Button>
                    <Button onClick={loadSystemHealth} variant="outline" className="arabic">
                      <RefreshCw className="w-4 h-4 ml-2" />
                      تحديث حالة النظام
                    </Button>
                    <Button onClick={loadSystemLogs} variant="outline" className="arabic">
                      <FileText className="w-4 h-4 ml-2" />
                      تحديث السجلات
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* System Logs */}
          <TabsContent value="logs">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="arabic text-gray-900 dark:text-white">سجلات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="arabic">المستوى</TableHead>
                        <TableHead className="arabic">الرسالة</TableHead>
                        <TableHead className="arabic">المستخدم</TableHead>
                        <TableHead className="arabic">التوقيت</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {logs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <Badge variant={
                              log.level === 'error' ? 'destructive' :
                              log.level === 'warn' ? 'secondary' :
                              log.level === 'info' ? 'default' :
                              'outline'
                            }>
                              {log.level === 'error' ? 'خطأ' :
                               log.level === 'warn' ? 'تحذير' :
                               log.level === 'info' ? 'معلومات' :
                               'تطوير'}
                            </Badge>
                          </TableCell>
                          <TableCell className="arabic">{log.message}</TableCell>
                          <TableCell>{log.userId || 'نظام'}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Clock className="w-3 h-3" />
                              <span>{new Date(log.timestamp).toLocaleString('ar-SA')}</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
