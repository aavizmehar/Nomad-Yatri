"use client";

import React from "react";

interface CustomLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, className, children }) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export default function PricingPage() {
  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6">Pricing</h1>

      <p className="mb-6 text-gray-600">
        Choose a plan that fits your travel and work style.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Basic Plan</h2>
          <p className="text-gray-600 mb-4">$99 / week</p>
          <CustomLink href="/signup" className="text-indigo-600 font-semibold">
            Get Started
          </CustomLink>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Standard Plan</h2>
          <p className="text-gray-600 mb-4">$199 / week</p>
          <CustomLink href="/signup" className="text-indigo-600 font-semibold">
            Get Started
          </CustomLink>
        </div>

        <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
          <h2 className="text-2xl font-bold mb-2">Premium Plan</h2>
          <p className="text-gray-600 mb-4">$299 / week</p>
          <CustomLink href="/signup" className="text-indigo-600 font-semibold">
            Get Started
          </CustomLink>
        </div>
      </div>
    </div>
  );
}
