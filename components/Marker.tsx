import React from 'react';

interface MarkerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
}

export const Marker: React.FC<MarkerProps> = ({ position }) => {
  const positionClasses = {
    'tl': 'top-6 left-6',
    'tr': 'top-6 right-6',
    'bl': 'bottom-6 left-6',
    'br': 'bottom-6 right-6'
  };

  return (
    <div className={`absolute w-5 h-5 flex items-center justify-center pointer-events-none ${positionClasses[position]}`}>
      <div className="absolute w-full h-[1.5px] bg-[#FF2C2C] opacity-60" />
      <div className="absolute h-full w-[1.5px] bg-[#FF2C2C] opacity-60" />
    </div>
  );
};