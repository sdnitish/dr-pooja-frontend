import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET() {
  await connectDB();
  try {
    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    if (!services || services.length === 0) {
      return new Response(
        JSON.stringify({ status: false, message: "No Data Found." }),
        { status: 200 }
      );
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.BASE_URL ||
      "";

    // attach frontend image paths
    const data = services.map((service) => ({
      ...service,
      img: service.img
        ? `${baseUrl}images/services/${service.img}`
        : "",
      icon: service.icon
        ? `${baseUrl}images/services_icon/${service.icon}`
        : "",
    }));

    return new Response(
      JSON.stringify({ status: true, data }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[front/services.GET] error:", err);
    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
