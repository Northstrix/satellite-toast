import type { Metadata } from 'next';
import './globals.css';
import AppNavbar from '@/components/app-navbar';
import React from 'react';

export const metadata: Metadata = {
  title: '<SatelliteToast/>',
  description: 'A flexible, reusable toast notification component designed to suit diverse UX needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-black text-gray-200">
        <AppNavbar />
        {children}
      </body>
    </html>
  );
}
