// app/api/admin/services/route.js
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import slugify from "slugify";
import { withAuth } from "@/lib/authMiddleware"; // optional — ensure this path exists or remove this import

// -------------------------------
// Internal handlers (avoid naming collisions with exported GET/POST)
// -------------------------------

async function getHandler(req) {
  await connectDB();
  try {
    const services = await Service.find().sort({ createdAt: -1 }).lean();
    if (!services || services.length === 0) {
      return new Response(
        JSON.stringify({ status: false, message: "No Data Found." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ status: true, data: services }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[admin/services.GET] error:", err);
    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * POST - create or update service
 * Expect JSON body:
 * { id?: string, name, slug?, icon, img, pdf, price, shortDescription, description,
 *   extraDescription, metaTitle, metaDescription, metaKeywords, isActive }
 *
 * File uploads should be handled separately by /api/website/upload and
 * filenames (or urls) passed here in the body.
 */
async function postHandler(req) {
  await connectDB();
  try {
    const body = await req.json();
    if (!body || !body.name) {
      return new Response(
        JSON.stringify({ status: false, message: "name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // prepare slug
    body.slug = (body.slug && body.slug.trim()) || slugify(body.name || "", { lower: true, strict: true });

    // UPDATE
    if (body.id) {
      const existing = await Service.findById(body.id);
      if (!existing) {
        return new Response(
          JSON.stringify({ status: false, message: "Service not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      // update fields (you can refine which fields are allowed)
      await Service.updateOne({ _id: body.id }, { $set: body });
      const service = await Service.findById(body.id).lean();

      return new Response(
        JSON.stringify({ status: true, message: "Service updated successfully", service }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // CREATE
    const newService = new Service({
      name: body.name,
      slug: body.slug,
      icon: body.icon || "",
      img: body.img || "",
      pdf: body.pdf || "",
      price: body.price || "",
      shortDescription: body.shortDescription || "",
      description: body.description || "",
      extraDescription: body.extraDescription || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      metaKeywords: body.metaKeywords || "",
      isActive: typeof body.isActive === "boolean" ? body.isActive : true,
    });

    await newService.save();
    const service = newService.toObject();

    return new Response(
      JSON.stringify({ status: true, message: "Service created successfully", service }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[admin/services.POST] error:", err);
    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// -------------------------------
// Exports (wrap with withAuth if available)
// -------------------------------

// If you want these routes protected, ensure withAuth is implemented.
// withAuth(fn, options) should return a handler function compatible with Next App Router.

export const GET =
  typeof withAuth === "function"
    ? withAuth(getHandler, { requireAdmin: true, allowReadOnly: true })
    : getHandler;

export const POST =
  typeof withAuth === "function"
    ? withAuth(postHandler, { requireAdmin: true })
    : postHandler;
