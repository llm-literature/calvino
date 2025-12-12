'use client'

import Link from "next/link";
import WithSpeechBubbles from './Testimonial';
import InvisibleCityCard from './BookCard';

export default function LandingPage() {
  return (
    <div className="container mx-auto min-w-full min-h-screen">
      <div className="flex flex-col text-center items-center gap-8 md:gap-10 py-10 md:py-12">
        <h1 className="font-semibold text-3xl sm:text-4xl md:text-6xl leading-[110%]">
          Italo Calvino
        </h1>
        {/* <button className="text-center text-gray-500">
          <Link href={"/city"}>Invisible Cities</Link>
        </button> */}
      </div>
      <InvisibleCityCard/>
      <WithSpeechBubbles/>
    </div>
  )
}
