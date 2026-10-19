// Rich Healthcare Institutions & Care Cards Dataset
// Complies with strict verification ladder, accessibility markers, family facilities, and booking details.

export const CARE_PROVIDERS = [
  {
    id: 'prov-1',
    name: 'Highbury Fields Family Health & Child Development Centre',
    type: 'Community Health Centre & NHS Clinic',
    tagline: 'NHS community clinic offering drop-in baby weighing, weekly infant immunisations, and child development checks.',
    distanceKm: 0.8,
    travelTimeMinutes: 11,
    travelSummary: 'Short 11-min walk or Bus 19 / 4 to Highbury Barn stop. Street parking with designated disabled bays.',
    address: '42 Highbury Grove, London, N5 2ER',
    phone: '+44 20 7982 4100',
    email: 'childhealth.highbury@nhs.net',
    bookingUrl: 'https://highburyhealth.nhs.uk/book-child-clinic',
    hasOnlineBooking: true,
    acceptsWalkIns: true,
    publicOrPrivate: 'Public NHS (Free at point of care)',
    costNote: 'All routine NHS immunisations, baby checks and health visitor clinics are 100% free.',
    verificationStatus: 'provider-confirmed',
    verificationBadgeText: 'Verified directly with practice manager on 14 Aug 2026',
    verificationDate: '2026-08-14',
    isSavedToCareTeam: true,
    
    goodToKnow: 'Community clinic with a weekly child vaccination clinic and a visiting speech therapist. Walk-ins welcome on Tuesday mornings without an appointment.',

    services: [
      'Childhood Vaccination',
      'Developmental Assessment',
      'Health Visitor Drop-in',
      'Baby Weighing & Feeding',
      'Caregiver Mental Health & Postnatal Wellbeing'
    ],

    vaccinationCalendar: [
      { day: 'Tuesday', hours: '09:00 - 12:30', mode: 'Walk-in baby immunisation clinic (no appointment needed)' },
      { day: 'Thursday', hours: '14:00 - 17:00', mode: 'Booked nurse appointments for 8w, 12w, 16w & 1yr boosters' },
      { day: 'Friday', hours: '10:00 - 13:00', mode: 'Catch-up vaccination clinic' }
    ],

    doctorsByTopic: [
      {
        name: 'Dr. Helen Vance, MBChB, FRCGP',
        topic: 'General Paediatric & Family Medicine',
        schedule: 'Mondays & Thursdays',
        verified: true
      },
      {
        name: 'Sister Rachel Davies, RN, HV',
        topic: 'Specialist Community Health Visitor & Infant Feeding Lead',
        schedule: 'Tuesdays, Wednesdays & Fridays',
        verified: true
      },
      {
        name: 'Dr. Anita Roy, MRCPCH',
        topic: 'Visiting Paediatric Developmental Specialist',
        schedule: 'Alternate Wednesday mornings (by referral)',
        verified: true
      }
    ],

    accessibility: [
      'Step-free ground level entrance with automatic push-button doors',
      'Wide corridors suitable for twin prams & motorised wheelchairs',
      'Wheelchair-accessible family toilet with adult & infant changing tables',
      'Quiet sensory room available if baby or parent feels overwhelmed',
      'Designated accessible disabled parking bay right outside',
      'British Sign Language (BSL) interpreters booked with 48h notice'
    ],

    facilities: [
      'Private, tranquil baby-feeding & nursing room with comfortable gliders',
      'Secure indoor pram & buggy parking shelter',
      'Toddler play corner with wipe-clean sensory blocks',
      'Filtered hot and cold water bottle-prep station'
    ],

    languagesSpoken: ['English', 'Spanish', 'Bengali', 'Arabic', 'British Sign Language (on request)'],

    firstVisitGuide: {
      whatToBring: [
        'Personal Child Health Record (Red Book / Digital Health record)',
        'Any previous vaccination cards or letters from hospital',
        'Favourite toy or comforting muslin blanket for baby'
      ],
      typicalWaitTime: 'Approx 10–15 minutes on booked days; 20–30 minutes during peak Tuesday walk-in mornings.',
      referralPolicy: 'No referral needed for vaccinations or health visitor checks. Developmental reviews require GP or health visitor referral.'
    },

    referralPathways: 'If specialist paediatric neurology or audiology testing is needed, this clinic refers directly to Great Ormond Street Hospital or Whittington Paediatrics.',
    urgentCareNote: 'For out-of-hours advice call NHS 111. For severe breathing difficulty or lethargy, go to Whittington Paediatric A&E (1.8 miles).'
  },

  {
    id: 'prov-2',
    name: 'St. Mary’s Child Development & Therapy Centre',
    type: 'Specialist Paediatric Assessment & Therapy Service',
    tagline: 'Multi-disciplinary team of speech therapists, occupational therapists, and paediatric physiotherapists.',
    distanceKm: 2.4,
    travelTimeMinutes: 18,
    travelSummary: '18 min by Bus 43 or tube (accessible step-free lift station). Reserved clinic drop-off bay.',
    address: '18 Holloway Road, London, N7 8NJ',
    phone: '+44 20 7412 8820',
    email: 'referrals.stmarys@nhs.net',
    bookingUrl: 'https://stmaryschildtherapy.nhs.uk/self-referral',
    hasOnlineBooking: true,
    acceptsWalkIns: false,
    publicOrPrivate: 'Public NHS & Charitable Foundation Trust',
    costNote: 'NHS funded referrals are free. Self-referrals for developmental consultations welcome without fee barriers.',
    verificationStatus: 'official',
    verificationBadgeText: 'Verified via NHS Trust Public Directory on 02 Oct 2026',
    verificationDate: '2026-10-02',
    isSavedToCareTeam: false,

    goodToKnow: 'Warm, child-centred therapy unit specialising in early speech, movement milestones, and sensory processing support. Self-referrals accepted for speech screenings.',

    services: [
      'Speech & Language Therapy',
      'Paediatric Physiotherapy (Tummy time & Gross Motor)',
      'Occupational Therapy (Pincer grasp, Sensory needs)',
      'Developmental Assessment & Milestone Guidance',
      'Caregiver Support Circles'
    ],

    vaccinationCalendar: [
      { day: 'Not a vaccination centre', hours: 'N/A', mode: 'Therapy & milestone consultations only. Vaccines given at partner GP clinics.' }
    ],

    doctorsByTopic: [
      {
        name: 'Sarah Mitchell, MSc, RegMRCSLT',
        topic: 'Lead Speech & Language Therapist',
        schedule: 'Monday to Thursday',
        verified: true
      },
      {
        name: 'Marcus Thorne, MCSP, Paediatric Physio',
        topic: 'Paediatric Movement & Tummy Time Specialist',
        schedule: 'Tuesdays, Wednesdays & Fridays',
        verified: true
      },
      {
        name: 'Dr. Soraya Kazemi, FRCPCH',
        topic: 'Consultant Community Paediatrician',
        schedule: 'Mondays & Wednesdays',
        verified: true
      }
    ],

    accessibility: [
      'Full step-free lift access to all therapy suites',
      'Low-arousal sensory waiting alcove with dimmable natural warm lighting',
      'Wheelchair accessible assessment rooms with height-adjustable plinths',
      'Assistance dogs welcome',
      'Hearing loop installed at reception desk'
    ],

    facilities: [
      'Large sensory gym with soft foam climbing wedges and swings',
      'Spacious family consultation rooms with toddler-safe mirrors',
      'Dedicated nursing space with electric breast pump outlets',
      'Pram lock-up area inside reception'
    ],

    languagesSpoken: ['English', 'Urdu', 'Hindi', 'French', 'Makaton & BSL'],

    firstVisitGuide: {
      whatToBring: [
        'Any notes or milestone lists you prepared (e.g. from your Little Steps Questions builder)',
        'Video clips on your phone of baby moving or communicating at home (very helpful for therapists!)',
        'Comfortable play clothing for baby and caregiver'
      ],
      typicalWaitTime: 'Prompt 5-minute wait time in calm sensory room; sessions are strictly one-on-one for 45 minutes.',
      referralPolicy: 'Both health visitor referrals and caregiver self-referrals are accepted for children under 3 years.'
    },

    referralPathways: 'Works in close collaboration with local nursery teams and early-intervention statutory coordinators.',
    urgentCareNote: 'This is a scheduled therapy clinic. For urgent medical concerns, call NHS 111 or 999.'
  },

  {
    id: 'prov-3',
    name: 'Whittington Hospital Paediatric Ambulatory Care & 24/7 Urgent Care',
    type: 'Public Paediatric Hospital & 24-Hour Emergency Unit',
    tagline: 'Dedicated 24/7 children’s emergency department, acute paediatric wards, and audiology screening unit.',
    distanceKm: 3.2,
    travelTimeMinutes: 14,
    travelSummary: '14 min drive or direct Bus 271 / 43. 24-hour dedicated emergency ambulance bay & visitor parking.',
    address: 'Magdala Avenue, London, N19 5NF',
    phone: '+44 20 7272 3070',
    emergencyDirect: '+44 20 7288 5188 (Paediatric A&E triage)',
    bookingUrl: 'https://www.whittington.nhs.uk/paediatric-services',
    hasOnlineBooking: false,
    acceptsWalkIns: true,
    publicOrPrivate: 'NHS Public Foundation Trust',
    costNote: 'Emergency care and specialist paediatric clinics are free under NHS.',
    verificationStatus: 'official',
    verificationBadgeText: 'Verified via Care Quality Commission (CQC) on 18 Sep 2026',
    verificationDate: '2026-09-18',
    isSavedToCareTeam: true,

    goodToKnow: 'Separate, quiet 24-hour Paediatric Emergency triage distinct from adult A&E. Always staffed by paediatric doctors and children’s emergency nurses.',

    services: [
      '24/7 Paediatric Emergency & Urgent Care',
      'Newborn & Infant Hearing Screenings (Audiology)',
      'Paediatric Ophthalmology & Vision Checks',
      'Specialist Complex Immunisation Clinic (for allergies/premature infants)',
      'Inpatient Paediatric Care'
    ],

    vaccinationCalendar: [
      { day: 'Wednesday', hours: '13:30 - 16:30', mode: 'Specialist allergy / complex schedule vaccination clinic (by appointment)' }
    ],

    doctorsByTopic: [
      {
        name: 'Dr. Timothy Crawford, FRCPCH',
        topic: 'Head of Paediatric Emergency Medicine',
        schedule: '24/7 clinical rota lead',
        verified: true
      },
      {
        name: 'Dr. Lisa Patel, MSc, Aud',
        topic: 'Consultant Paediatric Audiologist (Hearing checks)',
        schedule: 'Monday to Friday',
        verified: true
      }
    ],

    accessibility: [
      '24-hour step-free entry directly into dedicated children’s waiting hall',
      'Emergency accessible bays immediately adjacent to triage entrance',
      'Sensory-friendly paediatric cubicles with noise-reduction walls',
      'Overnight family room with accessible shower facilities'
    ],

    facilities: [
      'Child-specific waiting atrium with fish aquarium and calm projection wall',
      'Parent kitchen with microwave, kettle and bottle steriliser',
      'Free high-speed NHS Wi-Fi for families'
    ],

    languagesSpoken: ['English', 'Spanish', 'Turkish', 'Somali', 'Arabic', '24/7 Telephone Interpreters in 120+ languages'],

    firstVisitGuide: {
      whatToBring: [
        'Red Book or digital vaccination summary',
        'Current medications or infant paracetamol doses given',
        'Spare nappy and change of clothes'
      ],
      typicalWaitTime: 'Triaged within 15 minutes by a paediatric nurse based on clinical priority.',
      referralPolicy: 'No referral needed for emergency or urgent walk-in triage.'
    },

    referralPathways: 'Direct transfer links to University College Hospital (UCH) neonatal intensive care if required.',
    urgentCareNote: 'In any life-threatening situation (extreme breathing struggle, seizures, non-blanching rash), call 999 immediately.'
  },

  {
    id: 'prov-4',
    name: 'Oakwood Green Family Surgery & Baby Clinic',
    type: 'GP Practice & Primary Care Clinic',
    tagline: 'Friendly neighbourhood general practice with twice-weekly baby immunisation and postnatal check-up sessions.',
    distanceKm: 1.2,
    travelTimeMinutes: 15,
    travelSummary: '15 min walk or Bus 263. Free 1-hour parking behind the surgery.',
    address: '89 Green Lanes, London, N16 9BU',
    phone: '+44 20 8800 2415',
    email: 'reception.oakwood@nhs.net',
    bookingUrl: 'https://oakwoodgreensurgery.co.uk/baby-clinic',
    hasOnlineBooking: true,
    acceptsWalkIns: false,
    publicOrPrivate: 'NHS Primary Care Medical Practice',
    costNote: 'Free NHS GP and practice nurse services for all registered patients and temporary residents.',
    verificationStatus: 'provider-confirmed',
    verificationBadgeText: 'Verified by Practice Lead Nurse on 08 Sep 2026',
    verificationDate: '2026-09-08',
    isSavedToCareTeam: false,

    goodToKnow: 'Quiet, residential practice with dedicated Tuesday afternoon infant immunisation appointments where nurse spends 30 minutes answering parenting questions.',

    services: [
      'Childhood Routine Immunisation',
      '6-8 Week Mother & Baby Postnatal Check',
      'General Paediatric Consultations',
      'Eczema & Allergy Advice'
    ],

    vaccinationCalendar: [
      { day: 'Tuesday', hours: '13:00 - 17:00', mode: 'Baby Immunisations (Booked appointments, 30 min calm slots)' },
      { day: 'Friday', hours: '09:00 - 11:30', mode: 'Pre-school & booster clinics' }
    ],

    doctorsByTopic: [
      {
        name: 'Nurse Claire Robinson, RGN',
        topic: 'Lead Practice Nurse & Immunisation Specialist',
        schedule: 'Tuesdays, Wednesdays & Fridays',
        verified: true
      },
      {
        name: 'Dr. James Campbell, MRCGP',
        topic: 'General Practitioner & Infant Health Lead',
        schedule: 'Monday to Thursday',
        verified: true
      }
    ],

    accessibility: [
      'Permanent ramped entry with handrails',
      'Wide double entrance doors',
      'Baby-change station in ground floor unisex accessible WC',
      'Pram bay inside waiting area with visibility from seating'
    ],

    facilities: [
      'Calm, quiet waiting room with natural daylight and plant wall',
      'Comfortable private corner for infant feeding with cushion support'
    ],

    languagesSpoken: ['English', 'Greek', 'Turkish', 'Italian'],

    firstVisitGuide: {
      whatToBring: [
        'Red book / Immunisation record',
        'Baby blanket'
      ],
      typicalWaitTime: 'Approx 5–10 minutes on booked clinic afternoons.',
      referralPolicy: 'Appointments available for registered or temporary resident families.'
    },

    referralPathways: 'Refers to Islington Community Paediatrics and Whittington Child Health.',
    urgentCareNote: 'Call practice number for same-day urgent paediatric slots before 10:30am.'
  },

  {
    id: 'prov-5',
    name: 'Sunrise Community Early Years & Anganwadi Support Hub',
    type: 'Community Charity & Family Support Centre',
    tagline: 'Community-led family centre offering peer support, nutrition advice, health visitor pop-ups, and quiet sensory play.',
    distanceKm: 1.7,
    travelTimeMinutes: 20,
    travelSummary: '20 min walk or Bus 393. Accessible park adjacent.',
    address: '12 Seven Sisters Road, London, N7 6AG',
    phone: '+44 20 7607 1920',
    email: 'hello@sunriseparents.org',
    bookingUrl: 'https://sunriseparents.org/drop-in',
    hasOnlineBooking: false,
    acceptsWalkIns: true,
    publicOrPrivate: 'Voluntary Sector / Registered Charity',
    costNote: 'All services, groups and hot beverages are 100% free; funded by local community partnership.',
    verificationStatus: 'provider-submitted',
    verificationBadgeText: 'Provider-submitted listing on 10 Oct 2026 (Clinical review in progress)',
    verificationDate: '2026-10-10',
    isSavedToCareTeam: false,

    goodToKnow: 'Welcoming non-clinical haven for new parents, grandparents, and foster carers. Weekly health visitor drop-in clinic and calm breastfeeding circle.',

    services: [
      'Health Visitor Weighing & Chat (Every Wednesday)',
      'Postnatal Wellbeing & Peer Caregiver Groups',
      'Sensory Play for Babies with Additional Needs',
      'Nappy and Essentials Community Pantry'
    ],

    vaccinationCalendar: [
      { day: 'Monthly 1st Wednesday', hours: '10:00 - 13:00', mode: 'Mobile NHS Immunisation bus pop-up (walk-in for 0-5s)' }
    ],

    doctorsByTopic: [
      {
        name: 'Maria Santos',
        topic: 'Community Early Years Family Navigator',
        schedule: 'Monday to Friday',
        verified: false
      },
      {
        name: 'Chloe Bennett',
        topic: 'Perinatal Mental Health Peer Supporter',
        schedule: 'Wednesdays & Thursdays',
        verified: false
      }
    ],

    accessibility: [
      'Level entrance with wide automatic doors',
      'Zero-step threshold throughout the entire building',
      'Dedicated quiet sensory room with tactile fabric walls and soft lighting',
      'Gender-neutral accessible washrooms with adult changing bench'
    ],

    facilities: [
      'Tea & coffee kitchen with organic fruit for caregivers',
      'Large carpeted crawling zone with clean washable mats',
      'Pram indoor garage with charging for mobility scooters'
    ],

    languagesSpoken: ['English', 'Spanish', 'Portuguese', 'Somali', 'Arabic'],

    firstVisitGuide: {
      whatToBring: ['Just yourself and your little one! No papers or identification needed.'],
      typicalWaitTime: 'Drop-in anytime during opening hours (09:30 - 16:00).',
      referralPolicy: 'Open door for all families. No referral or registration required.'
    },

    referralPathways: 'Partners directly with local children’s centres, food banks, and NHS perinatal psychiatry teams.',
    urgentCareNote: 'Non-emergency community space. In medical emergencies call 999.'
  },

  {
    id: 'prov-6',
    name: 'Clissold Park Paediatric Audiology & Vision Screening Clinic',
    type: 'Specialist Screening Clinic',
    tagline: 'Dedicated clinic for infant hearing tests, vision tracking reviews, and auditory development assessments.',
    distanceKm: 4.1,
    travelTimeMinutes: 24,
    travelSummary: '24 min bus or car. On-site disabled parking bays.',
    address: '144 Church Street, Stoke Newington, London, N16 0UX',
    phone: '+44 20 8985 7711',
    email: 'audiology.clissold@nhs.net',
    bookingUrl: '',
    hasOnlineBooking: false,
    acceptsWalkIns: false,
    publicOrPrivate: 'NHS Specialist Service',
    costNote: 'NHS funded infant screening is completely free.',
    verificationStatus: 'unverified',
    verificationBadgeText: 'Listed from public directory. Details not yet directly re-verified. Please contact provider to confirm.',
    verificationDate: null,
    isSavedToCareTeam: false,

    goodToKnow: 'Specialist quiet soundproof testing suites. Recommended if you are concerned baby is not turning to sounds or startling.',

    services: [
      'Otoacoustic Emission (OAE) Hearing Screening',
      'Automated Auditory Brainstem Response (AABR)',
      'Paediatric Visual Tracking Check',
      'Speech Sound Perception Guidance'
    ],

    vaccinationCalendar: [
      { day: 'No vaccinations offered', hours: '', mode: 'Sensory screening only' }
    ],

    doctorsByTopic: [
      {
        name: 'Dr. Robert Blake, PhD, MAud',
        topic: 'Senior Paediatric Clinical Audiologist',
        schedule: 'Tuesday & Thursday clinics',
        verified: false
      }
    ],

    accessibility: [
      'Step-free ramp to front entrance',
      'Acoustically insulated testing chambers',
      'Pram parking in ground foyer'
    ],

    facilities: [
      'Baby changing unit in ground-floor WC',
      'Low stimulation waiting area'
    ],

    languagesSpoken: ['English', 'Hebrew', 'Yiddish', 'Turkish'],

    firstVisitGuide: {
      whatToBring: ['Appointment invitation letter', 'Red book', 'Baby feeding bottle or dummy (calm babies test best)'],
      typicalWaitTime: 'Scheduled appointment time honored within 10 minutes.',
      referralPolicy: 'Requires referral from GP, health visitor, or newborn hearing screening coordinator.'
    },

    referralPathways: 'Linked with Royal National ENT Hospital for advanced pediatric audiological medicine.',
    urgentCareNote: 'Routine diagnostic clinic only.'
  }
];
