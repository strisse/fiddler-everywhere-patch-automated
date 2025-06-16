
"use client";

import { useState, useEffect } from 'react';
import { StreamCard } from '@/components/streams/stream-card';
import type { Stream } from '@/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock data
const mockStreams: Stream[] = [
  { id: '1', title: 'Gaming Marathon: Conquering New Worlds!', thumbnailUrl: 'https://placehold.co/600x338/A78BFA/FFFFFF.png?text=Gaming', isLive: true, category: 'Gaming', viewers: 12500, username: 'ProGamerX', userAvatarUrl: 'https://placehold.co/40x40.png?text=PX' },
  { id: '2', title: 'Live DJ Set - Chill Vibes Only', thumbnailUrl: 'https://placehold.co/600x338/7DD3FC/FFFFFF.png?text=Music', isLive: true, category: 'Music', viewers: 8200, username: 'DJChill', userAvatarUrl: 'https://placehold.co/40x40.png?text=DJ' },
  { id: '3', title: 'Art & Creativity: Painting Session', thumbnailUrl: 'https://placehold.co/600x338/FBBF24/FFFFFF.png?text=Art', isLive: false, category: 'Art', viewers: 350, username: 'ArtisticFlow', userAvatarUrl: 'https://placehold.co/40x40.png?text=AF' },
  { id: '4', title: 'Tech Talk: Future of AI', thumbnailUrl: 'https://placehold.co/600x338/34D399/FFFFFF.png?text=Tech', isLive: true, category: 'Technology', viewers: 5600, username: 'TechGuru', userAvatarUrl: 'https://placehold.co/40x40.png?text=TG' },
  { id: '5', title: 'Cooking Show: Baking Pastries', thumbnailUrl: 'https://placehold.co/600x338/F472B6/FFFFFF.png?text=Cooking', isLive: false, category: 'Cooking', viewers: 120, username: 'ChefDelight', userAvatarUrl: 'https://placehold.co/40x40.png?text=CD' },
  { id: '6', title: 'Just Chatting: Q&A Session', thumbnailUrl: 'https://placehold.co/600x338/8B5CF6/FFFFFF.png?text=Chat', isLive: true, category: 'Just Chatting', viewers: 15000, username: 'ChattyKathy', userAvatarUrl: 'https://placehold.co/40x40.png?text=CK' },
  { id: '7', title: 'Fitness Challenge - Day 5', thumbnailUrl: 'https://placehold.co/600x338/EC4899/FFFFFF.png?text=Fitness', isLive: true, category: 'Fitness', viewers: 2300, username: 'FitLife', userAvatarUrl: 'https://placehold.co/40x40.png?text=FL' },
  { id: '8', title: 'Upcoming: Indie Game Showcase', thumbnailUrl: 'https://placehold.co/600x338/6366F1/FFFFFF.png?text=Upcoming', isLive: false, category: 'Gaming', viewers: 0, username: 'IndieDev', userAvatarUrl: 'https://placehold.co/40x40.png?text=ID' },
];

export default function StreamsPage() {
  const [streams, setStreams] = useState<Stream[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    // Sort streams: live first, then by viewers (desc), then upcoming
    const sortedStreams = [...mockStreams].sort((a, b) => {
      if (a.isLive && !b.isLive) return -1;
      if (!a.isLive && b.isLive) return 1;
      if (a.isLive && b.isLive) return b.viewers - a.viewers; // More viewers first for live
      return a.title.localeCompare(b.title); // Alphabetical for upcoming
    });
    setStreams(sortedStreams);
  }, []);
  
  const categories = ['all', ...new Set(mockStreams.map(s => s.category))];

  const filteredStreams = streams.filter(stream => {
    const matchesSearch = stream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          stream.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || stream.category === filterCategory;
    return matchesSearch && matchesCategory;
  });


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline mb-2">Discover Streams</h1>
        <p className="text-muted-foreground">Watch live streams or catch up on upcoming events.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search streams or creators..."
            className="pl-10 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search streams"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[200px]" aria-label="Filter by category">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category} className="capitalize">
                {category === 'all' ? 'All Categories' : category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredStreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredStreams.map((stream) => (
            <StreamCard key={stream.id} stream={stream} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold">No Streams Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
