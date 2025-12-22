"use client";

import React from "react";

const GoogleLoginButtons: React.FC = () => {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const roles = [
    { label: "Continue as Volunteer", value: "volunteer" },
    { label: "Continue as Host", value: "host" },
  ];

  return (
    <div className="flex flex-col space-y-4 items-start">
      {roles.map((role) => (
        <a
          key={role.value}
          href={`${serverUrl}/auth/google?role=${role.value}`}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          {role.label}
        </a>
      ))}
    </div>
  );
};

export default GoogleLoginButtons;
