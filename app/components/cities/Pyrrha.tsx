'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Pyrrha({ city }: { city: City }) {
  const { language } = useLanguage()
  const [isImagined, setIsImagined] = useState(true)

  return (
    <div className="relative min-h-screen overflow-hidden bg-amber-50 font-sans text-amber-900 selection:bg-amber-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 shadow-sm backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div
        className="container mx-auto flex min-h-screen cursor-pointer flex-col items-center justify-center px-4 py-24"
        onClick={() => setIsImagined(!isImagined)}
      >
        <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg shadow-2xl">
          {/* Imagined Pyrrha */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900 p-12 text-white"
            animate={{ y: isImagined ? 0 : '-100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <h1 className="mb-4 font-serif text-8xl tracking-widest">PYRRHA</h1>
            <p className="mb-8 text-xl text-indigo-300">
              {language === 'en' ? 'The Imagined City' : '想象中的城市'}
            </p>
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-indigo-400">
              <div className="h-4 w-4 rounded-full bg-white shadow-[0_0_20px_white]" />
            </div>
            <p className="mt-8 max-w-lg text-center text-indigo-200">
              {language === 'en'
                ? '"A fortified city on the slopes of a bay, with high windows and towers, enclosed like a goblet, with a central square deep as a well."'
                : '“一座位于海湾斜坡上的设防城市，有高高的窗户和塔楼，像高脚杯一样封闭，中央广场深如井。”'}
            </p>
          </motion.div>

          {/* Real Pyrrha */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-amber-100 p-12 text-amber-900"
            animate={{ y: isImagined ? '100%' : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <h1 className="mb-4 font-sans text-8xl font-bold tracking-tighter text-amber-800/50">
              PYRRHA
            </h1>
            <p className="mb-8 text-xl text-amber-600">
              {language === 'en' ? 'The Real City' : '真实的城市'}
            </p>
            <div className="flex gap-4 opacity-50">
              <div className="h-32 w-12 bg-amber-900/20" />
              <div className="h-32 w-12 bg-amber-900/20" />
              <div className="h-32 w-12 bg-amber-900/20" />
              <div className="h-32 w-12 bg-amber-900/20" />
            </div>
            <p className="mt-8 max-w-lg text-center text-amber-700">
              {language === 'en'
                ? '"The sea is distant... streets are long and straight... houses are clumped... the wind moves the vanes of the water pumps."'
                : '“大海很远……街道又长又直……房子成群结队……风吹动水泵的叶片。”'}
            </p>
          </motion.div>
        </div>

        <div className="mt-8 animate-bounce text-amber-600">
          {language === 'en' ? 'Click to visit' : '点击访问'}
        </div>
      </div>
    </div>
  )
}
