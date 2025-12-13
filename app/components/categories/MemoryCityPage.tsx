'use client'

import { City, CategoryPageProps } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { ArrowLeft } from 'lucide-react'
import { getCityTheme } from '@/lib/themes'

// Deterministic pseudo-random based on index
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export default function MemoryCityPage({ cities, category }: CategoryPageProps) {
  // Generate random positions and rotations only on client side to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#e6e0d4] selection:bg-[#8c7b6c] selection:text-white">
      <div className="absolute top-6 left-6 z-30">
        <Link
          href="/city"
          className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm text-black shadow"
        >
          <ArrowLeft className="h-4 w-4" />
          {language === 'en' ? 'All Categories' : '所有分类'}
        </Link>
      </div>
      {/* Texture Background */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-40" />

      {/* Title Watermark */}
      <div className="pointer-events-none fixed top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2">
        <h1 className="font-serif text-[20vw] whitespace-nowrap text-[#8c7b6c]/5 italic">
          {displayCategory}
        </h1>
      </div>

      <div className="relative z-10 container mx-auto flex min-h-screen flex-wrap items-center justify-center gap-12 px-4 py-20 md:gap-24">
        {cities.map((city, index) => (
          <Polaroid key={city.name} city={city} index={index} mounted={mounted} />
        ))}
      </div>

      <div className="pointer-events-none fixed bottom-8 left-0 w-full text-center font-serif text-sm text-[#8c7b6c]/60 italic">
        {language === 'en'
          ? "“Memory's images, once they are fixed in words, are erased.”"
          : '“记忆的形象一旦被词语固定住，就消失了。”'}
      </div>
    </div>
  )
}

function Polaroid({ city, index, mounted }: { city: City; index: number; mounted: boolean }) {
  const { language } = useLanguage()
  const displayDescription = language === 'en' ? city.enDescription : city.cnDescription

  // Deterministic rotation based on index
  const rotation = useMemo(() => {
    const sign = index % 2 === 0 ? -1 : 1
    return sign * (seededRandom(index) * 6 + 2)
  }, [index])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: mounted ? rotation : 0 }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative cursor-pointer"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <Link href={`/city/${city.type}/${city.name}`}>
        <div className="w-64 transform bg-white p-4 pb-12 shadow-lg transition-transform duration-300 ease-out md:w-72">
          {/* "Photo" Area */}
          <div className="relative mb-4 aspect-square w-full overflow-hidden bg-[#2a2a2a] grayscale transition-all duration-700 group-hover:grayscale-0">
            {/* Placeholder for city image or abstract pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-4xl text-white/20 transition-colors duration-500 group-hover:text-white/80">
                {(language === 'en' ? city.name : city.cnName || city.name)[0].toUpperCase()}
              </span>
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60" />

            <p className="absolute right-2 bottom-2 left-2 line-clamp-3 font-serif text-xs text-white/80 italic opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              {displayDescription}
            </p>
          </div>

          {/* Handwritten Label */}
          <div className="text-center">
            <h2
              className="font-serif text-2xl font-bold text-[#2a2a2a]"
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              {language === 'en' ? city.name : city.cnName || city.name}
            </h2>
            <p className="mt-1 text-[10px] tracking-widest text-gray-400 uppercase">
              Fig. {index + 1}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
