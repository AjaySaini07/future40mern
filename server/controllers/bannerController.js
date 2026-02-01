const cloudinary = require("../config/cloudinary");
const bannerModel = require("../models/bannerModel");

// 🔒 ADMIN – Create Banner ---------------------------------------------
exports.createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Banner image is required",
      });
    }

    // 🔢 Find last order
    const lastBanner = await bannerModel
      .findOne()
      .sort({ order: -1 })
      .select("order");

    const nextOrder = lastBanner ? lastBanner.order + 1 : 1;

    // ✅ Image already uploaded by multer-storage-cloudinary
    const banner = await bannerModel.create({
      order: nextOrder,
      image: {
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename, // Cloudinary public_id
      },
    });

    res.status(201).json({
      success: true,
      message: "Banner created successfully",
      banner,
    });
  } catch (error) {
    console.error("Create Banner Error:", error);
    res.status(500).json({
      message: "Failed to create banner",
    });
  }
};

// 🔒 ADMIN – Delete Banner ---------------------------------------------
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await bannerModel.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    const deletedOrder = banner.order;

    /* ☁️ Delete image from Cloudinary (safe) */
    if (banner.image?.public_id) {
      try {
        await cloudinary.uploader.destroy(banner.image.public_id);
      } catch (err) {
        console.error(
          "Cloudinary delete failed:",
          banner.image.public_id,
          err.message,
        );
        // ❗ do NOT throw — DB delete should still happen
      }
    }

    /* 🗑 Delete banner from DB */
    await banner.deleteOne();

    /* 🔁 Auto reorder remaining banners */
    await bannerModel.updateMany(
      { order: { $gt: deletedOrder } },
      { $inc: { order: -1 } },
    );

    return res.status(200).json({
      success: true,
      message: "Banner deleted and order updated successfully",
    });
  } catch (error) {
    console.error("Delete Banner Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete banner",
    });
  }
};

// 🔒 ADMIN – Active / Inactive Banner ------------------------------------
exports.toggleBannerStatus = async (req, res) => {
  try {
    const banner = await bannerModel.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        success: false,
        message: "Banner not found",
      });
    }

    banner.isActive = !banner.isActive;
    await banner.save();

    return res.status(200).json({
      success: true,
      isActive: banner.isActive,
      message: `Banner ${
        banner.isActive ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔒 ADMIN – Get All Banners ---------------------------------------------
exports.getAllBannersAdmin = async (req, res) => {
  try {
    const banners = await bannerModel.find().sort({ order: 1 });

    return res.status(200).json({
      success: true,
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🌍 Public – Get All Banners -------------------------------------------
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await bannerModel
      .find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: banners.length,
      banners,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
