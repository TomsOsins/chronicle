import React from 'react';
import { CityData } from '../types';
import { AnimatedNumber, AnimatedBar, StaggeredItem } from './AnimatedValue';

interface DivineSynchronProps {
  theology: CityData['theology'];
}

export const DivineSynchron: React.FC<DivineSynchronProps> = ({ theology }) => {
  const { pantheon, faithTension, miracleFrequency } = theology;

  return (
    <div className="space-y-10 relative">
      <StaggeredItem index={0}>
        <section>
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4 animate-glitch">Theological Overview</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/25 mono mb-2">Faith Tension Index</div>
              <div className="text-2xl font-black text-[#F4F1EA] mono">
                <AnimatedNumber value={faithTension} />
              </div>
              <AnimatedBar value={faithTension} delay={200} height="h-1.5" />
            </div>
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/25 mono mb-2">Miracle Frequency</div>
              <div className="text-[12px] font-black uppercase text-[#F4F1EA] mono mt-2">{miracleFrequency}</div>
            </div>
          </div>
        </section>
      </StaggeredItem>

      <StaggeredItem index={1}>
        <section>
          <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">Active Pantheon</div>
          <div className="space-y-3">
            {pantheon.map((deity, i) => (
              <StaggeredItem key={i} index={i + 2}>
                <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="text-[12px] font-black uppercase text-[#F4F1EA] mono">{deity.name}</div>
                      <div className="text-[9px] font-bold uppercase text-[#F4F1EA]/35 mono mt-0.5">{deity.domain}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F4F1EA]/20 mono mb-1">Heresy</div>
                      <div className="flex gap-[2px] justify-end">
                        {Array.from({ length: 10 }, (_, j) => (
                          <div key={j} className={`w-[3px] h-3 transition-all duration-300 ${j < deity.heresyLevel ? 'bg-[#FF2C2C]' : 'bg-white/5'}`} style={{ transitionDelay: `${j * 60 + i * 200}ms` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#F4F1EA]/20 mono">Influence</span>
                      <span className="text-[9px] font-black mono text-[#F4F1EA]/35">
                        <AnimatedNumber value={deity.influence} suffix="/100" duration={800 + i * 200} />
                      </span>
                    </div>
                    <AnimatedBar value={deity.influence} delay={i * 150} height="h-1.5" color="bg-[#FF2C2C]" />
                  </div>
                </div>
              </StaggeredItem>
            ))}
          </div>
        </section>
      </StaggeredItem>
    </div>
  );
};
