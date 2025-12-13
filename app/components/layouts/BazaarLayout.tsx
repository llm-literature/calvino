'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { CityTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'
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

export const BazaarLayout = ({
  city,
  prevCity,
  nextCity,
  imageUrl,
  theme,
}: LayoutProps) => {
  const { language } = useLanguage()
  const displayDescription = language === 'en' ? city.enDescription : city.cnDescription

  return (
    <div
      className={cn('min-h-screen overflow-x-hidden font-sans', theme.colors.bg, theme.colors.text)}
    >
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left: Image & Title (Sticky) */}
        <div className="relative h-[50vh] overflow-hidden lg:sticky lg:top-0 lg:h-screen">
          <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-transparent to-transparent lg:bg-linear-to-r lg:from-transparent lg:to-black/80" />
          <Image
            fill
            src={imageUrl}
            alt={city.name}
            className="object-cover transition-transform duration-[20s] hover:scale-110"
          />

          <div className="absolute bottom-0 left-0 z-20 w-full p-8 lg:p-16">
            <motion.span
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className={cn(
                'mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-widest uppercase backdrop-blur-md',
                theme.colors.accent
              )}
            >
              {theme.label}
            </motion.span>
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-6xl leading-none font-black text-white md:text-8xl"
            >
              {capitalizeString(city.name)}
            </motion.h1>
          </div>
        </div>

        {/* Right: Content (Scrollable) */}
        <div className="flex flex-col justify-center p-8 lg:p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-lg dark:prose-invert max-w-xl"
          >
            <ReactMarkdown
              components={{
                p: ({ ...props }) => (
                  <p
                    className={cn('mb-6 text-lg leading-relaxed font-medium', theme.colors.text)}
                    {...props}
                  />
                ),
              }}
            >
              {displayDescription}
            </ReactMarkdown>
          </motion.div>

          <div
            className="mt-20 grid grid-cols-2 gap-4 border-t pt-8"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            {prevCity ? (
              <Link
                href={`/city/${prevCity.type}/${prevCity.name}`}
                className="group block rounded-lg p-4 transition-colors hover:bg-white/5"
              >
                <span
                  className={cn(
                    'mb-1 block text-xs tracking-widest uppercase opacity-60',
                    theme.colors.text
                  )}
                >
                  上一座
                </span>
                <span className="font-display text-xl font-bold">
                  {capitalizeString(prevCity.name)}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextCity ? (
              <Link
                href={`/city/${nextCity.type}/${nextCity.name}`}
                className="group block rounded-lg p-4 text-right transition-colors hover:bg-white/5"
              >
                <span
                  className={cn(
                    'mb-1 block text-xs tracking-widest uppercase opacity-60',
                    theme.colors.text
                  )}
                >
                  下一座
                </span>
                <span className="font-display text-xl font-bold">
                  {capitalizeString(nextCity.name)}
                </span>
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
