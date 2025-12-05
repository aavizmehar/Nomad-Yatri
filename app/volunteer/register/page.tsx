'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VolunteerRegister() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role: 'volunteer' }),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Registered successfully!');
      router.push('/volunteer/login');
    } else {
      alert(data.error || 'Error registering');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Volunteer Register</h1>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="border p-2 mb-2" />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2" />
      <button onClick={handleRegister} className="bg-blue-500 text-white p-2">Register</button>
    </div>
  );
}
