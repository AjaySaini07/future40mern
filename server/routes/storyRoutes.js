const express = require("express");
const router = express.Router();
const upload = require("../middlewares/cloudinaryUpload");
const {
  submitStory,
  getApprovedStories,
} = require("../controllers/storyController");
const { studentAuth } = require("../middlewares/studentAuth");
const { adminAuth } = require("../middlewares/adminAuth");

// Public
router.post("/submit", studentAuth, upload.single("photo"), submitStory);
router.get("/approved", getApprovedStories);

module.exports = router;
