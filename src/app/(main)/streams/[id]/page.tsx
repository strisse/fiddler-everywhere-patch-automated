
"use client";

import { useParams } from 'next/navigation';
import Image from 'next/image';
import type { Stream } from '@/types'; // Assuming Stream type is defined
import { Card, CardContent } from '@/components/ui/card';
import { CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, UserCircle, RadioTower, Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState, useEffect, useRef } from 'react';

// Mock data - in a real app, this would be fetched
const mockStreams: Stream[] = [
  { id: '1', title: 'Gaming Marathon: Conquering New Worlds!', thumbnailUrl: 'https://placehold.co/1280x720/A78BFA/FFFFFF.png?text=Live+Stream', isLive: true, category: 'Gaming', viewers: 12500, username: 'ProGamerX', userAvatarUrl: 'https://placehold.co/40x40.png?text=PX' },
  { id: '2', title: 'Live DJ Set - Chill Vibes Only', thumbnailUrl: 'https://placehold.co/1280x720/7DD3FC/FFFFFF.png?text=Live+Stream', isLive: true, category: 'Music', viewers: 8200, username: 'DJChill', userAvatarUrl: 'https://placehold.co/40x40.png?text=DJ' },
];

interface ChatMessage {
  id: string;
  user: string;
  avatar?: string;
  message: string;
  timestamp: Date;
}

const mockChatMessages: ChatMessage[] = [
  { id: 'c1', user: 'Alice', message: 'This stream is awesome!', timestamp: new Date(Date.now() - 60000 * 5) },
  { id: 'c2', user: 'Bob', message: 'Hyped for this!', timestamp: new Date(Date.now() - 60000 * 4) },
  { id: 'c3', user: 'Charlie', message: 'Anyone know the song name?', timestamp: new Date(Date.now() - 60000 * 3), avatar: 'https://placehold.co/32x32.png?text=C' },
  { id: 'c4', user: 'David', message: 'Great gameplay!', timestamp: new Date(Date.now() - 60000 * 2) },
  { id: 'c5', user: 'Eve', message: 'Poggers!', timestamp: new Date(Date.now() - 60000 * 1), avatar: 'https://placehold.co/32x32.png?text=E' },
];


export default function StreamPage() {
  const params = useParams();
  const streamId = params.id as string;
  const [stream, setStream] = useState<Stream | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(mockChatMessages);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundStream = mockStreams.find(s => s.id === streamId);
    setStream(foundStream || null);
  }, [streamId]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const newMessage: ChatMessage = {
        id: `msg-${Date.now()}`,
        user: 'You', // Replace with actual user
        message: chatInput.trim(),
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');
    }
  };

  const getInitials = (name: string) => {
    const parts = name.split(' ');
    return parts.length > 1 ? parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase() : name.substring(0, 2).toUpperCase();
  };

  if (!stream) {
    return <div className="flex items-center justify-center h-screen"><p>Stream not found or loading...</p></div>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-h-[calc(100vh-var(--header-height,8rem))] h-full">
      {/* Main content: Video and Stream Info */}
      <div className="flex-grow lg:w-2/3 flex flex-col gap-4">
        <Card className="aspect-video overflow-hidden shadow-lg">
          <Image
            src={stream.thumbnailUrl} // Using thumbnail as placeholder, in reality, it would be a video player
            alt={`Live stream: ${stream.title}`}
            width={1280}
            height={720}
            className="w-full h-full object-cover"
            data-ai-hint="video player"
            priority
          />
        </Card>
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h1 className="text-2xl font-bold font-headline mb-2">{stream.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1.5">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={stream.userAvatarUrl} alt={stream.username} data-ai-hint="profile avatar" />
                  <AvatarFallback>{getInitials(stream.username)}</AvatarFallback>
                </Avatar>
                <span>{stream.username}</span>
              </div>
              <Badge variant="secondary">{stream.category}</Badge>
              {stream.isLive && (
                <Badge variant="destructive" className="flex items-center gap-1 animate-pulse">
                  <RadioTower className="h-3 w-3" /> LIVE
                </Badge>
              )}
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" /> {stream.viewers.toLocaleString()} viewers
              </div>
            </div>
            <p className="text-sm text-foreground">
              Welcome to the stream! Enjoy the content and participate in the chat.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chat Area */}
      <Card className="lg:w-1/3 flex flex-col shadow-lg max-h-full h-full">
        <CardHeader className="p-4 border-b">
          <h2 className="text-xl font-semibold font-headline">Live Chat</h2>
        </CardHeader>
        <ScrollArea className="flex-grow p-4" ref={chatAreaRef}>
          <div className="space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3">
                <Avatar className="h-8 w-8 border">
                  {msg.avatar ? <AvatarImage src={msg.avatar} alt={msg.user} data-ai-hint="profile avatar" /> : null}
                  <AvatarFallback className="text-xs bg-muted">
                    {getInitials(msg.user)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 bg-muted/50 p-2.5 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-sm font-medium text-primary">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <CardContent className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Send a message..."
              className="flex-grow resize-none"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              aria-label="Chat message input"
            />
            <Button type="submit" size="icon" aria-label="Send message" disabled={!chatInput.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
