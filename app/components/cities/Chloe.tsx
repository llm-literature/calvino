'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Chloe({ city }: { city: City }) {
  const { language } = useLanguage()
  const [people, setPeople] = useState<{ id: number; x: number; speed: number; thought: string }[]>(
    []
  )

  useEffect(() => {
    const THOUGHTS =
      language === 'en'
        ? [
            'If I spoke, we would be lovers.',
            'He could be my assassin.',
            'She knows my darkest secret.',
            'We would travel the world together.',
            'A single word would shatter this silence.',
            'I can see the sadness in her eyes.',
            'He is thinking of me, I know it.',
          ]
        : [
            '如果我开口，我们会成为恋人。',
            '他可能是我的刺客。',
            '她知道我最黑暗的秘密。',
            '我们会一起周游世界。',
            '一个字就能打破这沉默。',
            '我能看到她眼中的悲伤。',
            '他在想我，我知道。',
          ]

    // Initial population
    const initialPeople = Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      speed: (Math.random() - 0.5) * 0.5, // Random direction and speed
      thought: THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)],
    }))
    setPeople(initialPeople)

    const interval = setInterval(() => {
      setPeople((prev) =>
        prev.map((p) => {
          let newX = p.x + p.speed
          if (newX > 110) newX = -10
          if (newX < -10) newX = 110
          return { ...p, x: newX }
        })
      )
    }, 50)

    return () => clearInterval(interval)
  }, [language])

  return (
    <div className="relative min-h-screen overflow-hidden bg-rose-50 font-sans text-rose-900 selection:bg-rose-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6 text-rose-600" />
      </Link>

      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <div className="z-10 mb-24 text-center">
          <h1 className="mb-4 font-serif text-6xl text-rose-950 italic">
            {language === 'en' ? 'Chloe' : city.cnName}
          </h1>
          <p className="text-sm tracking-widest text-rose-800/60 uppercase">
            {language === 'en' ? 'The City of Chaste Desire' : '贞洁欲望之城'}
          </p>
        </div>

        {/* The Passing Crowd */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {people.map((p) => (
            <motion.div
              key={p.id}
              className="group absolute top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${p.x}%` }}
              whileHover={{ scale: 1.1, zIndex: 50 }}
            >
              <div className="relative">
                <User
                  className="h-24 w-24 text-rose-900/20 transition-colors duration-500 group-hover:text-rose-600"
                  strokeWidth={1}
                />

                {/* Thought Bubble */}
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-4 w-48 -translate-x-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="relative rounded-xl bg-white p-4 text-center text-xs text-rose-800 italic shadow-xl">
                    &quot;{p.thought}&quot;
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="absolute bottom-12 max-w-xl px-4 text-center text-sm leading-relaxed text-rose-900/40">
          {language === 'en'
            ? '"People who move through the streets are all strangers. At each encounter, they imagine a thousand things, encounters which could happen between them..."'
            : '"在街道上穿行的人们都是陌生人。在每一次相遇中，他们都会想象一千种可能发生的事情，那些可能在他们之间发生的相遇……"'}
        </div>
      </div>
    </div>
  )
}
