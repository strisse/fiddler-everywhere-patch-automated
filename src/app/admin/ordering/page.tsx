
"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { GripVertical, ListOrdered, Loader2, Save } from 'lucide-react';
import Image from 'next/image';

interface DraggableStream {
  id: string;
  title: string;
  thumbnailUrl: string;
  order: number;
}

const mockOrderedStreams: DraggableStream[] = [
  { id: '1', title: 'Gaming Marathon', thumbnailUrl: 'https://placehold.co/120x68/A78BFA/FFFFFF.png?text=Game', order: 1 },
  { id: '2', title: 'Live DJ Set', thumbnailUrl: 'https://placehold.co/120x68/7DD3FC/FFFFFF.png?text=Music', order: 2 },
  { id: '3', title: 'Tech Talk', thumbnailUrl: 'https://placehold.co/120x68/34D399/FFFFFF.png?text=Tech', order: 3 },
  { id: '4', title: 'Art Session', thumbnailUrl: 'https://placehold.co/120x68/FBBF24/FFFFFF.png?text=Art', order: 4 },
];

export default function StreamOrderingPage() {
  const [streams, setStreams] = useState<DraggableStream[]>(mockOrderedStreams);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Basic drag-and-drop simulation (visual only, no actual library)
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("draggedItemIndex", index.toString());
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    const draggedItemIndex = parseInt(e.dataTransfer.getData("draggedItemIndex"), 10);
    const newStreams = [...streams];
    const [draggedItem] = newStreams.splice(draggedItemIndex, 1);
    newStreams.splice(dropIndex, 0, draggedItem);
    setStreams(newStreams.map((s, i) => ({ ...s, order: i + 1 })));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
  };
  
  const handleSaveOrder = async () => {
    setIsLoading(true);
    // Simulate API call to save order
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    toast({
      title: "Stream Order Saved",
      description: "The new order of streams has been successfully saved.",
    });
    console.log("New order:", streams.map(s => ({id: s.id, order: s.order})));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-headline flex items-center gap-2">
            <ListOrdered className="h-6 w-6 text-primary" /> Livestream Ordering
          </CardTitle>
          <CardDescription>
            Drag and drop streams to change their display order on the platform. Streams at the top will be shown more prominently.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Reorder Streams</CardTitle>
          <CardDescription>Higher position means higher priority. Live streams are always prioritized over upcoming ones within their order.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {streams.map((stream, index) => (
              <div
                key={stream.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragOver={handleDragOver}
                className="flex items-center p-3 border rounded-lg bg-card hover:bg-muted/50 cursor-grab active:cursor-grabbing"
              >
                <GripVertical className="h-5 w-5 text-muted-foreground mr-3 flex-shrink-0" />
                <span className="font-medium w-10 text-sm text-muted-foreground">{stream.order}.</span>
                <Image 
                  src={stream.thumbnailUrl} 
                  alt={stream.title} 
                  width={80} 
                  height={45} 
                  className="rounded mr-4 object-cover aspect-video"
                  data-ai-hint="stream thumbnail"
                />
                <span className="flex-grow truncate" title={stream.title}>{stream.title}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6 flex justify-end">
        <Button onClick={handleSaveOrder} disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Save Order
        </Button>
      </div>
    </div>
  );
}
