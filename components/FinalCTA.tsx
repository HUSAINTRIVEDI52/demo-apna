'use client';

import React from 'react';
import { Button, PatternBackground } from '@/components/ui';
import { PlusCircle, Search, Sparkles, Home, ShieldCheck } from 'lucide-react';

interface FinalCTAProps {
  onOpenListModal: () => void;
  onBrowseClick: () => void;
}

export function FinalCTA({ onOpenListModal, onBrowseClick }: FinalCTAProps) {
  return (
    <section className="py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PatternBackground
          opacity={0.15}
          color="#C9A24B"
          patternType="stars"
          className="rounded-3xl bg-primary text-surface-light p-8 sm:p-12 md:p-16 border-2 border-accent/40 shadow-2xl relative overflow-hidden"
        >
          {/* Radial Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/15 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-primary-dark/80 border border-accent/40 text-accent text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Join the Tabalat Housing Network</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-surface-light leading-tight">
              Have a Vacant Room or Looking for a Community Stay?
            </h2>

            <p className="text-sm sm:text-base text-surface-sage max-w-2xl mx-auto font-light leading-relaxed">
              Help a student, working professional, or visiting family find a comfortable stay near your local Masjid. 100% free to list, direct owner connections.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="gold"
                size="lg"
                onClick={onOpenListModal}
                leftIcon={<PlusCircle className="w-5 h-5 text-ink" />}
              >
                List Your Vacant Space
              </Button>
              <Button
                variant="sage"
                size="lg"
                onClick={onBrowseClick}
                leftIcon={<Search className="w-5 h-5 text-primary" />}
              >
                Browse Available Stays
              </Button>
            </div>

            <div className="pt-6 flex items-center justify-center space-x-6 text-xs text-surface-sage/90">
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>ITS Identity Verified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Home className="w-4 h-4 text-accent" />
                <span>Zero Brokerage Fees</span>
              </div>
            </div>
          </div>
        </PatternBackground>
      </div>
    </section>
  );
}
