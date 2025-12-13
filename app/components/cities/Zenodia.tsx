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
    offset: ["start start", "end end"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300])

  return (
    <div ref={containerRef} className="relative min-h-[150vh] bg-[#e8dcc5] text-[#4a4036] overflow-hidden font-serif selection:bg-[#8b7355] selection:text-white">
       <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-black/5 p-2 transition-colors hover:bg-black/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Background Elements (Pilings) */}
      <div className="fixed inset-0 flex justify-around opacity-20 pointer-events-none">
         <div className="w-2 h-full bg-[#8b7355] mx-4" />
         <div className="w-4 h-full bg-[#8b7355] mx-12" />
         <div className="w-3 h-full bg-[#8b7355] mx-8" />
         <div className="w-2 h-full bg-[#8b7355] mx-2" />
         <div className="w-5 h-full bg-[#8b7355] mx-16" />
      </div>

      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
          <motion.h1 
            style={{ y: y1, opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]) }}
            className="text-[15vw] font-bold text-[#8b7355]/10 tracking-tighter"
          >
            ZENODIA
          </motion.h1>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
            <div className="space-y-32 pt-24">
                <motion.div style={{ y: y2 }} className="bg-[#f4e4bc] p-8 rounded shadow-xl border-l-4 border-[#8b7355] relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-[#8b7355] opacity-50" />
                    <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest text-[#8b7355]">
                        {language === 'en' ? 'High Pilings' : '高桩'}
                    </h2>
                    <p className="text-lg leading-relaxed italic">
                        {language === 'en'
                            ? '"Zenodia... though set in dry terrain it stands on high pilings..."'
                            : '“芝诺迪亚……虽然位于干燥的地形上，但它矗立在高高的桩子上……”'}
                    </p>
                </motion.div>

                <motion.div style={{ y: y3 }} className="bg-[#f4e4bc] p-8 rounded shadow-xl border-l-4 border-[#8b7355] ml-12 relative">
                    <div className="absolute -left-16 top-0 bottom-0 w-1 bg-[#8b7355] opacity-50" />
                    <h2 className="text-2xl font-bold mb-4 uppercase tracking-widest text-[#8b7355]">
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
      <div className="fixed right-8 md:right-12 top-0 bottom-0 w-12 opacity-30 flex flex-col items-center pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-1 bg-[#4a4036]" />
          <div className="absolute inset-y-0 right-0 w-1 bg-[#4a4036]" />
          {Array(40).fill(0).map((_, i) => (
              <div key={i} className="w-full h-1 bg-[#4a4036] my-6" />
          ))}
      </div>
    </div>
  )
}
