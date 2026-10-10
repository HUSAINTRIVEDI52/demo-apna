'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface PatternBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  opacity?: number;
  color?: string; // hex or CSS color
  patternType?: 'stars' | 'lattice' | 'arabesque';
  className?: string;
  children?: React.ReactNode;
}

export function PatternBackground({
  opacity = 0.08,
  color = '#C9A24B',
  patternType = 'stars',
  className,
  children,
  ...props
}: PatternBackgroundProps) {
  // 8-point geometric star pattern
  const starPatternSvg = (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="islamic-star-pattern"
          width="64"
          height="64"
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={color} strokeWidth="1.2">
            {/* Central 8-Point Star */}
            <polygon points="32,16 36,26 47,22 42,32 52,36 42,42 47,52 36,47 32,58 28,47 17,52 22,42 12,36 22,32 17,22 28,26" />
            {/* Connecting Lattice lines */}
            <line x1="0" y1="0" x2="32" y2="16" />
            <line x1="64" y1="0" x2="32" y2="16" />
            <line x1="64" y1="64" x2="32" y2="48" />
            <line x1="0" y1="64" x2="32" y2="48" />
            {/* Outer interlacing squares */}
            <rect x="20" y="20" width="24" height="24" transform="rotate(45 32 32)" strokeDasharray="3 3" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
    </svg>
  );

  const latticePatternSvg = (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id="islamic-lattice-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M0 20 L20 0 L40 20 L20 40 Z M20 10 L30 20 L20 30 L10 20 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#islamic-lattice-pattern)" />
    </svg>
  );

  return (
    <div className={twMerge('relative overflow-hidden', className)} {...props}>
      {patternType === 'stars' ? starPatternSvg : latticePatternSvg}
      {children}
    </div>
  );
}
