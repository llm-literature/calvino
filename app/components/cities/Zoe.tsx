'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, HelpCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

const FUNCTIONS_EN = [
  'Palace',
  'Prison',
  'School',
  'Brothel',
  'Bank',
  'Hospital',
  'Barracks',
  'Temple',
  'Market',
  'Library',
  'Museum',
  'Factory',
]

const FUNCTIONS_CN = [
  '宫殿',
  '监狱',
  '学校',
  '妓院',
  '银行',
  '医院',
  '军营',
  '寺庙',
  '市场',
  '图书馆',
  '博物馆',
  '工厂',
]

const getRandomFunction = (current: string, language: 'en' | 'cn') => {
  const functions = language === 'en' ? FUNCTIONS_EN : FUNCTIONS_CN
  let newFunc = functions[Math.floor(Math.random() * functions.length)]
  while (newFunc === current) {
    newFunc = functions[Math.floor(Math.random() * functions.length)]
  }
  return newFunc
}

export default function Zoe({ city }: { city: City }) {
  const { language } = useLanguage()

  const [grid, setGrid] = useState<string[]>(Array(24).fill('Unknown'))

  // Reset grid when language changes
  useEffect(() => {
    setGrid(Array(24).fill(language === 'en' ? 'Unknown' : '未知'))
  }, [language])

  const randomize = (index: number) => {
    const newGrid = [...grid]
    newGrid[index] = getRandomFunction(newGrid[index], language)
    setGrid(newGrid)
  }

  return (
    <div className="relative min-h-screen bg-neutral-950 font-mono text-neutral-200 selection:bg-neutral-700">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full bg-white/5 p-2 transition-colors hover:bg-white/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24">
        <header className="mb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 text-6xl font-bold tracking-tighter text-neutral-100 md:text-8xl"
          >
            {city.name.toUpperCase()}
          </motion.h1>
          <p className="mx-auto max-w-2xl text-lg tracking-widest text-neutral-500 uppercase">
            {language === 'en' ? 'The City of Indistinguishable Places' : '无法区分场所的城市'}
          </p>
        </header>

        <div className="mb-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {grid.map((func, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, backgroundColor: '#262626' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => randomize(i)}
              className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded border border-neutral-800 bg-neutral-900/50 p-4 text-center transition-colors hover:border-neutral-600"
            >
              <HelpCircle
                className={cn(
                  'mb-4 h-8 w-8 transition-all duration-300',
                  func !== (language === 'en' ? 'Unknown' : '未知')
                    ? 'scale-75 opacity-20'
                    : 'scale-100 opacity-50'
                )}
              />
              <motion.span
                key={func}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={cn(
                  'text-xs font-bold tracking-widest uppercase',
                  func === (language === 'en' ? 'Unknown' : '未知')
                    ? 'text-neutral-600'
                    : 'text-white'
                )}
              >
                {func}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="prose prose-invert prose-lg mx-auto max-w-3xl text-center text-neutral-400"
        >
          {/* Description removed as it is now in the sidebar */}
        </motion.div>
      </div>
    </div>
  )
}
