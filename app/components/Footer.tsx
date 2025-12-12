'use client'

import { ReactNode } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'

const Logo = (props: any) => {
  return (
    <Avatar>
        <AvatarImage src='/logo.png' alt='Calvino' />
        <AvatarFallback>C</AvatarFallback>
    </Avatar>
  )
}

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <p className="font-medium text-lg mb-2">
      {children}
    </p>
  )
}

export default function LargeWithLogoCentered() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <div className="container mx-auto py-20 flex flex-col items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 w-full">
          <div className="flex flex-col items-start gap-2">
            <ListHeader>Github</ListHeader>
            <Link href={'https://github.com/llm-literature'}>
              Organization
            </Link>
              <Link href={'https://github.com/llm-literature/calvino'}>
                Repository
              </Link>
            <div className="flex flex-row items-center gap-2">
              <Link href={'https://github.com/llm-literature/calvino/discussions'}>
                Discussion
              </Link>
              <Badge className="bg-green-300 dark:bg-green-800 text-white hover:bg-green-400 dark:hover:bg-green-700 border-0">
                New
              </Badge>
            </div>

            <Link href={'https://github.com/llm-literature/calvino/releases'}>
              Releases
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <ListHeader>Project</ListHeader>
            <div className="flex flex-row items-center gap-2">
                <Link href={'https://datahonor.com/beer/'}>
                Beer
                </Link>
                <Badge className="bg-red-300 dark:bg-red-800 text-white hover:bg-red-400 dark:hover:bg-red-700 border-0">
                    Hot
                </Badge>
            </div>

            <Link href={'https://datahonor.com/pysesd/'}>
              [Py]S-ESD
            </Link>
            <Link href={'https://datahonor.com/python-package-template/'}>
              MPPT
            </Link>
            <Link href={'https://datahonor.com/toyml/'}>
              ToyML
            </Link>
            <Link href={'https://datahonor.com/toydl/'}>
              ToyDL
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <ListHeader>Odyssey</ListHeader>
             <Link href={'https://datahonor.com/odyssey/aiops/'}>
              AIOps
            </Link>
            <Link href={'https://datahonor.com/odyssey/mlsys/'}>
              MlSys
            </Link>
          </div>
          <div className="flex flex-col items-start gap-2">
            <ListHeader>About</ListHeader>
            <Link href={'https://datahonor.com/about/'}>
              Me
            </Link>
            <Link href={'https://datahonor.com/'}>
              Blog
            </Link>
          </div>
        </div>
        <div className="mt-10">
            <Logo />
        </div>
      </div>
    </div>
  )
}
