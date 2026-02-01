const cloudinary = require("../config/cloudinary");
const heroModel = require("../models/heroModel");

// PUBLIC – PUBLIC HERO -----------------------------------------------
exports.getHeroInfo = async (req, res) => {
  try {
    const hero = await heroModel
      .findOne()
      .select(
        "title heading description yearsExperience studentsTrained successRate backgroundImage",
      );

    res.status(200).json({
      success: true,
      hero,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero info",
    });
  }
};

// 🔒 ADMIN – ADMIN HERO INFO -----------------------------------------
exports.getHero = async (req, res) => {
  try {
    const hero = await heroModel.findOne();
    res.status(200).json({
      success: true,
      hero,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch hero (admin)",
    });
  }
};

// 🔒 ADMIN – CREATE / UPDATE HERO ------------------------------------
exports.updateHero = async (req, res) => {
  try {
    const {
      title,
      heading,
      description,
      yearsExperience,
      studentsTrained,
      successRate,
    } = req.body;

    if (
      !title ||
      !heading ||
      !description ||
      !yearsExperience ||
      !studentsTrained ||
      !successRate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    let hero = await heroModel.findOne();

    /* 🖼 New image (if uploaded) */
    const newImage = req.file
      ? {
          url: req.file.path,
          public_id: req.file.filename,
        }
      : null;

    /* ---------------------- CREATE ---------------------- */
    if (!hero) {
      if (!newImage) {
        return res.status(400).json({
          success: false,
          message: "Background image is required",
        });
      }

      hero = await heroModel.create({
        title,
        heading,
        description,
        yearsExperience,
        studentsTrained,
        successRate,
        backgroundImage: newImage,
      });

      return res.status(201).json({
        success: true,
        message: "Hero created successfully",
        hero,
      });
    }

    /* -------------------------- UPDATE -------------------------- */

    // 🧹 Delete old image if new image uploaded
    if (newImage && hero.backgroundImage?.public_id) {
      try {
        await cloudinary.uploader.destroy(hero.backgroundImage.public_id);
      } catch (err) {
        console.error(
          "Cloudinary delete failed:",
          hero.backgroundImage.public_id,
          err.message,
        );
        // ❗ Do NOT throw — update should still continue
      }

      hero.backgroundImage = newImage;
    }

    hero.title = title;
    hero.heading = heading;
    hero.description = description;
    hero.yearsExperience = yearsExperience;
    hero.studentsTrained = studentsTrained;
    hero.successRate = successRate;

    await hero.save();

    res.status(200).json({
      success: true,
      message: "Hero updated successfully",
      hero,
    });
  } catch (err) {
    console.error("Hero update error:", err);
    res.status(500).json({
      success: false,
      message: "Hero update failed",
    });
  }
};
