'use client'

import { City } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Gem, Utensils, User } from 'lucide-react'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'

type DesireItem = {
  id: string
  icon: React.ReactNode
  desire: string
  labor: string
  color: string
}

const desires: DesireItem[] = [
  {
    id: 'agate',
    icon: <Gem className="h-8 w-8" />,
    desire: 'Agate, Onyx, Chrysoprase',
    labor: '8 hours cutting stones',
    color: 'text-emerald-400',
  },
  {
    id: 'pheasant',
    icon: <Utensils className="h-8 w-8" />,
    desire: 'Golden Pheasant with Marjoram',
    labor: 'Raising poultry in cages',
    color: 'text-amber-400',
  },
  {
    id: 'bath',
    icon: <User className="h-8 w-8" />,
    desire: 'Women bathing in the garden',
    labor: 'Cleaning the garden pool',
    color: 'text-rose-400',
  },
]

export default function Anastasia({ city }: { city: City }) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1])

  return (
    <div
      ref={containerRef}
      className="relative min-h-[150vh] overflow-hidden bg-slate-950 font-serif text-slate-200"
    >
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full p-2 transition-colors hover:bg-slate-800"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* Kites Background */}
      <div className="pointer-events-none fixed inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{
              x: Math.random() * 100 + '%',
              y: '120%',
              rotate: 45,
            }}
            animate={{
              y: '-20%',
              x: Math.random() * 20 - 10 + '%',
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              delay: i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="h-12 w-12 rotate-45 border border-white/10 bg-gradient-to-br from-pink-500/20 to-purple-500/20 backdrop-blur-sm" />
            <div className="mx-auto -mt-2 h-32 w-1 bg-white/5" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto flex flex-col items-center px-4 pt-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-24 text-center"
        >
          <h1 className="mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
            ANASTASIA
          </h1>
          <p className="text-xl text-slate-400 italic">The City of Deceptive Desire</p>
        </motion.div>

        <div className="mb-32 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {desires.map((item) => (
            <motion.div
              key={item.id}
              className="group perspective-1000 relative h-64"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div
                className={cn(
                  'transform-style-3d absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900/50 p-8 text-center backdrop-blur-md transition-all duration-500 group-hover:rotate-y-180'
                )}
              >
                {/* Front: Desire */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 backface-hidden">
                  <div
                    className={cn('mb-4 transition-transform group-hover:scale-110', item.color)}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-medium text-slate-100">{item.desire}</h3>
                  <p className="mt-4 text-sm tracking-widest text-slate-500 uppercase">Desire</p>
                </div>

                {/* Back: Labor */}
                <div className="absolute inset-0 flex rotate-y-180 flex-col items-center justify-center rounded-xl border border-slate-600 bg-slate-800 p-6 backface-hidden">
                  <h3 className="text-xl font-medium text-slate-300">{item.labor}</h3>
                  <p className="mt-4 text-sm tracking-widest text-red-400 uppercase">Reality</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          style={{ opacity }}
          className="max-w-2xl pb-32 text-center text-lg leading-loose text-slate-300"
        >
          <p className="mb-8">
            "The city appears to you as a whole where no desire is lost and of which you are a part,
            and since it enjoys everything you do not enjoy, you can do nothing but inhabit this
            desire and be content."
          </p>
          <p className="text-2xl font-light text-purple-200">
            "You believe you are enjoying Anastasia wholly when you are only its slave."
          </p>
        </motion.div>
      </div>
    </div>
  )
}
