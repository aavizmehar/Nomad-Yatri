'use client';
import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaPlus, FaClipboardList, FaUsers, FaStar, 
  FaCog, FaTrash, FaBars, FaChevronLeft, FaSignOutAlt 
} from 'react-icons/fa';
import { Program } from '@/types/program';
import { PROGRAM_CATEGORIES, CATEGORY_SUBCATEGORIES } from '@/constants/programCategories';
import { AuthContext } from '@/context/AuthContext';
import { dashboardApi } from '@/lib/api/dashboard.api';

// ... (Interfaces remain the same)
interface Application {
  applicationId: number;
  status: string;
  User: { id: number; name: string; email: string; };
  Program: { programId: number; title: string; category: string; };
}

export default function HostDashboard() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  // UI States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
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
  const [hostName, setHostName] = useState<string>('Host');

  const selectedCategory = formData.category;
  const availableSubCategories = CATEGORY_SUBCATEGORIES[selectedCategory] || [];
  const hasSubCategories = availableSubCategories.length > 0;

  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

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

  const fetchPrograms = async () => {
    try {
      const res = await dashboardApi.getHostPrograms();
      setPrograms(res.data.programs || []);
    } catch (err) { console.error(err); }
  };

  const fetchApplications = async () => {
    try {
      const res = await dashboardApi.getHostApplications();
      setApplications(res.data.applications || []);
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    if (activeTab === 'Manage Listings') fetchPrograms();
    if (activeTab === 'Applications') fetchApplications();
  }, [activeTab]);

  const handleCreateProgram = async () => {
    try {
      if (programImages.length === 0) { alert("Please upload at least one image"); return; }
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => fd.append(key, String(value)));
      programImages.forEach(img => fd.append("programImages", img));
      const res = await dashboardApi.createProgram(fd);
      setPrograms(prev => [res.data.program, ...prev]);
      setActiveTab("Manage Listings");
      setFormData({ title: '', description: '', category: '', subCategory: '', location: '', duration: '', maxVolunteers: 0 });
      setProgramImages([]);
    } catch (err: any) { alert(err.message); }
  };

  const handleDeleteProgram = async (programId: number) => {
    if (!confirm('Delete this program?')) return;
    try {
      await dashboardApi.deleteProgram(programId);
      setPrograms(prev => prev.filter(p => p.programId !== programId));
    } catch (err) { console.error(err); }
  };

  const updateApplicationStatus = async (applicationId: number, status: "accepted" | "rejected") => {
    try {
      await dashboardApi.updateApplicationStatus(applicationId, status);
      fetchApplications();
    } catch (err) { console.error(err); }
  };

  const menuItems = [
    { name: 'Post New Opportunity', icon: <FaPlus /> },
    { name: 'Manage Listings', icon: <FaClipboardList /> },
    { name: 'Applications', icon: <FaUsers /> },
    { name: 'Reviews', icon: <FaStar /> },
    { name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        bg-white border-r border-slate-200 
        transition-all duration-300 ease-in-out
        flex flex-col
        ${isSidebarCollapsed ? 'w-20' : 'w-72'}
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-6 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <div className="overflow-hidden">
              <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-500">Host Portal</p>
              <h2 className="text-xl font-black text-slate-800 truncate">{hostName}</h2>
            </div>
          )}
          <button 
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 text-slate-400"
          >
            <FaChevronLeft className={`transition-transform duration-300 ${isSidebarCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2">
          {menuItems.map(item => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 p-3 rounded-xl font-semibold transition-all group
                ${activeTab === item.name 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'}
              `}
            >
              <span className="text-lg">{item.icon}</span>
              {!isSidebarCollapsed && <span className="whitespace-nowrap">{item.name}</span>}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={handleLogout}
            className={`
              flex items-center gap-4 w-full p-3 rounded-xl text-red-500 font-bold 
              hover:bg-red-50 transition-colors
              ${isSidebarCollapsed ? 'justify-center' : ''}
            `}
          >
            <FaSignOutAlt />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header (Mobile Only) */}
        <header className="lg:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <h1 className="font-bold text-slate-800 uppercase tracking-tight">Dashboard</h1>
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 text-slate-600"
          >
            <FaBars size={24} />
          </button>
        </header>

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12">
          <div className="max-w-6xl mx-auto">
            
            {/* Tab Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900">{activeTab}</h1>
              <p className="text-slate-500 mt-1">Manage your volunteering opportunities and community.</p>
            </div>

            {/* MANAGE LISTINGS GRID */}
            {activeTab === 'Manage Listings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {programs.length > 0 ? programs.map(p => (
                  <div key={p.programId} className="group bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase rounded-full tracking-wider">
                          {p.category}
                        </span>
                        <h3 className="font-bold text-xl mt-3 text-slate-800 group-hover:text-indigo-600 transition-colors">{p.title}</h3>
                        <p className="text-slate-500 text-sm mt-3 line-clamp-3 leading-relaxed">{p.description}</p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-xs text-slate-400 font-medium">Location</span>
                          <span className="text-sm font-bold text-slate-700">{p.location}</span>
                        </div>
                        <button 
                          onClick={() => handleDeleteProgram(p.programId)} 
                          className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-all"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium">No programs found. Start by posting one!</p>
                  </div>
                )}
              </div>
            )}

            {/* POST NEW OPPORTUNITY FORM */}
            {activeTab === 'Post New Opportunity' && (
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Program Title</label>
                    <input
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-300"
                      placeholder="e.g. Teaching English in the Himalayas"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Main Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={(e) => {
                        handleInputChange(e);
                        setFormData(prev => ({ ...prev, subCategory: '' }));
                      }}
                      className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    >
                      <option value="">Choose one</option>
                      {Object.values(PROGRAM_CATEGORIES).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {hasSubCategories && (
                    <div className="animate-in fade-in zoom-in-95">
                      <label className="text-sm font-bold text-slate-700 ml-1">Specific Type</label>
                      <select
                        name="subCategory"
                        value={formData.subCategory}
                        onChange={handleInputChange}
                        className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      >
                        <option value="">Select sub-category</option>
                        {availableSubCategories.map(sub => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className={!hasSubCategories ? "md:col-span-1" : ""}>
                    <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="City, India"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Duration</label>
                    <input
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                      placeholder="e.g. 2 weeks"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Max Volunteers</label>
                    <input
                      type="number"
                      name="maxVolunteers"
                      value={formData.maxVolunteers}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl h-40 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none"
                      placeholder="Describe the tasks, environment, and volunteer benefits..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Program Images</label>
                    <div className="mt-2 flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
                          <FaPlus className="mb-2" />
                          <p className="text-sm">Click to upload images</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => {
                            if (!e.target.files) return;
                            setProgramImages(Array.from(e.target.files));
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>
                    {programImages.length > 0 && (
                      <p className="mt-2 text-xs text-indigo-500 font-bold">{programImages.length} images selected</p>
                    )}
                  </div>

                  <div className="md:col-span-2 pt-4">
                    <button
                      onClick={handleCreateProgram}
                      className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-[0.98]"
                    >
                      Publish Opportunity
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* APPLICATIONS */}
            {activeTab === 'Applications' && (
              <div className="space-y-4">
                {applications.length > 0 ? applications.map(app => (
                  <div key={app.applicationId} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-lg text-slate-800">
                        {app.User.name} <span className="font-medium text-slate-400">applied for</span> {app.Program.title}
                      </h4>
                      <p className="text-sm text-slate-500 font-medium">{app.User.email}</p>
                      <div className={`inline-flex mt-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {app.status}
                      </div>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                      <button 
                        onClick={() => updateApplicationStatus(app.applicationId, 'accepted')} 
                        className="flex-1 sm:flex-none bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                      >
                        Accept
                      </button>
                      <button 
                        onClick={() => updateApplicationStatus(app.applicationId, 'rejected')} 
                        className="flex-1 sm:flex-none bg-white text-red-500 border border-red-100 px-6 py-2.5 rounded-xl font-bold hover:bg-red-50 transition-all"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )) : (
                  <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
                    <p className="text-slate-400 font-medium">No applications yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* SETTINGS (Simplified for UI brevity) */}
            {activeTab === 'Settings' && (
              <div className="max-w-xl bg-white p-10 rounded-[2.5rem] border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800">Account Preferences</h3>
                <p className="text-slate-500 mt-2 mb-8">Manage your credentials and global application settings.</p>
                <div className="space-y-4">
                   <div className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                      <span className="font-bold text-slate-700">Account Security</span>
                      <button className="text-indigo-600 font-bold text-sm">Update</button>
                   </div>
                   <button onClick={handleLogout} className="w-full mt-8 bg-red-50 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-100 transition-all">
                    Sign Out of All Sessions
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}