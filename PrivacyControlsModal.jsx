import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, 
  X, 
  Download, 
  Trash2, 
  Lock, 
  MapPin, 
  Eye, 
  Check, 
  FileText 
} from 'lucide-react';

export default function PrivacyControlsModal() {
  const { 
    privacyModalOpen, 
    setPrivacyModalOpen, 
    activeChild, 
    milestonesState, 
    vaccinesState, 
    questionsToAsk,
    deleteAllDataPermanently 
  } = useApp();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleExportData = () => {
    const exportPayload = {
      app: 'Little Steps',
      version: '1.0.0',
      exportDate: new Date().toISOString(),
      activeChild,
      milestones: milestonesState,
      vaccines: vaccinesState,
      questionsForDoctor: questionsToAsk
    };

    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `little_steps_health_record_${activeChild?.nickname || 'child'}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="animate-fade-in card-calm" style={{ maxWidth: '840px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
        <ShieldCheck size={22} style={{ color: 'var(--color-primary)' }} />
        <h1 style={{ fontSize: '1.6rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: 0 }}>
          Privacy, Security & Data Ownership
        </h1>
      </div>
      <p style={{ color: 'var(--color-text-muted)', fontSize: '0.92rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
        Little Steps is designed with privacy from the very first line of code. We believe children’s developmental records belong solely to their families.
      </p>

      {/* Five Core Guarantees */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
            1. Nicknames Encouraged
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.45 }}>
            We never require legal names. Feel free to use initials, pet names, or nicknames.
          </p>
        </div>

        <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
            2. Zero Advertising
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.45 }}>
            We never sell health information, track you across sites, or serve behavioural ads.
          </p>
        </div>

        <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
            3. No Model Training on Children
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.45 }}>
            Your child's growth entries, photos, or visit notes are never used to train public AI models.
          </p>
        </div>

        <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.92rem', marginBottom: '0.25rem' }}>
            4. Ephemeral Location
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', margin: 0, lineHeight: 1.45 }}>
            Location is used only to show nearby clinic distances and is never saved as a tracking history.
          </p>
        </div>
      </div>

      {/* Export & Permanent Deletion Actions */}
      <div style={{ borderTop: '1px solid var(--color-mint-border)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
            Export Your Family's Data
          </h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0 0 0.75rem 0' }}>
            Download a portable, open JSON archive of all recorded milestones, vaccines, and visit notes to save to your personal computer.
          </p>
          <button
            type="button"
            onClick={handleExportData}
            className="btn-secondary btn-pill"
            style={{ fontSize: '0.85rem', padding: '0.45rem 1rem', gap: '0.4rem' }}
          >
            <Download size={15} />
            <span>Download Complete Data Archive (.json)</span>
          </button>
        </div>

        {/* Permanent Wipe */}
        <div style={{ backgroundColor: '#fcf6f6', border: '1px solid #f2d4d4', borderRadius: 'var(--radius-md)', padding: '1.25rem' }}>
          <h3 style={{ fontSize: '1.05rem', color: '#7a2222', fontWeight: 600, marginBottom: '0.35rem' }}>
            Permanently Erase All Data
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#592020', margin: '0 0 0.75rem 0', lineHeight: 1.45 }}>
            This immediately and permanently erases all child profiles, milestone answers, vaccination photos, and care notes. This action cannot be undone.
          </p>

          {!confirmDelete ? (
            <button
              type="button"
              onClick={() => setConfirmDelete(true)}
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid #d49f9f',
                color: '#7a2222',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.85rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer'
              }}
            >
              <Trash2 size={15} />
              <span>Request Permanent Account & Data Deletion</span>
            </button>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={deleteAllDataPermanently}
                style={{
                  backgroundColor: '#8a2424',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.45rem 1rem',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Yes, Permanently Wipe Everything Now
              </button>
              <button
                type="button"
                onClick={() => setConfirmDelete(false)}
                className="btn-outline"
                style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem' }}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
