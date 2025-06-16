
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { Stream } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, RadioTower } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface StreamCardProps {
  stream: Stream;
}

export function StreamCard({ stream }: StreamCardProps) {
  const getInitials = (name: string) => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return parts[0][0].toUpperCase() + parts[parts.length - 1][0].toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <Link href={`/streams/${stream.id}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 ease-in-out hover:shadow-primary/20 hover:shadow-lg hover:border-primary/50">
        <CardHeader className="p-0 relative">
          <Image
            src={stream.thumbnailUrl}
            alt={stream.title}
            width={600}
            height={338} // 16:9 aspect ratio
            className="aspect-video object-cover w-full transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="livestream broadcast"
          />
          {stream.isLive && (
            <Badge variant="destructive" className="absolute top-2 left-2 flex items-center gap-1 animate-pulse">
              <RadioTower className="h-3 w-3" /> LIVE
            </Badge>
          )}
          <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs flex items-center gap-1">
            <Eye className="h-3 w-3" /> {stream.viewers.toLocaleString()}
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-semibold font-headline leading-tight truncate group-hover:text-primary" title={stream.title}>
            {stream.title}
          </h3>
          <Badge variant="secondary" className="mt-1 text-xs">{stream.category}</Badge>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={stream.userAvatarUrl} alt={stream.username} data-ai-hint="profile avatar" />
              <AvatarFallback>{getInitials(stream.username)}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground truncate" title={stream.username}>{stream.username}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
