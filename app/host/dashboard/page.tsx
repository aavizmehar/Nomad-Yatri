'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaClipboardList, FaUsers, FaStar, FaDollarSign, FaCog } from 'react-icons/fa';

interface Program {
  id: number;
  title: string;
  description: string;
  category?: string;
  location?: string;
  volunteersCount?: number;
  impactHours?: number;
}

interface Application {
  id: number;
  user: { id: number; name: string; email: string };
  program: Program;
  status?: string;
}

export default function HostDashboard() {
  const router = useRouter();

  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [activeTab, setActiveTab] = useState('Manage Listings');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [volunteersCount, setVolunteersCount] = useState(0);
  const [impactHours, setImpactHours] = useState(0);

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  useEffect(() => {
    if (!token || role !== 'host') router.replace('/user/login');
  }, [token, role, router]);

  const fetchPrograms = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/seeAllPrograms`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) setPrograms(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/seeApplications`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await res.json();
      if (res.ok) setApplications(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'Manage Listings') fetchPrograms();
    if (activeTab === 'Applications') fetchApplications();
  }, [activeTab]);

  const handleCreateProgram = async () => {
    if (!title || !description || !category) {
      alert('Title, Description, and Category are required');
      return;
    }
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/addNewProgram`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title,
            description,
            category,
            location,
            volunteersCount,
            impactHours,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        alert('Program created successfully!');
        setPrograms((prev) => [...prev, data.data.program]);
        setTitle('');
        setDescription('');
        setCategory('');
        setLocation('');
        setVolunteersCount(0);
        setImpactHours(0);
        setActiveTab('Manage Listings');
      } else {
        alert(data.message || 'Error creating program');
      }
    } catch (err) {
      console.error(err);
      alert('Error creating program');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    router.push('/user/login');
  };

  const menuItems = [
    { name: 'Post New Opportunity', icon: <FaPlus /> },
    { name: 'Manage Listings', icon: <FaClipboardList /> },
    { name: 'Applications', icon: <FaUsers /> },
    { name: 'Reviews', icon: <FaStar /> },
    { name: 'Payout Reports', icon: <FaDollarSign /> },
    { name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-md p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Host Dashboard</h2>
        <ul className="flex-1">
          {menuItems.map((item) => (
            <li
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-2 cursor-pointer mb-3 p-2 rounded-md transition-colors ${
                activeTab === item.name
                  ? 'bg-indigo-600 text-white'
                  : 'hover:bg-indigo-50 text-gray-700'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        {/* Post New Opportunity */}
        {activeTab === 'Post New Opportunity' && (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold text-indigo-700 mb-4">Post New Opportunity</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Volunteers Needed</label>
                  <input
                    type="number"
                    value={volunteersCount}
                    onChange={(e) => setVolunteersCount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-1">Impact Hours</label>
                  <input
                    type="number"
                    value={impactHours}
                    onChange={(e) => setImpactHours(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <button
                onClick={handleCreateProgram}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
              >
                Create Program
              </button>
            </div>
          </div>
        )}

        {/* Manage Listings */}
        {activeTab === 'Manage Listings' && (
          <div>
            <h1 className="text-2xl font-bold text-indigo-700 mb-6">Manage Listings</h1>
            {programs.length === 0 ? (
              <p className="text-gray-500 text-center">No programs found.</p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((p) => (
                  <div
                    key={p.id}
                    className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{p.title}</h3>
                    <p className="text-gray-600 mb-3">{p.description}</p>
                    <div className="text-sm text-gray-500">
                      <p>Category: {p.category || 'N/A'}</p>
                      <p>Location: {p.location || 'N/A'}</p>
                      <p>Volunteers Needed: {p.volunteersCount || 0}</p>
                      <p>Impact Hours: {p.impactHours || 0}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Applications */}
        {activeTab === 'Applications' && (
          <div>
            <h1 className="text-2xl font-bold text-indigo-700 mb-6">Applications</h1>
            {applications.length === 0 ? (
              <p className="text-gray-500 text-center">No applications yet.</p>
            ) : (
              <div className="space-y-4">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
                  >
                    <p>
                      <span className="font-semibold">User:</span> {app.user.name} ({app.user.email})
                    </p>
                    <p>
                      <span className="font-semibold">Program:</span> {app.program.title}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span> {app.status || 'Pending'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Reviews */}
        {activeTab === 'Reviews' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-indigo-700 mb-4">Reviews</h1>
            <p className="text-gray-500 text-center">No reviews yet.</p>
          </div>
        )}

        {/* Payout Reports */}
        {activeTab === 'Payout Reports' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-indigo-700 mb-4">Payout Reports</h1>
            <p className="text-gray-500 text-center">No payout reports available.</p>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'Settings' && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-indigo-700 mb-4">Settings</h1>
            <p className="text-gray-500 text-center">Update your dashboard settings here.</p>
          </div>
        )}
      </main>
    </div>
  );
}
