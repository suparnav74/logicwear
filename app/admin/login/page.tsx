"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-2xl w-96">

        {/* Header */}
        <div className="text-center mb-7">
          <Image src="/logo.png" alt="Logic Wear Logo" width={110} height={80} className="mx-auto mb-3" />
          {/* <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-xl mb-3">
            <span className="text-white text-xl">⚙️</span>
          </div> */}
          <h1 className="text-2xl font-bold text-gray-800">Admin Login</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to your dashboard</p>
        </div>

        {/* Error */}
        {error && (
          <p className="bg-red-50 border border-red-200 text-red-500 text-sm px-4 py-2.5 rounded-lg mb-5">
            ⚠️ {error}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Email</label>
          <input
            type="email" placeholder="admin@example.com" value={email}
            onChange={(e) => setEmail(e.target.value)} required
            className="w-full border border-gray-300 p-2.5 rounded-lg text-black text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700 block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"} placeholder="Enter password" value={password}
              onChange={(e) => setPassword(e.target.value)} required
              className="w-full border border-gray-300 p-2.5 pr-10 rounded-lg text-black text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition">
          Sign In
        </button>

      </form>
    </div>
  );
}