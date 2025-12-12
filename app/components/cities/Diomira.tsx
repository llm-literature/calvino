'use client';

import { City } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Diomira({ city }: { city: City }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 overflow-hidden relative">
      {/* Background Elements representing domes and statues */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-t-full border-2 border-slate-400"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}%`,
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
            }}
          />
        ))}
      </div>

      <Link href={`/city/${city.type}`} className="absolute top-8 left-8 z-20 p-2 hover:bg-white/10 rounded-full transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </Link>

      <div className="container mx-auto px-4 py-20 relative z-10 flex flex-col items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl md:text-9xl font-serif bg-clip-text text-transparent bg-gradient-to-b from-slate-100 to-slate-500">
            {city.name.toUpperCase()}
          </h1>
          <p className="text-slate-400 tracking-[1em] mt-4 uppercase text-sm">Sixty Silver Domes</p>
        </motion.div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="max-w-3xl text-center font-serif text-xl leading-loose bg-slate-800/50 p-12 rounded-lg backdrop-blur-sm border border-slate-700 shadow-2xl"
        >
          {city.description}
        </motion.div>
      </div>
    </div>
  );
}
