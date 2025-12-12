'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Footprints, Wine, Scale, Shield, Crown, BookOpen, Coins } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type Sign = {
  id: string
  icon: React.ReactNode
  signifier: string
  signified: string
  position: { x: number; y: number }
}

const signs: Sign[] = [
  {
    id: 'tiger',
    icon: <Footprints />,
    signifier: 'Footprint in sand',
    signified: 'Tiger passed here',
    position: { x: 20, y: 20 },
  },
  {
    id: 'tavern',
    icon: <Wine />,
    signifier: 'Jar',
    signified: 'Tavern',
    position: { x: 50, y: 30 },
  },
  {
    id: 'grocer',
    icon: <Scale />,
    signifier: 'Scales',
    signified: 'Greengrocer',
    position: { x: 80, y: 25 },
  },
  {
    id: 'guard',
    icon: <Shield />,
    signifier: 'Halberd',
    signified: 'Barracks',
    position: { x: 30, y: 60 },
  },
  {
    id: 'palace',
    icon: <Crown />,
    signifier: 'Lion Statue',
    signified: 'Royal Palace',
    position: { x: 60, y: 50 },
  },
  {
    id: 'wisdom',
    icon: <BookOpen />,
    signifier: 'Scroll',
    signified: 'Wisdom',
    position: { x: 25, y: 80 },
  },
  {
    id: 'power',
    icon: <Coins />,
    signifier: 'Gilded Palanquin',
    signified: 'Power',
    position: { x: 70, y: 75 },
  },
]

export default function Tamara({ city }: { city: City }) {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null)

  return (
    <div className="relative min-h-screen overflow-hidden bg-neutral-100 font-sans text-neutral-900 selection:bg-neutral-900 selection:text-neutral-100">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full p-2 transition-colors hover:bg-neutral-200"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-6xl font-black tracking-tighter uppercase md:text-9xl">
            Tamara
          </h1>
          <p className="font-mono text-sm tracking-widest text-neutral-500 uppercase">
            The City of Signs
          </p>
        </motion.div>

        <div className="relative aspect-[16/9] w-full max-w-4xl overflow-hidden border-2 border-neutral-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          {signs.map((sign) => (
            <motion.div
              key={sign.id}
              className="absolute cursor-help"
              style={{ left: `${sign.position.x}%`, top: `${sign.position.y}%` }}
              onMouseEnter={() => setHoveredSign(sign.id)}
              onMouseLeave={() => setHoveredSign(null)}
              whileHover={{ scale: 1.1 }}
            >
              <div
                className={cn(
                  'relative flex h-16 w-16 items-center justify-center border-2 border-neutral-900 bg-white transition-all duration-300',
                  hoveredSign === sign.id
                    ? '-translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                    : ''
                )}
              >
                {sign.icon}

                {/* Tooltip */}
                <div
                  className={cn(
                    'pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 w-48 -translate-x-1/2 bg-neutral-900 p-3 font-mono text-xs text-white transition-all duration-200',
                    hoveredSign === sign.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-0'
                  )}
                >
                  <div className="mb-1 border-b border-neutral-700 pb-1 text-neutral-400">
                    SIGNIFIER: {sign.signifier}
                  </div>
                  <div className="font-bold text-emerald-400">SIGNIFIED: {sign.signified}</div>
                  <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 translate-y-1/2 rotate-45 bg-neutral-900" />
                </div>
              </div>
            </motion.div>
          ))}

          {/* Floating Text */}
          <div className="pointer-events-none absolute right-4 bottom-4 max-w-xs text-right font-mono text-xs text-neutral-400">
            "The eye does not see things but images of things that mean other things."
          </div>
        </div>
      </div>
    </div>
  )
}
