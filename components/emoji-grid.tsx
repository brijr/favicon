"use client";

import { Button } from "@/components/ui/button";

interface EmojiGridProps {
  emojis: string[];
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

export function EmojiGrid({ emojis, selectedEmoji, onSelect }: EmojiGridProps) {
  return (
    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
      {emojis.map((emoji, index) => (
        <Button
          key={index}
          variant="ghost"
          className={`text-2xl h-12 ${
            selectedEmoji === emoji ? "bg-secondary" : ""
          }`}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
}
