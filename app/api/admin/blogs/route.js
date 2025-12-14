import { connectDB } from "@/lib/db";
import BlogImport from "@/models/Blog";
import slugify from "slugify";
import { withAuth } from "@/lib/authMiddleware";

// handle possible wrapped import shapes (Turbopack/ESM interop)
const Blog = BlogImport && BlogImport.default ? BlogImport.default : BlogImport;


async function getHandler(req) {
  await connectDB();
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).lean();
    if (!blogs || blogs.length === 0) {
      return new Response(
        JSON.stringify({ status: false, message: "No Data Found." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ status: true, data: blogs }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[admin/blogs.GET] error:", err);
    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * POST - create or update blog
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
        JSON.stringify({ status: false, message: "Name is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generate slug from name
    const generatedSlug = slugify(body.name, { lower: true, strict: true });

    // ---------------------------------------------------------
    // UPDATE BLOG
    // ---------------------------------------------------------
    if (body.id) {
      const existing = await Blog.findById(body.id);
      if (!existing) {
        return new Response(
          JSON.stringify({ status: false, message: "Blog not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      // Check if name is being updated
      if (body.name !== existing.name) {
        body.slug = generatedSlug;

        // slug uniqueness check
        const slugExists = await Blog.findOne({
          slug: body.slug,
          _id: { $ne: body.id },
        });
        if (slugExists) {
          return new Response(
            JSON.stringify({
              status: false,
              message: "Slug already exists, choose a different name",
            }),
            { status: 400 }
          );
        }

        // name uniqueness check
        const nameExists = await Blog.findOne({
          name: body.name,
          _id: { $ne: body.id },
        });
        if (nameExists) {
          return new Response(
            JSON.stringify({
              status: false,
              message: "Name already exists",
            }),
            { status: 400 }
          );
        }
      }

      await Blog.updateOne({ _id: body.id }, { $set: body });
      const updated = await Blog.findById(body.id).lean();

      return new Response(
        JSON.stringify({
          status: true,
          message: "Blog updated successfully",
          blog: updated,
        }),
        { status: 200 }
      );
    }

    // ---------------------------------------------------------
    // CREATE BLOG
    // ---------------------------------------------------------
    body.slug = generatedSlug;

    // name duplicate check
    const nameExists = await Blog.findOne({ name: body.name });
    if (nameExists) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Name already exists",
        }),
        { status: 400 }
      );
    }

    // slug duplicate check
    const slugExists = await Blog.findOne({ slug: body.slug });
    if (slugExists) {
      return new Response(
        JSON.stringify({
          status: false,
          message: "Slug already exists",
        }),
        { status: 400 }
      );
    }

    const newBlog = new Blog({
      name: body.name,
      slug: body.slug,
      icon: body.icon || "",
      img: body.img || "",
      shortDescription: body.shortDescription || "",
      description: body.description || "",
      extraDescription: body.extraDescription || "",
      metaTitle: body.metaTitle || "",
      metaDescription: body.metaDescription || "",
      metaKeywords: body.metaKeywords || "",
      isActive: typeof body.isActive === "boolean" ? body.isActive : true,
    });

    await newBlog.save();

    return new Response(
      JSON.stringify({
        status: true,
        message: "Blog created successfully",
        blog: newBlog,
      }),
      { status: 201 }
    );
  } catch (err) {
    console.error("[admin/blogs.POST] error:", err);

    return new Response(
      JSON.stringify({ status: false, message: "Server error" }),
      { status: 500 }
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
