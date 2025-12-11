"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });


/**
 * Admin Settings Page
 * - fetches /api/website/settings (GET)
 * - allows file selection for logo & favicon
 * - uploads files to /api/website/upload (if changed)
 * - PUT to /api/website/settings to update
 */

export default function AdminSettingsPage() {
    const editor = useRef(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [websiteInfo, setWebsiteInfo] = useState(null);

    // form state (initialize from websiteInfo)
    const [form, setForm] = useState({
        name: "",
        tagLine: "",
        footerText: "",
        aboutCompany: "",
        googleMap: "",
        primaryEmail: "",
        secondaryEmail: "",
        thirdEmail: "",
        fourthEmail: "",
        primaryPhone: "",
        secondaryPhone: "",
        thirdPhone: "",
        fourthPhone: "",
        primaryAddress: "",
        secondaryAddress: "",
        thirdAddress: "",
        fourthAddress: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        pinterest: "",
        youtube: "",
        tumbler: "",
        whatsapp: "",
        // filenames stored in DB
        logo: "",
        favicon: "",
    });

    // local selected files (File objects) & previews
    const [logoFile, setLogoFile] = useState(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [faviconFile, setFaviconFile] = useState(null);
    const [faviconPreview, setFaviconPreview] = useState("");

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        if (logoFile) {
            const url = URL.createObjectURL(logoFile);
            setLogoPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setLogoPreview("");
        }
    }, [logoFile]);

    useEffect(() => {
        if (faviconFile) {
            const url = URL.createObjectURL(faviconFile);
            setFaviconPreview(url);
            return () => URL.revokeObjectURL(url);
        } else {
            setFaviconPreview("");
        }
    }, [faviconFile]);

    async function fetchSettings() {
        setLoading(true);
        try {
            const res = await fetch("/api/website/settings");
            const data = await res.json();
            const info = data?.websiteInfo || null;
            setWebsiteInfo(info);

            if (info) {
                setForm((f) => ({
                    ...f,
                    name: info.name || "",
                    tagLine: info.tagLine || "",
                    footerText: info.footerText || "",
                    aboutCompany: info.aboutCompany || "",
                    googleMap: info.googleMap || "",
                    primaryEmail: info.primaryEmail || "",
                    secondaryEmail: info.secondaryEmail || "",
                    thirdEmail: info.thirdEmail || "",
                    fourthEmail: info.fourthEmail || "",
                    primaryPhone: info.primaryPhone || "",
                    secondaryPhone: info.secondaryPhone || "",
                    thirdPhone: info.thirdPhone || "",
                    fourthPhone: info.fourthPhone || "",
                    primaryAddress: info.primaryAddress || "",
                    secondaryAddress: info.secondaryAddress || "",
                    thirdAddress: info.thirdAddress || "",
                    fourthAddress: info.fourthAddress || "",
                    facebook: info.facebook || "",
                    linkedin: info.linkedin || "",
                    twitter: info.twitter || "",
                    instagram: info.instagram || "",
                    pinterest: info.pinterest || "",
                    youtube: info.youtube || "",
                    tumbler: info.tumbler || "",
                    whatsapp: info.whatsapp || "",
                    logo: info.logo ? info.logo.split("/").pop() : "",
                    favicon: info.favicon ? info.favicon.split("/").pop() : "",
                }));
            }
        } catch (err) {
            console.error("fetchSettings err", err);
            setError("Failed to load settings");
        } finally {
            setLoading(false);
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((s) => ({ ...s, [name]: value }));
    }

    // upload single File to /api/website/upload -> returns { filename }
    async function uploadFile(file) {
        const fd = new FormData();
        fd.append("file", file);
        const res = await fetch("/api/website/upload", {
            method: "POST",
            body: fd,
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ message: "Upload failed" }));
            throw new Error(err.message || "Upload failed");
        }
        const data = await res.json();
        // returns { filename: "xxx.png", url: "...optional" }
        return data;
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSaving(true);
        setError("");

        try {
            // 1) upload files first (if any)
            let logoFilename = form.logo;
            let faviconFilename = form.favicon;

            if (logoFile) {
                const uploaded = await uploadFile(logoFile); // { filename, url }
                logoFilename = uploaded.filename;
            }

            if (faviconFile) {
                const uploaded = await uploadFile(faviconFile);
                faviconFilename = uploaded.filename;
            }

            // 2) prepare body and PUT to /api/website/settings (no id)
            const body = {
                ...form,
                logo: logoFilename,
                favicon: faviconFilename,
            };

            const res = await fetch("/api/website/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || "Update failed");
            }

            // success - refresh and keep user on page
            await fetchSettings();
            toast.success(data.message || "Settings updated successfully!");
            // optional: router.refresh() if you want to refresh server components
        } catch (err) {
            console.error("save err", err);
            setError(err.message || "Save failed");
        } finally {
            setSaving(false);
        }
    }

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="mx-auto p-6">
            <h1 className="text-2xl font-semibold mb-4">Website Settings</h1>

            {error && <div className="mb-4 text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="block">
                        <span className="text-sm text-gray-600">Site Name</span>
                        <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>

                    <label className="block">
                        <span className="text-sm text-gray-600">Tagline / Hours</span>
                        <input name="tagLine" value={form.tagLine} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>


                    <label className="block">
                        <span className="text-sm text-gray-600">WhatsApp (number)</span>
                        <input name="whatsapp" value={form.whatsapp} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                </div>

                {/* Logo & Favicon */}
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <p className="text-sm text-gray-600 mb-2">Logo</p>
                        <div className="flex items-center gap-4">
                            <div className="w-36 h-20 bg-white border rounded flex items-center justify-center overflow-hidden">
                                {logoPreview ? (
                                    <img src={logoPreview} alt="logo preview" className="object-contain w-full h-full" />
                                ) : websiteInfo?.logo ? (
                                    <img src={websiteInfo.logo} alt="current logo" className="object-contain w-full h-full" />
                                ) : (
                                    <span className="text-xs text-gray-400">No logo</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    className="cursor-pointer border px-4 py-2 rounded"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] || null;
                                        setLogoFile(f);
                                        if (!f) setLogoPreview("");
                                    }}
                                />
                                <p className="text-xs text-gray-500 mt-1">Recommended: png/jpg — will be stored in public/images/website</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-600 mb-2">Favicon</p>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-white border rounded flex items-center justify-center overflow-hidden">
                                {faviconPreview ? (
                                    <img src={faviconPreview} alt="favicon preview" className="object-contain w-full h-full" />
                                ) : websiteInfo?.favicon ? (
                                    <img src={websiteInfo.favicon} alt="current favicon" className="object-contain w-full h-full" />
                                ) : (
                                    <span className="text-xs text-gray-400">No favicon</span>
                                )}
                            </div>
                            <div className="flex-1">
                                <input
                                    type="file"
                                    className="cursor-pointer border px-4 py-2 rounded"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const f = e.target.files?.[0] || null;
                                        setFaviconFile(f);
                                        if (!f) setFaviconPreview("");
                                    }}
                                />
                                <p className="text-xs text-gray-500 mt-1">Recommended: square small PNG</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contacts */}
                <div className="grid md:grid-cols-2 gap-4">
                    <label>
                        <span className="text-sm text-gray-600">Primary Email</span>
                        <input name="primaryEmail" value={form.primaryEmail} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                    <label>
                        <span className="text-sm text-gray-600">Primary Phone</span>
                        <input name="primaryPhone" value={form.primaryPhone} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                </div>

                {/* Addresses */}
                <div className="grid md:grid-cols-2 gap-4">
                    <label>
                        <span className="text-sm text-gray-600">Primary Address</span>
                        <input name="primaryAddress" value={form.primaryAddress} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>

                    <label>
                        <span className="text-sm text-gray-600">Secondary Address</span>
                        <input name="secondaryAddress" value={form.secondaryAddress} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                </div>

                {/* Social links */}
                <div className="grid md:grid-cols-2 gap-4">
                    <label>
                        <span className="text-sm text-gray-600">Facebook</span>
                        <input name="facebook" value={form.facebook} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                    <label>
                        <span className="text-sm text-gray-600">Instagram</span>
                        <input name="instagram" value={form.instagram} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                    <label>
                        <span className="text-sm text-gray-600">Twitter</span>
                        <input name="twitter" value={form.twitter} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                    <label>
                        <span className="text-sm text-gray-600">LinkedIn</span>
                        <input name="linkedin" value={form.linkedin} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                    <label>
                        <span className="text-sm text-gray-600">Youtube</span>
                        <input name="youtube" value={form.youtube} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                    <label>
                        <span className="text-sm text-gray-600">Pinterest</span>
                        <input name="pinterest" value={form.pinterest} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label>
                </div>



                {/* Jodit Editors */}
                <div className="col-span-2 block px-2 mb-4">
                    <label className="block mb-2 font-medium">About Company</label>
                    <JoditEditor
                        ref={editor}
                        value={form.aboutCompany}
                        onBlur={(newContent) =>
                            setForm((prev) => ({
                                ...prev,
                                aboutCompany: newContent,
                            }))
                        }
                    />
                </div>

                <label className="block md:col-span-2">
                    <span className="text-sm text-gray-600">Footer Text</span>
                    <textarea name="footerText" value={form.footerText} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2 h-20" />
                </label>

                {/* <label className="block">
                        <span className="text-sm text-gray-600">Google Map Embed / URL</span>
                        <input name="googleMap" value={form.googleMap} onChange={handleChange} className="mt-1 w-full border rounded px-3 py-2" />
                    </label> */}

                {/* submit */}
                <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        className="bg-sky-600 text-white cursor-pointer px-5 py-2 rounded disabled:opacity-60"
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Settings"}
                    </button>

                    <button
                        type="button"
                        className="px-4 py-2 cursor-pointer border rounded bg-white"
                        onClick={() => {
                            // reset selection
                            setLogoFile(null);
                            setFaviconFile(null);
                            setLogoPreview("");
                            setFaviconPreview("");
                            // reload from server
                            fetchSettings();
                        }}
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
