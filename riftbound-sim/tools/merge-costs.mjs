// Merge power costs (and descriptions) from ApiTCG data into origins-cards.json
import { readFileSync, writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = resolve(__dirname, "../data/origins-cards.json");
const APITCG_PATH = "C:/Users/Callum/AppData/Local/Temp/riftbound-tcg-data/cards/en/origins.json";

const ourData = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
const apiData = JSON.parse(readFileSync(APITCG_PATH, "utf-8"));

// Build lookup from ApiTCG data by collector number (strip leading zeros and /298)
const apiByNumber = new Map();
for (const c of apiData) {
  if (!c.cardType) continue; // Skip products
  // number format is "003/298" or "003a/298"
  const numStr = c.number.split("/")[0].replace(/a$/, "");
  const num = parseInt(numStr);
  if (!isNaN(num) && !c.number.includes("a")) {
    apiByNumber.set(num, c);
  }
}

console.log(`ApiTCG cards (non-alt): ${apiByNumber.size}`);

let updated = 0;
let powerCostsAdded = 0;
let descriptionsAdded = 0;

for (const card of ourData) {
  const api = apiByNumber.get(card.collectorNumber);
  if (!api) continue;

  // Update power cost
  if (api.powerCost !== null && api.powerCost !== undefined) {
    card.powerCost = api.powerCost;
    if (api.powerCost > 0) powerCostsAdded++;
  }

  // Update description (strip HTML tags)
  if (api.description && (!card.rulesText || card.rulesText === "Retrieved from \"")) {
    const clean = api.description
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?em>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    card.rulesText = clean;
    descriptionsAdded++;
  }

  // Also update rulesText from API if ours is from wiki and API has a better version
  if (api.description) {
    const clean = api.description
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<\/?em>/gi, "")
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (clean.length > 5) {
      card.apiRulesText = clean; // Store API version alongside wiki version
    }
  }

  // Update might if we're missing it
  if (card.might === null && api.might !== null && api.might > 0) {
    card.might = api.might;
  }

  // Update energy cost if we're missing it
  if (card.energyCost === null && api.energyCost !== null) {
    card.energyCost = api.energyCost;
  }

  updated++;
}

writeFileSync(DATA_PATH, JSON.stringify(ourData, null, 2));
console.log(`Updated: ${updated} cards`);
console.log(`Power costs added: ${powerCostsAdded}`);
console.log(`Descriptions improved: ${descriptionsAdded}`);

// Verify
const withPower = ourData.filter(c => c.powerCost > 0);
console.log(`\nCards with powerCost > 0: ${withPower.length}`);

// Show sample data
const samples = [3, 8, 17, 45, 218, 27, 22, 40];
for (const num of samples) {
  const c = ourData.find(d => d.collectorNumber === num);
  console.log(`  OGN-${String(num).padStart(3,"0")} ${c.name}: E=${c.energyCost} P=${c.powerCost} M=${c.might}`);
}
