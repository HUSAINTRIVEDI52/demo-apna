'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { LightboxModal } from '@/components/LightboxModal';
import { InquiryModal } from '@/components/InquiryModal';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { ListingCard } from '@/components/ListingCard';
import { AuthModal } from '@/components/AuthModal';
import { ListPropertyModal } from '@/components/ListPropertyModal';
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Avatar,
  PatternBackground,
} from '@/components/ui';
import { MOCK_HOUSING_LISTINGS, MOCK_AMENITIES_LIST } from '@/lib/mock-data';
import { HousingListing } from '@/lib/types';
import {
  MapPin,
  Footprints,
  Utensils,
  ShieldCheck,
  BedDouble,
  Bath,
  Users,
  Calendar,
  Heart,
  Share2,
  Check,
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
  Info,
  Clock,
  Building,
  Train,
  ShoppingBag,
  Image as ImageIcon,
} from 'lucide-react';

interface RoomDetailClientProps {
  listing: HousingListing;
}

export function RoomDetailClient({ listing }: RoomDetailClientProps) {
  // Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  // Inquiry Modal State
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryType, setInquiryType] = useState<'message' | 'callback'>('message');

  // Shortlist / Save State
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Global Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [listModalOpen, setListModalOpen] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleOpenInquiry = (type: 'message' | 'callback') => {
    setInquiryType(type);
    setInquiryModalOpen(true);
  };

  // Similar listings in the same city or property type
  const similarListings = MOCK_HOUSING_LISTINGS.filter(
    (l) => l.id !== listing.id && (l.location.city === listing.location.city || l.propertyType === listing.propertyType)
  ).slice(0, 3);

  const nearbyPlaces = [
    {
      type: 'Masjid',
      name: listing.masjidProximity.masjidName,
      distance: `${listing.masjidProximity.walkingMinutes} min walk (${listing.masjidProximity.distanceMeters}m)`,
      icon: Footprints,
    },
    {
      type: 'Jamaat Khana',
      name: `${listing.location.city} Anjuman-e-Shiate Ali Jamaat Office`,
      distance: 'Within 10 mins walk / auto',
      icon: Building,
    },
    {
      type: 'Public Transit',
      name: `Nearest Metro / Local Railway Station (${listing.location.mohallaOrArea})`,
      distance: '6 - 8 mins commute',
      icon: Train,
    },
    {
      type: 'Halal Bazaar',
      name: 'Community Market & Bohra Grocery Stores',
      distance: '3 - 5 mins walk',
      icon: ShoppingBag,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Navbar */}
      <Navbar
        onOpenListModal={() => setListModalOpen(true)}
        onOpenAuthModal={(mode) => {
          setAuthMode(mode);
          setAuthModalOpen(true);
        }}
      />

      {/* Breadcrumbs & Top Actions Bar */}
      <div className="bg-surface-light border-b border-surface-sage-dark py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          {/* Breadcrumb Links */}
          <div className="flex items-center space-x-2 text-ink-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/rooms" className="hover:text-primary transition-colors">
              Rooms
            </Link>
            <span>/</span>
            <span className="text-primary font-semibold truncate max-w-[180px] sm:max-w-xs">
              {listing.location.city} ({listing.location.mohallaOrArea})
            </span>
          </div>

          {/* Share & Save Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-surface-sage hover:bg-surface-sage-dark text-ink text-xs font-semibold transition-colors cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-3.5 h-3.5 text-primary" />
                  <span>Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                isSaved
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-surface-sage hover:bg-surface-sage-dark text-ink border-transparent'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-rose-600 text-rose-600' : 'text-ink-muted'}`} />
              <span className="hidden sm:inline">{isSaved ? 'Shortlisted' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* 1. IMAGE GALLERY WITH LIGHTBOX TRIGGER */}
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-[360px] sm:h-[450px]">
            {/* Main Featured Photo */}
            <div
              onClick={() => {
                setActivePhotoIdx(0);
                setLightboxOpen(true);
              }}
              className="md:col-span-8 relative rounded-2xl overflow-hidden bg-surface-sage cursor-pointer group shadow-sm"
            >
              <img
                src={listing.images[0]}
                alt={listing.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Badges on main image */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <Badge variant="primary" size="md">
                  {listing.propertyType.replace('_', ' ')}
                </Badge>
                {listing.featured && (
                  <Badge variant="accent" size="md" icon={<Sparkles className="w-3 h-3 text-emerald-950" />}>
                    Featured Stay
                  </Badge>
                )}
              </div>

              <div className="absolute bottom-4 left-4 text-surface-light">
                <div className="text-xs text-accent font-medium">Click photo to open full gallery</div>
              </div>
            </div>

            {/* Sub-thumbnails (2 on right) */}
            <div className="hidden md:grid md:col-span-4 grid-rows-2 gap-3 h-full">
              {listing.images.slice(1, 3).map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActivePhotoIdx(idx + 1);
                    setLightboxOpen(true);
                  }}
                  className="relative rounded-2xl overflow-hidden bg-surface-sage cursor-pointer group shadow-sm h-full"
                >
                  <img
                    src={img}
                    alt={`Photo ${idx + 2}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {idx === 1 && listing.images.length > 3 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-surface-light font-bold text-sm">
                      +{listing.images.length - 2} More Photos
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Thumbnail Strip & View All Photos button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 overflow-x-auto pb-1">
              {listing.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActivePhotoIdx(idx);
                    setLightboxOpen(true);
                  }}
                  className="relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 border-surface-sage-dark hover:border-accent transition-all cursor-pointer"
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setActivePhotoIdx(0);
                setLightboxOpen(true);
              }}
              leftIcon={<ImageIcon className="w-4 h-4 text-primary" />}
            >
              View All Photos ({listing.images.length})
            </Button>
          </div>
        </div>

        {/* 2. MAIN LAYOUT: LEFT CONTENT (8 cols) + RIGHT STICKY CONNECT (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title & Location Header */}
            <div className="space-y-2 pb-6 border-b border-surface-sage-dark">
              <div className="flex items-center space-x-2 text-xs font-semibold text-primary">
                <MapPin className="w-4 h-4 text-accent-dark" />
                <span>
                  {listing.location.address}, {listing.location.mohallaOrArea}, {listing.location.city}
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight">
                {listing.title}
              </h1>
              {listing.location.landmark && (
                <p className="text-xs text-ink-muted">
                  <strong className="text-primary font-semibold">Landmark:</strong> {listing.location.landmark}
                </p>
              )}
            </div>

            {/* Masjid Proximity Highlight Card */}
            <div className="p-5 rounded-2xl bg-primary text-surface-light flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md bg-islamic-emerald-pattern border border-accent/40">
              <div className="flex items-center space-x-3.5">
                <div className="w-12 h-12 rounded-xl bg-primary-dark/80 border border-accent/40 flex items-center justify-center shrink-0">
                  <Footprints className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-accent font-semibold">
                    Masjid & Markaz Distance
                  </div>
                  <div className="text-base font-bold text-surface-light">
                    {listing.masjidProximity.masjidName}
                  </div>
                </div>
              </div>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-ink font-bold text-xs shadow-xs">
                  {listing.masjidProximity.walkingMinutes} min walk ({listing.masjidProximity.distanceMeters}m)
                </span>
              </div>
            </div>

            {/* Key Specs Bar */}
            <div>
              <h3 className="font-serif text-lg font-bold text-primary mb-3">Room Specifications</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 bg-surface-light rounded-xl border border-surface-sage-dark text-center">
                  <Users className="w-4 h-4 mx-auto text-primary mb-1" />
                  <div className="text-[11px] text-ink-muted">Occupancy</div>
                  <div className="text-xs font-bold text-ink capitalize">
                    {listing.occupancyGender.replace('_', ' ')}
                  </div>
                </div>
                <div className="p-3.5 bg-surface-light rounded-xl border border-surface-sage-dark text-center">
                  <BedDouble className="w-4 h-4 mx-auto text-primary mb-1" />
                  <div className="text-[11px] text-ink-muted">Bedrooms</div>
                  <div className="text-xs font-bold text-ink">
                    {listing.bedrooms} Bedroom{listing.bedrooms > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="p-3.5 bg-surface-light rounded-xl border border-surface-sage-dark text-center">
                  <Bath className="w-4 h-4 mx-auto text-primary mb-1" />
                  <div className="text-[11px] text-ink-muted">Washrooms</div>
                  <div className="text-xs font-bold text-ink">
                    {listing.bathrooms} Washroom{listing.bathrooms > 1 ? 's' : ''}
                  </div>
                </div>
                <div className="p-3.5 bg-surface-light rounded-xl border border-surface-sage-dark text-center">
                  <Calendar className="w-4 h-4 mx-auto text-primary mb-1" />
                  <div className="text-[11px] text-ink-muted">Available From</div>
                  <div className="text-xs font-bold text-ink">
                    {listing.availableFrom}
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-primary">Overview & Description</h3>
              <p className="text-sm text-ink/90 leading-relaxed whitespace-pre-line bg-surface-light p-5 rounded-2xl border border-surface-sage-dark">
                {listing.description}
              </p>
            </div>

            {/* Food & Thaali Information */}
            <div className="p-5 rounded-2xl bg-accent-surface border border-accent/50 space-y-3">
              <div className="flex items-center space-x-2">
                <Utensils className="w-5 h-5 text-accent-dark" />
                <h3 className="font-serif text-lg font-bold text-accent-dark">
                  Food & Faizul Mawaid (FMB) Thaali Logistics
                </h3>
              </div>
              <p className="text-xs text-ink leading-relaxed">
                {listing.fmbFriendly ? (
                  <>
                    ✓ <strong>FMB Thali Friendly:</strong> This property is fully suitable for daily community tiffin delivery. Dedicated space provided for tiffin pickup and dish washing in adherence to community hygiene standards.
                  </>
                ) : (
                  <>
                    Self-cooking kitchen access available. Please consult with the host regarding local FMB thali center pickup routes.
                  </>
                )}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-primary">Amenities & Facilities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {listing.amenities.map((amenityId) => {
                  const amenityObj = MOCK_AMENITIES_LIST.find((a) => a.id === amenityId);
                  return (
                    <div
                      key={amenityId}
                      className="flex items-center space-x-2 p-3 rounded-xl bg-surface-light border border-surface-sage-dark text-xs font-medium text-ink shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{amenityObj ? amenityObj.name : amenityId}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* House Rules */}
            {listing.rules && listing.rules.length > 0 && (
              <div className="space-y-3">
                <h3 className="font-serif text-xl font-bold text-primary flex items-center space-x-2">
                  <Info className="w-4 h-4 text-accent-dark" />
                  <span>House Decorum & Community Rules</span>
                </h3>
                <div className="bg-surface-light rounded-2xl border border-surface-sage-dark p-5 space-y-2 text-xs text-ink">
                  {listing.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-dark mt-1.5 shrink-0" />
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Places List */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-primary">
                Nearby Community Centers & Transport
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {nearbyPlaces.map((place, idx) => {
                  const Icon = place.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-surface-light border border-surface-sage-dark flex items-start space-x-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-surface-sage text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-ink">{place.name}</div>
                        <div className="text-[11px] text-primary font-medium mt-0.5">
                          {place.distance}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="space-y-3">
              <h3 className="font-serif text-xl font-bold text-primary">Location Map</h3>
              <MapPlaceholder
                address={listing.location.address}
                mohallaOrArea={listing.location.mohallaOrArea}
                city={listing.location.city}
                masjidName={listing.masjidProximity.masjidName}
                distanceMeters={listing.masjidProximity.distanceMeters}
                walkingMinutes={listing.masjidProximity.walkingMinutes}
              />
            </div>
          </div>

          {/* Right Sticky Connect Panel (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Pricing & Booking Card */}
              <Card className="border-2 border-accent/40 shadow-lg bg-surface-light">
                <CardHeader>
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-semibold text-ink-muted uppercase">Monthly Rent</span>
                    <Badge variant="sage" size="sm">
                      {listing.pricing.isNegotiable ? 'Negotiable' : 'Fixed Price'}
                    </Badge>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-primary">
                    {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
                    {listing.pricing.monthlyRent.toLocaleString()}
                    <span className="text-xs font-sans text-ink-muted font-normal"> / month</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4 pt-0 text-xs">
                  {/* Price breakdown */}
                  <div className="space-y-2 p-3.5 bg-surface-sage rounded-xl border border-surface-sage-dark">
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Security Deposit:</span>
                      <span className="font-bold text-ink">
                        {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
                        {listing.pricing.securityDeposit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Minimum Stay:</span>
                      <span className="font-bold text-ink">{listing.minStayMonths} Months</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-ink-muted">Electricity & Water:</span>
                      <span className="font-bold text-primary">
                        {listing.pricing.electricityIncluded ? 'Included in Rent' : 'Billed separately'}
                      </span>
                    </div>
                  </div>

                  {/* Owner Snapshot */}
                  <div className="flex items-center space-x-3 p-3 bg-surface-light rounded-xl border border-surface-sage-dark">
                    <Avatar
                      src={listing.host.avatarUrl}
                      name={listing.host.fullName}
                      size="md"
                      isVerified={listing.host.itsVerified}
                    />
                    <div className="truncate">
                      <div className="font-serif font-bold text-sm text-ink truncate">
                        {listing.host.fullName}
                      </div>
                      <div className="text-[11px] text-ink-muted truncate">
                        Jamaat: {listing.host.jamaat}
                      </div>
                      <div className="text-[10px] text-primary font-medium">
                        ⚡ {listing.host.responseRate || 'Responds quickly'}
                      </div>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2 pt-2">
                    <Button
                      variant="primary"
                      className="w-full"
                      size="lg"
                      onClick={() => handleOpenInquiry('message')}
                      leftIcon={<MessageCircle className="w-4 h-4 text-accent" />}
                    >
                      Send Inquiry to Host
                    </Button>

                    <Button
                      variant="gold"
                      className="w-full"
                      size="md"
                      onClick={() => handleOpenInquiry('callback')}
                      leftIcon={<Phone className="w-4 h-4 text-ink" />}
                    >
                      Request Callback
                    </Button>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center justify-center text-[11px] text-ink-muted">
                  <ShieldCheck className="w-3.5 h-3.5 text-accent-dark mr-1" />
                  <span>ITS Identity Verified Community Network</span>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>

        {/* 3. SIMILAR LISTINGS ROW */}
        {similarListings.length > 0 && (
          <div className="pt-12 border-t border-surface-sage-dark space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-primary">
                  Similar Community Accommodations
                </h3>
                <p className="text-xs text-ink-muted">
                  More rooms and flats in {listing.location.city} and nearby mohallas
                </p>
              </div>
              <Link
                href={`/rooms?city=${listing.location.city}`}
                className="text-xs font-semibold text-primary hover:text-accent-dark transition-colors"
              >
                View all in {listing.location.city} →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarListings.map((sim) => (
                <ListingCard
                  key={sim.id}
                  listing={sim}
                  onSelect={(l) => {
                    window.location.href = `/rooms/${l.id}`;
                  }}
                  onContactHost={() => handleOpenInquiry('message')}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      {/* 4. MOBILE STICKY BOTTOM BAR */}
      <div className="lg:hidden sticky bottom-0 z-40 bg-surface-light/95 backdrop-blur-md border-t border-surface-sage-dark p-3 px-4 shadow-xl flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] text-ink-muted">Monthly Rent</div>
          <div className="font-serif text-lg font-bold text-primary">
            {listing.pricing.currency === 'INR' ? '₹' : listing.pricing.currency + ' '}
            {listing.pricing.monthlyRent.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
              isSaved
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-surface-sage text-ink border-surface-sage-dark'
            }`}
            aria-label="Save Listing"
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-600 text-rose-600' : 'text-ink-muted'}`} />
          </button>
          <Button
            variant="primary"
            size="md"
            onClick={() => handleOpenInquiry('message')}
            leftIcon={<MessageCircle className="w-4 h-4 text-accent" />}
          >
            Connect
          </Button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Lightbox Modal */}
      <LightboxModal
        images={listing.images}
        initialIndex={activePhotoIdx}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />

      {/* Inquiry Modal */}
      <InquiryModal
        listing={listing}
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        inquiryType={inquiryType}
      />

      {/* Auth & List Space Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authMode}
      />

      <ListPropertyModal
        isOpen={listModalOpen}
        onClose={() => setListModalOpen(false)}
        onAddListing={() => {}}
      />
    </div>
  );
}
