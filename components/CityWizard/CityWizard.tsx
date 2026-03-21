import React, { useState, useCallback } from 'react';
import { CityData } from '../../types';
import { randomFullCity, randomizeSection, randomDistrict, randomNPC, randomRumor, randomLeylineNode, randomDeity, randomCommodity, randomDemographic, randomDefenseNode } from '../../utils/randomCity';
import { WField, WTextArea, WNumber, WSlider, WSelect, WSection, WArrayItem, WAddButton } from './WizardFields';

const STEPS = [
  { key: 'identity', label: 'FOUNDATION', num: '01', desc: 'Name, government, economy & history' },
  { key: 'territory', label: 'TERRITORY', num: '02', desc: 'Strategic vitals, borders & resources' },
  { key: 'districts', label: 'DENIZENS', num: '03', desc: 'Districts, NPCs & rumors' },
  { key: 'arcane', label: 'ARCANE & DIVINE', num: '04', desc: 'Leyline network & theology' },
  { key: 'commerce', label: 'COMMERCE & SOCIETY', num: '05', desc: 'Trade, demographics & culture' },
  { key: 'defense', label: 'FORTIFICATIONS', num: '06', desc: 'Walls, garrison & defense nodes' },
] as const;

type WizardCity = Omit<CityData, 'id' | 'ledgerId'>;

const emptyCity = (): WizardCity => ({
  name: '',
  title: '',
  population: 10000,
  government: '',
  economy: '',
  magicLevel: 5,
  history: '',
  latitude: '45.00N',
  longitude: '30.00W',
  strategicVitals: { securityRating: 'Moderate', tradeVolume: 50, stabilityStatus: 'STABLE' },
  territorialFootprint: { chokepoints: [], bufferZones: [] },
  resourceMatrix: [],
  mythicIntel: { leyLineProximity: 'INTERACTING', strategicMagicAssets: [], arcaneSignature: '' },
  districts: [],
  npcs: [],
  rumors: [],
  leylineNodes: [],
  theology: { pantheon: [], faithTension: 50, miracleFrequency: 'Seasonal Manifestations' },
  mercantile: { commodities: [], wealthGap: 50, primaryExport: '' },
  society: { matrix: [], unrestIndex: 50, casteHierarchy: '' },
  infrastructure: { siegeDays: 100, wallIntegrity: 50, garrisonReadiness: 50, defenseNodes: [] },
});

interface CityWizardProps {
  onSave: (city: WizardCity) => void;
  onClose: () => void;
  initialCity?: CityData;
}

export const CityWizard: React.FC<CityWizardProps> = ({ onSave, onClose, initialCity }) => {
  const isEditMode = !!initialCity;
  const [step, setStep] = useState(0);
  const [city, setCity] = useState<WizardCity>(() => {
    if (initialCity) {
      const { id: _id, ledgerId: _ledgerId, ...rest } = initialCity;
      return rest;
    }
    return emptyCity();
  });
  const [showReview, setShowReview] = useState(false);

  // ─── UPDATE HELPERS ───
  const set = useCallback(<K extends keyof WizardCity>(key: K, val: WizardCity[K]) => {
    setCity(prev => ({ ...prev, [key]: val }));
  }, []);

  const setNested = useCallback(<K extends keyof WizardCity>(key: K, patch: Partial<WizardCity[K]>) => {
    setCity(prev => ({ ...prev, [key]: { ...(prev[key] as object), ...patch } as WizardCity[K] }));
  }, []);

  const updateArrayItem = useCallback(<T,>(arr: T[], index: number, patch: Partial<T>): T[] => {
    return arr.map((item, i) => i === index ? { ...item, ...patch } : item);
  }, []);

  const removeArrayItem = useCallback(<T,>(arr: T[], index: number): T[] => {
    return arr.filter((_, i) => i !== index);
  }, []);

  // ─── RANDOMIZE ───
  const handleRandomizeSection = (sectionKey: string) => {
    const data = randomizeSection(sectionKey);
    setCity(prev => ({ ...prev, ...data }));
  };

  const handleRandomizeAll = () => {
    setCity(randomFullCity() as WizardCity);
  };

  // ─── NAVIGATION ───
  const canProceed = () => {
    if (step === 0) return city.name.trim().length > 0;
    return true;
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep(step + 1);
    else setShowReview(true);
  };

  const handleBack = () => {
    if (showReview) { setShowReview(false); return; }
    if (step > 0) setStep(step - 1);
  };

  const handleSave = () => {
    onSave(city);
  };

  // ─── STEP RENDERS ───
  const renderIdentity = () => (
    <div className="space-y-6">
      <WSection title="City Identity" subtitle="Core designation parameters" onRandomize={() => handleRandomizeSection('identity')}>
        <div className="space-y-4">
          <WField label="City Name" value={city.name} onChange={v => set('name', v.toUpperCase())} placeholder="STORMHOLD..." required />
          <WField label="Title / Epithet" value={city.title} onChange={v => set('title', v)} placeholder="Crown of the Northern Reach" />
          <div className="grid grid-cols-2 gap-4">
            <WNumber label="Population" value={city.population} onChange={v => set('population', v)} min={1} max={10000000} />
            <WSlider label="Magic Level" value={city.magicLevel} onChange={v => set('magicLevel', v)} min={1} max={10} />
          </div>
          <WField label="Government" value={city.government} onChange={v => set('government', v)} placeholder="Ruling Council of Elders" />
          <WField label="Economy" value={city.economy} onChange={v => set('economy', v)} placeholder="Maritime Trade & Shipbuilding" />
          <div className="grid grid-cols-2 gap-4">
            <WField label="Latitude" value={city.latitude} onChange={v => set('latitude', v)} placeholder="56.84N" />
            <WField label="Longitude" value={city.longitude} onChange={v => set('longitude', v)} placeholder="14.52W" />
          </div>
          <WTextArea label="History" value={city.history} onChange={v => set('history', v)} placeholder="Founded in the aftermath of..." rows={4} />
        </div>
      </WSection>
    </div>
  );

  const renderTerritory = () => (
    <div className="space-y-6">
      <WSection title="Strategic Vitals" subtitle="Security & stability assessment" onRandomize={() => handleRandomizeSection('territory')}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <WSelect label="Security Rating" value={city.strategicVitals.securityRating} onChange={v => setNested('strategicVitals', { securityRating: v })} options={[
              { value: 'Critical', label: 'CRITICAL' }, { value: 'Low', label: 'LOW' }, { value: 'Moderate', label: 'MODERATE' }, { value: 'High', label: 'HIGH' }, { value: 'Maximum', label: 'MAXIMUM' }
            ]} />
            <WSelect label="Stability" value={city.strategicVitals.stabilityStatus} onChange={v => setNested('strategicVitals', { stabilityStatus: v as any })} options={[
              { value: 'STABLE', label: 'STABLE' }, { value: 'FRAGILE', label: 'FRAGILE' }, { value: 'VOLATILE', label: 'VOLATILE' }
            ]} />
            <WSlider label="Trade Volume" value={city.strategicVitals.tradeVolume} onChange={v => setNested('strategicVitals', { tradeVolume: v })} min={10} max={100} />
          </div>
        </div>
      </WSection>

      <WSection title="Chokepoints" subtitle="Strategic access points">
        <div className="space-y-3">
          {city.territorialFootprint.chokepoints.map((cp, i) => (
            <WArrayItem key={i} index={i} onRemove={() => setNested('territorialFootprint', { chokepoints: removeArrayItem(city.territorialFootprint.chokepoints, i) })}>
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <WField label="Name" value={cp.name} onChange={v => setNested('territorialFootprint', { chokepoints: updateArrayItem(city.territorialFootprint.chokepoints, i, { name: v }) })} />
                <WSelect label="Status" value={cp.status} onChange={v => setNested('territorialFootprint', { chokepoints: updateArrayItem(city.territorialFootprint.chokepoints, i, { status: v as any }) })} options={[
                  { value: 'SECURE', label: 'SECURE' }, { value: 'CRITICAL', label: 'CRITICAL' }, { value: 'CONTESTED', label: 'CONTESTED' }
                ]} />
              </div>
              <WField label="Description" value={cp.description} onChange={v => setNested('territorialFootprint', { chokepoints: updateArrayItem(city.territorialFootprint.chokepoints, i, { description: v }) })} />
            </WArrayItem>
          ))}
          <WAddButton label="ADD CHOKEPOINT" onClick={() => setNested('territorialFootprint', { chokepoints: [...city.territorialFootprint.chokepoints, { name: '', status: 'SECURE' as const, description: '' }] })} />
        </div>
      </WSection>

      <WSection title="Buffer Zones" subtitle="Territorial depth">
        <div className="space-y-3">
          {city.territorialFootprint.bufferZones.map((bz, i) => (
            <WArrayItem key={i} index={i} onRemove={() => setNested('territorialFootprint', { bufferZones: removeArrayItem(city.territorialFootprint.bufferZones, i) })}>
              <div className="grid grid-cols-[1fr_120px] gap-3">
                <WField label="Name" value={bz.name} onChange={v => setNested('territorialFootprint', { bufferZones: updateArrayItem(city.territorialFootprint.bufferZones, i, { name: v }) })} />
                <WSelect label="Status" value={bz.status} onChange={v => setNested('territorialFootprint', { bufferZones: updateArrayItem(city.territorialFootprint.bufferZones, i, { status: v as any }) })} options={[
                  { value: 'FRIENDLY', label: 'FRIENDLY' }, { value: 'NEUTRAL', label: 'NEUTRAL' }, { value: 'HOSTILE', label: 'HOSTILE' }
                ]} />
              </div>
              <WField label="Description" value={bz.description} onChange={v => setNested('territorialFootprint', { bufferZones: updateArrayItem(city.territorialFootprint.bufferZones, i, { description: v }) })} />
            </WArrayItem>
          ))}
          <WAddButton label="ADD BUFFER ZONE" onClick={() => setNested('territorialFootprint', { bufferZones: [...city.territorialFootprint.bufferZones, { name: '', status: 'NEUTRAL' as const, description: '' }] })} />
        </div>
      </WSection>

      <WSection title="Resource Matrix" subtitle="Supply chain analysis">
        <div className="space-y-3">
          {city.resourceMatrix.map((r, i) => (
            <WArrayItem key={i} index={i} onRemove={() => set('resourceMatrix', removeArrayItem(city.resourceMatrix, i))}>
              <div className="grid grid-cols-[1fr_100px] gap-3">
                <WField label="Resource" value={r.resource} onChange={v => set('resourceMatrix', updateArrayItem(city.resourceMatrix, i, { resource: v }))} />
                <WSelect label="Status" value={r.status} onChange={v => set('resourceMatrix', updateArrayItem(city.resourceMatrix, i, { status: v as any }))} options={[
                  { value: 'SURPLUS', label: 'SURPLUS' }, { value: 'DEFICIT', label: 'DEFICIT' }, { value: 'STABLE', label: 'STABLE' }
                ]} />
              </div>
              <WField label="Dependency" value={r.dependency} onChange={v => set('resourceMatrix', updateArrayItem(city.resourceMatrix, i, { dependency: v }))} />
            </WArrayItem>
          ))}
          <WAddButton label="ADD RESOURCE" onClick={() => set('resourceMatrix', [...city.resourceMatrix, { resource: '', status: 'STABLE' as const, dependency: '' }])} />
        </div>
      </WSection>

      <WSection title="Mythic Intel" subtitle="Arcane environment assessment">
        <div className="space-y-4">
          <WSelect label="Ley Line Proximity" value={city.mythicIntel.leyLineProximity} onChange={v => setNested('mythicIntel', { leyLineProximity: v as any })} options={[
            { value: 'DISTANT', label: 'DISTANT' }, { value: 'INTERACTING', label: 'INTERACTING' }, { value: 'INTERSECTING', label: 'INTERSECTING' }
          ]} />
          <WField label="Arcane Signature" value={city.mythicIntel.arcaneSignature} onChange={v => setNested('mythicIntel', { arcaneSignature: v })} placeholder="RESONANCE-BHAAL-V3" />
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block">Strategic Magic Assets</label>
            {city.mythicIntel.strategicMagicAssets.map((a, i) => (
              <div key={i} className="flex gap-2">
                <input value={a} onChange={e => {
                  const newAssets = [...city.mythicIntel.strategicMagicAssets];
                  newAssets[i] = e.target.value;
                  setNested('mythicIntel', { strategicMagicAssets: newAssets });
                }} className="flex-1 bg-white/5 border border-white/10 p-2 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors" />
                <button type="button" onClick={() => setNested('mythicIntel', { strategicMagicAssets: city.mythicIntel.strategicMagicAssets.filter((_, j) => j !== i) })} className="text-[#F4F1EA]/20 hover:text-[#FF2C2C] mono text-[9px] font-black px-2 transition-colors">X</button>
              </div>
            ))}
            <WAddButton label="ADD ASSET" onClick={() => setNested('mythicIntel', { strategicMagicAssets: [...city.mythicIntel.strategicMagicAssets, ''] })} />
          </div>
        </div>
      </WSection>
    </div>
  );

  const renderDistricts = () => (
    <div className="space-y-6">
      <WSection title="Districts" subtitle="City zones & neighborhoods" onRandomize={() => handleRandomizeSection('districts')}>
        <div className="space-y-3">
          {city.districts.map((d, i) => (
            <WArrayItem key={i} index={i} onRemove={() => set('districts', removeArrayItem(city.districts, i))}>
              <div className="grid grid-cols-[1fr_1fr] gap-3">
                <WField label="Name" value={d.name} onChange={v => set('districts', updateArrayItem(city.districts, i, { name: v.toUpperCase() }))} />
                <WField label="Vibe" value={d.vibe} onChange={v => set('districts', updateArrayItem(city.districts, i, { vibe: v }))} />
              </div>
              <WField label="Description" value={d.description} onChange={v => set('districts', updateArrayItem(city.districts, i, { description: v }))} />
              <WSlider label="Danger Level" value={d.dangerLevel} onChange={v => set('districts', updateArrayItem(city.districts, i, { dangerLevel: v }))} min={1} max={10} />
            </WArrayItem>
          ))}
          <div className="flex gap-2">
            <div className="flex-1"><WAddButton label="ADD DISTRICT" onClick={() => set('districts', [...city.districts, { name: '', description: '', vibe: '', dangerLevel: 5 }])} /></div>
            <button type="button" onClick={() => set('districts', [...city.districts, randomDistrict()])} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
          </div>
        </div>
      </WSection>

      <WSection title="Notable NPCs" subtitle="Key figures & power players">
        <div className="space-y-3">
          {city.npcs.map((npc, i) => (
            <WArrayItem key={i} index={i} onRemove={() => set('npcs', removeArrayItem(city.npcs, i))}>
              <div className="grid grid-cols-2 gap-3">
                <WField label="Name" value={npc.name} onChange={v => set('npcs', updateArrayItem(city.npcs, i, { name: v }))} />
                <WField label="Role" value={npc.role} onChange={v => set('npcs', updateArrayItem(city.npcs, i, { role: v }))} />
              </div>
              <WField label="Description" value={npc.description} onChange={v => set('npcs', updateArrayItem(city.npcs, i, { description: v }))} />
              <WField label="Secret" value={npc.secret} onChange={v => set('npcs', updateArrayItem(city.npcs, i, { secret: v }))} />
            </WArrayItem>
          ))}
          <div className="flex gap-2">
            <div className="flex-1"><WAddButton label="ADD NPC" onClick={() => set('npcs', [...city.npcs, { name: '', role: '', description: '', secret: '' }])} /></div>
            <button type="button" onClick={() => set('npcs', [...city.npcs, randomNPC()])} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
          </div>
        </div>
      </WSection>

      <WSection title="Rumors" subtitle="Intelligence gathered from local sources">
        <div className="space-y-3">
          {city.rumors.map((r, i) => (
            <WArrayItem key={i} index={i} onRemove={() => set('rumors', removeArrayItem(city.rumors, i))}>
              <div className="grid grid-cols-[1fr_100px] gap-3">
                <WField label="Source" value={r.source} onChange={v => set('rumors', updateArrayItem(city.rumors, i, { source: v }))} />
                <WSelect label="Truth" value={r.truthValue} onChange={v => set('rumors', updateArrayItem(city.rumors, i, { truthValue: v as any }))} options={[
                  { value: 'True', label: 'TRUE' }, { value: 'False', label: 'FALSE' }, { value: 'Partial', label: 'PARTIAL' }
                ]} />
              </div>
              <WTextArea label="Rumor Text" value={r.text} onChange={v => set('rumors', updateArrayItem(city.rumors, i, { text: v }))} rows={2} />
            </WArrayItem>
          ))}
          <div className="flex gap-2">
            <div className="flex-1"><WAddButton label="ADD RUMOR" onClick={() => set('rumors', [...city.rumors, { source: '', text: '', truthValue: 'Partial' as const }])} /></div>
            <button type="button" onClick={() => set('rumors', [...city.rumors, randomRumor()])} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
          </div>
        </div>
      </WSection>
    </div>
  );

  const renderArcane = () => (
    <div className="space-y-6">
      <WSection title="Leyline Network" subtitle="Arcane node topology" onRandomize={() => handleRandomizeSection('arcane')}>
        <div className="space-y-3">
          {city.leylineNodes.map((node, i) => (
            <WArrayItem key={i} index={i} onRemove={() => set('leylineNodes', removeArrayItem(city.leylineNodes, i))}>
              <div className="grid grid-cols-2 gap-3">
                <WField label="Name" value={node.name} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { name: v }))} />
                <WField label="Type" value={node.type} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { type: v }))} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <WField label="Frequency" value={node.frequency} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { frequency: v }))} />
                <WSlider label="Stability" value={node.stability} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { stability: v }))} min={1} max={100} suffix="%" />
              </div>
              <WField label="Effect" value={node.effect} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { effect: v }))} />
              <div className="grid grid-cols-2 gap-3">
                <WSlider label="Map X" value={node.coordinates.x} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { coordinates: { ...node.coordinates, x: v } }))} min={10} max={90} />
                <WSlider label="Map Y" value={node.coordinates.y} onChange={v => set('leylineNodes', updateArrayItem(city.leylineNodes, i, { coordinates: { ...node.coordinates, y: v } }))} min={10} max={90} />
              </div>
            </WArrayItem>
          ))}
          <div className="flex gap-2">
            <div className="flex-1"><WAddButton label="ADD NODE" onClick={() => set('leylineNodes', [...city.leylineNodes, { name: '', type: '', frequency: '', stability: 50, effect: '', coordinates: { x: 50, y: 50 } }])} /></div>
            <button type="button" onClick={() => set('leylineNodes', [...city.leylineNodes, randomLeylineNode()])} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
          </div>
        </div>
      </WSection>

      <WSection title="Theology" subtitle="Divine power structures">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <WSlider label="Faith Tension" value={city.theology.faithTension} onChange={v => setNested('theology', { faithTension: v })} min={10} max={100} />
            <WField label="Miracle Frequency" value={city.theology.miracleFrequency} onChange={v => setNested('theology', { miracleFrequency: v })} placeholder="Seasonal Manifestations" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block">Pantheon</label>
            {city.theology.pantheon.map((deity, i) => (
              <WArrayItem key={i} index={i} onRemove={() => setNested('theology', { pantheon: removeArrayItem(city.theology.pantheon, i) })}>
                <div className="grid grid-cols-2 gap-3">
                  <WField label="Name" value={deity.name} onChange={v => setNested('theology', { pantheon: updateArrayItem(city.theology.pantheon, i, { name: v }) })} />
                  <WField label="Domain" value={deity.domain} onChange={v => setNested('theology', { pantheon: updateArrayItem(city.theology.pantheon, i, { domain: v }) })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <WSlider label="Influence" value={deity.influence} onChange={v => setNested('theology', { pantheon: updateArrayItem(city.theology.pantheon, i, { influence: v }) })} min={10} max={100} />
                  <WSlider label="Heresy Level" value={deity.heresyLevel} onChange={v => setNested('theology', { pantheon: updateArrayItem(city.theology.pantheon, i, { heresyLevel: v }) })} min={1} max={10} />
                </div>
              </WArrayItem>
            ))}
            <div className="flex gap-2">
              <div className="flex-1"><WAddButton label="ADD DEITY" onClick={() => setNested('theology', { pantheon: [...city.theology.pantheon, { name: '', domain: '', influence: 50, heresyLevel: 1 }] })} /></div>
              <button type="button" onClick={() => setNested('theology', { pantheon: [...city.theology.pantheon, randomDeity()] })} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
            </div>
          </div>
        </div>
      </WSection>
    </div>
  );

  const renderCommerce = () => (
    <div className="space-y-6">
      <WSection title="Mercantile System" subtitle="Trade & commodity analysis" onRandomize={() => handleRandomizeSection('commerce')}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <WSlider label="Wealth Gap" value={city.mercantile.wealthGap} onChange={v => setNested('mercantile', { wealthGap: v })} min={10} max={100} />
            <WField label="Primary Export" value={city.mercantile.primaryExport} onChange={v => setNested('mercantile', { primaryExport: v })} placeholder="Maritime Commerce" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block">Commodities</label>
            {city.mercantile.commodities.map((c, i) => (
              <WArrayItem key={i} index={i} onRemove={() => setNested('mercantile', { commodities: removeArrayItem(city.mercantile.commodities, i) })}>
                <div className="grid grid-cols-[1fr_80px_90px] gap-3">
                  <WField label="Name" value={c.name} onChange={v => setNested('mercantile', { commodities: updateArrayItem(city.mercantile.commodities, i, { name: v }) })} />
                  <WField label="Price" value={c.price} onChange={v => setNested('mercantile', { commodities: updateArrayItem(city.mercantile.commodities, i, { price: v }) })} />
                  <WSelect label="Trend" value={c.trend} onChange={v => setNested('mercantile', { commodities: updateArrayItem(city.mercantile.commodities, i, { trend: v as any }) })} options={[
                    { value: 'UP', label: 'UP' }, { value: 'DOWN', label: 'DOWN' }, { value: 'STABLE', label: 'STABLE' }
                  ]} />
                </div>
                <WSlider label="Volatility" value={c.volatility} onChange={v => setNested('mercantile', { commodities: updateArrayItem(city.mercantile.commodities, i, { volatility: v }) })} min={1} max={20} />
              </WArrayItem>
            ))}
            <div className="flex gap-2">
              <div className="flex-1"><WAddButton label="ADD COMMODITY" onClick={() => setNested('mercantile', { commodities: [...city.mercantile.commodities, { name: '', price: '', trend: 'STABLE' as const, volatility: 5 }] })} /></div>
              <button type="button" onClick={() => setNested('mercantile', { commodities: [...city.mercantile.commodities, randomCommodity()] })} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
            </div>
          </div>
        </div>
      </WSection>

      <WSection title="Social Structure" subtitle="Demographics & hierarchy">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <WSlider label="Unrest Index" value={city.society.unrestIndex} onChange={v => setNested('society', { unrestIndex: v })} min={10} max={100} />
            <WField label="Caste Hierarchy" value={city.society.casteHierarchy} onChange={v => setNested('society', { casteHierarchy: v })} placeholder="Nobility > Military > Merchants > Citizens" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono">Demographic Matrix</label>
              {city.society.matrix.length > 0 && (
                <span className="text-[9px] mono font-black text-[#F4F1EA]/30">
                  TOTAL: <span className={city.society.matrix.reduce((s, d) => s + d.percentage, 0) === 100 ? 'text-green-400' : 'text-[#FF2C2C]'}>
                    {city.society.matrix.reduce((s, d) => s + d.percentage, 0)}%
                  </span>
                </span>
              )}
            </div>
            {city.society.matrix.map((d, i) => (
              <WArrayItem key={i} index={i} onRemove={() => setNested('society', { matrix: removeArrayItem(city.society.matrix, i) })}>
                <div className="grid grid-cols-[1fr_100px] gap-3">
                  <WField label="Species" value={d.species} onChange={v => setNested('society', { matrix: updateArrayItem(city.society.matrix, i, { species: v }) })} />
                  <WSlider label="%" value={d.percentage} onChange={v => setNested('society', { matrix: updateArrayItem(city.society.matrix, i, { percentage: v }) })} min={1} max={95} suffix="%" />
                </div>
              </WArrayItem>
            ))}
            <div className="flex gap-2">
              <div className="flex-1"><WAddButton label="ADD SPECIES" onClick={() => setNested('society', { matrix: [...city.society.matrix, { species: '', percentage: 10 }] })} /></div>
              <button type="button" onClick={() => setNested('society', { matrix: [...city.society.matrix, randomDemographic()] })} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
            </div>
          </div>
        </div>
      </WSection>
    </div>
  );

  const renderDefense = () => (
    <div className="space-y-6">
      <WSection title="Infrastructure" subtitle="Defense & fortification parameters" onRandomize={() => handleRandomizeSection('defense')}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <WNumber label="Siege Days" value={city.infrastructure.siegeDays} onChange={v => setNested('infrastructure', { siegeDays: v })} min={10} max={500} suffix="DAYS" />
            <WSlider label="Wall Integrity" value={city.infrastructure.wallIntegrity} onChange={v => setNested('infrastructure', { wallIntegrity: v })} min={10} max={100} suffix="%" />
            <WSlider label="Garrison Readiness" value={city.infrastructure.garrisonReadiness} onChange={v => setNested('infrastructure', { garrisonReadiness: v })} min={10} max={100} suffix="%" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block">Defense Nodes</label>
            {city.infrastructure.defenseNodes.map((node, i) => (
              <WArrayItem key={i} index={i} onRemove={() => setNested('infrastructure', { defenseNodes: removeArrayItem(city.infrastructure.defenseNodes, i) })}>
                <div className="grid grid-cols-[1fr_1fr] gap-3">
                  <WField label="Name" value={node.name} onChange={v => setNested('infrastructure', { defenseNodes: updateArrayItem(city.infrastructure.defenseNodes, i, { name: v }) })} />
                  <WField label="Type" value={node.type} onChange={v => setNested('infrastructure', { defenseNodes: updateArrayItem(city.infrastructure.defenseNodes, i, { type: v }) })} />
                </div>
                <WSlider label="Integrity" value={node.integrity} onChange={v => setNested('infrastructure', { defenseNodes: updateArrayItem(city.infrastructure.defenseNodes, i, { integrity: v }) })} min={10} max={100} suffix="%" />
              </WArrayItem>
            ))}
            <div className="flex gap-2">
              <div className="flex-1"><WAddButton label="ADD DEFENSE NODE" onClick={() => setNested('infrastructure', { defenseNodes: [...city.infrastructure.defenseNodes, { name: '', integrity: 50, type: '' }] })} /></div>
              <button type="button" onClick={() => setNested('infrastructure', { defenseNodes: [...city.infrastructure.defenseNodes, randomDefenseNode()] })} className="px-4 py-3 border border-dashed border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/40 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/40 mono transition-all">+ RANDOM</button>
            </div>
          </div>
        </div>
      </WSection>
    </div>
  );

  // ─── REVIEW SCREEN ───
  const renderReview = () => {
    const stats = [
      { label: 'Districts', count: city.districts.length },
      { label: 'NPCs', count: city.npcs.length },
      { label: 'Rumors', count: city.rumors.length },
      { label: 'Leyline Nodes', count: city.leylineNodes.length },
      { label: 'Deities', count: city.theology.pantheon.length },
      { label: 'Commodities', count: city.mercantile.commodities.length },
      { label: 'Species', count: city.society.matrix.length },
      { label: 'Defense Nodes', count: city.infrastructure.defenseNodes.length },
    ];

    return (
      <div className="space-y-6">
        <WSection title="Archive Review" subtitle="Verify all parameters before inscription">
          <div className="space-y-4">
            <div className="p-4 border border-[#FF2C2C]/20 bg-[#FF2C2C]/5">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF2C2C]/50 mono mb-1">City Designation</div>
              <div className="six-caps text-5xl text-[#F4F1EA] uppercase leading-tight">{city.name || 'UNNAMED'}</div>
              <div className="text-[11px] font-bold text-[#F4F1EA]/60 mono mt-1 uppercase">{city.title || 'No title assigned'}</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 border border-white/5 bg-white/[0.02]">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/30 mono">Population</div>
                <div className="text-lg font-black text-[#F4F1EA] mono">{city.population.toLocaleString()}</div>
              </div>
              <div className="p-3 border border-white/5 bg-white/[0.02]">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/30 mono">Magic Level</div>
                <div className="text-lg font-black text-[#FF2C2C] mono">{city.magicLevel}/10</div>
              </div>
              <div className="p-3 border border-white/5 bg-white/[0.02]">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/30 mono">Stability</div>
                <div className="text-lg font-black text-[#F4F1EA] mono">{city.strategicVitals.stabilityStatus}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {stats.map(s => (
                <div key={s.label} className="p-2 border border-white/5 text-center">
                  <div className="text-lg font-black text-[#FF2C2C] mono">{s.count}</div>
                  <div className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F4F1EA]/30 mono">{s.label}</div>
                </div>
              ))}
            </div>

            {city.name.trim() === '' && (
              <div className="p-3 border border-[#FF2C2C] bg-[#FF2C2C]/10 text-[11px] font-black uppercase text-[#FF2C2C] mono">
                WARNING: City name is required before inscription
              </div>
            )}
          </div>
        </WSection>
      </div>
    );
  };

  const stepRenderers = [renderIdentity, renderTerritory, renderDistricts, renderArcane, renderCommerce, renderDefense];

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/95 backdrop-blur-md" onClick={onClose}>
      <div
        className="bg-[#121212] w-full max-w-[680px] h-[90vh] max-h-[800px] flex flex-col border-t-4 border-[#FF2C2C] relative animate-wizard-in"
        onClick={e => e.stopPropagation()}
      >
        {/* ─── HEADER ─── */}
        <div className="px-8 pt-6 pb-4 shrink-0">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="text-[12px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-1">{isEditMode ? 'Record Amendment Protocol' : 'Manual Inscription Protocol'}</div>
              <div className="six-caps text-6xl text-[#F4F1EA] uppercase leading-tight">
                {showReview ? 'REVIEW' : STEPS[step].label}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleRandomizeAll}
                className="px-3 py-2 border border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/60 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/50 hover:bg-[#FF2C2C]/5 mono transition-all"
                title="Randomize entire city"
              >
                RANDOMIZE ALL
              </button>
              <button onClick={onClose} className="text-[#F4F1EA]/50 hover:text-[#FF2C2C] font-black uppercase text-[12px] mono transition-colors">[ ESC ]</button>
            </div>
          </div>

          {/* ─── STEP INDICATOR ─── */}
          <div className="flex gap-1">
            {STEPS.map((s, i) => (
              <button
                key={s.key}
                onClick={() => { setShowReview(false); setStep(i); }}
                className={`flex-1 group relative ${showReview ? 'opacity-40' : ''}`}
              >
                <div className={`h-[3px] transition-all duration-300 ${i === step && !showReview ? 'bg-[#FF2C2C]' : i < step || showReview ? 'bg-[#FF2C2C]/30' : 'bg-white/10'}`} />
                <div className={`text-[8px] font-black uppercase mono mt-1.5 text-left transition-colors h-[20px] overflow-hidden leading-[10px] ${i === step && !showReview ? 'text-[#FF2C2C]' : 'text-[#F4F1EA]/20 group-hover:text-[#F4F1EA]/40'}`}>
                  {s.num}_{s.label}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ─── STEP DESCRIPTION ─── */}
        {!showReview && (
          <div className="px-8 pb-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/25 mono">{STEPS[step].desc}</div>
          </div>
        )}

        {/* ─── SCROLLABLE CONTENT ─── */}
        <div className="flex-1 overflow-y-auto px-8 pb-4 scrollbar-hide">
          {showReview ? renderReview() : stepRenderers[step]()}
        </div>

        {/* ─── FOOTER NAV ─── */}
        <div className="px-8 py-4 border-t border-white/5 flex justify-between items-center shrink-0">
          <button
            type="button"
            onClick={step === 0 && !showReview ? onClose : handleBack}
            className="px-6 py-3 border border-white/10 text-[11px] font-black uppercase text-[#F4F1EA]/50 hover:text-[#F4F1EA] hover:border-[#F4F1EA]/30 mono transition-all"
          >
            {step === 0 && !showReview ? 'CANCEL' : 'BACK'}
          </button>

          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/20 mono">
            {showReview ? 'FINAL REVIEW' : `STEP ${step + 1} OF ${STEPS.length}`}
          </div>

          {showReview ? (
            <button
              type="button"
              onClick={handleSave}
              disabled={city.name.trim() === ''}
              className="px-6 py-3 bg-[#FF2C2C] text-white text-[11px] font-black uppercase tracking-[0.2em] mono hover:bg-[#F4F1EA] hover:text-[#121212] disabled:opacity-30 transition-all"
            >
              {isEditMode ? 'COMMIT AMENDMENTS' : 'INSCRIBE TO LEDGER'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed()}
              className="px-6 py-3 bg-[#FF2C2C] text-white text-[11px] font-black uppercase tracking-[0.2em] mono hover:bg-[#F4F1EA] hover:text-[#121212] disabled:opacity-30 transition-all"
            >
              {step === STEPS.length - 1 ? 'REVIEW' : 'NEXT'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
