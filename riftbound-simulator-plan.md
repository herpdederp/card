# Riftbound TCG Digital Simulator — Project Plan

## Executive Summary

A **browser-based** digital simulator for **Riftbound**, the League of Legends Trading Card Game, featuring accurate rules enforcement, peer-to-peer online multiplayer (via WebRTC), and configurable AI bots. No dedicated server required — the entire app runs as a static site with zero infrastructure costs.

No official digital client exists — Riot has stated it's "not a matter of if, but when" — making this a high-demand community tool. Current community options (Tabletop Simulator mod, TCG Arena, Pixelborn) lack full rules automation. This project aims to be the definitive automated Riftbound simulator.

**Key architecture decisions:**
- Game engine runs in the browser (TypeScript, deterministic)
- Multiplayer via WebRTC peer-to-peer (no game server)
- Commit-reveal shuffle hashing for trustless hidden information
- Bot AI runs in Web Workers (no network needed)
- Deploys as a static site to GitHub Pages / Cloudflare Pages (free)

---

## 1. Game Engine — Core Rules Implementation

The heart of the project. Every mechanic must faithfully replicate the Riftbound Core Rules document.

### 1.1 Game State Model

The game state is the single source of truth. Everything derives from it.

```
GameState
├── players[]
│   ├── legend: Card (Champion Legend — defines Domain Identity)
│   ├── chosenChampion: Card (starts in Champion Zone, playable anytime)
│   ├── mainDeck: Card[] (40+ cards, shuffled)
│   ├── runeDeck: Card[] (12 runes, shuffled)
│   ├── hand: Card[] (private zone, max drawn from main deck)
│   ├── base: Card[] (units + gear deployed here)
│   ├── runePool: Card[] (channeled runes — ready or exhausted)
│   ├── trash: Card[] (discard pile, public info)
│   ├── banishment: Card[] (removed from game)
│   ├── championZone: Card | null (chosen champion sits here until played)
│   ├── score: number (race to 8, or 11 in 2v2)
│   └── battlefields: Card[] (3 owned, subset placed per format)
├── battlefieldZone: Battlefield[]
│   ├── card: Card (battlefield card with abilities)
│   ├── controller: Player | null
│   ├── units: Map<Player, Card[]> (units stationed here per player)
│   └── facedownZone: Card[] (Hidden mechanic cards)
├── chain: ChainEntry[] (spell/ability resolution stack)
├── turnState
│   ├── activePlayer: Player
│   ├── phase: Awaken | Beginning | Channel | Draw | Action | Done
│   ├── turnNumber: number
│   └── actionsThisTurn: Action[]
└── gameConfig
    ├── mode: "1v1" | "ffa_skirmish" | "ffa_war" | "2v2"
    ├── format: "standard" | "sealed"
    ├── winTarget: 8 | 11
    └── bestOf: 1 | 3
```

### 1.2 Turn Structure — ABCD System

Each turn follows the ABCD sequence, then the Action Phase:

**A — Awaken Phase**
- Ready (untap) all exhausted cards the active player controls
- Resolve any "at the start of your Awaken Phase" triggers

**B — Beginning Phase (Scoring)**
- Score 1 point for each Battlefield where the active player has unit(s) ("Hold")
- Resolve "start of turn" triggered abilities
- **Final Point Rule**: Cannot score the 8th point from Conquering alone unless the player also scored from every other Battlefield that same turn. This is the most complex scoring rule and must be enforced precisely.

**C — Channel Phase**
- Channel 2 Runes from Rune Deck (place face-up, Ready)
- Exception: Second player's very first turn channels 3 (catch-up mechanic)
- Rune Pool empties (unspent Energy/Power lost) at end of this phase

**D — Draw Phase**
- Draw 1 card from Main Deck
- Exception: In FFA, player going first skips their first draw
- Rune Pool empties again at end of draw phase

**Action Phase**
- The open-ended core of the game. Player can take any number of actions:
  - **Play cards** (Units, Spells, Gear, Chosen Champion)
  - **Move units** (Base ↔ Battlefield, or Battlefield ↔ Battlefield with Ganking)
  - **Activate abilities** on cards
  - **Exhaust Runes** to generate Energy
  - **Recycle Runes** (return to bottom of Rune Deck) to generate Domain Power
- Player declares "Done" to end turn

### 1.3 Resource System — Runes

Two resource types generated from Runes:

| Resource | How to Generate | Purpose |
|----------|----------------|---------|
| **Energy** | Exhaust (tap) a Ready Rune | Pays the generic cost (top-left number on cards) |
| **Domain Power** | Recycle a Rune (return to bottom of Rune Deck) | Pays the colored domain cost on cards |

Runes belong to one of 6 Domains. When recycled, they generate Power of their Domain color. Seals (a Gear subtype) can be exhausted to pay Power costs instead of recycling.

Rune Pool empties at end of Channel Phase and end of Turn — unspent resources are lost.

### 1.4 Card Types & Properties

| Type | Zone | Persistent? | Key Stat | Notes |
|------|------|-------------|----------|-------|
| **Champion Legend** | Legend Zone | Yes | Ability | Defines deck identity, 2 Domains |
| **Chosen Champion** | Champion Zone → Board | Yes | Might | One per deck, playable from Champion Zone anytime |
| **Unit** | Hand → Base/Battlefield | Yes (Permanent) | Might | Fights at Battlefields, self-references with "I/me" |
| **Spell** | Hand → Chain → Trash | No (Consumable) | Effect | Action or Reaction timing, self-references with "this" |
| **Gear** | Hand → Base | Yes (Permanent) | Effect | Enters Ready, provides ongoing abilities, self-references with "this" |
| **Rune** | Rune Deck → Rune Pool | Yes | Domain | Resource generation |
| **Battlefield** | Battlefield Zone | Yes | Ability | Contributed by players, self-references with "here" |
| **Token** | Created on Board | Special | Varies | Not a card, ceases to exist in Non-Board Zones |

### 1.5 Combat System — Showdowns

When units move to a Battlefield controlled by an opponent (or contested), a **Showdown** begins:

1. **Attacker declares** — exhausts Ready units and moves them to a Battlefield
2. **Tight Timing Window** opens — only Actions and Reactions can be played
3. **Chain Resolution** — Reactions resolve before the effect they respond to (LIFO stack)
4. **Combat Resolution** — Units deal damage equal to their Might simultaneously
5. **Survivors** — Units with damage ≥ their health are destroyed (sent to Trash)
6. **Conquer Check** — If only one player has units remaining, they Conquer the Battlefield and score 1 point (unless it's the final point — see Final Point Rule)
7. **Conquer Bonus** — Conquering a non-winning Battlefield draws a card

**Key combat rules:**
- Units at a Battlefield can be reinforced with more units in subsequent moves during the same turn
- Each Battlefield only awards 1 point per turn maximum
- "Can't beats Can" — prohibitive effects override permissive ones
- Do as much as you can, ignore impossible instructions

### 1.6 Keyword Abilities

The engine must support all keywords from Origins and Spiritforged:

- **Ganking** — Unit can move between Battlefields (not just Base ↔ Battlefield)
- **Hidden** — Card is played face-down to the Facedown Zone of a Battlefield, revealed later
- **Signature** — Tied to a specific Legend, max 3 Signature cards per deck
- **Action** — Spell timing: can be played during Showdowns
- **Reaction** — Spell timing: can respond to any spell or ability on the chain
- Plus set-specific keywords introduced in Spiritforged and beyond

### 1.7 The Chain (Priority System)

Riftbound uses a resolution chain similar to Magic's stack:

- When a spell or ability is played, it goes on the Chain
- Opponent (and active player) can respond with Reactions or triggered abilities
- Chain resolves LIFO (last in, first out)
- Rune abilities (Energy/Power generation) cannot be reacted to — they resolve immediately
- Once the Chain is empty, the game returns to normal timing

### 1.8 Zones & Privacy

| Zone | Privacy | Notes |
|------|---------|-------|
| Hand | Private (owner only) | Max visible to owner |
| Main Deck | Secret | No player may look |
| Rune Deck | Secret | No player may look |
| Trash | Public | Any player may inspect |
| Champion Zone | Public | Face-up |
| Base | Public | All cards visible |
| Battlefield Units | Public | All cards visible |
| Facedown Zone | Private (controller) | Hidden cards |
| Banishment | Public | Removed from game |

---

## 2. Card Database & Data Pipeline

### 2.1 Card Data Schema

```typescript
interface Card {
  id: string;                    // unique identifier
  name: string;                  // display name
  subtitle?: string;             // e.g. "Wuju Bladesman"
  fullName: string;              // name + subtitle for uniqueness rules
  set: "origins" | "spiritforged" | string;
  type: "unit" | "spell" | "gear" | "rune" | "battlefield" | "legend" | "champion";
  domains: Domain[];             // e.g. ["fury", "calm"]
  energyCost: number;            // generic cost
  powerCost?: DomainCost;        // colored cost(s)
  might?: number;                // combat stat (units/champions)
  health?: number;               // damage threshold
  keywords: Keyword[];
  abilities: Ability[];          // triggered, activated, static
  timing?: "action" | "reaction"; // spell timing
  isSignature?: boolean;
  signatureLegend?: string;      // which Legend this is tied to
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary";
  artUrl: string;
  flavorText?: string;
  rulesText: string;             // oracle text
  errata?: string[];             // official errata applied
}

type Domain = "fury" | "calm" | "mind" | "body" | "chaos" | "order";
```

### 2.2 Data Sources

- **Primary**: Scrape/parse from riftbound.gg card database and official Riot card image galleries
- **Rules text**: Cross-reference with Core Rules wiki on Fextralife
- **Errata**: Track official errata documents from riftbound.leagueoflegends.com
- **Set releases**: Origins (~298 cards), Spiritforged (~200+ cards), Unleashed (2026), and future sets

### 2.3 Ability Scripting Engine

Each card's abilities need to be executable. Two approaches:

**Option A — DSL (Domain-Specific Language)**
Define a mini-language for card effects:
```json
{
  "trigger": "on_conquer",
  "condition": { "controller": "self" },
  "effect": { "action": "draw", "amount": 1, "target": "controller" }
}
```
Pros: Data-driven, easy to add new cards. Cons: Complex interactions need escape hatches.

**Option B — Script-per-card (Recommended for accuracy)**
Each card has a TypeScript/Lua script that hooks into the game engine:
```typescript
// jinx_champion.ts
export const onPlay: Ability = {
  trigger: TriggerType.ON_PLAY,
  resolve: (game, self, context) => {
    // Jinx-specific champion ability
    game.dealDamage(context.target, 2);
  }
};
```
Pros: Full flexibility, handles edge cases. Cons: More work per card.

**Recommended**: Hybrid — DSL for simple common effects (draw, deal damage, buff, move) with script overrides for complex/unique cards.

---

## 3. Multiplayer Architecture

### 3.1 Networking Model — Browser-First, No Dedicated Server

Everything runs in the browser. The game engine executes locally in each client. Players exchange only **actions** over a peer-to-peer WebRTC data channel. A lightweight free signaling service handles initial connection.

```
┌─────────────────────┐                          ┌─────────────────────┐
│ Player A Browser     │    WebRTC DataChannel    │ Player B Browser     │
│                      │ ◄───────────────────────► │                      │
│ ┌─────────────────┐ │    (actions only, no     │ ┌─────────────────┐ │
│ │ Game Engine      │ │     game state sent)     │ │ Game Engine      │ │
│ │ (deterministic)  │ │                          │ │ (deterministic)  │ │
│ └─────────────────┘ │                          │ └─────────────────┘ │
│ ┌─────────────────┐ │                          │ ┌─────────────────┐ │
│ │ Bot AI           │ │                          │ │ Bot AI           │ │
│ │ (Web Worker)     │ │                          │ │ (Web Worker)     │ │
│ └─────────────────┘ │                          │ └─────────────────┘ │
└─────────────────────┘                          └─────────────────────┘
          │                                                │
          └──────────── Signaling Server ──────────────────┘
                    (PeerJS / Cloudflare Worker)
                    (free tier, only used for
                     initial handshake)
```

**How it works:**
- Both clients run identical deterministic game engines
- When a player takes an action, it's sent to the opponent via WebRTC
- Both engines execute the same action and arrive at the same state
- Bot games are fully local — no network needed at all, AI runs in a Web Worker

**Why this works for Riftbound:**
- Game state is relatively compact (two 40-card decks, 12 runes each, a few battlefields)
- Actions are small messages (play card X, move unit Y to battlefield Z)
- Turn-based means latency tolerance is generous — even 200ms+ is fine
- No server costs, no scaling concerns, hosts as a static site

### 3.2 Commit-Reveal Shuffle — Trustless Hidden Information

The core problem with P2P card games: if both clients know the full game state, a player could inspect their opponent's hand or deck order via browser dev tools. The **commit-reveal scheme** solves this without a server.

**Setup Phase (before game starts):**

```
1. SHUFFLE
   - Each player locally shuffles their Main Deck and Rune Deck
   - Generate a random salt (cryptographically secure)

2. COMMIT
   - Hash the shuffled deck order: hash = SHA-256(salt + deckOrder)
   - Send ONLY the hash to the opponent
   - Neither player knows the other's deck order

3. PLAY
   - When a card would be drawn or revealed, the owning player
     sends: { cardId, position, salt_fragment }
   - Opponent can verify this card was at that position in the
     committed order (partial reveal)

4. REVEAL (end of game or on demand)
   - Full salt + deck order revealed
   - Opponent can verify: SHA-256(salt + deckOrder) === committed hash
   - If it doesn't match → cheat detected, game flagged
```

**What this protects against:**
- ✅ Deck stacking (order was committed before game started)
- ✅ Peeking at opponent's undrawn cards (they're never sent until drawn)
- ✅ Retroactive cheating (hash verification at end of game)

**What this doesn't protect against:**
- ❌ A player lying about the current card being drawn (they could send a different card than what's actually next). This requires trust OR a more complex protocol.

**Enhanced Protocol (Optional — Stronger but More Complex):**

For stronger guarantees, use **mental poker** style cryptography:

```
1. Player A encrypts each card in their deck with key Ka
2. Sends encrypted deck to Player B
3. Player B shuffles the encrypted deck (can't read the cards)
4. Player B re-encrypts each card with key Kb
5. Sends doubly-encrypted deck back to Player A
6. To draw: Player B reveals Kb for that card position
                Player A decrypts with Ka → card revealed to A only
7. To reveal to opponent: Player A also shares Ka for that position
```

This is the gold standard for P2P card games but adds cryptographic overhead. **Recommendation: Start with simple commit-reveal** (hash the shuffle) since the audience is a community simulator, not a cash-prize tournament. Upgrade to mental poker later if cheating becomes a real problem.

### 3.3 Action Protocol

Since both clients run the same deterministic engine, the protocol only needs to exchange player decisions:

```typescript
// Peer-to-peer messages (sent over WebRTC DataChannel)
type PeerMessage =
  // Pre-game
  | { type: "deck_commit"; mainDeckHash: string; runeDeckHash: string }
  | { type: "choose_battlefield"; battlefieldCardId: string }
  | { type: "mulligan"; returnCardIds: string[] }
  | { type: "coin_flip_seed"; seed: string }  // both contribute entropy

  // Gameplay actions
  | { type: "play_card"; cardId: string; targets?: string[] }
  | { type: "move_units"; unitIds: string[]; destination: string }
  | { type: "exhaust_rune"; runeId: string }
  | { type: "recycle_rune"; runeId: string }
  | { type: "activate_ability"; sourceId: string; abilityIdx: number; targets?: string[] }
  | { type: "respond_to_chain"; action: "pass" | PeerMessage }
  | { type: "declare_done" }
  | { type: "concede" }

  // Card reveals (commit-reveal system)
  | { type: "reveal_draw"; position: number; cardId: string; saltFragment: string }
  | { type: "reveal_channel"; positions: number[]; cardIds: string[]; saltFragments: string[] }

  // End of game verification
  | { type: "reveal_full"; salt: string; deckOrder: string[] }

  // Connection
  | { type: "ping" }
  | { type: "pong" }
  | { type: "reconnect_state"; turnNumber: number; actionLog: PeerMessage[] };
```

**Determinism guarantee:** The game engine must be fully deterministic — given the same sequence of actions and reveals, both clients must arrive at identical game states. This means no `Math.random()` in the engine; any randomness comes from player-contributed seeds that are shared.

### 3.4 Lobby & Matchmaking (Serverless)

**Room Codes (Primary):**
- Player creates a room → gets a short code (e.g. `JINX-4827`)
- Share code via Discord, text, etc.
- Opponent enters code → signaling server brokers WebRTC connection
- Signaling server is stateless — a single Cloudflare Worker or PeerJS cloud

**Optional Future — Matchmaking Queue:**
- Add a lightweight matchmaking service later if demand warrants it
- Could be a simple WebSocket relay on a free-tier Fly.io or Railway instance
- Pairs players by format preference, connects them via WebRTC, then exits

**Bot Games:**
- No network at all — game engine + bot AI both run locally in the browser
- Bot AI runs in a Web Worker to keep the UI responsive

### 3.5 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| **Game Engine** | TypeScript (shared module) | Runs in browser, deterministic, testable |
| **Client/UI** | React + TypeScript | Component-based, good for card game UIs |
| **Rendering** | PixiJS or HTML/CSS + Canvas hybrid | Card animations, drag-drop, battlefield layout |
| **P2P Networking** | WebRTC DataChannel via PeerJS | Free, browser-native, low latency for turns |
| **Signaling** | PeerJS Cloud (free) or Cloudflare Worker | Only for initial connection handshake |
| **Crypto** | Web Crypto API (SubtleCrypto) | SHA-256 hashing for commit-reveal, built into browsers |
| **Bot AI** | Web Worker | Offload MCTS/minimax from main thread |
| **Hosting** | GitHub Pages / Netlify / Cloudflare Pages | Free static hosting, zero ops |
| **Persistence (optional)** | localStorage + export/import | Deck saves, preferences, replay files |

**Total infrastructure cost: $0.** The entire thing is a static site with peer-to-peer multiplayer.

---

## 4. Bot / AI System

### 4.1 Difficulty Tiers

| Tier | Name | Behavior |
|------|------|----------|
| 1 | **Recruit** | Random legal moves, no planning. Good for learning the UI. |
| 2 | **Veteran** | Heuristic-based: prioritizes curve, basic combat math, holds battlefields |
| 3 | **Champion** | Minimax/MCTS with evaluation function, considers opponent's likely responses |
| 4 | **Challenger** | Full Monte Carlo Tree Search with rollout policy, or trained neural net |

### 4.2 Bot Architecture

```
BotController
├── perceive(visibleState) → Observation
│   ├── myResources, myHand, myBoard
│   ├── opponentPublicInfo (base, battlefields, rune count, hand size)
│   └── gamePhase, score, turnNumber
├── evaluate(state) → Score
│   ├── scoreDifference (most important — race to 8)
│   ├── boardPresence (units on battlefields vs base)
│   ├── resourceAdvantage (runes available, cards in hand)
│   ├── tempo (who's closer to winning)
│   └── combatProjection (can I win fights at each battlefield?)
├── plan(observation) → ActionSequence
│   ├── Tier 1: randomLegalAction()
│   ├── Tier 2: heuristicBestAction()
│   ├── Tier 3: minimaxSearch(depth=3)
│   └── Tier 4: mctsSearch(simulations=1000)
└── execute(action) → ClientMessage
```

### 4.3 Evaluation Heuristics (Tier 2+)

Key factors for the evaluation function:

1. **Score Delta** — (myScore - opponentScore) × 100. This is a race game, so point lead is paramount.
2. **Battlefield Control** — +30 per controlled Battlefield, +15 per contested (units present)
3. **Unit Advantage** — Total Might on board vs opponent's. +5 per point of Might advantage.
4. **Resource Curve** — Hand size × 3 + available Runes × 2. Card advantage matters.
5. **Tempo** — Can I score next turn? +50 if yes. Can opponent score? -50 if yes.
6. **Champion Availability** — Chosen Champion still in Champion Zone? +10 (saving it as a trump card).
7. **Final Point Setup** — Am I at 7? Can I meet the Final Point Rule? +40 if path exists.

### 4.4 MCTS for Tier 4 (Challenger)

Monte Carlo Tree Search is ideal for Riftbound because:
- Branching factor is moderate (not as extreme as Magic due to simpler resource system)
- Games are short (10-20 minutes, ~10-15 turns each)
- Hidden information (opponent hand) can be handled via **Information Set MCTS** (sample possible opponent hands)

```
MCTS Loop:
1. SELECT — traverse tree using UCB1 to balance exploration/exploitation
2. EXPAND — add a new child node (legal game action)
3. SIMULATE — random playout to game end (using Tier 1 random bot)
4. BACKPROPAGATE — update win/loss statistics up the tree
```

**Imperfect Information Handling:**
- At each MCTS iteration, sample a random possible opponent hand consistent with known information
- Run the simulation assuming that hand
- Average results across many samples → robust strategy despite uncertainty

### 4.5 Bot Personality Profiles

Beyond difficulty, bots can have playstyle preferences:

| Profile | Behavior Bias |
|---------|--------------|
| **Aggro** | Prioritize early Conquer, play low-cost units fast, rush to 8 |
| **Control** | Hold Battlefields, play reactively, use removal Spells |
| **Tempo** | Maximize Rune efficiency, chain multiple plays per turn |
| **Trickster** | Heavy use of Hidden mechanic, surprise plays, Calm/Mind domain focus |

These can be implemented as weights on the evaluation function or as modified MCTS rollout policies.

---

## 5. Deck Building & Collection

### 5.1 Deck Builder

- **Visual deck editor** with drag-and-drop
- Domain Identity enforcement (cards must match Legend's 2 Domains)
- Deck validation: 40+ main deck, 12 Runes, 1 Legend, 3 Battlefields, optional 8-card sideboard
- Copy limit: max 3 copies of any card by full name
- Signature card limit: max 3 total Signature cards
- **Import/Export**: Text-based deck codes (share via URL or clipboard)
- **Precon decks**: Include Jinx, Viktor, Lee Sin, and Proving Grounds decks as starters

### 5.2 Card Collection Modes

Two approaches (can support both):

**Open Mode (Simulator Focus):**
- All cards available for free
- Build any deck instantly
- Best for competitive testing and community growth

**Collection Mode (Optional Gamification):**
- Earn packs through play
- No real-money purchases (community tool, not monetized)
- Provides progression incentive

---

## 6. Game Modes & Formats

### 6.1 Supported Formats

| Format | Players | Battlefields | Win Target | Notes |
|--------|---------|-------------|------------|-------|
| **1v1 Constructed** | 2 | 2 (1 per player) | 8 | Premier competitive format |
| **1v1 Bo3** | 2 | 3 each (choose 1/game) | 8 | With 8-card sideboard |
| **FFA Skirmish** | 3-4 | 3 (1 random each) | 8 | Multiplayer free-for-all |
| **FFA War** | 3-4 | 3 | 8 | First player has restrictions |
| **2v2 (Two-Headed Giant)** | 4 (2 teams) | Variable | 11 | Team format |
| **Sealed** | 2-4 | 3 | 8 | Open packs, build on the fly |
| **Practice** | 1 vs Bot | Any | Any | Solo testing |
| **Puzzle Mode** | 1 | Preset | Win this turn | Teaching tool — solve lethal |

### 6.2 Spectator Mode

- Watch live games with full public information
- Commentator view (sees both hands — restricted access)
- Replay system with timeline scrubbing
- Share replay links

### 6.3 Tournament Support

- Swiss and Single/Double elimination brackets
- Timer per turn (competitive: 45s base + 5min reserve)
- Sideboarding between games in Bo3
- Match result reporting and standings

---

## 7. Client / UI Design

### 7.1 Board Layout

```
┌─────────────────────────────────────────────────────────┐
│  [Opponent Info: Score, Hand Count, Legend, Rune Count]  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ Opp Base     │  │ Opp Runes    │                     │
│  │ (units/gear) │  │ (pool)       │                     │
│  └──────────────┘  └──────────────┘                     │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Battlfld │  │ Battlfld │  │ Battlfld │  (if FFA)    │
│  │    1     │  │    2     │  │    3     │              │
│  │ [units]  │  │ [units]  │  │ [units]  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐                     │
│  │ My Base      │  │ My Runes     │                     │
│  │ (units/gear) │  │ (pool)       │                     │
│  └──────────────┘  └──────────────┘                     │
│                                                         │
│  ┌─────────────────────────────────────────────┐        │
│  │ My Hand (cards)                              │        │
│  └─────────────────────────────────────────────┘        │
│                                                         │
│  [Phase Indicator] [Score: 3-5] [Turn: 7] [Timer]       │
│  [Champion Zone]   [Action Log]  [Settings]             │
└─────────────────────────────────────────────────────────┘
```

### 7.2 Core UI Features

- **Card zoom on hover** — full card art + rules text
- **Drag-and-drop** — move units, play cards
- **Legal action highlighting** — glow on valid targets/destinations
- **Chain visualization** — show the resolution stack during Showdowns
- **Combat preview** — before confirming, show projected Might totals
- **Animation system** — card draw, unit movement, damage, conquer effects
- **Game log** — scrollable text log of all actions taken
- **Undo** — within same action (before opponent response)
- **Sound effects** — card play, combat, scoring, domain-themed audio

### 7.3 Responsive Design

- **Desktop** (primary): Full board layout with hover details
- **Tablet**: Slightly compressed, tap-to-zoom cards
- **Mobile**: Simplified vertical layout, phase-by-phase view

---

## 8. Data & Persistence (Browser-Local)

### 8.1 Storage Strategy

No backend database needed. All persistence is browser-local with optional cloud sync later.

| Data | Storage | Notes |
|------|---------|-------|
| **Saved decks** | localStorage / IndexedDB | Export/import as JSON or deck code strings |
| **Card database** | Bundled JSON + IndexedDB cache | Ship with the app, update via versioned JSON files |
| **Preferences** | localStorage | Theme, sound, default format, bot settings |
| **Replays** | IndexedDB + file export | Full action log saved as downloadable .json files |
| **Match history** | IndexedDB | Local record of games played, win/loss |
| **Bot profiles** | Bundled config | Ship with the app |

### 8.2 Replay System

Replays are just the action log — the ordered sequence of `PeerMessage` objects plus the initial committed deck orders. Since the engine is deterministic, replaying the action log reproduces the entire game state at every point. Replay files are tiny (a few KB) and can be shared as `.json` files or encoded into shareable URLs.

### 8.3 Deployment

```
Source (GitHub repo)
    │
    ├── Build (Vite / esbuild)
    │
    └── Deploy (static files)
         ├── GitHub Pages (free)
         ├── Cloudflare Pages (free)
         └── Netlify (free)
```

The entire app is static HTML/JS/CSS. No server processes, no containers, no databases to manage. CI/CD is just "push to main → auto-deploy."

### 8.4 Optional Future Backend

If the project grows and the community wants persistent accounts, leaderboards, or automatic matchmaking queues, a lightweight backend can be added later without changing the core architecture:

- **Supabase** (free tier) — auth, Postgres, real-time subscriptions
- **Cloudflare Workers** — matchmaking queue, leaderboard API
- **Firebase** — auth + Firestore for user profiles and deck sharing

This is purely additive — the core game always works without it.

---

## 9. Development Phases & Milestones

### Phase 1 — Foundation (Weeks 1-6)

**Goal**: Playable 1v1 local game with basic UI

- [ ] Card data schema + import Origins card database
- [ ] Core game state model
- [ ] Turn structure (ABCD + Action Phase)
- [ ] Resource system (Energy + Power from Runes)
- [ ] Basic card playing (Units, Spells, Gear)
- [ ] Unit movement (Base ↔ Battlefield)
- [ ] Combat resolution (Showdowns)
- [ ] Scoring system including Final Point Rule
- [ ] Mulligan system
- [ ] Basic UI: board layout, hand display, card rendering
- [ ] Local 2-player hotseat mode

### Phase 2 — Rules Completeness (Weeks 7-12)

**Goal**: All Origins cards functional, chain system working

- [ ] Chain/stack implementation (priority, Reactions)
- [ ] All keyword abilities (Ganking, Hidden, Signature, etc.)
- [ ] Ability scripting engine (DSL + script overrides)
- [ ] Script every Origins card (~298 cards)
- [ ] Token creation and management
- [ ] Battlefield abilities (conquer effects)
- [ ] Comprehensive zone management (privacy rules)
- [ ] "Can't beats Can" conflict resolution
- [ ] Deck builder with validation
- [ ] Preconstructed deck templates

### Phase 3 — Networking & Multiplayer (Weeks 13-18)

**Goal**: Online 1v1 via WebRTC with commit-reveal shuffle

- [ ] Commit-reveal shuffle system (SHA-256 via Web Crypto API)
- [ ] Ensure engine determinism (no Math.random, shared seeds only)
- [ ] WebRTC DataChannel integration via PeerJS
- [ ] Room code lobby system (create/join with short codes)
- [ ] Peer message protocol (action exchange + card reveals)
- [ ] Coin flip / turn order via joint entropy (both players contribute seed)
- [ ] Connection state management (connecting, playing, disconnected)
- [ ] Reconnection handling (replay action log to resync state)
- [ ] End-of-game hash verification (detect tampered deck orders)
- [ ] Turn timer system (client-enforced, peer-verified)

### Phase 4 — Bot AI (Weeks 19-24)

**Goal**: All 4 bot difficulty tiers functional

- [ ] Bot controller interface
- [ ] Tier 1 — Random legal actions
- [ ] Tier 2 — Heuristic evaluation function
- [ ] Tier 3 — Minimax with alpha-beta pruning
- [ ] Tier 4 — MCTS with Information Set sampling
- [ ] Bot personality profiles (Aggro, Control, Tempo, Trickster)
- [ ] Bot deck selection (from meta decks or random)
- [ ] Bot integration into matchmaking (fill slots)
- [ ] Practice mode (1 vs Bot with configurable settings)
- [ ] Bot vs Bot simulation mode (for balance testing)

### Phase 5 — Polish & Formats (Weeks 25-30)

**Goal**: Full feature set, multiple formats

- [ ] FFA Skirmish and War modes (3-4 players via mesh WebRTC)
- [ ] 2v2 (Two-Headed Giant) mode
- [ ] Best-of-3 with sideboarding
- [ ] Sealed format (pack opening simulation)
- [ ] Puzzle mode (curated lethal puzzles)
- [ ] UI animations and sound design
- [ ] Mobile-responsive layout
- [ ] Replay export/import (.json action logs)
- [ ] Replay viewer with timeline scrubbing
- [ ] Spectator mode (read-only peer that receives action stream)
- [ ] Spiritforged set integration (~200+ new cards)

### Phase 6 — Community & Launch (Weeks 31-36)

**Goal**: Public beta, community tools

- [ ] Public beta launch (deploy to Cloudflare Pages / GitHub Pages)
- [ ] Deck sharing via URL-encoded deck codes
- [ ] Deck import/export (clipboard, file, URL)
- [ ] Local match history and stats tracking (IndexedDB)
- [ ] Optional: Supabase backend for shared leaderboards and deck library
- [ ] Optional: Matchmaking queue via Cloudflare Worker
- [ ] Performance optimization (bundle size, Web Worker efficiency)
- [ ] Community Discord integration (share room codes, replays)
- [ ] Documentation, onboarding tutorial, and interactive learn-to-play mode
- [ ] Open-source release (MIT or similar)

---

## 10. Technical Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Rules complexity** — edge cases in card interactions | High | Comprehensive test suite per card; community bug reporting; follow official FAQ/errata |
| **Card scripting scale** — 500+ cards need individual scripts | High | Hybrid DSL handles 70% of cards; script only complex ones |
| **Riot takedown** — IP/legal concerns | Critical | Use proxy card art or community-made art; open-source the engine; position as "simulator" not "official client" |
| **Hidden information in P2P** — commit-reveal isn't bulletproof | Medium | Simple hash scheme is good enough for community play; upgrade to mental poker protocol if cheating becomes widespread |
| **Engine determinism** — both clients must stay in sync | High | No floating point randomness; shared RNG seeds; action log checksums; desync detection with auto-resync |
| **WebRTC reliability** — NAT traversal can fail | Medium | PeerJS includes TURN relay fallback; fall back to WebSocket relay if needed |
| **New set releases** — quarterly card additions | Ongoing | Modular card database; scripting pipeline for rapid card entry |
| **FFA/2v2 mesh networking** — more complex than 1v1 | Medium | Defer to Phase 5; star topology (one host relays) simpler than full mesh |

---

## 11. Legal Considerations

- This is a **fan-made simulator** — not affiliated with Riot Games or UVS Games
- Riot has a history of being lenient with fan tools (see: existing TTS mod, TCG Arena, Pixelborn)
- However, Riot has also shut down some tools (Pixelborn for Lorcana was shut down by Disney)
- **Mitigations**: Don't monetize; credit Riot/UVS; use original or proxy art assets; comply promptly with any takedown requests; keep the project open-source
- Monitor Riot's stated Digital Tools Policy

---

## 12. Open Questions for Development

1. **React or vanilla TS for the UI?** — React gives you component structure and state management out of the box, which fits a card game well. But vanilla TS + PixiJS could give better rendering performance for animations. Could also go React for layout + PixiJS canvas for the board.

2. **Card art approach?** — Scrape official card images (risk of takedown) vs. use placeholder/proxy art (safer but less appealing) vs. community-contributed art. Could start with text-only cards and add art later.

3. **Open source from day one?** — Open-sourcing immediately would accelerate community contributions, provide legal cover, and let others help script cards. MIT license recommended.

4. **Monetization?** — Recommend none (donations only via Ko-fi/Patreon) to minimize legal risk and maximize community goodwill.

5. **Mental poker upgrade?** — The simple commit-reveal hash is enough to start. Worth monitoring if cheating becomes a problem and upgrading to full mental poker crypto later. The engine API should be designed so the shuffle/reveal layer is swappable.

6. **FFA topology?** — For 3-4 player games, star topology (one player is host/relay) is simpler than full WebRTC mesh. Worth deciding before Phase 5.

---

*This plan covers the full scope of building an accurate, multiplayer-capable Riftbound TCG simulator with intelligent bot opponents — all running in the browser with zero server costs. Each phase is designed to be independently valuable — even Phase 1 alone produces a useful local playtesting tool.*
