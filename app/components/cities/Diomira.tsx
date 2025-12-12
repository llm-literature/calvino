'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Diomira({ city }: { city: City }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-slate-200">
      {/* Background Elements representing domes and statues */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-t-full border-2 border-slate-400"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
          />
        ))}
      </div>

      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-20 rounded-full p-2 transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="mb-12 text-center"
        >
          <h1 className="bg-gradient-to-b from-slate-100 to-slate-500 bg-clip-text font-serif text-7xl text-transparent md:text-9xl">
            {city.name.toUpperCase()}
          </h1>
          <p className="mt-4 text-sm tracking-[1em] text-slate-400 uppercase">Sixty Silver Domes</p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl rounded-lg border border-slate-700 bg-slate-800/50 p-12 text-center font-serif text-xl leading-loose shadow-2xl backdrop-blur-sm"
        >
          {city.description}
        </motion.div>
      </div>
    </div>
  )
}
