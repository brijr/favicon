interface EmojiPreviewProps {
  emoji: string;
}

export function EmojiPreview({ emoji }: EmojiPreviewProps) {
  return <div className="text-8xl text-center py-8">{emoji}</div>;
}
