'use client';
import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api/dashboard.api';
import ProgramCard from '@/components/ProgramCard';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES } from '@/constants/programCategories';
import { Program } from '@/types/program';
import { Sparkles, ArrowRight, Globe, Tent } from 'lucide-react';
import { motion } from 'framer-motion';
import CTASection from '@/components/CtaSection';

export default function NomadProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
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
      const response = await dashboardApi.getPrograms(filters);
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
    <div className="min-h-screen bg-white font-sans selection:bg-orange-100 selection:text-orange-900">
      {/* HERO SECTION */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503221043305-f7498f8b7888?auto=format&fit=crop&q=80&w=2000"
          alt="Nomad Yatri Hero"
          className="absolute inset-0 w-full h-full object-cover scale-105 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <span className="flex items-center gap-2 py-1 px-4 rounded-full bg-white/10 backdrop-blur-md text-white text-xs uppercase tracking-[0.2em] font-semibold border border-white/20">
                <Sparkles size={14} className="text-orange-400" />
                Est. 2025 • The Nomad Way
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-[0.9]">
              The World is <br />
              <span className="italic font-light text-orange-400">Your Home.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl font-medium max-w-xl mx-auto leading-relaxed">
              Stop touring. Start traveling. Discover immersive programs designed for the intentional nomad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CATEGORY TABS */}
      <div className="container mx-auto px-6 -mt-20 relative z-20">
        <div className="flex overflow-x-auto no-scrollbar mb-16 justify-center gap-3">
          <button
            onClick={() => setFilters({ ...filters, category: '', page: 1 })}
            className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
              filters.category === '' ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:text-black'
            }`}
          >
            All Expeditions
          </button>
          {Object.values(PROGRAM_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ ...filters, category, page: 1 })}
              className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                filters.category === category ? 'bg-orange-500 text-white shadow-lg' : 'text-gray-500 hover:text-black'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* PROGRAM GRID */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="bg-gray-100 aspect-[4/5] rounded-[2rem]"></div>
                <div className="h-6 bg-gray-100 rounded-full w-2/3 mx-auto"></div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {programs.map((program) => (
              <motion.div
                key={program.programId}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <ProgramCard program={program} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PAGINATION */}
        {!loading && programs.length > 0 && (
          <div className="py-20 flex justify-center border-t border-gray-100 mt-20">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>

   <CTASection/>
    </div>
  );
}
