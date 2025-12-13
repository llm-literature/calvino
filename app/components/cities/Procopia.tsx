'use client'

import { City } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, UserPlus, Users, Sun, Cloud } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Procopia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [year, setYear] = useState(1)
  const [crowdLayers, setCrowdLayers] = useState<number[]>([])
  const [buildings, setBuildings] = useState<number[]>([])

  useEffect(() => {
    setBuildings(Array.from({ length: 20 }).map(() => Math.random() * 100 + 50))
  }, [])

  const addCrowd = () => {
    setYear(y => y + 1)
    setCrowdLayers(prev => [...prev, Date.now()])
  }

  return (
    <div className="relative min-h-screen bg-sky-200 overflow-hidden font-sans selection:bg-orange-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6 text-sky-900" />
      </Link>

      {/* The Beautiful View (Background) */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 pointer-events-none">
         <div className="absolute top-12 right-12 text-yellow-400 animate-pulse">
            <Sun size={80} />
         </div>
         <div className="absolute top-24 left-24 text-white opacity-80">
            <Cloud size={120} />
         </div>
         
         {/* Distant City */}
         <div className="w-full h-64 bg-emerald-700 flex items-end justify-center gap-2 opacity-80">
            {buildings.map((height, i) => (
                <div key={i} className="bg-emerald-900 w-8" style={{ height }} />
            ))}
         </div>
      </div>

      {/* UI Controls */}
      <div className="fixed top-8 right-8 z-50 flex flex-col items-end gap-4">
        <div className="bg-white/90 backdrop-blur p-4 rounded-xl shadow-xl text-right">
            <h1 className="text-4xl font-bold text-orange-900">PROCOPIA</h1>
            <p className="text-orange-700 font-mono">
                {language === 'en' ? 'Year' : '年份'}: {year}
            </p>
            <p className="text-xs text-orange-500 uppercase tracking-widest mt-1">
                {language === 'en' ? 'Population Density' : '人口密度'}: {(crowdLayers.length * 1000).toLocaleString()}
            </p>
        </div>
        
        <button 
            onClick={addCrowd}
            className="px-6 py-3 bg-orange-600 text-white rounded-full shadow-lg hover:bg-orange-500 transition-transform active:scale-95 flex items-center gap-2 font-bold"
        >
            <UserPlus className="w-5 h-5" /> {language === 'en' ? 'Wait One Year' : '等待一年'}
        </button>
      </div>

      {/* The Crowd Layers */}
      <div className="absolute inset-0 flex flex-col justify-end pointer-events-none z-10">
        <AnimatePresence>
            {crowdLayers.map((layerId, index) => (
                <motion.div
                    key={layerId}
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full flex justify-center items-end -mb-12"
                    style={{ zIndex: index }}
                >
                    {/* A row of people */}
                    <div className="flex w-[120%] justify-center gap-[-10px]">
                        {Array.from({ length: 20 + index * 2 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="relative"
                                style={{ 
                                    width: 60 + Math.random() * 20,
                                    height: 150 + Math.random() * 50,
                                    marginLeft: -20
                                }}
                            >
                                <Users 
                                    size={100 + Math.random() * 50} 
                                    className="text-orange-950 fill-orange-900" 
                                    style={{
                                        opacity: 0.8 + Math.random() * 0.2,
                                        transform: `scaleX(${Math.random() > 0.5 ? 1 : -1})`
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Overlay Text when crowded */}
      {crowdLayers.length > 8 && (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm pointer-events-none"
        >
            <p className="text-white text-3xl font-serif max-w-2xl text-center leading-relaxed p-8">
                {language === 'en'
                    ? '"We have to pull down the cornice... the horizon is blocked by the faces of the crowd."'
                    : '“我们不得不拆除檐口……地平线被人群的面孔挡住了。”'}
            </p>
        </motion.div>
      )}

    </div>
  )
}
