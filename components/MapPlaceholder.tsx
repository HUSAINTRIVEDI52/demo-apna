'use client';

import React from 'react';
import { MapPin, Navigation, ExternalLink, Footprints, Building2 } from 'lucide-react';
import { Button, Badge } from '@/components/ui';

interface MapPlaceholderProps {
  address: string;
  mohallaOrArea: string;
  city: string;
  masjidName: string;
  distanceMeters: number;
  walkingMinutes: number;
  lat?: number;
  lng?: number;
}

export function MapPlaceholder({
  address,
  mohallaOrArea,
  city,
  masjidName,
  distanceMeters,
  walkingMinutes,
  lat = 18.9562,
  lng = 72.8335,
}: MapPlaceholderProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${address}, ${mohallaOrArea}, ${city}`
  )}`;

  return (
    <div className="rounded-2xl border border-surface-sage-dark bg-surface-light overflow-hidden shadow-xs">
      {/* Visual Map Canvas Placeholder */}
      <div className="relative h-64 sm:h-72 w-full bg-surface-sage overflow-hidden flex items-center justify-center">
        {/* Stylized grid street lines */}
        <svg className="absolute inset-0 w-full h-full opacity-40" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#B2CCBC" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
          {/* Main Avenue diagonals */}
          <line x1="0" y1="50" x2="600" y2="250" stroke="#8EAFA0" strokeWidth="6" strokeLinecap="round" />
          <line x1="100" y1="0" x2="450" y2="300" stroke="#8EAFA0" strokeWidth="4" />
          <line x1="0" y1="200" x2="600" y2="100" stroke="#DFC074" strokeWidth="3" strokeDasharray="6 4" />
        </svg>

        {/* Proximity walking route dotted line */}
        <div className="absolute top-1/3 left-1/4 right-1/3 h-1 border-b-2 border-dashed border-accent-dark pointer-events-none"></div>

        {/* Accommodation Pin Marker */}
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
          <div className="px-2.5 py-1 rounded-md bg-primary text-surface-light text-[11px] font-bold shadow-md whitespace-nowrap mb-1 border border-accent/40">
            Property Location
          </div>
          <div className="w-8 h-8 rounded-full bg-primary text-accent flex items-center justify-center shadow-lg border-2 border-surface-light">
            <MapPin className="w-4 h-4 text-accent fill-accent/20" />
          </div>
        </div>

        {/* Masjid Marker */}
        <div className="absolute top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="px-2.5 py-1 rounded-md bg-accent-dark text-surface-light text-[10px] font-bold shadow-md whitespace-nowrap mb-1">
            🕌 {masjidName} ({walkingMinutes} min)
          </div>
          <div className="w-7 h-7 rounded-full bg-accent text-ink flex items-center justify-center shadow-lg border-2 border-surface-light">
            <Footprints className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Overlay Google Maps External Button */}
        <div className="absolute bottom-3 right-3">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-surface-light/95 backdrop-blur-md text-primary hover:text-primary-hover border border-surface-sage-dark text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            <span>Open in Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent-dark" />
          </a>
        </div>
      </div>

      {/* Location Details Info */}
      <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-light">
        <div>
          <div className="text-xs font-semibold text-primary flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-accent-dark" />
            <span>{address}</span>
          </div>
          <div className="text-xs text-ink-muted mt-0.5">
            {mohallaOrArea}, {city}
          </div>
        </div>
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-surface-sage border border-surface-sage-dark text-xs text-primary font-medium">
          <Footprints className="w-4 h-4 text-accent-dark" />
          <span>
            <strong className="font-bold">{walkingMinutes} mins walk</strong> ({distanceMeters}m) to {masjidName}
          </span>
        </div>
      </div>
    </div>
  );
}
