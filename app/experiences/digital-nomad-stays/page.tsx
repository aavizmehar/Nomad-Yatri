"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Wifi, 
  Monitor, 
  Users, 
  Lightbulb, 
  Tag, 
  Search,
  ArrowRight
} from "lucide-react";

import { dashboardApi } from "@/lib/api/dashboard.api";
import ProgramCard from "@/components/ProgramCard";
import { PROGRAM_CATEGORIES } from "@/constants/programCategories";
import { Program } from "@/types/program";

// --- FEATURES DATA ---
const features = [
  {
    title: "High-speed WiFi",
    description: "Guaranteed stable and fast internet for demanding remote work and high-definition video calls.",
    icon: <Wifi size={24} />,
    category: "Infrastructure",
  },
  {
    title: "Dedicated Spaces",
    description: "Ergonomic co-working areas with power backups, perfect for deep work sessions.",
    icon: <Monitor size={24} />,
    category: "Infrastructure",
  },
  {
    title: "Community Meetups",
    description: "Regular social events and networking sessions to connect with fellow travelers and locals.",
    icon: <Users size={24} />,
    category: "Community",
  },
  {
    title: "Skill Exchange",
    description: "Teach or learn new skills—from digital marketing to photography and local crafts.",
    icon: <Lightbulb size={24} />,
    category: "Community",
  },
  {
    title: "Extended Value",
    description: "Exclusive pricing for stays longer than two weeks, making India your long-term office.",
    icon: <Tag size={24} />,
    category: "Value",
  },
];

const DigitalNomadPage = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNomadPrograms();
  }, []);

  const fetchNomadPrograms = async () => {
    setLoading(true);
    try {
      const response = await dashboardApi.getProgramsByCategory(
        PROGRAM_CATEGORIES.DIGITAL_NOMAD, 
        { page: 1 }
      );
      if (response.success) {
        setPrograms(response.data.programs);
      }
    } catch (error) {
      console.error("Error fetching nomad programs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#FCFCFC] min-h-screen font-sans text-[#1A2627]">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/featuredimgs/ecoprojects.webp" 
            alt="Work from India" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A2627]/60 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#ffcc00] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">
              Global Remote Work
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Your Office, <span className="italic font-serif font-light text-gray-300">Anywhere.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Discover host properties explicitly designed for remote professionals, 
              providing reliable infrastructure, community, and the freedom to explore India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CORE FEATURES - Floating Icons */}
      <section className="container mx-auto px-6 -translate-y-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#58a67d]/10 flex items-center justify-center text-[#58a67d] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-sm font-bold text-[#314e4d] mb-2">{feature.title}</h3>
              <p className="text-[11px] text-gray-500 leading-relaxed font-light line-clamp-3">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. NOMAD PROGRAMS GRID */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#314e4d] leading-tight mb-4">
              Featured <span className="italic font-serif text-gray-400">Workspaces</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-[#ffcc00] pl-4">
              Curated stays with high-speed internet, collaborative environments, and breathtaking Indian landscapes.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#58a67d] uppercase tracking-widest">
            <Search size={14} />
            Showing {programs.length} Active Stays
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-10 h-10 border-2 border-[#58a67d] border-t-transparent rounded-full animate-spin" />
            <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-gray-400 italic">Syncing Workspaces...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400 font-serif italic text-xl">The office is currently closed. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {programs.map((program) => (
              <ProgramCard key={program.programId} program={program} />
            ))}
          </div>
        )}
      </section>

      {/* 4. VALUE PROPOSITION - Premium Dark Section */}
      <section className="py-24 bg-[#1A2627] text-white overflow-hidden relative">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <span className="text-[#ffcc00] font-bold tracking-[0.3em] uppercase text-[10px]">
                Beyond Connectivity
              </span>
              <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
                More Than <br /> <span className="italic font-serif text-[#58a67d]">Just a Stay.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed font-light">
                When you choose a Nomad Yatri stay, you unlock a support network. 
                From emergency tech assistance to weekend mountain treks, we handle the logistics so you can focus on your craft.
              </p>
              
              <div className="flex flex-col gap-6">
                {[
                  { title: "Collaborative Partnerships", desc: "Forge meaningful connections during curated weekly meetups." },
                  { title: "Savings & Flexibility", desc: "Commit to 15+ days and unlock significant long-stay discounts." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                    <div className="mt-1 text-[#ffcc00]"><ArrowRight size={18} /></div>
                    <div>
                      <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square bg-[#314e4d] rounded-[3rem] rotate-3 relative overflow-hidden shadow-2xl">
                 <Image 
                    src="/featuredimgs/culturalstays.webp" 
                    alt="Community connection" 
                    fill 
                    className="object-cover -rotate-3 scale-110 opacity-60"
                 />
                 <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                    <p className="text-2xl font-serif italic">"I came for the WiFi, I stayed for the people."</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalNomadPage;