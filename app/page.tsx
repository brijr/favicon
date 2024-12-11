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
  const [selectedEmoji, setSelectedEmoji] = useState("😊");

  const handleDownload = async () => {
    try {
      await convertEmojiToFavicon(selectedEmoji);
      toast.success("Favicon downloaded");
    } catch {
      toast.error("Failed to generate favicon");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xl space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-medium">Emoji to Favicon</h1>
        </div>

        <EmojiPreview emoji={selectedEmoji} />

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Select or paste an emoji / letter
          </p>

          <Input
            value={selectedEmoji}
            onChange={(e) => setSelectedEmoji(e.target.value)}
            placeholder="Or paste an emoji"
            className="text-2xl text-center"
          />

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
          <a className="underline underline-offset-2" href="https://bridger.to">
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
