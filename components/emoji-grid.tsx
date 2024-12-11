'use client';

import { Button } from '@/components/ui/button';

interface EmojiGridProps {
  emojis: string[];
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

export function EmojiGrid({ emojis, selectedEmoji, onSelect }: EmojiGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {emojis.map((emoji) => (
        <Button
          key={emoji}
          variant="ghost"
          className={`text-2xl h-12 ${selectedEmoji === emoji ? 'bg-secondary' : ''}`}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
}