import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  UserPlus, 
  Sparkles,
  Info
} from 'lucide-react';

export default function ProviderPortalModal() {
  const { providerPortalOpen, setProviderPortalOpen, providers } = useApp();

  const [clinicName, setClinicName] = useState('Highbury Fields Family Health & Child Development Centre');
  const [vaccineHours, setVaccineHours] = useState('Tuesdays 09:00 - 12:30 (Walk-in baby immunisations)');
  const [doctorName, setDoctorName] = useState('Dr. Helen Vance, FRCGP');
  const [reconfirmed, setReconfirmed] = useState(false);

  if (!providerPortalOpen) return null;

  return (
    <dialog open style={{ display: 'block' }} aria-labelledby="portal-title">
      <div className="dialog-inner" style={{ maxWidth: '680px' }}>
        <div className="dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Building2 size={20} style={{ color: 'var(--color-primary)' }} />
            <h3 id="portal-title" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', margin: 0, fontWeight: 700 }}>
              Healthcare Provider & Clinic Portal (Preview)
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setProviderPortalOpen(false)}
            className="btn-outline"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
            aria-label="Close portal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="reassurance-box" style={{ margin: 0, backgroundColor: 'var(--color-mint-light)' }}>
            <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <ShieldCheck size={16} />
              <span>Provider Self-Service & Verification Ladder</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
              Clinics, GP surgeries and community centres can verify their identity with NHS/national registry credentials to maintain accurate vaccination days, accessibility notes, and clinician schedules for families.
            </p>
          </div>

          {/* Verification Status Card */}
          <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="badge-soft badge-verified" style={{ fontSize: '0.78rem' }}>
                  ✓ Provider Verified
                </span>
                <h4 style={{ fontSize: '1rem', color: 'var(--color-sage-deep)', margin: '0.35rem 0 0 0' }}>
                  {clinicName}
                </h4>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                  NHS ODS Code: F83021 • Last reconfirmed: 14 Aug 2026
                </div>
              </div>
            </div>
          </div>

          {/* Quick Update Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <label htmlFor="portal-vac-days" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                Vaccination Drop-in & Booked Sessions:
              </label>
              <input
                id="portal-vac-days"
                type="text"
                value={vaccineHours}
                onChange={(e) => setVaccineHours(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.88rem' }}
              />
            </div>

            <div>
              <label htmlFor="portal-lead-doc" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                Lead Paediatric Clinician / Health Visitor:
              </label>
              <input
                id="portal-lead-doc"
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.88rem' }}
              />
            </div>

            <div style={{ backgroundColor: '#fafcfb', border: '1px dashed var(--color-mint-border)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.85rem', color: 'var(--color-text-main)' }}>
                <input
                  type="checkbox"
                  checked={reconfirmed}
                  onChange={(e) => setReconfirmed(e.target.checked)}
                />
                <span>I confirm that these opening hours, walk-in sessions, and accessibility features are accurate as of today.</span>
              </label>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => setProviderPortalOpen(false)}
            className="btn-outline"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => {
              alert('Listing details re-verified and timestamp updated!');
              setProviderPortalOpen(false);
            }}
            className="btn-primary"
          >
            Publish Verified Updates
          </button>
        </div>
      </div>
    </dialog>
  );
}
