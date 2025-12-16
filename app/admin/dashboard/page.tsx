'use client';

import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [hosts, setHosts] = useState([]);
  const [programs, setPrograms] = useState([]);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      const resUsers = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(await resUsers.json());

      const resHosts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hosts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHosts(await resHosts.json());

      const resPrograms = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/programs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrograms(await resPrograms.json());
    };

    fetchData();
  }, [token]);

  const approveHost = async (id: number) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/hosts/${id}/approve`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setHosts(hosts.map(h => (h.id === id ? { ...h, verified: true } : h)));
      alert('Host approved!');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>

      <h2 className="text-xl mb-2">Users</h2>
      {users.map((u: any) => (
        <div key={u.id} className="border p-2 mb-2">
          <p>{u.name} ({u.email})</p>
        </div>
      ))}

      <h2 className="text-xl mt-4 mb-2">Hosts</h2>
      {hosts.map((h: any) => (
        <div key={h.id} className="border p-2 mb-2">
          <p>{h.organization} - Verified: {h.verified ? 'Yes' : 'No'}</p>
          {!h.verified && <button onClick={() => approveHost(h.id)} className="bg-green-500 text-white p-1 mt-1">Approve</button>}
        </div>
      ))}

      <h2 className="text-xl mt-4 mb-2">Progr
