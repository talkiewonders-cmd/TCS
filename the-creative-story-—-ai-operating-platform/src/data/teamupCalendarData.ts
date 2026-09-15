export interface TeamupSubCalendar {
  id: string;
  name: string;
  colorName: string;
  bgHex: string;
  borderHex: string;
  textHex: string;
  role: string;
  type: 'crew' | 'lead' | 'post' | 'freelance' | 'holiday';
  currentStatus: 'On Shoot' | 'Available' | 'In Studio' | 'Edit Suite' | 'Off / Holiday';
  upcomingAssignment?: string;
}

export const TEAMUP_CALENDAR_URL = 'https://teamup.com/ksuhgrg4qnkv3ho48j';
export const TEAMUP_KEY = 'ksuhgrg4qnkv3ho48j';

export const CREATIVE_STORY_SUBCALENDARS: TeamupSubCalendar[] = [
  {
    id: 'albin',
    name: 'Albin',
    colorName: 'Teal',
    bgHex: '#0298B3',
    borderHex: '#007E95',
    textHex: '#ffffff',
    role: 'Camera Operator / Drone Pilot',
    type: 'crew',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'SHT-26-401: Al Marmoom Desert B-Roll'
  },
  {
    id: 'ali',
    name: 'Ali',
    colorName: 'Slate Grey',
    bgHex: '#737373',
    borderHex: '#5A5A5A',
    textHex: '#ffffff',
    role: 'Lighting Technician & Electrician',
    type: 'crew',
    currentStatus: 'In Studio',
    upcomingAssignment: 'Studio A: Chalhoub Lighting Grid Prep'
  },
  {
    id: 'anas',
    name: 'Anas',
    colorName: 'Mint Green',
    bgHex: '#45B38E',
    borderHex: '#338E70',
    textHex: '#ffffff',
    role: 'Commercial Director & Storyboard Lead',
    type: 'lead',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'SHT-26-401: Emaar Principal Photography'
  },
  {
    id: 'ehsan',
    name: 'Ehsan',
    colorName: 'Dark Charcoal',
    bgHex: '#3E3E3E',
    borderHex: '#2A2A2A',
    textHex: '#ffffff',
    role: 'Production Manager & Logistics',
    type: 'lead',
    currentStatus: 'Available',
    upcomingAssignment: 'DFTC Desert Permit Clearance & Police Escort'
  },
  {
    id: 'faiyaj',
    name: 'Faiyaj',
    colorName: 'Yellow Green',
    bgHex: '#7BB33A',
    borderHex: '#608E2B',
    textHex: '#ffffff',
    role: 'Location Sound Recordist & Boom Op',
    type: 'crew',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'SHT-26-401: Multi-Track Sound Recording'
  },
  {
    id: 'fouad',
    name: 'Fouad',
    colorName: 'Rose Pink',
    bgHex: '#E65A88',
    borderHex: '#C7436E',
    textHex: '#ffffff',
    role: 'Motion Graphics Designer & 3D Artist',
    type: 'post',
    currentStatus: 'Edit Suite',
    upcomingAssignment: 'PRJ-26-081: Emaar CGI Billboard VFX'
  },
  {
    id: 'freelancer',
    name: 'Freelancer',
    colorName: 'Orchid Magenta',
    bgHex: '#C85AB3',
    borderHex: '#A84194',
    textHex: '#ffffff',
    role: 'External Roster / On-Demand Crew Pool',
    type: 'freelance',
    currentStatus: 'Available',
    upcomingAssignment: '2nd Unit Camera Assistant Roster'
  },
  {
    id: 'idris-dawa',
    name: 'Idris Dawa',
    colorName: 'Mustard Gold',
    bgHex: '#C8A33A',
    borderHex: '#A88527',
    textHex: '#ffffff',
    role: 'Gaffer & Head of Electrical',
    type: 'crew',
    currentStatus: 'In Studio',
    upcomingAssignment: 'Stage A: Astera Tubes Rigging & Generator Check'
  },
  {
    id: 'lafi',
    name: 'Lafi',
    colorName: 'Vibrant Orange',
    bgHex: '#E86A25',
    borderHex: '#C75317',
    textHex: '#ffffff',
    role: 'Cinematographer (DP) & Camera Tech',
    type: 'crew',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'SHT-26-402: DIFC Night Exterior Master Shots'
  },
  {
    id: 'lama',
    name: 'Lama',
    colorName: 'Warm Yellow',
    bgHex: '#E8B815',
    borderHex: '#C69B0C',
    textHex: '#18181b',
    role: 'Art Director & Stylist',
    type: 'crew',
    currentStatus: 'Available',
    upcomingAssignment: 'Chalhoub Group: Autumn Lookbook Wardrobe'
  },
  {
    id: 'lambo',
    name: 'Lambo',
    colorName: 'Steel Blue',
    bgHex: '#5A88B3',
    borderHex: '#416C94',
    textHex: '#ffffff',
    role: 'Senior Colorist & DIT Lead',
    type: 'post',
    currentStatus: 'Edit Suite',
    upcomingAssignment: 'DaVinci Resolve Grade: Emaar Burj Crown 4K'
  },
  {
    id: 'mica',
    name: 'Mica',
    colorName: 'Crimson Red',
    bgHex: '#C82525',
    borderHex: '#A21818',
    textHex: '#ffffff',
    role: 'Line Producer & On-Set Coordinator',
    type: 'lead',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'SHT-26-401: Set Call Times & Catering Logistics'
  },
  {
    id: 'mike',
    name: 'Mike',
    colorName: 'Forest Green',
    bgHex: '#3E6A5A',
    borderHex: '#2B5143',
    textHex: '#ffffff',
    role: 'DIT & Data Storage Supervisor',
    type: 'crew',
    currentStatus: 'In Studio',
    upcomingAssignment: 'LTO Tape Archive & NVMe RAID Ingest Station'
  },
  {
    id: 'public-holidays',
    name: 'Public Holidays',
    colorName: 'Coral Pink',
    bgHex: '#E86A6A',
    borderHex: '#C64F4F',
    textHex: '#ffffff',
    role: 'UAE Statutory Holidays & Studio Downtime',
    type: 'holiday',
    currentStatus: 'Off / Holiday',
    upcomingAssignment: 'UAE National Day & Commemoration Holidays'
  },
  {
    id: 'ronald',
    name: 'Ronald',
    colorName: 'Royal Blue',
    bgHex: '#456AE6',
    borderHex: '#2F50C6',
    textHex: '#ffffff',
    role: 'Licensed Drone Pilot & FPV Operator',
    type: 'crew',
    currentStatus: 'Available',
    upcomingAssignment: 'DCAA Flight Authorization: Al Marmoom Airspace'
  },
  {
    id: 'saif',
    name: 'Saif',
    colorName: 'Orchid Purple',
    bgHex: '#B34588',
    borderHex: '#93306D',
    textHex: '#ffffff',
    role: 'Executive Creative Director',
    type: 'lead',
    currentStatus: 'Available',
    upcomingAssignment: 'DTCM Tourism Campaign Treatment Review'
  },
  {
    id: 'shaban',
    name: 'Shaban',
    colorName: 'Warm Ochre Brown',
    bgHex: '#986A25',
    borderHex: '#7C5217',
    textHex: '#ffffff',
    role: 'Key Grip & Rigging Specialist',
    type: 'crew',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'Dolly Track & Heavy Crane Setup on Sand Dune'
  },
  {
    id: 'shan',
    name: 'Shan',
    colorName: 'Deep Navy Blue',
    bgHex: '#153EB3',
    borderHex: '#0D2B8A',
    textHex: '#ffffff',
    role: 'Lead Video Editor & Sound Designer',
    type: 'post',
    currentStatus: 'Edit Suite',
    upcomingAssignment: 'Rough Cut Assembly: SHT-26-401 Desert Day 1'
  },
  {
    id: 'varuna',
    name: 'Varuna',
    colorName: 'Deep Violet Purple',
    bgHex: '#5A2588',
    borderHex: '#431769',
    textHex: '#ffffff',
    role: 'Production Coordinator & Talent Booker',
    type: 'lead',
    currentStatus: 'Available',
    upcomingAssignment: 'Model Contracts & Talent Visa Clearances'
  },
  {
    id: 'waqar',
    name: 'Waqar',
    colorName: 'Sky Turquoise',
    bgHex: '#3EA3C8',
    borderHex: '#2983A5',
    textHex: '#ffffff',
    role: '2nd AC & Camera Assistant',
    type: 'crew',
    currentStatus: 'On Shoot',
    upcomingAssignment: 'Lens Prep: Cooke Anamorphic /i Full Frame'
  }
];

export interface TeamupEvent {
  id: string;
  title: string;
  subCalendarIds: string[]; // Supports multiple assigned sub-calendars (crew members)
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startTime?: string; // HH:MM (24h)
  endTime?: string; // HH:MM (24h)
  allDay: boolean;
  location?: string;
  description?: string;
  projectCode?: string;
  shootId?: string;
  status?: 'Confirmed' | 'Tentative' | 'Prep' | 'Wrap';
}

export const INITIAL_TEAMUP_EVENTS: TeamupEvent[] = [
  {
    id: 'evt-1',
    title: 'SHT-26-401: Emaar Al Marmoom Desert Commercial (Day 1)',
    subCalendarIds: ['albin', 'anas', 'faiyaj', 'mica', 'shaban', 'waqar', 'lafi'],
    startDate: '2026-09-14',
    endDate: '2026-09-14',
    startTime: '05:00',
    endTime: '18:00',
    allDay: false,
    location: 'Al Marmoom Desert Conservation Reserve, Dubai',
    description: '04:30 Crew call at Studio Hub. Golden hour sunrise tracking vehicle pass. ARRI Alexa Mini LF package with Cooke Anamorphic lenses.',
    projectCode: 'PRJ-26-081',
    shootId: 'sht-401',
    status: 'Confirmed'
  },
  {
    id: 'evt-2',
    title: 'Studio A: Chalhoub Perfume Lighting Grid Rigging',
    subCalendarIds: ['ali', 'idris-dawa'],
    startDate: '2026-09-14',
    endDate: '2026-09-14',
    startTime: '09:00',
    endTime: '17:00',
    allDay: false,
    location: 'Studio Stage A, Creative Story Hub, Al Quoz',
    description: 'Astera Titan tube overhead box rigging. Generator sync and DMX dimmer check for beauty lighting.',
    projectCode: 'PRJ-26-082',
    status: 'Confirmed'
  },
  {
    id: 'evt-3',
    title: 'Suite 1: Emaar Burj Crown 4K Color Grade & Mix',
    subCalendarIds: ['lambo', 'shan'],
    startDate: '2026-09-14',
    endDate: '2026-09-14',
    startTime: '10:00',
    endTime: '18:30',
    allDay: false,
    location: 'Post-Production Suite 1 & Sound Suite',
    description: 'HDR DaVinci Resolve color grading session with lead brand creative. Dolby Atmos dialogue mastering.',
    projectCode: 'PRJ-26-081',
    status: 'Confirmed'
  },
  {
    id: 'evt-4',
    title: 'SHT-26-401: Emaar Desert Shoot (Day 2 - Dune Action & Aerials)',
    subCalendarIds: ['albin', 'anas', 'faiyaj', 'mica', 'shaban', 'ronald', 'waqar'],
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    startTime: '06:00',
    endTime: '17:30',
    allDay: false,
    location: 'Al Marmoom Dune Area 4, Dubai',
    description: 'DCAA licensed drone flights with Ronald. High-speed desert dune buggy camera tracking. Second unit b-roll.',
    projectCode: 'PRJ-26-081',
    shootId: 'sht-401',
    status: 'Confirmed'
  },
  {
    id: 'evt-5',
    title: 'DTCM Tourism Campaign Treatment Review',
    subCalendarIds: ['saif', 'varuna', 'ehsan'],
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    startTime: '11:00',
    endTime: '14:30',
    allDay: false,
    location: 'Creative Story Main Boardroom & Hybrid Webex',
    description: 'Executive creative treatment pitch for Department of Economy and Tourism. Budgeting, talent options, and route permits.',
    projectCode: 'PRJ-26-084',
    status: 'Confirmed'
  },
  {
    id: 'evt-6',
    title: 'Wardrobe Fitting & Prop Styling: Chalhoub Autumn',
    subCalendarIds: ['lama'],
    startDate: '2026-09-15',
    endDate: '2026-09-15',
    startTime: '13:00',
    endTime: '18:00',
    allDay: false,
    location: 'Wardrobe & Art Department Room 2',
    description: 'Fitting 4 models with high-fashion autumn wardrobe. Jewelry security clearance and product staging.',
    projectCode: 'PRJ-26-082',
    status: 'Confirmed'
  },
  {
    id: 'evt-7',
    title: 'SHT-26-402: Chalhoub Luxury Autumn Campaign (Stage A)',
    subCalendarIds: ['lafi', 'ali', 'idris-dawa', 'lama', 'mica', 'waqar', 'freelancer'],
    startDate: '2026-09-16',
    endDate: '2026-09-16',
    startTime: '08:00',
    endTime: '19:00',
    allDay: false,
    location: 'Creative Story Studio Stage A, Al Quoz 1, Dubai',
    description: 'High-speed Phantom Flex 4K 1000fps perfume droplet captures. Precision turntable and robotic arm sync.',
    projectCode: 'PRJ-26-082',
    shootId: 'sht-402',
    status: 'Confirmed'
  },
  {
    id: 'evt-8',
    title: 'CGI Billboard 3D Simulations & Fluid Particle Render',
    subCalendarIds: ['fouad', 'shan'],
    startDate: '2026-09-16',
    endDate: '2026-09-16',
    startTime: '14:00',
    endTime: '19:30',
    allDay: false,
    location: 'VFX 3D Lab Suite',
    description: 'Houdini fluid dynamics render farm submission for Emaar LED anamorphic corner screen.',
    projectCode: 'PRJ-26-081',
    status: 'Confirmed'
  },
  {
    id: 'evt-9',
    title: 'SHT-26-403: DIFC Night & Twilight Architectural Shoot',
    subCalendarIds: ['albin', 'ronald', 'lafi', 'ehsan', 'shaban'],
    startDate: '2026-09-17',
    endDate: '2026-09-17',
    startTime: '16:00',
    endTime: '22:00',
    allDay: false,
    location: 'Gate Village & ICD Brookfield Place, DIFC',
    description: 'Low-light Sony FX9 motorized slider shots. Police security coordination for tripod setups in public walkways.',
    projectCode: 'PRJ-26-083',
    shootId: 'sht-403',
    status: 'Confirmed'
  },
  {
    id: 'evt-10',
    title: 'Talent Casting & Model Bookings for October Productions',
    subCalendarIds: ['varuna'],
    startDate: '2026-09-17',
    endDate: '2026-09-17',
    startTime: '10:00',
    endTime: '15:00',
    allDay: false,
    location: 'Production Management Office',
    description: 'Finalizing SAG-AFTRA and regional talent release forms, travel visas, and hotel logistics.',
    status: 'Confirmed'
  },
  {
    id: 'evt-11',
    title: 'Server RAID Ingest & LTO-9 Tape Cold Storage Archive',
    subCalendarIds: ['mike'],
    startDate: '2026-09-17',
    endDate: '2026-09-17',
    startTime: '09:00',
    endTime: '17:00',
    allDay: false,
    location: 'Creative Story Central Data Center',
    description: 'Verification of SHA-256 checksums on 48TB RAW desert footage. Dual LTO-9 physical tape backup.',
    status: 'Confirmed'
  },
  {
    id: 'evt-12',
    title: 'Emirates NBD Wealth Campaign: Final Director Cut Review',
    subCalendarIds: ['anas', 'shan', 'lambo'],
    startDate: '2026-09-18',
    endDate: '2026-09-18',
    startTime: '09:30',
    endTime: '15:00',
    allDay: false,
    location: 'Master Screening Theater & Color Suite',
    description: 'Client signoff on 60s TV commercial, 30s cutdown, and 9:16 social vertical assets.',
    projectCode: 'PRJ-26-085',
    status: 'Confirmed'
  },
  {
    id: 'evt-13',
    title: 'Camera Package Bench Test & Sensor Calibration',
    subCalendarIds: ['waqar', 'mike', 'freelancer'],
    startDate: '2026-09-18',
    endDate: '2026-09-18',
    startTime: '13:00',
    endTime: '18:00',
    allDay: false,
    location: 'Technical Equipment Room & Lens Projection Room',
    description: 'Full teardown, dust removal, sensor collimation test on Cooke lenses after desert shoot.',
    status: 'Confirmed'
  },
  {
    id: 'evt-14',
    title: 'Red Bull Kite-Surfing Action Promo Shoot',
    subCalendarIds: ['ronald', 'albin', 'faiyaj', 'shaban'],
    startDate: '2026-09-19',
    endDate: '2026-09-19',
    startTime: '06:30',
    endTime: '14:30',
    allDay: false,
    location: 'Kite Beach, Jumeirah 3, Dubai',
    description: 'FPV acrobatic drone tracking pro riders. High-speed waterproof 240fps cameras on support boat.',
    projectCode: 'PRJ-26-086',
    status: 'Confirmed'
  },
  {
    id: 'evt-15',
    title: 'Studio Stage A Grid Maintenance & Power Distribution Testing',
    subCalendarIds: ['ali', 'ehsan'],
    startDate: '2026-09-20',
    endDate: '2026-09-20',
    allDay: true,
    location: 'Studio Stage A & B',
    description: 'Scheduled semi-annual three-phase electrical inspection and safety certification.',
    status: 'Confirmed'
  },
  {
    id: 'evt-16',
    title: 'Public Holiday: UAE Statutory Observance & Studio Downtime',
    subCalendarIds: ['public-holidays'],
    startDate: '2026-09-23',
    endDate: '2026-09-23',
    allDay: true,
    location: 'All UAE Facilities',
    description: 'Official national holiday observance. Only emergency client ingest on-call.',
    status: 'Confirmed'
  }
];
