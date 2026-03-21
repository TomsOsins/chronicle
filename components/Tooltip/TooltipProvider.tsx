import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';
import { DEFINITIONS, TermDefinition } from './definitions';

interface TooltipState {
  visible: boolean;
  term: TermDefinition | null;
  x: number;
  y: number;
}

interface TooltipContextValue {
  show: (termKey: string, x: number, y: number) => void;
  hide: () => void;
}

const TooltipContext = createContext<TooltipContextValue>({ show: () => {}, hide: () => {} });
export const useTooltip = () => useContext(TooltipContext);

const CATEGORY_COLORS: Record<string, string> = {
  GEOPOLITICAL: '#4A9EFF',
  COMMERCE:     '#FFB800',
  ARCANE:       '#C77DFF',
  THEOLOGY:     '#FF6B9D',
  URBAN:        '#00D4AA',
  INTELLIGENCE: '#FF8C42',
  SOCIETY:      '#88E788',
  DEFENSE:      '#FF2C2C',
  STATUS:       '#F4F1EA',
};

export const TooltipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, term: null, x: 0, y: 0 });
  const hideTimer = useRef<number | null>(null);

  const show = useCallback((termKey: string, x: number, y: number) => {
    const term = DEFINITIONS[termKey];
    if (!term) return;
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setTooltip({ visible: true, term, x, y });
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = window.setTimeout(() => {
      setTooltip(prev => ({ ...prev, visible: false }));
    }, 120);
  }, []);

  // Position the tooltip so it doesn't overflow the viewport
  const PADDING = 16;
  const W = 280;
  const H = 180; // estimated max height

  let left = tooltip.x + 14;
  let top = tooltip.y + 14;

  if (left + W + PADDING > window.innerWidth) left = tooltip.x - W - 14;
  if (top + H + PADDING > window.innerHeight) top = tooltip.y - H - 14;
  if (left < PADDING) left = PADDING;
  if (top < PADDING) top = PADDING;

  const catColor = tooltip.term ? (CATEGORY_COLORS[tooltip.term.category] ?? '#FF2C2C') : '#FF2C2C';

  return (
    <TooltipContext.Provider value={{ show, hide }}>
      {children}

      {tooltip.visible && tooltip.term && (
        <div
          className="fixed z-[500] pointer-events-none"
          style={{ left, top }}
        >
          <div
            className="w-[280px] bg-[#0D0D0D] border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.8)] animate-tooltip-in"
            style={{ borderTop: `2px solid ${catColor}` }}
          >
            {/* header */}
            <div className="px-4 pt-3 pb-2 border-b border-white/5">
              <div className="text-[8px] font-black uppercase tracking-[0.35em] mb-1" style={{ color: catColor }}>
                {tooltip.term.category}
              </div>
              <div className="text-[13px] font-black uppercase text-[#F4F1EA] mono leading-tight">
                {tooltip.term.title}
              </div>
            </div>

            {/* body */}
            <div className="px-4 py-3 space-y-2">
              <p className="text-[11px] text-[#F4F1EA]/70 leading-[1.6] inter">
                {tooltip.term.description}
              </p>
              {tooltip.term.note && (
                <div className="flex gap-2 pt-1 border-t border-white/5">
                  <span className="text-[8px] font-black uppercase text-[#FF2C2C]/60 mono mt-0.5 shrink-0">NOTE</span>
                  <p className="text-[10px] text-[#F4F1EA]/40 leading-[1.5] inter italic">{tooltip.term.note}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </TooltipContext.Provider>
  );
};
