'use client'

import Link from 'next/link'
import Image from 'next/image'
import { cosBase } from '@/app/components/Util'

export default function InvisibleCityCard() {
  const IMAGE = `${cosBase}/logo.png`

  return (
    <div className="flex justify-center py-1">
      <div className="group relative z-10 w-full max-w-[330px] rounded-lg bg-gray-200 p-6 shadow-2xl dark:bg-gray-800">
        <div
          className="relative mt-[-4px] h-[230px] rounded-lg after:absolute after:top-5 after:left-0 after:-z-10 after:h-full after:w-full after:bg-[image:var(--image-url)] after:bg-cover after:blur-[15px] after:transition-all after:duration-300 after:ease-out after:content-[''] group-hover:after:blur-[20px]"
          style={
            {
              '--image-url': `url(${IMAGE})`,
            } as React.CSSProperties
          }
        >
          <Image className="rounded-lg object-cover" height={230} width={282} src={IMAGE} alt="#" />
        </div>
        <div className="flex flex-col items-center gap-2 pt-10">
          <p className="text-xl text-gray-700 uppercase">
            <Link href={'/city'}>Invisible City</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
