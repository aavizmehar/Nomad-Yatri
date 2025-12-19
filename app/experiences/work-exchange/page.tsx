'use client';
import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api/dashboard.api';
import ProgramCard from '@/components/ProgramCard';
import ProgramFilters from '@/components/ProgramFilters';
import Pagination from '@/components/Pagination';
import { PROGRAM_CATEGORIES } from '@/constants/programCategories';

export default function WorkExchangePage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    location: '',
    subCategory: '', 
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
      // Pass the specific category constant and the filter object
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Work Exchange Stays</h1>
          <p className="text-xl mb-2">Work a few hours, stay for free</p>
          <p className="text-lg opacity-90">Perfect for travelers wanting to immerse in local life</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <ProgramFilters
          location={filters.location}
          onLocationChange={(location) => setFilters({ ...filters, location, page: 1 })}
          selectedSubCategory={filters.subCategory}
          onSubCategoryChange={(subCategory) => setFilters({ ...filters, subCategory, page: 1 })}
        />

        <div className="mb-6 mt-4">
          <p className="text-gray-600">
            Found <span className="font-bold text-gray-900">{pagination.total}</span> work exchange opportunities
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm border">
            <p className="text-gray-500 text-xl font-medium">No work exchange programs found in this area</p>
            <button 
                onClick={() => setFilters({ location: '', subCategory: '', page: 1 })}
                className="mt-4 text-orange-600 hover:underline"
            >
                Clear all filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program: any) => (
                <ProgramCard key={program.programId} program={program} />
              ))}
            </div>

            <div className="mt-12">
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
  );
}