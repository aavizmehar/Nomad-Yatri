'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Coffee } from 'lucide-react';
import { dashboardApi } from '@/lib/api/dashboard.api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES } from '@/constants/programCategories';
import { Program } from '@/types/program';

export default function WorkExchangePage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
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
        PROGRAM_CATEGORIES.WORK_EXCHANGE,
        filters
      );
      
      if (response.success) {
        setPrograms(response.data.programs);
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] font-sans text-[#1A2627]">
      
      {/* 1. EDITORIAL HERO SECTION */}
      <section className="relative h-[55vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/featuredImgs/workexchange.webp" 
            alt="Work Exchange Experience" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#1A2627]/50 backdrop-blur-[1px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#ffcc00] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block">
              Sustainable Living
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight">
              Work & <span className="italic font-serif font-light text-gray-300">Stay</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              Immerse yourself in local Indian life by exchanging your unique skills 
              for meaningful stays and authentic community connections.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SIMPLIFIED FILTER SECTION */}
      <div className="container mx-auto px-6 -translate-y-12 relative z-20">
        <div className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.06)] p-6 md:p-10 border border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Direct Location Search - Passing null/empty to subcategories since they aren't used */}
            <div className="w-full">
              <ProgramFilters
                location={filters.location}
                onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
                selectedSubCategory="" 
                onSubCategoryChange={() => {}} 
                subcategories={[]} 
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-gray-50 pt-8">
            <div className="flex items-center gap-3 text-[#314e4d]">
              <div className="w-10 h-10 rounded-full bg-[#58a67d]/10 flex items-center justify-center">
                <Coffee size={18} className="text-[#58a67d]" />
              </div>
              <p className="text-sm font-medium">
                Found <span className="font-bold text-lg">{pagination.total}</span> exchange stays
              </p>
            </div>

            {filters.location && (
              <button 
                onClick={() => setFilters({ location: '', page: 1 })}
                className="text-[10px] font-bold text-[#ffcc00] uppercase tracking-widest hover:text-[#314e4d] transition-colors underline decoration-2 underline-offset-8"
              >
                Clear Location
              </button>
            )}
          </div>
        </div>

        {/* 3. PROGRAMS GRID */}
        <div className="mt-16 mb-24 max-w-7xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32">
              <div className="w-10 h-10 border-2 border-[#58a67d] border-t-transparent rounded-full animate-spin" />
              <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">Loading Opportunities...</p>
            </div>
          ) : programs.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-gray-200">
              <p className="text-gray-400 font-serif italic text-xl mb-6">No stays found in this location</p>
              <button 
                onClick={() => setFilters({ location: '', page: 1 })}
                className="bg-[#314e4d] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#58a67d] transition-all"
              >
                Show All Programs
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
                {programs.map((program: any) => (
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