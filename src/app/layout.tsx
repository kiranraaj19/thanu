import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Love Story 💕",
  description: "A collection of little games, each one a piece of us",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-romantic-gradient">
        {children}
      </body>
    </html>
  );
}
