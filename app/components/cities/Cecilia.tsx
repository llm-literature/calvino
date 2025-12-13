'use client'

import { City } from '@/lib/types'
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Trees, Building2 } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Cecilia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [elements, setElements] = useState<
    {
      id: number
      type: 'city' | 'pasture'
      x: number
      y: number
      scale: number
      rotation: number
    }[]
  >([])

  const containerRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 25, stiffness: 120 }
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Generate a chaotic mix of city and pasture elements
    const newElements = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      type: Math.random() > 0.4 ? 'city' : ('pasture' as 'city' | 'pasture'), // Slightly more city initially? No, mixed.
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.5 + Math.random() * 1.5,
      rotation: Math.random() * 360,
    }))
    setElements(newElements)

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      const { innerWidth, innerHeight } = window
      mouseX.set((e.clientX / innerWidth) * 2 - 1)
      mouseY.set((e.clientY / innerHeight) * 2 - 1)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen cursor-crosshair overflow-hidden bg-[#e5e7eb] selection:bg-emerald-200"
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6 text-stone-600" />
      </Link>

      {/* Dynamic Background Gradient that shifts with mouse */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: useTransform(
            x,
            [-1, 1],
            ['linear-gradient(45deg, #78716c, #22c55e)', 'linear-gradient(45deg, #22c55e, #78716c)']
          ),
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center">
        <div className="max-w-lg rounded-2xl border border-stone-200 bg-white/80 p-8 text-center shadow-2xl backdrop-blur-sm">
          <h1 className="mb-4 font-serif text-6xl font-bold tracking-tighter text-stone-800">
            CECILIA
          </h1>
          <p className="text-lg text-stone-600 italic">
            {language === 'en'
              ? '"I cannot distinguish the city from the pastures."'
              : '"我分不清城市和牧场。"'}
          </p>
          <div className="mt-4 flex justify-center gap-4 text-xs font-bold tracking-widest text-stone-400 uppercase">
            <span className="flex items-center gap-1">
              <Building2 size={12} /> {language === 'en' ? 'City' : '城市'}
            </span>
            <span className="flex items-center gap-1">
              <Trees size={12} /> {language === 'en' ? 'Pasture' : '牧场'}
            </span>
          </div>
        </div>
      </div>

      {/* The Mingled Landscape */}
      <div className="absolute inset-[-20%] h-[140%] w-[140%]">
        {elements.map((el) => (
          <Element key={el.id} data={el} mouseX={x} mouseY={y} />
        ))}
      </div>

      {/* Fog Layers */}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-white/50 via-transparent to-white/50" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-white/50 via-transparent to-white/50" />
    </div>
  )
}

function Element({
  data,
  mouseX,
  mouseY,
}: {
  data: { type: 'city' | 'pasture'; x: number; y: number; scale: number; rotation: number }
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  // Parallax effect: move elements based on mouse position and their "depth" (scale)

  return (
    <motion.div
      className={cn(
        'absolute flex items-center justify-center transition-colors duration-500',
        data.type === 'city' ? 'text-stone-600' : 'text-emerald-600'
      )}
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        scale: data.scale,
        rotate: data.rotation,
        x: useTransform(mouseX, (v: number) => v * 20 * data.scale), // Parallax
        y: useTransform(mouseY, (v: number) => v * 20 * data.scale), // Parallax
        opacity: 0.6,
      }}
    >
      {data.type === 'city' ? (
        <Building2 size={48} strokeWidth={1} />
      ) : (
        <Trees size={48} strokeWidth={1} />
      )}
    </motion.div>
  )
}
