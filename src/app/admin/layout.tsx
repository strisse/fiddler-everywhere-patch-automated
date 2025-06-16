
"use client";

import type React from 'react';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Loader2, LogOut, MountainIcon } from 'lucide-react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { adminNavItems, type NavItem } from '@/components/admin/admin-nav-items';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


function NavMenuItem({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const isActive = currentPath === item.href || (item.href !== '/admin/dashboard' && currentPath.startsWith(item.href));
  return (
    <SidebarMenuItem>
      <Link href={item.href} passHref legacyBehavior>
        <SidebarMenuButton isActive={isActive} tooltip={{children: item.label, side: 'right'}}>
          <item.icon />
          <span>{item.label}</span>
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated || user?.role !== 'admin') {
        router.replace('/admin/login');
      }
    }
  }, [user, isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }
  
  const getInitials = (name?: string) => {
    if (!name) return 'AD';
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase() : name.substring(0, 2).toUpperCase();
  };


  return (
    <SidebarProvider defaultOpen>
      <Sidebar collapsible="icon" side="left" variant="sidebar">
        <SidebarHeader className="items-center justify-between p-3">
           <Link href="/admin/dashboard" className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
             <MountainIcon className="h-6 w-6 text-primary" />
             <span className="font-bold text-lg font-headline text-primary">LiveConnect</span>
           </Link>
           <div className="group-data-[collapsible=icon]:hidden">
             <SidebarTrigger />
           </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {adminNavItems.map((item) => (
              <NavMenuItem key={item.href} item={item} currentPath={pathname} />
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-3 group-data-[collapsible=icon]:hidden">
          <Button variant="ghost" onClick={logout} className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
          <div className="md:hidden">
            <SidebarTrigger/>
          </div>
          <div className="flex-1 text-center text-lg font-semibold md:text-left">
            {adminNavItems.find(item => pathname.startsWith(item.href))?.label || 'Admin Panel'}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-9 w-9">
                   <AvatarImage src={`https://placehold.co/100x100.png?text=${getInitials(user?.name)}`} alt={user?.name || 'Admin'} data-ai-hint="profile avatar" />
                  <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">Administrator</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6 bg-muted/30">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
