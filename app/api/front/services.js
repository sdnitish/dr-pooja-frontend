// app/api/front/services/route.js
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  await connectDB();
  try {
    const services = await Service.find({ isActive: true }).lean().sort({ createdAt: -1 });
    if (!services || services.length === 0) {
      return new Response(JSON.stringify({ status: false, message: "No Data Found." }), { status: 200 });
    }
    return new Response(JSON.stringify({ status: true, data: services }), { status: 200 });
  } catch (err) {
    console.error("[front/services.GET] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}
