'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Droplets, Sparkles, Music } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Armilla({ city }: { city: City }) {
  const { language } = useLanguage()
  const [drops, setDrops] = useState<{id: number, x: number, delay: number, duration: number}[]>([])

  useEffect(() => {
    setDrops(Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2
    })))
  }, [])

  return (
    <div className="relative min-h-screen bg-linear-to-b from-sky-50 to-white text-sky-900 font-sans overflow-hidden selection:bg-sky-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6 text-sky-600" />
      </Link>

      {/* Pipes Background (SVG) */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <svg width="100%" height="100%">
            <defs>
                <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="50%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
            </defs>
            {/* Complex Pipe Network */}
            {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((x, i) => (
                <g key={i}>
                    <rect x={`${x}%`} y="0" width="10" height="100%" fill="url(#pipeGradient)" />
                    {/* Horizontal connectors */}
                    {i % 2 === 0 && (
                        <rect x={`${x}%`} y={`${20 + i * 5}%`} width="20%" height="10" fill="url(#pipeGradient)" />
                    )}
                </g>
            ))}
        </svg>
      </div>

      {/* Animated Water Drops */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {drops.map((drop) => (
            <motion.div
                key={drop.id}
                className="absolute top-0 w-1 h-4 bg-sky-400 rounded-full opacity-60"
                style={{ left: `${drop.x}%` }}
                animate={{ y: ['0vh', '100vh'] }}
                transition={{ 
                    duration: drop.duration, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: drop.delay 
                }}
            />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="text-center mb-16 bg-white/60 backdrop-blur-md p-12 rounded-3xl shadow-xl border border-sky-100"
        >
            <h1 className="text-7xl font-thin mb-4 text-sky-800 tracking-tighter">ARMILLA</h1>
            <p className="text-sky-500 uppercase tracking-widest mb-8">
                {language === 'en' ? 'The City of Pipes' : '管道之城'}
            </p>
            <p className="text-xl text-sky-700 max-w-2xl mx-auto leading-relaxed italic">
                {language === 'en'
                    ? '"It has no walls, no ceilings, no floors: it has nothing that makes it seem a city, except the water pipes..."'
                    : '“它没有墙壁，没有天花板，没有地板：除了水管，没有任何东西让它看起来像一座城市……”'}
            </p>
        </motion.div>

        {/* The Nymphs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/40 backdrop-blur p-8 rounded-2xl border border-white/50 flex flex-col items-center text-center group cursor-pointer"
            >
                <div className="p-4 bg-sky-100 rounded-full mb-4 group-hover:bg-sky-200 transition-colors">
                    <Droplets className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="font-bold text-sky-800 mb-2">{language === 'en' ? 'The Water' : '水'}</h3>
                <p className="text-sky-600 text-sm">
                    {language === 'en' 
                        ? 'Flowing vertically through the invisible rooms.' 
                        : '垂直流过看不见的房间。'}
                </p>
            </motion.div>

            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/40 backdrop-blur p-8 rounded-2xl border border-white/50 flex flex-col items-center text-center group cursor-pointer"
            >
                <div className="p-4 bg-sky-100 rounded-full mb-4 group-hover:bg-sky-200 transition-colors">
                    <Sparkles className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="font-bold text-sky-800 mb-2">{language === 'en' ? 'The Nymphs' : '仙女'}</h3>
                <p className="text-sky-600 text-sm">
                    {language === 'en' 
                        ? 'Splashing in the bathtubs, arching their backs under the showers.' 
                        : '在浴缸里嬉戏，在淋浴下拱起背。'}
                </p>
            </motion.div>

            <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/40 backdrop-blur p-8 rounded-2xl border border-white/50 flex flex-col items-center text-center group cursor-pointer"
            >
                <div className="p-4 bg-sky-100 rounded-full mb-4 group-hover:bg-sky-200 transition-colors">
                    <Music className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="font-bold text-sky-800 mb-2">{language === 'en' ? 'The Morning' : '清晨'}</h3>
                <p className="text-sky-600 text-sm">
                    {language === 'en' 
                        ? 'One hears their singing in the morning.' 
                        : '清晨可以听到她们的歌声。'}
                </p>
            </motion.div>
        </div>
      </div>
    </div>
  )
}
