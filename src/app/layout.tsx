import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono } from "next/font/google"; // Cinema & Engineering fonts
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Life as a Movie | AI Software Engineer",
  description: "A cinematic portfolio directed by an AI Architect.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${jetbrainsMono.variable} antialiased bg-neutral-950 text-neutral-100 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
