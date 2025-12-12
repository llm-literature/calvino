'use client';

import { City } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DefaultCityDetail({ city }: { city: City }) {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex items-center justify-center p-8">
      <Link href={`/city/${city.type}`} className="absolute top-8 left-8 p-2 hover:bg-stone-200 rounded-full transition-colors">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-display mb-8 text-stone-900 dark:text-stone-100 capitalize">
            {city.name}
          </h1>
          <div className="h-1 w-20 bg-stone-900 dark:bg-stone-100 mb-12" />
          <p className="text-xl md:text-2xl font-serif leading-relaxed text-stone-700 dark:text-stone-300 whitespace-pre-line">
            {city.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
