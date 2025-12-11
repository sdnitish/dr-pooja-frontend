"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  const Logout = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      router.push("/login"); // redirect after logout
    } else {
      alert(data.message || "Logout failed");
    }
  };

  return (
    <div>
      <p className="text-center">Logout page</p>

      <button
        onClick={Logout}
        className="block px-6 py-1.5 cursor-pointer border mx-auto mt-1.5"
      >
        Logout
      </button>
    </div>
  );
}
