import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken } from "@/lib/jwt";

const COOKIE_NAME = "token";

export async function POST(req) {
  await connectDB();
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Missing credentials" }), { status: 400 });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 401 });
    }

    const payload = { id: user._id.toString(), role: user.role };
    const token = signToken(payload);

    // set secure httpOnly cookie
    const secure = process.env.NODE_ENV === "production";
    const cookie = `${COOKIE_NAME}=${token}; Path=/; HttpOnly; ${secure ? "Secure; " : ""}SameSite=Lax; Max-Age=${60 * 60 * 24 * 7}`;

    const safeUser = { name: user.name, email: user.email, role: user.role, id: user._id };

    return new Response(JSON.stringify({ message: "Logged in", user: safeUser }), {
      status: 200,
      headers: { "Set-Cookie": cookie, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}
