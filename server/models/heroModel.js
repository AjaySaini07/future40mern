const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    heading: { type: String, required: true },
    description: { type: String, required: true },

    yearsExperience: { type: Number, required: true },
    studentsTrained: { type: Number, required: true },
    successRate: { type: Number, required: true },

    backgroundImage: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hero", heroSchema);
