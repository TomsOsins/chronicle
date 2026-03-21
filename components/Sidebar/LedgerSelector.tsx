
import React from 'react';
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
  return (
    <div className="relative mt-20 border-y border-[#121212] py-3 group z-20">
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
          <span className="text-[10px] transition-transform duration-300 transform group-hover:translate-y-0.5 opacity-40">▼</span>
        </div>
      </div>
      
      {isOpen && (
        <div className="absolute top-[calc(100%+1px)] left-0 w-full bg-[#F4F1EA] border-2 border-[#121212] z-[50] max-h-56 overflow-y-auto shadow-2xl">
          {ledgers.map(l => (
            <div 
              key={l.id} 
              onClick={() => onSelect(l.id)} 
              className={`p-3 text-[11px] font-black uppercase cursor-pointer border-b border-black/5 hover:bg-[#FF2C2C] hover:text-white flex justify-between items-center ${l.id === activeLedger?.id ? 'bg-[#121212] text-white' : 'text-[#121212]'}`}
            >
              <span className="truncate">{l.name}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(l); }} 
                className="text-[9.5px] font-black bg-white text-[#FF2C2C] px-2 py-1"
              >
                PURGE
              </button>
            </div>
          ))}
          <div 
            onClick={onNew} 
            className="p-4 text-[11px] font-black uppercase cursor-pointer bg-[#FF2C2C] text-white text-center hover:bg-[#121212]"
          >
            + NEW LEDGER
          </div>
        </div>
      )}
    </div>
  );
};
