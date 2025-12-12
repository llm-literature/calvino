'use client'

import { City } from '@/lib/types'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Zemrude({ city }: { city: City }) {
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
  
  const moodText = useTransform(mouseY, [0, windowHeight], ["Whistling", "Head Down"])

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden cursor-ns-resize">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20 text-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* High City (Beautiful) */}
      <motion.div 
        style={{ opacity: highCityOpacity }}
        className="absolute inset-0 bg-sky-100 flex flex-col items-center justify-center text-sky-900"
      >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')] opacity-20" />
          <h1 className="text-9xl font-serif mb-8">ZEMRUDE</h1>
          <div className="grid grid-cols-3 gap-12 text-center">
              <div className="p-8 border border-sky-300 rounded-full aspect-square flex items-center justify-center bg-white/50 shadow-lg">
                  Window Sills
              </div>
              <div className="p-8 border border-sky-300 rounded-full aspect-square flex items-center justify-center bg-white/50 shadow-lg">
                  Curtains
              </div>
              <div className="p-8 border border-sky-300 rounded-full aspect-square flex items-center justify-center bg-white/50 shadow-lg">
                  Fountains
              </div>
          </div>
      </motion.div>

      {/* Low City (Gritty) */}
      <motion.div 
        style={{ opacity: lowCityOpacity }}
        className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center text-slate-500"
      >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')] opacity-50" />
          <h1 className="text-9xl font-black mb-8 tracking-tighter text-slate-800">ZEMRUDE</h1>
          <div className="grid grid-cols-3 gap-12 text-center font-mono uppercase">
              <div className="p-8 border border-slate-700 rounded aspect-square flex items-center justify-center bg-black/20">
                  Gutters
              </div>
              <div className="p-8 border border-slate-700 rounded aspect-square flex items-center justify-center bg-black/20">
                  Manholes
              </div>
              <div className="p-8 border border-slate-700 rounded aspect-square flex items-center justify-center bg-black/20">
                  Fish Scales
              </div>
          </div>
      </motion.div>

      {/* Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 pointer-events-none mix-blend-difference text-white">
          <div className="h-24 w-1 bg-white/20 rounded-full relative">
              <motion.div 
                className="absolute w-3 h-3 bg-white rounded-full left-1/2 -translate-x-1/2"
                style={{ top: useTransform(mouseY, [0, windowHeight], ["0%", "100%"]) }}
              />
          </div>
          <motion.span className="text-xs uppercase tracking-widest font-bold rotate-90 origin-center translate-y-8 w-32 text-center">
             {moodText}
          </motion.span>
      </div>
    </div>
  )
}
