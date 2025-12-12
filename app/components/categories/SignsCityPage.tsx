'use client'

import { CategoryPageProps } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function SignsCityPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 py-20 font-mono text-neutral-200">
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />

      <h1 className="z-10 mb-12 text-xs tracking-[1em] text-neutral-500 uppercase">
        SEMIOTICS OF THE CITY
      </h1>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-px border border-neutral-800 bg-neutral-800 md:grid-cols-3 lg:grid-cols-4">
        {cities.map((city, index) => (
          <SignCell key={city.name} city={city} index={index} />
        ))}
        {/* Fillers to complete the grid visually */}
        {Array.from({ length: 12 - cities.length }).map((_, i) => (
          <div
            key={`filler-${i}`}
            className="flex aspect-square items-center justify-center bg-neutral-950 opacity-20"
          >
            <span className="text-4xl font-thin text-neutral-800">?</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SignCell({ city, index }: { city: any; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  // Generate a "symbol" based on the city name (first letter + length or something)
  const symbol = city.name.charAt(0).toUpperCase()

  return (
    <Link href={`/city/${city.type}/${city.name}`} className="block">
      <motion.div
        className="group relative flex aspect-square cursor-pointer flex-col items-center justify-center overflow-hidden bg-neutral-950"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* The "Sign" (Large Character) */}
        <motion.div
          animate={{
            scale: isHovered ? 0.5 : 1,
            y: isHovered ? -20 : 0,
            opacity: isHovered ? 0.2 : 1,
          }}
          className="text-8xl font-thin text-neutral-100 select-none md:text-9xl"
        >
          {symbol}
        </motion.div>

        {/* Hidden Meaning (Description) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/90 p-6 text-center backdrop-blur-sm"
        >
          <h2 className="mb-2 text-xl font-bold tracking-widest text-white uppercase">
            {city.name}
          </h2>
          <p className="line-clamp-4 font-sans text-[10px] leading-relaxed text-neutral-400">
            {city.description}
          </p>
          <div className="mt-4 h-px w-8 bg-white/50" />
        </motion.div>

        {/* Corner Markers */}
        <div className="absolute top-2 left-2 h-2 w-2 border-t border-l border-neutral-700 opacity-50 transition-opacity group-hover:opacity-100" />
        <div className="absolute top-2 right-2 h-2 w-2 border-t border-r border-neutral-700 opacity-50 transition-opacity group-hover:opacity-100" />
        <div className="absolute bottom-2 left-2 h-2 w-2 border-b border-l border-neutral-700 opacity-50 transition-opacity group-hover:opacity-100" />
        <div className="absolute right-2 bottom-2 h-2 w-2 border-r border-b border-neutral-700 opacity-50 transition-opacity group-hover:opacity-100" />
      </motion.div>
    </Link>
  )
}
