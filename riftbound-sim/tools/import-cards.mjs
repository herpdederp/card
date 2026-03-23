#!/usr/bin/env node
// ============================================================================
// Riftbound TCG — Card Data Importer (v2)
// ============================================================================
// Scrapes card data from the Fextralife wiki using the "Card Information"
// section parsing. Outputs origins-cards.json.
// Usage: node tools/import-cards.mjs
// ============================================================================

import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = resolve(__dirname, "../data/origins-cards.json");
const WIKI_BASE = "https://riftbound.wiki.fextralife.com";
const DELAY_MS = 250;

// ---------------------------------------------------------------------------
// Complete Origins card list (OGN-001 through OGN-298)
// ---------------------------------------------------------------------------
const CARD_LIST = [
  { num: 1, name: "Blazing Scorcher" },
  { num: 2, name: "Brazen Buccaneer" },
  { num: 3, name: "Chemtech Enforcer" },
  { num: 4, name: "Cleave" },
  { num: 5, name: "Disintegrate" },
  { num: 6, name: "Flame Chompers" },
  { num: 7, name: "Fury Rune" },
  { num: 8, name: "Get Excited!" },
  { num: 9, name: "Hextech Ray" },
  { num: 10, name: "Legion Guard" },
  { num: 11, name: "Magma Wurm" },
  { num: 12, name: "Noxus Hopeful" },
  { num: 13, name: "Pouty Poro" },
  { num: 14, name: "Sky Splitter" },
  { num: 15, name: "Captain Farron" },
  { num: 16, name: "Dangerous Duo" },
  { num: 17, name: "Iron Ballista" },
  { num: 18, name: "Noxus Saboteur" },
  { num: 19, name: "Raging Soul" },
  { num: 20, name: "Scrapyard Champion" },
  { num: 21, name: "Sun Disc" },
  { num: 22, name: "Thermo Beam" },
  { num: 23, name: "Unlicensed Armory" },
  { num: 24, name: "Void Seeker" },
  { num: 25, name: "Blind Fury" },
  { num: 26, name: "Brynhir Thundersong" },
  { num: 27, name: "Darius, Trifarian" },
  { num: 28, name: "Draven, Showboat" },
  { num: 29, name: "Falling Star" },
  { num: 30, name: "Jinx, Demolitionist" },
  { num: 31, name: "Raging Firebrand" },
  { num: 32, name: "Ravenborn Tome" },
  { num: 33, name: "Shakedown" },
  { num: 34, name: "Tryndamere, Barbarian" },
  { num: 35, name: "Vayne, Hunter" },
  { num: 36, name: "Vi, Destructive" },
  { num: 37, name: "Immortal Phoenix" },
  { num: 38, name: "Kadregrin The Infernal" },
  { num: 39, name: "Kai'Sa, Survivor" },
  { num: 40, name: "Seal of Rage" },
  { num: 41, name: "Volibear, Furious" },
  { num: 42, name: "Calm Rune" },
  { num: 43, name: "Charm" },
  { num: 44, name: "Clockwork Keeper" },
  { num: 45, name: "Defy" },
  { num: 46, name: "En Garde" },
  { num: 47, name: "Find Your Center" },
  { num: 48, name: "Meditation" },
  { num: 49, name: "Playful Phantom" },
  { num: 50, name: "Rune Prison" },
  { num: 51, name: "Solari Shieldbearer" },
  { num: 52, name: "Stalwart Poro" },
  { num: 53, name: "Stand United" },
  { num: 54, name: "Sunlit Guardian" },
  { num: 55, name: "Wielder of Water" },
  { num: 56, name: "Adaptatron" },
  { num: 57, name: "Block" },
  { num: 58, name: "Discipline" },
  { num: 59, name: "Eclipse Herald" },
  { num: 60, name: "Mask of Foresight" },
  { num: 61, name: "Poro Herder" },
  { num: 62, name: "Reinforce" },
  { num: 63, name: "Spirit's Refuge" },
  { num: 64, name: "Wind Wall" },
  { num: 65, name: "Wizened Elder" },
  { num: 66, name: "Ahri, Alluring" },
  { num: 67, name: "Blitzcrank, Impassive" },
  { num: 68, name: "Caitlyn, Patrolling" },
  { num: 69, name: "Last Stand" },
  { num: 70, name: "Mageseeker Warden" },
  { num: 71, name: "Party Favors" },
  { num: 72, name: "Solari Shrine" },
  { num: 73, name: "Sona, Harmonious" },
  { num: 74, name: "Taric, Protector" },
  { num: 75, name: "Tasty Faefolk" },
  { num: 76, name: "Yasuo, Remorseful" },
  { num: 77, name: "Zhonya's Hourglass" },
  { num: 78, name: "Lee Sin, Ascetic" },
  { num: 79, name: "Leona, Zealot" },
  { num: 80, name: "Mystic Reversal" },
  { num: 81, name: "Seal of Focus" },
  { num: 82, name: "Whiteflame Protector" },
  { num: 83, name: "Consult the Past" },
  { num: 84, name: "Eager Apprentice" },
  { num: 85, name: "Falling Comet" },
  { num: 86, name: "Jeweled Colossus" },
  { num: 87, name: "Lecturing Yordle" },
  { num: 88, name: "Mega-Mech" },
  { num: 89, name: "Mind Rune" },
  { num: 90, name: "Orb of Regret" },
  { num: 91, name: "Pit Crew" },
  { num: 92, name: "Riptide Rex" },
  { num: 93, name: "Smoke Screen" },
  { num: 94, name: "Sprite Call" },
  { num: 95, name: "Stupefy" },
  { num: 96, name: "Watchful Sentry" },
  { num: 97, name: "Blastcone Fae" },
  { num: 98, name: "Energy Conduit" },
  { num: 99, name: "Garbage Grabber" },
  { num: 100, name: "Gemcraft Seer" },
  { num: 101, name: "Mushroom Pouch" },
  { num: 102, name: "Portal Rescue" },
  { num: 103, name: "Ravenbloom Student" },
  { num: 104, name: "Retreat" },
  { num: 105, name: "Singularity" },
  { num: 106, name: "Sprite Mother" },
  { num: 107, name: "Ava Achiever" },
  { num: 108, name: "Convergent Mutation" },
  { num: 109, name: "Dr. Mundo" },
  { num: 110, name: "Ekko, Recurrent" },
  { num: 111, name: "Heimerdinger, Inventor" },
  { num: 112, name: "Kai'Sa, Evolutionary" },
  { num: 113, name: "Malzahar, Fanatic" },
  { num: 114, name: "Progress Day" },
  { num: 115, name: "Promising Future" },
  { num: 116, name: "Thousand-Tailed Watcher" },
  { num: 117, name: "Viktor, Innovator" },
  { num: 118, name: "Wraith of Echoes" },
  { num: 119, name: "Ahri, Inquisitive" },
  { num: 120, name: "Seal of Insight" },
  { num: 121, name: "Teemo, Strategist" },
  { num: 122, name: "Time Warp" },
  { num: 123, name: "Unchecked Power" },
  { num: 124, name: "Arena Bar" },
  { num: 125, name: "Bilgewater Bully" },
  { num: 126, name: "Body Rune" },
  { num: 127, name: "Cannon Barrage" },
  { num: 128, name: "Challenge" },
  { num: 129, name: "Confront" },
  { num: 130, name: "Crackshot Corsair" },
  { num: 131, name: "Dune Drake" },
  { num: 132, name: "First Mate" },
  { num: 133, name: "Flurry of Blades" },
  { num: 134, name: "Mobilize" },
  { num: 135, name: "Pakaa Cub" },
  { num: 136, name: "Pit Rookie" },
  { num: 137, name: "Stormclaw Ursine" },
  { num: 138, name: "Catalyst of Aeons" },
  { num: 139, name: "Cithria of Cloudfield" },
  { num: 140, name: "Herald of Scales" },
  { num: 141, name: "Kinkou Monk" },
  { num: 142, name: "Mountain Drake" },
  { num: 143, name: "Pirate's Haven" },
  { num: 144, name: "Spoils of War" },
  { num: 145, name: "Unyielding Spirit" },
  { num: 146, name: "Wallop" },
  { num: 147, name: "Wildclaw Shaman" },
  { num: 148, name: "Anivia, Primal" },
  { num: 149, name: "Carnivorous Snapevine" },
  { num: 150, name: "Kraken Hunter" },
  { num: 151, name: "Lee Sin, Centered" },
  { num: 152, name: "Mistfall" },
  { num: 153, name: "Overt Operation" },
  { num: 154, name: "Primal Strength" },
  { num: 155, name: "Qiyana, Victorious" },
  { num: 156, name: "Sabotage" },
  { num: 157, name: "Udyr, Wildman" },
  { num: 158, name: "Volibear, Imposing" },
  { num: 159, name: "Warwick" },
  { num: 160, name: "Dazzling Aura" },
  { num: 161, name: "Deadbloom Predator" },
  { num: 162, name: "Miss Fortune" },
  { num: 163, name: "Seal of Strength" },
  { num: 164, name: "Sett, Brawler" },
  { num: 165, name: "Cemetery Attendant" },
  { num: 166, name: "Chaos Rune" },
  { num: 167, name: "Ember Monk" },
  { num: 168, name: "Fight or Flight" },
  { num: 169, name: "Gust" },
  { num: 170, name: "Morbid Return" },
  { num: 171, name: "Mystic Poro" },
  { num: 172, name: "Rebuke" },
  { num: 173, name: "Ride the Wind" },
  { num: 174, name: "Sai Scout" },
  { num: 175, name: "Shipyard Stalker" },
  { num: 176, name: "Sneaky Deckhand" },
  { num: 177, name: "Stealthy Pursuer" },
  { num: 178, name: "Undercover Agent" },
  { num: 179, name: "Acceptable Losses" },
  { num: 180, name: "Fading Memories" },
  { num: 181, name: "Pack of Wonders" },
  { num: 182, name: "Scrapheap" },
  { num: 183, name: "Stacked Deck" },
  { num: 184, name: "The Syren" },
  { num: 185, name: "Traveling Merchant" },
  { num: 186, name: "Treasure Trove" },
  { num: 187, name: "Whirlwind" },
  { num: 188, name: "Zaunite Bouncer" },
  { num: 189, name: "Kayn, Unleashed" },
  { num: 190, name: "Kog'Maw, Caustic" },
  { num: 191, name: "Maddened Marauder" },
  { num: 192, name: "Mindsplitter" },
  { num: 193, name: "Miss Fortune, Buccaneer" },
  { num: 194, name: "Nocturne, Horrifying" },
  { num: 195, name: "Rhasa the Sunderer" },
  { num: 196, name: "Soulgorger" },
  { num: 197, name: "Teemo, Scout" },
  { num: 198, name: "The Harrowing" },
  { num: 199, name: "Tideturner" },
  { num: 200, name: "Twisted Fate, Gambler" },
  { num: 201, name: "Invert Timelines" },
  { num: 202, name: "Jinx, Rebel" },
  { num: 203, name: "Possession" },
  { num: 204, name: "Seal of Discord" },
  { num: 205, name: "Yasuo, Windrider" },
  { num: 206, name: "Back to Back" },
  { num: 207, name: "Call to Glory" },
  { num: 208, name: "Cruel Patron" },
  { num: 209, name: "Cull the Weak" },
  { num: 210, name: "Daring Poro" },
  { num: 211, name: "Faithful Manufactor" },
  { num: 212, name: "Forge of the Future" },
  { num: 213, name: "Hidden Blade" },
  { num: 214, name: "Order Rune" },
  { num: 215, name: "Petty Officer" },
  { num: 216, name: "Soaring Scout" },
  { num: 217, name: "Trifarian Gloryseeker" },
  { num: 218, name: "Vanguard Captain" },
  { num: 219, name: "Vanguard Sergeant" },
  { num: 220, name: "Facebreaker" },
  { num: 221, name: "Imperial Decree" },
  { num: 222, name: "Noxian Drummer" },
  { num: 223, name: "Peak Guardian" },
  { num: 224, name: "Salvage" },
  { num: 225, name: "Solari Chief" },
  { num: 226, name: "Spectral Matron" },
  { num: 227, name: "Symbol of the Solari" },
  { num: 228, name: "Vanguard Helm" },
  { num: 229, name: "Vengeance" },
  { num: 230, name: "Albus Ferros" },
  { num: 231, name: "Commander Ledros" },
  { num: 232, name: "Fiora, Victorious" },
  { num: 233, name: "Grand Strategem" },
  { num: 234, name: "Harnessed Dragon" },
  { num: 235, name: "Karma, Channeler" },
  { num: 236, name: "Karthus, Eternal" },
  { num: 237, name: "King's Edict" },
  { num: 238, name: "Leona, Determined" },
  { num: 239, name: "Machine Evangel" },
  { num: 240, name: "Sett, Kingpin" },
  { num: 241, name: "Shen, Kinkou" },
  { num: 242, name: "Baited Hook" },
  { num: 243, name: "Darius, Executioner" },
  { num: 244, name: "Divine Judgement" },
  { num: 245, name: "Seal of Unity" },
  { num: 246, name: "Viktor, Leader" },
  { num: 247, name: "Kai'Sa, Daughter of the Void" },
  { num: 248, name: "Icathian Rain" },
  { num: 249, name: "Volibear, Relentless Storm" },
  { num: 250, name: "Stormbringer" },
  { num: 251, name: "Jinx, Loose Cannon" },
  { num: 252, name: "Super Mega Death Rocket!" },
  { num: 253, name: "Darius, Hand of Noxus" },
  { num: 254, name: "Noxian Guillotine" },
  { num: 255, name: "Ahri, Nine-Tailed Fox" },
  { num: 256, name: "Fox-Fire" },
  { num: 257, name: "Lee Sin, Blind Monk" },
  { num: 258, name: "Dragon's Rage" },
  { num: 259, name: "Yasuo, Unforgiven" },
  { num: 260, name: "Last Breath" },
  { num: 261, name: "Leona, Radiant Dawn" },
  { num: 262, name: "Zenith Blade" },
  { num: 263, name: "Teemo, Swift Scout" },
  { num: 264, name: "Guerilla Warfare" },
  { num: 265, name: "Viktor, Herald of the Arcane" },
  { num: 266, name: "Siphon Power" },
  { num: 267, name: "Miss Fortune, Bounty Hunter" },
  { num: 268, name: "Bullet Time" },
  { num: 269, name: "Sett, The Boss" },
  { num: 270, name: "Showstopper" },
  { num: 271, name: "Recruit" },
  { num: 272, name: "Recruit" },
  { num: 273, name: "Recruit" },
  { num: 274, name: "Sprite" },
  { num: 275, name: "Altar of Unity" },
  { num: 276, name: "Aspirant's Climb" },
  { num: 277, name: "Back Alley Bar" },
  { num: 278, name: "Bandle Tree" },
  { num: 279, name: "Fortified Position" },
  { num: 280, name: "Grove of the God-Willow" },
  { num: 281, name: "Hallowed Tomb" },
  { num: 282, name: "Monastery of Hirana" },
  { num: 283, name: "Novari Fighting Pit" },
  { num: 284, name: "Obelisk of Power" },
  { num: 285, name: "Reaver's Row" },
  { num: 286, name: "Reckoner's Arena" },
  { num: 287, name: "Sigil of the Storm" },
  { num: 288, name: "Startipped Peak" },
  { num: 289, name: "Targon's Peak" },
  { num: 290, name: "The Arena's Greatest" },
  { num: 291, name: "The Candlelit Sanctum" },
  { num: 292, name: "The Dreaming Tree" },
  { num: 293, name: "The Grand Plaza" },
  { num: 294, name: "Trifarian War Camp" },
  { num: 295, name: "Vilemaw's Lair" },
  { num: 296, name: "Void Gate" },
  { num: 297, name: "Windswept Hillock" },
  { num: 298, name: "Zaun Warrens" },
];

// ---------------------------------------------------------------------------
// Wiki URL construction — drop commas, encode apostrophes, use underscores
// ---------------------------------------------------------------------------
function buildWikiUrls(num, name) {
  const pad = String(num).padStart(3, "0");
  // Primary: underscores, no commas, encoded apostrophes
  const cleaned = name
    .replace(/,/g, "")
    .replace(/'/g, "%27")
    .replace(/ /g, "_");
  // Fallback: plus signs
  const cleanedPlus = name
    .replace(/,/g, "")
    .replace(/'/g, "%27")
    .replace(/ /g, "+");
  return [
    `${WIKI_BASE}/OGN-${pad}_${cleaned}`,
    `${WIKI_BASE}/OGN-${pad}+${cleanedPlus}`,
    // Try with original punctuation (e.g., Dr.)
    `${WIKI_BASE}/OGN-${pad}+${name.replace(/ /g, "+")}`,
  ];
}

// ---------------------------------------------------------------------------
// Parse the "Card Information" section from wiki HTML
// ---------------------------------------------------------------------------
function parseCardInfo(html) {
  const text = html
    .replace(/<[^>]+>/g, "\n")
    .split("\n")
    .filter((l) => l.trim().length > 0)
    .map((l) => l.trim());

  const infoStart = text.findIndex((l) => l === "Card Information");
  if (infoStart < 0) return null;

  const fields = {};
  for (let i = infoStart + 1; i < Math.min(infoStart + 30, text.length); i++) {
    const line = text[i];
    if (line === "Retrieved from") break;
    if (line.endsWith(":")) {
      const key = line.slice(0, -1);
      const val = text[i + 1] || "";
      if (!val.endsWith(":") && val !== "Retrieved from") {
        fields[key] = val;
        i++;
      }
    }
  }
  return fields;
}

// ---------------------------------------------------------------------------
// Domain inference from collector number
// ---------------------------------------------------------------------------
function inferDomain(num) {
  if (num >= 1 && num <= 41) return "Fury";
  if (num >= 42 && num <= 82) return "Calm";
  if (num >= 83 && num <= 123) return "Mind";
  if (num >= 124 && num <= 164) return "Body";
  if (num >= 165 && num <= 205) return "Chaos";
  if (num >= 206 && num <= 246) return "Order";
  return null;
}

// ---------------------------------------------------------------------------
// Type inference from number and name
// ---------------------------------------------------------------------------
const KNOWN_RUNES = [7, 42, 89, 126, 166, 214];
const KNOWN_TOKENS = [271, 272, 273, 274];

function inferType(num, name) {
  if (KNOWN_RUNES.includes(num)) return "Rune";
  if (KNOWN_TOKENS.includes(num)) return "Token";
  if (num >= 275 && num <= 298) return "Battlefield";
  if (num >= 247 && num <= 270) {
    return num % 2 === 1 ? "Legend" : "Spell";
  }
  if (name.includes(",")) return "Champion";
  return null;
}

// ---------------------------------------------------------------------------
// Parse domain(s) from wiki field (may be "Fury, Chaos" for legends)
// ---------------------------------------------------------------------------
function parseDomains(domainStr) {
  if (!domainStr || domainStr === "Colorless") return [];
  return domainStr.split(/[,/]/).map((d) => d.trim()).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`Importing ${CARD_LIST.length} Origins cards...`);
  console.log(`Output: ${OUTPUT_PATH}\n`);

  const results = [];
  let fetched = 0;
  let failed = 0;

  for (const { num, name } of CARD_LIST) {
    const urls = buildWikiUrls(num, name);
    let wikiFields = null;

    for (const url of urls) {
      try {
        const resp = await fetch(url, {
          headers: { "User-Agent": "RiftboundSimImporter/1.0" },
        });
        if (resp.ok) {
          const html = await resp.text();
          wikiFields = parseCardInfo(html);
          if (wikiFields && Object.keys(wikiFields).length > 0) break;
        }
      } catch {
        // Try next URL
      }
    }

    const inferredDomain = inferDomain(num);
    const inferredType = inferType(num, name);

    if (wikiFields && Object.keys(wikiFields).length > 0) {
      const domains = parseDomains(wikiFields.Domain);
      results.push({
        collectorNumber: num,
        name: wikiFields.Name || name,
        set: "Origins",
        type: wikiFields.Type || inferredType,
        domains: domains.length > 0 ? domains : (inferredDomain ? [inferredDomain] : []),
        rarity: wikiFields.Rarity || null,
        energyCost: wikiFields.Cost ? parseInt(wikiFields.Cost) : null,
        might: wikiFields.Might ? parseInt(wikiFields.Might) : null,
        health: wikiFields.Health ? parseInt(wikiFields.Health) : null,
        rulesText: wikiFields.Effect || null,
        source: "wiki",
      });
      fetched++;
    } else {
      results.push({
        collectorNumber: num,
        name,
        set: "Origins",
        type: inferredType,
        domains: inferredDomain ? [inferredDomain] : [],
        rarity: null,
        energyCost: null,
        might: null,
        health: null,
        rulesText: null,
        source: "inferred",
      });
      failed++;
    }

    process.stdout.write(
      `\r  Progress: ${fetched + failed}/${CARD_LIST.length} (${fetched} OK, ${failed} failed)`
    );
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  console.log(`\n\nResults: ${fetched} fetched, ${failed} failed`);

  results.sort((a, b) => a.collectorNumber - b.collectorNumber);
  writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
  console.log(`Wrote ${results.length} cards to ${OUTPUT_PATH}`);

  // Stats
  const types = {};
  const doms = {};
  for (const c of results) {
    types[c.type || "unknown"] = (types[c.type || "unknown"] || 0) + 1;
    for (const d of c.domains) doms[d] = (doms[d] || 0) + 1;
    if (c.domains.length === 0) doms["none"] = (doms["none"] || 0) + 1;
  }
  console.log("\nBy type:", types);
  console.log("By domain:", doms);

  const incomplete = results.filter((c) => !c.type || !c.rulesText);
  if (incomplete.length > 0) {
    console.log(`\n${incomplete.length} cards missing type or rules text:`);
    for (const c of incomplete) {
      console.log(
        `  OGN-${String(c.collectorNumber).padStart(3, "0")} ${c.name} [type=${c.type || "?"}, rules=${c.rulesText ? "yes" : "no"}]`
      );
    }
  }
}

main().catch(console.error);
