'use client'

import { useLanguage } from '@/app/context/LanguageContext'

export default function LargeWithLogoCentered() {
  const { language } = useLanguage()
  return (
    <div className="border-t border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-900">
      <div className="container mx-auto flex flex-col items-center justify-center py-12">
        <p className="text-center font-serif text-lg text-stone-600 italic dark:text-stone-400">
          {language === 'en'
            ? 'The collision of AI and literature is a brilliant sword of the sun! ——MathewShen'
            : 'AI与文学的碰撞是一把璀璨的太阳之剑！ ——MathewShen'}
        </p>
      </div>
    </div>
  )
}
