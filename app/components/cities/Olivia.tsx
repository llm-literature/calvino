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
    <div className={cn(
        "relative min-h-screen transition-colors duration-1000 overflow-hidden",
        viewMode === 'rich' ? "bg-emerald-950 text-emerald-100" : "bg-neutral-900 text-neutral-400"
    )}>
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="absolute top-8 right-8 z-50 flex gap-4">
          <button 
            onClick={() => setViewMode('rich')}
            className={cn("p-2 rounded-full transition-all", viewMode === 'rich' ? "bg-emerald-500 text-white" : "bg-white/5 text-white/50")}
          >
              <Sparkles className="w-6 h-6" />
          </button>
          <button 
            onClick={() => setViewMode('gritty')}
            className={cn("p-2 rounded-full transition-all", viewMode === 'gritty' ? "bg-neutral-500 text-white" : "bg-white/5 text-white/50")}
          >
              <Settings className="w-6 h-6" />
          </button>
      </div>

      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen text-center">
        <AnimatePresence mode="wait">
            {viewMode === 'rich' ? (
                <motion.div 
                    key="rich"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="max-w-3xl"
                >
                    <h1 className="text-6xl font-serif text-emerald-400 mb-8">OLIVIA</h1>
                    <p className="text-2xl italic text-emerald-200/80 leading-relaxed mb-12">
                        {language === 'en'
                            ? '"I must speak to you of filigree palaces, somersaulting peacocks, and the glint of gold..."'
                            : '“我必须向你讲述金银丝宫殿、翻筋斗的孔雀和金色的闪光……”'}
                    </p>
                    <div className="grid grid-cols-3 gap-8 opacity-50">
                        <div className="h-32 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                            {language === 'en' ? 'Palaces' : '宫殿'}
                        </div>
                        <div className="h-32 border border-emerald-500/30 rounded-lg flex items-center justify-center">
                            {language === 'en' ? 'Peacocks' : '孔雀'}
                        </div>
                        <div className="h-32 border border-emerald-500/30 rounded-lg flex items-center justify-center">
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
                    <h1 className="text-6xl font-mono font-bold text-neutral-500 mb-8 tracking-tighter">OLIVIA</h1>
                    <p className="text-xl font-mono text-neutral-500 leading-relaxed mb-12">
                        {language === 'en'
                            ? '"...soot and grime, the creaking of wheels, the smell of leather, the repetitive motion of gears."'
                            : '“……煤烟和污垢，车轮的嘎吱声，皮革的气味，齿轮的重复运动。”'}
                    </p>
                    <div className="grid grid-cols-3 gap-8 opacity-50 font-mono text-sm">
                        <div className="h-32 border border-neutral-700 bg-neutral-800/50 rounded flex items-center justify-center">
                            {language === 'en' ? 'SMOKE' : '烟雾'}
                        </div>
                        <div className="h-32 border border-neutral-700 bg-neutral-800/50 rounded flex items-center justify-center">
                            {language === 'en' ? 'GEARS' : '齿轮'}
                        </div>
                        <div className="h-32 border border-neutral-700 bg-neutral-800/50 rounded flex items-center justify-center">
                            {language === 'en' ? 'NOISE' : '噪音'}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>

        <div className="mt-24 text-sm opacity-50 max-w-md mx-auto">
            {language === 'en'
                ? '"Falsehood is never in words; it is in things."'
                : '“虚假从来不在言语中，而是在事物中。”'}
        </div>
      </div>
    </div>
  )
}
