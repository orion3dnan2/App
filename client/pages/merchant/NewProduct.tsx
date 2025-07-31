import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Package,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Warehouse,
} from "lucide-react";
import { useProducts } from "@/lib/products";
import { useAuth } from "@/lib/auth";
import { Product } from "../../../shared/types";

export default function NewProduct() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { saveProduct, generateSKU, validateProduct, categories } =
    useProducts();

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  const [formData, setFormData] = useState<Partial<Product>>({
    storeId: "store-001", // Replace with actual store ID from user context
    name: "",
    description: "",
    price: 0,
    salePrice: undefined,
    images: [],
    category: "",
    tags: [],
    inventory: {
      quantity: 0,
      sku: "",
      lowStockThreshold: 5,
    },
    specifications: {},
    status: "active",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleInventoryChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory!,
        [field]: value,
      },
    }));
  };

  const handleAddImage = () => {
    if (currentImageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...(prev.images || []), currentImageUrl.trim()],
      }));
      setCurrentImageUrl("");
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddTag = (tagInput: string) => {
    const newTags = tagInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    setFormData((prev) => ({
      ...prev,
      tags: [...new Set([...(prev.tags || []), ...newTags])],
    }));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((tag) => tag !== tagToRemove) || [],
    }));
  };

  const handleSpecificationAdd = (key: string, value: string) => {
    if (key.trim() && value.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [key.trim()]: value.trim(),
        },
      }));
    }
  };

  const handleSpecificationRemove = (key: string) => {
    setFormData((prev) => ({
      ...prev,
      specifications: Object.fromEntries(
        Object.entries(prev.specifications || {}).filter(([k]) => k !== key),
      ),
    }));
  };

  const generateAutoSKU = () => {
    if (formData.category && formData.name) {
      const sku = generateSKU(formData.category, formData.name);
      handleInventoryChange("sku", sku);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    // Validate form
    const validationErrors = validateProduct(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Generate ID and SKU if not provided
      const productId = `prod-${Date.now()}`;
      const finalSKU =
        formData.inventory?.sku ||
        generateSKU(formData.category!, formData.name!);

      const newProduct: Product = {
        id: productId,
        storeId: formData.storeId!,
        name: formData.name!,
        description: formData.description!,
        price: formData.price!,
        salePrice: formData.salePrice,
        images: formData.images!,
        category: formData.category!,
        tags: formData.tags!,
        inventory: {
          quantity: formData.inventory?.quantity || 0,
          sku: finalSKU,
          lowStockThreshold: formData.inventory?.lowStockThreshold || 5,
        },
        specifications: formData.specifications || {},
        status: formData.status as Product["status"],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      saveProduct(newProduct);
      navigate("/merchant/products");
    } catch (error) {
      setErrors(["حدث خطأ في حفظ الم��تج. يرجى المحاولة مرة أخرى."]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Link to="/merchant/products">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 ml-2" />
                  العودة
                </Button>
              </Link>
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 arabic">
                  إضافة منتج جديد
                </h1>
                <p className="text-gray-600 arabic">
                  أدخل معلومات المنتج الجديد
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Messages */}
          {errors.length > 0 && (
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center text-red-800 mb-2">
                  <X className="w-5 h-5 ml-2" />
                  <span className="font-semibold arabic">
                    يرجى تصحيح الأخطاء التالية:
                  </span>
                </div>
                <ul className="space-y-1">
                  {errors.map((error, index) => (
                    <li key={index} className="text-red-700 text-sm arabic">
                      • {error}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <Package className="w-5 h-5 ml-2" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="arabic">اسم المنتج *</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="mt-2 arabic text-right"
                    placeholder="مثال: عطر صندل سوداني أصلي"
                    required
                  />
                </div>

                <div>
                  <Label className="arabic">الفئة *</Label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full mt-2 p-2 border border-gray-300 rounded-lg arabic text-right"
                    required
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="new">فئة جديدة</option>
                  </select>
                  {formData.category === "new" && (
                    <Input
                      placeholder="أدخل اسم الفئة الجديدة"
                      className="mt-2 arabic text-right"
                      onChange={(e) =>
                        handleInputChange("category", e.target.value)
                      }
                    />
                  )}
                </div>
              </div>

              <div>
                <Label className="arabic">وصف المنتج *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="mt-2 arabic text-right"
                  rows={4}
                  placeholder="وصف مفصل للمنتج، خصائصه، وفوائده..."
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <DollarSign className="w-5 h-5 ml-2" />
                الأسعار
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="arabic">السعر الأساسي *</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="mt-2"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label className="arabic">سعر الخصم (اختياري)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.salePrice || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "salePrice",
                        e.target.value ? parseFloat(e.target.value) : undefined,
                      )
                    }
                    className="mt-2"
                    placeholder="0.00"
                  />
                  {formData.salePrice &&
                    formData.price &&
                    formData.salePrice < formData.price && (
                      <p className="text-sm text-green-600 mt-1 arabic">
                        خصم{" "}
                        {Math.round(
                          ((formData.price - formData.salePrice) /
                            formData.price) *
                            100,
                        )}
                        %
                      </p>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <ImageIcon className="w-5 h-5 ml-2" />
                صور المنتج
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-2 space-x-reverse">
                <Input
                  value={currentImageUrl}
                  onChange={(e) => setCurrentImageUrl(e.target.value)}
                  placeholder="رابط الصورة (https://...)"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleAddImage}
                  disabled={!currentImageUrl.trim()}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`منتج ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      {index === 0 && (
                        <Badge className="absolute bottom-2 right-2 bg-blue-500 text-white text-xs">
                          الصورة الرئيسية
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center space-x-2 space-x-reverse">
                <Button type="button" variant="outline" className="arabic">
                  <Upload className="w-4 h-4 ml-2" />
                  رفع صورة من الجهاز
                </Button>
                <p className="text-sm text-gray-600 arabic">
                  أو أدخل رابط الصورة أعلاه
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <Warehouse className="w-5 h-5 ml-2" />
                المخزون والرموز
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="arabic">الكمية المتوفرة *</Label>
                  <Input
                    type="number"
                    value={formData.inventory?.quantity}
                    onChange={(e) =>
                      handleInventoryChange(
                        "quantity",
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="mt-2"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <Label className="arabic">حد التنبيه للمخزون</Label>
                  <Input
                    type="number"
                    value={formData.inventory?.lowStockThreshold}
                    onChange={(e) =>
                      handleInventoryChange(
                        "lowStockThreshold",
                        parseInt(e.target.value) || 5,
                      )
                    }
                    className="mt-2"
                    min="0"
                  />
                </div>

                <div>
                  <Label className="arabic">رمز المنتج (SKU)</Label>
                  <div className="flex items-center space-x-2 space-x-reverse mt-2">
                    <Input
                      value={formData.inventory?.sku}
                      onChange={(e) =>
                        handleInventoryChange("sku", e.target.value)
                      }
                      placeholder="AUTO-GENERATED"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={generateAutoSKU}
                    >
                      توليد
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center arabic">
                <Tag className="w-5 h-5 ml-2" />
                العلامات والمواصفات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label className="arabic">العلامات (مفصولة بفاصلة)</Label>
                <Input
                  placeholder="مثال: عطر, صندل, سوداني, طبيعي"
                  className="mt-2 arabic text-right"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag(e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
                {formData.tags && formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="arabic">
                        {tag}
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <Label className="arabic">المواصفات الفنية</Label>
                <div className="space-y-3 mt-2">
                  {Object.entries(formData.specifications || {}).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <Input value={key} readOnly className="flex-1" />
                        <Input value={value} readOnly className="flex-1" />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleSpecificationRemove(key)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ),
                  )}
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Input
                      placeholder="اسم المواصفة"
                      className="flex-1 arabic text-right"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const key = e.currentTarget.value;
                          const valueInput =
                            e.currentTarget.parentElement?.querySelector(
                              "input:last-child",
                            ) as HTMLInputElement;
                          if (key && valueInput?.value) {
                            handleSpecificationAdd(key, valueInput.value);
                            e.currentTarget.value = "";
                            valueInput.value = "";
                          }
                        }
                      }}
                    />
                    <Input
                      placeholder="القيمة"
                      className="flex-1 arabic text-right"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const value = e.currentTarget.value;
                          const keyInput =
                            e.currentTarget.parentElement?.querySelector(
                              "input:first-child",
                            ) as HTMLInputElement;
                          if (keyInput?.value && value) {
                            handleSpecificationAdd(keyInput.value, value);
                            keyInput.value = "";
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 arabic">
                    اضغط Enter لإضافة مواصفة جديدة
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between pt-6 border-t">
            <Link to="/merchant/products">
              <Button type="button" variant="outline" className="arabic">
                إلغاء
              </Button>
            </Link>
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  handleInputChange(
                    "status",
                    formData.status === "active" ? "inactive" : "active",
                  )
                }
                className="arabic"
              >
                {formData.status === "active" ? "حفظ كمسودة" : "تفعيل المنتج"}
              </Button>
              <Button type="submit" disabled={isLoading} className="arabic">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 ml-2" />
                    حفظ المنتج
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
