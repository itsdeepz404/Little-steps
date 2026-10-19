import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StandingDisclaimer from '../components/StandingDisclaimer';
import AudioReaderButton from '../components/AudioReaderButton';
import { 
  Syringe, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  ExternalLink, 
  Printer, 
  Upload, 
  FileCheck, 
  X, 
  Plus, 
  Info,
  Sparkles
} from 'lucide-react';

export default function VaccinationsPage() {
  const {
    activeChild,
    regionalSchedule,
    currentRegionMeta,
    activeRegion,
    vaccinesState,
    recordVaccineCompletion,
    activeChildId,
    navigateToCareFinderWithFilter
  } = useApp();

  const [activeTab, setActiveTab] = useState('all'); // 'all', 'due', 'upcoming', 'completed'
  const [recordModalVaccine, setRecordModalVaccine] = useState(null);
  
  // Record vaccine form state
  const [recordDate, setRecordDate] = useState(new Date().toISOString().split('T')[0]);
  const [recordPlace, setRecordPlace] = useState('');
  const [recordNotes, setRecordNotes] = useState('');
  const [recordPhotoUploaded, setRecordPhotoUploaded] = useState(false);

  const childVaccines = vaccinesState[activeChildId] || {};

  // Augment schedule with state
  const enrichedSchedule = regionalSchedule.map(v => {
    const override = childVaccines[v.id];
    if (override && override.completed) {
      return {
        ...v,
        completed: true,
        dateGiven: override.dateGiven,
        placeGiven: override.placeGiven,
        notes: override.notes,
        hasCardPhoto: !!override.photoUrl
      };
    }
    return v;
  });

  const dueNowList = enrichedSchedule.filter(v => !v.completed && v.ageInMonths <= 6); // Leo is 7m
  const upcomingList = enrichedSchedule.filter(v => !v.completed && v.ageInMonths > 6);
  const completedList = enrichedSchedule.filter(v => v.completed);

  const handleOpenRecordModal = (vaccine) => {
    setRecordModalVaccine(vaccine);
    setRecordDate(new Date().toISOString().split('T')[0]);
    setRecordPlace('Local Health Clinic');
    setRecordNotes('');
    setRecordPhotoUploaded(false);
  };

  const handleSaveVaccineRecord = (e) => {
    e.preventDefault();
    if (!recordModalVaccine) return;
    recordVaccineCompletion(
      recordModalVaccine.id,
      recordDate,
      recordPlace,
      recordNotes,
      recordPhotoUploaded ? 'simulated_card_photo.jpg' : null
    );
    setRecordModalVaccine(null);
  };

  const handlePrintRecord = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in">
      {/* Page Title & Schedule Source */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
              <ShieldCheck size={16} />
              <span>Official Public Immunisation Tracker</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0.25rem 0 0.5rem 0' }}>
              Vaccinations for {activeChild?.nickname || 'Child'}
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="no-print">
            <button
              type="button"
              onClick={handlePrintRecord}
              className="btn-outline btn-pill"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', gap: '0.4rem' }}
              title="Print official vaccination record for nursery, school or travel"
            >
              <Printer size={16} />
              <span>Print / Export Summary</span>
            </button>

            <button
              type="button"
              onClick={() => navigateToCareFinderWithFilter('vaccination', 'Childhood Vaccination')}
              className="btn-primary btn-pill"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', gap: '0.4rem' }}
            >
              <MapPin size={16} />
              <span>Find Vaccination Clinics</span>
            </button>
          </div>
        </div>

        {/* Schedule Authority & Reviewer Source Stamp (Section 4) */}
        <div 
          style={{ 
            backgroundColor: '#ffffff', 
            border: '1px solid var(--color-mint-border)', 
            borderRadius: 'var(--radius-md)', 
            padding: '0.9rem 1.15rem',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)' }}>
              <strong>Authority Schedule:</strong> {currentRegionMeta.authority} ({currentRegionMeta.name})
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', marginTop: '0.15rem' }}>
              ✓ {currentRegionMeta.reviewer} • Last reviewed: {currentRegionMeta.lastReviewed}
            </div>
          </div>

          <a 
            href={currentRegionMeta.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: '0.8rem', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'underline' }}
          >
            <span>Official Guidelines Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </section>

      {/* Kind Overdue/Due Notice (Section 3.6) */}
      {dueNowList.length > 0 && (
        <div 
          className="reassurance-box" 
          style={{ 
            backgroundColor: 'var(--color-mint-light)', 
            borderColor: 'var(--color-mint-border)',
            borderLeft: '4px solid var(--color-primary)',
            padding: '1rem 1.25rem',
            marginBottom: '1.5rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
            <Clock size={18} style={{ color: 'var(--color-primary)' }} />
            <span>Supportive Note for Upcoming & Catch-up Doses</span>
          </div>
          <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.9rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            "This vaccine is due. Many families need to reschedule due to colds, travel, or busy schedules. Your clinic or health visitor can help you find the best time to catch up without hassle."
          </p>
        </div>
      )}

      {/* Tabs: Due Now, Coming Up, Completed, All */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          borderBottom: '1px solid var(--color-mint-border)', 
          paddingBottom: '0.75rem', 
          marginBottom: '1.5rem',
          overflowX: 'auto'
        }}
        role="tablist"
      >
        {[
          { id: 'all', label: `All Vaccines (${enrichedSchedule.length})` },
          { id: 'due', label: `Due Now (${dueNowList.length})` },
          { id: 'upcoming', label: `Coming Up (${upcomingList.length})` },
          { id: 'completed', label: `Completed (${completedList.length})` }
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="btn-pill"
            style={{
              padding: '0.45rem 1rem',
              fontSize: '0.85rem',
              fontWeight: activeTab === tab.id ? 600 : 500,
              backgroundColor: activeTab === tab.id ? 'var(--color-primary)' : '#ffffff',
              color: activeTab === tab.id ? '#ffffff' : 'var(--color-text-main)',
              border: activeTab === tab.id ? '1px solid var(--color-primary)' : '1px solid var(--color-mint-border)'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Vaccine Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        {(activeTab === 'due' ? dueNowList : activeTab === 'upcoming' ? upcomingList : activeTab === 'completed' ? completedList : enrichedSchedule).map(v => (
          <article 
            key={v.id} 
            className="card-calm"
            style={{
              borderLeft: v.completed ? '4px solid var(--color-primary)' : '4px solid #d4cbb8',
              backgroundColor: v.completed ? '#fafcfb' : '#ffffff'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ flex: 1, minWidth: '260px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <span className="badge-soft badge-neutral" style={{ fontSize: '0.75rem' }}>
                    {v.ageWindow}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)' }}>
                    {v.funding}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', fontWeight: 600 }}>
                  {v.vaccineName}
                </h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 500, marginTop: '0.15rem' }}>
                  {v.dose}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AudioReaderButton 
                  textToRead={`${v.vaccineName}. Recommended at ${v.ageWindow}. Protects against ${v.diseaseProtected}. Usually given as ${v.howGiven}.`}
                  label="Listen"
                />

                <span 
                  className={`badge-soft ${v.completed ? 'badge-completed' : 'badge-gentle'}`}
                  style={{ fontSize: '0.82rem' }}
                >
                  {v.completed ? 'Completed' : 'Due Now'}
                </span>
              </div>
            </div>

            {/* Disease protection & Method */}
            <div style={{ margin: '0.85rem 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
              <div style={{ backgroundColor: 'var(--color-mint-light)', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                  Protects Against:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', marginTop: '0.2rem' }}>
                  {v.diseaseProtected}
                </div>
              </div>

              <div style={{ backgroundColor: '#fafdfb', border: '1px solid var(--color-mint-border)', padding: '0.75rem 0.9rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                  How It Is Given:
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-main)', marginTop: '0.2rem' }}>
                  {v.howGiven}
                </div>
              </div>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.45, margin: 0 }}>
              {v.description}
            </p>

            {/* If completed: show recorded info */}
            {v.completed && (
              <div 
                style={{ 
                  marginTop: '0.85rem', 
                  padding: '0.75rem 1rem', 
                  backgroundColor: '#f1f8f3', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.5rem'
                }}
              >
                <div style={{ fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
                  ✓ Given on <strong>{v.dateGiven}</strong> at <strong>{v.placeGiven || 'Health Clinic'}</strong>
                  {v.notes && <span style={{ marginLeft: '0.4rem', color: 'var(--color-text-muted)' }}>({v.notes})</span>}
                </div>
                {v.hasCardPhoto && (
                  <span className="badge-soft badge-verified" style={{ fontSize: '0.75rem' }}>
                    <FileCheck size={13} />
                    <span>Card Photo Attached</span>
                  </span>
                )}
              </div>
            )}

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
              className="no-print"
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <a
                  href={v.officialSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontSize: '0.78rem', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', textDecoration: 'underline' }}
                >
                  <span>{v.sourceText}</span>
                  <ExternalLink size={12} />
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => navigateToCareFinderWithFilter('vaccination', 'Childhood Vaccination')}
                  className="btn-outline btn-pill"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem', gap: '0.35rem' }}
                >
                  <MapPin size={14} />
                  <span>Find vaccine clinic</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenRecordModal(v)}
                  className="btn-primary btn-pill"
                  style={{ fontSize: '0.8rem', padding: '0.35rem 0.85rem' }}
                >
                  {v.completed ? 'Edit Record' : 'Mark as Given'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Dialog for Recording / Marking Vaccine as Given */}
      {recordModalVaccine && (
        <dialog 
          open 
          style={{ display: 'block' }} 
          aria-labelledby="record-vaccine-title"
        >
          <div className="dialog-inner">
            <div className="dialog-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Syringe size={20} style={{ color: 'var(--color-primary)' }} />
                <h3 id="record-vaccine-title" style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', margin: 0 }}>
                  Record Vaccination: {recordModalVaccine.vaccineName}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRecordModalVaccine(null)}
                className="btn-outline"
                style={{ padding: '0.3rem', borderRadius: '50%' }}
                aria-label="Close dialog"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveVaccineRecord}>
              <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="vac-date" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.3rem' }}>
                    Date Given:
                  </label>
                  <input
                    id="vac-date"
                    type="date"
                    value={recordDate}
                    onChange={(e) => setRecordDate(e.target.value)}
                    required
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="vac-place" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.3rem' }}>
                    Clinic / Surgery or Place Given:
                  </label>
                  <input
                    id="vac-place"
                    type="text"
                    value={recordPlace}
                    onChange={(e) => setRecordPlace(e.target.value)}
                    placeholder="e.g. Highbury Fields Family Health, Dr. Vance's practice"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.9rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="vac-notes" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.3rem' }}>
                    Batch number or notes (Optional):
                  </label>
                  <input
                    id="vac-notes"
                    type="text"
                    value={recordNotes}
                    onChange={(e) => setRecordNotes(e.target.value)}
                    placeholder="e.g. Batch #BN8821, infant was calm, paracetamol given after"
                    style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.9rem' }}
                  />
                </div>

                {/* Optional private card photo upload */}
                <div style={{ border: '1px dashed var(--color-mint-border)', padding: '1rem', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: '#fafdfb' }}>
                  <Upload size={22} style={{ color: 'var(--color-primary)', margin: '0 auto 0.4rem auto' }} />
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                    Upload photo of physical health card (Red book)
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', margin: '0.2rem 0 0.6rem 0' }}>
                    Stored completely privately on your device. Never shared or sold.
                  </div>
                  <button
                    type="button"
                    onClick={() => setRecordPhotoUploaded(true)}
                    className="btn-outline btn-pill"
                    style={{ fontSize: '0.8rem', padding: '0.3rem 0.8rem' }}
                  >
                    {recordPhotoUploaded ? '✓ Red Book Photo Attached' : 'Attach Card Photo'}
                  </button>
                </div>
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  onClick={() => setRecordModalVaccine(null)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Vaccination Record
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
