'use client'

import { useState } from 'react'
import { City } from '@/lib/types'
import { Eye, PenLine, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/app/context/LanguageContext'
import { Button } from '@/components/ui/button'

interface CityViewerWrapperProps {
  city: City
  imageUrl: string
  children: React.ReactNode
}

export default function CityViewerWrapper({ city, imageUrl, children }: CityViewerWrapperProps) {
  const [viewMode, setViewMode] = useState<'none' | 'image' | 'text'>('none')
  const { language } = useLanguage()
  const description = language === 'en' ? city.enDescription : city.cnDescription

  return (
    <>
      {children}

      {/* Floating Controls */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-stone-800 dark:text-stone-200 shadow-lg transition-all hover:scale-110"
          onClick={() => setViewMode(viewMode === 'image' ? 'none' : 'image')}
          title={language === 'en' ? 'View Image' : '查看图像'}
        >
          <Eye className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 text-stone-800 dark:text-stone-200 shadow-lg transition-all hover:scale-110"
          onClick={() => setViewMode(viewMode === 'text' ? 'none' : 'text')}
          title={language === 'en' ? 'Read Text' : '阅读文本'}
        >
          <PenLine className="h-6 w-6" />
        </Button>
      </div>

      {/* Overlays */}
      <AnimatePresence>
        {viewMode === 'image' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setViewMode('none')}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-white hover:bg-black/20 rounded-full"
                onClick={() => setViewMode('none')}
              >
                <X className="h-6 w-6" />
              </Button>
              <img
                src={imageUrl}
                alt={city.name}
                className="max-h-[85vh] w-auto object-contain"
              />
            </motion.div>
          </motion.div>
        )}

        {viewMode === 'text' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-60 flex items-center justify-center bg-stone-100/90 dark:bg-stone-900/90 backdrop-blur-md p-4"
            onClick={() => setViewMode('none')}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="relative max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white dark:bg-stone-800 p-8 shadow-2xl border border-stone-200 dark:border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
               <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-full"
                onClick={() => setViewMode('none')}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <h2 className="mb-6 text-3xl font-display text-stone-900 dark:text-stone-100 capitalize">
                {city.name}
              </h2>
              <div className="prose prose-stone dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-lg leading-relaxed font-serif">
                  {description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
