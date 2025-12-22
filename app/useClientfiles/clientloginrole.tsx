"use client";

import { useState, useEffect, useContext, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import GoogleLoginButtons from "../components/GoogleLoginButtons"
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const UserLoginClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useContext(AuthContext);

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

  const HandleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Login failed");
      }

      const { user, accessToken } = data.data;
      login(accessToken, user.role);

      const redirectTo = data.data.redirectTo || "/dashboard";
      router.push(redirectTo);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect directly to backend Google OAuth route
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex flex-col justify-center px-16 py-12 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a2627 0%, #2d4a4b 100%)" }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -ml-40 -mb-40"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6 leading-tight">Welcome Back 👋</h1>
          <p className="text-lg text-gray-300 leading-relaxed max-w-md">
            Manage your volunteering journey or host experiences seamlessly. Secure, fast and built for meaningful connections.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL – LOGIN FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-200/50">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2" style={{ color: "#314e4d" }}>Sign In</h2>
              <p className="text-gray-500 text-sm">Enter your credentials to access your account</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 p-4 animate-shake">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}

            {/* Email/Password Form */}
            <form onSubmit={HandleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {!searchParams.get("role") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                  <select
                    value={role}
                    onChange={(e) => { setRole(e.target.value); setError(""); }}
                    className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 cursor-pointer"
                  >
                    <option value="volunteer">Volunteer</option>
                    <option value="host">Host</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    placeholder="••••••"
                    required
                    className="w-full border border-gray-300 p-3.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-teal-600 hover:text-teal-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all"
                style={{ background: loading ? "#9ca3af" : "linear-gradient(135deg, #396a6b 0%, #2d5455 100%)" }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <GoogleLoginButtons />
            <div className="text-center mt-6">
              <Link href="/user/register" className="text-orange-600 hover:text-orange-700">
                Create an account →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
};

export default UserLoginClient;
