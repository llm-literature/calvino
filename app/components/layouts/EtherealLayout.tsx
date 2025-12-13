'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { CityTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import capitalizeString from '@/app/components/Util'
import { useRef } from 'react'
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

export const EtherealLayout = ({
  city,
  prevCity,
  nextCity,
  description,
  imageUrl,
  theme,
}: LayoutProps) => {
  const { language } = useLanguage()
  const displayDescription = language === 'en' ? city.enDescription : city.cnDescription

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <div
      ref={ref}
      className={cn(
        'relative min-h-screen overflow-hidden font-sans',
        theme.colors.bg,
        theme.colors.text
      )}
    >
      {/* Floating Background Elements */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className={cn(
            'absolute top-[-10%] left-[-10%] h-[50vw] w-[50vw] rounded-full opacity-20 blur-[100px]',
            theme.colors.accent.replace('text-', 'bg-')
          )}
        />
        <div
          className={cn(
            'absolute right-[-10%] bottom-[-10%] h-[60vw] w-[60vw] rounded-full opacity-10 blur-[120px]',
            theme.colors.text.replace('text-', 'bg-')
          )}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Hero Section */}
        <div className="relative flex h-screen flex-col items-center justify-center">
          <motion.div style={{ y, opacity }} className="z-10 text-center">
            <span
              className={cn(
                'mb-6 block text-sm tracking-[0.5em] uppercase opacity-60',
                theme.colors.text
              )}
            >
              {theme.label}
            </span>
            <h1 className="font-display mb-8 text-7xl font-light tracking-tight md:text-9xl">
              {capitalizeString(city.name)}
            </h1>
            <div className="mx-auto h-24 w-[1px] bg-current opacity-20" />
          </motion.div>

          {/* Image as subtle background or floating element */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 z-0"
          >
            <Image
              fill
              src={imageUrl}
              alt={city.name}
              className="object-cover opacity-30 mix-blend-multiply dark:mix-blend-overlay"
            />
            <div
              className={cn(
                'absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-current',
                theme.colors.bg.replace('bg-', 'to-')
              )}
            />
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="relative mx-auto max-w-2xl pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-stone dark:prose-invert text-center leading-loose"
          >
            <ReactMarkdown
              components={{
                p: ({ ...props }) => (
                  <p
                    className={cn('mb-8 text-xl font-light md:text-2xl', theme.colors.text)}
                    {...props}
                  />
                ),
              }}
            >
              {displayDescription}
            </ReactMarkdown>
          </motion.div>

          {/* Navigation */}
          <div className="mt-32 flex items-center justify-between">
            {prevCity ? (
              <Link
                href={`/city/${prevCity.type}/${prevCity.name}`}
                className="group flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="font-display text-lg">{capitalizeString(prevCity.name)}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextCity ? (
              <Link
                href={`/city/${nextCity.type}/${nextCity.name}`}
                className="group flex items-center gap-2 opacity-50 transition-opacity hover:opacity-100"
              >
                <span className="font-display text-lg">{capitalizeString(nextCity.name)}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
