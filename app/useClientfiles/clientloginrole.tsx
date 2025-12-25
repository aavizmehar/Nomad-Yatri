"use client";

import { useState, useContext, FormEvent } from "react";
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
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

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
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    window.location.href = `${serverUrl}/auth/google`;
  };

  return (
    <div className="min-h-screen bg-white text-black selection:bg-yellow-100">
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
         <div className="space-y-8">
          <h1 className="text-6xl lg:text-8xl font-black leading-[0.8] tracking-tighter uppercase italic">
            WELCOME <br />
            <span className="text-[#58a67d] not-italic">BACK.</span>
          </h1>

          <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
            The road missed you. Log in to manage your volunteer experiences and connect with your host community.
          </p>

          <div className="relative inline-block mt-8">
            <div className="absolute -inset-4 bg-yellow-400 opacity-20 blur-3xl rounded-full"></div>
            <img
              src="/featuredImgs/ecoprojects.webp"
              alt="Volunteer Illustration"
              className="relative z-10 w-full max-w-sm h-64 object-cover rounded-[2rem] shadow-2xl rotate-2"
            />
          </div>
        </div>

        {/* RIGHT: LOGIN CARD */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-gray-100 p-8 lg:p-12">
            <h2 className="text-3xl font-black uppercase tracking-tighter mb-10 text-center">Login to Yatri</h2>

            {error && (
              <div className="mb-6 p-4 text-sm font-bold text-red-600 bg-red-50 rounded-2xl border border-red-100 italic">
                {error}
              </div>
            )}

            <form onSubmit={HandleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Password</label>
                    <Link href="/forgot-password" size="sm" className="text-[10px] font-black uppercase tracking-widest text-[#58a67d] hover:underline">Forgot?</Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#58a67d] hover:bg-black text-white font-black uppercase tracking-widest py-5 rounded-2xl transition-all shadow-xl shadow-emerald-100 active:scale-95"
              >
                {loading ? "Verifying..." : "Enter the Road →"}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">
                <span className="bg-white italic">OR</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full border-2 border-gray-100 py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors font-bold text-gray-600"
            >
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            <div className="mt-10 text-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                New to the Tribe?{" "}
                <Link href="/user/register" className="text-yellow-500 hover:text-black transition-colors ml-1">
                  Create Account
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