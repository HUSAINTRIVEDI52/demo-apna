'use client';

import React from 'react';
import { Search, MapPin, Building2, Users, Banknote, Sparkles } from 'lucide-react';
import { MOCK_COMMUNITY_CITIES, MOCK_STATS } from '@/lib/mock-data';
import { PropertyType, OccupancyGender } from '@/lib/types';
import { PatternBackground } from '@/components/ui';

interface HeroSectionProps {
  selectedCity: string;
  onCityChange: (city: string) => void;
  selectedPropertyType: PropertyType | 'all';
  onPropertyTypeChange: (type: PropertyType | 'all') => void;
  selectedOccupancy: OccupancyGender | 'all';
  onOccupancyChange: (occupancy: OccupancyGender | 'all') => void;
  maxRent: number;
  onMaxRentChange: (rent: number) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSearchSubmit: () => void;
}

export function HeroSection({
  selectedCity,
  onCityChange,
  selectedPropertyType,
  onPropertyTypeChange,
  selectedOccupancy,
  onOccupancyChange,
  maxRent,
  onMaxRentChange,
  searchQuery,
  onSearchQueryChange,
  onSearchSubmit,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-surface-light pt-16 pb-20 md:pt-20 md:pb-28 border-b-2 border-accent/40 bg-islamic-emerald-pattern">
      {/* Decorative radial lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-light/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Community Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-dark/90 border border-accent/40 backdrop-blur-md shadow-inner text-accent text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Dawoodi Bohra Community Accommodation Network</span>
          </div>
        </div>

        {/* Heading & Subheading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-surface-light leading-tight">
            Find Your Home Away from Home Near <span className="text-accent italic font-normal">Masjid & Markaz</span>
          </h1>
          <p className="text-base sm:text-lg text-surface-sage/90 font-light leading-relaxed max-w-2xl mx-auto">
            A trusted, respectful housing portal for mumineen. Browse verified PG rooms, shared flats, and community-friendly spaces worldwide.
          </p>
        </div>

        {/* Search & Filter Bar Card */}
        <div className="mt-10 max-w-5xl mx-auto bg-surface-light text-ink rounded-2xl p-4 sm:p-6 shadow-2xl border border-accent/40">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-end"
          >
            {/* City / Area Selector */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">
                City / Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <select
                  value={selectedCity}
                  onChange={(e) => onCityChange(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-sage border border-surface-sage-dark rounded-lg text-sm text-ink font-medium focus:ring-2 focus:ring-primary focus:outline-hidden cursor-pointer"
                  aria-label="Filter by City"
                >
                  {MOCK_COMMUNITY_CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Room / Property Type */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">
                Room / Property Type
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <select
                  value={selectedPropertyType}
                  onChange={(e) => onPropertyTypeChange(e.target.value as PropertyType | 'all')}
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-sage border border-surface-sage-dark rounded-lg text-sm text-ink font-medium focus:ring-2 focus:ring-primary focus:outline-hidden cursor-pointer"
                  aria-label="Property Type"
                >
                  <option value="all">All Room Types</option>
                  <option value="pg">PG (Paying Guest)</option>
                  <option value="private_room">Private Room</option>
                  <option value="shared_room">Shared Room</option>
                  <option value="full_flat">Full Flat</option>
                  <option value="short_stay">Short Stay</option>
                </select>
              </div>
            </div>

            {/* Budget / Max Rent */}
            <div className="lg:col-span-3">
              <label className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-1">
                Max Budget / Rent
              </label>
              <div className="relative">
                <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
                <select
                  value={maxRent}
                  onChange={(e) => onMaxRentChange(Number(e.target.value))}
                  className="w-full pl-9 pr-4 py-2.5 bg-surface-sage border border-surface-sage-dark rounded-lg text-sm text-ink font-medium focus:ring-2 focus:ring-primary focus:outline-hidden cursor-pointer"
                  aria-label="Max Budget"
                >
                  <option value={100000}>Any Budget</option>
                  <option value={8000}>Under ₹8,000 / mo</option>
                  <option value={12000}>Under ₹12,000 / mo</option>
                  <option value={16000}>Under ₹16,000 / mo</option>
                  <option value={20000}>Under ₹20,000 / mo</option>
                  <option value={30000}>Under ₹30,000 / mo</option>
                </select>
              </div>
            </div>

            {/* Search Action Button */}
            <div className="lg:col-span-3">
              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-2.5 px-6 rounded-lg bg-accent hover:bg-accent-dark text-ink font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer border border-accent-dark/30"
              >
                <Search className="w-4 h-4 text-ink" />
                <span>Search Rooms</span>
              </button>
            </div>
          </form>

          {/* Quick Mohalla Badges */}
          <div className="mt-4 pt-4 border-t border-surface-sage-dark/80 flex flex-wrap items-center gap-2 text-xs text-ink-muted">
            <span className="font-semibold text-primary">Popular Mohallas:</span>
            {['Bhendi Bazaar (SBUT)', 'Marol Saifee Park', 'Surat Zampa Bazaar', 'Indore Saifee Nagar', 'Dubai Al Nahda', 'Pune Kothrud'].map((mohalla) => (
              <button
                key={mohalla}
                type="button"
                onClick={() => {
                  onSearchQueryChange(mohalla.split(' ')[0]);
                  onSearchSubmit();
                }}
                className="px-2.5 py-1 rounded-full bg-surface-sage hover:bg-accent-surface hover:text-accent-dark hover:border-accent/40 border border-transparent transition-all cursor-pointer"
              >
                {mohalla}
              </button>
            ))}
          </div>
        </div>

        {/* Live Trust Metrics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {MOCK_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-primary-dark/60 border border-primary-light/30 backdrop-blur-xs text-center"
            >
              <div className="font-serif text-2xl sm:text-3xl font-bold text-accent">
                {stat.value}
              </div>
              <div className="text-xs text-surface-sage/90 font-normal mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
