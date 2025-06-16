
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AdminLoginForm } from '@/components/admin/admin-login-form';
import { useAuth } from '@/hooks/use-auth';
import { MountainIcon } from 'lucide-react';

export default function AdminLoginPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.role === 'admin') {
      router.replace('/admin/dashboard');
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (isLoading || (!isLoading && isAuthenticated && user?.role === 'admin')) {
     return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900 p-4">
      <div className="flex items-center mb-8 text-background">
        <MountainIcon className="h-8 w-8 mr-3" />
        <h1 className="text-3xl font-bold font-headline">LiveConnect Admin</h1>
      </div>
      <AdminLoginForm />
    </div>
  );
}
