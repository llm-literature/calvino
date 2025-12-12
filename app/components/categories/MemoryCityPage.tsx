'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function MemoryCityPage({ cities, category }: CategoryPageProps) {
  // Generate random positions and rotations only on client side to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#e6e0d4] overflow-hidden relative selection:bg-[#8c7b6c] selection:text-white">
      {/* Texture Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]" />
      
      {/* Title Watermark */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
        <h1 className="text-[20vw] font-serif italic text-[#8c7b6c]/5 whitespace-nowrap">
          {category}
        </h1>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-wrap items-center justify-center gap-12 md:gap-24">
        {cities.map((city, index) => (
          <Polaroid key={city.name} city={city} index={index} mounted={mounted} />
        ))}
      </div>
      
      <div className="fixed bottom-8 left-0 w-full text-center text-[#8c7b6c]/60 font-serif italic text-sm pointer-events-none">
        "Memory's images, once they are fixed in words, are erased."
      </div>
    </div>
  );
}

function Polaroid({ city, index, mounted }: { city: any, index: number, mounted: boolean }) {
  // Random rotation between -6 and 6 degrees
  const rotation = mounted ? (index % 2 === 0 ? -1 : 1) * (Math.random() * 6 + 2) : 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: rotation }}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group cursor-pointer"
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <Link href={`/city/${city.type}/${city.name}`}>
        <div className="bg-white p-4 pb-12 shadow-lg w-64 md:w-72 transform transition-transform duration-300 ease-out">
          {/* "Photo" Area */}
          <div className="bg-[#2a2a2a] aspect-square w-full mb-4 overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
             {/* Placeholder for city image or abstract pattern */}
             <div className="absolute inset-0 opacity-50 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
             <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-4xl text-white/20 group-hover:text-white/80 transition-colors duration-500">
                    {city.name[0].toUpperCase()}
                </span>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
             
             <p className="absolute bottom-2 left-2 right-2 text-xs text-white/80 line-clamp-3 font-serif italic opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {city.description}
             </p>
          </div>
          
          {/* Handwritten Label */}
          <div className="text-center">
            <h2 className="font-serif text-2xl text-[#2a2a2a] font-bold" style={{ fontFamily: 'var(--font-serif)' }}>
              {city.name}
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">
              Fig. {index + 1}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
