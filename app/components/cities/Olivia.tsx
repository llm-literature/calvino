'use client'

import { City } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Settings } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Olivia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [viewMode, setViewMode] = useState<'rich' | 'gritty'>('rich')

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden transition-colors duration-1000',
        viewMode === 'rich' ? 'bg-emerald-950 text-emerald-100' : 'bg-neutral-900 text-neutral-400'
      )}
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="absolute top-8 right-8 z-50 flex gap-4">
        <button
          onClick={() => setViewMode('rich')}
          className={cn(
            'rounded-full p-2 transition-all',
            viewMode === 'rich' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-white/50'
          )}
        >
          <Sparkles className="h-6 w-6" />
        </button>
        <button
          onClick={() => setViewMode('gritty')}
          className={cn(
            'rounded-full p-2 transition-all',
            viewMode === 'gritty' ? 'bg-neutral-500 text-white' : 'bg-white/5 text-white/50'
          )}
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24 text-center">
        <AnimatePresence mode="wait">
          {viewMode === 'rich' ? (
            <motion.div
              key="rich"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl"
            >
              <h1 className="mb-8 font-serif text-6xl text-emerald-400">OLIVIA</h1>
              <p className="mb-12 text-2xl leading-relaxed text-emerald-200/80 italic">
                {language === 'en'
                  ? '"I must speak to you of filigree palaces, somersaulting peacocks, and the glint of gold..."'
                  : '“我必须向你讲述金银丝宫殿、翻筋斗的孔雀和金色的闪光……”'}
              </p>
              <div className="grid grid-cols-3 gap-8 opacity-50">
                <div className="flex h-32 items-center justify-center rounded-lg border border-emerald-500/30">
                  {language === 'en' ? 'Palaces' : '宫殿'}
                </div>
                <div className="flex h-32 items-center justify-center rounded-lg border border-emerald-500/30">
                  {language === 'en' ? 'Peacocks' : '孔雀'}
                </div>
                <div className="flex h-32 items-center justify-center rounded-lg border border-emerald-500/30">
                  {language === 'en' ? 'Gardens' : '花园'}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gritty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-3xl"
            >
              <h1 className="mb-8 font-mono text-6xl font-bold tracking-tighter text-neutral-500">
                OLIVIA
              </h1>
              <p className="mb-12 font-mono text-xl leading-relaxed text-neutral-500">
                {language === 'en'
                  ? '"...soot and grime, the creaking of wheels, the smell of leather, the repetitive motion of gears."'
                  : '“……煤烟和污垢，车轮的嘎吱声，皮革的气味，齿轮的重复运动。”'}
              </p>
              <div className="grid grid-cols-3 gap-8 font-mono text-sm opacity-50">
                <div className="flex h-32 items-center justify-center rounded border border-neutral-700 bg-neutral-800/50">
                  {language === 'en' ? 'SMOKE' : '烟雾'}
                </div>
                <div className="flex h-32 items-center justify-center rounded border border-neutral-700 bg-neutral-800/50">
                  {language === 'en' ? 'GEARS' : '齿轮'}
                </div>
                <div className="flex h-32 items-center justify-center rounded border border-neutral-700 bg-neutral-800/50">
                  {language === 'en' ? 'NOISE' : '噪音'}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mx-auto mt-24 max-w-md text-sm opacity-50">
          {language === 'en'
            ? '"Falsehood is never in words; it is in things."'
            : '“虚假从来不在言语中，而是在事物中。”'}
        </div>
      </div>
    </div>
  )
}
