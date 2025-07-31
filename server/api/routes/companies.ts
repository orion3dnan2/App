import { Router } from "express";

const router = Router();

// Mock companies data
const companies = [
  {
    id: "comp-001",
    name: "شركة السودان للتجارة",
    industry: "retail",
    country: "السودان",
    size: "large",
    description: "شركة رائدة في مجال التجارة",
  },
];

// Get all companies
router.get("/", (req, res) => {
  res.json(companies);
});

// Get single company
router.get("/:id", (req, res) => {
  const company = companies.find((c) => c.id === req.params.id);
  if (!company) {
    return res.status(404).json({ error: "الشركة غير موجودة" });
  }
  res.json(company);
});

export { router as companiesRoutes };
