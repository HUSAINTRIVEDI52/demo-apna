'use client';

import React from 'react';
import { ShieldCheck, Footprints, Utensils, HeartHandshake, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Badge, PatternBackground } from '@/components/ui';

export function TrustSafety() {
  const trustFeatures = [
    {
      icon: ShieldCheck,
      title: 'ITS Identity Verification',
      description: 'Members verify their ITS credentials, fostering a trusted network where you always know who you are renting to or living with.',
      badge: '100% Verified Members',
    },
    {
      icon: Footprints,
      title: 'Verified Masjid Proximity',
      description: 'Accurate walking distances to Saifee Masjid, Raudat Tahera, Hasanat Masjid, Devdi Mubarak, and local community Jamaat Khanas.',
      badge: 'Walking Proximity',
    },
    {
      icon: Utensils,
      title: 'Faizul Mawaid (FMB) Friendly',
      description: 'Listings clearly indicate tiffin drop-off logistics, dietary cleanliness, and kitchen access suitable for community culinary habits.',
      badge: 'Community Cuisine',
    },
    {
      icon: HeartHandshake,
      title: 'Zero Brokerage / Direct Connection',
      description: 'No middleman fees or hidden commissions. Connect directly with the room owner or flatmate on verified WhatsApp.',
      badge: 'Zero Commission',
    },
  ];

  return (
    <section id="trust-safety" className="py-16 md:py-24 bg-surface-light border-t border-b border-surface-sage-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-accent-surface border border-accent/40 text-accent-dark text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-accent-dark" />
            <span>Built On Community Trust</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Safe, Respectful & Community-Verified Living
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Every feature on Tabalat Housing is engineered to provide peace of mind for students, professionals, and families moving across cities.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-surface rounded-2xl p-6 border border-surface-sage-dark shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary text-accent flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="sage" size="sm" className="mb-2">
                    {item.badge}
                  </Badge>
                  <h3 className="font-serif text-lg font-bold text-primary mb-2 group-hover:text-primary-hover transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Community Verification Callout */}
        <div className="mt-12 rounded-2xl bg-primary text-surface-light p-6 sm:p-8 relative overflow-hidden shadow-lg border border-accent/30 bg-islamic-emerald-pattern">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-primary-dark/80 text-accent text-xs font-semibold uppercase">
                <Lock className="w-3.5 h-3.5 text-accent" />
                <span>Privacy & Safety Promise</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-surface-light">
                Your community details remain private and protected
              </h3>
              <p className="text-xs sm:text-sm text-surface-sage max-w-xl font-light">
                Contact information and WhatsApp links are shared strictly with verified community members to maintain safety and adab across our network.
              </p>
            </div>
            <a
              href="#browse"
              className="px-6 py-3 rounded-xl bg-accent hover:bg-accent-dark text-ink font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
            >
              Browse Stays Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
