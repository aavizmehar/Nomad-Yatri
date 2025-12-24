"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Program } from "@/types/program";

export default function ProgramCard({ program }: { program: Program }) {
  const getImageSource = () => {
    const fallback = "/featuredimgs/weekendtrips.webp";
    if (Array.isArray(program.programImages) && program.programImages.length > 0) {
      const firstImg = program.programImages[0];
      return (typeof firstImg === "string" && firstImg.trim() !== "") ? firstImg : fallback;
    }
    return (typeof program.programImages === "string" && program.programImages.trim() !== "") 
      ? program.programImages 
      : fallback;
  };

  return (
    <Link href={`/experiences/${program.programId}`} className="group block">
      <motion.div
        whileHover={{ y: -5 }}
        className="relative bg-white flex flex-col h-full rounded-[1.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
      >
        {/* 1. Immersive Image Section */}
        <div className="relative aspect-[16/11] w-full overflow-hidden">
          <Image
            src={getImageSource()}
            alt={program.title || "Experience"}
            fill
            className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
          />
          {/* Subtle Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Minimalist Badge */}
          <div className="absolute top-5 left-5">
            <span className="bg-white/90 backdrop-blur-md text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-sm shadow-sm border border-gray-100">
              {program.category || "Expedition"}
            </span>
          </div>
        </div>

        {/* 2. Refined Content Section */}
        <div className="p-7 flex flex-col flex-1">
          {/* Meta Info */}
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={12} className="text-yellow-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
              {program.location}
            </span>
          </div>

          {/* Elegant Title */}
          <h3 className="text-xl font-medium text-gray-900 leading-[1.2] mb-4 group-hover:text-yellow-600 transition-colors duration-300">
            {program.title}
          </h3>

          {/* Clean Description */}
          <p className="text-gray-400 text-[13px] leading-relaxed line-clamp-2 mb-8 font-light">
            {program.description}
          </p>

          {/* Premium Footer */}
          <div className="mt-auto flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Starting at</span>
              <span className="text-lg font-light text-gray-900 italic">
                ₹{program.price || '5,499'}
              </span>
            </div>

            {/* Circle Action Button */}
            <div className="relative w-10 h-10 flex items-center justify-center rounded-full border border-gray-100 bg-gray-50 group-hover:bg-yellow-400 group-hover:border-yellow-400 transition-all duration-500">
              <ArrowUpRight size={18} className="text-gray-400 group-hover:text-black transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}