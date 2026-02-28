const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

// MongoDB Connection
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB database successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Basic route
app.get("/", (req, res) => {
  res.send("Portfolio API is running");
});

// Import Routes
const contactRoutes = require("./routes/contact");
const projectRoutes = require("./routes/project");
const profileRoutes = require("./routes/profile");
const experienceRoutes = require("./routes/experience");

// Use Routes
app.use("/api/contact", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/experience", experienceRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
