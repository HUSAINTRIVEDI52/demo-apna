'use client';

import React from 'react';
import { MOCK_TESTIMONIALS } from '@/lib/mock-data';
import { Avatar, Card, CardHeader, CardContent, Badge } from '@/components/ui';
import { Quote, Star, MessageSquare } from 'lucide-react';

export function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-surface-sage text-primary text-xs font-semibold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5 text-accent-dark" />
            <span>Community Experiences</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Trusted by Mumineen Everywhere
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Read how students, young professionals, and homeowners connect seamlessly through Tabalat Housing.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-2xl bg-surface-light p-6 border border-surface-sage-dark shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <Quote className="w-8 h-8 text-accent/50 shrink-0" />
                <p className="text-xs sm:text-sm text-ink leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-sage-dark/40 flex items-center space-x-3">
                <Avatar
                  src={t.avatarUrl}
                  name={t.name}
                  size="md"
                  isVerified={t.verified}
                />
                <div>
                  <div className="font-serif font-bold text-sm text-primary">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-ink-muted">
                    {t.role} • <span className="text-primary font-medium">{t.location}</span>
                  </div>
                  <div className="text-[10px] text-accent-dark font-medium">
                    {t.jamaat}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
