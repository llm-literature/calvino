'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { City } from '@/lib/types'
import { Feather, X, Maximize2, ChevronRight, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CityViewerWrapperProps {
  city: City
  imageUrl: string
  children: React.ReactNode
}

export default function CityViewerWrapper({ city, imageUrl, children }: CityViewerWrapperProps) {
  const [isJournalOpen, setIsJournalOpen] = useState(true)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [sidebarWidth, setSidebarWidth] = useState(400)
  const [isResizing, setIsResizing] = useState(false)
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const shouldAutoScroll = useRef(true)
  const lastScrollTop = useRef(0)

  const { language } = useLanguage()
  const description = language === 'en' ? city.enDescription : city.cnDescription

  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return

    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    const isScrollingUp = scrollTop < lastScrollTop.current
    lastScrollTop.current = scrollTop

    const distanceToBottom = scrollHeight - clientHeight - scrollTop
    const isAtBottom = distanceToBottom < 50 // Give a bit of buffer

    if (isScrollingUp) {
      shouldAutoScroll.current = false
    } else if (isAtBottom) {
      shouldAutoScroll.current = true
    }
  }, [])

  const scrollToBottom = useCallback(() => {
    if (shouldAutoScroll.current && scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current
      scrollContainerRef.current.scrollTo({
        top: scrollHeight - clientHeight,
        behavior: 'smooth',
      })
    }
  }, [])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)
  }, [])

  const stopResizing = useCallback(() => {
    setIsResizing(false)
  }, [])

  const resize = useCallback(
    (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = window.innerWidth - e.clientX
        if (newWidth > 300 && newWidth < 800) {
          setSidebarWidth(newWidth)
        }
      }
    },
    [isResizing]
  )

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', resize)
      window.addEventListener('mouseup', stopResizing)
    } else {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [isResizing, resize, stopResizing])

  return (
    <div className="relative min-h-screen w-full">
      {/* Main Creative Content Wrapper */}
      <div
        className={cn(
          'min-h-screen w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]'
        )}
        style={{
          paddingRight: isJournalOpen && isLargeScreen ? `${sidebarWidth}px` : '0px',
        }}
      >
        {children}
      </div>

      {/* Toggle Button (Visible when journal is closed) */}
      <AnimatePresence>
        {!isJournalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            className="fixed top-8 right-8 z-40"
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Button
                variant="outline"
                size="icon"
                className="group relative h-16 w-16 overflow-hidden rounded-full border-amber-200/50 bg-amber-100/80 text-amber-900 shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-amber-400/50 hover:bg-amber-200/80 dark:border-amber-700/30 dark:bg-amber-900/30 dark:text-amber-100 dark:hover:bg-amber-800/40"
                onClick={() => setIsJournalOpen(true)}
                title={language === 'en' ? 'City Notes' : '城市笔记'}
              >
                <div className="absolute inset-0 -translate-x-full bg-linear-to-tr from-amber-200/0 via-amber-200/30 to-amber-200/0 transition-transform duration-1000 group-hover:translate-x-full" />
                <Feather className="h-7 w-7 stroke-[1.5]" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 font-serif text-xs tracking-widest whitespace-nowrap text-stone-500 uppercase dark:text-stone-400"
            >
              {language === 'en' ? 'City Notes' : '城市笔记'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal Side Panel */}
      <AnimatePresence mode="wait">
        {isJournalOpen && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsJournalOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px] lg:hidden"
            />

            <motion.div
              ref={sidebarRef}
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0.5 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className={cn(
                'fixed z-50 flex flex-col border-stone-200 bg-white/90 shadow-2xl backdrop-blur-xl dark:border-stone-800 dark:bg-stone-950/90',
                // Desktop Styles
                'lg:top-0 lg:right-0 lg:bottom-auto lg:left-auto lg:h-full lg:border-l',
                // Mobile Styles (Bottom Sheet)
                'right-0 bottom-0 left-0 h-[85vh] rounded-t-2xl border-t lg:rounded-none lg:border-t-0'
              )}
              style={{
                width:
                  typeof window !== 'undefined' && window.innerWidth >= 1024
                    ? `${sidebarWidth}px`
                    : '100%',
              }}
            >
              {/* Resize Handle (Desktop Only) */}
              <div
                className="absolute top-0 bottom-0 left-0 z-50 -ml-0.5 hidden w-1 cursor-ew-resize items-center justify-center transition-colors hover:bg-amber-500/50 lg:flex"
                onMouseDown={startResizing}
              >
                <div className="h-8 w-1 rounded-full bg-stone-300 dark:bg-stone-700" />
              </div>

              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-stone-200/50 p-6 dark:border-stone-800/50">
                <h2 className="font-display text-3xl font-bold tracking-wide text-stone-900 capitalize dark:text-stone-100">
                  {city.name}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsJournalOpen(false)}
                  className="rounded-full transition-colors hover:bg-stone-100 dark:hover:bg-stone-800"
                >
                  <span className="sr-only">Close</span>
                  <ChevronRight className="hidden h-6 w-6 lg:block" />
                  <ChevronDown className="h-6 w-6 lg:hidden" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="no-scrollbar flex-1 space-y-8 overflow-y-auto p-6"
              >
                {/* Image Preview */}
                <div
                  className="group relative aspect-3/4 w-full cursor-zoom-in overflow-hidden rounded-lg border border-stone-200 bg-stone-100 shadow-lg dark:border-stone-800 dark:bg-stone-900"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <img
                    src={imageUrl}
                    alt={city.name}
                    className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/20 group-hover:opacity-100">
                    <Maximize2 className="h-10 w-10 scale-90 text-white drop-shadow-lg transition-transform group-hover:scale-100" />
                  </div>
                  <div className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                    {language === 'en' ? 'Click to expand' : '点击放大'}
                  </div>
                </div>

                {/* Text Narrative */}
                <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-px flex-1 bg-stone-300 dark:bg-stone-700"></div>
                    <span className="font-serif text-sm text-stone-400 italic">
                      {language === 'en' ? 'The Chronicle' : '城市志'}
                    </span>
                    <div className="h-px flex-1 bg-stone-300 dark:bg-stone-700"></div>
                  </div>
                  <div className="space-y-4 text-justify font-serif text-lg leading-loose text-stone-700 dark:text-stone-300">
                    {(() => {
                      const lines = description.split('\n')
                      let currentDelay = 0.5
                      return lines.map((line, index) => {
                        const delay = currentDelay
                        // Calculate delay for next line: length * speed + pause
                        // Slowed down to 80ms per character for a more soothing pace
                        currentDelay += line.length * 0.08 + 0.5

                        return (
                          <TypewriterLine
                            key={index}
                            text={line}
                            delay={delay}
                            speed={80}
                            onUpdate={scrollToBottom}
                          />
                        )
                      })
                    })()}
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: description.length * 0.08 + 1, duration: 1 }}
                    className="mt-8 flex justify-center"
                  >
                    <span className="text-2xl text-stone-400">❦</span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative flex max-h-[95vh] max-w-[95vw] flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="h-8 w-8" />
              </Button>
              <img
                src={imageUrl}
                alt={city.name}
                className="max-h-[85vh] w-auto rounded-sm object-contain shadow-2xl ring-1 ring-white/10"
              />
              <p className="font-display mt-4 text-sm tracking-widest text-stone-400 uppercase">
                {city.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TypewriterLine({
  text,
  delay,
  speed = 30,
  onUpdate,
}: {
  text: string
  delay: number
  speed?: number
  onUpdate?: () => void
}) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay * 1000)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started) return

    if (visibleCount < text.length) {
      const timeout = setTimeout(() => {
        setVisibleCount((prev) => prev + 1)
        onUpdate?.()
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [started, visibleCount, text.length, speed, onUpdate])

  return (
    <p className="inline-block min-h-[1.5em] w-full">
      {text
        .split('')
        .slice(0, visibleCount)
        .map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {char}
          </motion.span>
        ))}
    </p>
  )
}
