'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, UserX } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Adelma({ city }: { city: City }) {
  const [faces, setFaces] = useState<{id: number, x: number, y: number, scale: number, duration: number}[]>([])

  useEffect(() => {
    // Generate random faces
    setFaces(Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 90 + 5,
        y: Math.random() * 90 + 5,
        scale: Math.random() * 0.5 + 0.5,
        duration: 3 + Math.random() * 2
    })))
  }, [])

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-300 font-sans overflow-hidden selection:bg-slate-800">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center relative">
        <h1 className="text-6xl font-serif mb-8 text-slate-500 z-20 mix-blend-difference">ADELMA</h1>

        {/* The Crowd of Dead Faces */}
        <div className="absolute inset-0 overflow-hidden">
            {faces.map((face) => (
                <motion.div
                    key={face.id}
                    className="absolute text-slate-800 hover:text-slate-400 transition-colors duration-1000 cursor-pointer"
                    style={{ 
                        left: `${face.x}%`, 
                        top: `${face.y}%`,
                        scale: face.scale
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: face.duration, repeat: Infinity }}
                >
                    <div className="flex flex-col items-center">
                        <UserX className="w-16 h-16" />
                        <span className="text-xs mt-2 opacity-0 hover:opacity-100 transition-opacity">
                            {["Father", "Grandmother", "Old Fisherman", "Soldier", "Mad Girl"][face.id % 5]}
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="relative z-10 max-w-xl text-center bg-black/50 backdrop-blur-md p-8 rounded-2xl border border-slate-800">
            <p className="text-lg leading-relaxed text-slate-400">
                &quot;You reach a moment in life when, among the people you have known, the dead outnumber the living. And the mind refuses to accept more faces, more expressions...&quot;
            </p>
        </div>
      </div>
    </div>
  )
}
