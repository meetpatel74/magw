// src/app/exhibitions/[id]/page.jsx
"use client";

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/common/Button';
import { exhibitionService, artworkService } from '@/services/api';
import Link from 'next/link';

export default function ExhibitionDetails({ params }) {
  const { id } = params;
  const [exhibition, setExhibition] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExhibitionData = async () => {
      try {
        setLoading(true);
        
        // Fetch exhibition details
        const exhibitionData = await exhibitionService.getById(id);
        setExhibition(exhibitionData);
        
        // Fetch related artworks
        const artworksData = await artworkService.getAll({ exhibitionId: id });
        setArtworks(artworksData);
        
        setError(null);
      } catch (err) {
        console.error('Error fetching exhibition data:', err);
        setError('Failed to load exhibition details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExhibitionData();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-center py-8">Loading exhibition details...</p>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
          <Link href="/exhibitions">
            <Button variant="primary">Back to Exhibitions</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  if (!exhibition) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4">Exhibition Not Found</h2>
            <p className="mb-4">The exhibition you're looking for could not be found.</p>
            <Link href="/exhibitions">
              <Button variant="primary">Back to Exhibitions</Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <img
            src={exhibition.image || "/placeholder-exhibition.jpg"}
            alt={exhibition.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-3xl font-bold">{exhibition.title}</h1>
          <div className="flex gap-1">
            {exhibition.isCurrent && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Current
              </span>
            )}
            {exhibition.isUpcoming && (
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                Upcoming
              </span>
            )}
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">{exhibition.dateRange}</p>
        
        <div className="mt-6 md:grid md:grid-cols-3 md:gap-8">
          <div className="md:col-span-2">
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold mb-4">About this Exhibition</h2>
              <p className="mb-4">{exhibition.shortDescription}</p>
              
              {exhibition.fullDescription && (
                <div className="mt-4">
                  <p>{exhibition.fullDescription}</p>
                </div>
              )}
            </div>
            
            {/* Artworks Section */}
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4">Featured Artworks</h2>
              
              {artworks.length === 0 ? (
                <p>No artworks have been added to this exhibition yet.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {artworks.map((artwork) => (
                    <div key={artwork.id} className="border rounded-lg overflow-hidden">
                      <img 
                        src={artwork.image || "/placeholder-artwork.jpg"} 
                        alt={artwork.title} 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold">{artwork.title}</h3>
                        <p className="text-sm text-gray-600">{artwork.artist}, {artwork.year}</p>
                        <p className="text-sm text-gray-600">{artwork.medium}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white p-4 border rounded-lg shadow">
              <Button variant="primary" className="w-full" href={`/exhibitions/${id}/tickets`}>
                Buy Tickets
              </Button>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-medium mb-2">Exhibition Details</h3>
                <dl className="space-y-2">
                  <div>
                    <dt className="text-sm text-gray-500">Dates</dt>
                    <dd>{exhibition.dateRange}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Type</dt>
                    <dd className="capitalize">{exhibition.type || 'Not specified'}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-gray-500">Status</dt>
                    <dd>
                      {exhibition.isCurrent ? 'Currently Showing' : ''}
                      {exhibition.isUpcoming ? 'Coming Soon' : ''}
                      {!exhibition.isCurrent && !exhibition.isUpcoming ? 'Past Exhibition' : ''}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}