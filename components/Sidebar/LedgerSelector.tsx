import React, { useEffect, useRef } from 'react';
import { Ledger } from '../../types';

interface LedgerSelectorProps {
  ledgers: Ledger[];
  activeLedger: Ledger | null;
  isOpen: boolean;
  loading: boolean;
  onToggle: () => void;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (ledger: Ledger) => void;
}

export const LedgerSelector: React.FC<LedgerSelectorProps> = ({
  ledgers,
  activeLedger,
  isOpen,
  loading,
  onToggle,
  onSelect,
  onNew,
  onDelete
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onToggle]);

  return (
    <div ref={containerRef} className="relative mt-20 border-y border-[#121212] py-3 group z-20">
      <div
        onClick={() => !loading && onToggle()}
        className="flex justify-between items-center cursor-pointer px-0"
      >
        <div className="flex-1 truncate text-left">
          <span className="text-[11px] font-black uppercase tracking-widest text-[#FF2C2C] block mono">
            {activeLedger ? activeLedger.name : 'NO ACTIVE LEDGER'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase text-[#121212] opacity-60 mono">
            {activeLedger ? `${activeLedger.era} // C${activeLedger.cycle}` : 'INIT'}
          </span>
          <span className={`text-[10px] transition-transform duration-300 transform opacity-40 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-[calc(100%+1px)] left-[-40px] w-[calc(100%+80px)] bg-[#121212] border border-white/10 z-[50] max-h-64 overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="px-4 py-2 border-b border-white/5">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/25 mono">Active Ledgers</span>
          </div>

          {ledgers.map(l => {
            const isActive = l.id === activeLedger?.id;
            return (
              <div
                key={l.id}
                onClick={() => onSelect(l.id)}
                className={`px-4 py-3 cursor-pointer border-b border-white/5 flex justify-between items-center transition-colors ${isActive ? 'bg-[#FF2C2C]/10' : 'hover:bg-white/5'}`}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <div className="flex items-center gap-2">
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#FF2C2C] shrink-0" />}
                    <span className={`text-[11px] font-black uppercase mono truncate ${isActive ? 'text-[#FF2C2C]' : 'text-[#F4F1EA]'}`}>{l.name}</span>
                  </div>
                  <span className={`text-[9px] font-bold uppercase mono mt-0.5 block text-[#F4F1EA]/30 ${isActive ? 'ml-[14px]' : ''}`}>
                    {l.era} // CYCLE {l.cycle}
                  </span>
                </div>
                {ledgers.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); onDelete(l); }}
                    className="text-[9px] font-black uppercase mono px-2 py-1 transition-colors shrink-0 text-[#F4F1EA]/15 hover:text-[#FF2C2C] hover:bg-white/5"
                  >
                    PURGE
                  </button>
                )}
              </div>
            );
          })}

          <div
            onClick={onNew}
            className="px-4 py-3 text-[11px] font-black uppercase cursor-pointer bg-[#FF2C2C] text-white text-center hover:bg-[#FF2C2C]/80 transition-colors mono tracking-[0.2em]"
          >
            + NEW LEDGER
          </div>
        </div>
      )}
    </div>
  );
};
