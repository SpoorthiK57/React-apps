const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const paymentRoutes = require("./routes/paymentRoutes"); // Added payment routes
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT"],
  credentials: true
}));
app.use(express.json()); // Parses incoming JSON payloads

// MongoDB Connection with Error Handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// Logging Middleware for API Requests
app.use((req, res, next) => {
  console.log(`📢 [${req.method}] ${req.url}`);
  next();
});

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes); // Added payment integration route

// Catch-All 404 Route
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Server Initialization
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});