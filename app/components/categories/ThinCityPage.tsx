'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ThinCityPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-sky-50 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent)]" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-thin text-center text-sky-900/20 mb-20 tracking-widest uppercase"
        >
          {category}
        </motion.h1>

        <div className="relative h-[80vh] w-full">
          {cities.map((city, index) => (
            <FloatingCity key={city.name} city={city} index={index} total={cities.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FloatingCity({ city, index, total }: { city: any, index: number, total: number }) {
  // Random initial positions spread across the screen
  const randomX = Math.random() * 80; // 0-80%
  const randomY = Math.random() * 80; // 0-80%
  
  // Random float duration and delay
  const duration = 10 + Math.random() * 10;
  const delay = Math.random() * 5;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${(index / total) * 80 + 10}%`, // Distribute horizontally roughly
        top: `${(index % 3) * 30 + 10}%`, // Distribute vertically roughly
      }}
      animate={{
        y: [0, -30, 0, 30, 0],
        x: [0, 20, 0, -20, 0],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      <Link href={`/city/${city.type}/${city.name}`}>
        <div className="group relative">
          <div className="absolute -inset-4 bg-white/40 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white/10 backdrop-blur-sm border border-white/30 p-6 rounded-full w-48 h-48 flex items-center justify-center text-center hover:scale-110 transition-transform duration-500 cursor-pointer shadow-lg hover:shadow-sky-200/50">
            <span className="font-serif text-xl text-sky-900 tracking-widest group-hover:text-sky-600 transition-colors">
              {city.name.toUpperCase()}
            </span>
          </div>
          {/* String hanging effect */}
          <motion.div 
            className="absolute top-0 left-1/2 w-px h-[100vh] -translate-y-full bg-sky-900/10 origin-bottom"
            style={{ x: '-50%' }}
          />
        </div>
      </Link>
    </motion.div>
  );
}
