const Query = require("../models/queryModel");
const { adminReplyMail } = require("../templates/emailTemplates");
const sendEmail = require("../utils/mailer");

// ------------------------ Submit Query (Public) ------------------------
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
    // await sendEmail({
    //   to: process.env.GMAIL_USER, // or ADMIN_EMAIL
    //   subject: "📩 New Contact Query – Future40",
    //   html: `
    //     <h3>New Query Received</h3>
    //     <p><b>Name:</b> ${name}</p>
    //     <p><b>Email:</b> ${email}</p>
    //     <p><b>Message:</b><br/>${message}</p>
    //   `,
    // });
    await sendEmail({
      to: process.env.GMAIL_USER, // Admin email
      subject: "📩 New Contact Query | Future40",
      html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
      <h2 style="color:#0f172a;">New Contact Query Received</h2>

      <p>A new query has been submitted on the <b>Future40</b> website.</p>

      <table style="border-collapse:collapse; width:100%; max-width:500px;">
        <tr>
          <td style="padding:8px; border:1px solid #ddd;"><b>Name</b></td>
          <td style="padding:8px; border:1px solid #ddd;">${name}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd;"><b>Email</b></td>
          <td style="padding:8px; border:1px solid #ddd;">${email}</td>
        </tr>
        <tr>
          <td style="padding:8px; border:1px solid #ddd;"><b>Message</b></td>
          <td style="padding:8px; border:1px solid #ddd;">${message}</td>
        </tr>
      </table>

      <p style="margin-top:20px;">Please respond to the user as soon as possible.</p>

      <hr/>
      <p style="font-size:12px;color:#777;">Future40 Website Notification</p>
    </div>
  `,
    });

    // 3️⃣ User auto-reply
    // await sendEmail({
    //   to: email,
    //   subject: "Thanks for contacting Future40",
    //   html: `
    //     <p>Hi ${name},</p>
    //     <p>Thanks for contacting <b>Future40</b>.</p>
    //     <p>We have received your query and our team will contact you shortly.</p>
    //     <br/>
    //     <p>Regards,<br/>Future40 Team</p>
    //   `,
    // });
    await sendEmail({
      to: email,
      subject: "✅ We received your message | Future40",
      html: `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#333;">
      <h2 style="color:#0f172a;">Thank You for Contacting Future40</h2>

      <p>Hi <b>${name}</b>,</p>

      <p>
        Thank you for reaching out to <b>Future40 English Training Academy</b>.
        We have successfully received your message.
      </p>

      <p>
        Our team will review your query and get back to you shortly.
      </p>

      <p>If your matter is urgent, feel free to reply to this email.</p>

      <br/>

      <p>
        Best regards,<br/>
        <b>Future40 Team</b>
      </p>

      <hr/>
      <p style="font-size:12px;color:#777;">
        This is an automated message confirming that we received your inquiry.
      </p>
    </div>
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

// ------ 🔒 Admin – Get all queries (pagination + search + filter) ------
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

// ---------------------- 🔒 Admin replies to query ----------------------
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

    // 📧 Send reply mail to user
    await sendEmail({
      to: query.email,
      subject: "📩 Reply to your query | Future40",
      ...adminReplyMail({
        name: query.name,
        reply: reply,
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

// ------------------------ 🔒 Admin delete query ------------------------
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
