'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CityTheme } from '@/lib/themes';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import capitalizeString from '@/app/components/Util';
import { useRef } from 'react';
import { City } from '@/lib/types';

interface LayoutProps {
  city: City;
  prevCity: City | null;
  nextCity: City | null;
  description: string;
  imageUrl: string;
  theme: CityTheme;
}

export const EtherealLayout = ({
  city,
  prevCity,
  nextCity,
  description,
  imageUrl,
  theme,
}: LayoutProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div
      ref={ref}
      className={cn(
        'min-h-screen font-sans overflow-hidden relative',
        theme.colors.bg,
        theme.colors.text
      )}
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className={cn(
            'absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full blur-[100px] opacity-20',
            theme.colors.accent.replace('text-', 'bg-')
          )}
        />
        <div
          className={cn(
            'absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full blur-[120px] opacity-10',
            theme.colors.text.replace('text-', 'bg-')
          )}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Section */}
        <div className="h-screen flex flex-col items-center justify-center relative">
          <motion.div style={{ y, opacity }} className="text-center z-10">
            <span
              className={cn(
                'text-sm uppercase tracking-[0.5em] mb-6 block opacity-60',
                theme.colors.text
              )}
            >
              {theme.label}
            </span>
            <h1 className="font-display text-7xl md:text-9xl font-light tracking-tight mb-8">
              {capitalizeString(city.name)}
            </h1>
            <div className="w-[1px] h-24 mx-auto bg-current opacity-20" />
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
        <div className="max-w-2xl mx-auto pb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="prose prose-lg prose-stone dark:prose-invert leading-loose text-center"
          >
            <ReactMarkdown
              components={{
                p: ({ ...props }) => (
                  <p
                    className={cn('mb-8 text-xl md:text-2xl font-light', theme.colors.text)}
                    {...props}
                  />
                ),
              }}
            >
              {description}
            </ReactMarkdown>
          </motion.div>

          {/* Navigation */}
          <div className="mt-32 flex justify-between items-center">
            {prevCity ? (
              <Link
                href={`/city/${prevCity.type}/${prevCity.name}`}
                className="group flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-display text-lg">{capitalizeString(prevCity.name)}</span>
              </Link>
            ) : (
              <div />
            )}

            {nextCity ? (
              <Link
                href={`/city/${nextCity.type}/${nextCity.name}`}
                className="group flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity"
              >
                <span className="font-display text-lg">{capitalizeString(nextCity.name)}</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
