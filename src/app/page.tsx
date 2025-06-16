
"use client";

import { MountainIcon, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function HomePage() {
  const { guestLogin, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isGuestLoading, setIsGuestLoading] = useState(false);

  useEffect(() => {
    // If already authenticated, redirect to streams page
    if (isAuthenticated && !authLoading) {
      router.replace('/streams');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    try {
      const success = await guestLogin();
      if (success) {
        // Navigation is handled by guestLogin in AuthContext
      } else {
        toast({
          title: "Guest Login Failed",
          description: "Could not log in as guest. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Guest Login Error",
        description: "An unexpected error occurred during guest login.",
        variant: "destructive",
      });
    } finally {
      setIsGuestLoading(false);
    }
  };

  if (authLoading || (isAuthenticated && !authLoading)) { // Check authLoading here too to prevent rendering the page before redirect
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-primary-foreground shadow-md">
        <div className="flex items-center">
          <MountainIcon className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold font-headline">LiveConnect</h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-purple-100">
        <div className="text-center space-y-6 max-w-md">
          <h2 className="text-4xl font-bold tracking-tight font-headline text-primary">
            Welcome to LiveConnect
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover and join exciting livestreams. Log in as a guest or with your account to get started!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGuestLogin}
              disabled={isGuestLoading}
              className="w-full sm:w-auto"
              size="lg"
            >
              {isGuestLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <User className="mr-2 h-4 w-4" />
              )}
              Guest Login
            </Button>
            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto"
              size="lg"
            >
              <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login with Email
              </Link>
            </Button>
          </div>
        </div>
      </main>
      <footer className="flex items-center justify-center w-full h-16 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LiveConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
