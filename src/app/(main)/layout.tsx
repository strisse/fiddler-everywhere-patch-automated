
"use client";

import type React from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { AppHeader } from '@/components/shared/app-header';
import { Loader2 } from 'lucide-react';

export default function MainAppLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    } else if (!isLoading && isAuthenticated && user?.role === 'admin') {
      // If an admin accidentally lands on a user page, redirect to admin dashboard
      router.replace('/admin/dashboard');
    }
  }, [isAuthenticated, isLoading, user, router]);

  if (isLoading || !isAuthenticated || user?.role === 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="flex-1 container py-8">{children}</main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} LiveConnect. All rights reserved.
      </footer>
    </div>
  );
}
