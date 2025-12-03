"use client";

import React from 'react';

// --- SELF-CONTAINED SVG ICONS (for categories) ---

const MapIcon = () => (
    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m11.314 0A10.03 10.03 0 0020 12c0-5.523-4.477-10-10-10S0 6.477 0 12c0 1.98.583 3.82 1.586 5.398l.685.685M9 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
);
const HeartHandsIcon = () => (
    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364l-1.42 1.42-1.42-1.42a4.5 4.5 0 00-6.364 0z"></path></svg>
);
const DeskIcon = () => (
    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13H3a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v4a2 2 0 01-2 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13v6m10-6v6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13h18"></path></svg>
);
const StarHouseIcon = () => (
    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-7 0H3m2 0h5M8 9h8m-8 4h8m-8 4h8m-5 3v-3a3 3 0 013-3h2a3 3 0 013 3v3m-3-4a1 1 0 100-2 1 1 0 000 2z"></path></svg>
);
const PeopleIcon = () => (
    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-5m3-8a3 3 0 10-6 0m6 0a3 3 0 11-6 0M9 16l-1.5 1.5M15 16l1.5 1.5"></path></svg>
);
const DiscountIcon = () => (
    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.5-3 4s1.343 4 3 4 3-1.5 3-4-1.343-4-3-4z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z"></path></svg>
);

const blogCategories = [
    { name: "Travel Guides", description: "In-depth itineraries, destination deep-dives, and local secrets.", icon: MapIcon },
    { name: "Volunteer Stories", description: "First-hand accounts from travelers making a real impact.", icon: HeartHandsIcon },
    { name: "Digital Nomad Tips", description: "Advice on remote work setup, visas, and maintaining productivity on the road.", icon: DeskIcon },
    { name: "Hostel Reviews", description: "Unbiased reviews and insights on accommodations across India.", icon: StarHouseIcon },
    { name: "Community Impact", description: "Updates on our projects, social outcomes, and NGO partnerships.", icon: PeopleIcon },
    { name: "Budget Travel Guides", description: "Practical tips and strategies for affordable, long-term exploration.", icon: DiscountIcon },
];

const BlogPage = () => {
    // Placeholder function for filtering or navigation, demonstrating interactivity
    const handleCategoryClick = (categoryName) => {
        console.log(`Filtering blog posts by: ${categoryName}`);
        // In a real app, this would update state or navigate the user.
    };

    return (
        <div className="pt-20 pb-16 bg-gray-50 min-h-screen font-inter">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-20">

                {/* 1. HERO SECTION: Title and Search/Intro */}
                <section className="text-center py-16 bg-white rounded-3xl shadow-2xl shadow-gray-100 border-b-4 border-indigo-600">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Nomad Yatri Blog
                    </h1>
                    <p className="max-w-4xl mx-auto text-xl sm:text-2xl font-light text-gray-600">
                        Stories, guides, and tips to inspire your next purpose-driven journey across India.
                    </p>
                    
                    {/* Placeholder Search Bar */}
                    <div className="mt-8 max-w-lg mx-auto">
                        <input 
                            type="search" 
                            placeholder="Search articles and destinations..."
                            className="w-full px-6 py-3 border-2 border-gray-300 rounded-full focus:border-indigo-500 focus:ring-indigo-500 transition duration-200 shadow-inner"
                        />
                    </div>
                </section>

                {/* 2. CATEGORY QUICK ACCESS GRID */}
                <section>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">Explore by Category</h2>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogCategories.map((category, index) => {
                            const Icon = category.icon;
                            return (
                                <button 
                                    key={index}
                                    onClick={() => handleCategoryClick(category.name)}
                                    // Premium Card Style: Interactive, subtle color differentiation
                                    className="text-left p-6 bg-white rounded-xl shadow-lg border-t-4 border-transparent hover:border-indigo-600 transition duration-300 transform hover:shadow-xl hover:-translate-y-1 w-full"
                                >
                                    <Icon />
                                    <h3 className="text-xl font-bold text-gray-900 mt-3 mb-1">
                                        {category.name}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {category.description}
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </section>
                
                {/* 3. FEATURED POSTS (Placeholder for actual content) */}
                <section>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-8 border-b pb-3">Featured Articles</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map(id => (
                            <div key={id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transition duration-300">
                                {/* Image Placeholder */}
                                <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
                                    
                                </div>
                                <div className="p-6">
                                    <p className="text-xs font-semibold text-indigo-600 uppercase mb-1">Travel Guides</p>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        How to Spend 7 Days Volunteering in the Himalayas
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-4">
                                        A practical itinerary for first-time work exchangers combining culture and service.
                                    </p>
                                    <a href={`/blog/post-${id}`} className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition">
                                        Read More &rarr;
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default BlogPage;