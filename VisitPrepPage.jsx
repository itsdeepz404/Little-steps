import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StandingDisclaimer from '../components/StandingDisclaimer';
import AudioReaderButton from '../components/AudioReaderButton';
import { 
  FileText, 
  Printer, 
  Plus, 
  Check, 
  Trash2, 
  Calendar, 
  MapPin, 
  Sparkles, 
  Heart, 
  Building2, 
  BookOpen,
  MessageSquare
} from 'lucide-react';

export default function VisitPrepPage() {
  const {
    activeChild,
    childAgeData,
    questionsToAsk,
    addQuestionToAsk,
    removeQuestion,
    toggleQuestionDiscussed,
    visitNotes,
    setVisitNotes,
    providers,
    savedProviderIds,
    setCurrentPage
  } = useApp();

  const [newQuestionText, setNewQuestionText] = useState('');
  const [newCategory, setNewCategory] = useState('General Development');

  // Visit log state
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [logProvider, setLogProvider] = useState('Highbury Fields Family Health');
  const [logClinician, setLogClinician] = useState('');
  const [logNotes, setLogNotes] = useState('');
  const [logFollowUp, setLogFollowUp] = useState('');

  const savedClinics = providers.filter(p => savedProviderIds.includes(p.id));

  const handleAddQuestion = (e) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    addQuestionToAsk(newQuestionText.trim(), newCategory);
    setNewQuestionText('');
  };

  const handleSaveVisitLog = (e) => {
    e.preventDefault();
    if (!logNotes.trim()) return;
    const newLog = {
      id: `vn-${Date.now()}`,
      childId: activeChild.id,
      date: logDate,
      providerName: logProvider,
      clinician: logClinician || 'Doctor / Health Visitor',
      notes: logNotes,
      followUp: logFollowUp
    };
    setVisitNotes([newLog, ...visitNotes]);
    setLogModalOpen(false);
    setLogNotes('');
    setLogClinician('');
    setLogFollowUp('');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in">
      {/* Header and Print action */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
              <FileText size={16} />
              <span>Doctor Visit Preparation & Questions Builder</span>
            </div>
            <h1 style={{ fontSize: '1.8rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0.25rem 0 0.5rem 0' }}>
              Visit Prep for {activeChild?.nickname || 'Child'} ({childAgeData.ageText})
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.5 }}>
              Never forget what you wanted to ask. Compile observations and questions into a calm, structured list you can bring on your phone or print for your doctor, paediatrician or health visitor.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }} className="no-print">
            <button
              type="button"
              onClick={handlePrint}
              className="btn-outline btn-pill"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', gap: '0.4rem' }}
              title="Print questions and observation summary"
            >
              <Printer size={15} />
              <span>Print Checklist</span>
            </button>

            <button
              type="button"
              onClick={() => setLogModalOpen(true)}
              className="btn-primary btn-pill"
              style={{ fontSize: '0.85rem', padding: '0.45rem 0.9rem', gap: '0.4rem' }}
            >
              <Plus size={15} />
              <span>Record Visit Notes</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Questions Builder & Visit Notes History */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Left Column: Questions to Ask Checklist */}
        <section className="card-calm" aria-labelledby="questions-checklist-title">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-mint-border)', paddingBottom: '0.75rem' }}>
            <h2 id="questions-checklist-title" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
              Questions for Your Next Clinic Visit ({questionsToAsk.length})
            </h2>
            <AudioReaderButton 
              textToRead={questionsToAsk.map(q => q.question).join('. ')}
              label="Listen to questions"
            />
          </div>

          {/* Add Custom Question Form */}
          <form onSubmit={handleAddQuestion} style={{ marginBottom: '1.25rem' }} className="no-print">
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={newQuestionText}
                onChange={(e) => setNewQuestionText(e.target.value)}
                placeholder="Write a question or observation for the doctor..."
                style={{
                  flex: 1,
                  padding: '0.6rem 0.75rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-mint-border)',
                  fontSize: '0.9rem'
                }}
                aria-label="New question"
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.6rem 1rem' }}
              >
                Add
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              <span>Category:</span>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-mint-border)',
                  backgroundColor: '#ffffff',
                  fontSize: '0.8rem'
                }}
              >
                <option value="General Development">General Development</option>
                <option value="Movement & Physiotherapy">Movement & Physiotherapy</option>
                <option value="Communication & Speech">Communication & Speech</option>
                <option value="Feeding, Sleep & Everyday">Feeding, Sleep & Everyday</option>
                <option value="Vaccinations & Health">Vaccinations & Health</option>
              </select>
            </div>
          </form>

          {/* List of Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {questionsToAsk.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <p>No questions added yet.</p>
                <p style={{ fontSize: '0.82rem', marginTop: '0.35rem' }}>
                  Tap "Add to Visit Prep" on any milestone card or write your own question above.
                </p>
              </div>
            ) : (
              questionsToAsk.map(q => (
                <div 
                  key={q.id}
                  style={{
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem 1rem',
                    backgroundColor: q.discussed ? '#f5faf6' : '#ffffff',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <input
                      type="checkbox"
                      checked={q.discussed}
                      onChange={() => toggleQuestionDiscussed(q.id)}
                      style={{ marginTop: '0.25rem', width: '16px', height: '16px', cursor: 'pointer' }}
                      aria-label="Mark question as discussed"
                    />
                    <div>
                      <span className="badge-soft badge-neutral" style={{ fontSize: '0.72rem', marginBottom: '0.2rem' }}>
                        {q.category}
                      </span>
                      <p style={{ 
                        margin: '0.25rem 0 0 0', 
                        fontSize: '0.9rem', 
                        color: q.discussed ? 'var(--color-text-muted)' : 'var(--color-text-main)',
                        textDecoration: q.discussed ? 'line-through' : 'none',
                        lineHeight: 1.45
                      }}>
                        {q.question}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="no-print"
                    style={{ color: 'var(--color-text-subtle)', padding: '0.2rem', cursor: 'pointer' }}
                    title="Remove question"
                    aria-label="Remove question"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Column: Visit Notes Log & Saved Care Team */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Healthcare Visit Notes Log (Section 9 item 14) */}
          <div className="card-calm" aria-labelledby="visit-log-heading">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <BookOpen size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 id="visit-log-heading" style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                  Recorded Clinic Visit History
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setLogModalOpen(true)}
                className="btn-outline btn-pill no-print"
                style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
              >
                + New Log
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {visitNotes.map(vn => (
                <div 
                  key={vn.id}
                  style={{
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    backgroundColor: '#fafcfb'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--color-sage-deep)' }}>
                      {vn.providerName}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {vn.date}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', marginTop: '0.15rem' }}>
                    Clinician: {vn.clinician}
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', marginTop: '0.4rem', lineHeight: 1.45 }}>
                    {vn.notes}
                  </p>
                  {vn.followUp && (
                    <div style={{ marginTop: '0.4rem', fontSize: '0.78rem', color: 'var(--color-text-muted)', borderTop: '1px dashed var(--color-mint-border)', paddingTop: '0.35rem' }}>
                      <strong>Follow-up:</strong> {vn.followUp}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Saved Care Clinics Shortcut */}
          <div className="card-calm no-print">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Building2 size={18} style={{ color: 'var(--color-primary)' }} />
                <h3 style={{ fontSize: '1rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                  Saved Care Team ({savedClinics.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCurrentPage('care-finder')}
                style={{ fontSize: '0.78rem', color: 'var(--color-primary)', textDecoration: 'underline' }}
              >
                Find more clinics
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {savedClinics.map(clinic => (
                <div 
                  key={clinic.id}
                  style={{
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.65rem 0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-sage-deep)' }}>
                      {clinic.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {clinic.phone} • {clinic.distanceKm} km away
                    </div>
                  </div>
                  <a
                    href={`tel:${clinic.phone}`}
                    className="btn-outline btn-pill"
                    style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                  >
                    Call
                  </a>
                </div>
              ))}
            </div>
          </div>

        </section>
      </div>

      {/* Record Visit Notes Modal */}
      {logModalOpen && (
        <dialog open style={{ display: 'block' }} aria-labelledby="modal-visit-log-title">
          <div className="dialog-inner">
            <div className="dialog-header">
              <h3 id="modal-visit-log-title" style={{ fontSize: '1.1rem', color: 'var(--color-sage-deep)', margin: 0 }}>
                Record Healthcare Visit Notes
              </h3>
              <button
                type="button"
                onClick={() => setLogModalOpen(false)}
                className="btn-outline"
                style={{ padding: '0.35rem', borderRadius: '50%' }}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveVisitLog}>
              <div className="dialog-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label htmlFor="log-date" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                      Date of Visit:
                    </label>
                    <input
                      id="log-date"
                      type="date"
                      value={logDate}
                      onChange={(e) => setLogDate(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="log-prov" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                      Clinic / Hospital:
                    </label>
                    <input
                      id="log-prov"
                      type="text"
                      value={logProvider}
                      onChange={(e) => setLogProvider(e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="log-doc" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                    Clinician Name & Role (e.g. Dr. Vance, GP or Health Visitor):
                  </label>
                  <input
                    id="log-doc"
                    type="text"
                    value={logClinician}
                    onChange={(e) => setLogClinician(e.target.value)}
                    placeholder="e.g. Sister Davies (Health Visitor)"
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                  />
                </div>

                <div>
                  <label htmlFor="log-notes" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                    Discussion & Advice Notes:
                  </label>
                  <textarea
                    id="log-notes"
                    rows="3"
                    value={logNotes}
                    onChange={(e) => setLogNotes(e.target.value)}
                    placeholder="Record what was discussed, physical measurements, feeding tips, or gentle suggestions..."
                    required
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label htmlFor="log-follow" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.25rem' }}>
                    Agreed Next Steps / Follow-up:
                  </label>
                  <input
                    id="log-follow"
                    type="text"
                    value={logFollowUp}
                    onChange={(e) => setLogFollowUp(e.target.value)}
                    placeholder="e.g. Check in again around 9-12 months for weaning review"
                    style={{ width: '100%', padding: '0.55rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                  />
                </div>
              </div>

              <div className="dialog-footer">
                <button
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="btn-outline"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  Save Visit Note
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
