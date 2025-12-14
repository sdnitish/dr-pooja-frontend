"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import slugifyLib from "slugify";

// dynamic import for Jodit (client-only)
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

/**
 * Admin Blogs Page
 * - list blogs
 * - add / edit / delete / toggle
 * - uploads files via /api/upload?folder=...
 *
 * Drop this file at: app/admin/blogs/page.jsx
 */

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // form state
  const emptyForm = {
    id: null,
    name: "",
    slug: "",
    icon: "",
    img: "",
    shortDescription: "",
    description: "",
    extraDescription: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    isActive: true,
  };

  const [form, setForm] = useState(emptyForm);
  const [openForm, setOpenForm] = useState(false); // show/hide form
  const [formSaving, setFormSaving] = useState(false);

  // file picks (File objects) for upload
  const [iconFile, setIconFile] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  // previews (object URLs or public urls)
  const [iconPreview, setIconPreview] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const joditRef = useRef(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // cleanup object URLs on unmount
    return () => {
      if (iconPreview && iconPreview.startsWith("blob:")) URL.revokeObjectURL(iconPreview);
      if (imgPreview && imgPreview.startsWith("blob:")) URL.revokeObjectURL(imgPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchBlogs() {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/blogs");
      const data = await res.json();
      if (res.ok && data?.data) {
        setBlogs(data.data);
      } else {
        setBlogs([]);
      }
    } catch (err) {
      console.error("fetchBlogs", err);
      toast.error("Failed to load blogs");
    } finally {
      setFetching(false);
    }
  }

  // common upload helper -> { filename, url, folder }
  // folder should match keys in your server ALLOWED mapping (e.g. blogs, blogs_icon)
  async function uploadFile(file, folder = "blogs") {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);

    const res = await fetch(`/api/upload?folder=${encodeURIComponent(folder)}`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Upload failed" }));
      throw new Error(err.message || "Upload failed");
    }
    return res.json(); // { filename, url, folder }
  }

  // helper: build public URL from stored value (filename or full path)
  function buildPublicUrl(storedValue, folder) {
    if (!storedValue) return "";
    // if it's already a full URL or absolute path, return as-is
    if (/^(https?:)?\/\//i.test(storedValue) || storedValue.startsWith("/")) return storedValue;
    // otherwise assume filename and build /images/<folder>/<filename>
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      return `${origin}/images/${folder}/${storedValue}`;
    } catch {
      return `/images/${folder}/${storedValue}`;
    }
  }

  // open create form
  function openCreate() {
    setForm(emptyForm);
    setIconFile(null);
    setImgFile(null);
    // clear previews (if blob URLs, revoke them)
    if (iconPreview && iconPreview.startsWith("blob:")) URL.revokeObjectURL(iconPreview);
    if (imgPreview && imgPreview.startsWith("blob:")) URL.revokeObjectURL(imgPreview);
    setIconPreview("");
    setImgPreview("");
    setOpenForm(true);
  }

  // open edit form
  async function openEdit(svc) {
    setForm({
      id: svc._id,
      name: svc.name || "",
      slug: svc.slug || "",
      icon: svc.icon || "",
      img: svc.img || "",
      shortDescription: svc.shortDescription || "",
      description: svc.description || "",
      extraDescription: svc.extraDescription || "",
      metaTitle: svc.metaTitle || "",
      metaDescription: svc.metaDescription || "",
      metaKeywords: svc.metaKeywords || "",
      isActive: typeof svc.isActive === "boolean" ? svc.isActive : true,
    });
    setIconFile(null);
    setImgFile(null);

    // set previews from existing stored filenames or urls
    // icon may be in blogs_icon, main image in blogs
    const iconUrl = buildPublicUrl(svc.icon, "blogs_icon");
    const imgUrl = buildPublicUrl(svc.img, "blogs");

    // revoke previous blob urls if any
    if (iconPreview && iconPreview.startsWith("blob:")) URL.revokeObjectURL(iconPreview);
    if (imgPreview && imgPreview.startsWith("blob:")) URL.revokeObjectURL(imgPreview);

    setIconPreview(iconUrl || "");
    setImgPreview(imgUrl || "");

    setOpenForm(true);
  }

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;
    const v = type === "checkbox" ? checked : value;
    setForm((s) => ({ ...s, [name]: v }));
  }

  // auto-generate slug from name
  function genSlugFromName() {
    if (!form.name) return;
    const s = slugifyLib(form.name, { lower: true, strict: true });
    setForm((f) => ({ ...f, slug: s }));
  }

  // file change handlers: set file object and preview
  function onIconChange(file) {
    // revoke old blob preview if any
    if (iconPreview && iconPreview.startsWith("blob:")) URL.revokeObjectURL(iconPreview);
    setIconFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setIconPreview(url);
    } else {
      // fallback to existing stored if available
      const url = buildPublicUrl(form.icon, "blogs_icon");
      setIconPreview(url || "");
    }
  }

  function onImgChange(file) {
    if (imgPreview && imgPreview.startsWith("blob:")) URL.revokeObjectURL(imgPreview);
    setImgFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setImgPreview(url);
    } else {
      const url = buildPublicUrl(form.img, "blogs");
      setImgPreview(url || "");
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setFormSaving(true);

    try {
      // 1) upload files if selected
      let iconFilename = form.icon;
      let imgFilename = form.img;

      if (iconFile) {
        // store icon in blogs_icon folder (adjust to your server mapping if different)
        const up = await uploadFile(iconFile, "blogs_icon");
        iconFilename = up.filename || iconFilename;
      }
      if (imgFile) {
        // main image -> blogs folder
        const up = await uploadFile(imgFile, "blogs");
        imgFilename = up.filename || imgFilename;
      }

      // 2) prepare body
      const body = {
        name: form.name,
        slug: form.slug || slugifyLib(form.name || "", { lower: true, strict: true }),
        icon: iconFilename,
        img: imgFilename,
        shortDescription: form.shortDescription,
        description: form.description,
        extraDescription: form.extraDescription,
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        metaKeywords: form.metaKeywords,
        isActive: !!form.isActive,
      };

      // if editing -> include id
      if (form.id) body.id = form.id;

      const res = await fetch("/api/admin/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");

      toast.success(data.message || (form.id ? "Updated" : "Created"));
      setOpenForm(false);
      // revoke any blob previews we created (cleanup)
      if (iconPreview && iconPreview.startsWith("blob:")) URL.revokeObjectURL(iconPreview);
      if (imgPreview && imgPreview.startsWith("blob:")) URL.revokeObjectURL(imgPreview);
      setIconPreview("");
      setImgPreview("");
      await fetchBlogs();
    } catch (err) {
      console.error("save blog", err);
      toast.error(err.message || "Save failed");
    } finally {
      setFormSaving(false);
    }
  }

  // delete
  async function handleDelete(id) {
    if (!confirm("Delete this blog?")) return;
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success(data.message || "Deleted");
      await fetchBlogs();
    } catch (err) {
      console.error("delete", err);
      toast.error(err.message || "Delete failed");
    }
  }

  // toggle active state
  async function toggleActive(svc) {
    try {
      const res = await fetch(`/api/admin/blogs/${svc._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !svc.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      toast.success(data.message || "Updated");
      await fetchBlogs();
    } catch (err) {
      console.error("toggleActive", err);
      toast.error(err.message || "Toggle failed");
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Blogs (Admin)</h1>
        <div className="flex items-center gap-3">
          <button onClick={openCreate} className="px-4 py-2 bg-sky-600 text-white rounded cursor-pointer">Create Blog</button>
          <button onClick={fetchBlogs} className="px-3 py-2 border rounded cursor-pointer">{fetching ? "Refreshing..." : "Refresh"}</button>
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">No blogs found</td></tr>
            ) : blogs.map((s) => {
              const imgUrl = buildPublicUrl(s.img, "blogs");
              return (
                <tr key={s._id} className="border-t">
                  <td className="p-3">
                    {imgUrl ? (
                      <img src={imgUrl} alt={s.name} className="w-20 h-12 object-cover rounded" />
                    ) : (
                      <div className="w-20 h-12 bg-gray-100 flex items-center justify-center text-xs text-gray-500 rounded">No image</div>
                    )}
                  </td>
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.slug}</td>
                  <td className="p-3">
                    <button onClick={() => toggleActive(s)} className={`px-2 py-1 rounded text-white ${s.isActive ? "bg-green-600" : "bg-gray-500"}`}>
                      {s.isActive ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="p-3">{new Date(s.createdAt).toLocaleString()}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openEdit(s)} className="px-2 py-1 border rounded cursor-pointer">Edit</button>
                    <button onClick={() => handleDelete(s._id)} className="px-2 py-1 border cursor-pointer rounded text-red-600">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Form drawer/modal (simple) */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenForm(false)} />
          <div className="relative bg-white w-full max-w-[1200px] rounded shadow-lg p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{form.id ? "Edit Blog" : "Create Blog"}</h2>
              <button onClick={() => setOpenForm(false)} className="px-2 py-1 border rounded">Close</button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 max-h-[75vh] overflow-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-gray-600">Name</span>
                  <input name="name" value={form.name} onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                </label>

                <label className="block">
                  <span className="text-xs text-gray-600">Slug</span>
                  <div className="flex gap-2">
                    <input name="slug" value={form.slug} onChange={(e) => setForm(prev => ({ ...prev, slug: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                    <button type="button" onClick={genSlugFromName} className="px-3 py-2 border rounded">Gen</button>
                  </div>
                </label>

                <label className="block">
                  <span className="text-xs text-gray-600">Short Description</span>
                  <input name="shortDescription" value={form.shortDescription} onChange={(e) => setForm(prev => ({ ...prev, shortDescription: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                </label>
              </div>

              {/* description (Jodit) */}
              <div>
                <label className="block">
                  <span className="text-xs text-gray-600">Description</span>
                  <div className="mt-1 border rounded p-2">
                    <JoditEditor
                      ref={joditRef}
                      value={form.description}
                      config={{ height: 200, toolbarSticky: false }}
                      onBlur={(newContent) => setForm(prev => ({ ...prev, description: newContent }))}
                      onChange={() => {
                        try {
                          const inst = joditRef.current;
                          if (inst && inst.editor) {
                            setForm(prev => ({ ...prev, description: inst.editor.value }));
                          }
                        } catch {}
                      }}
                    />
                  </div>
                </label>
              </div>

              <div>
                <label className="block">
                  <span className="text-xs text-gray-600">Extra Description</span>
                  <div className="mt-1 border rounded p-2">
                    <JoditEditor
                      ref={null}
                      value={form.extraDescription}
                      config={{ height: 160, toolbarSticky: false }}
                      onBlur={(newContent) => setForm(prev => ({ ...prev, extraDescription: newContent }))}
                    />
                  </div>
                </label>
              </div>

              {/* file uploads */}
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <span className="text-xs text-gray-600">Icon (image)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onIconChange(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  {/* preview */}
                  <div className="mt-2">
                    {iconPreview ? (
                      <img src={iconPreview} alt="icon preview" className="w-24 h-12 object-contain rounded border" />
                    ) : (
                      <div className="w-24 h-12 bg-gray-50 flex items-center justify-center text-xs text-gray-500 rounded border">No icon</div>
                    )}
                  </div>
                  {/* removed storage path helper text per request */}
                </div>

                <div>
                  <span className="text-xs text-gray-600">Main Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onImgChange(e.target.files?.[0] || null)}
                    className="mt-1"
                  />
                  <div className="mt-2">
                    {imgPreview ? (
                      <img src={imgPreview} alt="image preview" className="w-40 h-24 object-cover rounded border" />
                    ) : (
                      <div className="w-40 h-24 bg-gray-50 flex items-center justify-center text-xs text-gray-500 rounded border">No image</div>
                    )}
                  </div>
                </div>

              </div>

              {/* meta & active */}
              <div className="grid gap-3">
                <input name="metaTitle" placeholder="Meta title" value={form.metaTitle} onChange={(e) => setForm(prev => ({ ...prev, metaTitle: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                <textarea name="metaDescription" placeholder="Meta description" value={form.metaDescription} onChange={(e) => setForm(prev => ({ ...prev, metaDescription: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                <textarea name="metaKeywords" placeholder="Meta keywords" value={form.metaKeywords} onChange={(e) => setForm(prev => ({ ...prev, metaKeywords: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
              </div>

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))} />
                  <span className="text-sm">Active</span>
                </label>

                <div className="ml-auto flex gap-2">
                  <button type="button" onClick={() => { setOpenForm(false); }} className="px-3 py-2 border rounded cursor-pointer">Cancel</button>
                  <button type="submit" disabled={formSaving} className="px-4 py-2 bg-sky-600 text-white rounded cursor-pointer">{formSaving ? "Saving..." : (form.id ? "Update" : "Create")}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
