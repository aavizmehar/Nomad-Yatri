'use client';

import { useEffect, useState } from 'react';

export default function HostDashboard() {
  const [programs, setPrograms] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  useEffect(() => {
    if (!token) return;

    const fetchPrograms = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs/host`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, [token]);

  const handleCreateProgram = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Program created!');
      setPrograms([...programs, data]);
      setTitle('');
      setDescription('');
    } else {
      alert(data.error || 'Error creating program');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Host Dashboard</h1>

      <h2 className="text-xl mb-2">Create Program</h2>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 mb-2" />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-2 mb-2" />
      <button onClick={handleCreateProgram} className="bg-blue-500 text-white p-2 mb-4">Create Program</button>

      <h2 className="text-xl mb-2">Your Programs</h2>
      {programs.map((p: any) => (
        <div key={p.id} className="border p-2 mb-2">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
