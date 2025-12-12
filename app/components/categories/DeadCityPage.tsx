'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { City } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Skull } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface DeadCityPageProps {
  cities: City[];
  category: string;
}

export default function DeadCityPage({ cities, category }: DeadCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="min-h-screen bg-black text-gray-300 relative overflow-hidden font-serif selection:bg-gray-500/30 flex flex-col items-center justify-center">
      
      {/* Fog/Smoke Effect (CSS) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-black to-black" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="text-center mb-20"
        >
            <h1 className="text-4xl md:text-6xl font-cinzel text-gray-500 tracking-[0.5em] uppercase flex items-center justify-center gap-6 opacity-80">
                <Skull className="w-6 h-6" />
                {category}
                <Skull className="w-6 h-6" />
            </h1>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-16">
          {cities.map((city, index) => (
            <DeadCityTombstone key={city.name} city={city} index={index} onSelect={() => setSelectedCity(city)} />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="bg-black border border-gray-800 text-gray-300 max-w-2xl shadow-2xl shadow-gray-900/50">
          <DialogHeader>
            <DialogTitle className="text-3xl font-cinzel text-center text-gray-400 tracking-widest">{selectedCity?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             <DialogDescription className="text-lg leading-loose font-lora text-gray-500 whitespace-pre-line text-justify">
                {selectedCity?.description}
             </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function DeadCityTombstone({ city, index, onSelect }: { city: City, index: number, onSelect: () => void }) {
    return (
        <motion.div
            className="relative group cursor-pointer w-64 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.3, duration: 1.5 }}
            onClick={onSelect}
        >
            <div className="h-80 border border-gray-800 bg-gray-950/50 p-8 flex flex-col items-center justify-center rounded-t-full hover:border-gray-600 transition-colors duration-500">
                <div className="w-16 h-16 mb-6 opacity-20 group-hover:opacity-50 transition-opacity">
                    <Skull className="w-full h-full" />
                </div>
                <h3 className="text-2xl font-cinzel text-gray-400 group-hover:text-gray-200 transition-colors mb-2">{city.name}</h3>
                <div className="w-8 h-0.5 bg-gray-800 my-4" />
                <p className="text-xs text-gray-600 font-lora italic opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    "The dead are the only ones who are truly free."
                </p>
            </div>
            {/* Shadow */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-40 h-4 bg-black blur-xl rounded-full opacity-80" />
        </motion.div>
    )
}
