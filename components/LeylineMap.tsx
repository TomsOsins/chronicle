import React from 'react';
import { LeylineNode } from '../types';
import { AnimatedNumber, AnimatedBar, StaggeredItem } from './AnimatedValue';

interface LeylineMapProps {
  nodes: LeylineNode[];
  magicLevel: number;
}

export const LeylineMap: React.FC<LeylineMapProps> = ({ nodes, magicLevel }) => {
  return (
    <div className="h-full flex flex-col relative">

      {/* Map visualization */}
      <div className="relative flex-1 border border-white/5 bg-black/30 overflow-hidden mb-6">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leyGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leyGrid)" />

          {nodes.map((node, i) =>
            nodes.slice(i + 1).map((other, j) => (
              <line
                key={`${i}-${j}`}
                x1={`${node.coordinates.x}%`}
                y1={`${node.coordinates.y}%`}
                x2={`${other.coordinates.x}%`}
                y2={`${other.coordinates.y}%`}
                stroke="rgba(255,44,44,0.08)"
                strokeWidth="1"
                strokeDasharray="4 4"
              >
                <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
              </line>
            ))
          )}
        </svg>

        {nodes.map((node, i) => (
          <div
            key={i}
            className="absolute group animate-fill-sweep"
            style={{
              left: `${node.coordinates.x}%`,
              top: `${node.coordinates.y}%`,
              transform: 'translate(-50%, -50%)',
              animationDelay: `${i * 200}ms`,
            }}
          >
            <div
              className="absolute rounded-full border border-[#FF2C2C]/20 animate-ping"
              style={{
                width: `${20 + node.stability * 0.3}px`,
                height: `${20 + node.stability * 0.3}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                animationDuration: `${3 + (100 - node.stability) * 0.05}s`,
              }}
            />
            <div
              className={`w-3 h-3 rounded-full relative z-10 ${node.stability > 70 ? 'bg-[#88E788]' : node.stability > 40 ? 'bg-[#FFB800]' : 'bg-[#FF2C2C]'}`}
              style={{ boxShadow: `0 0 ${8 + node.stability * 0.1}px currentColor` }}
            />
            <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <div className="text-[8px] font-black uppercase text-[#F4F1EA] mono">{node.name}</div>
              <div className="text-[7px] font-bold uppercase text-[#FF2C2C]/40 mono">{node.type}</div>
            </div>
          </div>
        ))}

        <div className="absolute bottom-3 right-3 text-right">
          <div className="text-[7px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/15 mono mb-1">Ambient Magic</div>
          <div className="flex gap-[2px] justify-end">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={`w-1.5 h-3 transition-all duration-500 ${i < magicLevel ? 'bg-[#FF2C2C]' : 'bg-white/5'}`} style={{ transitionDelay: `${i * 80}ms` }} />
            ))}
          </div>
        </div>
      </div>

      {/* Node detail list */}
      <div className="space-y-2">
        <div className="text-[9px] font-black uppercase tracking-[0.4em] text-[#FF2C2C] mono mb-3">Resonance Nodes</div>
        {nodes.map((node, i) => (
          <StaggeredItem key={i} index={i}>
            <div className="border border-white/5 p-3 hover:border-[#FF2C2C]/20 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <span className="text-[10px] font-black uppercase text-[#F4F1EA] mono">{node.name}</span>
                  <span className="text-[8px] font-bold uppercase text-[#FF2C2C]/35 mono ml-2">{node.type}</span>
                </div>
                <span className="text-[8px] font-bold uppercase text-[#F4F1EA]/20 mono">{node.frequency}</span>
              </div>
              <AnimatedBar value={node.stability} delay={i * 100} height="h-1.5" />
              <p className="text-[8px] text-[#F4F1EA]/25 mono mt-2 leading-relaxed">{node.effect}</p>
            </div>
          </StaggeredItem>
        ))}
      </div>
    </div>
  );
};
