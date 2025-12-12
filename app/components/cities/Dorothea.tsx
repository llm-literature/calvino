'use client'

import { City } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Map, Tent } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Dorothea({ city }: { city: City }) {
  const [viewMode, setViewMode] = useState<'structural' | 'experiential'>('structural')

  return (
    <div className="relative min-h-screen overflow-hidden transition-colors duration-1000">
      {/* Background Layer */}
      <div
        className={cn(
          'absolute inset-0 transition-colors duration-1000',
          viewMode === 'structural' ? 'bg-slate-900' : 'bg-amber-50'
        )}
      >
        {viewMode === 'structural' && (
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />
        )}
      </div>

      {/* Navigation */}
      <Link
        href={`/city/${city.type}`}
        className={cn(
          'absolute top-8 left-8 z-50 rounded-full p-2 transition-colors',
          viewMode === 'structural'
            ? 'text-slate-400 hover:bg-slate-800'
            : 'text-amber-900 hover:bg-amber-200'
        )}
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Toggle Switch */}
      <div className="absolute top-8 right-8 z-50 flex gap-2 rounded-full bg-black/10 p-1 backdrop-blur-sm">
        <button
          onClick={() => setViewMode('structural')}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
            viewMode === 'structural'
              ? 'bg-slate-700 text-white shadow-lg'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
          )}
        >
          <Map className="h-4 w-4" />
          <span className="hidden sm:inline">Blueprint</span>
        </button>
        <button
          onClick={() => setViewMode('experiential')}
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
            viewMode === 'experiential'
              ? 'bg-amber-600 text-white shadow-lg'
              : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'
          )}
        >
          <Tent className="h-4 w-4" />
          <span className="hidden sm:inline">Memory</span>
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <AnimatePresence mode="wait">
          {viewMode === 'structural' ? (
            <StructuralView key="structural" city={city} />
          ) : (
            <ExperientialView key="experiential" city={city} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function StructuralView({ city }: { city: City }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Blueprint Visualization */}
        <div className="relative aspect-square rounded-lg border-2 border-slate-700 bg-slate-800/50 p-8 backdrop-blur-sm">
          {/* 4 Towers */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={`tower-${i}`}
              initial={{ height: 0 }}
              animate={{ height: '40%' }}
              transition={{ delay: 0.5 + i * 0.1, duration: 1 }}
              className="absolute w-8 border border-slate-400 bg-slate-400/30"
              style={{
                left: i % 2 === 0 ? '20%' : '70%',
                top: i < 2 ? '20%' : '70%',
              }}
            />
          ))}

          {/* 9 Districts Grid */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 p-12 opacity-50">
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={`district-${i}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="border border-emerald-500/30 bg-emerald-900/10"
              />
            ))}
          </div>

          {/* Canals */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-1/2 left-0 h-2 w-full -translate-y-1/2 bg-emerald-500/50 blur-[1px]"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute top-0 left-1/2 h-full w-2 -translate-x-1/2 bg-emerald-500/50 blur-[1px]"
          />

          <div className="absolute right-4 bottom-4 font-mono text-xs text-slate-500">
            FIG 1.1: CITY LAYOUT
          </div>
        </div>

        {/* Technical Description */}
        <div className="flex flex-col justify-center space-y-6 font-mono text-slate-300">
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-4xl font-bold tracking-tighter text-slate-100"
          >
            {city.name.toUpperCase()}
          </motion.h1>

          <div className="space-y-4 text-sm leading-relaxed text-slate-400">
            <p>
              <span className="text-emerald-400">SPECIFICATION:</span> Four aluminum towers. Seven
              gates with spring-loaded drawbridges.
            </p>
            <p>
              <span className="text-emerald-400">HYDROLOGY:</span> Four green canals dividing the
              city into nine districts.
            </p>
            <p>
              <span className="text-emerald-400">DEMOGRAPHICS:</span> 300 houses per district. 700
              chimneys.
            </p>
            <p>
              <span className="text-emerald-400">SOCIAL CONTRACT:</span> Matrimonial exchange
              between districts. Commodity exchange: Bergamot, Roe, Amethysts.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ExperientialView({ city }: { city: City }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl text-center"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 font-serif text-6xl text-amber-900 md:text-8xl"
      >
        {city.name}
      </motion.h1>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="prose prose-lg prose-amber mx-auto font-serif text-xl leading-loose text-amber-800"
      >
        <p>
          "I arrived here in my early youth, one morning when many people were hurrying along the
          streets toward the market..."
        </p>
        <p className="mt-8 text-2xl text-amber-600 italic">
          The women had fine teeth and looked you straight in the eye.
        </p>
        <p className="mt-4">
          Three soldiers on a platform played the trumpet. All around, wheels turned and colored
          banners fluttered in the wind.
        </p>
      </motion.div>

      {/* Decorative Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-amber-900/10"
            initial={{
              x: Math.random() * 100 - 50 + '%',
              y: '120%',
              rotate: Math.random() * 30 - 15,
            }}
            animate={{
              y: '-20%',
              rotate: Math.random() * 30 - 15 + (Math.random() > 0.5 ? 360 : -360),
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              delay: i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <span className="text-9xl">{['🚩', '🎺', '🐪', '🦷', '🎡'][i]}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
