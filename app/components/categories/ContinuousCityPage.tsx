'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Infinity as InfinityIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface ContinuousCityPageProps {
  cities: City[]
  category: string
}

export default function ContinuousCityPage({ cities, category }: ContinuousCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  // Duplicate cities to create seamless loop
  const loopedCities = [...cities, ...cities, ...cities, ...cities]

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-100 font-serif text-slate-900 selection:bg-blue-500/30">
      <div className="pointer-events-none absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-5">
        {[...Array(400)].map((_, i) => (
          <div key={i} className="border border-slate-900/20" />
        ))}
      </div>

      <div className="relative z-10 container mx-auto mb-10 px-4 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel flex items-center justify-center gap-4 text-4xl tracking-widest text-slate-800 uppercase md:text-6xl">
            <InfinityIcon className="h-8 w-8" />
            {category} Cities
            <InfinityIcon className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-slate-500 italic">
            The city repeats itself so that it can be remembered.
          </p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden border-y border-slate-200 bg-white/50 py-20 backdrop-blur-sm">
        <motion.div
          className="flex w-max gap-8 px-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 40,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {loopedCities.map((city, index) => (
            <ContinuousCityCard
              key={`${city.name}-${index}`}
              city={city}
              onSelect={() => setSelectedCity(city)}
            />
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="max-w-2xl border-slate-200 bg-white/95 text-slate-900 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-center text-3xl text-slate-800">
              {selectedCity?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar mt-4 max-h-[60vh] overflow-y-auto pr-4">
            <DialogDescription className="font-lora text-lg leading-relaxed whitespace-pre-line text-slate-600">
              {selectedCity?.description}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function ContinuousCityCard({ city, onSelect }: { city: City; onSelect: () => void }) {
  return (
    <motion.div
      className="flex h-96 w-80 shrink-0 cursor-pointer flex-col justify-between border border-slate-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
      whileHover={{ scale: 1.05, y: -10 }}
      onClick={onSelect}
    >
      <div>
        <div className="mb-4 h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500" />
        <h3 className="font-cinzel mb-2 text-2xl text-slate-800">{city.name}</h3>
        <p className="font-lora line-clamp-6 text-sm leading-relaxed text-slate-500">
          {city.description}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs tracking-wider text-slate-400 uppercase">
        <span>Route A</span>
        <span>&rarr;</span>
        <span>Route B</span>
      </div>
    </motion.div>
  )
}
