import React from 'react';
import { CarColor } from '@/types';

interface CarSilhouetteProps {
  color: CarColor;
  plateValue: string;
  className?: string;
}

const COLOR_MAP: Record<CarColor, string> = {
  red: '#EF4444',
  blue: '#3B82F6',
  green: '#22C55E',
  yellow: '#EAB308',
  orange: '#F97316',
  purple: '#A855F7',
  white: '#F5F5F5',
  black: '#1F2937',
};

export const CarSilhouette: React.FC<CarSilhouetteProps> = ({ color, plateValue, className = '' }) => {
  const carColor = COLOR_MAP[color];
  const isLight = color === 'white' || color === 'yellow';

  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
        <defs>
          <linearGradient id={`carGradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="50%" stopColor={carColor} stopOpacity="1" />
            <stop offset="70%" stopColor={carColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#111" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2c3e50" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {/* Main Body - Wider & Lower */}
        {/* Roof */}
        <path d="M70 60 Q150 45 230 60 L245 90 Q150 85 55 90 Z" fill={carColor} />
        {/* Rear Window */}
        <path d="M75 65 Q150 55 225 65 L235 85 Q150 80 65 85 Z" fill="url(#glassGradient)" opacity="1" />
        {/* Lower Body */}
        <path d="M20 90 Q150 80 280 90 L280 145 Q280 165 260 165 L40 165 Q20 165 20 145 Z" fill={`url(#carGradient-${color})`} />
        {/* Trunk line */}
        <path d="M75 90 Q150 100 225 90" stroke="#000" strokeOpacity="0.1" strokeWidth="1" fill="none" />
        {/* Tail Lights - Modern Strip Style or Wide */}
        <path d="M30 105 L70 105 L65 125 L35 125 Z" fill="#990000" />
        <path d="M32 107 L68 107 L64 123 L36 123 Z" fill="#ff0000" /> {/* Glow */}
        <path d="M230 105 L270 105 L265 125 L235 125 Z" fill="#990000" />
        <path d="M232 107 L268 107 L264 123 L236 123 Z" fill="#ff0000" /> {/* Glow */}
        {/* Bumper Section */}
        <path d="M30 150 Q150 155 270 150 L260 165 L40 165 Z" fill="#1a1a1a" />
        {/* Tires with Rims */}
        {/* Left Tire */}
        <g transform="translate(35, 155)">
          <rect width="25" height="20" rx="4" fill="#111" />
          {/* Tread pattern hint */}
          <path d="M2 2 H23 M2 5 H23 M2 8 H23 M2 11 H23" stroke="#222" strokeWidth="1" />
          {/* Hub/Rim */}
          <rect x="5" y="15" width="15" height="3" fill="#111" />
        </g>
        {/* Right Tire */}
        <g transform="translate(240, 155)">
          <rect width="25" height="20" rx="4" fill="#111" />
          <path d="M2 2 H23 M2 5 H23 M2 8 H23 M2 11 H23" stroke="#222" strokeWidth="1" />
          <rect x="5" y="15" width="15" height="3" fill="#111" />
        </g>
        {/* Exhausts */}
        <circle cx="60" cy="158" r="6" fill="#333" stroke="#999" strokeWidth="2" />
        <circle cx="240" cy="158" r="6" fill="#333" stroke="#999" strokeWidth="2" />
        {/* Plate Area (Recessed) */}
        <rect x="90" y="115" width="120" height="35" rx="2" fill="#000" fillOpacity="0.2" />
      </svg>

      {/* License plate overlay */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-white border-2 border-black rounded shadow-sm font-display font-bold text-black tracking-wider uppercase whitespace-nowrap"
        style={{
          bottom: '18%',
          height: '60px',
          width: 'auto',
          minWidth: '100px',
          padding: '0 10px',
          fontSize: plateValue.length > 7 ? '2rem' : plateValue.length > 5 ? '2rem' : '2rem',
        }}
      >
        {plateValue || '•••••'}
      </div>
    </div>
  );
};

export default CarSilhouette;
