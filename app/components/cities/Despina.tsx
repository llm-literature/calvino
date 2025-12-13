'use client'

import { City } from '@/lib/types'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Ship, Tent, Anchor, Compass, Wind, Sun, Waves, Mountain } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Despina({ city }: { city: City }) {
  const { language } = useLanguage()
  const [mouseX, setMouseX] = useState(0)
  const [windowWidth, setWindowWidth] = useState(1000) // Default for SSR

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMouseX(e.clientX)
  }

  // Calculate percentage (0 to 1) of mouse position across screen
  const percentage = Math.min(Math.max(mouseX / windowWidth, 0), 1)

  return (
    <div
      className="relative min-h-screen overflow-hidden transition-colors duration-1000"
      onMouseMove={handleMouseMove}
      style={{
        background: `linear-gradient(to right, #f59e0b ${100 - percentage * 100}%, #0ea5e9 ${percentage * 100}%)`,
      }}
    >
      {/* Split Background Textures */}
      <div className="pointer-events-none absolute inset-0 flex">
        {/* Desert Side (Left) */}
        <div
          className="h-full bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')] opacity-20"
          style={{ width: `${(1 - percentage) * 100}%` }}
        />
        {/* Sea Side (Right) */}
        <div
          className="h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"
          style={{ width: `${percentage * 100}%` }}
        />
      </div>

      <div className="relative z-10 container mx-auto flex h-screen flex-col items-center justify-center px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-lg">{language === 'en' ? 'DESPINA' : city.cnName}</h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-white/90 drop-shadow-md">
            {language === 'en' 
              ? 'The city presents itself differently to the one who comes by land and the one who comes by sea.'
              : '这座城市对于从陆路来的人和从海路来的人呈现出不同的面貌。'}
          </p>
        </header>

        <div className="relative flex aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-md">
          {/* Camel Driver's View (Left) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-12 text-amber-900"
            style={{ opacity: 1 - percentage }}
          >
            <div className="mb-8 flex items-center gap-4">
              <Mountain className="h-12 w-12" />
              <h2 className="font-serif text-4xl">{language === 'en' ? 'The Camel Driver' : '骆驼客'}</h2>
            </div>
            <p className="text-center font-serif text-2xl leading-relaxed italic">
              {language === 'en' 
                ? '"He sees a ship; he knows it is a city, but he thinks of it as a vessel that will take him away from the desert..."'
                : '"他看到一艘船；他知道那是一座城市，但他把它想象成一艘能带他离开沙漠的船……"'}
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Ship className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">{language === 'en' ? 'The Frigate' : '护卫舰'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">{language === 'en' ? 'Fresh Wind' : '清风'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Compass className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">{language === 'en' ? 'Departure' : '启程'}</span>
              </div>
            </div>
          </motion.div>

          {/* Sailor's View (Right) */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center p-12 text-sky-900"
            style={{ opacity: percentage }}
          >
            <div className="mb-8 flex items-center gap-4">
              <Waves className="h-12 w-12" />
              <h2 className="font-serif text-4xl">{language === 'en' ? 'The Sailor' : '水手'}</h2>
            </div>
            <p className="text-center font-serif text-2xl leading-relaxed italic">
              {language === 'en' 
                ? '"He sees a camel; he knows it is a city, but he thinks of it as a beast from whose pack he can drink wine and oil..."'
                : '"他看到一头骆驼；他知道那是一座城市，但他把它想象成一头野兽，可以从它的驮包里喝到酒和油……"'}
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Tent className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">{language === 'en' ? 'The Oasis' : '绿洲'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Sun className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">{language === 'en' ? 'Warmth' : '温暖'}</span>
              </div>
              <div className="flex flex-col items-center">
                <Anchor className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">{language === 'en' ? 'Rest' : '休憩'}</span>
              </div>
            </div>
          </motion.div>

          {/* Central Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
            style={{ left: `${percentage * 100}%` }}
          />
        </div>

        <div className="mt-8 animate-pulse text-sm text-white/80">
          {language === 'en' ? 'Move your cursor left or right to shift perspective' : '左右移动光标以切换视角'}
        </div>
      </div>
    </div>
  )
}
