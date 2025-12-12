'use client';

import { usePathname } from 'next/navigation';
import WithSubnavigation from './NavBar';
import LargeWithLogoCentered from './Footer';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <>
      {!isHomePage && <WithSubnavigation />}
      <main className="min-h-screen">
        {children}
      </main>
      {!isHomePage && <LargeWithLogoCentered />}
    </>
  );
}
