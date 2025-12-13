'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Moon, Footprints, Lock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Zobeide({ city }: { city: City }) {
  const { language } = useLanguage()
  const [walls, setWalls] = useState<{x: number, y: number, rot: number, moveX: number, moveY: number}[]>([])
  const [dreamMode, setDreamMode] = useState(true)

  useEffect(() => {
    // Generate the "Trap" walls
    const newWalls = []
    for (let i = 0; i < 30; i++) {
        newWalls.push({
            x: Math.random() * 100,
            y: Math.random() * 100,
            rot: Math.random() * 360,
            moveX: (Math.random() - 0.5) * 500,
            moveY: (Math.random() - 0.5) * 500
        })
    }
    setWalls(newWalls)
  }, [])

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-200 font-serif overflow-hidden selection:bg-indigo-900">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      {/* The Moon */}
      <div className="fixed top-12 right-12 z-0">
        <motion.div 
            animate={{ 
                boxShadow: dreamMode 
                    ? "0 0 100px rgba(255,255,255,0.5)" 
                    : "0 0 20px rgba(255,255,255,0.1)" 
            }}
            className="rounded-full bg-slate-100 w-32 h-32 relative"
        >
            <div className="absolute inset-0 bg-slate-200 rounded-full opacity-20" />
        </motion.div>
      </div>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center relative z-10">
        
        <div className="text-center mb-12">
            <h1 className="text-7xl font-bold mb-4 tracking-widest text-slate-100">ZOBEIDE</h1>
            <p className="text-slate-400 uppercase tracking-[0.5em] text-sm">
                {language === 'en' ? 'The White City' : '白色之城'}
            </p>
        </div>

        <div className="relative w-full max-w-4xl h-[60vh] border border-slate-800 rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-sm shadow-2xl">
            
            {/* The Dream / Chase */}
            <div className="absolute inset-0 flex items-center justify-center">
                {dreamMode ? (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-2xl italic text-indigo-200 mb-8 max-w-lg mx-auto leading-relaxed">
                            {language === 'en' 
                                ? '"They saw a woman running at night through an unknown city... they dreamed they were following her."'
                                : '“他们看到一个女人在夜里穿过一座陌生的城市……他们梦见自己在追逐她。”'}
                        </p>
                        <motion.div 
                            animate={{ x: [0, 100, 0, -100, 0], y: [0, -50, 0, 50, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="inline-block"
                        >
                            <Footprints className="w-12 h-12 text-indigo-400 opacity-50 rotate-90" />
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <Lock className="w-24 h-24 text-slate-600 mx-auto mb-4" />
                        <p className="text-xl text-slate-500 max-w-lg mx-auto">
                            {language === 'en'
                                ? '"So she would be unable to escape again."'
                                : '“这样她就再也无法逃脱了。”'}
                        </p>
                    </motion.div>
                )}
            </div>

            {/* The Walls (The Trap) */}
            {walls.map((wall, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-slate-800/30 border border-slate-700"
                    style={{
                        left: `${wall.x}%`,
                        top: `${wall.y}%`,
                        width: '100px',
                        height: '10px',
                        rotate: wall.rot
                    }}
                    animate={{ 
                        opacity: dreamMode ? 0 : 1,
                        scale: dreamMode ? 0 : 1,
                        x: dreamMode ? wall.moveX : 0,
                        y: dreamMode ? wall.moveY : 0
                    }}
                    transition={{ duration: 1.5, delay: i * 0.02 }}
                />
            ))}

            {/* Toggle Button */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                <button
                    onClick={() => setDreamMode(!dreamMode)}
                    className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-all shadow-lg hover:shadow-indigo-500/25"
                >
                    {dreamMode ? <Moon className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>
                        {language === 'en' 
                            ? (dreamMode ? 'Wake Up' : 'Dream Again') 
                            : (dreamMode ? '醒来' : '再次入梦')}
                    </span>
                </button>
            </div>

        </div>
      </div>
    </div>
  )
}
