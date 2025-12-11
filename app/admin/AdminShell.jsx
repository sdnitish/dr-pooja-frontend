"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
    FaTachometerAlt,
    FaThLarge,
    FaBlog,
    FaUserShield,
    FaSignOutAlt,
    FaBars,
    FaChevronLeft,
    FaFolderOpen,
} from "react-icons/fa";

export default function AdminShell({ user, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const pathname = usePathname();   // <-- GET CURRENT ROUTE

    const logout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.push("/login");
            } else {
                const data = await res.json();
                alert(data?.message || "Logout failed");
            }
        } catch (err) {
            alert("Network error during logout");
        }
    };

    const navItems = [
        { title: "Dashboard", href: "/admin/dashboard", icon: <FaTachometerAlt /> },
        { title: "Blogs", href: "/admin/blogs", icon: <FaBlog /> },
        { title: "Services", href: "/admin/services", icon: <FaFolderOpen /> },
        // { title: "Users", href: "/admin/users", icon: <FaUserShield /> },
        { title: "Settings", href: "/admin/settings", icon: <FaThLarge /> },
    ];

    return (
        <div className="h-screen flex bg-slate-50">
            {/* SIDEBAR */}
            <aside
                className={`bg-slate-200 border-r border-gray-300 transition-all duration-200 flex flex-col ${collapsed ? "w-20" : "w-64"
                    }`}>

                {/* LOGO */}
                <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-gray-300">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        <img src="/logo.png" alt="Logo" className={`h-11 ${collapsed ? "mx-auto" : ""}`} />
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
                            const isActive = pathname.startsWith(item.href); // ACTIVE CHECK
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors
                                            ${collapsed ? "justify-center" : ""}
                                            ${isActive
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
                        <div className="flex-0">
                            <div className="h-10 w-10 rounded-full bg-sky-200 flex items-center justify-center text-sky-700 font-semibold">
                                {user?.name? name: "Admin".split(" ").map(n => n[0]).slice(0, 2).join("")}
                            </div>
                        </div>

                        {!collapsed && (
                            <div className="flex-1">
                                <p className="text-sm font-medium">{user?.name ? user.name : "Admin"}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                        )}

                        <button
                            onClick={logout}
                            className={`flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 ${collapsed ? "hidden" : ""
                                }`}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
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
                            <h2 className="text-lg font-semibold text-gray-800">Welcome back, {user?.name}</h2>
                            <p className="text-xs text-gray-500">Administrator</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-3 text-gray-600">
                            <span className="text-sm">{user?.email}</span>
                        </div>

                        <button
                            onClick={logout}
                            className="flex cursor-pointer items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-1.5 rounded"
                        >
                            <FaSignOutAlt /> Sign out
                        </button>
                    </div>
                </header>

                {/* CONTENT */}
                <main className="p-6">
                    <div className="max-w-7xl mx-auto max-h-[calc(100vh-124px)] overflow-auto">{children}</div>
                </main>
            </div>
        </div>
    );
}
