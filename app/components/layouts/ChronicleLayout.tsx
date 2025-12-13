'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { CityTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import capitalizeString from '@/app/components/Util'
import { City } from '@/lib/types'
import { useLanguage } from '@/app/context/LanguageContext'

interface LayoutProps {
  city: City
  prevCity: City | null
  nextCity: City | null
  description: string
  imageUrl: string
  theme: CityTheme
}

export const ChronicleLayout = ({ city, prevCity, nextCity, imageUrl, theme }: LayoutProps) => {
  const { language } = useLanguage()
  const displayDescription = language === 'en' ? city.enDescription : city.cnDescription

  return (
    <div
      className={cn(
        'min-h-screen font-serif selection:bg-amber-200 selection:text-amber-900',
        theme.colors.bg,
        theme.colors.text
      )}
    >
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 border-b-2 pb-8 text-center"
          style={{ borderColor: 'currentColor' }}
        >
          <span
            className={cn('mb-4 block text-sm tracking-[0.3em] uppercase', theme.colors.accent)}
          >
            {theme.label}
          </span>
          <h1 className="font-display mb-4 text-6xl font-bold md:text-8xl">
            {capitalizeString(city.name)}
          </h1>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-12">
          {/* Image - Floated in text style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative aspect-3/4 rotate-1 border-4 bg-white p-2 shadow-xl md:col-span-5"
            style={{ borderColor: 'currentColor' }}
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image fill src={imageUrl} alt={city.name} className="object-cover sepia-[0.3]" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="prose prose-lg max-w-none text-justify leading-loose md:col-span-7"
          >
            <ReactMarkdown
              components={{
                p: ({ ...props }) => (
                  <p
                    className={cn(
                      'first-letter:font-display mb-6 first-letter:float-left first-letter:mr-3 first-letter:text-6xl first-letter:leading-none first-letter:font-bold',
                      theme.colors.text
                    )}
                    {...props}
                  />
                ),
              }}
            >
              {displayDescription}
            </ReactMarkdown>
          </motion.div>
        </div>

        {/* Navigation */}
        <div
          className="mt-24 flex items-center justify-between border-t pt-8"
          style={{ borderColor: 'currentColor' }}
        >
          {prevCity ? (
            <Link
              href={`/city/${prevCity.type}/${prevCity.name}`}
              className="group flex items-center gap-4"
            >
              <ChevronLeft className="h-6 w-6" />
              <div className="flex flex-col items-start">
                <span className={cn('text-xs tracking-widest uppercase', theme.colors.muted)}>
                  上一页
                </span>
                <span className="font-display text-xl">{capitalizeString(prevCity.name)}</span>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextCity ? (
            <Link
              href={`/city/${nextCity.type}/${nextCity.name}`}
              className="group flex items-center gap-4 text-right"
            >
              <div className="flex flex-col items-end">
                <span className={cn('text-xs tracking-widest uppercase', theme.colors.muted)}>
                  下一页
                </span>
                <span className="font-display text-xl">{capitalizeString(nextCity.name)}</span>
              </div>
              <ChevronRight className="h-6 w-6" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  )
}
