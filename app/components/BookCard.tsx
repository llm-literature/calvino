'use client'

import Link from 'next/link'
import Image from 'next/image'
import {cosBase} from "@/app/components/Util";

export default function InvisibleCityCard() {
  const IMAGE = `${cosBase}/logo.png`

  return (
    <div className="flex justify-center py-1">
      <div
        className="group relative p-6 max-w-[330px] w-full bg-gray-200 dark:bg-gray-800 shadow-2xl rounded-lg z-10"
      >
        <div
          className="relative mt-[-4px] h-[230px] rounded-lg
            after:transition-all after:duration-300 after:ease-out
            after:content-[''] after:w-full after:h-full after:absolute after:top-5 after:left-0
            after:bg-cover after:blur-[15px] after:-z-10
            group-hover:after:blur-[20px]
            after:bg-[image:var(--image-url)]"
          style={{
            '--image-url': `url(${IMAGE})`
          } as React.CSSProperties}
        >
          <Image
            className="rounded-lg object-cover"
            height={230}
            width={282}
            src={IMAGE}
            alt="#"
          />
        </div>
        <div className="pt-10 flex flex-col items-center gap-2">
          <p className="text-gray-700 text-xl uppercase">
            <Link href={'/city'}>
                Invisible City
            </Link> 
          </p>
        </div>
      </div>
    </div>
  )
}
