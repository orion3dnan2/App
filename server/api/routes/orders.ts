import { Router } from "express";
import { authenticateToken } from "./auth-dev";
import fs from "fs";
import path from "path";

const router = Router();

// مسار ملف الطلبات
const ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");

// تحميل الطلبات من الملف
function loadOrders() {
  try {
    if (fs.existsSync(ORDERS_FILE)) {
      const data = fs.readFileSync(ORDERS_FILE, "utf8");
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error("خطأ في تحميل الطلبات:", error);
    return [];
  }
}

// حفظ الطلبات في الملف
function saveOrders(orders: any[]) {
  try {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("خطأ في حفظ الطلبات:", error);
    return false;
  }
}

// إنشاء طلب جديد
router.post("/", async (req, res) => {
  try {
    const {
      storeId,
      items,
      customerInfo,
      shippingAddress,
      paymentMethod,
      notes,
    } = req.body;

    // التحقق من البيانات المطلوبة
    if (!storeId || !items || !items.length || !customerInfo) {
      return res.status(400).json({ error: "بيانات غير مكتملة" });
    }

    // حساب المجموع
    const subtotal = items.reduce((sum: number, item: any) => {
      return sum + item.price * item.quantity;
    }, 0);

    const shipping = subtotal >= 100 ? 0 : 15; // شحن مجاني للطلبات فوق 100
    const tax = subtotal * 0.1; // ضريبة 10%
    const total = subtotal + shipping + tax;

    // إنشاء الطلب
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      storeId,
      customerId: req.user?.id || null,
      customerInfo: {
        name: customerInfo.name,
        email: customerInfo.email || "",
        phone: customerInfo.phone || "",
      },
      items: items.map((item: any) => ({
        productId: item.productId,
        productName: item.name,
        productImage: item.image || "/placeholder.svg",
        quantity: item.quantity,
        price: item.price,
        total: item.price * item.quantity,
      })),
      pricing: {
        subtotal,
        shipping,
        tax,
        total,
      },
      shippingAddress: shippingAddress || {},
      paymentMethod: paymentMethod || "cash_on_delivery",
      notes: notes || "",
      status: "pending",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // تحميل الطلبات الحالية
    const orders = loadOrders();
    orders.push(newOrder);

    // حفظ الطلبات
    if (saveOrders(orders)) {
      console.log(`✅ تم إنشاء طلب جديد: ${newOrder.id}`);
      res.status(201).json({
        message: "تم إنشاء الطلب بنجاح",
        order: newOrder,
      });
    } else {
      res.status(500).json({ error: "خطأ في حفظ الطلب" });
    }
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// جلب جميع الطلبات (للمديرين)
router.get("/", authenticateToken, async (req: any, res) => {
  try {
    const orders = loadOrders();

    // إذا كان المستخدم مدير، أرجع جميع الطلبات
    if (req.user.role === "super_admin") {
      return res.json(orders);
    }

    // إذا كان تاجر، أرجع طلبات متاجره فقط
    if (req.user.role === "merchant") {
      // تحميل المتاجر لمعرفة متاجر المستخدم
      const { StoreDatabase } = await import("../../lib/database");
      const userStores = StoreDatabase.findStores(
        (store: any) => store.merchantId === req.user.id,
      );
      const userStoreIds = userStores.map((store: any) => store.id);

      const merchantOrders = orders.filter((order: any) =>
        userStoreIds.includes(order.storeId),
      );
      return res.json(merchantOrders);
    }

    // إذا كان عميل، أرجع طلباته فقط
    if (req.user.role === "customer") {
      const customerOrders = orders.filter(
        (order: any) => order.customerId === req.user.id,
      );
      return res.json(customerOrders);
    }

    res.status(403).json({ error: "غير مصرح لك بالوصول" });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// جلب طلب واحد
router.get("/:id", authenticateToken, async (req: any, res) => {
  try {
    const orderId = req.params.id;
    const orders = loadOrders();
    const order = orders.find((o: any) => o.id === orderId);

    if (!order) {
      return res.status(404).json({ error: "الطلب غير موجود" });
    }

    // التحقق من الصلاحيات
    if (req.user.role === "super_admin") {
      return res.json(order);
    }

    if (req.user.role === "merchant") {
      // التحقق أن الطلب من متجر المستخدم
      const { StoreDatabase } = await import("../../lib/database");
      const userStores = StoreDatabase.findStores(
        (store: any) => store.merchantId === req.user.id,
      );
      const userStoreIds = userStores.map((store: any) => store.id);

      if (!userStoreIds.includes(order.storeId)) {
        return res.status(403).json({ error: "غير مصرح لك بالوصول" });
      }
      return res.json(order);
    }

    if (req.user.role === "customer" && order.customerId === req.user.id) {
      return res.json(order);
    }

    res.status(403).json({ error: "غير مصرح لك بالوصول" });
  } catch (error) {
    console.error("Get order error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

// تحديث حالة الطلب
router.put("/:id/status", authenticateToken, async (req: any, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "حالة غير صحيحة" });
    }

    const orders = loadOrders();
    const orderIndex = orders.findIndex((o: any) => o.id === orderId);

    if (orderIndex === -1) {
      return res.status(404).json({ error: "الطلب غير موجود" });
    }

    const order = orders[orderIndex];

    // التحقق من الصلاحيات (فقط التجار والمديرين يمكنهم تحديث الحالة)
    if (req.user.role === "customer") {
      return res.status(403).json({ error: "غير مصرح لك بتحديث حالة الطلب" });
    }

    if (req.user.role === "merchant") {
      // التحقق أن الطلب من متجر المستخدم
      const { StoreDatabase } = await import("../../lib/database");
      const userStores = StoreDatabase.findStores(
        (store: any) => store.merchantId === req.user.id,
      );
      const userStoreIds = userStores.map((store: any) => store.id);

      if (!userStoreIds.includes(order.storeId)) {
        return res.status(403).json({ error: "غير مصرح لك بالوصول" });
      }
    }

    // تحديث الحالة
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();

    if (saveOrders(orders)) {
      console.log(`✅ تم تحديث حالة الطلب ${orderId} إلى: ${status}`);
      res.json({
        message: "تم تحديث حالة الطلب بنجاح",
        order: orders[orderIndex],
      });
    } else {
      res.status(500).json({ error: "خطأ في حفظ التحديث" });
    }
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ error: "خطأ في الخادم" });
  }
});

export { router as ordersRoutes };
