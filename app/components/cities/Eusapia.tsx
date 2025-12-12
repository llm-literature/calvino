'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Eusapia({ city }: { city: City }) {
  const [inUnderground, setInUnderground] = useState(false)

  return (
    <div className="relative min-h-screen bg-slate-100 text-slate-900 font-sans overflow-hidden selection:bg-slate-300">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <div className="relative w-full max-w-md h-150 bg-white rounded-full border-8 border-slate-300 overflow-hidden shadow-2xl">
            
            {/* Living City (Top) */}
            <motion.div 
                className="absolute top-0 left-0 right-0 h-1/2 bg-sky-100 flex flex-col items-center justify-end pb-8 border-b-4 border-slate-400 z-10"
                animate={{ y: inUnderground ? "-45%" : "0%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <h2 className="text-2xl font-bold text-sky-800 mb-4">EUSAPIA (Living)</h2>
                <div className="flex gap-2 items-end">
                    <div className="w-8 h-16 bg-sky-300 rounded-t-md" />
                    <div className="w-12 h-24 bg-sky-400 rounded-t-md" />
                    <div className="w-10 h-20 bg-sky-300 rounded-t-md" />
                </div>
                <button 
                    onClick={() => setInUnderground(true)}
                    className={cn("mt-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-opacity", inUnderground ? "opacity-0 pointer-events-none" : "opacity-100")}
                >
                    <ArrowDown className="w-6 h-6" />
                </button>
            </motion.div>

            {/* Dead City (Bottom) */}
            <motion.div 
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-slate-900 flex flex-col items-center justify-start pt-8 z-10"
                animate={{ y: inUnderground ? "0%" : "45%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >
                <button 
                    onClick={() => setInUnderground(false)}
                    className={cn("mb-4 p-2 rounded-full bg-slate-200 text-slate-900 hover:bg-white transition-opacity", !inUnderground ? "opacity-0 pointer-events-none" : "opacity-100")}
                >
                    <ArrowUp className="w-6 h-6" />
                </button>
                <div className="flex gap-2 items-start transform scale-y-[-1] opacity-50">
                    <div className="w-8 h-16 bg-slate-700 rounded-t-md" />
                    <div className="w-12 h-24 bg-slate-600 rounded-t-md" />
                    <div className="w-10 h-20 bg-slate-700 rounded-t-md" />
                </div>
                <h2 className="text-2xl font-bold text-slate-500 mt-4">EUSAPIA (Dead)</h2>
            </motion.div>

            {/* Transition Zone */}
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-black z-20" />

        </div>

        <div className="mt-12 max-w-xl text-center text-slate-600">
            <p className="italic">
                &quot;The inhabitants of Eusapia have constructed an identical copy of their city, underground... so that the dead can continue their activities as if they were alive.&quot;
            </p>
        </div>

      </div>
    </div>
  )
}
