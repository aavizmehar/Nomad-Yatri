"use client"
import {useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const UsersPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');

  const handleRegister = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      alert('register successful');
      router.push(`/user/login?role=${role}`);
    } else {
      alert(data.error || 'register failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">User register</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2" />
      <select value={role} onChange={(e) => setRole(e.target.value)}>enter role
        <option value="volunteer">Volunteer</option>
        <option value="host">Host</option>
      </select>
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2" />
      <button onClick={handleRegister} className="bg-green-500 text-white p-2">register</button>
   
    <p>already have an account? <Link href ="/user/login" >log in here</Link></p>
     </div>
  );

}

export default UsersPage
