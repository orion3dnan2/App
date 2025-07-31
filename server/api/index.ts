import express from "express";
import cors from "cors";
import { authDevRoutes } from "./routes/auth-dev";
import { companiesRoutes } from "./routes/companies";
import { productsRoutes } from "./routes/products";
import { jobsRoutes } from "./routes/jobs";
import { storesRoutes } from "./routes/stores";
import { servicesRoutes } from "./routes/services";
import { userRoutes } from "./routes/users";
import { ordersRoutes } from "./routes/orders";

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.WEB_URL || "https://your-domain.com",
      // Add your mobile app schemes
      "sudanapp://",
      "exp://", // For Expo development
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Platform"],
  }),
);

app.use(express.json());

// Platform detection middleware
app.use((req, res, next) => {
  const platform = req.headers["x-platform"] || "web";
  req.platform = platform;
  next();
});

// API Routes
app.use("/api/auth", authDevRoutes);
app.use("/api/companies", companiesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/stores", storesRoutes);
app.use("/api/services", servicesRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", ordersRoutes);

// Mobile-specific routes
app.use("/api/mobile", require("./routes/mobile"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    platform: req.platform,
  });
});

// Error handling middleware
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error("API Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
      platform: req.platform,
    });
  },
);

export default app;
