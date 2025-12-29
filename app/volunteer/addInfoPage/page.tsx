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
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('age', form.age);
      formData.append('country', form.country);
      
      // Handle arrays
      const skillsArray = form.skills.split(',').map(s => s.trim());
      const interestsArray = form.interests.split(',').map(i => i.trim());
      const languagesArray = form.languages.split(',').map(l => l.trim());

      skillsArray.forEach(s => formData.append('skills[]', s));
      interestsArray.forEach(i => formData.append('interests[]', i));
      languagesArray.forEach(l => formData.append('languages[]', l));

      if (photoFile) {
        formData.append('photo', photoFile);
      }

      const res = await volunteerApi.saveProfile(formData);

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
        
        <div className="space-y-1">
          <label className="text-sm text-gray-600">Profile Photo</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="w-full p-2 border rounded"
          />
        </div>

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
