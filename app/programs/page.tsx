'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES } from '@/constants/programCategories';

export default function AllProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
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
      setPrograms(response.data.programs);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
    setLoading(false);
  };

  const handlePageChange = (newPage) => {
    setFilters({ ...filters, page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            onClick={() => setFilters({ ...filters, category: '', page: 1 })}
            className={`px-4 py-2 rounded-full font-semibold transition-colors ${
              filters.category === ''
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            All Programs
          </button>
          {Object.values(PROGRAM_CATEGORIES).map((category) => (
            <button
              key={category}
              onClick={() => setFilters({ ...filters, category, page: 1 })}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                filters.category === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Filters */}
        <ProgramFilters
          location={filters.location}
          onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
        />

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing {programs.length} of {pagination.total} programs
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No programs found</p>
          </div>
        ) : (
          <>
            {/* Programs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.programId} program={program} />
              ))}
            </div>

            {/* Pagination */}
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