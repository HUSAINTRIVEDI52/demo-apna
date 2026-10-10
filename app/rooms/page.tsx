'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ListingCard } from '@/components/ListingCard';
import { ListingDetailModal } from '@/components/ListingDetailModal';
import { ContactHostModal } from '@/components/ContactHostModal';
import { ListPropertyModal } from '@/components/ListPropertyModal';
import { AuthModal } from '@/components/AuthModal';
import { RoomsFilterSidebar, RoomsFilterState } from '@/components/RoomsFilterSidebar';
import {
  Button,
  Badge,
  Skeleton,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  PatternBackground,
} from '@/components/ui';
import { MOCK_HOUSING_LISTINGS } from '@/lib/mock-data';
import { HousingListing, PropertyType, OccupancyGender, FurnishedStatus } from '@/lib/types';
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  SearchX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  X,
  RotateCcw,
} from 'lucide-react';

const ITEMS_PER_PAGE = 6;

type SortOption = 'featured' | 'price_asc' | 'price_desc' | 'distance_asc' | 'newest';

function RoomsBrowseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize filter state from URL params
  const initialFilters: RoomsFilterState = useMemo(() => {
    const cityParam = searchParams.get('city') || 'All Cities';
    const mohallaParam = searchParams.get('mohalla') || '';
    const propTypesParam = searchParams.get('propertyTypes')
      ? (searchParams.get('propertyTypes')!.split(',') as PropertyType[])
      : [];
    const occParam = searchParams.get('occupancy')
      ? (searchParams.get('occupancy')!.split(',') as OccupancyGender[])
      : [];
    const furnParam = searchParams.get('furnished')
      ? (searchParams.get('furnished')!.split(',') as FurnishedStatus[])
      : [];
    const maxRentParam = Number(searchParams.get('maxRent')) || 75000;
    const fmbParam = searchParams.get('fmb') === 'true';
    const itsParam = searchParams.get('its') === 'true';
    const distParam = Number(searchParams.get('maxDistanceKm')) || 5.0;
    const amenitiesParam = searchParams.get('amenities')
      ? searchParams.get('amenities')!.split(',')
      : [];
    const availableFromParam = searchParams.get('availableFrom') || '';

    return {
      city: cityParam,
      mohalla: mohallaParam,
      propertyTypes: propTypesParam,
      occupancyGender: occParam,
      furnishedStatus: furnParam,
      minRent: 0,
      maxRent: maxRentParam,
      fmbOnly: fmbParam,
      itsVerifiedOnly: itsParam,
      maxDistanceKm: distParam,
      amenities: amenitiesParam,
      availableFrom: availableFromParam,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<RoomsFilterState>(initialFilters);
  const [sortOption, setSortOption] = useState<SortOption>(
    (searchParams.get('sort') as SortOption) || 'featured'
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get('page')) || 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Modals state
  const [activeListing, setActiveListing] = useState<HousingListing | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Listings state (starts with mock, supports dynamic additions)
  const [allListings, setAllListings] = useState<HousingListing[]>(MOCK_HOUSING_LISTINGS);

  // Sync state changes to URL query parameters
  const updateUrlParams = (newFilters: RoomsFilterState, newSort: SortOption, newPage: number) => {
    const params = new URLSearchParams();

    if (newFilters.city && newFilters.city !== 'All Cities') params.set('city', newFilters.city);
    if (newFilters.mohalla) params.set('mohalla', newFilters.mohalla);
    if (newFilters.propertyTypes.length > 0)
      params.set('propertyTypes', newFilters.propertyTypes.join(','));
    if (newFilters.occupancyGender.length > 0)
      params.set('occupancy', newFilters.occupancyGender.join(','));
    if (newFilters.furnishedStatus.length > 0)
      params.set('furnished', newFilters.furnishedStatus.join(','));
    if (newFilters.maxRent < 75000) params.set('maxRent', String(newFilters.maxRent));
    if (newFilters.fmbOnly) params.set('fmb', 'true');
    if (newFilters.itsVerifiedOnly) params.set('its', 'true');
    if (newFilters.maxDistanceKm < 5.0)
      params.set('maxDistanceKm', String(newFilters.maxDistanceKm));
    if (newFilters.amenities.length > 0)
      params.set('amenities', newFilters.amenities.join(','));
    if (newFilters.availableFrom) params.set('availableFrom', newFilters.availableFrom);
    if (newSort !== 'featured') params.set('sort', newSort);
    if (newPage > 1) params.set('page', String(newPage));

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  };

  const handleFilterChange = (updated: RoomsFilterState) => {
    setFilters(updated);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 250);
    updateUrlParams(updated, sortOption, 1);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    setCurrentPage(1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 200);
    updateUrlParams(filters, newSort, 1);
  };

  const handleResetFilters = () => {
    const reset: RoomsFilterState = {
      city: 'All Cities',
      mohalla: '',
      propertyTypes: [],
      occupancyGender: [],
      furnishedStatus: [],
      minRent: 0,
      maxRent: 75000,
      fmbOnly: false,
      itsVerifiedOnly: false,
      maxDistanceKm: 5.0,
      amenities: [],
      availableFrom: '',
    };
    setFilters(reset);
    setSortOption('featured');
    setCurrentPage(1);
    updateUrlParams(reset, 'featured', 1);
  };

  // Filter & Sort listings logic
  const filteredAndSortedListings = useMemo(() => {
    let result = allListings.filter((listing) => {
      // City
      if (filters.city !== 'All Cities' && listing.location.city.toLowerCase() !== filters.city.toLowerCase()) {
        return false;
      }

      // Mohalla or search keyword
      if (filters.mohalla.trim()) {
        const query = filters.mohalla.toLowerCase();
        const matchesArea = listing.location.mohallaOrArea.toLowerCase().includes(query);
        const matchesAddress = listing.location.address.toLowerCase().includes(query);
        const matchesTitle = listing.title.toLowerCase().includes(query);
        const matchesMasjid = listing.masjidProximity.masjidName.toLowerCase().includes(query);
        if (!matchesArea && !matchesAddress && !matchesTitle && !matchesMasjid) {
          return false;
        }
      }

      // Property types
      if (
        filters.propertyTypes.length > 0 &&
        !filters.propertyTypes.includes(listing.propertyType)
      ) {
        return false;
      }

      // Occupancy gender
      if (
        filters.occupancyGender.length > 0 &&
        !filters.occupancyGender.includes(listing.occupancyGender) &&
        listing.occupancyGender !== 'any'
      ) {
        return false;
      }

      // Furnished status
      if (
        filters.furnishedStatus.length > 0 &&
        !filters.furnishedStatus.includes(listing.furnishedStatus)
      ) {
        return false;
      }

      // Max Rent
      if (listing.pricing.monthlyRent > filters.maxRent) {
        return false;
      }

      // FMB Only
      if (filters.fmbOnly && !listing.fmbFriendly) {
        return false;
      }

      // ITS Verified
      if (filters.itsVerifiedOnly && !listing.host.itsVerified) {
        return false;
      }

      // Distance to Masjid (in meters converted from km)
      const maxMeters = filters.maxDistanceKm * 1000;
      if (filters.maxDistanceKm < 5.0 && listing.masjidProximity.distanceMeters > maxMeters) {
        return false;
      }

      // Amenities filter (must have all selected amenities)
      if (filters.amenities.length > 0) {
        const hasAllAmenities = filters.amenities.every((a) =>
          listing.amenities.includes(a)
        );
        if (!hasAllAmenities) return false;
      }

      // Available from date
      if (filters.availableFrom && listing.availableFrom > filters.availableFrom) {
        return false;
      }

      return true;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      if (sortOption === 'price_asc') {
        return a.pricing.monthlyRent - b.pricing.monthlyRent;
      }
      if (sortOption === 'price_desc') {
        return b.pricing.monthlyRent - a.pricing.monthlyRent;
      }
      if (sortOption === 'distance_asc') {
        return a.masjidProximity.distanceMeters - b.masjidProximity.distanceMeters;
      }
      if (sortOption === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    return result;
  }, [allListings, filters, sortOption]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredAndSortedListings.length / ITEMS_PER_PAGE) || 1;
  const paginatedListings = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedListings.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredAndSortedListings, currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      updateUrlParams(filters, sortOption, newPage);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
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
    setAllListings([newListing, ...allListings]);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.city !== 'All Cities') count++;
    if (filters.mohalla) count++;
    if (filters.propertyTypes.length > 0) count += filters.propertyTypes.length;
    if (filters.occupancyGender.length > 0) count += filters.occupancyGender.length;
    if (filters.furnishedStatus.length > 0) count += filters.furnishedStatus.length;
    if (filters.maxRent < 75000) count++;
    if (filters.fmbOnly) count++;
    if (filters.itsVerifiedOnly) count++;
    if (filters.maxDistanceKm < 5.0) count++;
    if (filters.amenities.length > 0) count += filters.amenities.length;
    if (filters.availableFrom) count++;
    return count;
  }, [filters]);

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Global Navbar */}
      <Navbar
        onOpenListModal={() => setIsListModalOpen(true)}
        onOpenAuthModal={(mode) => {
          setAuthMode(mode);
          setIsAuthModalOpen(true);
        }}
      />

      {/* Hero Header Banner */}
      <div className="bg-primary text-surface-light py-8 px-4 sm:px-6 lg:px-8 bg-islamic-emerald-pattern border-b-2 border-accent/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-3 py-0.5 rounded-full bg-primary-dark/80 text-accent text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-accent" />
              <span>Verified Community Stays</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-surface-light">
              Browse Rooms & Accommodation
            </h1>
            <p className="text-xs sm:text-sm text-surface-sage max-w-2xl font-light">
              Discover verified PG rooms, shared flats, and private apartments near Masajid & Markaz across the Dawoodi Bohra community.
            </p>
          </div>

          <Button
            variant="gold"
            size="md"
            onClick={() => setIsListModalOpen(true)}
            className="shrink-0"
          >
            + List a Vacancy
          </Button>
        </div>
      </div>

      {/* Main Browse Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (4 cols) */}
          <div className="hidden lg:block lg:col-span-4">
            <RoomsFilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredAndSortedListings.length}
            />
          </div>

          {/* Right Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Top Toolbar: Search summary, Mobile Filter trigger, Sort dropdown */}
            <div className="bg-surface-light rounded-2xl border border-surface-sage-dark p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              {/* Left summary & active filters */}
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden flex items-center space-x-2"
                  onClick={() => setMobileDrawerOpen(true)}
                >
                  <SlidersHorizontal className="w-4 h-4 text-primary" />
                  <span>Filters</span>
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary text-surface-light text-[10px] font-bold flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>

                <div className="text-xs text-ink-muted">
                  Showing <span className="font-bold text-primary">{filteredAndSortedListings.length}</span>{' '}
                  {filteredAndSortedListings.length === 1 ? 'room' : 'rooms'}{' '}
                  {filters.city !== 'All Cities' && (
                    <span>in <span className="font-semibold text-ink">{filters.city}</span></span>
                  )}
                </div>
              </div>

              {/* Right Sort dropdown */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-ink-muted shrink-0 flex items-center space-x-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
                  <span>Sort by:</span>
                </span>
                <select
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="bg-surface-sage border border-surface-sage-dark rounded-lg text-xs font-semibold text-ink px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-hidden cursor-pointer"
                  aria-label="Sort listings"
                >
                  <option value="featured">Featured First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="distance_asc">Closest to Masjid</option>
                  <option value="newest">Newest Listed</option>
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="font-semibold text-ink-muted">Active:</span>
                {filters.city !== 'All Cities' && (
                  <Badge variant="sage" size="sm">
                    City: {filters.city}
                  </Badge>
                )}
                {filters.mohalla && (
                  <Badge variant="sage" size="sm">
                    Area: {filters.mohalla}
                  </Badge>
                )}
                {filters.propertyTypes.map((pt) => (
                  <Badge key={pt} variant="primary" size="sm">
                    {pt.replace('_', ' ')}
                  </Badge>
                ))}
                {filters.occupancyGender.map((occ) => (
                  <Badge key={occ} variant="accent" size="sm">
                    {occ.replace('_', ' ')}
                  </Badge>
                ))}
                {filters.maxRent < 75000 && (
                  <Badge variant="sage" size="sm">
                    Max: ₹{filters.maxRent.toLocaleString()}
                  </Badge>
                )}
                {filters.fmbOnly && (
                  <Badge variant="accent" size="sm">
                    FMB Thali
                  </Badge>
                )}
                {filters.itsVerifiedOnly && (
                  <Badge variant="accent" size="sm">
                    ITS Verified
                  </Badge>
                )}
                {filters.maxDistanceKm < 5.0 && (
                  <Badge variant="sage" size="sm">
                    &lt; {filters.maxDistanceKm} km to Masjid
                  </Badge>
                )}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-primary hover:underline text-xs font-semibold flex items-center space-x-1 ml-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear all</span>
                </button>
              </div>
            )}

            {/* Listings Grid / Skeletons / Empty State */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((n) => (
                  <Card key={n}>
                    <CardHeader>
                      <Skeleton className="h-44 w-full rounded-xl" />
                      <Skeleton className="h-6 w-3/4 mt-3" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                    <CardFooter className="justify-end space-x-2">
                      <Skeleton className="h-8 w-20" />
                      <Skeleton className="h-8 w-24" />
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : paginatedListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {paginatedListings.map((listing) => (
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
              <div className="p-12 text-center bg-surface-light rounded-2xl border border-surface-sage-dark space-y-4 my-4">
                <div className="w-16 h-16 rounded-full bg-surface-sage text-ink-muted flex items-center justify-center mx-auto">
                  <SearchX className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-ink">
                  No accommodations match your filter criteria
                </h3>
                <p className="text-sm text-ink-muted max-w-md mx-auto">
                  Try broadening your budget range, changing distance to masjid, or selecting another mohalla.
                </p>
                <Button variant="primary" size="md" onClick={handleResetFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && !isLoading && (
              <div className="pt-8 border-t border-surface-sage-dark/60 flex items-center justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>

                <div className="flex items-center space-x-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        currentPage === pageNum
                          ? 'bg-primary text-surface-light font-bold shadow-xs'
                          : 'text-ink hover:bg-surface-sage'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                  rightIcon={<ChevronRight className="w-4 h-4" />}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer Modal */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-ink/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-md bg-surface-light h-full ml-auto shadow-2xl overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <RoomsFilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={handleResetFilters}
              totalResults={filteredAndSortedListings.length}
              isMobileDrawer={true}
              onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Global Footer */}
      <Footer />

      {/* Modals */}
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

export default function RoomsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center p-12">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-accent rounded-full animate-spin mx-auto" />
          <p className="font-serif text-lg font-bold text-primary">Loading Tabalat Housing Stays...</p>
        </div>
      </div>
    }>
      <RoomsBrowseContent />
    </Suspense>
  );
}
