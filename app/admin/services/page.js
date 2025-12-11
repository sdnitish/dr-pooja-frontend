"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import slugifyLib from "slugify";

// dynamic import for Jodit (client-only)
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

// load Jodit CSS client-side
// if (typeof window !== "undefined") {
//   try {
//     require("jodit/build/jodit.min.css");
//   } catch (e) {}
// }

/**
 * Admin Services Page
 * - list services
 * - add / edit / delete / toggle
 * - uploads files via /api/website/upload
 *
 * Drop this file at: app/admin/services/page.jsx
 */

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  // form state
  const emptyForm = {
    id: null,
    name: "",
    slug: "",
    icon: "",
    img: "",
    pdf: "",
    price: "",
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
  const [pdfFile, setPdfFile] = useState(null);

  const joditRef = useRef(null);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setFetching(true);
    try {
      const res = await fetch("/api/admin/services");
      const data = await res.json();
      if (res.ok && data?.data) {
        setServices(data.data);
      } else {
        setServices([]);
      }
    } catch (err) {
      console.error("fetchServices", err);
      toast.error("Failed to load services");
    } finally {
      setFetching(false);
    }
  }

  // common upload helper -> { filename, url }
  async function uploadFile(file) {
    if (!file) return null;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/website/upload", { method: "POST", body: fd });
    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Upload failed" }));
      throw new Error(err.message || "Upload failed");
    }
    return res.json(); // { filename, url }
  }

  // open create form
  function openCreate() {
    setForm(emptyForm);
    setIconFile(null);
    setImgFile(null);
    setPdfFile(null);
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
      pdf: svc.pdf || "",
      price: svc.price || "",
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
    setPdfFile(null);
    setOpenForm(true);
    // Jodit content will load via value prop on the editor
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

  async function handleSave(e) {
    e.preventDefault();
    setFormSaving(true);

    try {
      // 1) upload files if selected
      let iconFilename = form.icon;
      let imgFilename = form.img;
      let pdfFilename = form.pdf;

      if (iconFile) {
        const up = await uploadFile(iconFile);
        iconFilename = up.filename;
      }
      if (imgFile) {
        const up = await uploadFile(imgFile);
        imgFilename = up.filename;
      }
      if (pdfFile) {
        const up = await uploadFile(pdfFile);
        pdfFilename = up.filename;
      }

      // 2) prepare body
      const body = {
        name: form.name,
        slug: form.slug || slugifyLib(form.name || "", { lower: true, strict: true }),
        icon: iconFilename,
        img: imgFilename,
        pdf: pdfFilename,
        price: form.price,
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

      const res = await fetch("/api/admin/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");

      toast.success(data.message || (form.id ? "Updated" : "Created"));
      setOpenForm(false);
      await fetchServices();
    } catch (err) {
      console.error("save service", err);
      toast.error(err.message || "Save failed");
    } finally {
      setFormSaving(false);
    }
  }

  // delete
  async function handleDelete(id) {
    if (!confirm("Delete this service?")) return;
    try {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      toast.success(data.message || "Deleted");
      await fetchServices();
    } catch (err) {
      console.error("delete", err);
      toast.error(err.message || "Delete failed");
    }
  }

  // toggle active state
  async function toggleActive(svc) {
    try {
      const res = await fetch(`/api/admin/services/${svc._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !svc.isActive }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      toast.success(data.message || "Updated");
      await fetchServices();
    } catch (err) {
      console.error("toggleActive", err);
      toast.error(err.message || "Toggle failed");
    }
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Services (Admin)</h1>
        <div className="flex items-center gap-3">
          <button onClick={openCreate} className="px-4 py-2 bg-sky-600 text-white rounded">Create Service</button>
          <button onClick={fetchServices} className="px-3 py-2 border rounded">{fetching ? "Refreshing..." : "Refresh"}</button>
        </div>
      </div>

      {/* list */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Slug</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Active</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 ? (
              <tr><td colSpan={6} className="p-4 text-center text-gray-500">No services found</td></tr>
            ) : services.map((s) => (
              <tr key={s._id} className="border-t">
                <td className="p-3">{s.name}</td>
                <td className="p-3">{s.slug}</td>
                <td className="p-3">{s.price || "-"}</td>
                <td className="p-3">
                  <button onClick={() => toggleActive(s)} className={`px-2 py-1 rounded text-white ${s.isActive ? "bg-green-600" : "bg-gray-500"}`}>
                    {s.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-3">{new Date(s.createdAt).toLocaleString()}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEdit(s)} className="px-2 py-1 border rounded">Edit</button>
                  <button onClick={() => handleDelete(s._id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form drawer/modal (simple) */}
      {openForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpenForm(false)} />
          <div className="relative bg-white w-full max-w-3xl rounded shadow-lg p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{form.id ? "Edit Service" : "Create Service"}</h2>
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
                  <span className="text-xs text-gray-600">Price</span>
                  <input name="price" value={form.price} onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
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
                  <input type="file" accept="image/*" onChange={(e) => setIconFile(e.target.files?.[0] || null)} className="mt-1" />
                  {form.icon && !iconFile && <div className="text-xs text-slate-500 mt-1">Current: {form.icon}</div>}
                </div>

                <div>
                  <span className="text-xs text-gray-600">Main Image</span>
                  <input type="file" accept="image/*" onChange={(e) => setImgFile(e.target.files?.[0] || null)} className="mt-1" />
                  {form.img && !imgFile && <div className="text-xs text-slate-500 mt-1">Current: {form.img}</div>}
                </div>

                <div>
                  <span className="text-xs text-gray-600">PDF (brochure)</span>
                  <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className="mt-1" />
                  {form.pdf && !pdfFile && <div className="text-xs text-slate-500 mt-1">Current: {form.pdf}</div>}
                </div>
              </div>

              {/* meta & active */}
              <div className="grid md:grid-cols-3 gap-3">
                <input name="metaTitle" placeholder="Meta title" value={form.metaTitle} onChange={(e) => setForm(prev => ({ ...prev, metaTitle: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                <input name="metaDescription" placeholder="Meta description" value={form.metaDescription} onChange={(e) => setForm(prev => ({ ...prev, metaDescription: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
                <input name="metaKeywords" placeholder="Meta keywords" value={form.metaKeywords} onChange={(e) => setForm(prev => ({ ...prev, metaKeywords: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2" />
              </div>

              <div className="flex items-center gap-3">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" checked={!!form.isActive} onChange={(e) => setForm(prev => ({ ...prev, isActive: e.target.checked }))} />
                  <span className="text-sm">Active</span>
                </label>

                <div className="ml-auto flex gap-2">
                  <button type="button" onClick={() => { setOpenForm(false); }} className="px-3 py-2 border rounded">Cancel</button>
                  <button type="submit" disabled={formSaving} className="px-4 py-2 bg-sky-600 text-white rounded">{formSaving ? "Saving..." : (form.id ? "Update" : "Create")}</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
