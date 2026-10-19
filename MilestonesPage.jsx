import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  INITIAL_MILESTONES, 
  MILESTONE_CATEGORIES, 
  AGE_WINDOWS, 
  CLINICAL_RED_FLAGS 
} from '../data/milestonesData';
import AudioReaderButton from '../components/AudioReaderButton';
import StandingDisclaimer from '../components/StandingDisclaimer';
import { 
  Sparkles, 
  Check, 
  HelpCircle, 
  Heart, 
  MapPin, 
  FileText, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export default function MilestonesPage() {
  const {
    activeChild,
    childAgeData,
    milestonesState,
    updateMilestoneStatus,
    activeChildId,
    addQuestionToAsk,
    navigateToCareFinderWithFilter,
    setCurrentPage
  } = useApp();

  const [selectedAgeWindow, setSelectedAgeWindow] = useState('6-7m'); // Current demo window
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedHelperId, setExpandedHelperId] = useState(null);

  const childMilestones = milestonesState[activeChildId] || {};

  // Filtered milestones
  const filteredMilestones = INITIAL_MILESTONES.filter(m => {
    const matchesAge = m.ageWindow === selectedAgeWindow;
    const matchesCategory = selectedCategory === 'all' || m.area === selectedCategory;
    return matchesAge && matchesCategory;
  });

  const toggleHelper = (id) => {
    setExpandedHelperId(prev => prev === id ? null : id);
  };

  return (
    <div className="animate-fade-in">
      {/* Header Banner */}
      <section style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--color-primary)', fontSize: '0.88rem', fontWeight: 600 }}>
          <Sparkles size={16} />
          <span>Supportive Developmental Framework</span>
        </div>
        <h1 style={{ fontSize: '1.8rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0.25rem 0 0.5rem 0' }}>
          Milestones for {activeChild?.nickname || 'Your Child'}
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', maxWidth: '750px', lineHeight: 1.5 }}>
          Milestones describe what is typically seen at each age. Every child grows on their own schedule—some reach certain milestones months earlier or later than others. Language here is supportive and never judgmental.
        </p>

        {/* "Why We Ask" supportive callout (Section 3.3) */}
        <div 
          className="reassurance-box" 
          style={{ 
            backgroundColor: '#fafdfb', 
            border: '1px solid var(--color-mint-border)', 
            borderLeft: '4px solid var(--color-primary)',
            borderRadius: 'var(--radius-md)',
            marginTop: '1rem',
            padding: '0.85rem 1.15rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, color: 'var(--color-sage-deep)', fontSize: '0.88rem' }}>
            <Info size={16} style={{ color: 'var(--color-primary)' }} />
            <span>Why we ask:</span>
          </div>
          <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.45 }}>
            Your answers only help personalize activity ideas and gentle clinic visit questions. They are never scored, never shared with third parties, and never used to judge or label your child.
          </p>
        </div>
      </section>

      {/* Age Window Selector Tabs */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '0.45rem', 
          overflowX: 'auto', 
          paddingBottom: '0.75rem', 
          marginBottom: '1rem',
          borderBottom: '1px solid var(--color-mint-border)' 
        }}
        role="tablist"
        aria-label="Select age window"
      >
        {AGE_WINDOWS.map(win => {
          const isSelected = selectedAgeWindow === win.id;
          return (
            <button
              key={win.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedAgeWindow(win.id)}
              className="btn-pill"
              style={{
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: isSelected ? 600 : 500,
                backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-surface-white)',
                color: isSelected ? '#ffffff' : 'var(--color-text-main)',
                border: isSelected ? '1px solid var(--color-primary)' : '1px solid var(--color-mint-border)',
                whiteSpace: 'nowrap'
              }}
            >
              {win.label}
            </button>
          );
        })}
      </div>

      {/* Domain Category Filter Pills */}
      <div 
        style={{ 
          display: 'flex', 
          gap: '0.4rem', 
          flexWrap: 'wrap', 
          marginBottom: '1.5rem',
          alignItems: 'center' 
        }}
      >
        <span style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
          Area:
        </span>
        {MILESTONE_CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className="btn-pill"
              style={{
                fontSize: '0.8rem',
                padding: '0.3rem 0.75rem',
                backgroundColor: isSelected ? 'var(--color-mint-light)' : 'transparent',
                borderColor: isSelected ? 'var(--color-primary)' : 'var(--color-mint-border)',
                color: isSelected ? 'var(--color-primary)' : 'var(--color-text-muted)',
                fontWeight: isSelected ? 600 : 500,
                border: '1px solid'
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Milestone Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        {filteredMilestones.length === 0 ? (
          <div className="card-calm" style={{ textAlign: 'center', padding: '2.5rem' }}>
            <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>
              No milestones found for this specific area. Switch to "All Areas" to see the full framework.
            </p>
          </div>
        ) : (
          filteredMilestones.map(milestone => {
            const currentStatus = childMilestones[milestone.id] || milestone.defaultStatus;
            const isHelperOpen = expandedHelperId === milestone.id;

            return (
              <article 
                key={milestone.id} 
                className="card-calm"
                style={{
                  borderLeft: currentStatus === 'completed' 
                    ? '4px solid var(--color-primary)' 
                    : currentStatus === 'unsure' 
                    ? '4px solid #c7b385' 
                    : '4px solid var(--color-mint-border)'
                }}
              >
                {/* Title and Audio row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ flex: 1, minWidth: '260px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <span className="badge-soft badge-neutral" style={{ fontSize: '0.72rem', textTransform: 'capitalize' }}>
                        {milestone.area}
                      </span>
                      <span style={{ fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>
                        {milestone.timingNote}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', fontWeight: 600, lineHeight: 1.35 }}>
                      {milestone.title}
                    </h3>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <AudioReaderButton 
                      textToRead={`${milestone.title}. ${milestone.description}. Playful activity: ${milestone.tryTogether}`}
                      label="Listen"
                    />
                    
                    <span 
                      className={`badge-soft ${currentStatus === 'completed' ? 'badge-completed' : currentStatus === 'unsure' ? 'badge-gentle' : 'badge-neutral'}`}
                      style={{ fontSize: '0.82rem' }}
                    >
                      {currentStatus === 'completed' ? 'Completed' : currentStatus === 'unsure' ? 'Unsure' : 'Not yet'}
                    </span>
                  </div>
                </div>

                {/* Plain language description */}
                <p style={{ fontSize: '0.92rem', color: 'var(--color-text-main)', margin: '0.65rem 0', lineHeight: 1.5 }}>
                  {milestone.description}
                </p>

                {/* "Try this together" Playful activity box */}
                <div 
                  style={{ 
                    backgroundColor: 'var(--color-mint-light)', 
                    border: '1px solid var(--color-mint-border)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '0.85rem 1rem', 
                    marginTop: '0.75rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.6rem'
                  }}
                >
                  <Sparkles size={16} style={{ color: 'var(--color-primary)', marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--color-sage-deep)' }}>
                      Try this together:
                    </span>
                    <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.85rem', color: 'var(--color-text-main)', lineHeight: 1.45 }}>
                      {milestone.tryTogether}
                    </p>
                  </div>
                </div>

                {/* "What does this look like?" Collapsible helper */}
                <div style={{ marginTop: '0.75rem' }}>
                  <button
                    type="button"
                    onClick={() => toggleHelper(milestone.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      fontSize: '0.82rem',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                    aria-expanded={isHelperOpen}
                  >
                    <HelpCircle size={15} />
                    <span>What does this look like?</span>
                    {isHelperOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {isHelperOpen && (
                    <div 
                      style={{ 
                        marginTop: '0.5rem', 
                        backgroundColor: '#fafdfb', 
                        border: '1px dashed var(--color-mint-border)', 
                        borderRadius: 'var(--radius-md)', 
                        padding: '0.85rem 1rem',
                        fontSize: '0.85rem',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.45
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        <strong>Observation guide:</strong> {milestone.whatItLooksLike}
                      </p>
                      <p style={{ margin: '0.4rem 0 0 0', fontSize: '0.78rem', color: 'var(--color-text-subtle)' }}>
                        Remember: you can choose "Unsure" anytime without triggering alerts. It's completely neutral!
                      </p>
                    </div>
                  )}
                </div>

                {/* Three choices and Actions row */}
                <div 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    flexWrap: 'wrap', 
                    gap: '0.75rem', 
                    marginTop: '1.25rem', 
                    paddingTop: '0.85rem', 
                    borderTop: '1px solid var(--color-mint-border)' 
                  }}
                >
                  {/* Three Choice Buttons (Section 3.3) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginRight: '0.25rem' }}>
                      Record observation:
                    </span>
                    <button
                      type="button"
                      onClick={() => updateMilestoneStatus(milestone.id, 'completed')}
                      className="btn-pill"
                      style={{
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        backgroundColor: currentStatus === 'completed' ? 'var(--status-completed-bg)' : '#ffffff',
                        borderColor: currentStatus === 'completed' ? 'var(--status-completed-border)' : 'var(--color-mint-border)',
                        color: currentStatus === 'completed' ? 'var(--status-completed-text)' : 'var(--color-text-main)',
                        border: '1px solid'
                      }}
                    >
                      ✓ Completed
                    </button>

                    <button
                      type="button"
                      onClick={() => updateMilestoneStatus(milestone.id, 'not_yet')}
                      className="btn-pill"
                      style={{
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        backgroundColor: currentStatus === 'not_yet' ? 'var(--status-neutral-bg)' : '#ffffff',
                        borderColor: currentStatus === 'not_yet' ? 'var(--status-neutral-border)' : 'var(--color-mint-border)',
                        color: currentStatus === 'not_yet' ? 'var(--status-neutral-text)' : 'var(--color-text-main)',
                        border: '1px solid'
                      }}
                    >
                      Not yet
                    </button>

                    <button
                      type="button"
                      onClick={() => updateMilestoneStatus(milestone.id, 'unsure')}
                      className="btn-pill"
                      style={{
                        padding: '0.35rem 0.8rem',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        backgroundColor: currentStatus === 'unsure' ? 'var(--status-gentle-bg)' : '#ffffff',
                        borderColor: currentStatus === 'unsure' ? 'var(--status-gentle-border)' : 'var(--color-mint-border)',
                        color: currentStatus === 'unsure' ? 'var(--status-gentle-text)' : 'var(--color-text-main)',
                        border: '1px solid'
                      }}
                    >
                      Unsure
                    </button>
                  </div>

                  {/* Contextual actions: Questions builder & Care finder */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        addQuestionToAsk(
                          `Observation on "${milestone.title}": What are some enjoyable activities to encourage this at ${selectedAgeWindow}?`,
                          milestone.area,
                          milestone.id
                        );
                        setCurrentPage('visit-prep');
                      }}
                      className="btn-outline btn-pill"
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', gap: '0.35rem' }}
                      title="Add to Doctor Visit Prep checklist"
                    >
                      <FileText size={14} />
                      <span>Add to Visit Prep</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => navigateToCareFinderWithFilter(milestone.careFinderTopic, '')}
                      className="btn-primary btn-pill"
                      style={{ fontSize: '0.8rem', padding: '0.3rem 0.75rem', gap: '0.35rem' }}
                      title="Open Care Finder pre-selected with this topic"
                    >
                      <MapPin size={14} />
                      <span>More info & local care</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Clinically Reviewed Red Flags / "Talk to a Professional Soon" Section (Section 3.4) */}
      <section 
        className="card-calm"
        style={{
          backgroundColor: '#fafcfb',
          borderColor: 'var(--color-mint-border)',
          marginBottom: '2rem'
        }}
        aria-labelledby="clinical-guidance-heading"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <Heart size={20} style={{ color: 'var(--color-primary)' }} aria-hidden="true" />
          <h2 id="clinical-guidance-heading" style={{ fontSize: '1.15rem', color: 'var(--color-sage-deep)', fontWeight: 600, margin: 0 }}>
            Clinically Reviewed Signs to Talk Through with a Professional
          </h2>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1rem' }}>
          Paediatricians and child development specialists define a small set of situations where checking in with your child’s doctor or health visitor is encouraged. The site itself never diagnoses, but offers these calm pointers to support your conversations.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {CLINICAL_RED_FLAGS.map(rf => (
            <div 
              key={rf.id}
              style={{
                border: '1px solid var(--color-mint-border)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem',
                backgroundColor: '#ffffff'
              }}
            >
              <h4 style={{ fontSize: '0.92rem', color: 'var(--color-sage-deep)', fontWeight: 600, marginBottom: '0.35rem' }}>
                {rf.title}
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--color-text-main)', lineHeight: 1.45, margin: 0 }}>
                {rf.guidance}
              </p>
              <div style={{ marginTop: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => navigateToCareFinderWithFilter('developmental assessment', 'Developmental Assessment')}
                  style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}
                >
                  Find developmental specialist →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mandatory Standing Disclaimer */}
      <StandingDisclaimer />
    </div>
  );
}
