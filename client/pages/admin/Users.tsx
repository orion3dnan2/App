import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Shield, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Calendar, 
  Clock,
  UserCheck,
  UserX,
  Download,
  Upload,
  MoreVertical
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, UserRole } from "@shared/types";
import { toast } from "@/hooks/use-toast";

// Mock data - في التطبيق الحقيقي، سيتم جلب البيانات من API
const mockUsers: User[] = [
  {
    id: "1",
    username: "admin",
    email: "admin@example.com",
    role: "super_admin",
    profile: {
      name: "أحمد محمد",
      phone: "+249-123-456-789",
      avatar: "/placeholder.svg",
      language: "ar"
    },
    permissions: [
      { resource: "users", actions: ["create", "read", "update", "delete"] },
      { resource: "products", actions: ["create", "read", "update", "delete"] }
    ],
    createdAt: "2024-01-15T08:00:00Z",
    lastLogin: "2024-01-20T14:30:00Z",
    isActive: true
  },
  {
    id: "2",
    username: "merchant1",
    email: "merchant@store.com",
    role: "merchant",
    profile: {
      name: "فاطمة علي",
      phone: "+249-987-654-321",
      language: "ar",
      businessInfo: {
        businessName: "متجر الالكترونيات",
        businessType: "إلكترونيات",
        description: "متجر متخصص في بيع الأجهزة الإلكترونية"
      }
    },
    permissions: [
      { resource: "products", actions: ["create", "read", "update"] },
      { resource: "orders", actions: ["read", "update"] }
    ],
    createdAt: "2024-01-10T10:00:00Z",
    lastLogin: "2024-01-19T16:45:00Z",
    isActive: true
  },
  {
    id: "3",
    username: "customer1",
    email: "customer@example.com",
    role: "customer",
    profile: {
      name: "محمد عبدالله",
      phone: "+249-555-123-456",
      language: "ar",
      address: {
        street: "شارع الثورة",
        city: "الخرطوم",
        state: "الخرطوم",
        country: "السودان",
        zipCode: "11111"
      }
    },
    permissions: [
      { resource: "orders", actions: ["create", "read"] },
      { resource: "profile", actions: ["read", "update"] }
    ],
    createdAt: "2024-01-05T12:00:00Z",
    lastLogin: "2024-01-18T09:20:00Z",
    isActive: false
  }
];

const roleColors = {
  super_admin: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  merchant: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  customer: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
};

const roleLabels = {
  super_admin: "مدير عام",
  merchant: "تاجر",
  customer: "عميل"
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // تصفية المستخدمين
  useEffect(() => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter(user => 
        user.profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(user => 
        statusFilter === "active" ? user.isActive : !user.isActive
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, statusFilter]);

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "تم حذف المستخدم",
      description: "تم حذف المستخدم بنجاح",
    });
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
    toast({
      title: "تم تحديث حالة المستخدم",
      description: "تم تحديث حالة المستخدم بنجاح",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white arabic">
                  إدارة المستخدمين
                </h1>
                <p className="text-gray-600 dark:text-gray-300 arabic">
                  إدارة وتتبع جميع المستخدمين في النظام
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="arabic">
                    <Plus className="w-4 h-4 ml-2" />
                    إضافة مستخدم جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle className="arabic">إضافة مستخدم جديد</DialogTitle>
                  </DialogHeader>
                  <UserForm onClose={() => setIsCreateModalOpen(false)} />
                </DialogContent>
              </Dialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="arabic">
                  <DropdownMenuItem>
                    <Download className="w-4 h-4 ml-2" />
                    تصدير البيانات
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload className="w-4 h-4 ml-2" />
                    استيراد البيانات
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 arabic">
                    إجمالي المستخدمين
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 arabic">
                    المستخدمين النشطين
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {users.filter(u => u.isActive).length}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 arabic">
                    التجار
                  </p>
                  <p className="text-2xl font-bold text-blue-600">
                    {users.filter(u => u.role === 'merchant').length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300 arabic">
                    العملاء
                  </p>
                  <p className="text-2xl font-bold text-purple-600">
                    {users.filter(u => u.role === 'customer').length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* أدوات البحث والتصفية */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="البحث بالاسم أو البريد الإلكتروني أو اسم المستخدم..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 arabic"
                  />
                </div>
              </div>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-48 arabic">
                  <SelectValue placeholder="تصفية حسب الدور" />
                </SelectTrigger>
                <SelectContent className="arabic">
                  <SelectItem value="all">جميع الأدوار</SelectItem>
                  <SelectItem value="super_admin">مدير عام</SelectItem>
                  <SelectItem value="merchant">تاجر</SelectItem>
                  <SelectItem value="customer">عميل</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 arabic">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent className="arabic">
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="active">نشط</SelectItem>
                  <SelectItem value="inactive">غير نشط</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* جدول المستخدمين */}
        <Card>
          <CardHeader>
            <CardTitle className="arabic">قائمة المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="arabic">المستخدم</TableHead>
                    <TableHead className="arabic">الدور</TableHead>
                    <TableHead className="arabic">الحالة</TableHead>
                    <TableHead className="arabic">تاريخ التسجيل</TableHead>
                    <TableHead className="arabic">آخر دخول</TableHead>
                    <TableHead className="arabic">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <Avatar>
                            <AvatarImage src={user.profile.avatar} />
                            <AvatarFallback>
                              {user.profile.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white arabic">
                              {user.profile.name}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">
                              @{user.username}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={roleColors[user.role]}>
                          {roleLabels[user.role]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'} arabic`}>
                            {user.isActive ? 'نشط' : 'غير نشط'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center space-x-1 space-x-reverse">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(user.createdAt)}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {user.lastLogin ? (
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Clock className="w-3 h-3" />
                              <span>{formatDate(user.lastLogin)}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400 arabic">لم يسجل دخول</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsViewModalOpen(true);
                            }}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditModalOpen(true);
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id)}
                          >
                            {user.isActive ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="arabic">
                              <AlertDialogHeader>
                                <AlertDialogTitle>تأكيد الحذف</AlertDialogTitle>
                                <AlertDialogDescription>
                                  هل أنت متأكد من حذف هذا المستخدم؟ لا يمكن التراجع عن هذا الإجراء.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  حذف
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Dialog لعرض تفاصيل المستخدم */}
      {selectedUser && (
        <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="arabic">تفاصيل المستخدم</DialogTitle>
            </DialogHeader>
            <UserDetails user={selectedUser} />
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog لتعديل المستخدم */}
      {selectedUser && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="arabic">تعديل بيانات المستخدم</DialogTitle>
            </DialogHeader>
            <UserForm 
              user={selectedUser} 
              onClose={() => setIsEditModalOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// مكون تفاصيل المستخدم
function UserDetails({ user }: { user: User }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 space-x-reverse">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.profile.avatar} />
          <AvatarFallback className="text-2xl">
            {user.profile.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white arabic">
            {user.profile.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <div className="flex items-center space-x-2 space-x-reverse mt-2">
            <Badge className={roleColors[user.role]}>
              {roleLabels[user.role]}
            </Badge>
            <div className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className={`text-sm ${user.isActive ? 'text-green-600' : 'text-red-600'} arabic`}>
              {user.isActive ? 'نشط' : 'غير نشط'}
            </span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-3 arabic">
          <TabsTrigger value="personal">البيانات الشخصية</TabsTrigger>
          <TabsTrigger value="business">بيانات العمل</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic">المعلومات الشخصية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="arabic">الاسم الكامل</Label>
                  <p className="text-gray-900 dark:text-white arabic">{user.profile.name}</p>
                </div>
                <div>
                  <Label className="arabic">اسم المستخدم</Label>
                  <p className="text-gray-900 dark:text-white">@{user.username}</p>
                </div>
                <div>
                  <Label className="arabic">البريد الإلكتروني</Label>
                  <p className="text-gray-900 dark:text-white">{user.email}</p>
                </div>
                <div>
                  <Label className="arabic">رقم الهاتف</Label>
                  <p className="text-gray-900 dark:text-white">{user.profile.phone || 'غير محدد'}</p>
                </div>
                <div>
                  <Label className="arabic">اللغة المفضلة</Label>
                  <p className="text-gray-900 dark:text-white arabic">
                    {user.profile.language === 'ar' ? 'العربية' : 'الإنجليزية'}
                  </p>
                </div>
                <div>
                  <Label className="arabic">تاريخ التسجيل</Label>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(user.createdAt).toLocaleDateString('ar-SA')}
                  </p>
                </div>
              </div>

              {user.profile.address && (
                <div>
                  <Label className="arabic">العنوان</Label>
                  <div className="text-gray-900 dark:text-white arabic">
                    <p>{user.profile.address.street}</p>
                    <p>{user.profile.address.city}, {user.profile.address.state}</p>
                    <p>{user.profile.address.country} - {user.profile.address.zipCode}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-4">
          {user.profile.businessInfo ? (
            <Card>
              <CardHeader>
                <CardTitle className="arabic">معلومات العمل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="arabic">اسم النشاط التجاري</Label>
                    <p className="text-gray-900 dark:text-white arabic">
                      {user.profile.businessInfo.businessName}
                    </p>
                  </div>
                  <div>
                    <Label className="arabic">نوع النشاط</Label>
                    <p className="text-gray-900 dark:text-white arabic">
                      {user.profile.businessInfo.businessType}
                    </p>
                  </div>
                  <div>
                    <Label className="arabic">الرقم الضريبي</Label>
                    <p className="text-gray-900 dark:text-white">
                      {user.profile.businessInfo.taxId || 'غير محدد'}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="arabic">وصف النشاط</Label>
                  <p className="text-gray-900 dark:text-white arabic">
                    {user.profile.businessInfo.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500 dark:text-gray-400 arabic">
                  لا توجد معلومات تجارية لهذا المستخدم
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="arabic">الصلاحيات والأذونات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.permissions.map((permission, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2 arabic">
                      {permission.resource}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {permission.actions.map((action) => (
                        <Badge key={action} variant="secondary">
                          {action}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// مكون نموذج إضافة/تعديل المستخدم
function UserForm({ user, onClose }: { user?: User; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: user?.profile.name || "",
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.profile.phone || "",
    role: user?.role || "customer" as UserRole,
    isActive: user?.isActive ?? true,
    language: user?.profile.language || "ar" as "ar" | "en"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // هنا يتم إرسال البيانات للخادم
    toast({
      title: user ? "تم تحديث المستخدم" : "تم إضافة المستخدم",
      description: user ? "تم تحديث بيانات المستخدم بنجاح" : "تم إضافة المستخدم الجديد بنجاح",
    });
    
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="arabic">الاسم الكامل</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
            className="arabic"
          />
        </div>
        <div>
          <Label htmlFor="username" className="arabic">اسم المستخدم</Label>
          <Input
            id="username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="email" className="arabic">البريد الإلكتروني</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone" className="arabic">رقم ا��هاتف</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div>
          <Label htmlFor="role" className="arabic">الدور</Label>
          <Select value={formData.role} onValueChange={(value: UserRole) => setFormData({...formData, role: value})}>
            <SelectTrigger className="arabic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="arabic">
              <SelectItem value="customer">عميل</SelectItem>
              <SelectItem value="merchant">تاجر</SelectItem>
              <SelectItem value="super_admin">مدير عام</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="language" className="arabic">اللغة المفضلة</Label>
          <Select value={formData.language} onValueChange={(value: "ar" | "en") => setFormData({...formData, language: value})}>
            <SelectTrigger className="arabic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="arabic">
              <SelectItem value="ar">العربية</SelectItem>
              <SelectItem value="en">الإنجليزية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2 space-x-reverse">
        <Switch
          id="isActive"
          checked={formData.isActive}
          onCheckedChange={(checked) => setFormData({...formData, isActive: checked})}
        />
        <Label htmlFor="isActive" className="arabic">حساب نشط</Label>
      </div>

      <div className="flex justify-end space-x-3 space-x-reverse">
        <Button type="button" variant="outline" onClick={onClose} className="arabic">
          إلغاء
        </Button>
        <Button type="submit" className="arabic">
          {user ? "تحديث" : "إضافة"}
        </Button>
      </div>
    </form>
  );
}
