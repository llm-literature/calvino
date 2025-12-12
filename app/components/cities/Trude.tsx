'use client'

import { City } from '@/lib/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Plane } from 'lucide-react'
import { useState } from 'react'

export default function Trude({ city }: { city: City }) {
  const [hasArrived, setHasArrived] = useState(false)

  return (
    <div className="relative min-h-screen bg-gray-200 text-gray-800 font-sans overflow-hidden selection:bg-gray-400">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white/80 p-2 shadow-md transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="container mx-auto px-4 py-24 min-h-screen flex flex-col items-center justify-center">
        
        {!hasArrived ? (
            <div className="text-center">
                <h1 className="text-6xl font-bold mb-8 text-gray-600">TRUDE</h1>
                <p className="mb-8 text-xl text-gray-500">Arriving at Trude airport...</p>
                <button 
                    onClick={() => setHasArrived(true)}
                    className="px-8 py-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2 mx-auto"
                >
                    <Plane className="w-6 h-6" /> Land
                </button>
            </div>
        ) : (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center max-w-2xl"
            >
                <h1 className="text-6xl font-bold mb-8 text-gray-600">TRUDE</h1>
                <div className="grid grid-cols-3 gap-4 mb-8 opacity-50">
                    {Array.from({ length: 9 }).map((_, i) => (
                        <div key={i} className="bg-gray-300 p-4 rounded text-xs flex flex-col items-center gap-2">
                            <div className="w-8 h-8 bg-gray-400 rounded-full" />
                            <span>Same House</span>
                        </div>
                    ))}
                </div>
                <p className="text-lg leading-relaxed text-gray-600">
                    &quot;Why come to Trude? I asked myself. And I already wanted to leave.&quot;
                    <br/><br/>
                    &quot;You can resume your flight whenever you like,&quot; they said to me, &quot;but you will arrive at another Trude, absolutely the same, detail by detail. The world is covered by a sole Trude which does not begin and does not end. Only the name of the airport changes.&quot;
                </p>
                <button 
                    onClick={() => setHasArrived(false)}
                    className="mt-8 px-6 py-3 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Depart for next city
                </button>
            </motion.div>
        )}

      </div>
    </div>
  )
}
