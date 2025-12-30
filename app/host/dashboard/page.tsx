'use client';
import { useEffect, useState, ChangeEvent, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FaPlus, FaClipboardList, FaUsers, FaStar, 
  FaCog, FaTrash, FaBars, FaChevronLeft, FaSignOutAlt, FaTimes, FaGlobe, FaLanguage, FaLightbulb, FaEdit 
} from 'react-icons/fa';
import { Program } from '@/types/program';
import { PROGRAM_CATEGORIES, CATEGORY_SUBCATEGORIES } from '@/constants/programCategories';
import { AuthContext } from '@/context/AuthContext';
import { dashboardApi } from '@/lib/api/dashboard.api';
import { useDialog } from '@/hooks/useDialog';

interface Application {
  applicationId: number;
  status: string;
  User: { 
    id: number; 
    email: string; 
    Volunteer?: {
      name: string;
      photo?: string;
      country?: string;
      age?: number;
      skills?: string[];
      interests?: string[];
      languages?: string[];
    }
  };
  Program: { programId: number; title: string; category: string; };
}

export default function HostDashboard() {
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  // UI States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any>(null);
  const [isEditingProgram, setIsEditingProgram] = useState(false);
  const [editingProgramId, setEditingProgramId] = useState<number | null>(null);
  
  // Dialog State
  const { showDialog, DialogComponent } = useDialog();
  
  // Data States
  const [hostProfile, setHostProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('Manage Listings');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [hostName, setHostName] = useState<string>('Host');

  // Form States
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

  // Profile Form State
  const [profileForm, setProfileForm] = useState({
    name: '',
    propertyName: '',
    location: '',
    acomodationType: '',
    meals: '',
    workRequired: '',
    capacity: '',
    contact: ''
  });
  const [profileImages, setProfileImages] = useState<File[]>([]);

  const selectedCategory = formData.category;
  const availableSubCategories = CATEGORY_SUBCATEGORIES[selectedCategory] || [];
  const hasSubCategories = availableSubCategories.length > 0;

  const fetchHostProfile = async () => {
    try {
      const res = await dashboardApi.getMyHostProfile();
      const profile = res.data;
      setHostProfile(profile);
      setHostName(profile.name);
      setProfileForm({
        name: profile.name || '',
        propertyName: profile.propertyName || '',
        location: profile.location || '',
        acomodationType: profile.acomodationType || '',
        meals: profile.meals || '',
        workRequired: profile.workRequired || '',
        capacity: profile.capacity || '',
        contact: profile.contact || ''
      });
    } catch (err) {
      console.error("Failed to fetch host profile", err);
    }
  };

  useEffect(() => {
    fetchHostProfile();
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/user/login');
    router.refresh();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
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

  const handleCreateOrUpdateProgram = async () => {
    try {
      if (programImages.length === 0 && !isEditingProgram) { 
        showDialog("Missing Information", "Please upload at least one image", "warning"); 
        return; 
      }
      
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => fd.append(key, String(value)));
      programImages.forEach(img => fd.append("programImages", img));

      let response;
      if (isEditingProgram && editingProgramId) {
        response = await dashboardApi.updateProgram(editingProgramId, fd);
        if (response.success) {
            showDialog("Success", "Program updated successfully!", "success");
            setIsEditingProgram(false);
            setEditingProgramId(null);
        } else {
            throw new Error(response.message || "Failed to update program");
        }
      } else {
        response = await dashboardApi.createProgram(fd);
        if (response.success) {
            showDialog("Success", "Program created successfully!", "success");
        } else {
             throw new Error(response.message || "Failed to create program");
        }
      }

      // Reset & Refresh
      setFormData({ title: '', description: '', category: '', subCategory: '', location: '', duration: '', maxVolunteers: 0 });
      setProgramImages([]);
      setActiveTab("Manage Listings");
      fetchPrograms();
    } catch (err: any) { 
        showDialog("Error", err.message, "error"); 
    }
  };

  const startEditProgram = (program: Program) => {
    setFormData({
      title: program.title,
      description: program.description,
      category: program.category,
      subCategory: program.subCategory || '',
      location: program.location ||'',
      duration: program.duration || '',
      maxVolunteers: program.maxVolunteers || 0
    });
    setEditingProgramId(program.programId);
    setIsEditingProgram(true);
    setActiveTab('Post New Opportunity');
  };

  const executeDeleteProgram = async (programId: number) => {
    try {
      await dashboardApi.deleteProgram(programId);
      setPrograms(prev => prev.filter(p => p.programId !== programId));
      showDialog("Deleted", "Program has been deleted successfully", "success");
    } catch (err: any) { 
        console.error(err); 
        showDialog("Error", "Failed to delete program", "error");
    }
  };

  const confirmDeleteProgram = (programId: number) => {
    showDialog(
        "Delete Program?", 
        "Are you sure you want to delete this program? This action cannot be undone.", 
        "confirm", 
        () => executeDeleteProgram(programId)
    );
  };

  const handleUpdateProfile = async () => {
    try {
      const fd = new FormData();
      Object.entries(profileForm).forEach(([key, value]) => fd.append(key, String(value)));
      profileImages.forEach(img => fd.append("propertyImages", img));

      await dashboardApi.updateHostProfile(fd);
      showDialog("Success", "Profile updated successfully!", "success");
      fetchHostProfile();
    } catch (err: any) {
      showDialog("Error", "Failed to update profile: " + err.message, "error");
    }
  };

  const executeUpdateApplicationStatus = async (applicationId: number, status: "accepted" | "rejected") => {
    try {
      await dashboardApi.updateApplicationStatus(applicationId, status);
      fetchApplications();
      showDialog("Success", `Application ${status} successfully`, "success");
    } catch (err) { console.error(err); }
  };

  const confirmUpdateApplicationStatus = (applicationId: number, status: "accepted" | "rejected") => {
      const action = status === 'accepted' ? 'Accept' : 'Reject';
      showDialog(
          `${action} Application?`,
          `Are you sure you want to ${action.toLowerCase()} this application?`,
          "confirm",
          () => executeUpdateApplicationStatus(applicationId, status)
      );
  };

  const menuItems = [
    { name: isEditingProgram ? 'Edit Opportunity' : 'Post New Opportunity', icon: <FaPlus /> },
    { name: 'Manage Listings', icon: <FaClipboardList /> },
    { name: 'Applications', icon: <FaUsers /> },
    { name: 'Profile & Settings', icon: <FaCog /> },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-900 overflow-hidden">
      <DialogComponent />

      {/* MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* VOLUNTEER PROFILE MODAL */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 shadow-2xl relative">
            <button 
              onClick={() => setSelectedVolunteer(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <FaTimes size={20} className="text-slate-400" />
            </button>

            <div className="flex flex-col items-center text-center mb-8">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow-xl">
                 {selectedVolunteer.photo ? (
                    <img src={selectedVolunteer.photo} alt={selectedVolunteer.name} className="w-full h-full object-cover" />
                 ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300 font-bold text-3xl">
                      {selectedVolunteer.name?.charAt(0)}
                    </div>
                 )}
              </div>
              <h2 className="text-3xl font-black text-slate-800">{selectedVolunteer.name}</h2>
              <p className="text-lg text-slate-500 font-medium mt-1">{selectedVolunteer.country} • {selectedVolunteer.age} years old</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-indigo-50/50 p-6 rounded-3xl">
                <h4 className="flex items-center gap-2 font-bold text-indigo-900 mb-4">
                  <FaStar className="text-indigo-500" /> Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVolunteer.skills?.map((s: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white text-indigo-600 rounded-lg text-sm font-bold shadow-sm">{s}</span>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-50/50 p-6 rounded-3xl">
                <h4 className="flex items-center gap-2 font-bold text-emerald-900 mb-4">
                  <FaLightbulb className="text-emerald-500" /> Interests
                </h4>
                 <div className="flex flex-wrap gap-2">
                  {selectedVolunteer.interests?.map((int: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white text-emerald-600 rounded-lg text-sm font-bold shadow-sm">{int}</span>
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-50/50 p-6 rounded-3xl md:col-span-2">
                <h4 className="flex items-center gap-2 font-bold text-amber-900 mb-4">
                  <FaGlobe className="text-amber-500" /> Languages
                </h4>
                <p className="text-amber-800 font-medium">
                  {selectedVolunteer.languages?.join(', ') || "No languages listed"}
                </p>
              </div>
            </div>
            
            <button 
              onClick={() => setSelectedVolunteer(null)}
              className="w-full mt-8 py-4 rounded-2xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
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
                if (item.name === 'Post New Opportunity') {
                  // Reset edit mode if clicking directly
                  setIsEditingProgram(false);
                  setEditingProgramId(null);
                  setFormData({ title: '', description: '', category: '', subCategory: '', location: '', duration: '', maxVolunteers: 0 });
                }
                setActiveTab(isEditingProgram && item.name.includes('Edit') ? 'Post New Opportunity' : item.name);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-4 p-3 rounded-xl font-semibold transition-all group
                ${activeTab === item.name || (activeTab === 'Post New Opportunity' && item.name.includes('Edit'))
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
              <h1 className="text-3xl font-black text-slate-900">
                {activeTab === 'Post New Opportunity' && isEditingProgram ? 'Edit Opportunity' : activeTab}
              </h1>
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
                        <div className="flex gap-2">
                          <button 
                            onClick={() => startEditProgram(p)} 
                            className="w-10 h-10 flex items-center justify-center text-indigo-400 hover:bg-indigo-50 hover:text-indigo-600 rounded-full transition-all"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => confirmDeleteProgram(p.programId)} 
                            className="w-10 h-10 flex items-center justify-center text-red-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-all"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-200">
                    <p className="text-slate-400 font-medium">No programs found. Start by posting one!</p>
                  </div>
                )}
              </div>
            )}

            {/* POST/EDIT OPPORTUNITY FORM */}
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
                    <label className="text-sm font-bold text-slate-700 ml-1">Program Images (Optional for Edit)</label>
                    <div className="mt-2 flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-2xl cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-all">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-400">
                          <FaPlus className="mb-2" />
                          <p className="text-sm">Click to upload new images</p>
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
                      onClick={handleCreateOrUpdateProgram}
                      className="w-full bg-indigo-600 text-white font-black py-5 rounded-2xl hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-[0.98]"
                    >
                      {isEditingProgram ? 'Update Opportunity' : 'Publish Opportunity'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* APPLICATIONS */}
            {activeTab === 'Applications' && (
              <div className="space-y-4">
                {applications.length > 0 ? applications.map(app => (
                  <div key={app.applicationId} className="bg-white p-6 rounded-3xl border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-indigo-200 transition-colors">
                    <div className="flex gap-4 items-center flex-1">
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-md">
                         {app.User.Volunteer?.photo ? (
                            <img src={app.User.Volunteer.photo} alt="Volunteer" className="w-full h-full object-cover" />
                         ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400 text-xs font-bold">
                              {app.User.Volunteer?.name?.charAt(0) || "?"}
                            </div>
                         )}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg text-slate-800">
                          {app.User.Volunteer?.name || "Unknown Volunteer"} 
                          <span className="font-medium text-slate-400 text-sm ml-2">from {app.User.Volunteer?.country || "Unknown"}</span>
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                          <span className="text-indigo-600 font-bold">{app.Program.title}</span>
                          <span className="text-slate-300">•</span>
                          <span>{app.Program.category}</span>
                        </div>
                        
                        <div className="flex gap-2 mt-2">
                           <div className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' : 
                              app.status === 'rejected' ? 'bg-red-50 text-red-600' :
                              'bg-amber-50 text-amber-600'
                            }`}>
                              {app.status}
                            </div>
                            
                            {/* View Profile Button */}
                            {app.User.Volunteer && (
                              <button 
                                onClick={() => setSelectedVolunteer(app.User.Volunteer)}
                                className="text-xs font-bold text-slate-400 hover:text-indigo-600 hover:underline transition-colors"
                              >
                                View Full Profile
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                    
                    {app.status === 'pending' && (
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button 
                          onClick={() => confirmUpdateApplicationStatus(app.applicationId, 'accepted')} 
                          className="flex-1 sm:flex-none bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 active:scale-95"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => confirmUpdateApplicationStatus(app.applicationId, 'rejected')} 
                          className="flex-1 sm:flex-none bg-white text-red-500 border border-red-100 px-6 py-2.5 rounded-xl font-bold hover:bg-red-50 transition-all active:scale-95"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="py-20 text-center bg-white rounded-3xl border border-slate-200">
                    <p className="text-slate-400 font-medium">No applications yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* PROFILE & SETTINGS */}
            {activeTab === 'Profile & Settings' && (
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-6">Edit Host Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Host Name</label>
                    <input name="name" value={profileForm.name} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Property Name</label>
                    <input name="propertyName" value={profileForm.propertyName} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Location</label>
                    <input name="location" value={profileForm.location} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Accommodation Type</label>
                    <input name="acomodationType" value={profileForm.acomodationType} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Contact</label>
                    <input name="contact" value={profileForm.contact} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-slate-700 ml-1">Capacity</label>
                    <input name="capacity" type="number" value={profileForm.capacity} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Meals Provided</label>
                    <input name="meals" value={profileForm.meals} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Work Required</label>
                    <textarea name="workRequired" value={profileForm.workRequired} onChange={handleProfileChange} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl h-32 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">New Property Images</label>
                    <input type="file" multiple onChange={(e) => e.target.files && setProfileImages(Array.from(e.target.files))} className="w-full mt-2 p-4 bg-slate-50/50 border border-slate-200 rounded-2xl" />
                  </div>
                  <div className="md:col-span-2">
                    <button onClick={handleUpdateProfile} className="w-full bg-indigo-600 text-white font-bold py-4 rounded-2xl hover:bg-indigo-700 transition-all">Update Profile</button>
                  </div>
                </div>
                
                <div className="mt-12 pt-8 border-t border-slate-100">
                   <h3 className="text-lg font-bold text-slate-800 mb-4">Account Actions</h3>
                   <button onClick={handleLogout} className="text-red-500 font-bold hover:underline">Sign Out of All Sessions</button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}