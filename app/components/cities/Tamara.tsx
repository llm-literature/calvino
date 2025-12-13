'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Footprints, Wine, Scale, Shield, Crown, BookOpen, Coins } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

type Sign = {
  id: string
  icon: React.ReactNode
  signifier: string
  signified: string
  position: { x: number; y: number }
}

const SIGNS_EN: Sign[] = [
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

const SIGNS_CN: Sign[] = [
  {
    id: 'tiger',
    icon: <Footprints />,
    signifier: '沙地上的脚印',
    signified: '老虎经过这里',
    position: { x: 20, y: 20 },
  },
  {
    id: 'tavern',
    icon: <Wine />,
    signifier: '罐子',
    signified: '酒馆',
    position: { x: 50, y: 30 },
  },
  {
    id: 'grocer',
    icon: <Scale />,
    signifier: '天平',
    signified: '蔬菜水果商',
    position: { x: 80, y: 25 },
  },
  {
    id: 'guard',
    icon: <Shield />,
    signifier: '戟',
    signified: '兵营',
    position: { x: 30, y: 60 },
  },
  {
    id: 'palace',
    icon: <Crown />,
    signifier: '狮子雕像',
    signified: '皇宫',
    position: { x: 60, y: 50 },
  },
  {
    id: 'wisdom',
    icon: <BookOpen />,
    signifier: '卷轴',
    signified: '智慧',
    position: { x: 25, y: 80 },
  },
  {
    id: 'power',
    icon: <Coins />,
    signifier: '镀金轿子',
    signified: '权力',
    position: { x: 70, y: 75 },
  },
]

export default function Tamara({ city }: { city: City }) {
  const { language } = useLanguage()
  const [hoveredSign, setHoveredSign] = useState<string | null>(null)
  const signs = language === 'en' ? SIGNS_EN : SIGNS_CN

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
            {language === 'en' ? 'The City of Signs' : '符号之城'}
          </p>
        </motion.div>

        <div className="relative aspect-[16/9] w-full max-w-4xl overflow-hidden border-2 border-neutral-900 bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Grid Background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Signs */}
          {signs.map((sign) => (
            <motion.div
              key={sign.id}
              className="absolute cursor-pointer"
              style={{ left: `${sign.position.x}%`, top: `${sign.position.y}%` }}
              whileHover={{ scale: 1.2 }}
              onHoverStart={() => setHoveredSign(sign.id)}
              onHoverEnd={() => setHoveredSign(null)}
            >
              <div
                className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-full border-2 border-neutral-900 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all',
                  hoveredSign === sign.id && 'bg-yellow-400'
                )}
              >
                {sign.icon}
              </div>
            </motion.div>
          ))}

          {/* Interpretation Panel */}
          <div className="absolute bottom-8 left-8 right-8 border-2 border-neutral-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {hoveredSign ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                key={hoveredSign}
                className="text-center"
              >
                <p className="mb-1 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                  {signs.find((s) => s.id === hoveredSign)?.signifier}
                </p>
                <p className="text-2xl font-bold uppercase">
                  {signs.find((s) => s.id === hoveredSign)?.signified}
                </p>
              </motion.div>
            ) : (
              <p className="text-center text-sm text-neutral-400 italic">
                {language === 'en' ? 'Hover over the signs to read the city' : '悬停在符号上以阅读城市'}
              </p>
            )}
          </div>
        </div>

        <p className="mt-16 max-w-2xl text-center font-serif text-xl italic text-neutral-500">
          {language === 'en'
            ? '"The eye does not see things but images of things that mean other things."'
            : '“眼睛看到的不是事物，而是意味着其他事物的形象。”'}
        </p>
      </div>
    </div>
  )
}

