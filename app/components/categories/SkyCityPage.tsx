'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { City } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Star, Moon } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface SkyCityPageProps {
  cities: City[];
  category: string;
}

export default function SkyCityPage({ cities, category }: SkyCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [stars, setStars] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random star positions on client side only
    const newStars = cities.map(() => ({
      x: Math.random() * 80 + 10, // 10% to 90%
      y: Math.random() * 80 + 10,
      size: Math.random() * 20 + 30,
      delay: Math.random() * 2,
    }));
    setStars(newStars);
  }, [cities]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden font-serif selection:bg-indigo-500/30">
      {/* Background Stars */}
      <div className="absolute inset-0 z-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 5 }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 2 + 1 + 'px',
              height: Math.random() * 2 + 1 + 'px',
            }}
          />
        ))}
      </div>

      {/* Constellation Lines (simplified) */}
      <svg className="absolute inset-0 z-0 pointer-events-none opacity-20">
        {stars.map((star, i) => {
            if (i === stars.length - 1) return null;
            const nextStar = stars[i+1];
            return (
                <line 
                    key={i}
                    x1={`${star.x}%`} 
                    y1={`${star.y}%`} 
                    x2={`${nextStar.x}%`} 
                    y2={`${nextStar.y}%`} 
                    stroke="white" 
                    strokeWidth="1" 
                    strokeDasharray="5,5"
                />
            )
        })}
      </svg>

      <div className="relative z-10 container mx-auto px-4 py-20 h-screen flex flex-col">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
        >
            <h1 className="text-4xl md:text-6xl font-cinzel text-indigo-200 tracking-widest uppercase flex items-center justify-center gap-4">
                <Moon className="w-8 h-8" />
                {category} Cities
                <Moon className="w-8 h-8" />
            </h1>
            <p className="text-indigo-400/60 mt-4 font-lora italic">Look up, and see the map of the empire.</p>
        </motion.div>

        <div className="flex-1 relative">
          {cities.map((city, index) => {
            const star = stars[index];
            if (!star) return null;

            return (
              <motion.button
                key={city.name}
                className="absolute group flex flex-col items-center justify-center"
                style={{
                  left: `${star.x}%`,
                  top: `${star.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: star.delay, duration: 1 }}
                whileHover={{ scale: 1.2 }}
                onClick={() => setSelectedCity(city)}
              >
                <div className="relative">
                    <motion.div 
                        className="absolute inset-0 bg-indigo-500 rounded-full blur-md"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Star className="w-8 h-8 text-yellow-100 relative z-10 fill-yellow-100/20" />
                </div>
                <span className="mt-2 text-xs md:text-sm font-cinzel text-indigo-200 opacity-0 group-hover:opacity-100 transition-opacity absolute top-full whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                  {city.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="bg-slate-900/90 border-indigo-500/30 text-indigo-100 backdrop-blur-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-cinzel text-center text-indigo-300">{selectedCity?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             <DialogDescription className="text-lg leading-relaxed font-lora text-indigo-100/80 whitespace-pre-line">
                {selectedCity?.description}
             </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
