'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Moriana({ city }: { city: City }) {
  const [face, setFace] = useState<'glass' | 'rust'>('glass')

  return (
    <div className={cn(
        "relative min-h-screen font-sans overflow-hidden transition-colors duration-1000",
        face === 'glass' ? "bg-sky-50 text-sky-900 selection:bg-sky-200" : "bg-orange-950 text-orange-100 selection:bg-orange-800"
    )}>
      <Link
        href={`/city/${city.type}`}
        className={cn(
            "fixed top-8 left-8 z-50 rounded-full p-2 backdrop-blur transition-colors",
            face === 'glass' ? "bg-white/50 hover:bg-white/80" : "bg-black/50 hover:bg-black/80"
        )}
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <button 
            onClick={() => setFace(face === 'glass' ? 'rust' : 'glass')}
            className="mb-12 group relative"
        >
            <h1 className="text-8xl font-serif tracking-tighter relative z-10">MORIANA</h1>
            <motion.div 
                className="absolute -inset-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <RefreshCw className="w-full h-full opacity-10" />
            </motion.div>
        </button>

        <div className="relative w-full max-w-5xl h-125 flex items-center justify-center perspective-1000">
            
            {/* Glass Face */}
            <motion.div 
                className="absolute inset-0 bg-white/30 backdrop-blur-md border border-white/50 rounded-3xl shadow-xl flex flex-col items-center justify-center p-12"
                animate={{ 
                    rotateY: face === 'glass' ? 0 : 180,
                    opacity: face === 'glass' ? 1 : 0,
                    zIndex: face === 'glass' ? 10 : 0
                }}
                transition={{ duration: 0.8 }}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="grid grid-cols-3 gap-8 w-full h-full">
                    <div className="bg-sky-200/50 rounded-xl animate-pulse" />
                    <div className="bg-sky-200/50 rounded-xl animate-pulse delay-100" />
                    <div className="bg-sky-200/50 rounded-xl animate-pulse delay-200" />
                    <div className="col-span-3 bg-sky-100/50 rounded-xl flex items-center justify-center text-sky-700 text-xl font-light">
                        &quot;Alabaster gates transparent in the sunlight...&quot;
                    </div>
                </div>
            </motion.div>

            {/* Rust Face */}
            <motion.div 
                className="absolute inset-0 bg-stone-900 border border-orange-900/50 rounded-3xl shadow-2xl flex flex-col items-center justify-center p-12"
                animate={{ 
                    rotateY: face === 'rust' ? 0 : -180,
                    opacity: face === 'rust' ? 1 : 0,
                    zIndex: face === 'rust' ? 10 : 0
                }}
                transition={{ duration: 0.8 }}
                style={{ backfaceVisibility: 'hidden' }}
            >
                <div className="grid grid-cols-3 gap-8 w-full h-full">
                    <div className="bg-orange-900/50 rounded-xl border border-orange-800" />
                    <div className="bg-orange-900/50 rounded-xl border border-orange-800" />
                    <div className="bg-orange-900/50 rounded-xl border border-orange-800" />
                    <div className="col-span-3 bg-black/50 rounded-xl flex items-center justify-center text-orange-500 text-xl font-mono border border-orange-900">
                        &quot;Rusted signs... piles of tin cans... soot-covered walls...&quot;
                    </div>
                </div>
            </motion.div>

        </div>

        <p className="mt-12 text-center opacity-60 max-w-lg">
            Moriana has no thickness; it consists only of a face and an obverse, like a sheet of paper, with a figure on either side.
        </p>

      </div>
    </div>
  )
}
