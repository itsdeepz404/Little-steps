import React from 'react';
import { useApp } from '../context/AppContext';
import StandingDisclaimer from '../components/StandingDisclaimer';
import { 
  Sprout, 
  Heart, 
  ShieldCheck, 
  Baby, 
  MapPin, 
  FileText, 
  Sparkles, 
  Clock, 
  Users, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

export default function LandingPage() {
  const { setCurrentPage, setOnboardingOpen, setOnboardingMode, setActiveChildId } = useApp();

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section 
        className="card-calm"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #eaf3ed 60%, #e2efe6 100%)',
          borderColor: 'var(--color-mint-border)',
          padding: '3rem 2rem',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', backgroundColor: '#ffffff', color: 'var(--color-primary)', padding: '0.35rem 0.95rem', borderRadius: 'var(--radius-pill)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
          <Sprout size={16} />
          <span>A calm companion for planning & conversation</span>
        </div>

        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-sage-deep)', fontWeight: 800, letterSpacing: '-0.5px', lineHeight: 1.2, maxWidth: '820px', margin: '0 auto 1rem auto' }}>
          Tracking Milestones, Vaccinations & Care Without Anxiety
        </h1>

        <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', maxWidth: '720px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
          Little Steps helps parents, grandparents and caregivers follow their child’s growth in one calm, organised place. Language is supportive, never judgmental. We inform—we never diagnose.
        </p>

        {/* Quick Start Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setCurrentPage('dashboard')}
            className="btn-primary btn-pill"
            style={{ fontSize: '1rem', padding: '0.85rem 1.8rem', gap: '0.5rem', boxShadow: 'var(--shadow-md)' }}
          >
            <span>Open Demo Dashboard</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => {
              setOnboardingMode('older-child');
              setOnboardingOpen(true);
            }}
            className="btn-secondary btn-pill"
            style={{ fontSize: '1rem', padding: '0.85rem 1.6rem', gap: '0.5rem', backgroundColor: '#ffffff' }}
          >
            <Baby size={18} />
            <span>Try Older Child Onboarding</span>
          </button>
        </div>

        {/* Quick Demo Selector */}
        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          <span>Explore preloaded profiles:</span>
          <button
            type="button"
            onClick={() => {
              setActiveChildId('child-1');
              setCurrentPage('dashboard');
            }}
            style={{ textDecoration: 'underline', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            👶 Leo (7 months • premature corrected)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setActiveChildId('child-2');
              setCurrentPage('dashboard');
            }}
            style={{ textDecoration: 'underline', color: 'var(--color-primary)', fontWeight: 600 }}
          >
            👧 Maya (18 months • toddler)
          </button>
        </div>
      </section>

      {/* 5 Guiding Principles (Section 1) */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--color-sage-deep)', fontWeight: 700 }}>
            Guiding Principles That Shape Every Screen
          </h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem' }}>
            Designed alongside paediatric advisers, developmental specialists, and diverse families.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="card-calm">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-mint-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              <Heart size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Reassure First
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              Every child develops at their own pace. Language is supportive, never judgmental. No alarming red labels.
            </p>
          </div>

          <div className="card-calm">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-mint-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Inform, Don't Diagnose
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              The site never labels a child as "delayed" or "at risk". It only presents what is typically seen at an age.
            </p>
          </div>

          <div className="card-calm">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-mint-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              <Lock size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Privacy by Design
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              Nicknames are welcome. We never sell data, never link social logins, and never use child health data for ads.
            </p>
          </div>

          <div className="card-calm">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-mint-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              <Globe size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Local and Honest
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              Schedules follow official national guidelines (UK, US, India, Australia). Unverified listings are clearly marked.
            </p>
          </div>

          <div className="card-calm">
            <div style={{ width: '38px', height: '38px', borderRadius: '10px', backgroundColor: 'var(--color-mint-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', marginBottom: '0.75rem' }}>
              <Users size={20} />
            </div>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
              Inclusive for Families
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, margin: 0 }}>
              Written for all caregivers: parents, grandparents, foster carers, guardians, and children with additional needs.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          
          <div className="card-calm" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', fontWeight: 700, marginBottom: '0.5rem' }}>
              Developmental Milestones
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Grouped across moving, language, emotional, thinking and everyday skills. Each card includes playful "Try this together" activities and audio read-aloud.
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage('milestones')}
              className="btn-outline btn-pill"
              style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}
            >
              Browse Milestones →
            </button>
          </div>

          <div className="card-calm" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', fontWeight: 700, marginBottom: '0.5rem' }}>
              Regional Vaccination Tracker
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Follows official schedules with clear windows: Due now, Coming up, and Completed. Missed vaccines are handled with kind, non-judgmental guidance.
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage('vaccines')}
              className="btn-outline btn-pill"
              style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}
            >
              Open Vaccine Schedule →
            </button>
          </div>

          <div className="card-calm" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', fontWeight: 700, marginBottom: '0.5rem' }}>
              Care Finder & Care Cards
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Nearby clinics with weekly vaccination days, doctors by topic, sensory quiet rooms, step-free access, and strict verification date stamps.
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage('care-finder')}
              className="btn-outline btn-pill"
              style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}
            >
              Search Nearby Clinics →
            </button>
          </div>

          <div className="card-calm" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', fontWeight: 700, marginBottom: '0.5rem' }}>
              Doctor Visit Prep & Questions
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
              Converts open observations into a printable discussion sheet to bring to your health visitor or paediatrician appointment.
            </p>
            <button
              type="button"
              onClick={() => setCurrentPage('visit-prep')}
              className="btn-outline btn-pill"
              style={{ marginTop: '0.75rem', fontSize: '0.82rem' }}
            >
              Build Visit Checklist →
            </button>
          </div>

        </div>
      </section>

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
