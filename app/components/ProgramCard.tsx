'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Program } from '@/types/program';

export default function ProgramCard({ program }: { program: Program }) {

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Program Image */}
      <div className="relative h-48 w-full bg-gray-200">
        {program.programImages && program.programImages.length > 0 ? (
          <Image
            src={program.programImages[0]}
            alt={program.title}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-300">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
          {program.category}
        </div>
      </div>

      {/* Program Details */}
      <div className="p-4">
        <h3 className="font-bold text-xl mb-2 line-clamp-2">{program.title}</h3>
        
        {/* SubCategory */}
        {program.subCategory && (
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mb-2">
            {program.subCategory}
          </span>
        )}
        
        {/* Location */}
        {program.location && (
          <p className="text-sm text-gray-600 mb-2 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {program.location}
          </p>
        )}

        {/* Duration */}
        {program.duration && (
          <p className="text-sm text-gray-600 mb-2">
            ⏱️ {program.duration}
          </p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-3">
          {program.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>👥 {program.volunteersCount || 0} volunteers</span>
          {program.Host?.hostRating && (
            <span>⭐ {program.Host.hostRating.toFixed(1)}</span>
          )}
        </div>

        {/* View Button */}
        <Link href={`/experiences/${program.programId}`}>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}