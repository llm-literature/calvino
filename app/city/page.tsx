'use client'

import Link from "next/link";
import CityCard, {DemoCityCardComponent} from '@/app/components/CityCard';

import data from '@/public/city/data.json';

export default function InvisibleCityPage() {
    const cityCardComponents = data.cities.map((city) => (
    <CityCard cityType={city.type} cityName={city.name} key={`${city.type}.${city.name}`}/>
  ));

  return (
    <div className="container mx-auto min-w-full min-h-screen">
      <div className="flex flex-col text-center items-center gap-8 md:gap-10 py-10 md:py-12">
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-6xl leading-[110%]">
          Invisible Cities
        </h1>
      </div>

      <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {cityCardComponents}
      </div>
    </div>
  )
}
