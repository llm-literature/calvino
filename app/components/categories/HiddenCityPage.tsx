'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { VenetianMask } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

interface HiddenCityPageProps {
  cities: City[]
  category: string
}

export default function HiddenCityPage({ cities, category }: HiddenCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null)
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  const selectedCityDescription = selectedCity
    ? language === 'en'
      ? selectedCity.enDescription
      : selectedCity.cnDescription
    : ''

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-900 font-serif text-stone-100 selection:bg-orange-500/30">
      <div className="relative z-10 container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="font-cinzel flex items-center justify-center gap-4 text-4xl tracking-widest text-stone-200 uppercase md:text-6xl">
            <VenetianMask className="h-8 w-8" />
            {displayCategory} {language === 'en' ? 'Cities' : '城市'}
            <VenetianMask className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-stone-400/60 italic">
            {language === 'en'
              ? 'The city is hidden inside another city.'
              : '城市隐藏在另一座城市之中。'}
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 md:grid-cols-2">
          {cities.map((city) => (
            <HiddenCityCard key={city.name} city={city} onSelect={() => setSelectedCity(city)} />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="max-w-2xl border-stone-700 bg-stone-900/95 text-stone-100 backdrop-blur-xl">
          <DialogHeader>
            <DialogTitle className="font-cinzel text-center text-3xl text-orange-300">
              {language === 'en'
                ? selectedCity?.name
                : selectedCity?.cnName || selectedCity?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="custom-scrollbar mt-4 max-h-[60vh] overflow-y-auto pr-4">
            <DialogDescription className="font-lora text-lg leading-relaxed whitespace-pre-line text-stone-300">
              {selectedCityDescription}
            </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function HiddenCityCard({ city, onSelect }: { city: City; onSelect: () => void }) {
  const [isHovered, setIsHovered] = useState(false)
  const { language } = useLanguage()
  const displayDescription =
    language === 'en' ? city.enDescription : city.cnDescription

  return (
    <motion.div
      className="relative h-80 cursor-pointer overflow-hidden rounded-lg border border-stone-700 bg-stone-800 shadow-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
    >
      {/* The "Outer" City (The Mask) */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center bg-stone-800"
        animate={{ opacity: isHovered ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6 text-center">
          <VenetianMask className="mx-auto mb-4 h-16 w-16 text-stone-600" />
          <h3 className="font-cinzel text-2xl text-stone-500">
            {language === 'en' ? 'A City' : '一座城市'}
          </h3>
          <p className="mt-2 text-sm text-stone-600">
            {language === 'en' ? 'Hover to reveal the hidden essence' : '悬停以揭示隐藏的本质'}
          </p>
        </div>
        {/* Pattern overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </motion.div>

      {/* The "Inner" City (The Truth) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-orange-900 to-stone-900 p-6 text-center">
        <h3 className="font-cinzel mb-2 text-3xl text-orange-200">
          {language === 'en' ? city.name : city.cnName || city.name}
        </h3>
        <p className="font-lora line-clamp-4 text-sm text-orange-100/70">{displayDescription}</p>
        <span className="mt-4 rounded border border-orange-400/30 px-3 py-1 text-xs tracking-widest text-orange-400 uppercase">
          {language === 'en' ? 'Click to Read' : '点击阅读'}
        </span>
      </div>
    </motion.div>
  )
}
