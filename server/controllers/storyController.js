const successStoryModel = require("../models/successStoryModel");
const cloudinary = require("../config/cloudinary");

// ------------------------------ SUBMIT STORY ------------------------------
exports.submitStory = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { story, rating, achievement } = req.body;

    const userName = req.user.FullName?.trim();
    const userEmail = req.user.Email?.toLowerCase();

    /* ---------------- VALIDATION ---------------- */

    if (!story?.trim() || !achievement?.trim()) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const numericRating = Number(rating);

    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    /* ---------------- CHECK DUPLICATE ---------------- */

    const existingStory = await successStoryModel.findOne({
      email: userEmail,
    });

    if (existingStory) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted a success story",
      });
    }

    /* ---------------- PHOTO LOGIC ---------------- */

    let photo;

    if (req.file) {
      photo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    } else {
      photo = {
        url: "https://avatar.iran.liara.run/public",
        public_id: null,
      };
    }

    /* ---------------- CREATE STORY ---------------- */

    const newStory = await successStoryModel.create({
      name: userName,
      email: userEmail,
      rating: numericRating,
      story: story.trim(),
      achievement: achievement.trim(),
      photo,
    });

    return res.status(201).json({
      success: true,
      message: "Your story submitted successfully.",
    });
  } catch (err) {
    console.error("Submit Story Error:", err);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting story",
    });
  }
};

// -------------- GET APPROVED STORIES (PAGINATION + SEARCH) ----------------
exports.getApprovedStories = async (req, res) => {
  try {
    // query params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 8;
    const search = req.query.search || "";

    const skip = (page - 1) * limit;

    // search condition
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { story: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // final filter
    const filter = {
      approved: true, // ✅ boolean
      ...searchQuery,
    };

    // total count (for pagination)
    const totalStories = await successStoryModel.countDocuments(filter);
    // console.log("totalStories --------->", totalStories);

    // paginated data
    const stories = await successStoryModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // console.log("stories --------->", stories);

    res.json({
      success: true,
      stories,
      pagination: {
        totalStories,
        totalPages: Math.ceil(totalStories / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// ------------------------------ UPDATE STORY ------------------------------
exports.updateStory = async (req, res) => {
  try {
    const { name, email, achievement, rating, story } = req.body;

    const loggedInEmail = req.user.Email.toLowerCase();

    /* -------------------- EMAIL CHANGE BLOCK -------------------- */
    if (email && email.toLowerCase() !== loggedInEmail) {
      return res.status(400).json({
        success: false,
        message: "You cannot change your registered email",
      });
    }

    /* -------------------- VALIDATION -------------------- */
    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!achievement?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Achievement is required",
      });
    }

    if (!story?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Story is required",
      });
    }

    const numericRating = Number(rating);

    if (!numericRating || numericRating < 1 || numericRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5",
      });
    }

    /* -------------------- FIND STORY -------------------- */
    const existingStory = await successStoryModel.findOne({
      email: loggedInEmail,
    });

    if (!existingStory) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    /* -------------------- UPDATE FIELDS -------------------- */
    existingStory.name = name.trim();
    existingStory.achievement = achievement.trim();
    existingStory.rating = numericRating;
    existingStory.story = story.trim();

    /* -------------------- PHOTO UPDATE -------------------- */
    if (req.file) {
      try {
        if (existingStory.photo?.public_id) {
          await cloudinary.uploader.destroy(existingStory.photo.public_id);
        }
      } catch (err) {
        console.warn("Cloudinary delete warning:", err.message);
      }

      existingStory.photo = {
        url: req.file.path,
        public_id: req.file.filename,
      };
    }

    /* -------------------- RESET APPROVAL -------------------- */
    existingStory.approved = false;

    await existingStory.save();

    return res.status(200).json({
      success: true,
      message: "Story updated and sent for review",
      updatedAt: existingStory.updatedAt,
    });
  } catch (error) {
    console.error("Update Story Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update story",
    });
  }
};

// ------------------------ 🔐 ADMIN: GET ALL STORY -------------------------
exports.getAllStories = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "all";

    const skip = (page - 1) * limit;

    // 🔹 Filter object
    let filter = {};

    // Status filter (approved / unapproved)
    if (status !== "all") {
      filter.approved = status === "approved";
    }

    // Search filter
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { story: { $regex: search, $options: "i" } },
      ];
    }

    // 🔹 Fetch data
    const stories = await successStoryModel
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // 🔹 Count for pagination
    const totalStories = await successStoryModel.countDocuments(filter);
    const totalPages = Math.ceil(totalStories / limit);

    res.status(200).json({
      success: true,
      stories,
      pagination: {
        totalStories,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stories",
      error: err.message,
    });
  }
};

// ------------------ 🔐 ADMIN: APPROVE / UNAPPROVE STORY -------------------
exports.approveStory = async (req, res) => {
  try {
    const { id } = req.params;
    const { approved } = req.body; // boolean

    if (typeof approved !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Approved value must be boolean",
      });
    }

    const story = await successStoryModel.findByIdAndUpdate(
      id,
      { approved },
      { new: true },
    );

    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    res.status(200).json({
      success: true,
      message: approved
        ? "Story approved successfully"
        : "Story unapproved successfully",
      story,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update story status",
      error: err.message,
    });
  }
};

// ------------------------- 🔐 ADMIN: DELETE STORY -------------------------
exports.deleteStory = async (req, res) => {
  try {
    const { id } = req.params;

    const story = await successStoryModel.findById(id);
    if (!story) {
      return res.status(404).json({
        success: false,
        message: "Story not found",
      });
    }

    /* 🔥 Delete image ONLY if uploaded to Cloudinary */
    if (story.photo?.public_id) {
      try {
        await cloudinary.uploader.destroy(story.photo.public_id);
      } catch (err) {
        console.error(
          "Cloudinary delete failed:",
          story.photo.public_id,
          err.message,
        );
        // ❗ Do NOT throw – story delete should still continue
      }
    }

    await story.deleteOne();

    res.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (err) {
    console.error("Delete Story Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete story",
    });
  }
};

// -------------------- 🔐 Admin: Get all pending stories -------------------
exports.getPendingStories = async (req, res) => {
  try {
    const stories = await successStoryModel.find({ status: "pending" }).sort({
      createdAt: -1,
    });
    res.json({ success: true, stories });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
