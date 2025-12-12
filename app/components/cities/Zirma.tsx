'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { EyeOff, Building, Cat, Repeat } from 'lucide-react'

const MEMORIES = [
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

export default function Zirma() {
  // Generate a redundant array of memories
  const redundantMemories = Array.from({ length: 12 }).map((_, i) => {
    const memory = MEMORIES[i % MEMORIES.length]
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
          The city where memories are redundant, repeating themselves so they may stick.
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
        &quot;The city is redundant: it repeats itself so that something will stick in the mind.&quot;
      </div>
    </div>
  )
}
