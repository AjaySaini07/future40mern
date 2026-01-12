const successStoryModel = require("../models/successStoryModel");
const studentModel = require("../models/studentModel");
const queryModel = require("../models/queryModel");

// ------------------------- Get Admin Stats - Dashboard -------------------------
exports.getAdminStats = async (req, res) => {
  try {
    /* 👥 Students */
    const totalStudents = await studentModel.countDocuments();

    /* ⭐ Success Stories */
    const pendingStories = await successStoryModel.countDocuments({
      // status: "pending",
      approved: false,
    });

    const approvedStories = await successStoryModel.countDocuments({
      approved: true,
    });

    /* 📩 Queries */
    const totalQueries = await queryModel.countDocuments();

    const repliedQueries = await queryModel.countDocuments({
      status: "replied",
    });

    const pendingQueries = await queryModel.countDocuments({
      status: { $ne: "replied" }, // pending / unread
    });

    /* 📅 Today start */
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newUsersToday = await studentModel.countDocuments({
      createdAt: { $gte: today },
    });

    res.json({
      success: true,
      stats: {
        totalStudents,

        /* Stories */
        pendingStories,
        approvedStories,

        /* Queries */
        totalQueries,
        repliedQueries,
        pendingQueries,

        /* Today */
        newUsersToday,
      },
    });
  } catch (err) {
    console.error("Admin Stats Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch admin stats",
    });
  }
};
