const Founder = require("../models/founderModel");
const cloudinary = require("../config/cloudinary");

// 🔒 ADMIN – CREATE / UPDATE FOUNDER -----------------------------------------
exports.upsertFounder = async (req, res) => {
  try {
    const {
      name,
      title,
      bio,
      experienceYears,
      studentsTrained,
      specialization,
      teachingStyle,
    } = req.body;

    // 🔒 Basic validation
    if (
      !name ||
      !title ||
      !bio ||
      !experienceYears ||
      !studentsTrained ||
      !specialization ||
      !teachingStyle
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 🧠 Always keep single founder
    let founder = await Founder.findOne();

    /* ================= CREATE ================= */
    if (!founder) {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Founder image is required",
        });
      }

      founder = await Founder.create({
        name,
        title,
        bio,
        experienceYears,
        studentsTrained,
        specialization,
        teachingStyle,
        image: {
          public_id: req.file.filename,
          url: req.file.path,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Founder created successfully",
        founder,
      });
    }

    /* ================= UPDATE ================= */

    founder.name = name;
    founder.title = title;
    founder.bio = bio;
    founder.experienceYears = experienceYears;
    founder.studentsTrained = studentsTrained;
    founder.specialization = specialization;
    founder.teachingStyle = teachingStyle;

    // 🔁 IMAGE REPLACE (SAFE)
    if (req.file) {
      if (founder.image?.public_id) {
        try {
          await cloudinary.uploader.destroy(founder.image.public_id);
        } catch (err) {
          console.error(
            "Cloudinary delete failed:",
            founder.image.public_id,
            err.message,
          );
          // ❗ Do NOT throw — update should continue
        }
      }

      founder.image = {
        public_id: req.file.filename,
        url: req.file.path,
      };
    }

    await founder.save();

    return res.json({
      success: true,
      message: "Founder updated successfully",
      founder,
    });
  } catch (error) {
    console.error("Founder upsert error:", error);
    return res.status(500).json({
      success: false,
      message: "Founder operation failed",
    });
  }
};

// 🔒 GET FOUNDER ADMIN -------------------------------------------------------
exports.getFounderAdmin = async (req, res) => {
  try {
    const founder = await Founder.findOne({ isActive: true });

    if (!founder) {
      return res.status(404).json({
        success: false,
        message: "Founder not found",
      });
    }

    res.json({
      success: true,
      founder,
    });
  } catch (error) {
    console.error("Get founder error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch founder",
    });
  }
};

// GET FOUNDER (PUBLIC) -------------------------------------------------------
exports.getFounder = async (req, res) => {
  try {
    const founder = await Founder.findOne({ isActive: true });

    if (!founder) {
      return res.status(404).json({
        success: false,
        message: "Founder not found",
      });
    }

    res.json({
      success: true,
      founder,
    });
  } catch (error) {
    console.error("Get founder error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch founder",
    });
  }
};
