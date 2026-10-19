// Comprehensive Milestones Data based on clinical developmental frameworks (CDC/WHO/NHS)
// Written in supportive, reassuring, plain language. Never judgmental, never diagnostic.

export const MILESTONE_CATEGORIES = [
  { id: 'all', label: 'All Areas' },
  { id: 'moving', label: 'Moving & Physical Skills', icon: 'Activity' },
  { id: 'communication', label: 'Communication & Language', icon: 'MessageCircle' },
  { id: 'social', label: 'Social & Emotional', icon: 'Smile' },
  { id: 'thinking', label: 'Thinking & Learning', icon: 'Lightbulb' },
  { id: 'everyday', label: 'Everyday Skills (Feeding & Sleep)', icon: 'Moon' }
];

export const AGE_WINDOWS = [
  { id: '0-1m', label: '0–1 Month', ageInMonths: 1, rangeText: 'First weeks at home' },
  { id: '2-3m', label: '2–3 Months', ageInMonths: 3, rangeText: 'Around 2 to 3 months' },
  { id: '4-5m', label: '4–5 Months', ageInMonths: 5, rangeText: 'Around 4 to 5 months' },
  { id: '6-7m', label: '6–7 Months', ageInMonths: 7, rangeText: 'Around 6 to 7 months' },
  { id: '8-9m', label: '8–9 Months', ageInMonths: 9, rangeText: 'Around 8 to 9 months' },
  { id: '10-12m', label: '10–12 Months', ageInMonths: 12, rangeText: 'Around 10 to 12 months' },
  { id: '15-18m', label: '15–18 Months', ageInMonths: 18, rangeText: 'Around 15 to 18 months' },
  { id: '24m', label: '2 Years (24m)', ageInMonths: 24, rangeText: 'Around 2 years' },
  { id: '36m', label: '3 Years (36m)', ageInMonths: 36, rangeText: 'Around 3 years' }
];

export const INITIAL_MILESTONES = [
  // 0-1 Month
  {
    id: 'm-01-1',
    ageWindow: '0-1m',
    area: 'social',
    title: 'Calms to familiar voices and gentle touch',
    description: 'During quiet moments, your baby may pause crying or turn their gaze towards the sound of a parent or caregiver speaking softly.',
    timingNote: 'Newborns are adjusting to the world. Bonding happens in tiny, quiet steps every day.',
    tryTogether: 'Hold your baby close during quiet times, talk gently about your day, or hum softly. Skin-to-skin touch is very soothing.',
    whatItLooksLike: 'Baby relaxes their hands, slows down breathing, or blinks peacefully when spoken to in a warm, steady tone.',
    careFinderTopic: 'developmental assessment',
    defaultStatus: 'completed'
  },
  {
    id: 'm-01-2',
    ageWindow: '0-1m',
    area: 'moving',
    title: 'Moves both arms and legs when alert',
    description: 'While resting on their back, your baby makes smooth or slightly jerky movements with both arms and both legs.',
    timingNote: 'Early movements are guided by natural reflexes that gradually become smoother over time.',
    tryTogether: 'Give your baby open space on a firm, safe blanket for a few minutes of calm movement during wakeful windows.',
    whatItLooksLike: 'Kicking feet alternately and bringing hands up towards the chest or face.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'completed'
  },
  {
    id: 'm-01-3',
    ageWindow: '0-1m',
    area: 'communication',
    title: 'Startles to sudden loud sounds',
    description: 'Blinks, widens eyes, or opens arms when hearing an unexpected sudden noise like a door clicking or a dog barking nearby.',
    timingNote: 'Hearing tests are usually completed around birth; this natural reaction shows they are tuning into environmental sounds.',
    tryTogether: 'Use soft vocal tones, sing simple lullabies, and keep everyday background sounds natural so baby gets accustomed.',
    whatItLooksLike: 'A brief pause, a startled twitch, or widening of eyes when a loud plate clatters.',
    careFinderTopic: 'hearing and vision',
    defaultStatus: 'completed'
  },

  // 2-3 Months
  {
    id: 'm-02-1',
    ageWindow: '2-3m',
    area: 'social',
    title: 'Social smile in response to your face or voice',
    description: 'Around 2 to 3 months, many babies begin to smile back at familiar faces and follow a moving object with their eyes. Some babies get there earlier, some later.',
    timingNote: 'Smiling in response to you is one of the earliest conversational dialogues between baby and family.',
    tryTogether: 'Get close (about 8–12 inches), make playful animated expressions, smile warmly, and wait patiently for baby to respond.',
    whatItLooksLike: 'Baby looks directly at your eyes and lights up with a full mouth smile, sometimes wiggling hands with delight.',
    careFinderTopic: 'developmental assessment',
    defaultStatus: 'completed'
  },
  {
    id: 'm-02-2',
    ageWindow: '2-3m',
    area: 'moving',
    title: 'Lifts head and chest during supervised tummy time',
    description: 'When placed on their tummy while wide awake, baby pushes up slightly with their forearms and lifts their head to look around.',
    timingNote: 'Tummy time can start in short 1- to 2-minute bursts. Every baby has days where they prefer less time on their tummy.',
    tryTogether: 'Place a colourful board book or a baby-safe mirror right in front of them at eye level. Tummy time on a caregiver’s chest is wonderful too.',
    whatItLooksLike: 'Lifting the chin off the mat for 5–10 seconds, looking to the left and right.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'completed'
  },
  {
    id: 'm-02-3',
    ageWindow: '2-3m',
    area: 'communication',
    title: 'Makes pleasant cooing sounds (ooh, aah)',
    description: 'Begins to make vowel sounds other than crying when feeling content, rested, or interacting with you.',
    timingNote: 'Cooing is the foundation of spoken conversation. Baby is experimenting with vocal cords and breath control.',
    tryTogether: 'When your baby coos, repeat the exact sound back to them! Pause and leave a silence so they learn turn-taking.',
    whatItLooksLike: 'Soft melodic sounds like "ooooh", "aaah", "eeeh" while looking at you or a favourite mobile.',
    careFinderTopic: 'speech and language',
    defaultStatus: 'completed'
  },

  // 4-5 Months
  {
    id: 'm-04-1',
    ageWindow: '4-5m',
    area: 'moving',
    title: 'Rolls from tummy to back or back to side',
    description: 'Many children start rolling over between 4 and 6 months. Every child grows at their own pace, and some take a little longer.',
    timingNote: 'Some babies roll tummy-to-back first, others back-to-tummy. Both paths are completely natural.',
    tryTogether: 'Place an interesting rattle slightly out of reach on their side to encourage gentle twisting of the torso and hips.',
    whatItLooksLike: 'Shifting weight to one side, turning their head, and letting their hips follow until rolling onto their back.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'completed'
  },
  {
    id: 'm-04-2',
    ageWindow: '4-5m',
    area: 'thinking',
    title: 'Reaches out with both hands for a toy',
    description: 'Sees an interesting toy or teether and coordinates arms to reach forward, grab, and often bring it to their mouth.',
    timingNote: 'Mouth exploration is how infants learn textures, shapes, and boundaries at this age.',
    tryTogether: 'Hold a soft, lightweight rattle or silicone teether just within arm’s reach so they can practice grasping with both hands.',
    whatItLooksLike: 'Extending open fingers towards an object and bringing it smoothly towards their chest or lips.',
    careFinderTopic: 'occupational therapy',
    defaultStatus: 'completed'
  },
  {
    id: 'm-04-3',
    ageWindow: '4-5m',
    area: 'communication',
    title: 'Chuckles or laughs out loud',
    description: 'Responds with infectious giggles or chuckles to tickles, funny faces, or peek-a-boo games.',
    timingNote: 'Laughter is a delightful emotional milestone and shows your baby is anticipating fun moments.',
    tryTogether: 'Play gentle games like blowing raspberries on their tummy or covering your eyes with your hands and popping out.',
    whatItLooksLike: 'Open-mouthed chuckles, body wiggles, and smiling eyes when playful anticipation builds.',
    careFinderTopic: 'speech and language',
    defaultStatus: 'completed'
  },

  // 6-7 Months (Current age of demo child Leo - 7 months!)
  {
    id: 'm-06-1',
    ageWindow: '6-7m',
    area: 'moving',
    title: 'Sits with brief support or propping hands forward',
    description: 'When placed in a seated position on a mat, leans on hands like a little tripod or balances independently for several seconds.',
    timingNote: 'Core muscles strengthen steadily. Sitting helps baby view the world from an exciting new vertical perspective.',
    tryTogether: 'Sit behind your baby on the floor with your legs forming an open circle to offer a safe boundary while they play with blocks.',
    whatItLooksLike: 'Sits up with hands touching the floor between knees for balance, looking around without toppling over immediately.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'completed'
  },
  {
    id: 'm-06-2',
    ageWindow: '6-7m',
    area: 'communication',
    title: 'Strings consonant sounds together (babbling "ba-ba", "ma-ma")',
    description: 'Practices sound combinations that sound like syllables. It is not yet tied to specific words, but sounds like lively storytelling.',
    timingNote: 'Babbling varies widely—some babies are vocal observers, while others babble non-stop while playing.',
    tryTogether: 'Chat back in real words! If baby says "ba-ba", you can say: "Yes, that is your blue ball! Look at the ball bounce."',
    whatItLooksLike: 'Rhythmic repetition of sounds like "da-da-da", "ba-ba", "ga-ga" during play or feeding.',
    careFinderTopic: 'speech and language',
    defaultStatus: 'completed'
  },
  {
    id: 'm-06-3',
    ageWindow: '6-7m',
    area: 'thinking',
    title: 'Passes a small toy smoothly from one hand to the other',
    description: 'Transfers an object from the right hand to the left hand without dropping it on the floor.',
    timingNote: 'This shows communication between both hemispheres of the brain and developing finger dexterity.',
    tryTogether: 'Offer a smooth wooden ring or small measuring cup. Once baby holds it, offer a second object to encourage transferring.',
    whatItLooksLike: 'Holding a ring in the left hand, reaching across with the right, and letting go with the left.',
    careFinderTopic: 'occupational therapy',
    defaultStatus: 'completed'
  },
  {
    id: 'm-06-4',
    ageWindow: '6-7m',
    area: 'everyday',
    title: 'Beginning exploration of first solid foods or purees',
    description: 'Shows curiosity at meal times, opens mouth for a spoon or grasps soft finger foods, moving food towards the back of the mouth.',
    timingNote: 'At this stage, food is primarily for learning textures, tastes, and chewing mechanics. Milk continues to provide main nutrition.',
    tryTogether: 'Sit baby at the family table during mealtimes. Offer steamed soft carrot sticks or sweet potato to touch and smell.',
    whatItLooksLike: 'Smacking lips, exploring textures with fingers, and swallowing small bites without pushing everything out with tongue.',
    careFinderTopic: 'developmental assessment',
    defaultStatus: 'completed'
  },

  // 8-9 Months
  {
    id: 'm-08-1',
    ageWindow: '8-9m',
    area: 'moving',
    title: 'Gets into a sitting position without assistance',
    description: 'Transitions from lying down or being on their tummy into a steady seated position on their own.',
    timingNote: 'Coordination between back, tummy, and arm strength develops gradually. Some babies roll to side first before pushing up.',
    tryTogether: 'Place engaging toys slightly to the side on a low cushion so baby has a reason to twist, push up, and sit.',
    whatItLooksLike: 'From hands and knees, pushing back on hands and swinging legs around to sit upright.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'not_yet' // Example of an open item that can be gentle
  },
  {
    id: 'm-08-2',
    ageWindow: '8-9m',
    area: 'communication',
    title: 'Responds when their name is called',
    description: 'Turns head, pauses their play, or looks up when a caregiver says their name across the room.',
    timingNote: 'If baby is deeply engaged in a toy, they may sometimes tune out. Look for response during calm moments.',
    tryTogether: 'Call their name gently from behind or the side before entering their field of view with a cheerful smile.',
    whatItLooksLike: 'Pausing whatever they are holding and swiveling head towards the sound of their name.',
    careFinderTopic: 'hearing and vision',
    defaultStatus: 'unsure'
  },
  {
    id: 'm-08-3',
    ageWindow: '8-9m',
    area: 'social',
    title: 'Shows signs of clinginess or stranger awareness',
    description: 'May be hesitant around unfamiliar people or cling closely to trusted caregivers when someone new approaches.',
    timingNote: 'Stranger awareness is a healthy sign of strong, secure attachment to primary caregivers.',
    tryTogether: 'Give your baby time to warm up to new visitors from the safety of your arms. Let visitors speak softly from a gentle distance first.',
    whatItLooksLike: 'Burying head in your shoulder or watching visitors cautiously before offering a smile.',
    careFinderTopic: 'developmental assessment',
    defaultStatus: 'completed'
  },
  {
    id: 'm-08-4',
    ageWindow: '8-9m',
    area: 'thinking',
    title: 'Looks for an object that dropped out of sight',
    description: 'Understands object permanence: when a toy falls from the high chair or is hidden under a light blanket, baby looks down for it.',
    timingNote: 'Learning that things still exist even when hidden is a key milestone in spatial thinking.',
    tryTogether: 'Hide a favourite squeaky toy under a light muslin cloth with just a corner peeking out and say: "Where did bunny go?"',
    whatItLooksLike: 'Leaning over the tray to watch where a spoon clattered or pulling the muslin cloth away.',
    careFinderTopic: 'occupational therapy',
    defaultStatus: 'completed'
  },

  // 10-12 Months
  {
    id: 'm-10-1',
    ageWindow: '10-12m',
    area: 'moving',
    title: 'Pulls up to stand and cruises along furniture',
    description: 'Uses sturdy chairs, sofas, or coffee tables to pull themselves up into a standing position and takes side steps holding on.',
    timingNote: 'Cruising builds foot, ankle, and hip stability for walking. Some babies cruise for months before independent steps.',
    tryTogether: 'Place a fun toy at the far end of the sofa so baby has an enticing incentive to take sideways steps along the cushions.',
    whatItLooksLike: 'Firmly gripping furniture with both hands, stepping sideways while keeping their weight balanced.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'not_yet'
  },
  {
    id: 'm-10-2',
    ageWindow: '10-12m',
    area: 'communication',
    title: 'Waves "bye-bye" or shakes head "no"',
    description: 'Uses meaningful gestures to communicate wants or social greetings alongside or before spoken words.',
    timingNote: 'Gestures bridge the gap between understanding and speech, making it easier for toddlers to express feelings.',
    tryTogether: 'Wave your hand whenever family members leave or arrive, and gently nod or shake your head when offering choices.',
    whatItLooksLike: 'Raising an open palm and opening/closing fingers when someone says goodbye.',
    careFinderTopic: 'speech and language',
    defaultStatus: 'not_yet'
  },
  {
    id: 'm-10-3',
    ageWindow: '10-12m',
    area: 'thinking',
    title: 'Uses pincer grasp (thumb and forefinger) to pick up small pieces',
    description: 'Picks up small pieces of food like peas, puffs, or soft berries between the tips of the index finger and thumb.',
    timingNote: 'Transitions from raking with the whole palm to precise finger control.',
    tryTogether: 'Scatter soft steamed peas or cereal puffs across a clean high-chair tray during snack time.',
    whatItLooksLike: 'Neatly pinching a single blueberry without squishing it in the palm.',
    careFinderTopic: 'occupational therapy',
    defaultStatus: 'not_yet'
  },

  // 15-18 Months
  {
    id: 'm-15-1',
    ageWindow: '15-18m',
    area: 'moving',
    title: 'Walks independently with growing balance',
    description: 'Takes steps across a room without holding onto furniture or adult hands, may carry a small toy while walking.',
    timingNote: 'Walking age varies normally from 9 to 18 months. Barefoot play on natural textures supports arch development.',
    tryTogether: 'Clear a flat walking path, kneel a few feet away with open arms and encouraging praise.',
    whatItLooksLike: 'Waddling forward with feet slightly wide, arms up for balance, smiling as they reach you.',
    careFinderTopic: 'physiotherapy',
    defaultStatus: 'not_yet'
  },
  {
    id: 'm-15-2',
    ageWindow: '15-18m',
    area: 'communication',
    title: 'Says 3 or more single words meaningfully',
    description: 'Uses words like "mama", "dada", "ball", "more", or "dog" to refer to specific people, objects, or needs.',
    timingNote: 'Pronunciation may not be clear to outsiders; word approximations that are used consistently count!',
    tryTogether: 'Name everyday objects as you interact with them: "Here is your cup. Let’s drink some water."',
    whatItLooksLike: 'Pointing at a family pet and saying "cat" or "gog" consistently.',
    careFinderTopic: 'speech and language',
    defaultStatus: 'not_yet'
  },

  // 24 Months (2 Years)
  {
    id: 'm-24-1',
    ageWindow: '24m',
    area: 'communication',
    title: 'Puts two words together (e.g. "more milk", "big truck")',
    description: 'Combines two words to express thoughts, ask questions, or describe things they see around them.',
    timingNote: 'Two-word phrases show that grammar and conceptual thinking are taking root.',
    tryTogether: 'Expand on what your toddler says. If they say "truck", reply: "Yes! A big green truck is driving fast!"',
    whatItLooksLike: 'Phrases like "bye-bye daddy", "want ball", "my shoes".',
    careFinderTopic: 'speech and language',
    defaultStatus: 'not_yet'
  },
  {
    id: 'm-24-2',
    ageWindow: '24m',
    area: 'social',
    title: 'Notices and plays alongside other children (parallel play)',
    description: 'Enjoys playing near other toddlers, watching what they are doing, and occasionally copying their actions.',
    timingNote: 'True cooperative sharing comes later; playing comfortably alongside peers is the first step in childhood friendship.',
    tryTogether: 'Arrange relaxed playdates or visit local parks and story hours where children have space to explore similar toys.',
    whatItLooksLike: 'Digging in the sand next to another child and watching how they fill their bucket.',
    careFinderTopic: 'developmental assessment',
    defaultStatus: 'not_yet'
  }
];

export const CLINICAL_RED_FLAGS = [
  {
    id: 'rf-1',
    title: 'Loss of previously gained speech, babbling or social skills',
    guidance: 'If your child has stopped doing things they used to do consistently (such as making eye contact, smiling, or using words they once had), it is always recommended to have a calm check-in with your paediatrician or health visitor.',
    urgencyLevel: 'prompt-appointment'
  },
  {
    id: 'rf-2',
    title: 'Does not respond to loud sounds or visual tracking by 3 months',
    guidance: 'Healthy sensory processing is essential for speech and motor progress. A simple hearing or vision assessment by an audiologist or paediatric clinic gives clear clarity.',
    urgencyLevel: 'prompt-appointment'
  },
  {
    id: 'rf-3',
    title: 'Noticeable difference in movement between left and right sides of body',
    guidance: 'Babies generally use both hands and feet equally during their first year. If one side seems consistently stiff, limp, or favoured, a paediatric physiotherapist can offer gentle support.',
    urgencyLevel: 'prompt-appointment'
  }
];
