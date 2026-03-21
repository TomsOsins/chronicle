import React, { useEffect, useState } from 'react';

interface DataPanelProps {
  label: string;
  value: string | number;
  chartHeights: number[];
  color?: string;
  delay?: number;
}

export const DataPanel: React.FC<DataPanelProps> = ({ label, value, chartHeights, color = 'bg-[#FF2C2C]', delay = 0 }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100 + delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="border border-white/10 p-4 bg-transparent hover:border-[#FF2C2C]/30 transition-colors animate-border-pulse relative overflow-hidden">
      <span className="text-[10px] uppercase mb-2 block font-black tracking-[0.3em] text-[#FF2C2C]/75 mono">
        {label}
      </span>
      <div className="text-xl font-black uppercase tracking-tight text-[#F4F1EA] mono">
        {value}
      </div>
      <div className="h-8 flex items-end gap-[2px] mt-3">
        {chartHeights.map((height, idx) => (
          <div
            key={idx}
            className={`w-full ${color} opacity-30 transition-all ease-out`}
            style={{
              height: animated ? `${Math.min(height, 100)}%` : '0%',
              transitionDuration: `${600 + idx * 80}ms`,
              transitionDelay: `${delay + idx * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
