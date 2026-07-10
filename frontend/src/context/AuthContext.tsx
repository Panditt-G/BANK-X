import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  account_number?: string;
  account_type?: string;
  balance?: number;
  upi_id?: string;
}

interface AuthContextType {
  userProfile: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_URL = import.meta.env.VITE_API_URL || '';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserProfile(data.user);
      } else {
        localStorage.removeItem('token');
        setUserProfile(null);
      }
    } catch (error) {
      console.error("Fetch profile error:", error);
      localStorage.removeItem('token');
      setUserProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchProfile(token);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem('token', token);
    setLoading(true);
    await fetchProfile(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUserProfile(null);
    setLoading(false);
  };

  const refreshProfile = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      await fetchProfile(token);
    }
  };

  const isAuthenticated = !!userProfile;

  return (
    <AuthContext.Provider value={{ userProfile, loading, isAuthenticated, login, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
