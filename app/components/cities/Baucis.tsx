'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Cloud, Eye } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Baucis({ city }: { city: City }) {
  const [hoveredStilt, setHoveredStilt] = useState<number | null>(null)

  const stilts = Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    left: `${15 + i * 12}%`,
    delay: i * 0.1
  }))

  return (
    <div className="relative min-h-screen bg-sky-100 text-sky-900 font-sans overflow-hidden selection:bg-sky-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur shadow-sm transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Clouds Layer (Top) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-80">
         {[...Array(5)].map((_, i) => (
             <motion.div
                key={i}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ 
                    duration: 20 + i * 5, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: i * 2
                }}
                className="absolute text-white opacity-60"
                style={{ top: `${10 + i * 15}%` }}
             >
                 <Cloud size={100 + i * 50} fill="white" />
             </motion.div>
         ))}
      </div>

      {/* The City (Above Clouds) */}
      <div className="relative z-30 container mx-auto px-4 min-h-screen flex flex-col items-center pt-32">
          <h1 className="text-6xl font-thin tracking-[0.2em] mb-8 text-sky-800">BAUCIS</h1>
          
          <div className="relative w-full h-[60vh] mt-12">
              {/* Stilts */}
              {stilts.map((stilt) => (
                  <div 
                    key={stilt.id}
                    className="absolute top-0 bottom-0 w-2 bg-amber-800/80 rounded-full cursor-pointer group transition-all hover:w-4 hover:bg-amber-700"
                    style={{ left: stilt.left }}
                    onMouseEnter={() => setHoveredStilt(stilt.id)}
                    onMouseLeave={() => setHoveredStilt(null)}
                  >
                      {/* House on top */}
                      <div className="absolute -top-12 -left-6 w-16 h-16 bg-amber-100 border-4 border-amber-800 rounded-lg shadow-xl flex items-center justify-center z-40">
                          <div className="w-8 h-8 bg-sky-200 rounded-full flex items-center justify-center">
                              <Eye className="w-4 h-4 text-sky-700" />
                          </div>
                      </div>

                      {/* Telescope View (Appears on Hover) */}
                      <div className={cn(
                          "absolute top-1/2 left-8 w-48 h-48 bg-white rounded-full border-4 border-sky-500 shadow-2xl overflow-hidden z-50 transition-all duration-300 origin-left",
                          hoveredStilt === stilt.id ? "scale-100 opacity-100" : "scale-0 opacity-0"
                      )}>
                          <div className="absolute inset-0 bg-green-100 flex items-center justify-center">
                              {/* Ground details */}
                              <div className="text-center p-4">
                                  <p className="text-xs font-bold text-green-800 uppercase mb-2">Ground Level</p>
                                  {stilt.id % 3 === 0 && <p className="text-sm">🍃 A leaf fluttering</p>}
                                  {stilt.id % 3 === 1 && <p className="text-sm">🐜 An ant marching</p>}
                                  {stilt.id % 3 === 2 && <p className="text-sm">🪨 A pebble resting</p>}
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      <div className="fixed bottom-12 left-0 right-0 text-center pointer-events-none z-40">
          <p className="text-sky-700 italic max-w-xl mx-auto bg-white/30 backdrop-blur p-4 rounded-xl">
            &quot;Nothing of the city touches the earth except those long flamingo legs on which it rests and, when the days are sunny, a pierced, angular shadow that falls on the foliage.&quot;
          </p>
      </div>
    </div>
  )
}
