'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Olinda({ city }: { city: City }) {
  const { language } = useLanguage()
  const [rings, setRings] = useState<number[]>([1])

  return (
    <div className="relative min-h-screen overflow-hidden bg-emerald-50 font-serif text-emerald-900 selection:bg-emerald-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-8 text-6xl text-emerald-800">OLINDA</h1>

        <div
          className="relative flex h-150 w-150 cursor-pointer items-center justify-center"
          onClick={() => setRings([...rings, rings.length + 1])}
        >
          {rings.map((r, i) => {
            const size = 100 + i * 60
            const isNewest = i === rings.length - 1
            return (
              <motion.div
                key={r}
                className={`absolute flex items-center justify-center rounded-full border-4 ${
                  isNewest
                    ? 'z-10 border-emerald-600 bg-emerald-100'
                    : 'z-0 border-emerald-300 bg-white'
                }`}
                style={{ width: size, height: size }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 50 }}
              >
                {isNewest && (
                  <span className="rounded-full bg-white px-2 py-1 text-xs font-bold text-emerald-700 shadow-sm">
                    {language === 'en' ? 'New Olinda' : '新奥林达'}
                  </span>
                )}
              </motion.div>
            )
          })}

          <div className="pointer-events-none absolute z-20 text-center">
            <div className="mx-auto mb-2 h-4 w-4 rounded-full bg-emerald-900" />
            <span className="rounded bg-white/80 px-2 text-xs font-bold text-emerald-900">
              {language === 'en' ? 'Old Olinda' : '旧奥林达'}
            </span>
          </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-emerald-600 italic">
          {language === 'en'
            ? '"Olinda is certainly not the only city that grows in concentric circles... But in other cities... the old walls expand... In Olinda, the old walls expand bearing the old quarters with them."'
            : '“奥林达当然不是唯一一个以同心圆方式扩张的城市……但在其他城市……旧城墙在扩张……而在奥林达，旧城墙带着旧街区一起扩张。”'}
        </p>
        <p className="mt-4 animate-pulse text-sm text-emerald-400">
          {language === 'en' ? 'Click to grow a new Olinda' : '点击生长出一个新奥林达'}
        </p>
      </div>
    </div>
  )
}
