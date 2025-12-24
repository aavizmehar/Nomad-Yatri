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

  return (
    // Inherits global font family from your layout
    <div className="min-h-screen bg-white text-[#314e4d]">
      
      {/* Container to match your website's max-width */}
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SECTION: Narrative */}
        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1]">
            Welcome to <br />
              <span className="text-[#58a67d]">Nomad Yatri</span> 
          </h1>
          
          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            We envision a world where hearts unite and hands reach out to uplift communities in need. 
            Our vision is to create a global family of compassionate individuals.
          </p>

          {/* Illustration with Brand Yellow Background Accent */}
          <div className="relative inline-block mt-8">
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ffcc00] rounded-full opacity-20 blur-3xl"></div>
            <img 
              src="/featuredimgs/ecoprojects.webp" 
              alt="Volunteer Illustration" 
              className="relative z-10 w-full max-w-sm h-auto"
            />
          </div>
        </div>

        {/* RIGHT SECTION: Login Card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[440px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 lg:p-12 transition-all hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)]">
            
            <h2 className="text-3xl font-bold text-center mb-10">Login</h2>

            {error && (
              <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={HandleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-700 uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-700 uppercase">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#58a67d]"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button - Using your Brand Green */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#58a67d] hover:bg-[#498b68] text-white font-bold py-4 rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? "Signing in..." : "Login →"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest text-gray-400"><span className="bg-white px-4">OR</span></div>
            </div>

            {/* Google Login - Styled like your secondary buttons */}
            <button className="w-full border-2 border-gray-100 py-3.5 rounded-lg flex items-center justify-center gap-3 hover:bg-gray-50 hover:border-gray-200 transition-all font-medium text-gray-600">
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Continue with Google
            </button>

            {/* Bottom Links - Using your Brand Yellow for emphasis */}
            <div className="mt-10 text-center space-y-4">
              <Link href="/forgot-password" className="block text-sm font-medium text-gray-400 hover:text-[#314e4d] transition-colors">
                Forgot Password?
              </Link>
              <div className="pt-2">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/user/register" className="text-[#ffcc00] font-bold border-b-2 border-[#ffcc00] hover:text-[#e6b800] transition-colors">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserLoginClient;