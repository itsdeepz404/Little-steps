import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  Heart, 
  FileText, 
  Accessibility, 
  MessageSquare,
  Baby,
  Building,
  Navigation
} from 'lucide-react';
import AudioReaderButton from '../components/AudioReaderButton';

export default function CareCardDetailModal({ provider, onClose }) {
  const { savedProviderIds, toggleSaveProvider, setSuggestCorrectionModal } = useApp();
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'vaccines', 'doctors', 'accessibility', 'first-visit'

  if (!provider) return null;

  const isSaved = savedProviderIds.includes(provider.id);

  const getVerificationBadge = (status) => {
    switch (status) {
      case 'official':
        return (
          <span className="badge-soft badge-verified" style={{ fontSize: '0.82rem' }}>
            <ShieldCheck size={14} />
            <span>Official NHS / Authority Directory (Verified {provider.verificationDate})</span>
          </span>
        );
      case 'provider-confirmed':
        return (
          <span className="badge-soft badge-verified" style={{ fontSize: '0.82rem' }}>
            <CheckCircle2 size={14} />
            <span>Verified by Provider ({provider.verificationDate})</span>
          </span>
        );
      case 'provider-submitted':
        return (
          <span className="badge-soft badge-gentle" style={{ fontSize: '0.82rem' }}>
            <Clock size={14} />
            <span>Provider-Submitted (Clinical review in progress)</span>
          </span>
        );
      default:
        return (
          <span className="badge-soft badge-neutral" style={{ fontSize: '0.82rem' }}>
            <AlertCircle size={14} />
            <span>Information not yet verified. Please call ahead.</span>
          </span>
        );
    }
  };

  return (
    <dialog 
      open 
      style={{ display: 'block' }} 
      onClose={onClose}
      aria-labelledby="care-card-title"
    >
      <div className="dialog-inner" style={{ maxWidth: '780px' }}>
        {/* Modal Header */}
        <div className="dialog-header">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
              <span className="badge-soft badge-neutral" style={{ fontSize: '0.75rem' }}>
                {provider.type}
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                {provider.distanceKm} km away • {provider.travelTimeMinutes} mins
              </span>
            </div>
            <h2 id="care-card-title" style={{ fontSize: '1.3rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: 0 }}>
              {provider.name}
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AudioReaderButton 
              textToRead={`${provider.name}. ${provider.goodToKnow}. Located at ${provider.address}.`}
              label="Listen"
            />
            <button
              type="button"
              onClick={onClose}
              className="btn-outline"
              style={{ padding: '0.35rem', borderRadius: '50%' }}
              aria-label="Close care card"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Verification Status Banner (Section 3.5.1 Wording Rule) */}
        <div style={{ padding: '0.85rem 1.5rem', backgroundColor: '#fafdfb', borderBottom: '1px solid var(--color-mint-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            {getVerificationBadge(provider.verificationStatus)}

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setSuggestCorrectionModal(provider)}
                style={{ fontSize: '0.78rem', color: 'var(--color-primary)', textDecoration: 'underline' }}
              >
                Suggest a correction
              </button>
            </div>
          </div>

          {provider.verificationStatus === 'unverified' && (
            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.4rem', lineHeight: 1.4 }}>
              Notice: The site never implies provider details are current unless verified. Unverified details are gathered from public records. Please call the clinic to confirm times and services before you travel.
            </div>
          )}
        </div>

        {/* Navigation Tabs Inside Modal */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-mint-border)', padding: '0 1.5rem', overflowX: 'auto', backgroundColor: '#ffffff' }}>
          {[
            { id: 'overview', label: 'Good to Know & Services' },
            { id: 'vaccines', label: 'Vaccination Days' },
            { id: 'doctors', label: 'Doctors by Topic' },
            { id: 'accessibility', label: 'Accessibility & Sensory' },
            { id: 'first-visit', label: 'First Visit Guide & Fees' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.65rem 0.85rem',
                fontSize: '0.85rem',
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="dialog-body">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* "Good to Know" Summary (Section 9 item 1) */}
              <div 
                style={{ 
                  backgroundColor: 'var(--color-mint-light)', 
                  border: '1px solid var(--color-mint-border)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '1rem 1.15rem' 
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                  Good to Know:
                </div>
                <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                  {provider.goodToKnow}
                </p>
              </div>

              {/* Address, Phone, Booking */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                <div style={{ border: '1px solid var(--color-mint-border)', padding: '0.9rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                    <MapPin size={15} style={{ color: 'var(--color-primary)' }} />
                    <span>Location & Travel:</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>
                    {provider.address}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                    {provider.travelSummary}
                  </div>
                </div>

                <div style={{ border: '1px solid var(--color-mint-border)', padding: '0.9rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                    <Phone size={15} style={{ color: 'var(--color-primary)' }} />
                    <span>Contact & Booking:</span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>
                    Phone: <a href={`tel:${provider.phone}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{provider.phone}</a>
                  </div>
                  {provider.email && (
                    <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                      Email: {provider.email}
                    </div>
                  )}
                  {provider.hasOnlineBooking && (
                    <div style={{ marginTop: '0.4rem' }}>
                      <span className="badge-soft badge-completed" style={{ fontSize: '0.72rem' }}>
                        ✓ Online booking available
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Services Offered */}
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Child & Family Services:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {provider.services.map((srv, idx) => (
                    <span key={idx} className="badge-soft badge-neutral" style={{ fontSize: '0.82rem' }}>
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Referral Pathway */}
              {provider.referralPathways && (
                <div style={{ borderTop: '1px solid var(--color-mint-border)', paddingTop: '0.75rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  <strong>Referral Pathway:</strong> {provider.referralPathways}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: VACCINATION DAYS */}
          {activeTab === 'vaccines' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                Weekly vaccination schedule and walk-in baby clinics. (Always call ahead if dates are near public holidays).
              </div>

              <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--color-mint-light)', borderBottom: '1px solid var(--color-mint-border)', textAlign: 'left' }}>
                      <th style={{ padding: '0.65rem 0.9rem', color: 'var(--color-sage-deep)' }}>Day</th>
                      <th style={{ padding: '0.65rem 0.9rem', color: 'var(--color-sage-deep)' }}>Hours</th>
                      <th style={{ padding: '0.65rem 0.9rem', color: 'var(--color-sage-deep)' }}>Clinic Type & Booking</th>
                    </tr>
                  </thead>
                  <tbody>
                    {provider.vaccinationCalendar.map((slot, idx) => (
                      <tr key={idx} style={{ borderBottom: idx < provider.vaccinationCalendar.length - 1 ? '1px solid var(--color-mint-border)' : 'none' }}>
                        <td style={{ padding: '0.65rem 0.9rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>{slot.day}</td>
                        <td style={{ padding: '0.65rem 0.9rem', color: 'var(--color-text-main)' }}>{slot.hours || 'N/A'}</td>
                        <td style={{ padding: '0.65rem 0.9rem', color: 'var(--color-text-muted)' }}>{slot.mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                <span className="badge-soft badge-completed" style={{ fontSize: '0.78rem' }}>
                  {provider.acceptsWalkIns ? '✓ Accepts walk-ins on baby clinic days' : 'Appointment booking only'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: DOCTORS BY TOPIC */}
          {activeTab === 'doctors' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
                Clinicians linked to topics (paediatrician, speech therapist, infant feeding lead). Names are shown only where provider has consented and details are verified.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {provider.doctorsByTopic.map((doc, idx) => (
                  <div 
                    key={idx}
                    style={{
                      border: '1px solid var(--color-mint-border)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.85rem 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '0.5rem'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.92rem' }}>
                        {doc.name}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-primary)', marginTop: '0.15rem' }}>
                        {doc.topic}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
                        Schedule: {doc.schedule}
                      </div>
                    </div>

                    <span className="badge-soft badge-verified" style={{ fontSize: '0.75rem' }}>
                      {doc.verified ? '✓ Verified Clinician' : 'Listed in Directory'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ACCESSIBILITY & SENSORY */}
          {activeTab === 'accessibility' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Physical & Sensory Accessibility:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                  {provider.accessibility.map((acc, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{acc}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.5rem' }}>
                  Facilities for Families:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.88rem', color: 'var(--color-text-main)', lineHeight: 1.6 }}>
                  {provider.facilities.map((fac, idx) => (
                    <li key={idx} style={{ marginBottom: '0.35rem' }}>{fac}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 style={{ fontSize: '0.95rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Languages Spoken & Interpretation:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                  {provider.languagesSpoken.map((lang, idx) => (
                    <span key={idx} className="badge-soft badge-neutral" style={{ fontSize: '0.8rem' }}>
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FIRST VISIT GUIDE & FEES */}
          {activeTab === 'first-visit' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fafdfb', border: '1px solid var(--color-mint-border)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.4rem' }}>
                  What to Bring with You:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
                  {provider.firstVisitGuide.whatToBring.map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '0.25rem' }}>{item}</li>
                  ))}
                </ul>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem' }}>
                <div style={{ border: '1px solid var(--color-mint-border)', padding: '0.9rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                    Typical Waiting Times:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>
                    {provider.firstVisitGuide.typicalWaitTime}
                  </div>
                </div>

                <div style={{ border: '1px solid var(--color-mint-border)', padding: '0.9rem', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                    Referral Policy:
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', marginTop: '0.25rem' }}>
                    {provider.firstVisitGuide.referralPolicy}
                  </div>
                </div>
              </div>

              <div style={{ border: '1px solid var(--color-mint-border)', padding: '0.9rem', borderRadius: 'var(--radius-md)', backgroundColor: '#ffffff' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                  Costs & Coverage:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 500, marginTop: '0.2rem' }}>
                  {provider.publicOrPrivate}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  {provider.costNote}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Actions */}
        <div className="dialog-footer">
          <button
            type="button"
            onClick={() => toggleSaveProvider(provider.id)}
            className="btn-outline"
            style={{ fontSize: '0.85rem', gap: '0.35rem' }}
          >
            <Heart size={16} style={{ color: isSaved ? '#b33' : 'var(--color-primary)' }} />
            <span>{isSaved ? 'Saved to My Care Team' : 'Save to Care Team'}</span>
          </button>

          {provider.bookingUrl ? (
            <a
              href={provider.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Book with Provider
            </a>
          ) : (
            <a
              href={`tel:${provider.phone}`}
              className="btn-primary"
              style={{ fontSize: '0.85rem', textDecoration: 'none' }}
            >
              Call {provider.phone}
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
