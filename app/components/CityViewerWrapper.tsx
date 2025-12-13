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

  const { language } = useLanguage()
  const description = language === 'en' ? city.enDescription : city.cnDescription

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollHeight, clientHeight } = scrollContainerRef.current
      const maxScrollTop = scrollHeight - clientHeight
      
      // Only scroll if we are near the bottom or if it's the initial load
      // But for "auto-scroll" feature, we usually want to force it unless user scrolled up?
      // Let's just scroll to bottom for now as requested.
      scrollContainerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: 'smooth'
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

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = window.innerWidth - e.clientX
      if (newWidth > 300 && newWidth < 800) {
        setSidebarWidth(newWidth)
      }
    }
  }, [isResizing])

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
          "min-h-screen w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]",
        )}
        style={{
          paddingRight: isJournalOpen && isLargeScreen ? `${sidebarWidth}px` : '0px'
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
                ease: "easeInOut"
              }}
            >
              <Button
                variant="outline"
                size="icon"
                className="h-16 w-16 rounded-full bg-amber-100/80 dark:bg-amber-900/30 backdrop-blur-md border-amber-200/50 dark:border-amber-700/30 hover:bg-amber-200/80 dark:hover:bg-amber-800/40 text-amber-900 dark:text-amber-100 shadow-2xl transition-all hover:scale-110 hover:border-amber-400/50 group relative overflow-hidden"
                onClick={() => setIsJournalOpen(true)}
                title={language === 'en' ? 'City Notes' : '城市笔记'}
              >
                <div className="absolute inset-0 bg-linear-to-tr from-amber-200/0 via-amber-200/30 to-amber-200/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Feather className="h-7 w-7 stroke-[1.5]" />
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-serif text-stone-500 dark:text-stone-400 tracking-widest uppercase"
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
                "fixed z-50 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl shadow-2xl flex flex-col border-stone-200 dark:border-stone-800",
                // Desktop Styles
                "lg:top-0 lg:right-0 lg:left-auto lg:bottom-auto lg:h-full lg:border-l",
                // Mobile Styles (Bottom Sheet)
                "bottom-0 left-0 right-0 h-[85vh] rounded-t-2xl border-t lg:rounded-none lg:border-t-0"
              )}
              style={{
                width: typeof window !== 'undefined' && window.innerWidth >= 1024 ? `${sidebarWidth}px` : '100%'
              }}
            >
              {/* Resize Handle (Desktop Only) */}
              <div
                className="hidden lg:flex absolute left-0 top-0 bottom-0 w-1 cursor-ew-resize items-center justify-center hover:bg-amber-500/50 transition-colors z-50 -ml-0.5"
                onMouseDown={startResizing}
              >
                 <div className="h-8 w-1 rounded-full bg-stone-300 dark:bg-stone-700" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-stone-200/50 dark:border-stone-800/50 shrink-0">
                <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 capitalize tracking-wide">
                  {city.name}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsJournalOpen(false)}
                  className="hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors"
                >
                  <span className="sr-only">Close</span>
                  <ChevronRight className="h-6 w-6 hidden lg:block" />
                  <ChevronDown className="h-6 w-6 lg:hidden" />
                </Button>
              </div>

              {/* Scrollable Content */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar"
              >
                {/* Image Preview */}
                <div 
                  className="relative aspect-3/4 w-full overflow-hidden rounded-lg shadow-lg cursor-zoom-in group border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <img
                    src={imageUrl}
                    alt={city.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Maximize2 className="text-white drop-shadow-lg w-10 h-10 scale-90 group-hover:scale-100 transition-transform" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    {language === 'en' ? 'Click to expand' : '点击放大'}
                  </div>
                </div>

                {/* Text Narrative */}
                <div className="prose prose-stone dark:prose-invert prose-lg max-w-none">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-stone-300 dark:bg-stone-700"></div>
                    <span className="text-stone-400 text-sm font-serif italic">
                        {language === 'en' ? 'The Chronicle' : '城市志'}
                    </span>
                    <div className="h-px flex-1 bg-stone-300 dark:bg-stone-700"></div>
                  </div>
                  <div className="font-serif text-lg leading-loose text-justify text-stone-700 dark:text-stone-300 space-y-4">
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
                    className="flex justify-center mt-8"
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
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-h-[95vh] max-w-[95vw] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute -top-12 right-0 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                onClick={() => setIsLightboxOpen(false)}
              >
                <X className="h-8 w-8" />
              </Button>
              <img
                src={imageUrl}
                alt={city.name}
                className="max-h-[85vh] w-auto object-contain rounded-sm shadow-2xl ring-1 ring-white/10"
              />
              <p className="mt-4 text-stone-400 font-display tracking-widest text-sm uppercase">
                {city.name}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TypewriterLine({ text, delay, speed = 30, onUpdate }: { text: string; delay: number; speed?: number; onUpdate?: () => void }) {
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
        setVisibleCount(prev => prev + 1)
        onUpdate?.()
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [started, visibleCount, text.length, speed, onUpdate])

  return (
    <p className="inline-block w-full min-h-[1.5em]">
      {text.split('').slice(0, visibleCount).map((char, index) => (
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
