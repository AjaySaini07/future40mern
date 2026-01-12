const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true, // Spoken English Coach
    },

    bio: {
      type: String,
      required: true,
    },

    experienceYears: {
      type: Number,
      required: true,
      min: 0,
    },

    studentsTrained: {
      type: Number,
      required: true,
      min: 0,
    },

    specialization: {
      type: String,
      required: true,
    },

    teachingStyle: {
      type: String,
      required: true,
    },

    image: {
      public_id: String,
      url: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Founder", founderSchema);
