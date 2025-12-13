'use client'

import { City } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shell, Telescope, Music, Users, User } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

// Deterministic pseudo-random based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export default function Isidora({ city }: { city: City }) {
  const { language } = useLanguage()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  // Transform values for the journey from Youth to Age
  const background = useTransform(
    scrollYProgress,
    [0, 0.8],
    ['linear-gradient(to bottom, #fffbeb, #fef3c7)', 'linear-gradient(to bottom, #f5f5f4, #78716c)']
  )
  
  const textColor = useTransform(scrollYProgress, [0, 0.8], ['#92400e', '#44403c'])
  const saturation = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const filter = useTransform(saturation, s => `saturate(${s})`)

  // Pre-generate random values for spirals
  const spirals = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        delay: i * 0.2,
        scale: 0.5 + i * 0.15,
        rotateStart: i * 30,
        x: seededRandom(i * 10 + 1) * 80 + 10,
        y: seededRandom(i * 10 + 2) * 80 + 10
      })),
    []
  )

  return (
    <motion.div 
        ref={containerRef} 
        style={{ background, color: textColor }}
        className="relative min-h-[250vh] font-serif overflow-hidden"
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Background Spirals (Fading with age) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {spirals.map((spiral, i) => (
          <motion.div
            key={i}
            style={{ 
                left: `${spiral.x}%`, 
                top: `${spiral.y}%`,
                filter
            }}
            className="absolute opacity-10"
            initial={{ scale: 0, rotate: spiral.rotateStart }}
            animate={{ scale: spiral.scale, rotate: spiral.rotateStart + 360 }}
            transition={{
              duration: 20,
              delay: spiral.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
             <Shell size={200} strokeWidth={0.5} />
          </motion.div>
        ))}
      </div>

      {/* Section 1: The Desire (Youth) */}
      <div className="h-screen flex flex-col items-center justify-center relative z-10 p-8 text-center">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
        >
            <h1 className="text-8xl font-bold mb-4 tracking-tighter">ISIDORA</h1>
            <p className="text-xl uppercase tracking-widest opacity-60">
                {language === 'en' ? 'The City of Dreams' : '梦想之城'}
            </p>
        </motion.div>

        <div className="mt-24 grid grid-cols-3 gap-12 max-w-4xl">
            <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center gap-4 p-6 bg-white/30 rounded-2xl backdrop-blur-sm"
            >
                <Telescope size={48} className="text-amber-600" />
                <span className="font-bold">{language === 'en' ? 'Perfect Telescopes' : '完美的望远镜'}</span>
            </motion.div>
            <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="flex flex-col items-center gap-4 p-6 bg-white/30 rounded-2xl backdrop-blur-sm"
            >
                <Music size={48} className="text-amber-600" />
                <span className="font-bold">{language === 'en' ? 'Violins' : '小提琴'}</span>
            </motion.div>
            <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="flex flex-col items-center gap-4 p-6 bg-white/30 rounded-2xl backdrop-blur-sm"
            >
                <Users size={48} className="text-amber-600" />
                <span className="font-bold">{language === 'en' ? 'Encounters' : '邂逅'}</span>
            </motion.div>
        </div>
      </div>

      {/* Section 2: The Transition */}
      <div className="h-[50vh] flex items-center justify-center relative z-10">
         <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]) }}
            className="text-2xl italic max-w-2xl text-center leading-loose"
         >
            {language === 'en' 
                ? '"He was thinking of all these things when he desired a city. Isidora, therefore, is the city of his dreams: with one difference."'
                : '“当他渴望一座城市时，他想的是所有这些东西。因此，伊西多拉是他梦想中的城市：只有一个区别。”'}
         </motion.div>
      </div>

      {/* Section 3: The Reality (Old Age) */}
      <div className="h-screen flex flex-col items-center justify-center relative z-10 p-8 bg-linear-to-t from-stone-900/10 to-transparent">
         <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
                <h2 className="text-5xl font-bold mb-8">
                    {language === 'en' ? 'The Difference' : '区别'}
                </h2>
                <p className="text-xl leading-relaxed">
                    {language === 'en'
                        ? "The dreamed-of city contained him as a young man; he arrives at Isidora in his old age."
                        : "梦想中的城市包含着年轻时的他；而他抵达伊西多拉时已是暮年。"}
                </p>
                <p className="text-xl leading-relaxed font-bold">
                    {language === 'en'
                        ? "Desires are already memories."
                        : "欲望已成记忆。"}
                </p>
            </div>

            <div className="relative h-80 bg-stone-800 rounded-lg shadow-2xl p-8 flex items-end justify-center overflow-hidden">
                {/* The Wall */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-stone-700 flex items-center justify-around px-4">
                    {[...Array(5)].map((_, i) => (
                        <User key={i} size={32} className="text-stone-500" />
                    ))}
                    <User size={32} className="text-amber-500/50 animate-pulse" /> {/* The Traveler */}
                </div>
                <div className="absolute top-8 text-stone-500 text-sm uppercase tracking-widest">
                    {language === 'en' ? 'The Square' : '广场'}
                </div>
            </div>
         </div>
      </div>

    </motion.div>
  )
}
