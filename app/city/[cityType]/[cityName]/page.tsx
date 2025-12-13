import { getCityTheme } from '@/lib/themes'
import { ChronicleLayout } from '@/app/components/layouts/ChronicleLayout'
import { EtherealLayout } from '@/app/components/layouts/EtherealLayout'
import { BazaarLayout } from '@/app/components/layouts/BazaarLayout'
import { LabyrinthLayout } from '@/app/components/layouts/LabyrinthLayout'
import { cosBase } from '@/app/components/Util'
import Diomira from '@/app/components/cities/Diomira'
import Isidora from '@/app/components/cities/Isidora'
import Dorothea from '@/app/components/cities/Dorothea'
import Zaira from '@/app/components/cities/Zaira'
import Anastasia from '@/app/components/cities/Anastasia'
import Tamara from '@/app/components/cities/Tamara'
import Zora from '@/app/components/cities/Zora'
import Despina from '@/app/components/cities/Despina'
import Zirma from '@/app/components/cities/Zirma'
import Isaura from '@/app/components/cities/Isaura'
import Maurilia from '@/app/components/cities/Maurilia'
import Fedora from '@/app/components/cities/Fedora'
import Zoe from '@/app/components/cities/Zoe'
import Zenodia from '@/app/components/cities/Zenodia'
import Euphemia from '@/app/components/cities/Euphemia'
import Zobeide from '@/app/components/cities/Zobeide'
import Hypatia from '@/app/components/cities/Hypatia'
import Armilla from '@/app/components/cities/Armilla'
import Chloe from '@/app/components/cities/Chloe'
import Valdrada from '@/app/components/cities/Valdrada'
import Olivia from '@/app/components/cities/Olivia'
import Sophronia from '@/app/components/cities/Sophronia'
import Eutropia from '@/app/components/cities/Eutropia'
import Zemrude from '@/app/components/cities/Zemrude'
import Aglaura from '@/app/components/cities/Aglaura'
import Octavia from '@/app/components/cities/Octavia'
import Ersilia from '@/app/components/cities/Ersilia'
import Baucis from '@/app/components/cities/Baucis'
import Leandra from '@/app/components/cities/Leandra'
import Melania from '@/app/components/cities/Melania'
import Esmeralda from '@/app/components/cities/Esmeralda'
import Phyllis from '@/app/components/cities/Phyllis'
import Pyrrha from '@/app/components/cities/Pyrrha'
import Adelma from '@/app/components/cities/Adelma'
import Eudoxia from '@/app/components/cities/Eudoxia'
import Moriana from '@/app/components/cities/Moriana'
import Clarice from '@/app/components/cities/Clarice'
import Eusapia from '@/app/components/cities/Eusapia'
import Beersheba from '@/app/components/cities/Beersheba'
import Leonia from '@/app/components/cities/Leonia'
import Irene from '@/app/components/cities/Irene'
import Argia from '@/app/components/cities/Argia'
import Thekla from '@/app/components/cities/Thekla'
import Trude from '@/app/components/cities/Trude'
import Olinda from '@/app/components/cities/Olinda'
import Laudomia from '@/app/components/cities/Laudomia'
import Perinthia from '@/app/components/cities/Perinthia'
import Procopia from '@/app/components/cities/Procopia'
import Raissa from '@/app/components/cities/Raissa'
import Andria from '@/app/components/cities/Andria'
import Cecilia from '@/app/components/cities/Cecilia'
import Marozia from '@/app/components/cities/Marozia'
import Penthesilea from '@/app/components/cities/Penthesilea'
import Theodora from '@/app/components/cities/Theodora'
import Berenice from '@/app/components/cities/Berenice'
import { City } from '@/lib/types'

import data from '@/public/city/data.json'

export async function generateStaticParams() {
  const params = data.cities.map((city) => ({
    cityType: city.type,
    cityName: city.name,
  }))
  return params
}

function getCityData(cityType: string, cityName: string) {
  const index = data.cities.findIndex(
    (c) =>
      c.type.toLowerCase() === cityType.toLowerCase() &&
      c.name.toLowerCase() === cityName.toLowerCase()
  )

  if (index === -1) return null

  const city = data.cities[index]
  const prevCity = index > 0 ? data.cities[index - 1] : null
  const nextCity = index < data.cities.length - 1 ? data.cities[index + 1] : null

  return {
    city,
    prevCity,
    nextCity,
  }
}

const SpecificCityComponents: Record<string, React.ComponentType<{ city: City }>> = {
  diomira: Diomira,
  isidora: Isidora,
  dorothea: Dorothea,
  zaira: Zaira,
  anastasia: Anastasia,
  tamara: Tamara,
  zora: Zora,
  despina: Despina,
  zirma: Zirma,
  isaura: Isaura,
  maurilia: Maurilia,
  fedora: Fedora,
  zoe: Zoe,
  zenodia: Zenodia,
  euphemia: Euphemia,
  zobeide: Zobeide,
  hypatia: Hypatia,
  armilla: Armilla,
  chloe: Chloe,
  valdrada: Valdrada,
  olivia: Olivia,
  sophronia: Sophronia,
  eutropia: Eutropia,
  zemrude: Zemrude,
  aglaura: Aglaura,
  octavia: Octavia,
  ersilia: Ersilia,
  baucis: Baucis,
  leandra: Leandra,
  melania: Melania,
  esmeralda: Esmeralda,
  phyllis: Phyllis,
  pyrrha: Pyrrha,
  adelma: Adelma,
  eudoxia: Eudoxia,
  moriana: Moriana,
  clarice: Clarice,
  eusapia: Eusapia,
  beersheba: Beersheba,
  leonia: Leonia,
  irene: Irene,
  argia: Argia,
  thekla: Thekla,
  trude: Trude,
  olinda: Olinda,
  laudomia: Laudomia,
  perinthia: Perinthia,
  procopia: Procopia,
  raissa: Raissa,
  andria: Andria,
  cecilia: Cecilia,
  marozia: Marozia,
  penthesilea: Penthesilea,
  theodora: Theodora,
  berenice: Berenice,
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ cityType: string; cityName: string }>
}) {
  const { cityType, cityName } = await params
  const cityData = getCityData(cityType, cityName)

  if (!cityData) return <div>未找到该城市</div>

  const { city, prevCity, nextCity } = cityData

  // Check for specific city component first
  const SpecificComponent = SpecificCityComponents[cityName.toLowerCase()]
  if (SpecificComponent) {
    return <SpecificComponent city={city} />
  }

  const href: string = `${cityName}.png`
  const imagePath = `/city/${cityType}/${href}`
  const imageUrl = `${cosBase}${imagePath}`

  const theme = getCityTheme(cityType)

  const LayoutComponents = {
    chronicle: ChronicleLayout,
    ethereal: EtherealLayout,
    bazaar: BazaarLayout,
    labyrinth: LabyrinthLayout,
  }

  const SelectedLayout = LayoutComponents[theme.archetype] || ChronicleLayout

  return (
    <SelectedLayout
      city={city}
      prevCity={prevCity}
      nextCity={nextCity}
      description={city.cnDescription}
      imageUrl={imageUrl}
      theme={theme}
    />
  )
}
