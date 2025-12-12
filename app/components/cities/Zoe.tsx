'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const FUNCTIONS = [
  'Palace', 'Prison', 'School', 'Brothel', 'Bank', 'Hospital', 'Barracks', 'Temple', 'Market', 'Library', 'Museum', 'Factory'
]

const getRandomFunction = (current: string) => {
    let newFunc = FUNCTIONS[Math.floor(Math.random() * FUNCTIONS.length)]
    while (newFunc === current) {
        newFunc = FUNCTIONS[Math.floor(Math.random() * FUNCTIONS.length)]
    }
    return newFunc
}

export default function Zoe({ city }: { city: City }) {
  const [grid, setGrid] = useState<string[]>(Array(24).fill('Unknown'))

  const randomize = (index: number) => {
    const newGrid = [...grid]
    newGrid[index] = getRandomFunction(newGrid[index])
    setGrid(newGrid)
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 text-neutral-200 font-mono selection:bg-neutral-700">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24">
        <header className="mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 text-6xl md:text-8xl font-bold tracking-tighter text-neutral-100"
          >
            {city.name.toUpperCase()}
          </motion.h1>
          <p className="mx-auto max-w-2xl text-lg text-neutral-500 uppercase tracking-widest">
            The City of Indistinguishable Places
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-16">
          {grid.map((func, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: '#262626' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => randomize(i)}
              className="aspect-square cursor-pointer flex flex-col items-center justify-center rounded border border-neutral-800 bg-neutral-900/50 p-4 text-center transition-colors hover:border-neutral-600"
            >
              <HelpCircle className={cn("mb-4 h-8 w-8 transition-all duration-300", func !== 'Unknown' ? "opacity-20 scale-75" : "opacity-50 scale-100")} />
              <motion.span 
                key={func}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn("text-xs font-bold uppercase tracking-widest", func === 'Unknown' ? "text-neutral-600" : "text-white")}
              >
                {func}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mx-auto max-w-3xl prose prose-invert prose-lg text-center text-neutral-400"
        >
           {city.description.split('\n').map((p, i) => (
             <p key={i}>{p}</p>
           ))}
        </motion.div>
      </div>
    </div>
  )
}
