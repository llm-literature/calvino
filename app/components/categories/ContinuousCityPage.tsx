'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { City } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Infinity as InfinityIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface ContinuousCityPageProps {
  cities: City[];
  category: string;
}

export default function ContinuousCityPage({ cities, category }: ContinuousCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Duplicate cities to create seamless loop
  const loopedCities = [...cities, ...cities, ...cities, ...cities];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 relative overflow-hidden font-serif selection:bg-blue-500/30 flex flex-col justify-center">
      <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] opacity-5 pointer-events-none">
        {[...Array(400)].map((_, i) => (
            <div key={i} className="border border-slate-900/20" />
        ))}
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10 mb-10 text-center">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h1 className="text-4xl md:text-6xl font-cinzel text-slate-800 tracking-widest uppercase flex items-center justify-center gap-4">
                <InfinityIcon className="w-8 h-8" />
                {category} Cities
                <InfinityIcon className="w-8 h-8" />
            </h1>
            <p className="text-slate-500 mt-4 font-lora italic">The city repeats itself so that it can be remembered.</p>
        </motion.div>
      </div>

      <div className="relative w-full overflow-hidden py-20 bg-white/50 backdrop-blur-sm border-y border-slate-200">
        <motion.div 
            className="flex gap-8 px-4 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
                duration: 40, 
                ease: "linear", 
                repeat: Infinity 
            }}
        >
            {loopedCities.map((city, index) => (
                <ContinuousCityCard key={`${city.name}-${index}`} city={city} onSelect={() => setSelectedCity(city)} />
            ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="bg-white/95 border-slate-200 text-slate-900 backdrop-blur-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-cinzel text-center text-slate-800">{selectedCity?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             <DialogDescription className="text-lg leading-relaxed font-lora text-slate-600 whitespace-pre-line">
                {selectedCity?.description}
             </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ContinuousCityCard({ city, onSelect }: { city: City, onSelect: () => void }) {
    return (
        <motion.div
            className="w-80 h-96 bg-white border border-slate-200 shadow-lg p-6 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow shrink-0"
            whileHover={{ scale: 1.05, y: -10 }}
            onClick={onSelect}
        >
            <div>
                <div className="w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mb-4" />
                <h3 className="text-2xl font-cinzel text-slate-800 mb-2">{city.name}</h3>
                <p className="text-slate-500 text-sm line-clamp-6 font-lora leading-relaxed">
                    {city.description}
                </p>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 uppercase tracking-wider mt-4">
                <span>Route A</span>
                <span>&rarr;</span>
                <span>Route B</span>
            </div>
        </motion.div>
    )
}
