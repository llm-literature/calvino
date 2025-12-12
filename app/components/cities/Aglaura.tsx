'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Aglaura({ city }: { city: City }) {
  const [floatingTexts, setFloatingTexts] = useState<Array<{
    text: string;
    x: string;
    y: string;
    animX: string[];
    animY: string[];
    duration: number;
  }>>([])

  useEffect(() => {
    const texts = [
        "The Legendary City", "Ancient Virtues", "Glorious History", "Divine Order", 
        "Eternal Beauty", "Sacred Walls", "Golden Towers", "Heroic Deeds"
    ]
    
    setFloatingTexts(texts.map(text => ({
        text,
        x: Math.random() * 100 - 50 + "%",
        y: Math.random() * 100 - 50 + "%",
        animX: [
            `${Math.random() * 80 + 10}%`, 
            `${Math.random() * 80 + 10}%`,
            `${Math.random() * 80 + 10}%`
        ],
        animY: [
            `${Math.random() * 80 + 10}%`, 
            `${Math.random() * 80 + 10}%`,
            `${Math.random() * 80 + 10}%`
        ],
        duration: 10 + Math.random() * 10
    })))
  }, [])

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden selection:bg-gray-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-black/5 p-2 transition-colors hover:bg-black/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 flex items-center justify-center min-h-screen relative">
        
        {/* The Reality (Center, Dull) */}
        <div className="relative z-10 w-64 h-64 bg-gray-200 border border-gray-300 flex items-center justify-center text-center p-4 grayscale">
            <div className="space-y-2">
                <div className="w-12 h-12 bg-gray-300 mx-auto" />
                <h2 className="text-sm font-mono text-gray-500">AGLAURA</h2>
                <p className="text-[10px] text-gray-400">Colorless. Characterless. Random.</p>
            </div>
        </div>

        {/* The Legend (Surrounding, Vibrant) */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {floatingTexts.map((item, i) => (
                <motion.div
                    key={i}
                    initial={{ 
                        x: item.x, 
                        y: item.y,
                        opacity: 0 
                    }}
                    animate={{ 
                        x: item.animX,
                        y: item.animY,
                        opacity: [0.5, 1, 0.5],
                        scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                        duration: item.duration, 
                        repeat: Infinity, 
                        ease: "linear"
                    }}
                    className="absolute text-4xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-pink-600 opacity-50 blur-[1px]"
                    style={{
                        top: 0,
                        left: 0
                    }}
                >
                    {item.text}
                </motion.div>
            ))}
        </div>

        <div className="absolute bottom-12 max-w-2xl text-center text-gray-500 italic z-20">
            &quot;The city that they speak of has much of what is needed to exist, whereas the city that exists on its own site, exists less.&quot;
        </div>
      </div>
    </div>
  )
}
