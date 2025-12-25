"use client";

import React from 'react';
import Image from 'next/image';
import { 
  Compass, 
  HeartHandshake, 
  Coffee, 
  Tent, 
  Globe, 
  Coins, 
  ArrowUpRight, 
  CalendarDays, 
  User,
  Instagram
} from 'lucide-react';

// --- ADVENTUROUS COLOR PALETTE ---
// Primary: stone-900 (Earth)
// Accents: orange-600 (Sunset/Dust), emerald-900 (Forest), amber-50 (Sand)

const blogCategories = [
    { name: "Travel Guides", icon: Compass, color: "text-orange-700", bg: "bg-orange-50" },
    { name: "Volunteer Stories", icon: HeartHandshake, color: "text-emerald-700", bg: "bg-emerald-50" },
    { name: "Nomad Life", icon: Coffee, color: "text-amber-700", bg: "bg-amber-50" },
    { name: "Stays & Hostels", icon: Tent, color: "text-stone-700", bg: "bg-stone-100" },
    { name: "Cultural Impact", icon: Globe, color: "text-blue-700", bg: "bg-blue-50" },
    { name: "Budget Tips", icon: Coins, color: "text-rose-700", bg: "bg-rose-50" },
];

const posts = [
    {
        id: 1,
        category: "Volunteer Stories",
        title: "Teaching in the Clouds: 3 Weeks in a Spiti Valley School",
        excerpt: "Discover how a simple volunteer teaching assignment turned into a life-changing cultural immersion in the high Himalayas.",
        author: "Ananya Sharma",
        date: "Dec 20, 2025",
        image: "/featuredImgs/diginomad.webp", // Keep your local paths
    },
    {
        id: 2,
        category: "Nomad Life",
        title: "Top 5 Hidden Coworking Cafes in South Goa",
        excerpt: "Escaping the bustle? We've scouted the quietest corners with high-speed internet and the best cold brews.",
        author: "Vikram Mehta",
        date: "Dec 18, 2025",
        image: "/featuredImgs/ruralhomestay.webp",
    },
    {
        id: 3,
        category: "Travel Guides",
        title: "Sustainable Traveler's Guide to Kerala Backwaters",
        excerpt: "How to enjoy the serene beauty of the backwaters while supporting local eco-friendly operators.",
        author: "Siddharth Rai",
        date: "Dec 15, 2025",
        image: "/featuredImgs/ecoprojects.webp",
    }
];

const BlogPage = () => {
    return (
        <div className="bg-[#FCFAF7] min-h-screen text-stone-900">
            
            {/* 1. HERO SECTION - Minimal & Earthy */}
            <section className="relative pt-32 pb-16 px-4">
                <div className="container mx-auto max-w-5xl text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <div className="h-[1px] w-8 bg-orange-600"></div>
                        <span className="text-xs font-bold tracking-[0.3em] text-orange-600 uppercase">
                            The Nomad Yatri Journal
                        </span>
                        <div className="h-[1px] w-8 bg-orange-600"></div>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-serif italic text-stone-900 mb-6">
                        Stories from the <span className="text-orange-700">Road.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-light">
                        A collection of purposeful journeys, slow travel guides, and the raw beauty of exploring India’s soul.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                
                {/* 2. CATEGORY SELECTOR - Styled like a Journal Index */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-20">
                    {blogCategories.map((cat, i) => (
                        <button 
                            key={i} 
                            className="flex flex-col items-center justify-center p-6 rounded-lg border border-stone-200 bg-white hover:border-orange-300 hover:shadow-sm transition-all group"
                        >
                            <cat.icon size={24} className={`${cat.color} mb-3 group-hover:scale-110 transition-transform`} />
                            <span className="text-xs font-bold uppercase tracking-wider text-stone-500">{cat.name}</span>
                        </button>
                    ))}
                </div>

                {/* 3. FEATURED POST - Magazine Style */}
                <section className="mb-24">
                    <div className="relative group overflow-hidden rounded-sm">
                        <div className="grid lg:grid-cols-12 gap-0 bg-white border border-stone-200">
                            <div className="lg:col-span-7 relative h-[350px] lg:h-[550px] overflow-hidden">
                                <Image 
                                    src="/featuredImgs/workexchange.webp"
                                    alt="Featured"
                                    fill
                                    className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                            <div className="lg:col-span-5 p-8 md:p-14 flex flex-col justify-center">
                                <div className="flex items-center gap-2 text-orange-700 mb-4">
                                    <span className="h-[2px] w-4 bg-orange-700"></span>
                                    <span className="text-xs font-bold uppercase tracking-widest">Editor's Pick</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-6 leading-tight">
                                    Why "Slow Travel" is the only way to truly see India.
                                </h2>
                                <p className="text-stone-600 text-base mb-8 leading-relaxed">
                                    Rushing through monuments is easy. Sitting with a local weaver in Kutch for four hours? That’s where the magic happens.
                                </p>
                                <button className="flex items-center gap-3 text-stone-900 font-bold border-b-2 border-orange-600 w-fit pb-1 hover:gap-5 transition-all">
                                    Read Journal Entry <ArrowUpRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. POST GRID - Clean & Focus on Typography */}
                <section className="mb-24">
                    <div className="flex items-center justify-between mb-12 border-b border-stone-200 pb-4">
                        <h2 className="text-2xl font-serif italic text-stone-800">Recent Wanderings</h2>
                        <button className="text-xs font-bold uppercase tracking-widest text-orange-700 hover:text-orange-800">
                            View All Stories
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {posts.map((post) => (
                            <article key={post.id} className="group cursor-pointer">
                                <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-stone-200">
                                    <Image 
                                        src={post.image} 
                                        alt={post.title} 
                                        fill 
                                        className="object-cover transition duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute bottom-4 left-4">
                                        <span className="px-3 py-1 bg-stone-900/80 backdrop-blur-sm text-white text-[10px] font-bold tracking-widest uppercase">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-4 text-[10px] text-stone-400 font-bold uppercase tracking-[0.2em]">
                                        <span className="flex items-center gap-1"><CalendarDays size={12}/> {post.date}</span>
                                        <span className="flex items-center gap-1"><User size={12}/> By {post.author}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-orange-800 transition-colors leading-snug">
                                        {post.title}
                                    </h3>
                                    <p className="text-stone-500 text-sm leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>

                {/* 5. NEWSLETTER - Warm & Invitation-like */}
                <section className="mb-24 rounded-2xl overflow-hidden relative">
                    <div className="bg-emerald-950 px-8 py-20 text-center text-stone-100">
                        <div className="max-w-xl mx-auto space-y-6">
                            <Instagram className="mx-auto text-orange-400" size={32} />
                            <h2 className="text-3xl md:text-4xl font-serif italic">Join the Nomad Circle</h2>
                            <p className="text-stone-400 font-light">
                                Subscribe to receive our digital postcards: a monthly digest of hidden spots, volunteer calls, and travel wisdom.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto rounded-lg overflow-hidden border border-emerald-800 shadow-2xl">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="flex-1 px-6 py-4 bg-emerald-900 text-white placeholder:text-emerald-700 focus:outline-none"
                                />
                                <button className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold transition">
                                    Join
                                </button>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default BlogPage;