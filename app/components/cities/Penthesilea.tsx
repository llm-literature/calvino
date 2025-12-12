'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function Penthesilea({ city }: { city: City }) {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="relative min-h-screen bg-stone-200 text-stone-800 font-sans overflow-hidden selection:bg-stone-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <h1 className="text-6xl font-bold mb-8 text-stone-600 z-10">PENTHESILEA</h1>

        <div className="relative w-full h-150 overflow-hidden border-4 border-stone-400 rounded-lg bg-stone-300">
            <motion.div 
                className="absolute inset-0 flex flex-wrap content-center justify-center"
                style={{ scale: zoom }}
            >
                {Array.from({ length: 100 }).map((_, i) => (
                    <div key={i} className="w-32 h-32 border border-stone-400/50 flex items-center justify-center p-4">
                        <div className="text-xs text-stone-500 text-center">
                            Outskirts of Penthesilea
                        </div>
                    </div>
                ))}
            </motion.div>
            
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_20%,rgba(231,229,228,0.8)_100%)]" />
        </div>

        <div className="mt-8 z-10 flex gap-4 items-center bg-white/50 p-4 rounded-full backdrop-blur">
            <span className="text-sm font-bold text-stone-600">Travel:</span>
            <input 
                type="range" 
                min="0.5" 
                max="3" 
                step="0.1" 
                value={zoom} 
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-64 accent-stone-600"
            />
        </div>

        <p className="mt-8 max-w-xl text-center text-stone-600 italic z-10">
            &quot;You advance for hours and it is not clear to you whether you are already in the city&apos;s midst or still outside it... Penthesilea is only the outskirts of itself.&quot;
        </p>

      </div>
    </div>
  )
}
