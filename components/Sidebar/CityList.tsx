
import React from 'react';
import { CityData, ViewMode } from '../../types';

interface CityListProps {
  cities: CityData[];
  selectedCityId: string | null;
  viewMode: ViewMode;
  loading: boolean;
  onSelectCity: (id: string | null) => void;
  onSetViewMode: (mode: ViewMode) => void;
}

export const CityList: React.FC<CityListProps> = ({
  cities,
  selectedCityId,
  viewMode,
  loading,
  onSelectCity,
  onSetViewMode
}) => {
  if (selectedCityId) {
    return (
      <nav className="space-y-2">
        <button 
          onClick={() => onSelectCity(null)} 
          className="w-full flex items-center justify-center gap-2 text-[11px] font-black uppercase tracking-[0.15em] text-[#FF2C2C] hover:bg-[#FF2C2C] hover:text-white py-4 border border-[#FF2C2C]/20 transition-all mono mb-6"
        >
          ← BACK TO LEDGER
        </button>
        <div className="space-y-1">
          {[
            { mode: ViewMode.GEOPOLITICAL, label: '01_SOVEREIGNTY_STATS_' },
            { mode: ViewMode.MAP, label: '02_ARCANE_RESONANCE' },
            { mode: ViewMode.DIVINE, label: '03_THEOLOGICAL_RECORD' },
            { mode: ViewMode.ECONOMY, label: '04_COMMERCE_LEDGER' },
            { mode: ViewMode.SOCIETY, label: '05_SOCIETAL_LEDGER' },
            { mode: ViewMode.STEEL, label: '06_DEFENSE_RECORDS' }
          ].map(nav => (
            <div 
              key={nav.mode} 
              onClick={() => !loading && onSetViewMode(nav.mode)} 
              className={`flex justify-between items-center py-4 border-b border-[#FF2C2C]/10 cursor-pointer font-black uppercase tracking-[0.1em] text-[10.5px] px-4 rounded-sm mono transition-all ${viewMode === nav.mode ? 'bg-[#121212] text-white scale-[1.02]' : 'text-[#121212] hover:bg-[#FF2C2C]/10'}`}
            >
              {nav.label} <span>{viewMode === nav.mode ? '→' : '+'}</span>
            </div>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <div className="space-y-px">
      {cities.map((city, index) => (
        <div 
          key={city.id} 
          onClick={() => onSelectCity(city.id)} 
          className={`group relative py-4 px-4 cursor-pointer transition-all border-l-2 ${selectedCityId === city.id ? 'bg-[#FF2C2C]/10 border-[#FF2C2C]' : 'border-transparent hover:bg-white/60 hover:border-[#FF2C2C]/30'}`}
        >
          <div className="flex items-start gap-4">
            <span className="text-[10px] font-black text-[#FF2C2C] mt-1 opacity-30 mono">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex-1 min-w-0 pr-8">
              <div className="text-[11px] font-black uppercase text-[#121212] truncate mono">{city.name}</div>
              <div className="text-[10px] text-[#121212] opacity-40 uppercase font-bold mt-1 truncate mono">{city.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
