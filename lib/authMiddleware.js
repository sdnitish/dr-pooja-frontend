import { verifyToken } from "./jwt";
import { connectDB } from "./db";
import User from "@/models/User";

/**
 * For API route handlers (app router route.js style).
 * Usage:
 *  const handler = async (req) => { ... };
 *  export const POST = withAuth(handler);
 *
 * It will attach req.user to the call.
 */
export function withAuth(handler, { requireAdmin = false } = {}) {
  return async (req, ...rest) => {
    // Read token from cookie header
    const cookieHeader = req.headers.get("cookie") || "";
    const match = cookieHeader.match(/(?:^|; )token=([^;]+)/);
    const token = match ? match[1] : null;

    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const payload = verifyToken(token);
    if (!payload) {
      return new Response(JSON.stringify({ message: "Invalid token" }), { status: 401 });
    }

    await connectDB();
    const user = await User.findById(payload.id).select("-password");
    if (!user) return new Response(JSON.stringify({ message: "User not found" }), { status: 401 });

    if (requireAdmin && user.role !== "admin") {
      return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    // attach user to req by creating new object (can't mutate Request)
    // so pass user into handler as second param if you want
    return handler(req, { user });
  };
}
