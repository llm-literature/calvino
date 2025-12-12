'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function DefaultCategoryPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <header className="mb-24 text-center relative">
          <span className="absolute top-1/2 left-0 w-full h-px bg-stone-300 -z-10" />
          <h1 className="inline-block bg-stone-100 px-8 text-5xl md:text-7xl font-display font-bold uppercase tracking-widest">
            {category}
          </h1>
        </header>
        
        <div className="space-y-32">
          {cities.map((city, index) => (
            <ArchiveEntry key={city.name} city={city} index={index} />
          ))}
        </div>

        <div className="mt-32 text-center">
          <div className="w-2 h-2 bg-stone-800 rounded-full mx-auto mb-4" />
          <p className="font-mono text-xs text-stone-400 uppercase tracking-widest">End of Archive Section</p>
        </div>
      </div>
    </div>
  );
}

function ArchiveEntry({ city, index }: { city: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.8 }}
      className={cn(
        "flex flex-col md:flex-row gap-12 items-start",
        index % 2 === 1 ? "md:flex-row-reverse" : ""
      )}
    >
      {/* Visual Anchor */}
      <div className="w-full md:w-1/3 aspect-square bg-stone-200 relative overflow-hidden group">
        <Link href={`/city/${city.type}/${city.name}`} className="block w-full h-full">
            <div className="absolute inset-0 bg-stone-300 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-9xl text-stone-100 font-bold opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                    {index + 1}
                </span>
            </div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-stone-400 group-hover:border-stone-600 transition-colors" />
        </Link>
      </div>

      {/* Text Content */}
      <div className="w-full md:w-2/3 pt-4">
        <div className="flex items-baseline gap-4 mb-6 border-b border-stone-300 pb-4">
            <h2 className="text-4xl font-serif font-bold text-stone-900">
                {city.name}
            </h2>
            <span className="font-mono text-xs text-stone-500 uppercase">
                Ref. {city.type.substring(0, 3).toUpperCase()}-{index + 100}
            </span>
        </div>
        
        <p className="font-serif text-lg leading-loose text-stone-600 mb-8 text-justify">
            {city.description}
        </p>

        <Link href={`/city/${city.type}/${city.name}`}>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors group">
                Read Full Entry <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </span>
        </Link>
      </div>
    </motion.div>
  );
}
