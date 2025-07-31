import { Router } from "express";

const router = Router();

// Mock services data
const services = [
  {
    id: "service-001",
    name: "خدمة تجريبية",
    category: "technology",
    location: "الخرطوم",
    description: "خدمة تجريبية للاختبار",
  },
];

// Get all services
router.get("/", (req, res) => {
  res.json(services);
});

// Get single service
router.get("/:id", (req, res) => {
  const service = services.find((s) => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ error: "الخدمة غير موجودة" });
  }
  res.json(service);
});

export { router as servicesRoutes };
