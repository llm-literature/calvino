'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Rat, Bird } from 'lucide-react'
import { useState } from 'react'

export default function Marozia({ city }: { city: City }) {
  const [state, setState] = useState<'rat' | 'swallow'>('rat')

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden selection:bg-slate-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <div 
            className="relative w-full max-w-2xl aspect-video cursor-pointer overflow-hidden rounded-2xl shadow-2xl group"
            onClick={() => setState(state === 'rat' ? 'swallow' : 'rat')}
        >
            {/* The Rat City */}
            <motion.div 
                className="absolute inset-0 bg-slate-800 flex flex-col items-center justify-center"
                animate={{ opacity: state === 'rat' ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <Rat className="w-32 h-32 text-slate-600 mb-4" />
                <h1 className="text-6xl font-bold text-slate-700">MAROZIA</h1>
                <p className="text-slate-500 mt-4">The City of the Rat</p>
            </motion.div>

            {/* The Swallow City */}
            <motion.div 
                className="absolute inset-0 bg-sky-200 flex flex-col items-center justify-center"
                animate={{ opacity: state === 'swallow' ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <Bird className="w-32 h-32 text-sky-600 mb-4" />
                <h1 className="text-6xl font-bold text-sky-700">MAROZIA</h1>
                <p className="text-sky-600 mt-4">The City of the Swallow</p>
            </motion.div>

            <div className="absolute bottom-4 right-4 text-xs opacity-50 bg-black/20 px-2 py-1 rounded text-white">
                Click to transform
            </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-slate-400 italic">
            "Marozia consists of two cities: the city of the rat and the city of the swallow. The latter is the one that will break free from the first."
        </p>

      </div>
    </div>
  )
}
