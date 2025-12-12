'use client'

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github } from "lucide-react";

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringBook, setIsHoveringBook] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white selection:bg-white/20">
      {/* Starry Background */}
      <div className="absolute inset-0 z-0">
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
              scale: Math.random() * 0.5 + 0.5,
              opacity: Math.random() * 0.5 + 0.2,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: Math.random() * 3 + 1 + "px",
              height: Math.random() * 3 + 1 + "px",
            }}
          />
        ))}
      </div>

      {/* Interactive Cursor Light */}
      <div 
        className="absolute w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none z-0 transition-opacity duration-500"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          opacity: isHoveringBook ? 0.8 : 0.3
        }}
      />

      {/* GitHub Link - Creative Placement */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute top-8 right-8 z-50"
      >
        <Link href="https://github.com/llm-literature/calvino" target="_blank" className="group flex items-center gap-2 text-white/30 hover:text-white transition-colors duration-500">
          <span className="font-mono text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-x-2 group-hover:translate-x-0">SOURCE_CODE</span>
          <Github className="w-5 h-5" />
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-12 px-4">
        
        {/* The Book - Central Interactive Element */}
        <Link href="/city">
          <motion.div
            className="relative w-64 h-80 md:w-80 md:h-[480px] cursor-pointer perspective-1000"
            onHoverStart={() => setIsHoveringBook(true)}
            onHoverEnd={() => setIsHoveringBook(false)}
            initial={{ rotateY: 0, rotateX: 0 }}
            whileHover={{ scale: 1.05 }}
          >
            {/* Book Cover */}
            <motion.div 
              className="absolute inset-0 bg-[#1a1a1a] border border-white/20 rounded-r-lg shadow-[20px_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center p-8 overflow-hidden"
              animate={{ 
                rotateY: isHoveringBook ? -15 : 0,
                x: isHoveringBook ? -10 : 0
              }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {/* Cover Texture */}
              <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
              
              {/* Title on Cover */}
              <div className="relative z-10 border-2 border-white/30 p-6 w-full h-full flex flex-col items-center justify-between">
                <div className="text-center">
                  <h1 className="font-display text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600 tracking-tighter mb-2">
                    INVISIBLE<br/>CITIES
                  </h1>
                  <p className="font-serif text-xs tracking-[0.3em] text-gray-400">ITALO CALVINO</p>
                </div>

                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              {/* Spine Highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-white/10 to-transparent" />
            </motion.div>

            {/* Book Pages (Side View) */}
            <motion.div 
              className="absolute top-2 bottom-2 right-0 w-12 bg-[#e3e3e3] rounded-r-sm origin-left"
              style={{ transform: 'translateX(100%) rotateY(-90deg)' }}
              animate={{ 
                rotateY: isHoveringBook ? -80 : -90,
              }}
            >
              {[...Array(5)].map((_, i) => (
                <div key={i} className="absolute inset-x-0 h-px bg-black/10" style={{ top: `${i * 20}%` }} />
              ))}
            </motion.div>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
