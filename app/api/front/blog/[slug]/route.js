import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";

export async function GET(req, ctx) {
  await connectDB();
  try {
    const { slug } = ctx.params;
    const blog = await Blog.findOne({ isActive: true, slug }).lean();
    if (!blog) {
      return new Response(JSON.stringify({ status: false, message: "No Data Found." }), { status: 200 });
    }
    return new Response(JSON.stringify({ status: true, blog }), { status: 200 });
  } catch (err) {
    console.error("[front/blog.GET] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}
