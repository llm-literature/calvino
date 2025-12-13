'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Map, Calendar, MousePointer2, ArrowLeft } from 'lucide-react'
import { City } from '@/lib/types'
import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Maurilia({ city }: { city: City }) {
  const { language } = useLanguage()

  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)

  const handleMouseDown = () => {
    isDragging.current = true
  }
  const handleMouseUp = () => {
    isDragging.current = false
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }

  // Touch support
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width))
    setSliderPosition((x / rect.width) * 100)
  }

  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp)
    return () => window.removeEventListener('mouseup', handleMouseUp)
  }, [])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-stone-100 p-8 font-serif text-stone-800">
      <Link
        href={`/city/${city.type}`}
        className="absolute top-8 left-8 z-50 rounded-full bg-black/5 p-2 transition-colors hover:bg-black/10"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <header className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold text-stone-900">{city.name.toUpperCase()}</h1>
      </header>

      <div
        ref={containerRef}
        className="group relative aspect-video w-full max-w-4xl cursor-col-resize overflow-hidden rounded-xl shadow-2xl select-none"
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
      >
        {/* Layer 1: The Present (Underneath, but revealed on the right) */}
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
          <div className="p-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tighter text-white">
              {language === 'en' ? 'THE METROPOLIS' : '大都会'}
            </h2>
            <div className="grid grid-cols-2 gap-8 text-left text-slate-400">
              <div>
                <p className="mb-1 font-mono text-xs text-slate-500 uppercase">
                  {language === 'en' ? 'Infrastructure' : '基础设施'}
                </p>
                <p>{language === 'en' ? 'Concrete Overpasses' : '混凝土立交桥'}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-slate-500 uppercase">
                  {language === 'en' ? 'Atmosphere' : '氛围'}
                </p>
                <p>{language === 'en' ? 'Neon & Smog' : '霓虹与烟雾'}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-slate-500 uppercase">
                  {language === 'en' ? 'Population' : '人口'}
                </p>
                <p>{language === 'en' ? 'Millions, Anonymous' : '数百万，匿名'}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-slate-500 uppercase">
                  {language === 'en' ? 'Reality' : '现实'}
                </p>
                <p>{language === 'en' ? 'Prosperous & Vast' : '繁荣与广阔'}</p>
              </div>
            </div>
          </div>
          {/* Background Pattern for Present */}
          <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        </div>

        {/* Layer 2: The Past (Clipped) */}
        <div
          className="bg-sepia-50 absolute inset-0 flex items-center justify-center border-r-4 border-white"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <div className="p-12 text-center">
            <h2 className="mb-4 font-serif text-4xl font-bold text-amber-900">
              {language === 'en' ? 'The Old Postcard' : '旧明信片'}
            </h2>
            <div className="grid grid-cols-2 gap-8 text-left text-amber-800/80">
              <div>
                <p className="mb-1 font-mono text-xs text-amber-900/40 uppercase">
                  {language === 'en' ? 'Landmark' : '地标'}
                </p>
                <p>{language === 'en' ? 'The Hen House' : '母鸡舍'}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-amber-900/40 uppercase">
                  {language === 'en' ? 'Atmosphere' : '氛围'}
                </p>
                <p>{language === 'en' ? 'Quiet & Provincial' : '宁静与乡土'}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-amber-900/40 uppercase">
                  {language === 'en' ? 'Population' : '人口'}
                </p>
                <p>{language === 'en' ? 'Three Spinsters' : '三个老处女'}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs text-amber-900/40 uppercase">
                  {language === 'en' ? 'Memory' : '记忆'}
                </p>
                <p>{language === 'en' ? 'Lost Grace' : '失落的优雅'}</p>
              </div>
            </div>
          </div>
          {/* Background Pattern for Past */}
          <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-20"></div>

          {/* Postcard Stamp */}
          <div className="absolute top-8 right-12 flex h-32 w-24 rotate-12 items-center justify-center border-4 border-amber-900/20 opacity-50">
            <span className="rotate-45 text-xs font-bold text-amber-900/40 uppercase">
              {language === 'en' ? 'Postage Paid' : '邮资已付'}
            </span>
          </div>
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 w-1 cursor-col-resize bg-white shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-stone-800 shadow-lg">
            <MousePointer2 className="h-5 w-5 rotate-90" />
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-2xl space-y-6 text-center">
        <p className="text-lg text-stone-700">
          {language === 'en'
            ? '"Beware of saying to them that sometimes different cities follow one another on the same site and under the same name, born and dying without knowing one another."'
            : '“小心不要告诉他们，有时不同的城市在同一个地点、同一个名字下接踵而至，生生灭灭，互不相识。”'}
        </p>
        <div className="flex justify-center gap-8 text-sm tracking-widest text-stone-500 uppercase">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>The Past</span>
          </div>
          <div className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            <span>The Present</span>
          </div>
        </div>
      </div>
    </div>
  )
}
