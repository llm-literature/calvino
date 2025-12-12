'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Ship, Tent, Anchor, Compass, Wind, Sun, Waves, Mountain } from 'lucide-react'

export default function Despina() {
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
          <h1 className="mb-4 text-6xl font-bold text-white drop-shadow-lg">DESPINA</h1>
          <p className="mx-auto max-w-2xl text-xl font-medium text-white/90 drop-shadow-md">
            The city presents itself differently to the one who comes by land and the one who comes
            by sea.
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
              <h2 className="font-serif text-4xl">The Camel Driver</h2>
            </div>
            <p className="text-center font-serif text-2xl leading-relaxed italic">
              &quot;He sees a ship; he knows it is a city, but he thinks of it as a vessel that will take
              him away from the desert...&quot;
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Ship className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">The Frigate</span>
              </div>
              <div className="flex flex-col items-center">
                <Wind className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">Fresh Wind</span>
              </div>
              <div className="flex flex-col items-center">
                <Compass className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">Departure</span>
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
              <h2 className="font-serif text-4xl">The Sailor</h2>
            </div>
            <p className="text-center font-serif text-2xl leading-relaxed italic">
              &quot;He sees a camel; he knows it is a city, but he thinks of it as a beast from whose
              pack he can drink wine and oil...&quot;
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <Tent className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">The Oasis</span>
              </div>
              <div className="flex flex-col items-center">
                <Sun className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">Warmth</span>
              </div>
              <div className="flex flex-col items-center">
                <Anchor className="mb-2 h-8 w-8" />
                <span className="text-sm font-bold tracking-widest uppercase">Rest</span>
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
          Move your cursor left or right to shift perspective
        </div>
      </div>
    </div>
  )
}
