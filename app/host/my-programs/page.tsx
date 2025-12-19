'use client';
import { useState, useEffect } from 'react';
import { dashboardApi } from '@/lib/api/dashboard.api';
import Link from 'next/link';
import Image from 'next/image';
import { Program } from '@/types/program';

export default function MyProgramsPage() {
  // 2. Assign the Program type to the state
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await dashboardApi.getHostPrograms();
      // Ensure we handle the nested structure of your ApiResponse
      if (response.success) {
        setPrograms(response.data.programs || []);
      }
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  // 3. FIXED: Added type for programId parameter
  const handleDelete = async (programId: number) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      const response = await dashboardApi.deleteProgram(programId);
      if (response.success) {
        alert('Program deleted successfully');
        // Refresh the list locally instead of a full fetch to be faster
        setPrograms(prev => prev.filter(p => p.programId !== programId));
      }
    } catch (error) {
      console.error('Error deleting program:', error);
      alert('Failed to delete program');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Programs</h1>
          <Link
            href="/host/create-program"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            + Create New Program
          </Link>
        </div>

        {programs.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg mb-4">You haven't created any programs yet</p>
            <Link
              href="/host/create-program"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Create Your First Program
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div key={program.programId} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                {/* Image Section */}
                <div className="relative h-48 bg-gray-200">
                  {program.programImages && program.programImages.length > 0 ? (
                    <Image
                      src={program.programImages[0]}
                      alt={program.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-4 flex-grow">
                  <h3 className="font-bold text-xl mb-1 truncate">{program.title}</h3>
                  <p className="text-sm font-medium text-blue-600 mb-2">{program.category}</p>
                  {program.subCategory && (
                    <p className="text-xs text-gray-500 mb-2">{program.subCategory}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>👥 Applicants: {program.volunteersCount || 0}</span>
                    <span className={`px-2 py-1 text-xs font-bold rounded ${program.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {program.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-auto">
                    <Link
                      href={`/programs/${program.programId}`}
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded text-sm font-semibold hover:bg-gray-200"
                    >
                      View
                    </Link>
                    <Link
                      href={`/host/edit-program/${program.programId}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded text-sm font-semibold hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(program.programId)}
                      className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-semibold hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}