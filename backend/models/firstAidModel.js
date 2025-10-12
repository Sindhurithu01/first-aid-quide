const mongoose = require("mongoose");

const firstAidSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  steps: [String],
  images: [String],
});

module.exports = mongoose.model("FirstAid", firstAidSchema);
