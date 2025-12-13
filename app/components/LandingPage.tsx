'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState, useEffect, useMemo } from 'react'
import { Github } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'
import { cn } from '@/lib/utils'

// Deterministic pseudo-random based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

// Pre-generate star data deterministically
function generateStars(count: number) {
  return [...Array(count)].map((_, i) => ({
    x: seededRandom(i * 1) * 100,
    y: seededRandom(i * 2 + 100) * 100,
    scale: seededRandom(i * 3 + 200) * 0.5 + 0.5,
    opacity: seededRandom(i * 4 + 300) * 0.5 + 0.2,
    size: seededRandom(i * 5 + 400) * 3 + 1,
    duration: seededRandom(i * 6 + 500) * 3 + 2,
  }))
}

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHoveringBook, setIsHoveringBook] = useState(false)
  const { language, setLanguage } = useLanguage()

  // Pre-generate stars deterministically
  const stars = useMemo(() => generateStars(100), [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-white/20">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        {stars.map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size + 'px',
              height: star.size + 'px',
            }}
            initial={{
              scale: star.scale,
              opacity: star.opacity,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Light */}
      <div
        className="pointer-events-none absolute z-0 h-[500px] w-[500px] rounded-full bg-blue-500/5 blur-[100px] transition-opacity duration-500"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          opacity: isHoveringBook ? 0.8 : 0.3,
        }}
      />

      {/* GitHub Link - Creative Placement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-8 right-8 z-50 flex items-center gap-6"
      >
        {/* Creative Language Switcher */}
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/30">
          <button
            onClick={() => setLanguage('cn')}
            className={cn(
              'transition-colors duration-300 hover:text-white',
              language === 'cn' ? 'font-bold text-white' : ''
            )}
          >
            CN
          </button>
          <span>/</span>
          <button
            onClick={() => setLanguage('en')}
            className={cn(
              'transition-colors duration-300 hover:text-white',
              language === 'en' ? 'font-bold text-white' : ''
            )}
          >
            EN
          </button>
        </div>

        <Link
          href="https://github.com/llm-literature/calvino"
          target="_blank"
          className="group flex items-center gap-2 text-white/30 transition-colors duration-500 hover:text-white"
        >
          <span className="-translate-x-2 font-mono text-xs tracking-widest opacity-0 transition-opacity duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            SOURCE_CODE
          </span>
          <Github className="h-5 w-5" />
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-12 px-4 text-center">
        {/* The Book - Central Interactive Element */}
        <Link href="/city">
          <motion.div
            className="perspective-1000 relative h-80 w-64 cursor-pointer md:h-[480px] md:w-80"
            onHoverStart={() => setIsHoveringBook(true)}
            onHoverEnd={() => setIsHoveringBook(false)}
            initial={{ rotateY: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Book Cover */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-r-lg border border-white/20 bg-[#1a1a1a] p-8 shadow-[20px_20px_50px_rgba(0,0,0,0.5)]"
              animate={{
                rotateY: isHoveringBook ? -15 : 0,
                x: isHoveringBook ? -10 : 0,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
            >
              {/* Cover Texture */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />

              {/* Title on Cover */}
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-between border-2 border-white/30 p-6">
                <div className="text-center">
                  <h1 className="font-display mb-2 bg-gradient-to-b from-white via-gray-300 to-gray-600 bg-clip-text text-4xl font-bold tracking-tighter text-transparent md:text-5xl">
                    {language === 'en' ? 'INVISIBLE' : '看不见的'}
                    <br />
                    {language === 'en' ? 'CITIES' : '城市'}
                  </h1>
                  <p className="font-serif text-xs tracking-[0.3em] text-gray-400">
                    {language === 'en' ? 'ITALO CALVINO' : '伊塔洛·卡尔维诺'}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                  <div className="h-1 w-1 animate-pulse rounded-full bg-white" />
                </div>
              </div>

              {/* Spine Highlight */}
              <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-white/10 to-transparent" />
            </motion.div>

            {/* Book Pages (Side View) */}
            <motion.div
              className="absolute top-2 right-0 bottom-2 w-12 origin-left rounded-r-sm bg-[#e3e3e3]"
              style={{ transform: 'translateX(100%) rotateY(-90deg)' }}
              animate={{
                rotateY: isHoveringBook ? -80 : -90,
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute inset-x-0 h-px bg-black/10"
                  style={{ top: `${i * 20}%` }}
                />
              ))}
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
