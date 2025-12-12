import data from '@/public/city/data.json';
import ThinCityPage from '@/app/components/categories/ThinCityPage';
import MemoryCityPage from '@/app/components/categories/MemoryCityPage';
import TradingCityPage from '@/app/components/categories/TradingCityPage';
import DesireCityPage from '@/app/components/categories/DesireCityPage';
import SignsCityPage from '@/app/components/categories/SignsCityPage';
import DefaultCategoryPage from '@/app/components/categories/DefaultCategoryPage';

export function generateStaticParams() {
  const types = new Set(data.cities.map(city => city.type));
  return Array.from(types).map(type => ({ cityType: type }));
}

export default async function CategoryPage({ params }: { params: Promise<{ cityType: string }> }) {
  const { cityType } = await params;
  const cities = data.cities.filter(city => city.type === cityType);

  switch (cityType) {
    case 'thin':
    case 'sky':
    case 'eyes':
      return <ThinCityPage cities={cities} category={cityType} />;
    
    case 'memory':
    case 'hidden':
      return <MemoryCityPage cities={cities} category={cityType} />;
    
    case 'trading':
    case 'continuous':
      return <TradingCityPage cities={cities} category={cityType} />;
    
    case 'desire':
    case 'dead':
      return <DesireCityPage cities={cities} category={cityType} />;
    
    case 'signs':
    case 'names':
      return <SignsCityPage cities={cities} category={cityType} />;
      
    default:
      return <DefaultCategoryPage cities={cities} category={cityType} />;
  }
}
