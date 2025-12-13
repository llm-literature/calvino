'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { Skull } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

interface DeadCityPageProps {
  cities: City[]
  category: string
}

export default function DeadCityPage({ cities, category }: DeadCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  const selectedCityDescription = selectedCity
    ? language === 'en'
      ? selectedCity.enDescription
      : selectedCity.cnDescription
    : ''

  const selectedCityName = selectedCity
    ? language === 'en'
      ? selectedCity.name
      : selectedCity.cnName || selectedCity.name
    : ''

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black font-serif text-gray-300 selection:bg-gray-500/30">
      {/* Fog/Smoke Effect (CSS) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black opacity-30" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="mb-20 text-center"
        >
          <h1 className="font-cinzel flex items-center justify-center gap-6 text-4xl tracking-[0.5em] text-gray-500 uppercase opacity-80 md:text-6xl">
            <Skull className="h-6 w-6" />
            {displayCategory}
            <Skull className="h-6 w-6" />
          </h1>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-16">
          {cities.map((city, index) => (
            <DeadCityTombstone
              key={city.name}
              city={city}
              index={index}
              onSelect={() => setSelectedCity(city)}
            />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="max-w-2xl border border-gray-800 bg-black text-gray-300 shadow-2xl shadow-gray-900/50">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-center text-3xl tracking-widest text-gray-400">
              {selectedCityName}
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar mt-8 max-h-[60vh] overflow-y-auto pr-4">
            <DialogDescription className="font-lora text-justify text-lg leading-loose whitespace-pre-line text-gray-500">
              {selectedCityDescription}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function DeadCityTombstone({
  city,
  index,
  onSelect,
}: {
  city: City
  index: number
  onSelect: () => void
}) {
  const { language } = useLanguage()
  const displayName = language === 'en' ? city.name : city.cnName || city.name

  return (
    <motion.div
      className="group relative w-64 cursor-pointer text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.3, duration: 1.5 }}
      onClick={onSelect}
    >
      <div className="flex h-80 flex-col items-center justify-center rounded-t-full border border-gray-800 bg-gray-950/50 p-8 transition-colors duration-500 hover:border-gray-600">
        <div className="mb-6 h-16 w-16 opacity-20 transition-opacity group-hover:opacity-50">
          <Skull className="h-full w-full" />
        </div>
        <h3 className="font-cinzel mb-2 text-2xl text-gray-400 transition-colors group-hover:text-gray-200">
          {displayName}
        </h3>
        <div className="my-4 h-0.5 w-8 bg-gray-800" />
        <p className="font-lora text-xs text-gray-600 italic opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          {language === 'en'
            ? '“The dead are the only ones who are truly free.”'
            : '“只有死者才是真正自由的。”'}
        </p>
      </div>
      {/* Shadow */}
      <div className="absolute -bottom-4 left-1/2 h-4 w-40 -translate-x-1/2 rounded-full bg-black opacity-80 blur-xl" />
    </motion.div>
  )
}
