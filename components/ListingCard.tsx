'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Footprints,
  Utensils,
  ShieldCheck,
  BedDouble,
  Bath,
  Users,
  Check,
  Phone,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { HousingListing } from '@/lib/types';

interface ListingCardProps {
  listing: HousingListing;
  onSelect: (listing: HousingListing) => void;
  onContactHost: (listing: HousingListing) => void;
}

export function ListingCard({ listing, onSelect, onContactHost }: ListingCardProps) {
  const propertyTypeLabels: Record<string, string> = {
    pg: 'PG Accommodation',
    private_room: 'Private Room',
    shared_room: 'Shared Room',
    full_flat: 'Full Flat',
    short_stay: 'Short Stay',
  };

  const occupancyLabels: Record<string, { text: string; bg: string; textCol: string }> = {
    males_only: { text: 'Bhaiyo Only (Males)', bg: 'bg-blue-50 border-blue-200', textCol: 'text-blue-900' },
    females_only: { text: 'Baheno Only (Females)', bg: 'bg-rose-50 border-rose-200', textCol: 'text-rose-900' },
    family_only: { text: 'Family Only', bg: 'bg-emerald-50 border-emerald-200', textCol: 'text-emerald-900' },
    any: { text: 'Any Community Member', bg: 'bg-sage-50 border-sage-200', textCol: 'text-charcoal-main' },
  };

  const occ = occupancyLabels[listing.occupancyGender] || occupancyLabels.any;

  return (
    <div className="group bg-ivory-light rounded-2xl border border-sage-200/90 hover:border-gold-primary/50 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Image Container with Badges */}
        <Link href={`/rooms/${listing.id}`} className="relative aspect-16/10 w-full overflow-hidden bg-sage-200 block cursor-pointer">
          {listing.images && listing.images[0] ? (
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-sage-100 text-charcoal-muted">
              No photo available
            </div>
          )}

          {/* Gradient Overlay for badges contrast */}
          <div className="absolute inset-0 bg-linear-to-t from-charcoal-main/60 via-transparent to-black/20 pointer-events-none"></div>

          {/* Top badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className="px-2.5 py-1 rounded-md bg-emerald-900/90 backdrop-blur-md text-ivory-light text-xs font-semibold uppercase tracking-wider border border-emerald-700/60 shadow-xs">
              {propertyTypeLabels[listing.propertyType] || listing.propertyType}
            </span>
            {listing.featured && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-gold-primary text-emerald-950 text-xs font-bold shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>Featured</span>
              </span>
            )}
          </div>

          {/* Host ITS verification badge on image */}
          {listing.host.itsVerified && (
            <div className="absolute top-3 right-3 flex items-center space-x-1 px-2.5 py-1 rounded-md bg-ivory-light/95 backdrop-blur-md text-emerald-900 text-xs font-semibold border border-gold-muted shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
              <span>ITS Verified</span>
            </div>
          )}

          {/* Bottom on-image info: Rent price */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-ivory-light">
            <div>
              <div className="text-xs text-sage-100/90 font-medium">Monthly Rent</div>
              <div className="flex items-baseline space-x-1">
                <span className="font-serif text-2xl font-bold text-ivory-light drop-shadow-xs">
                  {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
                  {listing.pricing.monthlyRent.toLocaleString()}
                </span>
                <span className="text-xs text-sage-200">/ month</span>
              </div>
            </div>
            {listing.pricing.isNegotiable && (
              <span className="text-[11px] bg-emerald-800/80 backdrop-blur-xs px-2 py-0.5 rounded text-gold-light border border-gold-muted/40">
                Negotiable
              </span>
            )}
          </div>
        </Link>

        {/* Card Body */}
        <div className="p-4 sm:p-5 space-y-3.5">
          {/* Location & Title */}
          <div>
            <div className="flex items-center space-x-1 text-xs font-medium text-emerald-800 mb-1">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                {listing.location.mohallaOrArea}, {listing.location.city}
              </span>
            </div>
            <Link
              href={`/rooms/${listing.id}`}
              className="font-serif text-lg font-bold text-charcoal-main group-hover:text-emerald-900 transition-colors line-clamp-2 cursor-pointer leading-snug block"
            >
              {listing.title}
            </Link>
          </div>

          {/* Masjid Proximity Badge (Crucial Community Feature) */}
          <div className="flex items-center space-x-2 p-2.5 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-900">
            <Footprints className="w-4 h-4 text-emerald-800 shrink-0" />
            <div className="truncate">
              <span className="font-bold">{listing.masjidProximity.walkingMinutes} min walk</span> ({listing.masjidProximity.distanceMeters}m) to{' '}
              <span className="font-semibold text-emerald-950">{listing.masjidProximity.masjidName}</span>
            </div>
          </div>

          {/* Community Tags: Gender + FMB + Furnished */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium border ${occ.bg} ${occ.textCol}`}>
              {occ.text}
            </span>
            {listing.fmbFriendly && (
              <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-xs font-medium bg-gold-50 border border-gold-muted text-gold-dark">
                <Utensils className="w-3 h-3 text-gold-dark" />
                <span>FMB Thali Friendly</span>
              </span>
            )}
            <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-sage-100 border border-sage-200 text-charcoal-muted capitalize">
              {listing.furnishedStatus.replace('_', ' ')}
            </span>
          </div>

          {/* Key Specs summary */}
          <div className="grid grid-cols-3 gap-2 py-2 border-t border-b border-sage-200/80 text-center text-xs text-charcoal-muted">
            <div className="flex items-center justify-center space-x-1">
              <BedDouble className="w-3.5 h-3.5 text-emerald-800" />
              <span>{listing.bedrooms} Bed{listing.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Bath className="w-3.5 h-3.5 text-emerald-800" />
              <span>{listing.bathrooms} Bath</span>
            </div>
            <div className="flex items-center justify-center space-x-1">
              <Users className="w-3.5 h-3.5 text-emerald-800" />
              <span>Max {listing.maxOccupants}</span>
            </div>
          </div>

          {/* Host Info */}
          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-emerald-800 text-ivory-base font-serif font-bold flex items-center justify-center text-xs">
                {listing.host.fullName.charAt(0)}
              </div>
              <div className="truncate max-w-[140px]">
                <div className="font-semibold text-charcoal-main truncate">{listing.host.fullName}</div>
                <div className="text-[10px] text-charcoal-muted truncate">{listing.host.jamaat}</div>
              </div>
            </div>
            <div className="text-[11px] text-charcoal-muted">
              {listing.host.responseRate || 'Fast response'}
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA Buttons */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/rooms/${listing.id}`}
          className="w-full py-2 px-3 rounded-lg bg-sage-100 hover:bg-sage-200 text-emerald-900 font-semibold text-xs transition-colors text-center cursor-pointer border border-sage-200 block"
        >
          View Details
        </Link>
        <button
          type="button"
          onClick={() => onContactHost(listing)}
          className="w-full py-2 px-3 rounded-lg bg-emerald-900 hover:bg-emerald-800 text-ivory-light font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5 shadow-xs cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-gold-light" />
          <span>Connect</span>
        </button>
      </div>
    </div>
  );
}
