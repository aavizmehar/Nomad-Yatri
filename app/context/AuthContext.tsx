"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  loading: boolean; 
  login: (accessToken: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  role: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const verifySession = useCallback(async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      credentials: "include", 
    });
    
    if (res.ok) {
      const data = await res.json();
      const userRole = data?.data?.user?.role; 
      if (userRole) {
        setIsLoggedIn(true);
        setRole(userRole);
        localStorage.setItem("role", userRole);
      } else {
        logout(); 
      }
    } else {
      logout(); 
    }
  } catch (err) {
    console.error("Auth verification failed", err);
    logout();
  } finally {
    setLoading(false);
  }
}, []);


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userRole = localStorage.getItem("role");

    if (token) {
      setIsLoggedIn(true);
      setRole(userRole);
      setLoading(false);
    } else {
      verifySession();
    }
  }, [verifySession]);

  const login = (accessToken: string, userRole: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};