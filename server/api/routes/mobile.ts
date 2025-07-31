import { Router } from "express";

const router = Router();

// Mobile configuration
router.get("/config", (req, res) => {
  res.json({
    version: "1.0.0",
    features: ["auth", "marketplace", "stores"],
    platform: req.platform || "mobile",
  });
});

// Sync data
router.get("/sync", (req, res) => {
  res.json({
    status: "synced",
    timestamp: new Date().toISOString(),
    data: {
      users: 0,
      stores: 0,
      products: 0,
    },
  });
});

export { router as mobileRoutes };
