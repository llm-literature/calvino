'use client'

import { City } from '@/lib/types'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Plane, Home, Terminal } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Trude({ city }: { city: City }) {
  const { language } = useLanguage()
  const [isFlying, setIsFlying] = useState(false)
  const controls = useAnimation()

  const depart = async () => {
    setIsFlying(true)
    // Simulate flight
    await controls.start({ x: "-100%", transition: { duration: 1.5, ease: "easeIn" } })
    controls.set({ x: "0%" }) 
    await controls.start({ x: "-20%", transition: { duration: 1.5, ease: "easeOut" } })
    setIsFlying(false)
  }

  return (
    <div className="relative min-h-screen bg-zinc-900 text-zinc-300 font-mono overflow-hidden selection:bg-zinc-600">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Flight Board Header */}
      <div className="fixed top-0 w-full bg-zinc-950 border-b border-zinc-800 p-4 z-40 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
            <Terminal className="text-amber-500" />
            <h1 className="text-2xl font-bold tracking-widest text-amber-500">TRUDE INT&apos;L</h1>
        </div>
        <div className="text-xs text-zinc-500">
            {language === 'en' ? 'STATUS: SAME' : '状态：相同'}
        </div>
      </div>

      {/* The Infinite Landscape */}
      <div className="absolute inset-0 flex items-center overflow-hidden bg-zinc-800">
        <motion.div 
            className="flex gap-4 px-4 min-w-max"
            animate={controls}
            initial={{ x: "-20%" }}
        >
            {Array.from({ length: 50 }).map((_, i) => (
                <div key={i} className="w-64 h-80 bg-zinc-700 rounded-lg border-4 border-zinc-600 flex flex-col items-center justify-end p-4 relative shrink-0">
                    {/* The House */}
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-zinc-500 clip-path-house" />
                    <Home size={120} className="text-zinc-400 mb-8" />
                    <div className="w-full h-2 bg-zinc-900 rounded-full opacity-20" />
                    <span className="mt-4 text-xs text-zinc-500 font-bold">BLOCK {1000 + i}</span>
                </div>
            ))}
        </motion.div>
      </div>

      {/* Controls Overlay */}
      <div className="fixed bottom-0 w-full bg-zinc-950/90 backdrop-blur border-t border-zinc-800 p-8 z-50 flex flex-col items-center">
        <p className="max-w-2xl text-center text-zinc-400 mb-8 text-sm md:text-base">
            {language === 'en'
                ? '"You can resume your flight whenever you like, but you will arrive at another Trude, absolutely the same, detail by detail. The world is covered by a sole Trude which does not begin and does not end."'
                : '“你可以随时恢复飞行，但你会到达另一个特鲁德，绝对一样，细节也一样。世界被一个没有开始也没有结束的特鲁德覆盖着。”'}
        </p>
        
        <button 
            onClick={depart}
            disabled={isFlying}
            className="px-8 py-4 bg-amber-600 text-white rounded-sm hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 font-bold tracking-wider"
        >
            <Plane className={`w-5 h-5 ${isFlying ? 'animate-pulse' : ''}`} />
            {isFlying 
                ? (language === 'en' ? 'FLYING...' : '飞行中...') 
                : (language === 'en' ? 'DEPART FOR NEXT CITY' : '前往下一个城市')}
        </button>
      </div>

    </div>
  )
}
