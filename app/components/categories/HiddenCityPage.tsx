'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { City } from '@/lib/types';
import { cn } from '@/lib/utils';
import { VenetianMask } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface HiddenCityPageProps {
  cities: City[];
  category: string;
}

export default function HiddenCityPage({ cities, category }: HiddenCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 relative overflow-hidden font-serif selection:bg-orange-500/30">
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl md:text-6xl font-cinzel text-stone-200 tracking-widest uppercase flex items-center justify-center gap-4">
                <VenetianMask className="w-8 h-8" />
                {category} Cities
                <VenetianMask className="w-8 h-8" />
            </h1>
            <p className="text-stone-400/60 mt-4 font-lora italic">The city is hidden inside another city.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {cities.map((city, index) => (
            <HiddenCityCard key={city.name} city={city} onSelect={() => setSelectedCity(city)} />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="bg-stone-900/95 border-stone-700 text-stone-100 backdrop-blur-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-cinzel text-center text-orange-300">{selectedCity?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             <DialogDescription className="text-lg leading-relaxed font-lora text-stone-300 whitespace-pre-line">
                {selectedCity?.description}
             </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function HiddenCityCard({ city, onSelect }: { city: City, onSelect: () => void }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="relative h-80 rounded-lg overflow-hidden cursor-pointer border border-stone-700 bg-stone-800 shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onSelect}
            whileHover={{ scale: 1.02 }}
        >
            {/* The "Outer" City (The Mask) */}
            <motion.div 
                className="absolute inset-0 bg-stone-800 flex items-center justify-center z-20"
                animate={{ opacity: isHovered ? 0 : 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center p-6">
                    <VenetianMask className="w-16 h-16 mx-auto text-stone-600 mb-4" />
                    <h3 className="text-2xl font-cinzel text-stone-500">A City</h3>
                    <p className="text-stone-600 text-sm mt-2">Hover to reveal the hidden essence</p>
                </div>
                {/* Pattern overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
            </motion.div>

            {/* The "Inner" City (The Truth) */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-900 to-stone-900 flex flex-col items-center justify-center p-6 text-center z-10">
                <h3 className="text-3xl font-cinzel text-orange-200 mb-2">{city.name}</h3>
                <p className="text-orange-100/70 font-lora text-sm line-clamp-4">
                    {city.description}
                </p>
                <span className="mt-4 text-xs uppercase tracking-widest text-orange-400 border border-orange-400/30 px-3 py-1 rounded">
                    Click to Read
                </span>
            </div>
        </motion.div>
    )
}
