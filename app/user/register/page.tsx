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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
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
  <div className="pt-30 flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Register</h1>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Email</label>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-1">Role</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        >
          <option value="volunteer">Volunteer</option>
          <option value="host">Host</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 mb-1">Password</label>
        <input
          placeholder="Enter your password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
        />
      </div>

      <button
        onClick={handleRegister}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200"
      >
        Register
      </button>

      <p className="text-gray-600 text-center mt-4">
        Already have an account?{' '}
        <Link href="/user/login" className="text-green-500 hover:underline font-medium">
          Log in here
        </Link>
      </p>
    </div>
  </div>
);


}

export default UsersPage
