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
      <span
        style={{
          fontSize: '10px',
          fontWeight: 900,
          color: hovered ? 'rgba(255,44,44,0.8)' : 'rgba(255,44,44,0.4)',
          transition: 'color 0.15s',
          lineHeight: 1,
          flexShrink: 0,
        }}
      >?</span>
    </span>
  );
};
