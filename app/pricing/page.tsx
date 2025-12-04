"use client";

import React from "react";

// --- SVG ICONS (for features) ---
const CheckIcon = ({ className = "" }) => (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
);
const XIcon = ({ className = "" }) => (
    <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
);
const StarIcon = ({ className = "" }) => (
    <svg className={`w-5 h-5 ${className}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l1.242 3.826 4.026.292c.969.07 1.35 1.258.647 1.904l-3.072 2.235 1.157 3.901c.277.935-.769 1.642-1.574 1.144L10 15.17l-3.418 2.518c-.805.593-1.851-.109-1.574-1.044l1.157-3.901L3.14 9.049c-.703-.646-.322-1.834.647-1.904l4.026-.292L9.049 2.927z"></path></svg>
);

// --- DATA STRUCTURE ---
const pricingPlans = [
    {
        name: "Free Explorer",
        price: "0",
        unit: "₹",
        tagline: "Essential access for basic exploration.",
        buttonText: "Start Exploring",
        isPopular: false,
        buttonClass: "text-gray-700 border-2 border-gray-300 hover:bg-gray-100",
        features: [
            "Explore programs",
            "View hosts",
            "1 application limit (lifetime)",
        ],
        excluded: [
            "Apply to 5 programs",
            "Instant chat unlock",
            "Priority host approval",
            "Community WhatsApp access",
            "20% event discount",
            "Verified profile tick",
        ]
    },
    {
        name: "Starter Pass",
        price: "499",
        unit: "₹",
        tagline: "Unlock applications and basic community access.",
        buttonText: "Buy for ₹499",
        isPopular: false,
        buttonClass: "bg-indigo-600 text-white hover:bg-indigo-700",
        features: [
            "Apply to 5 programs",
            "Basic profile visibility",
            "Chat unlock after host approval",
            "Volunteer certificate",
            "Community WhatsApp access",
            "10% event discount",
        ],
        excluded: [
            "Unlimited applications",
            "Priority host approval",
            "Access premium host listings",
            "1-on-1 travel guidance",
            "Verified profile tick",
            "20% event discount",
        ]
    },
    {
        name: "Pro Combo Pass",
        price: "999",
        unit: "₹",
        tagline: "Unlimited access & premium benefits.",
        buttonText: "Buy for ₹999",
        isPopular: true,
        buttonClass: "bg-emerald-600 text-white hover:bg-emerald-700",
        features: [
            "Unlimited applications",
            "Instant chat unlock",
            "Priority host approval",
            "Access premium host listings",
            "Creator Pass eligibility",
            "Free online workshop",
            "Digital nomad webinar",
            "1-on-1 travel guidance",
            "Featured traveler badge",
            "Verified profile tick",
            "20% event discount",
        ],
        excluded: [] // All features included
    }
];

// --- COMPONENTS ---

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

// Reusable Pricing Card Component
const PricingCard = ({ plan }) => {
    const isPopular = plan.isPopular;
    
    return (
        <div 
            className={`relative p-8 rounded-3xl shadow-2xl transition duration-300 h-full flex flex-col ${
                isPopular 
                    ? 'bg-gray-900 text-white border-4 border-emerald-500 transform scale-105' 
                    : 'bg-white text-gray-900 border border-gray-100'
            }`}
        >
            {/* Popular Badge */}
            {isPopular && (
                <div className="absolute top-0 right-0 transform translate-y-[-50%] translate-x-[20%] rotate-3 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                    <StarIcon className="w-4 h-4" /> MOST POPULAR
                </div>
            )}

            <h3 className={`text-3xl font-bold mb-2 ${isPopular ? 'text-emerald-400' : 'text-indigo-600'}`}>
                {plan.name}
            </h3>
            <p className={`text-base mb-4 ${isPopular ? 'text-gray-400' : 'text-gray-500'}`}>{plan.tagline}</p>

            <div className="flex items-end mb-8">
                <span className={`text-6xl font-extrabold ${isPopular ? 'text-white' : 'text-gray-900'}`}>{plan.unit}{plan.price}</span>
                {plan.price !== "0" && <span className={`text-xl font-medium mb-1 ml-2 ${isPopular ? 'text-gray-400' : 'text-gray-600'}`}>/ year</span>}
            </div>

            {/* Feature List */}
            <ul className="space-y-3 flex-grow mb-8">
                {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckIcon className={`flex-shrink-0 mr-3 ${isPopular ? 'text-emerald-400' : 'text-emerald-500'}`} />
                        <span className={`${isPopular ? 'text-gray-300' : 'text-gray-700'}`}>{feature}</span>
                    </li>
                ))}
                {plan.excluded.map((feature, index) => (
                    <li key={index} className="flex items-start opacity-50 line-through">
                        <XIcon className={`flex-shrink-0 mr-3 ${isPopular ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className={`${isPopular ? 'text-gray-500' : 'text-gray-400'}`}>{feature}</span>
                    </li>
                ))}
            </ul>

            {/* Button */}
            <CustomLink
                href="/checkout"
                className={`w-full flex justify-center py-3 px-4 rounded-xl text-lg font-bold transition shadow-lg mt-auto ${plan.buttonClass}`}
            >
                {plan.buttonText}
            </CustomLink>
        </div>
    );
};


export default function PricingPage() {
    return (
        <div className="pt-20 pb-16 bg-gray-50 min-h-screen font-inter">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-16">

                {/* 1. HERO SECTION */}
                <section className="text-center py-16 bg-white rounded-3xl shadow-2xl shadow-gray-100 border-b-4 border-indigo-600">
                    <p className="text-indigo-600 font-bold uppercase tracking-widest mb-3">MEMBERSHIP & PRICING</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Unlock Your Full Travel Potential
                    </h1>
                    <p className="max-w-4xl mx-auto text-xl sm:text-2xl font-light text-gray-600">
                        Choose the pass that best fits your travel style, from free exploration to unlimited community access and premium benefits.
                    </p>
                </section>

                {/* 2. PRICING CARDS GRID */}
                <section>
                    <div className="grid lg:grid-cols-3 gap-y-10 lg:gap-8 items-stretch">
                        
                        {/* Render Pricing Cards */}
                        {pricingPlans.map((plan, index) => (
                            <PricingCard key={index} plan={plan} />
                        ))}
                        
                    </div>
                </section>

                {/* 3. FAQ/TRUST SECTION (Placeholder) */}
                <section className="text-center py-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Questions? We Have Answers.</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        All passes come with a 30-day money-back guarantee. If you don't find a program you love, we'll refund your membership.
                    </p>
                    <CustomLink
                        href="/contact"
                        className="mt-4 inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition"
                    >
                        Contact Support for Details &rarr;
                    </CustomLink>
                </section>

            </div>
        </div>
    );
}