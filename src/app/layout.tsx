// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { Roboto_Mono as FontMono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/shared/header";
import { LoaderShows } from "./components/shared/loader-shows";
import { Toaster } from "@/components/ui/sonner";
import React, { Suspense } from "react"; 
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-geist-sans", 
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "EuroSkills Concerts",
  description: "Book tickets for amazing concerts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
    <html lang="en" suppressHydrationWarning={true} className={cn(fontSans.variable, fontMono.variable)}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <Header />
        <main className="flex-grow">
          <LoaderShows>
            <Suspense fallback={
              <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                Loading page content...
              </div>
            }>
              {children}
            </Suspense>
          </LoaderShows>
        </main>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}