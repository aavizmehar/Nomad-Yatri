"use client";

import { useState, useEffect, useContext, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
          body: JSON.stringify({ email, password }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || "Login failed");
      }

      const { user, accessToken } = data.data;
      login(accessToken, user.role);

      const redirectTo = data.data.redirectTo;
      router.push(redirectTo);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-gray-50 to-gray-100">
      {/* LEFT – INFO PANEL */}
      <div 
        className="hidden lg:flex flex-col justify-center px-16 py-12 text-white relative overflow-hidden"
        style={{ 
          background: "linear-gradient(135deg, #1a2627 0%, #2d4a4b 100%)"
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white opacity-5 rounded-full -ml-40 -mb-40"></div>
        
        <div className="relative z-10">
          <div className="mb-8">
            <div className="w-16 h-1 bg-gradient-to-r from-orange-400 to-orange-600 mb-6"></div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Welcome Back
              <span className="inline-block ml-3 animate-bounce">👋</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed max-w-md">
              Manage your volunteering journey or host experiences seamlessly. Secure, fast and built for meaningful connections.
            </p>
          </div>

          <div className="space-y-4 mt-12">
            {[
              { icon: "🔒", text: "Bank-grade security" },
              { icon: "⚡", text: "Lightning-fast dashboards" },
              { icon: "🌍", text: "Global community access" }
            ].map((item, i) => (
              <div 
                key={i}
                className="flex items-center space-x-3 text-gray-200 transform transition-transform hover:translate-x-2"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-base">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT – LOGIN FORM */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Card with glassmorphism effect */}
          <div className="bg-white/80 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-200/50">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 
                className="text-3xl font-bold mb-2"
                style={{ color: "#314e4d" }}
              >
                Sign In
              </h2>
              <p className="text-gray-500 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Error Alert */}
            {error && (
              <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 animate-shake">
                <div className="flex items-start">
                  <span className="text-red-500 text-lg mr-3">⚠️</span>
                  <p className="text-red-700 text-sm flex-1">{error}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={HandleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                    }}
                    className="w-full border border-gray-300 p-3.5 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉️
                  </span>
                </div>
              </div>

              {/* Role Selector */}
              {!searchParams.get("role") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I am a
                  </label>
                  <div className="relative">
                    <select
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        setError("");
                      }}
                      className="w-full border border-gray-300 p-3.5 pl-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all appearance-none bg-white cursor-pointer"
                    >
                      <option value="volunteer">Volunteer</option>
                      <option value="host">Host</option>
                    </select>
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      👤
                    </span>
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      ▼
                    </span>
                  </div>
                </div>
              )}

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full border border-gray-300 p-3.5 pl-11 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                    required
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔑
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-semibold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                style={{
                  background: loading
                    ? "#9ca3af"
                    : "linear-gradient(135deg, #396a6b 0%, #2d5455 100%)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  New to our platform?
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <Link
                href="/user/register"
                className="inline-flex items-center font-medium text-orange-600 hover:text-orange-700 transition-colors"
              >
                Create an account
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Protected by industry-standard encryption
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UserLoginClient;