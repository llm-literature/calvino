'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Star, Skull } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Perinthia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [alignment, setAlignment] = useState(0)

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 font-serif overflow-hidden selection:bg-purple-900">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <div className="relative w-full max-w-2xl aspect-square">
            
            {/* The Sky (Stars) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
                {Array.from({ length: 10 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-yellow-100"
                        style={{ 
                            left: `${20 + i * 7}%`, 
                            top: `${20 + Math.sin(i) * 10}%` 
                        }}
                        animate={{ 
                            x: (alignment - 50) * (i % 2 === 0 ? 1 : -1),
                            opacity: 1 - Math.abs(alignment - 50) / 100
                        }}
                    >
                        <Star className="w-4 h-4 fill-yellow-100" />
                    </motion.div>
                ))}
            </div>

            {/* The City (Monsters) */}
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    className="relative w-64 h-64"
                    animate={{ 
                        scale: 1 + alignment / 100,
                        filter: `hue-rotate(${alignment * 2}deg)`
                    }}
                >
                    {/* Normal City */}
                    <div className="absolute inset-0 bg-slate-800 rounded-lg flex items-center justify-center transition-opacity duration-500" style={{ opacity: 1 - alignment / 100 }}>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-600 mx-auto mb-2 rounded" />
                            <p>{language === 'en' ? 'Perfect Harmony' : '完美和谐'}</p>
                        </div>
                    </div>

                    {/* Monster City */}
                    <div className="absolute inset-0 bg-purple-900/50 rounded-full flex items-center justify-center transition-opacity duration-500" style={{ opacity: alignment / 100 }}>
                        <div className="text-center animate-pulse">
                            <Skull className="w-32 h-32 text-purple-400 mx-auto mb-2" />
                            <p className="text-purple-300 font-bold">
                                {language === 'en' ? 'MONSTERS' : '怪物'}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>

        </div>

        <div className="w-full max-w-md mt-12">
            <label className="block text-center text-sm mb-4 text-slate-500">
                {language === 'en' ? 'Align with the Stars' : '与星辰对齐'}
            </label>
            <input 
                type="range" 
                min="0" 
                max="100" 
                value={alignment} 
                onChange={(e) => setAlignment(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-600 mt-2">
                <span>{language === 'en' ? 'Chaos' : '混乱'}</span>
                <span>{language === 'en' ? 'Perfect Alignment' : '完美对齐'}</span>
            </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-slate-500 italic">
            {language === 'en'
                ? '"They guaranteed that the city would reflect the harmony of the firmament... but the city is inhabited by cripples, dwarfs, hunchbacks, obese men, bearded women."'
                : '“他们保证这座城市将反映苍穹的和谐……但这座城市里住着残疾人、侏儒、驼背、肥胖者、长胡子的女人。”'}
        </p>

      </div>
    </div>
  )
}
