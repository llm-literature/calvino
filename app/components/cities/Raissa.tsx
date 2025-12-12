'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Frown, Smile } from 'lucide-react'
import { useState } from 'react'

export default function Raissa({ city }: { city: City }) {
  const [showHidden, setShowHidden] = useState(false)

  return (
    <div className="relative min-h-screen bg-slate-200 text-slate-800 font-sans overflow-hidden selection:bg-slate-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-serif mb-12 text-slate-700">RAISSA</h1>

        <div 
            className="relative w-full max-w-2xl aspect-video cursor-pointer group"
            onMouseEnter={() => setShowHidden(true)}
            onMouseLeave={() => setShowHidden(false)}
        >
            {/* The Unhappy City (Visible) */}
            <motion.div 
                className="absolute inset-0 bg-slate-300 rounded-xl shadow-xl flex flex-col items-center justify-center p-8"
                animate={{ opacity: showHidden ? 0.2 : 1, filter: showHidden ? "blur(4px)" : "blur(0px)" }}
            >
                <Frown className="w-32 h-32 text-slate-500 mb-4" />
                <p className="text-xl text-slate-600 text-center">
                    &quot;Life in Raissa is not happy. People wring their hands as they walk in the streets...&quot;
                </p>
            </motion.div>

            {/* The Hidden Thread of Happiness */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{ opacity: showHidden ? 1 : 0, scale: showHidden ? 1 : 0.8 }}
            >
                <div className="bg-yellow-100/90 p-8 rounded-full shadow-[0_0_50px_rgba(253,224,71,0.5)] text-center backdrop-blur-sm">
                    <Smile className="w-24 h-24 text-yellow-500 mx-auto mb-2" />
                    <p className="text-yellow-700 font-bold">
                        &quot;But there is a hidden thread...&quot;
                    </p>
                    <p className="text-sm text-yellow-600 mt-2">
                        A child laughs, a dog plays, a mason sings.
                    </p>
                </div>
            </motion.div>
        </div>

        <p className="mt-12 text-slate-500 animate-pulse">
            Hover to find the hidden happiness
        </p>

      </div>
    </div>
  )
}
