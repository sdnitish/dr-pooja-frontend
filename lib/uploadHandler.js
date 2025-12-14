// lib/uploadHandler.js
import { IncomingForm } from "formidable";
import fs from "fs/promises";
import path from "path";
import { Readable } from "stream";

const ALLOWED = {
    website: { diskSubpath: "public/images/website", publicPath: "images/website" },
    services: { diskSubpath: "public/images/services", publicPath: "images/services" },
    // add other folders...
};

function sanitizeFolderKey(raw) {
    if (!raw) return "website";
    const key = String(raw).toLowerCase().replace(/[^a-z0-9_-]/g, "_");
    return ALLOWED[key] ? key : "website";
}

function parseForm(req) {
    const form = new IncomingForm({ multiples: false });
    return new Promise((resolve, reject) => {
        req.arrayBuffer()
            .then(ab => {
                const buffer = Buffer.from(ab);
                const nodeReq = new Readable();
                nodeReq.push(buffer);
                nodeReq.push(null);
                nodeReq.headers = Object.fromEntries(req.headers);
                nodeReq.method = req.method;
                form.parse(nodeReq, (err, fields, files) => {
                    if (err) return reject(err);
                    resolve({ fields, files });
                });
            })
            .catch(reject);
    });
}

export async function handleUpload(req, forcedFolderKey = null) {
    const parsed = await parseForm(req);
    const { files, fields } = parsed;

    // determine folder key: forcedFolderKey takes precedence
    let folderKey = forcedFolderKey || "website";
    try {
        const url = new URL(req.url);
        const q = url.searchParams.get("folder");
        if (q) folderKey = sanitizeFolderKey(q);
        else if (fields && fields.target) folderKey = sanitizeFolderKey(fields.target);
    } catch (e) {
        // keep folderKey (may be forcedFolderKey or default)
    }

    folderKey = sanitizeFolderKey(folderKey);
    const mapping = ALLOWED[folderKey];

    // get first file
    let fileObj = null;
    if (files) {
        const vals = Object.values(files);
        if (vals.length) fileObj = Array.isArray(vals[0]) ? vals[0][0] : vals[0];
    }
    if (!fileObj) throw new Error("No file uploaded");

    const tmpPath = fileObj.filepath || fileObj.file || fileObj.path;
    const originalName = fileObj.originalFilename || fileObj.name || "upload.bin";
    if (!tmpPath) throw new Error("Uploaded temp path not found");

    const outDir = path.join(process.cwd(), mapping.diskSubpath);
    await fs.mkdir(outDir, { recursive: true });

    const ext = path.extname(originalName) || "";
    const base = path.basename(originalName, ext).replace(/[^a-z0-9-_]/gi, "-").toLowerCase();
    const safeName = `${base}-${Date.now()}${ext}`;
    const destPath = path.join(outDir, safeName);

    const data = await fs.readFile(tmpPath);
    await fs.writeFile(destPath, data);
    try { await fs.unlink(tmpPath); } catch (_) { }

    const baseUrl = (process.env.BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "").replace(/\/$/, "");
    const publicUrl = baseUrl ? `${baseUrl}/${mapping.publicPath}/${safeName}` : `/${mapping.publicPath}/${safeName}`;

    return { filename: safeName, url: publicUrl, folder: folderKey };
}
