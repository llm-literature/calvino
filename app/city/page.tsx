'use client'

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import data from '@/public/city/data.json';
import { getCityTheme } from '@/lib/themes';
import { cn } from "@/lib/utils";
import { Sparkles, Wind, Eye, Scroll, Map, Box, Cloud, Activity, Ghost, Lock } from 'lucide-react';

// Map icons to city types
const TYPE_ICONS: Record<string, any> = {
  memory: Scroll,
  desire: Sparkles,
  signs: Map,
  thin: Wind,
  trading: Box,
  eyes: Eye,
  names: Activity,
  dead: Ghost,
  sky: Cloud,
  continuous: Activity,
  hidden: Lock,
};

// Helper to extract hex color from Tailwind class "bg-[#...]"
const getBgColor = (bgClass: string) => {
  const match = bgClass.match(/bg-\[(#[0-9A-Fa-f]+)\]/);
  return match ? match[1] : '#000000';
};

export default function CityCategoriesPage() {
  const [activeType, setActiveType] = useState<string | null>(null);
  
  // Extract unique city types
  const cityTypes = useMemo(() => {
    const types = new Set(data.cities.map(city => city.type));
    return Array.from(types).sort();
  }, []);

  // Default background color
  const defaultBg = '#0c0a09'; // stone-950

  // Get current background color based on active type
  const currentBg = activeType 
    ? getBgColor(getCityTheme(activeType).colors.bg) 
    : defaultBg;

  return (
    <motion.div 
      className="min-h-screen w-full overflow-hidden relative transition-colors duration-700 ease-in-out"
      animate={{ backgroundColor: currentBg }}
      initial={{ backgroundColor: defaultBg }}
    >
      {/* Ambient Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      
      {/* Header */}
      <div className="absolute top-0 left-0 w-full p-8 z-20 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          <Link href="/" className="text-2xl font-display font-bold mix-blend-difference text-white opacity-80 hover:opacity-100 transition-opacity">
            INVISIBLE CITIES
          </Link>
        </div>
        <div className="text-right mix-blend-difference text-white hidden md:block">
          <p className="font-serif italic text-sm opacity-60">"The catalog of forms is endless..."</p>
        </div>
      </div>

      {/* Main Content - Horizontal Accordion */}
      <div className="h-screen w-full flex flex-col md:flex-row items-stretch justify-center overflow-y-auto md:overflow-hidden">
        {cityTypes.map((type, index) => {
          const theme = getCityTheme(type);
          const isActive = activeType === type;
          const Icon = TYPE_ICONS[type] || Sparkles;
          
          return (
            <motion.div
              key={type}
              layout
              onHoverStart={() => setActiveType(type)}
              onHoverEnd={() => setActiveType(null)}
              onClick={() => setActiveType(isActive ? null : type)} // For mobile tap
              className={cn(
                "relative flex-shrink-0 cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/10",
                "flex flex-col md:flex-row items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
                isActive ? "flex-[3] md:flex-[4]" : "flex-[1]"
              )}
              style={{
                minHeight: '100px', // Mobile min height
              }}
            >
              {/* Link Overlay for Navigation when Active */}
              {isActive && (
                <Link href={`/city/${type}`} className="absolute inset-0 z-50" aria-label={`Explore ${theme.label}`} />
              )}

              {/* Background Overlay for inactive state */}
              <div className={cn(
                "absolute inset-0 transition-opacity duration-500",
                isActive ? "opacity-100" : "opacity-0"
              )}>
                 <div className={cn("absolute inset-0 opacity-20", theme.colors.bg)} />
              </div>

              {/* Content Container */}
              <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
                
                {/* Vertical Title (Collapsed State) */}
                <div className={cn(
                  "absolute md:static flex items-center justify-center transition-all duration-500",
                  isActive ? "opacity-0 pointer-events-none scale-90" : "opacity-100 scale-100"
                )}>
                  <div className="flex flex-row md:flex-col items-center gap-4">
                    <Icon className={cn("w-6 h-6 md:w-8 md:h-8 opacity-70", isActive ? theme.colors.text : "text-white/50")} />
                    <h2 className="font-display text-xl md:text-2xl tracking-widest uppercase md:[writing-mode:vertical-rl] text-white/70 whitespace-nowrap">
                      {theme.label}
                    </h2>
                  </div>
                </div>

                {/* Expanded Content */}
                <div className={cn(
                  "absolute inset-0 flex flex-col items-center justify-center text-center p-8 transition-all duration-500 delay-100",
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
                )}>
                  <motion.div
                    initial={false}
                    animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="max-w-lg flex flex-col items-center"
                  >
                    <motion.div 
                        animate={{ rotate: isActive ? 360 : 0 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className={cn("mb-6 inline-block p-4 rounded-full bg-white/10 backdrop-blur-sm", theme.colors.text)}
                    >
                      <Icon className="w-12 h-12" />
                    </motion.div>
                    
                    <h2 className={cn("text-5xl md:text-7xl font-display font-bold mb-4", theme.colors.text)}>
                      {theme.label}
                    </h2>
                    
                    <p className={cn("font-serif text-lg md:text-xl italic mb-12 max-w-md mx-auto opacity-80", theme.colors.text)}>
                      {type.toUpperCase()}
                    </p>

                    {/* Creative "Enter" Cue */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className={cn("flex flex-col items-center gap-2", theme.colors.text)}
                    >
                        <span className="text-[10px] tracking-[0.5em] uppercase opacity-60">Tap to Enter</span>
                        <motion.div 
                            animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className={cn("w-px bg-current opacity-50")}
                        />
                    </motion.div>

                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
