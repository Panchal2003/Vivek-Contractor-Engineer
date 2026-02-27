const express = require("express");

const router = express.Router();

router.post("/login", (req, res) => {
  const configuredKey = String(process.env.ADMIN_SECRET || "").trim();
  const providedKey = String(req.body?.adminKey || "").trim();

  if (!configuredKey) {
    return res.status(500).json({ message: "Admin auth is not configured on server" });
  }

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({ message: "Invalid admin key" });
  }

  return res.status(200).json({ message: "Login successful" });
});

router.get("/verify", (req, res) => {
  const configuredKey = String(process.env.ADMIN_SECRET || "").trim();
  const providedKey = String(req.headers["x-admin-key"] || "").trim();

  if (!configuredKey) {
    return res.status(500).json({ message: "Admin auth is not configured on server" });
  }

  if (!providedKey || providedKey !== configuredKey) {
    return res.status(401).json({ message: "Unauthorized admin request" });
  }

  return res.status(200).json({ ok: true });
});

module.exports = router;
