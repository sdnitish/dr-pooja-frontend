import fs from "fs";
import path from "path";

export function removeFile(relPath) {
  try {
    const p = path.isAbsolute(relPath) ? relPath : path.join(process.cwd(), relPath);
    if (fs.existsSync(p)) fs.unlinkSync(p);
  } catch (err) {
    console.error("removeFile error", err);
  }
}
