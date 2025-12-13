'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, X, Box, Layers, Grid, Hexagon, ArrowLeft } from 'lucide-react'
import { City } from '@/lib/types'
import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'

const POSSIBLE_CITIES_EN = [
  {
    id: 1,
    icon: Box,
    title: 'The Cube City',
    desc: 'A city of perfect geometric order, where every street is a straight line and every building a cube.',
  },
  {
    id: 2,
    icon: Layers,
    title: 'The Layered City',
    desc: 'Built in strata, where the rich live in the clouds and the poor in the roots.',
  },
  {
    id: 3,
    icon: Grid,
    title: 'The Matrix City',
    desc: 'A city of pure information, existing only as light pulses in a crystal lattice.',
  },
  {
    id: 4,
    icon: Hexagon,
    title: 'The Hive City',
    desc: 'Organic and communal, where individual homes merge into a single living organism.',
  },
  {
    id: 5,
    icon: Globe,
    title: 'The Floating City',
    desc: 'Suspended by balloons, drifting with the winds of change.',
  },
  {
    id: 6,
    icon: Box,
    title: 'The Glass City',
    desc: 'Transparent walls ensuring no secrets can be kept from the neighbors.',
  },
]

const POSSIBLE_CITIES_CN = [
  {
    id: 1,
    icon: Box,
    title: '立方体之城',
    desc: '一座拥有完美几何秩序的城市，每条街道都是直线，每座建筑都是立方体。',
  },
  {
    id: 2,
    icon: Layers,
    title: '分层之城',
    desc: '分层建造，富人住在云端，穷人住在根部。',
  },
  {
    id: 3,
    icon: Grid,
    title: '矩阵之城',
    desc: '一座纯信息的城市，仅作为晶格中的光脉冲存在。',
  },
  {
    id: 4,
    icon: Hexagon,
    title: '蜂巢之城',
    desc: '有机且共享，个体家庭融合成一个单一的生命体。',
  },
  {
    id: 5,
    icon: Globe,
    title: '漂浮之城',
    desc: '由气球悬挂，随风漂流。',
  },
  {
    id: 6,
    icon: Box,
    title: '玻璃之城',
    desc: '透明的墙壁确保邻居之间没有秘密。',
  },
]

export default function Fedora({ city }: { city: City }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const { language } = useLanguage()
  const possibleCities = language === 'en' ? POSSIBLE_CITIES_EN : POSSIBLE_CITIES_CN

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 p-8 font-sans text-slate-200">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full bg-white/10 p-2 transition-colors hover:bg-white/20"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[40px_40px] opacity-20"></div>

      <header className="relative z-10 mb-16 pt-8 text-center">
        <h1 className="mb-4 text-5xl font-thin tracking-[0.5em] text-blue-200">FEDORA</h1>
        <p className="text-sm tracking-widest text-blue-400/60 uppercase">
          {language === 'en' ? 'The Museum of Possibilities' : '可能性博物馆'}
        </p>
      </header>

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3">
        {possibleCities.map((city) => (
          <motion.div
            key={city.id}
            layoutId={`card-${city.id}`}
            onClick={() => setSelectedId(city.id)}
            className="group flex cursor-pointer flex-col items-center"
          >
            {/* The Sphere */}
            <div className="relative mb-6 h-40 w-40 transition-transform duration-500 group-hover:scale-110">
              <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-xl transition-colors group-hover:bg-blue-400/20"></div>
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-full border border-blue-500/30 bg-linear-to-br from-blue-500/10 to-transparent shadow-[0_0_30px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                <city.icon className="h-16 w-16 text-blue-300/50 transition-colors group-hover:text-blue-200" />

                {/* Internal Reflections */}
                <div className="absolute top-4 left-6 h-4 w-8 -rotate-45 rounded-full bg-white/20 blur-md"></div>
                <div className="absolute right-6 bottom-4 h-12 w-12 rounded-full bg-blue-400/10 blur-xl"></div>
              </div>
            </div>

            <h3 className="text-lg font-light text-blue-100/80 transition-colors group-hover:text-white">
              {language === 'en' ? `Model #${city.id}` : `模型 #${city.id}`}
            </h3>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md">
            <motion.div
              layoutId={`card-${selectedId}`}
              className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-blue-500/30 bg-slate-900 p-8 shadow-[0_0_50px_rgba(59,130,246,0.15)]"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedId(null)
                }}
                className="absolute top-4 right-4 z-20 p-2 text-blue-400 transition-colors hover:text-white"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Background Glow */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl"></div>

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-xl border border-blue-800 bg-blue-950 p-4">
                    {React.createElement(
                      possibleCities.find((c) => c.id === selectedId)?.icon || Box,
                      { className: 'w-8 h-8 text-blue-400' }
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {possibleCities.find((c) => c.id === selectedId)?.title}
                    </h2>
                    <span className="text-xs tracking-wider text-blue-500 uppercase">
                      {language === 'en' ? 'Ideal Form' : '理想形态'}
                    </span>
                  </div>
                </div>

                <p className="mb-8 leading-relaxed text-blue-200/80">
                  {possibleCities.find((c) => c.id === selectedId)?.desc}
                </p>

                <div className="rounded-lg border border-blue-900/50 bg-blue-950/30 p-4 text-sm text-blue-400 italic">
                  {language === 'en' ? '"On the map of your empire, O Great Khan, there must be room both for the big, stone Fedora and the little Fedoras in glass globes."' : '“大汗啊，在你的帝国地图上，必须既有巨大的石头费多拉，也有玻璃球里的小费多拉。”'}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="absolute right-0 bottom-8 left-0 text-center text-sm text-slate-600">
        {language === 'en' ? 'Click a sphere to peer into a possible future' : '点击球体窥视可能的未来'}
      </footer>
    </div>
  )
}
