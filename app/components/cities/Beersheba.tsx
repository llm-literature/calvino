'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Beersheba({ city }: { city: City }) {
  const { language } = useLanguage()
  const [split, setSplit] = useState(50)

  return (
    <div className="relative min-h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden selection:bg-amber-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/10 p-2 backdrop-blur transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="absolute inset-0 flex flex-col">
        
        {/* Celestial Beersheba (Top) */}
        <div 
            className="relative w-full bg-indigo-950 overflow-hidden border-b-4 border-amber-500/50"
            style={{ height: `${split}%` }}
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-6xl font-serif text-amber-200 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] mb-4">{language === 'en' ? 'BEERSHEBA' : city.cnName}</h1>
                    <p className="text-amber-100/60 tracking-widest uppercase text-sm">{language === 'en' ? 'The Celestial Projection' : '天上的投影'}</p>
                </div>
            </div>
            
            {/* Stars and Geometry */}
            {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute text-amber-100/30"
                    style={{ 
                        left: `${(i * 17) % 100}%`, 
                        top: `${(i * 23) % 100}%`,
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3 + (i % 3), repeat: Infinity }}
                >
                    <Star className="w-4 h-4" />
                </motion.div>
            ))}
            
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-amber-500/20 to-transparent" />
        </div>

        {/* Divider */}
        <div 
            className="h-2 bg-amber-500 cursor-row-resize z-50 hover:h-4 transition-all flex items-center justify-center"
            onMouseDown={() => {
                const handleMouseMove = (e: MouseEvent) => {
                    const newSplit = (e.clientY / window.innerHeight) * 100
                    setSplit(Math.min(Math.max(newSplit, 10), 90))
                }
                const handleMouseUp = () => {
                    window.removeEventListener('mousemove', handleMouseMove)
                    window.removeEventListener('mouseup', handleMouseUp)
                }
                window.addEventListener('mousemove', handleMouseMove)
                window.addEventListener('mouseup', handleMouseUp)
            }}
        >
            <div className="w-12 h-1 bg-white/50 rounded-full" />
        </div>

        {/* Infernal Beersheba (Bottom) */}
        <div 
            className="relative w-full bg-stone-900 overflow-hidden flex-1"
        >
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center opacity-50">
                    <h1 className="text-6xl font-serif text-stone-600 mb-4 line-through decoration-stone-800">{language === 'en' ? 'BEERSHEBA' : city.cnName}</h1>
                    <p className="text-stone-500 tracking-widest uppercase text-sm">{language === 'en' ? 'The Accumulation' : '堆积物'}</p>
                </div>
            </div>

            {/* Trash */}
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute text-stone-700"
                    style={{ 
                        left: `${(i * 13) % 100}%`, 
                        top: `${(i * 19) % 100}%`,
                        transform: `rotate(${(i * 45)}deg)`
                    }}
                >
                    <Trash2 className="w-6 h-6" />
                </div>
            ))}
        </div>

      </div>

      <div className="fixed bottom-8 right-8 max-w-sm text-right text-xs text-slate-500 pointer-events-none">
        {language === 'en' 
          ? 'Beersheba projects a celestial city in the sky, believing it to be its true self, while unaware that its true nature is the pile of refuse it expels.'
          : '别尔谢巴在天空中投射出一座天上的城市，相信那是它真实的自我，却不知道它真实的本质是它排出的垃圾堆。'}
      </div>
    </div>
  )
}
