/**
 * coalcoreExport.ts
 * Maps Chronicle's CityData to the Coalcore shared schema.
 * Used by the JSON export feature so Chronicle cities can be imported
 * directly into Hearth (as regional capitals) and Lineage (as NPC context).
 *
 * Does NOT mutate CityData — pure transform, returns a new object.
 */

import { CityData, Biome } from '../types';

// ─── COALCORE SCHEMA TYPES ────────────────────────────────────────────────────

export type GovernanceType =
  | 'elder_council'
  | 'feudal_lord'
  | 'guild_republic'
  | 'theocracy'
  | 'military_occupation'
  | 'merchant_council'
  | 'monarchy'
  | 'tribal_confederation'
  | 'anarchist'
  | 'shadow_council'
  | 'unknown';

export interface CoalcoreTradeGood {
  name: string;
  tier: 'generic' | 'specific';
  trend?: 'UP' | 'DOWN' | 'STABLE';
}

export interface CoalcoreConnection {
  targetName: string;
  type: 'road' | 'river' | 'sea_route' | 'political' | 'territorial';
  quality: string;
  traffic: 'occasional' | 'regular' | 'heavy';
  dependency: 'none' | 'imports' | 'exports' | 'both';
}

export interface CoalcoreReligiousPresence {
  type: 'shrine' | 'temple' | 'monastery' | 'cult_site' | 'none';
  deity: string | null;
  influence: 'minor' | 'moderate' | 'dominant';
  npc_id: string | null;
}

export interface CoalcoreExport {
  coalcore_version: '1.0';
  tool_origin: 'chronicle';
  exported_at: string;

  settlement: {
    id: string;
    name: string;
    type: 'city' | 'metropolis';
    biome: Biome | null;
    age: 'new' | 'established' | 'ancient' | null;
    population: number;
    wealthTier: 1 | 2 | 3 | 4 | 5;
  };

  economy: {
    primaryIndustry: string;
    exports: CoalcoreTradeGood[];
    imports: CoalcoreTradeGood[];
    uniqueResource: string | null;
  };

  power: {
    governanceType: GovernanceType;
    governanceRaw: string; // preserves the original Chronicle string
    dominantFaction: { name: string; role: string; npc_id: string | null } | null;
    tensions: string[];
    stabilityStatus: 'STABLE' | 'FRAGILE' | 'VOLATILE';
    unrestIndex: number;
  };

  connections: CoalcoreConnection[];

  religiousPresence: CoalcoreReligiousPresence;

  demographics: {
    species: string;
    percentage: number;
  }[];

  // Full Chronicle data preserved for round-tripping — Hearth/Lineage
  // can read deep Chronicle context (districts, leylines, etc.) from here.
  _chronicle_source: CityData;
}

// ─── GOVERNANCE NORMALIZER ────────────────────────────────────────────────────

const GOVERNANCE_MAP: [string[], GovernanceType][] = [
  [['elder', 'council of elders', 'ruling council'], 'elder_council'],
  [['theocrat', 'divine oracle', 'religious'], 'theocracy'],
  [['military', 'junta', 'warlord', 'marshal'], 'military_occupation'],
  [['merchant republic', 'guild parliament', 'democratic assembly', 'guild'], 'guild_republic'],
  [['monarch', 'king', 'queen', 'dynasty', 'hereditary', 'dual monarchy'], 'monarchy'],
  [['merchant council', 'merchant prince', 'trade council'], 'merchant_council'],
  [['shadow council', 'criminal syndicate', 'puppet'], 'shadow_council'],
  [['tribal', 'clan', 'chieftain', 'confederation'], 'tribal_confederation'],
  [['anarchist', 'commune', 'collective'], 'anarchist'],
  [['philosopher-king', 'autocrac', 'senate', 'elected', 'mage conclave', 'draconic', 'necromantic'], 'unknown'],
];

function normalizeGovernance(raw: string): GovernanceType {
  const lower = raw.toLowerCase();
  for (const [keywords, type] of GOVERNANCE_MAP) {
    if (keywords.some(k => lower.includes(k))) return type;
  }
  return 'unknown';
}

// ─── WEALTH TIER DERIVATION ───────────────────────────────────────────────────

function deriveWealthTier(city: CityData): 1 | 2 | 3 | 4 | 5 {
  const tradeScore = city.strategicVitals.tradeVolume; // 0-100
  // Inverse of wealthGap: a high wealth gap means wealth is concentrated, not broad
  // Use tradeVolume as the primary signal for overall city wealth level
  if (tradeScore >= 80) return 5;
  if (tradeScore >= 62) return 4;
  if (tradeScore >= 44) return 3;
  if (tradeScore >= 26) return 2;
  return 1;
}

// ─── SETTLEMENT TYPE ─────────────────────────────────────────────────────────

function deriveSettlementType(population: number): 'city' | 'metropolis' {
  return population >= 25000 ? 'metropolis' : 'city';
}

// ─── TRADE GOOD MAPPERS ───────────────────────────────────────────────────────

function deriveExports(city: CityData): CoalcoreTradeGood[] {
  const goods: CoalcoreTradeGood[] = [];

  // Primary export from mercantile — always present
  if (city.mercantile.primaryExport) {
    goods.push({ name: city.mercantile.primaryExport, tier: 'generic' });
  }

  // SURPLUS resources from resourceMatrix
  for (const r of city.resourceMatrix) {
    if (r.status === 'SURPLUS') {
      goods.push({ name: r.resource, tier: 'generic' });
    }
  }

  // Commodities with UP trend are likely exports
  for (const c of city.mercantile.commodities) {
    if (c.trend === 'UP' && !goods.some(g => g.name === c.name)) {
      goods.push({ name: c.name, tier: 'specific', trend: 'UP' });
    }
  }

  return goods;
}

function deriveImports(city: CityData): CoalcoreTradeGood[] {
  const goods: CoalcoreTradeGood[] = [];

  // DEFICIT resources from resourceMatrix
  for (const r of city.resourceMatrix) {
    if (r.status === 'DEFICIT') {
      goods.push({ name: r.resource, tier: 'generic' });
    }
  }

  // DOWN trend commodities are being sourced/consumed unsustainably — treated as import pressure
  for (const c of city.mercantile.commodities) {
    if (c.trend === 'DOWN' && !goods.some(g => g.name === c.name)) {
      goods.push({ name: c.name, tier: 'specific', trend: 'DOWN' });
    }
  }

  return goods;
}

// ─── TENSIONS DERIVATION ─────────────────────────────────────────────────────

function deriveTensions(city: CityData): string[] {
  const tensions: string[] = [];

  if (city.strategicVitals.stabilityStatus === 'VOLATILE') {
    tensions.push('Political instability');
  } else if (city.strategicVitals.stabilityStatus === 'FRAGILE') {
    tensions.push('Political fragility');
  }

  if (city.society.unrestIndex > 60) {
    tensions.push('Civil unrest');
  } else if (city.society.unrestIndex > 40) {
    tensions.push('Social discontent');
  }

  if (city.theology.faithTension > 60) {
    tensions.push('Religious tension');
  }

  for (const zone of city.territorialFootprint.bufferZones) {
    if (zone.status === 'HOSTILE') {
      tensions.push(`Hostile border: ${zone.name}`);
    }
  }

  for (const cp of city.territorialFootprint.chokepoints) {
    if (cp.status === 'CONTESTED') {
      tensions.push(`Contested chokepoint: ${cp.name}`);
    } else if (cp.status === 'CRITICAL') {
      tensions.push(`Critical vulnerability: ${cp.name}`);
    }
  }

  for (const r of city.resourceMatrix) {
    if (r.status === 'DEFICIT') {
      tensions.push(`Resource deficit: ${r.resource} (sourced from ${r.dependency})`);
    }
  }

  return tensions;
}

// ─── CONNECTIONS MAPPER ───────────────────────────────────────────────────────

function deriveConnections(city: CityData): CoalcoreConnection[] {
  const connections: CoalcoreConnection[] = [];

  // Friendly buffer zones → trade route connections
  for (const zone of city.territorialFootprint.bufferZones) {
    connections.push({
      targetName: zone.name,
      type: 'territorial',
      quality: 'maintained road',
      traffic: zone.status === 'FRIENDLY' ? 'regular' : 'occasional',
      dependency: 'none',
    });
  }

  // Secure chokepoints → road/naval connections
  for (const cp of city.territorialFootprint.chokepoints) {
    connections.push({
      targetName: cp.name,
      type: cp.name.toLowerCase().includes('harbor') || cp.name.toLowerCase().includes('port') || cp.name.toLowerCase().includes('river')
        ? 'sea_route'
        : 'road',
      quality: cp.status === 'SECURE' ? 'cobbled road' : 'maintained road',
      traffic: cp.status === 'SECURE' ? 'heavy' : 'regular',
      dependency: 'none',
    });
  }

  // DEFICIT resource dependencies → import connections
  for (const r of city.resourceMatrix) {
    if (r.status === 'DEFICIT' && r.dependency) {
      connections.push({
        targetName: r.dependency,
        type: 'road',
        quality: 'maintained road',
        traffic: 'regular',
        dependency: 'imports',
      });
    }
  }

  return connections;
}

// ─── RELIGIOUS PRESENCE ───────────────────────────────────────────────────────

function deriveReligiousPresence(city: CityData): CoalcoreReligiousPresence {
  const { pantheon, faithTension } = city.theology;

  if (!pantheon || pantheon.length === 0) {
    return { type: 'none', deity: null, influence: 'minor', npc_id: null };
  }

  // Highest influence deity is the dominant faith
  const dominant = [...pantheon].sort((a, b) => b.influence - a.influence)[0];

  // Find a priest NPC if one exists
  const priestNpc = city.npcs.find(n =>
    n.role.toLowerCase().includes('priest') ||
    n.role.toLowerCase().includes('cleric') ||
    n.role.toLowerCase().includes('oracle') ||
    n.role.toLowerCase().includes('theogon')
  );

  const influence: 'minor' | 'moderate' | 'dominant' =
    dominant.influence > 60 ? 'dominant' :
    dominant.influence > 35 ? 'moderate' : 'minor';

  // Population size → institution type
  const type: 'shrine' | 'temple' | 'monastery' | 'cult_site' =
    city.population >= 50000 ? 'monastery' :
    city.population >= 10000 ? 'temple' :
    faithTension > 60 ? 'cult_site' : 'temple';

  return {
    type,
    deity: dominant.name,
    influence,
    npc_id: priestNpc?.id ?? null,
  };
}

// ─── DOMINANT FACTION ─────────────────────────────────────────────────────────

function deriveDominantFaction(city: CityData) {
  if (!city.npcs || city.npcs.length === 0) return null;

  // Prefer power roles: Spymaster, Guild Master, High Priest, Captain, etc.
  const powerRoles = ['spymaster', 'guild master', 'high priest', 'captain', 'duke', 'jarl', 'emperor', 'king', 'queen', 'patriarch', 'lord', 'grand'];
  const powerNpc = city.npcs.find(n =>
    powerRoles.some(r => n.role.toLowerCase().includes(r))
  ) ?? city.npcs[0];

  return {
    name: powerNpc.name,
    role: powerNpc.role,
    npc_id: powerNpc.id ?? null,
  };
}

// ─── MAIN EXPORT FUNCTION ─────────────────────────────────────────────────────

export function toCoalcoreExport(city: CityData): CoalcoreExport {
  return {
    coalcore_version: '1.0',
    tool_origin: 'chronicle',
    exported_at: new Date().toISOString(),

    settlement: {
      id: city.id,
      name: city.name,
      type: deriveSettlementType(city.population),
      biome: city.biome ?? null,
      age: city.age ?? null,
      population: city.population,
      wealthTier: deriveWealthTier(city),
    },

    economy: {
      primaryIndustry: city.mercantile.primaryExport || city.economy,
      exports: deriveExports(city),
      imports: deriveImports(city),
      uniqueResource: null, // Chronicle doesn't model unique resources; Hearth will derive for satellites
    },

    power: {
      governanceType: normalizeGovernance(city.government),
      governanceRaw: city.government,
      dominantFaction: deriveDominantFaction(city),
      tensions: deriveTensions(city),
      stabilityStatus: city.strategicVitals.stabilityStatus,
      unrestIndex: city.society.unrestIndex,
    },

    connections: deriveConnections(city),

    religiousPresence: deriveReligiousPresence(city),

    demographics: city.society.matrix,

    _chronicle_source: city,
  };
}

/**
 * Serialize a Coalcore export to a JSON string, ready for download.
 * Usage: const blob = new Blob([serializeCoalcoreExport(city)], { type: 'application/json' });
 */
export function serializeCoalcoreExport(city: CityData): string {
  return JSON.stringify(toCoalcoreExport(city), null, 2);
}
