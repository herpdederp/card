// ============================================================================
// Riftbound TCG — Card Database
// ============================================================================
// Loads card definitions and provides lookup functionality.
// Card data is stored as static JSON bundled with the app.
// ============================================================================

import {
  type CardDefinition,
  type DeckList,
  type DeckValidationResult,
  CardType,
  Domain,
  Keyword,
} from "../models/card.js";

/** The card database — all known card definitions. */
export class CardDatabase {
  private cards = new Map<string, CardDefinition>();
  private byName = new Map<string, CardDefinition[]>();
  private bySet = new Map<string, CardDefinition[]>();
  private byType = new Map<string, CardDefinition[]>();
  private byDomain = new Map<string, CardDefinition[]>();

  /** Load card definitions (e.g. from bundled JSON). */
  loadCards(definitions: CardDefinition[]): void {
    for (const card of definitions) {
      this.cards.set(card.id, card);

      // Index by full name
      const nameGroup = this.byName.get(card.fullName) ?? [];
      nameGroup.push(card);
      this.byName.set(card.fullName, nameGroup);

      // Index by set
      const setGroup = this.bySet.get(card.set) ?? [];
      setGroup.push(card);
      this.bySet.set(card.set, setGroup);

      // Index by type
      const typeGroup = this.byType.get(card.type) ?? [];
      typeGroup.push(card);
      this.byType.set(card.type, typeGroup);

      // Index by domain
      for (const domain of card.domains) {
        const domainGroup = this.byDomain.get(domain) ?? [];
        domainGroup.push(card);
        this.byDomain.set(domain, domainGroup);
      }
    }
  }

  // -- Lookups --

  getById(id: string): CardDefinition | undefined {
    return this.cards.get(id);
  }

  getByFullName(fullName: string): CardDefinition[] {
    return this.byName.get(fullName) ?? [];
  }

  getBySet(set: string): CardDefinition[] {
    return this.bySet.get(set) ?? [];
  }

  getByType(type: CardType): CardDefinition[] {
    return this.byType.get(type) ?? [];
  }

  getByDomain(domain: Domain): CardDefinition[] {
    return this.byDomain.get(domain) ?? [];
  }

  getAllLegends(): CardDefinition[] {
    return this.getByType(CardType.Legend);
  }

  getAllBattlefields(): CardDefinition[] {
    return this.getByType(CardType.Battlefield);
  }

  getAllRunes(): CardDefinition[] {
    return this.getByType(CardType.Rune);
  }

  /** Get all cards matching a Legend's domain identity. */
  getCardsForLegend(legendId: string): CardDefinition[] {
    const legend = this.getById(legendId);
    if (!legend || legend.type !== CardType.Legend) return [];

    const results: CardDefinition[] = [];
    for (const card of this.cards.values()) {
      // Skip legends, battlefields, runes — they have separate rules
      if (card.type === CardType.Legend || card.type === CardType.Battlefield) continue;
      if (card.type === CardType.Rune) continue;

      // Card must have all its domains within the legend's domains
      const legendDomains = new Set(legend.domains);
      const cardFitsDomains = card.domains.every(d => legendDomains.has(d));
      if (cardFitsDomains) {
        results.push(card);
      }
    }
    return results;
  }

  /** Total card count. */
  get size(): number {
    return this.cards.size;
  }

  /** All card definitions. */
  all(): CardDefinition[] {
    return Array.from(this.cards.values());
  }

  // -- Deck Validation --

  /**
   * Validate a deck list against Riftbound construction rules.
   *
   * Rules:
   * - Exactly 1 Champion Legend
   * - 40+ cards in Main Deck
   * - Max 3 copies of any card (by full name)
   * - Max 3 Signature cards total
   * - All cards must match Legend's Domain Identity
   * - Exactly 12 Runes matching Legend's domains
   * - Exactly 3 Battlefields
   * - Sideboard is exactly 0 or 8 cards
   * - Chosen Champion must be one of the Legend's champion options
   */
  validateDeck(deck: DeckList): DeckValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // -- Legend --
    const legend = this.getById(deck.legendId);
    if (!legend) {
      errors.push(`Legend card not found: ${deck.legendId}`);
      return { valid: false, errors, warnings };
    }
    if (legend.type !== CardType.Legend) {
      errors.push(`${legend.name} is not a Legend card`);
    }
    const legendDomains = new Set(legend.domains);

    // -- Chosen Champion --
    const chosenChamp = this.getById(deck.chosenChampionId);
    if (!chosenChamp) {
      errors.push(`Chosen Champion not found: ${deck.chosenChampionId}`);
    } else if (chosenChamp.type !== CardType.Champion) {
      errors.push(`${chosenChamp.name} is not a Champion card`);
    } else if (legend.championOptions && !legend.championOptions.includes(deck.chosenChampionId)) {
      errors.push(`${chosenChamp.name} is not a valid champion for ${legend.name}`);
    }

    // -- Main Deck Size --
    if (deck.mainDeckIds.length < 40) {
      errors.push(`Main Deck has ${deck.mainDeckIds.length} cards (minimum 40)`);
    }

    // -- Copy Limit & Domain Identity --
    const nameCounts = new Map<string, number>();
    let signatureCount = 0;

    for (const cardId of deck.mainDeckIds) {
      const card = this.getById(cardId);
      if (!card) {
        errors.push(`Card not found in main deck: ${cardId}`);
        continue;
      }

      // Domain check
      const cardFitsDomains = card.domains.every(d => legendDomains.has(d));
      if (!cardFitsDomains) {
        errors.push(`${card.name} (${card.domains.join("/")}) doesn't match ${legend.name}'s domains (${legend.domains.join("/")})`);
      }

      // Copy count
      const count = (nameCounts.get(card.fullName) ?? 0) + 1;
      nameCounts.set(card.fullName, count);
      if (count > 3) {
        errors.push(`Too many copies of ${card.fullName} (${count}, max 3)`);
      }

      // Signature count
      if (card.keywords.includes(Keyword.Signature)) {
        signatureCount++;
      }
    }

    if (signatureCount > 3) {
      errors.push(`Too many Signature cards (${signatureCount}, max 3)`);
    }

    // -- Rune Deck --
    if (deck.runeDeckIds.length !== 12) {
      errors.push(`Rune Deck has ${deck.runeDeckIds.length} cards (must be exactly 12)`);
    }
    for (const runeId of deck.runeDeckIds) {
      const rune = this.getById(runeId);
      if (!rune) {
        errors.push(`Rune not found: ${runeId}`);
        continue;
      }
      if (rune.type !== CardType.Rune) {
        errors.push(`${rune.name} is not a Rune card`);
      }
      const runeFitsDomains = rune.domains.every(d => legendDomains.has(d));
      if (!runeFitsDomains) {
        errors.push(`Rune ${rune.name} doesn't match Legend's domains`);
      }
    }

    // -- Battlefields --
    if (deck.battlefieldIds.length !== 3) {
      errors.push(`Must have exactly 3 Battlefields (has ${deck.battlefieldIds.length})`);
    }
    for (const bfId of deck.battlefieldIds) {
      const bf = this.getById(bfId);
      if (!bf) {
        errors.push(`Battlefield not found: ${bfId}`);
      } else if (bf.type !== CardType.Battlefield) {
        errors.push(`${bf.name} is not a Battlefield card`);
      }
    }

    // -- Sideboard --
    if (deck.sideboardIds.length !== 0 && deck.sideboardIds.length !== 8) {
      errors.push(`Sideboard must be exactly 0 or 8 cards (has ${deck.sideboardIds.length})`);
    }

    return { valid: errors.length === 0, errors, warnings };
  }
}
