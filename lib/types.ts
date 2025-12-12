export interface City {
  type: string;
  name: string;
  description: string;
}

export interface CategoryPageProps {
  cities: City[];
  category: string;
}
