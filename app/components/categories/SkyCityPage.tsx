'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { Star, Moon } from 'lucide-react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

interface SkyCityPageProps {
  cities: City[]
  category: string
}

// Pre-generate background star data with deterministic seed
function generateBackgroundStars(count: number, seed: number) {
  const stars = []
  let s = seed
  const random = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = 0; i < count; i++) {
    stars.push({
      left: random() * 100,
      top: random() * 100,
      size: random() * 2 + 1,
      duration: random() * 3 + 2,
      delay: random() * 5,
    })
  }
  return stars
}

export default function SkyCityPage({ cities, category }: SkyCityPageProps) {
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([])
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  // Background stars - deterministic
  const backgroundStars = useMemo(() => generateBackgroundStars(50, 12345), [])

  useEffect(() => {
    // Generate random star positions on client side only
    const newStars = cities.map(() => ({
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      size: Math.random() * 20 + 30,
      delay: Math.random() * 2,
    }))
    setStars(newStars)
  }, [cities])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 font-serif text-slate-100 selection:bg-indigo-500/30">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        {backgroundStars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
            }}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size + 'px',
              height: star.size + 'px',
            }}
          />
        ))}
      </div>

      {/* Constellation Lines (simplified) */}
      <svg className="pointer-events-none absolute inset-0 z-0 opacity-20">
        {stars.map((star, i) => {
          if (i === stars.length - 1) return null
          const nextStar = stars[i + 1]
          return (
            <line
              key={i}
              x1={`${star.x}%`}
              y1={`${star.y}%`}
              x2={`${nextStar.x}%`}
              y2={`${nextStar.y}%`}
              stroke="white"
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          )
        })}
      </svg>

      <div className="relative z-10 container mx-auto flex h-screen flex-col px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 text-center"
        >
          <h1 className="font-cinzel flex items-center justify-center gap-4 text-4xl tracking-widest text-indigo-200 uppercase md:text-6xl">
            <Moon className="h-8 w-8" />
            {displayCategory} {language === 'en' ? 'Cities' : '城市'}
            <Moon className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-indigo-400/60 italic">
            {language === 'en'
              ? 'Look up, and see the map of the empire.'
              : '抬头看，帝国的地图就在上面。'}
          </p>
        </motion.div>

        <div className="relative flex-1">
          {cities.map((city, index) => {
            const star = stars[index]
            if (!star) return null

            return (
              <Link
                key={city.name}
                href={`/city/${category}/${encodeURIComponent(city.name)}`}
                className="group absolute flex flex-col items-center justify-center no-underline"
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
              >
                <div className="relative">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-indigo-500 blur-md"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <Star className="relative z-10 h-8 w-8 fill-yellow-100/20 text-yellow-100" />
                </div>
                <span className="font-cinzel absolute top-full mt-2 rounded bg-black/50 px-2 py-1 text-xs whitespace-nowrap text-indigo-200 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 md:text-sm">
                  {language === 'en' ? city.name : city.cnName || city.name}
                </span>
              </Link>
            )
          })}
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
