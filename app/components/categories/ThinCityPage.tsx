'use client'

import { CategoryPageProps, City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function ThinCityPage({ cities, category }: CategoryPageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 container mx-auto h-screen px-4 py-20">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="pointer-events-none absolute top-20 right-0 left-0 mb-20 text-center text-6xl font-thin tracking-[0.2em] text-slate-900/10 uppercase md:text-9xl"
        >
          {category}
        </motion.h1>

        <div className="relative h-full w-full">
          {cities.map((city, index) => (
            <HangingCity
              key={city.name}
              city={city}
              index={index}
              total={cities.length}
              mounted={mounted}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Deterministic pseudo-random based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

function HangingCity({
  city,
  index,
  total,
  mounted,
}: {
  city: City
  index: number
  total: number
  mounted: boolean
}) {
  // Calculate positions to spread them out but keep them "hanging"
  // We divide the screen width into sections
  const sectionWidth = 100 / total
  const leftPos = sectionWidth * index + sectionWidth / 2

  // Deterministic string length based on index
  const stringLength = mounted ? 20 + seededRandom(index * 3 + 1) * 40 : 30 // 20% to 60% down the screen
  const animDuration = 8 + seededRandom(index * 3 + 2) * 4
  const animDelay = seededRandom(index * 3 + 3) * 2

  return (
    <div className="absolute top-0" style={{ left: `${leftPos}%` }}>
      {/* The String */}
      <motion.div
        initial={{ height: 0 }}
        animate={{ height: `${stringLength}vh` }}
        transition={{ duration: 1.5, delay: index * 0.2, ease: 'easeOut' }}
        className="mx-auto w-px bg-slate-300"
      />

      {/* The City "Ornament" */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
        style={{ marginTop: '-1px' }} // Connect perfectly to line
      >
        <motion.div
          animate={{
            rotate: [0, 2, 0, -2, 0],
            y: [0, 5, 0, 5, 0],
          }}
          transition={{
            duration: animDuration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: animDelay,
          }}
          className="group relative"
        >
          <Link href={`/city/${city.type}/${city.name}`}>
            <div className="relative flex flex-col items-center">
              {/* Geometric Shape */}
              <div className="flex h-32 w-32 items-center justify-center rounded-full border border-slate-200 bg-white/50 shadow-sm backdrop-blur-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-md md:h-48 md:w-48">
                <div className="p-4 text-center">
                  <h2 className="font-display mb-2 text-xl tracking-widest text-slate-700 transition-colors group-hover:text-sky-600">
                    {city.name}
                  </h2>
                  <div className="mx-auto h-px w-8 bg-slate-300 transition-all duration-500 group-hover:w-16" />
                </div>
              </div>

              {/* Hover Description Tooltip */}
              <div className="pointer-events-none absolute top-full z-50 mt-4 w-64 translate-y-[-10px] rounded-sm border border-slate-100 bg-white/90 p-4 text-center font-serif text-xs leading-relaxed text-slate-500 opacity-0 shadow-xl backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {city.description.substring(0, 100)}...
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}
