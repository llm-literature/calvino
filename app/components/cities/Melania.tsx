'use client'

import { City } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import { useState, useEffect } from 'react'

import { useLanguage } from '@/app/context/LanguageContext'

const ROLES_EN = [
  { name: 'The Braggart Soldier', color: 'bg-red-200 text-red-900' },
  { name: 'The Parasite', color: 'bg-green-200 text-green-900' },
  { name: 'The Young Lover', color: 'bg-pink-200 text-pink-900' },
  { name: 'The Prostitute', color: 'bg-purple-200 text-purple-900' },
  { name: 'The Miser Father', color: 'bg-yellow-200 text-yellow-900' },
  { name: 'The Hypocrite', color: 'bg-gray-200 text-gray-900' },
]

const ROLES_CN = [
  { name: '吹牛的士兵', color: 'bg-red-200 text-red-900' },
  { name: '寄生虫', color: 'bg-green-200 text-green-900' },
  { name: '年轻的恋人', color: 'bg-pink-200 text-pink-900' },
  { name: '妓女', color: 'bg-purple-200 text-purple-900' },
  { name: '吝啬的父亲', color: 'bg-yellow-200 text-yellow-900' },
  { name: '伪君子', color: 'bg-gray-200 text-gray-900' },
]

export default function Melania({ city }: { city: City }) {
  const { language } = useLanguage()
  const roles = language === 'en' ? ROLES_EN : ROLES_CN
  const [actors, setActors] = useState(roles.map((role, i) => ({ ...role, id: i })))
  const [generation, setGeneration] = useState(1)

  // Update actors when language changes
  useEffect(() => {
    setActors(prev => prev.map((actor, i) => ({
      ...actor,
      name: roles[i].name
    })))
  }, [language, roles])

  useEffect(() => {
    const interval = setInterval(() => {
        setActors(prev => {
            // One actor dies/leaves and is replaced by a new one in the same role
            const indexToReplace = Math.floor(Math.random() * prev.length)
            const newActors = [...prev]
            newActors[indexToReplace] = {
                ...prev[indexToReplace],
                id: Date.now() // New ID triggers animation
            }
            return newActors
        })
        setGeneration(g => g + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative min-h-screen bg-neutral-50 text-neutral-900 font-sans overflow-hidden selection:bg-neutral-200">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-neutral-100"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-12">
            <h1 className="text-6xl font-serif mb-4">MELANIA</h1>
            <p className="text-neutral-500 uppercase tracking-widest">
                {language === 'en' ? 'Generation' : '世代'} {generation}
            </p>
        </div>

        {/* The Stage */}
        <div className="relative w-full max-w-5xl h-125 bg-white rounded-3xl shadow-2xl border border-neutral-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-neutral-50 to-neutral-200 opacity-50" />
            
            <div className="grid grid-cols-3 gap-8 z-10 w-full px-12">
                <AnimatePresence mode='popLayout'>
                    {actors.map((actor) => (
                        <motion.div
                            key={actor.id} // Key change triggers exit/enter
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className={`p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center aspect-square ${actor.color}`}
                        >
                            <Users className="w-8 h-8 mb-4 opacity-50" />
                            <h3 className="font-bold text-lg mb-2">{actor.name}</h3>
                            <p className="text-xs opacity-70 italic">
                                {language === 'en' ? '"The dialogue continues..."' : '“对话在继续……”'}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>

        <div className="mt-12 max-w-2xl text-center text-neutral-500 italic">
            {language === 'en'
                ? '"The interlocutors die one by one and meanwhile those who will take their place in the dialogue are born... The population of Melania renews itself."'
                : '“对话者一个个死去，与此同时，那些将取代他们进行对话的人出生了……梅拉尼亚的人口在自我更新。”'}
        </div>
      </div>
    </div>
  )
}
