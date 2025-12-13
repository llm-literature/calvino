'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Tent, Building2 } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Sophronia({ city }: { city: City }) {
  const { language } = useLanguage()
  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-200 font-sans text-stone-800 selection:bg-stone-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24">
        <header className="mb-24 text-center">
          <h1 className="mb-4 text-5xl font-bold text-stone-900">SOPHRONIA</h1>
          <p className="tracking-widest text-stone-600 uppercase">
            {language === 'en' ? 'The Two Half-Cities' : '两个半城'}
          </p>
        </header>

        <div className="grid min-h-[50vh] grid-cols-1 gap-12 md:grid-cols-2">
          {/* The Permanent Half (Circus) */}
          <div className="relative border-4 border-stone-800 bg-stone-100 p-8 shadow-[10px_10px_0px_0px_rgba(28,25,23,1)]">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-800 px-4 py-1 text-sm font-bold tracking-widest text-white uppercase">
              {language === 'en' ? 'Permanent' : '永久'}
            </div>
            <div className="flex h-full flex-col items-center justify-center space-y-8">
              <Tent className="h-24 w-24 text-red-600" />
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">
                  {language === 'en' ? 'The Carnival' : '嘉年华'}
                </h3>
                <p className="text-stone-500">
                  {language === 'en'
                    ? 'Roller coasters, carousels, the Ferris wheel, the trapeze.'
                    : '过山车、旋转木马、摩天轮、空中飞人。'}
                </p>
                <p className="mt-4 text-xs font-bold text-stone-400 uppercase">
                  {language === 'en' ? 'Never Moves' : '永不移动'}
                </p>
              </div>
            </div>
          </div>

          {/* The Temporary Half (Stone Buildings) */}
          <motion.div
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            whileDrag={{ scale: 1.05, rotate: 2 }}
            className="relative cursor-grab border-4 border-dashed border-stone-400 bg-white/50 p-8 active:cursor-grabbing"
          >
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-400 px-4 py-1 text-sm font-bold tracking-widest text-white uppercase">
              {language === 'en' ? 'Temporary' : '临时'}
            </div>
            <div className="flex h-full flex-col items-center justify-center space-y-8 opacity-70">
              <Building2 className="h-24 w-24 text-stone-600" />
              <div className="text-center">
                <h3 className="mb-2 text-2xl font-bold">
                  {language === 'en' ? 'The Establishment' : '机构'}
                </h3>
                <p className="text-stone-500">
                  {language === 'en'
                    ? 'Banks, factories, palaces, slaughterhouses, schools.'
                    : '银行、工厂、宫殿、屠宰场、学校。'}
                </p>
                <p className="mt-4 text-xs font-bold text-stone-400 uppercase">
                  {language === 'en'
                    ? 'Loaded on trailers & moved annually'
                    : '装在拖车上，每年移动'}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mx-auto mt-24 max-w-2xl text-center text-stone-600 italic">
          {language === 'en'
            ? '"One of the half-cities is permanent, the other is temporary, and when the period of its sojourn is over, they nail it up, dismantle it, and take it away..."'
            : '“其中一个半城是永久的，另一个是临时的，当它的逗留期结束时，他们把它钉起来，拆除，然后带走……”'}
        </div>
      </div>
    </div>
  )
}
