"use client";
import React, { useState } from "react";

export default function HostRegister() {
  const [form, setForm] = useState({
    name: "",
    propertyName: "",
    location: "",
    accommodation: "",
    meals: "",
    workRequired: "",
    capacity: "",
    photos: "",
    contactInfo: "",
  });


  return (
    <section className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6">
          Register as a Host (Free)
        </h2>

        <form className="space-y-4">
          {[
            { label: "Name", name: "name" },
            { label: "Property / NGO Name", name: "propertyName" },
            { label: "Location", name: "location" },
            { label: "Accommodation Type", name: "accommodation" },
            { label: "Meals", name: "meals" },
            { label: "Work Required", name: "workRequired" },
            { label: "Capacity", name: "capacity", type: "number" },
            { label: "Contact Info", name: "contactInfo" },
            {
              label: "Photos (comma separated URLs)",
              name: "photos",
            },
          ].map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type={type}
                name={name}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark"
          >
            Register as Host (Free)
          </button>
        </form>
      </div>
    </section>
  );
}
