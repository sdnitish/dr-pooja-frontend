// /app/api/auth/register/route.js
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    const exists = await User.findOne({ email });
    if (exists) return new Response(JSON.stringify({ message: "Email already registered" }), { status: 409 });

    // Create user via constructor + save (ensures pre-save runs)
    const user = new User({ name, email, password, role });
    await user.save(); // <-- triggers pre('save') and hashes password

    const safeUser = { id: user._id, name: user.name, email: user.email, role: user.role };
    return new Response(JSON.stringify({ message: "User created", user: safeUser }), { status: 201 });
  } catch (err) {
    console.error("[register] error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
