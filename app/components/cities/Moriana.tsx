'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Moriana({ city }: { city: City }) {
  const { language } = useLanguage()
  const [face, setFace] = useState<'glass' | 'rust'>('glass')

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden font-sans transition-colors duration-1000',
        face === 'glass'
          ? 'bg-sky-50 text-sky-900 selection:bg-sky-200'
          : 'bg-orange-950 text-orange-100 selection:bg-orange-800'
      )}
    >
      <Link
        href={`/city/${city.type}`}
        className={cn(
          'fixed top-8 left-8 z-50 rounded-full p-2 backdrop-blur transition-colors',
          face === 'glass' ? 'bg-white/50 hover:bg-white/80' : 'bg-black/50 hover:bg-black/80'
        )}
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <button
          onClick={() => setFace(face === 'glass' ? 'rust' : 'glass')}
          className="group relative mb-12"
        >
          <h1 className="relative z-10 font-serif text-8xl tracking-tighter">MORIANA</h1>
          <motion.div
            className="absolute -inset-4 flex items-center justify-center rounded-full opacity-0 transition-opacity group-hover:opacity-100"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <RefreshCw className="h-full w-full opacity-10" />
          </motion.div>
        </button>

        <div className="perspective-1000 relative flex h-125 w-full max-w-5xl items-center justify-center">
          {/* Glass Face */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-white/50 bg-white/30 p-12 shadow-xl backdrop-blur-md"
            animate={{
              rotateY: face === 'glass' ? 0 : 180,
              opacity: face === 'glass' ? 1 : 0,
              zIndex: face === 'glass' ? 10 : 0,
            }}
            transition={{ duration: 0.8 }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="grid h-full w-full grid-cols-3 gap-8">
              <div className="animate-pulse rounded-xl bg-sky-200/50" />
              <div className="animate-pulse rounded-xl bg-sky-200/50 delay-100" />
              <div className="animate-pulse rounded-xl bg-sky-200/50 delay-200" />
              <div className="col-span-3 flex items-center justify-center rounded-xl bg-sky-100/50 text-xl font-light text-sky-700">
                {language === 'en'
                  ? '"Alabaster gates transparent in the sunlight..."'
                  : '“阳光下透明的雪花石膏大门……”'}
              </div>
            </div>
          </motion.div>

          {/* Rust Face */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl border border-orange-900/50 bg-stone-900 p-12 shadow-2xl"
            animate={{
              rotateY: face === 'rust' ? 0 : -180,
              opacity: face === 'rust' ? 1 : 0,
              zIndex: face === 'rust' ? 10 : 0,
            }}
            transition={{ duration: 0.8 }}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div className="grid h-full w-full grid-cols-3 gap-8">
              <div className="rounded-xl border border-orange-800 bg-orange-900/50" />
              <div className="rounded-xl border border-orange-800 bg-orange-900/50" />
              <div className="rounded-xl border border-orange-800 bg-orange-900/50" />
              <div className="col-span-3 flex items-center justify-center rounded-xl border border-orange-900 bg-black/50 font-mono text-xl text-orange-500">
                {language === 'en'
                  ? '"Rusted signs... piles of tin cans... soot-covered walls..."'
                  : '“生锈的标志……成堆的锡罐……覆盖着煤烟的墙壁……”'}
              </div>
            </div>
          </motion.div>
        </div>

        <p className="mt-12 max-w-lg text-center opacity-60">
          {language === 'en'
            ? 'Moriana has no thickness; it consists only of a face and an obverse, like a sheet of paper, with a figure on either side.'
            : '莫里亚纳没有厚度；它只有正面和反面，就像一张纸，两面都有图案。'}
        </p>
      </div>
    </div>
  )
}
