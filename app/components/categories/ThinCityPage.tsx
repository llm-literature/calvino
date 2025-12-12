'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function ThinCityPage({ cities, category }: CategoryPageProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 overflow-hidden relative">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10 h-screen">
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-9xl font-thin text-center text-slate-900/10 mb-20 tracking-[0.2em] uppercase absolute top-20 left-0 right-0 pointer-events-none"
        >
          {category}
        </motion.h1>

        <div className="relative w-full h-full">
          {cities.map((city, index) => (
            <HangingCity key={city.name} city={city} index={index} total={cities.length} mounted={mounted} />
          ))}
        </div>
      </div>
    </div>
  );
}

function HangingCity({ city, index, total, mounted }: { city: any, index: number, total: number, mounted: boolean }) {
  // Calculate positions to spread them out but keep them "hanging"
  // We divide the screen width into sections
  const sectionWidth = 100 / total;
  const leftPos = sectionWidth * index + (sectionWidth / 2);
  
  // Random string length (height from top)
  const stringLength = mounted ? 20 + Math.random() * 40 : 30; // 20% to 60% down the screen

  return (
    <div 
      className="absolute top-0"
      style={{ left: `${leftPos}%` }}
    >
      {/* The String */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: `${stringLength}vh` }}
        transition={{ duration: 1.5, delay: index * 0.2, ease: "easeOut" }}
        className="w-px bg-slate-300 mx-auto"
      />

      {/* The City "Ornament" */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 + index * 0.2 }}
        style={{ marginTop: '-1px' }} // Connect perfectly to line
      >
        <motion.div
          animate={{ 
            rotate: [0, 2, 0, -2, 0],
            y: [0, 5, 0, 5, 0]
          }}
          transition={{ 
            duration: 8 + Math.random() * 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: Math.random() * 2
          }}
          className="relative group"
        >
          <Link href={`/city/${city.type}/${city.name}`}>
            <div className="relative flex flex-col items-center">
              {/* Geometric Shape */}
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-500">
                <div className="text-center p-4">
                  <h2 className="font-display text-xl text-slate-700 tracking-widest mb-2 group-hover:text-sky-600 transition-colors">
                    {city.name}
                  </h2>
                  <div className="w-8 h-px bg-slate-300 mx-auto group-hover:w-16 transition-all duration-500" />
                </div>
              </div>
              
              {/* Hover Description Tooltip */}
              <div className="absolute top-full mt-4 w-64 p-4 bg-white/90 backdrop-blur shadow-xl rounded-sm text-xs text-slate-500 font-serif leading-relaxed opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-50 text-center border border-slate-100">
                {city.description.substring(0, 100)}...
              </div>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
