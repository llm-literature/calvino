'use client'

import { City } from '@/lib/types'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Zemrude({ city }: { city: City }) {
  const { language } = useLanguage()
  const mouseY = useMotionValue(0)
  const [windowHeight, setWindowHeight] = useState(1000)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleMouseMove = (e: MouseEvent) => {
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseY])

  // Map mouse Y (0 to height) to opacity/visibility
  // Top of screen (0) -> High City visible
  // Bottom of screen (height) -> Low City visible
  const highCityOpacity = useTransform(mouseY, [0, windowHeight], [1, 0])
  const lowCityOpacity = useTransform(mouseY, [0, windowHeight], [0, 1])

  const moodTextEn = useTransform(mouseY, [0, windowHeight], ['Whistling', 'Head Down'])
  const moodTextCn = useTransform(mouseY, [0, windowHeight], ['吹口哨', '低头'])
  const moodText = language === 'en' ? moodTextEn : moodTextCn

  return (
    <div className="relative min-h-screen cursor-ns-resize overflow-hidden bg-slate-900">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 text-white backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* High City (Beautiful) */}
      <motion.div
        style={{ opacity: highCityOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-sky-100 text-sky-900"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20" />
        <h1 className="mb-8 font-serif text-9xl">ZEMRUDE</h1>
        <div className="grid grid-cols-3 gap-12 text-center">
          <div className="flex aspect-square items-center justify-center rounded-full border border-sky-300 bg-white/50 p-8 shadow-lg">
            {language === 'en' ? 'Window Sills' : '窗台'}
          </div>
          <div className="flex aspect-square items-center justify-center rounded-full border border-sky-300 bg-white/50 p-8 shadow-lg">
            {language === 'en' ? 'Curtains' : '窗帘'}
          </div>
          <div className="flex aspect-square items-center justify-center rounded-full border border-sky-300 bg-white/50 p-8 shadow-lg">
            {language === 'en' ? 'Fountains' : '喷泉'}
          </div>
        </div>
      </motion.div>

      {/* Low City (Gritty) */}
      <motion.div
        style={{ opacity: lowCityOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-500"
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-50" />
        <h1 className="mb-8 text-9xl font-black tracking-tighter text-slate-800">ZEMRUDE</h1>
        <div className="grid grid-cols-3 gap-12 text-center font-mono uppercase">
          <div className="flex aspect-square items-center justify-center rounded border border-slate-700 bg-black/20 p-8">
            {language === 'en' ? 'Gutters' : '排水沟'}
          </div>
          <div className="flex aspect-square items-center justify-center rounded border border-slate-700 bg-black/20 p-8">
            {language === 'en' ? 'Manholes' : '沙井'}
          </div>
          <div className="flex aspect-square items-center justify-center rounded border border-slate-700 bg-black/20 p-8">
            {language === 'en' ? 'Fish Scales' : '鱼鳞'}
          </div>
        </div>
      </motion.div>

      {/* Indicator */}
      <div className="pointer-events-none fixed top-1/2 right-8 z-50 flex -translate-y-1/2 flex-col items-center gap-4 text-white mix-blend-difference">
        <div className="relative h-24 w-1 rounded-full bg-white/20">
          <motion.div
            className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white"
            style={{ top: useTransform(mouseY, [0, windowHeight], ['0%', '100%']) }}
          />
        </div>
        <motion.span className="w-32 origin-center translate-y-8 rotate-90 text-center text-xs font-bold tracking-widest uppercase">
          {moodText}
        </motion.span>
      </div>
    </div>
  )
}
