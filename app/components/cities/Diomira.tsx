'use client'

import { City } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Bird, Theater, Landmark } from 'lucide-react'
import { useMemo, useRef } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

// Deterministic pseudo-random based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export default function Diomira({ city }: { city: City }) {
  const { language } = useLanguage()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // Pre-generate dome positions
  const domes = useMemo(
    () =>
      [...Array(60)].map((_, i) => ({
        left: seededRandom(i * 4 + 1) * 100,
        bottom: seededRandom(i * 4 + 2) * 30,
        width: seededRandom(i * 4 + 3) * 60 + 40,
        height: seededRandom(i * 4 + 4) * 60 + 40,
        delay: seededRandom(i) * 2
      })),
    []
  )

  return (
    <div ref={containerRef} className="relative min-h-[200vh] bg-slate-950 text-slate-200 font-serif selection:bg-amber-500/30">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Hero Section */}
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background Domes */}
        <div className="absolute inset-0 opacity-30 pointer-events-none">
            {domes.map((dome, i) => (
            <motion.div
                key={i}
                className="absolute rounded-t-full border border-slate-500 bg-linear-to-b from-slate-400/20 to-transparent"
                style={{
                left: `${dome.left}%`,
                bottom: `${dome.bottom}%`,
                width: `${dome.width}px`,
                height: `${dome.height}px`,
                }}
                animate={{
                    boxShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 20px rgba(255,255,255,0.2)", "0 0 0px rgba(255,255,255,0)"]
                }}
                transition={{
                    duration: 3 + seededRandom(i) * 2,
                    repeat: Infinity,
                    delay: dome.delay
                }}
            />
            ))}
        </div>

        <motion.div style={{ opacity, scale }} className="z-10 text-center">
            <h1 className="text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-linear-to-b from-slate-100 to-slate-600 mb-4">
                {language === 'en' ? 'DIOMIRA' : city.cnName}
            </h1>
            <p className="text-slate-400 tracking-[0.5em] uppercase text-sm md:text-base">
                {language === 'en' ? 'A City with Sixty Silver Domes' : '拥有六十座银色圆顶的城市'}
            </p>
        </motion.div>

        <motion.div 
            className="absolute bottom-12 animate-bounce text-slate-500"
            style={{ opacity }}
        >
            ↓
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 container mx-auto px-4 py-24 space-y-32">
        
        {/* The Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <div className="flex items-center gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors group">
                    <div className="p-4 bg-slate-800 rounded-full group-hover:bg-amber-900/20 transition-colors">
                        <Bird className="w-8 h-8 text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-amber-100">{language === 'en' ? 'Golden Cock' : '金公鸡'}</h3>
                        <p className="text-slate-400 text-sm">{language === 'en' ? 'Crows each morning on a tower' : '每天早晨在塔上啼叫'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-400/50 transition-colors group">
                    <div className="p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                        <Landmark className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-slate-200">{language === 'en' ? 'Bronze Statues' : '青铜雕像'}</h3>
                        <p className="text-slate-400 text-sm">{language === 'en' ? 'Of all the gods' : '所有的神像'}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 p-6 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-cyan-500/50 transition-colors group">
                    <div className="p-4 bg-slate-800 rounded-full group-hover:bg-cyan-900/20 transition-colors">
                        <Theater className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-cyan-100">{language === 'en' ? 'Crystal Theater' : '水晶剧场'}</h3>
                        <p className="text-slate-400 text-sm">{language === 'en' ? 'Reflecting the city lights' : '映照着城市的灯光'}</p>
                    </div>
                </div>
            </div>

            <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-amber-500/20 to-purple-500/20 blur-3xl rounded-full" />
                <div className="relative bg-slate-900/80 p-8 rounded-2xl border border-slate-700 backdrop-blur-md">
                    <p className="text-lg leading-relaxed text-slate-300 italic">
                        {language === 'en' 
                            ? '"But the special quality of this city for the man who arrives there on a September evening... is that he feels envy toward those who now believe they have once before lived an evening identical to this and who think they were happy, that time."'
                            : '“但是，对于在一个九月的黄昏抵达那里的人来说，这座城市的特殊品质在于：他会羡慕那些现在相信自己曾经度过一个与此相同的夜晚，并且认为那时的自己是幸福的人。”'}
                    </p>
                </div>
            </div>
        </div>

        {/* The Memory */}
        <div className="text-center max-w-2xl mx-auto pb-32">
            <div className="w-px h-24 bg-linear-to-b from-transparent via-slate-500 to-transparent mx-auto mb-8" />
            <p className="text-2xl md:text-3xl font-light text-slate-400 leading-normal">
                {language === 'en' 
                    ? "All these beauties will already be familiar to the visitor, who has seen them also in other cities."
                    : "所有这些美景对于游客来说都已经很熟悉了，因为他在其他城市也见过它们。"}
            </p>
        </div>

      </div>
    </div>
  )
}
