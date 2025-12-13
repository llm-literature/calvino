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
        delay: seededRandom(i) * 2,
      })),
    []
  )

  return (
    <div
      ref={containerRef}
      className="relative min-h-[200vh] bg-slate-950 font-serif text-slate-200 selection:bg-amber-500/30"
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Hero Section */}
      <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background Domes */}
        <div className="pointer-events-none absolute inset-0 opacity-30">
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
                boxShadow: [
                  '0 0 0px rgba(255,255,255,0)',
                  '0 0 20px rgba(255,255,255,0.2)',
                  '0 0 0px rgba(255,255,255,0)',
                ],
              }}
              transition={{
                duration: 3 + seededRandom(i) * 2,
                repeat: Infinity,
                delay: dome.delay,
              }}
            />
          ))}
        </div>

        <motion.div style={{ opacity, scale }} className="z-10 text-center">
          <h1 className="mb-4 bg-linear-to-b from-slate-100 to-slate-600 bg-clip-text text-8xl font-bold text-transparent md:text-9xl">
            {language === 'en' ? 'DIOMIRA' : city.cnName}
          </h1>
          <p className="text-sm tracking-[0.5em] text-slate-400 uppercase md:text-base">
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
      <div className="relative z-10 container mx-auto space-y-32 px-4 py-24">
        {/* The Features */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="space-y-8">
            <div className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-amber-500/50">
              <div className="rounded-full bg-slate-800 p-4 transition-colors group-hover:bg-amber-900/20">
                <Bird className="h-8 w-8 text-amber-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-100">
                  {language === 'en' ? 'Golden Cock' : '金公鸡'}
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'en' ? 'Crows each morning on a tower' : '每天早晨在塔上啼叫'}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-slate-400/50">
              <div className="rounded-full bg-slate-800 p-4 transition-colors group-hover:bg-slate-700">
                <Landmark className="h-8 w-8 text-slate-300" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-200">
                  {language === 'en' ? 'Bronze Statues' : '青铜雕像'}
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'en' ? 'Of all the gods' : '所有的神像'}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-cyan-500/50">
              <div className="rounded-full bg-slate-800 p-4 transition-colors group-hover:bg-cyan-900/20">
                <Theater className="h-8 w-8 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-100">
                  {language === 'en' ? 'Crystal Theater' : '水晶剧场'}
                </h3>
                <p className="text-sm text-slate-400">
                  {language === 'en' ? 'Reflecting the city lights' : '映照着城市的灯光'}
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-linear-to-r from-amber-500/20 to-purple-500/20 blur-3xl" />
            <div className="relative rounded-2xl border border-slate-700 bg-slate-900/80 p-8 backdrop-blur-md">
              <p className="text-lg leading-relaxed text-slate-300 italic">
                {language === 'en'
                  ? '"But the special quality of this city for the man who arrives there on a September evening... is that he feels envy toward those who now believe they have once before lived an evening identical to this and who think they were happy, that time."'
                  : '“但是，对于在一个九月的黄昏抵达那里的人来说，这座城市的特殊品质在于：他会羡慕那些现在相信自己曾经度过一个与此相同的夜晚，并且认为那时的自己是幸福的人。”'}
              </p>
            </div>
          </div>
        </div>

        {/* The Memory */}
        <div className="mx-auto max-w-2xl pb-32 text-center">
          <div className="mx-auto mb-8 h-24 w-px bg-linear-to-b from-transparent via-slate-500 to-transparent" />
          <p className="text-2xl leading-normal font-light text-slate-400 md:text-3xl">
            {language === 'en'
              ? 'All these beauties will already be familiar to the visitor, who has seen them also in other cities.'
              : '所有这些美景对于游客来说都已经很熟悉了，因为他在其他城市也见过它们。'}
          </p>
        </div>
      </div>
    </div>
  )
}
