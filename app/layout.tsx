import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import React from "react";
import { Providers } from "./providers";
import WithSubnavigation from './components/NavBar';
import LargeWithLogoCentered from './components/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Calvino',
  description: 'LLM and Literature: Calvino',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <WithSubnavigation/>
          {children}
          <LargeWithLogoCentered/>
        </Providers>
      </body>
    </html>
  );
}
