const express = require("express");
const { requireAdmin } = require("../middleware/authMiddleware");
const {
  listInquiries,
  createInquiry,
  updateInquiryStatus,
  deleteInquiry,
} = require("../controllers/inquiryController");

const router = express.Router();

router.post("/", createInquiry);
router.get("/", requireAdmin, listInquiries);
router.patch("/:id/status", requireAdmin, updateInquiryStatus);
router.delete("/:id", requireAdmin, deleteInquiry);

module.exports = router;
