'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [hosts, setHosts] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('accessToken')
      : null;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const [resUsers, resHosts, resPrograms] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hosts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/programs`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUsers(await resUsers.json());
        setHosts(await resHosts.json());
        setPrograms(await resPrograms.json());
      } catch (err) {
        console.error('Admin fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const approveHost = async (id: number) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/hosts/${id}/approve`,
      {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.ok) {
      setHosts(hosts.map(h => (h.id === id ? { ...h, verified: true } : h)));
      alert('Host approved!');
    }
  };

  if (!token) {
    return <p className="p-4 text-red-500">Unauthorized</p>;
  }

  if (loading) {
    return <p className="p-4">Loading admin data...</p>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* USERS */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        {users.length === 0 && <p>No users found</p>}
        {users.map((u) => (
          <div key={u.id} className="border rounded p-3 mb-2">
            <p><strong>Email:</strong> {u.email}</p>
            <p><strong>Role:</strong> {u.role}</p>
          </div>
        ))}
      </section>

      {/* HOSTS */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Hosts</h2>
        {hosts.length === 0 && <p>No hosts found</p>}
        {hosts.map((h) => (
          <div key={h.hostId} className="border rounded p-3 mb-2">
            <p><strong>Name:</strong> {h.name}</p>
            <p><strong>Property:</strong> {h.propertyName}</p>
            <p><strong>Verified:</strong> {h.verified ? 'Yes' : 'No'}</p>

            {!h.verified && (
              <button
                onClick={() => approveHost(h.hostId)}
                className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
              >
                Approve Host
              </button>
            )}
          </div>
        ))}
      </section>

      {/* PROGRAMS */}
      <section>
        <h2 className="text-xl font-semibold mb-2">Programs</h2>
        {programs.length === 0 && <p>No programs found</p>}
        {programs.map((p) => (
          <div key={p.id} className="border rounded p-3 mb-2">
            <p><strong>Title:</strong> {p.title}</p>
            <p><strong>Category:</strong> {p.category}</p>
            <p><strong>Location:</strong> {p.location}</p>
            <p><strong>Host ID:</strong> {p.hostId}</p>
            <p><strong>Volunteers:</strong> {p.volunteersCount}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
