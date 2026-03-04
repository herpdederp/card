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
  "origins-champ-caitlyn": `${CDN}/OGN-068.webp`,
  // Units
  "origins-unit-chemtech-enforcer": `${CDN}/OGN-003.webp`,
  "origins-unit-noxus-saboteur": `${CDN}/OGN-018.webp`,
  "origins-unit-eager-apprentice": `${CDN}/OGN-084.webp`,
  "origins-unit-bilgewater-bully": `${CDN}/OGN-125.webp`,
  "origins-unit-vanguard-captain": `${CDN}/OGN-218.webp`,
  // Spells
  "origins-spell-get-excited": `${CDN}/OGN-008.webp`,
  "origins-spell-defy": `${CDN}/OGN-045.webp`,
  // Gear
  "origins-gear-iron-ballista": `${CDN}/OGN-017.webp`,
  // Runes
  "origins-rune-fury": `${CDN}/OGN-007.webp`,
  "origins-rune-calm": `${CDN}/OGN-042.webp`,
  "origins-rune-mind": `${CDN}/OGN-089.webp`,
  "origins-rune-body": `${CDN}/OGN-126.webp`,
  "origins-rune-chaos": `${CDN}/OGN-166.webp`,
  "origins-rune-order": `${CDN}/OGN-214.webp`,
  // Battlefields
  "origins-bf-grand-plaza": `${CDN}/OGN-293.webp`,
  "origins-bf-zaun-warrens": `${CDN}/OGN-298.webp`,
};

export function getCardImageUrl(defId: string): string | undefined {
  return cardImageUrls[defId];
}
