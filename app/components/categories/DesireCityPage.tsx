'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useRef } from 'react';

export default function DesireCityPage({ cities, category }: CategoryPageProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={ref} className="min-h-screen bg-fuchsia-950 text-fuchsia-100 overflow-hidden relative">
      <motion.div style={{ y }} className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]" />
      </motion.div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <h1 className="text-6xl md:text-9xl font-serif text-center mb-20 text-fuchsia-200/50 italic">
          {category}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`${index % 2 === 1 ? 'md:translate-y-20' : ''}`}
            >
              <Link href={`/city/${city.type}/${city.name}`}>
                <div className="group relative aspect-[3/4] bg-fuchsia-900/40 border border-fuchsia-500/30 p-8 flex flex-col justify-center items-center text-center hover:bg-fuchsia-800/50 transition-colors duration-500 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <h2 className="text-4xl font-display mb-4 relative z-10 group-hover:scale-110 transition-transform duration-500">
                    {city.name}
                  </h2>
                  <p className="font-serif text-sm opacity-0 group-hover:opacity-80 transition-opacity duration-500 relative z-10 line-clamp-6">
                    {city.description}
                  </p>
                  
                  <div className="absolute bottom-4 left-0 w-full text-center text-xs tracking-[0.3em] text-fuchsia-300/50">
                    DESIRE • {index + 1}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
