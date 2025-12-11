import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    icon: String,
    img: String,
    pdf: String,
    price: String,
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

// ❗ MUST export like this in Next.js (prevents re-compilation errors)
export default mongoose.models.Service || mongoose.model("Service", ServiceSchema);
