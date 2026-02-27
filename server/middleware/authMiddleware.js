const requireAdmin = (req, res, next) => {
  const configuredKey = process.env.ADMIN_SECRET;

  if (!configuredKey) {
    return next();
  }

  const requestKey = req.headers["x-admin-key"];
  const normalizedRequestKey = String(requestKey || "").trim();
  const normalizedConfiguredKey = String(configuredKey).trim();

  if (!normalizedRequestKey || normalizedRequestKey !== normalizedConfiguredKey) {
    return res.status(401).json({ message: "Unauthorized admin request" });
  }

  next();
};

module.exports = { requireAdmin };
