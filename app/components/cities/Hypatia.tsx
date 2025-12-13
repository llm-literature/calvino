'use client'

import { City } from '@/lib/types'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

export default function Hypatia({ city }: { city: City }) {
  const { language } = useLanguage()

  return (
    <div className="relative min-h-screen bg-teal-950 font-serif text-teal-50 selection:bg-teal-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-black/20 p-2 transition-colors hover:bg-black/40"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24">
        <header className="mb-24 text-center">
          <h1 className="mb-4 text-6xl font-bold text-teal-200">HYPATIA</h1>
          <p className="tracking-widest text-teal-400/60 uppercase">
            {language === 'en' ? 'The Language of Deception' : '欺骗的语言'}
          </p>
        </header>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-2">
          <DeceptiveCard
            title={language === 'en' ? 'The Garden' : '花园'}
            beautiful={
              language === 'en'
                ? 'I entered Hypatia one morning, a magnolia garden reflected in blue lagoons...'
                : '一天早晨我进入海帕提亚，木兰花园倒映在蓝色的泻湖中……'
            }
            ugly={
              language === 'en'
                ? '...but at the bottom, crabs were biting the eyes of the suicides.'
                : '……但在水底，螃蟹正在啃食自杀者的眼睛。'
            }
          />
          <DeceptiveCard
            title={language === 'en' ? 'The Palace' : '宫殿'}
            beautiful={
              language === 'en'
                ? 'I climbed the porphyry steps of the palace with the highest domes...'
                : '我登上了拥有最高圆顶的宫殿的斑岩台阶……'
            }
            ugly={
              language === 'en'
                ? '...convicts with black chains were hauling basalt blocks from the quarry.'
                : '……戴着黑色锁链的囚犯正从采石场搬运玄武岩块。'
            }
          />
          <DeceptiveCard
            title={language === 'en' ? 'The Library' : '图书馆'}
            beautiful={
              language === 'en'
                ? 'I entered the great library, lost among shelves collapsing under vellum bindings...'
                : '我进入了大图书馆，迷失在被羊皮纸装订书压垮的书架之间……'
            }
            ugly={
              language === 'en'
                ? '...I saw a young man with an opium pipe.'
                : '……我看到一个拿着鸦片烟斗的年轻人。'
            }
          />
          <DeceptiveCard
            title={language === 'en' ? 'The Stables' : '马厩'}
            beautiful={
              language === 'en'
                ? 'I heard the neighing of horses and the cracking of whips...'
                : '我听到了马的嘶鸣和鞭子的抽打声……'
            }
            ugly={
              language === 'en'
                ? '...women mounted on saddles, ready to push the stranger onto a pile of hay.'
                : '……女人们骑在马鞍上，准备把陌生人推到干草堆上。'
            }
          />
        </div>

        <div className="mx-auto mt-24 max-w-2xl text-center text-teal-300/80 italic">
          {language === 'en' ? '"There is no language without deceit."' : '“没有不带欺骗的语言。”'}
        </div>
      </div>
    </div>
  )
}

function DeceptiveCard({
  title,
  beautiful,
  ugly,
}: {
  title: string
  beautiful: string
  ugly: string
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="group perspective-1000 relative h-64 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          'absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-teal-800 p-8 text-center shadow-2xl transition-all duration-500',
          isHovered ? 'border-red-900 bg-red-950' : 'bg-teal-900/50'
        )}
      >
        <h3
          className={cn(
            'mb-4 text-xl font-bold tracking-widest uppercase transition-colors',
            isHovered ? 'text-red-500' : 'text-teal-300'
          )}
        >
          {title}
        </h3>
        <p
          className={cn(
            'leading-relaxed transition-opacity duration-300',
            isHovered ? 'absolute opacity-0' : 'opacity-100'
          )}
        >
          {beautiful}
        </p>
        <p
          className={cn(
            'leading-relaxed text-red-200 transition-opacity duration-300',
            isHovered ? 'opacity-100' : 'absolute opacity-0'
          )}
        >
          {ugly}
        </p>

        <div className="absolute bottom-4 opacity-50">
          {isHovered ? (
            <EyeOff className="h-4 w-4 text-red-500" />
          ) : (
            <Eye className="h-4 w-4 text-teal-500" />
          )}
        </div>
      </div>
    </div>
  )
}
