"use client";

import { useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "../../context/AuthContext";

const GoogleCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");

    if (token && role) {
      login(token, role);
      
      router.push(`../${role}/dashboard`);
    } else {
      router.push("/user/login?error=google_failed");
    }
  }, [searchParams, login, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#58a67d]"></div>
      <p className="ml-4 text-gray-600">Completing login...</p>
    </div>
  );
};

export default GoogleCallback;