// app/providers.tsx
'use client'

import { LanguageProvider } from '@/app/context/LanguageContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
