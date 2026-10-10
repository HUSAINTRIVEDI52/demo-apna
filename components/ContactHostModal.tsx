'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, MessageCircle, Phone, CheckCircle, Send, User, Hash } from 'lucide-react';
import { HousingListing } from '@/lib/types';

interface ContactHostModalProps {
  listing: HousingListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ContactHostModal({ listing, isOpen, onClose }: ContactHostModalProps) {
  const [seekerName, setSeekerName] = useState('');
  const [seekerIts, setSeekerIts] = useState('');
  const [seekerPhone, setSeekerPhone] = useState('');
  const [seekerCity, setSeekerCity] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !listing) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Format WhatsApp redirect message
    const formattedMsg = encodeURIComponent(
      `Salaam ${listing.host.fullName},\n\nI am interested in your listing on Tabalat Housing: "${listing.title}".\n\nMy Details:\n• Name: ${seekerName}\n• ITS ID: ${seekerIts || 'Provided on request'}\n• City: ${seekerCity}\n• Message: ${inquiryMessage || 'I would like to inquire about availability and schedule a visit.'}\n\nLooking forward to hearing from you. Shukran.`
    );
    
    // Simulate connection / open WhatsApp web
    const cleanPhone = listing.host.phoneNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${formattedMsg}`, '_blank');

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-main/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-ivory-light rounded-2xl shadow-2xl border border-gold-muted/50 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-emerald-900 text-ivory-base">
          <div>
            <h3 className="font-serif text-lg font-bold text-ivory-light flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-gold-light" />
              <span>Connect with Host</span>
            </h3>
            <p className="text-xs text-sage-200 font-light">
              Direct community connection without broker fees
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-sage-200 hover:text-ivory-base hover:bg-emerald-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto border-2 border-emerald-700">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="font-serif text-2xl font-bold text-emerald-900">
              Inquiry Sent!
            </h4>
            <p className="text-sm text-charcoal-main max-w-sm mx-auto">
              Your inquiry has been directed to <span className="font-bold">{listing.host.fullName}</span> on WhatsApp. You can also call directly at <span className="font-bold text-emerald-900">{listing.host.phoneNumber}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-lg bg-emerald-900 text-ivory-base text-sm font-semibold hover:bg-emerald-800 transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Listing snapshot */}
            <div className="p-3 bg-sage-50 rounded-xl border border-sage-200 text-xs">
              <div className="font-semibold text-emerald-900 line-clamp-1">{listing.title}</div>
              <div className="text-charcoal-muted mt-0.5">
                Host: <span className="font-medium text-charcoal-main">{listing.host.fullName}</span> ({listing.host.jamaat})
              </div>
            </div>

            {/* Inputs */}
            <div>
              <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                Your Full Name <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-800" />
                <input
                  type="text"
                  required
                  value={seekerName}
                  onChange={(e) => setSeekerName(e.target.value)}
                  placeholder="e.g. Murtaza bhai Merchant"
                  className="w-full pl-9 pr-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                  ITS ID Number (Optional)
                </label>
                <div className="relative">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-800" />
                  <input
                    type="text"
                    value={seekerIts}
                    onChange={(e) => setSeekerIts(e.target.value)}
                    placeholder="8-digit ITS"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                  Your City / Jamaat <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={seekerCity}
                  onChange={(e) => setSeekerCity(e.target.value)}
                  placeholder="e.g. Surat / Mumbai"
                  className="w-full px-3 py-2 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal-muted uppercase tracking-wider mb-1">
                Your Message / Move-in Query
              </label>
              <textarea
                rows={3}
                value={inquiryMessage}
                onChange={(e) => setInquiryMessage(e.target.value)}
                placeholder="Share a bit about yourself, desired move-in date, and questions about the stay..."
                className="w-full p-3 bg-white border border-sage-200 rounded-lg text-sm text-charcoal-main focus:ring-2 focus:ring-emerald-800 focus:outline-hidden resize-none"
              ></textarea>
            </div>

            <div className="flex items-center space-x-2 text-xs text-charcoal-muted bg-sage-50 p-2.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-emerald-800 shrink-0" />
              <span>We prioritize community safety and privacy. Your details are shared only with the host.</span>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-emerald-900 hover:bg-emerald-800 text-ivory-base font-semibold text-sm shadow-md transition-all flex items-center justify-center space-x-2 cursor-pointer border border-gold-primary/30"
            >
              <Send className="w-4 h-4 text-gold-light" />
              <span>Send Message to Host</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
