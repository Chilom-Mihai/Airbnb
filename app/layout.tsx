import { Inter } from "next/font/google";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";
import Providers from "./providers";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb",
  description: "Feel at home, away from home.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Suspense fallback={<div>Loading navbar...</div>}>
              <Navbar />
            </Suspense>
            <main className="container py-10">{children}</main>
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
