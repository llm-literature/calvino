'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shovel } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Argia({ city }: { city: City }) {
  const [dirtLevel, setDirtLevel] = useState(100)
  const [particles, setParticles] = useState<{x: number, y: number}[]>([])

  useEffect(() => {
    setParticles(Array.from({ length: 50 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100
    })))
  }, [])

  return (
    <div className="relative min-h-screen bg-stone-900 text-stone-300 font-sans overflow-hidden selection:bg-stone-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center relative">
        
        <div className="relative w-full max-w-2xl aspect-square bg-stone-800 rounded-lg overflow-hidden shadow-2xl border border-stone-700">
            
            {/* The Buried City */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="text-center">
                    <h1 className="text-6xl font-serif text-stone-500 mb-8">ARGIA</h1>
                    <p className="text-stone-600 mb-4">
                        &quot;What makes Argia different from other cities is that it has earth instead of air.&quot;
                    </p>
                    <div className="grid grid-cols-3 gap-4 opacity-30">
                        <div className="h-20 bg-stone-600 rounded" />
                        <div className="h-20 bg-stone-600 rounded" />
                        <div className="h-20 bg-stone-600 rounded" />
                        <div className="h-20 bg-stone-600 rounded" />
                        <div className="h-20 bg-stone-600 rounded" />
                        <div className="h-20 bg-stone-600 rounded" />
                    </div>
                </div>
            </div>

            {/* The Earth Layer */}
            <motion.div 
                className="absolute inset-0 bg-stone-950 flex flex-col items-center justify-center cursor-pointer"
                style={{ clipPath: `inset(${100 - dirtLevel}% 0 0 0)` }}
                onClick={() => setDirtLevel(l => Math.max(0, l - 10))}
            >
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dirt.png')]"></div>
                {particles.map((p, i) => (
                    <div 
                        key={i}
                        className="absolute w-1 h-1 bg-stone-700 rounded-full"
                        style={{ 
                            left: `${p.x}%`, 
                            top: `${p.y}%` 
                        }}
                    />
                ))}
            </motion.div>

            {/* Dig Button Overlay */}
            {dirtLevel > 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/50 p-4 rounded-full backdrop-blur animate-pulse">
                        <Shovel className="w-8 h-8 text-stone-300" />
                    </div>
                </div>
            )}

        </div>

        <button 
            onClick={() => setDirtLevel(100)}
            className="mt-8 text-stone-500 hover:text-stone-300 transition-colors text-sm"
        >
            Reset Earth
        </button>

      </div>
    </div>
  )
}
