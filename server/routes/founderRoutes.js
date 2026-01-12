const express = require("express");
const router = express.Router();
const {
  upsertFounder,
  getFounder,
} = require("../controllers/founderController");

const upload = require("../middlewares/cloudinaryUpload");
const { adminAuth } = require("../middlewares/adminAuth");

// 🌐 Public
router.get("/founder-info", getFounder);

// 🔐 Admin only
router.post(
  "/admin/founder-update",
  adminAuth,
  upload.single("image"),
  upsertFounder
);

module.exports = router;
