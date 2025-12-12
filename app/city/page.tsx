'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import data from '@/public/city/data.json'
import { getCityTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { Sparkles, Wind, Eye, Scroll, Map, Box, Cloud, Activity, Ghost, Lock } from 'lucide-react'

// Map icons to city types
const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  memory: Scroll,
  desire: Sparkles,
  signs: Map,
  thin: Wind,
  trading: Box,
  eyes: Eye,
  names: Activity,
  dead: Ghost,
  sky: Cloud,
  continuous: Activity,
  hidden: Lock,
}

// Helper to extract hex color from Tailwind class "bg-[#...]"
const getBgColor = (bgClass: string) => {
  const match = bgClass.match(/bg-\[(#[0-9A-Fa-f]+)\]/)
  return match ? match[1] : '#000000'
}

export default function CityCategoriesPage() {
  const [activeType, setActiveType] = useState<string | null>(null)

  // Extract unique city types
  const cityTypes = useMemo(() => {
    const types = new Set(data.cities.map((city) => city.type))
    return Array.from(types).sort()
  }, [])

  // Default background color
  const defaultBg = '#0c0a09' // stone-950

  // Get current background color based on active type
  const currentBg = activeType ? getBgColor(getCityTheme(activeType).colors.bg) : defaultBg

  return (
    <motion.div
      className="relative min-h-screen w-full overflow-hidden transition-colors duration-700 ease-in-out"
      animate={{ backgroundColor: currentBg }}
      initial={{ backgroundColor: defaultBg }}
    >
      {/* Ambient Noise Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.03]" />

      {/* Header */}
      <div className="pointer-events-none absolute top-0 left-0 z-20 flex w-full items-center justify-between p-8">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="font-display text-2xl font-bold text-white opacity-80 mix-blend-difference transition-opacity hover:opacity-100"
          >
            INVISIBLE CITIES
          </Link>
        </div>
        <div className="hidden text-right text-white mix-blend-difference md:block">
          <p className="font-serif text-sm italic opacity-60">
            &ldquo;The catalog of forms is endless...&rdquo;
          </p>
        </div>
      </div>

      {/* Main Content - Horizontal Accordion */}
      <div className="flex h-screen w-full flex-col items-stretch justify-center overflow-y-auto md:flex-row md:overflow-hidden">
        {cityTypes.map((type) => {
          const theme = getCityTheme(type)
          const isActive = activeType === type
          const Icon = TYPE_ICONS[type] || Sparkles

          return (
            <motion.div
              key={type}
              layout
              onHoverStart={() => setActiveType(type)}
              onHoverEnd={() => setActiveType(null)}
              onClick={() => setActiveType(isActive ? null : type)} // For mobile tap
              className={cn(
                'relative flex-shrink-0 cursor-pointer overflow-hidden border-b border-white/10 md:border-r md:border-b-0',
                'flex flex-col items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:flex-row',
                isActive ? 'flex-[3] md:flex-[4]' : 'flex-[1]'
              )}
              style={{
                minHeight: '100px', // Mobile min height
              }}
            >
              {/* Link Overlay for Navigation when Active */}
              {isActive && (
                <Link
                  href={`/city/${type}`}
                  className="absolute inset-0 z-50"
                  aria-label={`Explore ${theme.label}`}
                />
              )}

              {/* Background Overlay for inactive state */}
              <div
                className={cn(
                  'absolute inset-0 transition-opacity duration-500',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              >
                <div className={cn('absolute inset-0 opacity-20', theme.colors.bg)} />
              </div>

              {/* Content Container */}
              <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-4 md:flex-row md:p-8">
                {/* Vertical Title (Collapsed State) */}
                <div
                  className={cn(
                    'absolute flex items-center justify-center transition-all duration-500 md:static',
                    isActive ? 'pointer-events-none scale-90 opacity-0' : 'scale-100 opacity-100'
                  )}
                >
                  <div className="flex flex-row items-center gap-4 md:flex-col">
                    <Icon
                      className={cn(
                        'h-6 w-6 opacity-70 md:h-8 md:w-8',
                        isActive ? theme.colors.text : 'text-white/50'
                      )}
                    />
                    <h2 className="font-display text-xl tracking-widest whitespace-nowrap text-white/70 uppercase md:text-2xl md:[writing-mode:vertical-rl]">
                      {theme.label}
                    </h2>
                  </div>
                </div>

                {/* Expanded Content */}
                <div
                  className={cn(
                    'absolute inset-0 flex flex-col items-center justify-center p-8 text-center transition-all delay-100 duration-500',
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'pointer-events-none translate-y-10 opacity-0'
                  )}
                >
                  <motion.div
                    initial={false}
                    animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex max-w-lg flex-col items-center"
                  >
                    <motion.div
                      animate={{ rotate: isActive ? 360 : 0 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className={cn(
                        'mb-6 inline-block rounded-full bg-white/10 p-4 backdrop-blur-sm',
                        theme.colors.text
                      )}
                    >
                      <Icon className="h-12 w-12" />
                    </motion.div>

                    <h2
                      className={cn(
                        'font-display mb-4 text-5xl font-bold md:text-7xl',
                        theme.colors.text
                      )}
                    >
                      {theme.label}
                    </h2>

                    <p
                      className={cn(
                        'mx-auto mb-12 max-w-md font-serif text-lg italic opacity-80 md:text-xl',
                        theme.colors.text
                      )}
                    >
                      {type.toUpperCase()}
                    </p>

                    {/* Creative "Enter" Cue */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                      className={cn('flex flex-col items-center gap-2', theme.colors.text)}
                    >
                      <span className="text-[10px] tracking-[0.5em] uppercase opacity-60">
                        Tap to Enter
                      </span>
                      <motion.div
                        animate={{ height: [0, 40, 0], opacity: [0, 1, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        className={cn('w-px bg-current opacity-50')}
                      />
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
