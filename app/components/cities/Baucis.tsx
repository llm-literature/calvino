'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Cloud, Eye } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Baucis({ city }: { city: City }) {
  const { language } = useLanguage()
  const [hoveredStilt, setHoveredStilt] = useState<number | null>(null)

  const stilts = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    left: `${15 + i * 12}%`,
    delay: i * 0.1,
  }))

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-100 font-sans text-sky-900 selection:bg-sky-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 shadow-sm backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Clouds Layer (Top) */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-80">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
            className="absolute text-white opacity-60"
            style={{ top: `${10 + i * 15}%` }}
          >
            <Cloud size={100 + i * 50} fill="white" />
          </motion.div>
        ))}
      </div>

      {/* The City (Above Clouds) */}
      <div className="relative z-30 container mx-auto flex min-h-screen flex-col items-center px-4 pt-32">
        <h1 className="mb-8 text-6xl font-thin tracking-[0.2em] text-sky-800">
          {language === 'en' ? 'BAUCIS' : city.cnName}
        </h1>

        <div className="relative mt-12 h-[60vh] w-full">
          {/* Stilts */}
          {stilts.map((stilt) => (
            <div
              key={stilt.id}
              className="group absolute top-0 bottom-0 w-2 cursor-pointer rounded-full bg-amber-800/80 transition-all hover:w-4 hover:bg-amber-700"
              style={{ left: stilt.left }}
              onMouseEnter={() => setHoveredStilt(stilt.id)}
              onMouseLeave={() => setHoveredStilt(null)}
            >
              {/* House on top */}
              <div className="absolute -top-12 -left-6 z-40 flex h-16 w-16 items-center justify-center rounded-lg border-4 border-amber-800 bg-amber-100 shadow-xl">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-200">
                  <Eye className="h-4 w-4 text-sky-700" />
                </div>
              </div>

              {/* Telescope View (Appears on Hover) */}
              <div
                className={cn(
                  'absolute top-1/2 left-8 z-50 h-48 w-48 origin-left overflow-hidden rounded-full border-4 border-sky-500 bg-white shadow-2xl transition-all duration-300',
                  hoveredStilt === stilt.id ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                )}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-green-100">
                  {/* Ground details */}
                  <div className="p-4 text-center">
                    <p className="mb-2 text-xs font-bold text-green-800 uppercase">
                      {language === 'en' ? 'Ground Level' : '地面'}
                    </p>
                    {stilt.id % 3 === 0 && (
                      <p className="text-sm">
                        {language === 'en' ? '🍃 A leaf fluttering' : '🍃 一片飘落的叶子'}
                      </p>
                    )}
                    {stilt.id % 3 === 1 && (
                      <p className="text-sm">
                        {language === 'en' ? '🐜 An ant marching' : '🐜 一只行进的蚂蚁'}
                      </p>
                    )}
                    {stilt.id % 3 === 2 && (
                      <p className="text-sm">
                        {language === 'en' ? '🪨 A pebble resting' : '🪨 一颗静止的鹅卵石'}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none fixed right-0 bottom-12 left-0 z-40 text-center">
        <p className="mx-auto max-w-xl rounded-xl bg-white/30 p-4 text-sky-700 italic backdrop-blur">
          {language === 'en'
            ? '"Nothing of the city touches the earth except those long flamingo legs on which it rests and, when the days are sunny, a pierced, angular shadow that falls on the foliage."'
            : '"这座城市除了那些支撑它的长长的红鹤腿之外，没有任何东西接触地面；在阳光明媚的日子里，它会在树叶上投下镂空的、棱角分明的影子。"'}
        </p>
      </div>
    </div>
  )
}
