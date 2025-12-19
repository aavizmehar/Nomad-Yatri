'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { dashboardApi } from '@/lib/api/dashboard.api';
import Image from 'next/image';
import Link from 'next/link';
export default function ProgramDetailPage() {
const params = useParams();
const [program, setProgram] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedImage, setSelectedImage] = useState(0);
useEffect(() => {
fetchProgram();
}, [params.programId]);
const fetchProgram = async () => {
try {
const response = await dashboardApi.getProgram(params.programId);
setProgram(response.data.program);
} catch (error) {
console.error('Error fetching program:', error);
}
setLoading(false);
};
if (loading) {
return (
<div className="min-h-screen flex items-center justify-center">
<div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
</div>
);
}
if (!program) {
return (
<div className="min-h-screen flex items-center justify-center">
<div className="text-center">
<h1 className="text-2xl font-bold mb-4">Program not found</h1>
<Link href="/programs" className="text-blue-600 hover:underline">
Back to programs
</Link>
</div>
</div>
);
}
return (
<div className="min-h-screen bg-gray-50">
<div className="container mx-auto px-4 py-8">
{/* Back Button */}
<Link
       href="/programs"
       className="inline-flex items-center text-blue-600 hover:underline mb-4"
     >
← Back to programs
</Link>
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        {/* Left: Images */}
        <div>
          {/* Main Image */}
          <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
            {program.programImages && program.programImages.length > 0 ? (
              <Image
                src={program.programImages[selectedImage]}
                alt={program.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500">No images available</span>
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {program.programImages && program.programImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {program.programImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-20 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'ring-2 ring-blue-600' : ''
                  }`}
                >
                  <Image src={img} alt={`${program.title} ${index + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div>
          {/* Category & SubCategory */}
          <div className="flex gap-2 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
              {program.category}
            </span>
            {program.subCategory && (
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {program.subCategory}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{program.title}</h1>

          {/* Location & Duration */}
          <div className="space-y-2 mb-6">
            {program.location && (
              <p className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {program.location}
              </p>
            )}
            {program.duration && (
              <p className="flex items-center text-gray-700">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {program.duration}
              </p>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Volunteers</p>
              <p className="text-2xl font-bold">{program.volunteersCount || 0}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Impact Hours</p>
              <p className="text-2xl font-bold">{program.impactHours || 0}</p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-3">About This Program</h2>
            <p className="text-gray-700 whitespace-pre-line">{program.description}</p>
          </div>

          {/* Host Info */}
          {program.Host && (
            <div className="border-t pt-6 mb-6">
              <h3 className="text-xl font-bold mb-3">Host Information</h3>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="font-semibold">{program.Host.name}</p>
                  <p className="text-gray-600">{program.Host.propertyName}</p>
                  {program.Host.hostRating && (
                    <p className="text-sm text-gray-600">
                      ⭐ {program.Host.hostRating.toFixed(1)} rating
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Apply Button */}
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
);
}