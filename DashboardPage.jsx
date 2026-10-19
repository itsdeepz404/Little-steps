import React from 'react';
import { useApp } from '../context/AppContext';
import StandingDisclaimer from '../components/StandingDisclaimer';
import AudioReaderButton from '../components/AudioReaderButton';
import { 
  Baby, 
  Calendar, 
  Syringe, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  FileText, 
  MapPin, 
  HelpCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { INITIAL_MILESTONES } from '../data/milestonesData';

export default function DashboardPage() {
  const {
    activeChild,
    childAgeData,
    useCorrectedAge,
    setCurrentPage,
    milestonesState,
    updateMilestoneStatus,
    activeChildId,
    regionalSchedule,
    currentRegionMeta,
    providers,
    savedProviderIds,
    questionsToAsk,
    addQuestionToAsk,
    navigateToCareFinderWithFilter,
    setOnboardingOpen,
    setOnboardingMode,
    setReassuranceDrawerOpen,
    setWeeklyDigestOpen
  } = useApp();

  const childMilestones = milestonesState[activeChildId] || {};

  // Find milestones matching this child's current stage (e.g. 6-7m for Leo)
  const currentStageMilestones = INITIAL_MILESTONES.filter(m => m.ageWindow === '6-7m');
  
  // Find open or unreached items to showcase gentle prompt
  const openMilestone = INITIAL_MILESTONES.find(m => m.id === 'm-08-1') || currentStageMilestones[0];
  const openStatus = childMilestones[openMilestone.id] || openMilestone.defaultStatus;

  // Next vaccination due
  const nextVaccinesDue = regionalSchedule.filter(v => !v.completed).slice(0, 2);

  // Saved primary clinic
  const primaryClinic = providers.find(p => savedProviderIds.includes(p.id)) || providers[0];

  return (
    <div className="animate-fade-in">
      {/* Hero Welcome & Child Age Banner */}
      <section 
        className="card-calm"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #eaf4ed 100%)',
          borderColor: 'var(--color-mint-border)',
          padding: '2rem',
          marginBottom: '1.75rem'
        }}
        aria-labelledby="dashboard-child-heading"
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'var(--color-mint-light)', color: 'var(--color-primary)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-pill)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.75rem' }}>
              <Sparkles size={14} />
              <span>Growing day by day</span>
            </div>

            <h1 id="dashboard-child-heading" style={{ fontSize: '1.9rem', color: 'var(--color-sage-deep)', fontWeight: 700, lineHeight: 1.2 }}>
              {activeChild?.nickname || 'Your Baby'} is {childAgeData.ageText}
            </h1>

            {activeChild?.bornEarly && (
              <p style={{ marginTop: '0.35rem', color: 'var(--color-primary)', fontSize: '0.95rem', fontWeight: 500 }}>
                {useCorrectedAge ? `Showing milestones for ${childAgeData.correctedText}` : 'Showing milestones by date of birth'}
              </p>
            )}

            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', marginTop: '0.5rem', maxWidth: '650px', lineHeight: 1.5 }}>
              A calm space to follow your child’s unique rhythm, prepare for friendly clinic visits, and keep your care team in one trusted place.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', minWidth: '220px' }}>
            <button
              type="button"
              onClick={() => {
                setOnboardingMode('older-child');
                setOnboardingOpen(true);
              }}
              className="btn-secondary"
              style={{ justifyContent: 'center', fontSize: '0.88rem' }}
            >
              <Plus size={16} />
              <span>Catch-up Onboarding</span>
            </button>

            <button
              type="button"
              onClick={() => setWeeklyDigestOpen(true)}
              className="btn-outline"
              style={{ justifyContent: 'center', fontSize: '0.85rem' }}
            >
              <Clock size={15} />
              <span>Preview Weekly Digest</span>
            </button>
          </div>
        </div>
      </section>

      {/* Grid: Milestones & Next Vaccinations */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '1.75rem' }}>
        
        {/* Left Column: This Month's Milestones */}
        <section className="card-calm" aria-labelledby="heading-milestones-summary">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-mint-border)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Baby size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <h2 id="heading-milestones-summary" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                This Stage (6–7 Months)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('milestones')}
              style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <span>View all ({INITIAL_MILESTONES.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
            Around 6 to 7 months, many babies explore sitting, transferring toys, and babbling rhythms. Timing is unique to every child.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {currentStageMilestones.slice(0, 3).map(m => {
              const currentStatus = childMilestones[m.id] || m.defaultStatus;
              return (
                <div 
                  key={m.id}
                  style={{
                    border: '1px solid var(--color-mint-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.9rem',
                    backgroundColor: currentStatus === 'completed' ? '#fafdfb' : '#ffffff'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <div>
                      <h4 style={{ fontSize: '0.92rem', color: 'var(--color-sage-deep)', fontWeight: 600, lineHeight: 1.3 }}>
                        {m.title}
                      </h4>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', lineHeight: 1.4 }}>
                        {m.description}
                      </p>
                    </div>

                    <span 
                      className={`badge-soft ${currentStatus === 'completed' ? 'badge-completed' : currentStatus === 'unsure' ? 'badge-gentle' : 'badge-neutral'}`}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      {currentStatus === 'completed' ? 'Completed' : currentStatus === 'unsure' ? 'Unsure' : 'Not yet'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.65rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-mint-border)' }}>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      <button
                        type="button"
                        onClick={() => updateMilestoneStatus(m.id, 'completed')}
                        className="btn-outline btn-pill"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.55rem',
                          backgroundColor: currentStatus === 'completed' ? 'var(--status-completed-bg)' : 'transparent',
                          borderColor: currentStatus === 'completed' ? 'var(--status-completed-border)' : 'var(--color-mint-border)'
                        }}
                      >
                        ✓ Completed
                      </button>
                      <button
                        type="button"
                        onClick={() => updateMilestoneStatus(m.id, 'not_yet')}
                        className="btn-outline btn-pill"
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.2rem 0.55rem',
                          backgroundColor: currentStatus === 'not_yet' ? 'var(--status-neutral-bg)' : 'transparent'
                        }}
                      >
                        Not yet
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigateToCareFinderWithFilter(m.careFinderTopic, '')}
                      style={{ fontSize: '0.78rem', color: 'var(--color-primary)', textDecoration: 'underline' }}
                    >
                      More info & care
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Vaccinations Due & Next Clinic Visit */}
        <section className="card-calm" aria-labelledby="heading-vaccines-summary">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid var(--color-mint-border)', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Syringe size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <h2 id="heading-vaccines-summary" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                Vaccination Schedule ({currentRegionMeta.name.split(' ')[0]})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setCurrentPage('vaccines')}
              style={{ color: 'var(--color-primary)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}
            >
              <span>View tracker</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Supportive catch-up notice for due vaccine (Section 3.6 kindly phrased) */}
          <div 
            style={{ 
              backgroundColor: '#f9fbf9', 
              border: '1px solid var(--color-mint-border)', 
              borderRadius: 'var(--radius-md)', 
              padding: '0.9rem',
              marginBottom: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Due Now / Catch-up Window</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>
              "This vaccine is due. Many families need to reschedule. Your clinic can help you find the best time to catch up."
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {nextVaccinesDue.map(v => (
              <div 
                key={v.id}
                style={{
                  border: '1px solid var(--color-mint-border)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.9rem',
                  backgroundColor: '#ffffff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--color-sage-deep)', fontWeight: 600 }}>
                      {v.vaccineName}
                    </h4>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-primary)', fontWeight: 500, marginTop: '0.15rem' }}>
                      Window: {v.ageWindow} • {v.funding}
                    </div>
                  </div>
                  <span className="badge-soft badge-gentle" style={{ whiteSpace: 'nowrap' }}>
                    Due now
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginTop: '0.35rem', lineHeight: 1.4 }}>
                  {v.diseaseProtected}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--color-mint-border)' }}>
                  <button
                    type="button"
                    onClick={() => navigateToCareFinderWithFilter('vaccination', 'Childhood Vaccination')}
                    className="btn-outline btn-pill"
                    style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem', gap: '0.35rem' }}
                  >
                    <MapPin size={13} />
                    <span>Find vaccination clinic</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCurrentPage('vaccines')}
                    style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'underline' }}
                  >
                    Mark as given
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Gentle Unreached Milestone Prompt Demo (Section 3.4) */}
      <section 
        className="card-calm"
        style={{
          borderLeft: '4px solid var(--color-primary)',
          backgroundColor: '#fbfdfc',
          marginBottom: '1.75rem'
        }}
        aria-labelledby="gentle-prompt-heading"
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ maxWidth: '780px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <Heart size={18} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
              <h3 id="gentle-prompt-heading" style={{ fontSize: '1.05rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                A gentle note on rolling & sitting balance
              </h3>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', lineHeight: 1.5, marginTop: '0.5rem' }}>
              "Many children start rolling over between 4 and 6 months and sitting independently between 6 and 9 months. Every child grows at their own pace, and some take a little longer. If you'd like to talk it through, your child's doctor or health visitor can answer questions and check in with you. Here are some gentle things you can try together."
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
              <AudioReaderButton 
                textToRead="Many children start rolling over between 4 and 6 months and sitting independently between 6 and 9 months. Every child grows at their own pace, and some take a little longer. If you would like to talk it through, your doctor or health visitor can answer questions and check in with you." 
                label="Listen to this note" 
              />
              
              <button
                type="button"
                onClick={() => {
                  addQuestionToAsk('What are some playful ways to support sitting balance and tummy time at home?', 'Movement & Physiotherapy', 'm-08-1');
                  setCurrentPage('visit-prep');
                }}
                className="btn-outline btn-pill"
                style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem', gap: '0.35rem' }}
              >
                <FileText size={14} />
                <span>Add to Questions for Doctor ({questionsToAsk.length} saved)</span>
              </button>

              <button
                type="button"
                onClick={() => navigateToCareFinderWithFilter('physiotherapy', 'Paediatric Physiotherapy (Tummy time & Gross Motor)')}
                className="btn-outline btn-pill"
                style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem', gap: '0.35rem' }}
              >
                <MapPin size={14} />
                <span>Find local paediatric physio</span>
              </button>
            </div>
          </div>

          <div style={{ textAlign: 'right', minWidth: '150px' }}>
            <span className="badge-soft badge-neutral" style={{ fontSize: '0.78rem' }}>
              Weekly Digest Preview
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
              No alarming alerts or red labels
            </div>
          </div>
        </div>
      </section>

      {/* Primary Saved Care Team Card & Doctor Visit Prep */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Saved Primary Clinic */}
        <div className="card-calm">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <MapPin size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '1rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                My Regular Clinic
              </h3>
            </div>
            <span className="badge-soft badge-verified">
              {primaryClinic.verificationStatus === 'official' ? 'Official Registry' : 'Provider-Confirmed'}
            </span>
          </div>

          <h4 style={{ fontSize: '0.98rem', color: 'var(--color-sage-deep)', fontWeight: 600 }}>
            {primaryClinic.name}
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', lineHeight: 1.4 }}>
            {primaryClinic.goodToKnow}
          </p>

          <div style={{ marginTop: '0.75rem', fontSize: '0.82rem', color: 'var(--color-text-main)' }}>
            <strong>Next walk-in baby session:</strong> Tuesdays 09:00 - 12:30
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setCurrentPage('care-finder')}
              className="btn-outline btn-pill"
              style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}
            >
              View clinic details & directions
            </button>
            <a
              href={primaryClinic.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary btn-pill"
              style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}
            >
              Book slot
            </a>
          </div>
        </div>

        {/* Doctor Visit Prep Cheat Sheet */}
        <div className="card-calm">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <FileText size={18} style={{ color: 'var(--color-primary)' }} />
              <h3 style={{ fontSize: '1rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
                Doctor Visit Prep List
              </h3>
            </div>
            <span className="badge-soft badge-neutral">
              {questionsToAsk.length} {questionsToAsk.length === 1 ? 'question' : 'questions'} saved
            </span>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
            Organise open questions and observations into a printable or shareable sheet for your next health visitor or paediatrician visit.
          </p>

          <ul style={{ margin: '0.75rem 0', paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.5 }}>
            {questionsToAsk.slice(0, 2).map(q => (
              <li key={q.id} style={{ marginBottom: '0.25rem' }}>
                {q.question}
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            <button
              type="button"
              onClick={() => setCurrentPage('visit-prep')}
              className="btn-primary btn-pill"
              style={{ fontSize: '0.82rem', padding: '0.35rem 0.8rem' }}
            >
              Open Questions Builder & Print
            </button>
          </div>
        </div>

      </div>

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
