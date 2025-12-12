'use client'

import { City } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Ruler } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type MemoryPoint = {
  id: string
  label: string
  measurement: string
  memory: string
  position: { top: string; left: string }
}

const memories: MemoryPoint[] = [
  {
    id: 'lamppost',
    label: 'Lamppost',
    measurement: 'Height: 4.2 meters',
    memory: "The distance from the ground of the hanged usurper's swaying feet.",
    position: { top: '30%', left: '20%' },
  },
  {
    id: 'cord',
    label: 'Cord',
    measurement: 'Length: 12 meters',
    memory: "The cord festooned for the Queen's wedding procession.",
    position: { top: '35%', left: '45%' },
  },
  {
    id: 'railing',
    label: 'Railing',
    measurement: 'Height: 1.1 meters',
    memory: 'How the adulterer climbed over it at dawn.',
    position: { top: '50%', left: '60%' },
  },
  {
    id: 'guttering',
    label: 'Guttering',
    measurement: 'Tilt: 15 degrees',
    memory: 'A cat slipping into the window along it.',
    position: { top: '20%', left: '70%' },
  },
  {
    id: 'gunboat',
    label: 'Gunboat',
    measurement: 'Range: 1200 meters',
    memory: 'The cannon shot that destroyed the guttering.',
    position: { top: '10%', left: '80%' },
  },
  {
    id: 'fishnet',
    label: 'Fishnet',
    measurement: 'Tear size: 8 cm',
    memory: "Three old men mending nets, retelling the usurper's story.",
    position: { top: '70%', left: '30%' },
  },
]

export default function Zaira({ city }: { city: City }) {
  const [activeMemory, setActiveMemory] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen overflow-hidden bg-stone-900 font-serif text-stone-200">
      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full p-2 transition-colors hover:bg-stone-800"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative z-10 container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-6xl font-bold tracking-widest text-stone-100 md:text-8xl">
            ZAIRA
          </h1>
          <p className="text-xl text-stone-400 italic">The City of High Bastions</p>
        </motion.div>

        <div className="relative aspect-video w-full max-w-4xl rounded-xl border border-stone-700 bg-stone-800/30 p-8 shadow-2xl backdrop-blur-sm">
          {/* Grid Lines */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-6 grid-rows-4 gap-4 opacity-20">
            {[...Array(24)].map((_, i) => (
              <div key={i} className="border border-stone-500/30" />
            ))}
          </div>

          {/* Memory Points */}
          {memories.map((m) => (
            <motion.button
              key={m.id}
              className={cn(
                'absolute z-20 h-4 w-4 rounded-full border-2 transition-all duration-300',
                activeMemory === m.id
                  ? 'scale-150 border-amber-300 bg-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.5)]'
                  : 'border-stone-400 bg-stone-600 hover:scale-125 hover:bg-stone-400'
              )}
              style={{ top: m.position.top, left: m.position.left }}
              onClick={() => setActiveMemory(m.id)}
              whileHover={{ scale: 1.2 }}
            >
              <span className="sr-only">{m.label}</span>
            </motion.button>
          ))}

          {/* Connecting Lines (Abstract) */}
          <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30">
            <path
              d="M 20% 30% Q 45% 35% 60% 50%"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-stone-400"
            />
            <path
              d="M 70% 20% L 80% 10%"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-stone-400"
            />
            <path
              d="M 30% 70% C 40% 60% 50% 60% 60% 50%"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
              className="text-stone-400"
            />
          </svg>

          {/* Info Panel */}
          <AnimatePresence mode="wait">
            {activeMemory ? (
              <motion.div
                key={activeMemory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute right-8 bottom-8 z-30 max-w-sm rounded-lg border border-stone-600 bg-stone-900/90 p-6 shadow-xl backdrop-blur-md"
              >
                <div className="mb-2 flex items-center gap-2 font-mono text-sm text-amber-500">
                  <Ruler className="h-4 w-4" />
                  <span>{memories.find((m) => m.id === activeMemory)?.measurement}</span>
                </div>
                <p className="text-lg leading-relaxed text-stone-200">
                  {memories.find((m) => m.id === activeMemory)?.memory}
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute right-8 bottom-8 max-w-sm text-right text-stone-500 italic"
              >
                Click on the points to measure the city&apos;s past.
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-12 max-w-2xl text-center leading-loose text-stone-400">
          <p>
            &quot;The city does not tell its past, but contains it like the lines of a hand, written
            in the corners of the streets, the gratings of the windows, the banisters of the
            steps...&quot;
          </p>
        </div>
      </div>
    </div>
  )
}
