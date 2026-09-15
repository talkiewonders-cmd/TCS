import { 
  User, 
  Client, 
  Opportunity, 
  Project, 
  Shoot, 
  Booking, 
  EquipmentResource, 
  RoleKPIScorecard, 
  SystemAlert, 
  AuditLog 
} from '../types/operatingPlatform';

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Tariq Al Mansoor',
    email: 'tariq@thecreativestory.ae',
    role: 'founder',
    roleTitle: 'Managing Director & Founder',
    department: 'Executive',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    phone: '+971 50 123 4567',
    dailyCostRateAED: 3800,
    hourlyCostRateAED: 475,
    skills: ['Executive Direction', 'High-Stakes Client Pitches', 'Strategic Financing', 'Creative Leadership'],
    capacityDaysPerMonth: 22,
    activeStatus: 'Available',
    kpiScore: 94,
  },
  {
    id: 'usr-2',
    name: 'Nadia Cherif',
    email: 'nadia.c@thecreativestory.ae',
    role: 'bd',
    roleTitle: 'Head of Commercial & BD Lead',
    department: 'Business Development',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    phone: '+971 50 987 6543',
    dailyCostRateAED: 2400,
    hourlyCostRateAED: 300,
    skills: ['Enterprise Pitching', 'Contract Negotiation', 'Relationship Management', 'Brand Strategy'],
    capacityDaysPerMonth: 22,
    activeStatus: 'Available',
    kpiScore: 92,
  },
  {
    id: 'usr-3',
    name: 'Liam Henderson',
    email: 'liam.h@thecreativestory.ae',
    role: 'bd',
    roleTitle: 'Senior Account Manager',
    department: 'Business Development',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    phone: '+971 55 345 6789',
    dailyCostRateAED: 1800,
    hourlyCostRateAED: 225,
    skills: ['Account Growth', 'Proposal Writing', 'Client Retention', 'Upselling'],
    capacityDaysPerMonth: 22,
    activeStatus: 'Available',
    kpiScore: 86,
  },
  {
    id: 'usr-4',
    name: 'Maya Rayyan',
    email: 'maya.r@thecreativestory.ae',
    role: 'producer',
    roleTitle: 'Senior Line Producer',
    department: 'Production',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    phone: '+971 52 456 7890',
    dailyCostRateAED: 2200,
    hourlyCostRateAED: 275,
    skills: ['Budget Control', 'Location Scouting & Permits', 'Crew Management', 'On-Set Logistics'],
    capacityDaysPerMonth: 22,
    activeStatus: 'On Shoot',
    kpiScore: 95,
  },
  {
    id: 'usr-5',
    name: 'Zayn Al-Husseini',
    email: 'zayn.h@thecreativestory.ae',
    role: 'producer',
    roleTitle: 'Executive Producer',
    department: 'Production',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    phone: '+971 54 876 5432',
    dailyCostRateAED: 2600,
    hourlyCostRateAED: 325,
    skills: ['Margin Protection', 'High-Risk Production', 'International Shoots', 'Supplier Vetting'],
    capacityDaysPerMonth: 22,
    activeStatus: 'Available',
    kpiScore: 89,
  },
  {
    id: 'usr-6',
    name: 'Karim Farouk',
    email: 'karim.f@thecreativestory.ae',
    role: 'finance',
    roleTitle: 'Financial Controller & Ops',
    department: 'Finance',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    phone: '+971 50 678 1234',
    dailyCostRateAED: 2100,
    hourlyCostRateAED: 260,
    skills: ['WIP Accounting', 'Aged Debt Collections', 'Cash Flow Modeling', 'Direct Cost Auditing'],
    capacityDaysPerMonth: 22,
    activeStatus: 'Available',
    kpiScore: 91,
  },
  {
    id: 'usr-7',
    name: 'Sofia Rossi',
    email: 'sofia.r@thecreativestory.ae',
    role: 'creative',
    roleTitle: 'Director of Photography (DP)',
    department: 'Camera & Tech',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    phone: '+971 56 234 5678',
    dailyCostRateAED: 3200,
    hourlyCostRateAED: 400,
    skills: ['Arri Mini LF', 'Anamorphic Optics', 'Desert Lighting', 'High-Speed Phantom'],
    capacityDaysPerMonth: 20,
    activeStatus: 'On Shoot',
    kpiScore: 96,
  },
  {
    id: 'usr-8',
    name: 'Alex Chen',
    email: 'alex.c@thecreativestory.ae',
    role: 'creative',
    roleTitle: 'Lead Creative Editor & Colorist',
    department: 'Post-Production',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    phone: '+971 52 789 0123',
    dailyCostRateAED: 2000,
    hourlyCostRateAED: 250,
    skills: ['DaVinci Resolve Studio', 'Premiere Pro', 'Audio Mastering', 'Fast Turnaround Cutdowns'],
    capacityDaysPerMonth: 22,
    activeStatus: 'Booked',
    kpiScore: 93,
  },
  {
    id: 'usr-9',
    name: 'Bilal Qureshi',
    email: 'bilal.q@thecreativestory.ae',
    role: 'creative',
    roleTitle: 'Gaffer & Head of Lighting',
    department: 'Lighting & Grip',
    employmentType: 'employee',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    phone: '+971 55 890 1234',
    dailyCostRateAED: 2200,
    hourlyCostRateAED: 275,
    skills: ['Astera Wireless Grids', 'Aputure High-Wattage', 'Generator Management', 'Night Exteriors'],
    capacityDaysPerMonth: 20,
    activeStatus: 'Booked',
    kpiScore: 94,
  },
  {
    id: 'usr-10',
    name: 'Elena Rostova',
    email: 'elena.focus@freelancecrew.ae',
    role: 'freelancer',
    roleTitle: 'Focus Puller / 1st AC (Freelance)',
    department: 'Camera & Tech',
    employmentType: 'freelancer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    phone: '+971 50 333 4455',
    dailyCostRateAED: 1900,
    hourlyCostRateAED: 240,
    skills: ['Preston FI+Z', 'Wireless Video Transmission', 'Lens Calibration', 'Extreme Climate Gear Care'],
    capacityDaysPerMonth: 15,
    activeStatus: 'Available',
    kpiScore: 90,
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    code: 'CLI-EMAAR',
    name: 'Emaar Hospitality & Downtown Dubai',
    industry: 'Real Estate & Luxury Hospitality',
    tier: 'Enterprise',
    primaryContact: 'Rashid Al Nuaimi',
    email: 'rnuaimi@emaar.ae',
    phone: '+971 4 367 3333',
    location: 'Downtown Dubai, UAE',
    relationshipOwnerId: 'usr-2',
    relationshipOwnerName: 'Nadia Cherif',
    totalWonRevenueAED: 890000,
    totalGrossProfitAED: 391600,
    averageMarginPercent: 44.0,
    activeProjectsCount: 1,
    totalProjectsCount: 5,
    contacts: [
      { name: 'Rashid Al Nuaimi', role: 'VP Brand Marketing', email: 'rnuaimi@emaar.ae', phone: '+971 50 111 2233', isPrimary: true },
      { name: 'Chloe Dubois', role: 'Head of Content Creation', email: 'cdubois@emaar.ae', phone: '+971 52 222 3344', isPrimary: false }
    ],
    pastScopes: ['Address Hotel Global Rebrand', 'Burj Khalifa NYE Drone Spectacular', 'Dubai Mall Fashion Avenue Season'],
    notes: 'Premium client with strict SLA. Prefers Sofia Rossi on camera. Net 30 payment terms, highly reliable payer.',
    riskRating: 'Low',
    aiSummary: 'Tier 1 pillar account. Commercial health is exceptional with 44% gross margin on AED 890k closed. Currently in late negotiation for Burj Crown AED 420k campaign.'
  },
  {
    id: 'cli-2',
    code: 'CLI-DTCM',
    name: 'Dubai Tourism & Culture Authority (DTCM)',
    industry: 'Government & Destination Marketing',
    tier: 'Enterprise',
    primaryContact: 'Mariam Al Falasi',
    email: 'm.alfalasi@dubaitourism.gov.ae',
    phone: '+971 4 201 0000',
    location: 'One Central, Dubai',
    relationshipOwnerId: 'usr-2',
    relationshipOwnerName: 'Nadia Cherif',
    totalWonRevenueAED: 1240000,
    totalGrossProfitAED: 508400,
    averageMarginPercent: 41.0,
    activeProjectsCount: 1,
    totalProjectsCount: 6,
    contacts: [
      { name: 'Mariam Al Falasi', role: 'Director of Global Campaigns', email: 'm.alfalasi@dubaitourism.gov.ae', phone: '+971 50 444 5566', isPrimary: true }
    ],
    pastScopes: ['Dubai Summer Surprises Key Visuals', 'Heritage Trail Series 2025', 'Expo City Innovation Reel'],
    notes: 'Requires government film permits (Dubai Film & TV Commission). High artistic expectations, multiple stakeholder approvals.',
    riskRating: 'Low',
    aiSummary: 'Long-standing relationship anchor. Project TCS-26-081 (Desert Echoes, AED 380k) is currently in active shoots with 39.5% forecast margin.'
  },
  {
    id: 'cli-3',
    code: 'CLI-EK',
    name: 'Emirates Airline & Aviation Services',
    industry: 'Aviation & Luxury Travel',
    tier: 'Enterprise',
    primaryContact: 'Marcus Vance',
    email: 'marcus.vance@emirates.com',
    phone: '+971 4 708 1111',
    location: 'Emirates Group HQ, Dubai',
    relationshipOwnerId: 'usr-3',
    relationshipOwnerName: 'Liam Henderson',
    totalWonRevenueAED: 650000,
    totalGrossProfitAED: 299000,
    averageMarginPercent: 46.0,
    activeProjectsCount: 0,
    totalProjectsCount: 3,
    contacts: [
      { name: 'Marcus Vance', role: 'Brand Experience Producer', email: 'marcus.vance@emirates.com', phone: '+971 50 777 8899', isPrimary: true }
    ],
    pastScopes: ['A380 First Class Sanctuary Film', 'Skywards World Heritage Vignettes'],
    notes: 'Large deal size (AED 550k proposal pending). Airside access passes require 14 days clearance.',
    riskRating: 'Low',
    aiSummary: 'High margin client (46%). Large pending RFP for First Class Experience documentary (AED 550k) at 75% probability.'
  },
  {
    id: 'cli-4',
    code: 'CLI-CHAL',
    name: 'Chalhoub Luxury Brands Group',
    industry: 'High Fashion & Luxury Retail',
    tier: 'Tier 1',
    primaryContact: 'Camille Lemaire',
    email: 'clemaire@chalhoub.com',
    phone: '+971 4 807 7000',
    location: 'Dubai Design District (d3)',
    relationshipOwnerId: 'usr-3',
    relationshipOwnerName: 'Liam Henderson',
    totalWonRevenueAED: 420000,
    totalGrossProfitAED: 159600,
    averageMarginPercent: 38.0,
    activeProjectsCount: 1,
    totalProjectsCount: 4,
    contacts: [
      { name: 'Camille Lemaire', role: 'Regional Creative Director', email: 'clemaire@chalhoub.com', phone: '+971 55 999 1122', isPrimary: true }
    ],
    pastScopes: ['Tanagra Haute Horlogerie Series', 'd3 Fashion Week Highlight Reels'],
    notes: 'WARNING: TCS-26-086 is trending at 33.8% forecast margin due to high talent fees. Opportunity OPP-103 has been stale for 11 days with no next action logged.',
    riskRating: 'Medium',
    aiSummary: 'Margin compression alert: Latest project forecast at 33.8% vs 40% target. Opportunity Sephora Regional Launch (AED 210k) is stale (11 days inactive).'
  },
  {
    id: 'cli-5',
    code: 'CLI-CARM',
    name: 'Careem Technologies (Uber Group)',
    industry: 'Consumer Tech & Mobility',
    tier: 'Growth',
    primaryContact: 'Omar Taji',
    email: 'omar.taji@careem.com',
    phone: '+971 4 456 0000',
    location: 'Dubai Media City',
    relationshipOwnerId: 'usr-2',
    relationshipOwnerName: 'Nadia Cherif',
    totalWonRevenueAED: 290000,
    totalGrossProfitAED: 142100,
    averageMarginPercent: 49.0,
    activeProjectsCount: 1,
    totalProjectsCount: 2,
    contacts: [
      { name: 'Omar Taji', role: 'Head of Growth Marketing', email: 'omar.taji@careem.com', phone: '+971 52 888 9900', isPrimary: true }
    ],
    pastScopes: ['Careem Box Express Launch', 'SuperApp Everyday Campaign'],
    notes: 'Fast approvals, digital-first social delivery. Very high gross margin (49%).',
    riskRating: 'Low',
    aiSummary: 'Extremely efficient account. Quick turnarounds, modern deliverables, highest gross margin in portfolio.'
  },
  {
    id: 'cli-6',
    code: 'CLI-REDB',
    name: 'Red Bull Middle East FZ-LLC',
    industry: 'Sports & Entertainment Media',
    tier: 'Growth',
    primaryContact: 'Sven Lindqvist',
    email: 'sven.lindqvist@redbull.com',
    phone: '+971 4 390 1234',
    location: 'Dubai Studio City',
    relationshipOwnerId: 'usr-3',
    relationshipOwnerName: 'Liam Henderson',
    totalWonRevenueAED: 310000,
    totalGrossProfitAED: 120900,
    averageMarginPercent: 39.0,
    activeProjectsCount: 0,
    totalProjectsCount: 2,
    contacts: [
      { name: 'Sven Lindqvist', role: 'Communications & Field Producer', email: 'sven.lindqvist@redbull.com', phone: '+971 56 777 6655', isPrimary: true }
    ],
    pastScopes: ['Liwa Sand Dunes Drift Sprint', 'Dubai Skydive Aerial Film'],
    notes: 'Extreme sports requiring specialized drone pilots and stunt riggers.',
    riskRating: 'Medium',
    aiSummary: 'Active opportunity for Dune Drifter Visual Odyssey (AED 240k) in Brief Received stage.'
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'opp-101',
    code: 'OPP-101',
    title: 'Emaar Burj Crown Global Launch Film',
    clientId: 'cli-1',
    clientName: 'Emaar Hospitality & Downtown Dubai',
    primaryOwnerId: 'usr-2',
    primaryOwnerName: 'Nadia Cherif',
    contributors: [
      { userId: 'usr-2', userName: 'Nadia Cherif', splitPercentage: 70, attributedRevenueAED: 294000, attributedProfitAED: 129360 },
      { userId: 'usr-3', userName: 'Liam Henderson', splitPercentage: 30, attributedRevenueAED: 126000, attributedProfitAED: 55440 }
    ],
    source: 'Referral',
    scope: '60s cinematic brand commercial, 4x 15s social cutdowns, drone pass over Downtown Dubai, 4K HDR master, Arabic & English voiceovers.',
    estimatedValueAED: 420000,
    probabilityPercent: 85,
    weightedValueAED: 357000,
    stage: 'Negotiation',
    expectedCloseDate: '2026-09-28',
    lastActivityDate: '2026-09-13',
    nextActionDate: '2026-09-17',
    nextActionNote: 'Finalize payment milestone schedule with Emaar legal team before PO sign-off.',
    isStale: false,
    notes: 'Client accepted creative treatment. Awaiting final board PO approval.',
    currency: 'AED'
  },
  {
    id: 'opp-102',
    code: 'OPP-102',
    title: 'DTCM Desert Echoes Heritage Docu-Series',
    clientId: 'cli-2',
    clientName: 'Dubai Tourism & Culture Authority (DTCM)',
    primaryOwnerId: 'usr-2',
    primaryOwnerName: 'Nadia Cherif',
    contributors: [
      { userId: 'usr-2', userName: 'Nadia Cherif', splitPercentage: 100, attributedRevenueAED: 380000, attributedProfitAED: 150100 }
    ],
    source: 'Direct RFP',
    scope: '3-part mini documentary capturing UAE falconry, desert astronomy and heritage pearl diving. Cinema cameras, soundscapes, multi-lingual subtitles.',
    estimatedValueAED: 380000,
    probabilityPercent: 100,
    weightedValueAED: 380000,
    stage: 'Won',
    expectedCloseDate: '2026-09-02',
    lastActivityDate: '2026-09-02',
    nextActionDate: '2026-09-16',
    nextActionNote: 'Shoot Day 1 begins at Bab Al Shams desert camp.',
    actualWonValueAED: 380000,
    convertedProjectId: 'prj-081',
    isStale: false,
    notes: 'Won and seamlessly converted into live Project TCS-26-081.',
    currency: 'AED'
  },
  {
    id: 'opp-103',
    code: 'OPP-103',
    title: 'Chalhoub Sephora Regional Fragrance Launch',
    clientId: 'cli-4',
    clientName: 'Chalhoub Luxury Brands Group',
    primaryOwnerId: 'usr-3',
    primaryOwnerName: 'Liam Henderson',
    contributors: [
      { userId: 'usr-3', userName: 'Liam Henderson', splitPercentage: 100, attributedRevenueAED: 210000, attributedProfitAED: 79800 }
    ],
    source: 'Inbound Lead',
    scope: 'Luxury studio lighting, phantom slow-motion macro bottle shots, talent hands/face choreography, 9:16 reels for GCC influencer push.',
    estimatedValueAED: 210000,
    probabilityPercent: 60,
    weightedValueAED: 126000,
    stage: 'Proposal',
    expectedCloseDate: '2026-10-05',
    lastActivityDate: '2026-09-03', // 11 days inactive -> Stale!
    nextActionDate: '2026-09-08', // Passed!
    nextActionNote: 'Schedule creative review call with Camille Lemaire.',
    isStale: true,
    notes: 'ALERT: Opportunity has been inactive for 11 days with no follow-up logged. High risk of losing to competitors.',
    currency: 'AED'
  },
  {
    id: 'opp-104',
    code: 'OPP-104',
    title: 'Emirates First Class Sanctuary Doc',
    clientId: 'cli-3',
    clientName: 'Emirates Airline & Aviation Services',
    primaryOwnerId: 'usr-3',
    primaryOwnerName: 'Liam Henderson',
    contributors: [
      { userId: 'usr-3', userName: 'Liam Henderson', splitPercentage: 60, attributedRevenueAED: 330000, attributedProfitAED: 151800 },
      { userId: 'usr-2', userName: 'Nadia Cherif', splitPercentage: 40, attributedRevenueAED: 220000, attributedProfitAED: 101200 }
    ],
    source: 'Agency Partner',
    scope: '90s world-broadcast master, 4K cabin macro aesthetics, culinary caviar & wine sequences, multi-city delivery.',
    estimatedValueAED: 550000,
    probabilityPercent: 75,
    weightedValueAED: 412500,
    stage: 'Negotiation',
    expectedCloseDate: '2026-10-12',
    lastActivityDate: '2026-09-12',
    nextActionDate: '2026-09-18',
    nextActionNote: 'Present final location clearance and security protocol to Emirates Security Directorate.',
    isStale: false,
    notes: 'Massive Q4 opportunity. Producer Maya Rayyan assigned for preliminary budget vetting.',
    currency: 'AED'
  },
  {
    id: 'opp-105',
    code: 'OPP-105',
    title: 'Careem Plus SuperApp 2026 Anthem',
    clientId: 'cli-5',
    clientName: 'Careem Technologies (Uber Group)',
    primaryOwnerId: 'usr-2',
    primaryOwnerName: 'Nadia Cherif',
    contributors: [
      { userId: 'usr-2', userName: 'Nadia Cherif', splitPercentage: 100, attributedRevenueAED: 160000, attributedProfitAED: 78400 }
    ],
    source: 'Past Client Rehire',
    scope: 'Energetic mixed-media video with dynamic VFX 3D typography, live street scenes in Al Quoz, 6 bespoke social cutdowns.',
    estimatedValueAED: 160000,
    probabilityPercent: 100,
    weightedValueAED: 160000,
    stage: 'Won',
    expectedCloseDate: '2026-08-28',
    lastActivityDate: '2026-08-28',
    nextActionDate: '2026-09-22',
    nextActionNote: 'Final sound design and color grading sign-off.',
    actualWonValueAED: 160000,
    convertedProjectId: 'prj-084',
    isStale: false,
    notes: 'Converted to live Project TCS-26-084.',
    currency: 'AED'
  },
  {
    id: 'opp-106',
    code: 'OPP-106',
    title: 'Red Bull Dune Drifter Visual Odyssey',
    clientId: 'cli-6',
    clientName: 'Red Bull Middle East FZ-LLC',
    primaryOwnerId: 'usr-3',
    primaryOwnerName: 'Liam Henderson',
    contributors: [
      { userId: 'usr-3', userName: 'Liam Henderson', splitPercentage: 100, attributedRevenueAED: 240000, attributedProfitAED: 93600 }
    ],
    source: 'Direct RFP',
    scope: 'FPV race drone tracking 800HP rally raid buggy across Moreeb Dune. Cinema cameras mounted to chase helicopter.',
    estimatedValueAED: 240000,
    probabilityPercent: 40,
    weightedValueAED: 96000,
    stage: 'Brief Received',
    expectedCloseDate: '2026-10-20',
    lastActivityDate: '2026-09-11',
    nextActionDate: '2026-09-19',
    nextActionNote: 'Submit safety risk assessment and stunt permit quote.',
    isStale: false,
    notes: 'High production thrill factor. Equipment budget requires external helicopter gimbal mount.',
    currency: 'AED'
  },
  {
    id: 'opp-107',
    code: 'OPP-107',
    title: 'Alserkal Art Foundation Archive Retrospective',
    clientId: 'cli-1',
    clientName: 'Emaar Hospitality & Downtown Dubai',
    primaryOwnerId: 'usr-3',
    primaryOwnerName: 'Liam Henderson',
    contributors: [
      { userId: 'usr-3', userName: 'Liam Henderson', splitPercentage: 100, attributedRevenueAED: 95000, attributedProfitAED: 38000 }
    ],
    source: 'Inbound Lead',
    scope: 'Short format documentary interviewing 6 regional contemporary sculptors.',
    estimatedValueAED: 95000,
    probabilityPercent: 20,
    weightedValueAED: 19000,
    stage: 'On Hold',
    expectedCloseDate: '2026-11-15',
    lastActivityDate: '2026-08-20',
    nextActionDate: '2026-10-01',
    nextActionNote: 'Client paused funding until gallery curator approves schedule.',
    isStale: false,
    notes: 'On hold due to client internal committee reorganization.',
    currency: 'AED'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'prj-081',
    code: 'TCS-26-081',
    title: 'DTCM Desert Echoes Heritage Documentary',
    clientId: 'cli-2',
    clientName: 'Dubai Tourism & Culture Authority (DTCM)',
    opportunityId: 'opp-102',
    status: 'Active Shoots',
    serviceType: 'Documentary',
    contractValueAED: 380000,
    approvedVariationsAED: 15000,
    totalProjectRevenueAED: 395000,
    targetMarginPercent: 42.0,
    
    budgetCategories: [
      { id: 'b1', category: 'Pre-Production & Creative', allocatedBudgetAED: 35000, committedCostAED: 35000, actualCostAED: 32000, forecastToCompleteAED: 3000 },
      { id: 'b2', category: 'Director, DP & Crew', allocatedBudgetAED: 78000, committedCostAED: 78000, actualCostAED: 38000, forecastToCompleteAED: 40000 },
      { id: 'b3', category: 'Camera & Lighting Equipment', allocatedBudgetAED: 42000, committedCostAED: 42000, actualCostAED: 24000, forecastToCompleteAED: 18000 },
      { id: 'b4', category: 'Locations, Studio & Permits', allocatedBudgetAED: 28000, committedCostAED: 28000, actualCostAED: 26000, forecastToCompleteAED: 2000 },
      { id: 'b5', category: 'Talent, Styling & HMU', allocatedBudgetAED: 20000, committedCostAED: 20000, actualCostAED: 12000, forecastToCompleteAED: 8000 },
      { id: 'b6', category: 'Post-Production, Color & Sound', allocatedBudgetAED: 30000, committedCostAED: 15000, actualCostAED: 0, forecastToCompleteAED: 30000 },
      { id: 'b7', category: 'Travel, Transport & Catering', allocatedBudgetAED: 18000, committedCostAED: 18000, actualCostAED: 10000, forecastToCompleteAED: 8000 },
      { id: 'b8', category: 'Contingency & Insurance', allocatedBudgetAED: 12000, committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: 3000 }
    ],
    totalAllocatedBudgetAED: 263000,
    totalCommittedCostAED: 236000,
    totalActualCostAED: 142000,
    totalForecastCostAED: 239000,
    forecastGrossProfitAED: 156000,
    forecastGrossMarginPercent: 39.5,
    actualGrossProfitAED: 253000,
    actualGrossMarginPercent: 64.1,
    marginVariancePercent: -2.5, // 39.5% vs 42% target

    accountOwnerId: 'usr-2',
    accountOwnerName: 'Nadia Cherif',
    producerId: 'usr-4',
    producerName: 'Maya Rayyan',
    creativeDirectorId: 'usr-1',
    creativeDirectorName: 'Tariq Al Mansoor',
    leadEditorId: 'usr-8',
    leadEditorName: 'Alex Chen',

    startDate: '2026-09-04',
    shootStartDate: '2026-09-16',
    shootEndDate: '2026-09-18',
    deliveryDate: '2026-10-08',
    finalInvoiceDate: '2026-10-15',

    billingMilestones: [
      { id: 'bm-1', title: '50% Advance on Commissioning', amountAED: 190000, percentage: 50, dueDate: '2026-09-05', status: 'Collected', invoiceNumber: 'INV-2026-081-1', invoiceDate: '2026-09-05', paidDate: '2026-09-11' },
      { id: 'bm-2', title: '25% Upon First Rough Cut Delivery', amountAED: 95000, percentage: 25, dueDate: '2026-09-28', status: 'Pending' },
      { id: 'bm-3', title: '25% Final Master Delivery + Variation', amountAED: 110000, percentage: 25, dueDate: '2026-10-15', status: 'Pending' }
    ],

    deliverables: [
      { id: 'del-1', projectId: 'prj-081', title: 'Episode 1: The Sands of Time (Master)', format: '16:9 4K Master', duration: '12 mins', languagesAndSubtitles: ['Arabic Master', 'English Subs', 'Mandarin Subs'], status: 'Pre-Production', dueDate: '2026-10-06', versionCount: 1, aspectRatio: '16:9' },
      { id: 'del-2', projectId: 'prj-081', title: 'Episode 2: Keepers of the Skies', format: '16:9 4K Master', duration: '10 mins', languagesAndSubtitles: ['Arabic Master', 'English Subs'], status: 'Pre-Production', dueDate: '2026-10-08', versionCount: 1, aspectRatio: '16:9' },
      { id: 'del-3', projectId: 'prj-081', title: 'Social Cinema Trailer Suite (6 Cuts)', format: '9:16 Reel', duration: '30s / 15s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Pre-Production', dueDate: '2026-10-08', versionCount: 1, aspectRatio: '9:16' }
    ],

    documents: [
      { id: 'doc-1', title: 'DTCM Approved Creative Brief & Treatment', category: 'Brief', fileName: 'DTCM_DesertEchoes_Brief_V2.pdf', fileSize: '8.4 MB', uploadedAt: '2026-09-03', uploadedBy: 'Nadia Cherif' },
      { id: 'doc-2', title: 'Signed Commissioning Agreement & PO', category: 'Signed PO', fileName: 'DTCM_PO_98241_Signed.pdf', fileSize: '2.1 MB', uploadedAt: '2026-09-04', uploadedBy: 'Karim Farouk' },
      { id: 'doc-3', title: 'Dubai Film Commission Desert Permit', category: 'Location Permit', fileName: 'DFTC_Permit_Desert_2026_09.pdf', fileSize: '1.2 MB', uploadedAt: '2026-09-10', uploadedBy: 'Maya Rayyan' }
    ],

    decisionLog: [
      { id: 'dec-1', timestamp: '2026-09-04 10:30', author: 'Maya Rayyan', title: 'Camera Package Locked', details: 'Confirmed Arri Mini LF with Cooke Anamorphic /i Full Frame Plus lenses for desert flare aesthetic.', type: 'Creative Sign-off' },
      { id: 'dec-2', timestamp: '2026-09-12 14:15', author: 'Nadia Cherif', title: 'Approved Variation +AED 15,000', details: 'Client requested additional night drone cinematography in Al Fahidi historic district.', type: 'Scope Change' }
    ],
    shootCount: 2
  },
  {
    id: 'prj-084',
    code: 'TCS-26-084',
    title: 'Careem Plus SuperApp 2026 Campaign',
    clientId: 'cli-5',
    clientName: 'Careem Technologies (Uber Group)',
    opportunityId: 'opp-105',
    status: 'Post-Production',
    serviceType: 'Commercial Campaign',
    contractValueAED: 160000,
    approvedVariationsAED: 0,
    totalProjectRevenueAED: 160000,
    targetMarginPercent: 45.0,
    
    budgetCategories: [
      { id: 'b21', category: 'Pre-Production & Creative', allocatedBudgetAED: 18000, committedCostAED: 18000, actualCostAED: 16500, forecastToCompleteAED: 0 },
      { id: 'b22', category: 'Director, DP & Crew', allocatedBudgetAED: 36000, committedCostAED: 36000, actualCostAED: 34000, forecastToCompleteAED: 0 },
      { id: 'b23', category: 'Camera & Lighting Equipment', allocatedBudgetAED: 16000, committedCostAED: 16000, actualCostAED: 15500, forecastToCompleteAED: 0 },
      { id: 'b24', category: 'Locations, Studio & Permits', allocatedBudgetAED: 8000, committedCostAED: 8000, actualCostAED: 7500, forecastToCompleteAED: 0 },
      { id: 'b25', category: 'Talent, Styling & HMU', allocatedBudgetAED: 12000, committedCostAED: 12000, actualCostAED: 11000, forecastToCompleteAED: 0 },
      { id: 'b26', category: 'Post-Production, Color & Sound', allocatedBudgetAED: 22000, committedCostAED: 22000, actualCostAED: 12000, forecastToCompleteAED: 8000 },
      { id: 'b27', category: 'Travel, Transport & Catering', allocatedBudgetAED: 5000, committedCostAED: 5000, actualCostAED: 4800, forecastToCompleteAED: 0 },
      { id: 'b28', category: 'Contingency & Insurance', allocatedBudgetAED: 4000, committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: 0 }
    ],
    totalAllocatedBudgetAED: 121000,
    totalCommittedCostAED: 117000,
    totalActualCostAED: 101300,
    totalForecastCostAED: 109300,
    forecastGrossProfitAED: 50700,
    forecastGrossMarginPercent: 31.7, // Target was 45% -> Low Margin Alert!
    actualGrossProfitAED: 58700,
    actualGrossMarginPercent: 36.7,
    marginVariancePercent: -13.3,

    accountOwnerId: 'usr-2',
    accountOwnerName: 'Nadia Cherif',
    producerId: 'usr-5',
    producerName: 'Zayn Al-Husseini',
    creativeDirectorId: 'usr-1',
    creativeDirectorName: 'Tariq Al Mansoor',
    leadEditorId: 'usr-8',
    leadEditorName: 'Alex Chen',

    startDate: '2026-08-25',
    shootStartDate: '2026-09-02',
    shootEndDate: '2026-09-03',
    deliveryDate: '2026-09-24',
    finalInvoiceDate: '2026-09-30',

    billingMilestones: [
      { id: 'bm-21', title: '50% Mobilization Deposit', amountAED: 80000, percentage: 50, dueDate: '2026-08-26', status: 'Collected', invoiceNumber: 'INV-2026-084-1', invoiceDate: '2026-08-26', paidDate: '2026-09-01' },
      { id: 'bm-22', title: '50% Final Masters Delivery', amountAED: 80000, percentage: 50, dueDate: '2026-09-25', status: 'Pending' }
    ],

    deliverables: [
      { id: 'del-21', projectId: 'prj-084', title: 'Careem Plus Anthem Hero Film 60s', format: '16:9 4K Master', duration: '60s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Fine Cut V2', dueDate: '2026-09-22', versionCount: 2, aspectRatio: '16:9', reviewLink: 'https://vimeo.com/private/demo84' },
      { id: 'del-22', projectId: 'prj-084', title: 'Everyday Savings 9:16 Reel', format: '9:16 Reel', duration: '15s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Client Review', dueDate: '2026-09-24', versionCount: 1, aspectRatio: '9:16' }
    ],

    documents: [
      { id: 'doc-21', title: 'Careem Approved Storyboard & Animatics', category: 'Proposal', fileName: 'Careem_Plus_Animatic_V3.pdf', fileSize: '14.2 MB', uploadedAt: '2026-08-27', uploadedBy: 'Zayn Al-Husseini' }
    ],

    decisionLog: [
      { id: 'dec-21', timestamp: '2026-09-03 21:00', author: 'Zayn Al-Husseini', title: 'Shoots Wrapped On Schedule', details: 'Both Al Quoz and JBR location shoots wrapped with zero overtime charges.', type: 'Client Milestone' }
    ],
    shootCount: 1
  },
  {
    id: 'prj-077',
    code: 'TCS-26-077',
    title: 'Emaar Address Grand Downtown Reveal',
    clientId: 'cli-1',
    clientName: 'Emaar Hospitality & Downtown Dubai',
    status: 'Delivered & Invoiced',
    serviceType: 'Brand Film',
    contractValueAED: 275000,
    approvedVariationsAED: 0,
    totalProjectRevenueAED: 275000,
    targetMarginPercent: 40.0,
    
    budgetCategories: [
      { id: 'b31', category: 'Pre-Production & Creative', allocatedBudgetAED: 25000, committedCostAED: 25000, actualCostAED: 24000, forecastToCompleteAED: 0 },
      { id: 'b32', category: 'Director, DP & Crew', allocatedBudgetAED: 62000, committedCostAED: 62000, actualCostAED: 61000, forecastToCompleteAED: 0 },
      { id: 'b33', category: 'Camera & Lighting Equipment', allocatedBudgetAED: 32000, committedCostAED: 32000, actualCostAED: 31500, forecastToCompleteAED: 0 },
      { id: 'b34', category: 'Locations, Studio & Permits', allocatedBudgetAED: 18000, committedCostAED: 18000, actualCostAED: 16000, forecastToCompleteAED: 0 },
      { id: 'b35', category: 'Talent, Styling & HMU', allocatedBudgetAED: 22000, committedCostAED: 22000, actualCostAED: 21000, forecastToCompleteAED: 0 },
      { id: 'b36', category: 'Post-Production, Color & Sound', allocatedBudgetAED: 25000, committedCostAED: 25000, actualCostAED: 23500, forecastToCompleteAED: 0 },
      { id: 'b37', category: 'Travel, Transport & Catering', allocatedBudgetAED: 9000, committedCostAED: 9000, actualCostAED: 8500, forecastToCompleteAED: 0 },
      { id: 'b38', category: 'Contingency & Insurance', allocatedBudgetAED: 8000, committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: 0 }
    ],
    totalAllocatedBudgetAED: 201000,
    totalCommittedCostAED: 185500,
    totalActualCostAED: 185500,
    totalForecastCostAED: 185500,
    forecastGrossProfitAED: 89500,
    forecastGrossMarginPercent: 32.5, // 32.5% actual margin
    actualGrossProfitAED: 89500,
    actualGrossMarginPercent: 32.5,
    marginVariancePercent: -7.5,

    accountOwnerId: 'usr-2',
    accountOwnerName: 'Nadia Cherif',
    producerId: 'usr-4',
    producerName: 'Maya Rayyan',
    creativeDirectorId: 'usr-1',
    creativeDirectorName: 'Tariq Al Mansoor',
    leadEditorId: 'usr-8',
    leadEditorName: 'Alex Chen',

    startDate: '2026-07-15',
    shootStartDate: '2026-08-04',
    shootEndDate: '2026-08-06',
    deliveryDate: '2026-08-28',
    finalInvoiceDate: '2026-09-01',

    billingMilestones: [
      { id: 'bm-31', title: '50% Advance Commissioning', amountAED: 137500, percentage: 50, dueDate: '2026-07-18', status: 'Collected', invoiceNumber: 'INV-2026-077-1', invoiceDate: '2026-07-18', paidDate: '2026-07-29' },
      { id: 'bm-32', title: '50% Final Handover & Master Delivery', amountAED: 137500, percentage: 50, dueDate: '2026-09-01', status: 'Overdue', invoiceNumber: 'INV-2026-077-2', invoiceDate: '2026-09-01', agingDays: 14 }
    ],

    deliverables: [
      { id: 'del-31', projectId: 'prj-077', title: 'Address Grand Downtown 4K Anthem', format: '16:9 4K Master', duration: '90s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Delivered', dueDate: '2026-08-28', versionCount: 3, aspectRatio: '16:9' }
    ],

    documents: [
      { id: 'doc-31', title: 'Final Client Acceptance Certificate', category: 'Signed PO', fileName: 'Emaar_Acceptance_Signed.pdf', fileSize: '1.8 MB', uploadedAt: '2026-08-30', uploadedBy: 'Maya Rayyan' }
    ],

    decisionLog: [
      { id: 'dec-31', timestamp: '2026-08-28 17:00', author: 'Maya Rayyan', title: 'All 4K Masters Dispatched', details: 'Hard drives and frame.io deliverables received and approved by Emaar.', type: 'Client Milestone' }
    ],
    shootCount: 1
  },
  {
    id: 'prj-086',
    code: 'TCS-26-086',
    title: 'Chalhoub Private Haute Horlogerie Reveal',
    clientId: 'cli-4',
    clientName: 'Chalhoub Luxury Brands Group',
    status: 'Pre-Production',
    serviceType: 'Commercial Campaign',
    contractValueAED: 195000,
    approvedVariationsAED: 0,
    totalProjectRevenueAED: 195000,
    targetMarginPercent: 40.0,
    
    budgetCategories: [
      { id: 'b41', category: 'Pre-Production & Creative', allocatedBudgetAED: 22000, committedCostAED: 22000, actualCostAED: 8000, forecastToCompleteAED: 14000 },
      { id: 'b42', category: 'Director, DP & Crew', allocatedBudgetAED: 48000, committedCostAED: 48000, actualCostAED: 0, forecastToCompleteAED: 48000 },
      { id: 'b43', category: 'Camera & Lighting Equipment', allocatedBudgetAED: 24000, committedCostAED: 24000, actualCostAED: 0, forecastToCompleteAED: 24000 },
      { id: 'b44', category: 'Locations, Studio & Permits', allocatedBudgetAED: 14000, committedCostAED: 14000, actualCostAED: 4000, forecastToCompleteAED: 10000 },
      { id: 'b45', category: 'Talent, Styling & HMU', allocatedBudgetAED: 32000, committedCostAED: 32000, actualCostAED: 0, forecastToCompleteAED: 32000 }, // Overbudget talent
      { id: 'b46', category: 'Post-Production, Color & Sound', allocatedBudgetAED: 22000, committedCostAED: 18000, actualCostAED: 0, forecastToCompleteAED: 22000 },
      { id: 'b47', category: 'Travel, Transport & Catering', allocatedBudgetAED: 6000, committedCostAED: 6000, actualCostAED: 1200, forecastToCompleteAED: 4800 },
      { id: 'b48', category: 'Contingency & Insurance', allocatedBudgetAED: 5000, committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: 2000 }
    ],
    totalAllocatedBudgetAED: 173000,
    totalCommittedCostAED: 164000,
    totalActualCostAED: 13200,
    totalForecastCostAED: 156800,
    forecastGrossProfitAED: 38200,
    forecastGrossMarginPercent: 19.6, // DANGEROUSLY LOW: 19.6% vs 40% Target!
    actualGrossProfitAED: 181800,
    actualGrossMarginPercent: 93.2,
    marginVariancePercent: -20.4, // Margin alert!

    accountOwnerId: 'usr-3',
    accountOwnerName: 'Liam Henderson',
    producerId: 'usr-4',
    producerName: 'Maya Rayyan',
    creativeDirectorId: 'usr-1',
    creativeDirectorName: 'Tariq Al Mansoor',
    leadEditorId: 'usr-8',
    leadEditorName: 'Alex Chen',

    startDate: '2026-09-10',
    shootStartDate: '2026-09-24',
    shootEndDate: '2026-09-25',
    deliveryDate: '2026-10-18',
    finalInvoiceDate: '2026-10-25',

    billingMilestones: [
      { id: 'bm-41', title: '50% Advance on Pre-Pro', amountAED: 97500, percentage: 50, dueDate: '2026-09-15', status: 'Invoiced', invoiceNumber: 'INV-2026-086-1', invoiceDate: '2026-09-12' },
      { id: 'bm-42', title: '50% Final Master Dispatched', amountAED: 97500, percentage: 50, dueDate: '2026-10-25', status: 'Pending' }
    ],

    deliverables: [
      { id: 'del-41', projectId: 'prj-086', title: 'Horlogerie Private Master 45s', format: '16:9 4K Master', duration: '45s', languagesAndSubtitles: ['English', 'French'], status: 'Pre-Production', dueDate: '2026-10-16', versionCount: 1, aspectRatio: '16:9' },
      { id: 'del-42', projectId: 'prj-086', title: 'Instagram Luxury Vertical Carousel', format: '9:16 Reel', duration: '15s', languagesAndSubtitles: ['English'], status: 'Pre-Production', dueDate: '2026-10-18', versionCount: 1, aspectRatio: '9:16' }
    ],

    documents: [
      { id: 'doc-41', title: 'Chalhoub Brand Guidelines 2026', category: 'Brief', fileName: 'Chalhoub_Guidelines.pdf', fileSize: '18.1 MB', uploadedAt: '2026-09-10', uploadedBy: 'Liam Henderson' }
    ],

    decisionLog: [
      { id: 'dec-41', timestamp: '2026-09-13 11:00', author: 'Karim Farouk', title: 'LOW MARGIN WARNING AUDIT', details: 'Talent booking cost (AED 32,000) severely compresses projected gross margin to 19.6%. Recommended re-negotiating talent buyout.', type: 'Budget Approval' }
    ],
    shootCount: 1
  }
];

export const INITIAL_SHOOTS: Shoot[] = [
  {
    id: 'sht-401',
    code: 'SHT-26-401',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Documentary',
    clientName: 'Dubai Tourism & Culture Authority (DTCM)',
    shootTitle: 'Day 1: Dunes of Al Marmoom & Falconry Sequence',
    shootDate: '2026-09-16',
    callTime: '04:45 AM',
    wrapTime: '06:30 PM',
    status: 'Scheduled',
    logistics: {
      locationName: 'Al Marmoom Desert Conservation Reserve',
      locationAddress: 'Al Qudra Road, Sector 9, Dubai, UAE',
      locationAccessNotes: '4x4 Convoy required. Meet at Last Exit Al Qudra fuel station at 04:15 AM sharp.',
      permitNumber: 'DFTC-PERM-2026-8819',
      permitStatus: 'Approved',
      cateringPlan: 'Desert Sunrise Breakfast Boxes at 05:30 AM; Hot Arabic Buffet Lunch under air-conditioned tent at 12:30 PM.',
      nearestHospital: 'Mediclinic Parkview Hospital, Al Barsha South',
      hospitalPhone: '+971 4 449 5000',
      weatherForecast: 'Sunrise 06:08 AM, Sunset 06:22 PM. Temp 28°C - 39°C. Clear skies, slight desert breeze.',
      transportPlan: '3x Toyota Land Cruiser 4WDs and 1x Equipment 3-ton Mercedes Sprinter.',
      parkingNotes: 'Ranger Station Gate 3 parking permit pass required on vehicle dashboard.'
    },
    crew: [
      { role: 'Director & Creative Lead', memberId: 'usr-1', memberName: 'Tariq Al Mansoor', status: 'Confirmed', callTime: '04:45 AM', dayRateAED: 3800, contactNumber: '+971 50 123 4567' },
      { role: 'Director of Photography (DP)', memberId: 'usr-7', memberName: 'Sofia Rossi', status: 'Confirmed', callTime: '04:45 AM', dayRateAED: 3200, contactNumber: '+971 56 234 5678' },
      { role: 'Line Producer', memberId: 'usr-4', memberName: 'Maya Rayyan', status: 'Confirmed', callTime: '04:30 AM', dayRateAED: 2200, contactNumber: '+971 52 456 7890' },
      { role: 'Gaffer', memberId: 'usr-9', memberName: 'Bilal Qureshi', status: 'Confirmed', callTime: '04:45 AM', dayRateAED: 2200, contactNumber: '+971 55 890 1234' },
      { role: '1st AC / Focus Puller', memberId: 'usr-10', memberName: 'Elena Rostova', status: 'Confirmed', callTime: '04:45 AM', dayRateAED: 1900, contactNumber: '+971 50 333 4455' }
    ],
    talentAndExtras: [
      'Sheikh Saeed Al Maktoum Heritage Falconry Master (Subject)',
      '2x Traditional Horsemen in authentic Kandura with Falcon mounts'
    ],
    equipment: [
      { id: 'eq-1', category: 'Camera System', description: 'Arri Alexa Mini LF Camera Package (PL Mount)', supplier: 'Internal Assets', status: 'Reserved', dailyCostAED: 4500 },
      { id: 'eq-2', category: 'Cinema Lenses', description: 'Cooke Anamorphic /i Full Frame Plus Prime Set (32, 50, 85, 135mm)', supplier: 'Internal Assets', status: 'Reserved', dailyCostAED: 3800 },
      { id: 'eq-3', category: 'Drone & Gimbal', description: 'DJI Inspire 3 with Zenmuse X9-8K Air Cinema Drone Kit', supplier: 'DroneX Dubai Rental', status: 'Dispatched', dailyCostAED: 3200 },
      { id: 'eq-4', category: 'Lighting & Astera', description: 'Astera Titan Tubes 8x Kit + 2x Aputure 1200d Pro + Honda Inverter Gen', supplier: 'Internal Assets', status: 'Reserved', dailyCostAED: 2400 }
    ],
    estimatedShootCostAED: 28500,
    committedShootCostAED: 28500,
    actualShootCostAED: 0,
    overtimeHours: 0,
    overtimeCostAED: 0,
    completionNotes: 'All permits cleared with Dubai Film Commission and Al Marmoom rangers. Call sheet dispatched.',
    callSheetApproved: true,
    lastCallSheetUpdate: '2026-09-14 16:20'
  },
  {
    id: 'sht-402',
    code: 'SHT-26-402',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Documentary',
    clientName: 'Dubai Tourism & Culture Authority (DTCM)',
    shootTitle: 'Day 2: Al Fahidi Historical Neighborhood Night Lanterns',
    shootDate: '2026-09-17',
    callTime: '02:00 PM',
    wrapTime: '11:30 PM',
    status: 'Scheduled',
    logistics: {
      locationName: 'Al Fahidi Historical District (Old Dubai)',
      locationAddress: 'Al Fahidi St, Bur Dubai, UAE',
      locationAccessNotes: 'Pedestrian only zone. Equipment hand-carted from Al Seef Parking B2.',
      permitNumber: 'DFTC-PERM-2026-8820',
      permitStatus: 'Approved',
      cateringPlan: 'Arabian Tea House courtyard booked for crew dinner at 06:30 PM.',
      nearestHospital: 'Dubai Hospital, Deira',
      hospitalPhone: '+971 4 219 5000',
      weatherForecast: 'Evening temp 31°C, calm wind, 45% humidity.',
      transportPlan: 'Crew shuttle van from TCS Studio City Office.',
      parkingNotes: 'Underground Al Seef parking validated by DTCM project office.'
    },
    crew: [
      { role: 'Director', memberId: 'usr-1', memberName: 'Tariq Al Mansoor', status: 'Confirmed', callTime: '02:00 PM', dayRateAED: 3800, contactNumber: '+971 50 123 4567' },
      { role: 'Director of Photography (DP)', memberId: 'usr-7', memberName: 'Sofia Rossi', status: 'Confirmed', callTime: '02:00 PM', dayRateAED: 3200, contactNumber: '+971 56 234 5678' },
      { role: 'Line Producer', memberId: 'usr-4', memberName: 'Maya Rayyan', status: 'Confirmed', callTime: '01:30 PM', dayRateAED: 2200, contactNumber: '+971 52 456 7890' },
      { role: 'Gaffer', memberId: 'usr-9', memberName: 'Bilal Qureshi', status: 'Confirmed', callTime: '02:00 PM', dayRateAED: 2200, contactNumber: '+971 55 890 1234' }
    ],
    talentAndExtras: [
      'Elderly Emirati Calligrapher Uncle Salem',
      'Child apprentice (actor, permit verified)'
    ],
    equipment: [
      { id: 'eq-1', category: 'Camera System', description: 'Arri Alexa Mini LF Camera Package', supplier: 'Internal Assets', status: 'Reserved', dailyCostAED: 4500 },
      { id: 'eq-4', category: 'Lighting', description: 'Astera Titan Tubes + Aputure 600c Full Color Spotlights', supplier: 'Internal Assets', status: 'Reserved', dailyCostAED: 2400 }
    ],
    estimatedShootCostAED: 22000,
    committedShootCostAED: 22000,
    actualShootCostAED: 0,
    overtimeHours: 0,
    overtimeCostAED: 0,
    completionNotes: 'Night ambiance shoot with warm tungsten practical lanterns.',
    callSheetApproved: true,
    lastCallSheetUpdate: '2026-09-14 11:00'
  },
  {
    id: 'sht-405',
    code: 'SHT-26-405',
    projectId: 'prj-086',
    projectCode: 'TCS-26-086',
    projectTitle: 'Chalhoub Private Haute Horlogerie Reveal',
    clientName: 'Chalhoub Luxury Brands Group',
    shootTitle: 'Watch Macro & Lighting Pre-Light Test',
    shootDate: '2026-09-16', // SAME DATE AS SHT-401!
    callTime: '09:00 AM',
    wrapTime: '03:00 PM',
    status: 'Scheduled',
    logistics: {
      locationName: 'The Creative Story Stage A (Dubai Studio City)',
      locationAddress: 'Studio City Commercial Bldg 2, Stage A, Dubai',
      locationAccessNotes: 'Keycard access, soundproofed cyclorama stage.',
      permitNumber: 'INTERNAL-STAGE-A',
      permitStatus: 'Approved',
      cateringPlan: 'Studio Craft Service & Coffee Bar.',
      nearestHospital: 'Mediclinic Parkview Hospital',
      hospitalPhone: '+971 4 449 5000',
      weatherForecast: 'Indoor climate-controlled stage.',
      transportPlan: 'Self-drive to studio.',
      parkingNotes: 'Designated reserved bays 12-16.'
    },
    crew: [
      // NOTICE: Sofia Rossi is also booked on SHT-401 at the same date! This creates the live booking conflict!
      { role: 'Director of Photography (DP)', memberId: 'usr-7', memberName: 'Sofia Rossi', status: 'Tentative Hold', callTime: '09:00 AM', dayRateAED: 3200, contactNumber: '+971 56 234 5678' },
      { role: 'Focus Puller / 1st AC', memberId: 'usr-10', memberName: 'Elena Rostova', status: 'Tentative Hold', callTime: '09:00 AM', dayRateAED: 1900, contactNumber: '+971 50 333 4455' }
    ],
    talentAndExtras: [
      'Hand Model (Watch Specialist)'
    ],
    equipment: [
      { id: 'eq-1', category: 'Camera System', description: 'Arri Alexa Mini LF Camera Package', supplier: 'Internal Assets', status: 'Reserved', dailyCostAED: 4500 }
    ],
    estimatedShootCostAED: 11000,
    committedShootCostAED: 11000,
    actualShootCostAED: 0,
    overtimeHours: 0,
    overtimeCostAED: 0,
    completionNotes: 'DOUBLE BOOKING CONFLICT DETECTED: DP Sofia Rossi and Arri Mini LF are simultaneously confirmed on SHT-26-401 in Al Marmoom Desert.',
    callSheetApproved: false,
    lastCallSheetUpdate: '2026-09-13 18:40'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'bkg-1',
    resourceId: 'usr-7',
    resourceName: 'Sofia Rossi',
    resourceType: 'crew',
    roleOrCategory: 'Director of Photography',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Doc',
    shootId: 'sht-401',
    date: '2026-09-16',
    startTime: '04:45',
    endTime: '18:30',
    status: 'Confirmed',
    hasConflict: true,
    conflictReason: 'Double-booked on SHT-26-405 (Chalhoub Pre-Light Test) on the same date.',
    notes: 'Al Marmoom Desert day shoot.'
  },
  {
    id: 'bkg-2',
    resourceId: 'usr-7',
    resourceName: 'Sofia Rossi',
    resourceType: 'crew',
    roleOrCategory: 'Director of Photography',
    projectId: 'prj-086',
    projectCode: 'TCS-26-086',
    projectTitle: 'Chalhoub Haute Horlogerie Reveal',
    shootId: 'sht-405',
    date: '2026-09-16',
    startTime: '09:00',
    endTime: '15:00',
    status: 'Tentative Hold',
    hasConflict: true,
    conflictReason: 'Already confirmed on TCS-26-081 Desert Shoot on 2026-09-16.',
    notes: 'Studio Stage A pre-light.'
  },
  {
    id: 'bkg-3',
    resourceId: 'usr-7',
    resourceName: 'Sofia Rossi',
    resourceType: 'crew',
    roleOrCategory: 'Director of Photography',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Doc',
    shootId: 'sht-402',
    date: '2026-09-17',
    startTime: '14:00',
    endTime: '23:30',
    status: 'Confirmed',
    hasConflict: false,
    notes: 'Al Fahidi Old Dubai night shoot.'
  },
  {
    id: 'bkg-4',
    resourceId: 'usr-9',
    resourceName: 'Bilal Qureshi',
    resourceType: 'crew',
    roleOrCategory: 'Gaffer & Head of Lighting',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Doc',
    shootId: 'sht-401',
    date: '2026-09-16',
    startTime: '04:45',
    endTime: '18:30',
    status: 'Confirmed',
    hasConflict: false,
    notes: 'Al Marmoom Desert.'
  },
  {
    id: 'bkg-5',
    resourceId: 'usr-9',
    resourceName: 'Bilal Qureshi',
    resourceType: 'crew',
    roleOrCategory: 'Gaffer & Head of Lighting',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Doc',
    shootId: 'sht-402',
    date: '2026-09-17',
    startTime: '14:00',
    endTime: '23:30',
    status: 'Confirmed',
    hasConflict: false,
    notes: 'Al Fahidi night.'
  },
  {
    id: 'bkg-6',
    resourceId: 'usr-10',
    resourceName: 'Elena Rostova',
    resourceType: 'freelancer',
    roleOrCategory: '1st AC / Focus Puller',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Doc',
    shootId: 'sht-401',
    date: '2026-09-16',
    startTime: '04:45',
    endTime: '18:30',
    status: 'Confirmed',
    hasConflict: false,
    notes: 'Al Marmoom Desert.'
  },
  {
    id: 'bkg-7',
    resourceId: 'usr-8',
    resourceName: 'Alex Chen',
    resourceType: 'crew',
    roleOrCategory: 'Lead Editor',
    projectId: 'prj-084',
    projectCode: 'TCS-26-084',
    projectTitle: 'Careem Plus SuperApp 2026 Campaign',
    date: '2026-09-15',
    startTime: '09:00',
    endTime: '18:00',
    status: 'Confirmed',
    hasConflict: false,
    notes: 'Post Suite 2 color and sound assembly.'
  },
  {
    id: 'bkg-8',
    resourceId: 'usr-8',
    resourceName: 'Alex Chen',
    resourceType: 'crew',
    roleOrCategory: 'Lead Editor',
    projectId: 'prj-084',
    projectCode: 'TCS-26-084',
    projectTitle: 'Careem Plus SuperApp 2026 Campaign',
    date: '2026-09-16',
    startTime: '09:00',
    endTime: '18:00',
    status: 'Confirmed',
    hasConflict: false,
    notes: 'Post Suite 2 cutdowns.'
  },
  {
    id: 'bkg-9',
    resourceId: 'eq-1',
    resourceName: 'Arri Alexa Mini LF Package',
    resourceType: 'equipment',
    roleOrCategory: 'Cinema Camera',
    projectId: 'prj-081',
    projectCode: 'TCS-26-081',
    projectTitle: 'DTCM Desert Echoes Heritage Doc',
    shootId: 'sht-401',
    date: '2026-09-16',
    startTime: '04:45',
    endTime: '18:30',
    status: 'Confirmed',
    hasConflict: true,
    conflictReason: 'Also tentatively requested on TCS-26-086 Stage A on 2026-09-16.',
    notes: 'Desert field kit.'
  }
];

export const INITIAL_EQUIPMENT: EquipmentResource[] = [
  {
    id: 'eq-1',
    code: 'CAM-01',
    name: 'Arri Alexa Mini LF Cinema Package (LPL/PL)',
    category: 'Camera System',
    currentStatus: 'Booked On Set',
    dailyRateAED: 4500,
    replacementValueAED: 340000,
    assignedShootCode: 'SHT-26-401',
    location: 'Gear Locker 1 / Desert Prep'
  },
  {
    id: 'eq-2',
    code: 'LNS-01',
    name: 'Cooke Anamorphic /i Full Frame Plus Set (4 Lenses)',
    category: 'Cinema Lenses',
    currentStatus: 'Booked On Set',
    dailyRateAED: 3800,
    replacementValueAED: 280000,
    assignedShootCode: 'SHT-26-401',
    location: 'Lens Vault Safe A'
  },
  {
    id: 'eq-3',
    code: 'DRN-01',
    name: 'DJI Inspire 3 Zenmuse X9-8K Air Cinema Drone Kit',
    category: 'Drone & Gimbal',
    currentStatus: 'Available',
    dailyRateAED: 3200,
    replacementValueAED: 95000,
    location: 'Drone Tech Station'
  },
  {
    id: 'eq-4',
    code: 'LGT-01',
    name: 'Astera Titan Tube 8x Wireless LED Kit with Charging Case',
    category: 'Lighting & Astera',
    currentStatus: 'Booked On Set',
    dailyRateAED: 1800,
    replacementValueAED: 38000,
    assignedShootCode: 'SHT-26-401',
    location: 'Grip Truck 1'
  },
  {
    id: 'eq-5',
    code: 'LGT-02',
    name: 'Aputure Electro Storm CS15 High-Output Full Color',
    category: 'Lighting & Astera',
    currentStatus: 'Available',
    dailyRateAED: 1500,
    replacementValueAED: 45000,
    location: 'Studio Stage Bay'
  },
  {
    id: 'eq-6',
    code: 'GRP-01',
    name: 'DJI Ronin 2 3-Axis Gimbal System with Master Wheels',
    category: 'Drone & Gimbal',
    currentStatus: 'Available',
    dailyRateAED: 1600,
    replacementValueAED: 52000,
    location: 'Tech Room Shelf 3'
  }
];

export const INITIAL_ROLE_KPIS: RoleKPIScorecard[] = [
  {
    userId: 'usr-2',
    userName: 'Nadia Cherif',
    role: 'bd',
    period: 'September 2026',
    compositeScore: 92,
    overallStatus: 'Exceeding',
    metrics: [
      {
        metricKey: 'won_revenue',
        name: 'Won Revenue MTD',
        targetValue: 350000,
        actualValue: 540000,
        achievementRatePercent: 154.3,
        weightPercent: 30,
        unit: 'AED',
        formulaExplanation: 'Total contractual value of opportunities marked Won in period × ownership attribution %.',
        auditedCalculation: 'DTCM Doc (AED 380k @ 100%) + Careem Anthem (AED 160k @ 100%) = AED 540,000.',
        status: 'Exceeding'
      },
      {
        metricKey: 'gross_profit_generated',
        name: 'Gross Profit Generated',
        targetValue: 140000,
        actualValue: 228500,
        achievementRatePercent: 163.2,
        weightPercent: 30,
        unit: 'AED',
        formulaExplanation: 'Attributed gross profit on closed won projects (Revenue − Direct Project Costs).',
        auditedCalculation: 'DTCM GP (AED 150,100) + Careem GP (AED 78,400) = AED 228,500.',
        status: 'Exceeding'
      },
      {
        metricKey: 'win_rate',
        name: 'Opportunity Win Rate',
        targetValue: 45,
        actualValue: 66.7,
        achievementRatePercent: 148.2,
        weightPercent: 20,
        unit: '%',
        formulaExplanation: 'Won Deals count ÷ (Won Deals + Lost Deals) in trailing 90 days.',
        auditedCalculation: '4 won out of 6 decided proposals.',
        status: 'Exceeding'
      },
      {
        metricKey: 'pipeline_coverage',
        name: 'Weighted Pipeline Coverage',
        targetValue: 3.0,
        actualValue: 3.8,
        achievementRatePercent: 126.7,
        weightPercent: 10,
        unit: 'score',
        formulaExplanation: 'Weighted Pipeline Value ÷ Monthly Revenue Target.',
        auditedCalculation: 'AED 1,330,500 weighted active pipeline ÷ AED 350,000 monthly quota = 3.8x.',
        status: 'Exceeding'
      },
      {
        metricKey: 'sales_cycle',
        name: 'Average Sales Cycle Time',
        targetValue: 30,
        actualValue: 24,
        achievementRatePercent: 125.0,
        weightPercent: 10,
        unit: 'days',
        formulaExplanation: 'Average days elapsed from Lead Created to Contract Sign-off.',
        auditedCalculation: 'Average across 4 won enterprise projects: 24 days.',
        status: 'Exceeding'
      }
    ],
    evaluatorNotes: 'Outstanding commercial month driven by DTCM win and Emaar Burj Crown pending close.',
    lastAuditedDate: '2026-09-14'
  },
  {
    userId: 'usr-3',
    userName: 'Liam Henderson',
    role: 'bd',
    period: 'September 2026',
    compositeScore: 78,
    overallStatus: 'Needs Attention',
    metrics: [
      {
        metricKey: 'won_revenue',
        name: 'Won Revenue MTD',
        targetValue: 250000,
        actualValue: 126000,
        achievementRatePercent: 50.4,
        weightPercent: 30,
        unit: 'AED',
        formulaExplanation: 'Contractual value of won opportunities in period × ownership %.',
        auditedCalculation: 'AED 126k attributed from Emaar Burj Crown split (pending formal signing).',
        status: 'Needs Attention'
      },
      {
        metricKey: 'gross_profit_generated',
        name: 'Gross Profit Generated',
        targetValue: 100000,
        actualValue: 55440,
        achievementRatePercent: 55.4,
        weightPercent: 30,
        unit: 'AED',
        formulaExplanation: 'Attributed gross profit on closed deals.',
        auditedCalculation: 'AED 55,440 projected GP contribution.',
        status: 'Needs Attention'
      },
      {
        metricKey: 'pipeline_coverage',
        name: 'Weighted Pipeline Coverage',
        targetValue: 3.0,
        actualValue: 3.4,
        achievementRatePercent: 113.3,
        weightPercent: 20,
        unit: 'score',
        formulaExplanation: 'Weighted Pipeline Value ÷ Monthly Revenue Target.',
        auditedCalculation: 'Emirates First Class (AED 412k weighted) + Red Bull (AED 96k weighted) = 3.4x.',
        status: 'On Track'
      },
      {
        metricKey: 'stale_opp_count',
        name: 'Follow-up Hygiene (Stale Deals)',
        targetValue: 0,
        actualValue: 1, // Sephora is stale
        achievementRatePercent: 40.0,
        weightPercent: 20,
        unit: 'count',
        formulaExplanation: 'Penalty for opportunities inactive >10 days without scheduled next action.',
        auditedCalculation: '1 stale deal detected: Chalhoub Sephora (OPP-103, 11 days inactive).',
        status: 'Critical'
      }
    ],
    evaluatorNotes: 'Heavy pipeline with Emirates Airline (AED 550k) nearing close, but Chalhoub follow-up hygiene requires immediate action.',
    lastAuditedDate: '2026-09-14'
  },
  {
    userId: 'usr-4',
    userName: 'Maya Rayyan',
    role: 'producer',
    period: 'September 2026',
    compositeScore: 95,
    overallStatus: 'Exceeding',
    metrics: [
      {
        metricKey: 'projects_value_managed',
        name: 'Project Value Managed',
        targetValue: 500000,
        actualValue: 865000,
        achievementRatePercent: 173.0,
        weightPercent: 25,
        unit: 'AED',
        formulaExplanation: 'Combined total revenue of all live active projects assigned to producer.',
        auditedCalculation: 'TCS-26-081 (AED 395k) + TCS-26-077 (AED 275k) + TCS-26-086 (AED 195k) = AED 865,000.',
        status: 'Exceeding'
      },
      {
        metricKey: 'margin_protection',
        name: 'Margin Protection Variance',
        targetValue: 0,
        actualValue: -2.5,
        achievementRatePercent: 88.0,
        weightPercent: 30,
        unit: '%',
        formulaExplanation: 'Variance between forecast gross margin and approved target margin across active portfolio.',
        auditedCalculation: 'Average variance of -2.5% against strict 42% benchmark.',
        status: 'On Track'
      },
      {
        metricKey: 'on_time_delivery',
        name: 'On-Time Milestone Delivery',
        targetValue: 95,
        actualValue: 100,
        achievementRatePercent: 105.3,
        weightPercent: 25,
        unit: '%',
        formulaExplanation: 'Shoot days and client deliverables delivered on or before approved schedule.',
        auditedCalculation: '100% of shoot days and cutdown deliveries completed on schedule.',
        status: 'Exceeding'
      },
      {
        metricKey: 'budget_overrun_rate',
        name: 'Direct Cost Budget Control',
        targetValue: 0,
        actualValue: 0.8,
        achievementRatePercent: 95.0,
        weightPercent: 20,
        unit: '%',
        formulaExplanation: 'Actual + Committed Cost vs Approved Internal Budget across categories.',
        auditedCalculation: '0.8% variance; within acceptable contingency tolerance.',
        status: 'On Track'
      }
    ],
    evaluatorNotes: 'Benchmark producer performance. Outstanding discipline on DTCM permit coordination and crew safety.',
    lastAuditedDate: '2026-09-14'
  },
  {
    userId: 'usr-7',
    userName: 'Sofia Rossi',
    role: 'creative',
    period: 'September 2026',
    compositeScore: 96,
    overallStatus: 'Exceeding',
    metrics: [
      {
        metricKey: 'billable_utilization',
        name: 'Billable Shoot Utilization',
        targetValue: 75,
        actualValue: 88.5,
        achievementRatePercent: 118.0,
        weightPercent: 40,
        unit: '%',
        formulaExplanation: 'Confirmed shoot days on client projects ÷ Available working days in month.',
        auditedCalculation: '17 confirmed shoot / tech prep days out of 20 working days.',
        status: 'Exceeding'
      },
      {
        metricKey: 'rework_retake_rate',
        name: 'Controlled Reshoot / Retake Rate',
        targetValue: 0,
        actualValue: 0,
        achievementRatePercent: 100.0,
        weightPercent: 30,
        unit: '%',
        formulaExplanation: 'Zero unscheduled reshoot days caused by technical or cinematography faults.',
        auditedCalculation: '0 technical faults, zero reshoots in trailing 12 months.',
        status: 'Exceeding'
      },
      {
        metricKey: 'client_quality_score',
        name: 'Structured Director/Client Quality Rating',
        targetValue: 4.5,
        actualValue: 4.9,
        achievementRatePercent: 108.9,
        weightPercent: 30,
        unit: 'score',
        formulaExplanation: 'Average rating (out of 5.0) from Directors, EPs and Clients post-wrap.',
        auditedCalculation: '14 client evaluations averaged 4.92 / 5.0.',
        status: 'Exceeding'
      }
    ],
    evaluatorNotes: 'In extraordinarily high demand across UAE and international client pitches. Note: Resolve booking conflict on Sept 16.',
    lastAuditedDate: '2026-09-14'
  }
];

export const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 'alt-1',
    severity: 'critical',
    type: 'booking_conflict',
    title: 'Crew & Camera Double-Booking Conflict Detected',
    description: 'Sofia Rossi (DP) and Arri Mini LF are scheduled simultaneously on SHT-26-401 (DTCM Desert Shoot) and SHT-26-405 (Chalhoub Studio Stage A) on September 16, 2026.',
    entityType: 'shoot',
    entityId: 'sht-405',
    entityCode: 'SHT-26-405',
    timestamp: '2026-09-14 10:15',
    resolved: false,
    recommendedAction: 'Reassign Chalhoub pre-light test to 2nd unit DP or shift studio date to September 18.'
  },
  {
    id: 'alt-2',
    severity: 'critical',
    type: 'low_margin',
    title: 'Severe Margin Compression on Chalhoub Reveal (TCS-26-086)',
    description: 'Forecast gross margin has fallen to 19.6% against the approved company threshold of 40.0% due to AED 32,000 unbudgeted talent fees.',
    entityType: 'project',
    entityId: 'prj-086',
    entityCode: 'TCS-26-086',
    timestamp: '2026-09-13 14:30',
    resolved: false,
    recommendedAction: 'Submit formal Variation Order of +AED 35,000 to Chalhoub client or renegotiate talent agency buyout package.'
  },
  {
    id: 'alt-3',
    severity: 'warning',
    type: 'overdue_invoice',
    title: 'Overdue Milestone Invoice: Emaar Address Grand (INV-2026-077-2)',
    description: 'Final Handover milestone invoice of AED 137,500 was due on 2026-09-01 and is now 14 days overdue.',
    entityType: 'invoice',
    entityId: 'prj-077',
    entityCode: 'INV-2026-077-2',
    timestamp: '2026-09-14 09:00',
    resolved: false,
    recommendedAction: 'Contact Rashid Al Nuaimi at Emaar Accounts Payable with signed acceptance certificate.'
  },
  {
    id: 'alt-4',
    severity: 'warning',
    type: 'stale_opportunity',
    title: 'Stale Opportunity: Chalhoub Sephora Launch (OPP-103)',
    description: 'Estimated value AED 210,000. Inactive for 11 days with no next scheduled action or follow-up note.',
    entityType: 'opportunity',
    entityId: 'opp-103',
    entityCode: 'OPP-103',
    timestamp: '2026-09-14 08:30',
    resolved: false,
    recommendedAction: 'Commercial owner Liam Henderson to log follow-up meeting with Camille Lemaire.'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-09-14 16:20',
    userId: 'usr-4',
    userName: 'Maya Rayyan',
    action: 'Call Sheet Dispatched',
    details: 'Call sheet version 2.0 published and dispatched to 5 confirmed crew members for SHT-26-401.',
    entityType: 'Shoot',
    entityId: 'sht-401'
  },
  {
    id: 'aud-2',
    timestamp: '2026-09-13 14:15',
    userId: 'usr-2',
    userName: 'Nadia Cherif',
    action: 'Approved Variation Logged',
    details: 'Added +AED 15,000 variation for Al Fahidi night drone cinematography on TCS-26-081.',
    entityType: 'Project',
    entityId: 'prj-081'
  },
  {
    id: 'aud-3',
    timestamp: '2026-09-12 11:30',
    userId: 'usr-6',
    userName: 'Karim Farouk',
    action: 'Invoice Issued',
    details: 'Generated mobilization invoice INV-2026-086-1 for AED 97,500 on Chalhoub project.',
    entityType: 'Invoice',
    entityId: 'prj-086'
  }
];
