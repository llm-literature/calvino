'use client'

import Link from 'next/link'
import Image from 'next/image'
import capitalizeString from '@/app/components/Util'
import { cosBase } from '@/app/components/Util'
import { cn } from '@/lib/utils'
import { getCityTheme } from '@/lib/themes'

interface CityCardProps {
  cityType: string
  cityName: string
  className?: string
  originalType?: string
}

export default function CityCard({ cityType, cityName, className, originalType }: CityCardProps) {
  // Use originalType if provided (for image paths), otherwise fallback to cityType
  const typeForPath = originalType || cityType
  const theme = getCityTheme(typeForPath)

  const href: string = `${cityName}.png`
  const imagePath = `/city/${typeForPath}/${href}`
  const imageUrl = `${cosBase}${imagePath}`
  const linkPath = `/city/${typeForPath}/${cityName}`

  return (
    <Link href={linkPath} className={cn('group block', className)}>
      <div
        className={cn(
          'relative flex h-full flex-col border p-4 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl',
          theme.colors.bg,
          theme.colors.border
        )}
      >
        {/* Image Container */}
        <div className={cn('relative mb-4 aspect-4/3 w-full overflow-hidden', theme.colors.bg)}>
          <Image
            className="object-cover grayscale transition-transform duration-700 group-hover:scale-110 group-hover:grayscale-0"
            fill
            src={imageUrl}
            alt={`${cityName} - ${cityType}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className={cn(
              'absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-20',
              theme.colors.accent.replace('text-', 'bg-')
            )}
          />
        </div>

        {/* Text Content */}
        <div className="mt-auto flex flex-col items-center gap-2 text-center">
          <span
            className={cn(
              'border-b pb-1 font-serif text-xs tracking-widest uppercase',
              theme.colors.muted,
              theme.colors.border
            )}
          >
            {cityType}
          </span>
          <h2
            className={cn(
              'font-display text-2xl font-bold transition-colors',
              theme.colors.text,
              `group-hover:${theme.colors.accent}`
            )}
          >
            {capitalizeString(cityName)}
          </h2>
        </div>

        {/* Decorative corners */}
        <div
          className={cn(
            'absolute top-2 left-2 h-2 w-2 border-t border-l opacity-0 transition-opacity group-hover:opacity-100',
            theme.colors.border
          )}
        />
        <div
          className={cn(
            'absolute top-2 right-2 h-2 w-2 border-t border-r opacity-0 transition-opacity group-hover:opacity-100',
            theme.colors.border
          )}
        />
        <div
          className={cn(
            'absolute bottom-2 left-2 h-2 w-2 border-b border-l opacity-0 transition-opacity group-hover:opacity-100',
            theme.colors.border
          )}
        />
        <div
          className={cn(
            'absolute right-2 bottom-2 h-2 w-2 border-r border-b opacity-0 transition-opacity group-hover:opacity-100',
            theme.colors.border
          )}
        />
      </div>
    </Link>
  )
}

const DemoCityCardComponent = () => {
  return <CityCard cityType="demo" cityName="hello" />
}

export { CityCard, DemoCityCardComponent }
