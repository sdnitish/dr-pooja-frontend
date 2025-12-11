// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

// IMPORTANT: use a normal function() so `this` is the document
UserSchema.pre("save", async function () {
  // if password not modified, skip
  if (!this.isModified("password")) return;

  // dynamic import of bcryptjs (works with ESM in Next)
  const bcrypt = await import("bcryptjs");
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// compare password
UserSchema.methods.comparePassword = async function (enteredPassword) {
  const bcrypt = await import("bcryptjs");
  return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.models.User || mongoose.model("User", UserSchema);
