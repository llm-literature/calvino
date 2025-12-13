'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ZoomIn } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Eudoxia({ city }: { city: City }) {
  const [isCarpet, setIsCarpet] = useState(true)
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen overflow-hidden bg-indigo-50 font-sans text-indigo-900 selection:bg-indigo-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-8 font-serif text-6xl text-indigo-800">EUDOXIA</h1>

        <div
          className="group relative aspect-square w-full max-w-2xl cursor-pointer"
          onClick={() => setIsCarpet(!isCarpet)}
        >
          {/* The Carpet */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg bg-indigo-900 shadow-2xl"
            animate={{ opacity: isCarpet ? 1 : 0, scale: isCarpet ? 1 : 0.9 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid h-full w-full grid-cols-8 grid-rows-8 gap-1 p-4">
              {Array.from({ length: 64 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-sm ${
                    (i + Math.floor(i / 8)) % 2 === 0 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold">
                <ZoomIn className="h-4 w-4" /> {language === 'en' ? 'See the City' : '查看城市'}
              </span>
            </div>
          </motion.div>

          {/* The City */}
          <motion.div
            className="absolute inset-0 overflow-hidden rounded-lg bg-slate-200 shadow-2xl"
            animate={{ opacity: isCarpet ? 0 : 1, scale: isCarpet ? 1.1 : 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 p-8">
              <div className="relative h-full w-full border-4 border-slate-400">
                {/* Chaotic streets */}
                <div className="absolute top-10 left-10 h-40 w-20 rotate-12 bg-slate-400" />
                <div className="absolute right-20 bottom-20 h-20 w-40 -rotate-6 bg-slate-500" />
                <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-600" />

                {/* The Carpet Temple */}
                <div className="absolute top-4 right-4 h-16 w-16 animate-pulse rounded bg-indigo-600 shadow-lg" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-bold">
                <ZoomIn className="h-4 w-4" /> {language === 'en' ? 'See the Carpet' : '查看地毯'}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 max-w-xl text-center text-indigo-700">
          <p className="mb-4 italic">
            {language === 'en'
              ? '"Which is the true map of the city? The chaotic streets or the geometric carpet?"'
              : '“哪一个是城市的真实地图？混乱的街道还是几何图案的地毯？”'}
          </p>
          <p className="text-sm text-indigo-500">
            {language === 'en'
              ? "In Eudoxia, a carpet is preserved where you can observe the city's true form."
              : '在欧多西亚，保存着一块地毯，你可以从中观察到城市的真实形态。'}
          </p>
        </div>
      </div>
    </div>
  )
}
