'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Tent, Building2 } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Sophronia({ city }: { city: City }) {
  const { language } = useLanguage()
  return (
    <div className="relative min-h-screen bg-stone-200 text-stone-800 font-sans overflow-hidden selection:bg-stone-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24">
        <header className="text-center mb-24">
            <h1 className="text-5xl font-bold text-stone-900 mb-4">SOPHRONIA</h1>
            <p className="text-stone-600 uppercase tracking-widest">
                {language === 'en' ? 'The Two Half-Cities' : '两个半城'}
            </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[50vh]">
            {/* The Permanent Half (Circus) */}
            <div className="relative border-4 border-stone-800 p-8 bg-stone-100 shadow-[10px_10px_0px_0px_rgba(28,25,23,1)]">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-800 text-white px-4 py-1 uppercase font-bold tracking-widest text-sm">
                    {language === 'en' ? 'Permanent' : '永久'}
                </div>
                <div className="flex flex-col items-center justify-center h-full space-y-8">
                    <Tent className="w-24 h-24 text-red-600" />
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                            {language === 'en' ? 'The Carnival' : '嘉年华'}
                        </h3>
                        <p className="text-stone-500">
                            {language === 'en'
                                ? 'Roller coasters, carousels, the Ferris wheel, the trapeze.'
                                : '过山车、旋转木马、摩天轮、空中飞人。'}
                        </p>
                        <p className="mt-4 text-xs uppercase font-bold text-stone-400">
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
                className="relative border-4 border-dashed border-stone-400 p-8 bg-white/50 cursor-grab active:cursor-grabbing"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-400 text-white px-4 py-1 uppercase font-bold tracking-widest text-sm">
                    {language === 'en' ? 'Temporary' : '临时'}
                </div>
                <div className="flex flex-col items-center justify-center h-full space-y-8 opacity-70">
                    <Building2 className="w-24 h-24 text-stone-600" />
                    <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">
                            {language === 'en' ? 'The Establishment' : '机构'}
                        </h3>
                        <p className="text-stone-500">
                            {language === 'en'
                                ? 'Banks, factories, palaces, slaughterhouses, schools.'
                                : '银行、工厂、宫殿、屠宰场、学校。'}
                        </p>
                        <p className="mt-4 text-xs uppercase font-bold text-stone-400">
                            {language === 'en' ? 'Loaded on trailers & moved annually' : '装在拖车上，每年移动'}
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>

        <div className="mt-24 text-center max-w-2xl mx-auto text-stone-600 italic">
            {language === 'en'
                ? '"One of the half-cities is permanent, the other is temporary, and when the period of its sojourn is over, they nail it up, dismantle it, and take it away..."'
                : '“其中一个半城是永久的，另一个是临时的，当它的逗留期结束时，他们把它钉起来，拆除，然后带走……”'}
        </div>
      </div>
    </div>
  )
}
