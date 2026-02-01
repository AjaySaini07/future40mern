const express = require("express");
const router = express.Router();
// const upload = require("../middlewares/cloudinaryUpload");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");
const uploadStory = cloudinaryUpload("success-stories");
const {
  submitStory,
  getApprovedStories,
  getAllStories,
  approveStory,
  deleteStory,
  getPendingStories,
} = require("../controllers/storyController");
const { studentAuth } = require("../middlewares/studentAuth");
const { adminAuth } = require("../middlewares/adminAuth");

// 🌍 Public Routes
router.post("/submit", studentAuth, uploadStory.single("photo"), submitStory);
router.get("/approved", getApprovedStories);

// 🔐 Admin-Only Routes
router.get("/admin/all-stories", adminAuth, getAllStories);
router.put("/admin/approve/:id", adminAuth, approveStory);
router.delete("/admin/delete/:id", adminAuth, deleteStory);
router.get("/admin/pending", adminAuth, getPendingStories);

module.exports = router;
