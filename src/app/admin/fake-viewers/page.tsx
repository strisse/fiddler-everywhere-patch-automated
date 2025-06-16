
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, UserPlus, MessageSquarePlus, Clock } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

export default function FakeViewersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [numberOfViewers, setNumberOfViewers] = useState(50);
  const [chatInterval, setChatInterval] = useState(10); // seconds
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Fake Viewer Settings Updated",
      description: "The configuration for fake viewers has been saved.",
    });
    console.log({
      numberOfViewers,
      chatContent: (event.target as HTMLFormElement).chatContent.value,
      chatInterval
    });
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <UserPlus className="h-6 w-6 text-primary" /> Manage Fake Viewers
          </CardTitle>
          <CardDescription>
            Configure and manage pseudo-viewers to simulate activity on livestreams. Use responsibly.
          </CardDescription>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Viewer Creation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="numViewers">Number of Fake Viewers: {numberOfViewers}</Label>
                <Slider
                  id="numViewers"
                  defaultValue={[numberOfViewers]}
                  max={500}
                  step={10}
                  onValueChange={(value) => setNumberOfViewers(value[0])}
                  className="mt-2"
                  aria-label="Number of fake viewers"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Adjust the slider to set the desired number of fake viewers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5" /> Chat Interval</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="chatInterval">Message Interval (seconds): {chatInterval}s</Label>
                 <Slider
                  id="chatInterval"
                  defaultValue={[chatInterval]}
                  min={1}
                  max={60}
                  step={1}
                  onValueChange={(value) => setChatInterval(value[0])}
                  className="mt-2"
                  aria-label="Chat message interval"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Set how often fake viewers should post messages.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><MessageSquarePlus className="h-5 w-5" /> Chat Content</CardTitle>
            <CardDescription>
              Enter chat messages for fake viewers, one per line. These will be randomly selected.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              id="chatContent"
              placeholder="Great stream!&#10;Love this content!&#10;Hello everyone!&#10;PogChamp"
              rows={8}
              className="min-h-[150px]"
            />
          </CardContent>
        </Card>
        
        <div className="mt-6 flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            Apply Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
