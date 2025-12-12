'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CityTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import capitalizeString from '@/app/components/Util';

interface LayoutProps {
  city: any;
  prevCity: any;
  nextCity: any;
  description: string;
  imageUrl: string;
  theme: CityTheme;
}

export const ChronicleLayout = ({
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
        'min-h-screen font-serif selection:bg-amber-200 selection:text-amber-900',
        theme.colors.bg,
        theme.colors.text
      )}
    >
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 border-b-2 pb-8"
          style={{ borderColor: 'currentColor' }}
        >
          <span
            className={cn('text-sm uppercase tracking-[0.3em] mb-4 block', theme.colors.accent)}
          >
            {theme.label}
          </span>
          <h1 className="font-display text-6xl md:text-8xl font-bold mb-4">
            {capitalizeString(city.name)}
          </h1>
        </motion.div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Image - Floated in text style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:col-span-5 relative aspect-[3/4] shadow-xl rotate-1 border-4 p-2 bg-white"
            style={{ borderColor: 'currentColor' }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image fill src={imageUrl} alt={city.name} className="object-cover sepia-[0.3]" />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="md:col-span-7 prose prose-lg max-w-none leading-loose text-justify"
          >
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p
                    className={cn(
                      'mb-6 first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-none',
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

        {/* Navigation */}
        <div
          className="mt-24 flex justify-between items-center pt-8 border-t"
          style={{ borderColor: 'currentColor' }}
        >
          {prevCity ? (
            <Link
              href={`/city/${prevCity.type}/${prevCity.name}`}
              className="group flex items-center gap-4"
            >
              <ChevronLeft className="w-6 h-6" />
              <div className="flex flex-col items-start">
                <span className={cn('text-xs uppercase tracking-widest', theme.colors.muted)}>
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
                <span className={cn('text-xs uppercase tracking-widest', theme.colors.muted)}>
                  下一页
                </span>
                <span className="font-display text-xl">{capitalizeString(nextCity.name)}</span>
              </div>
              <ChevronRight className="w-6 h-6" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};
