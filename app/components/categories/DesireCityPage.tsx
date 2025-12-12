'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

export default function DesireCityPage({ cities, category }: CategoryPageProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative cursor-none">
      {/* Spotlight Effect */}
      <div 
        className="fixed pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 40, 100, 0.15), transparent 40%)`
        }}
      />
      
      {/* Cursor Follower */}
      <div 
        className="fixed w-8 h-8 border border-pink-500/50 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ left: mousePosition.x, top: mousePosition.y }}
      />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <h1 className="text-6xl md:text-9xl font-display font-bold text-center mb-32 text-transparent bg-clip-text bg-gradient-to-b from-pink-900 to-black tracking-tighter select-none">
          {category.toUpperCase()}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {cities.map((city, index) => (
            <DesireCard key={city.name} city={city} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DesireCard({ city, index }: { city: any, index: number }) {
  return (
    <Link href={`/city/${city.type}/${city.name}`}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ margin: "-10%" }}
        className="group relative aspect-[3/4] overflow-hidden border border-pink-900/20 bg-zinc-950"
      >
        {/* Hidden Image/Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')] opacity-50" />
        
        {/* Content that reveals on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700 group-hover:bg-pink-950/30">
          <h2 className="text-3xl font-display text-pink-800 group-hover:text-pink-200 transition-colors duration-500 mb-4">
            {city.name}
          </h2>
          
          <div className="w-px h-12 bg-pink-900/50 group-hover:h-24 group-hover:bg-pink-500 transition-all duration-500" />
          
          <p className="mt-6 text-sm font-serif text-pink-200/0 group-hover:text-pink-200/80 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-center line-clamp-4">
            {city.description}
          </p>
        </div>

        {/* Glowing Edges on Hover */}
        <div className="absolute inset-0 border border-pink-500/0 group-hover:border-pink-500/50 transition-colors duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </motion.div>
    </Link>
  );
}
