'use client'

import { CategoryPageProps, City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/app/context/LanguageContext'
import { getCityTheme } from '@/lib/themes'

export default function TradingCityPage({ cities, category }: CategoryPageProps) {
  const { language } = useLanguage()
  const theme = getCityTheme(category)
  const displayCategory = language === 'en' ? theme.label : theme.cnLabel
  // We can't easily do horizontal scroll with just CSS in Next.js without some setup,
  // but we can use a simple flex container with overflow-x-auto.

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0f172a] text-amber-500">
      <div className="z-10 flex items-end justify-between border-b border-amber-900/30 bg-[#0f172a] p-8">
        <div>
          <h1 className="font-display text-4xl font-bold tracking-tighter text-amber-500/90 uppercase md:text-6xl">
            {displayCategory}
          </h1>
          <p className="mt-2 font-mono text-xs text-amber-500/50">
            {language === 'en' ? 'EXCHANGE • BARTER • COMMERCE' : '交换 • 易货 • 贸易'}
          </p>
        </div>
        <div className="animate-pulse font-mono text-xs text-amber-500/30">
          {language === 'en' ? 'SCROLL RIGHT →' : '向右滑动 →'}
        </div>
      </div>

      <div
        className="scrollbar-hide flex flex-1 snap-x snap-mandatory items-center gap-8 overflow-x-auto overflow-y-hidden px-8 md:gap-16"
        style={{ scrollBehavior: 'smooth' }}
      >
        {/* Intro Spacer */}
        <div className="w-8 flex-shrink-0" />

        {cities.map((city, index) => (
          <TradingCard key={city.name} city={city} index={index} />
        ))}

        {/* Outro Spacer */}
        <div className="flex w-32 flex-shrink-0 items-center justify-center opacity-30">
          <span className="writing-vertical-rl font-mono text-xs tracking-widest text-amber-900">
            {language === 'en' ? 'END OF ROUTE' : '路线终点'}
          </span>
        </div>
      </div>

      {/* Background Elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-amber-900/10 to-transparent" />
    </div>
  )
}

function TradingCard({ city, index }: { city: City; index: number }) {
  const { language } = useLanguage()
  const displayDescription =
    language === 'en' ? city.enDescription : city.cnDescription

  return (
    <motion.div
      className="group relative h-[60vh] w-[85vw] flex-shrink-0 snap-center md:w-[400px]"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ margin: '-10%' }}
    >
      <Link href={`/city/${city.type}/${city.name}`} className="block h-full">
        <div className="relative flex h-full flex-col overflow-hidden border border-amber-700/30 bg-[#1e293b] shadow-2xl transition-colors duration-300 hover:border-amber-500/60">
          {/* "Rug" Pattern Top */}
          <div className="h-4 bg-amber-500 bg-[url('https://www.transparenttextures.com/patterns/zig-zag.png')] opacity-20" />

          <div className="relative z-10 flex flex-1 flex-col p-8">
            <div className="mb-8 flex items-start justify-between">
              <div className="font-display flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 text-xl text-amber-500">
                {index + 1}
              </div>
              <div className="text-right">
                <h2 className="mb-1 text-3xl font-bold tracking-wide text-amber-100 uppercase">
                  {language === 'en' ? city.name : city.cnName || city.name}
                </h2>
                <span className="font-mono text-[10px] text-amber-500/60">
                  {language === 'en' ? 'TRADING POST' : '贸易站'}
                </span>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden">
              <p className="line-clamp-[10] font-serif text-sm leading-relaxed text-amber-200/80 md:text-base">
                {displayDescription}
              </p>
              <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-[#1e293b] to-transparent" />
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-amber-500/10 pt-6">
              <span className="font-mono text-xs text-amber-500/40">
                {language === 'en' ? 'VALUE: MEMORY' : '价值：记忆'}
              </span>
              <span className="text-sm font-bold text-amber-500 transition-transform group-hover:translate-x-2">
                {language === 'en' ? 'ENTER →' : '进入 →'}
              </span>
            </div>
          </div>

          {/* Background Texture */}
          <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] opacity-5 mix-blend-overlay" />
        </div>
      </Link>
    </motion.div>
  )
}
