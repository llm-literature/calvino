'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DefaultCategoryPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-900 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl md:text-8xl font-display text-center mb-20 capitalize text-stone-800 dark:text-stone-200">
          {category}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/city/${city.type}/${city.name}`}>
                <div className="bg-white dark:bg-stone-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 h-full flex flex-col">
                  <h2 className="text-2xl font-serif mb-4 capitalize text-stone-900 dark:text-stone-100">{city.name}</h2>
                  <p className="text-stone-600 dark:text-stone-400 line-clamp-4 flex-grow">
                    {city.description}
                  </p>
                  <div className="mt-6 text-stone-400 text-sm font-mono">
                    Explore &rarr;
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
