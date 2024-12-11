import "./globals.css";
import type { Metadata } from "next";
import { Inter as Font } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emoji to Favicon Converter - Generate favicon.ico from an Emoji",
  description: "Use this tool to generate favicon.ico from an emoji",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
