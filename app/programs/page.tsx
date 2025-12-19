'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES } from '@/constants/programCategories';
import { Program } from '@/types/program';

export default function AllProgramsPage() {
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
      const response = await api.getPrograms(filters);
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
    <div className="min-h-screen bg-gray-50 text-black">
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Explore All Programs</h1>
          <p className="text-lg">Find the perfect volunteering or travel experience</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setFilters({ ...filters, category: '', subCategory: '', page: 1 })}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filters.category === '' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
            }`}
          >
            All Programs
          </button>
          {Object.values(PROGRAM_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ ...filters, category, subCategory: '', page: 1 })}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                filters.category === category ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 2. FIXED: Pass the missing properties here */}
        <ProgramFilters
          location={filters.location}
          onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
          selectedSubCategory={filters.subCategory}
          onSubCategoryChange={(subCategory) => setFilters({ ...filters, subCategory, page: 1 })}
        />

        <div className="mb-4 mt-4 text-gray-600">
          Showing {programs.length} of {pagination.total} programs
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.programId} program={program} />
              ))}
            </div>

            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}