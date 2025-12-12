'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { City } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Type } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface NamesCityPageProps {
  cities: City[];
  category: string;
}

export default function NamesCityPage({ cities, category }: NamesCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen bg-white text-black relative overflow-hidden font-serif selection:bg-black selection:text-white">
      <div className="container mx-auto px-4 py-20">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-20"
        >
            <h1 className="text-4xl md:text-6xl font-cinzel text-black tracking-tighter uppercase flex items-center justify-center gap-4">
                <Type className="w-8 h-8" />
                {category}
                <Type className="w-8 h-8" />
            </h1>
            <p className="text-gray-500 mt-4 font-lora italic">The name is the city.</p>
        </motion.div>

        <div className="flex flex-col gap-0">
          {cities.map((city, index) => (
            <NameCityRow key={city.name} city={city} index={index} onSelect={() => setSelectedCity(city)} />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="bg-white border-4 border-black text-black max-w-3xl rounded-none">
          <DialogHeader>
            <DialogTitle className="text-6xl font-cinzel text-center text-black uppercase tracking-tighter">{selectedCity?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             <DialogDescription className="text-xl leading-relaxed font-lora text-gray-800 whitespace-pre-line text-justify columns-1 md:columns-2 gap-8">
                {selectedCity?.description}
             </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function NameCityRow({ city, index, onSelect }: { city: City, index: number, onSelect: () => void }) {
    return (
        <motion.div
            className="group relative border-b border-black py-12 cursor-pointer overflow-hidden"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={onSelect}
        >
            <div className="container mx-auto flex items-baseline justify-between relative z-10">
                <h2 className="text-6xl md:text-9xl font-cinzel font-black text-transparent stroke-black hover:text-black transition-colors duration-500 uppercase tracking-tighter"
                    style={{ WebkitTextStroke: '2px black' }}>
                    {city.name}
                </h2>
                <span className="hidden md:block text-sm font-mono text-gray-400 group-hover:text-black transition-colors">
                    TYPE: {city.type.toUpperCase()}
                </span>
            </div>
            
            {/* Background Reveal */}
            <motion.div 
                className="absolute inset-0 bg-gray-100 z-0 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: "circOut" }}
            />
        </motion.div>
    )
}
