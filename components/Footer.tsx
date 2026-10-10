import React from 'react';
import Link from 'next/link';
import { Home, ShieldCheck, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';
import { PatternBackground, Badge } from '@/components/ui';

export function Footer() {
  return (
    <footer className="relative bg-surface text-ink border-t-2 border-accent/40 overflow-hidden">
      {/* Subtle Pattern Border Strip */}
      <PatternBackground
        opacity={0.12}
        color="#C9A24B"
        patternType="stars"
        className="h-3 w-full bg-surface-sage border-b border-surface-sage-dark"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-surface-sage-dark">
          {/* Brand & Purpose */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-primary border border-accent/50 flex items-center justify-center">
                <Home className="w-5 h-5 text-accent" />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                  Tabalat
                </span>
                <span className="ml-1.5 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-accent-surface text-accent-dark border border-accent/40">
                  Housing
                </span>
              </div>
            </div>
            <p className="text-xs text-ink-muted leading-relaxed">
              A respectful accommodation exchange built exclusively for Dawoodi Bohra Mumineen. Connecting seekers with safe, verified, and masjid-proximate stays globally.
            </p>
            <div className="flex items-center space-x-2 text-xs text-primary font-medium">
              <ShieldCheck className="w-4 h-4 text-accent-dark shrink-0" />
              <span>ITS Verified Identity Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-primary">
              Explore Housing
            </h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>
                <Link href="#browse" className="hover:text-primary hover:underline transition-colors flex items-center space-x-1">
                  <span>Browse PG & Rooms</span>
                </Link>
              </li>
              <li>
                <Link href="#cities" className="hover:text-primary hover:underline transition-colors flex items-center space-x-1">
                  <span>Browse by City & Mohalla</span>
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-primary hover:underline transition-colors flex items-center space-x-1">
                  <span>How Tabalat Works</span>
                </Link>
              </li>
              <li>
                <Link href="#trust-safety" className="hover:text-primary hover:underline transition-colors flex items-center space-x-1">
                  <span>Community Trust Standards</span>
                </Link>
              </li>
              <li>
                <Link href="/design-system" className="hover:text-primary hover:underline transition-colors flex items-center space-x-1">
                  <span>Design System Preview</span>
                  <ArrowUpRight className="w-3 h-3 text-accent-dark" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-primary">
              Community Contact
            </h4>
            <div className="space-y-2.5 text-xs text-ink-muted">
              <div className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>support@tabalathousing.org</span>
              </div>
              <div className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Community Helpdesk (WhatsApp)</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Serving Mumineen in Mumbai, Surat, Indore, Pune, Dubai, Karachi & Worldwide</span>
              </div>
            </div>
          </div>

          {/* Respectful Community Note */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-primary">
              Community Note
            </h4>
            <div className="p-3.5 rounded-xl bg-surface-sage border border-surface-sage-dark text-xs text-ink-muted leading-relaxed">
              Tabalat Housing is dedicated to maintaining the highest standards of mutual respect, adab, and trust. Users are encouraged to verify ITS identification numbers before entering residential agreements.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-ink-muted gap-3">
          <div>
            © 2026 Tabalat Housing. All rights reserved.
          </div>
          <div className="flex items-center space-x-1">
            <span>Built with care for the Dawoodi Bohra community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
