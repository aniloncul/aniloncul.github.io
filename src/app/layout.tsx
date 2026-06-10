import type { Metadata } from "next";
import { Bebas_Neue, JetBrains_Mono, Goldman } from "next/font/google";
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

const goldman = Goldman({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-goldman",
});

export const metadata: Metadata = {
  title: "Anil ÖNCÜL"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${jetbrainsMono.variable} ${goldman.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
