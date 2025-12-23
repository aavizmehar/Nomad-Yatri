"use client";

import { useState, useContext, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";

const AdminLogin = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
          role: "admin" // Hardcoded role for security
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Admin access denied");
      }

      const { user, accessToken } = data.data;

      // Double-check role from response for extra security
      if (user.role !== "admin") {
        throw new Error("Unauthorized: Not an administrator");
      }

      login(accessToken, user.role);
      router.push("/admin/dashboard"); // Force redirect to admin panel
      
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800">Admin Portal</h1>
            <p className="text-slate-500 mt-2">Secure access for system administrators</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-black focus:ring-2 focus:ring-slate-800 outline-none transition"
                placeholder="admin@platform.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-800 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition duration-200 shadow-lg disabled:bg-slate-400"
            >
              {loading ? "Authenticating..." : "Login to Dashboard"}
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button 
              onClick={() => router.push('/user/login')}
              className="text-sm text-slate-400 hover:text-slate-600 underline"
            >
              Back to User Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;