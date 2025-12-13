'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { CityTheme } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { MapPin } from 'lucide-react'
import Link from 'next/link'
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

export const LabyrinthLayout = ({ city, prevCity, nextCity, imageUrl, theme }: LayoutProps) => {
  const { language } = useLanguage()
  const displayDescription = language === 'en' ? city.enDescription : city.cnDescription

  return (
    <div
      className={cn(
        'relative min-h-screen overflow-hidden font-mono',
        theme.colors.bg,
        theme.colors.text
      )}
    >
      {/* Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(${theme.colors.border.replace('border-', '')} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.border.replace('border-', '')} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          {/* Sidebar Info */}
          <div className="flex h-full min-h-[50vh] flex-col justify-between md:col-span-3">
            <div>
              <div
                className={cn(
                  'mb-8 flex h-12 w-12 items-center justify-center border-2',
                  theme.colors.border
                )}
              >
                <MapPin className="h-6 w-6" />
              </div>
              <div className="mb-12 space-y-2">
                <p className="text-xs tracking-widest uppercase opacity-50">Classification</p>
                <p className={cn('text-xl font-bold', theme.colors.accent)}>{theme.label}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs tracking-widest uppercase opacity-50">Coordinates</p>
                <p className="font-mono text-sm">UNKNOWN</p>
              </div>
            </div>

            <div className="hidden md:block">
              {prevCity && (
                <Link
                  href={`/city/${prevCity.type}/${prevCity.name}`}
                  className="mb-4 block opacity-50 hover:opacity-100"
                >
                  &lt; {prevCity.name.toUpperCase()}
                </Link>
              )}
              {nextCity && (
                <Link
                  href={`/city/${nextCity.type}/${nextCity.name}`}
                  className="block opacity-50 hover:opacity-100"
                >
                  {nextCity.name.toUpperCase()} &gt;
                </Link>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-9">
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mb-12 text-6xl leading-[0.8] font-black tracking-tighter break-all uppercase md:text-9xl"
            >
              {city.name}
            </motion.h1>

            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-square border-2 p-2"
                style={{ borderColor: 'currentColor' }}
              >
                <div className="relative h-full w-full grayscale transition-all duration-500 hover:grayscale-0">
                  <Image fill src={imageUrl} alt={city.name} className="object-cover" />
                  {/* Glitch overlay effect could go here */}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="prose prose-invert max-w-none"
              >
                <ReactMarkdown
                  components={{
                    p: ({ ...props }) => (
                      <p
                        className={cn(
                          'mb-6 text-justify text-sm leading-loose md:text-base',
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
          </div>
        </div>
      </div>
    </div>
  )
}
