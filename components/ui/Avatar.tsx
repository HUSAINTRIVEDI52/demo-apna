'use client';

import React, { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ShieldCheck } from 'lucide-react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isVerified?: boolean;
}

export function Avatar({
  src,
  alt = 'Avatar',
  name = '',
  size = 'md',
  isVerified = false,
  className,
  ...props
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);

  const getInitials = (str: string) => {
    if (!str) return 'TH';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return str.slice(0, 2).toUpperCase();
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base font-medium',
    xl: 'w-20 h-20 text-xl font-bold',
  };

  const badgeSizeClasses = {
    sm: 'w-3 h-3 -bottom-0.5 -right-0.5',
    md: 'w-4 h-4 -bottom-0.5 -right-0.5',
    lg: 'w-5 h-5 bottom-0 right-0',
    xl: 'w-6 h-6 bottom-0.5 right-0.5',
  };

  return (
    <div className={twMerge('relative inline-block shrink-0', className)} {...props}>
      <div
        className={twMerge(
          'relative rounded-full overflow-hidden flex items-center justify-center font-serif font-bold bg-primary text-surface-light border-2 border-accent/40 shadow-xs select-none',
          sizeClasses[size]
        )}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt || name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>

      {isVerified && (
        <div
          className={twMerge(
            'absolute flex items-center justify-center rounded-full bg-surface-light text-accent-dark shadow-xs border border-accent/50',
            badgeSizeClasses[size]
          )}
          title="ITS Identity Verified"
        >
          <ShieldCheck className="w-full h-full text-accent-dark" />
        </div>
      )}
    </div>
  );
}
