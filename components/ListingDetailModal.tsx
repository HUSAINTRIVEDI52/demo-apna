'use client';

import React, { useState } from 'react';
import {
  X,
  MapPin,
  Footprints,
  Utensils,
  ShieldCheck,
  BedDouble,
  Bath,
  Users,
  Calendar,
  CheckCircle2,
  Phone,
  MessageCircle,
  Share2,
  Info,
  Building,
  Check,
} from 'lucide-react';
import { HousingListing } from '@/lib/types';
import { MOCK_AMENITIES_LIST } from '@/lib/mock-data';

interface ListingDetailModalProps {
  listing: HousingListing | null;
  isOpen: boolean;
  onClose: () => void;
  onContactHost: (listing: HousingListing) => void;
}

export function ListingDetailModal({
  listing,
  isOpen,
  onClose,
  onContactHost,
}: ListingDetailModalProps) {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen || !listing) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '#' + listing.slug);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto bg-charcoal-main/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-ivory-light rounded-2xl shadow-2xl border border-gold-muted/40 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-ivory-light/95 backdrop-blur-md border-b border-sage-200">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-900 text-ivory-base uppercase tracking-wider">
              {listing.propertyType.replace('_', ' ')}
            </span>
            {listing.host.itsVerified && (
              <span className="inline-flex items-center space-x-1 text-xs font-medium px-2.5 py-1 rounded-full bg-gold-surface text-gold-dark border border-gold-muted">
                <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                <span>ITS Verified Lister</span>
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg text-charcoal-muted hover:text-emerald-900 hover:bg-sage-100 transition-colors"
              title="Share listing link"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-800" /> : <Share2 className="w-5 h-5" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-charcoal-muted hover:text-emerald-900 hover:bg-sage-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative aspect-16/9 w-full rounded-xl overflow-hidden bg-sage-200 shadow-inner">
              <img
                src={listing.images[activeImageIdx] || listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover"
              />
            </div>
            {listing.images.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1">
                {listing.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                      activeImageIdx === idx ? 'border-gold-primary scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title, Pricing & Location */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-sage-200">
            <div>
              <div className="flex items-center space-x-1.5 text-sm font-medium text-emerald-800 mb-1">
                <MapPin className="w-4 h-4" />
                <span>
                  {listing.location.address}, {listing.location.mohallaOrArea}, {listing.location.city}
                </span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-main leading-snug">
                {listing.title}
              </h2>
              {listing.location.landmark && (
                <p className="text-xs text-charcoal-muted mt-1">
                  <span className="font-semibold text-emerald-900">Landmark:</span> {listing.location.landmark}
                </p>
              )}
            </div>

            {/* Rent & Deposit badge */}
            <div className="bg-sage-50 border border-sage-200 rounded-xl p-4 min-w-[220px] text-right shrink-0">
              <div className="text-xs text-charcoal-muted font-medium">Monthly Rent</div>
              <div className="font-serif text-3xl font-bold text-emerald-900">
                {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
                {listing.pricing.monthlyRent.toLocaleString()}
              </div>
              <div className="text-xs text-charcoal-muted mt-1">
                Deposit: {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
                {listing.pricing.securityDeposit.toLocaleString()}
              </div>
              {listing.pricing.electricityIncluded && (
                <div className="text-[11px] text-emerald-800 font-medium mt-0.5">
                  ✓ Electricity & water included
                </div>
              )}
            </div>
          </div>

          {/* Masjid Proximity Highlight (Major focal point) */}
          <div className="p-4 rounded-xl bg-emerald-900 text-ivory-base flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gold-primary/20 border border-gold-primary/40 flex items-center justify-center shrink-0">
                <Footprints className="w-5 h-5 text-gold-light" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gold-light font-semibold">
                  Masjid & Markaz Distance
                </div>
                <div className="text-sm font-semibold">
                  {listing.masjidProximity.masjidName}
                </div>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="inline-block px-3 py-1 rounded-full bg-gold-primary text-emerald-950 font-bold text-xs">
                {listing.masjidProximity.walkingMinutes} min walk ({listing.masjidProximity.distanceMeters}m)
              </span>
            </div>
          </div>

          {/* Overview Grid */}
          <div>
            <h3 className="font-serif text-lg font-bold text-emerald-900 mb-3">Key Details</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-center">
                <Users className="w-4 h-4 mx-auto text-emerald-800 mb-1" />
                <div className="text-[11px] text-charcoal-muted">Occupancy</div>
                <div className="text-xs font-bold text-charcoal-main capitalize">
                  {listing.occupancyGender.replace('_', ' ')}
                </div>
              </div>
              <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-center">
                <BedDouble className="w-4 h-4 mx-auto text-emerald-800 mb-1" />
                <div className="text-[11px] text-charcoal-muted">Bedrooms</div>
                <div className="text-xs font-bold text-charcoal-main">
                  {listing.bedrooms} Room{listing.bedrooms > 1 ? 's' : ''}
                </div>
              </div>
              <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-center">
                <Bath className="w-4 h-4 mx-auto text-emerald-800 mb-1" />
                <div className="text-[11px] text-charcoal-muted">Bathrooms</div>
                <div className="text-xs font-bold text-charcoal-main">
                  {listing.bathrooms} Bath
                </div>
              </div>
              <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-center">
                <Calendar className="w-4 h-4 mx-auto text-emerald-800 mb-1" />
                <div className="text-[11px] text-charcoal-muted">Available From</div>
                <div className="text-xs font-bold text-charcoal-main">
                  {listing.availableFrom}
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-serif text-lg font-bold text-emerald-900 mb-2">Description</h3>
            <p className="text-sm text-charcoal-main/90 leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>

          {/* Amenities */}
          <div>
            <h3 className="font-serif text-lg font-bold text-emerald-900 mb-3">Amenities & Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {listing.amenities.map((amenityId) => {
                const amenityObj = MOCK_AMENITIES_LIST.find((a) => a.id === amenityId);
                return (
                  <div
                    key={amenityId}
                    className="flex items-center space-x-2 p-2.5 rounded-lg bg-sage-50 border border-sage-200 text-xs font-medium text-charcoal-main"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />
                    <span>{amenityObj ? amenityObj.name : amenityId}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* House / Community Rules */}
          {listing.rules && listing.rules.length > 0 && (
            <div className="p-4 rounded-xl bg-gold-50/70 border border-gold-muted/60">
              <h3 className="font-serif text-base font-bold text-gold-dark mb-2 flex items-center space-x-1.5">
                <Info className="w-4 h-4 text-gold-dark" />
                <span>House Rules & Community Expectations</span>
              </h3>
              <ul className="space-y-1 text-xs text-charcoal-main">
                {listing.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start space-x-2">
                    <span className="text-gold-dark font-bold">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Host Card */}
          <div className="p-4 rounded-xl bg-sage-50 border border-sage-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 text-left w-full">
              <div className="w-12 h-12 rounded-full bg-emerald-900 text-gold-light font-serif font-bold text-lg flex items-center justify-center shrink-0 border border-gold-muted">
                {listing.host.fullName.charAt(0)}
              </div>
              <div>
                <div className="font-serif font-bold text-base text-charcoal-main">
                  {listing.host.fullName}
                </div>
                <div className="text-xs text-charcoal-muted">
                  Jamaat: <span className="font-medium text-emerald-900">{listing.host.jamaat}</span>
                </div>
                <div className="text-[11px] text-emerald-800 flex items-center space-x-1 mt-0.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-gold-dark" />
                  <span>ITS Verified Host • Member since {listing.host.joinedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="sticky bottom-0 z-20 flex items-center justify-between px-6 py-4 bg-ivory-light/95 backdrop-blur-md border-t border-sage-200">
          <div>
            <div className="text-xs text-charcoal-muted">Total Monthly Rent</div>
            <div className="font-serif text-xl font-bold text-emerald-900">
              {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
              {listing.pricing.monthlyRent.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onContactHost(listing)}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-ivory-base font-semibold text-sm shadow-md transition-all active:scale-95 cursor-pointer border border-gold-primary/30"
            >
              <MessageCircle className="w-4 h-4 text-gold-light" />
              <span>Contact Host on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
