'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function SignsCityPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-200 font-mono">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-12 border-b border-neutral-700 pb-4">
          &lt;{category.toUpperCase()} /&gt;
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cities.map((city, index) => (
            <Link key={city.name} href={`/city/${city.type}/${city.name}`}>
              <motion.div
                whileHover={{ scale: 1.02, backgroundColor: '#262626' }}
                className="bg-neutral-800 p-6 border border-neutral-700 h-full flex flex-col"
              >
                <div className="flex justify-between items-start mb-4 text-xs text-neutral-500">
                  <span>ID: {city.name.substring(0, 3).toUpperCase()}-{index}</span>
                  <span>TYPE: SIGN</span>
                </div>
                
                <h2 className="text-2xl font-bold mb-4 text-white">
                  {city.name}
                </h2>
                
                <div className="flex-grow font-mono text-xs leading-relaxed text-neutral-400 line-clamp-4 mb-4">
                  {city.description}
                </div>

                <div className="flex gap-2 mt-auto">
                  {['SYMBOL', 'MEANING', 'HIDDEN'].map(tag => (
                    <span key={tag} className="text-[10px] border border-neutral-600 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
