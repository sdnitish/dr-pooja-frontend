// app/api/settings/route.js
import { connectDB } from "@/lib/db";
import Settings from "@/models/Settings";
import { withAuth } from "@/lib/authMiddleware";

/**
 * Helper: attach public URLs for logo and favicon
 */
function attachPublicUrls(doc) {
  if (!doc) return doc;
  const base = process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "";
  const clone = { ...doc };
  if (clone.logo) clone.logo = `${base.replace(/\/$/, "")}/images/website/${clone.logo}`;
  if (clone.favicon) clone.favicon = `${base.replace(/\/$/, "")}/images/website/${clone.favicon}`;
  return clone;
}

/**
 * GET - return the single settings document (create dummy if none)
 */
export async function GET() {
  await connectDB();

  try {
    let websiteInfo = await Settings.findOne().lean();

    if (!websiteInfo) {
      // create dummy data (adapted from your Express controller)
      websiteInfo = await Settings.create({
        name: "Dummy Website",
        tagLine: "This is a dummy tagline",
        logo: "logo.png",
        favicon: "favicon.png",
        googleMap: "",
        footerText:
          "Whether you're an experienced lorem ipsum dolor sit amet, consect to adipisicing elit. Ut enim ad minim veniam sed do magna aliqua. Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum iste amet officiis laboriosam adipisci? Ex ea perferendis sequi delectus fuga maxime?",
        primaryEmail: "dummy@example.com",
        secondaryEmail: "",
        thirdEmail: "",
        fourthEmail: "",
        primaryPhone: "+10000000001",
        secondaryPhone: "",
        thirdPhone: "",
        fourthPhone: "",
        primaryAddress: "123 Dummy Street",
        secondaryAddress: "",
        thirdAddress: "",
        fourthAddress: "",
        facebook: "https://facebook.com/dummy",
        linkedin: "https://linkedin.com/in/dummy",
        twitter: "https://twitter.com/dummy",
        instagram: "https://instagram.com/dummy",
        pinterest: "https://pinterest.com/dummy",
        youtube: "https://youtube.com/dummy",
        tumbler: "https://tumbler.com/dummy",
        whatsapp: "+10000000001",
      });
    }

    const publicSettings = attachPublicUrls(websiteInfo);
    return new Response(JSON.stringify({ websiteInfo: publicSettings }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[settings.GET] error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

/**
 * POST - create settings only if none exists
 * Expect JSON body with fields (logo & favicon should be filenames if uploaded separately).
 */
async function POST_HANDLER(req) {
  await connectDB();
  try {
    const exists = await Settings.findOne();
    if (exists) {
      return new Response(JSON.stringify({ message: "Website info already exists", websiteInfo: exists }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();

    // Basic: require logo & favicon filenames similar to your express controller
    // (If you handle uploads elsewhere, body.logo/body.favicon should contain the filenames)
    if (!body.logo || !body.favicon) {
      return new Response(JSON.stringify({ message: "logo and favicon filenames are required in body" }), { status: 400 });
    }

    const site = new Settings({
      ...body,
      logo: body.logo,
      favicon: body.favicon,
    });

    await site.save();

    return new Response(JSON.stringify({ message: "Website info created successfully", websiteInfo: site }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[settings.POST] error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

/**
 * PUT - update the single settings document (no id needed)
 * Accepts JSON body with fields to update. If logo/fav filenames are provided they'll replace current values.
 */
async function PUT_HANDLER(req) {
  await connectDB();
  try {
    const body = await req.json();
    const websiteInfo = await Settings.findOne();

    if (!websiteInfo) {
      return new Response(JSON.stringify({ message: "Website info doesn't exist, please create first." }), { status: 404 });
    }

    // If new logo/fav provided, optionally handle old file deletion.
    // Attempt dynamic import of removeFile helper (optional).
    let removeFile;
    try {
      const mod = await import("@/utils/removeFiles");
      removeFile = mod.removeFile;
    } catch (_) {
      removeFile = null;
    }

    if (body.logo && body.logo !== websiteInfo.logo) {
      if (websiteInfo.logo && typeof removeFile === "function") {
        // path expected relative to project root or public folder depending on your removeFile impl
        removeFile(`public/images/website/${websiteInfo.logo}`);
      }
      websiteInfo.logo = body.logo;
    }

    if (body.favicon && body.favicon !== websiteInfo.favicon) {
      if (websiteInfo.favicon && typeof removeFile === "function") {
        removeFile(`public/images/website/${websiteInfo.favicon}`);
      }
      websiteInfo.favicon = body.favicon;
    }

    // update other permitted fields
    const updatable = [
      "name", "tagLine", "footerText", "aboutCompany", "googleMap",
      "primaryEmail","secondaryEmail","thirdEmail","fourthEmail",
      "primaryPhone","secondaryPhone","thirdPhone","fourthPhone",
      "primaryAddress","secondaryAddress","thirdAddress","fourthAddress",
      "facebook","linkedin","twitter","instagram","pinterest","youtube","tumbler","whatsapp"
    ];

    updatable.forEach((k) => {
      if (body[k] !== undefined) {
        websiteInfo[k] = body[k];
      }
    });

    await websiteInfo.save();

    return new Response(JSON.stringify({ message: "Website info updated successfully", websiteInfo }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[settings.PUT] error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

/**
 * DELETE - remove the single settings document (and optionally clean files)
 */
async function DELETE_HANDLER() {
  await connectDB();
  try {
    const websiteInfo = await Settings.findOne();
    if (!websiteInfo) {
      return new Response(JSON.stringify({ message: "Website info not found" }), { status: 404 });
    }

    // attempt to remove logo/fav files if helper exists
    try {
      const mod = await import("@/utils/removeFiles");
      const removeFile = mod.removeFile;
      if (websiteInfo.logo) removeFile(`public/images/website/${websiteInfo.logo}`);
      if (websiteInfo.favicon) removeFile(`public/images/website/${websiteInfo.favicon}`);
    } catch (_) {
      // ignore if helper not available
    }

    await websiteInfo.deleteOne();
    return new Response(JSON.stringify({ message: "Website info deleted" }), { status: 200 });
  } catch (err) {
    console.error("[settings.DELETE] error:", err);
    return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
  }
}

/**
 * Export handlers. Protect mutating routes with withAuth(requireAdmin: true) if available.
 */
export const POST = typeof withAuth === "function" ? withAuth(POST_HANDLER, { requireAdmin: true }) : POST_HANDLER;
export const PUT = typeof withAuth === "function" ? withAuth(PUT_HANDLER, { requireAdmin: true }) : PUT_HANDLER;
export const DELETE = typeof withAuth === "function" ? withAuth(DELETE_HANDLER, { requireAdmin: true }) : DELETE_HANDLER;
