'use client'

import { City } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Zenodia({ city }: { city: City }) {
  const { language } = useLanguage()

  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] overflow-hidden bg-[#e8dcc5] font-serif text-[#4a4036] selection:bg-[#8b7355] selection:text-white"
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-black/5 p-2 transition-colors hover:bg-black/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Background Elements (Pilings) */}
      <div className="pointer-events-none fixed inset-0 flex justify-around opacity-20">
        <div className="mx-4 h-full w-2 bg-[#8b7355]" />
        <div className="mx-12 h-full w-4 bg-[#8b7355]" />
        <div className="mx-8 h-full w-3 bg-[#8b7355]" />
        <div className="mx-2 h-full w-2 bg-[#8b7355]" />
        <div className="mx-16 h-full w-5 bg-[#8b7355]" />
      </div>

      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <motion.h1
          style={{ y: y1, opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
          className="text-[15vw] font-bold tracking-tighter text-[#8b7355]/10"
        >
          ZENODIA
        </motion.h1>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 gap-24 md:grid-cols-2">
          <div className="space-y-32 pt-24">
            <motion.div
              style={{ y: y2 }}
              className="relative rounded border-l-4 border-[#8b7355] bg-[#f4e4bc] p-8 shadow-xl"
            >
              <div className="absolute top-0 bottom-0 -left-4 w-1 bg-[#8b7355] opacity-50" />
              <h2 className="mb-4 text-2xl font-bold tracking-widest text-[#8b7355] uppercase">
                {language === 'en' ? 'High Pilings' : '高桩'}
              </h2>
              <p className="text-lg leading-relaxed italic">
                {language === 'en'
                  ? '"Zenodia... though set in dry terrain it stands on high pilings..."'
                  : '“芝诺迪亚……虽然位于干燥的地形上，但它矗立在高高的桩子上……”'}
              </p>
            </motion.div>

            <motion.div
              style={{ y: y3 }}
              className="relative ml-12 rounded border-l-4 border-[#8b7355] bg-[#f4e4bc] p-8 shadow-xl"
            >
              <div className="absolute top-0 bottom-0 -left-16 w-1 bg-[#8b7355] opacity-50" />
              <h2 className="mb-4 text-2xl font-bold tracking-widest text-[#8b7355] uppercase">
                {language === 'en' ? 'Bamboo & Zinc' : '竹子和锌'}
              </h2>
              <p className="text-lg leading-relaxed italic">
                {language === 'en'
                  ? '"The houses are of bamboo and zinc, with many platforms and balconies placed on stilts at various heights..."'
                  : '“房子是用竹子和锌做的，有许多平台和阳台，放置在不同高度的支柱上……”'}
              </p>
            </motion.div>
          </div>

          <div className="space-y-12 pt-48 md:pt-96">
            {/* Description removed as it is now in the sidebar */}
          </div>
        </div>
      </div>

      {/* Ladders */}
      <div className="pointer-events-none fixed top-0 right-8 bottom-0 flex w-12 flex-col items-center opacity-30 md:right-12">
        <div className="absolute inset-y-0 left-0 w-1 bg-[#4a4036]" />
        <div className="absolute inset-y-0 right-0 w-1 bg-[#4a4036]" />
        {Array(40)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="my-6 h-1 w-full bg-[#4a4036]" />
          ))}
      </div>
    </div>
  )
}
