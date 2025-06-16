
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, PlayCircle, Settings } from 'lucide-react';

export default function StreamsConfigPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLive, setIsLive] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Stream Configuration Updated",
      description: "The livestream settings have been saved.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <Settings className="h-6 w-6 text-primary" /> Livestream Configuration
          </CardTitle>
          <CardDescription>
            Set up and manage your livestream settings, including RTMP URLs and stream details.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Stream Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="streamTitle">Stream Title</Label>
                <Input id="streamTitle" placeholder="My Awesome Livestream" defaultValue="LiveConnect Showcase" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="streamCategory">Category</Label>
                <Input id="streamCategory" placeholder="e.g., Gaming, Music, Tech" defaultValue="Technology" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rtmpUrl">RTMP URL</Label>
              <Input id="rtmpUrl" placeholder="rtmp://your-stream-server/live" defaultValue="rtmp://a.rtmp.youtube.com/live2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streamKey">Stream Key</Label>
              <Input id="streamKey" type="password" placeholder="your-secret-stream-key" defaultValue="xxxx-xxxx-xxxx-xxxx" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="streamDescription">Description (Optional)</Label>
              <Textarea id="streamDescription" placeholder="Tell viewers about your stream..." />
            </div>
            <div className="flex items-center space-x-3">
              <Switch id="isLiveToggle" checked={isLive} onCheckedChange={setIsLive} aria-label="Toggle stream status" />
              <Label htmlFor="isLiveToggle" className="text-base">
                {isLive ? "Stream is Live" : "Stream is Offline (Ready to Go Live)"}
              </Label>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PlayCircle className="mr-2 h-4 w-4" />
            )}
            {isLive ? "Update Stream" : "Go Live / Save Config"}
          </Button>
        </div>
      </form>
    </div>
  );
}
