'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Laudomia({ city }: { city: City }) {
  const { language } = useLanguage()
  const [realm, setRealm] = useState<'living' | 'dead' | 'unborn'>('living')

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden font-sans transition-colors duration-1000',
        realm === 'living'
          ? 'bg-amber-50 text-amber-900'
          : realm === 'dead'
            ? 'bg-slate-900 text-slate-300'
            : 'bg-indigo-50 text-indigo-900'
      )}
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-12 font-serif text-6xl">LAUDOMIA</h1>

        <div className="mb-12 flex gap-8">
          <button
            onClick={() => setRealm('living')}
            className={cn(
              'rounded-full px-6 py-3 transition-all',
              realm === 'living'
                ? 'scale-110 bg-amber-500 text-white shadow-lg'
                : 'bg-amber-200 text-amber-800 hover:bg-amber-300'
            )}
          >
            {language === 'en' ? 'The Living' : '生者'}
          </button>
          <button
            onClick={() => setRealm('dead')}
            className={cn(
              'rounded-full px-6 py-3 transition-all',
              realm === 'dead'
                ? 'scale-110 bg-slate-600 text-white shadow-lg'
                : 'bg-slate-300 text-slate-800 hover:bg-slate-400'
            )}
          >
            {language === 'en' ? 'The Dead' : '死者'}
          </button>
          <button
            onClick={() => setRealm('unborn')}
            className={cn(
              'rounded-full px-6 py-3 transition-all',
              realm === 'unborn'
                ? 'scale-110 bg-indigo-500 text-white shadow-lg'
                : 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300'
            )}
          >
            {language === 'en' ? 'The Unborn' : '未生者'}
          </button>
        </div>

        <div className="relative flex h-96 w-full max-w-4xl items-center justify-center">
          {/* The Living */}
          {realm === 'living' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="mb-8 flex justify-center gap-4">
                <Users className="h-12 w-12 text-amber-600" />
                <Users className="h-12 w-12 text-amber-600" />
                <Users className="h-12 w-12 text-amber-600" />
              </div>
              <p className="mx-auto max-w-lg text-xl">
                {language === 'en'
                  ? '"The city of the living has a population that does not grow but ages..."'
                  : '“生者的城市人口不增反减，只是在变老……”'}
              </p>
            </motion.div>
          )}

          {/* The Dead */}
          {realm === 'dead' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="mb-8 grid grid-cols-10 gap-2 opacity-50">
                {Array.from({ length: 50 }).map((_, i) => (
                  <div key={i} className="h-2 w-2 rounded-full bg-slate-500" />
                ))}
              </div>
              <p className="mx-auto max-w-lg text-xl">
                {language === 'en'
                  ? '"The city of the dead... its population increases... they are more numerous than the living."'
                  : '“死者的城市……人口在增加……他们比生者更多。”'}
              </p>
            </motion.div>
          )}

          {/* The Unborn */}
          {realm === 'unborn' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div className="animate-spin-slow mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full border-4 border-dashed border-indigo-300">
                <span className="text-4xl">?</span>
              </div>
              <p className="mx-auto max-w-lg text-xl">
                {language === 'en'
                  ? '"The city of the unborn... infinite... a grain of sand in the desert."'
                  : '“未生者的城市……无限……沙漠中的一粒沙。”'}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
