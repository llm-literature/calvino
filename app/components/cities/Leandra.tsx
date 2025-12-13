'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

import { useLanguage } from '@/app/context/LanguageContext'

export default function Leandra({ city }: { city: City }) {
  const { language } = useLanguage()
  const [activeRoom, setActiveRoom] = useState<string | null>(null)

  const rooms = [
    { id: 'kitchen', name: language === 'en' ? 'Kitchen' : '厨房', x: '10%', y: '60%', w: '30%', h: '30%', color: 'bg-orange-100' },
    { id: 'living', name: language === 'en' ? 'Living Room' : '客厅', x: '45%', y: '60%', w: '45%', h: '30%', color: 'bg-blue-100' },
    { id: 'bedroom', name: language === 'en' ? 'Bedroom' : '卧室', x: '10%', y: '20%', w: '40%', h: '35%', color: 'bg-purple-100' },
    { id: 'attic', name: language === 'en' ? 'Attic' : '阁楼', x: '55%', y: '20%', w: '35%', h: '35%', color: 'bg-amber-100' },
  ]

  const [dialogues, setDialogues] = useState<{id: number, text: string, x: number, y: number}[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
        if (Math.random() > 0.7) {
            const texts = language === 'en' ? [
                "They ruined the wallpaper!",
                "The great-grandfather would be ashamed.",
                "This new family is too loud.",
                "I remember when this was a nursery.",
                "The soup lacks salt.",
                "Did you see who she brought home?",
                "They'll be gone in a year.",
                "We are the true owners here."
            ] : [
                "他们毁了壁纸！",
                "曾祖父会感到羞耻的。",
                "这新的一家人太吵了。",
                "我记得这里曾经是育儿室。",
                "汤里缺盐。",
                "你看到她带谁回家了吗？",
                "他们一年内就会离开。",
                "我们才是这里真正的主人。"
            ]
            const newDialogue = {
                id: Date.now(),
                text: texts[Math.floor(Math.random() * texts.length)],
                x: Math.random() * 80 + 10,
                y: Math.random() * 80 + 10
            }
            setDialogues(prev => [...prev.slice(-5), newDialogue])
        }
    }, 2000)
    return () => clearInterval(interval)
  }, [language])

  return (
    <div className="relative min-h-screen bg-stone-900 text-stone-100 font-sans overflow-hidden selection:bg-stone-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-5xl font-serif mb-12 text-stone-300">LEANDRA</h1>

        {/* House Cross-section */}
        <div className="relative w-full max-w-4xl aspect-video bg-stone-800 rounded-xl border-4 border-stone-700 shadow-2xl overflow-hidden">
            {/* Rooms */}
            {rooms.map(room => (
                <div
                    key={room.id}
                    className={cn(
                        "absolute border-2 border-stone-600 transition-all duration-500 hover:brightness-110 cursor-pointer",
                        room.color,
                        activeRoom === room.id ? "opacity-100" : "opacity-30 hover:opacity-50"
                    )}
                    style={{ left: room.x, top: room.y, width: room.w, height: room.h }}
                    onMouseEnter={() => setActiveRoom(room.id)}
                    onMouseLeave={() => setActiveRoom(null)}
                >
                    <span className="absolute top-2 left-2 text-xs font-bold uppercase text-stone-800 opacity-50">{room.name}</span>
                    
                    {/* Penates & Lares (Spirits) */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4">
                        <motion.div 
                            animate={{ y: [0, -5, 0] }} 
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-8 h-12 bg-yellow-400/50 rounded-full blur-md" 
                        />
                        <motion.div 
                            animate={{ y: [0, 5, 0] }} 
                            transition={{ duration: 3, repeat: Infinity }}
                            className="w-6 h-10 bg-blue-400/50 rounded-full blur-md" 
                        />
                    </div>
                </div>
            ))}

            {/* Dialogues Overlay */}
            <div className="absolute inset-0 pointer-events-none">
                {dialogues.map(d => (
                    <motion.div
                        key={d.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bg-white text-black text-xs p-2 rounded-lg shadow-lg max-w-40 z-50"
                        style={{ left: `${d.x}%`, top: `${d.y}%` }}
                    >
                        <MessageCircle className="w-3 h-3 mb-1 text-stone-400" />
                        {d.text}
                    </motion.div>
                ))}
            </div>
        </div>

        <div className="mt-12 max-w-2xl text-center text-stone-500 italic">
            &quot;The true essence of Leandra is the subject of endless debate. The Penates and Lares argue... they are the city&apos;s true owners.&quot;
        </div>
      </div>
    </div>
  )
}
