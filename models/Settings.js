import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    tagLine: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    footerText: { type: String, default: "" },
    aboutCompany: { type: String, default: "" },
    googleMap: { type: String, default: "" },

    primaryEmail: { type: String, default: "" },
    secondaryEmail: { type: String, default: "" },
    thirdEmail: { type: String, default: "" },
    fourthEmail: { type: String, default: "" },

    primaryPhone: { type: String, default: "" },
    secondaryPhone: { type: String, default: "" },
    thirdPhone: { type: String, default: "" },
    fourthPhone: { type: String, default: "" },

    primaryAddress: { type: String, default: "" },
    secondaryAddress: { type: String, default: "" },
    thirdAddress: { type: String, default: "" },
    fourthAddress: { type: String, default: "" },

    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    twitter: { type: String, default: "" },
    instagram: { type: String, default: "" },
    pinterest: { type: String, default: "" },
    youtube: { type: String, default: "" },
    tumbler: { type: String, default: "" },
    whatsapp: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema);
