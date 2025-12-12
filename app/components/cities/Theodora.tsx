'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen, Cat, Dog, Bird, Bug } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Theodora({ city }: { city: City }) {
  const [invaded, setInvaded] = useState(false)
  const [eyes, setEyes] = useState<{ left: string; top: string; delay: string }[]>([])

  useEffect(() => {
    setEyes(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 80 + 10}%`,
        delay: `${Math.random() * 2}s`,
      }))
    )
  }, [])

  return (
    <div className="relative min-h-screen bg-emerald-900 text-emerald-100 font-serif overflow-hidden selection:bg-emerald-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        <div 
            className="relative w-full max-w-2xl aspect-square bg-emerald-950 rounded-full border-4 border-emerald-700 shadow-2xl overflow-hidden cursor-pointer group"
            onClick={() => setInvaded(!invaded)}
        >
            {/* The Human City */}
            <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: invaded ? 0.2 : 1, scale: invaded ? 0.8 : 1 }}
                transition={{ duration: 1 }}
            >
                <div className="text-center">
                    <BookOpen className="w-32 h-32 text-emerald-400 mx-auto mb-4" />
                    <h1 className="text-6xl font-bold text-emerald-200">THEODORA</h1>
                    <p className="text-emerald-500 mt-4">City of Art & Knowledge</p>
                </div>
            </motion.div>

            {/* The Animal Invasion */}
            <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: invaded ? 1 : 0 }}
                transition={{ duration: 1 }}
            >
                <div className="absolute top-1/4 left-1/4 animate-bounce"><Cat className="w-16 h-16 text-orange-400" /></div>
                <div className="absolute bottom-1/4 right-1/4 animate-bounce delay-100"><Dog className="w-16 h-16 text-amber-400" /></div>
                <div className="absolute top-1/2 right-1/4 animate-pulse"><Bird className="w-12 h-12 text-sky-400" /></div>
                <div className="absolute bottom-1/3 left-1/3 animate-spin-slow"><Bug className="w-10 h-10 text-red-400" /></div>
                
                {/* Eyes in the dark */}
                {eyes.map((eye, i) => (
                    <div 
                        key={i}
                        className="absolute w-2 h-2 bg-yellow-400 rounded-full shadow-[0_0_10px_yellow]"
                        style={{ 
                            left: eye.left, 
                            top: eye.top,
                            animationDelay: eye.delay
                        }}
                    />
                ))}
            </motion.div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to awaken the forgotten fauna
            </div>
        </div>

        <p className="mt-12 max-w-xl text-center text-emerald-400 italic">
            &quot;The fauna has been driven out... but the sphinxes, griffons, chimeras, and dragons have returned to repossess the city.&quot;
        </p>

      </div>
    </div>
  )
}
