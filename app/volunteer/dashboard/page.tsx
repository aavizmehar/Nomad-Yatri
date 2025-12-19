'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { volunteerApi } from '@/lib/api/volunteer.api';
import {
  MapPin,
  Globe,
  Languages,
  Pencil
} from 'lucide-react';

export default function VolunteerDashboard() {
  const router = useRouter();
  const [volunteer, setVolunteer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await volunteerApi.getProfile();
        if (!res.success) {
          router.push('/volunteer/add-info');
        } else {
          setVolunteer(res.data.volunteer);
        }
      } catch {
        router.push('/volunteer/add-info');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-gray-500 animate-pulse">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-blue-600">{volunteer.name}</span>
        </h1>

        <button
          onClick={() => router.push('/volunteer/add-info')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-md mb-3">
            <img
              src={volunteer.photo || '/avatar-placeholder.png'}
              alt="Volunteer"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-xl font-semibold">{volunteer.name}</h2>
          <p className="text-gray-500 flex items-center gap-1">
            <MapPin size={14} />
            {volunteer.country}
          </p>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Globe size={18} />
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {volunteer.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full
                bg-blue-100 text-blue-700 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests & Languages */}
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {volunteer.interests.map((interest: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full
                  bg-purple-100 text-purple-700"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <Languages size={18} />
              Languages
            </h3>
            <p className="text-gray-700">
              {volunteer.languages.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
