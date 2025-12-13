'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Hammer, Construction } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Thekla({ city }: { city: City }) {
  const { language } = useLanguage()
  const [scaffolding, setScaffolding] = useState<number[]>([1, 2, 3])

  const addScaffolding = () => {
    setScaffolding([...scaffolding, scaffolding.length + 1])
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-100 font-sans text-sky-900 selection:bg-yellow-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-end px-4 py-24 pb-0">
        <div className="absolute top-24 z-10 text-center">
          <h1 className="mb-4 text-6xl font-bold text-sky-800">THEKLA</h1>
          <p className="mx-auto max-w-md text-sky-600">
            {language === 'en'
              ? '"Why is Thekla\'s construction taking so long?"'
              : '“为什么特克拉的建设要花这么长时间？”'}
            <br />
            {language === 'en'
              ? '"So that its destruction cannot begin."'
              : '“为了不让它的毁灭开始。”'}
          </p>
          <button
            onClick={addScaffolding}
            className="mx-auto mt-8 flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 font-bold text-yellow-900 shadow-lg transition-transform hover:bg-yellow-300 active:scale-95"
          >
            <Hammer className="h-5 w-5" />{' '}
            {language === 'en' ? 'Continue Construction' : '继续建设'}
          </button>
        </div>

        {/* The Construction Site */}
        <div className="relative flex h-150 w-full max-w-4xl items-end justify-center">
          {/* The "City" (Hidden behind scaffolding) */}
          <div className="absolute bottom-0 h-96 w-64 rounded-t-lg bg-sky-200 opacity-50" />

          {/* Scaffolding Layers */}
          {scaffolding.map((id, index) => (
            <motion.div
              key={id}
              className="absolute bottom-0 border-t-4 border-r-4 border-l-4 border-yellow-600/50 bg-transparent"
              style={{
                width: `${300 + index * 40}px`,
                height: `${400 + index * 30}px`,
                zIndex: index,
              }}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100 }}
            >
              {/* Crossbeams */}
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
              <div className="absolute top-0 left-0 h-2 w-full bg-yellow-600/50" />
              <div className="absolute bottom-1/2 left-0 h-2 w-full bg-yellow-600/50" />

              {/* Crane */}
              {index === scaffolding.length - 1 && (
                <motion.div
                  className="absolute -top-16 -right-8 text-yellow-700"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <Construction className="h-16 w-16" />
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Stars/Blueprints in the sky */}
          <div className="pointer-events-none absolute top-0 right-0 left-0 h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white to-transparent opacity-10" />
        </div>
      </div>
    </div>
  )
}
