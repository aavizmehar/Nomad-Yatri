"use client";

import { createContext, useState, useEffect, ReactNode, useCallback } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  role: string | null;
  loading: boolean; 
  login: (accessToken: string, role: string) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  role: null,
  loading: true,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const clearLocalAuth = useCallback(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setRole(null);
  }, []);

  const verifySession = useCallback(async () => {
    const token = localStorage.getItem("accessToken");

    if (!token || token === "[object Object]") {
      clearLocalAuth();
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
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
          clearLocalAuth();
        }
      } else {
        clearLocalAuth();
      }
    } catch (err) {
      console.error("Backend unreachable during verification", err);
      clearLocalAuth();
    } finally {
      setLoading(false);
    }
  }, [clearLocalAuth]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      verifySession();
    } else {
      setLoading(false);
    }
  }, [verifySession]);

  const login = (accessToken: string, userRole: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("role", userRole);
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const logout = async () => {
    const token = localStorage.getItem("accessToken");
    
    try {
      if (token && token !== "[object Object]") {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          credentials: "include", 
        });
      }
    } catch (error) {
      console.warn("Server-side logout failed, clearing local session.");
    } finally {
      clearLocalAuth();
      window.location.href = "/user/login";
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};