// app/api/admin/services/[id]/route.js
import { connectDB } from "@/lib/db";
import Service from "@/models/Service";
import { withAuth } from "@/lib/authMiddleware"; // optional
import { removeFile } from "@/utils/removeFiles"; // optional

// Helper to extract id from params OR URL or query (diagnostic fallback)
function extractId(params, req) {
  if (params && params.id) return params.id;
  try {
    // try parse URL path
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    // e.g. parts = ['api','admin','services','6937...']
    const maybeId = parts[parts.length - 1];
    if (maybeId && /^[0-9a-fA-F]{6,}$/.test(maybeId)) return maybeId;
    // fallback to query param ?id=
    const searchId = url.searchParams.get("id");
    if (searchId) return searchId;
  } catch (e) {
    // ignore
  }
  return null;
}

// -------------------------------
// GET handler (kept for completeness)
// -------------------------------
async function getHandler(req, { params }) {
  await connectDB();
  try {
    const id = extractId(params, req);
    if (!id) {
      console.log("[admin/services/[id].GET] Missing id - params:", params);
      return new Response(JSON.stringify({ status: false, message: "Missing id" }), { status: 400 });
    }
    const service = await Service.findById(id).lean();
    if (!service) return new Response(JSON.stringify({ status: false, message: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ status: true, service }), { status: 200 });
  } catch (err) {
    console.error("[admin/services/[id].GET] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}

// -------------------------------
// DELETE handler (instrumented + robust)
// -------------------------------
async function deleteHandler(req, { params }) {
  await connectDB();

  try {
    // Debug logging: show incoming request method and url
    console.log("[admin/services/[id].DELETE] incoming request:", req.method, req.url);
    console.log("[admin/services/[id].DELETE] params:", params);

    const id = extractId(params, req);

    if (!id) {
      console.log("[admin/services/[id].DELETE] -> no id found after fallback");
      return new Response(JSON.stringify({ status: false, message: "Missing id" }), { status: 400 });
    }

    // confirm we received the same id the client requested
    console.log("[admin/services/[id].DELETE] resolved id:", id);

    const service = await Service.findById(id);
    if (!service) {
      console.log("[admin/services/[id].DELETE] service not found for id:", id);
      return new Response(JSON.stringify({ status: false, message: "Service not found" }), { status: 404 });
    }

    // OPTIONAL: remove files safely if removeFile util exists
    try {
      if (typeof removeFile === "function") {
        if (service.img) removeFile(`public/images/services/${service.img}`);
        if (service.icon) removeFile(`public/images/services/icon/${service.icon}`);
        if (service.pdf) removeFile(`public/images/services/pdf/${service.pdf}`);
      }
    } catch (e) {
      console.warn("[admin/services/[id].DELETE] removeFile error (continuing):", e);
    }

    await Service.deleteOne({ _id: id });

    console.log("[admin/services/[id].DELETE] deleted id:", id);
    return new Response(JSON.stringify({ status: true, message: "Service deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error("[admin/services/[id].DELETE] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}

// -------------------------------
// PUT handler (kept as-is)
// -------------------------------
async function putHandler(req, { params }) {
  await connectDB();
  try {
    const id = extractId(params, req);
    if (!id) return new Response(JSON.stringify({ status: false, message: "Missing id" }), { status: 400 });

    const body = await req.json();
    const service = await Service.findById(id);
    if (!service) return new Response(JSON.stringify({ status: false, message: "Not found" }), { status: 404 });

    const allowed = [
      "name", "slug", "icon", "img", "pdf", "price",
      "shortDescription", "description", "extraDescription",
      "metaTitle", "metaDescription", "metaKeywords", "isActive"
    ];
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, key)) service[key] = body[key];
    }
    await service.save();
    return new Response(JSON.stringify({ status: true, message: "Updated", service }), { status: 200 });
  } catch (err) {
    console.error("[admin/services/[id].PUT] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}

// -------------------------------
// Exports
// -------------------------------
export const GET = typeof withAuth === "function" ? withAuth(getHandler, { requireAdmin: true }) : getHandler;
export const DELETE = typeof withAuth === "function" ? withAuth(deleteHandler, { requireAdmin: true }) : deleteHandler;
export const PUT = typeof withAuth === "function" ? withAuth(putHandler, { requireAdmin: true }) : putHandler;
