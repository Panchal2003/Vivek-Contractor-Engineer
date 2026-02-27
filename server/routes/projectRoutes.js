const express = require("express");
const { requireAdmin } = require("../middleware/authMiddleware");
const {
  listProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const router = express.Router();

router.get("/", listProjects);
router.post("/", requireAdmin, createProject);
router.put("/:id", requireAdmin, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

module.exports = router;
