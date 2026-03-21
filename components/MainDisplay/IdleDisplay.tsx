
import React from 'react';

export const IdleDisplay: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* 1. Rotating HUD Rings */}
      <div className="relative flex items-center justify-center">
        {/* Outer Ring (Slow) */}
        <div className="absolute w-[800px] h-[800px] border border-white/[0.05] rounded-full animate-[spin_60s_linear_infinite]" />

        {/* Dashed Ring (Counter-rotate) */}
        <div className="absolute w-[650px] h-[650px] border border-dashed border-[#FF2C2C]/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

        {/* Inner Tracking Ring */}
        <div className="absolute w-[450px] h-[450px] border-2 border-t-[#FF2C2C]/20 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-[spin_10s_linear_infinite]" />

        {/* 2. Central Text */}
        <div className="relative z-10 text-center">
          <div className="six-caps text-[14rem] text-[#666666] opacity-25 uppercase tracking-[0.1em] leading-[0.85]">
            REALM<br />UNCHARTED
          </div>
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="h-[1px] w-20 bg-[#FF2C2C]/30" />
            <div className="mono text-[11px] font-black text-[#FF2C2C] tracking-[0.5em] uppercase opacity-60">
              Standing by for Lore Inscription
            </div>
            <div className="h-[1px] w-20 bg-[#FF2C2C]/30" />
          </div>
        </div>
      </div>

      {/* 3. Corner HUD Elements */}

      {/* Top Left: Sync Status */}
      <div className="absolute top-10 left-10 text-left">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-[#FF2C2C] rounded-full animate-ping" />
          <div className="mono text-[11px] font-black text-[#FF2C2C] uppercase tracking-widest">Archive: Ready</div>
        </div>
        <div className="mono text-[9px] text-white/40 uppercase tracking-tighter">
          CHRON_SYNC: ACTIVE<br />
          LOCAL_RESONANCE: STABLE
        </div>
      </div>

      {/* Top Right: Coordinate Stream */}
      <div className="absolute top-10 right-10 text-right">
        <div className="mono text-[11px] font-black text-[#FF2C2C] uppercase tracking-widest mb-1">Survey_Scan</div>
        <div className="mono text-[9px] text-white/40 uppercase tracking-tighter tabular-nums">
          LAT: 00.000000<br />
          LNG: 00.000000<br />
          ELV: --.---
        </div>
      </div>

      {/* Bottom Left: Process Codes */}
      <div className="absolute bottom-10 left-10 opacity-50">
        <div className="mono text-[9px] text-white/60 space-y-1">
          <div>[ ARCHIVE_ID: CODEX_V3.0 ]</div>
          <div>[ AUTH_ROLE: SENIOR_ARCHIVIST ]</div>
          <div>[ SOURCE: ETERNAL_LIBRARY ]</div>
        </div>
      </div>

    </div>
  );
};
