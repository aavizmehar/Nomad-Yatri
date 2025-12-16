"use client";

import React, { useState, useEffect } from "react";

// ---------------- ICONS ----------------
const BookIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 mr-2 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
    ></path>
  </svg>
);

const WomanIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 mr-2 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M5 13l4 4L19 7"
    ></path>
  </svg>
);

const LeafIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 mr-2 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    ></path>
  </svg>
);

const PawIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 mr-2 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M14 9l6-6M9 14l-6 6M17 17l4 4m-4-4l4-4m-4 4V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h7m-8-2v-4a1 1 0 011-1h4a1 1 0 011 1v4m-5 0h6m-3-11v2m-3-3v3m0 0h2"
    ></path>
  </svg>
);

const HandshakeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={`w-6 h-6 mr-2 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1m0-1v-1m-1 0h2m-2-4v1m0-1v-1m-1 0h2m-2-4v1m0-1v-1m-1 0h2"
    ></path>
  </svg>
);

const LocationIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m11.314 0A10.03 10.03 0 0020 12c0-5.523-4.477-10-10-10S0 6.477 0 12c0 1.98.583 3.82 1.586 5.398l.685.685M9 12a2 2 0 100-4 2 2 0 000 4z"
    ></path>
  </svg>
);

const ClockIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const StarIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l1.242 3.826 4.026.292c.969.07 1.35 1.258.647 1.904l-3.072 2.235 1.157 3.901c.277.935-.769 1.642-1.574 1.144L10 15.17l-3.418 2.518c-.805.593-1.851-.109-1.574-1.044l1.157-3.901L3.14 9.049c-.703-.646-.322-1.834.647-1.904l4.026-.292L9.049 2.927z"></path>
  </svg>
);

// ---------------- TYPES ----------------
export interface Program {
  id: number;
  title: string;
  location: string;
  duration: string;
  rating: number;
  category: string;
}

interface ProgramCardProps {
  program: Program;
}

// ---------------- COMPONENTS ----------------
const ProgramCard = ({ program }: ProgramCardProps) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transform hover:shadow-2xl hover:-translate-y-1 transition duration-300">
    <div className="h-40 bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-semibold">
      [Program Image Placeholder]
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{program.title}</h3>

      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-2">
          <LocationIcon className="w-4 h-4 text-gray-400" />
          <span>{program.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4 text-gray-400" />
          <span>{program.duration}</span>
        </div>
        <div className="flex items-center gap-2">
          <StarIcon className="w-4 h-4 text-amber-500" />
          <span>{program.rating} Host Rating</span>
        </div>
      </div>

      <a
        href={`/apply/${program.id}`}
        className="w-full block text-center px-4 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition"
      >
        Apply Now
      </a>
    </div>
  </div>
);

const categoryMap: Record<string, React.FC<{ className?: string }>> = {
  "Education Support": BookIcon,
  "Women Empowerment": WomanIcon,
  "Environment & Climate": LeafIcon,
  "Animal Care": PawIcon,
  "Community Development": HandshakeIcon,
  "Rural Development": HandshakeIcon,
  "Weekend Volunteering": ClockIcon,
};

// ---------------- PAGE COMPONENT ----------------
const VolunteerProgramsPage: React.FC = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`);
        const data: Program[] = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error("Error fetching programs:", err);
      }
    }
    load();
  }, []);

  const categories = ["All", ...Object.keys(categoryMap)];

  const filteredPrograms =
    activeCategory === "All"
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-20 pb-16 bg-gray-50 min-h-screen font-inter">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl space-y-16">
        {/* Hero */}
        <section className="text-center py-16 bg-white rounded-3xl shadow-2xl shadow-gray-100 border-b-4 border-indigo-600">
          <p className="text-indigo-600 font-bold uppercase tracking-widest mb-3">PURPOSE TRAVEL</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Explore Verified Volunteer Programs Across India
          </h1>
          <p className="max-w-4xl mx-auto text-xl sm:text-2xl font-light text-gray-600">
            Find opportunities that match your skills and passion, and make a real difference in local communities.
          </p>
        </section>

        {/* Category Filter */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Find Your Project</h2>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => {
              const Icon = categoryMap[category];
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-semibold transition duration-200 ${
                    active
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-50 hover:border-indigo-500"
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${active ? "text-white" : "text-gray-700"}`} />}
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        {/* Programs Grid */}
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            {filteredPrograms.length} Programs in {activeCategory}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
          {filteredPrograms.length === 0 && (
            <div className="text-center py-12 text-gray-500 text-lg border-2 border-dashed border-gray-300 rounded-xl mt-8">
              No programs found matching "{activeCategory}".
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default VolunteerProgramsPage;
