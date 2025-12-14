// app/api/upload/route.js
export const runtime = "nodejs";

import { IncomingForm } from "formidable";
import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";

const ALLOWED = {
  website: { diskSubpath: "public/images/website", publicPath: "images/website" },
  services: { diskSubpath: "public/images/services", publicPath: "images/services" },
  testimonials: { diskSubpath: "public/images/testimonials", publicPath: "images/testimonials" },
  blogs: { diskSubpath: "public/images/blogs", publicPath: "images/blogs" },
  // add other folders as needed
};

function sanitizeKey(raw) {
  if (!raw) return "website";
  const key = String(raw).toLowerCase().replace(/[^a-z0-9_-]/g, "_");
  return ALLOWED[key] ? key : "website";
}

async function parseForm(req) {
  const form = new IncomingForm({ multiples: true });
  const ab = await req.arrayBuffer();
  const buffer = Buffer.from(ab);
  const nodeReq = new Readable();
  nodeReq.push(buffer);
  nodeReq.push(null);
  nodeReq.headers = Object.fromEntries(req.headers);
  nodeReq.method = req.method;

  return new Promise((resolve, reject) => {
    form.parse(nodeReq, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
}

export async function POST(req) {
  try {
    const { fields, files } = await parseForm(req);

    // determine folder: ?folder=services OR form field 'target' OR default website
    let folderKey = "website";
    try {
      const url = new URL(req.url);
      const q = url.searchParams.get("folder");
      if (q) folderKey = sanitizeKey(q);
      else if (fields?.target) folderKey = sanitizeKey(fields.target);
    } catch (_) {}

    const mapping = ALLOWED[folderKey];

    // pick first uploaded file (support single field or any)
    let fileObj = null;
    if (files && Object.keys(files).length) {
      const vals = Object.values(files);
      // first file may be array (multiples) or single
      const first = vals[0];
      fileObj = Array.isArray(first) ? first[0] : first;
    }
    if (!fileObj) {
      return new Response(JSON.stringify({ message: "No file uploaded" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }

    const tmpPath = fileObj.filepath || fileObj.file || fileObj.path;
    const originalName = fileObj.originalFilename || fileObj.name || "upload.bin";
    if (!tmpPath) return new Response(JSON.stringify({ message: "Temp path missing" }), { status: 500 });

    const outDir = path.join(process.cwd(), mapping.diskSubpath);
    await fs.mkdir(outDir, { recursive: true });

    const ext = path.extname(originalName) || "";
    const base = path.basename(originalName, ext).replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
    const safeName = `${base}-${Date.now()}${ext}`;
    const destPath = path.join(outDir, safeName);

    // move file
    const data = await fs.readFile(tmpPath);
    await fs.writeFile(destPath, data);
    try { await fs.unlink(tmpPath); } catch (_) {}

    const baseUrl = (process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
    const publicUrl = baseUrl ? `${baseUrl}/${mapping.publicPath}/${safeName}` : `/${mapping.publicPath}/${safeName}`;

    return new Response(JSON.stringify({ filename: safeName, url: publicUrl, folder: folderKey }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[api/upload] error:", err);
    return new Response(JSON.stringify({ message: err.message || "Upload failed" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
