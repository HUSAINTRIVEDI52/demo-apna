'use client';

import React, { useState } from 'react';
import { Modal, Button, Input, Textarea, Select } from '@/components/ui';
import { HousingListing } from '@/lib/types';
import { ShieldCheck, MessageCircle, Phone, Send, CheckCircle2, Calendar, User, Clock } from 'lucide-react';

interface InquiryModalProps {
  listing: HousingListing | null;
  isOpen: boolean;
  onClose: () => void;
  inquiryType?: 'message' | 'callback';
}

export function InquiryModal({
  listing,
  isOpen,
  onClose,
  inquiryType = 'message',
}: InquiryModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    itsNumber: '',
    moveInDate: '',
    durationMonths: '6',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen || !listing) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.phone.trim() || formData.phone.length < 8)
      errs.phone = 'Please provide a valid contact phone number';
    if (!formData.moveInDate) errs.moveInDate = 'Please select your estimated move-in date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    // Format WhatsApp message
    const formattedMsg = encodeURIComponent(
      `Salaam ${listing.host.fullName},\n\nI am inquiring about your space on Tabalat Housing: "${listing.title}".\n\nMy Details:\n• Name: ${formData.fullName}\n• Phone: ${formData.phone}\n• ITS ID: ${formData.itsNumber || 'Available on request'}\n• Move-in Date: ${formData.moveInDate}\n• Intended Stay: ${formData.durationMonths} months\n• Inquiry Type: ${inquiryType === 'callback' ? 'Requested a Callback' : 'Direct Message'}\n• Message: ${formData.message || 'I would like to schedule a viewing.'}\n\nShukran.`
    );

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      const cleanPhone = listing.host.phoneNumber.replace(/[^0-9]/g, '');
      if (cleanPhone) {
        window.open(`https://wa.me/${cleanPhone}?text=${formattedMsg}`, '_blank');
      }
    }, 600);
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
          {inquiryType === 'callback' ? (
            <>
              <Phone className="w-5 h-5 text-accent-dark" />
              <span>Request a Callback</span>
            </>
          ) : (
            <>
              <MessageCircle className="w-5 h-5 text-accent-dark" />
              <span>Send Inquiry to Host</span>
            </>
          )}
        </div>
      }
      description={`Listing: ${listing.title}`}
    >
      {isSuccess ? (
        <div className="py-6 text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-primary flex items-center justify-center mx-auto border-2 border-primary">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="font-serif text-2xl font-bold text-primary">
            Inquiry Sent to Host!
          </h4>
          <p className="text-xs sm:text-sm text-ink-muted max-w-sm mx-auto leading-relaxed">
            Your inquiry has been shared with <strong className="text-ink">{listing.host.fullName}</strong>. They will contact you via WhatsApp or phone shortly.
          </p>
          <Button variant="primary" className="w-full mt-4" onClick={handleReset}>
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Quick host snapshot */}
          <div className="p-3 bg-surface-sage rounded-xl border border-surface-sage-dark text-xs flex items-center justify-between">
            <div>
              <span className="text-ink-muted">Host:</span>{' '}
              <strong className="text-primary">{listing.host.fullName}</strong> ({listing.host.jamaat})
            </div>
            <div className="text-[11px] text-accent-dark font-medium">
              ⚡ {listing.host.responseRate || 'Fast response'}
            </div>
          </div>

          <Input
            label="Full Name *"
            placeholder="e.g. Murtaza bhai Merchant"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4 text-ink-muted" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="WhatsApp / Phone *"
              placeholder="+91 98200 00000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              error={errors.phone}
              leftIcon={<Phone className="w-4 h-4 text-ink-muted" />}
            />
            <Input
              label="ITS Number (Optional)"
              placeholder="8-digit ITS"
              value={formData.itsNumber}
              onChange={(e) => setFormData({ ...formData, itsNumber: e.target.value })}
              leftIcon={<ShieldCheck className="w-4 h-4 text-accent-dark" />}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="Move-In Date *"
              type="date"
              value={formData.moveInDate}
              onChange={(e) => setFormData({ ...formData, moveInDate: e.target.value })}
              error={errors.moveInDate}
              leftIcon={<Calendar className="w-4 h-4 text-ink-muted" />}
            />
            <Select
              label="Duration of Stay"
              value={formData.durationMonths}
              onChange={(e) => setFormData({ ...formData, durationMonths: e.target.value })}
              options={[
                { value: '1', label: '1 Month (Short Stay)' },
                { value: '3', label: '3 Months' },
                { value: '6', label: '6 Months' },
                { value: '11', label: '11 Months (Standard)' },
                { value: '12', label: '1+ Year' },
              ]}
              leftIcon={<Clock className="w-4 h-4 text-ink-muted" />}
            />
          </div>

          <Textarea
            label="Message to Host"
            rows={3}
            placeholder="Introduce yourself (student/working/family), ask any questions about FMB thali or prayer halls..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />

          <div className="p-3 rounded-xl bg-surface-sage border border-surface-sage-dark text-[11px] text-ink-muted flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
            <span>Direct community contact. Zero broker fees or middlemen.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isLoading}
            leftIcon={<Send className="w-4 h-4 text-accent" />}
          >
            {inquiryType === 'callback' ? 'Request Callback via WhatsApp' : 'Send Direct Message'}
          </Button>
        </form>
      )}
    </Modal>
  );
}
