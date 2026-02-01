const express = require("express");
const router = express.Router();

// const upload = require("../middlewares/cloudinaryUpload");
const cloudinaryUpload = require("../middlewares/cloudinaryUpload");
const uploadBanner = cloudinaryUpload("banners");

const {
  createBanner,
  deleteBanner,
  getAllBanners,
  getAllBannersAdmin,
  toggleBannerStatus,
} = require("../controllers/bannerController");
const { adminAuth } = require("../middlewares/adminAuth");

// 🌍 Public Routes
router.get("/all-banners", getAllBanners);

// 🔒 Admin Routes
router.get("/admin/all-banners", getAllBannersAdmin);

router.post(
  "/admin/add-banner",
  adminAuth,
  uploadBanner.single("image"),
  createBanner,
);

router.patch("/admin/toggle/:id", adminAuth, toggleBannerStatus);

router.delete("/admin/delete-banner/:id", adminAuth, deleteBanner);

module.exports = router;
