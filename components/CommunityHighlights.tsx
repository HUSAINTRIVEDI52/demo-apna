'use client';

import React from 'react';
import { ShieldCheck, Footprints, Utensils, HeartHandshake, CheckCircle2, Award } from 'lucide-react';
import { MOCK_COMMUNITY_GUIDELINES } from '@/lib/mock-data';

export function CommunityHighlights() {
  const icons = [ShieldCheck, Footprints, Utensils, HeartHandshake];

  return (
    <section id="community-values" className="py-16 md:py-24 bg-sage-50/60 border-t border-b border-sage-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-gold-dark" />
            <span>Community Trust & Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-emerald-900">
            Built on Faith, Respect, and Mutual Care
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Tabalat Housing is tailored specifically around the daily lifestyle of Dawoodi Bohra Mumineen, prioritizing sanctity, convenience, and genuine connections.
          </p>
        </div>

        {/* 4 Pillar Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_COMMUNITY_GUIDELINES.map((item, idx) => {
            const Icon = icons[idx] || ShieldCheck;
            return (
              <div
                key={idx}
                className="bg-ivory-light rounded-2xl p-6 border border-sage-200 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-900 text-gold-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-charcoal-main mb-2 group-hover:text-emerald-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Safety & Protocol Banner */}
        <div className="mt-12 rounded-2xl bg-emerald-900 text-ivory-base p-6 sm:p-8 relative overflow-hidden shadow-lg border border-gold-primary/30">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-ivory-light">
                Are you a homeowner or tenant with an empty room?
              </h3>
              <p className="text-xs sm:text-sm text-sage-200 max-w-xl font-light">
                Help a fellow student, working professional, or family find a comfortable stay in your mohalla. Listing takes less than 2 minutes and is 100% free.
              </p>
            </div>
            <a
              href="#browse"
              className="px-6 py-3 rounded-xl bg-gold-primary hover:bg-gold-light text-emerald-950 font-bold text-sm shadow-md transition-all shrink-0 cursor-pointer"
            >
              Explore Accommodation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
