'use client'

import Link from 'next/link'
import Image from 'next/image'
import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";

interface CityCardProps {
  cityType: string
  cityName: string
}

export default function CityCard({cityType, cityName} : CityCardProps) {
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`;
  return (
    <div className="flex justify-center py-12">
      <div
        className="group relative p-6 max-w-[330px] max-h-[500px] w-full bg-white dark:bg-gray-800 shadow-2xl rounded-lg z-10"
      >
        <div
          className="relative mt-1 h-[300px] rounded-lg
            after:transition-all after:duration-300 after:ease-out
            after:content-[''] after:w-full after:h-full after:absolute after:top-5 after:left-0
            after:bg-cover after:blur-[15px] after:-z-10
            group-hover:after:blur-[20px]
            after:bg-[image:var(--image-url)]"
          style={{
            '--image-url': `url(${imageUrl})`
          } as React.CSSProperties}
        >
          <Image
            className="rounded-full object-cover"
            fill
            src={imageUrl}
            alt="#"
          />
        </div>
        <div className="pt-10 flex flex-col items-center gap-2">
          <p className="font-light text-lg uppercase">
            {cityType.toUpperCase()}
          </p>
          <h2 className="text-2xl font-medium">
            <Link href={imagePath.split('.')[0]}>
                {capitalizeString(cityName)}
            </Link>
          </h2>
        </div>
      </div>
    </div>
  )
}

const DemoCityCardComponent = () => {
  return (
    <CityCard cityType="demo" cityName="hello"/>
  );
};

export { CityCard, DemoCityCardComponent };
