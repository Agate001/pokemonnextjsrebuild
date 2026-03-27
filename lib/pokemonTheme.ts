export type PokemonTheme = {
  gradientFrom: string;
  gradientTo: string;
  accent: string;
  soft: string;
  badgeBg: string;
  badgeText: string;
};

const themeMap: Record<string, PokemonTheme> = {
  normal: {
    gradientFrom: "#B8B8A8",
    gradientTo: "#8F8F7A",
    accent: "#8F8F7A",
    soft: "#F7F7F2",
    badgeBg: "#F1F1EA",
    badgeText: "#6F6F5F",
  },
  fire: {
    gradientFrom: "#FF7D7D",
    gradientTo: "#EE8130",
    accent: "#EE8130",
    soft: "#FFF1EA",
    badgeBg: "#FFE1D1",
    badgeText: "#C65D12",
  },
  water: {
    gradientFrom: "#7CC7FF",
    gradientTo: "#6390F0",
    accent: "#6390F0",
    soft: "#EEF6FF",
    badgeBg: "#DCEBFF",
    badgeText: "#3366CC",
  },
  electric: {
    gradientFrom: "#FFE78A",
    gradientTo: "#F7D02C",
    accent: "#D4A800",
    soft: "#FFFBEA",
    badgeBg: "#FFF1B8",
    badgeText: "#9C7B00",
  },
  grass: {
    gradientFrom: "#8BE39A",
    gradientTo: "#7AC74C",
    accent: "#58A832",
    soft: "#EFFBEF",
    badgeBg: "#DDF5D8",
    badgeText: "#3F7F22",
  },
  ice: {
    gradientFrom: "#BDF3F0",
    gradientTo: "#96D9D6",
    accent: "#4DA8A3",
    soft: "#EEFDFC",
    badgeBg: "#D7F5F3",
    badgeText: "#2C7F7A",
  },
  fighting: {
    gradientFrom: "#E56B6B",
    gradientTo: "#C22E28",
    accent: "#C22E28",
    soft: "#FFF0F0",
    badgeBg: "#FFDADA",
    badgeText: "#92211D",
  },
  poison: {
    gradientFrom: "#C77DCC",
    gradientTo: "#A33EA1",
    accent: "#A33EA1",
    soft: "#FBF0FB",
    badgeBg: "#F0D8F0",
    badgeText: "#7B2C79",
  },
  ground: {
    gradientFrom: "#EFD08A",
    gradientTo: "#E2BF65",
    accent: "#B08B32",
    soft: "#FFF8EA",
    badgeBg: "#F7E9C7",
    badgeText: "#8A6A1F",
  },
  flying: {
    gradientFrom: "#C8BAFF",
    gradientTo: "#A98FF3",
    accent: "#7A63D8",
    soft: "#F5F2FF",
    badgeBg: "#E7E0FF",
    badgeText: "#5E48B8",
  },
  psychic: {
    gradientFrom: "#FF9DBA",
    gradientTo: "#F95587",
    accent: "#F95587",
    soft: "#FFF0F5",
    badgeBg: "#FFD9E5",
    badgeText: "#C72F62",
  },
  bug: {
    gradientFrom: "#C9DC57",
    gradientTo: "#A6B91A",
    accent: "#7C8D14",
    soft: "#F8FCEB",
    badgeBg: "#EAF4C8",
    badgeText: "#66740F",
  },
  rock: {
    gradientFrom: "#D8C36A",
    gradientTo: "#B6A136",
    accent: "#8C7723",
    soft: "#FCF8EA",
    badgeBg: "#EEE2B9",
    badgeText: "#6E5A12",
  },
  ghost: {
    gradientFrom: "#9B84C9",
    gradientTo: "#735797",
    accent: "#735797",
    soft: "#F5F1FB",
    badgeBg: "#E3DAF2",
    badgeText: "#58407A",
  },
  dragon: {
    gradientFrom: "#9E7CFF",
    gradientTo: "#6F35FC",
    accent: "#6F35FC",
    soft: "#F4F0FF",
    badgeBg: "#E2D8FF",
    badgeText: "#5320CC",
  },
  dark: {
    gradientFrom: "#8B7569",
    gradientTo: "#705746",
    accent: "#705746",
    soft: "#F6F3F1",
    badgeBg: "#E7DED8",
    badgeText: "#574335",
  },
  steel: {
    gradientFrom: "#D1D1E8",
    gradientTo: "#B7B7CE",
    accent: "#7E7E9A",
    soft: "#F7F8FB",
    badgeBg: "#E5E7F0",
    badgeText: "#666A85",
  },
  fairy: {
    gradientFrom: "#F0B5CF",
    gradientTo: "#D685AD",
    accent: "#C05A90",
    soft: "#FFF2F8",
    badgeBg: "#F9DDEA",
    badgeText: "#A34374",
  },
};

export function getPokemonTheme(typeName?: string): PokemonTheme {
  if (!typeName) return themeMap.normal;

  const normalizedType = typeName.toLowerCase().trim();
  return themeMap[normalizedType] ?? themeMap.normal;
}