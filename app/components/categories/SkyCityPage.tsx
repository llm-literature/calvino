'use client'

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { Star, Moon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

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
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([])
  const [isClient, setIsClient] = useState(false)

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
    setIsClient(true)
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
            {category} Cities
            <Moon className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-indigo-400/60 italic">
            Look up, and see the map of the empire.
          </p>
        </motion.div>

        <div className="relative flex-1">
          {cities.map((city, index) => {
            const star = stars[index]
            if (!star) return null

            return (
              <motion.button
                key={city.name}
                className="group absolute flex flex-col items-center justify-center"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: star.delay, duration: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedCity(city)}
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
                  {city.name}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="max-w-2xl border-indigo-500/30 bg-slate-900/90 text-indigo-100 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-center text-3xl text-indigo-300">
              {selectedCity?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar mt-4 max-h-[60vh] overflow-y-auto pr-4">
            <DialogDescription className="font-lora text-lg leading-relaxed whitespace-pre-line text-indigo-100/80">
              {selectedCity?.description}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
