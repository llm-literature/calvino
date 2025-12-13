'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Clock,
  Scissors,
  Droplets,
  Telescope,
  Store,
  Crown,
  Bath,
  Coffee,
  Anchor,
  Hexagon,
  ShieldAlert,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

const MEMORY_POINTS_EN = [
  { id: 1, icon: Clock, label: 'Copper Clock', desc: 'Marks the time that does not pass.' },
  { id: 2, icon: Scissors, label: "Barber's Awning", desc: 'Striped, shielding the gossip.' },
  { id: 3, icon: Droplets, label: 'Nine Spouts', desc: 'Water flowing eternally.' },
  { id: 4, icon: Telescope, label: "Astronomer's Tower", desc: 'Glass tower watching the stars.' },
  { id: 5, icon: Store, label: 'Melon Kiosk', desc: 'Sweetness preserved in amber.' },
  { id: 6, icon: Crown, label: 'Hermit & Lion', desc: 'Statue of an unlikely friendship.' },
  { id: 7, icon: Bath, label: 'Turkish Bath', desc: 'Steam that never dissipates.' },
  { id: 8, icon: Coffee, label: 'Corner Café', desc: 'Where the conversation is frozen.' },
  { id: 9, icon: Anchor, label: 'Harbor Alley', desc: 'Leading to ships that never sail.' },
]

const MEMORY_POINTS_CN = [
  { id: 1, icon: Clock, label: '铜钟', desc: '标记着不会流逝的时间。' },
  { id: 2, icon: Scissors, label: '理发店的遮阳篷', desc: '条纹状，遮挡着流言蜚语。' },
  { id: 3, icon: Droplets, label: '九个喷口', desc: '水流永恒。' },
  { id: 4, icon: Telescope, label: '天文学家的塔', desc: '玻璃塔观测着星星。' },
  { id: 5, icon: Store, label: '瓜果摊', desc: '甜蜜保存在琥珀中。' },
  { id: 6, icon: Crown, label: '隐士与狮子', desc: '一段不可能的友谊的雕像。' },
  { id: 7, icon: Bath, label: '土耳其浴室', desc: '永不消散的蒸汽。' },
  { id: 8, icon: Coffee, label: '街角咖啡馆', desc: '对话凝固的地方。' },
  { id: 9, icon: Anchor, label: '港口小巷', desc: '通向从未起航的船只。' },
]

export default function Zora() {
  const { language } = useLanguage()
  const [isWithering, setIsWithering] = useState(false)
  const memoryPoints = language === 'en' ? MEMORY_POINTS_EN : MEMORY_POINTS_CN

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 p-8 font-serif text-slate-100">
      {/* Background Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold tracking-widest text-amber-100">ZORA</h1>
          <p className="text-xl text-slate-400 italic">
            {language === 'en'
              ? 'The city that no one can forget, for she never changes.'
              : '一座没人能忘记的城市，因为她从未改变。'}
          </p>
        </header>

        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {memoryPoints.map((point, index) => (
            <motion.div
              key={point.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isWithering ? 0.1 : 1,
                scale: isWithering ? 0.95 : 1,
                filter: isWithering ? 'blur(4px)' : 'blur(0px)',
              }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group relative aspect-square"
            >
              <div className="absolute inset-0 rotate-45 transform border border-slate-700 bg-slate-800/50 transition-transform duration-500 group-hover:rotate-0"></div>
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <point.icon className="mb-4 h-12 w-12 text-amber-400/80 transition-colors group-hover:text-amber-300" />
                <h3 className="mb-2 text-lg font-semibold text-slate-200">{point.label}</h3>
                <p className="text-sm text-slate-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {point.desc}
                </p>
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-600"></div>
              <div className="absolute bottom-0 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-slate-600"></div>
              <div className="absolute top-1/2 left-0 h-2 w-2 -translate-y-1/2 rounded-full bg-slate-600"></div>
              <div className="absolute top-1/2 right-0 h-2 w-2 -translate-y-1/2 rounded-full bg-slate-600"></div>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto max-w-2xl space-y-6 text-center">
          <p className="text-lg leading-relaxed text-slate-300">
            {language === 'en'
              ? '"This city which cannot be expunged from the mind is like an armature, a honeycomb in whose cells each of us can place the things he wants to remember..."'
              : '“这座无法从脑海中抹去的城市就像一个支架，一个蜂巢，我们每个人都可以在其中的蜂房里放置他想要记住的东西……”'}
          </p>

          <div className="rounded-lg border border-amber-900/30 bg-amber-950/10 p-6">
            <p className="mb-4 text-sm text-amber-200/80">
              {language === 'en'
                ? 'But in order to be more easily remembered, Zora has languished, disintegrated, and disappeared. The earth has forgotten her.'
                : '但为了更容易被记住，佐拉已经枯萎、瓦解并消失了。大地已经忘记了她。'}
            </p>
            <button
              onClick={() => setIsWithering(!isWithering)}
              className={cn(
                'mx-auto flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-all duration-700',
                isWithering
                  ? 'bg-slate-800 text-slate-500 hover:bg-slate-700'
                  : 'bg-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:bg-amber-700'
              )}
            >
              {isWithering ? (
                <>
                  <Hexagon className="h-4 w-4" /> {language === 'en' ? 'Restore Memory' : '恢复记忆'}
                </>
              ) : (
                <>
                  <ShieldAlert className="h-4 w-4" /> {language === 'en' ? 'Force Motionlessness' : '强制静止'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
