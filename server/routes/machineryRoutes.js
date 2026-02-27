const express = require("express");
const { requireAdmin } = require("../middleware/authMiddleware");
const {
  listMachinery,
  createMachinery,
  updateMachinery,
  deleteMachinery,
} = require("../controllers/machineryController");

const router = express.Router();

router.get("/", listMachinery);
router.post("/", requireAdmin, createMachinery);
router.put("/:id", requireAdmin, updateMachinery);
router.delete("/:id", requireAdmin, deleteMachinery);

module.exports = router;
