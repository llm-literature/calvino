'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Scale, Gavel } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Berenice({ city }: { city: City }) {
  const { language } = useLanguage()
  const [cycle, setCycle] = useState(0)

  return (
    <div className="relative min-h-screen overflow-hidden bg-rose-50 font-serif text-rose-900 selection:bg-rose-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="mb-4 text-6xl font-bold text-rose-800">
          {language === 'en' ? 'BERENICE' : city.cnName}
        </h1>
        <p className="mb-12 text-rose-600">
          {language === 'en' ? 'Cycle' : '周期'}: {cycle}
        </p>

        <div className="relative h-64 w-64">
          {/* The Just City */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-rose-200 bg-white shadow-xl"
            animate={{
              scale: cycle % 2 === 0 ? 1 : 0.5,
              opacity: cycle % 2 === 0 ? 1 : 0,
              rotate: cycle * 180,
            }}
            transition={{ duration: 1 }}
          >
            <div className="text-center">
              <Scale className="mx-auto mb-2 h-16 w-16 text-rose-400" />
              <span className="font-bold text-rose-500">
                {language === 'en' ? 'JUSTICE' : '正义'}
              </span>
            </div>
          </motion.div>

          {/* The Unjust City */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center rounded-full border-4 border-rose-700 bg-rose-900 shadow-xl"
            animate={{
              scale: cycle % 2 !== 0 ? 1 : 0.5,
              opacity: cycle % 2 !== 0 ? 1 : 0,
              rotate: cycle * 180,
            }}
            transition={{ duration: 1 }}
          >
            <div className="text-center">
              <Gavel className="mx-auto mb-2 h-16 w-16 text-rose-200" />
              <span className="font-bold text-rose-100">
                {language === 'en' ? 'INJUSTICE' : '不义'}
              </span>
            </div>
          </motion.div>
        </div>

        <button
          onClick={() => setCycle((c) => c + 1)}
          className="mt-12 rounded-full bg-rose-600 px-8 py-4 text-white shadow-lg transition-transform hover:bg-rose-500 active:scale-95"
        >
          {language === 'en' ? 'Turn the Wheel of History' : '转动历史之轮'}
        </button>

        <p className="mt-12 max-w-xl text-center text-rose-700 italic">
          {language === 'en'
            ? '"In the seed of the city of the just, a malignant seed is hidden... and from this seed of injustice, a new just city will be born."'
            : '"在正义之城的种子中，隐藏着一颗恶性的种子……而从这颗不义的种子中，一座新的正义之城将会诞生。"'}
        </p>
      </div>
    </div>
  )
}
