'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Frown, Smile } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Raissa({ city }: { city: City }) {
  const { language } = useLanguage()
  const [showHidden, setShowHidden] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-200 font-sans text-slate-800 selection:bg-slate-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-12 font-serif text-6xl text-slate-700">RAISSA</h1>

        <div
          className="group relative aspect-video w-full max-w-2xl cursor-pointer"
          onMouseEnter={() => setShowHidden(true)}
          onMouseLeave={() => setShowHidden(false)}
        >
          {/* The Unhappy City (Visible) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-slate-300 p-8 shadow-xl"
            animate={{
              opacity: showHidden ? 0.2 : 1,
              filter: showHidden ? 'blur(4px)' : 'blur(0px)',
            }}
          >
            <Frown className="mb-4 h-32 w-32 text-slate-500" />
            <p className="text-center text-xl text-slate-600">
              {language === 'en'
                ? '"Life in Raissa is not happy. People wring their hands as they walk in the streets..."'
                : '“莱萨的生活并不快乐。人们走在街上时绞着双手……”'}
            </p>
          </motion.div>

          {/* The Hidden Thread of Happiness */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            animate={{ opacity: showHidden ? 1 : 0, scale: showHidden ? 1 : 0.8 }}
          >
            <div className="rounded-full bg-yellow-100/90 p-8 text-center shadow-[0_0_50px_rgba(253,224,71,0.5)] backdrop-blur-sm">
              <Smile className="mx-auto mb-2 h-24 w-24 text-yellow-500" />
              <p className="font-bold text-yellow-700">
                {language === 'en' ? '"But there is a hidden thread..."' : '“但有一条隐藏的线索……”'}
              </p>
              <p className="mt-2 text-sm text-yellow-600">
                {language === 'en'
                  ? 'A child laughs, a dog plays, a mason sings.'
                  : '一个孩子在笑，一只狗在玩耍，一个泥瓦匠在唱歌。'}
              </p>
            </div>
          </motion.div>
        </div>

        <p className="mt-12 animate-pulse text-slate-500">
          {language === 'en' ? 'Hover to find the hidden happiness' : '悬停以寻找隐藏的幸福'}
        </p>
      </div>
    </div>
  )
}
