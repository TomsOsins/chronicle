
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

export const DEFAULT_CITY_2: CityData = {
  id: 'default-test-city-002',
  ledgerId: 'genesis-001',
  name: 'ALTDORF',
  title: 'Seat of the Emperor // Reikland',
  population: 105000,
  government: 'Emperor Karl Franz & The Imperial Court',
  economy: 'Imperial Taxation, Arcane Commerce, River Trade, Printing',
  magicLevel: 9,
  history: 'The beating heart of the Empire, built where the rivers Reik and Talabec converge. Altdorf is the city of Sigmar\'s faithful, home to the Colleges of Magic, and the seat from which Karl Franz commands the mightiest human nation in the Old World.',
  latitude: '48.21N',
  longitude: '11.38E',

  strategicVitals: {
    securityRating: 'Maximum',
    tradeVolume: 88,
    stabilityStatus: 'STABLE'
  },
  territorialFootprint: {
    chokepoints: [
      { name: 'Reiksport Docks', status: 'SECURE', description: 'Primary river trade hub. Patrolled by the Reiksguard.' },
      { name: 'Ostwald Gate', status: 'CRITICAL', description: 'Eastern approach vulnerable to Beastmen incursions from the Drakwald.' }
    ],
    bufferZones: [
      { name: 'The Reikwald', status: 'HOSTILE', description: 'Dense forest harboring Beastmen warherds and greenskin raiders.' },
      { name: 'Reikland Breadbasket', status: 'FRIENDLY', description: 'Fertile farmland sustaining the capital\'s vast population.' }
    ]
  },
  resourceMatrix: [
    { resource: 'Warpstone Residue', status: 'DEFICIT', dependency: 'Confiscated Contraband' },
    { resource: 'Imperial Grain', status: 'SURPLUS', dependency: 'Reikland Farms' },
    { resource: 'Arcane Reagents', status: 'STABLE', dependency: 'College Procurement' }
  ],
  mythicIntel: {
    leyLineProximity: 'INTERSECTING',
    strategicMagicAssets: ['The Colleges of Magic', 'Light Order Spire', 'Amethyst Ossuary'],
    arcaneSignature: 'RESONANCE-AZYR-V8'
  },

  districts: [
    { name: 'THE PALACE QUARTER', description: 'The Imperial Palace and surrounding noble estates. Heavily guarded by the Reiksguard.', vibe: 'Imperial Grandeur', dangerLevel: 1 },
    { name: 'THE COLLEGE DISTRICT', description: 'Eight towers of the Colleges of Magic dominate the skyline, each warping reality around them.', vibe: 'Arcane Unease', dangerLevel: 4 },
    { name: 'DOCKLANDS', description: 'A chaotic sprawl of warehouses, taverns, and smuggler dens along the Reik.', vibe: 'Grimy Commerce', dangerLevel: 7 },
    { name: 'THE TEMPLE DISTRICT', description: 'Grand cathedral of Sigmar and shrines to a dozen other gods. Witch Hunters patrol here.', vibe: 'Zealous Piety', dangerLevel: 3 }
  ],
  npcs: [
    { name: 'Emperor Karl Franz', role: 'Emperor & Elector Count', description: 'A charismatic warrior-statesman who rides the griffon Deathclaw into battle.', secret: 'He fears the Empire is rotting from within faster than any external threat.' },
    { name: 'Balthasar Gelt', role: 'Supreme Patriarch of Magic', description: 'Gold Wizard of terrifying power, face hidden behind a golden mask.', secret: 'His experiments with transmutation have gone far beyond sanctioned limits.' },
    { name: 'Volkmar the Grim', role: 'Grand Theogonist', description: 'The highest authority of the Cult of Sigmar. Rides the War Altar into battle.', secret: 'He has seen visions of Chaos that he shares with no one.' }
  ],
  rumors: [
    { source: 'A terrified student', text: 'Something escaped from the Amethyst College last night. The dead in Morr\'s Garden were... restless.', truthValue: 'True' },
    { source: 'Dockside whisper', text: 'Skaven have been spotted in the sewers beneath the Docklands.', truthValue: 'True' },
    { source: 'Court gossip', text: 'The Emperor is considering an alliance with the Dwarfs of Karaz-a-Karak against a rising Waaagh.', truthValue: 'Partial' }
  ],
  leylineNodes: [
    { name: 'Celestial Observatory', type: 'Azyr', frequency: 'Constant Harmonic', stability: 95, effect: 'Grants prophetic dreams to those who sleep nearby.', coordinates: { x: 40, y: 20 } },
    { name: 'Bright College Furnace', type: 'Aqshy', frequency: 'Volatile Pulse', stability: 45, effect: 'Ambient temperature rises sharply. Fires burn hotter.', coordinates: { x: 60, y: 35 } },
    { name: 'Amethyst Ossuary', type: 'Shyish', frequency: 'Death Whisper', stability: 70, effect: 'Time feels distorted. Shadows move independently.', coordinates: { x: 35, y: 65 } },
    { name: 'Jade College Gardens', type: 'Ghyran', frequency: 'Living Rhythm', stability: 88, effect: 'Plants grow at unnatural speed. Wounds close faster.', coordinates: { x: 20, y: 50 } },
    { name: 'Grey College Threshold', type: 'Ulgu', frequency: 'Shifting Fog', stability: 30, effect: 'The college cannot be found by those not invited.', coordinates: { x: 50, y: 45 } }
  ],
  theology: {
    pantheon: [
      { name: 'Sigmar', domain: 'Empire & War', influence: 60, heresyLevel: 1 },
      { name: 'Ulric', domain: 'Winter & Battle', influence: 20, heresyLevel: 2 },
      { name: 'Morr', domain: 'Death & Dreams', influence: 15, heresyLevel: 1 }
    ],
    faithTension: 55,
    miracleFrequency: 'During Sigmarite holy days'
  },
  mercantile: {
    commodities: [
      { name: 'Blackpowder', price: '80g/keg', trend: 'UP', volatility: 20 },
      { name: 'Printed Texts', price: '5g/volume', trend: 'UP', volatility: 5 },
      { name: 'Dwarven Steel', price: '200g/ingot', trend: 'STABLE', volatility: 10 },
      { name: 'Arcane Components', price: '500g/set', trend: 'UP', volatility: 35 }
    ],
    wealthGap: 82,
    primaryExport: 'Imperial Authority & Printed Knowledge'
  },
  society: {
    matrix: [
      { species: 'Human', percentage: 85 },
      { species: 'Halfling', percentage: 6 },
      { species: 'Dwarf', percentage: 5 },
      { species: 'Elf', percentage: 2 },
      { species: 'Other', percentage: 2 }
    ],
    unrestIndex: 38,
    casteHierarchy: 'Emperor > Electors > Nobility > Burghers > Peasants > Mutants'
  },
  infrastructure: {
    siegeDays: 420,
    wallIntegrity: 92,
    garrisonReadiness: 96,
    defenseNodes: [
      { name: 'The Reiksguard Barracks', integrity: 100, type: 'Elite Garrison' },
      { name: 'Helblaster Battery', integrity: 88, type: 'Artillery Emplacement' },
      { name: 'River Chain', integrity: 94, type: 'Maritime Barrier' },
      { name: 'College Wards', integrity: 78, type: 'Arcane Defense Grid' }
    ]
  }
};

export const DEFAULT_CITY_3: CityData = {
  id: 'default-test-city-003',
  ledgerId: 'genesis-001',
  name: 'WHITERUN',
  title: 'Plains District Capital // Central Skyrim',
  population: 12000,
  government: 'Jarl Balgruuf the Greater & The Hold Court',
  economy: 'Agriculture, Smithing, Mead Brewing, Caravan Trade',
  magicLevel: 3,
  history: 'Built around the legendary mead hall Dragonsreach, where an ancient dragon was once imprisoned. Whiterun sits at the crossroads of Skyrim, making it the most strategically vital hold. Jarl Balgruuf has maintained neutrality in the civil war — for now.',
  latitude: '63.42N',
  longitude: '22.15W',

  strategicVitals: {
    securityRating: 'Moderate',
    tradeVolume: 65,
    stabilityStatus: 'FRAGILE'
  },
  territorialFootprint: {
    chokepoints: [
      { name: 'Main Gate', status: 'SECURE', description: 'Fortified stone gate with drawbridge. Single point of entry from the plains.' },
      { name: 'Great Bridge', status: 'CRITICAL', description: 'Exposed approach to Dragonsreach. Vulnerable during siege.' }
    ],
    bufferZones: [
      { name: 'Whiterun Hold Plains', status: 'FRIENDLY', description: 'Vast tundra farmlands. Giant camps dot the landscape.' },
      { name: 'Western Watchtower', status: 'HOSTILE', description: 'Recently destroyed by dragon attack. Under reconstruction.' }
    ]
  },
  resourceMatrix: [
    { resource: 'Iron Ore', status: 'SURPLUS', dependency: 'Local Mines' },
    { resource: 'Lumber', status: 'DEFICIT', dependency: 'Falkreath & Riverwood' },
    { resource: 'Food Stores', status: 'STABLE', dependency: 'Whiterun Farms & Hunting' }
  ],
  mythicIntel: {
    leyLineProximity: 'INTERACTING',
    strategicMagicAssets: ['Dragonsreach Trap', 'Skyforge', 'Gildergreen'],
    arcaneSignature: 'RESONANCE-THUUM-V1'
  },

  districts: [
    { name: 'THE PLAINS DISTRICT', description: 'Market stalls, shops, and the Bannered Mare tavern. Heart of daily commerce.', vibe: 'Rustic Commerce', dangerLevel: 2 },
    { name: 'THE WIND DISTRICT', description: 'Residential area with the Gildergreen tree and Jorrvaskr mead hall of the Companions.', vibe: 'Stoic Honor', dangerLevel: 3 },
    { name: 'THE CLOUD DISTRICT', description: 'Dragonsreach and the Jarl\'s court tower above all. Do you get up here often?', vibe: 'Austere Authority', dangerLevel: 1 },
    { name: 'THE UNDERFORGE', description: 'Hidden beneath Jorrvaskr. Sacred ground of the Companions\' inner circle.', vibe: 'Primal Secrecy', dangerLevel: 8 }
  ],
  npcs: [
    { name: 'Jarl Balgruuf the Greater', role: 'Jarl of Whiterun', description: 'A pragmatic ruler who values his hold\'s independence above all political allegiance.', secret: 'He knows the dragons\' return fulfills an ancient Nordic prophecy he hoped was myth.' },
    { name: 'Kodlak Whitemane', role: 'Harbinger of the Companions', description: 'The wise and aging leader of the legendary warrior guild.', secret: 'He seeks a cure for the bestial curse that binds the Circle.' },
    { name: 'Farengar Secret-Fire', role: 'Court Wizard', description: 'Whiterun\'s resident mage, obsessed with dragon lore and ancient texts.', secret: 'He has been in contact with the Thalmor regarding dragon research.' }
  ],
  rumors: [
    { source: 'Guard patrol', text: 'A dragon was sighted near the Western Watchtower. The Jarl is mobilizing troops.', truthValue: 'True' },
    { source: 'Bard at the Bannered Mare', text: 'The Companions are more than mere warriors. Strange howls echo from Jorrvaskr at night.', truthValue: 'True' },
    { source: 'Traveling merchant', text: 'The Stormcloaks are planning to demand Balgruuf pick a side. War may come to Whiterun.', truthValue: 'Partial' }
  ],
  leylineNodes: [
    { name: 'The Skyforge', type: 'Aetherial', frequency: 'Ancient Constant', stability: 98, effect: 'Steel forged here carries an otherworldly edge. The forge predates the city.', coordinates: { x: 50, y: 30 } },
    { name: 'Dragonsreach Pinnacle', type: 'Draconic', frequency: 'Dormant Resonance', stability: 60, effect: 'The ancient dragon trap still hums with binding magic.', coordinates: { x: 50, y: 15 } },
    { name: 'The Gildergreen', type: 'Nature', frequency: 'Seasonal Pulse', stability: 40, effect: 'Connected to the Eldergleam. Withering has weakened the node.', coordinates: { x: 45, y: 45 } },
    { name: 'Underforge Nexus', type: 'Lycanthropic', frequency: 'Lunar Tide', stability: 55, effect: 'Power waxes and wanes with the moons. Primal energy bleeds through.', coordinates: { x: 55, y: 50 } }
  ],
  theology: {
    pantheon: [
      { name: 'Talos', domain: 'War & Governance', influence: 35, heresyLevel: 9 },
      { name: 'Kynareth', domain: 'Sky & Nature', influence: 40, heresyLevel: 1 },
      { name: 'Arkay', domain: 'Life & Death', influence: 20, heresyLevel: 1 }
    ],
    faithTension: 78,
    miracleFrequency: 'Suppressed by Thalmor decree'
  },
  mercantile: {
    commodities: [
      { name: 'Skyforge Steel', price: '350g/blade', trend: 'UP', volatility: 5 },
      { name: 'Honningbrew Mead', price: '8g/cask', trend: 'STABLE', volatility: 10 },
      { name: 'Mammoth Tusks', price: '200g/pair', trend: 'DOWN', volatility: 25 },
      { name: 'Whiterun Wheat', price: '2g/bushel', trend: 'STABLE', volatility: 8 }
    ],
    wealthGap: 55,
    primaryExport: 'Agricultural Goods & Forged Arms'
  },
  society: {
    matrix: [
      { species: 'Nord', percentage: 72 },
      { species: 'Imperial', percentage: 10 },
      { species: 'Redguard', percentage: 6 },
      { species: 'Breton', percentage: 5 },
      { species: 'Other', percentage: 7 }
    ],
    unrestIndex: 62,
    casteHierarchy: 'Jarl > Thanes > Housecarls > Freemen > Farmhands > Beggars'
  },
  infrastructure: {
    siegeDays: 90,
    wallIntegrity: 75,
    garrisonReadiness: 70,
    defenseNodes: [
      { name: 'Whiterun Main Gate', integrity: 85, type: 'Fortified Entrance' },
      { name: 'Dragonsreach', integrity: 95, type: 'Citadel Keep' },
      { name: 'Guard Barracks', integrity: 72, type: 'Garrison Post' },
      { name: 'Western Watchtower', integrity: 15, type: 'Ruined Outpost' }
    ]
  }
};

export const DEFAULT_CITIES: CityData[] = [DEFAULT_CITY, DEFAULT_CITY_2, DEFAULT_CITY_3];
