'use client';

import { City } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Isidora({ city }: { city: City }) {
  return (
    <div className="min-h-screen bg-[#fff0f5] text-[#8b4513] overflow-hidden relative flex items-center justify-center">
      {/* Spiral Background */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none"
      >
        <div className="w-[150vmax] h-[150vmax] border-[100px] border-dashed border-[#d8bfd8] rounded-full" />
        <div className="absolute w-[120vmax] h-[120vmax] border-[80px] border-dotted border-[#dda0dd] rounded-full" />
        <div className="absolute w-[90vmax] h-[90vmax] border-[60px] border-double border-[#ee82ee] rounded-full" />
      </motion.div>

      <Link href={`/city/${city.type}`} className="absolute top-8 left-8 z-20 p-2 hover:bg-black/5 rounded-full transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="relative z-10 max-w-4xl p-8 md:p-16 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-6xl font-serif mb-6 text-[#c71585]"
            >
              {city.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg font-serif text-[#8b4513]"
            >
              {city.description}
            </motion.div>
          </div>
          
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 transform rotate-2">
              <h3 className="font-bold text-sm uppercase tracking-wider text-pink-400 mb-2">Dream</h3>
              <p className="text-xs">Young man arriving in Isidora</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-100 transform -rotate-1">
              <h3 className="font-bold text-sm uppercase tracking-wider text-pink-400 mb-2">Reality</h3>
              <p className="text-xs">Old man watching the youth</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
