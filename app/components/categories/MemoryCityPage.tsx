'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function MemoryCityPage({ cities, category }: CategoryPageProps) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-[200vh] bg-[#f4ecd8] text-[#5c4b35]">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] mix-blend-multiply" />
      
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.h1 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
          className="text-[15vw] font-serif italic absolute z-0 text-[#5c4b35]/10 select-none"
        >
          {category}
        </motion.h1>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-40">
          {cities.map((city, index) => (
            <MemoryCard key={city.name} city={city} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MemoryCard({ city, index }: { city: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 1.5 }}
      className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
    >
      <Link href={`/city/${city.type}/${city.name}`} className="block w-full md:w-2/3">
        <div className="bg-[#e8dec0] p-8 md:p-12 shadow-[10px_10px_0px_0px_rgba(92,75,53,0.2)] hover:shadow-[15px_15px_0px_0px_rgba(92,75,53,0.3)] hover:-translate-y-1 transition-all duration-300 border border-[#5c4b35]/20">
          <div className="flex items-baseline justify-between border-b border-[#5c4b35]/20 pb-4 mb-6">
            <h2 className="text-4xl font-serif capitalize">{city.name}</h2>
            <span className="font-mono text-sm opacity-60">NO. {index + 1}</span>
          </div>
          <p className="font-serif text-lg leading-relaxed line-clamp-4 opacity-80">
            {city.description}
          </p>
          <div className="mt-6 text-right">
            <span className="inline-block border-b border-[#5c4b35] text-sm uppercase tracking-widest">Read Memory</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
