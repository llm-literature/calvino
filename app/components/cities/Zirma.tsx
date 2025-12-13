'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { EyeOff, Building, Cat, Repeat } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

const MEMORIES_EN = [
  {
    id: 'blind',
    icon: EyeOff,
    title: 'The Blind Man',
    desc: 'Shouting in the crowd, unseen but heard.',
  },
  {
    id: 'lunatic',
    icon: Building,
    title: 'The Lunatic',
    desc: "Teetering on the skyscraper's cornice.",
  },
  {
    id: 'puma',
    icon: Cat,
    title: 'The Girl & Puma',
    desc: 'Walking side by side through the throng.',
  },
]

const MEMORIES_CN = [
  {
    id: 'blind',
    icon: EyeOff,
    title: '盲人',
    desc: '在人群中大喊大叫，看不见但听得见。',
  },
  {
    id: 'lunatic',
    icon: Building,
    title: '疯子',
    desc: '在摩天大楼的檐口上摇摇欲坠。',
  },
  {
    id: 'puma',
    icon: Cat,
    title: '女孩与美洲狮',
    desc: '并肩走在人群中。',
  },
]

export default function Zirma() {
  const { language } = useLanguage()
  const memories = language === 'en' ? MEMORIES_EN : MEMORIES_CN

  // Generate a redundant array of memories
  const redundantMemories = Array.from({ length: 12 }).map((_, i) => {
    const memory = memories[i % memories.length]
    return { ...memory, uniqueId: `${memory.id}-${i}` }
  })

  return (
    <div className="min-h-screen bg-neutral-900 p-8 font-sans text-neutral-200">
      <header className="mx-auto mb-16 max-w-4xl text-center">
        <div className="mb-4 flex justify-center">
          <Repeat className="animate-spin-slow h-12 w-12 text-rose-500" />
        </div>
        <h1 className="mb-4 text-5xl font-bold tracking-tighter text-rose-500">ZIRMA</h1>
        <p className="text-xl text-neutral-400">
          {language === 'en'
            ? 'The city where memories are redundant, repeating themselves so they may stick.'
            : '这座城市是多余的，记忆在不断重复，以便能够留存。'}
        </p>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {redundantMemories.map((item, index) => (
          <motion.div
            key={item.uniqueId}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group rounded-xl border border-neutral-700 bg-neutral-800 p-8 transition-colors hover:border-rose-500/50"
          >
            <div className="mb-6 flex items-start justify-between">
              <div className="rounded-lg bg-neutral-900 p-3 transition-colors group-hover:bg-rose-900/20">
                <item.icon className="h-8 w-8 text-rose-400" />
              </div>
              <span className="font-mono text-xs text-neutral-600">REF #{index + 1}</span>
            </div>
            <h3 className="mb-2 text-2xl font-bold text-white">{item.title}</h3>
            <p className="text-neutral-400">{item.desc}</p>

            <div className="mt-6 flex gap-2 border-t border-neutral-700 pt-6 opacity-50">
              {/* Visual noise to suggest repetition */}
              <div className="h-1 w-full rounded-full bg-neutral-600"></div>
              <div className="h-1 w-2/3 rounded-full bg-neutral-600"></div>
              <div className="h-1 w-1/3 rounded-full bg-neutral-600"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-2xl text-center text-neutral-500 italic">
        {language === 'en'
          ? '"The city is redundant: it repeats itself so that something will stick in the mind."'
          : '“这座城市是多余的：它不断重复自己，以便有些东西能留在脑海中。”'}
      </div>
    </div>
  )
}
