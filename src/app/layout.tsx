'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider  } from "next-themes"

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TooltipProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
        >
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </TooltipProvider>
    </html>
  );
}
