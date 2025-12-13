'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Recycle } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Clarice({ city }: { city: City }) {
  const { language } = useLanguage()
  const [epoch, setEpoch] = useState(0)

  const fragments = [
    { color: 'bg-amber-200', shape: 'rounded-none' },
    { color: 'bg-stone-300', shape: 'rounded-full' },
    { color: 'bg-rose-200', shape: 'rounded-tl-3xl' },
    { color: 'bg-emerald-200', shape: 'rounded-br-3xl' },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-50 font-serif text-stone-800 selection:bg-stone-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-4 text-6xl">{language === 'en' ? 'CLARICE' : city.cnName}</h1>
        <p className="mb-12 text-stone-500">
          {language === 'en' ? 'Epoch' : '纪元'} {epoch + 1}
        </p>

        <div className="relative flex h-96 w-full max-w-3xl flex-wrap content-end gap-2 overflow-hidden rounded-lg border-2 border-stone-200 bg-white p-8 shadow-inner">
          {/* The City Layers */}
          {Array.from({ length: 20 }).map((_, i) => {
            // Deterministic pseudo-random based on epoch and index
            const seed = (epoch * 20 + i) * 12345
            const fragmentType = fragments[seed % fragments.length]
            const height = (seed % 10) * 10 + 20
            const width = (seed % 5) * 20 + 40

            return (
              <motion.div
                key={`${epoch}-${i}`}
                className={`${fragmentType.color} ${fragmentType.shape} border border-stone-400/20`}
                style={{ width, height }}
                initial={{ y: -500, opacity: 0, rotate: seed % 360 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05, type: 'spring' }}
              />
            )
          })}
        </div>

        <button
          onClick={() => setEpoch((e) => e + 1)}
          className="mt-12 flex items-center gap-2 rounded-full bg-stone-800 px-6 py-3 text-stone-100 transition-colors hover:bg-stone-700"
        >
          <Recycle className="h-5 w-5" /> {language === 'en' ? 'Rebuild City' : '重建城市'}
        </button>

        <p className="mt-8 max-w-xl text-center text-sm text-stone-600 italic">
          {language === 'en'
            ? '"Clarice, the glorious city, has a tormented history. Several times it decayed, then burgeoned again, always keeping the first Clarice as an unparalleled model of every splendor."'
            : '"光辉的城市克拉丽切有着一段痛苦的历史。它几次衰败，又几次复兴，始终将第一个克拉丽切作为每一种辉煌的无与伦比的典范。"'}
        </p>
      </div>
    </div>
  )
}
