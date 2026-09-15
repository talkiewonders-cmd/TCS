import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  Client, 
  Opportunity, 
  Project, 
  Shoot, 
  Booking, 
  EquipmentResource, 
  RoleKPIScorecard, 
  SystemAlert, 
  AuditLog, 
  CompanyFilterState,
  ProjectStatus,
  ProjectDocument,
  ConnectedIntegration
} from '../types/operatingPlatform';
import { 
  INITIAL_USERS, 
  INITIAL_CLIENTS, 
  INITIAL_OPPORTUNITIES, 
  INITIAL_PROJECTS, 
  INITIAL_SHOOTS, 
  INITIAL_BOOKINGS, 
  INITIAL_EQUIPMENT, 
  INITIAL_ROLE_KPIS, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockDatabase';
import { INITIAL_INTEGRATIONS } from '../data/integrationsData';

export type ActiveScreen = 
  | 'command-center'
  | 'crm'
  | 'clients'
  | 'projects'
  | 'shoots'
  | 'calendar'
  | 'team'
  | 'kpi'
  | 'finance'
  | 'ai'
  | 'spec-hub';

interface PlatformContextType {
  activeScreen: ActiveScreen;
  setActiveScreen: (screen: ActiveScreen) => void;
  currentUser: User;
  setCurrentUserRole: (role: UserRole) => void;
  users: User[];
  clients: Client[];
  opportunities: Opportunity[];
  projects: Project[];
  shoots: Shoot[];
  bookings: Booking[];
  equipment: EquipmentResource[];
  kpiScorecards: RoleKPIScorecard[];
  alerts: SystemAlert[];
  auditLogs: AuditLog[];
  filters: CompanyFilterState;
  setFilters: React.Dispatch<React.SetStateAction<CompanyFilterState>>;
  
  // Navigation & selection helpers
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  selectedClientId: string;
  setSelectedClientId: (id: string) => void;
  selectedShootId: string;
  setSelectedShootId: (id: string) => void;
  navigateToRecord: (type: 'project' | 'opportunity' | 'shoot' | 'client' | 'conflict' | 'invoice', idOrCode: string) => void;

  // Actions
  addProject: (projectData: Partial<Project>) => Project;
  updateProjectStatus: (projectId: string, status: ProjectStatus) => void;
  addProjectDocument: (projectId: string, doc: Omit<ProjectDocument, 'id' | 'uploadedAt' | 'uploadedBy'>) => void;
  deleteProjectDocument: (projectId: string, docId: string) => void;
  addShoot: (shootData: Partial<Shoot>) => Shoot;
  addBooking: (bookingData: Partial<Booking>) => Booking;
  convertOpportunityToProject: (oppId: string) => Project | null;
  addOpportunity: (opp: Partial<Opportunity>) => Opportunity;
  updateOpportunityStage: (oppId: string, newStage: Opportunity['stage']) => void;
  resolveAlert: (alertId: string) => void;
  resolveBookingConflict: (bookingId: string, action: 'reschedule' | 'reassign') => void;
  addProjectVariation: (projectId: string, variationAmount: number, reason: string) => void;
  updateCallSheetApproval: (shootId: string, approved: boolean) => void;
  addAuditLog: (action: string, details: string, entityType: string, entityId: string) => void;

  // Integrations
  integrations: ConnectedIntegration[];
  syncIntegration: (id: string) => Promise<void>;
  toggleIntegration: (id: string) => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeScreen, setActiveScreen] = useState<ActiveScreen>('command-center');
  const [currentRole, setCurrentRole] = useState<UserRole>('founder');
  const [users] = useState<User[]>(INITIAL_USERS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(INITIAL_OPPORTUNITIES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [shoots, setShoots] = useState<Shoot[]>(INITIAL_SHOOTS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [equipment] = useState<EquipmentResource[]>(INITIAL_EQUIPMENT);
  const [kpiScorecards] = useState<RoleKPIScorecard[]>(INITIAL_ROLE_KPIS);
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  const [integrations, setIntegrations] = useState<ConnectedIntegration[]>(INITIAL_INTEGRATIONS);

  const [selectedProjectId, setSelectedProjectId] = useState<string>('prj-081');
  const [selectedClientId, setSelectedClientId] = useState<string>('cli-1');
  const [selectedShootId, setSelectedShootId] = useState<string>('sht-401');

  const [filters, setFilters] = useState<CompanyFilterState>({
    period: 'month',
    clientId: 'all',
    department: 'all',
    employeeId: 'all',
    projectType: 'all',
    status: 'all'
  });

  // Current logged in user based on active role
  const currentUser = users.find(u => u.role === currentRole) || users[0];

  const setCurrentUserRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const addAuditLog = (action: string, details: string, entityType: string, entityId: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      userId: currentUser.id,
      userName: currentUser.name,
      action,
      details,
      entityType,
      entityId
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Convert Won Opportunity to Project
  const convertOpportunityToProject = (oppId: string): Project | null => {
    const opp = opportunities.find(o => o.id === oppId);
    if (!opp) return null;

    const newProjectCode = `TCS-26-0${projects.length + 85}`;
    const newProjectId = `prj-${Date.now()}`;
    const targetMargin = 40.0;
    const contractValue = opp.estimatedValueAED;
    const estCost = Math.round(contractValue * (1 - targetMargin / 100));

    const newProject: Project = {
      id: newProjectId,
      code: newProjectCode,
      title: opp.title,
      clientId: opp.clientId,
      clientName: opp.clientName,
      opportunityId: opp.id,
      status: 'Pre-Production',
      serviceType: 'Commercial Campaign',
      contractValueAED: contractValue,
      approvedVariationsAED: 0,
      totalProjectRevenueAED: contractValue,
      targetMarginPercent: targetMargin,
      budgetCategories: [
        { id: 'b-new-1', category: 'Pre-Production & Creative', allocatedBudgetAED: Math.round(estCost * 0.15), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.15) },
        { id: 'b-new-2', category: 'Director, DP & Crew', allocatedBudgetAED: Math.round(estCost * 0.35), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.35) },
        { id: 'b-new-3', category: 'Camera & Lighting Equipment', allocatedBudgetAED: Math.round(estCost * 0.20), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.20) },
        { id: 'b-new-4', category: 'Locations, Studio & Permits', allocatedBudgetAED: Math.round(estCost * 0.10), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.10) },
        { id: 'b-new-5', category: 'Post-Production, Color & Sound', allocatedBudgetAED: Math.round(estCost * 0.15), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.15) },
        { id: 'b-new-6', category: 'Contingency & Insurance', allocatedBudgetAED: Math.round(estCost * 0.05), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.05) }
      ],
      totalAllocatedBudgetAED: estCost,
      totalCommittedCostAED: 0,
      totalActualCostAED: 0,
      totalForecastCostAED: estCost,
      forecastGrossProfitAED: contractValue - estCost,
      forecastGrossMarginPercent: targetMargin,
      actualGrossProfitAED: contractValue,
      actualGrossMarginPercent: 100,
      marginVariancePercent: 0,
      accountOwnerId: opp.primaryOwnerId,
      accountOwnerName: opp.primaryOwnerName,
      producerId: 'usr-4',
      producerName: 'Maya Rayyan',
      creativeDirectorId: 'usr-1',
      creativeDirectorName: 'Tariq Al Mansoor',
      leadEditorId: 'usr-8',
      leadEditorName: 'Alex Chen',
      startDate: new Date().toISOString().slice(0, 10),
      shootStartDate: '2026-10-05',
      shootEndDate: '2026-10-07',
      deliveryDate: '2026-10-28',
      finalInvoiceDate: '2026-11-05',
      billingMilestones: [
        { id: `bm-${Date.now()}-1`, title: '50% Mobilization Deposit', amountAED: contractValue * 0.5, percentage: 50, dueDate: new Date().toISOString().slice(0, 10), status: 'Pending' },
        { id: `bm-${Date.now()}-2`, title: '25% First Cut Review', amountAED: contractValue * 0.25, percentage: 25, dueDate: '2026-10-18', status: 'Pending' },
        { id: `bm-${Date.now()}-3`, title: '25% Final 4K Master Dispatched', amountAED: contractValue * 0.25, percentage: 25, dueDate: '2026-11-05', status: 'Pending' }
      ],
      deliverables: [
        { id: `del-${Date.now()}-1`, projectId: newProjectId, title: `${opp.title} Master Film`, format: '16:9 4K Master', duration: '60s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Pre-Production', dueDate: '2026-10-25', versionCount: 1, aspectRatio: '16:9' },
        { id: `del-${Date.now()}-2`, projectId: newProjectId, title: 'Social Cinema Cutdowns (4x)', format: '9:16 Reel', duration: '15s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Pre-Production', dueDate: '2026-10-28', versionCount: 1, aspectRatio: '9:16' }
      ],
      documents: [
        { id: `doc-${Date.now()}-1`, title: `${opp.title} Scope & Brief`, category: 'Brief', fileName: `${opp.code}_Approved_Scope.pdf`, fileSize: '4.2 MB', uploadedAt: new Date().toISOString().slice(0, 10), uploadedBy: currentUser.name }
      ],
      decisionLog: [
        { id: `dec-${Date.now()}-1`, timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16), author: currentUser.name, title: 'Opportunity Won & Project Created', details: `Automatically transitioned from opportunity ${opp.code} with approved contract value AED ${contractValue.toLocaleString()}.`, type: 'Client Milestone' }
      ],
      shootCount: 0
    };

    // Update opportunity
    setOpportunities(prev => prev.map(o => o.id === oppId ? {
      ...o,
      stage: 'Won',
      probabilityPercent: 100,
      actualWonValueAED: contractValue,
      convertedProjectId: newProjectId
    } : o));

    // Append project
    setProjects(prev => [newProject, ...prev]);

    // Update client stats
    setClients(prev => prev.map(c => c.id === opp.clientId ? {
      ...c,
      totalWonRevenueAED: c.totalWonRevenueAED + contractValue,
      totalProjectsCount: c.totalProjectsCount + 1,
      activeProjectsCount: c.activeProjectsCount + 1
    } : c));

    addAuditLog(
      'Opportunity Converted to Project',
      `Converted won deal ${opp.code} (${opp.title}) into active project ${newProjectCode} (AED ${contractValue.toLocaleString()}).`,
      'Project',
      newProjectId
    );

    setSelectedProjectId(newProjectId);
    setActiveScreen('projects');
    return newProject;
  };

  const addOpportunity = (newOppData: Partial<Opportunity>): Opportunity => {
    const oppCode = `OPP-${100 + opportunities.length + 1}`;
    const oppId = `opp-${Date.now()}`;
    const client = clients.find(c => c.id === newOppData.clientId) || clients[0];
    const value = newOppData.estimatedValueAED || 200000;
    const prob = newOppData.probabilityPercent || 50;

    const fullOpp: Opportunity = {
      id: oppId,
      code: oppCode,
      title: newOppData.title || 'New Production Opportunity',
      clientId: client.id,
      clientName: client.name,
      primaryOwnerId: newOppData.primaryOwnerId || currentUser.id,
      primaryOwnerName: users.find(u => u.id === (newOppData.primaryOwnerId || currentUser.id))?.name || currentUser.name,
      contributors: [
        {
          userId: newOppData.primaryOwnerId || currentUser.id,
          userName: users.find(u => u.id === (newOppData.primaryOwnerId || currentUser.id))?.name || currentUser.name,
          splitPercentage: 100,
          attributedRevenueAED: value,
          attributedProfitAED: Math.round(value * 0.4)
        }
      ],
      source: newOppData.source || 'Direct RFP',
      scope: newOppData.scope || 'Brand Film, social cutdowns, full sound design & color grade.',
      estimatedValueAED: value,
      probabilityPercent: prob,
      weightedValueAED: Math.round((value * prob) / 100),
      stage: newOppData.stage || 'Brief Received',
      expectedCloseDate: newOppData.expectedCloseDate || '2026-10-30',
      lastActivityDate: new Date().toISOString().slice(0, 10),
      nextActionDate: newOppData.nextActionDate || '2026-09-25',
      nextActionNote: newOppData.nextActionNote || 'Submit creative pitch deck and budget estimation.',
      isStale: false,
      notes: newOppData.notes || 'Created via Operating Platform CRM.',
      currency: 'AED'
    };

    setOpportunities(prev => [fullOpp, ...prev]);
    addAuditLog('New Opportunity Logged', `Created pipeline opportunity ${oppCode}: ${fullOpp.title} (AED ${value.toLocaleString()}).`, 'Opportunity', oppId);
    return fullOpp;
  };

  const updateOpportunityStage = (oppId: string, newStage: Opportunity['stage']) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === oppId) {
        const prob = newStage === 'Won' ? 100 : newStage === 'Lost' ? 0 : newStage === 'Negotiation' ? 80 : newStage === 'Proposal' ? 60 : 30;
        return {
          ...o,
          stage: newStage,
          probabilityPercent: prob,
          weightedValueAED: Math.round((o.estimatedValueAED * prob) / 100),
          lastActivityDate: new Date().toISOString().slice(0, 10),
          isStale: false
        };
      }
      return o;
    }));

    addAuditLog('Opportunity Stage Changed', `Opportunity ${oppId} updated to ${newStage}.`, 'Opportunity', oppId);

    if (newStage === 'Won') {
      convertOpportunityToProject(oppId);
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, resolved: true } : a));
    addAuditLog('Alert Resolved', `System alert ${alertId} marked as addressed.`, 'Alert', alertId);
  };

  const resolveBookingConflict = (bookingId: string, action: 'reschedule' | 'reassign') => {
    if (action === 'reschedule') {
      // Shift date of the conflicting booking to Sept 18
      setBookings(prev => prev.map(b => {
        if (b.id === bookingId || b.id === 'bkg-2') {
          return {
            ...b,
            date: '2026-09-18',
            hasConflict: false,
            conflictReason: undefined,
            status: 'Confirmed'
          };
        }
        if (b.id === 'bkg-1') {
          return {
            ...b,
            hasConflict: false,
            conflictReason: undefined
          };
        }
        return b;
      }));

      // Update shoot
      setShoots(prev => prev.map(s => {
        if (s.id === 'sht-405') {
          return {
            ...s,
            shootDate: '2026-09-18',
            status: 'Scheduled',
            callSheetApproved: true,
            completionNotes: 'Conflict resolved: Rescheduled Stage A shoot to Sept 18.'
          };
        }
        return s;
      }));

      // Mark alert resolved
      setAlerts(prev => prev.map(a => a.id === 'alt-1' ? { ...a, resolved: true } : a));

      addAuditLog('Crew Conflict Resolved', 'Rescheduled Chalhoub Stage A pre-light to September 18. Sofia Rossi and Arri Mini LF cleared.', 'Booking', bookingId);
    } else {
      // Reassign to Tariq or alternate DP
      setBookings(prev => prev.map(b => {
        if (b.id === bookingId || b.id === 'bkg-2') {
          return {
            ...b,
            resourceId: 'usr-1',
            resourceName: 'Tariq Al Mansoor',
            hasConflict: false,
            conflictReason: undefined
          };
        }
        if (b.id === 'bkg-1') {
          return {
            ...b,
            hasConflict: false,
            conflictReason: undefined
          };
        }
        return b;
      }));

      setShoots(prev => prev.map(s => {
        if (s.id === 'sht-405') {
          return {
            ...s,
            crew: s.crew.map(c => c.role.includes('DP') ? { ...c, memberId: 'usr-1', memberName: 'Tariq Al Mansoor', status: 'Confirmed' } : c),
            completionNotes: 'Conflict resolved: Reassigned DP to Tariq Al Mansoor for studio test.'
          };
        }
        return s;
      }));

      setAlerts(prev => prev.map(a => a.id === 'alt-1' ? { ...a, resolved: true } : a));
      addAuditLog('Crew Conflict Resolved', 'Reassigned DP for SHT-26-405 to Tariq Al Mansoor.', 'Booking', bookingId);
    }
  };

  const addProjectVariation = (projectId: string, variationAmount: number, reason: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        const newApprovedVar = p.approvedVariationsAED + variationAmount;
        const newTotalRev = p.contractValueAED + newApprovedVar;
        const newGrossProfit = newTotalRev - p.totalForecastCostAED;
        const newMargin = (newGrossProfit / newTotalRev) * 100;
        return {
          ...p,
          approvedVariationsAED: newApprovedVar,
          totalProjectRevenueAED: newTotalRev,
          forecastGrossProfitAED: newGrossProfit,
          forecastGrossMarginPercent: parseFloat(newMargin.toFixed(1)),
          marginVariancePercent: parseFloat((newMargin - p.targetMarginPercent).toFixed(1)),
          decisionLog: [
            {
              id: `dec-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              author: currentUser.name,
              title: `Approved Variation +AED ${variationAmount.toLocaleString()}`,
              details: reason,
              type: 'Scope Change'
            },
            ...p.decisionLog
          ]
        };
      }
      return p;
    }));

    addAuditLog('Project Variation Approved', `Added variation of +AED ${variationAmount.toLocaleString()} to project ${projectId}: ${reason}`, 'Project', projectId);
  };

  const updateCallSheetApproval = (shootId: string, approved: boolean) => {
    setShoots(prev => prev.map(s => {
      if (s.id === shootId) {
        return {
          ...s,
          callSheetApproved: approved,
          lastCallSheetUpdate: new Date().toISOString().replace('T', ' ').slice(0, 16)
        };
      }
      return s;
    }));

    addAuditLog(
      approved ? 'Call Sheet Approved & Dispatched' : 'Call Sheet Unlocked for Editing',
      `Shoot ${shootId} call sheet status changed to ${approved ? 'Dispatched' : 'Draft'}.`,
      'Shoot',
      shootId
    );
  };

  const addProject = (projectData: Partial<Project>): Project => {
    const nextNum = projects.length + 86;
    const projectCode = `TCS-26-0${nextNum}`;
    const projectId = `prj-${Date.now()}`;
    const contractValue = projectData.contractValueAED || 150000;
    const targetMargin = projectData.targetMarginPercent || 40.0;
    const estCost = Math.round(contractValue * (1 - targetMargin / 100));
    const client = clients.find(c => c.id === projectData.clientId) || clients[0];

    const newProject: Project = {
      id: projectId,
      code: projectCode,
      title: projectData.title || 'New Production Campaign',
      clientId: client.id,
      clientName: client.name,
      status: projectData.status || 'Pre-Production',
      serviceType: projectData.serviceType || 'Commercial Campaign',
      contractValueAED: contractValue,
      approvedVariationsAED: 0,
      totalProjectRevenueAED: contractValue,
      targetMarginPercent: targetMargin,
      budgetCategories: [
        { id: `b-${Date.now()}-1`, category: 'Pre-Production & Creative', allocatedBudgetAED: Math.round(estCost * 0.15), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.15) },
        { id: `b-${Date.now()}-2`, category: 'Director, DP & Crew', allocatedBudgetAED: Math.round(estCost * 0.35), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.35) },
        { id: `b-${Date.now()}-3`, category: 'Camera & Lighting Equipment', allocatedBudgetAED: Math.round(estCost * 0.20), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.20) },
        { id: `b-${Date.now()}-4`, category: 'Locations, Studio & Permits', allocatedBudgetAED: Math.round(estCost * 0.10), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.10) },
        { id: `b-${Date.now()}-5`, category: 'Post-Production, Color & Sound', allocatedBudgetAED: Math.round(estCost * 0.15), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.15) },
        { id: `b-${Date.now()}-6`, category: 'Contingency & Insurance', allocatedBudgetAED: Math.round(estCost * 0.05), committedCostAED: 0, actualCostAED: 0, forecastToCompleteAED: Math.round(estCost * 0.05) }
      ],
      totalAllocatedBudgetAED: estCost,
      totalCommittedCostAED: 0,
      totalActualCostAED: 0,
      totalForecastCostAED: estCost,
      forecastGrossProfitAED: contractValue - estCost,
      forecastGrossMarginPercent: targetMargin,
      actualGrossProfitAED: contractValue,
      actualGrossMarginPercent: 100,
      marginVariancePercent: 0,
      accountOwnerId: projectData.accountOwnerId || currentUser.id,
      accountOwnerName: projectData.accountOwnerName || currentUser.name,
      producerId: projectData.producerId || 'usr-4',
      producerName: projectData.producerName || 'Maya Rayyan',
      creativeDirectorId: projectData.creativeDirectorId || 'usr-1',
      creativeDirectorName: projectData.creativeDirectorName || 'Tariq Al Mansoor',
      leadEditorId: 'usr-8',
      leadEditorName: 'Alex Chen',
      startDate: projectData.startDate || new Date().toISOString().slice(0, 10),
      shootStartDate: projectData.shootStartDate || '2026-10-10',
      shootEndDate: projectData.shootEndDate || '2026-10-12',
      deliveryDate: projectData.deliveryDate || '2026-11-01',
      finalInvoiceDate: '2026-11-15',
      billingMilestones: [
        { id: `bm-${Date.now()}-1`, title: '50% Mobilization Deposit', amountAED: contractValue * 0.5, percentage: 50, dueDate: new Date().toISOString().slice(0, 10), status: 'Pending' },
        { id: `bm-${Date.now()}-2`, title: '25% First Cut Review', amountAED: contractValue * 0.25, percentage: 25, dueDate: '2026-10-20', status: 'Pending' },
        { id: `bm-${Date.now()}-3`, title: '25% Final Master Dispatched', amountAED: contractValue * 0.25, percentage: 25, dueDate: '2026-11-01', status: 'Pending' }
      ],
      deliverables: projectData.deliverables && projectData.deliverables.length > 0 ? projectData.deliverables : [
        { id: `del-${Date.now()}-1`, projectId: projectId, title: `${projectData.title || 'Brand'} Hero Film`, format: '16:9 4K Master', duration: '60s', languagesAndSubtitles: ['Arabic', 'English'], status: 'Pre-Production', dueDate: projectData.deliveryDate || '2026-11-01', versionCount: 1, aspectRatio: '16:9' }
      ],
      documents: [
        { 
          id: `doc-${Date.now()}-1`, 
          title: `${projectData.title || 'Project'} Kickoff Scope & Specs`, 
          category: 'Brief', 
          fileName: `${projectCode}_Project_Brief.pdf`, 
          fileSize: '3.4 MB', 
          uploadedAt: new Date().toISOString().slice(0, 10), 
          uploadedBy: currentUser.name 
        }
      ],
      decisionLog: [
        { 
          id: `dec-${Date.now()}-1`, 
          timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16), 
          author: currentUser.name, 
          title: 'Project Initialized in Operating Platform', 
          details: `Commissioned by ${currentUser.name} for ${client.name} with contract value AED ${contractValue.toLocaleString()} and target gross margin ${targetMargin}%.`, 
          type: 'Client Milestone' 
        }
      ],
      shootCount: 0
    };

    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    addAuditLog('New Project Created', `Created project ${projectCode} (${newProject.title}) with target budget AED ${contractValue.toLocaleString()}.`, 'Project', newProject.id);
    return newProject;
  };

  const updateProjectStatus = (projectId: string, status: ProjectStatus) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          status,
          decisionLog: [
            {
              id: `dec-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              author: currentUser.name,
              title: `Milestone Phase Advanced: ${status}`,
              details: `Project stage moved to ${status} by ${currentUser.name}.`,
              type: 'Client Milestone'
            },
            ...p.decisionLog
          ]
        };
      }
      return p;
    }));
    addAuditLog('Project Phase Advanced', `Project ${projectId} moved to ${status}.`, 'Project', projectId);
  };

  const addProjectDocument = (projectId: string, doc: Omit<ProjectDocument, 'id' | 'uploadedAt' | 'uploadedBy'>) => {
    const newDoc: ProjectDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
      uploadedAt: new Date().toISOString().slice(0, 10),
      uploadedBy: currentUser.name
    };

    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          documents: [newDoc, ...p.documents],
          decisionLog: [
            {
              id: `dec-${Date.now()}`,
              timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
              author: currentUser.name,
              title: `Document Uploaded: ${newDoc.title}`,
              details: `Uploaded ${newDoc.fileName} (${newDoc.category}${newDoc.permitRef ? ` • Ref: ${newDoc.permitRef}` : ''}).`,
              type: 'Client Milestone'
            },
            ...p.decisionLog
          ]
        };
      }
      return p;
    }));

    addAuditLog('Document Uploaded', `Uploaded document ${newDoc.title} to project ${projectId}.`, 'Project', projectId);
  };

  const deleteProjectDocument = (projectId: string, docId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          documents: p.documents.filter(d => d.id !== docId)
        };
      }
      return p;
    }));
    addAuditLog('Document Removed', `Removed document ${docId} from project ${projectId}.`, 'Project', projectId);
  };

  const addShoot = (shootData: Partial<Shoot>): Shoot => {
    const shootCode = `SHT-26-${400 + shoots.length + 1}`;
    const shootId = `sht-${Date.now()}`;
    const proj = projects.find(p => p.id === (shootData.projectId || selectedProjectId)) || projects[0];
    
    const newShoot: Shoot = {
      id: shootId,
      code: shootCode,
      projectId: proj.id,
      projectCode: proj.code,
      projectTitle: proj.title,
      clientName: proj.clientName,
      shootTitle: shootData.shootTitle || `Principal Photography Day ${shoots.length + 1}`,
      shootDate: shootData.shootDate || '2026-10-15',
      callTime: shootData.callTime || '06:00 GST',
      wrapTime: shootData.wrapTime || '18:30 GST',
      status: 'Scheduled',
      callSheetApproved: false,
      lastCallSheetUpdate: new Date().toISOString().replace('T', ' ').slice(0, 16),
      logistics: shootData.logistics || {
        locationName: 'Studio City Stage A, Dubai',
        locationAddress: 'Dubai Studio City, Sound Stage A, Hessa Street',
        locationAccessNotes: 'Gate 4 security clearance for TCS production crew',
        permitNumber: 'DFPC-2026-9218',
        permitStatus: 'Approved',
        cateringPlan: 'Artisan Hot Breakfast & Lunch for 24 crew (Al Quoz Gourmet)',
        nearestHospital: 'Mediclinic Parkview Hospital, Al Barsha South',
        hospitalPhone: '+971 4 435 9999',
        weatherForecast: '32°C Clear, Low Wind',
        transportPlan: '2x Production Sprinter Vans from Al Quoz HQ',
        parkingNotes: 'Dedicated Crew Parking at Bay 12-20'
      },
      crew: shootData.crew || [
        { role: 'Director of Photography', memberId: 'usr-5', memberName: 'Sofia Rossi', status: 'Confirmed', callTime: '06:00 GST', dayRateAED: 4500, contactNumber: '+971 50 234 5678' }
      ],
      talentAndExtras: shootData.talentAndExtras || ['Lead Commercial Actor (1)', 'Featured Talent (2)'],
      equipment: shootData.equipment || [
        { id: 'eq-1', category: 'Camera Package', description: 'Arri Alexa Mini LF 4.5K + Zeiss Supreme Primes', supplier: 'Internal Fleet', status: 'Reserved', dailyCostAED: 4800 }
      ],
      estimatedShootCostAED: shootData.estimatedShootCostAED || 38000,
      committedShootCostAED: shootData.committedShootCostAED || 35000,
      actualShootCostAED: 0,
      overtimeHours: 0,
      overtimeCostAED: 0,
      completionNotes: 'Scheduled via Shoot Manager.'
    };

    setShoots(prev => [newShoot, ...prev]);
    setSelectedShootId(newShoot.id);
    addAuditLog('Shoot Scheduled', `Created shoot ${shootCode} on ${newShoot.shootDate}.`, 'Shoot', newShoot.id);
    return newShoot;
  };

  const addBooking = (bookingData: Partial<Booking>): Booking => {
    const proj = projects.find(p => p.id === (bookingData.projectId || selectedProjectId)) || projects[0];
    const newBooking: Booking = {
      id: `bkg-${Date.now()}`,
      resourceId: bookingData.resourceId || 'usr-5',
      resourceName: bookingData.resourceName || 'Sofia Rossi',
      resourceType: bookingData.resourceType || 'crew',
      roleOrCategory: bookingData.roleOrCategory || 'Director of Photography',
      projectId: proj.id,
      projectCode: proj.code,
      projectTitle: proj.title,
      shootId: bookingData.shootId || selectedShootId,
      date: bookingData.date || new Date().toISOString().slice(0, 10),
      startTime: bookingData.startTime || '06:00',
      endTime: bookingData.endTime || '18:30',
      status: 'Confirmed',
      hasConflict: false,
      notes: bookingData.notes || 'Booked via Teamup calendar dispatcher.'
    };

    setBookings(prev => [newBooking, ...prev]);
    addAuditLog('Resource Booked', `Booked ${newBooking.resourceName} for ${newBooking.date}.`, 'Booking', newBooking.id);
    return newBooking;
  };

  const syncIntegration = async (id: string): Promise<void> => {
    setIntegrations(prev => prev.map(item => item.id === id ? { ...item, status: 'syncing' } : item));
    await new Promise(resolve => setTimeout(resolve, 800));
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: 'connected',
          lastSync: 'Just now',
          syncedRecordsCount: item.syncedRecordsCount + 1
        };
      }
      return item;
    }));
    addAuditLog('Integration Synced', `Synchronized ${id} data records.`, 'Integration', id);
  };

  const toggleIntegration = (id: string) => {
    setIntegrations(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === 'connected' ? 'disconnected' : 'connected';
        return { ...item, status: nextStatus };
      }
      return item;
    }));
  };

  const navigateToRecord = (type: 'project' | 'opportunity' | 'shoot' | 'client' | 'conflict' | 'invoice', idOrCode: string) => {
    if (type === 'project') {
      const match = projects.find(p => p.id === idOrCode || p.code === idOrCode);
      if (match) setSelectedProjectId(match.id);
      setActiveScreen('projects');
    } else if (type === 'opportunity') {
      setActiveScreen('crm');
    } else if (type === 'shoot') {
      const match = shoots.find(s => s.id === idOrCode || s.code === idOrCode);
      if (match) setSelectedShootId(match.id);
      setActiveScreen('shoots');
    } else if (type === 'client') {
      const match = clients.find(c => c.id === idOrCode || c.code === idOrCode);
      if (match) setSelectedClientId(match.id);
      setActiveScreen('clients');
    } else if (type === 'conflict') {
      setActiveScreen('calendar');
    } else if (type === 'invoice') {
      setActiveScreen('finance');
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        activeScreen,
        setActiveScreen,
        currentUser,
        setCurrentUserRole,
        users,
        clients,
        opportunities,
        projects,
        shoots,
        bookings,
        equipment,
        kpiScorecards,
        alerts,
        auditLogs,
        filters,
        setFilters,
        selectedProjectId,
        setSelectedProjectId,
        selectedClientId,
        setSelectedClientId,
        selectedShootId,
        setSelectedShootId,
        navigateToRecord,
        addProject,
        updateProjectStatus,
        addProjectDocument,
        deleteProjectDocument,
        addShoot,
        addBooking,
        convertOpportunityToProject,
        addOpportunity,
        updateOpportunityStage,
        resolveAlert,
        resolveBookingConflict,
        addProjectVariation,
        updateCallSheetApproval,
        addAuditLog,
        integrations,
        syncIntegration,
        toggleIntegration
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
