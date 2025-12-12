'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function Phyllis({ city }: { city: City }) {
  const [faded, setFaded] = useState(false)

  return (
    <div className="relative min-h-screen bg-rose-50 text-rose-900 font-sans overflow-hidden selection:bg-rose-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur shadow-sm transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <div 
            className="relative cursor-pointer group"
            onMouseEnter={() => setFaded(true)}
            onMouseLeave={() => setFaded(false)}
        >
            {/* The Tourist View (Colorful, Detailed) */}
            <motion.div 
                className="relative z-10 p-12 bg-white rounded-3xl shadow-2xl border-4 border-rose-200 max-w-2xl text-center"
                animate={{ opacity: faded ? 0 : 1, filter: faded ? "blur(10px)" : "blur(0px)" }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-6xl font-serif mb-8 text-rose-600">PHYLLIS</h1>
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div className="bg-rose-100 p-4 rounded-xl">
                        <div className="w-full h-24 bg-rose-300 rounded-lg mb-2" />
                        <p className="font-bold">9 Bridges</p>
                    </div>
                    <div className="bg-rose-100 p-4 rounded-xl">
                        <div className="w-full h-24 bg-rose-300 rounded-lg mb-2" />
                        <p className="font-bold">Onion Domes</p>
                    </div>
                    <div className="bg-rose-100 p-4 rounded-xl">
                        <div className="w-full h-24 bg-rose-300 rounded-lg mb-2" />
                        <p className="font-bold">Blue Tiles</p>
                    </div>
                    <div className="bg-rose-100 p-4 rounded-xl">
                        <div className="w-full h-24 bg-rose-300 rounded-lg mb-2" />
                        <p className="font-bold">Queen Statues</p>
                    </div>
                </div>
                <p className="text-rose-400 italic">&quot;Happy is the man who has Phyllis before his eyes each day!&quot;</p>
            </motion.div>

            {/* The Resident View (Faded, Abstract) */}
            <motion.div 
                className="absolute inset-0 z-0 flex items-center justify-center"
                animate={{ opacity: faded ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <div className="text-center max-w-xl">
                    <h1 className="text-6xl font-serif mb-8 text-gray-300">PHYLLIS</h1>
                    <p className="text-2xl text-gray-400 font-light leading-relaxed">
                        A space in which points are connected by lines... 
                        <br/><br/>
                        <span className="text-sm">The city fades. The eyes do not see things but figures of other things that mean other things.</span>
                    </p>
                </div>
            </motion.div>
        </div>

        <div className="mt-12 text-center text-rose-400 text-sm animate-pulse">
            Hover to live in the city
        </div>
      </div>
    </div>
  )
}
