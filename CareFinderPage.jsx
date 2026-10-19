import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import StandingDisclaimer from '../components/StandingDisclaimer';
import AudioReaderButton from '../components/AudioReaderButton';
import CareCardDetailModal from './CareCardDetailModal';
import { 
  Search, 
  MapPin, 
  Filter, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Phone, 
  ExternalLink, 
  SlidersHorizontal, 
  Building2, 
  Sparkles, 
  Accessibility, 
  Map as MapIcon, 
  List, 
  X,
  AlertCircle
} from 'lucide-react';

export default function CareFinderPage() {
  const {
    providers,
    savedProviderIds,
    toggleSaveProvider,
    careFinderPreFilter,
    setCareFinderPreFilter,
    selectedProviderForModal,
    setSelectedProviderForModal,
    setSuggestCorrectionModal
  } = useApp();

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(careFinderPreFilter.topic || '');
  const [postcode, setPostcode] = useState('N5 (Highbury & Islington)');
  const [maxDistance, setMaxDistance] = useState('10'); // 1, 5, 10, 25
  const [selectedService, setSelectedService] = useState(careFinderPreFilter.service || 'all');
  const [vaccinationDayOnly, setVaccinationDayOnly] = useState(careFinderPreFilter.topic === 'vaccination');
  const [walkInsOnly, setWalkInsOnly] = useState(false);
  const [wheelchairOnly, setWheelchairOnly] = useState(false);
  const [quietRoomOnly, setQuietRoomOnly] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'verified', 'name'
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'map'
  const [selectedMapPinId, setSelectedMapPinId] = useState(null);

  // Filter logic
  const filteredProviders = useMemo(() => {
    return providers.filter(prov => {
      // Distance filter
      if (prov.distanceKm > parseFloat(maxDistance)) return false;

      // Text query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = prov.name.toLowerCase().includes(q);
        const matchesTag = prov.tagline.toLowerCase().includes(q);
        const matchesGoodToKnow = prov.goodToKnow.toLowerCase().includes(q);
        const matchesServices = prov.services.some(s => s.toLowerCase().includes(q));
        const matchesDoctors = prov.doctorsByTopic.some(d => d.name.toLowerCase().includes(q) || d.topic.toLowerCase().includes(q));
        if (!matchesName && !matchesTag && !matchesGoodToKnow && !matchesServices && !matchesDoctors) {
          return false;
        }
      }

      // Service filter
      if (selectedService !== 'all') {
        const hasService = prov.services.some(s => s.toLowerCase().includes(selectedService.toLowerCase()));
        if (!hasService) return false;
      }

      // Vaccination day available filter
      if (vaccinationDayOnly) {
        const hasVaccines = prov.vaccinationCalendar.some(v => v.day !== 'Not a vaccination centre' && v.day !== 'No vaccinations offered');
        if (!hasVaccines) return false;
      }

      // Walk-ins only
      if (walkInsOnly && !prov.acceptsWalkIns) return false;

      // Wheelchair accessibility
      if (wheelchairOnly) {
        const hasWheelchair = prov.accessibility.some(a => 
          a.toLowerCase().includes('step-free') || 
          a.toLowerCase().includes('wheelchair') || 
          a.toLowerCase().includes('lift') || 
          a.toLowerCase().includes('ramp')
        );
        if (!hasWheelchair) return false;
      }

      // Quiet sensory room
      if (quietRoomOnly) {
        const hasQuiet = prov.accessibility.some(a => a.toLowerCase().includes('quiet') || a.toLowerCase().includes('sensory'));
        if (!hasQuiet) return false;
      }

      // Verified only
      if (verifiedOnly && prov.verificationStatus === 'unverified') return false;

      // Language filter
      if (selectedLanguage !== 'all') {
        const speaksLang = prov.languagesSpoken.some(l => l.toLowerCase().includes(selectedLanguage.toLowerCase()));
        if (!speaksLang) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'verified') {
        const rank = { official: 1, 'provider-confirmed': 2, 'provider-submitted': 3, unverified: 4 };
        return rank[a.verificationStatus] - rank[b.verificationStatus];
      }
      return a.name.localeCompare(b.name);
    });
  }, [
    providers, 
    searchQuery, 
    maxDistance, 
    selectedService, 
    vaccinationDayOnly, 
    walkInsOnly, 
    wheelchairOnly, 
    quietRoomOnly, 
    verifiedOnly, 
    selectedLanguage, 
    sortBy
  ]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setMaxDistance('10');
    setSelectedService('all');
    setVaccinationDayOnly(false);
    setWalkInsOnly(false);
    setWheelchairOnly(false);
    setQuietRoomOnly(false);
    setVerifiedOnly(false);
    setSelectedLanguage('all');
    setCareFinderPreFilter({ topic: '', service: '' });
  };

  return (
    <div className="animate-fade-in">
      {/* Search Header */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
              <Building2 size={16} />
              <span>Verified Local Care & Professional Directory</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0.25rem 0 0.5rem 0' }}>
              Nearby Healthcare & Child Services
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '780px', lineHeight: 1.5 }}>
              Find community health centres, vaccination baby clinics, paediatric physiotherapists, speech specialists and family centres. We clearly verify sources and label unconfirmed listings.
            </p>
          </div>

          {/* View Mode Switcher: List vs Map */}
          <div style={{ display: 'inline-flex', backgroundColor: '#ffffff', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-mint-border)', padding: '0.2rem' }}>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="btn-pill"
              style={{
                fontSize: '0.82rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: viewMode === 'list' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'list' ? '#ffffff' : 'var(--color-text-muted)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <List size={14} />
              <span>List View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className="btn-pill"
              style={{
                fontSize: '0.82rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: viewMode === 'map' ? 'var(--color-primary)' : 'transparent',
                color: viewMode === 'map' ? '#ffffff' : 'var(--color-text-muted)',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <MapIcon size={14} />
              <span>Map View</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Manual Postal Area Input */}
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid var(--color-mint-border)', 
            borderRadius: 'var(--radius-lg)', 
            padding: '1rem',
            marginTop: '1.25rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '0.75rem',
            alignItems: 'center'
          }}
        >
          {/* Keyword Search */}
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, clinic name, or doctor..."
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-mint-border)',
                fontSize: '0.9rem'
              }}
              aria-label="Search clinics and services"
            />
          </div>

          {/* Area / Postcode with Privacy Notice */}
          <div style={{ position: 'relative' }}>
            <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-primary)' }} />
            <input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="Enter postcode or neighbourhood..."
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-mint-border)',
                fontSize: '0.9rem'
              }}
              title="Manual location entry protects your privacy. We never store GPS location history."
              aria-label="Area or postcode"
            />
          </div>

          {/* Distance Radius */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
              Radius:
            </span>
            <select
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              style={{
                padding: '0.65rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--color-mint-border)',
                backgroundColor: '#ffffff',
                fontSize: '0.85rem',
                width: '100%'
              }}
            >
              <option value="1">Within 1 km (Walking)</option>
              <option value="5">Within 5 km</option>
              <option value="10">Within 10 km</option>
              <option value="25">Within 25 km</option>
            </select>
          </div>
        </div>

        {/* Filter Chips Bar (Section 3.5 & Section 9) */}
        <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            flexWrap: 'wrap', 
            marginTop: '0.85rem' 
          }}
        >
          {/* Quick toggle chips */}
          <button
            type="button"
            onClick={() => setVaccinationDayOnly(!vaccinationDayOnly)}
            className="btn-pill"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: vaccinationDayOnly ? 'var(--color-primary)' : '#ffffff',
              color: vaccinationDayOnly ? '#ffffff' : 'var(--color-text-main)',
              fontWeight: 500
            }}
          >
            💉 Vaccination Day Available
          </button>

          <button
            type="button"
            onClick={() => setWalkInsOnly(!walkInsOnly)}
            className="btn-pill"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: walkInsOnly ? 'var(--color-primary)' : '#ffffff',
              color: walkInsOnly ? '#ffffff' : 'var(--color-text-main)',
              fontWeight: 500
            }}
          >
            🚶 Accepts Walk-ins
          </button>

          <button
            type="button"
            onClick={() => setWheelchairOnly(!wheelchairOnly)}
            className="btn-pill"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: wheelchairOnly ? 'var(--color-primary)' : '#ffffff',
              color: wheelchairOnly ? '#ffffff' : 'var(--color-text-main)',
              fontWeight: 500
            }}
          >
            ♿ Step-free / Wheelchair
          </button>

          <button
            type="button"
            onClick={() => setQuietRoomOnly(!quietRoomOnly)}
            className="btn-pill"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: quietRoomOnly ? 'var(--color-primary)' : '#ffffff',
              color: quietRoomOnly ? '#ffffff' : 'var(--color-text-main)',
              fontWeight: 500
            }}
          >
            🌿 Quiet Sensory Space
          </button>

          <button
            type="button"
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            className="btn-pill"
            style={{
              fontSize: '0.8rem',
              padding: '0.35rem 0.8rem',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: verifiedOnly ? 'var(--color-primary)' : '#ffffff',
              color: verifiedOnly ? '#ffffff' : 'var(--color-text-main)',
              fontWeight: 500
            }}
          >
            ✓ Verified Only
          </button>

          {(searchQuery || selectedService !== 'all' || vaccinationDayOnly || walkInsOnly || wheelchairOnly || quietRoomOnly || verifiedOnly) && (
            <button
              type="button"
              onClick={clearAllFilters}
              style={{ fontSize: '0.78rem', color: 'var(--color-primary)', textDecoration: 'underline', padding: '0.2rem 0.5rem' }}
            >
              Reset all filters
            </button>
          )}
        </div>
      </section>

      {/* Results Count & Sort By */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Showing <strong>{filteredProviders.length}</strong> care {filteredProviders.length === 1 ? 'provider' : 'providers'} near {postcode}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}>
          <span style={{ color: 'var(--color-text-muted)' }}>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.25rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--color-mint-border)',
              backgroundColor: '#ffffff',
              fontSize: '0.82rem'
            }}
          >
            <option value="distance">Distance (Closest first)</option>
            <option value="verified">Verification level</option>
            <option value="name">Provider Name</option>
          </select>
        </div>
      </div>

      {/* VIEW MODE: MAP VIEW */}
      {viewMode === 'map' && (
        <section 
          className="card-calm"
          style={{
            padding: '1.25rem',
            marginBottom: '1.75rem',
            backgroundColor: '#eef5f0',
            borderColor: 'var(--color-mint-border)'
          }}
          aria-label="Interactive map of nearby clinics"
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
              <MapIcon size={16} style={{ color: 'var(--color-primary)' }} />
              <span>Interactive Local Clinic Map ({postcode})</span>
            </div>
            <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
              Click any pin to inspect details
            </span>
          </div>

          {/* SVG Map Canvas */}
          <div 
            style={{ 
              width: '100%', 
              height: '340px', 
              backgroundColor: '#e6efe9', 
              borderRadius: 'var(--radius-md)', 
              position: 'relative', 
              overflow: 'hidden',
              border: '1px solid var(--color-mint-border)' 
            }}
          >
            {/* Visual map roads & park contours */}
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5e6dc" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              {/* Park green patches */}
              <circle cx="180" cy="120" r="70" fill="#d2e7d8" opacity="0.6" />
              <circle cx="480" cy="200" r="90" fill="#d2e7d8" opacity="0.6" />
              {/* Main transit roads */}
              <line x1="0" y1="180" x2="800" y2="160" stroke="#ffffff" strokeWidth="8" />
              <line x1="300" y1="0" x2="320" y2="340" stroke="#ffffff" strokeWidth="8" />
              {/* User location dot */}
              <circle cx="280" cy="170" r="12" fill="rgba(43, 97, 73, 0.2)" />
              <circle cx="280" cy="170" r="6" fill="var(--color-primary)" />
            </svg>

            {/* Pins for filtered providers */}
            {filteredProviders.map((prov, idx) => {
              // Deterministic coordinates based on index
              const pinPositions = [
                { x: '35%', y: '42%' },
                { x: '55%', y: '30%' },
                { x: '68%', y: '65%' },
                { x: '25%', y: '68%' },
                { x: '45%', y: '75%' },
                { x: '72%', y: '25%' }
              ];
              const pos = pinPositions[idx % pinPositions.length];
              const isSelected = selectedMapPinId === prov.id;

              return (
                <button
                  key={prov.id}
                  type="button"
                  onClick={() => {
                    setSelectedMapPinId(prov.id);
                    setSelectedProviderForModal(prov);
                  }}
                  style={{
                    position: 'absolute',
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -100%)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    zIndex: isSelected ? 20 : 10
                  }}
                  aria-label={`Clinic on map: ${prov.name}, ${prov.distanceKm} km`}
                >
                  <div 
                    style={{ 
                      backgroundColor: prov.verificationStatus === 'official' ? 'var(--color-primary)' : prov.verificationStatus === 'provider-confirmed' ? '#2f7457' : '#88998f',
                      color: '#ffffff',
                      padding: '0.35rem 0.65rem',
                      borderRadius: 'var(--radius-pill)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Building2 size={12} />
                    <span>{prov.name.split(' ')[0]} ({prov.distanceKm}km)</span>
                  </div>
                  <div 
                    style={{ 
                      width: 0, 
                      height: 0, 
                      borderLeft: '6px solid transparent', 
                      borderRight: '6px solid transparent', 
                      borderTop: `8px solid ${prov.verificationStatus === 'official' ? 'var(--color-primary)' : '#2f7457'}` 
                    }} 
                  />
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* VIEW MODE: LIST OF CARE CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        {filteredProviders.length === 0 ? (
          <div className="card-calm" style={{ textAlign: 'center', padding: '3rem 1.5rem' }}>
            <Building2 size={36} style={{ color: 'var(--color-mint-border)', margin: '0 auto 0.75rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', marginBottom: '0.35rem' }}>
              No clinics match your exact filters
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', maxWidth: '480px', margin: '0 auto 1.25rem auto' }}>
              Try expanding your distance radius, or clearing accessibility and service constraints to see all neighbourhood clinics.
            </p>
            <button
              type="button"
              onClick={clearAllFilters}
              className="btn-primary btn-pill"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredProviders.map(provider => {
            const isSaved = savedProviderIds.includes(provider.id);

            return (
              <article 
                key={provider.id} 
                className="card-calm"
                style={{
                  borderLeft: provider.verificationStatus === 'official' 
                    ? '4px solid var(--color-primary)' 
                    : provider.verificationStatus === 'provider-confirmed'
                    ? '4px solid #448366'
                    : '4px solid #b8c8be'
                }}
              >
                {/* Header row: Name, distance, verification badge */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ flex: 1, minWidth: '280px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <span className="badge-soft badge-neutral" style={{ fontSize: '0.72rem' }}>
                        {provider.type}
                      </span>
                      
                      {provider.verificationStatus === 'official' && (
                        <span className="badge-soft badge-verified" style={{ fontSize: '0.72rem' }}>
                          <ShieldCheck size={12} />
                          <span>Official Health Authority Registry</span>
                        </span>
                      )}

                      {provider.verificationStatus === 'provider-confirmed' && (
                        <span className="badge-soft badge-verified" style={{ fontSize: '0.72rem' }}>
                          <CheckCircle2 size={12} />
                          <span>Provider Verified ({provider.verificationDate})</span>
                        </span>
                      )}

                      {provider.verificationStatus === 'provider-submitted' && (
                        <span className="badge-soft badge-gentle" style={{ fontSize: '0.72rem' }}>
                          <Clock size={12} />
                          <span>Provider-Submitted</span>
                        </span>
                      )}

                      {provider.verificationStatus === 'unverified' && (
                        <span className="badge-soft badge-neutral" style={{ fontSize: '0.72rem' }}>
                          <AlertCircle size={12} />
                          <span>Unverified • Please call ahead</span>
                        </span>
                      )}
                    </div>

                    <h2 style={{ fontSize: '1.25rem', color: 'var(--color-sage-deep)', fontWeight: 700, lineHeight: 1.3 }}>
                      {provider.name}
                    </h2>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.82rem', marginTop: '0.2rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        {provider.distanceKm} km away
                      </span>
                      <span>•</span>
                      <span>{provider.travelTimeMinutes} mins travel</span>
                      <span>•</span>
                      <span>{provider.publicOrPrivate}</span>
                    </div>
                  </div>

                  {/* Save to Care Team & Audio Read */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <AudioReaderButton 
                      textToRead={`${provider.name}. ${provider.goodToKnow}`}
                      label="Listen"
                    />

                    <button
                      type="button"
                      onClick={() => toggleSaveProvider(provider.id)}
                      className="btn-outline btn-pill"
                      style={{
                        padding: '0.35rem 0.75rem',
                        fontSize: '0.8rem',
                        gap: '0.35rem',
                        color: isSaved ? '#b33' : 'var(--color-text-muted)',
                        borderColor: isSaved ? '#f0c0c0' : 'var(--color-mint-border)'
                      }}
                      title={isSaved ? 'Saved in My Care Team' : 'Save clinic'}
                    >
                      <Heart size={14} style={{ fill: isSaved ? '#b33' : 'none' }} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </div>

                {/* "Good to Know" Summary (Section 9 item 1) */}
                <div 
                  style={{ 
                    backgroundColor: 'var(--color-mint-light)', 
                    border: '1px solid var(--color-mint-border)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '0.75rem 0.95rem',
                    margin: '0.85rem 0',
                    fontSize: '0.88rem',
                    color: 'var(--color-text-main)',
                    lineHeight: 1.45
                  }}
                >
                  <strong>Good to know:</strong> {provider.goodToKnow}
                </div>

                {/* Quick Info Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
                  <div>
                    <strong style={{ color: 'var(--color-sage-deep)' }}>Key Services:</strong>{' '}
                    {provider.services.slice(0, 3).join(', ')}
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-sage-deep)' }}>Vaccination:</strong>{' '}
                    {provider.vaccinationCalendar[0]?.day}: {provider.vaccinationCalendar[0]?.hours || 'Check schedule'}
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-sage-deep)' }}>Accessibility:</strong>{' '}
                    {provider.accessibility[0]?.split(' ').slice(0, 6).join(' ')}...
                  </div>

                  <div>
                    <strong style={{ color: 'var(--color-sage-deep)' }}>Languages:</strong>{' '}
                    {provider.languagesSpoken.slice(0, 3).join(', ')}
                  </div>
                </div>

                {/* Action Buttons Footer */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap', 
                    gap: '0.75rem', 
                    marginTop: '1rem', 
                    paddingTop: '0.75rem', 
                    borderTop: '1px solid var(--color-mint-border)' 
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                    <MapPin size={14} style={{ color: 'var(--color-primary)' }} />
                    <span>{provider.address}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => setSuggestCorrectionModal(provider)}
                      style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textDecoration: 'underline' }}
                    >
                      Suggest correction
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProviderForModal(provider)}
                      className="btn-primary btn-pill"
                      style={{ fontSize: '0.82rem', padding: '0.35rem 0.9rem' }}
                    >
                      View Full Care Card →
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Detail Modal */}
      {selectedProviderForModal && (
        <CareCardDetailModal 
          provider={selectedProviderForModal} 
          onClose={() => setSelectedProviderForModal(null)} 
        />
      )}

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
