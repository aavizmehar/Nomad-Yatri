"use client";

import { useState, useEffect, useContext, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

const UserLoginClient = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      if (!res.ok) throw new Error(data.error || data.message || "Login failed");

      const { user, accessToken } = data.data;
      login(accessToken, user.role);

      router.push(data.data.redirectTo || "/dashboard");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-white text-[#314e4d]">
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT SECTION */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1]">
            Welcome to <br />
            <span className="text-[#58a67d]">Nomad Yatri</span>
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            We envision a world where hearts unite and hands reach out to uplift
            communities in need. Our vision is to create a global family of
            compassionate individuals.
          </p>

          <div className="relative inline-block mt-8">
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ffcc00] rounded-full opacity-20 blur-3xl"></div>
            <img
              src="/featuredimgs/ecoprojects.webp"
              alt="Volunteer Illustration"
              className="relative z-10 w-full max-w-sm h-auto"
            />
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 lg:p-12">

            <h2 className="text-3xl font-bold text-center mb-10">Login</h2>

            {error && (
              <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={HandleLogin} className="space-y-6">
              <div>
                <label className="text-sm font-bold uppercase text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-bold uppercase text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#58a67d] hover:bg-[#498b68] text-white font-bold py-4 rounded-lg transition-all"
              >
                {loading ? "Signing in..." : "Login →"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase text-gray-400">
                <span className="bg-white px-4">OR</span>
              </div>
            </div>

            {/* ✅ Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="w-full border-2 border-gray-100 py-3.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 font-medium text-gray-600"
            >
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-5 h-5"
                alt="Google"
              />
              Continue with Google
            </button>

            <div className="mt-10 text-center">
              <p className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  href="/user/register"
                  className="text-[#ffcc00] font-bold border-b-2 border-[#ffcc00]"
                >
                  Sign Up
                </Link>
              </p>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLoginClient;