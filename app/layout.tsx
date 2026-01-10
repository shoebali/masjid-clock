import React from "react";
import type { Metadata } from "next";
import { Orbitron, Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ['400', '700', '900']
});
const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ['400', '700', '900']
});

export const metadata: Metadata = {
  title: "Masjid Clock",
  description: "Offline Prayer Time Display",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${orbitron.variable} ${cinzel.variable} antialiased bg-black text-white overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
