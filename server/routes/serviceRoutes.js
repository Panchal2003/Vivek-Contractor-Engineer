const express = require("express");
const { requireAdmin } = require("../middleware/authMiddleware");
const {
  listServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const router = express.Router();

router.get("/", listServices);
router.post("/", requireAdmin, createService);
router.put("/:id", requireAdmin, updateService);
router.delete("/:id", requireAdmin, deleteService);

module.exports = router;
