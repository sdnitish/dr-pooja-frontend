import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET() {
  await connectDB();
  try {
    const blogs = await Blog.find({ isActive: true }).lean().sort({ createdAt: -1 });
    if (!blogs || blogs.length === 0) {
      return new Response(JSON.stringify({ status: false, message: "No Data Found." }), { status: 200 });
    }
    return new Response(JSON.stringify({ status: true, data: blogs }), { status: 200 });
  } catch (err) {
    console.error("[front/blogs.GET] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}
