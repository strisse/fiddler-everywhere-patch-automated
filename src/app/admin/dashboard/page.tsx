
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Settings2, ListOrdered, Users, Sparkles, BarChart3 } from "lucide-react";

const overviewCards = [
  { title: "Total Live Streams", value: "12", icon: RadioTower, change: "+5 this week", color: "text-green-500" },
  { title: "Active Viewers", value: "150.k", icon: Users, change: "+12% today", color: "text-green-500" },
  { title: "Total Users", value: "1.2M", icon: UserCircle, change: "+1k new", color: "text-blue-500" },
  { title: "Issues Reported", value: "3", icon: AlertTriangle, change: "-1 from yesterday", color: "text-yellow-500" }
];


const quickLinks = [
  { href: "/admin/streams-config", label: "Configure Streams", icon: Settings2, description: "Manage RTMP URLs and stream settings." },
  { href: "/admin/ordering", label: "Order Streams", icon: ListOrdered, description: "Set the display order of livestreams." },
  { href: "/admin/fake-viewers", label: "Manage Fake Viewers", icon: Users, description: "Create and configure pseudo-viewers." },
  { href: "/admin/ai-chat-guidance", label: "AI Chat Guidance", icon: Sparkles, description: "Get AI suggestions for chat content." },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Admin Dashboard</CardTitle>
          <CardDescription>Welcome to the LiveConnect control panel. Manage your platform efficiently.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
         {/* Placeholder for overview cards - for now, simple text */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Live Streams</CardTitle>
            <BarChart3 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 since last hour</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Viewers</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">203</div>
            <p className="text-xs text-muted-foreground">+50 today</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Issues</CardTitle>
            <Settings2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Action required</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Quick Actions</CardTitle>
          <CardDescription>Access key administrative functions directly.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          {quickLinks.map((link) => (
            <Link href={link.href} key={link.href} className="block">
              <Card className="hover:shadow-md hover:border-primary/50 transition-all h-full">
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <link.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{link.label}</CardTitle>
                    <CardDescription className="text-sm">{link.description}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                    <Button variant="link" className="p-0 h-auto text-primary">
                        Go to {link.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// Placeholder icons if not already imported or available
const RadioTower = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/><path d="M12 2v2"/><path d="M18.36 5.64l-1.41 1.41"/><path d="M22 12h-2"/><path d="M18.36 18.36l-1.41-1.41"/><path d="M12 22v-2"/><path d="M5.64 18.36l1.41-1.41"/><path d="M2 12h2"/><path d="M5.64 5.64l1.41 1.41"/><path d="M12 18a2 2 0 0 0-2 2v2"/></svg>;
const UserCircle = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="10" r="3"></circle><path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"></path></svg>;
const AlertTriangle = ({className}: {className?: string}) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>;

