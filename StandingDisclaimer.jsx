import React from 'react';
import { ShieldCheck, HeartHandshake } from 'lucide-react';

export default function StandingDisclaimer({ compact = false }) {
  if (compact) {
    return (
      <div 
        className="reassurance-box" 
        style={{ margin: '1rem 0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
        role="note"
        aria-label="Medical and informational disclaimer"
      >
        <ShieldCheck size={18} style={{ color: 'var(--color-primary)', flexShrink: 0 }} aria-hidden="true" />
        <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>
          <strong>Informational companion:</strong> Little Steps does not diagnose or replace advice from a qualified healthcare professional. Children grow at their own pace. Provider details show verification status—please confirm with providers before you travel.
        </p>
      </div>
    );
  }

  return (
    <aside 
      className="card-calm" 
      style={{ 
        marginTop: '2.5rem', 
        backgroundColor: 'var(--color-mint-light)', 
        borderColor: 'var(--color-mint-border)',
        padding: '1.25rem 1.5rem'
      }}
      aria-label="Standing health guidance and medical disclaimer"
    >
      <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
        <HeartHandshake 
          size={24} 
          style={{ color: 'var(--color-primary)', marginTop: '0.15rem', flexShrink: 0 }} 
          aria-hidden="true" 
        />
        <div>
          <h4 style={{ color: 'var(--color-sage-deep)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.35rem' }}>
            Standing Guidance for Every Visit
          </h4>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: '1.5', margin: 0 }}>
            Little Steps is for information and organisation only. It does not diagnose, treat or replace advice from a qualified healthcare professional. Children develop at different rates. If you are worried about your child's health or development, please talk to your doctor or local health service. In an emergency, contact your local emergency number. Provider details are shown with their verification status. Please confirm with the provider before you travel.
          </p>
        </div>
      </div>
    </aside>
  );
}
