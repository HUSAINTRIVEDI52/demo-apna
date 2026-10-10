'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      description,
      checked,
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <label
        htmlFor={checkboxId}
        className={twMerge(
          'flex items-start space-x-3 cursor-pointer select-none group',
          className
        )}
      >
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            id={checkboxId}
            type="checkbox"
            ref={ref}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div className="w-5 h-5 rounded-md border-2 border-ink-border bg-surface-light peer-checked:bg-primary peer-checked:border-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 transition-all duration-150 group-hover:border-primary">
            <Check className="w-3.5 h-3.5 text-surface-light opacity-0 peer-checked:opacity-100 mx-auto my-0.5 transition-opacity" />
          </div>
        </div>
        {(label || description) && (
          <div className="space-y-0.5">
            {label && (
              <span className="text-sm font-medium text-ink group-hover:text-primary transition-colors">
                {label}
              </span>
            )}
            {description && (
              <p className="text-xs text-ink-muted leading-normal">
                {description}
              </p>
            )}
          </div>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
