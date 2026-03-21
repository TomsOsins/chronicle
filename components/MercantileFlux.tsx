
import React from 'react';
import { Commodity } from '../types';

interface MercantileFluxProps {
  mercantile: {
    commodities: Commodity[];
    wealthGap: number;
    primaryExport: string;
  };
}

export const MercantileFlux: React.FC<MercantileFluxProps> = ({ mercantile }) => {
  return (
    <div className="h-[400px] w-full flex items-center justify-center p-12 border border-dashed border-[#FF2C2C]/20 bg-black/20 font-mono">
        <div className="text-center space-y-4">
            <div className="text-[#FF2C2C] text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
                [ SECTOR_04_PURGED ]
            </div>
            <div className="text-white/20 text-[10px] uppercase tracking-widest">
                Awaiting Architect Input
            </div>
        </div>
    </div>
  );
};
