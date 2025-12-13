'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'cn'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const translations = {
  en: {
    home: 'Home',
    cities: 'Cities',
    about: 'About',
    categories: 'Categories',
    memory: 'Cities & Memory',
    desire: 'Cities & Desire',
    signs: 'Cities & Signs',
    thin: 'Thin Cities',
    trading: 'Trading Cities',
    eyes: 'Cities & Eyes',
    names: 'Cities & Names',
    dead: 'Cities & The Dead',
    sky: 'Cities & The Sky',
    continuous: 'Continuous Cities',
    hidden: 'Hidden Cities',
    prevCity: 'Previous City',
    nextCity: 'Next City',
    backToHome: 'Back to Home',
    explore: 'Explore',
    readMore: 'Read More',
    notFound: 'City not found',
  },
  cn: {
    home: '首页',
    cities: '城市',
    about: '关于',
    categories: '分类',
    memory: '城市与记忆',
    desire: '城市与欲望',
    signs: '城市与符号',
    thin: '轻盈的城市',
    trading: '贸易的城市',
    eyes: '城市与眼睛',
    names: '城市与名字',
    dead: '城市与死者',
    sky: '城市与天空',
    continuous: '连绵的城市',
    hidden: '隐蔽的城市',
    prevCity: '上一座城市',
    nextCity: '下一座城市',
    backToHome: '返回首页',
    explore: '探索',
    readMore: '阅读更多',
    notFound: '未找到该城市',
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('cn')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string) => {
    // @ts-expect-error: Dynamic key access on translations object
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
