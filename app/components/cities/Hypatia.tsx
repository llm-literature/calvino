'use client'

import { City } from '@/lib/types'
import Link from 'next/link'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Hypatia({ city }: { city: City }) {
  return (
    <div className="relative min-h-screen bg-teal-950 text-teal-50 font-serif selection:bg-teal-700">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-black/20 p-2 transition-colors hover:bg-black/40"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24">
        <header className="mb-24 text-center">
          <h1 className="text-6xl font-bold text-teal-200 mb-4">HYPATIA</h1>
          <p className="text-teal-400/60 uppercase tracking-widest">The Language of Deception</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <DeceptiveCard 
                title="The Garden"
                beautiful="I entered Hypatia one morning, a magnolia garden reflected in blue lagoons..."
                ugly="...but at the bottom, crabs were biting the eyes of the suicides."
            />
            <DeceptiveCard 
                title="The Palace"
                beautiful="I climbed the porphyry steps of the palace with the highest domes..."
                ugly="...convicts with black chains were hauling basalt blocks from the quarry."
            />
            <DeceptiveCard 
                title="The Library"
                beautiful="I entered the great library, lost among shelves collapsing under vellum bindings..."
                ugly="...I saw a young man with an opium pipe."
            />
            <DeceptiveCard 
                title="The Stables"
                beautiful="I heard the neighing of horses and the cracking of whips..."
                ugly="...women mounted on saddles, ready to push the stranger onto a pile of hay."
            />
        </div>

        <div className="mt-24 text-center max-w-2xl mx-auto text-teal-300/80 italic">
            &quot;There is no language without deceit.&quot;
        </div>
      </div>
    </div>
  )
}

function DeceptiveCard({ title, beautiful, ugly }: { title: string, beautiful: string, ugly: string }) {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div 
            className="relative h-64 cursor-pointer group perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={cn(
                "absolute inset-0 rounded-xl p-8 transition-all duration-500 flex flex-col justify-center items-center text-center shadow-2xl border border-teal-800",
                isHovered ? "bg-red-950 border-red-900" : "bg-teal-900/50"
            )}>
                <h3 className={cn(
                    "text-xl font-bold mb-4 uppercase tracking-widest transition-colors",
                    isHovered ? "text-red-500" : "text-teal-300"
                )}>
                    {title}
                </h3>
                <p className={cn(
                    "leading-relaxed transition-opacity duration-300",
                    isHovered ? "opacity-0 absolute" : "opacity-100"
                )}>
                    {beautiful}
                </p>
                <p className={cn(
                    "leading-relaxed text-red-200 transition-opacity duration-300",
                    isHovered ? "opacity-100" : "opacity-0 absolute"
                )}>
                    {ugly}
                </p>
                
                <div className="absolute bottom-4 opacity-50">
                    {isHovered ? <EyeOff className="w-4 h-4 text-red-500" /> : <Eye className="w-4 h-4 text-teal-500" />}
                </div>
            </div>
        </div>
    )
}
