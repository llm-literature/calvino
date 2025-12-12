import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import capitalizeString from "@/app/components/Util";
import {cosBase} from "@/app/components/Util";

import data from '@/public/city/data.json';


export async function generateStaticParams() {
  const params = data.cities.map(city => ({
    cityType: city.type,
    cityName: city.name,
  }));
  return params;
}


function getCityDescription(cityType: string, cityName: string): string | undefined {
  const city = data.cities.find(
    (c) => c.type.toLowerCase() === cityType.toLowerCase() && c.name.toLowerCase() === cityName.toLowerCase()
  );
  // Process literal \n characters to actual newlines for proper text display
  return city?.description?.replace(/\\n/g, '\n');
}

export default async function CityPage({ params }: {params: Promise<{ cityType: string, cityName: string }>}) {
  const { cityType, cityName } = await params;

  const description = getCityDescription(cityType, cityName);
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`
  return (
    <div className="container mx-auto max-w-7xl min-h-screen py-8 md:py-12">
      {/* Title Section */}
      <div className="mb-8 md:mb-12">
        <div className="flex flex-col text-center items-center py-4 md:py-6">
          <h1 className="font-semibold text-3xl sm:text-4xl md:text-6xl leading-[110%] mb-4 md:mb-6">
            {capitalizeString(cityType)}/{capitalizeString(cityName)}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
        {/* Image Section */}
        <div>
          <div className="flex justify-center">
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-xl overflow-hidden shadow-xl transition-transform duration-300 hover:scale-102">
                <Image
                fill
                className="object-cover"
                src={imageUrl}
                alt={`${capitalizeString(cityName)} - ${capitalizeString(cityType)}`}
                />
            </div>
          </div>
        </div>

        {/* Text Section */}
        <div>
          <div className="flex flex-col gap-4 text-left px-4 md:px-6 lg:px-0">
            <ReactMarkdown
              components={{
                p: ({ node, ...props }) => (
                  <p
                    className="text-base md:text-lg leading-[1.8] text-gray-700 dark:text-gray-300 text-justify"
                    {...props}
                  />
                )
              }}
            >
              {description}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}
