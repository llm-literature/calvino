'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { cn } from '@/lib/utils'
import { Type } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

interface NamesCityPageProps {
  cities: City[]
  category: string
}

export default function NamesCityPage({ cities, category }: NamesCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  return (
    <div className="relative min-h-screen overflow-hidden bg-white font-serif text-black selection:bg-black selection:text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="font-cinzel flex items-center justify-center gap-4 text-4xl tracking-tighter text-black uppercase md:text-6xl">
            <Type className="h-8 w-8" />
            {category}
            <Type className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-gray-500 italic">The name is the city.</p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {cities.map((city, index) => (
            <NameCityRow
              key={city.name}
              city={city}
              index={index}
              onSelect={() => setSelectedCity(city)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="max-w-3xl rounded-none border-4 border-black bg-white text-black">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-center text-6xl tracking-tighter text-black uppercase">
              {selectedCity?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar mt-8 max-h-[60vh] overflow-y-auto pr-4">
            <DialogDescription className="font-lora columns-1 gap-8 text-justify text-xl leading-relaxed whitespace-pre-line text-gray-800 md:columns-2">
              {selectedCity?.description}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function NameCityRow({
  city,
  index,
  onSelect,
}: {
  city: City
  index: number
  onSelect: () => void
}) {
  return (
    <motion.div
      className="group relative cursor-pointer overflow-hidden border-b border-black py-12"
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect}
    >
      <div className="relative z-10 container mx-auto flex items-baseline justify-between">
        <h2
          className="font-cinzel stroke-black text-6xl font-black tracking-tighter text-transparent uppercase transition-colors duration-500 hover:text-black md:text-9xl"
          style={{ WebkitTextStroke: '2px black' }}
        >
          {city.name}
        </h2>
        <span className="hidden font-mono text-sm text-gray-400 transition-colors group-hover:text-black md:block">
          TYPE: {city.type.toUpperCase()}
        </span>
      </div>

      {/* Background Reveal */}
      <motion.div
        className="absolute inset-0 z-0 origin-left bg-gray-100"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4, ease: 'circOut' }}
      />
    </motion.div>
  )
}
