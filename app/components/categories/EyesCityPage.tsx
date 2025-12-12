'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { City } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface EyesCityPageProps {
  cities: City[];
  category: string;
}

export default function EyesCityPage({ cities, category }: EyesCityPageProps) {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  
  // Mouse tracking for "eyes" effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 relative overflow-hidden font-serif selection:bg-emerald-500/30">
      <div className="container mx-auto px-4 py-20">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl md:text-6xl font-cinzel text-emerald-200 tracking-widest uppercase flex items-center justify-center gap-4">
                <Eye className="w-8 h-8" />
                {category} Cities
                <Eye className="w-8 h-8" />
            </h1>
            <p className="text-emerald-400/60 mt-4 font-lora italic">The city looks at you as you look at it.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cities.map((city, index) => (
            <EyeCard key={city.name} city={city} mouseX={mouseX} mouseY={mouseY} onSelect={() => setSelectedCity(city)} />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedCity} onOpenChange={() => setSelectedCity(null)}>
        <DialogContent className="bg-zinc-900/95 border-emerald-500/30 text-zinc-100 backdrop-blur-xl max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-cinzel text-center text-emerald-300">{selectedCity?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
             <DialogDescription className="text-lg leading-relaxed font-lora text-zinc-300 whitespace-pre-line">
                {selectedCity?.description}
             </DialogDescription>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EyeCard({ city, mouseX, mouseY, onSelect }: { city: City, mouseX: any, mouseY: any, onSelect: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [angle, setAngle] = useState(0);

    // Update angle periodically or on mouse move via a simpler effect for the rotation
    useEffect(() => {
        const updateAngle = () => {
            if (!cardRef.current) return;
            const rect = cardRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rad = Math.atan2(mouseY.get() - centerY, mouseX.get() - centerX);
            setAngle(rad * (180 / Math.PI));
        };
        
        const unsubscribe = mouseX.on("change", updateAngle);
        return () => unsubscribe();
    }, [mouseX, mouseY]);

    return (
        <motion.div
            ref={cardRef}
            className="relative h-64 bg-zinc-800 rounded-full border-4 border-zinc-700 overflow-hidden cursor-pointer group shadow-xl shadow-black/50"
            whileHover={{ scale: 1.05, borderColor: '#34d399' }} // emerald-400
            onClick={onSelect}
        >
            {/* Sclera */}
            <div className="absolute inset-0 bg-zinc-200 rounded-full shadow-inner" />
            
            {/* Iris Area - Rotates to look at cursor */}
            <div 
                className="absolute inset-0 flex items-center justify-center transition-transform duration-100 ease-out"
                style={{ transform: `rotate(${angle}deg)` }}
            >
                {/* The Pupil/Iris moves slightly towards the edge */}
                <div className="w-32 h-32 bg-emerald-900 rounded-full flex items-center justify-center translate-x-8 shadow-lg border-4 border-emerald-700 relative overflow-hidden">
                    {/* Reflection highlight */}
                    <div className="absolute top-4 left-4 w-8 h-4 bg-white/40 rounded-full -rotate-45 blur-sm" />
                    
                    {/* City Name inside the pupil */}
                    <div 
                        className="text-emerald-100 font-cinzel text-xs text-center px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ transform: `rotate(${-angle}deg)` }} // Counter-rotate text
                    >
                        {city.name}
                    </div>
                </div>
            </div>

            {/* Eyelids (optional, for blinking effect?) */}
            <motion.div 
                className="absolute inset-x-0 top-0 bg-zinc-900 z-10"
                initial={{ height: "0%" }}
                whileHover={{ height: "10%" }}
            />
            <motion.div 
                className="absolute inset-x-0 bottom-0 bg-zinc-900 z-10"
                initial={{ height: "0%" }}
                whileHover={{ height: "10%" }}
            />
        </motion.div>
    )
}
