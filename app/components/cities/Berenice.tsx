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
    <div className="relative min-h-screen bg-rose-50 text-rose-900 font-serif overflow-hidden selection:bg-rose-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold mb-4 text-rose-800">{language === 'en' ? 'BERENICE' : city.cnName}</h1>
        <p className="mb-12 text-rose-600">{language === 'en' ? 'Cycle' : '周期'}: {cycle}</p>

        <div className="relative w-64 h-64">
            {/* The Just City */}
            <motion.div 
                className="absolute inset-0 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-rose-200"
                animate={{ 
                    scale: cycle % 2 === 0 ? 1 : 0.5,
                    opacity: cycle % 2 === 0 ? 1 : 0,
                    rotate: cycle * 180
                }}
                transition={{ duration: 1 }}
            >
                <div className="text-center">
                    <Scale className="w-16 h-16 text-rose-400 mx-auto mb-2" />
                    <span className="font-bold text-rose-500">{language === 'en' ? 'JUSTICE' : '正义'}</span>
                </div>
            </motion.div>

            {/* The Unjust City */}
            <motion.div 
                className="absolute inset-0 bg-rose-900 rounded-full shadow-xl flex items-center justify-center border-4 border-rose-700"
                animate={{ 
                    scale: cycle % 2 !== 0 ? 1 : 0.5,
                    opacity: cycle % 2 !== 0 ? 1 : 0,
                    rotate: cycle * 180
                }}
                transition={{ duration: 1 }}
            >
                <div className="text-center">
                    <Gavel className="w-16 h-16 text-rose-200 mx-auto mb-2" />
                    <span className="font-bold text-rose-100">{language === 'en' ? 'INJUSTICE' : '不义'}</span>
                </div>
            </motion.div>
        </div>

        <button 
            onClick={() => setCycle(c => c + 1)}
            className="mt-12 px-8 py-4 bg-rose-600 text-white rounded-full shadow-lg hover:bg-rose-500 transition-transform active:scale-95"
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
