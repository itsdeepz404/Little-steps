import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  X, 
  ShieldCheck, 
  Moon, 
  Lock, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Clock,
  Sparkles,
  Heart
} from 'lucide-react';

export default function WeeklyDigestModal() {
  const { 
    weeklyDigestOpen, 
    setWeeklyDigestOpen, 
    notificationSettings, 
    setNotificationSettings,
    activeChild
  } = useApp();

  if (!weeklyDigestOpen) return null;

  return (
    <dialog open style={{ display: 'block' }} aria-labelledby="digest-modal-title">
      <div className="dialog-inner" style={{ maxWidth: '640px' }}>
        <div className="dialog-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={20} style={{ color: 'var(--color-primary)' }} />
            <h3 id="digest-modal-title" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', margin: 0, fontWeight: 700 }}>
              Gentle Reminders & Weekly Digest Settings
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setWeeklyDigestOpen(false)}
            className="btn-outline"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
            aria-label="Close digest settings"
          >
            <X size={18} />
          </button>
        </div>

        <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Section 7 Principles banner */}
          <div className="reassurance-box" style={{ margin: 0, backgroundColor: 'var(--color-mint-light)' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-sage-deep)', lineHeight: 1.5 }}>
              <strong>Quiet by default:</strong> We believe caregivers need calm, not constant pings. Reminders are batched into a weekly digest, night hours are strictly respected, and lock-screen alerts protect your family’s privacy.
            </p>
          </div>

          {/* Simulated Lock-screen Preview (Section 7) */}
          <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Lock size={14} style={{ color: 'var(--color-primary)' }} />
              <span>Lock-Screen Privacy Preview (What others might see on your phone):</span>
            </div>

            <div 
              style={{ 
                backgroundColor: '#ffffff', 
                border: '1px solid var(--color-mint-border)', 
                borderRadius: 'var(--radius-sm)', 
                padding: '0.75rem 0.9rem',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>🌱 Little Steps</span>
                <span>Sunday 09:30 AM</span>
              </div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text-main)', marginTop: '0.2rem' }}>
                A gentle reminder from Little Steps
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.15rem' }}>
                Tap to open your private weekly care digest. (Child names and health details are never shown on your lock screen).
              </div>
            </div>
          </div>

          {/* Sample Weekly Digest Content */}
          <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#ffffff' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={15} style={{ color: 'var(--color-primary)' }} />
              <span>Sample Weekly Digest Preview for {activeChild?.nickname}:</span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.5, backgroundColor: '#f9fbf9', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              <p style={{ margin: '0 0 0.4rem 0' }}>
                <strong>Good morning, Alex.</strong> Here is your calm weekly update:
              </p>
              <ul style={{ paddingLeft: '1.25rem', margin: 0, fontSize: '0.82rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                <li><strong>Vaccines:</strong> The 16-week 6-in-1 visit is due. Tuesday walk-in clinic is open at Highbury Health.</li>
                <li><strong>Milestone idea:</strong> Try placing a rattle just out of reach during tummy time for fun reaching practice.</li>
                <li><strong>Doctor visit prep:</strong> You have 2 questions saved for your next appointment.</li>
              </ul>
            </div>
          </div>

          {/* Notification Controls */}
          <div>
            <h4 style={{ fontSize: '0.92rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.6rem' }}>
              Notification Preferences:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--color-text-main)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.weeklyDigest}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, weeklyDigest: e.target.checked })}
                />
                <span>Receive quiet weekly digest (Recommended)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--color-text-main)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.quietNightMode}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, quietNightMode: e.target.checked })}
                />
                <span>Quiet Night Mode (No notifications between 9:00 PM and 8:30 AM)</span>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--color-text-main)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={notificationSettings.lockScreenPrivacy}
                  onChange={(e) => setNotificationSettings({ ...notificationSettings, lockScreenPrivacy: e.target.checked })}
                />
                <span>Discreet lock-screen alerts (Never show child name or health data on lock screen)</span>
              </label>
            </div>
          </div>
        </div>

        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => setWeeklyDigestOpen(false)}
            className="btn-primary"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </dialog>
  );
}
