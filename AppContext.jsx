import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MILESTONES } from '../data/milestonesData';
import { VACCINATION_SCHEDULES, REGIONS } from '../data/vaccinesData';
import { CARE_PROVIDERS } from '../data/providersData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Navigation
  const [currentPage, setCurrentPage] = useState('dashboard'); // 'landing', 'dashboard', 'milestones', 'vaccines', 'care-finder', 'my-care-team', 'visit-prep', 'learn', 'profile-sharing', 'privacy'

  // Modals & Drawers
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [onboardingMode, setOnboardingMode] = useState('older-child'); // 'newborn' or 'older-child'
  const [selectedProviderForModal, setSelectedProviderForModal] = useState(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [weeklyDigestOpen, setWeeklyDigestOpen] = useState(false);
  const [providerPortalOpen, setProviderPortalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [reassuranceDrawerOpen, setReassuranceDrawerOpen] = useState(false);
  const [suggestCorrectionModal, setSuggestCorrectionModal] = useState(null); // provider object

  // Filter state pre-passed to Care Finder (e.g. from milestone or vaccine click)
  const [careFinderPreFilter, setCareFinderPreFilter] = useState({ topic: '', service: '' });

  // Children Profiles
  const [childrenList, setChildrenList] = useState([
    {
      id: 'child-1',
      nickname: 'Leo',
      dateOfBirth: '2026-03-24', // Approx 7 months old
      bornEarly: true,
      weeksEarly: 4,
      notes: 'Loves high-contrast books, musical rattles and splashing during bath time.'
    },
    {
      id: 'child-2',
      nickname: 'Maya',
      dateOfBirth: '2025-04-12', // Approx 18 months old
      bornEarly: false,
      weeksEarly: 0,
      notes: 'Enjoys soft stacking blocks, outdoor walks, and pointing at neighborhood animals.'
    }
  ]);
  const [activeChildId, setActiveChildId] = useState('child-1');
  const [useCorrectedAge, setUseCorrectedAge] = useState(true);

  // Region and Schedules
  const [activeRegion, setActiveRegion] = useState('uk');

  // Caregiver Profile
  const [caregiver, setCaregiver] = useState({
    name: 'Alex',
    relationship: 'Parent',
    preferredLanguage: 'English',
    email: 'alex.caregiver@example.com',
    phone: '+44 7700 900123',
    country: 'United Kingdom'
  });

  // Shared Caregivers
  const [sharedCaregivers, setSharedCaregivers] = useState([
    { id: 'cg-2', name: 'Grandma Nora', role: 'Grandparent', email: 'nora.g@example.com', permission: 'view-only', joinedDate: '10 Jun 2026' },
    { id: 'cg-3', name: 'Jordan', role: 'Co-parent', email: 'jordan.c@example.com', permission: 'edit', joinedDate: '28 Mar 2026' }
  ]);

  // Audit Log
  const [auditLog, setAuditLog] = useState([
    { id: 'log-1', timestamp: '2026-06-22 10:14', actor: 'Alex (Parent)', action: 'Recorded 12-week PCV & Rotavirus vaccinations' },
    { id: 'log-2', timestamp: '2026-08-15 14:30', actor: 'Grandma Nora', action: 'Viewed "Gentle Tummy Time" activities' },
    { id: 'log-3', timestamp: '2026-10-18 09:12', actor: 'Alex (Parent)', action: 'Added "Questions to ask doctor regarding sitting balance"' }
  ]);

  // Milestones State: { [childId]: { [milestoneId]: 'completed' | 'not_yet' | 'unsure' } }
  const [milestonesState, setMilestonesState] = useState(() => {
    const initialMap = {};
    INITIAL_MILESTONES.forEach(m => {
      initialMap[m.id] = m.defaultStatus;
    });
    return {
      'child-1': initialMap,
      'child-2': {
        // Older toddler Maya has more early milestones completed
        'm-01-1': 'completed',
        'm-01-2': 'completed',
        'm-01-3': 'completed',
        'm-02-1': 'completed',
        'm-02-2': 'completed',
        'm-02-3': 'completed',
        'm-04-1': 'completed',
        'm-04-2': 'completed',
        'm-04-3': 'completed',
        'm-06-1': 'completed',
        'm-06-2': 'completed',
        'm-06-3': 'completed',
        'm-06-4': 'completed',
        'm-08-1': 'completed',
        'm-08-2': 'completed',
        'm-08-3': 'completed',
        'm-08-4': 'completed',
        'm-10-1': 'completed',
        'm-10-2': 'completed',
        'm-10-3': 'completed',
        'm-15-1': 'completed',
        'm-15-2': 'unsure',
        'm-24-1': 'not_yet'
      }
    };
  });

  // Vaccines State: overrides or tracking per child
  const [vaccinesState, setVaccinesState] = useState(() => {
    return {
      'child-1': {},
      'child-2': {}
    };
  });

  // Saved Providers (My Care Team)
  const [savedProviderIds, setSavedProviderIds] = useState(['prov-1', 'prov-3']);

  // Questions to Ask Doctor Builder
  const [questionsToAsk, setQuestionsToAsk] = useState([
    {
      id: 'q-1',
      childId: 'child-1',
      category: 'Movement & Balance',
      question: 'Leo sits well when propped up with hands forward. What are some fun floor games to encourage sitting upright without hands touching?',
      sourceMilestoneId: 'm-08-1',
      dateAdded: '2026-10-15',
      discussed: false
    },
    {
      id: 'q-2',
      childId: 'child-1',
      category: 'Vaccinations & Teething',
      question: 'Can the 16-week 6-in-1 dose be given if Leo is slightly teething and irritable?',
      sourceMilestoneId: null,
      dateAdded: '2026-10-17',
      discussed: false
    }
  ]);

  // Healthcare Visit Notes History
  const [visitNotes, setVisitNotes] = useState([
    {
      id: 'vn-1',
      childId: 'child-1',
      date: '2026-06-22',
      providerName: 'Highbury Fields Family Health',
      clinician: 'Sister Rachel Davies (Health Visitor)',
      notes: '12-week immunisations given smoothly. Weight tracking along 50th centile. Advised paracetamol protocol. Discussed encouraging head turns to both sides.',
      followUp: 'Next review around 6-8 months for weaning and movement check-in.'
    }
  ]);

  // Notification & Digest Settings
  const [notificationSettings, setNotificationSettings] = useState({
    weeklyDigest: true,
    gentleMilestonePrompts: true,
    vaccineReminders: true,
    appointmentAlerts: true,
    channel: 'email', // 'email', 'sms', 'push'
    quietNightMode: true,
    lockScreenPrivacy: true // hides child name on lockscreen
  });

  // Accessibility States
  const [textSize, setTextSize] = useState('standard'); // 'standard' | 'medium' | 'large'
  const [highContrast, setHighContrast] = useState(false);

  // Live announcer text for screen readers (centralized aria-live region)
  const [screenReaderAnnouncement, setScreenReaderAnnouncement] = useState('');

  const announceToScreenReader = (msg) => {
    setScreenReaderAnnouncement(msg);
    setTimeout(() => setScreenReaderAnnouncement(''), 3000);
  };

  // Helper calculation for active child age
  const activeChild = childrenList.find(c => c.id === activeChildId) || childrenList[0];

  const calculateChildAge = (child) => {
    if (!child || !child.dateOfBirth) return { months: 0, weeks: 0, days: 0, ageText: '', correctedText: '' };
    const dob = new Date(child.dateOfBirth);
    const now = new Date('2026-10-19T23:51:00'); // current time provided in context
    const diffMs = now - dob;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const months = Math.floor(diffDays / 30.4375);
    const remainingDays = diffDays % 7;

    let ageText = '';
    if (months < 1) {
      ageText = `${weeks} weeks (${diffDays} days)`;
    } else if (months < 24) {
      ageText = `${months} months (${weeks} weeks)`;
    } else {
      const years = Math.floor(months / 12);
      const remMonths = months % 12;
      ageText = `${years} year${years > 1 ? 's' : ''} ${remMonths > 0 ? `${remMonths} mos` : ''}`;
    }

    let correctedText = null;
    if (child.bornEarly && child.weeksEarly > 0) {
      const correctedDays = Math.max(0, diffDays - (child.weeksEarly * 7));
      const correctedMonths = Math.floor(correctedDays / 30.4375);
      const correctedWeeks = Math.floor(correctedDays / 7);
      correctedText = `${correctedMonths} months (${correctedWeeks} weeks corrected age)`;
    }

    return { diffDays, weeks, months, ageText, correctedText };
  };

  const childAgeData = calculateChildAge(activeChild);

  // Update milestone status
  const updateMilestoneStatus = (milestoneId, status) => {
    setMilestonesState(prev => ({
      ...prev,
      [activeChildId]: {
        ...(prev[activeChildId] || {}),
        [milestoneId]: status
      }
    }));
    announceToScreenReader(`Updated milestone to ${status === 'not_yet' ? 'Not yet' : status}`);
  };

  // Toggle Save to Care Team
  const toggleSaveProvider = (providerId) => {
    setSavedProviderIds(prev => {
      const exists = prev.includes(providerId);
      const updated = exists ? prev.filter(id => id !== providerId) : [...prev, providerId];
      announceToScreenReader(exists ? 'Removed from My Care Team' : 'Saved to My Care Team');
      return updated;
    });
  };

  // Mark vaccine as completed / update
  const recordVaccineCompletion = (vaccineId, dateGiven, placeGiven, notes, photoUrl) => {
    setVaccinesState(prev => ({
      ...prev,
      [activeChildId]: {
        ...(prev[activeChildId] || {}),
        [vaccineId]: {
          completed: true,
          dateGiven: dateGiven || new Date().toISOString().split('T')[0],
          placeGiven: placeGiven || 'Community Clinic',
          notes: notes || '',
          photoUrl: photoUrl || null
        }
      }
    }));
    setAuditLog(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actor: `${caregiver.name} (${caregiver.relationship})`,
        action: `Recorded completion for vaccine ${vaccineId}`
      },
      ...prev
    ]);
    announceToScreenReader('Vaccination recorded successfully');
  };

  // Add Question to Ask Doctor
  const addQuestionToAsk = (questionText, category, sourceMilestoneId = null) => {
    const newQ = {
      id: `q-${Date.now()}`,
      childId: activeChildId,
      category: category || 'General Development',
      question: questionText,
      sourceMilestoneId,
      dateAdded: new Date().toISOString().split('T')[0],
      discussed: false
    };
    setQuestionsToAsk(prev => [newQ, ...prev]);
    announceToScreenReader('Added question to doctor visit prep list');
  };

  // Remove Question
  const removeQuestion = (id) => {
    setQuestionsToAsk(prev => prev.filter(q => q.id !== id));
    announceToScreenReader('Question removed');
  };

  // Toggle question discussed
  const toggleQuestionDiscussed = (id) => {
    setQuestionsToAsk(prev => prev.map(q => q.id === id ? { ...q, discussed: !q.discussed } : q));
  };

  // Add new child
  const addNewChild = (nickname, dob, bornEarly = false, weeksEarly = 0, notes = '') => {
    const newId = `child-${Date.now()}`;
    const newProfile = {
      id: newId,
      nickname: nickname || 'Baby',
      dateOfBirth: dob,
      bornEarly,
      weeksEarly: parseInt(weeksEarly, 10) || 0,
      notes
    };
    setChildrenList(prev => [...prev, newProfile]);
    setActiveChildId(newId);
    setMilestonesState(prev => ({ ...prev, [newId]: {} }));
    setVaccinesState(prev => ({ ...prev, [newId]: {} }));
    announceToScreenReader(`Created profile for ${nickname}`);
  };

  // Open Care Finder with specific prefilter
  const navigateToCareFinderWithFilter = (topic, service) => {
    setCareFinderPreFilter({ topic, service });
    setCurrentPage('care-finder');
    announceToScreenReader(`Showing care finder for ${topic || service}`);
  };

  // Reset/Delete all account data (Privacy by design)
  const deleteAllDataPermanently = () => {
    setChildrenList([
      {
        id: 'child-default',
        nickname: 'My Child (Nickname)',
        dateOfBirth: '2026-03-24',
        bornEarly: false,
        weeksEarly: 0,
        notes: ''
      }
    ]);
    setActiveChildId('child-default');
    setMilestonesState({});
    setVaccinesState({});
    setSavedProviderIds([]);
    setQuestionsToAsk([]);
    setVisitNotes([]);
    setAuditLog([]);
    setPrivacyModalOpen(false);
    announceToScreenReader('All data permanently erased as requested.');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        childrenList,
        activeChildId,
        setActiveChildId,
        activeChild,
        childAgeData,
        useCorrectedAge,
        setUseCorrectedAge,
        addNewChild,

        activeRegion,
        setActiveRegion,
        currentRegionMeta: REGIONS.find(r => r.id === activeRegion) || REGIONS[0],
        regionalSchedule: VACCINATION_SCHEDULES[activeRegion] || VACCINATION_SCHEDULES.uk,

        milestonesState,
        updateMilestoneStatus,

        vaccinesState,
        recordVaccineCompletion,

        providers: CARE_PROVIDERS,
        savedProviderIds,
        toggleSaveProvider,

        questionsToAsk,
        addQuestionToAsk,
        removeQuestion,
        toggleQuestionDiscussed,

        visitNotes,
        setVisitNotes,

        caregiver,
        setCaregiver,
        sharedCaregivers,
        setSharedCaregivers,
        auditLog,

        notificationSettings,
        setNotificationSettings,

        textSize,
        setTextSize,
        highContrast,
        setHighContrast,

        screenReaderAnnouncement,
        announceToScreenReader,

        // Modal triggers
        onboardingOpen,
        setOnboardingOpen,
        onboardingMode,
        setOnboardingMode,
        selectedProviderForModal,
        setSelectedProviderForModal,
        emergencyModalOpen,
        setEmergencyModalOpen,
        weeklyDigestOpen,
        setWeeklyDigestOpen,
        providerPortalOpen,
        setProviderPortalOpen,
        privacyModalOpen,
        setPrivacyModalOpen,
        reassuranceDrawerOpen,
        setReassuranceDrawerOpen,
        suggestCorrectionModal,
        setSuggestCorrectionModal,

        careFinderPreFilter,
        setCareFinderPreFilter,
        navigateToCareFinderWithFilter,

        deleteAllDataPermanently
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
