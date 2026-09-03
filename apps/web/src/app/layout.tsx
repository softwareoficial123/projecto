"use client";
import { useEffect } from "react";
import { initConsoleCapture } from "@/lib/client-logger";
import "./globals.css";
import { ThemeProvider } from "@/components/core/ThemeProvider";
import { LogInterceptor } from "@/components/core/LogInterceptor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initConsoleCapture();
  }, []);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <LogInterceptor>{children}</LogInterceptor>
        </ThemeProvider>
      </body>
    </html>
  );
}
