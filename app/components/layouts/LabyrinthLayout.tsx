'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CityTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { City } from '@/lib/types';

interface LayoutProps {
  city: City;
  prevCity: City | null;
  nextCity: City | null;
  description: string;
  imageUrl: string;
  theme: CityTheme;
}

export const LabyrinthLayout = ({
  city,
  prevCity,
  nextCity,
  description,
  imageUrl,
  theme,
}: LayoutProps) => {
  return (
    <div
      className={cn(
        'min-h-screen font-mono relative overflow-hidden',
        theme.colors.bg,
        theme.colors.text
      )}
    >
      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(${theme.colors.border.replace('border-', '')} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.border.replace('border-', '')} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar Info */}
          <div className="md:col-span-3 flex flex-col justify-between h-full min-h-[50vh]">
            <div>
              <div
                className={cn(
                  'w-12 h-12 border-2 flex items-center justify-center mb-8',
                  theme.colors.border
                )}
              >
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-2 mb-12">
                <p className="text-xs uppercase tracking-widest opacity-50">Classification</p>
                <p className={cn('text-xl font-bold', theme.colors.accent)}>{theme.label}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-widest opacity-50">Coordinates</p>
                <p className="font-mono text-sm">UNKNOWN</p>
              </div>
            </div>

            <div className="hidden md:block">
              {prevCity && (
                <Link
                  href={`/city/${prevCity.type}/${prevCity.name}`}
                  className="block mb-4 opacity-50 hover:opacity-100"
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
              className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-12 break-all leading-[0.8]"
            >
              {city.name}
            </motion.h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="relative aspect-square border-2 p-2"
                style={{ borderColor: 'currentColor' }}
              >
                <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-500">
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
                          'mb-6 text-sm md:text-base leading-loose text-justify',
                          theme.colors.text
                        )}
                        {...props}
                      />
                    ),
                  }}
                >
                  {description}
                </ReactMarkdown>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
