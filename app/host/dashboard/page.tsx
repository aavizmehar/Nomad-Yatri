'use client';

import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { FaPlus, FaClipboardList, FaUsers, FaStar, FaCog, FaTrash } from 'react-icons/fa';
import { Program } from '@/types/program';
import { PROGRAM_CATEGORIES, CATEGORY_SUBCATEGORIES } from '@/constants/programCategories';
import { AuthContext } from '@/context/AuthContext';
import { dashboardApi } from '@/lib/api/dashboard.api';

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
  const { logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    location: '',
    duration: '',
    maxVolunteers: 0
  });
  const [programImages, setProgramImages] = useState<File[]>([]);

  const [activeTab, setActiveTab] = useState('Manage Listings');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  const selectedCategory = formData.category;
  const availableSubCategories = CATEGORY_SUBCATEGORIES[selectedCategory] || [];
  const hasSubCategories = availableSubCategories.length > 0;

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  const [hostName, setHostName] = useState<string>('Host');

  // Fetch host profile
  const fetchHostProfile = async () => {
    try {
      const res = await dashboardApi.getMyHostProfile();
      setHostName(res.data.name);
    } catch (err) {
      console.error("Failed to fetch host profile", err);
    }
  };

  useEffect(() => {
    if (!token || role !== 'host') {
      router.replace('/user/login');
    } else {
      fetchHostProfile();
    }
  }, [token, role]);

  const handleLogout = () => {
    logout();
    router.push('/user/login');
    router.refresh();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Fetch host programs
  const fetchPrograms = async () => {
    try {
      const res = await dashboardApi.getHostPrograms();
      setPrograms(res.data.programs || []);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await dashboardApi.getHostApplications();
      setApplications(res.data.applications || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === 'Manage Listings') fetchPrograms();
    if (activeTab === 'Applications') fetchApplications();
  }, [activeTab]);

  // Create new program
  const handleCreateProgram = async () => {
    try {
      if (programImages.length === 0) {
        alert("Please upload at least one image");
        return;
      }

      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        fd.append(key, String(value));
      });
      programImages.forEach(img => fd.append("programImages", img));

      const res = await dashboardApi.createProgram(fd);

      setPrograms(prev => [res.data.program, ...prev]);
      setActiveTab("Manage Listings");

      setFormData({
        title: '',
        description: '',
        category: '',
        subCategory: '',
        location: '',
        duration: '',
        maxVolunteers: 0,
      });
      setProgramImages([]);

    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete program
  const handleDeleteProgram = async (programId: number) => {
    if (!confirm('Delete this program?')) return;
    try {
      await dashboardApi.deleteProgram(programId);
      setPrograms(prev => prev.filter(p => p.programId !== programId));
    } catch (err) {
      console.error(err);
    }
  };

  // Update application status
  const updateApplicationStatus = async (applicationId: number, status: "accepted" | "rejected") => {
    try {
      await dashboardApi.updateApplicationStatus(applicationId, status);
      fetchApplications();
    } catch (err) {
      console.error(err);
    }
  };

  const menuItems = [
    { name: 'Post New Opportunity', icon: <FaPlus /> },
    { name: 'Manage Listings', icon: <FaClipboardList /> },
    { name: 'Applications', icon: <FaUsers /> },
    { name: 'Reviews', icon: <FaStar /> },
    { name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 shadow-sm flex flex-col">
        <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold">Welcome Back,</p>
        <h2 className="text-xl font-extrabold text-indigo-700 truncate px-2">{hostName}</h2>
        <ul className="flex-1">
          {menuItems.map(item => (
            <li
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`flex items-center gap-2 p-3 mb-2 cursor-pointer rounded-lg font-medium transition ${activeTab === item.name ? 'bg-indigo-600 text-white shadow-md' : 'hover:bg-indigo-50 text-gray-600'
                }`}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-lg font-bold hover:bg-red-600 transition shadow-sm active:scale-95"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'Post New Opportunity' && (
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Opportunity Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Program Title</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. Teaching English in the Himalayas"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Main Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={(e) => {
                    handleInputChange(e);
                    setFormData(prev => ({ ...prev, subCategory: '' }));
                  }}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="">Choose one</option>
                  {Object.values(PROGRAM_CATEGORIES).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {hasSubCategories && (
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Specific Type</label>
                  <select
                    name="subCategory"
                    value={formData.subCategory}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    <option value="">Select sub-category</option>
                    {availableSubCategories.map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className={!hasSubCategories ? "md:col-span-1" : ""}>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="City, India"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration</label>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. 2 weeks"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Max Volunteers</label>
                <input
                  type="number"
                  name="maxVolunteers"
                  value={formData.maxVolunteers}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-gray-50 border rounded-xl h-32 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="Describe tasks and benefits..."
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  Program Images
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => {
                    if (!e.target.files) return;
                    setProgramImages(Array.from(e.target.files));
                  }}
                  className="w-full p-3 bg-gray-50 border rounded-xl outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  onClick={handleCreateProgram}
                  className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-indigo-700 transition shadow-lg active:scale-95"
                >
                  Publish Opportunity
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Manage Listings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(p => (
              <div key={p.programId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4">{p.description}</p>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-xs font-bold text-indigo-600 uppercase">{p.category}</span>
                  <button onClick={() => handleDeleteProgram(p.programId)} className="text-red-500 hover:bg-red-50 p-2 rounded-full transition">
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Applications' && (
          <div className="grid grid-cols-1 gap-4">
            {applications.map(app => (
              <div key={app.applicationId} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="font-bold text-gray-800">{app.User.name} <span className="font-normal text-gray-500">applied for</span> {app.Program.title}</p>
                  <p className="text-sm text-gray-500">{app.User.email}</p>
                  <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase ${app.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{app.status}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => updateApplicationStatus(app.applicationId, 'accepted')} className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition">Accept</button>
                  <button onClick={() => updateApplicationStatus(app.applicationId, 'rejected')} className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition">Reject</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'Settings' && (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h2 className="text-xl font-bold mb-6">Settings</h2>
            <p className="text-gray-500 mb-4">Here you can update your account settings, change password, and manage preferences.</p>
            <button onClick={handleLogout} className="bg-red-500 text-white py-3 px-6 rounded-lg font-bold hover:bg-red-600 transition">Logout</button>
          </div>
        )}
      </main>
    </div>
  );
}
