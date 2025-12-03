"use client";

import React from 'react';

// --- SELF-CONTAINED SVG ICONS ---

// Icon for Remote Workers/Audience
const LaptopIcon = () => (
  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1-3m-6 0h6m-6 0l-3 3v2l3 3h6l3-3v-2l-3-3m0 0H9m9 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v8m12 0a2 2 0 002-2v-4a2 2 0 00-2-2m-6-2v4"></path></svg>
);
// Icon for High-speed WiFi
const WifiIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12.001 2.396a10.02 10.02 0 0110.003 10c0 5.514-4.489 10-10.003 10-5.513 0-10-4.486-10-10 0-3.61 1.94-6.84 4.8-8.618"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v6m0 0v6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8l4 4m-8 0l4-4"></path></svg>
);
// Icon for Co-working spaces
const DeskIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13H3a2 2 0 01-2-2V7a2 2 0 012-2h18a2 2 0 012 2v4a2 2 0 01-2 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 13v6m10-6v6"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 13h18"></path></svg>
);
// Icon for Community meetups
const ChatIcon = () => (
  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.693A9.763 9.763 0 0112 4c4.97 0 9 3.582 9 8z"></path></svg>
);
// Icon for Skill workshops
const WorkshopIcon = () => (
  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6m0 0h18m-9-3h-2m-2 2h4m-4-6v-4a2 2 0 012-2h2a2 2 0 012 2v4m-4-6V7"></path></svg>
);
// Icon for Long-stay discounts
const DiscountIcon = () => (
  <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 1.5-3 4s1.343 4 3 4 3-1.5 3-4-1.343-4-3-4z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z"></path></svg>
);


const features = [
  { title: "High-speed WiFi", description: "Guaranteed stable and fast internet access necessary for demanding remote work tasks and video calls.", icon: WifiIcon, category: "Infrastructure" },
  { title: "Co-working Spaces", description: "Dedicated ergonomic areas with power backups, perfect for focused work outside your private room.", icon: DeskIcon, category: "Infrastructure" },
  { title: "Community Meetups", description: "Regular social events, networking sessions, and weekend activities to connect with fellow travelers and locals.", icon: ChatIcon, category: "Community" },
  { title: "Skill Workshops", description: "Opportunity to learn or teach skills—from digital marketing to photography and local crafts.", icon: WorkshopIcon, category: "Community" },
  { title: "Long-stay Discounts", description: "Attractive pricing for stays longer than two weeks, making extended remote work highly affordable.", icon: DiscountIcon, category: "Value" },
];


const DigitalNomadPage = () => {
  return (
    <div className="pt-20 pb-16 bg-white min-h-screen font-inter">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-20">

        {/* 1. HERO SECTION: Definition & Target */}
        <section className="text-center py-16 bg-indigo-50 rounded-3xl shadow-2xl shadow-indigo-100">
          <div className="flex items-center justify-center gap-3 mb-3 text-indigo-600 font-bold uppercase tracking-widest">
            <LaptopIcon className="w-6 h-6" />
            DIGITAL NOMAD STAYS
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Your Office, Anywhere in India.
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl font-light text-gray-600">
            Discover host properties explicitly designed for remote professionals, providing reliable infrastructure, community, and the freedom to explore.
          </p>
        </section>

        {/* 2. CORE FEATURES */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold text-gray-900 mt-2">Essential Features for Remote Work</h2>
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-lg">
              We vet every listing to ensure your connectivity and productivity needs are met.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-indigo-400 hover:border-indigo-600 transition duration-300 transform hover:shadow-xl">
                  <div className="mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                  <p className={`text-xs font-semibold mt-2 ${feature.category === 'Infrastructure' ? 'text-emerald-500' : 'text-indigo-500'}`}>
                    {feature.category.toUpperCase()}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 3. VALUE PROPOSITION */}
        <section className="bg-gray-50 py-16 rounded-2xl">
          <div className="grid md:grid-cols-5 gap-10 max-w-6xl mx-auto">

            <div className="md:col-span-2 text-center md:text-left p-4">
              <h2 className="text-4xl font-extrabold text-gray-900">
                More Than Just a Stay
              </h2>
              <p className="text-gray-600 mt-3 text-lg">
                Access a supportive community and opportunities for upskilling, all included with your stay.
              </p>
            </div>

            <div className="md:col-span-3 space-y-4 p-4">

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-emerald-500">
                <ChatIcon className="text-emerald-500 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Dedicated Community</h4>
                  <p className="text-sm text-gray-600">
                    Forge meaningful connections and collaborative partnerships during curated weekly meetups.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md border-l-4 border-indigo-500">
                <DiscountIcon className="text-indigo-500 mt-1" />
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">Savings & Flexibility</h4>
                  <p className="text-sm text-gray-600">
                    Commit to longer periods (15+ days) and unlock significant savings without sacrificing amenities or comfort.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DigitalNomadPage;