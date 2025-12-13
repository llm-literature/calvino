'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Droplets } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Armilla({ city }: { city: City }) {
  const { language } = useLanguage()
  return (
    <div className="relative min-h-screen bg-sky-50 text-sky-900 font-sans overflow-hidden selection:bg-sky-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6 text-sky-600" />
      </Link>

      {/* Pipes Background */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <svg width="100%" height="100%">
            <defs>
                <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="50%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#bae6fd" />
                </linearGradient>
            </defs>
            {/* Vertical Pipes */}
            {[10, 25, 40, 60, 75, 90].map((x, i) => (
                <rect key={`v-${i}`} x={`${x}%`} y="0" width="20" height="100%" fill="url(#pipeGradient)" />
            ))}
            {/* Horizontal Pipes */}
            {[20, 45, 70, 85].map((y, i) => (
                <rect key={`h-${i}`} x="0" y={`${y}%`} width="100%" height="20" fill="url(#pipeGradient)" />
            ))}
            {/* Joints */}
            {[10, 25, 40, 60, 75, 90].map((x) => 
                [20, 45, 70, 85].map((y) => (
                    <circle key={`${x}-${y}`} cx={`${x}%`} cy={`${y}%`} r="15" fill="#38bdf8" />
                ))
            )}
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center justify-center min-h-screen">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-3xl bg-white/60 backdrop-blur-xl p-12 rounded-3xl shadow-xl border border-sky-100"
        >
            <div className="flex justify-center mb-6">
                <Droplets className="w-12 h-12 text-sky-500 animate-bounce" />
            </div>
            <h1 className="text-6xl font-thin text-sky-900 mb-6 tracking-tighter">{language === 'en' ? 'ARMILLA' : city.cnName}</h1>
            <p className="text-xl text-sky-700/80 font-light leading-relaxed mb-8">
                {language === 'en' 
                  ? '"It has no walls, no ceilings, no floors: it has nothing that makes it seem a city, except the water pipes that rise vertically where the houses should be..."'
                  : '"它没有墙壁，没有天花板，没有地板：除了那些在房屋本该存在的地方垂直升起的水管，没有任何东西让它看起来像一座城市……"'}
            </p>
            
            <div className="h-px w-full bg-linear-to-r from-transparent via-sky-300 to-transparent my-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left text-sm text-sky-800">
                <div>
                    <h3 className="font-bold mb-2 uppercase tracking-widest text-sky-400">{language === 'en' ? 'Structure' : '结构'}</h3>
                    <p>{language === 'en' ? 'A forest of pipes ending in taps, showers, spouts, overflows.' : '一片由水管组成的森林，末端是水龙头、淋浴喷头、出水口和溢流管。'}</p>
                </div>
                <div>
                    <h3 className="font-bold mb-2 uppercase tracking-widest text-sky-400">{language === 'en' ? 'Inhabitants' : '居民'}</h3>
                    <p>{language === 'en' ? 'Slender forms of young women, nymphs, naiads basking in the bathtubs.' : '年轻女子、仙女和水泽女神的纤细身姿在浴缸中沐浴。'}</p>
                </div>
            </div>
        </motion.div>
      </div>
    </div>
  )
}
