
import {
  LayoutDashboard,
  Video,
  ListOrdered,
  Users,
  MessageSquareQuote,
  Settings2,
  Sparkles,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  subItems?: NavItem[];
}

export const adminNavItems: NavItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/streams-config', label: 'Livestream Config', icon: Settings2 },
  { href: '/admin/ordering', label: 'Stream Ordering', icon: ListOrdered },
  { 
    href: '/admin/fake-viewers', 
    label: 'Fake Viewers', 
    icon: Users,
    // subItems: [ // Example for sub-items if needed later
    //   { href: '/admin/fake-viewers/create', label: 'Create Viewers', icon: UserPlus },
    //   { href: '/admin/fake-viewers/chat-content', label: 'Chat Content', icon: MessageSquareQuote },
    // ]
  },
  { href: '/admin/ai-chat-guidance', label: 'AI Chat Guidance', icon: Sparkles },
];
