import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import Blog from "@/models/Blog";
import { withAuth } from "@/lib/authMiddleware";

async function dashboardHandler() {
  await connectDB();
  try {
    const serviceCount = await Service.countDocuments();
    const blogCount = await Blog.countDocuments();

    return new Response(
      JSON.stringify({
        status: true,
        serviceCount,
        blogCount,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[admin/dashboard.GET] error:", err);
    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500 }
    );
  }
}

// Ensure fresh data on every request
export const dynamic = "force-dynamic";

// Protected GET endpoint
export const GET = withAuth(dashboardHandler);
