'use client';

import React from 'react';
import {
  MOCK_COMMUNITY_CITIES,
  MOCK_AMENITIES_LIST,
} from '@/lib/mock-data';
import { PropertyType, OccupancyGender, FurnishedStatus } from '@/lib/types';
import {
  Button,
  Input,
  Select,
  Checkbox,
  Badge,
} from '@/components/ui';
import {
  SlidersHorizontal,
  RotateCcw,
  Footprints,
  Utensils,
  ShieldCheck,
  MapPin,
  Calendar,
  DollarSign,
  X,
} from 'lucide-react';

export interface RoomsFilterState {
  city: string;
  mohalla: string;
  propertyTypes: PropertyType[];
  occupancyGender: OccupancyGender[];
  furnishedStatus: FurnishedStatus[];
  minRent: number;
  maxRent: number;
  fmbOnly: boolean;
  itsVerifiedOnly: boolean;
  maxDistanceKm: number; // in km
  amenities: string[];
  availableFrom: string;
}

interface RoomsFilterSidebarProps {
  filters: RoomsFilterState;
  onChange: (newFilters: RoomsFilterState) => void;
  onReset: () => void;
  totalResults: number;
  isMobileDrawer?: boolean;
  onCloseMobileDrawer?: () => void;
}

export function RoomsFilterSidebar({
  filters,
  onChange,
  onReset,
  totalResults,
  isMobileDrawer = false,
  onCloseMobileDrawer,
}: RoomsFilterSidebarProps) {
  const togglePropertyType = (type: PropertyType) => {
    const exists = filters.propertyTypes.includes(type);
    const updated = exists
      ? filters.propertyTypes.filter((t) => t !== type)
      : [...filters.propertyTypes, type];
    onChange({ ...filters, propertyTypes: updated });
  };

  const toggleOccupancy = (occ: OccupancyGender) => {
    const exists = filters.occupancyGender.includes(occ);
    const updated = exists
      ? filters.occupancyGender.filter((o) => o !== occ)
      : [...filters.occupancyGender, occ];
    onChange({ ...filters, occupancyGender: updated });
  };

  const toggleFurnished = (furn: FurnishedStatus) => {
    const exists = filters.furnishedStatus.includes(furn);
    const updated = exists
      ? filters.furnishedStatus.filter((f) => f !== furn)
      : [...filters.furnishedStatus, furn];
    onChange({ ...filters, furnishedStatus: updated });
  };

  const toggleAmenity = (id: string) => {
    const exists = filters.amenities.includes(id);
    const updated = exists
      ? filters.amenities.filter((a) => a !== id)
      : [...filters.amenities, id];
    onChange({ ...filters, amenities: updated });
  };

  return (
    <aside
      className={`bg-surface-light rounded-2xl border border-surface-sage-dark shadow-xs flex flex-col ${
        isMobileDrawer ? 'h-full' : 'sticky top-24'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-5 border-b border-surface-sage-dark/60">
        <div className="flex items-center space-x-2">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <h3 className="font-serif text-lg font-bold text-primary">
            Filter Listings
          </h3>
          <Badge variant="sage" size="sm">
            {totalResults}
          </Badge>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={onReset}
            className="text-xs text-ink-muted hover:text-primary transition-colors flex items-center space-x-1 cursor-pointer"
            title="Reset filters"
          >
            <RotateCcw className="w-3 h-3" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          {isMobileDrawer && (
            <button
              onClick={onCloseMobileDrawer}
              className="p-1.5 rounded-lg text-ink-muted hover:text-primary hover:bg-surface-sage"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Filters Content */}
      <div className="overflow-y-auto p-5 space-y-6 flex-1 text-xs">
        {/* 1. City & Mohalla */}
        <div className="space-y-3">
          <label className="block font-serif font-bold text-sm text-primary">
            1. City & Mohalla
          </label>
          <div className="space-y-2">
            <Select
              label="Select City"
              value={filters.city}
              onChange={(e) => onChange({ ...filters, city: e.target.value })}
              options={MOCK_COMMUNITY_CITIES.map((c) => ({ value: c, label: c }))}
            />
            <Input
              label="Area / Mohalla / Landmark"
              placeholder="e.g. Bhendi Bazaar, Zampa..."
              value={filters.mohalla}
              onChange={(e) => onChange({ ...filters, mohalla: e.target.value })}
              leftIcon={<MapPin className="w-3.5 h-3.5" />}
            />
          </div>
        </div>

        {/* 2. Monthly Rent Range */}
        <div className="space-y-3 pt-3 border-t border-surface-sage-dark/40">
          <div className="flex items-center justify-between">
            <label className="font-serif font-bold text-sm text-primary">
              2. Monthly Rent (INR / local)
            </label>
            <span className="font-mono font-bold text-accent-dark">
              Up to ₹{filters.maxRent.toLocaleString()}
            </span>
          </div>

          <input
            type="range"
            min={4000}
            max={75000}
            step={1000}
            value={filters.maxRent}
            onChange={(e) => onChange({ ...filters, maxRent: Number(e.target.value) })}
            className="w-full accent-primary cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-ink-muted">
            <span>Min: ₹4,000</span>
            <span>Max: ₹75,000+</span>
          </div>
        </div>

        {/* 3. Room / Property Type */}
        <div className="space-y-2.5 pt-3 border-t border-surface-sage-dark/40">
          <label className="block font-serif font-bold text-sm text-primary">
            3. Room Type
          </label>
          <div className="space-y-2">
            {[
              { id: 'pg' as PropertyType, label: 'PG Accommodation' },
              { id: 'private_room' as PropertyType, label: 'Private Room' },
              { id: 'shared_room' as PropertyType, label: 'Shared Flat / Room' },
              { id: 'full_flat' as PropertyType, label: 'Full Independent Flat' },
              { id: 'short_stay' as PropertyType, label: 'Short Stay (Visiting)' },
            ].map((pt) => (
              <Checkbox
                key={pt.id}
                label={pt.label}
                checked={filters.propertyTypes.includes(pt.id)}
                onChange={() => togglePropertyType(pt.id)}
              />
            ))}
          </div>
        </div>

        {/* 4. Available For / Occupancy Preference */}
        <div className="space-y-2.5 pt-3 border-t border-surface-sage-dark/40">
          <label className="block font-serif font-bold text-sm text-primary">
            4. Available For (Occupancy)
          </label>
          <div className="space-y-2">
            {[
              { id: 'males_only' as OccupancyGender, label: 'Bhaiyo Only (Males)' },
              { id: 'females_only' as OccupancyGender, label: 'Baheno Only (Females)' },
              { id: 'family_only' as OccupancyGender, label: 'Mumin Family Only' },
            ].map((occ) => (
              <Checkbox
                key={occ.id}
                label={occ.label}
                checked={filters.occupancyGender.includes(occ.id)}
                onChange={() => toggleOccupancy(occ.id)}
              />
            ))}
          </div>
        </div>

        {/* 5. Proximity to Masjid / Jamaat Khana */}
        <div className="space-y-3 pt-3 border-t border-surface-sage-dark/40">
          <div className="flex items-center justify-between">
            <label className="font-serif font-bold text-sm text-primary flex items-center space-x-1">
              <Footprints className="w-3.5 h-3.5 text-accent-dark" />
              <span>5. Max Masjid Distance</span>
            </label>
            <span className="font-bold text-accent-dark">
              {filters.maxDistanceKm >= 5 ? 'Any Distance' : `< ${filters.maxDistanceKm} km`}
            </span>
          </div>

          <input
            type="range"
            min={0.3}
            max={5.0}
            step={0.2}
            value={filters.maxDistanceKm}
            onChange={(e) => onChange({ ...filters, maxDistanceKm: parseFloat(e.target.value) })}
            className="w-full accent-primary cursor-pointer"
          />

          <div className="flex justify-between text-[11px] text-ink-muted">
            <span>&lt; 300m (3 mins)</span>
            <span>&lt; 1 km</span>
            <span>5 km+</span>
          </div>
        </div>

        {/* 6. Food & Community Preferences */}
        <div className="space-y-2.5 pt-3 border-t border-surface-sage-dark/40">
          <label className="block font-serif font-bold text-sm text-primary">
            6. Food & Trust Tags
          </label>
          <div className="space-y-2">
            <Checkbox
              label="Faizul Mawaid (FMB) Friendly"
              description="Convenient tiffin delivery drop-off"
              checked={filters.fmbOnly}
              onChange={(e) => onChange({ ...filters, fmbOnly: e.target.checked })}
            />
            <Checkbox
              label="ITS Verified Hosts Only"
              description="Host has verified community identity"
              checked={filters.itsVerifiedOnly}
              onChange={(e) => onChange({ ...filters, itsVerifiedOnly: e.target.checked })}
            />
          </div>
        </div>

        {/* 7. Furnished Status */}
        <div className="space-y-2.5 pt-3 border-t border-surface-sage-dark/40">
          <label className="block font-serif font-bold text-sm text-primary">
            7. Furnished Status
          </label>
          <div className="space-y-2">
            {[
              { id: 'fully_furnished' as FurnishedStatus, label: 'Fully Furnished' },
              { id: 'semi_furnished' as FurnishedStatus, label: 'Semi Furnished' },
              { id: 'unfurnished' as FurnishedStatus, label: 'Unfurnished' },
            ].map((f) => (
              <Checkbox
                key={f.id}
                label={f.label}
                checked={filters.furnishedStatus.includes(f.id)}
                onChange={() => toggleFurnished(f.id)}
              />
            ))}
          </div>
        </div>

        {/* 8. Available-From Date */}
        <div className="space-y-2.5 pt-3 border-t border-surface-sage-dark/40">
          <label className="block font-serif font-bold text-sm text-primary">
            8. Available From Date
          </label>
          <Input
            type="date"
            value={filters.availableFrom}
            onChange={(e) => onChange({ ...filters, availableFrom: e.target.value })}
            leftIcon={<Calendar className="w-3.5 h-3.5" />}
          />
        </div>

        {/* 9. Amenities Multi-Select */}
        <div className="space-y-2.5 pt-3 border-t border-surface-sage-dark/40">
          <label className="block font-serif font-bold text-sm text-primary">
            9. Specific Amenities
          </label>
          <div className="grid grid-cols-1 gap-2">
            {MOCK_AMENITIES_LIST.slice(0, 8).map((amenity) => (
              <Checkbox
                key={amenity.id}
                label={amenity.name}
                checked={filters.amenities.includes(amenity.id)}
                onChange={() => toggleAmenity(amenity.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Apply Action */}
      {isMobileDrawer && (
        <div className="p-4 border-t border-surface-sage-dark bg-surface-light">
          <Button
            variant="primary"
            className="w-full"
            onClick={onCloseMobileDrawer}
          >
            Show {totalResults} Results
          </Button>
        </div>
      )}
    </aside>
  );
}
