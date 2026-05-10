const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// ─── Load environment variables ───────────────
dotenv.config();

// ─── Connect to MongoDB ────────────────────────
connectDB();

const app = express();

// ─── Core Middleware ───────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🔐 Auth API is running",
    version: "1.0.0",
    endpoints: {
      register: "POST /api/auth/register",
      login:    "POST /api/auth/login",
      me:       "GET  /api/auth/me       (Bearer token required)",
      users:    "GET  /api/auth/users    (Admin only)",
    },
  });
});

// ─── API Routes ────────────────────────────────
app.use("/api/auth", authRoutes);

// ─── Error Handling ────────────────────────────
app.use(notFound);
app.use(errorHandler);

// ─── Start Server ──────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});

module.exports = app;
