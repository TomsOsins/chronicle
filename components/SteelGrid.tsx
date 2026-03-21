import React from 'react';
import { CityData } from '../types';
import { DataPanel } from './DataPanel';
import { AnimatedNumber, AnimatedBar, StaggeredItem } from './AnimatedValue';

interface SteelGridProps {
  infrastructure: CityData['infrastructure'];
}

export const SteelGrid: React.FC<SteelGridProps> = ({ infrastructure }) => {
  const { siegeDays, wallIntegrity, garrisonReadiness, defenseNodes } = infrastructure;

  return (
    <div className="space-y-10 relative">
      <StaggeredItem index={0}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4 animate-glitch">Defense Overview</div>
          <div className="grid grid-cols-3 gap-3">
            <DataPanel label="Siege Days" value={siegeDays} chartHeights={[70, 80, 85, 90, 75, 88, 92]} delay={0} />
            <DataPanel label="Wall Integ." value={`${wallIntegrity}%`} chartHeights={Array.from({ length: 7 }, () => Math.random() * 20 + wallIntegrity * 0.8)} delay={100} />
            <DataPanel label="Garrison" value={`${garrisonReadiness}%`} chartHeights={Array.from({ length: 7 }, () => Math.random() * 20 + garrisonReadiness * 0.8)} delay={200} />
          </div>
        </section>
      </StaggeredItem>

      <StaggeredItem index={1}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">Defense Nodes</div>
          <div className="space-y-2">
            {defenseNodes.map((node, i) => (
              <StaggeredItem key={i} index={i + 2}>
                <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{node.name}</span>
                      <span className="text-[9px] font-bold uppercase text-[#F4F1EA]/45 mono ml-2">{node.type}</span>
                    </div>
                    <span className={`text-[11px] font-black mono ${node.integrity > 80 ? 'text-[#88E788]' : node.integrity > 50 ? 'text-[#FFB800]' : 'text-[#FF2C2C]'}`}>
                      <AnimatedNumber value={node.integrity} suffix="%" duration={800 + i * 200} />
                    </span>
                  </div>
                  <AnimatedBar value={node.integrity} delay={i * 150} height="h-1.5" />
                </div>
              </StaggeredItem>
            ))}
          </div>
        </section>
      </StaggeredItem>
    </div>
  );
};
