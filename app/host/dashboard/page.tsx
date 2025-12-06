'use client';

import { useEffect, useState } from 'react';

export default function HostDashboard() {
  const [programs, setPrograms] = useState([]);
   const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [volunteersCount, setvolunteersCount] = useState(0);
  const [impactHours, setimpactHours] = useState(0);

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
      body: JSON.stringify({hostId:1, title, description,category, location, 
        volunteersCount: Number(volunteersCount),
         impactHours: Number(impactHours) }),
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
     <div className="p-4 border rounded">
      <h2 className="text-xl mb-2">Create Program</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border p-2 mb-2 w-full"
      /> <input
        placeholder="volunteers needed"
        value={volunteersCount}
        type = "number"
        onChange={(e) => setvolunteersCount(e.target.value)}
        className="border p-2 mb-2 w-full"
      /> <input
        placeholder="hours"
        value={impactHours}
        type = "number"
        onChange={(e) => setimpactHours(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button
        onClick={handleCreateProgram}
        className="bg-blue-500 text-white p-2 mb-4"
      >
        Create Program
      </button>
    </div>
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
