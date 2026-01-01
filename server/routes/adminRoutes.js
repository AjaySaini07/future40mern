const express = require("express");
const {
  getAdminStats,
  getAllStories,
  approveStory,
  getPendingStories,
  updateStoryStatus,
  deleteStory,
} = require("../controllers/adminController");
const { adminAuth } = require("../middlewares/adminAuth");

const router = express.Router();

router.get("/stats", adminAuth, getAdminStats);

// Admin-only
router.get("/all-stories", adminAuth, getAllStories);
router.put("/approve/:id", adminAuth, approveStory);
router.delete("/delete/:id", adminAuth, deleteStory);

router.get("/pending", adminAuth, getPendingStories);
router.put("/:id/status", adminAuth, updateStoryStatus);

module.exports = router;
