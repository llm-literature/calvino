'use client'

import { City } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Valdrada({ city }: { city: City }) {
  const { language } = useLanguage()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-slate-900 font-serif text-slate-100">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden">
        {/* Top City (Real) */}
        <div className="relative flex flex-1 items-end justify-center overflow-hidden border-b border-slate-500/30 bg-slate-800 pb-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

          <motion.div style={{ scale }} className="relative z-10 mb-12 text-center">
            <h1 className="text-6xl font-bold tracking-widest text-slate-200">VALDRADA</h1>
            <p className="mt-4 text-xs tracking-[0.5em] text-slate-400 uppercase">
              {language === 'en' ? 'The City' : '城市'}
            </p>
          </motion.div>

          {/* Buildings */}
          <div className="absolute bottom-0 flex w-full items-end justify-center gap-4 px-12 opacity-50">
            <div className="h-32 w-12 bg-slate-600" />
            <div className="h-48 w-16 bg-slate-500" />
            <div className="h-24 w-20 bg-slate-600" />
            <div className="h-56 w-14 bg-slate-400" />
            <div className="h-40 w-24 bg-slate-500" />
          </div>
        </div>

        {/* Bottom City (Reflection) */}
        <div className="relative flex flex-1 items-start justify-center overflow-hidden bg-slate-900 pt-0">
          {/* Reflection Buildings */}
          <div className="absolute top-0 flex w-full scale-y-[-1] items-start justify-center gap-4 px-12 opacity-30">
            <div className="h-32 w-12 bg-slate-600" />
            <div className="h-48 w-16 bg-slate-500" />
            <div className="h-24 w-20 bg-slate-600" />
            <div className="h-56 w-14 bg-slate-400" />
            <div className="h-40 w-24 bg-slate-500" />
          </div>

          <motion.div
            style={{ scale }}
            className="relative z-10 mt-12 scale-y-[-1] text-center opacity-50 blur-[1px]"
          >
            <h1 className="text-6xl font-bold tracking-widest text-slate-200">VALDRADA</h1>
            <p className="mt-4 text-xs tracking-[0.5em] text-slate-400 uppercase">
              {language === 'en' ? 'The Reflection' : '倒影'}
            </p>
          </motion.div>

          {/* Water Effect */}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-slate-900/50 to-slate-900" />
        </div>

        {/* Text Overlay */}
        <motion.div
          style={{ opacity }}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="max-w-xl rounded-xl border border-white/10 bg-black/40 p-8 text-center backdrop-blur-sm">
            <p className="text-lg leading-relaxed text-slate-300 italic">
              {language === 'en'
                ? '"The ancients built Valdrada on the shores of a lake, with houses all verandas one above the other, and high streets whose railed parapets look out over the water."'
                : '“古人在湖岸上建造了瓦尔德拉达，房子都是一个在另一个之上的阳台，高高的街道上有栏杆的护墙，俯瞰着水面。”'}
            </p>
            <p className="mt-4 text-sm text-slate-500">
              {language === 'en' ? 'Scroll to merge the cities' : '滚动以合并城市'}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
