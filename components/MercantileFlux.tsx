import React from 'react';
import { CityData } from '../types';
import { AnimatedNumber, AnimatedBar, StaggeredItem } from './AnimatedValue';

interface MercantileFluxProps {
  mercantile: CityData['mercantile'];
}

const TrendArrow: React.FC<{ trend: string }> = ({ trend }) => {
  const config: Record<string, { symbol: string; color: string }> = {
    UP: { symbol: '▲', color: 'text-[#88E788]' },
    DOWN: { symbol: '▼', color: 'text-[#FF2C2C]' },
    STABLE: { symbol: '—', color: 'text-[#F4F1EA]/60' },
  };
  const { symbol, color } = config[trend] || config.STABLE;
  return <span className={`text-[11px] font-black mono ${color}`}>{symbol}</span>;
};

export const MercantileFlux: React.FC<MercantileFluxProps> = ({ mercantile }) => {
  const { commodities, wealthGap, primaryExport } = mercantile;

  return (
    <div className="space-y-10 relative">
      <StaggeredItem index={0}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4 animate-glitch">Commerce Overview</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">Wealth Disparity</div>
              <div className="text-[28px] font-black text-[#F4F1EA] mono">
                <AnimatedNumber value={wealthGap} suffix="%" />
              </div>
              <AnimatedBar value={wealthGap} delay={200} height="h-1.5" />
            </div>
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">Primary Export</div>
              <div className="text-[13px] font-black uppercase text-[#F4F1EA] mono mt-2">{primaryExport}</div>
            </div>
          </div>
        </section>
      </StaggeredItem>

      <StaggeredItem index={1}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">Commodity Ledger</div>
          <div className="border border-white/5">
            <div className="grid grid-cols-[1fr_80px_30px_100px] gap-3 px-4 py-2 border-b border-white/10">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono">Commodity</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono">Price</span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono"></span>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono text-right">Volatility</span>
            </div>
            {commodities.map((c, i) => (
              <StaggeredItem key={i} index={i + 2}>
                <div className="grid grid-cols-[1fr_80px_30px_100px] gap-3 px-4 py-3 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors items-center">
                  <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{c.name}</span>
                  <span className="text-[10px] font-bold uppercase text-[#F4F1EA]/70 mono">{c.price}</span>
                  <TrendArrow trend={c.trend} />
                  <div className="flex gap-[2px] justify-end">
                    {Array.from({ length: 20 }, (_, j) => (
                      <div
                        key={j}
                        className={`w-[2px] h-3 transition-all duration-300 ${j < c.volatility ? 'bg-[#FFB800]' : 'bg-white/5'}`}
                        style={{ transitionDelay: `${j * 30 + i * 100}ms` }}
                      />
                    ))}
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
