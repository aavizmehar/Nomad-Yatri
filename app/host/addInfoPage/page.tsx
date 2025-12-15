"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HostAddInfoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    propertyName: "",
    location: "",
    acomodationType: "",
    meals: "",
    workRequired: "",
    capacity: "",
    contact: "",
  });

  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setGlobalError("");
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
    setErrors({ ...errors, images: "" });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name) newErrors.name = "Host name is required";
    if (!form.propertyName) newErrors.propertyName = "Property name is required";
    if (!form.location) newErrors.location = "Location is required";
    if (!form.capacity) newErrors.capacity = "Capacity is required";
    if (!form.contact) newErrors.contact = "Contact number is required";
    if (images.length === 0) newErrors.images = "At least one image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async () => {
  setGlobalError("");
  setSuccess("");

  if (!validate()) return;

  const token = localStorage.getItem("accessToken");
  if (!token) {
    setGlobalError("Session expired. Please login again.");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) =>
      formData.append(key, value)
    );
    images.forEach((img) => formData.append("propertyImages", img));

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/hosts/dashboard/addHostData`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        credentials: "include",
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || data.error || "Submission failed");
    }

    setSuccess("🎉 Host information added successfully!");
    setTimeout(() => router.push("/host/dashboard"), 1500);
  } catch (err) {
    setGlobalError(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Host Details
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Tell volunteers about you 🌿
        </p>

        {/* Global Error */}
        {globalError && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {globalError}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            {success}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="Host Name" name="name" value={form.name} error={errors.name} onChange={handleChange} />
          <Input label="Property Name" name="propertyName" value={form.propertyName} error={errors.propertyName} onChange={handleChange} />
          <Input label="Location" name="location" value={form.location} error={errors.location} onChange={handleChange} />
          <Input label="Accommodation Type" name="acomodationType" value={form.acomodationType} onChange={handleChange} />
          <Input label="Meals (optional)" name="meals" value={form.meals} onChange={handleChange} />
          <Input label="Work Required" name="workRequired" value={form.workRequired} onChange={handleChange} />
          <Input label="Capacity" name="capacity" type="number" value={form.capacity} error={errors.capacity} onChange={handleChange} />
          <Input label="Contact Number" name="contact" value={form.contact} error={errors.contact} onChange={handleChange} />
        </div>

        {/* Images */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Images
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full text-sm"
          />
          {errors.images && (
            <p className="text-sm text-red-600 mt-1">{errors.images}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`mt-8 w-full rounded-xl py-3 font-semibold transition
            ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"}
          `}
        >
          {loading ? "Submitting..." : "Submit Host Info"}
        </button>
      </div>
    </div>
  );
}

/* Reusable Input */
function Input({ label, name, type = "text", value, onChange, error }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
          ${error
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-300 focus:ring-green-500"}
        `}
        placeholder={label}
      />
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
}
