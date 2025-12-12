'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center overflow-hidden bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#444_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="container relative z-10 flex flex-col items-center text-center gap-8 px-4 animate-fade-in">
        <div className="space-y-4">
          <h1 className="font-display text-5xl sm:text-7xl md:text-9xl font-bold tracking-tighter text-stone-900 dark:text-stone-100 drop-shadow-sm">
            看不见的城市
          </h1>
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-600 dark:text-stone-400 italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;城市就像梦境，是希望与畏惧建成的，尽管她的故事线索是隐含的，组合规律是荒谬的，透视感是骗人的，并且每件事物中都隐藏着另外一件。&rdquo;
          </p>
          <p className="font-sans text-sm tracking-widest uppercase text-stone-500 dark:text-stone-500 mt-4">
            伊塔洛·卡尔维诺
          </p>
        </div>

        <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/city">
            <Button 
              size="lg" 
              className="font-display text-lg px-8 py-6 bg-stone-900 text-stone-50 hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-stone-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              进入档案馆
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-stone-50 to-transparent dark:from-stone-950 pointer-events-none"></div>
    </div>
  )
}
