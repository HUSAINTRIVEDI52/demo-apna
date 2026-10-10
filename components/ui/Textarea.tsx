'use client';

import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      rows = 3,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-ink-muted uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          ref={ref}
          className={twMerge(
            'w-full rounded-lg border bg-surface-light px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-light transition-all duration-200 focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-primary disabled:opacity-50 disabled:bg-surface-sage',
            error
              ? 'border-rose-600 focus:ring-rose-600 focus:border-rose-600'
              : 'border-ink-border hover:border-primary-light',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs text-rose-600 font-medium">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-ink-muted">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
