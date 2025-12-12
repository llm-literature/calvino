'use client'

import * as React from "react"
import Link from "next/link"
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

export default function WithSubnavigation() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border-b border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800">
      <div className="flex min-h-[60px] py-2 px-4 items-center">
        <div className="flex flex-1 md:hidden ml-[-8px]">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="h-3 w-3" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
        <div className="flex flex-1 justify-center md:justify-start">
          <p className="text-center md:text-left font-heading text-gray-800 dark:text-white">
            Calvino
          </p>

          <div className="hidden md:flex ml-10">
            <DesktopNav />
          </div>
        </div>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
        <CollapsibleContent>
          <MobileNav />
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

const DesktopNav = () => {
  return (
    <div className="flex flex-row gap-4">
      {NAV_ITEMS.map((navItem) => (
        <div key={navItem.label}>
          <Popover>
            <PopoverTrigger asChild>
              <Link
                href={navItem.href ?? '#'}
                className="p-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-gray-200 dark:hover:text-white hover:no-underline"
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent className="w-sm p-4 rounded-xl shadow-xl bg-white dark:bg-gray-800 border-0">
                <div className="flex flex-col gap-2">
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </div>
              </PopoverContent>
            )}
          </Popover>
        </div>
      ))}
    </div>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href ?? '#'}
      className="group block p-2 rounded-md hover:bg-pink-50 dark:hover:bg-gray-900"
    >
      <div className="flex flex-row items-center">
        <div>
          <p className="font-medium transition-all duration-300 group-hover:text-pink-400">
            {label}
          </p>
          <p className="text-sm">{subLabel}</p>
        </div>
        <div className="flex flex-1 justify-end items-center transition-all duration-300 transform translate-x-[-10px] opacity-0 group-hover:opacity-100 group-hover:translate-x-0">
          <ChevronRight className="text-pink-400 h-5 w-5" />
        </div>
      </div>
    </Link>
  )
}

const MobileNav = () => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 md:hidden flex flex-col gap-4">
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
        className="flex justify-between items-center py-2 cursor-pointer hover:no-underline"
        onClick={() => children && setIsOpen(!isOpen)}
      >
        <Link
            href={href ?? '#'}
            className="font-semibold text-gray-600 dark:text-gray-200"
        >
            {label}
        </Link>
        {children && (
          <ChevronDown
            className={cn(
              "transition-all duration-250 ease-in-out h-6 w-6",
              isOpen ? "rotate-180" : ""
            )}
          />
        )}
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="mt-0!important">
        <CollapsibleContent>
          <div className="mt-2 pl-4 border-l border-gray-200 dark:border-gray-700 flex flex-col items-start gap-2">
            {children &&
              children.map((child) => (
                <Link key={child.label} href={child.href ?? '#'} className="py-2">
                  {child.label}
                </Link>
              ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
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
        label: 'Home',
        href: '/',
        },
    {
    label: 'Invisible City',
    href: '/city',
    },
    {
      label: "❤️Star",
      href: 'https://github.com/llm-literature/calvino',
    },
]
