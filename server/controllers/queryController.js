const Query = require("../models/queryModel");
const { adminReplyMail } = require("../templates/emailTemplates");
const transporter = require("../utils/mailer");

// Submit Query (Public)
exports.submitQuery = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // 1️⃣ Save query
    await Query.create({ name, email, phone, message });

    // 2️⃣ Admin notification
    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // or ADMIN_EMAIL
      subject: "📩 New Contact Query – Future40",
      html: `
        <h3>New Query Received</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
      `,
    });

    // 3️⃣ User auto-reply
    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Thanks for contacting Future40",
      html: `
        <p>Hi ${name},</p>
        <p>Thanks for contacting <b>Future40</b>.</p>
        <p>We have received your query and our team will contact you shortly.</p>
        <br/>
        <p>Regards,<br/>Future40 Team</p>
      `,
    });

    res.status(201).json({
      success: true,
      message: "Query submitted successfully",
    });
  } catch (err) {
    console.error("Query Mail Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to submit query",
    });
  }
};

// 🔒 Admin – Get all queries (pagination + search + filter)
exports.getAllQueries = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const status = req.query.status || "all";

    const skip = (page - 1) * limit;

    /* 🔍 SEARCH */
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { message: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    /* 🏷 STATUS FILTER (SCHEMA BASED) */
    const statusQuery =
      status !== "all"
        ? { status } // pending | replied
        : {};

    /* 🧩 FINAL FILTER */
    const filter = {
      ...searchQuery,
      ...statusQuery,
    };

    /* 📊 TOTAL COUNT */
    const totalQueries = await Query.countDocuments(filter);

    /* 📄 PAGINATED DATA */
    const queries = await Query.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      queries,
      pagination: {
        totalQueries,
        totalPages: Math.ceil(totalQueries / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    console.error("Get Queries Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch queries",
    });
  }
};

// 🔒 Admin replies to query
exports.replyToQuery = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    if (!reply || !reply.trim()) {
      return res.status(400).json({
        success: false,
        message: "Reply is required",
      });
    }

    const query = await Query.findById(id);
    if (!query) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    // 🔒 Prevent double reply
    if (query.status === "replied") {
      return res.status(400).json({
        success: false,
        message: "Query already replied",
      });
    }

    // ✅ Update status
    query.reply = reply;
    query.status = "replied";
    query.repliedAt = new Date();

    await query.save();

    // 📧 Send reply mail
    await transporter.sendMail({
      from: `"Future40" <${process.env.GMAIL_USER}>`,
      to: query.email,
      ...adminReplyMail({
        name: query.name,
        reply,
      }),
    });

    res.json({
      success: true,
      message: "Reply sent successfully",
      query, // 👈 updated query
    });
  } catch (err) {
    console.error("Reply Query Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });
  }
};

// 🔒 Admin delete query
exports.deleteQuery = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedQuery = await Query.findByIdAndDelete(id);

    if (!deletedQuery) {
      return res.status(404).json({
        success: false,
        message: "Query not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Query deleted successfully",
    });
  } catch (err) {
    console.error("Delete Query Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete query",
    });
  }
};
