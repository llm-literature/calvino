'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Andria({ city }: { city: City }) {
  const { language } = useLanguage()
  const [highlight, setHighlight] = useState<number | null>(null)

  const stars = [
    { id: 1, x: 20, y: 20, label: language === 'en' ? 'Antares' : '心宿二' },
    { id: 2, x: 50, y: 15, label: language === 'en' ? 'Vega' : '织女星' },
    { id: 3, x: 80, y: 30, label: language === 'en' ? 'Altair' : '牛郎星' },
    { id: 4, x: 30, y: 60, label: language === 'en' ? 'Sirius' : '天狼星' },
    { id: 5, x: 70, y: 70, label: language === 'en' ? 'Rigel' : '参宿七' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-indigo-950 font-serif text-indigo-100 selection:bg-indigo-800">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-4 text-6xl tracking-widest text-indigo-200">
          {language === 'en' ? 'ANDRIA' : city.cnName}
        </h1>
        <p className="mb-12 text-indigo-400">
          {language === 'en'
            ? '"Built so artfully that its every street follows a planet\'s orbit."'
            : '"建造得如此巧妙，每条街道都遵循着行星的轨道。"'}
        </p>

        <div className="relative aspect-square w-full max-w-3xl overflow-hidden rounded-full border border-indigo-800/50 bg-black/20 shadow-2xl">
          {/* Orbits */}
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <div className="h-[80%] w-[80%] rounded-full border border-indigo-500" />
            <div className="absolute h-[60%] w-[60%] rounded-full border border-indigo-500" />
            <div className="absolute h-[40%] w-[40%] rounded-full border border-indigo-500" />
          </div>

          {/* Stars/Locations */}
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="group absolute cursor-pointer"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              onMouseEnter={() => setHighlight(star.id)}
              onMouseLeave={() => setHighlight(null)}
              animate={{ scale: highlight === star.id ? 1.5 : 1 }}
            >
              <Star
                className={`h-6 w-6 ${highlight === star.id ? 'fill-yellow-200 text-yellow-200' : 'text-indigo-400'}`}
              />

              {/* Connection Line to Center (The City's correspondence) */}
              <svg
                className="pointer-events-none absolute top-3 left-3 h-125 w-125 overflow-visible"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <motion.line
                  x1="50%"
                  y1="50%"
                  x2="50%"
                  y2="50%"
                  stroke="rgba(253, 224, 71, 0.5)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: highlight === star.id ? 1 : 0 }}
                />
              </svg>

              <div className="absolute top-8 left-1/2 -translate-x-1/2 rounded border border-indigo-700 bg-indigo-900 px-2 py-1 text-xs whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100">
                {star.label} {language === 'en' ? 'Street' : '街'}
              </div>
            </motion.div>
          ))}

          {/* Center City */}
          <div className="absolute top-1/2 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-indigo-500 bg-indigo-900 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
          </div>
        </div>
      </div>
    </div>
  )
}
