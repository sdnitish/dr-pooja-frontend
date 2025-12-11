import multer from "multer";
import path from "path";
import fs from "fs";

/**
 * createStorage(folder)
 * - creates destination folder if missing
 * - uses safe filename: slugified base + timestamp + ext
 */
function createStorage(folder = "uploads") {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), folder);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/[^a-z0-9-_]/gi, "-");
      const finalName = `${base}-${Date.now()}${ext}`;
      cb(null, finalName);
    },
  });
}

/**
 * getUploader(options)
 * options:
 *  - folder: destination folder under project root (default 'public/uploads')
 *  - fields: array of { name, maxCount?, maxSizeKB?, mimeTypes? } or string field name or null for any
 *  - limits: multer limits object (optional)
 */
export function getUploader({ folder = "public/uploads", fields = undefined, limits = {} } = {}) {
  const storage = createStorage(folder);
  const upload = multer({
    storage,
    limits,
    fileFilter: (req, file, cb) => {
      // global accept by default; field-level mime filtering handled below
      cb(null, true);
    },
  });

  // helper to validate size and mime after upload (for fields config)
  async function validate(req, res, next, fieldsConfig = []) {
    try {
      if (!Array.isArray(fieldsConfig)) return next();

      for (const fcfg of fieldsConfig) {
        const files = req.files?.[fcfg.name];
        if (!files) continue;

        // mime check
        if (fcfg.mimeTypes && fcfg.mimeTypes.length) {
          for (const f of files) {
            if (!fcfg.mimeTypes.includes(f.mimetype)) {
              // cleanup file
              try { fs.unlinkSync(f.path); } catch (e) {}
              return res.status(400).json({ message: `${fcfg.name} file type not allowed` });
            }
          }
        }

        // size check (KB)
        if (fcfg.maxSizeKB) {
          for (const f of files) {
            const sizeKB = f.size / 1024;
            if (sizeKB > fcfg.maxSizeKB) {
              try { fs.unlinkSync(f.path); } catch (e) {}
              return res.status(400).json({ message: `${fcfg.name} must be ≤ ${fcfg.maxSizeKB} KB` });
            }
          }
        }
      }

      next();
    } catch (err) {
      next(err);
    }
  }

  // Return middleware depending on fields config
  if (Array.isArray(fields)) {
    // fields is array of { name, maxCount?, maxSizeKB?, mimeTypes? }
    const multerFields = fields.map((f) => ({ name: f.name, maxCount: f.maxCount || 1 }));
    return (req, res, next) => {
      upload.fields(multerFields)(req, res, (err) => {
        if (err) return next(err);
        return validate(req, res, next, fields);
      });
    };
  }

  if (typeof fields === "string") {
    return upload.single(fields);
  }

  // default: accept any (dangerous if not validated)
  return upload.any();
}
