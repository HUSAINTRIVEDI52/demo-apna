'use client';

import React, { useState } from 'react';
import {
  X,
  Building2,
  MapPin,
  Footprints,
  Utensils,
  ShieldCheck,
  PlusCircle,
  CheckCircle2,
  DollarSign,
  Image as ImageIcon,
} from 'lucide-react';
import { HousingListing, PropertyType, OccupancyGender, FurnishedStatus } from '@/lib/types';
import { MOCK_AMENITIES_LIST } from '@/lib/mock-data';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddListing: (newListing: HousingListing) => void;
}

export function ListPropertyModal({
  isOpen,
  onClose,
  onAddListing,
}: ListPropertyModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    propertyType: 'pg' as PropertyType,
    occupancyGender: 'males_only' as OccupancyGender,
    furnishedStatus: 'fully_furnished' as FurnishedStatus,
    monthlyRent: '',
    securityDeposit: '',
    currency: 'INR',
    isNegotiable: false,
    address: '',
    mohallaOrArea: '',
    city: 'Mumbai',
    masjidName: '',
    walkingMinutes: '5',
    fmbFriendly: true,
    halalKitchen: true,
    bedrooms: '1',
    bathrooms: '1',
    maxOccupants: '2',
    hostName: '',
    hostJamaat: '',
    hostPhone: '',
    selectedAmenities: ['wifi', 'fmb_tiffin', 'attached_bath', 'ro_water'] as string[],
    imageUrl: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleAmenity = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAmenities: prev.selectedAmenities.includes(id)
        ? prev.selectedAmenities.filter((a) => a !== id)
        : [...prev.selectedAmenities, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newListing: HousingListing = {
      id: 'tbl-' + Date.now(),
      slug: formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now().toString().slice(-4),
      title: formData.title,
      description: formData.description,
      propertyType: formData.propertyType,
      occupancyGender: formData.occupancyGender,
      furnishedStatus: formData.furnishedStatus,
      pricing: {
        monthlyRent: Number(formData.monthlyRent) || 10000,
        securityDeposit: Number(formData.securityDeposit) || 20000,
        currency: formData.currency,
        isNegotiable: formData.isNegotiable,
        electricityIncluded: true,
        maintenanceIncluded: true,
        waterIncluded: true,
      },
      location: {
        address: formData.address,
        mohallaOrArea: formData.mohallaOrArea,
        city: formData.city,
        state: 'State',
        postalCode: '000000',
        country: 'India',
      },
      masjidProximity: {
        masjidName: formData.masjidName || 'Local Bohra Masjid',
        distanceMeters: (Number(formData.walkingMinutes) || 5) * 70,
        walkingMinutes: Number(formData.walkingMinutes) || 5,
        isMarkazOrJamaatKhana: true,
      },
      fmbFriendly: formData.fmbFriendly,
      halalKitchen: formData.halalKitchen,
      bedrooms: Number(formData.bedrooms) || 1,
      bathrooms: Number(formData.bathrooms) || 1,
      maxOccupants: Number(formData.maxOccupants) || 2,
      availableFrom: new Date().toISOString().split('T')[0],
      minStayMonths: 1,
      images: [
        formData.imageUrl ||
          'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1200&auto=format&fit=crop',
      ],
      amenities: formData.selectedAmenities,
      rules: [
        'Adhere to community values and prayer timings.',
        'Cleanliness is mandatory.',
      ],
      host: {
        id: 'host-' + Date.now(),
        fullName: formData.hostName || 'Community Member',
        jamaat: formData.hostJamaat || 'Anjuman-e-Shiate Ali',
        itsVerified: true,
        phoneNumber: formData.hostPhone || '+91 98000 00000',
        whatsappEnabled: true,
        joinedDate: 'Oct 2026',
      },
      featured: false,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    onAddListing(newListing);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-charcoal-main/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-ivory-light rounded-2xl shadow-2xl border border-gold-muted/50 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-emerald-900 text-ivory-base">
          <div>
            <h3 className="font-serif text-xl font-bold text-ivory-light flex items-center space-x-2">
              <PlusCircle className="w-5 h-5 text-gold-light" />
              <span>List Your Vacant Room / PG</span>
            </h3>
            <p className="text-xs text-sage-200 font-light">
              Help community members find safe, halal, and verified housing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-sage-200 hover:text-ivory-base hover:bg-emerald-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-700">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-emerald-900">
              Listing Created Successfully!
            </h4>
            <p className="text-sm text-charcoal-main max-w-md mx-auto">
              Your property has been listed on Tabalat Housing. Community members looking for accommodation in your area can now view and connect with you.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-emerald-900 text-ivory-base text-sm font-semibold hover:bg-emerald-800 transition-colors"
            >
              Back to Browse
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6">
            {/* Basic Info */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-emerald-900 border-b border-sage-200 pb-1">
                1. Property Overview
              </h4>

              <div>
                <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                  Listing Title <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Spacious 2-bed PG for working brothers near Saifee Masjid"
                  className="w-full px-3.5 py-2.5 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Property Type
                  </label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as PropertyType })}
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  >
                    <option value="pg">PG (Paying Guest)</option>
                    <option value="private_room">Private Room</option>
                    <option value="shared_room">Shared Room</option>
                    <option value="full_flat">Full Flat</option>
                    <option value="short_stay">Short Stay</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Occupancy Preference
                  </label>
                  <select
                    value={formData.occupancyGender}
                    onChange={(e) => setFormData({ ...formData, occupancyGender: e.target.value as OccupancyGender })}
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  >
                    <option value="males_only">Bhaiyo Only (Males)</option>
                    <option value="females_only">Baheno Only (Females)</option>
                    <option value="family_only">Family Only</option>
                    <option value="any">Any Community Member</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Furnished Status
                  </label>
                  <select
                    value={formData.furnishedStatus}
                    onChange={(e) => setFormData({ ...formData, furnishedStatus: e.target.value as FurnishedStatus })}
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  >
                    <option value="fully_furnished">Fully Furnished</option>
                    <option value="semi_furnished">Semi Furnished</option>
                    <option value="unfurnished">Unfurnished</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                  Description & Details <span className="text-rose-600">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe room condition, ventilation, furniture provided, study desks, hygiene expectations, etc."
                  className="w-full p-3 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                ></textarea>
              </div>
            </div>

            {/* Location & Masjid Proximity */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-emerald-900 border-b border-sage-200 pb-1">
                2. Location & Masjid Proximity
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    City <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Mumbai / Surat"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Mohalla / Area <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.mohallaOrArea}
                    onChange={(e) => setFormData({ ...formData, mohallaOrArea: e.target.value })}
                    placeholder="e.g. Bhendi Bazaar / Marol / Zampa Bazaar"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                  Full Building Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Saifee Park, 3rd Floor, Flat 302"
                  className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">
                    Nearest Bohra Masjid / Markaz <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.masjidName}
                    onChange={(e) => setFormData({ ...formData, masjidName: e.target.value })}
                    placeholder="e.g. Saifee Masjid / Hasanat Masjid"
                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-emerald-900 uppercase tracking-wider mb-1">
                    Walking Time (Minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={60}
                    value={formData.walkingMinutes}
                    onChange={(e) => setFormData({ ...formData, walkingMinutes: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Pricing & Amenities */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-emerald-900 border-b border-sage-200 pb-1">
                3. Rent, Deposit & Amenities
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Monthly Rent (INR / AED) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.monthlyRent}
                    onChange={(e) => setFormData({ ...formData, monthlyRent: e.target.value })}
                    placeholder="e.g. 12000"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Security Deposit
                  </label>
                  <input
                    type="number"
                    value={formData.securityDeposit}
                    onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                    placeholder="e.g. 20000"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-2">
                  Select Amenities Available
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOCK_AMENITIES_LIST.map((amenity) => {
                    const checked = formData.selectedAmenities.includes(amenity.id);
                    return (
                      <button
                        key={amenity.id}
                        type="button"
                        onClick={() => toggleAmenity(amenity.id)}
                        className={`p-2 rounded-lg border text-left text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                          checked
                            ? 'bg-emerald-900 text-ivory-base border-emerald-900'
                            : 'bg-white text-charcoal-main border-sage-200 hover:border-emerald-800'
                        }`}
                      >
                        <span>{amenity.name}</span>
                        {checked && <CheckCircle2 className="w-3.5 h-3.5 text-gold-light" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Host Details */}
            <div className="space-y-4">
              <h4 className="font-serif text-base font-bold text-emerald-900 border-b border-sage-200 pb-1">
                4. Host / Contact Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Your Full Name <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hostName}
                    onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
                    placeholder="e.g. Shk. Shabbir bhai"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    Your Jamaat <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.hostJamaat}
                    onChange={(e) => setFormData({ ...formData, hostJamaat: e.target.value })}
                    placeholder="e.g. Bhendi Bazaar Jamaat"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                    WhatsApp Phone Number <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.hostPhone}
                    onChange={(e) => setFormData({ ...formData, hostPhone: e.target.value })}
                    placeholder="+91 98200 12345"
                    className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-ivory-base font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer border border-gold-primary/30"
              >
                <PlusCircle className="w-5 h-5 text-gold-light" />
                <span>Publish Listing on Tabalat Housing</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
