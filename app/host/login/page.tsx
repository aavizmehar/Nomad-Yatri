"use client";
import AuthLayout from "@/app/components/AuthLayout";
export default function HostLogin() {
  return (
    <AuthLayout 
      title="Welcome Back, Host!"
      subtitle="Login to manage your programs"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Host Login</h2>

      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            placeholder="Enter email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
        >
          Login
        </button>
      </form>
    </AuthLayout>
  );
}
