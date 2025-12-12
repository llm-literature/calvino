'use client'

import { City } from '@/lib/types'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useRef } from 'react'

export default function Valdrada({ city }: { city: City }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5])

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-slate-900 text-slate-100 font-serif">
       <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        {/* Top City (Real) */}
        <div className="flex-1 bg-slate-800 relative flex items-end justify-center pb-0 overflow-hidden border-b border-slate-500/30">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            
            <motion.div style={{ scale }} className="relative z-10 text-center mb-12">
                <h1 className="text-6xl font-bold tracking-widest text-slate-200">VALDRADA</h1>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-400 mt-4">The City</p>
            </motion.div>
            
            {/* Buildings */}
            <div className="absolute bottom-0 w-full flex justify-center items-end gap-4 px-12 opacity-50">
                <div className="w-12 h-32 bg-slate-600" />
                <div className="w-16 h-48 bg-slate-500" />
                <div className="w-20 h-24 bg-slate-600" />
                <div className="w-14 h-56 bg-slate-400" />
                <div className="w-24 h-40 bg-slate-500" />
            </div>
        </div>

        {/* Bottom City (Reflection) */}
        <div className="flex-1 bg-slate-900 relative flex items-start justify-center pt-0 overflow-hidden">
             {/* Reflection Buildings */}
             <div className="absolute top-0 w-full flex justify-center items-start gap-4 px-12 opacity-30 scale-y-[-1]">
                <div className="w-12 h-32 bg-slate-600" />
                <div className="w-16 h-48 bg-slate-500" />
                <div className="w-20 h-24 bg-slate-600" />
                <div className="w-14 h-56 bg-slate-400" />
                <div className="w-24 h-40 bg-slate-500" />
            </div>

            <motion.div style={{ scale }} className="relative z-10 text-center mt-12 scale-y-[-1] opacity-50 blur-[1px]">
                <h1 className="text-6xl font-bold tracking-widest text-slate-200">VALDRADA</h1>
                <p className="text-xs uppercase tracking-[0.5em] text-slate-400 mt-4">The Reflection</p>
            </motion.div>
            
            {/* Water Effect */}
            <div className="absolute inset-0 bg-linear-to-b from-slate-900/50 to-slate-900 pointer-events-none" />
        </div>
        
        {/* Text Overlay */}
        <motion.div 
            style={{ opacity }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
            <div className="max-w-xl text-center p-8 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
                <p className="text-lg leading-relaxed italic text-slate-300">
                    &quot;The ancients built Valdrada on the shores of a lake, with houses all verandas one above the other, and high streets whose railed parapets look out over the water.&quot;
                </p>
                <p className="mt-4 text-sm text-slate-500">Scroll to merge the cities</p>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
