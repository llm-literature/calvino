'use client'

import { CategoryPageProps, City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

export default function DesireCityPage({ cities, category }: CategoryPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative min-h-screen cursor-none overflow-hidden bg-black text-white">
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none fixed z-20 mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 40, 100, 0.15), transparent 40%)`,
        }}
      />

      {/* Cursor Follower */}
      <div
        className="pointer-events-none fixed z-50 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/50 mix-blend-difference"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="font-display mb-32 bg-gradient-to-b from-pink-900 to-black bg-clip-text text-center text-6xl font-bold tracking-tighter text-transparent select-none md:text-9xl">
          {displayCategory.toUpperCase()}
        </h1>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <DesireCard key={city.name} city={city} />
          ))}
        </div>
      </div>
    </div>
  )
}

function DesireCard({ city }: { city: City }) {
  const { language } = useLanguage()
  const displayDescription =
    language === 'en' ? city.enDescription : city.cnDescription
  const displayName = language === 'en' ? city.name : city.cnName || city.name

  return (
    <Link href={`/city/${city.type}/${city.name}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: '-10%' }}
        className="group relative aspect-[3/4] overflow-hidden border border-pink-900/20 bg-zinc-950"
      >
        {/* Hidden Image/Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50" />

        {/* Content that reveals on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700 group-hover:bg-pink-950/30">
          <h2 className="font-display mb-4 text-3xl text-pink-800 transition-colors duration-500 group-hover:text-pink-200">
            {displayName}
          </h2>

          <div className="h-12 w-px bg-pink-900/50 transition-all duration-500 group-hover:h-24 group-hover:bg-pink-500" />

          <p className="mt-6 line-clamp-4 translate-y-4 text-center font-serif text-sm text-pink-200/0 transition-all duration-700 group-hover:translate-y-0 group-hover:text-pink-200/80">
            {displayDescription}
          </p>
        </div>

        {/* Glowing Edges on Hover */}
        <div className="absolute inset-0 border border-pink-500/0 transition-colors duration-500 group-hover:border-pink-500/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </motion.div>
    </Link>
  )
}
