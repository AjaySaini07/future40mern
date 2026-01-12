const Founder = require("../models/founderModel");
const cloudinary = require("../config/cloudinary");

/* ================= CREATE / UPDATE FOUNDER (ADMIN) ================= */
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

    /* ================= UPDATE ================= */
    if (founder) {
      founder.name = name;
      founder.title = title;
      founder.bio = bio;
      founder.experienceYears = experienceYears;
      founder.studentsTrained = studentsTrained;
      founder.specialization = specialization;
      founder.teachingStyle = teachingStyle;

      // 🔁 IMAGE REPLACE LOGIC
      if (req.file) {
        // delete old image from cloudinary
        if (founder.image?.public_id) {
          await cloudinary.uploader.destroy(founder.image.public_id, {
            resource_type: "image",
          });
        }

        // save new image
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
    }

    /* ================= CREATE ================= */
    const imageData = req.file
      ? {
          public_id: req.file.filename,
          url: req.file.path,
        }
      : null;

    founder = await Founder.create({
      name,
      title,
      bio,
      experienceYears,
      studentsTrained,
      specialization,
      teachingStyle,
      image: imageData,
    });

    return res.status(201).json({
      success: true,
      message: "Founder created successfully",
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

/* ================= GET FOUNDER (PUBLIC) ================= */
exports.getFounder = async (req, res) => {
  try {
    const founder = await Founder.findOne({ isActive: true });

    if (!founder) {
      return res.status(404).json({ message: "Founder not found" });
    }

    res.json({
      success: true,
      founder,
    });
  } catch (error) {
    console.error("Get founder error:", error);
    res.status(500).json({ message: "Failed to fetch founder" });
  }
};
