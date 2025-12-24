"use client";

import Link from "next/link";

const plans = [
  {
    name: "Free Explorer",
    price: "₹0",
    description: "For curious travelers who want to explore before committing.",
    features: [
      "Browse all programs",
      "View host profiles",
      "1 lifetime application",
    ],
    cta: "Start Exploring",
    highlight: false,
  },
  {
    name: "Starter Pass",
    price: "₹499 / year",
    description: "Perfect for first-time volunteers and short stays.",
    features: [
      "Apply to 5 programs",
      "Basic profile visibility",
      "Chat after host approval",
      "Volunteer certificate",
      "Community access",
    ],
    cta: "Get Starter Pass",
    highlight: false,
  },
  {
    name: "Pro Combo Pass",
    price: "₹999 / year",
    description: "Unlimited access for serious travelers & digital nomads.",
    features: [
      "Unlimited applications",
      "Instant chat unlock",
      "Priority host approval",
      "Premium host listings",
      "1-on-1 travel guidance",
      "Workshops & webinars",
      "Verified traveler badge",
    ],
    cta: "Go Pro",
    highlight: true,
  },
];

export default function PricingPage() {
  return (
    <section className="min-h-screen bg-stone-50 py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-widest text-sm font-semibold text-amber-600 mb-3">
            Membership Plans
          </p>
          <h1 className="text-4xl md:text-5xl font-semibold text-stone-900 mb-4">
            Travel with purpose, not limits
          </h1>
          <p className="text-stone-600 text-lg">
            Choose a plan that matches how deeply you want to explore and contribute.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 flex flex-col bg-white ${
                plan.highlight
                  ? "border-amber-500 shadow-lg"
                  : "border-stone-200"
              }`}
            >
              {plan.highlight && (
                <span className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-4">
                  Recommended
                </span>
              )}

              <h3 className="text-2xl font-semibold text-stone-900 mb-2">
                {plan.name}
              </h3>

              <p className="text-stone-500 mb-6">
                {plan.description}
              </p>

              <div className="text-4xl font-semibold text-stone-900 mb-6">
                {plan.price}
              </div>

              <ul className="space-y-3 text-stone-600 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="text-amber-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/checkout"
                className={`mt-auto inline-flex justify-center items-center rounded-xl px-6 py-3 font-semibold transition ${
                  plan.highlight
                    ? "bg-amber-500 text-stone-900 hover:bg-amber-400"
                    : "border border-stone-300 text-stone-700 hover:bg-stone-100"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div className="text-center text-stone-500 text-sm">
          30-day money-back guarantee · Cancel anytime · No hidden charges
        </div>
      </div>
    </section>
  );
}
