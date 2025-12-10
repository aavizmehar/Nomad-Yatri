"use client"
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams  } from 'next/navigation';
import Link from 'next/link';
const UserLogin = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('volunteer');

  const HandleLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    });
    
      const roleFromQuery = searchParams.get("role");
      if (roleFromQuery) {
        setRole(roleFromQuery); // override if redirected from register
      }
  
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      alert('Login successful');
      router.push('/host/dashboard');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl mb-4">User Login</h1>
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 mb-2" />
     {!searchParams.get("role") &&(
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="volunteer">Volunteer</option>
          <option value="host">Host</option>
        </select>
      )}
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2" />
      <button onClick={HandleLogin} className="bg-green-500 text-white p-2">Login</button>

      <p>dont have and account? <Link href="/user/register" >sign up here</Link></p>
    </div>
  );

}

export default UserLogin
