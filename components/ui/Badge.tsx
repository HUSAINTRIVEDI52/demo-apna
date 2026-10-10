'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'accent' | 'surface' | 'sage' | 'outline' | 'success' | 'warning';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
}

export function Badge({
  children,
  className,
  variant = 'primary',
  size = 'md',
  icon,
  ...props
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center font-medium rounded-full tracking-wide';

  const variants = {
    primary: 'bg-primary text-surface-light border border-primary-light/40',
    accent: 'bg-accent-surface text-accent-dark border border-accent/40 font-semibold',
    surface: 'bg-surface-light text-ink border border-ink-border',
    sage: 'bg-surface-sage text-primary border border-surface-sage-dark',
    outline: 'bg-transparent text-ink border border-ink-border',
    success: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
    warning: 'bg-amber-100 text-amber-900 border border-amber-300',
  };

  const sizes = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={twMerge(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
