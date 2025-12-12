import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';
import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

import data from '@/public/city/data.json';

export async function generateStaticParams() {
  const params = data.cities.map(city => ({
    cityType: city.type,
    cityName: city.name,
  }));
  return params;
}

function getCityData(cityType: string, cityName: string) {
  const index = data.cities.findIndex(
    (c) => c.type.toLowerCase() === cityType.toLowerCase() && c.name.toLowerCase() === cityName.toLowerCase()
  );
  
  if (index === -1) return null;

  const city = data.cities[index];
  const prevCity = index > 0 ? data.cities[index - 1] : null;
  const nextCity = index < data.cities.length - 1 ? data.cities[index + 1] : null;

  return {
    city,
    prevCity,
    nextCity,
    description: city.description?.replace(/\\n/g, '\n')
  };
}

export default async function CityPage({ params }: {params: Promise<{ cityType: string, cityName: string }>}) {
  const { cityType, cityName } = await params;
  const cityData = getCityData(cityType, cityName);

  if (!cityData) return <div>未找到该城市</div>;

  const { description, prevCity, nextCity } = cityData;
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`

  const typeMapping: Record<string, string> = {
    'memory': '记忆',
    'desire': '欲望',
    'signs': '符号',
    'thin': '轻盈',
    'trading': '贸易',
    'eyes': '眼睛',
    'names': '名字',
    'dead': '死亡',
    'sky': '天空',
    'continuous': '连绵',
    'hidden': '隐蔽'
  };

  const displayType = typeMapping[cityType.toLowerCase()] || cityType;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <div className="container mx-auto max-w-6xl px-4 py-12 md:py-20">
        
        {/* Navigation Header */}
        <div className="flex justify-between items-center mb-12 border-b border-stone-200 dark:border-stone-800 pb-4">
          <Link href="/city">
            <Button variant="ghost" className="font-serif text-stone-500 hover:text-stone-900 dark:hover:text-stone-100">
              <ChevronLeft className="w-4 h-4 mr-2" />
              返回图集
            </Button>
          </Link>
          <span className="font-serif text-sm uppercase tracking-widest text-stone-400">
            {displayType}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start animate-fade-in">
          {/* Image Section */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl bg-stone-200 dark:bg-stone-800">
              <Image
                fill
                className="object-cover"
                src={imageUrl}
                alt={`${capitalizeString(cityName)} - ${displayType}`}
                priority
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 dark:ring-white/10 pointer-events-none" />
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-stone-300 dark:border-stone-700 -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-stone-300 dark:border-stone-700 -z-10" />
          </div>

          {/* Text Section */}
          <div className="flex flex-col gap-8 order-1 lg:order-2">
            <div className="space-y-2">
              <h1 className="font-display text-5xl md:text-7xl font-bold text-stone-900 dark:text-stone-50 leading-none">
                {capitalizeString(cityName)}
              </h1>
              <div className="h-1 w-20 bg-amber-500/50" />
            </div>

            <div className="prose prose-stone dark:prose-invert prose-lg max-w-none font-serif leading-relaxed text-justify">
              <ReactMarkdown
                components={{
                  p: ({ node, ...props }) => (
                    <p className="mb-6 first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:leading-none text-stone-700 dark:text-stone-300" {...props} />
                  )
                }}
              >
                {description || ''}
              </ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between items-center mt-20 pt-8 border-t border-stone-200 dark:border-stone-800">
          {prevCity ? (
            <Link href={`/city/${prevCity.type}/${prevCity.name}`} className="group flex flex-col items-start">
              <span className="text-xs uppercase tracking-widest text-stone-400 mb-1 group-hover:text-amber-600 transition-colors">上一座城市</span>
              <span className="font-display text-xl text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-50 transition-colors">
                {capitalizeString(prevCity.name)}
              </span>
            </Link>
          ) : <div />}

          {nextCity ? (
            <Link href={`/city/${nextCity.type}/${nextCity.name}`} className="group flex flex-col items-end text-right">
              <span className="text-xs uppercase tracking-widest text-stone-400 mb-1 group-hover:text-amber-600 transition-colors">下一座城市</span>
              <span className="font-display text-xl text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-50 transition-colors">
                {capitalizeString(nextCity.name)}
              </span>
            </Link>
          ) : <div />}
        </div>
      </div>
    </div>
  )
}
