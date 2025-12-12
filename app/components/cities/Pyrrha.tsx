'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function Pyrrha({ city }: { city: City }) {
  const [isImagined, setIsImagined] = useState(true)

  return (
    <div className="relative min-h-screen bg-amber-50 text-amber-900 font-sans overflow-hidden selection:bg-amber-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur shadow-sm transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div 
        className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center cursor-pointer"
        onClick={() => setIsImagined(!isImagined)}
      >
        <div className="relative w-full max-w-4xl aspect-video overflow-hidden rounded-lg shadow-2xl">
            
            {/* Imagined Pyrrha */}
            <motion.div 
                className="absolute inset-0 bg-indigo-900 flex flex-col items-center justify-center text-white p-12"
                animate={{ y: isImagined ? 0 : "-100%" }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <h1 className="text-8xl font-serif mb-4 tracking-widest">PYRRHA</h1>
                <p className="text-indigo-300 text-xl mb-8">The Imagined City</p>
                <div className="w-32 h-32 border-4 border-indigo-400 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_white]" />
                </div>
                <p className="mt-8 max-w-lg text-center text-indigo-200">
                    &quot;A fortified city on the slopes of a bay, with high windows and towers, enclosed like a goblet, with a central square deep as a well.&quot;
                </p>
            </motion.div>

            {/* Real Pyrrha */}
            <motion.div 
                className="absolute inset-0 bg-amber-100 flex flex-col items-center justify-center text-amber-900 p-12"
                animate={{ y: isImagined ? "100%" : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <h1 className="text-8xl font-sans font-bold mb-4 tracking-tighter text-amber-800/50">PYRRHA</h1>
                <p className="text-amber-600 text-xl mb-8">The Real City</p>
                <div className="flex gap-4 opacity-50">
                    <div className="w-12 h-32 bg-amber-900/20" />
                    <div className="w-12 h-32 bg-amber-900/20" />
                    <div className="w-12 h-32 bg-amber-900/20" />
                    <div className="w-12 h-32 bg-amber-900/20" />
                </div>
                <p className="mt-8 max-w-lg text-center text-amber-700">
                    &quot;The sea is distant... streets are long and straight... houses are clumped... the wind moves the vanes of the water pumps.&quot;
                </p>
            </motion.div>

        </div>

        <div className="mt-8 text-amber-600 animate-bounce">
            Click to visit
        </div>
      </div>
    </div>
  )
}
