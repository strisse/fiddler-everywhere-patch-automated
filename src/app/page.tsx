
import { GuestLoginPopup } from '@/components/auth/guest-login-popup';
import { MountainIcon } from 'lucide-react'; // Assuming MountainIcon for a generic logo

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-primary-foreground shadow-md">
        <div className="flex items-center">
          <MountainIcon className="h-6 w-6 mr-2" />
          <h1 className="text-xl font-bold font-headline">LiveConnect</h1>
        </div>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-purple-100">
        <div className="text-center space-y-4 max-w-md">
          <h2 className="text-4xl font-bold tracking-tight font-headline text-primary">
            Welcome to LiveConnect
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover and join exciting livestreams. Log in as a guest or with your account to get started!
          </p>
        </div>
        <GuestLoginPopup />
      </main>
      <footer className="flex items-center justify-center w-full h-16 border-t">
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} LiveConnect. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
