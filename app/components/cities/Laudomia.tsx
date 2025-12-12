'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Users } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export default function Laudomia({ city }: { city: City }) {
  const [realm, setRealm] = useState<'living' | 'dead' | 'unborn'>('living')

  return (
    <div className={cn(
        "relative min-h-screen font-sans overflow-hidden transition-colors duration-1000",
        realm === 'living' ? "bg-amber-50 text-amber-900" :
        realm === 'dead' ? "bg-slate-900 text-slate-300" :
        "bg-indigo-50 text-indigo-900"
    )}>
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/50 p-2 backdrop-blur transition-colors hover:bg-white/80"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-6xl font-serif mb-12">LAUDOMIA</h1>

        <div className="flex gap-8 mb-12">
            <button 
                onClick={() => setRealm('living')}
                className={cn("px-6 py-3 rounded-full transition-all", realm === 'living' ? "bg-amber-500 text-white shadow-lg scale-110" : "bg-amber-200 text-amber-800 hover:bg-amber-300")}
            >
                The Living
            </button>
            <button 
                onClick={() => setRealm('dead')}
                className={cn("px-6 py-3 rounded-full transition-all", realm === 'dead' ? "bg-slate-600 text-white shadow-lg scale-110" : "bg-slate-300 text-slate-800 hover:bg-slate-400")}
            >
                The Dead
            </button>
            <button 
                onClick={() => setRealm('unborn')}
                className={cn("px-6 py-3 rounded-full transition-all", realm === 'unborn' ? "bg-indigo-500 text-white shadow-lg scale-110" : "bg-indigo-200 text-indigo-800 hover:bg-indigo-300")}
            >
                The Unborn
            </button>
        </div>

        <div className="relative w-full max-w-4xl h-96 flex items-center justify-center">
            
            {/* The Living */}
            {realm === 'living' && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <div className="flex gap-4 justify-center mb-8">
                        <Users className="w-12 h-12 text-amber-600" />
                        <Users className="w-12 h-12 text-amber-600" />
                        <Users className="w-12 h-12 text-amber-600" />
                    </div>
                    <p className="text-xl max-w-lg mx-auto">
                        &quot;The city of the living has a population that does not grow but ages...&quot;
                    </p>
                </motion.div>
            )}

            {/* The Dead */}
            {realm === 'dead' && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <div className="grid grid-cols-10 gap-2 mb-8 opacity-50">
                        {Array.from({ length: 50 }).map((_, i) => (
                            <div key={i} className="w-2 h-2 bg-slate-500 rounded-full" />
                        ))}
                    </div>
                    <p className="text-xl max-w-lg mx-auto">
                        &quot;The city of the dead... its population increases... they are more numerous than the living.&quot;
                    </p>
                </motion.div>
            )}

            {/* The Unborn */}
            {realm === 'unborn' && (
                <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="text-center"
                >
                    <div className="w-32 h-32 border-4 border-dashed border-indigo-300 rounded-full mx-auto mb-8 animate-spin-slow flex items-center justify-center">
                        <span className="text-4xl">?</span>
                    </div>
                    <p className="text-xl max-w-lg mx-auto">
                        &quot;The city of the unborn... infinite... a grain of sand in the desert.&quot;
                    </p>
                </motion.div>
            )}

        </div>

      </div>
    </div>
  )
}
