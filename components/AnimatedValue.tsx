import React, { useEffect, useState, useRef } from 'react';

// Animated number counter
export const AnimatedNumber: React.FC<{
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}> = ({ value, duration = 1200, suffix = '', className = '' }) => {
  const [display, setDisplay] = useState(0);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>(0);

  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;

  useEffect(() => {
    startRef.current = null;
    const animate = (time: number) => {
      if (!startRef.current) startRef.current = time;
      const progress = Math.min((time - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setDisplay(Math.round(eased * safeValue));
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [safeValue, duration]);

  return <span className={className}>{display}{suffix}</span>;
};

// Bar that fills from 0 on mount
export const AnimatedBar: React.FC<{
  value: number;
  max?: number;
  color?: string;
  colorHex?: string;
  height?: string;
  delay?: number;
}> = ({ value, max = 100, color, colorHex, height = 'h-2', delay = 0 }) => {
  const [width, setWidth] = useState(0);
  const safeValue = typeof value === 'number' && !isNaN(value) ? value : 0;
  const pct = (safeValue / max) * 100;
  const barColor = colorHex ? '' : (color || (safeValue / max > 0.7 ? 'bg-[#88E788]' : safeValue / max > 0.4 ? 'bg-[#FFB800]' : 'bg-[#FF2C2C]'));

  useEffect(() => {
    const timer = setTimeout(() => setWidth(pct), 50 + delay);
    return () => clearTimeout(timer);
  }, [pct, delay]);

  return (
    <div className={`${height} bg-white/5 overflow-hidden`}>
      <div
        className={`h-full ${barColor} transition-all duration-1000 ease-out`}
        style={{ width: `${width}%`, ...(colorHex ? { backgroundColor: colorHex } : {}) }}
      />
    </div>
  );
};

// Scan line effect
export const ScanLine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
    <div
      className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2C2C]/20 to-transparent"
      style={{ animation: 'scanDown 4s linear infinite' }}
    />
  </div>
);

// Staggered fade-in for lists
export const StaggeredItem: React.FC<{
  index: number;
  children: React.ReactNode;
  className?: string;
}> = ({ index, children, className = '' }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 80);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${className}`}
    >
      {children}
    </div>
  );
};
