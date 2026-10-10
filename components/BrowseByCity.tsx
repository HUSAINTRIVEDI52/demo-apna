'use client';

import React from 'react';
import { MOCK_CITY_HUBS, CityHub } from '@/lib/mock-data';
import { MapPin, ArrowRight, Building } from 'lucide-react';
import { Badge } from '@/components/ui';

interface BrowseByCityProps {
  onSelectCity: (city: string) => void;
}

export function BrowseByCity({ onSelectCity }: BrowseByCityProps) {
  return (
    <section id="cities" className="py-16 bg-surface-light border-t border-b border-surface-sage-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-surface-sage text-primary text-xs font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5 text-accent-dark" />
              <span>Key Community Hubs</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
              Browse by City & Mohalla
            </h2>
            <p className="text-sm text-ink-muted max-w-xl">
              Discover verified accommodations situated in heartlands of Dawoodi Bohra community life across major cities.
            </p>
          </div>
          <button
            onClick={() => onSelectCity('All Cities')}
            className="inline-flex items-center space-x-1 text-xs font-semibold text-primary hover:text-accent-dark transition-colors cursor-pointer"
          >
            <span>View all cities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* City Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CITY_HUBS.map((hub) => (
            <div
              key={hub.city}
              onClick={() => onSelectCity(hub.city)}
              className="group relative rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-surface-sage-dark bg-surface cursor-pointer flex flex-col justify-between"
            >
              {/* Image backdrop */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-surface-sage">
                <img
                  src={hub.imageUrl}
                  alt={hub.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary-dark/90 via-primary-dark/40 to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-md bg-surface-light/95 backdrop-blur-md text-primary font-bold text-xs shadow-xs">
                    {hub.listingCount} Stays
                  </span>
                </div>

                {/* Bottom on-image text */}
                <div className="absolute bottom-3 left-3 right-3 text-surface-light">
                  <h3 className="font-serif text-2xl font-bold tracking-tight text-surface-light">
                    {hub.city}
                  </h3>
                  <p className="text-xs text-accent-surface flex items-center space-x-1 mt-0.5">
                    <Building className="w-3.5 h-3.5 text-accent" />
                    <span>{hub.highlight}</span>
                  </p>
                </div>
              </div>

              {/* Mohalla Tags */}
              <div className="p-4 bg-surface-light space-y-2 border-t border-surface-sage-dark/60">
                <div className="text-[11px] font-semibold text-ink-muted uppercase">
                  Popular Mohallas & Markaz:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {hub.popularAreas.map((area) => (
                    <span
                      key={area}
                      className="px-2 py-0.5 rounded-md bg-surface-sage text-ink text-xs group-hover:bg-accent-surface group-hover:text-accent-dark transition-colors"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
