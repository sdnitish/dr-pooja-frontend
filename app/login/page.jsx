"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);

  function validate() {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return false;
    }
    // basic email check
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    setError("");
    return true;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        // optionally persist remember preference (client-side) or server-side as needed
        if (remember) localStorage.setItem("remember", "1");
        router.push("/admin/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white px-4">
      <div className="max-w-4xl w-full flex gap-6 items-center justify-center">

        {/* login card */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          <div className="mb-6">
            <Link href="/"><img src="/logo.png" alt="Logo" className="h-12 mb-4 mx-auto block" /></Link>
            <h1 className="text-2xl font-semibold text-gray-800 text-center">Admin Sign in</h1>
            <p className="text-sm text-gray-500 mt-1 text-center">Use your admin account to access the dashboard</p>
          </div>

          <form onSubmit={submit} className="space-y-4">
            {/* Email */}
            <label className="block">
              <span className="text-sm text-gray-600">Email</span>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="admin@example.com"
                  aria-label="Email"
                  required
                />
              </div>
            </label>

            {/* Password */}
            <label className="block">
              <span className="text-sm text-gray-600">Password</span>
              <div className="mt-1 relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <FaLock />
                </span>
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-300"
                  placeholder="••••••••"
                  aria-label="Password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500"
                  aria-label={showPass ? "Hide password" : "Show password"}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>

            {/* remember + forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                Remember me
              </label>
              {/* <a href="/admin/forgot" className="text-sky-600 hover:underline">
                Forgot password?
              </a> */}
            </div>

            {/* error */}
            {error && <div className="text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>}

            {/* submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center cursor-pointer justify-center gap-3 bg-sky-600 hover:bg-sky-700 text-white py-2 rounded-lg font-semibold disabled:opacity-60"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <span>Not an admin?</span>{" "}
            <a href="/" className="text-sky-600 hover:underline">
              Go to homepage
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
