'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Palette, Heart } from 'lucide-react';
import { dashboardApi } from '@/lib/api/dashboard.api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES, CULTURAL_SUBCATEGORIES } from '@/constants/programCategories';
import { Program } from '@/types/program';

export default function CulturalExperiencesPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    subCategory: '',
    location: '',
    page: 1
  });
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1
  });

  useEffect(() => {
    fetchPrograms();
  }, [filters]);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await dashboardApi.getProgramsByCategory(
        PROGRAM_CATEGORIES.CULTURAL,
        filters
      );
      setPrograms(response.data.programs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
    setLoading(false);
  };

  const handlePageChange = (newPage: number): void => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans text-[#1A2627]">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative h-[60vh] min-h-[450px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/featuredImgs/diginomad.webp" 
            alt="Indian Cultural Heritage" 
            className="w-full h-full object-cover"
          />
          {/* Subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-[#1A2627]/50 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#ffcc00] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">
              Authentic Traditions
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Rooted in <span className="italic font-serif font-light text-gray-300">Culture</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the soul of India through village homestays, yoga retreats, and ancient art forms. 
              Immerse yourself in journeys that tell a story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FLOATING FILTER & RESULTS BAR */}
      <div className="container mx-auto px-6 -translate-y-16 relative z-20">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 md:p-10 border border-gray-100">
          <ProgramFilters
            subcategories={CULTURAL_SUBCATEGORIES}
            selectedSubCategory={filters.subCategory}
            onSubCategoryChange={(subCategory) =>
              setFilters({ ...filters, subCategory, page: 1 })
            }
            location={filters.location}
            onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
          />
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between border-t border-gray-50 pt-8 gap-4">
            <div className="flex items-center gap-3 text-[#314e4d]">
              <div className="w-10 h-10 rounded-full bg-[#58a67d]/10 flex items-center justify-center">
                <Palette size={18} className="text-[#58a67d]" />
              </div>
              <p className="text-sm font-medium">
                Found <span className="font-bold text-lg">{pagination.total}</span> soulful experiences
              </p>
            </div>

            {filters.subCategory || filters.location ? (
              <button 
                onClick={() => setFilters({ subCategory: '', location: '', page: 1 })}
                className="text-xs font-bold text-[#ffcc00] uppercase tracking-widest hover:text-[#314e4d] transition-colors flex items-center gap-2 group"
              >
                Reset Exploration
                <span className="w-4 h-px bg-[#ffcc00] group-hover:bg-[#314e4d] transition-colors" />
              </button>
            ) : null}
          </div>
        </div>

        {/* 3. EXPERIENCES GRID */}
        <div className="mt-16 mb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-10 h-10 border-2 border-[#58a67d] border-t-transparent rounded-full animate-spin" />
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Loading the soul of India...</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-gray-200">
              <Heart className="mx-auto text-gray-200 mb-4" size={40} />
              <p className="text-gray-400 font-serif italic text-xl mb-6">This cultural path is currently quiet.</p>
              <button 
                onClick={() => setFilters({ subCategory: '', location: '', page: 1 })}
                className="bg-[#314e4d] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#58a67d] transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
              >
                {programs.map((program) => (
                  <motion.div 
                    key={program.programId}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                  >
                    <ProgramCard program={program} />
                  </motion.div>
                ))}
              </motion.div>

              <div className="mt-20">
                <Pagination
                  currentPage={pagination.page}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}