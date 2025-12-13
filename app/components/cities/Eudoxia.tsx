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
    <div className="relative min-h-screen bg-indigo-50 text-indigo-900 font-sans overflow-hidden selection:bg-indigo-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-serif mb-8 text-indigo-800">EUDOXIA</h1>

        <div className="relative w-full max-w-2xl aspect-square cursor-pointer group" onClick={() => setIsCarpet(!isCarpet)}>
            
            {/* The Carpet */}
            <motion.div 
                className="absolute inset-0 bg-indigo-900 rounded-lg shadow-2xl overflow-hidden flex items-center justify-center"
                animate={{ opacity: isCarpet ? 1 : 0, scale: isCarpet ? 1 : 0.9 }}
                transition={{ duration: 0.8 }}
            >
                <div className="w-full h-full grid grid-cols-8 grid-rows-8 gap-1 p-4">
                    {Array.from({ length: 64 }).map((_, i) => (
                        <div 
                            key={i} 
                            className={`rounded-sm ${
                                (i + Math.floor(i / 8)) % 2 === 0 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                        />
                    ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" /> {language === 'en' ? 'See the City' : '查看城市'}
                    </span>
                </div>
            </motion.div>

            {/* The City */}
            <motion.div 
                className="absolute inset-0 bg-slate-200 rounded-lg shadow-2xl overflow-hidden"
                animate={{ opacity: isCarpet ? 0 : 1, scale: isCarpet ? 1.1 : 1 }}
                transition={{ duration: 0.8 }}
            >
                <div className="absolute inset-0 p-8">
                    <div className="w-full h-full border-4 border-slate-400 relative">
                        {/* Chaotic streets */}
                        <div className="absolute top-10 left-10 w-20 h-40 bg-slate-400 rotate-12" />
                        <div className="absolute bottom-20 right-20 w-40 h-20 bg-slate-500 -rotate-6" />
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-slate-600 rounded-full -translate-x-1/2 -translate-y-1/2" />
                        
                        {/* The Carpet Temple */}
                        <div className="absolute top-4 right-4 w-16 h-16 bg-indigo-600 rounded shadow-lg animate-pulse" />
                    </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                        <ZoomIn className="w-4 h-4" /> {language === 'en' ? 'See the Carpet' : '查看地毯'}
                    </span>
                </div>
            </motion.div>

        </div>

        <div className="mt-12 max-w-xl text-center text-indigo-700">
            <p className="italic mb-4">
                {language === 'en' ? '"Which is the true map of the city? The chaotic streets or the geometric carpet?"' : '“哪一个是城市的真实地图？混乱的街道还是几何图案的地毯？”'}
            </p>
            <p className="text-sm text-indigo-500">
                {language === 'en' ? "In Eudoxia, a carpet is preserved where you can observe the city's true form." : '在欧多西亚，保存着一块地毯，你可以从中观察到城市的真实形态。'}
            </p>
        </div>
      </div>
    </div>
  )
}
