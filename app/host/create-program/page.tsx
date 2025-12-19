'use client';
import React, { useState, ChangeEvent, FormEvent } from 'react'; // Added React types
import { useRouter } from 'next/navigation';
import { dashboardApi } from '@/lib/api/dashboard.api';
import {
  PROGRAM_CATEGORIES,
  CATEGORY_SUBCATEGORIES
} from '@/constants/programCategories';

export default function CreateProgramPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subCategory: '',
    location: '',
    duration: '',
    maxVolunteers: ''
  });
  const [images, setImages] = useState<File[]>([]); // Type added for File array
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Type added for strings

  // Type safe lookup for categories
  const categoryKey = formData.category as keyof typeof CATEGORY_SUBCATEGORIES;
  const availableSubcategories = CATEGORY_SUBCATEGORIES[categoryKey] || [];
  const hasSubcategories = availableSubcategories.length > 0;

  // FIXED: Added types for HTMLInputElement, HTMLTextAreaElement, and HTMLSelectElement
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // FIXED: Added type for Category Select
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      category: e.target.value,
      subCategory: '' // Reset subcategory when category changes
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImages(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      images.forEach((image) => {
        formDataToSend.append('programImages', image);
      });

      const response = await dashboardApi.createProgram(formDataToSend);
      
      if (response.success) {
        alert('Program created successfully!');
        router.push('/host/my-programs');
      }
    } catch (error) {
      console.error('Error creating program:', error);
      alert('Failed to create program. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 text-black">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Create New Program</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">Program Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Teaching English in Rural Schools"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">Program Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                {Object.values(PROGRAM_CATEGORIES).map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* SubCategory (conditional) */}
            {hasSubcategories && (
              <div>
                <label className="block text-sm font-semibold mb-2">Sub-Category (Optional)</label>
                <select
                  name="subCategory"
                  value={formData.subCategory}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a sub-category</option>
                  {availableSubcategories.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your program in detail..."
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Udaipur, Rajasthan"
              />
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 2-4 weeks, Flexible, Weekend only"
              />
            </div>

            {/* Max Volunteers */}
            <div>
              <label className="block text-sm font-semibold mb-2">Maximum Volunteers</label>
              <input
                type="number"
                name="maxVolunteers"
                value={formData.maxVolunteers}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., 10"
                min="1"
              />
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-semibold mb-2">Program Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">You can upload multiple images</p>

              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative h-32 rounded-lg overflow-hidden border">
                      <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Program...' : 'Create Program'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}