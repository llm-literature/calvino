'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Trash } from 'lucide-react'
import { useState, useEffect } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Leonia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [trashHeight, setTrashHeight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setTrashHeight((h) => (h >= 100 ? 0 : h + 0.5))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-sans text-slate-900 selection:bg-slate-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full border border-slate-200 bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-4 text-6xl font-bold tracking-tighter">LEONIA</h1>
        <p className="mb-8 text-xl text-slate-500">
          {language === 'en' ? 'The City of New Things' : '新事物之城'}
        </p>

        <div className="z-20 max-w-md rounded-2xl border border-slate-100 bg-white p-8 text-center shadow-xl">
          <p className="mb-4">
            {language === 'en'
              ? 'Every morning the people of Leonia wake up in fresh sheets, wash with fresh soaps, wear brand-new clothing, take from the latest model refrigerator still unopened tins...'
              : '每天早晨，莱奥尼亚的人们在清新的床单中醒来，用新鲜的肥皂洗漱，穿上崭新的衣服，从最新型号的冰箱里拿出未开封的罐头……'}
          </p>
          <div className="text-xs tracking-widest text-slate-400 uppercase">
            {language === 'en' ? 'Trash Level' : '垃圾水平'}: {Math.floor(trashHeight)}%
          </div>
        </div>
      </div>

      {/* The Rising Trash */}
      <motion.div
        className="absolute right-0 bottom-0 left-0 flex flex-wrap content-end overflow-hidden bg-slate-800"
        style={{ height: `${trashHeight}%` }}
      >
        <div className="absolute top-0 left-0 h-2 w-full animate-pulse bg-slate-600" />
        {Array.from({ length: 100 }).map((_, i) => (
          <div key={i} className="p-4 opacity-20">
            <Trash className="h-8 w-8 text-white" />
          </div>
        ))}
      </motion.div>

      <div className="fixed bottom-4 left-4 z-20 text-xs text-slate-400">
        {language === 'en'
          ? '"The city refashions itself every day..."'
          : '“城市每天都在重塑自己……”'}
      </div>
    </div>
  )
}
