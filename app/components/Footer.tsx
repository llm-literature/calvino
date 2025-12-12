'use client'

import { ReactNode } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

const Logo = (props: any) => {
  return (
    <Avatar className="h-12 w-12">
        <AvatarImage src='/logo.png' alt='Calvino' />
        <AvatarFallback className="bg-stone-200 text-stone-900 font-display">C</AvatarFallback>
    </Avatar>
  )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <p className="font-display font-bold text-lg mb-4 text-stone-900 dark:text-stone-100">
      {children}
    </p>
  )
}

const FooterLink = ({ href, children }: { href: string, children: ReactNode }) => {
  return (
    <Link href={href} className="font-serif text-stone-600 dark:text-stone-400 hover:text-amber-700 dark:hover:text-amber-400 transition-colors">
      {children}
    </Link>
  )
}

export default function LargeWithLogoCentered() {
  return (
    <div className="bg-stone-100 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800">
      <div className="container mx-auto py-12 flex flex-col items-center justify-center">
        <p className="font-serif text-lg text-stone-600 dark:text-stone-400 text-center italic">
          AI与文学的碰撞是一把璀璨的太阳之剑！ ——MathewShen
        </p>
      </div>
    </div>
  )
}
