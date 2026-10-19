import React, { useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PhoneCall, ShieldAlert, X, MapPin, HeartPulse, ExternalLink } from 'lucide-react';

const EMERGENCY_NUMBERS = {
  uk: {
    emergency: '999',
    urgentAdvice: '111',
    urgentLabel: 'NHS 111 (Free 24/7 non-emergency medical advice by nurse)',
    emergencyLabel: '999 (Emergency services for life-threatening illness)',
    hospitalNote: 'Whittington Paediatric 24/7 Emergency Department (3.2 km away)'
  },
  us: {
    emergency: '911',
    urgentAdvice: '211 or 1-800-222-1222',
    urgentLabel: 'Poison Control & Nurse Advice (1-800-222-1222)',
    emergencyLabel: '911 (Immediate emergency response)',
    hospitalNote: 'Nearest Children’s Emergency Room'
  },
  in: {
    emergency: '112',
    urgentAdvice: '1075 / 102',
    urgentLabel: 'National Health Helpline (1075) / Ambulance (102)',
    emergencyLabel: '112 (National Emergency Number)',
    hospitalNote: 'Urban District Paediatric Casualty Ward'
  },
  au: {
    emergency: '000',
    urgentAdvice: '1800 022 222',
    urgentLabel: 'Healthdirect 24/7 Registered Nurse (1800 022 222)',
    emergencyLabel: '000 (Triple Zero Emergency)',
    hospitalNote: 'Royal Children’s Emergency Care Unit'
  }
};

export default function EmergencyModal() {
  const { emergencyModalOpen, setEmergencyModalOpen, activeRegion, navigateToCareFinderWithFilter } = useApp();
  const dialogRef = useRef(null);

  const regionInfo = EMERGENCY_NUMBERS[activeRegion] || EMERGENCY_NUMBERS.uk;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (emergencyModalOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      if (dialog.open) dialog.close();
    }
  }, [emergencyModalOpen]);

  if (!emergencyModalOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setEmergencyModalOpen(false)}
      aria-labelledby="emergency-dialog-title"
      style={{ maxWidth: '640px' }}
    >
      <div className="dialog-inner">
        <div className="dialog-header" style={{ backgroundColor: '#fdf6f6', borderBottomColor: '#f1d6d6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <HeartPulse size={22} style={{ color: '#882b2b' }} aria-hidden="true" />
            <h2 id="emergency-dialog-title" style={{ fontSize: '1.15rem', color: '#5e1b1b', margin: 0 }}>
              Urgent & Emergency Care Guidance
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setEmergencyModalOpen(false)}
            aria-label="Close emergency modal"
            className="btn-outline"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="dialog-body">
          <div 
            style={{ 
              backgroundColor: '#fbf2f2', 
              border: '1px solid #ebcccc', 
              borderRadius: 'var(--radius-md)', 
              padding: '1rem',
              marginBottom: '1.25rem' 
            }}
          >
            <p style={{ margin: 0, fontSize: '0.95rem', color: '#4a1717', lineHeight: '1.5' }}>
              <strong>Little Steps is an informational planning companion and not an emergency service.</strong> If your child is having difficulty breathing, is unresponsive, has a rash that does not fade when pressed with a clear glass, or if you feel deeply concerned right now, please reach out directly:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div 
              style={{ 
                border: '1px solid #e0c2c2', 
                backgroundColor: '#ffffff', 
                borderRadius: 'var(--radius-md)', 
                padding: '1rem',
                textAlign: 'center' 
              }}
            >
              <div style={{ fontSize: '0.82rem', color: '#682222', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Life-Threatening Emergency
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: '#8b2020', margin: '0.35rem 0' }}>
                {regionInfo.emergency}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>
                {regionInfo.emergencyLabel}
              </p>
            </div>

            <div 
              style={{ 
                border: '1px solid var(--color-mint-border)', 
                backgroundColor: '#ffffff', 
                borderRadius: 'var(--radius-md)', 
                padding: '1rem',
                textAlign: 'center' 
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                24/7 Urgent Medical Advice
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-sage-deep)', margin: '0.35rem 0' }}>
                {regionInfo.urgentAdvice}
              </div>
              <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>
                {regionInfo.urgentLabel}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--color-sage-deep)', marginBottom: '0.5rem' }}>
              When to seek same-day medical attention:
            </h4>
            <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: '1.6' }}>
              <li>Temperature of 38°C (100.4°F) or higher in a baby younger than 3 months</li>
              <li>Rapid breathing, grunting noises, or sucking the chest in under ribs</li>
              <li>Pale, blotchy, or unusually cold hands and feet</li>
              <li>Significantly fewer wet nappies (less than 2–3 in 24 hours)</li>
              <li>A caregiver feeling strongly that something is wrong (trust your instinct)</li>
            </ul>
          </div>

          <div 
            style={{ 
              backgroundColor: 'var(--color-mint-light)', 
              border: '1px solid var(--color-mint-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '0.9rem 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.75rem'
            }}
          >
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                Nearest 24/7 Children's Emergency Department:
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                {regionInfo.hospitalNote}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmergencyModalOpen(false);
                navigateToCareFinderWithFilter('emergency', '24/7 Paediatric Emergency & Urgent Care');
              }}
              className="btn-primary"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.85rem', whiteSpace: 'nowrap' }}
            >
              <MapPin size={15} />
              <span>View in Finder</span>
            </button>
          </div>
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => setEmergencyModalOpen(false)}
            className="btn-secondary"
          >
            Return to App
          </button>
        </div>
      </div>
    </dialog>
  );
}
