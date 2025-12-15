'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Program {
  id: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  volunteersCount?: number;
  impactHours?: number;
}

export default function HostDashboard() {
  const router = useRouter();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [activeTab, setActiveTab] = useState('Manage Listings');

  // Form state for new program
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [impactHours, setImpactHours] = useState(0);

  // Get token and role from localStorage
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const role =
    typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // Redirect if not logged in or not a host
  useEffect(() => {
    if (!token || role !== 'host') {
      router.replace('/user/login');
    }
  }, [token, role, router]);

  // Fetch programs for "Manage Listings" tab
  useEffect(() => {
    if (!token || activeTab !== 'Manage Listings') return;

    const fetchPrograms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`, {
          headers: { Authorization: `Bearer ${token}` },
          credentials: 'include',
        });
        const data = await res.json();
        setPrograms(data);
      } catch (err) {
        console.error('Error fetching programs:', err);
      }
    };
    fetchPrograms();
  }, [token, activeTab]);

  // Create new program
  const handleCreateProgram = async () => {
    if (!title || !description) {
      alert('Title and Description are required');
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: JSON.stringify({
          title,
          description,
          category,
          location,
          volunteersCount: Number(volunteersCount),
          impactHours: Number(impactHours),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Program created!');
        setPrograms([...programs, data]);
        // Clear form
        setTitle('');
        setDescription('');
        setCategory('');
        setLocation('');
        setVolunteersCount(0);
        setImpactHours(0);
        setActiveTab('Manage Listings');
      } else {
        alert(data.error || 'Error creating program');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating program');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    router.push('/user/login');
  };

  // Sidebar menu
  const menuItems = [
    'Post New Opportunity',
    'Manage Listings',
    'Applications',
    'Reviews',
    'Payout Reports',
    'Settings',
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-6 border-r">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Host Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Logout
          </button>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveTab(item)}
              className={`cursor-pointer mb-2 p-2 rounded-md font-medium transition-colors ${
                activeTab === item
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-indigo-50 text-gray-700'
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {/* Post New Opportunity */}
        {activeTab === 'Post New Opportunity' && (
          <div className="bg-white p-6 rounded shadow-md max-w-lg">
            <h1 className="text-2xl font-bold mb-4">Post New Opportunity</h1>
            <input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 mb-2 w-full rounded"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              placeholder="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              placeholder="Volunteers Needed"
              type="number"
              value={volunteersCount}
              onChange={(e) => setVolunteersCount(Number(e.target.value))}
              className="border p-2 mb-2 w-full rounded"
            />
            <input
              placeholder="Impact Hours"
              type="number"
              value={impactHours}
              onChange={(e) => setImpactHours(Number(e.target.value))}
              className="border p-2 mb-4 w-full rounded"
            />
            <button
              onClick={handleCreateProgram}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Create Program
            </button>
          </div>
        )}

        {/* Manage Listings */}
        {activeTab === 'Manage Listings' && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Manage Listings</h1>
            {programs.length === 0 ? (
              <p className="text-gray-500">No programs found.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {programs.map((p) => (
                  <div
                    key={p.id}
                    className="border p-4 rounded bg-white shadow-sm"
                  >
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-gray-700">{p.description}</p>
                    <p className="text-sm text-gray-500">
                      Category: {p.category || 'N/A'} | Location:{' '}
                      {p.location || 'N/A'} | Volunteers Needed: {p.volunteersCount}{' '}
                      | Impact Hours: {p.impactHours}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Applications */}
        {activeTab === 'Applications' && (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Applications</h1>
            <p className="text-gray-500">No applications yet.</p>
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'Reviews' && (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Reviews</h1>
            <p className="text-gray-500">No reviews yet.</p>
          </div>
        )}

        {/* Payout Reports */}
        {activeTab === 'Payout Reports' && (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Payout Reports</h1>
            <p className="text-gray-500">No payout reports available.</p>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'Settings' && (
          <div className="bg-white p-6 rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4">Settings</h1>
            <p className="text-gray-500">Update your dashboard settings here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
