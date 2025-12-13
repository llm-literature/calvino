'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Cecilia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [grid, setGrid] = useState<string[]>([])

  useEffect(() => {
    setGrid(Array.from({ length: 25 }).map(() => Math.random() > 0.5 ? 'city' : 'pasture'))
  }, [])

  return (
    <div className="relative min-h-screen bg-stone-100 text-stone-800 font-sans overflow-hidden selection:bg-stone-300">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-8 text-stone-600">{language === 'en' ? 'CECILIA' : city.cnName}</h1>

        <div className="grid grid-cols-5 gap-2 p-4 bg-white rounded-xl shadow-xl">
            {grid.map((type, i) => (
                <motion.div
                    key={i}
                    className={`w-20 h-20 flex items-center justify-center rounded cursor-pointer ${
                        type === 'city' ? 'bg-stone-300' : 'bg-green-100'
                    }`}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => {
                        const newGrid = [...grid]
                        newGrid[i] = newGrid[i] === 'city' ? 'pasture' : 'city'
                        setGrid(newGrid)
                    }}
                >
                    <span className="text-xs font-bold opacity-50">
                        {type === 'city' 
                          ? (language === 'en' ? 'Buildings' : '建筑') 
                          : (language === 'en' ? 'Goats' : '山羊')}
                    </span>
                </motion.div>
            ))}
        </div>

        <div className="mt-12 max-w-xl text-center text-stone-500">
            <p className="italic mb-4">
                {language === 'en' 
                  ? '"I have been wandering for days among the streets of Cecilia... I cannot distinguish the city from the pastures."'
                  : '"我在切奇利亚的街道上徘徊了几天……我分不清城市和牧场。"'}
            </p>
            <p className="text-sm">
                {language === 'en' ? 'Places have mingled. There is no inside or outside.' : '地方混杂在一起。没有里面或外面。'}
            </p>
        </div>

      </div>
    </div>
  )
}
