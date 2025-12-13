'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { City } from '@/lib/types'
import { Infinity as InfinityIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

interface ContinuousCityPageProps {
  cities: City[]
  category: string
}

export default function ContinuousCityPage({ cities, category }: ContinuousCityPageProps) {
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  // Duplicate cities to create seamless loop
  const loopedCities = [...cities, ...cities, ...cities, ...cities]

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-slate-100 font-serif text-slate-900 selection:bg-blue-500/30">
      <div className="pointer-events-none absolute inset-0 grid grid-cols-20 opacity-5">
        {[...Array(400)].map((_, i) => (
          <div key={i} className="border border-slate-900/20" />
        ))}
      </div>

      <div className="relative z-10 container mx-auto mb-10 px-4 py-10 text-center">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-cinzel flex items-center justify-center gap-4 text-4xl tracking-widest text-slate-800 uppercase md:text-6xl">
            <InfinityIcon className="h-8 w-8" />
            {displayCategory} {language === 'en' ? 'Cities' : '城市'}
            <InfinityIcon className="h-8 w-8" />
          </h1>
          <p className="font-lora mt-4 text-slate-500 italic">
            {language === 'en'
              ? 'The city repeats itself so that it can be remembered.'
              : '城市重复自己，以便被记住。'}
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
            <ContinuousCityCard key={`${city.name}-${index}`} city={city} category={category} />
          ))}
        </motion.div>
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

function ContinuousCityCard({ city, category }: { city: City; category: string }) {
  const { language } = useLanguage()
  const displayDescription = language === 'en' ? city.enDescription : city.cnDescription
  const displayName = language === 'en' ? city.name : city.cnName || city.name

  return (
    <Link href={`/city/${category}/${encodeURIComponent(city.name)}`} className="no-underline">
      <motion.div
        className="flex h-96 w-80 shrink-0 cursor-pointer flex-col justify-between border border-slate-200 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
        whileHover={{ scale: 1.05, y: -10 }}
      >
        <div>
          <div className="mb-4 h-1 w-full bg-linear-to-r from-blue-500 to-cyan-500" />
          <h3 className="font-cinzel mb-2 text-2xl text-slate-800">{displayName}</h3>
          <p className="font-lora line-clamp-6 text-sm leading-relaxed text-slate-500">
            {displayDescription}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs tracking-wider text-slate-400 uppercase">
          <span>{language === 'en' ? 'Route A' : '路线 A'}</span>
          <span>&rarr;</span>
          <span>{language === 'en' ? 'Route B' : '路线 B'}</span>
        </div>
      </motion.div>
    </Link>
  )
}
