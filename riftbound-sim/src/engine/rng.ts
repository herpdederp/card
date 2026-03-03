// ============================================================================
// Riftbound TCG — Deterministic RNG
// ============================================================================
// A seeded PRNG using the xoshiro128** algorithm. Both P2P clients seed
// this identically so all random effects resolve the same way.
// Math.random() is NEVER used in the engine.
// ============================================================================

/**
 * Seeded pseudo-random number generator (xoshiro128**).
 * Deterministic: same seed → same sequence every time.
 */
export class SeededRNG {
  private state: [number, number, number, number];

  constructor(seed: number) {
    // Initialize state using splitmix32 from the seed
    this.state = [0, 0, 0, 0];
    for (let i = 0; i < 4; i++) {
      seed += 0x9e3779b9;
      let t = seed;
      t = Math.imul(t ^ (t >>> 16), 0x21f0aaad);
      t = Math.imul(t ^ (t >>> 15), 0x735a2d97);
      this.state[i] = (t ^ (t >>> 15)) >>> 0;
    }
    // Ensure state isn't all zeros
    if (this.state.every(s => s === 0)) {
      this.state[0] = 1;
    }
  }

  /** Get current state for serialization. */
  getState(): number {
    // Pack state into a single number for simple serialization
    // (lossy but good enough for desync detection)
    return (this.state[0] ^ this.state[1] ^ this.state[2] ^ this.state[3]) >>> 0;
  }

  /** Generate a random 32-bit unsigned integer. */
  nextU32(): number {
    const s = this.state;
    const result = Math.imul(rotl(Math.imul(s[1], 5), 7), 9);

    const t = s[1] << 9;
    s[2] ^= s[0];
    s[3] ^= s[1];
    s[1] ^= s[2];
    s[0] ^= s[3];
    s[2] ^= t;
    s[3] = rotl(s[3], 11);

    return result >>> 0;
  }

  /** Generate a random float in [0, 1). */
  nextFloat(): number {
    return this.nextU32() / 4294967296;
  }

  /** Generate a random integer in [min, max] (inclusive). */
  nextInt(min: number, max: number): number {
    return min + (this.nextU32() % (max - min + 1));
  }

  /**
   * Shuffle an array in place (Fisher-Yates).
   * Returns the same array reference.
   */
  shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.nextU32() % (i + 1);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /** Pick a random element from an array. */
  pick<T>(array: T[]): T {
    return array[this.nextU32() % array.length];
  }
}

function rotl(x: number, k: number): number {
  return ((x << k) | (x >>> (32 - k))) >>> 0;
}

/**
 * Combine two player-contributed seeds into a single game seed.
 * Both players share their seed publicly, and both compute the same combined seed.
 */
export function combineSeeds(seedA: number, seedB: number): number {
  // Simple XOR + hash to combine
  let combined = seedA ^ seedB;
  combined = Math.imul(combined ^ (combined >>> 16), 0x45d9f3b);
  combined = Math.imul(combined ^ (combined >>> 13), 0x45d9f3b);
  return (combined ^ (combined >>> 16)) >>> 0;
}
