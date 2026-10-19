import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import EmergencyModal from './components/EmergencyModal';
import ReassuranceHelpDrawer from './components/ReassuranceHelpDrawer';
import WeeklyDigestModal from './pages/WeeklyDigestModal';
import ProviderPortalModal from './pages/ProviderPortalModal';
import OnboardingWizardModal from './pages/OnboardingWizardModal';
import SuggestCorrectionModal from './pages/SuggestCorrectionModal';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import MilestonesPage from './pages/MilestonesPage';
import VaccinationsPage from './pages/VaccinationsPage';
import CareFinderPage from './pages/CareFinderPage';
import VisitPrepPage from './pages/VisitPrepPage';
import LearnPage from './pages/LearnPage';
import SharedCarePage from './pages/SharedCarePage';
import PrivacyControlsModal from './pages/PrivacyControlsModal';

import { Sprout, ShieldCheck, Heart, ArrowUp } from 'lucide-react';

function AppContent() {
  const { 
    currentPage, 
    setCurrentPage, 
    screenReaderAnnouncement,
    setOnboardingOpen,
    setOnboardingMode,
    setProviderPortalOpen,
    setWeeklyDigestOpen
  } = useApp();

  const renderActivePage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'milestones':
        return <MilestonesPage />;
      case 'vaccines':
        return <VaccinationsPage />;
      case 'care-finder':
        return <CareFinderPage />;
      case 'visit-prep':
        return <VisitPrepPage />;
      case 'learn':
        return <LearnPage />;
      case 'profile-sharing':
        return <SharedCarePage />;
      case 'privacy':
        return <PrivacyControlsModal />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Central Screen Reader Announcer (WCAG 2.2 / Modern Web Guidance) */}
      <div 
        aria-live="polite" 
        role="status" 
        aria-atomic="true" 
        className="visually-hidden"
      >
        {screenReaderAnnouncement}
      </div>

      {/* Global Header */}
      <Header />

      {/* Main Page Content */}
      <main className="main-content" id="main-content">
        {renderActivePage()}
      </main>

      {/* Global Modals & Drawers */}
      <EmergencyModal />
      <ReassuranceHelpDrawer />
      <WeeklyDigestModal />
      <ProviderPortalModal />
      <OnboardingWizardModal />
      <SuggestCorrectionModal />

      {/* Accessible Footer */}
      <footer 
        style={{ 
          backgroundColor: '#ffffff', 
          borderTop: '1px solid var(--color-mint-border)', 
          padding: '2.5rem 1rem 3rem 1rem',
          marginTop: 'auto'
        }}
        className="no-print"
      >
        <div style={{ maxWidth: '1220px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div style={{ maxWidth: '420px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                <Sprout size={22} style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-sage-deep)' }}>
                  Little Steps
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
                A supportive companion for tracking child development, vaccinations and healthcare visits. Informational and conversational—never a diagnosis tool.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.6rem' }}>
                  Explore App
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <button type="button" onClick={() => setCurrentPage('dashboard')} style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}>
                    Home Dashboard
                  </button>
                  <button type="button" onClick={() => setCurrentPage('milestones')} style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}>
                    Milestones Framework
                  </button>
                  <button type="button" onClick={() => setCurrentPage('vaccines')} style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}>
                    Vaccination Tracker
                  </button>
                  <button type="button" onClick={() => setCurrentPage('care-finder')} style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}>
                    Nearby Care Finder
                  </button>
                  <button type="button" onClick={() => setCurrentPage('visit-prep')} style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}>
                    Doctor Visit Prep
                  </button>
                </div>
              </div>

              <div>
                <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.6rem' }}>
                  Tools & Demos
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <button 
                    type="button" 
                    onClick={() => {
                      setOnboardingMode('older-child');
                      setOnboardingOpen(true);
                    }} 
                    style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}
                  >
                    Older Child Catch-up
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setWeeklyDigestOpen(true)} 
                    style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}
                  >
                    Weekly Digest Preview
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setProviderPortalOpen(true)} 
                    style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}
                  >
                    Clinic Provider Portal
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setCurrentPage('privacy')} 
                    style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}
                  >
                    Privacy & Data Controls
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setCurrentPage('landing')} 
                    style={{ textAlign: 'left', color: 'var(--color-text-muted)' }}
                  >
                    Welcome Overview
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--color-mint-border)', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.8rem', color: 'var(--color-text-subtle)' }}>
            <div>
              © 2026 Little Steps • Clinical review cycle: Every 6 months • Reviewed by Paediatric Clinical Advisory Panel
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>WCAG 2.2 AA Compliant</span>
              <span>No Commercial Ads</span>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
