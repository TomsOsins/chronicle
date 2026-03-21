import React from 'react';

// ─── TEXT INPUT ───
export const WField: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}> = ({ label, value, onChange, placeholder, required }) => (
  <div>
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block mb-2">{label}{required && <span className="text-[#FF2C2C]"> *</span>}</label>
    <input
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 p-3 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors"
      placeholder={placeholder}
    />
  </div>
);

// ─── TEXTAREA ───
export const WTextArea: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder, rows = 3 }) => (
  <div>
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block mb-2">{label}</label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      className="w-full bg-white/5 border border-white/10 p-3 text-[11px] font-bold text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors resize-none"
      placeholder={placeholder}
    />
  </div>
);

// ─── NUMBER INPUT ───
export const WNumber: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}> = ({ label, value, onChange, min = 0, max = 999999, suffix }) => (
  <div>
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block mb-2">{label}</label>
    <div className="flex items-center gap-2">
      <input
        type="number"
        value={value}
        onChange={e => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
        min={min}
        max={max}
        className="w-full bg-white/5 border border-white/10 p-3 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      {suffix && <span className="text-[10px] text-[#F4F1EA]/30 mono font-black uppercase shrink-0">{suffix}</span>}
    </div>
  </div>
);

// ─── SLIDER ───
export const WSlider: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
}> = ({ label, value, onChange, min = 0, max = 100, suffix = '' }) => (
  <div>
    <div className="flex justify-between items-center mb-2">
      <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono">{label}</label>
      <span className="text-[11px] font-black text-[#FF2C2C] mono">{value}{suffix}</span>
    </div>
    <div className="relative h-[14px] flex items-center">
      <div className="h-[3px] bg-white/10 rounded-full w-full">
        <div className="h-full bg-[#FF2C2C] rounded-full transition-all duration-150" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
      </div>
      <div className="absolute w-[10px] h-[10px] bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.4)] transition-all duration-150 pointer-events-none" style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 5px)` }} />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="absolute inset-0 w-full opacity-0 cursor-pointer"
      />
    </div>
  </div>
);

// ─── SELECT ───
export const WSelect: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}> = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#F4F1EA]/50 mono block mb-2">{label}</label>
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="w-full bg-white/5 border border-white/10 p-3 text-[11px] font-bold uppercase text-[#F4F1EA] focus:outline-none focus:border-[#FF2C2C] mono transition-colors cursor-pointer"
    >
      {options.map(o => <option key={o.value} value={o.value} className="bg-[#121212]">{o.label}</option>)}
    </select>
  </div>
);

// ─── SECTION HEADER ───
export const WSection: React.FC<{
  title: string;
  subtitle?: string;
  onRandomize?: () => void;
  children: React.ReactNode;
}> = ({ title, subtitle, onRandomize, children }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-center border-b border-[#FF2C2C]/20 pb-2">
      <div>
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#FF2C2C] mono">{title}</div>
        {subtitle && <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#F4F1EA]/30 mono mt-1">{subtitle}</div>}
      </div>
      {onRandomize && (
        <button
          type="button"
          onClick={onRandomize}
          className="flex items-center gap-2 px-3 py-1.5 border border-[#FF2C2C]/20 text-[10px] font-black uppercase text-[#FF2C2C]/60 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/50 hover:bg-[#FF2C2C]/5 mono transition-all"
          title="Randomize this section"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="2" y="2" width="8" height="8" rx="1.5" />
            <rect x="14" y="14" width="8" height="8" rx="1.5" />
            <circle cx="5" cy="5" r="0.5" fill="currentColor" />
            <circle cx="19" cy="17" r="0.5" fill="currentColor" />
            <circle cx="17" cy="19" r="0.5" fill="currentColor" />
          </svg>
          DICE
        </button>
      )}
    </div>
    {children}
  </div>
);

// ─── ARRAY ITEM WRAPPER ───
export const WArrayItem: React.FC<{
  index: number;
  onRemove: () => void;
  children: React.ReactNode;
}> = ({ index, onRemove, children }) => (
  <div className="relative border border-white/5 bg-white/[0.02] p-4 space-y-3 group">
    <div className="flex justify-between items-center mb-1">
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#FF2C2C]/30 mono">#{String(index + 1).padStart(2, '0')}</span>
      <button
        type="button"
        onClick={onRemove}
        className="text-[9px] font-black uppercase text-[#F4F1EA]/20 hover:text-[#FF2C2C] mono transition-colors"
      >
        [ REMOVE ]
      </button>
    </div>
    {children}
  </div>
);

// ─── ADD ITEM BUTTON ───
export const WAddButton: React.FC<{
  label: string;
  onClick: () => void;
}> = ({ label, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full py-3 border border-dashed border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-[#F4F1EA]/30 hover:text-[#FF2C2C] hover:border-[#FF2C2C]/30 mono transition-all"
  >
    + {label}
  </button>
);
