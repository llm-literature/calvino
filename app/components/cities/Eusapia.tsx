'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowDown, ArrowUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Eusapia({ city }: { city: City }) {
  const [inUnderground, setInUnderground] = useState(false)
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-100 font-sans text-slate-900 selection:bg-slate-300">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div className="relative h-150 w-full max-w-md overflow-hidden rounded-full border-8 border-slate-300 bg-white shadow-2xl">
          {/* Living City (Top) */}
          <motion.div
            className="absolute top-0 right-0 left-0 z-10 flex h-1/2 flex-col items-center justify-end border-b-4 border-slate-400 bg-sky-100 pb-8"
            animate={{ y: inUnderground ? '-45%' : '0%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <h2 className="mb-4 text-2xl font-bold text-sky-800">
              {language === 'en' ? 'EUSAPIA (Living)' : '欧萨皮亚（生者）'}
            </h2>
            <div className="flex items-end gap-2">
              <div className="h-16 w-8 rounded-t-md bg-sky-300" />
              <div className="h-24 w-12 rounded-t-md bg-sky-400" />
              <div className="h-20 w-10 rounded-t-md bg-sky-300" />
            </div>
            <button
              onClick={() => setInUnderground(true)}
              className={cn(
                'mt-4 rounded-full bg-slate-800 p-2 text-white transition-opacity hover:bg-slate-700',
                inUnderground ? 'pointer-events-none opacity-0' : 'opacity-100'
              )}
            >
              <ArrowDown className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Dead City (Bottom) */}
          <motion.div
            className="absolute right-0 bottom-0 left-0 z-10 flex h-1/2 flex-col items-center justify-start bg-slate-900 pt-8"
            animate={{ y: inUnderground ? '0%' : '45%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <button
              onClick={() => setInUnderground(false)}
              className={cn(
                'mb-4 rounded-full bg-slate-200 p-2 text-slate-900 transition-opacity hover:bg-white',
                !inUnderground ? 'pointer-events-none opacity-0' : 'opacity-100'
              )}
            >
              <ArrowUp className="h-6 w-6" />
            </button>
            <div className="flex scale-y-[-1] transform items-start gap-2 opacity-50">
              <div className="h-16 w-8 rounded-t-md bg-slate-700" />
              <div className="h-24 w-12 rounded-t-md bg-slate-600" />
              <div className="h-20 w-10 rounded-t-md bg-slate-700" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-slate-500">
              {language === 'en' ? 'EUSAPIA (Dead)' : '欧萨皮亚（死者）'}
            </h2>
          </motion.div>

          {/* Transition Zone */}
          <div className="absolute top-1/2 right-0 left-0 z-20 h-1 bg-black" />
        </div>

        <div className="mt-12 max-w-xl text-center text-slate-600">
          <p className="italic">
            {language === 'en'
              ? '"The inhabitants of Eusapia have constructed an identical copy of their city, underground... so that the dead can continue their activities as if they were alive."'
              : '“欧萨皮亚的居民在地下建造了一座与他们的城市一模一样的复制品……以便死者可以像生前一样继续他们的活动。”'}
          </p>
        </div>
      </div>
    </div>
  )
}
