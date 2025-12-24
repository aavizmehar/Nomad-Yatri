'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import { dashboardApi } from '@/lib/api/dashboard.api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES, VOLUNTEER_SUBCATEGORIES } from '@/constants/programCategories';
import { Program } from '@/types/program';

export default function VolunteerProgramsPage() {
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
        PROGRAM_CATEGORIES.VOLUNTEER,
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
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with optimized overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/featuredimgs/volunteerprograms.webp" 
            alt="Volunteer Programs" 
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
              Impact Travel
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Volunteer <span className="italic font-serif font-light text-gray-300">Programs</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
              Make a tangible difference in communities across India. Choose your purpose, from education to environmental conservation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER & RESULTS SECTION */}
      <div className="container mx-auto px-6 -translate-y-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-6 md:p-8 border border-gray-100">
          <ProgramFilters
            subcategories={VOLUNTEER_SUBCATEGORIES}
            selectedSubCategory={filters.subCategory}
            onSubCategoryChange={(subCategory) =>
              setFilters({ ...filters, subCategory, page: 1 })
            }
            location={filters.location}
            onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
          />
          
          <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-6">
            <div className="flex items-center gap-2 text-[#314e4d]">
              <Search size={16} className="text-[#58a67d]" />
              <p className="text-sm font-medium">
                Showing <span className="font-bold">{pagination.total}</span> purposeful opportunities
              </p>
            </div>
            {filters.subCategory || filters.location ? (
              <button
                onClick={() => setFilters({ subCategory: '', location: '', page: 1 })}
                className="text-xs font-bold text-[#ffcc00] hover:text-[#314e4d] transition-colors uppercase tracking-widest underline decoration-2 underline-offset-4"
              >
                Reset Filters
              </button>
            ) : null}
          </div>
        </div>

        {/* 3. PROGRAMS GRID */}
        <div className="mt-12 mb-24">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-12 h-12 border-4 border-[#58a67d] border-t-transparent rounded-full animate-spin" />
              <p className="mt-6 text-sm font-bold uppercase tracking-widest text-gray-400">Curating Experiences...</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-serif italic text-xl mb-4">No journeys found matching your path</p>
              <button
                onClick={() => setFilters({ subCategory: '', location: '', page: 1 })}
                className="text-[#58a67d] font-bold hover:underline"
              >
                View all programs
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
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
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