import { Router } from "express";

const router = Router();

// Mock products data
const products = [
  {
    id: "prod-001",
    name: "منتج تجريبي",
    category: "electronics",
    price: 100,
    storeId: "store-001",
    description: "منتج تجريبي للاختبار",
  },
];

// Get all products
router.get("/", (req, res) => {
  res.json(products);
});

// Get single product
router.get("/:id", (req, res) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: "المنتج غير موجود" });
  }
  res.json(product);
});

export { router as productsRoutes };
