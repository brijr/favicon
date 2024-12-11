import "./globals.css";
import type { Metadata } from "next";
import { Manrope as Font } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

const font = Font({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Emoji to Favicon Converter",
  description: "Convert any emoji into a favicon for your website",
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
      </body>
    </html>
  );
}
