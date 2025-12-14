// app/api/admin/blogs/[id]/route.js
import { connectDB } from "@/lib/db";
import Blog from "@/models/Blog";
import { withAuth } from "@/lib/authMiddleware"; // optional
import { removeFile } from "@/utils/removeFiles"; // optional

// Helper to extract id from params OR URL or query (diagnostic fallback)
function extractId(params, req) {
  if (params && params.id) return params.id;
  try {
    // try parse URL path
    const url = new URL(req.url);
    const parts = url.pathname.split("/").filter(Boolean);
    // e.g. parts = ['api','admin','blogs','6937...']
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
      console.log("[admin/blogs/[id].GET] Missing id - params:", params);
      return new Response(JSON.stringify({ status: false, message: "Missing id" }), { status: 400 });
    }
    const blog = await Blog.findById(id).lean();
    if (!blog) return new Response(JSON.stringify({ status: false, message: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ status: true, blog }), { status: 200 });
  } catch (err) {
    console.error("[admin/blogs/[id].GET] error:", err);
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
    console.log("[admin/blogs/[id].DELETE] incoming request:", req.method, req.url);
    console.log("[admin/blogs/[id].DELETE] params:", params);

    const id = extractId(params, req);

    if (!id) {
      console.log("[admin/blogs/[id].DELETE] -> no id found after fallback");
      return new Response(JSON.stringify({ status: false, message: "Missing id" }), { status: 400 });
    }

    // confirm we received the same id the client requested
    console.log("[admin/blogs/[id].DELETE] resolved id:", id);

    const blog = await Blog.findById(id);
    if (!blog) {
      console.log("[admin/blogs/[id].DELETE] blog not found for id:", id);
      return new Response(JSON.stringify({ status: false, message: "Blog not found" }), { status: 404 });
    }

    // OPTIONAL: remove files safely if removeFile util exists
    try {
      if (typeof removeFile === "function") {
        if (blog.img) removeFile(`public/images/blogs/${blog.img}`);
        if (blog.icon) removeFile(`public/images/blogs/icon/${blog.icon}`);
      }
    } catch (e) {
      console.warn("[admin/blogs/[id].DELETE] removeFile error (continuing):", e);
    }

    await Blog.deleteOne({ _id: id });

    console.log("[admin/blogs/[id].DELETE] deleted id:", id);
    return new Response(JSON.stringify({ status: true, message: "Blog deleted successfully" }), { status: 200 });
  } catch (err) {
    console.error("[admin/blogs/[id].DELETE] error:", err);
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
    const blog = await Blog.findById(id);
    if (!blog) return new Response(JSON.stringify({ status: false, message: "Not found" }), { status: 404 });

    const allowed = [
      "name", "slug", "icon", "img",
      "shortDescription", "description", "extraDescription",
      "metaTitle", "metaDescription", "metaKeywords", "isActive"
    ];
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(body, key)) blog[key] = body[key];
    }
    await blog.save();
    return new Response(JSON.stringify({ status: true, message: "Updated", blog }), { status: 200 });
  } catch (err) {
    console.error("[admin/blogs/[id].PUT] error:", err);
    return new Response(JSON.stringify({ status: false, message: "Server error" }), { status: 500 });
  }
}

// -------------------------------
// Exports
// -------------------------------
export const GET = typeof withAuth === "function" ? withAuth(getHandler, { requireAdmin: true }) : getHandler;
export const DELETE = typeof withAuth === "function" ? withAuth(deleteHandler, { requireAdmin: true }) : deleteHandler;
export const PUT = typeof withAuth === "function" ? withAuth(putHandler, { requireAdmin: true }) : putHandler;
