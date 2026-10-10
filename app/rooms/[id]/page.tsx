import React from 'react';
import { notFound } from 'next/navigation';
import { MOCK_HOUSING_LISTINGS } from '@/lib/mock-data';
import { RoomDetailClient } from './RoomDetailClient';

export function generateStaticParams() {
  return MOCK_HOUSING_LISTINGS.map((listing) => ({
    id: listing.id,
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const listingId = resolvedParams.id;

  const listing = MOCK_HOUSING_LISTINGS.find(
    (l) => l.id === listingId || l.slug === listingId
  );

  if (!listing) {
    return notFound();
  }

  return <RoomDetailClient listing={listing} />;
}
