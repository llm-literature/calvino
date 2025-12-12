'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible'

export default function WithSubnavigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/80 backdrop-blur-md dark:border-stone-800 dark:bg-stone-950/80">
      <div className="container mx-auto flex min-h-[60px] items-center justify-between px-4 py-2">
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
            className="text-stone-900 dark:text-stone-100"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <div className="flex justify-center md:justify-start">
          <Link
            href="/"
            className="font-display text-center text-2xl font-bold tracking-tight text-stone-900 md:text-left dark:text-stone-100"
          >
            Calvino
          </Link>
        </div>

        <div className="hidden md:flex">
          <DesktopNav />
        </div>

        {/* Spacer for mobile layout balance */}
        <div className="w-10 md:hidden"></div>
      </div>

      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="border-t border-stone-200 md:hidden dark:border-stone-800"
      >
        <CollapsibleContent>
          <MobileNav />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

const DesktopNav = () => {
  return (
    <div className="flex flex-row gap-8">
      {NAV_ITEMS.map((navItem) => (
        <div key={navItem.label}>
          <Link
            href={navItem.href ?? '#'}
            className="group relative py-2 font-serif text-sm font-medium text-stone-600 transition-colors hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
          >
            {navItem.label}
            <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
          </Link>
        </div>
      ))}
    </div>
  )
}

const MobileNav = () => {
  return (
    <div className="flex flex-col gap-4 bg-stone-50 p-4 md:hidden dark:bg-stone-950">
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </div>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex cursor-pointer items-center justify-between py-2 hover:no-underline"
        onClick={() => children && setIsOpen(!isOpen)}
      >
        <Link
          href={href ?? '#'}
          className="font-serif font-semibold text-stone-600 dark:text-stone-200"
        >
          {label}
        </Link>
      </div>
    </div>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: '首页',
    href: '/',
  },
  {
    label: '图集',
    href: '/city',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/llm-literature/calvino',
  },
]
