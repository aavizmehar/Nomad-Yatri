'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useDialog } from '@/hooks/useDialog';

// --- TYPES & INTERFACES ---
interface User {
  id: number;
  email: string;
  role: string;
  createdAt: string;
  Host?: { propertyName: string; contact?: string }; // Added contact here
  Volunteer?: { name: string; contact?: string };
}

interface Host {
  hostId: number;
  name: string;
  propertyName: string;
  verified: boolean;
}

interface Program {
  id: number;
  title: string;
  category: string;
  location: string;
  isActive: boolean;
  createdAt: string;
}

interface Stats {
  totalUsers: number;
  totalHosts: number;
  totalPrograms: number;
}

export default function AdminDashboard() {
  const router = useRouter();

  const [mounted, setMounted] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Dialog State
  const { showDialog, DialogComponent } = useDialog();

  const [data, setData] = useState<{ users: User[]; hosts: Host[]; programs: Program[] }>({
    users: [],
    hosts: [],
    programs: [],
  });

  const [stats, setStats] = useState<Stats>({
    totalUsers: 0,
    totalHosts: 0,
    totalPrograms: 0,
  });

  // Filter States
  const [userRoleFilter, setUserRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('DESC');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Read localStorage ONLY after mount
  useEffect(() => {
    setMounted(true);
    setToken(localStorage.getItem('accessToken'));
    setRole(localStorage.getItem('role'));
  }, []);

  const fetchData = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;

      // Build query strings
      const userParams = new URLSearchParams({
        role: userRoleFilter,
        sortBy: sortBy,
        order: sortOrder
      });

      const programParams = new URLSearchParams({
        sortBy: sortBy,
        order: sortOrder
      });

      const [resStats, resUsers, resPrograms] = await Promise.all([
        fetch(`${baseUrl}/admin/dashboard-stats`, { headers }),
        fetch(`${baseUrl}/admin/users?${userParams.toString()}`, { headers }),
        fetch(`${baseUrl}/admin/programs?${programParams.toString()}`, { headers }),
      ]);

      const jsonStats = await resStats.json();
      const jsonUsers = await resUsers.json();
      const jsonPrograms = await resPrograms.json();

      setStats({
        totalUsers: jsonStats.data.totalUsers,
        totalHosts: jsonStats.data.totalHosts,
        totalPrograms: jsonStats.data.totalPrograms,
      });

      setData({
        users: jsonUsers.data,
        hosts: jsonUsers.data.filter((u: any) => u.role === 'host'),
        programs: jsonPrograms.data,
      });

    } catch (err) {
      setError('Connection failed. Please check backend.');
    } finally {
      setLoading(false);
    }
  }, [token, userRoleFilter, sortBy, sortOrder]); // Re-fetch when filters change

  useEffect(() => {
    if (token && role === 'admin') {
      fetchData();
    }
  }, [fetchData, token, role]);

  // ✅ HARD GUARDS (hydration-safe)
  if (!mounted) return null;

  if (!token || role !== 'admin') {
    router.replace('/user/login');
    return null;
  }

  // MATCHED WITH: router.route("/programs/:programId/toggle").patch(...)
  const handleToggleProgram = async (programId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/programs/${programId}/toggle`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setData(prev => ({
          ...prev,
          programs: prev.programs.map(p =>
            p.id === programId ? { ...p, isActive: !p.isActive } : p
          ),
        }));
        showDialog("Success", "Program status updated successfully", "success");
      }
    } catch {
      showDialog("Error", 'Toggle failed', "error");
    }
  };

  // MATCHED WITH: router.route("/users/:id").delete(...)
  const executeDeleteUser = async (userId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/users/${userId}`,
        {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.ok) {
        setData(prev => ({
          ...prev,
          users: prev.users.filter(u => u.id !== userId),
        }));
        showDialog("Success", "User deleted successfully", "success");
      } else {
        showDialog("Error", 'Delete failed', "error");
      }
    } catch {
      showDialog("Error", 'Delete failed', "error");
    }
  };

  const confirmDeleteUser = (userId: number) => {
    showDialog(
      "Delete User?",
      "Are you sure? This will delete all associated profiles.",
      "confirm",
      () => executeDeleteUser(userId)
    );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DialogComponent />
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 sticky top-0 h-screen">
        <h2 className="text-2xl font-bold mb-8">Admin Hub</h2>
        <nav className="space-y-4">
          <p className="opacity-50 text-sm uppercase">Management</p>
          <button className="block w-full text-left hover:text-blue-400">Users</button>
          <button className="block w-full text-left hover:text-blue-400">Programs</button>
        </nav>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">System Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatBox title="Total Users" count={stats.totalUsers} />
          <StatBox title="Hosts" count={stats.totalHosts} />
          <StatBox title="Live Programs" count={stats.totalPrograms} />
        </div>

        {/* Filters & Controls */}
        <div className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-wrap gap-4 items-center">
          <span className="font-bold text-sm text-gray-500 uppercase">Filters:</span>
          
          <select 
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={userRoleFilter}
            onChange={(e) => setUserRoleFilter(e.target.value)}
          >
            <option value="all">All Roles</option>
            <option value="host">Host</option>
            <option value="volunteer">Volunteer</option>
            <option value="admin">Admin</option>
          </select>

          <select 
            className="border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="DESC">Newest First</option>
            <option value="ASC">Oldest First</option>
          </select>
        </div>

        {loading ? (
            <p className="text-center py-10">Refreshing Data...</p>
        ) : error ? (
            <p className="text-center text-red-500 py-10">{error}</p>
        ) : (
          <>
            {/* USERS */}
            <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
              <div className="p-4 bg-gray-50 border-b font-bold flex justify-between items-center">
                <span>User Management</span>
                <span className="text-xs font-normal text-gray-500">Showing {data.users.length} users</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-sm border-b">
                      <th className="p-4">Created</th>
                      <th className="p-4">Email</th>
                      <th className="p-4">Mobile</th>
                      <th className="p-4">Role</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.users.map((u, index) => (
                      <tr key={u.id ?? `user-${index}`} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">{formatDate(u.createdAt)}</td>
                        <td className="p-4 font-medium">{u.email}</td>
                        <td className="p-4 text-sm font-medium text-gray-600">
                          {u.Host?.contact || u.Volunteer?.contact || 'N/A'}
                        </td>
                        <td className="p-4 uppercase text-xs font-bold">
                          <span className={`px-2 py-1 rounded-full ${
                            u.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                            u.role === 'host' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => confirmDeleteUser(u.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1 rounded-lg transition-colors text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {data.users.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">No users found matching filters.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* PROGRAMS */}
            <section className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b font-bold">Program Control</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-gray-400 text-sm border-b">
                      <th className="p-4">Created</th>
                      <th className="p-4">Program</th>
                      <th className="p-4">Host</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.programs.map((p, index) => (
                      <tr key={p.id ?? `program-${index}`} className="border-b hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">{formatDate(p.createdAt)}</td>
                        <td className="p-4 font-medium">{p.title}</td>
                        <td className="p-4 text-sm text-gray-500">{(p as any).Host?.propertyName || 'N/A'}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${p.isActive
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {p.isActive ? 'Active' : 'Disabled'}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleToggleProgram(p.id)}
                            className={`font-medium text-sm px-3 py-1 rounded-lg transition-colors ${
                              p.isActive 
                              ? 'text-orange-600 hover:bg-orange-50' 
                              : 'text-green-600 hover:bg-green-50'
                            }`}
                          >
                            {p.isActive ? 'Disable' : 'Enable'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {data.programs.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-500">No programs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function StatBox({ title, count }: { title: string; count: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <p className="text-gray-500 text-sm uppercase font-semibold">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{count}</p>
    </div>
  );
}