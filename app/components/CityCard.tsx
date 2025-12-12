'use client'

import Link from 'next/link'
import Image from 'next/image'
import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";
import { cn } from "@/lib/utils";

interface CityCardProps {
  cityType: string
  cityName: string
  className?: string
  originalType?: string
}

export default function CityCard({cityType, cityName, className, originalType} : CityCardProps) {
  // Use originalType if provided (for image paths), otherwise fallback to cityType
  const typeForPath = originalType || cityType;
  
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${typeForPath}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`;
  const linkPath = `/city/${typeForPath}/${cityName}`;

  return (
    <Link href={linkPath} className={cn("block group", className)}>
      <div className="relative flex flex-col h-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-stone-300 dark:hover:border-stone-700">
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-800 mb-4">
          <Image
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            fill
            src={imageUrl}
            alt={`${cityName} - ${cityType}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-300" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col items-center text-center gap-2 mt-auto">
          <span className="font-serif text-xs tracking-widest uppercase text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-700 pb-1">
            {cityType}
          </span>
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
            {capitalizeString(cityName)}
          </h2>
        </div>
        
        {/* Decorative corners */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-stone-300 dark:border-stone-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-stone-300 dark:border-stone-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-stone-300 dark:border-stone-600 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-stone-300 dark:border-stone-600 opacity-0 group-hover:opacity-100 transition-opacity" />
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
