'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Trash } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Leonia({ city }: { city: City }) {
  const [trashHeight, setTrashHeight] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
        setTrashHeight(h => (h >= 100 ? 0 : h + 0.5))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans overflow-hidden selection:bg-slate-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white border border-slate-200"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center relative z-10">
        <h1 className="text-6xl font-bold mb-4 tracking-tighter">LEONIA</h1>
        <p className="text-xl text-slate-500 mb-8">The City of New Things</p>
        
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md text-center z-20">
            <p className="mb-4">
                Every morning the people of Leonia wake up in fresh sheets, wash with fresh soaps, wear brand-new clothing, take from the latest model refrigerator still unopened tins...
            </p>
            <div className="text-xs text-slate-400 uppercase tracking-widest">
                Trash Level: {Math.floor(trashHeight)}%
            </div>
        </div>
      </div>

      {/* The Rising Trash */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-slate-800 flex flex-wrap content-end overflow-hidden"
        style={{ height: `${trashHeight}%` }}
      >
        <div className="w-full h-2 bg-slate-600 absolute top-0 left-0 animate-pulse" />
        {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="p-4 opacity-20">
                <Trash className="w-8 h-8 text-white" />
            </div>
        ))}
      </motion.div>

      <div className="fixed bottom-4 left-4 text-xs text-slate-400 z-20">
        &quot;The city refashions itself every day...&quot;
      </div>
    </div>
  )
}
