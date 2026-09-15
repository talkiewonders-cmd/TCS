import { ConnectedIntegration } from '../types/operatingPlatform';

export const INITIAL_INTEGRATIONS: ConnectedIntegration[] = [
  {
    id: 'int-teamup',
    name: 'Teamup Production Calendar',
    category: 'Calendar',
    iconName: 'Calendar',
    description: 'Bi-directional live synchronization of 20 crew sub-calendars, shoot schedules, and automated conflict alerts.',
    status: 'connected',
    lastSync: 'Live (Synchronized)',
    syncedRecordsCount: 20,
    syncDetails: '20 sub-calendar channels active: Albin, Ali, Anas, Ehsan, Faiyaj, Fouad, Freelancer, Idris Dawa, Lafi, Lama, Lambo, Mica, Mike, Ronald, Saif, Shaban, Shan, Varuna, Waqar.',
    authEmailOrId: 'tcs-ops@thecreativestory.ae • Key #ks123'
  },
  {
    id: 'int-xero',
    name: 'Xero Cloud ERP & Accounting',
    category: 'Accounting',
    iconName: 'DollarSign',
    description: 'Syncs Tax Invoices (with UAE 5% FTA VAT), automated bank feed reconciliation, and subcontractor purchase order costs.',
    status: 'connected',
    lastSync: '12 mins ago',
    syncedRecordsCount: 48,
    syncDetails: 'Auto-syncs customer records, VAT invoices, payment collection status, and supplier expense claims directly.',
    authEmailOrId: 'accounts@thecreativestory.ae (Organization: The Creative Story FZ-LLC)'
  },
  {
    id: 'int-dfpc',
    name: 'DFPC Dubai Film Permitting API',
    category: 'Government Permitting',
    iconName: 'ShieldCheck',
    description: 'Electronic permits connection with Dubai Film and TV Commission, DCAA drone clearances, and Dubai Police traffic approvals.',
    status: 'connected',
    lastSync: '45 mins ago',
    syncedRecordsCount: 8,
    syncDetails: 'Active integration with Government of Dubai DFPC E-Permit Gateway (Production House License #92182).',
    authEmailOrId: 'pro@thecreativestory.ae (PRO Code #DXB-DFPC-889)'
  },
  {
    id: 'int-frameio',
    name: 'Frame.io & Cloud Rushes Sync',
    category: 'Storage & Review',
    iconName: 'Clapperboard',
    description: 'Automated 4K camera rushes ingestion, timecode-accurate client revision threads, and ProRes master distribution.',
    status: 'connected',
    lastSync: '22 mins ago',
    syncedRecordsCount: 114,
    syncDetails: 'Active project workspaces connected with automated client review link generators and version control.',
    authEmailOrId: 'post@thecreativestory.ae (Team Creative Story Master)'
  },
  {
    id: 'int-whatsapp',
    name: 'WhatsApp Business API Gateway',
    category: 'Communication',
    iconName: 'MessageSquare',
    description: '1-Click verified call sheet PDF dispatches to crew mobile devices with instant read receipts and attendance confirmation.',
    status: 'connected',
    lastSync: '4 mins ago',
    syncedRecordsCount: 36,
    syncDetails: 'Meta Business Verified number +971 4 234 5678. Instant call sheet delivery & crew acknowledgement webhooks.',
    authEmailOrId: '+971 4 234 5678 (Verified Meta Cloud API)'
  }
];

export interface RoleResponsibility {
  roleId: string;
  roleTitle: string;
  assignedPerson: string;
  department: string;
  color: string;
  badge: string;
  primaryResponsibilities: string[];
  systemPermissions: string[];
  dailyWorkflow: string[];
}

export const OPERATIONAL_ROLES_PLAYBOOK: RoleResponsibility[] = [
  {
    roleId: 'bd',
    roleTitle: 'Head of Commercial & BD Lead',
    assignedPerson: 'Nadia Cherif',
    department: 'Business Development & Sales',
    color: '#3b82f6',
    badge: 'DEALS & REVENUE',
    primaryResponsibilities: [
      'Capturing inbound RFPs, client creative briefs, and agency partner inquiries.',
      'Logging potential deals into the CRM Pipeline with estimated budget and closing probability.',
      'Structuring pitch decks, commercial fee agreements, and payment milestone proposals (50/25/25).',
      'Winning deals and auto-converting won RFPs into active production projects with a single click.'
    ],
    systemPermissions: [
      'Create and edit CRM Opportunities',
      'View Client accounts & pitch history',
      'Set target gross profit margins',
      'Convert won deals into official production projects'
    ],
    dailyWorkflow: [
      'Morning: Review CRM stale deal alerts (>10 days without activity).',
      'Midday: Log new client brief requirements and prepare budget estimates.',
      'Closing: Update opportunity stage to "Won" to trigger project initialization for the line producer.'
    ]
  },
  {
    roleId: 'producer',
    roleTitle: 'Line Producer / Production Manager',
    assignedPerson: 'Maya Rayyan',
    department: 'Production Management',
    color: '#10b981',
    badge: 'OPERATIONS & SHOOTS',
    primaryResponsibilities: [
      'Creating new projects directly from client briefs or converting won CRM opportunities.',
      'Allocating line-item production budgets (crew, equipment, locations, catering, talent).',
      'Booking 20 crew channels on the Teamup Calendar and monitoring live crew availability.',
      'Applying for DFPC Dubai Film Commission permits, DCAA drone clearances, and police NOCs.',
      'Generating, locking, and dispatching daily call sheets with weather, crew times, and hospital locations.'
    ],
    systemPermissions: [
      'Create and configure new projects',
      'Book crew and equipment on calendar',
      'Upload and manage official permits & contracts',
      'Approve and dispatch call sheets',
      'Submit variation orders when client scope expands'
    ],
    dailyWorkflow: [
      'Morning: Check "Who\'s Free" Crew Availability Radar for upcoming shoot dates.',
      'Midday: Verify DFPC location permits and review call sheets with the Director of Photography.',
      'Evening: Lock call sheet and dispatch via WhatsApp integration to all confirmed crew members.'
    ]
  },
  {
    roleId: 'creative',
    roleTitle: 'Director of Photography (DOP)',
    assignedPerson: 'Sofia Rossi / Albin',
    department: 'Camera, Lighting & Creative',
    color: '#8b5cf6',
    badge: 'TECHNICAL ON-SET',
    primaryResponsibilities: [
      'Selecting camera package (Alexa Mini LF, FX6, RED V-Raptor) and cinema prime sets.',
      'Conducting technical kit checks and locking equipment check-out from internal inventory.',
      'Reviewing location permits, sunrise/golden hour angles, and power distribution with the gaffer.',
      'Supervising on-set camera crew, DIT media offloads, and color fidelity monitoring.'
    ],
    systemPermissions: [
      'View confirmed shoots and call sheets',
      'Reserve internal camera and lighting fleet items',
      'Access vendor technical spec sheets & look-up tables (LUTs)',
      'Sign off on camera prep and equipment condition logs'
    ],
    dailyWorkflow: [
      'Pre-light: Inspect rental gear and internal kit in Studio City / Al Quoz stage.',
      'Shoot Day: Direct camera team according to call sheet schedule and shot list.',
      'Wrap: Oversee DIT checksum checksum verification (Silverstack / ShotPut Pro) before media release.'
    ]
  },
  {
    roleId: 'finance',
    roleTitle: 'Finance & Operations Lead',
    assignedPerson: 'Karim Farouk',
    department: 'Finance, Cost Control & Accounts',
    color: '#f59e0b',
    badge: 'COSTS & CASHFLOW',
    primaryResponsibilities: [
      'Connecting and syncing Xero cloud accounting with the operating platform.',
      'Generating 5% UAE FTA VAT-compliant tax invoices as billing milestones are achieved.',
      'Tracking accounts receivable aging (current, 30 days, 60+ days overdue) and sending reminders.',
      'Auditing project cost category variance (committed purchase orders vs. actual supplier invoices).',
      'Guarding project gross profit margins (>40% target) and reviewing cost overruns.'
    ],
    systemPermissions: [
      'Full access to internal daily cost rates and payroll data',
      'Issue and manage tax invoices and billing milestones',
      'Sync Xero bank feeds and vendor invoices',
      'Approve supplier purchase orders and freelance disbursements'
    ],
    dailyWorkflow: [
      'Morning: Check bank feeds in Xero for milestone collections (Mobilization Deposits, Final 4K Masters).',
      'Midday: Audit shoot actuals against committed budgets and flag any margin compression.',
      'Month-end: File UAE FTA VAT 201 return and audit team utilization against KPI targets.'
    ]
  },
  {
    roleId: 'founder',
    roleTitle: 'Managing Director & Founder',
    assignedPerson: 'Tariq Al Mansoor',
    department: 'Executive Command',
    color: '#e50914',
    badge: 'EXECUTIVE COMMAND',
    primaryResponsibilities: [
      'Reviewing top-level company KPIs: Pipeline health, revenue run-rate, net profit margins.',
      'Authorizing major variation orders (>AED 50,000) and high-stakes enterprise contracts.',
      'Resolving cross-departmental scheduling conflicts and resource allocation bottlenecks.',
      'Ensuring operational compliance with UAE media regulations and brand reputation.'
    ],
    systemPermissions: [
      'Unrestricted master access across all platform modules',
      'Approve high-value variation orders and confidential executive rates',
      'Simulate any operational role to inspect workflows',
      'Configure system integrations and platform policies'
    ],
    dailyWorkflow: [
      'Morning: Review Command Center dashboard for real-time alerts and margin variances.',
      'Weekly: Conduct operational review of active shoots, team scorecards, and cash flow projections.'
    ]
  }
];
