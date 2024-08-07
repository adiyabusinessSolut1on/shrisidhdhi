const mongoose = require("mongoose");

const BlogModel = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: { type: String, required: true, unique: true },
    image: {
      type: String,
    },
    category: { type: String },
    tags: [{ type: String }],
    content: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model("blog", BlogModel);
module.exports = Blog;
