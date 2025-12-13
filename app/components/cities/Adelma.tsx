'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, UserX } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Adelma({ city }: { city: City }) {
  const { language } = useLanguage()
  const [faces, setFaces] = useState<
    { id: number; x: number; y: number; scale: number; duration: number }[]
  >([])

  useEffect(() => {
    // Generate random faces
    setFaces(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        scale: Math.random() * 0.5 + 0.5,
        duration: 3 + Math.random() * 2,
      }))
    )
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 font-sans text-slate-300 selection:bg-slate-800">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="relative container mx-auto flex min-h-screen flex-col items-center justify-center px-4 py-24">
        <h1 className="z-20 mb-8 font-serif text-6xl text-slate-500 mix-blend-difference">
          {(language === 'en' ? city.name : city.cnName || city.name).toUpperCase()}
        </h1>

        {/* The Crowd of Dead Faces */}
        <div className="absolute inset-0 overflow-hidden">
          {faces.map((face) => (
            <motion.div
              key={face.id}
              className="absolute cursor-pointer text-slate-800 transition-colors duration-1000 hover:text-slate-400"
              style={{
                left: `${face.x}%`,
                top: `${face.y}%`,
                scale: face.scale,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: face.duration, repeat: Infinity }}
            >
              <div className="flex flex-col items-center">
                <UserX className="h-16 w-16" />
                <span className="mt-2 text-xs opacity-0 transition-opacity hover:opacity-100">
                  {language === 'en'
                    ? ['Father', 'Grandmother', 'Old Fisherman', 'Soldier', 'Mad Girl'][face.id % 5]
                    : ['父亲', '祖母', '老渔夫', '士兵', '疯女孩'][face.id % 5]}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-xl rounded-2xl border border-slate-800 bg-black/50 p-8 text-center backdrop-blur-md">
          <p className="text-lg leading-relaxed text-slate-400">
            {language === 'en'
              ? '"You reach a moment in life when, among the people you have known, the dead outnumber the living. And the mind refuses to accept more faces, more expressions..."'
              : '“你会到达生命的某个时刻，在你认识的人中，死者多于生者。头脑拒绝接受更多的面孔，更多的表情……”'}
          </p>
        </div>
      </div>
    </div>
  )
}
