'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Waves, Footprints, Wind } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Esmeralda({ city }: { city: City }) {
  const [activeLayer, setActiveLayer] = useState<'land' | 'water' | 'air'>('land')
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen overflow-hidden bg-emerald-50 font-sans text-emerald-900 selection:bg-emerald-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-8 font-serif text-6xl text-emerald-800">ESMERALDA</h1>

        {/* Map Container */}
        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-3xl border-4 border-emerald-100 bg-[#f0fdf4] shadow-2xl">
          {/* Base Grid (Always visible) */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-12 grid-rows-6 opacity-10">
            {Array.from({ length: 72 }).map((_, i) => (
              <div key={i} className="border border-emerald-900" />
            ))}
          </div>

          {/* Water Layer */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: activeLayer === 'water' ? 1 : 0.2,
              filter: activeLayer === 'water' ? 'blur(0px)' : 'blur(2px)',
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path
                d="M0,50 Q25,40 50,50 T100,50"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="8"
                className="opacity-50"
              />
              <path
                d="M20,0 Q30,50 20,100"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="6"
                className="opacity-50"
              />
              <path
                d="M70,0 Q60,50 70,100"
                fill="none"
                stroke="#0ea5e9"
                strokeWidth="6"
                className="opacity-50"
              />

              {/* Boats */}
              {activeLayer === 'water' && (
                <motion.circle
                  cx="25"
                  cy="45"
                  r="2"
                  fill="#0369a1"
                  animate={{ cx: [25, 75], cy: [45, 55] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
                />
              )}
            </svg>
          </motion.div>

          {/* Land Layer */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: activeLayer === 'land' ? 1 : 0.2,
              filter: activeLayer === 'land' ? 'blur(0px)' : 'blur(2px)',
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Bridges and Roads */}
              <path
                d="M10,50 L30,50 L40,40 L60,40 L70,50 L90,50"
                fill="none"
                stroke="#d97706"
                strokeWidth="4"
                strokeDasharray="2 1"
              />
              <rect
                x="35"
                y="35"
                width="30"
                height="30"
                fill="none"
                stroke="#78350f"
                strokeWidth="2"
              />

              {/* People */}
              {activeLayer === 'land' && (
                <motion.rect
                  x="10"
                  y="48"
                  width="2"
                  height="4"
                  fill="#92400e"
                  animate={{ x: [10, 90] }}
                  transition={{ duration: 15, repeat: Infinity }}
                />
              )}
            </svg>
          </motion.div>

          {/* Air Layer (Swallows/Cats) */}
          <motion.div
            className="absolute inset-0"
            animate={{
              opacity: activeLayer === 'air' ? 1 : 0.1,
              filter: activeLayer === 'air' ? 'blur(0px)' : 'blur(4px)',
            }}
          >
            <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Rooftops path */}
              <path
                d="M0,30 L20,30 L25,20 L40,20 L45,30 L60,30 L65,15 L80,15 L85,30 L100,30"
                fill="none"
                stroke="#a855f7"
                strokeWidth="1"
                strokeDasharray="1 2"
              />

              {/* Swallows */}
              {activeLayer === 'air' && (
                <>
                  <motion.path
                    d="M10,10 L15,15 L10,20"
                    fill="none"
                    stroke="black"
                    strokeWidth="0.5"
                    animate={{ x: [0, 100], y: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                  <motion.path
                    d="M50,50 L55,55 L50,60"
                    fill="none"
                    stroke="black"
                    strokeWidth="0.5"
                    animate={{ x: [100, 0], y: [0, -20, 0] }}
                    transition={{ duration: 7, repeat: Infinity }}
                  />
                </>
              )}
            </svg>
          </motion.div>

          {/* Controls */}
          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-4 rounded-full bg-white/90 p-2 shadow-lg backdrop-blur">
            <button
              onClick={() => setActiveLayer('water')}
              className={cn(
                'rounded-full p-3 transition-all',
                activeLayer === 'water' ? 'bg-sky-500 text-white' : 'text-sky-500 hover:bg-sky-100'
              )}
            >
              <Waves className="h-6 w-6" />
            </button>
            <button
              onClick={() => setActiveLayer('land')}
              className={cn(
                'rounded-full p-3 transition-all',
                activeLayer === 'land'
                  ? 'bg-amber-500 text-white'
                  : 'text-amber-500 hover:bg-amber-100'
              )}
            >
              <Footprints className="h-6 w-6" />
            </button>
            <button
              onClick={() => setActiveLayer('air')}
              className={cn(
                'rounded-full p-3 transition-all',
                activeLayer === 'air'
                  ? 'bg-purple-500 text-white'
                  : 'text-purple-500 hover:bg-purple-100'
              )}
            >
              <Wind className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="mt-8 max-w-2xl text-center text-emerald-600 italic">
          {language === 'en'
            ? '"A map of Esmeralda should include all these routes, solid and liquid, evident and hidden."'
            : '“埃斯梅拉达的地图应该包括所有这些路线，固体的和液体的，明显的和隐藏的。”'}
        </div>
      </div>
    </div>
  )
}
