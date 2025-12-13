"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, MotionValue } from 'framer-motion'
import { City } from '@/lib/types'
import { Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

interface EyesCityPageProps {
  cities: City[]
  category: string
}

export default function EyesCityPage({ cities, category }: EyesCityPageProps) {
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  // Mouse tracking for "eyes" effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-900 font-serif text-zinc-100 selection:bg-emerald-500/30">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-cinzel flex items-center justify-center gap-4 text-4xl tracking-widest text-emerald-200 uppercase md:text-6xl">
            <Eye className="h-8 w-8" />
            {displayCategory} {language === 'en' ? 'Cities' : '城市'}
            <Eye className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-emerald-400/60 italic">
            {language === 'en'
              ? 'The city looks at you as you look at it.'
              : '城市看着你，就像你看着它一样。'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <EyeCard key={city.name} city={city} mouseX={mouseX} mouseY={mouseY} category={category} />
          ))}
        </div>
      </div>
      <div className="absolute left-6 top-6 z-20">
        <Link href="/city" className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm shadow">
          <ArrowLeft className="h-4 w-4" />
          {language === 'en' ? 'All Categories' : '所有分类'}
        </Link>
      </div>
    </div>
  )
}

function EyeCard({ city, mouseX, mouseY, category }: { city: City; mouseX: MotionValue<number>; mouseY: MotionValue<number>; category: string }) {
  const { language } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const [angle, setAngle] = useState(0)

  // Update angle periodically or on mouse move via a simpler effect for the rotation
  useEffect(() => {
    const updateAngle = () => {
      if (!cardRef.current) return
      const rect = cardRef.current.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const rad = Math.atan2(mouseY.get() - centerY, mouseX.get() - centerX)
      setAngle(rad * (180 / Math.PI))
    }

    const unsubscribe = mouseX.on('change', updateAngle)
    return () => unsubscribe()
  }, [mouseX, mouseY])

  return (
    <Link href={`/city/${category}/${encodeURIComponent(city.name)}`} className="no-underline">
      <motion.div
        ref={cardRef}
        className="group relative block h-64 cursor-pointer overflow-hidden rounded-full border-4 border-zinc-700 bg-zinc-800 shadow-xl shadow-black/50"
        whileHover={{ scale: 1.05, borderColor: '#34d399' }}
      >
      {/* Sclera */}
      <div className="absolute inset-0 rounded-full bg-zinc-200 shadow-inner" />

      {/* Iris Area - Rotates to look at cursor */}
      <div
        className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
        style={{ transform: `rotate(${angle}deg)` }}
      >
        {/* The Pupil/Iris moves slightly towards the edge */}
        <div className="relative flex h-32 w-32 translate-x-8 items-center justify-center overflow-hidden rounded-full border-4 border-emerald-700 bg-emerald-900 shadow-lg">
          {/* Reflection highlight */}
          <div className="absolute top-4 left-4 h-4 w-8 -rotate-45 rounded-full bg-white/40 blur-sm" />

          {/* City Name inside the pupil */}
          <div
            className="font-cinzel px-2 text-center text-xs text-emerald-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ transform: `rotate(${-angle}deg)` }} // Counter-rotate text
          >
            {language === 'en' ? city.name : city.cnName || city.name}
          </div>
        </div>
      </div>

      {/* Eyelids (optional, for blinking effect?) */}
      <motion.div
        className="absolute inset-x-0 top-0 z-10 bg-zinc-900"
        initial={{ height: '0%' }}
        whileHover={{ height: '10%' }}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10 bg-zinc-900"
        initial={{ height: '0%' }}
        whileHover={{ height: '10%' }}
      />
      </motion.div>
    </Link>
  )
}
