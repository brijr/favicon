"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { EmojiGrid } from "@/components/emoji-grid";
import { EmojiPreview } from "@/components/emoji-preview";
import { convertEmojiToFavicon } from "@/lib/favicon";

const commonEmojis = [
  "📁",
  "🏜️",
  "🌴",
  "🌲",
  "💸",
  "💭",
  "💻",
  "📱",
  "⌨️",
  "🖥️",
  "🖨️",
  "🔌",
  "🖱️",
  "📟",
  "🎮",
  "⌚",
  "👨‍💻",
  "👩‍💻",
  "🤖",
  "⚡",
  "🔨",
  "🛠️",
  "🔧",
  "🐛",
  "✨",
  "💡",
  "☁️",
  "🌐",
  "🔐",
  "🔑",
  "📡",
  "🔗",
  "🌏",
  "📶",
  "🔄",
  "💾",
  "📧",
  "📲",
  "🔔",
  "📊",
  "📈",
  "📱",
  "🎥",
  "🎬",
  "📸",
  "🔍",
  "🚀",
  "⭐",
  "🔥",
  "💫",
  "🏄‍♂️",
  "🎯",
  "🌟",
  "✅",
  "⚡",
  "🔮",
];

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState("👋");

  const handleDownload = async () => {
    try {
      await convertEmojiToFavicon(selectedEmoji);
      toast.success("Favicon downloaded");
    } catch {
      toast.error("Failed to generate favicon");
    }
  };

  return (
    <main className="min-h-screen p-4 sm:p-12">
      <div className="w-full max-w-xl space-y-8">
        <div>
          <h1>Emoji to Favicon</h1>
        </div>

        <div className="grid grid-cols-2 divide-x border">
          <div className="p-4 relative bg-accent/50">
            <EmojiPreview emoji={selectedEmoji} />
            <p className="text-xs text-muted-foreground absolute top-2 left-2">
              Selected Emoji
            </p>
          </div>
          <div className="divide-y grid">
            <p className="text-sm text-muted-foreground p-2">
              Select or paste an emoji / letter
            </p>
            <input
              value={selectedEmoji}
              onChange={(e) => setSelectedEmoji(e.target.value)}
              placeholder="Or paste an emoji"
              className="text-2xl text-center w-full p-2 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-4">
          <EmojiGrid
            emojis={commonEmojis}
            selectedEmoji={selectedEmoji}
            onSelect={setSelectedEmoji}
          />

          <Button onClick={handleDownload} className="w-full" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>

        <p className="text-sm text-muted-foreground">
          Downloads as 32x32 ICO file
        </p>

        <p className="text-xs">
          Created by{" "}
          <a className="underline underline-offset-2" href="https://brijr.dev">
            Bridger
          </a>
          . View on{" "}
          <a
            className="underline underline-offset-2"
            href="https://github.com/brijr/favicon"
          >
            Github
          </a>
          .
        </p>
      </div>
    </main>
  );
}
