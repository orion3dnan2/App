import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Globe, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  Upload, 
  Download,
  FileText,
  Image,
  Languages,
  Menu,
  Layout,
  Settings,
  Calendar,
  Tag,
  Folder,
  Link as LinkIcon,
  Code,
  Palette,
  Users,
  MessageSquare,
  Star,
  ExternalLink,
  Copy,
  MoreVertical,
  Filter,
  SortAsc,
  RefreshCw,
  Loader2
} from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContentPage, Category, Media, Translation, Menu as MenuType, ContentTemplate, ContentSettings } from "@shared/types";
import { toast } from "@/hooks/use-toast";

export default function AdminContent() {
  const [activeTab, setActiveTab] = useState("pages");
  const [pages, setPages] = useState<ContentPage[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [menus, setMenus] = useState<MenuType[]>([]);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);
  const [settings, setSettings] = useState<ContentSettings | null>(null);
  const [settingsData, setSettingsData] = useState<ContentSettings | null>(null);

  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Load data on component mount
  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadPages(),
        loadCategories(),
        loadMedia(),
        loadTranslations(),
        loadMenus(),
        loadTemplates(),
        loadSettings()
      ]);
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات المحتوى",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const loadPages = async () => {
    const response = await fetch('/api/content/pages');
    const data = await response.json();
    setPages(data);
  };

  const loadCategories = async () => {
    const response = await fetch('/api/content/categories');
    const data = await response.json();
    setCategories(data);
  };

  const loadMedia = async () => {
    const response = await fetch('/api/content/media');
    const data = await response.json();
    setMedia(data);
  };

  const loadTranslations = async () => {
    const response = await fetch('/api/content/translations');
    const data = await response.json();
    setTranslations(data);
  };

  const loadMenus = async () => {
    const response = await fetch('/api/content/menus');
    const data = await response.json();
    setMenus(data);
  };

  const loadTemplates = async () => {
    const response = await fetch('/api/content/templates');
    const data = await response.json();
    setTemplates(data);
  };

  const loadSettings = async () => {
    const response = await fetch('/api/content/settings');
    const data = await response.json();
    setSettings(data);
    setSettingsData(data);
  };

  const updateSettingsData = (path: string, value: any) => {
    if (!settingsData) return;

    const keys = path.split('.');
    const newSettings = { ...settingsData };
    let current: any = newSettings;

    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
    setSettingsData(newSettings);
  };

  const saveSettings = async () => {
    if (!settingsData) return;

    try {
      const response = await fetch('/api/content/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });

      if (response.ok) {
        setSettings(settingsData);
        toast({
          title: "نجح الحفظ",
          description: "تم حفظ الإعدادات بنجاح",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حفظ الإعدادات",
        variant: "destructive",
      });
    }
  };

  const createPage = async (pageData: Partial<ContentPage>) => {
    try {
      const response = await fetch('/api/content/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      
      if (response.ok) {
        await loadPages();
        toast({
          title: "نجح الإنشاء",
          description: "تم إنشاء الصفحة بنجاح",
        });
        setIsCreateModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إنشاء الصفحة",
        variant: "destructive",
      });
    }
  };

  const updatePage = async (id: string, pageData: Partial<ContentPage>) => {
    try {
      const response = await fetch(`/api/content/pages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pageData),
      });
      
      if (response.ok) {
        await loadPages();
        toast({
          title: "نجح التحديث",
          description: "تم تحديث الصفحة بنجاح",
        });
        setIsEditModalOpen(false);
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في تحديث الصفحة",
        variant: "destructive",
      });
    }
  };

  const deletePage = async (id: string) => {
    try {
      const response = await fetch(`/api/content/pages/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await loadPages();
        toast({
          title: "نجح الحذف",
          description: "تم حذف الصفحة بنجاح",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في حذف الصفحة",
        variant: "destructive",
      });
    }
  };

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('originalName', file.name);
      formData.append('alt', '');
      
      const response = await fetch('/api/content/media', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        await loadMedia();
        toast({
          title: "نجح الرفع",
          description: "تم رفع الملف بنجاح",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في رفع الملف",
        variant: "destructive",
      });
    }
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || page.type === filterType;
    const matchesStatus = filterStatus === "all" || page.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300 arabic">جاري تحميل بيانات المحتوى...</p>
        </div>
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
              <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white arabic">
                  إدارة المحتوى
                </h1>
                <p className="text-gray-600 dark:text-gray-300 arabic">
                  إدارة الصفحات والمقالات والوسائط
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              <Button 
                onClick={() => setIsCreateModalOpen(true)}
                className="arabic"
              >
                <Plus className="w-4 h-4 ml-2" />
                إنشاء محتوى جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Content Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {pages.length}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 text-sm arabic">
                    إجمالي الصفحات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Folder className="w-8 h-8 text-green-600 dark:text-green-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {categories.length}
                  </p>
                  <p className="text-green-600 dark:text-green-400 text-sm arabic">
                    التصنيفات
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Image className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {media.length}
                  </p>
                  <p className="text-purple-600 dark:text-purple-400 text-sm arabic">
                    ملفات الوسائط
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Languages className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                <div className="mr-4">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {translations.length}
                  </p>
                  <p className="text-orange-600 dark:text-orange-400 text-sm arabic">
                    النصوص المترجمة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="pages" className="arabic">الصفحات</TabsTrigger>
            <TabsTrigger value="media" className="arabic">الوسائط</TabsTrigger>
            <TabsTrigger value="categories" className="arabic">التصنيفات</TabsTrigger>
            <TabsTrigger value="translations" className="arabic">الترجمات</TabsTrigger>
            <TabsTrigger value="menus" className="arabic">القوائم</TabsTrigger>
            <TabsTrigger value="settings" className="arabic">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Pages Management */}
          <TabsContent value="pages">
            <div className="space-y-6">
              {/* Search and Filters */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="البحث في الصفحات..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pr-10 arabic"
                        />
                      </div>
                    </div>

                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger className="w-full md:w-48 arabic">
                        <SelectValue placeholder="نوع المحتوى" />
                      </SelectTrigger>
                      <SelectContent className="arabic">
                        <SelectItem value="all">جميع الأنواع</SelectItem>
                        <SelectItem value="page">صفحة</SelectItem>
                        <SelectItem value="post">مقال</SelectItem>
                        <SelectItem value="news">خبر</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full md:w-48 arabic">
                        <SelectValue placeholder="حالة النشر" />
                      </SelectTrigger>
                      <SelectContent className="arabic">
                        <SelectItem value="all">جميع الحالات</SelectItem>
                        <SelectItem value="published">منشور</SelectItem>
                        <SelectItem value="draft">مسودة</SelectItem>
                        <SelectItem value="private">خاص</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Pages Table */}
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="arabic text-gray-900 dark:text-white">قائمة الصفحات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="arabic">العنوان</TableHead>
                          <TableHead className="arabic">النوع</TableHead>
                          <TableHead className="arabic">الحالة</TableHead>
                          <TableHead className="arabic">اللغة</TableHead>
                          <TableHead className="arabic">المؤلف</TableHead>
                          <TableHead className="arabic">التاريخ</TableHead>
                          <TableHead className="arabic">الإجراءات</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredPages.map((page) => (
                          <TableRow key={page.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white arabic">
                                  {page.title}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  /{page.slug}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {page.type === 'page' ? 'صفحة' :
                                 page.type === 'post' ? 'مقال' :
                                 'خبر'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge className={
                                page.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                page.status === 'draft' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                              }>
                                {page.status === 'published' ? 'منشور' :
                                 page.status === 'draft' ? 'مسودة' :
                                 'خاص'}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Badge variant="secondary">
                                {page.language === 'ar' ? 'العربية' : 'English'}
                              </Badge>
                            </TableCell>
                            <TableCell className="arabic">{page.author.name}</TableCell>
                            <TableCell>
                              {new Date(page.createdAt).toLocaleDateString('ar-SA')}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => window.open(`/${page.slug}`, '_blank')}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedItem(page);
                                    setIsEditModalOpen(true);
                                  }}
                                >
                                  <Edit className="w-4 h-4" />
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
                                        هل أنت متأكد من حذف هذه الصفحة؟ لا يمكن التراجع عن هذا الإجراء.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => deletePage(page.id)}
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
          </TabsContent>

          {/* Media Management */}
          <TabsContent value="media">
            <div className="space-y-6">
              <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between arabic text-gray-900 dark:text-white">
                    <span>مكتبة الوسائط</span>
                    <label htmlFor="file-upload">
                      <Button asChild>
                        <span className="arabic cursor-pointer">
                          <Upload className="w-4 h-4 ml-2" />
                          رفع ملف
                        </span>
                      </Button>
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files) {
                          Array.from(e.target.files).forEach(uploadFile);
                        }
                      }}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {media.map((file) => (
                      <div key={file.id} className="relative group">
                        <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                          {file.mimeType.startsWith('image/') ? (
                            <img
                              src={file.thumbnailUrl || file.url}
                              alt={file.alt || file.filename}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2 space-x-reverse">
                          <Button variant="secondary" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="secondary" size="sm">
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 truncate">
                          {file.originalName}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Categories Management */}
          <TabsContent value="categories">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="arabic text-gray-900 dark:text-white">إدارة التصنيفات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.id} className="dark:bg-gray-700 dark:border-gray-600">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white arabic">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 arabic">
                              {category.description}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500">
                              {category.count} عنصر
                            </p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="arabic">
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 ml-2" />
                                تعديل
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="w-4 h-4 ml-2" />
                                حذف
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Translations Management */}
          <TabsContent value="translations">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="arabic text-gray-900 dark:text-white">إدارة الترجمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="arabic">المفتاح</TableHead>
                        <TableHead className="arabic">العربية</TableHead>
                        <TableHead className="arabic">الإنجليزية</TableHead>
                        <TableHead className="arabic">التصنيف</TableHead>
                        <TableHead className="arabic">الإجراءات</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {translations.filter(t => t.language === 'ar').map((translation) => {
                        const englishTranslation = translations.find(
                          t => t.key === translation.key && t.language === 'en'
                        );
                        return (
                          <TableRow key={translation.id}>
                            <TableCell className="font-mono text-sm">
                              {translation.key}
                            </TableCell>
                            <TableCell className="arabic">
                              {translation.value}
                            </TableCell>
                            <TableCell>
                              {englishTranslation?.value || '-'}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{translation.category}</Badge>
                            </TableCell>
                            <TableCell>
                              <Button variant="ghost" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Menus Management */}
          <TabsContent value="menus">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="arabic text-gray-900 dark:text-white">إدارة القوائم</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {menus.map((menu) => (
                    <Card key={menu.id} className="dark:bg-gray-700 dark:border-gray-600">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between arabic text-gray-900 dark:text-white">
                          <span>{menu.name}</span>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Badge variant={menu.isActive ? "default" : "secondary"}>
                              {menu.isActive ? "نشط" : "غير نشط"}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {menu.items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-600 rounded">
                              <div className="flex items-center space-x-2 space-x-reverse">
                                <LinkIcon className="w-4 h-4 text-gray-400" />
                                <span className="arabic">{item.label}</span>
                                <span className="text-sm text-gray-500">({item.url})</span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {item.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Content Settings */}
          <TabsContent value="settings">
            {settingsData && (
              <div className="space-y-6">
                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between arabic text-gray-900 dark:text-white">
                      <span>الإعدادات العامة</span>
                      <Button onClick={saveSettings} className="arabic">
                        <Save className="w-4 h-4 ml-2" />
                        حفظ الإعدادات
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="arabic">اسم الموقع</Label>
                        <Input
                          value={settingsData.general.siteName}
                          onChange={(e) => updateSettingsData('general.siteName', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="arabic">الشعار</Label>
                        <Input
                          value={settingsData.general.tagline}
                          onChange={(e) => updateSettingsData('general.tagline', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="arabic">اللغة الافتراضية</Label>
                        <Select
                          value={settingsData.general.language}
                          onValueChange={(value) => updateSettingsData('general.language', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ar">العربية</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="arabic">المنطقة الزمنية</Label>
                        <Input
                          value={settingsData.general.timezone}
                          onChange={(e) => updateSettingsData('general.timezone', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">وصف الموقع</Label>
                      <Textarea
                        value={settingsData.general.description}
                        onChange={(e) => updateSettingsData('general.description', e.target.value)}
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="dark:bg-gray-800 dark:border-gray-700">
                  <CardHeader>
                    <CardTitle className="arabic text-gray-900 dark:text-white">إعدادات SEO</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="arabic">العنوان الافتراضي</Label>
                      <Input
                        value={settingsData.seo.defaultMetaTitle}
                        onChange={(e) => updateSettingsData('seo.defaultMetaTitle', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">الوصف الافتراضي</Label>
                      <Textarea
                        value={settingsData.seo.defaultMetaDescription}
                        onChange={(e) => updateSettingsData('seo.defaultMetaDescription', e.target.value)}
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="arabic">الكلمات المفتاحية</Label>
                      <Input
                        value={settingsData.seo.defaultKeywords.join(', ')}
                        onChange={(e) => updateSettingsData('seo.defaultKeywords', e.target.value.split(', ').filter(Boolean))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Page Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="arabic">إنشاء محتوى جديد</DialogTitle>
          </DialogHeader>
          <PageForm onSubmit={createPage} onClose={() => setIsCreateModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Page Modal */}
      {selectedItem && (
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="arabic">تعديل المحتوى</DialogTitle>
            </DialogHeader>
            <PageForm 
              page={selectedItem}
              onSubmit={(data) => updatePage(selectedItem.id, data)}
              onClose={() => setIsEditModalOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Page Form Component
function PageForm({ 
  page, 
  onSubmit, 
  onClose 
}: { 
  page?: ContentPage; 
  onSubmit: (data: Partial<ContentPage>) => void; 
  onClose: () => void; 
}) {
  const [formData, setFormData] = useState({
    title: page?.title || "",
    slug: page?.slug || "",
    content: page?.content || "",
    excerpt: page?.excerpt || "",
    status: page?.status || "draft" as const,
    type: page?.type || "page" as const,
    language: page?.language || "ar" as const,
    seo: {
      metaTitle: page?.seo.metaTitle || "",
      metaDescription: page?.seo.metaDescription || "",
      keywords: page?.seo.keywords || [],
    },
    tags: page?.tags || [],
    featuredImage: page?.featuredImage || "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      author: {
        id: "1",
        name: "المدير"
      },
      categories: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="arabic">العنوان</Label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            className="arabic"
          />
        </div>
        <div className="space-y-2">
          <Label className="arabic">الرابط (Slug)</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({...formData, slug: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="arabic">النوع</Label>
          <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
            <SelectTrigger className="arabic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="arabic">
              <SelectItem value="page">صفحة</SelectItem>
              <SelectItem value="post">مقال</SelectItem>
              <SelectItem value="news">خبر</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="arabic">الحالة</Label>
          <Select value={formData.status} onValueChange={(value: any) => setFormData({...formData, status: value})}>
            <SelectTrigger className="arabic">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="arabic">
              <SelectItem value="published">منشور</SelectItem>
              <SelectItem value="draft">مسودة</SelectItem>
              <SelectItem value="private">خاص</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="arabic">المحتوى</Label>
        <Textarea
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
          rows={10}
          className="arabic"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className="arabic">المقتطف</Label>
        <Textarea
          value={formData.excerpt}
          onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
          rows={3}
          className="arabic"
        />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium arabic">إعدادات SEO</h4>
        <div className="space-y-2">
          <Label className="arabic">عنوان SEO</Label>
          <Input
            value={formData.seo.metaTitle}
            onChange={(e) => setFormData({
              ...formData, 
              seo: {...formData.seo, metaTitle: e.target.value}
            })}
            className="arabic"
          />
        </div>
        <div className="space-y-2">
          <Label className="arabic">وصف SEO</Label>
          <Textarea
            value={formData.seo.metaDescription}
            onChange={(e) => setFormData({
              ...formData, 
              seo: {...formData.seo, metaDescription: e.target.value}
            })}
            rows={2}
            className="arabic"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 space-x-reverse">
        <Button type="button" variant="outline" onClick={onClose} className="arabic">
          إلغاء
        </Button>
        <Button type="submit" className="arabic">
          {page ? "تحديث" : "إنشاء"}
        </Button>
      </div>
    </form>
  );
}
