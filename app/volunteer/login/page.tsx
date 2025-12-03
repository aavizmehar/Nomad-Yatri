"use client";

import React from "react";

const VolLogin = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-semibold text-center mb-6">
          Host Login
        </h2>

        <form className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition"
          >
            Login
          </button>
        </form>
        {/* <Link href="/forgot-pass">Forgot Password?</Link> */}
        {/* <p>Dont have an account?<Link href="host/register"> Sign up here.</Link>
        </p>    */}
        </div>
    </section>
  );
};

export default VolLogin;
