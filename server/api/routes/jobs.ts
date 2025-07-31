import { Router } from "express";

const router = Router();

// Mock jobs data
const jobs = [
  {
    id: "job-001",
    title: "وظيفة تجريبية",
    category: "technology",
    type: "full-time",
    location: "الخرطوم",
    description: "وظيفة تجريبية للاختبار",
  },
];

// Get all jobs
router.get("/", (req, res) => {
  res.json(jobs);
});

// Get single job
router.get("/:id", (req, res) => {
  const job = jobs.find((j) => j.id === req.params.id);
  if (!job) {
    return res.status(404).json({ error: "الوظيفة غير موجودة" });
  }
  res.json(job);
});

export { router as jobsRoutes };
