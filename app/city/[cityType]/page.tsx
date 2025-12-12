import data from '@/public/city/data.json';
import ThinCityPage from '@/app/components/categories/ThinCityPage';
import MemoryCityPage from '@/app/components/categories/MemoryCityPage';
import TradingCityPage from '@/app/components/categories/TradingCityPage';
import DesireCityPage from '@/app/components/categories/DesireCityPage';
import SignsCityPage from '@/app/components/categories/SignsCityPage';
import SkyCityPage from '@/app/components/categories/SkyCityPage';
import EyesCityPage from '@/app/components/categories/EyesCityPage';
import HiddenCityPage from '@/app/components/categories/HiddenCityPage';
import ContinuousCityPage from '@/app/components/categories/ContinuousCityPage';
import DeadCityPage from '@/app/components/categories/DeadCityPage';
import NamesCityPage from '@/app/components/categories/NamesCityPage';

export function generateStaticParams() {
  const types = new Set(data.cities.map(city => city.type));
  return Array.from(types).map(type => ({ cityType: type }));
}

export default async function CategoryPage({ params }: { params: Promise<{ cityType: string }> }) {
  const { cityType } = await params;
  const cities = data.cities.filter(city => city.type === cityType);

  switch (cityType) {
    case 'thin':
      return <ThinCityPage cities={cities} category={cityType} />;
    case 'sky':
      return <SkyCityPage cities={cities} category={cityType} />;
    case 'eyes':
      return <EyesCityPage cities={cities} category={cityType} />;
    
    case 'memory':
      return <MemoryCityPage cities={cities} category={cityType} />;
    case 'hidden':
      return <HiddenCityPage cities={cities} category={cityType} />;
    
    case 'trading':
      return <TradingCityPage cities={cities} category={cityType} />;
    case 'continuous':
      return <ContinuousCityPage cities={cities} category={cityType} />;
    
    case 'desire':
      return <DesireCityPage cities={cities} category={cityType} />;
    case 'dead':
      return <DeadCityPage cities={cities} category={cityType} />;
    
    case 'signs':
      return <SignsCityPage cities={cities} category={cityType} />;
    case 'names':
      return <NamesCityPage cities={cities} category={cityType} />;
      
    default:
      return <ThinCityPage cities={cities} category={cityType} />;
  }
}
