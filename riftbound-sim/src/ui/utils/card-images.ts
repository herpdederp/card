// Card definition ID → CDN image URL mapping
// Images sourced from piltoverarchive.com CDN (public WebP)

const CDN = "https://cdn.piltoverarchive.com/cards";

export const cardImageUrls: Record<string, string> = {
  // Legends
  "origins-legend-jinx": `${CDN}/OGN-251.webp`,
  "origins-legend-viktor": `${CDN}/OGN-265.webp`,
  "origins-legend-leesin": `${CDN}/OGN-257.webp`,
  // Champions
  "origins-champ-jinx-fury": `${CDN}/OGN-030.webp`,
  // Units
  "origins-unit-caitlyn": `${CDN}/OGN-068.webp`,
  "origins-unit-zaunite-scrapper": `${CDN}/OGN-202.webp`,
  "origins-unit-piltover-enforcer": `${CDN}/OGN-117.webp`,
  "origins-unit-shadow-assassin": `${CDN}/OGN-078.webp`,
  "origins-unit-stone-golem": `${CDN}/OGN-151.webp`,
  // Spells
  "origins-spell-mystic-shot": `${CDN}/OGN-012.webp`,
  "origins-spell-denial": `${CDN}/OGN-045.webp`,
  // Gear
  "origins-gear-long-sword": `${CDN}/OGN-003.webp`,
  // Runes
  "origins-rune-fury": `${CDN}/OGN-007.webp`,
  "origins-rune-calm": `${CDN}/OGN-042.webp`,
  "origins-rune-mind": `${CDN}/OGN-089.webp`,
  "origins-rune-body": `${CDN}/OGN-126.webp`,
  "origins-rune-chaos": `${CDN}/OGN-166.webp`,
  "origins-rune-order": `${CDN}/OGN-214.webp`,
  // Battlefields
  "origins-bf-piltover-plaza": `${CDN}/OGN-297.webp`,
  "origins-bf-zaun-streets": `${CDN}/OGN-298.webp`,
};

export function getCardImageUrl(defId: string): string | undefined {
  return cardImageUrls[defId];
}
