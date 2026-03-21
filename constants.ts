
import { CityData } from './types';

export const RANDOM_PROMPTS = [
  'A coastal trading hub built into giant basalt pillars',
  'A floating city tethered to a dormant volcano by massive iron chains',
  'A subterranean metropolis built inside a giant shimmering geode',
  'A city constructed entirely from the bleached bones of an ancient titan',
  'A vertical city built into the sides of a mile-filled mist-filled canyon',
  'A nomadic city on the back of a colossal, slow-moving desert turtle'
];

export const LEDGER_PROCESSES = [
  "RETRIEVING_REALM_CHRONICLES",
  "ALIGNING_CARTOGRAPHIC_GRIDS",
  "SURVEYING_SOVEREIGN_BORDERS",
  "ASSESSING_LOCAL_POPULACE",
  "CHARTING_CELESTIAL_NODES",
  "EVALUATING_COMMERCE_FLUX",
  "CATALOGING_GOVERNANCE_LAWS",
  "MONITORING_ARCANE_RESONANCE",
  "MAPPING_DEFENSE_STRUCTURES",
  "ANALYZING_HARMONIC_BALANCE",
  "CALIBRATING_THE_WEAVE",
  "TRANSCRIBING_HISTORICAL_LORE",
  "SEALING_ARCHIVE_RECORDS"
];

export const STORAGE_KEYS = {
  LEDGERS: 'guild_ledgers_v3',
  ACTIVE_LEDGER: 'guild_active_ledger_v3',
  CITIES: 'guild_cities_v3'
};

export const DEFAULT_CITY: CityData = {
  id: 'default-test-city-001',
  ledgerId: 'genesis-001',
  name: "BALDUR'S GATE",
  title: 'Crown of the Sword Coast // Western Heartlands',
  population: 125000,
  government: 'The Council of Four & The Flaming Fist',
  economy: 'International Maritime Trade, Shipbuilding, Banking',
  magicLevel: 5,
  history: 'Founded by the legendary Balduran. A metropolis defined by its towering walls and its status as a nexus of commerce. It serves as the primary gateway for trade between the North and the southern realms.',
  latitude: '56.84N',
  longitude: '14.52W',
  
  strategicVitals: {
    securityRating: 'High',
    tradeVolume: 92,
    stabilityStatus: 'FRAGILE'
  },
  territorialFootprint: {
    chokepoints: [
      { name: 'Basilisk Gate', status: 'CRITICAL', description: 'Primary terrestrial access point. Vital for merchant caravans.' },
      { name: 'Grey Harbor Mouth', status: 'SECURE', description: 'Deep water access guarded by seasoned patrols.' }
    ],
    bufferZones: [
      { name: 'Western Heartlands', status: 'FRIENDLY', description: 'Vast agrarian expanse providing vital supplies.' },
      { name: 'Elturgard Border', status: 'HOSTILE', description: 'Subject to friction following recent diplomatic shifts.' }
    ]
  },
  resourceMatrix: [
    { resource: 'Iron Ore', status: 'DEFICIT', dependency: 'Amnish Mining Colonies' },
    { resource: 'Banking Capital', status: 'SURPLUS', dependency: 'Maritime Markets' },
    { resource: 'Fresh Water', status: 'STABLE', dependency: 'Chionthar River' }
  ],
  mythicIntel: {
    leyLineProximity: 'INTERACTING',
    strategicMagicAssets: ['The High Hall Anchor', 'Watcher Spires'],
    arcaneSignature: 'RESONANCE-BHAAL-V3'
  },

  districts: [
    { name: 'THE UPPER CITY', description: 'Home to the nobility. Impeccable architecture and the seat of governing power.', vibe: 'Stately Opulence', dangerLevel: 2 },
    { name: 'THE LOWER CITY', description: 'The commercial heart. A sprawl of shops and artisan workshops near the docks.', vibe: 'Vibrant Commerce', dangerLevel: 5 },
    { name: 'THE OUTER CITY', description: 'The vast settlements beyond the walls. Home to travelers and the industrious poor.', vibe: 'Bustling Survival', dangerLevel: 8 },
    { name: 'LITTLE CALIMSHAN', description: 'A unique cultural enclave reflecting the styles of the southern desert lands.', vibe: 'Cloistered Heritage', dangerLevel: 6 }
  ],
  npcs: [
    { name: 'Duke Ulder Ravengard', role: 'Grand Duke', description: 'A stern leader who maintains order within the city walls.', secret: 'He worries about internal friction within the council.' },
    { name: 'Nine-Fingers Keene', role: 'Guildmistress', description: 'A key figure in the city\'s complex under-market.', secret: 'She holds significant leverage over several local officials.' },
    { name: 'Minsc & Boo', role: 'Realm Defenders', description: 'A legendary ranger and his small, loyal companion.', secret: 'Their intuition regarding threats is uncannily accurate.' }
  ],
  rumors: [
    { source: 'A dockworker', text: 'Strange figures have been seen in the lower cisterns late at night.', truthValue: 'True' },
    { source: 'Court Gossip', text: 'The council is divided on whether to increase tariffs on southern grain.', truthValue: 'Partial' },
    { source: 'Market Crier', text: 'New trade routes through the Underdark are being explored by bold merchants.', truthValue: 'True' }
  ],
  leylineNodes: [
    { name: 'The High Hall Anchor', type: 'Celestial', frequency: 'Stable Resonant', stability: 92, effect: 'Enhances clarity of thought and judicial focus.', coordinates: { x: 55, y: 25 } },
    { name: 'Sea Tower Spire', type: 'Maritime', frequency: 'Tidal Harmonic', stability: 85, effect: 'Aids in navigation through coastal mists.', coordinates: { x: 25, y: 45 } },
    { name: 'The Undercellar Nexus', type: 'Chthonic', frequency: 'Deep Whisper', stability: 15, effect: 'Causes mild unease in those sensitive to the earth.', coordinates: { x: 45, y: 55 } },
    { name: 'Chionthar Convergence', type: 'Hydro-Arcane', frequency: 'Fluid Rhythm', stability: 78, effect: 'Promotes health and vitality in nearby flora.', coordinates: { x: 30, y: 75 } },
    { name: 'Elfsong Resonator', type: 'Ethereal', frequency: 'Echoing Chorus', stability: 60, effect: 'Assists in resting and recuperation.', coordinates: { x: 65, y: 50 } }
  ],
  theology: {
    pantheon: [
      { name: 'Gond', domain: 'Craft & Knowledge', influence: 45, heresyLevel: 1 },
      { name: 'Umberlee', domain: 'The Sea', influence: 25, heresyLevel: 3 },
      { name: 'Helm', domain: 'Protection', influence: 30, heresyLevel: 1 }
    ],
    faithTension: 45,
    miracleFrequency: 'Manifesting near Docks'
  },
  mercantile: {
    commodities: [
      { name: 'Iron Ore', price: '45g/lb', trend: 'UP', volatility: 15 },
      { name: 'Rare Spices', price: '120g/oz', trend: 'STABLE', volatility: 8 },
      { name: 'Ships', price: '15000g+', trend: 'DOWN', volatility: 5 },
      { name: 'Ledger Credits', price: '2% Fee', trend: 'UP', volatility: 2 }
    ],
    wealthGap: 88,
    primaryExport: 'Maritime Commerce'
  },
  society: {
    matrix: [
      { species: 'Human', percentage: 65 },
      { species: 'Elf', percentage: 12 },
      { species: 'Dwarf', percentage: 10 },
      { species: 'Tiefling', percentage: 8 },
      { species: 'Halfling', percentage: 5 }
    ],
    unrestIndex: 42,
    casteHierarchy: 'Nobility > Civic Guard > Merchants > Citizens > Laborers'
  },
  infrastructure: {
    siegeDays: 365,
    wallIntegrity: 98,
    garrisonReadiness: 94,
    defenseNodes: [
      { name: 'The Watch Tower', integrity: 100, type: 'Primary Bastion' },
      { name: 'Basilisk Gate', integrity: 88, type: 'Main Threshold' },
      { name: 'Harbor Defense Chain', integrity: 95, type: 'Maritime Barrier' },
      { name: 'River Fortress', integrity: 99, type: 'Island Outpost' }
    ]
  }
};
