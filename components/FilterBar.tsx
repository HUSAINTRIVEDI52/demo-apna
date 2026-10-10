'use client';

import React from 'react';
import { Filter, SlidersHorizontal, Utensils, ShieldCheck, Footprints, RotateCcw } from 'lucide-react';
import { PropertyType, OccupancyGender, FurnishedStatus } from '@/lib/types';

interface FilterBarProps {
  propertyType: PropertyType | 'all';
  onPropertyTypeChange: (val: PropertyType | 'all') => void;
  occupancyGender: OccupancyGender | 'all';
  onOccupancyChange: (val: OccupancyGender | 'all') => void;
  furnishedStatus: FurnishedStatus | 'all';
  onFurnishedChange: (val: FurnishedStatus | 'all') => void;
  fmbOnly: boolean;
  onFmbToggle: (val: boolean) => void;
  itsVerifiedOnly: boolean;
  onItsToggle: (val: boolean) => void;
  maxWalkingMinutes: number;
  onWalkingMinutesChange: (val: number) => void;
  onResetFilters: () => void;
  totalResultsCount: number;
}

export function FilterBar({
  propertyType,
  onPropertyTypeChange,
  occupancyGender,
  onOccupancyChange,
  furnishedStatus,
  onFurnishedChange,
  fmbOnly,
  onFmbToggle,
  itsVerifiedOnly,
  onItsToggle,
  maxWalkingMinutes,
  onWalkingMinutesChange,
  onResetFilters,
  totalResultsCount,
}: FilterBarProps) {
  return (
    <div className="bg-ivory-light rounded-xl border border-sage-200 p-4 shadow-xs">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Top title & summary */}
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-900" />
          <span className="font-serif text-lg font-bold text-emerald-900">
            Filter Stays
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
            {totalResultsCount} {totalResultsCount === 1 ? 'Stay' : 'Stays'} Available
          </span>
        </div>

        {/* Quick Toggles */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {/* FMB Toggle */}
          <button
            type="button"
            onClick={() => onFmbToggle(!fmbOnly)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg border font-medium transition-all cursor-pointer ${
              fmbOnly
                ? 'bg-emerald-900 text-ivory-base border-emerald-900 shadow-xs'
                : 'bg-sage-50 text-charcoal-main border-sage-200 hover:border-emerald-800'
            }`}
          >
            <Utensils className={`w-3.5 h-3.5 ${fmbOnly ? 'text-gold-light' : 'text-emerald-800'}`} />
            <span>FMB Thali Friendly</span>
          </button>

          {/* ITS Verified Host */}
          <button
            type="button"
            onClick={() => onItsToggle(!itsVerifiedOnly)}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg border font-medium transition-all cursor-pointer ${
              itsVerifiedOnly
                ? 'bg-emerald-900 text-ivory-base border-emerald-900 shadow-xs'
                : 'bg-sage-50 text-charcoal-main border-sage-200 hover:border-emerald-800'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${itsVerifiedOnly ? 'text-gold-light' : 'text-emerald-800'}`} />
            <span>ITS Verified Hosts</span>
          </button>

          {/* Walking distance filter dropdown */}
          <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-sage-50 border border-sage-200 rounded-lg">
            <Footprints className="w-3.5 h-3.5 text-emerald-800" />
            <span className="text-charcoal-muted">Masjid Walk:</span>
            <select
              value={maxWalkingMinutes}
              onChange={(e) => onWalkingMinutesChange(Number(e.target.value))}
              className="bg-transparent font-semibold text-emerald-900 focus:outline-hidden cursor-pointer"
              aria-label="Max Walking Distance to Masjid"
            >
              <option value={30}>Any Distance</option>
              <option value={3}>&lt; 3 mins walk</option>
              <option value={5}>&lt; 5 mins walk</option>
              <option value={10}>&lt; 10 mins walk</option>
              <option value={15}>&lt; 15 mins walk</option>
            </select>
          </div>

          {/* Reset Filters */}
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center space-x-1 px-3 py-2 text-charcoal-muted hover:text-emerald-900 transition-colors text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
