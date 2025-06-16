
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Loader2, User, LogIn } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export function GuestLoginPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isGuestLoading, setIsGuestLoading] = useState(false);
  const { guestLogin, isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // Open the dialog if not authenticated and auth is not loading
    if (!authLoading && !isAuthenticated) {
      setIsOpen(true);
    } else if (isAuthenticated) {
      setIsOpen(false);
    }
  }, [isAuthenticated, authLoading]);

  const handleGuestLogin = async () => {
    setIsGuestLoading(true);
    try {
      await guestLogin();
      // Navigation is handled by guestLogin
    } catch (error) {
      toast({
        title: "Guest Login Failed",
        description: "Could not log in as guest. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGuestLoading(false);
    }
  };

  const handleNavigateToLogin = () => {
    setIsOpen(false);
    router.push('/login');
  };

  if (authLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  // If authenticated, don't render the dialog logic at all or ensure it's closed
  if (isAuthenticated) return null;


  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      // Prevent closing by clicking outside or pressing Esc if not authenticated
      if (isAuthenticated) setIsOpen(open);
      else setIsOpen(true); 
    }}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="login-options-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-headline text-center">Welcome to LiveConnect</DialogTitle>
          <DialogDescription id="login-options-description" className="text-center">
            Choose an option to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button 
            onClick={handleGuestLogin} 
            disabled={isGuestLoading} 
            className="w-full"
            aria-label="Login as Guest"
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
            onClick={handleNavigateToLogin} 
            className="w-full"
            aria-label="Login with Email"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login with Email
          </Button>
        </div>
        <DialogFooter>
          <p className="text-xs text-muted-foreground text-center w-full">
            By continuing, you agree to our Terms of Service.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
