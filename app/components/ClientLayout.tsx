'use client';

export default function ClientLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <main className="min-h-screen">{children}</main>
    </>
  );
}
