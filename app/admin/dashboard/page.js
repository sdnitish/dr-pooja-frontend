"use client";

import { useEffect, useState } from "react";
import { FiFileText, FiLayers, FiRefreshCw } from "react-icons/fi";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    serviceCount: 0,
    blogCount: 0,
  });

  async function loadStats() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();

      if (data.status) {
        setStats({
          serviceCount: data.serviceCount || 0,
          blogCount: data.blogCount || 0,
        });
      }
    } catch (err) {
      console.error("Dashboard error", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  return (
    <section className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-gray-500">Quick overview of your website activity</p>
        </div>
        <button
          onClick={loadStats}
          className="flex items-center gap-2 border px-3 py-2 rounded hover:bg-gray-100 transition"
        >
          <FiRefreshCw className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Services Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <FiLayers size={26} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Services</p>
            <p className="text-3xl font-semibold">
              {loading ? "…" : stats.serviceCount}
            </p>
          </div>
        </div>

        {/* Blogs Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <FiFileText size={26} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Blogs</p>
            <p className="text-3xl font-semibold">
              {loading ? "…" : stats.blogCount}
            </p>
          </div>
        </div>

        {/* Placeholder Card (extend later) */}
        <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
          <div className="p-4 bg-purple-100 text-purple-600 rounded-full">
            <FiFileText size={26} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Coming Soon</p>
            <p className="text-3xl font-semibold">—</p>
          </div>
        </div>
      </div>

      {/* Footer / Roadmap Section */}
      {/* <div className="mt-10 p-6 bg-gray-50 border rounded-xl">
        <h2 className="font-semibold mb-2">Next Updates</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Add graph for monthly service creation</li>
          <li>• Add blog analytics</li>
          <li>• Add user activity tracking</li>
        </ul>
      </div> */}
    </section>
  );
}
