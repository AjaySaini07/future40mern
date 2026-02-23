const mongoose = require("mongoose");

const successStorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name too long"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      unique: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },

    story: {
      type: String,
      required: [true, "Success story is required"],
      minlength: [20, "Story must be at least 20 characters"],
      maxlength: [5000, "Story cannot exceed 5000 characters"],
      trim: true,
    },

    achievement: {
      type: String,
      required: [true, "Achievement is required"],
      minlength: [5, "Achievement must be at least 5 characters"],
      maxlength: [200, "Achievement too long"],
      trim: true,
    },

    photo: {
      url: {
        type: String,
        required: true,
      },
      public_id: {
        type: String,
        default: null,
      },
    },

    approved: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("successStoryModel", successStorySchema);
