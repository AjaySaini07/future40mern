const successStoryModel = require("../models/successStoryModel");
const studentModel = require("../models/studentModel");
const cloudinary = require("../config/cloudinary");

exports.getAdminStats = async (req, res) => {
  try {
    const totalStudents = await studentModel.countDocuments();

    const pendingStories = await successStoryModel.countDocuments({
      status: "pending",
    });

    const approvedStories = await successStoryModel.countDocuments({
      status: "approved",
    });

    // Today’s date start
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newUsersToday = await studentModel.countDocuments({
      createdAt: { $gte: today },
    });

    // const newEnrollmentsToday = await Enrollment.countDocuments({
    //   createdAt: { $gte: today },
    // });

    res.json({
      success: true,
      stats: {
        totalStudents,
        // totalCourses,
        // totalEnrollments,
        pendingStories,
        approvedStories,
        newUsersToday,
        // newEnrollmentsToday,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// ------------------------ ADMIN: GET ALL ------------------------
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

// ---------------- ADMIN: APPROVE / UNAPPROVE STORY ----------------
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

//----------------------------- ADMIN: DELETE STORY -----------------------------
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

//-------------------- Admin: Get all pending stories --------------------
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

//--------------------- Admin: Approve / Reject story ---------------------
exports.updateStoryStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved / rejected

    const story = await successStoryModel.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({ success: true, story });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
