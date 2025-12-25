"use client";

import { useState, FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../../context/AuthContext";

const UsersPage = () => {
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("volunteer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            password,
            role,
          }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || "Registration failed");
      }

      if (login) {
        login(data.data.user, data.data.accessToken);
      }

      router.push(data.data.redirectTo);

    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#314e4d]">
      <main className="max-w-7xl mx-auto px-6 lg:px-16 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="space-y-6">
          <h1 className="text-5xl lg:text-6xl font-bold leading-[1.1]">
            Join the <br />
            <span className="text-[#58a67d]">Nomad Yatri</span> Family
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
            Create an account to start volunteering or hosting meaningful
            experiences around the world. Whether you're a traveler or a host, your journey begins here.
          </p>

          <div className="space-y-4 pt-4">
            {[
              { icon: "🌍", text: "Global volunteering opportunities" },
              { icon: "🏠", text: "Trusted host community" },
              { icon: "🤝", text: "Build life-long connections" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                <span className="text-xl">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          <div className="relative inline-block mt-8 opacity-40">
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#ffcc00] rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 lg:p-10 transition-all">

            <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

            {error && (
              <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-700 uppercase">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/[^\x20-\x7E]/g, '');
                    setEmail(cleaned);
                    setError("");
                  }}
                  onBlur={(e) => setEmail(e.target.value.trim())}
                  className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none transition-all"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-700 uppercase">I want to be a:</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("volunteer")}
                    className={`py-3 rounded-lg border-2 transition-all font-semibold ${role === "volunteer"
                        ? "border-[#58a67d] bg-[#58a67d]/5 text-[#314e4d]"
                        : "border-gray-100 text-gray-400"
                      }`}
                  >
                    Volunteer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("host")}
                    className={`py-3 rounded-lg border-2 transition-all font-semibold ${role === "host"
                        ? "border-[#58a67d] bg-[#58a67d]/5 text-[#314e4d]"
                        : "border-gray-100 text-gray-400"
                      }`}
                  >
                    Host
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold tracking-wide text-gray-700 uppercase">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    className="w-full px-4 py-3.5 rounded-lg border border-gray-200 focus:border-[#58a67d] focus:ring-4 focus:ring-[#58a67d]/10 outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#58a67d] hover:text-[#314e4d]"
                  >
                    {showPassword ? "HIDE" : "SHOW"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#58a67d] hover:bg-[#498b68] text-white font-bold py-4 rounded-lg transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account →"
                )}
              </button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase text-gray-400">
                <span className="bg-white px-4">OR</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/google?role=${role}`;
              }}
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
                Already have an account?{" "}
                <Link href="/user/login" className="text-[#ffcc00] font-bold border-b-2 border-[#ffcc00] hover:text-[#e6b800] transition-colors">
                  Log in here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;