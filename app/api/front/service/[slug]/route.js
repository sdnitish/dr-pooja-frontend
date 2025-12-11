// app/api/front/service/[slug]/route.js
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET(req, ctx) {
  await connectDB();
  try {
    const { slug } = ctx.params;
    const service = await Service.findOne({ isActive: true, slug }).lean();
    if (!service) {
      return new Response(JSON.stringify({ status: false, message: "No Data Found." }), { status: 200 });
    }
    return new Response(JSON.stringify({ status: true, service }), { status: 200 });
  } catch (err) {
    console.error("[front/service.GET] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}
