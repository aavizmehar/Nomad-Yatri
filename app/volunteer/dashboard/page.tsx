'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/programs`);
      const data = await res.json();
      setPrograms(data);
    };
    fetchPrograms();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Volunteer Dashboard</h1>
      <h2 className="text-xl mb-2">Available Programs</h2>
      {programs.map((p: any) => (
        <div key={p.id} className="border p-2 mb-2">
          <h3>{p.title}</h3>
          <p>{p.description}</p>
        </div>
      ))}
    </div>
  );
}
