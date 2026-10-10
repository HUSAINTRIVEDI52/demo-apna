'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Input,
  Select,
  Textarea,
  Checkbox,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Modal,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  Skeleton,
  PatternBackground,
} from '@/components/ui';
import {
  Search,
  Mail,
  Home,
  ShieldCheck,
  Footprints,
  Utensils,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Layers,
  Palette,
  Type,
  Component,
} from 'lucide-react';

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [checkboxState, setCheckboxState] = useState(true);
  const [patternOpacity, setPatternOpacity] = useState(0.12);
  const [patternColor, setPatternColor] = useState('#C9A24B');
  const [patternType, setPatternType] = useState<'stars' | 'lattice'>('stars');
  const [buttonLoading, setButtonLoading] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-ink">
      {/* Top Banner Header */}
      <header className="sticky top-0 z-30 bg-surface-light/95 backdrop-blur-md border-b border-surface-sage-dark px-6 py-4 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="inline-flex items-center space-x-1.5 text-xs font-semibold text-primary hover:text-primary-hover bg-surface-sage px-3 py-1.5 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to App</span>
            </Link>
            <div className="h-4 w-px bg-ink-border"></div>
            <h1 className="font-serif text-xl font-bold text-primary">
              Tabalat Housing Design System
            </h1>
          </div>
          <Badge variant="accent" size="md" icon={<Sparkles className="w-3 h-3" />}>
            v1.0 Token Standard
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Intro */}
        <div className="max-w-3xl space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary">
            Design Language & Component Library
          </h2>
          <p className="text-sm text-ink-muted leading-relaxed">
            The visual and structural foundations for Tabalat Housing. Designed to be respectful, warm, community-oriented, and accessible (WCAG AA).
          </p>
        </div>

        {/* SECTION 1: COLOR PALETTE */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-surface-sage-dark pb-2">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-primary">
              1. Color Palette Tokens
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Primary Emerald */}
            <Card>
              <CardHeader>
                <div className="h-20 rounded-xl bg-primary flex items-end p-3 text-surface-light font-bold text-sm shadow-inner">
                  Primary (#0B4F3F)
                </div>
                <CardTitle className="text-base mt-2">Deep Emerald</CardTitle>
                <CardDescription>Primary brand color representing heritage, trust, and growth.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">primary</span>
                  <span className="font-mono font-bold">#0B4F3F</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">primary-hover</span>
                  <span className="font-mono font-bold">#083D31</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-muted">primary-surface</span>
                  <span className="font-mono font-bold">#EAF4F0</span>
                </div>
              </CardContent>
            </Card>

            {/* Accent Gold */}
            <Card>
              <CardHeader>
                <div className="h-20 rounded-xl bg-accent flex items-end p-3 text-ink font-bold text-sm shadow-inner">
                  Accent (#C9A24B)
                </div>
                <CardTitle className="text-base mt-2">Antique Gold</CardTitle>
                <CardDescription>Accent token for verification, highlights, and subtle warmth.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">accent</span>
                  <span className="font-mono font-bold">#C9A24B</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">accent-dark</span>
                  <span className="font-mono font-bold">#9A7523</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-muted">accent-surface</span>
                  <span className="font-mono font-bold">#FAF5E8</span>
                </div>
              </CardContent>
            </Card>

            {/* Surface Ivory */}
            <Card>
              <CardHeader>
                <div className="h-20 rounded-xl bg-surface border border-ink-border flex items-end p-3 text-ink font-bold text-sm shadow-inner">
                  Surface (#FAF6EC)
                </div>
                <CardTitle className="text-base mt-2">Ivory & Sage</CardTitle>
                <CardDescription>Calm, warm background and card surface foundations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">surface</span>
                  <span className="font-mono font-bold">#FAF6EC</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">surface-light</span>
                  <span className="font-mono font-bold">#FDFBF6</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-muted">surface-sage</span>
                  <span className="font-mono font-bold">#E8EFEA</span>
                </div>
              </CardContent>
            </Card>

            {/* Ink Charcoal */}
            <Card>
              <CardHeader>
                <div className="h-20 rounded-xl bg-ink flex items-end p-3 text-surface-light font-bold text-sm shadow-inner">
                  Ink (#1F2933)
                </div>
                <CardTitle className="text-base mt-2">Charcoal Ink</CardTitle>
                <CardDescription>High contrast (WCAG AAA) typography and border tokens.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 pt-0 text-xs">
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">ink</span>
                  <span className="font-mono font-bold">#1F2933</span>
                </div>
                <div className="flex justify-between py-1 border-b border-surface-sage-dark/30">
                  <span className="text-ink-muted">ink-muted</span>
                  <span className="font-mono font-bold">#52606D</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-ink-muted">ink-border</span>
                  <span className="font-mono font-bold">#D8E0D5</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 2: TYPOGRAPHY */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-surface-sage-dark pb-2">
            <Type className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-primary">
              2. Typography & Multilingual Support
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Heading Serif (Cormorant Garamond)</CardTitle>
                <CardDescription>For headings, titles, quotes, and primary brand labels.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="font-serif text-3xl font-bold text-primary">
                  Tabalat Housing Community Portal
                </div>
                <div className="font-serif text-xl font-semibold text-accent-dark">
                  Find Accommodations Near Masajid & Jamaat Khana
                </div>
                <div className="font-serif text-base italic text-ink-muted">
                  &ldquo;A clean and respectful living environment for mumineen.&rdquo;
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Sans (Inter) & Multilingual</CardTitle>
                <CardDescription>Clean UI readability with Gujarati and Arabic script support.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-semibold text-ink-muted uppercase">English (Inter):</span>
                  <p className="text-ink">Direct community exchange without broker fees or commissions.</p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-ink-muted uppercase">Gujarati (Noto Sans Gujarati):</span>
                  <p className="font-gujarati text-primary font-medium">
                    દાઉદી વ્હોરા કોમ્યુનિટી માટે રૂમ અને પીજી આવાસ સેવા.
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-ink-muted uppercase">Arabic (Noto Naskh Arabic):</span>
                  <p className="font-arabic text-primary text-base">
                    سكن وغرف مخصصة لأبناء المجتمع المؤمنين بالقرب من المساجد
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* SECTION 3: REUSABLE PATTERN BACKGROUND */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-surface-sage-dark pb-2">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-primary">
              3. PatternBackground Component
            </h3>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Geometric Islamic SVG Pattern</CardTitle>
              <CardDescription>
                Subtle 8-point geometric star and lattice tessellations with customizable opacity and color props.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Pattern Preview Box */}
              <PatternBackground
                opacity={patternOpacity}
                color={patternColor}
                patternType={patternType}
                className="h-48 rounded-xl border border-ink-border bg-surface-light flex items-center justify-center p-6 text-center"
              >
                <div className="relative z-10 max-w-md bg-surface-light/90 backdrop-blur-xs p-4 rounded-xl border border-accent/40 shadow-md">
                  <h4 className="font-serif text-lg font-bold text-primary">
                    Live SVG Pattern Preview
                  </h4>
                  <p className="text-xs text-ink-muted mt-1">
                    Opacity: {patternOpacity} | Color: {patternColor} | Type: {patternType}
                  </p>
                </div>
              </PatternBackground>

              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted mb-1">
                    Pattern Opacity ({patternOpacity})
                  </label>
                  <input
                    type="range"
                    min="0.02"
                    max="0.4"
                    step="0.02"
                    value={patternOpacity}
                    onChange={(e) => setPatternOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted mb-1">
                    Pattern Color
                  </label>
                  <div className="flex items-center space-x-2">
                    {['#C9A24B', '#0B4F3F', '#1F2933', '#8EAFA0'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setPatternColor(c)}
                        style={{ backgroundColor: c }}
                        className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${
                          patternColor === c ? 'border-primary scale-110' : 'border-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted mb-1">
                    Pattern Type
                  </label>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant={patternType === 'stars' ? 'primary' : 'outline'}
                      onClick={() => setPatternType('stars')}
                    >
                      8-Point Stars
                    </Button>
                    <Button
                      size="sm"
                      variant={patternType === 'lattice' ? 'primary' : 'outline'}
                      onClick={() => setPatternType('lattice')}
                    >
                      Lattice
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 4: BASE UI COMPONENTS */}
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-surface-sage-dark pb-2">
            <Component className="w-5 h-5 text-primary" />
            <h3 className="font-serif text-2xl font-bold text-primary">
              4. Base UI Components Showcase
            </h3>
          </div>

          {/* Component Tabs */}
          <Tabs defaultValue="buttons">
            <TabsList className="flex-wrap">
              <TabsTrigger value="buttons">Buttons & Badges</TabsTrigger>
              <TabsTrigger value="forms">Form Inputs</TabsTrigger>
              <TabsTrigger value="cards">Cards & Skeletons</TabsTrigger>
              <TabsTrigger value="modals">Modal & Avatars</TabsTrigger>
            </TabsList>

            {/* TAB 1: BUTTONS & BADGES */}
            <TabsContent value="buttons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants & Sizes</CardTitle>
                  <CardDescription>Accessible buttons with loading states, variants, and icon slots.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Variants */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-ink-muted uppercase">Variants</span>
                    <div className="flex flex-wrap gap-3 items-center">
                      <Button variant="primary" leftIcon={<Home className="w-4 h-4" />}>
                        Primary Emerald
                      </Button>
                      <Button variant="gold" leftIcon={<Sparkles className="w-4 h-4 text-emerald-950" />}>
                        Gold Accent
                      </Button>
                      <Button variant="sage">Sage Surface</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-ink-muted uppercase">Sizes</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small Button</Button>
                      <Button size="md">Medium Button</Button>
                      <Button size="lg">Large Button</Button>
                    </div>
                  </div>

                  {/* Loading & State Toggle */}
                  <div className="space-y-2 pt-2 border-t border-surface-sage-dark/40">
                    <span className="text-xs font-semibold text-ink-muted uppercase">Interactive Loading Test</span>
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="primary"
                        isLoading={buttonLoading}
                        onClick={() => {
                          setButtonLoading(true);
                          setTimeout(() => setButtonLoading(false), 2000);
                        }}
                      >
                        Click to Trigger Loading State
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges */}
              <Card>
                <CardHeader>
                  <CardTitle>Badge Variants</CardTitle>
                  <CardDescription>Compact status and category indicators.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2.5 items-center">
                  <Badge variant="primary">Primary Tag</Badge>
                  <Badge variant="accent" icon={<Sparkles className="w-3 h-3" />}>Featured Stay</Badge>
                  <Badge variant="sage" icon={<Footprints className="w-3 h-3" />}>3 min to Masjid</Badge>
                  <Badge variant="surface" icon={<Utensils className="w-3 h-3" />}>FMB Friendly</Badge>
                  <Badge variant="success" icon={<CheckCircle2 className="w-3 h-3" />}>Available</Badge>
                  <Badge variant="warning">Reserved</Badge>
                  <Badge variant="outline">Unfurnished</Badge>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 2: FORMS */}
            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inputs, Selects & Textareas</CardTitle>
                  <CardDescription>Form controls with error handling, helper text, and icon accessories.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Search Location"
                      placeholder="e.g. Bhendi Bazaar / Marol"
                      leftIcon={<Search className="w-4 h-4" />}
                      helperText="Enter mohalla name or landmark"
                    />
                    <Input
                      label="ITS ID Verification"
                      placeholder="8-digit ITS number"
                      leftIcon={<ShieldCheck className="w-4 h-4 text-accent-dark" />}
                      defaultValue="20485912"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select
                      label="Property Type"
                      options={[
                        { value: 'pg', label: 'PG Accommodation' },
                        { value: 'private_room', label: 'Private Room' },
                        { value: 'full_flat', label: 'Full Flat / Apartment' },
                      ]}
                    />
                    <Input
                      label="Validation Error State"
                      defaultValue="invalid-email"
                      error="Please enter a valid community contact email"
                      leftIcon={<Mail className="w-4 h-4" />}
                    />
                  </div>

                  <Textarea
                    label="Description / Special Instructions"
                    placeholder="Provide details on prayer hall proximity, cleanliness rules, FMB thali arrangements..."
                    rows={3}
                  />

                  <div className="space-y-2 pt-2 border-t border-surface-sage-dark/40">
                    <span className="text-xs font-semibold text-ink-muted uppercase">Checkboxes</span>
                    <div className="space-y-3">
                      <Checkbox
                        label="Faizul Mawaid al Burhaniyah (FMB) Friendly"
                        description="Accommodation allows daily tiffin delivery and has plate cleaning space."
                        checked={checkboxState}
                        onChange={(e) => setCheckboxState(e.target.checked)}
                      />
                      <Checkbox
                        label="ITS Verification Required"
                        description="Host requests ITS ID verification before confirming room viewing."
                        defaultChecked
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* TAB 3: CARDS & SKELETONS */}
            <TabsContent value="cards" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Sample Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge variant="accent">Featured PG</Badge>
                      <span className="font-serif text-xl font-bold text-primary">₹12,500/mo</span>
                    </div>
                    <CardTitle className="mt-2">Al-Saadah Tower Room</CardTitle>
                    <CardDescription>3 min walking to Raudat Tahera, Bhendi Bazaar</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-xs">
                    <div className="p-3 bg-surface-sage rounded-lg flex items-center justify-between">
                      <span className="text-ink font-medium">Occupancy:</span>
                      <span className="font-semibold text-primary">Bhaiyo Only (2 Sharing)</span>
                    </div>
                    <p className="text-ink-muted">
                      Renovated room with attached bath, study desks, and high-speed Wi-Fi.
                    </p>
                  </CardContent>
                  <CardFooter className="justify-end space-x-2">
                    <Button size="sm" variant="outline">Details</Button>
                    <Button size="sm" variant="primary">Connect</Button>
                  </CardFooter>
                </Card>

                {/* Skeleton Loader Card */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mt-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </CardContent>
                  <CardFooter className="justify-end space-x-2">
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-8 w-20" />
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            {/* TAB 4: MODALS & AVATARS */}
            <TabsContent value="modals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Avatars & Verified Badges</CardTitle>
                  <CardDescription>User profile photos with fallback initials and ITS verification checkmarks.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-6">
                  <div className="text-center space-y-1">
                    <Avatar size="sm" name="Shk Shabbir" isVerified />
                    <div className="text-[10px] text-ink-muted">Small (32px)</div>
                  </div>
                  <div className="text-center space-y-1">
                    <Avatar size="md" name="Fatema Vajihi" isVerified />
                    <div className="text-[10px] text-ink-muted">Medium (40px)</div>
                  </div>
                  <div className="text-center space-y-1">
                    <Avatar size="lg" name="Murtaza Khambhati" isVerified />
                    <div className="text-[10px] text-ink-muted">Large (56px)</div>
                  </div>
                  <div className="text-center space-y-1">
                    <Avatar
                      size="xl"
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop"
                      name="Shabbir Merchant"
                      isVerified
                    />
                    <div className="text-[10px] text-ink-muted">XL (80px)</div>
                  </div>
                </CardContent>
              </Card>

              {/* Modal trigger preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Modal Dialog</CardTitle>
                  <CardDescription>Accessible overlay dialog with focus management and escape key support.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="primary" onClick={() => setModalOpen(true)}>
                    Open Preview Modal
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Interactive Modal Component Demo */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Verified Community Connect"
        description="Connect directly with verified room hosts in the Dawoodi Bohra community."
        size="md"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setModalOpen(false)}>
              Confirm & Continue
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-sm text-ink">
          <p>
            This modal demonstrates the standard accessible dialog wrapper with custom antique gold borders and ivory surfaces.
          </p>
          <div className="p-3 bg-surface-sage rounded-xl border border-surface-sage-dark text-xs flex items-center space-x-2">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <span>All inquiries are encrypted and routed directly to the verified host.</span>
          </div>
        </div>
      </Modal>
    </div>
  );
}
