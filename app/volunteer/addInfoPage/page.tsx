'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { volunteerApi } from '@/lib/api/volunteer.api';

export default function VolunteerAddInfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    age: '',
    country: '',
    skills: '',
    interests: '',
    languages: '',
    photo: '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        skills: form.skills.split(',').map(s => s.trim()),
        interests: form.interests.split(',').map(i => i.trim()),
        languages: form.languages.split(',').map(l => l.trim()),
      };

      const res = await volunteerApi.saveProfile(payload);

      if (res.success) {
        router.push('/volunteer/dashboard');
      } else {
        setError(res.message || 'Failed to save profile');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Complete Your Profile</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
            {error}
          </div>
        )}

        <input name="name" placeholder="Full Name" required onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="country" placeholder="Country" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="interests" placeholder="Interests (comma separated)" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="photo" placeholder="Profile Photo URL" onChange={handleChange} className="w-full p-2 border rounded" />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
}
