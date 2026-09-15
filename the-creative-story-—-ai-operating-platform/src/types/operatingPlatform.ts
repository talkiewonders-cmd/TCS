export type UserRole = 
  | 'founder'       // Founder / Management: full command center, profitability, company KPIs, approvals and AI
  | 'bd'            // BD / Account: CRM, pipeline, clients, follow-ups, targets, won revenue and profit contribution
  | 'producer'      // Production / Producers: projects, budgets, shoots, resources, suppliers, schedules, costs and delivery
  | 'finance'       // Finance / Admin: budgets, cost records, invoices, collections and financial reporting
  | 'creative'      // Crew / Editors / Creatives: own bookings, assignments, call sheets, tasks and deliverables
  | 'freelancer';   // Freelancers (restricted): confirmed assignments only

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  department: 'Executive' | 'Business Development' | 'Production' | 'Camera & Tech' | 'Lighting & Grip' | 'Sound' | 'Post-Production' | 'Finance';
  employmentType: 'employee' | 'freelancer' | 'asset';
  avatar: string;
  phone: string;
  dailyCostRateAED: number;
  hourlyCostRateAED: number;
  skills: string[];
  capacityDaysPerMonth: number;
  activeStatus: 'Available' | 'On Shoot' | 'Booked' | 'On Leave';
  kpiScore: number;
}

export interface ClientContact {
  name: string;
  role: string;
  email: string;
  phone: string;
  isPrimary: boolean;
}

export interface Client {
  id: string;
  code: string;
  name: string;
  industry: string;
  tier: 'Enterprise' | 'Tier 1' | 'Growth' | 'Boutique';
  primaryContact: string;
  email: string;
  phone: string;
  location: string;
  relationshipOwnerId: string;
  relationshipOwnerName: string;
  totalWonRevenueAED: number;
  totalGrossProfitAED: number;
  averageMarginPercent: number;
  activeProjectsCount: number;
  totalProjectsCount: number;
  contacts: ClientContact[];
  pastScopes: string[];
  notes: string;
  riskRating: 'Low' | 'Medium' | 'High';
  aiSummary?: string;
}

export type OpportunityStage = 
  | 'Lead' 
  | 'Qualified' 
  | 'Brief Received' 
  | 'Proposal' 
  | 'Negotiation' 
  | 'Won' 
  | 'Lost' 
  | 'On Hold';

export interface ContributorSplit {
  userId: string;
  userName: string;
  splitPercentage: number;
  attributedRevenueAED: number;
  attributedProfitAED: number;
}

export interface Opportunity {
  id: string;
  code: string;
  title: string;
  clientId: string;
  clientName: string;
  primaryOwnerId: string;
  primaryOwnerName: string;
  contributors: ContributorSplit[];
  source: 'Referral' | 'Direct RFP' | 'Inbound Lead' | 'Agency Partner' | 'Past Client Rehire';
  scope: string;
  estimatedValueAED: number;
  probabilityPercent: number;
  weightedValueAED: number;
  stage: OpportunityStage;
  expectedCloseDate: string;
  lastActivityDate: string;
  nextActionDate: string;
  nextActionNote: string;
  actualWonValueAED?: number;
  lostReason?: string;
  convertedProjectId?: string;
  isStale: boolean; // Inactive >= 10 days with no next action
  notes: string;
  currency: 'AED';
}

export interface BillingMilestone {
  id: string;
  title: string;
  amountAED: number;
  percentage: number;
  dueDate: string;
  status: 'Pending' | 'Invoiced' | 'Collected' | 'Overdue';
  invoiceNumber?: string;
  invoiceDate?: string;
  paidDate?: string;
  agingDays?: number;
}

export interface BudgetCategory {
  id: string;
  category: 
    | 'Pre-Production & Creative' 
    | 'Director, DP & Crew' 
    | 'Camera & Lighting Equipment' 
    | 'Locations, Studio & Permits' 
    | 'Talent, Styling & HMU' 
    | 'Post-Production, Color & Sound' 
    | 'Travel, Transport & Catering' 
    | 'Contingency & Insurance';
  allocatedBudgetAED: number;
  committedCostAED: number;
  actualCostAED: number;
  forecastToCompleteAED: number;
}

export interface Deliverable {
  id: string;
  projectId: string;
  title: string;
  format: string; // '16:9 4K Master', '9:16 Reel', '1:1 Social Cut', 'Stills Suite'
  duration: string;
  languagesAndSubtitles: string[];
  status: 'Pre-Production' | 'Rough Cut V1' | 'Fine Cut V2' | 'Client Review' | 'Approved' | 'Delivered';
  dueDate: string;
  versionCount: number;
  aspectRatio: string;
  reviewLink?: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  category: 
    | 'Brief' 
    | 'Proposal' 
    | 'Signed PO' 
    | 'Call Sheet' 
    | 'Location Permit' 
    | 'DFPC Permit'
    | 'DCAA Drone'
    | 'Police Clearance'
    | 'Insurance COI'
    | 'Talent Release' 
    | 'Supplier Quote'
    | 'Storyboard / Script';
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  uploadedBy: string;
  url?: string;
  permitAuthority?: 'DFPC' | 'DCAA' | 'Dubai Police' | 'Civil Defense' | 'Dubai Municipality' | 'General';
  permitStatus?: 'Approved' | 'Pending Review' | 'Draft' | 'Expired';
  permitRef?: string;
  validUntil?: string;
}

export interface ConnectedIntegration {
  id: string;
  name: string;
  category: 'Accounting' | 'Calendar' | 'Storage & Review' | 'Government Permitting' | 'Communication';
  iconName: string;
  description: string;
  status: 'connected' | 'syncing' | 'needs_auth' | 'disconnected';
  lastSync: string;
  syncedRecordsCount: number;
  syncDetails: string;
  authEmailOrId: string;
}

export interface DecisionLogItem {
  id: string;
  timestamp: string;
  author: string;
  title: string;
  details: string;
  type: 'Scope Change' | 'Budget Approval' | 'Schedule Shift' | 'Creative Sign-off' | 'Client Milestone';
}

export type ProjectStatus = 
  | 'Pre-Production' 
  | 'Active Shoots' 
  | 'Post-Production' 
  | 'Client Review' 
  | 'Delivered & Invoiced' 
  | 'Completed & Closed';

export interface Project {
  id: string;
  code: string; // Unique Project Code linking all records e.g. TCS-26-081
  title: string;
  clientId: string;
  clientName: string;
  opportunityId?: string;
  status: ProjectStatus;
  serviceType: 'Commercial Campaign' | 'Brand Film' | 'Social Video Suite' | 'Documentary' | 'Corporate Series' | 'Virtual Production';
  contractValueAED: number;
  approvedVariationsAED: number;
  totalProjectRevenueAED: number; // contract + variations
  targetMarginPercent: number;
  
  // Direct project economics
  budgetCategories: BudgetCategory[];
  totalAllocatedBudgetAED: number;
  totalCommittedCostAED: number;
  totalActualCostAED: number;
  totalForecastCostAED: number; // actual + committed + forecast-to-complete
  forecastGrossProfitAED: number; // total revenue - total forecast cost
  forecastGrossMarginPercent: number; // (GP / revenue) * 100
  actualGrossProfitAED: number;
  actualGrossMarginPercent: number;
  marginVariancePercent: number; // forecast margin - target margin

  // Team
  accountOwnerId: string;
  accountOwnerName: string;
  producerId: string;
  producerName: string;
  creativeDirectorId: string;
  creativeDirectorName: string;
  leadEditorId: string;
  leadEditorName: string;

  // Schedule
  startDate: string;
  shootStartDate: string;
  shootEndDate: string;
  deliveryDate: string;
  finalInvoiceDate: string;

  // Linked components
  billingMilestones: BillingMilestone[];
  deliverables: Deliverable[];
  documents: ProjectDocument[];
  decisionLog: DecisionLogItem[];
  shootCount: number;
}

export interface ShootCrewRole {
  role: string;
  memberId: string;
  memberName: string;
  status: 'Tentative Hold' | 'Confirmed' | 'Declined';
  callTime: string;
  dayRateAED: number;
  contactNumber: string;
}

export interface ShootEquipmentItem {
  id: string;
  category: string;
  description: string;
  supplier: string;
  status: 'Reserved' | 'Dispatched' | 'On Set' | 'Returned';
  dailyCostAED: number;
}

export interface ShootLogistics {
  locationName: string;
  locationAddress: string;
  locationAccessNotes: string;
  permitNumber: string;
  permitStatus: 'Approved' | 'Pending' | 'Exempt';
  cateringPlan: string;
  nearestHospital: string;
  hospitalPhone: string;
  weatherForecast: string;
  transportPlan: string;
  parkingNotes: string;
}

export interface Shoot {
  id: string;
  code: string; // SHT-26-401
  projectId: string;
  projectCode: string;
  projectTitle: string;
  clientName: string;
  shootTitle: string;
  shootDate: string;
  callTime: string;
  wrapTime: string;
  status: 'Scheduled' | 'Pre-light' | 'In Production' | 'Wrapped' | 'Cancelled';
  logistics: ShootLogistics;
  crew: ShootCrewRole[];
  talentAndExtras: string[];
  equipment: ShootEquipmentItem[];
  
  // Costing
  estimatedShootCostAED: number;
  committedShootCostAED: number;
  actualShootCostAED: number;
  overtimeHours: number;
  overtimeCostAED: number;
  completionNotes: string;
  callSheetApproved: boolean;
  lastCallSheetUpdate: string;
}

export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceType: 'employee' | 'freelancer' | 'equipment' | 'crew';
  roleOrCategory: string;
  projectId: string;
  projectCode: string;
  projectTitle: string;
  shootId?: string;
  date: string; // YYYY-MM-DD
  startTime: string;
  endTime: string;
  status: 'Tentative Hold' | 'Confirmed' | 'Cancelled' | 'Completed';
  hasConflict: boolean;
  conflictReason?: string;
  notes?: string;
}

export interface EquipmentResource {
  id: string;
  code: string;
  name: string;
  category: 'Camera System' | 'Cinema Lenses' | 'Lighting & Astera' | 'Grip & Dolly' | 'Audio & Wireless' | 'DIT & Monitoring' | 'Drone & Gimbal';
  currentStatus: 'Available' | 'Booked On Set' | 'In Maintenance' | 'Tentative Hold';
  dailyRateAED: number;
  replacementValueAED: number;
  assignedShootCode?: string;
  location: string;
}

export interface KPIMetric {
  metricKey: string;
  name: string;
  targetValue: number;
  actualValue: number;
  achievementRatePercent: number;
  weightPercent: number;
  unit: 'AED' | '%' | 'count' | 'days' | 'score';
  formulaExplanation: string;
  auditedCalculation: string;
  status: 'Exceeding' | 'On Track' | 'Needs Attention' | 'Critical';
}

export interface RoleKPIScorecard {
  userId: string;
  userName: string;
  role: UserRole;
  period: string; // 'September 2026' | 'Q3 2026' | 'YTD 2026'
  compositeScore: number; // 0 - 100
  overallStatus: 'Exceeding' | 'On Track' | 'At Risk' | 'Needs Attention';
  metrics: KPIMetric[];
  evaluatorNotes: string;
  lastAuditedDate: string;
}

export interface SystemAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  type: 
    | 'low_margin' 
    | 'cost_overrun' 
    | 'overdue_invoice' 
    | 'stale_opportunity' 
    | 'booking_conflict' 
    | 'late_delivery' 
    | 'missing_info';
  title: string;
  description: string;
  entityType: 'project' | 'opportunity' | 'shoot' | 'booking' | 'client' | 'invoice';
  entityId: string;
  entityCode: string;
  timestamp: string;
  resolved: boolean;
  recommendedAction: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: string;
  details: string;
  entityType: string;
  entityId: string;
}

export interface CompanyFilterState {
  period: 'day' | 'week' | 'month' | 'quarter' | 'year';
  clientId: string;
  department: string;
  employeeId: string;
  projectType: string;
  status: string;
}
