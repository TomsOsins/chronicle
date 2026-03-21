import React, { useEffect, useState } from 'react';
import { CityData } from '../types';
import { AnimatedNumber, AnimatedBar, StaggeredItem } from './AnimatedValue';
import { TipLabel } from './Tooltip/Tooltip';

interface SocialDynamicsProps {
  society: CityData['society'];
}

const COLORS = ['#FF2C2C', '#FFB800', '#88E788', '#4A9EFF', '#C77DFF', '#FF6B9D', '#00D4AA', '#FF8C42'];

const PieChart: React.FC<{ data: { label: string; value: number }[]; size?: number }> = ({ data, size = 180 }) => {
  const [animated, setAnimated] = useState(false);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const center = size / 2;
  const radius = size / 2 - 8;
  const innerRadius = radius * 0.55;

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(timer);
  }, []);

  let cumulative = 0;
  const segments = data.map((d, i) => {
    const startAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;
    cumulative += d.value;
    const endAngle = (cumulative / total) * Math.PI * 2 - Math.PI / 2;

    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    const ix1 = center + innerRadius * Math.cos(startAngle);
    const iy1 = center + innerRadius * Math.sin(startAngle);
    const ix2 = center + innerRadius * Math.cos(endAngle);
    const iy2 = center + innerRadius * Math.sin(endAngle);

    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;

    const path = [
      `M ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${ix2} ${iy2}`,
      `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${ix1} ${iy1}`,
      'Z',
    ].join(' ');

    return { path, color: COLORS[i % COLORS.length], label: d.label, value: d.value };
  });

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        className={`transition-all duration-1000 ${animated ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
        style={{ transform: animated ? 'rotate(0deg)' : 'rotate(-90deg)', transition: 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {segments.map((seg, i) => (
          <path
            key={i}
            d={seg.path}
            fill={seg.color}
            opacity={0.7}
            stroke="#121212"
            strokeWidth="2"
            className="hover:opacity-100 transition-opacity cursor-default"
          >
            <title>{seg.label}: {seg.value}%</title>
          </path>
        ))}

        {/* Center text */}
        <circle cx={center} cy={center} r={innerRadius - 4} fill="#121212" />
        <text x={center} y={center - 6} textAnchor="middle" className="fill-[#F4F1EA]/40 text-[8px] font-black uppercase" style={{ fontFamily: 'JetBrains Mono' }}>
          CENSUS
        </text>
        <text x={center} y={center + 10} textAnchor="middle" className="fill-[#F4F1EA] text-[16px] font-black" style={{ fontFamily: 'JetBrains Mono' }}>
          {total}%
        </text>
      </svg>
    </div>
  );
};

export const SocialDynamics: React.FC<SocialDynamicsProps> = ({ society }) => {
  const { matrix, unrestIndex, casteHierarchy } = society;

  return (
    <div className="space-y-10 relative">
      {/* Overview */}
      <StaggeredItem index={0}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4 animate-glitch">Societal Overview</div>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">
                <TipLabel termKey="unrestIndex">Civil Unrest Index</TipLabel>
              </div>
              <div className="text-[28px] font-black text-[#F4F1EA] mono">
                <AnimatedNumber value={unrestIndex} />
              </div>
              <AnimatedBar value={unrestIndex} delay={200} height="h-1.5" />
            </div>
            <div className="border border-white/5 p-4 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/45 mono mb-2">
                <TipLabel termKey="casteHierarchy">Caste Hierarchy</TipLabel>
              </div>
              <div className="text-[10px] font-bold uppercase text-[#F4F1EA]/70 mono mt-2 leading-relaxed">{casteHierarchy}</div>
            </div>
          </div>
        </section>
      </StaggeredItem>

      {/* Demographic Pie + Legend */}
      <StaggeredItem index={1}>
        <section>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-4">
            <TipLabel termKey="demographicMatrix">Demographic Matrix</TipLabel>
          </div>
          <div className="border border-white/5 p-6 hover:border-[#FF2C2C]/20 transition-colors">
            <div className="flex items-center gap-8">
              <PieChart data={matrix.map(d => ({ label: d.species, value: d.percentage }))} />

              <div className="flex-1 space-y-2">
                {matrix.map((demo, i) => (
                  <StaggeredItem key={i} index={i + 2}>
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <span className="text-[11px] font-black uppercase text-[#F4F1EA] mono">{demo.species}</span>
                          <span className="text-[11px] font-black mono text-[#F4F1EA]/70">
                            <AnimatedNumber value={demo.percentage} suffix="%" />
                          </span>
                        </div>
                        <AnimatedBar value={demo.percentage} delay={i * 100} height="h-1" colorHex={COLORS[i % COLORS.length]} />
                      </div>
                    </div>
                  </StaggeredItem>
                ))}
              </div>
            </div>
          </div>
        </section>
      </StaggeredItem>
    </div>
  );
};
