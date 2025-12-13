'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Procopia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [population, setPopulation] = useState(1)

  return (
    <div className="relative min-h-screen bg-orange-50 text-orange-900 font-sans overflow-hidden selection:bg-orange-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <div className="text-center mb-8 z-10">
            <h1 className="text-6xl font-bold mb-2 text-orange-800">PROCOPIA</h1>
            <p className="text-orange-600">
                {language === 'en' ? 'Population:' : '人口：'} {population}
            </p>
        </div>

        <div className="relative w-full max-w-4xl h-125 bg-white rounded-3xl shadow-inner overflow-hidden flex flex-wrap content-start p-4 gap-1">
            
            {/* The Crowd */}
            {Array.from({ length: population }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-8 h-8 bg-orange-300 rounded-full flex items-center justify-center text-[10px] text-orange-800 font-bold"
                >
                    :)
                </motion.div>
            ))}

            {/* The View (Window) */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-64 h-64 border-8 border-orange-900/20 rounded-full" />
            </div>

        </div>

        <button 
            onClick={() => setPopulation(p => Math.min(p + 10, 500))}
            className="mt-8 px-8 py-4 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-500 transition-transform active:scale-95 flex items-center gap-2 z-10"
        >
            <UserPlus className="w-6 h-6" /> {language === 'en' ? 'Wait One Year' : '等待一年'}
        </button>

        <p className="mt-8 max-w-xl text-center text-orange-700/60 italic z-10">
            {language === 'en'
                ? '"Every year we have to pull down the cornice... the horizon is blocked by the faces of the crowd."'
                : '“每年我们都不得不拆除檐口……地平线被人群的面孔挡住了。”'}
        </p>

      </div>
    </div>
  )
}
