const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, trim: true, unique: true },
  image: { type: String, trim: true },
  content: [{ type: String }],
  preview: { type: String, trim: true },
  author: { type: String, required: true, trim: true },
  status: {
    type: String,
    enum: ["published", "draft"],
    default: "draft",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Article", articleSchema);
