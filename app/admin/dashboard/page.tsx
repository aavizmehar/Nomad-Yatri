'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// --- TYPES & INTERFACES ---
interface User {
  id: number;
  email: string;
  role: string;
  Host?: { propertyName: string };
  Volunteer?: { name: string };
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

      const [resStats, resUsers, resPrograms] = await Promise.all([
        fetch(`${baseUrl}/admin/dashboard-stats`, { headers }),
        fetch(`${baseUrl}/admin/users`, { headers }),
        fetch(`${baseUrl}/admin/programs`, { headers }),
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
  }, [token]);

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

  if (loading) return <p className="p-10 text-center">Loading Admin Data...</p>;
  if (error) return <p className="p-10 text-center text-red-500">{error}</p>;

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
      }
    } catch {
      alert('Toggle failed');
    }
  };

  // MATCHED WITH: router.route("/users/:id").delete(...)
  const handleDeleteUser = async (userId: number) => {
    if (!confirm('Are you sure? This will delete all associated profiles.')) return;

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
      }
    } catch {
      alert('Delete failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Hub</h2>
        <nav className="space-y-4">
          <p className="opacity-50 text-sm uppercase">Management</p>
          <button className="block w-full text-left hover:text-blue-400">Users</button>
          <button className="block w-full text-left hover:text-blue-400">Programs</button>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">System Dashboard</h1>

        <div className="grid grid-cols-3 gap-6 mb-10">
          <StatBox title="Total Users" count={stats.totalUsers} />
          <StatBox title="Hosts" count={stats.totalHosts} />
          <StatBox title="Live Programs" count={stats.totalPrograms} />
        </div>

        {/* USERS */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden mb-10">
          <div className="p-4 bg-gray-50 border-b font-bold">User Management</div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b">
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((u, index) => (
                <tr key={u.id ?? `user-${index}`} className="border-b hover:bg-gray-50">
                  <td className="p-4">{u.email}</td>
                  <td className="p-4 uppercase text-xs font-bold">{u.role}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* PROGRAMS */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b font-bold">Program Control</div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-sm border-b">
                <th className="p-4">Program</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.programs.map((p, index) => (
                <tr key={p.id ?? `program-${index}`} className="border-b">

                  <td className="p-4">{p.title}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${p.isActive
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
                      className="text-blue-600 font-medium hover:underline"
                    >
                      {p.isActive ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
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
