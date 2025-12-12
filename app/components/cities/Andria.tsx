'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Star } from 'lucide-react'
import { useState } from 'react'

export default function Andria({ city }: { city: City }) {
  const [highlight, setHighlight] = useState<number | null>(null)

  const stars = [
    { id: 1, x: 20, y: 20, label: "Antares" },
    { id: 2, x: 50, y: 15, label: "Vega" },
    { id: 3, x: 80, y: 30, label: "Altair" },
    { id: 4, x: 30, y: 60, label: "Sirius" },
    { id: 5, x: 70, y: 70, label: "Rigel" },
  ]

  return (
    <div className="relative min-h-screen bg-indigo-950 text-indigo-100 font-serif overflow-hidden selection:bg-indigo-800">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-4 text-indigo-200 tracking-widest">ANDRIA</h1>
        <p className="mb-12 text-indigo-400">&quot;Built so artfully that its every street follows a planet&apos;s orbit.&quot;</p>

        <div className="relative w-full max-w-3xl aspect-square bg-black/20 rounded-full border border-indigo-800/50 shadow-2xl overflow-hidden">
            
            {/* Orbits */}
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-[80%] h-[80%] border border-indigo-500 rounded-full" />
                <div className="absolute w-[60%] h-[60%] border border-indigo-500 rounded-full" />
                <div className="absolute w-[40%] h-[40%] border border-indigo-500 rounded-full" />
            </div>

            {/* Stars/Locations */}
            {stars.map((star) => (
                <motion.div
                    key={star.id}
                    className="absolute cursor-pointer group"
                    style={{ left: `${star.x}%`, top: `${star.y}%` }}
                    onMouseEnter={() => setHighlight(star.id)}
                    onMouseLeave={() => setHighlight(null)}
                    animate={{ scale: highlight === star.id ? 1.5 : 1 }}
                >
                    <Star className={`w-6 h-6 ${highlight === star.id ? 'fill-yellow-200 text-yellow-200' : 'text-indigo-400'}`} />
                    
                    {/* Connection Line to Center (The City's correspondence) */}
                    <svg className="absolute top-3 left-3 w-125 h-125 pointer-events-none overflow-visible" style={{ transform: 'translate(-50%, -50%)' }}>
                        <motion.line 
                            x1="50%" y1="50%" x2="50%" y2="50%" 
                            stroke="rgba(253, 224, 71, 0.5)" 
                            strokeWidth="2"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: highlight === star.id ? 1 : 0 }}
                        />
                    </svg>

                    <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-indigo-900 px-2 py-1 rounded text-xs border border-indigo-700">
                        {star.label} Street
                    </div>
                </motion.div>
            ))}

            {/* Center City */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-900 rounded-full flex items-center justify-center border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>

        </div>

      </div>
    </div>
  )
}
