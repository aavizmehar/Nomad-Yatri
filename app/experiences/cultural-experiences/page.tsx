"use client";

import PrimaryBtn from '@/app/components/PrimaryBtn';
import React from 'react';

// --- SELF-CONTAINED SVG ICONS ---

// Icon for Village Homestays / Home
const HomeIcon = () => (
    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
);
// Icon for Tribal Life / Community
const PeopleIcon = () => (
    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20h-5m3-8a3 3 0 10-6 0m6 0a3 3 0 11-6 0M9 16l-1.5 1.5M15 16l1.5 1.5"></path></svg>
);
// Icon for Yoga & Meditation / Wellness
const LeafIcon = () => (
    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
);
// Icon for Food Trails / Food
const FoodIcon = () => (
    <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
);
// Icon for Art & Craft Workshops / Skill
const PaletteIcon = () => (
    <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13h10M7 17h10M17 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2z"></path></svg>
);


const experiences = [
    { 
        name: "Village Homestays", 
        description: "Live with a local family, participate in daily chores, and share authentic meals away from tourist crowds.", 
        icon: HomeIcon,
        color: "indigo-600",
        tag: "Immersion"
    },
    { 
        name: "Tribal Life Immersion", 
        description: "Respectfully spend time with indigenous communities to learn about their traditions, music, and way of life.", 
        icon: PeopleIcon,
        color: "emerald-600",
        tag: "Authenticity"
    },
    { 
        name: "Yoga & Meditation Retreats", 
        description: "Find peace and enhance wellness with structured programs often set in serene mountain or riverside locations.", 
        icon: LeafIcon,
        color: "indigo-600",
        tag: "Wellness"
    },
    { 
        name: "Regional Food Trails", 
        description: "Explore the culinary diversity of a state, learning recipes and discovering hidden local eateries with guides.", 
        icon: FoodIcon,
        color: "emerald-600",
        tag: "Culinary"
    },
    { 
        name: "Art & Craft Workshops", 
        description: "Master a local craft—from pottery and weaving to traditional painting—directly from artisans.", 
        icon: PaletteIcon,
        color: "indigo-600",
        tag: "Learning"
    },
];

const CulturalExperiencesPage = () => {
    return (
        <div className="pt-20 pb-16 bg-gray-50 min-h-screen font-inter">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-20">

                {/* 1. HERO SECTION: Title & Overview */}
                <section className="text-center py-16 bg-white rounded-3xl shadow-2xl shadow-gray-100 border-b-4 border-indigo-600">
                    <p className="text-indigo-600 font-bold uppercase tracking-widest mb-3">CULTURAL IMMERSION</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                        Experience India, Not Just Tour It.
                    </h1>
                    <p className="max-w-4xl mx-auto text-xl sm:text-2xl font-light text-gray-600">
                        Beyond sightseeing, our cultural experiences are designed to connect you directly with India's diverse traditions, people, and practices.
                    </p>
                </section>

                {/* 2. CORE EXPERIENCES GRID */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-extrabold text-gray-900 mt-2">What You Can Explore</h2>
                        <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
                            Choose from activities focused on wellness, culinary arts, traditional crafts, and community living.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {experiences.map((exp, index) => {
                            const Icon = exp.icon;
                            return (
                                <div key={index} className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-gray-200 hover:border-indigo-600 transition duration-300 transform hover:-translate-y-1">
                                    <div className="mb-4">
                                        <Icon />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                        {exp.name}
                                    </h3>
                                    <p className="text-base text-gray-600">
                                        {exp.description}
                                    </p>
                                    <p className={`text-xs font-semibold mt-2 text-${exp.color} uppercase`}>
                                        {exp.tag} EXPERIENCE
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. CTA Banner */}
                <section className="bg-indigo-700 text-white rounded-2xl p-10 shadow-2xl">
                    <div className="text-center max-w-4xl mx-auto">
                        <h2 className="text-3xl font-extrabold">Ready for True Indian Immersion?</h2>
                        <p className="text-indigo-200 mt-3 mb-6 text-lg">
                            Browse curated homestays and unique experiential programs hosted by locals.
                        </p>
                      
                        <PrimaryBtn text=" Browse Cultural Stays &rarr;" action="/experiences/browse"/>
                    </div>
                </section>
                
            </div>
        </div>
    );
};

export default CulturalExperiencesPage;