'use client'

import { useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import data from '@/public/city/data.json';
import { getCityTheme } from '@/lib/themes';
import { cn } from "@/lib/utils";

export default function CityCategoriesPage() {
  // Extract unique city types
  const cityTypes = useMemo(() => {
    const types = new Set(data.cities.map(city => city.type));
    return Array.from(types).sort();
  }, []);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col text-center items-center gap-6 mb-20">
          <h1 className="font-display text-5xl md:text-7xl text-stone-900 dark:text-stone-100">
            城市分类
          </h1>
          <p className="font-serif text-xl text-stone-600 dark:text-stone-400 max-w-2xl italic">
            "目录本身就是一种迷宫。"
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cityTypes.map((type, index) => {
            const theme = getCityTheme(type);
            return (
              <Link key={type} href={`/city/${type}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "group relative h-64 overflow-hidden rounded-xl border-2 transition-all duration-500 hover:scale-[1.02]",
                    theme.colors.bg,
                    theme.colors.border
                  )}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h2 className={cn(
                      "text-4xl font-display mb-2 transition-transform duration-500 group-hover:-translate-y-2",
                      theme.colors.text
                    )}>
                      {theme.label}
                    </h2>
                    <span className={cn(
                      "font-mono text-sm uppercase tracking-widest opacity-60",
                      theme.colors.muted
                    )}>
                      {type}
                    </span>
                    
                    <div className={cn(
                      "absolute bottom-6 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0",
                      theme.colors.accent
                    )}>
                      Explore &rarr;
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
