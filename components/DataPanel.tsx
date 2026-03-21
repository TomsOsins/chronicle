import React from 'react';

interface DataPanelProps {
  label: string;
  value: string | number;
  chartHeights: number[];
  color?: string;
}

export const DataPanel: React.FC<DataPanelProps> = ({ label, value, chartHeights, color = 'bg-[#FF2C2C]' }) => {
  return (
    <div className="border border-[#FF2C2C]/30 p-6 bg-transparent">
      <span className="text-[14px] uppercase mb-4 block font-black tracking-[0.2em] text-[#FF2C2C]">
        {label}
      </span>
      <div className="text-3xl font-black uppercase tracking-tighter text-[#F4F1EA]">
        {value}
      </div>
      <div className="h-12 flex items-end gap-1 mt-6">
        {chartHeights.map((height, idx) => (
          <div
            key={idx}
            className={`w-full ${color} opacity-20 transition-all duration-500`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  );
};