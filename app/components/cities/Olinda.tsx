'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function Olinda({ city }: { city: City }) {
  const [rings, setRings] = useState<number[]>([1])

  return (
    <div className="relative min-h-screen bg-emerald-50 text-emerald-900 font-serif overflow-hidden selection:bg-emerald-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl mb-8 text-emerald-800">OLINDA</h1>

        <div 
            className="relative w-150 h-150 flex items-center justify-center cursor-pointer"
            onClick={() => setRings([...rings, rings.length + 1])}
        >
            {rings.map((r, i) => {
                const size = 100 + i * 60
                const isNewest = i === rings.length - 1
                return (
                    <motion.div
                        key={r}
                        className={`absolute rounded-full border-4 flex items-center justify-center ${
                            isNewest ? 'border-emerald-600 bg-emerald-100 z-10' : 'border-emerald-300 bg-white z-0'
                        }`}
                        style={{ width: size, height: size }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 50 }}
                    >
                        {isNewest && (
                            <span className="text-xs font-bold text-emerald-700 bg-white px-2 py-1 rounded-full shadow-sm">
                                New Olinda
                            </span>
                        )}
                    </motion.div>
                )
            })}
            
            <div className="absolute z-20 text-center pointer-events-none">
                <div className="w-4 h-4 bg-emerald-900 rounded-full mx-auto mb-2" />
                <span className="text-xs font-bold text-emerald-900 bg-white/80 px-2 rounded">Old Olinda</span>
            </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-emerald-600 italic">
            &quot;Olinda is certainly not the only city that grows in concentric circles... But in other cities... the old walls expand... In Olinda, the old walls expand bearing the old quarters with them.&quot;
        </p>
        <p className="text-sm text-emerald-400 mt-4 animate-pulse">Click to grow a new Olinda</p>

      </div>
    </div>
  )
}
