'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Phyllis({ city }: { city: City }) {
  const { language } = useLanguage()
  const [faded, setFaded] = useState(false)

  return (
    <div className="relative min-h-screen overflow-hidden bg-rose-50 font-sans text-rose-900 selection:bg-rose-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 shadow-sm backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div
          className="group relative cursor-pointer"
          onMouseEnter={() => setFaded(true)}
          onMouseLeave={() => setFaded(false)}
        >
          {/* The Tourist View (Colorful, Detailed) */}
          <motion.div
            className="relative z-10 max-w-2xl rounded-3xl border-4 border-rose-200 bg-white p-12 text-center shadow-2xl"
            animate={{ opacity: faded ? 0 : 1, filter: faded ? 'blur(10px)' : 'blur(0px)' }}
            transition={{ duration: 1 }}
          >
            <h1 className="mb-8 font-serif text-6xl text-rose-600">PHYLLIS</h1>
            <div className="mb-8 grid grid-cols-2 gap-8">
              <div className="rounded-xl bg-rose-100 p-4">
                <div className="mb-2 h-24 w-full rounded-lg bg-rose-300" />
                <p className="font-bold">{language === 'en' ? '9 Bridges' : '9座桥'}</p>
              </div>
              <div className="rounded-xl bg-rose-100 p-4">
                <div className="mb-2 h-24 w-full rounded-lg bg-rose-300" />
                <p className="font-bold">{language === 'en' ? 'Onion Domes' : '洋葱圆顶'}</p>
              </div>
              <div className="rounded-xl bg-rose-100 p-4">
                <div className="mb-2 h-24 w-full rounded-lg bg-rose-300" />
                <p className="font-bold">{language === 'en' ? 'Blue Tiles' : '蓝色瓷砖'}</p>
              </div>
              <div className="rounded-xl bg-rose-100 p-4">
                <div className="mb-2 h-24 w-full rounded-lg bg-rose-300" />
                <p className="font-bold">{language === 'en' ? 'Queen Statues' : '女王雕像'}</p>
              </div>
            </div>
            <p className="text-rose-400 italic">
              {language === 'en'
                ? '"Happy is the man who has Phyllis before his eyes each day!"'
                : '“每天眼前都有菲利斯的人是幸福的！”'}
            </p>
          </motion.div>

          {/* The Resident View (Faded, Abstract) */}
          <motion.div
            className="absolute inset-0 z-0 flex items-center justify-center"
            animate={{ opacity: faded ? 1 : 0 }}
            transition={{ duration: 1 }}
          >
            <div className="max-w-xl text-center">
              <h1 className="mb-8 font-serif text-6xl text-gray-300">PHYLLIS</h1>
              <p className="text-2xl leading-relaxed font-light text-gray-400">
                {language === 'en'
                  ? 'A space in which points are connected by lines...'
                  : '一个由线条连接点的空间……'}
                <br />
                <br />
                <span className="text-sm">
                  {language === 'en'
                    ? 'The city fades. The eyes do not see things but figures of other things that mean other things.'
                    : '城市褪色了。眼睛看到的不是事物，而是意味着其他事物的其他事物的形象。'}
                </span>
              </p>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 animate-pulse text-center text-sm text-rose-400">
          {language === 'en' ? 'Hover to live in the city' : '悬停以居住在城市中'}
        </div>
      </div>
    </div>
  )
}
