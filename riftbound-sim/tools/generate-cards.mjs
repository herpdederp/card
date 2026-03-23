#!/usr/bin/env node
// ============================================================================
// Riftbound TCG — Card Definition Generator
// ============================================================================
// Reads data/origins-cards.json and generates TypeScript card definition files.
// Usage: node tools/generate-cards.mjs
// ============================================================================

import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/origins-cards.json");
const CARDS_DIR = resolve(__dirname, "../src/cards/origins");
const IMAGES_PATH = resolve(__dirname, "../src/ui/utils/card-images.ts");

const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

// Cards that already exist in sample-cards.ts with curated ability definitions.
// These are excluded from generation to preserve their exact structure and scripts.
const SAMPLE_CARD_NUMBERS = new Set([
  1, // Blazing Scorcher - wait, this isn't in sample-cards
  3,   // Chemtech Enforcer
  7,   // Fury Rune
  8,   // Get Excited!
  17,  // Iron Ballista
  18,  // Noxus Saboteur
  42,  // Calm Rune
  45,  // Defy
  68,  // Caitlyn, Patrolling
  84,  // Eager Apprentice
  89,  // Mind Rune
  125, // Bilgewater Bully
  126, // Body Rune
  166, // Chaos Rune
  214, // Order Rune
  218, // Vanguard Captain
  251, // Jinx, Loose Cannon
  257, // Lee Sin, Blind Monk
  265, // Viktor, Herald of the Arcane
  293, // The Grand Plaza
  298, // Zaun Warrens
  30,  // Jinx, Demolitionist
]);
// Remove 1 (Blazing Scorcher) - not in sample
SAMPLE_CARD_NUMBERS.delete(1);

const newCards = data.filter((c) => !SAMPLE_CARD_NUMBERS.has(c.collectorNumber));

// Track used variable names and IDs to prevent duplicates
const usedVarNames = new Set();
const usedIds = new Set();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function kebab(str) {
  return str
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function camel(str) {
  return str
    .replace(/[''!.]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, " ")
    .trim()
    .split(" ")
    .map((w, i) => (i === 0 ? w.toLowerCase() : w[0].toUpperCase() + w.slice(1).toLowerCase()))
    .join("");
}

function pascal(str) {
  const c = camel(str);
  return c[0].toUpperCase() + c.slice(1);
}

function generateId(card) {
  const typePrefix = {
    Legend: "legend",
    Champion: "champ",
    Unit: "unit",
    Spell: "spell",
    Gear: "gear",
    Rune: "rune",
    Battlefield: "bf",
    Token: "token",
  };
  const prefix = typePrefix[card.type] || "card";
  return `origins-${prefix}-${kebab(card.name)}`;
}

function parseName(card) {
  // Cards with commas have "Name, Subtitle" format
  if (card.name.includes(",")) {
    const parts = card.name.split(",").map((s) => s.trim());
    return { name: parts[0], subtitle: parts.slice(1).join(", ") };
  }
  // Cards with type-specific naming (e.g., "Dr. Mundo Expert" -> "Dr. Mundo", "Expert")
  // Just use full name as name, no subtitle
  return { name: card.name, subtitle: undefined };
}

function mapDomain(d) {
  const map = { Fury: "Domain.Fury", Calm: "Domain.Calm", Mind: "Domain.Mind", Body: "Domain.Body", Chaos: "Domain.Chaos", Order: "Domain.Order" };
  return map[d] || null;
}

function mapRarity(r) {
  const map = { Common: "Rarity.Common", Uncommon: "Rarity.Uncommon", Rare: "Rarity.Rare", Epic: "Rarity.Epic", Legendary: "Rarity.Legendary" };
  return map[r] || "Rarity.Common";
}

function mapType(t) {
  const map = { Legend: "CardType.Legend", Champion: "CardType.Champion", Unit: "CardType.Unit", Spell: "CardType.Spell", Gear: "CardType.Gear", Rune: "CardType.Rune", Battlefield: "CardType.Battlefield", Token: "CardType.Unit" };
  return map[t] || "CardType.Unit";
}

function parseKeywords(rulesText) {
  if (!rulesText) return [];
  const keywords = [];
  if (/\bACCELERATE\b/i.test(rulesText)) keywords.push("Keyword.Accelerate");
  if (/\bASSAULT\b/i.test(rulesText)) keywords.push("Keyword.Assault");
  if (/\bDEFLECT\b/i.test(rulesText)) keywords.push("Keyword.Deflect");
  if (/\bGANKING\b/i.test(rulesText)) keywords.push("Keyword.Ganking");
  if (/\bHIDDEN\b/i.test(rulesText)) keywords.push("Keyword.Hidden");
  if (/\bLEGION\b/i.test(rulesText)) keywords.push("Keyword.Legion");
  if (/\bSHIELD\b/i.test(rulesText)) keywords.push("Keyword.Shield");
  if (/\bSIGNATURE\b/i.test(rulesText)) keywords.push("Keyword.Signature");
  if (/\bTEMPORARY\b/i.test(rulesText)) keywords.push("Keyword.Temporary");
  return keywords;
}

function parseSpellTiming(rulesText) {
  if (!rulesText) return null;
  if (/\bACTION\b/i.test(rulesText)) return "SpellTiming.Action";
  if (/\bREACTION\b/i.test(rulesText)) return "SpellTiming.Reaction";
  return "SpellTiming.Normal";
}

function inferTrigger(card) {
  const rt = card.rulesText || "";
  if (/\bWhen you play me\b/i.test(rt)) return "TriggerType.OnPlay";
  if (/\bWhen I (die|am destroyed)\b/i.test(rt) || /\bDEATHKNELL\b/i.test(rt)) return "TriggerType.OnDestroy";
  if (/\bWhen (I|you) conquer\b/i.test(rt)) return "TriggerType.OnConquer";
  if (/\bWhen .* move/i.test(rt)) return "TriggerType.OnMove";
  if (/\bstart of .* Beginning Phase\b/i.test(rt) || /\bAt the start of your turn\b/i.test(rt)) return "TriggerType.OnTurnStart";
  if (/\bAt the end of your turn\b/i.test(rt)) return "TriggerType.OnTurnEnd";
  if (/\btap\b.*:/i.test(rt) || /\[\s*tap\s*\]/i.test(rt)) return "TriggerType.Activated";
  if (/\bWhen .* attack/i.test(rt)) return "TriggerType.OnShowdownStart";
  if (/\bWhen you hold\b/i.test(rt)) return "TriggerType.OnBattlefieldConquered";
  if (/\bWhile\b/i.test(rt) || /\bother .* have\b/i.test(rt)) return "TriggerType.Static";
  return "TriggerType.OnPlay";
}

function inferTarget(card) {
  const rt = card.rulesText || "";
  if (/\ba unit at a battlefield\b/i.test(rt) || /\bchoose a unit\b/i.test(rt)) return "TargetType.AnyUnit";
  if (/\bfriendly unit\b/i.test(rt)) return "TargetType.FriendlyUnit";
  if (/\benemy unit\b/i.test(rt)) return "TargetType.EnemyUnit";
  return "TargetType.None";
}

function escapeStr(s) {
  if (!s) return '""';
  return JSON.stringify(s).replace(/\\n/g, " ");
}

// ---------------------------------------------------------------------------
// Generate a single CardDefinition as TypeScript
// ---------------------------------------------------------------------------
function generateCardDef(card) {
  const { name, subtitle } = parseName(card);
  let id = generateId(card);
  const fullName = subtitle ? `${name}, ${subtitle}` : name;
  let varName = camel(card.name) + pascal(card.type);

  // Deduplicate variable names and IDs (e.g., 3 Recruit tokens)
  if (usedVarNames.has(varName)) {
    varName = varName + card.collectorNumber;
  }
  if (usedIds.has(id)) {
    id = id + "-" + card.collectorNumber;
  }
  usedVarNames.add(varName);
  usedIds.add(id);
  const domains = (card.domains || []).map(mapDomain).filter(Boolean);
  const keywords = parseKeywords(card.rulesText);
  const rarity = mapRarity(card.rarity);
  const cardType = mapType(card.type);
  const energyCost = card.energyCost || 0;
  const rulesText = (card.rulesText || "").replace(/&#160;/g, " ").replace(/\s+/g, " ").trim();

  let lines = [];
  lines.push(`export const ${varName}: CardDefinition = {`);
  lines.push(`  id: ${escapeStr(id)},`);
  lines.push(`  name: ${escapeStr(name)},`);
  if (subtitle) lines.push(`  subtitle: ${escapeStr(subtitle)},`);
  lines.push(`  fullName: ${escapeStr(fullName)},`);
  lines.push(`  set: CardSet.Origins,`);
  lines.push(`  type: ${cardType},`);
  lines.push(`  domains: [${domains.join(", ")}],`);
  // Power cost: the number of domain-specific runes to recycle
  const powerCost = card.powerCost || 0;
  if (powerCost > 0 && domains.length > 0) {
    // Power cost is paid in the card's primary domain
    lines.push(`  cost: { energyCost: ${energyCost}, powerCosts: [{ domain: ${domains[0]}, amount: ${powerCost} }] },`);
  } else {
    lines.push(`  cost: { energyCost: ${energyCost}, powerCosts: [] },`);
  }

  if (card.might !== null && card.might !== undefined) {
    lines.push(`  might: ${card.might},`);
    // Default health to might if not specified
    lines.push(`  health: ${card.health || card.might},`);
  }

  lines.push(`  keywords: [${keywords.join(", ")}],`);

  // Abilities
  if (rulesText && card.type !== "Rune" && card.type !== "Token") {
    const abilityId = `${kebab(card.name)}-ability`;
    const abilityName = subtitle || name;
    const trigger = inferTrigger(card);
    const target = inferTarget(card);

    lines.push(`  abilities: [`);
    lines.push(`    {`);
    lines.push(`      id: ${escapeStr(abilityId)},`);
    lines.push(`      name: ${escapeStr(abilityName)},`);
    lines.push(`      description: ${escapeStr(rulesText)},`);
    lines.push(`      trigger: ${trigger},`);
    lines.push(`      targetType: ${target},`);
    lines.push(`    },`);
    lines.push(`  ],`);
  } else {
    lines.push(`  abilities: [],`);
  }

  if (card.type === "Spell") {
    const timing = parseSpellTiming(card.rulesText);
    if (timing) lines.push(`  spellTiming: ${timing},`);
  }

  if (card.type === "Battlefield") {
    lines.push(`  battlefieldEffect: ${escapeStr(rulesText)},`);
  }

  lines.push(`  rarity: ${rarity},`);
  lines.push(`  rulesText: ${escapeStr(rulesText)},`);
  lines.push(`  artAsset: "",`);
  lines.push(`};`);

  return { varName, code: lines.join("\n"), id };
}

// ---------------------------------------------------------------------------
// File header
// ---------------------------------------------------------------------------
function fileHeader(description) {
  return `// ============================================================================
// Riftbound TCG — Origins Set: ${description}
// ============================================================================
// Auto-generated from data/origins-cards.json by tools/generate-cards.mjs
// Do not edit manually — re-run the generator to update.
// ============================================================================

import {
  type CardDefinition,
  CardType,
  CardSet,
  Domain,
  Rarity,
  Keyword,
  SpellTiming,
  TriggerType,
  TargetType,
} from "../../models/card.js";
`;
}

// ---------------------------------------------------------------------------
// Group cards by type
// ---------------------------------------------------------------------------
const byType = {};
for (const card of newCards) {
  const t = card.type || "Unknown";
  if (!byType[t]) byType[t] = [];
  byType[t].push(card);
}

// Sort each group by collector number
for (const t of Object.keys(byType)) {
  byType[t].sort((a, b) => a.collectorNumber - b.collectorNumber);
}

// ---------------------------------------------------------------------------
// Generate definition files
// ---------------------------------------------------------------------------
const allVars = []; // { varName, file, id, collectorNumber, type }

function generateFile(filename, description, cards) {
  const header = fileHeader(description);
  const defs = cards.map(generateCardDef);
  const code = header + "\n" + defs.map((d) => d.code).join("\n\n") + "\n";
  const path = resolve(CARDS_DIR, filename);
  writeFileSync(path, code);
  console.log(`  ${filename}: ${defs.length} cards`);
  for (let i = 0; i < defs.length; i++) {
    allVars.push({ varName: defs[i].varName, file: filename.replace(".ts", ""), id: defs[i].id, collectorNumber: cards[i].collectorNumber, type: cards[i].type });
  }
  return defs;
}

console.log("Generating card definition files...\n");

// Legends
if (byType.Legend) generateFile("legends.ts", "Legends", byType.Legend);

// Champions
if (byType.Champion) generateFile("champions.ts", "Champions", byType.Champion);

// Units — split by domain
const unitsByDomain = {};
for (const card of byType.Unit || []) {
  const dom = (card.domains && card.domains[0]) || "Multi";
  if (!unitsByDomain[dom]) unitsByDomain[dom] = [];
  unitsByDomain[dom].push(card);
}
for (const [dom, cards] of Object.entries(unitsByDomain)) {
  generateFile(`units-${dom.toLowerCase()}.ts`, `Units (${dom})`, cards);
}

// Spells
if (byType.Spell) generateFile("spells.ts", "Spells", byType.Spell);

// Gear
if (byType.Gear) generateFile("gear.ts", "Gear", byType.Gear);

// Runes
if (byType.Rune) generateFile("runes.ts", "Runes", byType.Rune);

// Battlefields
if (byType.Battlefield) generateFile("battlefields.ts", "Battlefields", byType.Battlefield);

// Tokens
if (byType.Token) generateFile("tokens.ts", "Tokens", byType.Token);

// ---------------------------------------------------------------------------
// Generate index.ts
// ---------------------------------------------------------------------------
const indexLines = [
  `// ============================================================================`,
  `// Riftbound TCG — Origins Set: Card Index`,
  `// ============================================================================`,
  `// Auto-generated. Re-run tools/generate-cards.mjs to update.`,
  `// Combines curated sample cards with generated cards for the full set.`,
  `// ============================================================================`,
  ``,
  `import { type CardDefinition } from "../../models/card.js";`,
  ``,
  `// Curated sample cards (22 cards with hand-crafted abilities and scripts)`,
  `export { originsCards as sampleCards } from "./sample-cards.js";`,
  `import { originsCards as sampleCards } from "./sample-cards.js";`,
  ``,
];

// Group imports by file
const byFile = {};
for (const v of allVars) {
  if (!byFile[v.file]) byFile[v.file] = [];
  byFile[v.file].push(v.varName);
}
for (const [file, vars] of Object.entries(byFile)) {
  indexLines.push(`export { ${vars.join(", ")} } from "./${file}.js";`);
}

// Import all for the combined array
indexLines.push(``);
for (const [file, vars] of Object.entries(byFile)) {
  indexLines.push(`import { ${vars.join(", ")} } from "./${file}.js";`);
}

indexLines.push(``);
indexLines.push(`export const originsAllCards: CardDefinition[] = [`);
indexLines.push(`  ...sampleCards,`);
for (const v of allVars) {
  indexLines.push(`  ${v.varName},`);
}
indexLines.push(`];`);
indexLines.push(``);
indexLines.push(`/** @deprecated Use originsAllCards instead */`);
indexLines.push(`export const originsCards = originsAllCards;`);
indexLines.push(``);

writeFileSync(resolve(CARDS_DIR, "index.ts"), indexLines.join("\n"));
console.log(`\n  index.ts: ${allVars.length} cards exported`);

// ---------------------------------------------------------------------------
// Generate card-images.ts
// ---------------------------------------------------------------------------
const imgLines = [
  `// Card definition ID → CDN image URL mapping`,
  `// Auto-generated. Re-run tools/generate-cards.mjs to update.`,
  `// Images sourced from piltoverarchive.com CDN (public WebP)`,
  ``,
  `const CDN = "https://cdn.piltoverarchive.com/cards";`,
  ``,
  `export const cardImageUrls: Record<string, string> = {`,
];
// Generate image URLs for ALL 298 cards (including sample cards)
for (const card of data) {
  if (card.type === "Token") continue;
  const id = generateId(card);
  const pad = String(card.collectorNumber).padStart(3, "0");
  imgLines.push(`  "${id}": \`\${CDN}/OGN-${pad}.webp\`,`);
}
imgLines.push(`};`);
imgLines.push(``);
imgLines.push(`export function getCardImageUrl(defId: string): string | undefined {`);
imgLines.push(`  return cardImageUrls[defId];`);
imgLines.push(`}`);
imgLines.push(``);

writeFileSync(IMAGES_PATH, imgLines.join("\n"));
console.log(`\n  card-images.ts: ${data.filter((c) => c.type !== "Token").length} image mappings`);

console.log(`\nDone! Generated ${allVars.length} card definitions.`);
