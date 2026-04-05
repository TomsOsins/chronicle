
export interface District {
  name: string;
  description: string;
  vibe: string;
  dangerLevel: number; // 1-10
}

export interface NPC {
  id?: string;
  name: string;
  role: string;
  description: string;
  secret: string;
}

export interface Rumor {
  source: string;
  text: string;
  truthValue: 'True' | 'False' | 'Partial';
}

export interface LeylineNode {
  name: string;
  type: string; 
  frequency: string; 
  stability: number; // 1-100%
  effect: string;
  coordinates: { x: number; y: number };
}

export interface Deity {
  name: string;
  domain: string;
  influence: number; // 1-100
  heresyLevel: number; // 1-10
}

export interface Commodity {
  name: string;
  price: string;
  trend: 'UP' | 'DOWN' | 'STABLE';
  volatility: number;
}

export interface Demographic {
  species: string;
  percentage: number;
}

export interface DefenseNode {
  name: string;
  integrity: number;
  type: string;
}

export type Biome = 'coastal' | 'river' | 'forest' | 'plains' | 'mountain' | 'desert' | 'swamp' | 'crossroads';
export type SettlementAge = 'new' | 'established' | 'ancient';

export interface CityData {
  id: string;
  ledgerId: string;
  name: string;
  title: string;
  population: number;
  government: string;
  economy: string;
  magicLevel: number; // 1-10
  biome?: Biome;
  age?: SettlementAge;
  districts: District[];
  npcs: NPC[];
  rumors: Rumor[];
  history: string;
  leylineNodes: LeylineNode[];
  latitude: string;
  longitude: string;
  
  // Neutralized Geopolitical Modules
  strategicVitals: {
    securityRating: string; // Grade (e.g. S-tier to F-tier)
    tradeVolume: number; // 0-100
    stabilityStatus: 'STABLE' | 'FRAGILE' | 'VOLATILE';
  };
  territorialFootprint: {
    chokepoints: { name: string; status: 'SECURE' | 'CRITICAL' | 'CONTESTED'; description: string }[];
    bufferZones: { name: string; status: 'FRIENDLY' | 'NEUTRAL' | 'HOSTILE'; description: string }[];
  };
  resourceMatrix: {
    resource: string;
    status: 'SURPLUS' | 'DEFICIT' | 'STABLE';
    dependency: string;
  }[];
  mythicIntel: {
    leyLineProximity: 'DISTANT' | 'INTERACTING' | 'INTERSECTING';
    strategicMagicAssets: string[];
    arcaneSignature: string;
  };

  // Other Systems
  theology: {
    pantheon: Deity[];
    faithTension: number;
    miracleFrequency: string;
  };
  mercantile: {
    commodities: Commodity[];
    wealthGap: number;
    primaryExport: string;
  };
  society: {
    matrix: Demographic[];
    unrestIndex: number;
    casteHierarchy: string;
  };
  infrastructure: {
    siegeDays: number;
    wallIntegrity: number;
    garrisonReadiness: number;
    defenseNodes: DefenseNode[];
  };
}

export enum ViewMode {
  GEOPOLITICAL = 'SOVEREIGNTY',
  MAP = 'RESONANCE',
  DIVINE = 'THEOLOGY',
  ECONOMY = 'COMMERCE',
  SOCIETY = 'SOCIETY',
  STEEL = 'DEFENSE',
  TELEMETRY = 'TELEMETRY'
}

export interface Ledger {
  id: string;
  name: string;
  era: string;
  cycle: string;
}
