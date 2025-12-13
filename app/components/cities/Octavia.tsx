'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Octavia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [hangingItems, setHangingItems] = useState<Array<{
    name: string;
    ropeHeight: number;
    rotateAnim: number[];
    duration: number;
    delay: number;
  }>>([])

  useEffect(() => {
    const items = language === 'en' ? [
        "Rope Ladder", "Hammock", "Sack House", "Clothesline", "Terrace", 
        "Water Skin", "Gas Jet", "Shower", "Trapeze", "Ring"
    ] : [
        "绳梯", "吊床", "麻袋屋", "晾衣绳", "露台",
        "水袋", "煤气喷嘴", "淋浴", "秋千", "吊环"
    ]
    
    setHangingItems(items.map(name => ({
        name,
        ropeHeight: 100 + Math.random() * 200,
        rotateAnim: [Math.random() * 2 - 1, Math.random() * -2 + 1, Math.random() * 2 - 1],
        duration: 3 + Math.random() * 2,
        delay: Math.random()
    })))
  }, [language])

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden selection:bg-slate-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* The Void Background */}
      <div className="fixed inset-0 bg-linear-to-b from-slate-900 via-[#1e1b4b] to-black pointer-events-none" />
      
      {/* Clouds below */}
      <div className="fixed bottom-0 w-full h-64 bg-linear-to-t from-white/10 to-transparent blur-3xl" />

      <div className="relative z-10 container mx-auto px-4 min-h-screen flex flex-col items-center">
        
        {/* The Net (Top Support) */}
        <div className="w-full h-px bg-slate-500/50 absolute top-0" />
        
        {/* Hanging Elements */}
        <div className="w-full max-w-4xl grid grid-cols-3 md:grid-cols-5 gap-8 mt-0">
            {hangingItems.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: item.rotateAnim }}
                    transition={{ 
                        duration: item.duration, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        delay: item.delay 
                    }}
                    className="flex flex-col items-center origin-top"
                >
                    {/* The Rope */}
                    <div className="w-px bg-slate-400/30" style={{ height: `${item.ropeHeight}px` }} />
                    
                    {/* The Item */}
                    <div className="bg-slate-800/80 backdrop-blur border border-slate-600 p-4 rounded shadow-lg text-xs uppercase tracking-widest text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer">
                        {item.name}
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-auto mb-24 text-center max-w-xl">
            <h1 className="text-6xl font-thin tracking-[0.2em] mb-8 text-slate-200">OCTAVIA</h1>
            <p className="text-slate-400 leading-relaxed italic">
                {language === 'en'
                    ? '"Suspended over the abyss, the life of Octavia\'s inhabitants is less uncertain than in other cities. They know the net will last only so long."'
                    : '“悬在深渊之上，奥克塔维亚居民的生活并不比其他城市更不确定。他们知道这张网只能支撑这么久。”'}
            </p>
        </div>
      </div>
    </div>
  )
}
