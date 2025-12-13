export type CityArchetype = 'ethereal' | 'labyrinth' | 'bazaar' | 'chronicle'

export interface CityTheme {
  id: string
  label: string
  cnLabel: string
  archetype: CityArchetype
  colors: {
    bg: string
    text: string
    accent: string
    muted: string
    border: string
  }
  pattern?: string
}

export const cityThemes: Record<string, CityTheme> = {
  memory: {
    id: 'memory',
    label: 'Memory',
    cnLabel: '记忆',
    archetype: 'chronicle',
    colors: {
      bg: 'bg-[#F5F0E6]', // Antique White
      text: 'text-[#4A3B32]', // Sepia Brown
      accent: 'text-[#8C6239]', // Bronze
      muted: 'text-[#A69080]',
      border: 'border-[#D7C4BB]',
    },
  },
  desire: {
    id: 'desire',
    label: 'Desire',
    cnLabel: '欲望',
    archetype: 'bazaar',
    colors: {
      bg: 'bg-[#2A0A12]', // Deep Burgundy
      text: 'text-[#FADADD]', // Pale Pink
      accent: 'text-[#FF4081]', // Hot Pink
      muted: 'text-[#9C4D5E]',
      border: 'border-[#5C1E2D]',
    },
  },
  signs: {
    id: 'signs',
    label: 'Signs',
    cnLabel: '符号',
    archetype: 'labyrinth',
    colors: {
      bg: 'bg-[#0F172A]', // Slate 900
      text: 'text-[#E2E8F0]', // Slate 200
      accent: 'text-[#38BDF8]', // Sky 400
      muted: 'text-[#64748B]',
      border: 'border-[#334155]',
    },
  },
  thin: {
    id: 'thin',
    label: 'Thin',
    cnLabel: '轻盈',
    archetype: 'ethereal',
    colors: {
      bg: 'bg-[#F8FAFC]', // Slate 50
      text: 'text-[#334155]', // Slate 700
      accent: 'text-[#94A3B8]', // Slate 400
      muted: 'text-[#CBD5E1]',
      border: 'border-[#E2E8F0]',
    },
  },
  trading: {
    id: 'trading',
    label: 'Trading',
    cnLabel: '贸易',
    archetype: 'bazaar',
    colors: {
      bg: 'bg-[#0C4A6E]', // Sky 950
      text: 'text-[#E0F2FE]', // Sky 50
      accent: 'text-[#FBBF24]', // Amber 400
      muted: 'text-[#7DD3FC]',
      border: 'border-[#075985]',
    },
  },
  eyes: {
    id: 'eyes',
    label: 'Eyes',
    cnLabel: '眼睛',
    archetype: 'ethereal',
    colors: {
      bg: 'bg-[#FFFFFF]',
      text: 'text-[#171717]',
      accent: 'text-[#06B6D4]', // Cyan
      muted: 'text-[#A3A3A3]',
      border: 'border-[#E5E5E5]',
    },
  },
  names: {
    id: 'names',
    label: 'Names',
    cnLabel: '名字',
    archetype: 'chronicle',
    colors: {
      bg: 'bg-[#E7E5E4]', // Stone 200
      text: 'text-[#1C1917]', // Stone 900
      accent: 'text-[#DC2626]', // Red 600
      muted: 'text-[#78716C]',
      border: 'border-[#A8A29E]',
    },
  },
  dead: {
    id: 'dead',
    label: 'Dead',
    cnLabel: '死亡',
    archetype: 'labyrinth',
    colors: {
      bg: 'bg-[#000000]',
      text: 'text-[#A3A3A3]', // Neutral 400
      accent: 'text-[#FFFFFF]',
      muted: 'text-[#525252]',
      border: 'border-[#262626]',
    },
  },
  sky: {
    id: 'sky',
    label: 'Sky',
    cnLabel: '天空',
    archetype: 'ethereal',
    colors: {
      bg: 'bg-[#F0F9FF]', // Sky 50
      text: 'text-[#0369A1]', // Sky 700
      accent: 'text-[#0EA5E9]', // Sky 500
      muted: 'text-[#BAE6FD]',
      border: 'border-[#7DD3FC]',
    },
  },
  continuous: {
    id: 'continuous',
    label: 'Continuous',
    cnLabel: '连绵',
    archetype: 'labyrinth',
    colors: {
      bg: 'bg-[#18181B]', // Zinc 900
      text: 'text-[#E4E4E7]', // Zinc 200
      accent: 'text-[#22C55E]', // Green 500
      muted: 'text-[#71717A]',
      border: 'border-[#3F3F46]',
    },
  },
  hidden: {
    id: 'hidden',
    label: 'Hidden',
    cnLabel: '隐蔽',
    archetype: 'chronicle',
    colors: {
      bg: 'bg-[#292524]', // Stone 800
      text: 'text-[#D6D3D1]', // Stone 300
      accent: 'text-[#D97706]', // Amber 600
      muted: 'text-[#78716C]',
      border: 'border-[#44403C]',
    },
  },
}

export const getCityTheme = (type: string): CityTheme => {
  return cityThemes[type.toLowerCase()] || cityThemes.memory
}
