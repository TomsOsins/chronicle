import React from 'react';
import { CityData } from '../../types';
import { DataPanel } from '../DataPanel';
import { StaggeredItem } from '../AnimatedValue';
import { TipLabel, Tooltip } from '../Tooltip/Tooltip';

interface GeopoliticalViewProps {
  city: CityData;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    SECURE: 'text-[#88E788] border-[#88E788]/30 bg-[#88E788]/5',
    FRIENDLY: 'text-[#88E788] border-[#88E788]/30 bg-[#88E788]/5',
    STABLE: 'text-[#88E788] border-[#88E788]/30 bg-[#88E788]/5',
    SURPLUS: 'text-[#88E788] border-[#88E788]/30 bg-[#88E788]/5',
    NEUTRAL: 'text-[#F4F1EA]/60 border-[#F4F1EA]/20 bg-white/5',
    CONTESTED: 'text-[#FFB800] border-[#FFB800]/30 bg-[#FFB800]/5',
    FRAGILE: 'text-[#FFB800] border-[#FFB800]/30 bg-[#FFB800]/5',
    DEFICIT: 'text-[#FF2C2C] border-[#FF2C2C]/30 bg-[#FF2C2C]/5',
    CRITICAL: 'text-[#FF2C2C] border-[#FF2C2C]/30 bg-[#FF2C2C]/5',
    HOSTILE: 'text-[#FF2C2C] border-[#FF2C2C]/30 bg-[#FF2C2C]/5',
    VOLATILE: 'text-[#FF2C2C] border-[#FF2C2C]/30 bg-[#FF2C2C]/5',
  };
  return (
    <span className={`text-[10px] font-black uppercase mono px-2 py-1 border shrink-0 ${colors[status] || 'text-[#F4F1EA]/60 border-[#F4F1EA]/10'}`}>
      {status}
    </span>
  );
};

export const GeopoliticalView: React.FC<GeopoliticalViewProps> = React.memo(({ city }) => {
  const { strategicVitals, territorialFootprint, resourceMatrix, mythicIntel } = city;

  return (
    <div className="space-y-10 relative">
      {/* Strategic Vitals */}
      <StaggeredItem index={0}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4 animate-glitch">
            <TipLabel termKey="strategicVitals">Strategic Vitals</TipLabel>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <DataPanel label="Security" labelTermKey="security" value={strategicVitals.securityRating} chartHeights={[60, 80, 70, 90, 85, 75, 95]} delay={0} />
            <DataPanel label="Trade Vol." labelTermKey="tradeVolume" value={`${strategicVitals.tradeVolume}/100`} chartHeights={Array.from({ length: 7 }, () => Math.random() * 40 + strategicVitals.tradeVolume * 0.6)} delay={100} />
            <DataPanel label="Stability" labelTermKey="stability" value={strategicVitals.stabilityStatus} chartHeights={[40, 55, 35, 60, 45, 50, 30]} delay={200} />
          </div>
        </section>
      </StaggeredItem>

      {/* Territorial Footprint */}
      <StaggeredItem index={1}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="territorialFootprint">Territorial Footprint</TipLabel>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono mb-3">
                <TipLabel termKey="chokepoints">Chokepoints</TipLabel>
              </div>
              <div className="space-y-2">
                {territorialFootprint.chokepoints.map((cp, i) => (
                  <StaggeredItem key={i} index={i + 2}>
                    <div className="border border-white/5 p-3 hover:border-[#FF2C2C]/20 transition-colors">
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono truncate">{cp.name}</span>
                        <StatusBadge status={cp.status} />
                      </div>
                      <p className="text-[10px] text-[#F4F1EA]/55 mono leading-relaxed">{cp.description}</p>
                    </div>
                  </StaggeredItem>
                ))}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono mb-3">
                <TipLabel termKey="bufferZones">Buffer Zones</TipLabel>
              </div>
              <div className="space-y-2">
                {territorialFootprint.bufferZones.map((bz, i) => (
                  <StaggeredItem key={i} index={i + 2}>
                    <div className="border border-white/5 p-3 hover:border-[#FF2C2C]/20 transition-colors">
                      <div className="flex justify-between items-center gap-2 mb-1">
                        <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono truncate">{bz.name}</span>
                        <StatusBadge status={bz.status} />
                      </div>
                      <p className="text-[10px] text-[#F4F1EA]/55 mono leading-relaxed">{bz.description}</p>
                    </div>
                  </StaggeredItem>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StaggeredItem>

      {/* Resource Matrix */}
      <StaggeredItem index={3}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="resourceMatrix">Resource Matrix</TipLabel>
          </div>
          <div className="border border-white/5">
            <div className="grid grid-cols-[1fr_80px_1fr] gap-4 px-4 py-2 border-b border-white/10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono">Resource</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono">Status</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono">
                <TipLabel termKey="dependency">Dependency</TipLabel>
              </span>
            </div>
            {resourceMatrix.map((r, i) => (
              <StaggeredItem key={i} index={i + 4}>
                <div className="grid grid-cols-[1fr_80px_1fr] gap-4 px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors items-center">
                  <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{r.resource}</span>
                  <StatusBadge status={r.status} />
                  <span className="text-[10px] text-[#F4F1EA]/60 mono">{r.dependency}</span>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </section>
      </StaggeredItem>

      {/* Mythic Intel */}
      <StaggeredItem index={5}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="mythicIntel">Mythic Intel</TipLabel>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">
                <TipLabel termKey="leyLineProximity">Ley Line Proximity</TipLabel>
              </div>
              <div className="text-[13px] font-black uppercase text-[#F4F1EA] mono">{mythicIntel.leyLineProximity}</div>
            </div>
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">
                <TipLabel termKey="arcaneSignature">Arcane Signature</TipLabel>
              </div>
              <div className="text-[13px] font-black uppercase text-[#FF2C2C] mono animate-glitch">{mythicIntel.arcaneSignature}</div>
            </div>
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">
                <TipLabel termKey="magicAssets">Magic Assets</TipLabel>
              </div>
              <div className="space-y-1">
                {mythicIntel.strategicMagicAssets.map((a, i) => (
                  <div key={i} className="text-[10px] font-bold uppercase text-[#F4F1EA]/70 mono">• {a}</div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StaggeredItem>

      {/* Districts */}
      <StaggeredItem index={6}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="districtSurvey">District Survey</TipLabel>
          </div>
          <div className="space-y-2">
            {city.districts.map((d, i) => (
              <StaggeredItem key={i} index={i + 7}>
                <div className="border border-white/5 p-3 hover:border-[#FF2C2C]/20 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{d.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-bold uppercase text-[#F4F1EA]/45 mono">{d.vibe}</span>
                      <div className="flex gap-[2px]">
                        {Array.from({ length: 10 }, (_, j) => (
                          <div key={j} className={`w-[3px] h-3 transition-all duration-500 ${j < d.dangerLevel ? 'bg-[#FF2C2C]' : 'bg-white/5'}`} style={{ transitionDelay: `${j * 50}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#F4F1EA]/55 mono leading-relaxed">{d.description}</p>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </section>
      </StaggeredItem>

      {/* NPCs */}
      <StaggeredItem index={8}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="keyPersonnel">Key Personnel</TipLabel>
          </div>
          <div className="space-y-2">
            {city.npcs.map((npc, i) => (
              <StaggeredItem key={i} index={i + 9}>
                <div className="border border-white/5 p-3 hover:border-[#FF2C2C]/20 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{npc.name}</span>
                    <span className="text-[10px] font-black uppercase text-[#FF2C2C]/65 mono">{npc.role}</span>
                  </div>
                  <p className="text-[10px] text-[#F4F1EA]/55 mono leading-relaxed mb-2">{npc.description}</p>
                  <div className="border-t border-white/5 pt-2">
                    <span className="text-[9px] font-black uppercase text-[#FF2C2C]/45 mono tracking-[0.2em]">Intel: </span>
                    <span className="text-[10px] text-[#F4F1EA]/45 mono">{npc.secret}</span>
                  </div>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </section>
      </StaggeredItem>

      {/* Rumors */}
      <StaggeredItem index={10}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="activeRumors">Active Rumors</TipLabel>
          </div>
          <div className="space-y-2">
            {city.rumors.map((r, i) => (
              <StaggeredItem key={i} index={i + 11}>
                <div className="border border-white/5 p-3 flex gap-3 items-start hover:border-[#FF2C2C]/20 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] text-[#F4F1EA]/70 mono leading-relaxed">"{r.text}"</p>
                    <span className="text-[9px] text-[#F4F1EA]/40 mono mt-1 block">— {r.source}</span>
                  </div>
                  <StatusBadge status={r.truthValue === 'True' ? 'SECURE' : r.truthValue === 'False' ? 'CRITICAL' : 'CONTESTED'} />
                </div>
              </StaggeredItem>
            ))}
          </div>
        </section>
      </StaggeredItem>

      {/* History */}
      <StaggeredItem index={12}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">Historical Record</div>
          <div className="border border-white/5 p-4 relative overflow-hidden">
            <p className="text-[10px] text-[#F4F1EA]/65 mono leading-relaxed">{city.history}</p>
          </div>
        </section>
      </StaggeredItem>
    </div>
  );
});
