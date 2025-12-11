// app/api/website/upload/route.js
export const runtime = "nodejs";

import { IncomingForm } from "formidable";
import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";

/**
 * Parse multipart/form-data from Next's Web Request by converting it
 * into a Node Readable stream so formidable can parse it.
 */
function parseForm(req) {
  const form = new IncomingForm({ multiples: false });

  return new Promise((resolve, reject) => {
    // Convert Web Request -> Buffer -> Node Readable stream
    req.arrayBuffer()
      .then((ab) => {
        const buffer = Buffer.from(ab);
        const nodeReq = new Readable();
        nodeReq.push(buffer);
        nodeReq.push(null);

        // Provide headers & method expected by formidable
        nodeReq.headers = Object.fromEntries(req.headers); // formidable reads headers
        nodeReq.method = req.method;

        form.parse(nodeReq, (err, fields, files) => {
          if (err) return reject(err);
          resolve({ fields, files });
        });
      })
      .catch(reject);
  });
}

export async function POST(req) {
  try {
    const parsed = await parseForm(req);
    const { files } = parsed;

    // pick first file regardless of field name (file, logo, favicon, etc.)
    let fileObj = null;
    if (files) {
      const vals = Object.values(files);
      if (vals.length) {
        fileObj = Array.isArray(vals[0]) ? vals[0][0] : vals[0];
      }
    }

    if (!fileObj) {
      return new Response(JSON.stringify({ message: "No file uploaded" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // formidable returns filepath / file path keys depending on version
    const tmpPath = fileObj.filepath || fileObj.file || fileObj.path;
    const originalName = fileObj.originalFilename || fileObj.name || "upload.bin";

    if (!tmpPath) {
      return new Response(JSON.stringify({ message: "Uploaded temp path not found" }), { status: 500 });
    }

    // ensure directory exists
    const outDir = path.join(process.cwd(), "public", "images", "website");
    await fs.mkdir(outDir, { recursive: true });

    const ext = path.extname(originalName) || "";
    const base = path.basename(originalName, ext).replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
    const safeName = `${base}-${Date.now()}${ext}`;
    const destPath = path.join(outDir, safeName);

    // move file: read tmp then write to dest
    const data = await fs.readFile(tmpPath);
    await fs.writeFile(destPath, data);

    // try to cleanup tmp file
    try { await fs.unlink(tmpPath); } catch (_) {}

    const baseUrl = (process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
    const url = baseUrl ? `${baseUrl}/images/website/${safeName}` : `/images/website/${safeName}`;

    return new Response(JSON.stringify({ filename: safeName, url }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[upload] error:", err);
    return new Response(JSON.stringify({ message: err.message || "Upload failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
