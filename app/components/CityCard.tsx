'use client'

import Link from 'next/link'
import Image from 'next/image'
import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";
import { cn } from "@/lib/utils";
import { getCityTheme } from '@/lib/themes';

interface CityCardProps {
  cityType: string
  cityName: string
  className?: string
  originalType?: string
}

export default function CityCard({cityType, cityName, className, originalType} : CityCardProps) {
  // Use originalType if provided (for image paths), otherwise fallback to cityType
  const typeForPath = originalType || cityType;
  const theme = getCityTheme(typeForPath);
  
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${typeForPath}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`;
  const linkPath = `/city/${typeForPath}/${cityName}`;

  return (
    <Link href={linkPath} className={cn("block group", className)}>
      <div className={cn(
          "relative flex flex-col h-full border p-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2",
          theme.colors.bg,
          theme.colors.border
        )}>
        {/* Image Container */}
        <div className={cn("relative aspect-[4/3] w-full overflow-hidden mb-4", theme.colors.bg)}>
          <Image
            className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            fill
            src={imageUrl}
            alt={`${cityName} - ${cityType}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 mix-blend-overlay", theme.colors.accent.replace('text-', 'bg-'))} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-2 mt-auto">
          <span className={cn("font-serif text-xs tracking-widest uppercase border-b pb-1", theme.colors.muted, theme.colors.border)}>
            {cityType}
          </span>
          <h2 className={cn("font-display text-2xl font-bold transition-colors", theme.colors.text, `group-hover:${theme.colors.accent}`)}>
            {capitalizeString(cityName)}
          </h2>
        </div>
        
        {/* Decorative corners */}
        <div className={cn("absolute top-2 left-2 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity", theme.colors.border)} />
        <div className={cn("absolute top-2 right-2 w-2 h-2 border-t border-r opacity-0 group-hover:opacity-100 transition-opacity", theme.colors.border)} />
        <div className={cn("absolute bottom-2 left-2 w-2 h-2 border-b border-l opacity-0 group-hover:opacity-100 transition-opacity", theme.colors.border)} />
        <div className={cn("absolute bottom-2 right-2 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity", theme.colors.border)} />
      </div>
    </Link>
  )
}

const DemoCityCardComponent = () => {
  return (
    <CityCard cityType="demo" cityName="hello"/>
  );
};

export { CityCard, DemoCityCardComponent };
