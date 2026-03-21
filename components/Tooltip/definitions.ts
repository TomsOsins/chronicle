export interface TermDefinition {
  title: string;
  category: string;
  description: string;
  note?: string; // optional extra context / DM tip
}

export const DEFINITIONS: Record<string, TermDefinition> = {

  // ─── STRATEGIC ───
  strategicVitals: {
    title: 'Strategic Vitals',
    category: 'GEOPOLITICAL',
    description: 'A summary of the three core metrics that determine a city\'s immediate military and economic health. These are the first figures a military strategist or merchant lord would request when assessing a new territory.',
  },
  security: {
    title: 'Security Rating',
    category: 'GEOPOLITICAL',
    description: 'An assessment of the city\'s defensive capability and internal order. Ranges from Critical (open to attack, lawless streets) to Maximum (fortress-level fortification, strict enforcement).',
    note: 'A High rating does not mean the city is peaceful — only that it has the capacity to suppress threats.',
  },
  tradeVolume: {
    title: 'Trade Volume',
    category: 'COMMERCE',
    description: 'A relative index (0–100) measuring the total flow of goods, currency, and services through the city in a standard cycle. A score of 100 represents a continental trading nexus; below 20 indicates an isolated or economically depressed settlement.',
  },
  stability: {
    title: 'Stability Status',
    category: 'GEOPOLITICAL',
    description: 'The current political equilibrium of the city. STABLE means the ruling power is unchallenged. FRAGILE indicates active tensions or a contested succession. VOLATILE signals imminent risk of collapse, coup, or civil war.',
    note: 'Volatile cities often present the most profitable opportunities for adventurers.',
  },

  // ─── TERRITORIAL ───
  territorialFootprint: {
    title: 'Territorial Footprint',
    category: 'GEOPOLITICAL',
    description: 'The strategic geography surrounding the city — the key passages that control access to it and the territories that act as buffers against external threats.',
  },
  chokepoints: {
    title: 'Chokepoints',
    category: 'GEOPOLITICAL',
    description: 'Narrow strategic points — mountain passes, bridges, harbor mouths, city gates — that control movement into or out of the city. Whoever controls a chokepoint controls the flow of armies, goods, and refugees.',
    note: 'A CRITICAL chokepoint is under active threat or pressure. CONTESTED means multiple parties claim control.',
  },
  bufferZones: {
    title: 'Buffer Zones',
    category: 'GEOPOLITICAL',
    description: 'Territory between the city and its potential enemies. FRIENDLY zones are allied lands. NEUTRAL territories are independent but non-threatening. HOSTILE zones are enemy-controlled or contested and represent active threat vectors.',
  },

  // ─── RESOURCES ───
  resourceMatrix: {
    title: 'Resource Matrix',
    category: 'COMMERCE',
    description: 'A supply chain analysis of the city\'s critical commodities. Each resource is classified by its current availability (SURPLUS, STABLE, DEFICIT) and where the city sources it from.',
    note: 'DEFICIT resources are leverage points — whoever controls their supply chain has power over the city.',
  },
  surplus: {
    title: 'SURPLUS',
    category: 'COMMERCE',
    description: 'The city produces or stockpiles more of this resource than it consumes. Surplus resources can be exported for profit or used as diplomatic leverage.',
  },
  deficit: {
    title: 'DEFICIT',
    category: 'COMMERCE',
    description: 'The city consumes more of this resource than it can produce locally. It depends on trade, tribute, or theft to maintain supply. Disrupting a deficit resource is an act of economic warfare.',
  },
  dependency: {
    title: 'Dependency',
    category: 'COMMERCE',
    description: 'The external source the city relies on for a given resource. A dependency represents a vulnerability — if the supply route is cut, the city suffers.',
  },

  // ─── MYTHIC ───
  mythicIntel: {
    title: 'Mythic Intel',
    category: 'ARCANE',
    description: 'Intelligence on the city\'s relationship with magical forces — proximity to ley lines, control of arcane infrastructure, and the city\'s unique magical resonance profile.',
  },
  leyLineProximity: {
    title: 'Ley Line Proximity',
    category: 'ARCANE',
    description: 'How close the city sits to the invisible rivers of magical energy that flow through the world. DISTANT means minimal magical influence. INTERACTING means the city draws power from nearby lines. INTERSECTING means the city sits at a convergence point — a nexus of immense power.',
    note: 'Intersecting cities attract mages, cults, and entities from other planes.',
  },
  arcaneSignature: {
    title: 'Arcane Signature',
    category: 'ARCANE',
    description: 'The city\'s unique magical fingerprint — a classification code used by arcane scholars and spies to identify the source of spells, enchantments, and supernatural events traced back to this location.',
  },
  magicAssets: {
    title: 'Strategic Magic Assets',
    category: 'ARCANE',
    description: 'Named arcane infrastructure under the city\'s control — ley line anchors, ward pylons, resonance spires. These are the magical equivalents of fortifications: they can project power, provide defense, or be seized by enemies.',
  },

  // ─── DISTRICTS ───
  districtSurvey: {
    title: 'District Survey',
    category: 'URBAN',
    description: 'A breakdown of the city\'s distinct neighborhoods and zones. Each district has its own character, economy, and power structure — and its own dangers.',
  },
  dangerLevel: {
    title: 'Danger Level',
    category: 'URBAN',
    description: 'A 1–10 rating of the likelihood that an unaccompanied traveler encounters violence, theft, or supernatural threat within this district. 1 is the Duke\'s parlor. 10 is a place where the city watch refuses to patrol after dark.',
  },
  vibe: {
    title: 'District Vibe',
    category: 'URBAN',
    description: 'A qualitative atmospheric descriptor for the district — the impression a visitor gets walking its streets. Useful for roleplay context and encounter flavor.',
  },

  // ─── PERSONNEL ───
  keyPersonnel: {
    title: 'Key Personnel',
    category: 'INTELLIGENCE',
    description: 'Notable individuals who hold significant power, knowledge, or influence within the city. These are the people an adventurer would seek out — or seek to avoid.',
  },
  activeRumors: {
    title: 'Active Rumors',
    category: 'INTELLIGENCE',
    description: 'Information circulating in taverns, markets, and back alleys. May be TRUE (reliable intelligence), FALSE (deliberate misinformation or wishful thinking), or PARTIAL (a kernel of truth wrapped in speculation).',
    note: 'Even FALSE rumors reveal what someone wants people to believe.',
  },

  // ─── DIVINE ───
  faithTension: {
    title: 'Faith Tension Index',
    category: 'THEOLOGY',
    description: 'A measure (0–100) of conflict between the religious factions operating within the city. At 0, the faiths coexist peacefully or one dominates unchallenged. At 100, religious violence, inquisitions, and holy wars are active or imminent.',
    note: 'High faith tension often precedes political instability — gods and politics are rarely separate.',
  },
  miracleFrequency: {
    title: 'Miracle Frequency',
    category: 'THEOLOGY',
    description: 'How often verifiable divine intervention manifests within the city limits. From "Extremely Rare" (once a generation) to "Constant Presence" (daily visible miracles). High frequency suggests a deity with a direct interest in the city\'s fate.',
  },
  heresyLevel: {
    title: 'Heresy Level',
    category: 'THEOLOGY',
    description: 'How far a deity\'s local worship has deviated from orthodox doctrine. A score of 1 means the faith is practiced as written. A score of 10 means the local cult has diverged so far it would be considered a separate (and likely dangerous) religion by outside authorities.',
  },
  divineInfluence: {
    title: 'Divine Influence',
    category: 'THEOLOGY',
    description: 'How strongly a deity\'s power is felt and how many devoted followers they command in this city (0–100). High influence means the deity actively intervenes in city affairs; low influence means they are worshipped in name only.',
  },
  domain: {
    title: 'Divine Domain',
    category: 'THEOLOGY',
    description: 'The sphere of reality over which a deity holds divine authority. A god of War influences conflict and soldiers; a god of Knowledge influences scholars and secrets. The domains of the local pantheon shape the city\'s culture.',
  },

  // ─── LEYLINE MAP ───
  leylineNode: {
    title: 'Leyline Node',
    category: 'ARCANE',
    description: 'A point where magical energy concentrates, pools, or flows from the ley line network. Nodes can be harnessed for power, studied for insight, or corrupted as acts of arcane warfare.',
  },
  nodeStability: {
    title: 'Node Stability',
    category: 'ARCANE',
    description: 'How reliably the node outputs magical energy (0–100%). An unstable node is dangerous — spells cast near it may misfire, and the magical field can cause hallucinations or mutations. A fully stable node is a valuable strategic asset.',
  },
  nodeFrequency: {
    title: 'Node Frequency',
    category: 'ARCANE',
    description: 'The rhythmic pattern of the node\'s magical output. "Stable Resonant" means consistent power. "Tidal Harmonic" means it cycles with the tides or moons. "Erratic Pulse" means unpredictable bursts that can be dangerous.',
  },
  nodeEffect: {
    title: 'Node Effect',
    category: 'ARCANE',
    description: 'The observable physical or magical consequence of the node\'s presence. Effects can be beneficial (healing, clarity, luck) or detrimental (unease, aggression, temporal distortion) depending on the node\'s nature.',
  },

  // ─── COMMERCE ───
  wealthGap: {
    title: 'Wealth Disparity',
    category: 'COMMERCE',
    description: 'An index (0–100) measuring inequality between the richest and poorest citizens. At 0, wealth is distributed relatively evenly. At 100, a tiny elite controls virtually all resources while the majority live in poverty.',
    note: 'Cities above 70 tend to have high unrest and active criminal guilds. Below 30, they tend to have strong civic institutions.',
  },
  primaryExport: {
    title: 'Primary Export',
    category: 'COMMERCE',
    description: 'The single commodity or service that generates the most external revenue for the city. This is the economic engine — the thing other cities would pay (or fight) to control.',
  },
  commodityLedger: {
    title: 'Commodity Ledger',
    category: 'COMMERCE',
    description: 'A real-time snapshot of key tradeable goods: their current market price, price trend, and volatility. The data reflects conditions on the date of survey.',
  },
  volatility: {
    title: 'Market Volatility',
    category: 'COMMERCE',
    description: 'How rapidly and unpredictably the price of a commodity changes (1–20). Low volatility (1–5) means stable, predictable pricing. High volatility (15–20) means the market is subject to speculation, shortage, or manipulation — high risk, high reward.',
  },
  trend: {
    title: 'Price Trend',
    category: 'COMMERCE',
    description: 'The current directional movement of a commodity\'s price. UP means prices are rising (scarcity or demand surge). DOWN means prices are falling (oversupply or collapsing demand). STABLE means the market is in equilibrium.',
  },

  // ─── SOCIETY ───
  unrestIndex: {
    title: 'Civil Unrest Index',
    category: 'SOCIETY',
    description: 'A measure (0–100) of the population\'s frustration with the current order. Below 30: the populace is generally content or too subdued to act. 30–60: visible discontent, protests, and organized dissent. Above 60: riots, strikes, or open rebellion are likely.',
    note: 'Unrest can be exploited by those seeking to destabilize a city — or quelled by those protecting it.',
  },
  casteHierarchy: {
    title: 'Caste Hierarchy',
    category: 'SOCIETY',
    description: 'The formal or informal social stratification of the city\'s population. Defines who holds power, who is disposable, and how much social mobility exists. The order listed is from most to least privileged.',
  },
  demographicMatrix: {
    title: 'Demographic Matrix',
    category: 'SOCIETY',
    description: 'The species composition of the city\'s population by percentage. Shapes everything from the languages spoken in markets to which gods are worshipped — and which groups may face discrimination.',
  },

  // ─── DEFENSE ───
  siegeDays: {
    title: 'Siege Endurance',
    category: 'DEFENSE',
    description: 'The estimated number of days the city can sustain a full military siege before its food, water, and supplies are exhausted. This figure assumes no resupply and no relief force.',
    note: 'A city with 365+ siege days is practically impregnable through starvation alone. An attacker must either breach the walls or find another way.',
  },
  wallIntegrity: {
    title: 'Wall Integrity',
    category: 'DEFENSE',
    description: 'The structural condition of the city\'s primary defensive perimeter (0–100%). 100% is freshly reinforced stone with no weak points. Below 50% means significant sections are crumbling, undermined, or breached — an attacker could exploit these gaps.',
  },
  garrison: {
    title: 'Garrison Readiness',
    category: 'DEFENSE',
    description: 'The current combat effectiveness of the city\'s standing military force (0–100%). 100% means a fully staffed, well-trained, and well-equipped force at peak readiness. Below 40% means the garrison is understaffed, demoralized, or poorly equipped.',
    note: 'High garrison readiness with low wall integrity means a city that can fight but cannot hold. The inverse means strong walls defended by incompetent soldiers.',
  },
  defenseNodes: {
    title: 'Defense Nodes',
    category: 'DEFENSE',
    description: 'Named fortification installations — towers, gates, naval chains, arcane wards — each tracked by structural integrity. Destroying or capturing these in sequence is how a siege is won.',
  },

  // ─── STATUS BADGES ───
  secure: {
    title: 'SECURE',
    category: 'STATUS',
    description: 'This position is under firm, uncontested control. No immediate threat to its integrity.',
  },
  contested: {
    title: 'CONTESTED',
    category: 'STATUS',
    description: 'Multiple parties claim or fight over this position. Control is unstable and may change rapidly.',
  },
  critical: {
    title: 'CRITICAL',
    category: 'STATUS',
    description: 'This position is under severe pressure or near collapse. Immediate action is required to prevent loss.',
  },
  friendly: {
    title: 'FRIENDLY',
    category: 'STATUS',
    description: 'This territory or faction is allied with or sympathetic to the city. Can be relied upon for support.',
  },
  neutral: {
    title: 'NEUTRAL',
    category: 'STATUS',
    description: 'This territory or faction has no formal alignment. May be courted by either side.',
  },
  hostile: {
    title: 'HOSTILE',
    category: 'STATUS',
    description: 'This territory or faction is actively opposed to the city\'s interests. Treat as a threat vector.',
  },
  volatile: {
    title: 'VOLATILE',
    category: 'STATUS',
    description: 'The situation is highly unstable and liable to deteriorate rapidly. Any disruption could trigger collapse.',
  },
  fragile: {
    title: 'FRAGILE',
    category: 'STATUS',
    description: 'The current equilibrium is maintained, but under visible strain. A single significant event could tip the balance.',
  },
};
