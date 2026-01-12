const mongoose = require("mongoose");

const querySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
      minlength: 10,
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["pending", "replied"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Query", querySchema);
