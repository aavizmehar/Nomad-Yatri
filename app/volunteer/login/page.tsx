'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VolunteerLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      alert('Login successful');
      router.push('/volunteer/dashboard');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">Volunteer Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2" />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2" />
      <button onClick={handleLogin} className="bg-green-500 text-white p-2">Login</button>
    </div>
  );
}
