
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { useAuth } from '@/hooks/use-auth';
import { MountainIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace('/streams');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || (!isLoading && isAuthenticated)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-purple-100 p-4">
       <header className="absolute top-0 left-0 right-0 px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="Back to Home">
          <MountainIcon className="h-6 w-6 mr-2 text-primary" />
          <span className="text-xl font-bold font-headline text-primary">LiveConnect</span>
        </Link>
        <Button variant="ghost" asChild>
          <Link href="/" aria-label="Go back to home page">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </header>
      <LoginForm />
    </div>
  );
}
