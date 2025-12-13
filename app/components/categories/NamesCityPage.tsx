'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { Type, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

interface NamesCityPageProps {
  cities: City[]
  category: string
}

export default function NamesCityPage({ cities, category }: NamesCityPageProps) {
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

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
            {displayCategory}
            <Type className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-gray-500 italic">
            {language === 'en' ? 'The name is the city.' : '名字就是城市。'}
          </p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {cities.map((city, index) => (
            <NameCityRow key={city.name} city={city} index={index} category={category} />
          ))}
        </div>
      </div>
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/city"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'en' ? 'All Categories' : '所有分类'}
        </Link>
      </div>
    </div>
  )
}

function NameCityRow({ city, index, category }: { city: City; index: number; category: string }) {
  const { language } = useLanguage()
  return (
    <Link href={`/city/${category}/${encodeURIComponent(city.name)}`} className="no-underline">
      <motion.div
        className="group relative block cursor-pointer overflow-hidden border-b border-black py-12"
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <div className="relative z-10 container mx-auto flex items-baseline justify-between">
          <h2
            className="font-cinzel stroke-black text-6xl font-black tracking-tighter text-transparent uppercase transition-colors duration-500 hover:text-black md:text-9xl"
            style={{ WebkitTextStroke: '2px black' }}
          >
            {language === 'en' ? city.name : city.cnName || city.name}
          </h2>
          <span className="hidden font-mono text-sm text-gray-400 transition-colors group-hover:text-black md:block">
            {language === 'en' ? 'TYPE: ' : '类型：'}
            {city.type.toUpperCase()}
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
    </Link>
  )
}
