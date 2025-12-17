'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaClipboardList, FaUsers, FaStar, FaDollarSign, FaCog, FaTrash } from 'react-icons/fa';

interface Program {
  programId: number;
  title: string;
  description: string;
  category: string;
  location?: string;
  duration?: string;
  maxVolunteers?: number;
  isActive: boolean;
}

interface Application {
  applicationId: number;
  status: string;
  User: {
    id: number;
    name: string;
    email: string;
  };
  Program: {
    programId: number;
    title: string;
    category: string;
  };
}

export default function HostDashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState('Manage Listings');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  // create program form
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [duration, setDuration] = useState('');
  const [maxVolunteers, setMaxVolunteers] = useState<number>(0);

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  // ================= AUTH CHECK =================
  useEffect(() => {
    if (!token || role !== 'host') {
      router.replace('/user/login');
    }
  }, [token, role, router]);

  // ================= FETCH PROGRAMS =================
  const fetchPrograms = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/seeAllPrograms`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (res.ok) setPrograms(data.data.programs);
  };

  const fetchApplications = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/seeApplications`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await res.json();
    if (res.ok) setApplications(data.data.applications);
  };

  useEffect(() => {
    if (activeTab === 'Manage Listings') fetchPrograms();
    if (activeTab === 'Applications') fetchApplications();
  }, [activeTab]);

  const handleCreateProgram = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('location', location);
    formData.append('duration', duration);
    formData.append('maxVolunteers', String(maxVolunteers));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/addNewProgram`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const data = await res.json();
    if (res.ok) {
      setPrograms(prev => [data.data.program, ...prev]);
      setActiveTab('Manage Listings');
      setTitle('');
      setDescription('');
      setCategory('');
      setLocation('');
      setDuration('');
      setMaxVolunteers(0);
    } else {
      alert(data.message);
    }
  };

  const handleDeleteProgram = async (programId: number) => {
    if (!confirm('Delete this program?')) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/deleteProgram/${programId}`,
      {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.ok) {
      setPrograms(prev => prev.filter(p => p.programId !== programId));
    }
  };

  const updateApplicationStatus = async (applicationId: number, status: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/updateApplicationStatus/${applicationId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (res.ok) fetchApplications();
  };

  const handleLogout = () => {
    localStorage.clear();
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
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-6 text-center">Host Dashboard</h2>
        <ul className="flex-1">
          {menuItems.map(item => (
            <li
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-2 p-2 mb-2 cursor-pointer rounded ${
                activeTab === item.name ? 'bg-indigo-600 text-white' : 'hover:bg-indigo-50'
              }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
        <button onClick={handleLogout} className="mt-6 w-full bg-red-500 text-white py-2 rounded">
          Logout
        </button>
      </aside>

      <main className="flex-1 p-8">
        {activeTab === 'Post New Opportunity' && (
          <div className="max-w-xl bg-white p-6 rounded shadow">
            <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="input" />
            <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="input" />
            <input placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} className="input" />
            <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="input" />
            <input placeholder="Duration" value={duration} onChange={e => setDuration(e.target.value)} className="input" />
            <input type="number" placeholder="Max Volunteers" value={maxVolunteers} onChange={e => setMaxVolunteers(+e.target.value)} className="input" />
            <button onClick={handleCreateProgram} className="btn-primary">Create Program</button>
          </div>
        )}

        {activeTab === 'Manage Listings' && (
          <div className="grid grid-cols-3 gap-6">
            {programs.map(p => (
              <div key={p.programId} className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">{p.title}</h3>
                <p>{p.description}</p>
                <button onClick={() => handleDeleteProgram(p.programId)} className="text-red-500 flex items-center gap-1">
                  <FaTrash /> Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Applications' && (
          <div className="space-y-4">
            {applications.map(app => (
              <div key={app.applicationId} className="bg-white p-4 rounded shadow">
                <p>{app.User.name} → {app.Program.title}</p>
                <p>Status: {app.status}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => updateApplicationStatus(app.applicationId, 'accepted')} className="btn-success">Accept</button>
                  <button onClick={() => updateApplicationStatus(app.applicationId, 'rejected')} className="btn-danger">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
