// models/Blog.js
import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    icon: String,
    img: String,
    shortDescription: String,
    description: String,
    extraDescription: String,
    metaTitle: String,
    metaDescription: String,
    metaKeywords: String,
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// ensure we reuse existing compiled model to avoid OverwriteModelError in dev
const Blog = mongoose.models.Blog || mongoose.model("Blog", BlogSchema);

export default Blog;
