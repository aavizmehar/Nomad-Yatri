'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { volunteerApi } from '@/lib/api/volunteer.api';
import {
  MapPin,
  Globe,
  Languages,
  Pencil,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';

export default function VolunteerDashboard() {
  const router = useRouter();
  const [volunteer, setVolunteer] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, appsRes] = await Promise.all([
          volunteerApi.getProfile(),
          volunteerApi.getMyApplications()
        ]);

        if (!profileRes.success) {
          router.push('/volunteer/add-info');
          return;
        }

        setVolunteer(profileRes.data.volunteer);
        setApplications(appsRes.data.applications || []);
      } catch {
        router.push('/volunteer/add-info');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  if (loading) {
    return (
      <div className="p-8 text-gray-500 animate-pulse">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Welcome back, <span className="text-blue-600">{volunteer.name}</span>
        </h1>

        <button
          onClick={() => router.push('/volunteer/add-info')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg
          bg-blue-600 text-white hover:bg-blue-700 transition font-medium shadow-sm"
        >
          <Pencil size={16} />
          Edit Profile
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Avatar */}
        <div className="flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-full overflow-hidden shadow-md mb-4 ring-4 ring-blue-50">
            <img
              src={volunteer.photo || '/avatar-placeholder.png'}
              alt="Volunteer"
              className="w-full h-full object-cover"
            />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">{volunteer.name}</h2>
          <p className="text-gray-500 flex items-center gap-1 mt-1 font-medium">
            <MapPin size={16} />
            {volunteer.country}
          </p>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700 flex items-center gap-2 text-lg">
            <Globe size={20} className="text-blue-500" />
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {volunteer.skills?.length > 0 ? (
              volunteer.skills.map((skill: string, i: number) => (
                <span
                  key={i}
                  className="px-3 py-1.5 text-sm rounded-lg
                  bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400 italic">No skills listed</p>
            )}
          </div>
        </div>

        {/* Interests & Languages */}
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-gray-700 mb-3 text-lg">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {volunteer.interests?.length > 0 ? (
                volunteer.interests.map((interest: string, i: number) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm rounded-lg
                    bg-purple-50 text-purple-700 font-semibold border border-purple-100"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-gray-400 italic">No interests listed</p>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-gray-700 mb-2 flex items-center gap-2 text-lg">
              <Languages size={20} className="text-green-500" />
              Languages
            </h3>
            <p className="text-gray-600 font-medium">
              {volunteer.languages?.length > 0 ? volunteer.languages.join(', ') : 'None listed'}
            </p>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Briefcase className="text-yellow-500" />
          My Applications
        </h2>

        {applications.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-gray-100 text-center">
             <p className="text-gray-400 text-lg">You haven't applied to any programs yet.</p>
             <Link href="/programs" className="inline-block mt-4 text-blue-600 font-bold hover:underline">Browse Programs</Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {applications.map((app: any) => (
              <div key={app.applicationId} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                   <h3 className="text-xl font-bold text-gray-800">
                     <Link href={`/experiences/${app.Program.programId}`} className="hover:text-blue-600 hover:underline">
                        {app.Program.title}
                     </Link>
                   </h3>
                   <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-medium">
                      <span className="flex items-center gap-1"><MapPin size={14}/> {app.Program.location}</span>
                      <span className="px-2 py-0.5 bg-gray-100 rounded text-xs uppercase tracking-wide">{app.Program.category}</span>
                   </div>
                </div>

                <div className={`px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider ${
                  app.status === 'accepted' ? 'bg-green-100 text-green-700' :
                  app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {app.status}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
