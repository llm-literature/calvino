'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function SignsCityPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-mono flex flex-col items-center justify-center py-20">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
      
      <h1 className="text-xs tracking-[1em] text-neutral-500 mb-12 uppercase z-10">
        SEMIOTICS OF THE CITY
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-neutral-800 border border-neutral-800 max-w-6xl w-full mx-auto">
        {cities.map((city, index) => (
          <SignCell key={city.name} city={city} index={index} />
        ))}
        {/* Fillers to complete the grid visually */}
        {Array.from({ length: 12 - cities.length }).map((_, i) => (
          <div key={`filler-${i}`} className="bg-neutral-950 aspect-square flex items-center justify-center opacity-20">
            <span className="text-4xl font-thin text-neutral-800">?</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SignCell({ city, index }: { city: any, index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Generate a "symbol" based on the city name (first letter + length or something)
  const symbol = city.name.charAt(0).toUpperCase();

  return (
    <Link href={`/city/${city.type}/${city.name}`} className="block">
      <motion.div
        className="relative bg-neutral-950 aspect-square flex flex-col items-center justify-center overflow-hidden group cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* The "Sign" (Large Character) */}
        <motion.div
          animate={{ 
            scale: isHovered ? 0.5 : 1,
            y: isHovered ? -20 : 0,
            opacity: isHovered ? 0.2 : 1
          }}
          className="text-8xl md:text-9xl font-thin text-neutral-100 select-none"
        >
          {symbol}
        </motion.div>

        {/* Hidden Meaning (Description) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center bg-neutral-900/90 backdrop-blur-sm"
        >
          <h2 className="text-xl font-bold mb-2 text-white tracking-widest uppercase">
            {city.name}
          </h2>
          <p className="text-[10px] leading-relaxed text-neutral-400 line-clamp-4 font-sans">
            {city.description}
          </p>
          <div className="mt-4 w-8 h-px bg-white/50" />
        </motion.div>

        {/* Corner Markers */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-neutral-700 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-neutral-700 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-neutral-700 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-neutral-700 opacity-50 group-hover:opacity-100 transition-opacity" />
      </motion.div>
    </Link>
  );
}
