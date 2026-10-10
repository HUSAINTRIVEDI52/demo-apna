/**
 * Type definitions for Tabalat Housing platform
 * Designed to cleanly map 1:1 with upcoming Mongoose models & database schema.
 */

export type PropertyType = 'pg' | 'shared_room' | 'private_room' | 'full_flat' | 'short_stay';

export type OccupancyGender = 'males_only' | 'females_only' | 'family_only' | 'any';

export type FurnishedStatus = 'fully_furnished' | 'semi_furnished' | 'unfurnished';

export interface LocationInfo {
  address: string;
  mohallaOrArea: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  landmark?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface MasjidProximity {
  masjidName: string;
  distanceMeters: number;
  walkingMinutes: number;
  isMarkazOrJamaatKhana?: boolean;
}

export interface PricingDetails {
  monthlyRent: number;
  securityDeposit: number;
  currency: string;
  isNegotiable: boolean;
  electricityIncluded: boolean;
  maintenanceIncluded: boolean;
  waterIncluded: boolean;
}

export interface HostProfile {
  id: string;
  fullName: string;
  jamaat: string;
  itsVerified: boolean;
  phoneNumber: string;
  whatsappEnabled: boolean;
  email?: string;
  avatarUrl?: string;
  joinedDate: string;
  responseRate?: string;
}

export interface HousingListing {
  id: string;
  slug: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  occupancyGender: OccupancyGender;
  furnishedStatus: FurnishedStatus;
  pricing: PricingDetails;
  location: LocationInfo;
  masjidProximity: MasjidProximity;
  fmbFriendly: boolean; // Suitable for Faizul Mawaid al Burhaniyah tiffin delivery
  halalKitchen: boolean;
  bedrooms: number;
  bathrooms: number;
  maxOccupants: number;
  availableFrom: string; // ISO date string
  minStayMonths: number;
  images: string[];
  amenities: string[];
  rules: string[];
  host: HostProfile;
  featured: boolean;
  status: 'active' | 'reserved' | 'closed';
  createdAt: string;
  updatedAt: string;
}

export interface FilterState {
  searchQuery: string;
  city: string;
  propertyType: PropertyType | 'all';
  occupancyGender: OccupancyGender | 'all';
  maxRent: number;
  maxWalkingMinutes: number;
  furnishedStatus: FurnishedStatus | 'all';
  fmbFriendlyOnly: boolean;
  itsVerifiedOnly: boolean;
}
