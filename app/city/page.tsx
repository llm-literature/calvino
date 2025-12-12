'use client'

import { useState, useMemo } from 'react';
import CityCard from '@/app/components/CityCard';
import data from '@/public/city/data.json';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function InvisibleCityPage() {
  const [selectedType, setSelectedType] = useState<string | 'all'>('all');

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

  // Extract unique city types
  const cityTypes = useMemo(() => {
    const types = new Set(data.cities.map(city => city.type));
    return Array.from(types).sort();
  }, []);

  // Filter cities based on selection
  const filteredCities = useMemo(() => {
    if (selectedType === 'all') return data.cities;
    return data.cities.filter(city => city.type === selectedType);
  }, [selectedType]);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col text-center items-center gap-6 mb-16 animate-fade-in">
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl text-stone-900 dark:text-stone-100">
            城市图集
          </h1>
          <p className="font-serif text-lg text-stone-600 dark:text-stone-400 max-w-2xl italic">
            "构成这个城市的不是这些，而是她的空间量度与历史事件之间的关系。"
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <Button
            variant="ghost"
            onClick={() => setSelectedType('all')}
            className={cn(
              "font-serif text-sm uppercase tracking-widest hover:bg-stone-200 dark:hover:bg-stone-800 transition-all",
              selectedType === 'all' 
                ? "bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200" 
                : "text-stone-500 dark:text-stone-400"
            )}
          >
            全部
          </Button>
          {cityTypes.map((type) => (
            <Button
              key={type}
              variant="ghost"
              onClick={() => setSelectedType(type)}
              className={cn(
                "font-serif text-sm uppercase tracking-widest hover:bg-stone-200 dark:hover:bg-stone-800 transition-all",
                selectedType === type 
                  ? "bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200" 
                  : "text-stone-500 dark:text-stone-400"
              )}
            >
              {typeMapping[type] || type}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {filteredCities.map((city) => (
            <CityCard 
              key={`${city.type}.${city.name}`}
              cityType={typeMapping[city.type] || city.type} 
              cityName={city.name} 
              originalType={city.type}
            />
          ))}
        </div>
        
        {filteredCities.length === 0 && (
          <div className="text-center py-20 text-stone-500 font-serif italic">
            该分类下暂无城市。
          </div>
        )}
      </div>
    </div>
  )
}
