'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, RefreshCw, User } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const SUB_CITIES = [
  { name: 'Alpha', color: 'bg-red-500' },
  { name: 'Beta', color: 'bg-blue-500' },
  { name: 'Gamma', color: 'bg-green-500' },
  { name: 'Delta', color: 'bg-yellow-500' },
  { name: 'Epsilon', color: 'bg-purple-500' },
  { name: 'Zeta', color: 'bg-pink-500' },
]

export default function Eutropia({ city }: { city: City }) {
  const [activeCityIndex, setActiveCityIndex] = useState(0)
  const [isMoving, setIsMoving] = useState(false)

  const handleMove = (index: number) => {
    if (index === activeCityIndex || isMoving) return
    setIsMoving(true)
    setTimeout(() => {
        setActiveCityIndex(index)
        setIsMoving(false)
    }, 1000)
  }

  return (
    <div className="relative min-h-screen bg-neutral-100 text-neutral-800 font-sans overflow-hidden selection:bg-neutral-300">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-neutral-200"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        <header className="text-center mb-16">
            <h1 className="text-5xl font-bold text-neutral-900 mb-4">EUTROPIA</h1>
            <p className="text-neutral-500 uppercase tracking-widest">The City of Multiple Cities</p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 w-full max-w-4xl">
            {SUB_CITIES.map((subCity, index) => {
                const isActive = index === activeCityIndex
                return (
                    <div 
                        key={index}
                        onClick={() => handleMove(index)}
                        className={cn(
                            "relative aspect-square rounded-2xl border-4 transition-all duration-500 cursor-pointer overflow-hidden group",
                            isActive ? "border-neutral-800 shadow-2xl scale-105" : "border-neutral-200 hover:border-neutral-400 grayscale hover:grayscale-0"
                        )}
                    >
                        {/* City Background */}
                        <div className={cn("absolute inset-0 opacity-20", subCity.color)} />
                        
                        {/* Buildings (Abstract) */}
                        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-2 px-4 pb-4 opacity-50">
                            <div className={cn("w-8 h-16 rounded-t", isActive ? "bg-neutral-800" : "bg-neutral-300")} />
                            <div className={cn("w-12 h-24 rounded-t", isActive ? "bg-neutral-800" : "bg-neutral-300")} />
                            <div className={cn("w-6 h-12 rounded-t", isActive ? "bg-neutral-800" : "bg-neutral-300")} />
                        </div>

                        {/* Population */}
                        {isActive && (
                            <motion.div 
                                layoutId="population"
                                className="absolute inset-0 flex items-center justify-center"
                                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                            >
                                <div className="bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase">Inhabited</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Move Button Overlay */}
                        {!isActive && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold uppercase">
                                    <RefreshCw className="w-4 h-4" />
                                    Move Here
                                </div>
                            </div>
                        )}
                    </div>
                )
            })}
        </div>

        <div className="mt-16 max-w-2xl text-center text-neutral-500 italic">
            &quot;When the inhabitants of Eutropia feel the grip of weariness... they decide to move to the next city, which is there waiting for them, empty and good as new.&quot;
        </div>
      </div>
    </div>
  )
}
