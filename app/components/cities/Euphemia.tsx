'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Flame } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

const MEMORIES_EN = [
  "A wolf that spoke in riddles",
  "My sister's wedding dress",
  "A treasure buried under the third oak",
  "The battle of the red dawn",
  "A cure for the itching scabies",
  "The lover who never returned",
  "The smell of spices in the winter wind",
  "A golden ship sailing on sand",
]

const MEMORIES_CN = [
  "一只说着谜语的狼",
  "我姐姐的婚纱",
  "埋在第三棵橡树下的宝藏",
  "红色黎明的战斗",
  "治疗疥疮的良药",
  "从未归来的爱人",
  "冬风中香料的味道",
  "在沙上航行的金船",
]

const GOODS_EN = [
  "Ginger", "Cotton", "Pistachios", "Poppy Seeds", "Nutmeg", "Raisins", "Golden Muslin"
]

const GOODS_CN = [
  "生姜", "棉花", "开心果", "罂粟籽", "肉豆蔻", "葡萄干", "金色平纹细布"
]

export default function Euphemia({ city }: { city: City }) {
  const [stories, setStories] = useState<{id: number, text: string, x: number, y: number}[]>([])
  const { language } = useLanguage()
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (stories.length > 10) return
      const memories = language === 'en' ? MEMORIES_EN : MEMORIES_CN
      const newStory = {
        id: Date.now(),
        text: memories[Math.floor(Math.random() * memories.length)],
        x: Math.random() * 80 + 10, // 10-90%
        y: Math.random() * 40 + 10, // 10-50%
      }
      setStories(prev => [...prev, newStory])
      
      // Remove story after 5 seconds
      setTimeout(() => {
        setStories(prev => prev.filter(s => s.id !== newStory.id))
      }, 8000)
    }, 2000)
    return () => clearInterval(interval)
  }, [stories.length, language])

  const goods = language === 'en' ? GOODS_EN : GOODS_CN

  return (
    <div className="relative min-h-screen bg-[#0f0a05] text-amber-100 font-serif overflow-hidden selection:bg-amber-900">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full bg-amber-900/20 p-2 transition-colors hover:bg-amber-900/40"
      >
        <ArrowLeft className="h-6 w-6 text-amber-500" />
      </Link>

      {/* Night Sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#1a1008] via-[#0f0a05] to-black" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-24">
        
        {/* Floating Memories */}
        <div className="absolute inset-0 pointer-events-none">
            {stories.map((story) => (
                <motion.div
                    key={story.id}
                    initial={{ opacity: 0, y: 50, scale: 0.8 }}
                    animate={{ opacity: [0, 1, 1, 0], y: -100, scale: 1 }}
                    transition={{ duration: 8, ease: "easeOut" }}
                    className="absolute text-amber-200/60 text-sm italic max-w-50 text-center"
                    style={{ left: `${story.x}%`, bottom: `${story.y + 20}%` }}
                >
                    &quot;{story.text}&quot;
                </motion.div>
            ))}
        </div>

        {/* The Fire */}
        <div className="relative mb-12">
            <div className="absolute -inset-4 bg-orange-500/20 blur-3xl rounded-full animate-pulse" />
            <Flame className="w-24 h-24 text-orange-500 animate-bounce" style={{ animationDuration: '3s' }} />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-orange-900/50 blur-xl" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-amber-500 mb-4 tracking-widest uppercase">Euphemia</h1>
        <p className="text-amber-800 uppercase tracking-[0.2em] text-sm mb-12">{language === 'en' ? 'City of Exchanged Memories' : '交换记忆之城'}</p>

        <div className="max-w-2xl px-8 text-center leading-relaxed text-amber-200/80 space-y-6">
            <p>
                {language === 'en' ? '"You do not come to Euphemia only to buy and sell, but also because at night, by the fires all around the market..."' : '“你来欧菲米亚不只是为了买卖，还因为在晚上，在市场周围的篝火旁……”'}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-amber-700 uppercase tracking-widest mt-8 border-t border-amber-900/30 pt-8">
                {goods.map((good, i) => (
                    <div key={i} className="p-2 border border-amber-900/20 rounded hover:bg-amber-900/10 transition-colors cursor-help" title={language === 'en' ? "Trade for a memory" : "交换记忆"}>
                        {good}
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  )
}
