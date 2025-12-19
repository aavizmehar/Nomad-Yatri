'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { volunteerApi } from '@/lib/api/volunteer.api';

export default function VolunteerAddInfoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
      }
    } catch (err) {
      console.error(err);
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

        <input name="name" placeholder="Full Name" required onChange={handleChange} className="input" />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} className="input" />
        <input name="country" placeholder="Country" onChange={handleChange} className="input" />
        <input name="skills" placeholder="Skills (comma separated)" onChange={handleChange} className="input" />
        <input name="interests" placeholder="Interests (comma separated)" onChange={handleChange} className="input" />
        <input name="languages" placeholder="Languages (comma separated)" onChange={handleChange} className="input" />
        <input name="photo" placeholder="Profile Photo URL" onChange={handleChange} className="input" />

        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md"
        >
          {loading ? 'Saving...' : 'Save & Continue'}
        </button>
      </form>
    </div>
  );
}
