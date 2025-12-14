"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    FaTachometerAlt,
    FaFolderOpen,
    FaBlog,
    FaThLarge,
    FaUserShield,
    FaSignOutAlt,
    FaBars,
    FaChevronLeft,
} from "react-icons/fa";

export default function AdminShell({ user, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [logo, setLogo] = useState("/logo.png"); // default fallback
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        async function fetchLogo() {
            try {
                const res = await fetch("/api/website/settings");
                const data = await res.json();
                const info = data?.websiteInfo;

                if (info?.logo) {
                    // if DB stores full URL → use directly
                    if (info.logo.startsWith("http")) {
                        setLogo(info.logo);
                    } else {
                        // otherwise assume filename → build public URL
                        setLogo(`/images/website/${info.logo}`);
                    }
                }
            } catch (err) {
                console.error("Error loading logo:", err);
            }
        }

        fetchLogo();
    }, []);

    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) router.push("/login");
            else alert("Logout failed");
        } catch (err) {
            alert("Network error");
        }
    };

    const navItems = [
        { title: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
        { title: "Services", href: "/admin/services", icon: <FaFolderOpen /> },
        { title: "Blogs", href: "/admin/blogs", icon: <FaBlog /> },
        { title: "Settings", href: "/admin/settings", icon: <FaThLarge /> },
    ];

    return (
        <div className="h-screen flex bg-slate-50">

            {/* SIDEBAR */}
            <aside
                className={`bg-slate-200 border-r border-gray-300 transition-all duration-200 flex flex-col
                ${collapsed ? "w-20" : "w-64"}`}
            >

                {/* LOGO */}
                <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-300">
                    <Link href="/admin/dashboard" className="flex items-center gap-2 w-full">
                        <img
                            src={logo}
                            alt="Logo"
                            className={`h-11  transition-all duration-200 ${
                                collapsed ? "mx-auto" : ""
                            }`}
                        />
                    </Link>

                    <button
                        onClick={() => setCollapsed((s) => !s)}
                        className="p-2 rounded hover:bg-slate-100 text-gray-600"
                    >
                        {collapsed ? <FaBars /> : <FaChevronLeft />}
                    </button>
                </div>

                {/* NAVIGATION */}
                <nav className="flex-1 overflow-auto px-1 py-4">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                                        ${collapsed ? "justify-center" : ""}
                                        ${
                                            isActive
                                                ? "bg-sky-200 text-sky-700 font-semibold"
                                                : "text-gray-700 hover:bg-slate-100 hover:text-sky-700"
                                        }`}
                                    >
                                        <span className="text-lg">{item.icon}</span>
                                        {!collapsed && <span className="font-medium">{item.title}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* USER + LOGOUT */}
                <div className="px-3 py-4 border-t">
                    <div className={`flex items-center gap-3 ${collapsed ? "justify-center" : ""}`}>
                        <div className="h-10 w-10 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-semibold">
                            {user?.name
                                ? user.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .slice(0, 2)
                                      .join("")
                                : "AD"}
                        </div>

                        {!collapsed && (
                            <div className="flex-1">
                                <p className="text-sm font-medium">{user?.name || "Admin"}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        )}

                        {!collapsed && (
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        )}
                    </div>
                </div>
            </aside>

            {/* MAIN */}
            <div className="flex-1 flex flex-col">
                <header className="flex items-center justify-between px-6 py-3 border-b border-gray-300 bg-white">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setCollapsed((s) => !s)}
                            className="p-2 rounded-md hover:bg-slate-100 text-gray-600 md:hidden"
                        >
                            <FaBars />
                        </button>

                        <div className="hidden sm:flex flex-col">
                            <h2 className="text-lg font-semibold">Welcome back, {user?.name}</h2>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="hidden sm:block text-sm">{user?.email}</span>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded"
                        >
                            <FaSignOutAlt /> Sign out
                        </button>
                    </div>
                </header>

                <main className="p-6">
                    <div className="max-w-7xl mx-auto max-h-[calc(100vh-124px)] overflow-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
