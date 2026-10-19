import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sprout, 
  Baby, 
  Globe, 
  Heart, 
  PhoneCall, 
  Bell, 
  ShieldCheck, 
  Users, 
  Plus, 
  Check, 
  Building2, 
  Eye,
  Type,
  SunMoon
} from 'lucide-react';

export default function Header() {
  const {
    currentPage,
    setCurrentPage,
    childrenList,
    activeChildId,
    setActiveChildId,
    activeChild,
    childAgeData,
    useCorrectedAge,
    setUseCorrectedAge,
    activeRegion,
    setActiveRegion,
    currentRegionMeta,
    textSize,
    setTextSize,
    highContrast,
    setHighContrast,
    setEmergencyModalOpen,
    setReassuranceDrawerOpen,
    setWeeklyDigestOpen,
    setProviderPortalOpen,
    setOnboardingOpen,
    setOnboardingMode
  } = useApp();

  const [childDropdownOpen, setChildDropdownOpen] = useState(false);
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);

  // Sync text size & high contrast with document.body
  React.useEffect(() => {
    document.body.classList.remove('text-medium', 'text-large');
    if (textSize === 'medium') document.body.classList.add('text-medium');
    if (textSize === 'large') document.body.classList.add('text-large');
  }, [textSize]);

  React.useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [highContrast]);

  const navItems = [
    { id: 'dashboard', label: 'Home' },
    { id: 'milestones', label: 'Milestones' },
    { id: 'vaccines', label: 'Vaccinations' },
    { id: 'care-finder', label: 'Care Finder' },
    { id: 'visit-prep', label: 'Doctor Visit Prep' },
    { id: 'learn', label: 'Learn & Guidance' },
    { id: 'profile-sharing', label: 'Family & Care Team' },
    { id: 'privacy', label: 'Privacy' }
  ];

  return (
    <header style={{ backgroundColor: 'var(--color-surface-white)', borderBottom: '1px solid var(--color-mint-border)' }}>
      {/* Top Accessibility & Region Bar */}
      <div 
        style={{ 
          backgroundColor: 'var(--color-mint-light)', 
          borderBottom: '1px solid var(--color-mint-border)',
          padding: '0.4rem 1rem',
          fontSize: '0.82rem',
          color: 'var(--color-text-muted)'
        }}
      >
        <div style={{ maxWidth: '1220px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            {/* Region Selector */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                onClick={() => setRegionDropdownOpen(!regionDropdownOpen)}
                className="btn-outline btn-pill"
                style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', backgroundColor: '#ffffff', gap: '0.35rem' }}
                aria-haspopup="true"
                aria-expanded={regionDropdownOpen}
                aria-label={`Current schedule region: ${currentRegionMeta.name}. Click to change region.`}
              >
                <Globe size={13} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
                <span>Region: <strong>{currentRegionMeta.name.split(' ')[0]}</strong></span>
              </button>

              {regionDropdownOpen && (
                <div 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '4px',
                    backgroundColor: '#ffffff',
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 100,
                    minWidth: '260px',
                    padding: '0.5rem'
                  }}
                  role="menu"
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-sage-deep)', padding: '0.3rem 0.5rem' }}>
                    Select Public Health Authority Schedule:
                  </div>
                  {[
                    { id: 'uk', label: 'United Kingdom (NHS)' },
                    { id: 'us', label: 'United States (CDC/ACIP)' },
                    { id: 'in', label: 'India (UIP & IAP)' },
                    { id: 'au', label: 'Australia (NIP)' }
                  ].map(reg => (
                    <button
                      key={reg.id}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        setActiveRegion(reg.id);
                        setRegionDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '0.45rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: activeRegion === reg.id ? 'var(--color-mint-light)' : 'transparent',
                        color: 'var(--color-text-main)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontSize: '0.82rem'
                      }}
                    >
                      <span>{reg.label}</span>
                      {activeRegion === reg.id && <Check size={14} style={{ color: 'var(--color-primary)' }} />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Privacy summary pill */}
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--color-text-muted)' }}>
              <ShieldCheck size={14} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <span>No ads • Nicknames welcome • Private health data</span>
            </span>
          </div>

          {/* Accessibility controls & Help quick actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* Font size adjuster */}
            <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 'var(--radius-pill)', border: '1px solid var(--color-mint-border)', padding: '0.1rem 0.35rem' }}>
              <Type size={13} style={{ marginRight: '0.2rem', color: 'var(--color-text-muted)' }} aria-hidden="true" />
              <button
                type="button"
                onClick={() => setTextSize('standard')}
                style={{ padding: '0.15rem 0.35rem', fontSize: '0.75rem', fontWeight: textSize === 'standard' ? 'bold' : 'normal', color: textSize === 'standard' ? 'var(--color-primary)' : 'inherit' }}
                aria-label="Set standard text size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setTextSize('medium')}
                style={{ padding: '0.15rem 0.35rem', fontSize: '0.82rem', fontWeight: textSize === 'medium' ? 'bold' : 'normal', color: textSize === 'medium' ? 'var(--color-primary)' : 'inherit' }}
                aria-label="Set medium text size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setTextSize('large')}
                style={{ padding: '0.15rem 0.35rem', fontSize: '0.9rem', fontWeight: textSize === 'large' ? 'bold' : 'normal', color: textSize === 'large' ? 'var(--color-primary)' : 'inherit' }}
                aria-label="Set large text size"
              >
                A++
              </button>
            </div>

            {/* High Contrast Toggle */}
            <button
              type="button"
              onClick={() => setHighContrast(!highContrast)}
              className="btn-outline btn-pill"
              style={{ fontSize: '0.78rem', padding: '0.2rem 0.55rem', backgroundColor: highContrast ? 'var(--color-primary)' : '#ffffff', color: highContrast ? '#ffffff' : 'inherit' }}
              aria-pressed={highContrast}
              title="Toggle high contrast display"
            >
              <SunMoon size={13} aria-hidden="true" />
              <span>{highContrast ? 'High Contrast ON' : 'High Contrast'}</span>
            </button>

            {/* Emergency & Urgent Advice button */}
            <button
              type="button"
              onClick={() => setEmergencyModalOpen(true)}
              style={{
                backgroundColor: '#fbf2f2',
                border: '1px solid #ebcccc',
                color: '#6b1e1e',
                borderRadius: 'var(--radius-pill)',
                padding: '0.2rem 0.65rem',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              aria-label="Open emergency numbers and urgent guidance"
            >
              <PhoneCall size={13} aria-hidden="true" />
              <span>Urgent Guidance / 999</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Child Profile Bar */}
      <div style={{ maxWidth: '1220px', margin: '0 auto', padding: '1rem 1rem 0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Brand identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            type="button"
            onClick={() => setCurrentPage('dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textAlign: 'left' }}
            aria-label="Little Steps - Go to Dashboard"
          >
            <div 
              style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '12px', 
                backgroundColor: 'var(--color-primary)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: '#ffffff',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <Sprout size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-sage-deep)', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                Little Steps
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Reassuring tracker for milestones, vaccines & care
              </div>
            </div>
          </button>
        </div>

        {/* Child Profile Switcher & Corrected Age Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          {/* Active Child Selector */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setChildDropdownOpen(!childDropdownOpen)}
              className="btn-outline btn-pill"
              style={{
                backgroundColor: 'var(--color-mint-light)',
                borderColor: 'var(--color-mint-border)',
                padding: '0.45rem 0.9rem',
                gap: '0.5rem',
                fontSize: '0.9rem'
              }}
              aria-expanded={childDropdownOpen}
              aria-label={`Active child: ${activeChild?.nickname}. Age: ${childAgeData.ageText}. Click to switch child profile.`}
            >
              <Baby size={18} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', lineHeight: 1.2 }}>
                  {activeChild?.nickname || 'Child Profile'}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {childAgeData.ageText}
                </div>
              </div>
            </button>

            {/* Child Switcher Dropdown */}
            {childDropdownOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '6px',
                  backgroundColor: '#ffffff',
                  border: '1px solid var(--color-mint-border)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-md)',
                  zIndex: 100,
                  minWidth: '280px',
                  padding: '0.65rem'
                }}
                role="menu"
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', marginBottom: '0.4rem', padding: '0 0.35rem' }}>
                  Switch Child Profile:
                </div>
                
                {childrenList.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setActiveChildId(c.id);
                      setChildDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.55rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: activeChildId === c.id ? 'var(--color-mint-light)' : 'transparent',
                      color: 'var(--color-text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.25rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.nickname}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Born {c.dateOfBirth} {c.bornEarly && '(Premature)'}
                      </div>
                    </div>
                    {activeChildId === c.id && <Check size={16} style={{ color: 'var(--color-primary)' }} />}
                  </button>
                ))}

                <hr style={{ margin: '0.5rem 0', borderColor: 'var(--color-mint-border)' }} />

                <button
                  type="button"
                  onClick={() => {
                    setChildDropdownOpen(false);
                    setOnboardingMode('older-child');
                    setOnboardingOpen(true);
                  }}
                  className="btn-outline"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.82rem', padding: '0.45rem' }}
                >
                  <Plus size={15} />
                  <span>Add another child or catch-up</span>
                </button>
              </div>
            )}
          </div>

          {/* Corrected age badge if baby was born early */}
          {activeChild?.bornEarly && (
            <div 
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid var(--color-mint-border)', 
                borderRadius: 'var(--radius-pill)', 
                padding: '0.35rem 0.75rem', 
                fontSize: '0.78rem',
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.45rem' 
              }}
              title="Because baby arrived 4 weeks early, corrected age reflects typical developmental timing."
            >
              <span style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                {useCorrectedAge ? 'Corrected Age (6 mos)' : 'Chronological (7 mos)'}
              </span>
              <button
                type="button"
                onClick={() => setUseCorrectedAge(!useCorrectedAge)}
                style={{
                  fontSize: '0.72rem',
                  textDecoration: 'underline',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer'
                }}
              >
                {useCorrectedAge ? 'Switch to birth age' : 'Switch to corrected'}
              </button>
            </div>
          )}

          {/* "Something on your mind?" reassurance link */}
          <button
            type="button"
            onClick={() => setReassuranceDrawerOpen(true)}
            className="btn-outline btn-pill"
            style={{
              borderColor: 'var(--color-primary-light)',
              color: 'var(--color-primary)',
              backgroundColor: '#ffffff',
              fontSize: '0.85rem',
              padding: '0.45rem 0.85rem',
              gap: '0.4rem'
            }}
          >
            <Heart size={15} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
            <span>Something on your mind?</span>
          </button>

          {/* Weekly Digest Simulation */}
          <button
            type="button"
            onClick={() => setWeeklyDigestOpen(true)}
            className="btn-outline btn-pill"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem', gap: '0.35rem' }}
            title="Preview weekly gentle digest & lockscreen privacy"
          >
            <Bell size={15} aria-hidden="true" />
            <span>Weekly Digest</span>
          </button>

          {/* Provider Portal Preview */}
          <button
            type="button"
            onClick={() => setProviderPortalOpen(true)}
            className="btn-outline btn-pill"
            style={{ fontSize: '0.82rem', padding: '0.45rem 0.75rem', gap: '0.35rem' }}
            title="For clinics and healthcare institutions to manage verified listings"
          >
            <Building2 size={15} aria-hidden="true" />
            <span>Clinic Portal</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav 
        style={{ 
          maxWidth: '1220px', 
          margin: '0 auto', 
          padding: '0 1rem', 
          display: 'flex', 
          alignItems: 'center', 
          overflowX: 'auto',
          gap: '0.35rem'
        }}
        aria-label="Main application sections"
      >
        {navItems.map(item => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentPage(item.id)}
              style={{
                padding: '0.75rem 1rem',
                borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.92rem',
                whiteSpace: 'nowrap',
                backgroundColor: 'transparent',
                borderRadius: '4px 4px 0 0'
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
