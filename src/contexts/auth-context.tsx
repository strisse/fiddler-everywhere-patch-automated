
"use client";

import type React from 'react';
import { createContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface User {
  id: string;
  name: string;
  email?: string;
  role: 'guest' | 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  guestLogin: () => Promise<boolean>;
  adminLogin: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper to generate a random string for guest IDs
const generateId = () => Math.random().toString(36).substring(2, 10);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Simulate checking for persisted auth state
    const storedUser = sessionStorage.getItem('liveconnect-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const persistUser = (currentUser: User | null) => {
    if (currentUser) {
      sessionStorage.setItem('liveconnect-user', JSON.stringify(currentUser));
    } else {
      sessionStorage.removeItem('liveconnect-user');
    }
  };

  const login = useCallback(async (email: string, pass: string): Promise<boolean> => {
    // Mock login
    if (email === 'user@example.com' && pass === 'password') {
      const loggedInUser: User = { id: generateId(), name: 'User', email, role: 'user' };
      setUser(loggedInUser);
      persistUser(loggedInUser);
      router.push('/streams');
      return true;
    }
    return false;
  }, [router]);

  const guestLogin = useCallback(async (): Promise<boolean> => {
    const guestName = `t-${generateId()}`;
    const guestUser: User = { id: guestName, name: guestName, role: 'guest' };
    setUser(guestUser);
    persistUser(guestUser);
    router.push('/streams');
    return true;
  }, [router]);

  const adminLogin = useCallback(async (username: string, pass: string): Promise<boolean> => {
    // Mock admin login
    if (username === 'admin' && pass === 'adminpass') {
      const adminUser: User = { id: 'admin-user', name: 'Admin User', role: 'admin' };
      setUser(adminUser);
      persistUser(adminUser);
      router.push('/admin/dashboard');
      return true;
    }
    return false;
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    persistUser(null);
    if (pathname.startsWith('/admin')) {
      router.push('/admin/login');
    } else {
      router.push('/');
    }
  }, [router, pathname]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, guestLogin, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
