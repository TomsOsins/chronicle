import React, { useState } from 'react';
import { useTooltip } from './TooltipProvider';

interface TooltipProps {
  termKey: string;
  children: React.ReactNode;
  className?: string;
}

/** Wraps any element — hovering shows the tooltip for the given termKey */
export const Tooltip: React.FC<TooltipProps> = ({ termKey, children, className }) => {
  const { show, hide } = useTooltip();

  return (
    <span
      className={className}
      onMouseEnter={e => show(termKey, e.clientX, e.clientY)}
      onMouseMove={e => show(termKey, e.clientX, e.clientY)}
      onMouseLeave={hide}
    >
      {children}
    </span>
  );
};

/** A labeled section header with a built-in tooltip indicator */
export const TipLabel: React.FC<{
  termKey: string;
  children: React.ReactNode;
  className?: string;
}> = ({ termKey, children, className }) => {
  const { show, hide } = useTooltip();
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className={`inline-flex items-center gap-1.5 cursor-help ${className ?? ''}`}
      onMouseEnter={e => { setHovered(true); show(termKey, e.clientX, e.clientY); }}
      onMouseMove={e => show(termKey, e.clientX, e.clientY)}
      onMouseLeave={() => { setHovered(false); hide(); }}
    >
      {children}
      <svg width="12" height="12" viewBox="0 0 12 12" style={{ display: 'inline', verticalAlign: 'middle', flexShrink: 0 }}>
        <circle
          cx="6" cy="6" r="5.5"
          fill="none"
          stroke={hovered ? 'rgba(255,44,44,0.7)' : 'rgba(255,44,44,0.3)'}
          strokeWidth="1"
          style={{ transition: 'stroke 0.15s' }}
        />
        <text
          x="6" y="6"
          textAnchor="middle"
          dominantBaseline="central"
          fill={hovered ? 'rgba(255,44,44,0.8)' : 'rgba(255,44,44,0.4)'}
          fontSize="7"
          fontFamily="JetBrains Mono, monospace"
          style={{ transition: 'fill 0.15s' }}
        >?</text>
      </svg>
    </span>
  );
};
