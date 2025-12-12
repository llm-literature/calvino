import { getCityTheme } from '@/lib/themes';
import { ChronicleLayout } from '@/app/components/layouts/ChronicleLayout';
import { EtherealLayout } from '@/app/components/layouts/EtherealLayout';
import { BazaarLayout } from '@/app/components/layouts/BazaarLayout';
import { LabyrinthLayout } from '@/app/components/layouts/LabyrinthLayout';
import { cosBase } from "@/app/components/Util";

import data from '@/public/city/data.json';

export async function generateStaticParams() {
  const params = data.cities.map(city => ({
    cityType: city.type,
    cityName: city.name,
  }));
  return params;
}

function getCityData(cityType: string, cityName: string) {
  const index = data.cities.findIndex(
    (c) => c.type.toLowerCase() === cityType.toLowerCase() && c.name.toLowerCase() === cityName.toLowerCase()
  );
  
  if (index === -1) return null;

  const city = data.cities[index];
  const prevCity = index > 0 ? data.cities[index - 1] : null;
  const nextCity = index < data.cities.length - 1 ? data.cities[index + 1] : null;

  return {
    city,
    prevCity,
    nextCity,
    description: city.description?.replace(/\\n/g, '\n')
  };
}

export default async function CityPage({ params }: {params: Promise<{ cityType: string, cityName: string }>}) {
  const { cityType, cityName } = await params;
  const cityData = getCityData(cityType, cityName);

  if (!cityData) return <div>未找到该城市</div>;

  const { city, description, prevCity, nextCity } = cityData;
  const href: string = `${cityName}.png`;
  const imagePath = `/city/${cityType}/${href}`;
  const imageUrl = `${cosBase}${imagePath}`

  const theme = getCityTheme(cityType);

  const LayoutComponents = {
    chronicle: ChronicleLayout,
    ethereal: EtherealLayout,
    bazaar: BazaarLayout,
    labyrinth: LabyrinthLayout,
  };

  const SelectedLayout = LayoutComponents[theme.archetype] || ChronicleLayout;

  return (
    <SelectedLayout
      city={city}
      prevCity={prevCity}
      nextCity={nextCity}
      description={description || ''}
      imageUrl={imageUrl}
      theme={theme}
    />
  );
}
