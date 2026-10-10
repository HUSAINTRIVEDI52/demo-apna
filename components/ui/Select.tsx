'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  leftIcon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      options,
      children,
      leftIcon,
      id,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-xs font-semibold text-ink-muted uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-ink-muted">
              {leftIcon}
            </div>
          )}
          <select
            id={selectId}
            ref={ref}
            className={twMerge(
              'w-full appearance-none rounded-lg border bg-surface-light px-3.5 py-2.5 text-sm text-ink transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:bg-surface-sage cursor-pointer pr-10',
              leftIcon ? 'pl-10' : 'pl-3.5',
              error
                ? 'border-rose-600 focus:ring-rose-600 focus:border-rose-600'
                : 'border-ink-border hover:border-primary-light',
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                    {opt.label}
                  </option>
                ))
              : children}
          </select>
          <div className="absolute right-3.5 flex items-center pointer-events-none text-ink-muted">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error ? (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-ink-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Select.displayName = 'Select';
