"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserLoginClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roleFromQuery = searchParams.get("role");
    if (roleFromQuery) setRole(roleFromQuery);
  }, [searchParams]);

  const HandleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Login failed");
      }

      localStorage.setItem("accessToken", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);
      localStorage.setItem("role", data.data.user.role);

      router.push("/host/addInfoPage");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* LEFT – INFO */}
      <div className="hidden lg:flex flex-col justify-center px-16 text-white" style={{ backgroundColor: "#1a2627" }}>
        <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome Back 👋</h1>
        <p className="text-lg mb-8 text-gray-300">
          Manage your volunteering journey or host experiences seamlessly. Secure, fast and built for meaningful connections.
        </p>
        <div className="space-y-4 text-gray-200">
          <p>✔ Secure authentication</p>
          <p>✔ Host & Volunteer dashboards</p>
          <p>✔ Community-driven experiences</p>
        </div>
      </div>

      {/* RIGHT – LOGIN FORM */}
      <div className="flex items-center justify-center bg-gray-50 px-4 mt-20">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl">
          <h2 className="text-3xl font-bold text-center mb-6" style={{ color: "#314e4d" }}>User Login</h2>

          {error && (
            <div className="mb-4 rounded-lg bg-red-100 border border-red-400 text-red-700 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: "#396a6b" }}
            />
          </div>

          {/* Role */}
          {!searchParams.get("role") && (
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Role</label>
              <select
                value={role}
                onChange={(e) => { setRole(e.target.value); setError(""); }}
                className="w-full border p-3 rounded-lg focus:outline-none"
                style={{ borderColor: "#396a6b" }}
              >
                <option value="volunteer">Volunteer</option>
                <option value="host">Host</option>
              </select>
            </div>
          )}

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-1 text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full border p-3 pr-12 rounded-lg focus:outline-none"
                style={{ borderColor: "#396a6b" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                style={{ color: "#6f3925" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={HandleLogin}
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white transition"
            style={{ backgroundColor: loading ? "#9ca3af" : "#396a6b" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don’t have an account?{" "}
            <Link href="/user/register" className="font-medium" style={{ color: "#cd7643" }}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginClient;
