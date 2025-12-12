'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue, MotionValue } from 'framer-motion'
import { City } from '@/lib/types'
import { Eye } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface EyesCityPageProps {
  cities: City[]
  category: string
}

export default function EyesCityPage({ cities, category }: EyesCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

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
            {category} Cities
            <Eye className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-emerald-400/60 italic">
            The city looks at you as you look at it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <EyeCard
              key={city.name}
              city={city}
              mouseX={mouseX}
              mouseY={mouseY}
              onSelect={() => setSelectedCity(city)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="max-w-2xl border-emerald-500/30 bg-zinc-900/95 text-zinc-100 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-center text-3xl text-emerald-300">
              {selectedCity?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar mt-4 max-h-[60vh] overflow-y-auto pr-4">
            <DialogDescription className="font-lora text-lg leading-relaxed whitespace-pre-line text-zinc-300">
              {selectedCity?.description}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function EyeCard({
  city,
  mouseX,
  mouseY,
  onSelect,
}: {
  city: City
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
  onSelect: () => void
}) {
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
    <motion.div
      ref={cardRef}
      className="group relative h-64 cursor-pointer overflow-hidden rounded-full border-4 border-zinc-700 bg-zinc-800 shadow-xl shadow-black/50"
      whileHover={{ scale: 1.05, borderColor: '#34d399' }} // emerald-400
      onClick={onSelect}
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
            {city.name}
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
  )
}
