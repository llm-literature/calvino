'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function DefaultCityDetail({ city }: { city: City }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-8 dark:bg-stone-950">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 rounded-full p-2 transition-colors hover:bg-stone-200"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-display mb-8 text-6xl text-stone-900 capitalize md:text-8xl dark:text-stone-100">
            {city.name}
          </h1>
          <div className="mb-12 h-1 w-20 bg-stone-900 dark:bg-stone-100" />
          <p className="font-serif text-xl leading-relaxed whitespace-pre-line text-stone-700 md:text-2xl dark:text-stone-300">
            {city.description}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
