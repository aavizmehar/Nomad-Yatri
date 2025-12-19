"use client";
import Image from "next/image";

import { useState } from "react";
import { volunteerApi } from "@/lib/api/volunteer.api";
import { Program } from "@/types/program";

export default function ProgramCard({ program }: { program: Program }) {
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);

  const handleApply = async () => {
    try {
      setLoading(true);
      await volunteerApi.applyToProgram(program.programId);
      setApplied(true);
      alert("Applied successfully!");
    } catch (err: any) {
      alert(err.message || "Already applied");
    } finally {
      setLoading(false);
    }
  };
const imageSrc =
  Array.isArray(program.programImages) && program.programImages.length > 0
    ? program.programImages[0]
    : typeof program.programImages === "string" && (program.programImages as string).trim() !== ""
    ? program.programImages
    : "/featuredImgs/weekendtrips.png";
  return (
   <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">

      {/* 🌄 Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={program.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* 📄 Content */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* Category / Location */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600">
            {program.category || "Volunteer Program"}
          </span>
          <span className="text-xs text-gray-500">{program.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 leading-snug mb-2">
          {program.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {program.description}
        </p>

        {/* CTA */}
        <button
          disabled={loading || applied}
          onClick={handleApply}
          className={`mt-auto py-2.5 rounded-xl font-semibold text-sm transition-all
            ${
              applied
                ? "bg-green-500 text-white cursor-default"
                : loading
                ? "bg-blue-400 text-white cursor-wait"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]"
            }
          `}
        >
          {applied ? "✓ Applied" : loading ? "Applying..." : "Apply Now"}
        </button>
      </div>
    </div>
  );
}
