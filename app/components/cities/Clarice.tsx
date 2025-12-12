'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Recycle } from 'lucide-react'
import { useState } from 'react'

export default function Clarice({ city }: { city: City }) {
  const [epoch, setEpoch] = useState(0)

  const fragments = [
    { color: "bg-amber-200", shape: "rounded-none" },
    { color: "bg-stone-300", shape: "rounded-full" },
    { color: "bg-rose-200", shape: "rounded-tl-3xl" },
    { color: "bg-emerald-200", shape: "rounded-br-3xl" },
  ]

  return (
    <div className="relative min-h-screen bg-stone-50 text-stone-800 font-serif overflow-hidden selection:bg-stone-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-4">CLARICE</h1>
        <p className="text-stone-500 mb-12">Epoch {epoch + 1}</p>

        <div className="relative w-full max-w-3xl h-96 bg-white border-2 border-stone-200 rounded-lg shadow-inner p-8 flex flex-wrap content-end gap-2 overflow-hidden">
            
            {/* The City Layers */}
            {Array.from({ length: 20 }).map((_, i) => {
                // Deterministic pseudo-random based on epoch and index
                const seed = (epoch * 20 + i) * 12345
                const fragmentType = fragments[seed % fragments.length]
                const height = (seed % 10) * 10 + 20
                const width = (seed % 5) * 20 + 40

                return (
                    <motion.div
                        key={`${epoch}-${i}`}
                        className={`${fragmentType.color} ${fragmentType.shape} border border-stone-400/20`}
                        style={{ width, height }}
                        initial={{ y: -500, opacity: 0, rotate: (seed % 360) }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.05, type: "spring" }}
                    />
                )
            })}

        </div>

        <button
            onClick={() => setEpoch(e => e + 1)}
            className="mt-12 flex items-center gap-2 px-6 py-3 bg-stone-800 text-stone-100 rounded-full hover:bg-stone-700 transition-colors"
        >
            <Recycle className="w-5 h-5" /> Rebuild City
        </button>

        <p className="mt-8 max-w-xl text-center text-stone-600 italic text-sm">
            &quot;Clarice, the glorious city, has a tormented history. Several times it decayed, then burgeoned again, always keeping the first Clarice as an unparalleled model of every splendor.&quot;
        </p>
      </div>
    </div>
  )
}
