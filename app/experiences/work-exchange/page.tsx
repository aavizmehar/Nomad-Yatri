'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES } from '@/constants/programCategories';

export default function WorkExchangePage() {
  const [programs, setPrograms] = useState([]);
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
      const response = await api.getProgramsByCategory(
        PROGRAM_CATEGORIES.WORK_EXCHANGE,
        filters
      );
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
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Work Exchange Stays</h1>
          <p className="text-xl mb-2">
            Work a few hours, stay for free
          </p>
          <p className="text-lg opacity-90">
            Perfect for travelers wanting to immerse in local life
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ProgramFilters
          location={filters.location}
          onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
        />

        <div className="mb-4">
          <p className="text-gray-600">
            Found {pagination.total} work exchange opportunities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600">Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg">No work exchange programs found</p>
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