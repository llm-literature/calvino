'use client'

import { useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function SetLanguage({ lang }: { lang: 'en' | 'cn' }) {
  const { setLanguage } = useLanguage()

  useEffect(() => {
    setLanguage(lang)
  }, [lang, setLanguage])

  return null
}
