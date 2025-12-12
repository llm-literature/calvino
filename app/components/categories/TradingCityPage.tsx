'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function TradingCityPage({ cities, category }: CategoryPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // We can't easily do horizontal scroll with just CSS in Next.js without some setup, 
  // but we can use a simple flex container with overflow-x-auto.
  
  return (
    <div className="h-screen bg-[#0f172a] text-amber-500 overflow-hidden flex flex-col">
      <div className="p-8 border-b border-amber-900/30 flex justify-between items-end bg-[#0f172a] z-10">
        <div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-amber-500/90 uppercase tracking-tighter">
            {category}
          </h1>
          <p className="text-amber-500/50 font-mono text-xs mt-2">
            EXCHANGE • BARTER • COMMERCE
          </p>
        </div>
        <div className="text-amber-500/30 font-mono text-xs animate-pulse">
          SCROLL RIGHT &rarr;
        </div>
      </div>

      <div 
        className="flex-1 overflow-x-auto overflow-y-hidden flex items-center px-8 gap-8 md:gap-16 snap-x snap-mandatory scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Intro Spacer */}
        <div className="w-8 flex-shrink-0" />

        {cities.map((city, index) => (
          <TradingCard key={city.name} city={city} index={index} />
        ))}

        {/* Outro Spacer */}
        <div className="w-32 flex-shrink-0 flex items-center justify-center opacity-30">
          <span className="writing-vertical-rl text-amber-900 font-mono text-xs tracking-widest">END OF ROUTE</span>
        </div>
      </div>
      
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-amber-900/10 to-transparent pointer-events-none" />
    </div>
  );
}

function TradingCard({ city, index }: { city: any, index: number }) {
  return (
    <motion.div 
      className="snap-center flex-shrink-0 w-[85vw] md:w-[400px] h-[60vh] relative group"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ margin: "-10%" }}
    >
      <Link href={`/city/${city.type}/${city.name}`} className="block h-full">
        <div className="h-full bg-[#1e293b] border border-amber-700/30 hover:border-amber-500/60 transition-colors duration-300 flex flex-col relative overflow-hidden shadow-2xl">
          
          {/* "Rug" Pattern Top */}
          <div className="h-4 bg-[url('https://www.transparenttextures.com/patterns/zig-zag.png')] opacity-20 bg-amber-500" />
          
          <div className="p-8 flex-1 flex flex-col relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-12 rounded-full border border-amber-500/30 flex items-center justify-center text-amber-500 font-display text-xl">
                {index + 1}
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-bold text-amber-100 uppercase tracking-wide mb-1">
                  {city.name}
                </h2>
                <span className="text-[10px] font-mono text-amber-500/60">
                  TRADING POST
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
              <p className="font-serif text-amber-200/80 leading-relaxed text-sm md:text-base line-clamp-[10]">
                {city.description}
              </p>
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1e293b] to-transparent" />
            </div>

            <div className="mt-6 pt-6 border-t border-amber-500/10 flex justify-between items-center">
              <span className="text-xs font-mono text-amber-500/40">VALUE: MEMORY</span>
              <span className="text-sm font-bold text-amber-500 group-hover:translate-x-2 transition-transform">
                ENTER &rarr;
              </span>
            </div>
          </div>

          {/* Background Texture */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 mix-blend-overlay pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
