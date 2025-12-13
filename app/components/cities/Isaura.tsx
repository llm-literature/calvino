'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, Droplet, Waves, Anchor } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Isaura() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#ecfeff', '#0891b2', '#020617'] // Cyan-50 -> Cyan-600 -> Slate-950
  )

  const textColor = useTransform(scrollYProgress, [0, 0.3], ['#0e7490', '#ecfeff'])

  const opacity = useTransform(scrollYProgress, [0.8, 1], [0, 1])

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor }}
      className="relative min-h-[300vh] transition-colors duration-300"
    >
      {/* Fixed Header */}
      <div className="pointer-events-none fixed top-0 right-0 left-0 z-50 flex items-center justify-between p-8">
        <motion.h1
          style={{ color: textColor }}
          className="text-4xl font-bold tracking-widest uppercase"
        >
          Isaura
        </motion.h1>
        <motion.div style={{ color: textColor }} className="flex items-center gap-2">
          <span className="font-mono text-sm">{language === 'en' ? 'DEPTH METER' : '深度计'}</span>
          <div className="relative h-24 w-2 overflow-hidden rounded-full bg-black/10">
            <motion.div
              className="absolute top-0 right-0 left-0 bg-current"
              style={{ height: useTransform(scrollYProgress, (value) => `${value * 100}%`) }}
            />
          </div>
        </motion.div>
      </div>

      {/* Surface Level */}
      <div className="flex h-screen flex-col items-center justify-center p-8 text-cyan-900">
        <Waves className="mb-8 h-24 w-24 animate-pulse" />
        <h2 className="mb-6 text-center font-serif text-6xl">
          {language === 'en' ? 'The City of a Thousand Wells' : '千井之城'}
        </h2>
        <p className="mb-12 max-w-xl text-center text-xl">
          {language === 'en'
            ? 'Isaura, city of the thousand wells, is said to rise over a deep, subterranean lake.'
            : '据说，千井之城伊萨乌拉耸立在一个深邃的地下湖泊之上。'}
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 opacity-60"
        >
          <span className="text-sm tracking-widest uppercase">
            {language === 'en' ? 'Descend' : '下降'}
          </span>
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </div>

      {/* Mid Depth */}
      <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden p-8">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-10">
          <div className="h-[800px] w-[800px] rounded-full border-[40px] border-white"></div>
        </div>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5">
          <div className="h-[600px] w-[600px] rounded-full border-[40px] border-white"></div>
        </div>

        <div className="relative z-10 max-w-2xl text-center text-white">
          <Droplet className="mx-auto mb-6 h-16 w-16 text-cyan-200" />
          <p className="font-serif text-3xl leading-relaxed">
            {language === 'en'
              ? '"The inhabitants dig long vertical holes in the ground and succeed in drawing up water, as far as the city extends..."'
              : '“居民们在地上挖掘长长的垂直洞穴，并成功地汲取水，只要城市延伸到的地方……”'}
          </p>
        </div>
      </div>

      {/* Deep Depth */}
      <div className="relative flex h-screen flex-col items-center justify-center p-8 text-slate-300">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        <motion.div style={{ opacity }} className="max-w-3xl text-center">
          <Anchor className="mx-auto mb-8 h-20 w-20 text-cyan-500" />
          <h3 className="mb-6 text-4xl font-bold text-cyan-100">
            {language === 'en' ? 'The Gods of the Depths' : '深渊之神'}
          </h3>
          <p className="text-xl leading-loose">
            {language === 'en'
              ? 'Some say the gods of the city live in the depths, in the black lake that feeds the underground streams.'
              : '有人说，城市的众神住在深处，住在滋养地下溪流的黑色湖泊中。'}
            <br />
            <span className="text-cyan-500 italic">
              {language === 'en'
                ? "Here, the city's reflection is its only reality."
                : '在这里，城市的倒影是它唯一的现实。'}
            </span>
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
