import { CityData, District, NPC, Rumor, LeylineNode, Deity, Commodity, Demographic, DefenseNode, Biome, SettlementAge } from '../types';

const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const range = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

/** Generate a short unique id (not cryptographic — just needs to be collision-resistant within a session) */
const uid = () => Math.random().toString(36).slice(2, 10);
const pickN = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
};

// ─── NAME PARTS ───
const prefixes = ['Ash', 'Iron', 'Storm', 'Shadow', 'Crystal', 'Ember', 'Frost', 'Thorn', 'Raven', 'Gold', 'Silver', 'Crimson', 'Obsidian', 'Verdant', 'Hollow', 'Dread', 'Moon', 'Sun', 'Blood', 'Stone', 'Bone', 'Star', 'Deep', 'High', 'Dark', 'Bright', 'Ancient', 'Lost', 'Silent', 'Burning'];
const suffixes = ['hold', 'gate', 'spire', 'haven', 'reach', 'fell', 'watch', 'keep', 'port', 'vale', 'forge', 'crown', 'mere', 'holm', 'barrow', 'crest', 'moor', 'delve', 'ward', 'wick', 'mar', 'bridge', 'helm', 'peak', 'rest', 'hollow', 'cross', 'wall', 'bay', 'drift'];

const titles = [
  'Crown of the Northern Reach', 'Jewel of the Sunken Coast', 'Bastion of the Iron Pact',
  'Throne of Whispered Winds', 'Heart of the Ember Wastes', 'Shield of the Frozen Marches',
  'Eye of the Arcane Convergence', 'Pillar of the Old Kingdom', 'Sentinel of the Rift',
  'Cradle of the First Dawn', 'Fang of the Western Mountains', 'Pearl of the Sapphire Sea',
  'Anvil of the Warlords', 'Last Light of the Dying Realm', 'Beacon of the Shattered Isles',
  'Gate of the Underworld Passage', 'Key to the Sovereign Lowlands', 'Hammer of the Steppe Clans'
];

const governments = [
  'Ruling Council of Elders', 'Theocratic Oligarchy', 'Military Junta', 'Merchant Republic',
  'Hereditary Monarchy', 'Elected Senate', 'Mage Conclave', 'Criminal Syndicate Facade',
  'Tribal Confederation', 'Divine Oracle Regency', 'Guild Parliament', 'Anarchist Commune',
  'Dual Monarchy', 'Philosopher-King Autocracy', 'Shadow Council & Puppet Figurehead',
  'Draconic Overlordship', 'Necromantic Aristocracy', 'Democratic Assembly of Guilds'
];

const economies = [
  'Arcane Component Trade & Enchantment Services', 'Maritime Fishing & Shipbuilding',
  'Mining & Metallurgy', 'Agricultural Surplus & Grain Export', 'Slave Trade & Gladiatorial Games',
  'Alchemical Manufacturing & Potion Brewing', 'Lumber & Carpentry', 'Silk & Textile Weaving',
  'Mercenary Contracts & Arms Dealing', 'Knowledge Trade & Scroll Scribing',
  'Gemstone Mining & Jewelry Craft', 'Exotic Beast Taming & Monster Parts',
  'Banking & Moneylending', 'Planar Commerce & Extraplanar Goods',
  'Religious Pilgrimage & Relic Trade', 'Espionage Services & Information Brokering'
];

const histories = [
  'Founded in the aftermath of a cataclysmic war between rival dragon clans. The city was built atop the bones of the defeated wyrm, and its enchanted skeleton still radiates power beneath the streets.',
  'Originally a prison colony for a fallen empire. The inmates overthrew their wardens and forged a ruthless but effective civilization from the ashes of their captivity.',
  'Grew from a humble waystation at the convergence of three ancient trade routes. Centuries of commerce have transformed it into a sprawling cosmopolitan hub.',
  'Erected overnight by a cabal of archmages who wove stone and steel from pure aether. The city still hums with residual enchantment.',
  'Built around a sacred spring said to grant visions of the future. Pilgrims and charlatans alike flock to its waters.',
  'The sole surviving settlement after a continent-wide magical plague. Its walls were warded by a now-forgotten ritual.',
  'Carved into the walls of an immense canyon by dwarven engineers, then expanded by successive waves of refugees from surface wars.',
  'Rose to prominence after discovering a vast underground reservoir of liquid mana. The rush for arcane resources shaped its cutthroat culture.',
  'Founded by a legendary hero who united warring tribes under a single banner. The city preserves their code of honor to this day.',
  'Emerged from the ruins of an ancient elven metropolis. Human settlers built atop the original foundations, creating a layered city of old and new.'
];

// ─── DISTRICTS ───
const districtNames = ['THE UPPER QUARTER', 'THE FOUNDRY DISTRICT', 'THE DOCKS', 'OLD TOWN', 'THE WARRENS', 'TEMPLE ROW', 'THE MARKETS', 'SCHOLARS WARD', 'THE UNDERBELLY', 'FOREIGN QUARTER', 'THE GARRISON', 'NOBLE HEIGHTS', 'SHADOW ALLEY', 'THE COMMONS', 'MAGE QUARTER', 'THE SLAUGHTERYARD', 'MERCHANT MILE', 'THE RUINS', 'THIEVES LANDING', 'HARBOR FRONT'];
const districtVibes = ['Opulent Grandeur', 'Industrial Grit', 'Salt-Stained Commerce', 'Crumbling Nostalgia', 'Desperate Survival', 'Solemn Reverence', 'Chaotic Bazaar', 'Quiet Contemplation', 'Lurking Menace', 'Cultural Mosaic', 'Iron Discipline', 'Perfumed Decadence', 'Whispered Secrets', 'Working Class Pride', 'Arcane Hum', 'Blood & Sawdust', 'Counting Houses', 'Haunted Decay', 'Cutthroat Opportunity', 'Seagull & Rope'];
const districtDescs = [
  'Home to the wealthiest families, with pristine architecture and private guards.',
  'A sprawl of forges and workshops, perpetually wreathed in smoke and sparks.',
  'Where ships from distant lands unload cargo and sailors seek entertainment.',
  'The original settlement, now showing its age with crumbling walls and faded glory.',
  'A dense tangle of narrow alleys where the desperate and the dangerous coexist.',
  'Grand temples and shrines line every street, filled with the sound of prayer.',
  'An endless maze of stalls, shops, and haggling voices.',
  'Libraries, academies, and quiet courtyards devoted to learning.',
  'The criminal heart of the city, hidden beneath a veneer of normalcy.',
  'A vibrant enclave of immigrants bringing their customs and cuisine.',
  'Military barracks and training grounds, always bustling with soldiers.',
  'Mansions and estates perched on the highest ground, overlooking everything.',
  'A narrow, perpetually dark street where illicit dealings are commonplace.',
  'Simple homes and communal spaces for the working population.',
  'Towers and sanctums where arcane practitioners study and experiment.',
  'Where livestock meets its end and tanners ply their foul-smelling trade.',
  'The commercial backbone, lined with prosperous shops and counting houses.',
  'Abandoned structures from a bygone era, now home to squatters and ghosts.',
  'A semi-lawless zone where stolen goods change hands freely.',
  'Warehouses and fishmongers where the smell of the sea is inescapable.'
];

// ─── NPCS ───
const npcFirstNames = ['Aldric', 'Vesper', 'Thane', 'Mirella', 'Korrak', 'Sylas', 'Elara', 'Grimjaw', 'Isolde', 'Fenwick', 'Zara', 'Orin', 'Nyx', 'Baelor', 'Seraphina', 'Dusk', 'Morwen', 'Caspian', 'Rook', 'Lyssa'];
const npcLastNames = ['Blackthorn', 'Ashworth', 'Ironfist', 'Moonveil', 'Stonehelm', 'Ravencroft', 'Duskwalker', 'Flamecrest', 'Silvertongue', 'Grimshaw', 'Nighthollow', 'Brightforge', 'Deepwater', 'Shadowmere', 'Thornwall', 'Starfall', 'Bloodaxe', 'Frostweaver', 'Goldmantle', 'Wolfsbane'];
const npcRoles = ['Captain of the Guard', 'Head Archivist', 'Guild Master', 'Court Mage', 'Spymaster', 'High Priest', 'Merchant Prince', 'Tavern Owner', 'Street Urchin Leader', 'Retired Adventurer', 'Alchemist', 'Thieves Guild Boss', 'Foreign Ambassador', 'Arena Champion', 'Plague Doctor', 'Smuggler King', 'Oracle', 'Wandering Bard', 'Master Blacksmith', 'Harbormaster'];
const npcDescriptions = [
  'A battle-scarred veteran who commands respect through sheer force of will.',
  'A meticulous scholar with an encyclopedic knowledge of the city\'s secrets.',
  'A shrewd negotiator who controls much of the city\'s commerce from the shadows.',
  'An enigmatic figure whose true loyalties remain perpetually unclear.',
  'A charismatic leader beloved by the common folk but distrusted by the elite.',
  'A quiet observer who sees everything and says very little.',
  'A flamboyant personality whose public persona masks a calculating mind.',
  'A grizzled survivor of countless conflicts who now seeks a quieter life.',
  'A young prodigy whose talents far exceed their years.',
  'An outsider who has carved a niche through cunning and determination.'
];
const npcSecrets = [
  'Secretly funds a resistance movement against the current government.',
  'Is actually a polymorphed dragon observing mortal affairs.',
  'Possesses a forbidden artifact that could reshape the balance of power.',
  'Has been dead for years — an elaborate illusion maintained by unknown forces.',
  'Communicates with entities from beyond the material plane.',
  'Is building a private army in an undisclosed location.',
  'Knows the true identity of the city\'s masked vigilante.',
  'Has discovered a way to extend their lifespan indefinitely.',
  'Is an agent of a foreign power, feeding intelligence across borders.',
  'Guards the entrance to a sealed vault beneath the city.'
];

// ─── RUMORS ───
const rumorSources = ['A drunken sailor', 'A nervous merchant', 'Court gossip', 'Street children', 'A dying soldier', 'Temple whispers', 'Market criers', 'A foreign traveler', 'Underground contacts', 'An old beggar'];
const rumorTexts = [
  'Something massive has been moving beneath the city at night.',
  'The ruling council is planning to raise taxes on arcane components by 300%.',
  'A new cult has been recruiting aggressively in the lower districts.',
  'Ships have been vanishing in the harbor with no wreckage ever found.',
  'The old catacombs have been breached from below by something unknown.',
  'A legendary weapon was recently stolen from the city vault.',
  'Plague rats have been spotted near the water supply.',
  'A dragon has been sighted circling the mountains to the north.',
  'The city\'s protective wards are failing and no one knows why.',
  'A rival city is amassing forces along the border.'
];

// ─── LEYLINE NODES ───
const leylineTypes = ['Celestial', 'Chthonic', 'Elemental', 'Necrotic', 'Fey', 'Abyssal', 'Temporal', 'Psionic', 'Primordial', 'Ethereal', 'Shadow', 'Radiant'];
const leylineFrequencies = ['Stable Resonant', 'Erratic Pulse', 'Deep Harmonic', 'Tidal Fluctuation', 'Constant Hum', 'Intermittent Burst', 'Whispered Echo', 'Thundering Wave', 'Silent Current', 'Chaotic Surge'];
const leylineEffects = [
  'Enhances divination magic within its radius.',
  'Causes vivid dreams and occasional prophetic visions.',
  'Accelerates plant growth in surrounding areas.',
  'Weakens the barrier between the material and shadow planes.',
  'Amplifies emotional states of nearby creatures.',
  'Creates pockets of temporal distortion.',
  'Attracts and sustains minor fey creatures.',
  'Disrupts necromantic magic within its field.',
  'Generates a persistent low hum audible to magic-sensitive beings.',
  'Heals minor wounds of those who rest within its influence.'
];

// ─── DEITIES ───
const deityNames = ['Solarius', 'Morrigan', 'Thalox', 'Veyra', 'Korrath', 'Selûnara', 'Ashgrim', 'Zephyria', 'Nocturn', 'Pyrrhos', 'Thalassa', 'Verdania', 'Umbraxis', 'Lythara', 'Gorvak', 'Sereniel', 'Drakonis', 'Mystara'];
const deityDomains = ['War & Conquest', 'Death & Rebirth', 'Knowledge & Magic', 'Nature & Growth', 'Sea & Storms', 'Love & Beauty', 'Forge & Craft', 'Trickery & Shadows', 'Light & Justice', 'Chaos & Change', 'Protection & Order', 'Harvest & Fertility', 'Moon & Dreams', 'Sun & Fire', 'Plague & Decay', 'Music & Revelry'];

// ─── COMMODITIES ───
const commodityNames = ['Iron Ore', 'Rare Spices', 'Arcane Reagents', 'Silk Bolts', 'Dwarven Ale', 'Enchanted Gems', 'Timber', 'Monster Parts', 'Healing Herbs', 'Exotic Furs', 'Salt', 'Obsidian Blades', 'Dragon Scales', 'Holy Water', 'Smokepowder', 'Living Steel', 'Moonstone', 'Shadow Silk'];
const commodityPrices = ['5g/lb', '12g/lb', '45g/oz', '80g/bolt', '2g/barrel', '200g/ct', '1g/plank', '30g/lb', '8g/bundle', '25g/pelt', '3g/lb', '50g/blade', '500g/scale', '10g/vial', '75g/keg', '300g/ingot', '150g/ct', '400g/yard'];

// ─── SPECIES ───
const speciesNames = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Tiefling', 'Orc', 'Gnome', 'Dragonborn', 'Half-Elf', 'Goblin', 'Tabaxi', 'Kenku', 'Firbolg', 'Aasimar', 'Genasi', 'Changeling'];

// ─── COALCORE FIELDS ───
const biomes: Biome[] = ['coastal', 'river', 'forest', 'plains', 'mountain', 'desert', 'swamp', 'crossroads'];
const ages: SettlementAge[] = ['new', 'established', 'established', 'ancient']; // established weighted higher

// ─── DEFENSE ───
const defenseNodeNames = ['Main Gate Tower', 'Harbor Battery', 'North Watchtower', 'The Iron Bastion', 'River Portcullis', 'Mage\'s Redoubt', 'Southern Palisade', 'The Keep', 'Underground Bunker', 'Sky Spire', 'Wall of Thorns', 'Siege Engine Platform'];
const defenseNodeTypes = ['Primary Bastion', 'Artillery Platform', 'Watchtower', 'Fortified Gate', 'Naval Defense', 'Arcane Ward', 'Field Fortification', 'Command Center', 'Hidden Position', 'Anti-Air', 'Natural Barrier', 'Mobile Platform'];

// ─── GENERATORS ───

export function randomName(): string {
  return pick(prefixes) + pick(suffixes);
}

export function randomDistrict(): District {
  const i = range(0, districtNames.length - 1);
  return {
    name: districtNames[i],
    description: districtDescs[Math.min(i, districtDescs.length - 1)],
    vibe: districtVibes[Math.min(i, districtVibes.length - 1)],
    dangerLevel: range(1, 10)
  };
}

export function randomNPC(): NPC {
  return {
    id: `npc_${uid()}`,
    name: `${pick(npcFirstNames)} ${pick(npcLastNames)}`,
    role: pick(npcRoles),
    description: pick(npcDescriptions),
    secret: pick(npcSecrets)
  };
}

export function randomRumor(): Rumor {
  return {
    source: pick(rumorSources),
    text: pick(rumorTexts),
    truthValue: pick(['True', 'False', 'Partial'] as const)
  };
}

export function randomLeylineNode(): LeylineNode {
  return {
    name: `${pick(prefixes)} ${pick(['Nexus', 'Anchor', 'Wellspring', 'Spire', 'Conduit', 'Vortex', 'Font', 'Resonator'])}`,
    type: pick(leylineTypes),
    frequency: pick(leylineFrequencies),
    stability: range(10, 100),
    effect: pick(leylineEffects),
    coordinates: { x: range(10, 90), y: range(10, 90) }
  };
}

export function randomDeity(): Deity {
  return {
    name: pick(deityNames),
    domain: pick(deityDomains),
    influence: range(10, 100),
    heresyLevel: range(1, 10)
  };
}

export function randomCommodity(): Commodity {
  const i = range(0, commodityNames.length - 1);
  return {
    name: commodityNames[i],
    price: commodityPrices[Math.min(i, commodityPrices.length - 1)],
    trend: pick(['UP', 'DOWN', 'STABLE'] as const),
    volatility: range(1, 20)
  };
}

export function randomDemographic(): Demographic {
  return {
    species: pick(speciesNames),
    percentage: range(5, 60)
  };
}

export function randomDefenseNode(): DefenseNode {
  return {
    name: pick(defenseNodeNames),
    integrity: range(10, 100),
    type: pick(defenseNodeTypes)
  };
}

/** Generate demographics that sum to ~100% */
export function randomDemographics(count: number = 5): Demographic[] {
  const species = pickN(speciesNames, count);
  let remaining = 100;
  const result: Demographic[] = [];

  for (let i = 0; i < species.length; i++) {
    if (i === species.length - 1) {
      result.push({ species: species[i], percentage: remaining });
    } else {
      const pct = range(5, Math.min(60, remaining - (species.length - i - 1) * 5));
      result.push({ species: species[i], percentage: pct });
      remaining -= pct;
    }
  }
  return result;
}

/** Generate a complete random city (no id/ledgerId — caller assigns those) */
export function randomFullCity(): Omit<CityData, 'id' | 'ledgerId'> {
  const numDistricts = range(3, 5);
  const numNPCs = range(2, 4);
  const numRumors = range(2, 4);
  const numNodes = range(3, 6);
  const numDeities = range(2, 4);
  const numCommodities = range(3, 5);
  const numDemographics = range(4, 6);
  const numDefenseNodes = range(3, 5);

  return {
    name: randomName().toUpperCase(),
    title: pick(titles),
    population: range(500, 500000),
    government: pick(governments),
    economy: pick(economies),
    magicLevel: range(1, 10),
    history: pick(histories),
    latitude: `${range(10, 80)}.${range(10, 99)}${pick(['N', 'S'])}`,
    longitude: `${range(10, 170)}.${range(10, 99)}${pick(['E', 'W'])}`,
    biome: pick(biomes),
    age: pick(ages),

    strategicVitals: {
      securityRating: pick(['Critical', 'Low', 'Moderate', 'High', 'Maximum']),
      tradeVolume: range(10, 100),
      stabilityStatus: pick(['STABLE', 'FRAGILE', 'VOLATILE'] as const)
    },
    territorialFootprint: {
      chokepoints: Array.from({ length: range(1, 3) }, () => ({
        name: `${pick(prefixes)} ${pick(['Pass', 'Gate', 'Bridge', 'Crossing', 'Narrows'])}`,
        status: pick(['SECURE', 'CRITICAL', 'CONTESTED'] as const),
        description: `A strategic point controlling access to the ${pick(['northern', 'southern', 'eastern', 'western'])} approaches.`
      })),
      bufferZones: Array.from({ length: range(1, 3) }, () => ({
        name: `${pick(prefixes)} ${pick(['Plains', 'Highlands', 'Forest', 'Marshes', 'Borderlands'])}`,
        status: pick(['FRIENDLY', 'NEUTRAL', 'HOSTILE'] as const),
        description: `A ${pick(['vast', 'narrow', 'contested', 'resource-rich'])} territory providing strategic depth.`
      }))
    },
    resourceMatrix: Array.from({ length: range(2, 4) }, () => ({
      resource: pick(['Iron Ore', 'Timber', 'Fresh Water', 'Grain', 'Arcane Crystals', 'Stone', 'Coal', 'Medicinal Herbs', 'Livestock', 'Salt']),
      status: pick(['SURPLUS', 'DEFICIT', 'STABLE'] as const),
      dependency: `${pick(prefixes)}${pick(suffixes)} ${pick(['Colonies', 'Mines', 'Farms', 'Trade Routes', 'Reserves'])}`
    })),
    mythicIntel: {
      leyLineProximity: pick(['DISTANT', 'INTERACTING', 'INTERSECTING'] as const),
      strategicMagicAssets: Array.from({ length: range(1, 3) }, () => `The ${pick(prefixes)} ${pick(['Anchor', 'Ward', 'Spire', 'Seal', 'Beacon'])}`),
      arcaneSignature: `${pick(['RESONANCE', 'SIGNAL', 'ECHO', 'PULSE', 'FLUX'])}-${pick(prefixes).toUpperCase()}-V${range(1, 9)}`
    },

    districts: Array.from({ length: numDistricts }, randomDistrict),
    npcs: Array.from({ length: numNPCs }, randomNPC),
    rumors: Array.from({ length: numRumors }, randomRumor),
    leylineNodes: Array.from({ length: numNodes }, randomLeylineNode),

    theology: {
      pantheon: Array.from({ length: numDeities }, randomDeity),
      faithTension: range(10, 100),
      miracleFrequency: pick(['Extremely Rare', 'Seasonal Manifestations', 'Regular Occurrences', 'Daily Phenomena', 'Constant Presence'])
    },
    mercantile: {
      commodities: Array.from({ length: numCommodities }, randomCommodity),
      wealthGap: range(10, 100),
      primaryExport: pick(['Maritime Commerce', 'Arcane Components', 'Raw Minerals', 'Agricultural Goods', 'Military Equipment', 'Luxury Textiles', 'Knowledge & Scrolls'])
    },
    society: {
      matrix: randomDemographics(numDemographics),
      unrestIndex: range(10, 100),
      casteHierarchy: pick([
        'Royalty > Clergy > Military > Merchants > Citizens > Laborers',
        'Mage Council > Noble Houses > Guild Masters > Free Folk > Bonded',
        'War Chiefs > Shamans > Warriors > Crafters > Gatherers',
        'Elder Council > Artisans > Scholars > Farmers > Outsiders',
        'The Eternal > The Chosen > The Devoted > The Common > The Forgotten'
      ])
    },
    infrastructure: {
      siegeDays: range(10, 500),
      wallIntegrity: range(10, 100),
      garrisonReadiness: range(10, 100),
      defenseNodes: Array.from({ length: numDefenseNodes }, randomDefenseNode)
    }
  };
}

/** Randomize just one section of city data */
export function randomizeSection(section: string): Partial<Omit<CityData, 'id' | 'ledgerId'>> {
  const full = randomFullCity();
  switch (section) {
    case 'identity': return { name: full.name, title: full.title, population: full.population, government: full.government, economy: full.economy, magicLevel: full.magicLevel, history: full.history, latitude: full.latitude, longitude: full.longitude };
    case 'territory': return { strategicVitals: full.strategicVitals, territorialFootprint: full.territorialFootprint, resourceMatrix: full.resourceMatrix, mythicIntel: full.mythicIntel };
    case 'districts': return { districts: full.districts, npcs: full.npcs, rumors: full.rumors };
    case 'arcane': return { leylineNodes: full.leylineNodes, theology: full.theology };
    case 'commerce': return { mercantile: full.mercantile, society: full.society };
    case 'defense': return { infrastructure: full.infrastructure };
    default: return {};
  }
}
