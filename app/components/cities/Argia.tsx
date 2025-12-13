'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Shovel } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Argia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [dirtLevel, setDirtLevel] = useState(100)
  const [particles, setParticles] = useState<{ x: number; y: number }[]>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 50 }).map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
      }))
    )
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-900 font-sans text-stone-300 selection:bg-stone-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div className="relative aspect-square w-full max-w-2xl overflow-hidden rounded-lg border border-stone-700 bg-stone-800 shadow-2xl">
          {/* The Buried City */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div className="text-center">
              <h1 className="mb-8 font-serif text-6xl text-stone-500">
                {language === 'en' ? 'ARGIA' : city.cnName}
              </h1>
              <p className="mb-4 text-stone-600">
                {language === 'en'
                  ? '"What makes Argia different from other cities is that it has earth instead of air."'
                  : '"阿尔吉亚与其他城市的不同之处在于，它拥有的是泥土而不是空气。"'}
              </p>
              <div className="grid grid-cols-3 gap-4 opacity-30">
                <div className="h-20 rounded bg-stone-600" />
                <div className="h-20 rounded bg-stone-600" />
                <div className="h-20 rounded bg-stone-600" />
                <div className="h-20 rounded bg-stone-600" />
                <div className="h-20 rounded bg-stone-600" />
                <div className="h-20 rounded bg-stone-600" />
              </div>
            </div>
          </div>

          {/* The Earth Layer */}
          <motion.div
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-stone-950"
            style={{ clipPath: `inset(${100 - dirtLevel}% 0 0 0)` }}
            onClick={() => setDirtLevel((l) => Math.max(0, l - 10))}
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dirt.png')] opacity-20"></div>
            {particles.map((p, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-stone-700"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                }}
              />
            ))}
          </motion.div>

          {/* Dig Button Overlay */}
          {dirtLevel > 0 && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse rounded-full bg-black/50 p-4 backdrop-blur">
                <Shovel className="h-8 w-8 text-stone-300" />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setDirtLevel(100)}
          className="mt-8 text-sm text-stone-500 transition-colors hover:text-stone-300"
        >
          {language === 'en' ? 'Reset Earth' : '重置泥土'}
        </button>
      </div>
    </div>
  )
}
