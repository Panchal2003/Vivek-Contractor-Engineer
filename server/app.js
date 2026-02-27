const express = require("express");
const cors = require("cors");

const serviceRoutes = require("./routes/serviceRoutes");
const projectRoutes = require("./routes/projectRoutes");
const machineryRoutes = require("./routes/machineryRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ ok: true, message: "Server is running" });
});

app.use("/api/services", serviceRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/machinery", machineryRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/auth", authRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

module.exports = app;
