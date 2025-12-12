'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function Zobeide({ city }: { city: City }) {
  return (
    <div className="relative min-h-screen bg-white text-slate-800 font-sans overflow-hidden selection:bg-slate-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-slate-100 p-2 transition-colors hover:bg-slate-200"
      >
        <ArrowLeft className="h-6 w-6 text-slate-600" />
      </Link>

      {/* The Trap / Maze Background */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
         <svg width="100%" height="100%">
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Spiral/Maze paths */}
            <motion.path 
                d="M 100 100 Q 400 50 600 300 T 1000 500" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, ease: "easeInOut" }}
            />
             <motion.path 
                d="M 200 800 Q 500 600 800 800 T 1200 200" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 7, ease: "easeInOut", delay: 1 }}
            />
         </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center">
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="bg-white/80 backdrop-blur-md p-12 rounded-full shadow-[0_0_50px_rgba(0,0,0,0.1)] border border-slate-100 max-w-2xl text-center"
        >
            <h1 className="text-5xl font-light tracking-[0.2em] text-slate-900 mb-8">ZOBEIDE</h1>
            <p className="text-slate-500 italic mb-8">
                &quot;The white city, well exposed to the moon, with streets wound about themselves as in a skein.&quot;
            </p>
            <div className="h-px w-24 bg-slate-300 mx-auto mb-8" />
            <div className="prose prose-slate text-slate-600 leading-relaxed">
                {city.description.split('\n').slice(0, 3).map((p, i) => (
                    <p key={i}>{p}</p>
                ))}
            </div>
        </motion.div>

        {/* The Walls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 w-full max-w-6xl">
            {[1, 2, 3].map((i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="bg-white p-8 shadow-lg border-t-4 border-slate-200"
                >
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">The Dream</h3>
                    <p className="text-sm text-slate-600">
                        &quot;Men of various nations had an identical dream. They saw a woman running at night through an unknown city...&quot;
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  )
}
