'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Home,
  PlusCircle,
  ShieldCheck,
  Menu,
  X,
  Globe,
  Calendar,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { Button, Badge } from '@/components/ui';

interface NavbarProps {
  onOpenListModal?: () => void;
  onOpenAuthModal?: (mode: 'login' | 'signup') => void;
}

export function Navbar({ onOpenListModal, onOpenAuthModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'GU' | 'AR'>('EN');

  // Islamic Hijri + Gregorian Date String
  const hijriDateDisplay = "29 Rabi' al-Awwal 1448 AH • 11 October 2026";

  return (
    <header className="sticky top-0 z-40 bg-surface-light/95 backdrop-blur-md border-b border-surface-sage-dark shadow-xs transition-shadow">
      {/* Top community status & Date Bar */}
      <div className="bg-primary text-surface-light text-xs py-1.5 px-4 border-b border-primary-dark/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="font-medium tracking-wide hidden sm:inline">
              Dedicated accommodation portal for Dawoodi Bohra Mumineen
            </span>
            <span className="font-medium tracking-wide sm:hidden">
              Tabalat Housing Portal
            </span>
          </div>

          {/* Hijri + Gregorian date & Language */}
          <div className="flex items-center space-x-3 text-xs">
            {/* Optional Small Hijri + Gregorian Date */}
            <div className="hidden md:flex items-center space-x-1.5 text-accent-surface font-serif text-[11px] tracking-wide border-r border-primary-light/60 pr-3">
              <Calendar className="w-3 h-3 text-accent" />
              <span>{hijriDateDisplay}</span>
            </div>

            <div className="hidden lg:flex items-center space-x-1.5 text-accent-light text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>ITS Verified Network</span>
            </div>

            <div className="flex items-center space-x-1 bg-primary-dark/70 rounded-md px-2 py-0.5 border border-primary-light/30">
              <Globe className="w-3 h-3 text-accent" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'EN' | 'GU' | 'AR')}
                className="bg-transparent text-surface-light text-xs outline-hidden cursor-pointer"
                aria-label="Language Selector"
              >
                <option value="EN" className="text-ink">English</option>
                <option value="GU" className="text-ink">ગુજરાતી (Gujarati)</option>
                <option value="AR" className="text-ink">العربية (Arabic)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-primary border-2 border-accent/60 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <div className="relative flex items-center justify-center">
                <Home className="w-5 h-5 text-accent" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-light opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-primary">
                  Tabalat
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-accent-surface text-accent-dark border border-accent/40 font-sans">
                  Housing
                </span>
              </div>
              <p className="text-[11px] text-ink-muted font-normal">
                Bohra Community Stays & PG
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            <Link
              href="#browse"
              className="text-sm font-medium text-ink hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all"
            >
              Browse Rooms
            </Link>
            <button
              onClick={onOpenListModal}
              className="text-sm font-medium text-ink hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all cursor-pointer"
            >
              List a Vacancy
            </button>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-ink hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all"
            >
              How it Works
            </Link>
            <Link
              href="#trust-safety"
              className="text-sm font-medium text-ink hover:text-primary transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-accent hover:after:w-full after:transition-all"
            >
              About
            </Link>
          </nav>

          {/* Action CTAs: Login, Sign up, List */}
          <div className="hidden sm:flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenAuthModal?.('login')}
              leftIcon={<LogIn className="w-3.5 h-3.5 text-primary" />}
            >
              Login
            </Button>
            <Button
              variant="sage"
              size="sm"
              onClick={() => onOpenAuthModal?.('signup')}
              leftIcon={<UserPlus className="w-3.5 h-3.5 text-primary" />}
            >
              Sign Up
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={onOpenListModal}
              leftIcon={<PlusCircle className="w-3.5 h-3.5 text-accent" />}
            >
              List Space
            </Button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-primary hover:bg-surface-sage transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-surface-sage-dark bg-surface-light px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {/* Mobile date badge */}
          <div className="flex items-center space-x-1.5 text-xs text-accent-dark font-serif bg-accent-surface p-2 rounded-lg">
            <Calendar className="w-3.5 h-3.5 text-accent-dark" />
            <span>{hijriDateDisplay}</span>
          </div>

          <Link
            href="#browse"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink hover:bg-surface-sage"
          >
            Browse Rooms
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenListModal?.();
            }}
            className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-ink hover:bg-surface-sage cursor-pointer"
          >
            List a Vacancy
          </button>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink hover:bg-surface-sage"
          >
            How it Works
          </Link>
          <Link
            href="#trust-safety"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-md text-sm font-medium text-ink hover:bg-surface-sage"
          >
            About & Trust Standards
          </Link>

          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-sage-dark">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal?.('login');
              }}
              className="w-full"
            >
              Login
            </Button>
            <Button
              variant="sage"
              size="sm"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuthModal?.('signup');
              }}
              className="w-full"
            >
              Sign Up
            </Button>
          </div>

          <div className="pt-1">
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenListModal?.();
              }}
              leftIcon={<PlusCircle className="w-4 h-4 text-accent" />}
            >
              List a Vacancy
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
