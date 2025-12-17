'use client';
import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import Link from 'next/link';
import Image from 'next/image';

export default function MyProgramsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await api.getHostPrograms();
      setPrograms(response.data.programs);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
    setLoading(false);
  };

  const handleDelete = async (programId) => {
    if (!confirm('Are you sure you want to delete this program?')) return;

    try {
      await api.deleteProgram(programId);
      alert('Program deleted successfully');
      fetchPrograms(); // Refresh list
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Programs</h1>
          <Link
            href="/host/create-program"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
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
              <div key={program.programId} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {program.programImages?.[0] ? (
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

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2">{program.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{program.category}</p>
                  {program.subCategory && (
                    <p className="text-xs text-gray-500 mb-2">{program.subCategory}</p>
                  )}
                  
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <span>👥 {program.volunteersCount || 0}</span>
                    <span className={`px-2 py-1 rounded ${program.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {program.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/programs/${program.programId}`}
                      className="flex-1 text-center bg-gray-100 text-gray-700 py-2 rounded font-semibold hover:bg-gray-200"
                    >
                      View
                    </Link>
                    <Link
                      href={`/host/edit-program/${program.programId}`}
                      className="flex-1 text-center bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(program.programId)}
                      className="flex-1 bg-red-600 text-white py-2 rounded font-semibold hover:bg-red-700"
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