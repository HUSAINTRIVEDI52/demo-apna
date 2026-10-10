'use client';

import React, { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface TabsContextValue {
  value: string;
  onValueChange: (val: string) => void;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (val: string) => void;
}

export function Tabs({
  defaultValue = '',
  value: controlledValue,
  onValueChange: controlledOnChange,
  children,
  className,
  ...props
}: TabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const currentVal = isControlled ? controlledValue : uncontrolledValue;

  const handleValChange = (newVal: string) => {
    if (!isControlled) {
      setUncontrolledValue(newVal);
    }
    controlledOnChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value: currentVal, onValueChange: handleValChange }}>
      <div className={twMerge('w-full space-y-4', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export function TabsList({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        'inline-flex items-center p-1 rounded-xl bg-surface-sage border border-surface-sage-dark text-ink-muted',
        className
      )}
      role="tablist"
      {...props}
    >
      {children}
    </div>
  );
}

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function TabsTrigger({
  value,
  children,
  className,
  ...props
}: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within <Tabs>');

  const isSelected = context.value === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      onClick={() => context.onValueChange(value)}
      className={twMerge(
        'px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer select-none',
        isSelected
          ? 'bg-surface-light text-primary shadow-xs font-bold border border-ink-border/60'
          : 'text-ink-muted hover:text-primary hover:bg-surface-sage-dark/40',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabsContent({
  value,
  children,
  className,
  ...props
}: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within <Tabs>');

  if (context.value !== value) return null;

  return (
    <div
      role="tabpanel"
      className={twMerge('animate-in fade-in-50 duration-200', className)}
      {...props}
    >
      {children}
    </div>
  );
}
