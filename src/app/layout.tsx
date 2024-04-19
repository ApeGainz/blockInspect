import type { Metadata } from "next";
import { Oswald } from "next/font/google";
import "./globals.css";
import React from "react";
import { Providers } from "@/app/providers";
import "./globalicons.css";
import Link from "next/link";

const oswald = Oswald({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Block Inspect",
  description: "A tool for tracking transactions and wallets by Akshit Singh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${oswald.className} bg-neutral-800`}>
          <Link href={"/"}>
            <span className="material-symbols-outlined absolute top-4 left-4 text-neutral-50">
              home
            </span>
          </Link>

          {children}
        </body>
      </Providers>
    </html>
  );
}
