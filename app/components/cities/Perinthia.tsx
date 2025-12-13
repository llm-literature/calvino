'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Star, Skull } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Perinthia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [alignment, setAlignment] = useState(0)

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 font-serif text-slate-300 selection:bg-purple-900">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div className="relative aspect-square w-full max-w-2xl">
          {/* The Sky (Stars) */}
          <div className="pointer-events-none absolute inset-0 z-20">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-100"
                style={{
                  left: `${20 + i * 7}%`,
                  top: `${20 + Math.sin(i) * 10}%`,
                }}
                animate={{
                  x: (alignment - 50) * (i % 2 === 0 ? 1 : -1),
                  opacity: 1 - Math.abs(alignment - 50) / 100,
                }}
              >
                <Star className="h-4 w-4 fill-yellow-100" />
              </motion.div>
            ))}
          </div>

          {/* The City (Monsters) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative h-64 w-64"
              animate={{
                scale: 1 + alignment / 100,
                filter: `hue-rotate(${alignment * 2}deg)`,
              }}
            >
              {/* Normal City */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-lg bg-slate-800 transition-opacity duration-500"
                style={{ opacity: 1 - alignment / 100 }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-2 h-16 w-16 rounded bg-slate-600" />
                  <p>{language === 'en' ? 'Perfect Harmony' : '完美和谐'}</p>
                </div>
              </div>

              {/* Monster City */}
              <div
                className="absolute inset-0 flex items-center justify-center rounded-full bg-purple-900/50 transition-opacity duration-500"
                style={{ opacity: alignment / 100 }}
              >
                <div className="animate-pulse text-center">
                  <Skull className="mx-auto mb-2 h-32 w-32 text-purple-400" />
                  <p className="font-bold text-purple-300">
                    {language === 'en' ? 'MONSTERS' : '怪物'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="mt-12 w-full max-w-md">
          <label className="mb-4 block text-center text-sm text-slate-500">
            {language === 'en' ? 'Align with the Stars' : '与星辰对齐'}
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={alignment}
            onChange={(e) => setAlignment(Number(e.target.value))}
            className="w-full cursor-pointer accent-purple-500"
          />
          <div className="mt-2 flex justify-between text-xs text-slate-600">
            <span>{language === 'en' ? 'Chaos' : '混乱'}</span>
            <span>{language === 'en' ? 'Perfect Alignment' : '完美对齐'}</span>
          </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-slate-500 italic">
          {language === 'en'
            ? '"They guaranteed that the city would reflect the harmony of the firmament... but the city is inhabited by cripples, dwarfs, hunchbacks, obese men, bearded women."'
            : '“他们保证这座城市将反映苍穹的和谐……但这座城市里住着残疾人、侏儒、驼背、肥胖者、长胡子的女人。”'}
        </p>
      </div>
    </div>
  )
}
