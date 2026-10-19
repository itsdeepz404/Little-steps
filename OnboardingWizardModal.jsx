import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AGE_WINDOWS, INITIAL_MILESTONES } from '../data/milestonesData';
import { 
  X, 
  Sparkles, 
  Baby, 
  Check, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Info,
  Calendar
} from 'lucide-react';
import AudioReaderButton from '../components/AudioReaderButton';

export default function OnboardingWizardModal() {
  const {
    onboardingOpen,
    setOnboardingOpen,
    onboardingMode,
    addNewChild,
    milestonesState,
    updateMilestoneStatus,
    activeChildId,
    setCurrentPage
  } = useApp();

  const [step, setStep] = useState(1); // 1: Child info, 2: 0-1m, 3: 2-3m, 4: 4-5m, 5: 6-7m, 6: Summary
  
  // Child form
  const [nickname, setNickname] = useState('Oliver');
  const [dob, setDob] = useState('2026-03-15');
  const [bornEarly, setBornEarly] = useState(false);
  const [weeksEarly, setWeeksEarly] = useState('0');

  // Answers tracked during onboarding wizard
  const [answers, setAnswers] = useState({});
  const [expandedHelper, setExpandedHelper] = useState(null);

  if (!onboardingOpen) return null;

  const currentWindowObj = step === 2 ? AGE_WINDOWS[0] 
    : step === 3 ? AGE_WINDOWS[1] 
    : step === 4 ? AGE_WINDOWS[2] 
    : step === 5 ? AGE_WINDOWS[3] 
    : null;

  const currentMilestones = currentWindowObj 
    ? INITIAL_MILESTONES.filter(m => m.ageWindow === currentWindowObj.id) 
    : [];

  const handleRecordChoice = (milestoneId, status) => {
    setAnswers(prev => ({ ...prev, [milestoneId]: status }));
  };

  const handleMarkRangeAsDone = () => {
    const updated = { ...answers };
    currentMilestones.forEach(m => {
      updated[m.id] = 'completed';
    });
    setAnswers(updated);
  };

  const handleFinishOnboarding = () => {
    // Save child profile
    addNewChild(nickname, dob, bornEarly, weeksEarly);
    
    // Push answers to active milestones
    Object.keys(answers).forEach(mId => {
      updateMilestoneStatus(mId, answers[mId]);
    });

    setOnboardingOpen(false);
    setCurrentPage('dashboard');
  };

  return (
    <dialog open style={{ display: 'block' }} aria-labelledby="onboarding-dialog-title">
      <div className="dialog-inner" style={{ maxWidth: '680px' }}>
        {/* Header with step counter (Not a score!) */}
        <div className="dialog-header">
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--color-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {step === 1 ? 'Step 1 of 6: Welcome' : step === 6 ? 'Summary' : `Step ${step} of 6`}
            </div>
            <h2 id="onboarding-dialog-title" style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', margin: 0, fontWeight: 700 }}>
              {step === 1 && "Welcome to Little Steps: Let's catch up"}
              {step >= 2 && step <= 5 && `What has ${nickname || 'your child'} been exploring? (${currentWindowObj?.label})`}
              {step === 6 && "You're all set! Everything is saved."}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setOnboardingOpen(false)}
            className="btn-outline"
            style={{ padding: '0.35rem', borderRadius: '50%' }}
            aria-label="Close setup wizard"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body based on step */}
        <div className="dialog-body">
          {/* STEP 1: NICKNAME & DATE OF BIRTH */}
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div 
                className="reassurance-box" 
                style={{ 
                  backgroundColor: 'var(--color-mint-light)', 
                  borderLeft: '4px solid var(--color-primary)', 
                  margin: 0,
                  fontSize: '0.92rem'
                }}
              >
                "Thanks! Let's catch up on what your child has already been doing. There are no wrong answers, no scores, and no rush."
              </div>

              <div>
                <label htmlFor="onb-nickname" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.35rem' }}>
                  Child's Name or Nickname:
                </label>
                <input
                  id="onb-nickname"
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="e.g. Leo, Peanut, Maya"
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-mint-border)', fontSize: '0.95rem' }}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  💡 You can use a nickname or any name you like. We never need the real name.
                </span>
              </div>

              <div>
                <label htmlFor="onb-dob" style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: 'var(--color-sage-deep)', marginBottom: '0.35rem' }}>
                  Date of Birth (Required for schedules):
                </label>
                <input
                  id="onb-dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-mint-border)', fontSize: '0.95rem' }}
                />
                <span style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', display: 'block' }}>
                  The date of birth selects the milestone window and national vaccination schedule.
                </span>
              </div>

              <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '0.85rem', backgroundColor: '#fafdfb' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.88rem', color: 'var(--color-sage-deep)', fontWeight: 600 }}>
                  <input
                    type="checkbox"
                    checked={bornEarly}
                    onChange={(e) => setBornEarly(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  <span>Was baby born more than 3 weeks early (premature)?</span>
                </label>

                {bornEarly && (
                  <div style={{ marginTop: '0.6rem', paddingLeft: '1.6rem' }}>
                    <label htmlFor="onb-weeks" style={{ fontSize: '0.82rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: '0.2rem' }}>
                      How many weeks early was baby born?
                    </label>
                    <input
                      id="onb-weeks"
                      type="number"
                      min="1"
                      max="16"
                      value={weeksEarly}
                      onChange={(e) => setWeeksEarly(e.target.value)}
                      style={{ width: '80px', padding: '0.4rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-mint-border)' }}
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'block', marginTop: '0.2rem' }}>
                      Corrected age will be used automatically for milestones to give baby the right time.
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEPS 2 TO 5: AGE RANGES (0-1m, 2-3m, 4-5m, 6-7m) */}
          {step >= 2 && step <= 5 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Age range: <strong>{currentWindowObj?.label}</strong> ({currentWindowObj?.rangeText})
                </span>

                <button
                  type="button"
                  onClick={handleMarkRangeAsDone}
                  className="btn-outline btn-pill"
                  style={{ fontSize: '0.78rem', padding: '0.25rem 0.65rem' }}
                >
                  ✓ Mark all in this range as done
                </button>
              </div>

              {/* Milestones in this range */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {currentMilestones.map(m => {
                  const currentAnswer = answers[m.id] || 'completed';
                  const isHelperOpen = expandedHelper === m.id;

                  return (
                    <div 
                      key={m.id}
                      style={{
                        border: '1px solid var(--color-mint-border)',
                        borderRadius: 'var(--radius-md)',
                        padding: '0.85rem 1rem',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--color-sage-deep)' }}>
                        {m.title}
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: '0.25rem 0 0.5rem 0', lineHeight: 1.4 }}>
                        {m.description}
                      </p>

                      {/* Helper toggle */}
                      <button
                        type="button"
                        onClick={() => setExpandedHelper(isHelperOpen ? null : m.id)}
                        style={{ fontSize: '0.78rem', color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.6rem', cursor: 'pointer' }}
                      >
                        <HelpCircle size={13} />
                        <span>{isHelperOpen ? 'Hide helper' : 'What does this look like?'}</span>
                      </button>

                      {isHelperOpen && (
                        <div style={{ backgroundColor: 'var(--color-mint-light)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', color: 'var(--color-text-main)', marginBottom: '0.65rem' }}>
                          {m.whatItLooksLike}
                        </div>
                      )}

                      {/* Three choices */}
                      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleRecordChoice(m.id, 'completed')}
                          className="btn-pill"
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            border: '1px solid',
                            backgroundColor: currentAnswer === 'completed' ? 'var(--status-completed-bg)' : '#ffffff',
                            borderColor: currentAnswer === 'completed' ? 'var(--status-completed-border)' : 'var(--color-mint-border)',
                            color: currentAnswer === 'completed' ? 'var(--status-completed-text)' : 'var(--color-text-main)'
                          }}
                        >
                          ✓ Completed
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRecordChoice(m.id, 'not_yet')}
                          className="btn-pill"
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            border: '1px solid',
                            backgroundColor: currentAnswer === 'not_yet' ? 'var(--status-neutral-bg)' : '#ffffff',
                            borderColor: currentAnswer === 'not_yet' ? 'var(--status-neutral-border)' : 'var(--color-mint-border)',
                            color: currentAnswer === 'not_yet' ? 'var(--status-neutral-text)' : 'var(--color-text-main)'
                          }}
                        >
                          Not yet
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRecordChoice(m.id, 'unsure')}
                          className="btn-pill"
                          style={{
                            padding: '0.35rem 0.75rem',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            border: '1px solid',
                            backgroundColor: currentAnswer === 'unsure' ? 'var(--status-gentle-bg)' : '#ffffff',
                            borderColor: currentAnswer === 'unsure' ? 'var(--status-gentle-border)' : 'var(--color-mint-border)',
                            color: currentAnswer === 'unsure' ? 'var(--status-gentle-text)' : 'var(--color-text-main)'
                          }}
                        >
                          Unsure
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 6: SUMMARY SCREEN */}
          {step === 6 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div 
                style={{ 
                  backgroundColor: 'var(--color-mint-light)', 
                  border: '1px solid var(--color-mint-border)', 
                  borderRadius: 'var(--radius-md)', 
                  padding: '1.25rem',
                  textAlign: 'center' 
                }}
              >
                <Sparkles size={32} style={{ color: 'var(--color-primary)', margin: '0 auto 0.5rem auto' }} />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-sage-deep)', fontWeight: 700, margin: '0 0 0.35rem 0' }}>
                  Wonderful job catching up!
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-main)', margin: 0, lineHeight: 1.5 }}>
                  We’ve recorded everything for <strong>{nickname}</strong>. You can change any answer anytime, or add gentle questions for your next clinic visit.
                </p>
              </div>

              <div style={{ border: '1px solid var(--color-mint-border)', borderRadius: 'var(--radius-md)', padding: '1rem', backgroundColor: '#fafdfb' }}>
                <h4 style={{ fontSize: '0.92rem', color: 'var(--color-sage-deep)', marginBottom: '0.5rem' }}>
                  What happens next:
                </h4>
                <ul style={{ paddingLeft: '1.25rem', fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
                  <li>Your child’s dashboard will highlight this month’s gentle activities.</li>
                  <li>Official regional vaccination schedules are ready for your review.</li>
                  <li>You can invite co-parents or grandparents with view-only or edit permissions.</li>
                  <li>No alarms or urgent labels will ever be sent for open milestones.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer controls: Back, Next, Finish */}
        <div className="dialog-footer" style={{ justifyContent: 'space-between' }}>
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn-outline"
                style={{ gap: '0.35rem' }}
              >
                <ArrowLeft size={15} />
                <span>Back</span>
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {step >= 2 && step <= 5 && (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-outline"
              >
                Skip this range
              </button>
            )}

            {step < 6 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn-primary"
                style={{ gap: '0.35rem' }}
              >
                <span>Continue</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="btn-primary"
              >
                Finish & Go to Dashboard
              </button>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
}
