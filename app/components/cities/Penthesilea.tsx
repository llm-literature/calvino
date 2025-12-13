'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Penthesilea({ city }: { city: City }) {
  const { language } = useLanguage()
  const [zoom, setZoom] = useState(1)

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-200 font-sans text-stone-800 selection:bg-stone-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
        <h1 className="z-10 mb-8 text-6xl font-bold text-stone-600">PENTHESILEA</h1>

        <div className="relative h-150 w-full overflow-hidden rounded-lg border-4 border-stone-400 bg-stone-300">
          <motion.div
            className="absolute inset-0 flex flex-wrap content-center justify-center"
            style={{ scale: zoom }}
          >
            {Array.from({ length: 100 }).map((_, i) => (
              <div
                key={i}
                className="flex h-32 w-32 items-center justify-center border border-stone-400/50 p-4"
              >
                <div className="text-center text-xs text-stone-500">
                  {language === 'en' ? 'Outskirts of Penthesilea' : '彭忒西勒亚的郊区'}
                </div>
              </div>
            ))}
          </motion.div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_20%,rgba(231,229,228,0.8)_100%)]" />
        </div>

        <div className="z-10 mt-8 flex items-center gap-4 rounded-full bg-white/50 p-4 backdrop-blur">
          <span className="text-sm font-bold text-stone-600">
            {language === 'en' ? 'Travel:' : '旅行：'}
          </span>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-64 accent-stone-600"
          />
        </div>

        <p className="z-10 mt-8 max-w-xl text-center text-stone-600 italic">
          {language === 'en'
            ? '"You advance for hours and it is not clear to you whether you are already in the city\'s midst or still outside it... Penthesilea is only the outskirts of itself."'
            : '“你走了几个小时，却不清楚自己是已经在城市中心，还是仍在城外……彭忒西勒亚只是它自己的郊区。”'}
        </p>
      </div>
    </div>
  )
}
