'use client';

import React, { useState } from 'react';
import {
  Modal,
  Button,
  Input,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
} from '@/components/ui';
import { ShieldCheck, User, KeyRound, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'its' | 'email'>('its');
  const [itsNumber, setItsNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      title={
        <div className="flex items-center space-x-2">
          <span>{defaultMode === 'login' ? 'Welcome to Tabalat Housing' : 'Join Tabalat Housing'}</span>
        </div>
      }
      description="Connect to your community housing portal with verified credentials."
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-primary flex items-center justify-center mx-auto border border-emerald-300">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="font-serif text-xl font-bold text-primary">
            Authentication Successful
          </h4>
          <p className="text-xs text-ink-muted max-w-xs mx-auto">
            Welcome back! You are authenticated as a verified community member.
          </p>
          <Button variant="primary" className="w-full" onClick={handleReset}>
            Continue to Portal
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Tabs defaultValue="its" value={activeTab} onValueChange={(v) => setActiveTab(v as 'its' | 'email')}>
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="its" className="w-full flex items-center justify-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ITS ID Login</span>
              </TabsTrigger>
              <TabsTrigger value="email" className="w-full flex items-center justify-center space-x-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>Email / Phone</span>
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4 pt-2">
              <TabsContent value="its" className="space-y-3">
                <Input
                  label="ITS ID Number"
                  placeholder="e.g. 20485912"
                  required
                  value={itsNumber}
                  onChange={(e) => setItsNumber(e.target.value)}
                  leftIcon={<ShieldCheck className="w-4 h-4 text-accent-dark" />}
                  helperText="Enter your 8-digit ITS identification number"
                />
                <Input
                  label="Password / OTP"
                  type="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  leftIcon={<KeyRound className="w-4 h-4 text-ink-muted" />}
                />
              </TabsContent>

              <TabsContent value="email" className="space-y-3">
                <Input
                  label="Email or Mobile"
                  placeholder="your.name@example.com"
                  required
                  type="text"
                  leftIcon={<User className="w-4 h-4 text-ink-muted" />}
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  required
                  leftIcon={<KeyRound className="w-4 h-4 text-ink-muted" />}
                />
              </TabsContent>

              <div className="p-3 rounded-xl bg-surface-sage border border-surface-sage-dark text-[11px] text-ink-muted flex items-start space-x-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>
                  Your credentials are strictly used for community member verification and security.
                </span>
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {defaultMode === 'login' ? 'Sign In' : 'Create Account'}
              </Button>
            </form>
          </Tabs>
        </div>
      )}
    </Modal>
  );
}
