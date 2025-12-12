'use client';

import { CategoryPageProps } from '@/lib/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TradingCityPage({ cities, category }: CategoryPageProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-amber-500 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
        {cities.map((city, index) => (
          <TradingCard key={city.name} city={city} index={index} />
        ))}
        {/* Fillers to make the grid look dense */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`filler-${i}`} className="border border-amber-500/20 min-h-[300px] flex items-center justify-center opacity-20">
            <span className="font-mono text-xs">TRADE_ROUTE_{i + 900}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TradingCard({ city, index }: { city: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="relative group border border-amber-500/30 bg-slate-900 hover:bg-amber-950/30 transition-colors duration-300 min-h-[300px] p-6 flex flex-col justify-between overflow-hidden"
    >
      <Link href={`/city/${city.type}/${city.name}`} className="absolute inset-0 z-10" />
      
      <div className="absolute top-0 right-0 p-2 font-mono text-xs text-amber-500/50">
        COORD: {Math.floor(Math.random() * 1000)}.{Math.floor(Math.random() * 100)}
      </div>

      <div>
        <h2 className="text-3xl font-bold uppercase tracking-tighter mb-2 group-hover:text-amber-300 transition-colors">
          {city.name}
        </h2>
        <div className="h-px w-12 bg-amber-500 mb-4 group-hover:w-full transition-all duration-500" />
        <p className="font-mono text-xs text-amber-500/70 line-clamp-6 leading-relaxed">
          {city.description}
        </p>
      </div>

      <div className="mt-4 flex justify-between items-end">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`w-1 h-8 ${i < 3 ? 'bg-amber-500' : 'bg-amber-500/20'}`} />
          ))}
        </div>
        <span className="font-mono text-xs border border-amber-500 px-2 py-1 rounded hover:bg-amber-500 hover:text-slate-900 transition-colors">
          EXCHANGE
        </span>
      </div>
    </motion.div>
  );
}
