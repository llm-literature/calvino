'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Irene({ city }: { city: City }) {
  const [distance, setDistance] = useState(100)
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen bg-blue-950 text-blue-100 font-serif overflow-hidden selection:bg-blue-800">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        
        {/* The City View */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.div
                className="relative"
                style={{ 
                    scale: 1 + (100 - distance) / 50,
                    filter: `blur(${(100 - distance) / 10}px)`
                }}
            >
                {/* Distant Irene */}
                <div className="text-center">
                    <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    <h1 className="text-9xl font-bold text-white/80 tracking-[0.2em] drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">IRENE</h1>
                    <p className="mt-4 text-blue-300 text-xl">{language === 'en' ? 'The city seen from the plateau' : '从高原上看到的城市'}</p>
                </div>
            </motion.div>

            {/* Close up overlay (The "Inside" view which is never seen) */}
            <motion.div 
                className="absolute inset-0 bg-black flex items-center justify-center"
                style={{ opacity: (100 - distance) / 100 > 0.8 ? ((100 - distance) / 100 - 0.8) * 5 : 0 }}
            >
                <p className="text-2xl text-gray-500 max-w-md text-center px-8">
                    {language === 'en' ? '"If you saw it, standing in its midst, it would be a different city."' : '“如果你站在其中看到它，那将是另一座城市。”'}
                </p>
            </motion.div>
        </div>

        {/* Distance Control */}
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 w-64 z-50">
            <label className="block text-center text-sm mb-2 text-blue-300">{language === 'en' ? 'Distance from City' : '与城市的距离'}</label>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={distance} 
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full accent-blue-400 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-blue-500 mt-1">
                <span>{language === 'en' ? 'Inside' : '内部'}</span>
                <span>{language === 'en' ? 'Afar' : '远处'}</span>
            </div>
        </div>

      </div>
    </div>
  )
}
