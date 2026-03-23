import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/origins-cards.json");

const data = JSON.parse(readFileSync(DATA_PATH, "utf-8"));

// Patches for cards with wrong names or missing data
const patches = {
  10: {
    name: "Legion Rearguard",
    type: "Unit",
    domains: ["Fury"],
    rarity: "Common",
    energyCost: 2,
    might: 2,
    rulesText: "ACCELERATE (As I'm played, you may pay as an additional cost to have me enter ready.)",
  },
  38: {
    name: "Kadregrin the Infernal",
    type: "Unit",
    domains: ["Fury"],
    rarity: "Epic",
    energyCost: 9,
    might: 9,
    rulesText: "When you play me, draw 1 for each of your MIGHTY units. (A unit is Mighty while it has 5+ Might.)",
  },
  109: {
    name: "Dr. Mundo, Expert",
    type: "Champion",
    domains: ["Mind"],
    rarity: "Rare",
    energyCost: 8,
    might: 6,
    rulesText: "My Might is increased by the number of cards in your trash. At the start of your Beginning Phase, recycle 3 from your trash.",
  },
  149: {
    name: "Carnivorous Snapvine",
    type: "Unit",
    domains: ["Body"],
    rarity: "Rare",
    energyCost: 5,
    might: 6,
    rulesText: "When you play me, choose a unit at a battlefield. We deal damage equal to our Mights to each other.",
  },
  159: {
    name: "Warwick, Hunter",
    type: "Champion",
    domains: ["Body"],
    rarity: "Rare",
    energyCost: 6,
    might: 5,
    rulesText: "I enter ready. When I attack, destroy all damaged enemy units here.",
  },
  160: {
    name: "Dazzling Aurora",
    type: "Gear",
    domains: ["Body"],
    rarity: "Epic",
    energyCost: 9,
    rulesText: "At the end of your turn, reveal cards from the top of your Main Deck until you reveal a unit. Play it, ignoring its cost, and recycle the rest.",
  },
  162: {
    name: "Miss Fortune, Captain",
    type: "Champion",
    domains: ["Body"],
    rarity: "Epic",
    energyCost: 5,
    might: 5,
    rulesText: "ACCELERATE. GANKING. The first time I move each turn, you may ready something else that's exhausted.",
  },
  175: {
    name: "Shipyard Skulker",
    type: "Unit",
    domains: ["Chaos"],
    rarity: "Common",
    energyCost: 3,
    might: 3,
    rulesText: "HIDDEN (Hide for now to react with later.)",
  },
  228: {
    // Vanguard Helm - couldn't find on wiki, use known data from search results
    name: "Vanguard Helm",
    type: "Gear",
    domains: ["Order"],
    rarity: "Uncommon",
    energyCost: 2,
    rulesText: "Give a friendly unit +1 Might.",
  },
  239: {
    // Machine Evangel - couldn't find on wiki, use known data from search results
    name: "Machine Evangel",
    type: "Unit",
    domains: ["Order"],
    rarity: "Rare",
    energyCost: 5,
    might: 4,
    rulesText: "When you play me, draw 1 for each gear you control.",
  },
  244: {
    name: "Divine Judgment",
    type: "Spell",
    domains: ["Order"],
    rarity: "Rare",
    energyCost: 7,
    rulesText: "Each player chooses 2 units, 2 gear, 2 runes, and 2 cards in their hands. Recycle the rest.",
  },
  275: {
    name: "Altar to Unity",
    type: "Battlefield",
    domains: [],
    rarity: "Uncommon",
    rulesText: "When you hold here, play a 1 Recruit unit token in your base.",
  },
  277: {
    name: "Back-Alley Bar",
    type: "Battlefield",
    domains: [],
    rarity: "Uncommon",
    rulesText: "When a unit moves from here, give it +1 this turn.",
  },
};

let patched = 0;
for (const card of data) {
  const patch = patches[card.collectorNumber];
  if (patch) {
    Object.assign(card, patch);
    card.source = "wiki+patch";
    patched++;
  }
}

writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
console.log(`Patched ${patched} cards.`);

// Verify no more "unknown" types
const unknown = data.filter((c) => !c.type);
console.log(`Cards missing type: ${unknown.length}`);
if (unknown.length > 0) {
  for (const c of unknown) console.log(`  OGN-${String(c.collectorNumber).padStart(3, "0")} ${c.name}`);
}

const noRules = data.filter((c) => !c.rulesText);
console.log(`Cards missing rulesText: ${noRules.length}`);
if (noRules.length > 0) {
  for (const c of noRules) console.log(`  OGN-${String(c.collectorNumber).padStart(3, "0")} ${c.name}`);
}

// Stats
const types = {};
for (const c of data) types[c.type || "?"] = (types[c.type || "?"] || 0) + 1;
console.log("\nBy type:", types);
