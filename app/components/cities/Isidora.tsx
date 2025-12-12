'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useMemo } from 'react'

export default function Isidora({ city }: { city: City }) {
  // Pre-generate random values for spirals to maintain purity
  const spirals = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        delay: i * 0.2,
        scale: 0.5 + i * 0.15,
        rotateStart: i * 30,
      })),
    []
  )

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-100 via-rose-50 to-amber-50 text-amber-900">
      {/* Spiral staircase background motif - representing dreams of youth */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        {spirals.map((spiral, i) => (
          <motion.div
            key={i}
            className="absolute h-64 w-64 rounded-full border-4 border-amber-800"
            initial={{ scale: 0, rotate: spiral.rotateStart }}
            animate={{ scale: spiral.scale, rotate: spiral.rotateStart + 360 }}
            transition={{
              duration: 20,
              delay: spiral.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-20 rounded-full p-2 transition-colors hover:bg-amber-900/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-12 text-center"
        >
          <h1 className="font-serif text-7xl tracking-wide text-amber-800 md:text-9xl">
            {city.name}
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-6 font-light text-amber-700 italic"
          >
            The city of memory where one arrives as an old man
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl rounded-2xl border border-amber-200 bg-white/70 p-12 text-center shadow-xl backdrop-blur-sm"
        >
          <p className="font-serif text-xl leading-loose text-amber-900">{city.description}</p>
        </motion.div>

        {/* Floating memory fragments */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-6xl"
              initial={{ x: `${15 + i * 15}%`, y: '110%' }}
              animate={{ y: '-10%' }}
              transition={{
                duration: 15 + i * 2,
                delay: i * 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {['🌹', '🕰️', '🪞', '📜', '🗝️', '🎭'][i]}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
