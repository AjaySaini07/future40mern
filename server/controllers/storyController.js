const successStoryModel = require("../models/successStoryModel");
const cloudinary = require("../config/cloudinary");

// ------------------------ SUBMIT STORY ------------------------
exports.submitStory = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    const { story, rating, achievement, gender } = req.body;

    if (!story || !rating || !achievement || !gender) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // User data from token
    const userName = req.user.FullName;
    const userEmail = req.user.Email;

    /* ------------------- PHOTO LOGIC ------------------- */
    let photo;

    if (req.file) {
      // Cloudinary gives secure URL
      photo = {
        url: req.file.path, // Cloudinary URL
        public_id: req.file.filename, // Cloudinary public_id
      };
    } else {
      photo = {
        url:
          gender.toLowerCase() === "male"
            ? "https://avatar.iran.liara.run/public/boy"
            : "https://avatar.iran.liara.run/public/girl",
        public_id: null, // 🔥 default avatar
      };
    }

    const existingStory = await successStoryModel.findOne({
      email: userEmail,
    });

    if (existingStory) {
      return res.status(400).json({
        message: "You have already submitted a success story",
      });
    }

    const newStory = await successStoryModel.create({
      name: userName,
      email: userEmail,
      gender,
      rating: Number(rating),
      story,
      achievement,
      photo,
    });

    res.status(201).json({
      success: true,
      message: "Your story submitted successfully.",
      story: newStory,
    });
  } catch (err) {
    console.error("Submit Story Error:", err);

    res.status(500).json({
      success: false,
      message: "Server error while submitting story",
    });
  }
};

// ------------------------ GET APPROVED STORIES (PAGINATION + SEARCH) ------------------------
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

// ------------------------ 🔐 ADMIN: GET ALL STORY ------------------------
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

// ---------------- 🔐 ADMIN: APPROVE / UNAPPROVE STORY ----------------
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
      { new: true }
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

//----------------------------- 🔐 ADMIN: DELETE STORY -----------------------------
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

    // 🔥 delete image ONLY if uploaded to cloudinary
    if (story.photo?.public_id) {
      await cloudinary.uploader.destroy(story.photo.public_id);
    }

    await successStoryModel.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Story deleted successfully",
    });
  } catch (err) {
    console.error("Delete Story Error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to delete story",
      error: err.message,
    });
  }
};

//-------------------- 🔐 Admin: Get all pending stories --------------------
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
