export interface City {
  type: string
  name: string
  cnName: string
  cnDescription: string
  enDescription: string
}

export interface CategoryPageProps {
  cities: City[]
  category: string
}
