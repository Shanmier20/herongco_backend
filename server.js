// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const productRoutes = require("./routes/product.routes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS configuration
app.use(cors({
  origin: [
    "http://localhost:5173", // Local dev
    "https://jrmm-inventory-system.vercel.app", // ✅ Your deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ Handle OPTIONS preflight
app.options("*", cors());

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Product Inventory API." });
});
app.use("/api/products", productRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    detail: process.env.NODE_ENV === "production" ? null : err.message,
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
});
