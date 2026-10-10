'use client';

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { BrowseByCity } from '@/components/BrowseByCity';
import { FilterBar } from '@/components/FilterBar';
import { ListingCard } from '@/components/ListingCard';
import { HowItWorks } from '@/components/HowItWorks';
import { TrustSafety } from '@/components/TrustSafety';
import { Testimonials } from '@/components/Testimonials';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { ListingDetailModal } from '@/components/ListingDetailModal';
import { ContactHostModal } from '@/components/ContactHostModal';
import { ListPropertyModal } from '@/components/ListPropertyModal';
import { AuthModal } from '@/components/AuthModal';
import { MOCK_HOUSING_LISTINGS } from '@/lib/mock-data';
import { HousingListing, PropertyType, OccupancyGender, FurnishedStatus } from '@/lib/types';
import { SearchX, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';

export default function HomePage() {
  // State for listings
  const [listings, setListings] = useState<HousingListing[]>(MOCK_HOUSING_LISTINGS);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | 'all'>('all');
  const [selectedOccupancy, setSelectedOccupancy] = useState<OccupancyGender | 'all'>('all');
  const [selectedFurnished, setSelectedFurnished] = useState<FurnishedStatus | 'all'>('all');
  const [maxRent, setMaxRent] = useState<number>(100000);
  const [fmbOnly, setFmbOnly] = useState(false);
  const [itsVerifiedOnly, setItsVerifiedOnly] = useState(false);
  const [maxWalkingMinutes, setMaxWalkingMinutes] = useState(30);

  // Modal States
  const [activeListing, setActiveListing] = useState<HousingListing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Filter logic
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // City filter
      if (selectedCity !== 'All Cities' && listing.location.city.toLowerCase() !== selectedCity.toLowerCase()) {
        return false;
      }

      // Property type filter
      if (selectedPropertyType !== 'all' && listing.propertyType !== selectedPropertyType) {
        return false;
      }

      // Occupancy filter
      if (selectedOccupancy !== 'all' && listing.occupancyGender !== selectedOccupancy && listing.occupancyGender !== 'any') {
        return false;
      }

      // Budget / Max Rent filter
      if (listing.pricing.monthlyRent > maxRent) {
        return false;
      }

      // Furnished filter
      if (selectedFurnished !== 'all' && listing.furnishedStatus !== selectedFurnished) {
        return false;
      }

      // FMB Only filter
      if (fmbOnly && !listing.fmbFriendly) {
        return false;
      }

      // ITS Verified Only
      if (itsVerifiedOnly && !listing.host.itsVerified) {
        return false;
      }

      // Masjid Walking distance
      if (maxWalkingMinutes < 30 && listing.masjidProximity.walkingMinutes > maxWalkingMinutes) {
        return false;
      }

      // Text search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = listing.title.toLowerCase().includes(query);
        const matchesDesc = listing.description.toLowerCase().includes(query);
        const matchesMohalla = listing.location.mohallaOrArea.toLowerCase().includes(query);
        const matchesCity = listing.location.city.toLowerCase().includes(query);
        const matchesMasjid = listing.masjidProximity.masjidName.toLowerCase().includes(query);

        if (!matchesTitle && !matchesDesc && !matchesMohalla && !matchesCity && !matchesMasjid) {
          return false;
        }
      }

      return true;
    });
  }, [
    listings,
    selectedCity,
    selectedPropertyType,
    selectedOccupancy,
    maxRent,
    selectedFurnished,
    fmbOnly,
    itsVerifiedOnly,
    maxWalkingMinutes,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCity('All Cities');
    setSelectedPropertyType('all');
    setSelectedOccupancy('all');
    setSelectedFurnished('all');
    setMaxRent(100000);
    setFmbOnly(false);
    setItsVerifiedOnly(false);
    setMaxWalkingMinutes(30);
  };

  const handleSelectListing = (listing: HousingListing) => {
    setActiveListing(listing);
    setIsDetailOpen(true);
  };

  const handleContactHost = (listing: HousingListing) => {
    setActiveListing(listing);
    setIsContactOpen(true);
  };

  const handleAddListing = (newListing: HousingListing) => {
    setListings([newListing, ...listings]);
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const scrollToBrowse = () => {
    const browseElem = document.getElementById('browse');
    if (browseElem) browseElem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* 1. Global Navigation Bar with Hijri Date & Auth Triggers */}
      <Navbar
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenAuthModal={handleOpenAuth}
      />

      {/* 2. Hero Section with Search Bar (City, Room Type, Budget) */}
      <HeroSection
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedPropertyType={selectedPropertyType}
        onPropertyTypeChange={setSelectedPropertyType}
        selectedOccupancy={selectedOccupancy}
        onOccupancyChange={setSelectedOccupancy}
        maxRent={maxRent}
        onMaxRentChange={setMaxRent}
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
        onSearchSubmit={scrollToBrowse}
      />

      {/* 3. Browse by City Section */}
      <BrowseByCity
        onSelectCity={(city) => {
          setSelectedCity(city);
          scrollToBrowse();
        }}
      />

      {/* 4. Featured & Verified Listings Carousel / Grid */}
      <main id="browse" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-sage-dark pb-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-accent-surface text-accent-dark text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3 h-3 text-accent-dark" />
              <span>Available Community Listings</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary">
              Featured Rooms & Shared Flats
            </h2>
          </div>
          <p className="text-xs text-ink-muted sm:text-right">
            Showing properties in <span className="font-semibold text-primary">{selectedCity}</span>
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          propertyType={selectedPropertyType}
          onPropertyTypeChange={setSelectedPropertyType}
          occupancyGender={selectedOccupancy}
          onOccupancyChange={setSelectedOccupancy}
          furnishedStatus={selectedFurnished}
          onFurnishedChange={setSelectedFurnished}
          fmbOnly={fmbOnly}
          onFmbToggle={setFmbOnly}
          itsVerifiedOnly={itsVerifiedOnly}
          onItsToggle={setItsVerifiedOnly}
          maxWalkingMinutes={maxWalkingMinutes}
          onWalkingMinutesChange={setMaxWalkingMinutes}
          onResetFilters={handleResetFilters}
          totalResultsCount={filteredListings.length}
        />

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {filteredListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                onSelect={handleSelectListing}
                onContactHost={handleContactHost}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 text-center bg-surface-light rounded-2xl border border-surface-sage-dark space-y-4 my-8">
            <div className="w-16 h-16 rounded-full bg-surface-sage text-ink-muted flex items-center justify-center mx-auto">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-bold text-ink">
              No matching accommodations found
            </h3>
            <p className="text-sm text-ink-muted max-w-md mx-auto">
              Try adjusting your filters, selecting a different city, or resetting your search to see all available community spaces.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-5 py-2.5 rounded-lg bg-primary text-surface-light text-xs font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      {/* 5. How It Works (3 Steps for Seekers and Owners) */}
      <HowItWorks />

      {/* 6. Trust & Safety Standards Section */}
      <TrustSafety />

      {/* 7. Community Testimonials */}
      <Testimonials />

      {/* 8. Final Call to Action */}
      <FinalCTA
        onOpenListModal={() => setIsListModalOpen(true)}
        onBrowseClick={scrollToBrowse}
      />

      {/* 9. Global Ivory Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ListingDetailModal
        listing={activeListing}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onContactHost={(listing) => {
          setIsDetailOpen(false);
          setActiveListing(listing);
          setIsContactOpen(true);
        }}
      />

      <ContactHostModal
        listing={activeListing}
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <ListPropertyModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        onAddListing={handleAddListing}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </div>
  );
}
