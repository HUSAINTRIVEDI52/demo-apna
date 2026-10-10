'use client';

import React from 'react';
import { MOCK_HOW_IT_WORKS } from '@/lib/mock-data';
import { Tabs, TabsList, TabsTrigger, TabsContent, Badge, Card, CardHeader, CardTitle, CardContent } from '@/components/ui';
import { Search, Footprints, ShieldCheck, PlusCircle, CheckCircle, HelpCircle } from 'lucide-react';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-surface-sage text-primary text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-accent-dark" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            How Tabalat Housing Works
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            Designed for transparent, safe, and direct interaction between community members looking for accommodation and property hosts.
          </p>
        </div>

        {/* Tabs for Seekers and Owners */}
        <Tabs defaultValue="seekers" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="p-1.5 bg-surface-sage border border-surface-sage-dark rounded-xl">
              <TabsTrigger value="seekers" className="text-xs sm:text-sm px-6 py-2.5">
                For Accommodation Seekers
              </TabsTrigger>
              <TabsTrigger value="owners" className="text-xs sm:text-sm px-6 py-2.5">
                For Room Owners & Hosts
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Seekers Tab Content */}
          <TabsContent value="seekers">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_HOW_IT_WORKS.seekers.map((item, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-surface-light p-6 border border-surface-sage-dark shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-bold text-accent-dark">
                        {item.step}
                      </span>
                      <Badge variant="sage" size="sm">{item.badge}</Badge>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary-hover transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-sage-dark/40 flex items-center text-xs text-primary font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-dark mr-1.5" />
                    <span>Verified Community Experience</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Owners Tab Content */}
          <TabsContent value="owners">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MOCK_HOW_IT_WORKS.owners.map((item, idx) => (
                <div
                  key={idx}
                  className="relative rounded-2xl bg-surface-light p-6 border border-surface-sage-dark shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-bold text-accent-dark">
                        {item.step}
                      </span>
                      <Badge variant="accent" size="sm">{item.badge}</Badge>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-primary group-hover:text-primary-hover transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-surface-sage-dark/40 flex items-center text-xs text-primary font-medium">
                    <CheckCircle className="w-3.5 h-3.5 text-accent-dark mr-1.5" />
                    <span>Direct WhatsApp / Call Contact</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
