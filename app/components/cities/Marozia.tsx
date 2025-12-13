'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Rat, Bird } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Marozia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [state, setState] = useState<'rat' | 'swallow'>('rat')

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 font-sans text-slate-100 selection:bg-slate-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div
          className="group relative aspect-video w-full max-w-2xl cursor-pointer overflow-hidden rounded-2xl shadow-2xl"
          onClick={() => setState(state === 'rat' ? 'swallow' : 'rat')}
        >
          {/* The Rat City */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-800"
            animate={{ opacity: state === 'rat' ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Rat className="mb-4 h-32 w-32 text-slate-600" />
            <h1 className="text-6xl font-bold text-slate-700">MAROZIA</h1>
            <p className="mt-4 text-slate-500">
              {language === 'en' ? 'The City of the Rat' : '老鼠之城'}
            </p>
          </motion.div>

          {/* The Swallow City */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-sky-200"
            animate={{ opacity: state === 'swallow' ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <Bird className="mb-4 h-32 w-32 text-sky-600" />
            <h1 className="text-6xl font-bold text-sky-700">MAROZIA</h1>
            <p className="mt-4 text-sky-600">
              {language === 'en' ? 'The City of the Swallow' : '燕子之城'}
            </p>
          </motion.div>

          <div className="absolute right-4 bottom-4 rounded bg-black/20 px-2 py-1 text-xs text-white opacity-50">
            {language === 'en' ? 'Click to transform' : '点击变换'}
          </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-slate-400 italic">
          {language === 'en'
            ? '"Marozia consists of two cities: the city of the rat and the city of the swallow. The latter is the one that will break free from the first."'
            : '“玛罗齐亚由两座城市组成：老鼠之城和燕子之城。后者将从前者中挣脱出来。”'}
        </p>
      </div>
    </div>
  )
}
