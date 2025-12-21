import { connectDB } from "@/lib/db";
import Service from "@/models/Service";

export async function GET(req, ctx) {
  await connectDB();
  try {
    const { slug } = ctx.params;

    const service = await Service.findOne({
      isActive: true,
      slug,
    }).lean();

    if (!service) {
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
    const data = {
      ...service,
      img: service.img
        ? `${baseUrl}/images/services/${service.img}`
        : "",
      icon: service.icon
        ? `${baseUrl}/images/services_icon/${service.icon}`
        : "",
      pdf: service.pdf
        ? `${baseUrl}/images/services_pdf/${service.pdf}`
        : "",
    };

    return new Response(
      JSON.stringify({ status: true, service: data }),
      { status: 200 }
    );
  } catch (err) {
    console.error("[front/service.GET] error:", err);
    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500 }
    );
  }
}
