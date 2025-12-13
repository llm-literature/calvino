'use client'

import { City } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { useState, useRef } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/app/context/LanguageContext'

type Node = {
  id: number
  x: number
  y: number
}

type Edge = {
  id: string
  from: number
  to: number
  color: string
}

const COLORS = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6']

const createNode = (x: number, y: number): Node => ({
  id: Date.now(),
  x,
  y,
})

const createEdge = (from: number, to: number): Edge => ({
  id: `${from}-${to}-${Date.now()}`,
  from,
  to,
  color: COLORS[Math.floor(Math.random() * COLORS.length)],
})

export default function Ersilia({ city }: { city: City }) {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [history, setHistory] = useState<Edge[]>([])
  const [selectedNode, setSelectedNode] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (selectedNode !== null) {
      setSelectedNode(null)
      return
    }

    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setNodes([...nodes, createNode(x, y)])
  }

  const handleNodeClick = (e: React.MouseEvent, id: number) => {
    e.stopPropagation()
    if (selectedNode === null) {
      setSelectedNode(id)
    } else if (selectedNode !== id) {
      setEdges([...edges, createEdge(selectedNode, id)])
      setSelectedNode(null)
    } else {
      setSelectedNode(null)
    }
  }

  const handleAbandon = () => {
    setHistory([...history, ...edges])
    setNodes([])
    setEdges([])
    setSelectedNode(null)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#fdf6e3] font-sans text-neutral-800 selection:bg-neutral-300">
      <Link
        href={`/city/${city.type}`}
        className="fixed top-8 left-8 z-50 rounded-full bg-white p-2 shadow-md transition-colors hover:bg-neutral-200"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>

      <div className="absolute top-8 right-8 z-50 flex gap-4">
        <button
          onClick={handleAbandon}
          className="flex items-center gap-2 rounded-full bg-neutral-800 px-4 py-2 text-white shadow-lg transition-colors hover:bg-neutral-700"
          disabled={nodes.length === 0}
        >
          <RefreshCw className="h-4 w-4" />
          {language === 'en' ? 'Abandon & Rebuild' : '放弃并重建'}
        </button>
      </div>

      <div
        ref={containerRef}
        onClick={handleCanvasClick}
        className="relative h-screen w-full cursor-crosshair"
      >
        {nodes.length === 0 && history.length === 0 && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="text-center opacity-50">
              <h1 className="mb-4 font-serif text-6xl">ERSILIA</h1>
              <p>
                {language === 'en'
                  ? 'Click to build houses. Click two houses to connect them with a relationship.'
                  : '点击建造房屋。点击两座房屋以建立关系。'}
              </p>
            </div>
          </div>
        )}

        {/* History Edges (Ghost) - Simplified for now as we don't track node history positions perfectly in this version */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-20 grayscale">
          {/* Placeholder for history visualization if we tracked coordinates */}
        </svg>

        {/* Active Edges */}
        <svg className="pointer-events-none absolute inset-0 h-full w-full">
          {edges.map((edge) => {
            const fromNode = nodes.find((n) => n.id === edge.from)
            const toNode = nodes.find((n) => n.id === edge.to)
            if (!fromNode || !toNode) return null
            return (
              <motion.line
                key={edge.id}
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={edge.color}
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
              />
            )
          })}
        </svg>

        {/* Nodes */}
        <AnimatePresence>
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={cn(
                'absolute -mt-2 -ml-2 h-4 w-4 cursor-pointer rounded-full border-2 border-white shadow-sm transition-colors',
                selectedNode === node.id
                  ? 'scale-125 bg-neutral-800'
                  : 'bg-neutral-400 hover:bg-neutral-600'
              )}
              style={{ left: node.x, top: node.y }}
              onClick={(e) => handleNodeClick(e, node.id)}
            />
          ))}
        </AnimatePresence>

        <div className="pointer-events-none absolute right-0 bottom-12 left-0 text-center">
          <p className="mx-auto max-w-xl rounded-xl bg-white/50 p-4 text-neutral-500 italic backdrop-blur">
            {language === 'en'
              ? '"When the strings become so numerous that you can no longer pass among them, the inhabitants leave: the houses are dismantled; only the strings and their supports remain."'
              : '“当绳子多得让人无法通过时，居民们就会离开：房子被拆除；只剩下绳子和它们的支架。”'}
          </p>
        </div>
      </div>
    </div>
  )
}
