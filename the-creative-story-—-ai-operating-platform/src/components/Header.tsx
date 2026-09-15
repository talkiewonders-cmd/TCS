import React, { useState } from 'react';
import { 
  Clapperboard, 
  Sparkles, 
  Bell, 
  Filter, 
  ChevronDown, 
  AlertTriangle, 
  Shield, 
  Calendar, 
  Users, 
  BarChart3, 
  DollarSign, 
  FolderGit2, 
  Briefcase, 
  Target, 
  FileCode2,
  CheckCircle2,
  Clock,
  Zap,
  Plus,
  HelpCircle,
  FolderPlus,
  UploadCloud,
  FileText
} from 'lucide-react';
import { usePlatform, ActiveScreen } from '../context/PlatformContext';
import { UserRole } from '../types/operatingPlatform';
import { CreateProjectModal } from './Modals/CreateProjectModal';
import { IntegrationsHubModal } from './Modals/IntegrationsHubModal';
import { WorkflowPlaybookModal } from './Modals/WorkflowPlaybookModal';

export const Header: React.FC = () => {
  const { 
    activeScreen, 
    setActiveScreen, 
    currentUser, 
    setCurrentUserRole, 
    alerts, 
    resolveAlert,
    navigateToRecord,
    filters,
    setFilters,
    clients,
    integrations
  } = usePlatform();

  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(false);
  const [showQuickActionDropdown, setShowQuickActionDropdown] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [showIntegrationsModal, setShowIntegrationsModal] = useState(false);
  const [showWorkflowModal, setShowWorkflowModal] = useState(false);

  const unresolvedAlerts = alerts.filter(a => !a.resolved);
  const criticalCount = unresolvedAlerts.filter(a => a.severity === 'critical').length;
  const connectedIntegrationsCount = integrations.filter(i => i.status === 'connected').length;

  const roles: { role: UserRole; label: string; department: string }[] = [
    { role: 'founder', label: 'Founder / CEO', department: 'Executive Full Command' },
    { role: 'bd', label: 'Nadia Cherif (BD Lead)', department: 'CRM, Targets & Attribution' },
    { role: 'producer', label: 'Maya Rayyan (Line Producer)', department: 'Projects, Shoots & Budgets' },
    { role: 'finance', label: 'Karim Farouk (Finance & Ops)', department: 'Budgets, Invoices & Margins' },
    { role: 'creative', label: 'Sofia Rossi (Director of Photography)', department: 'Shoots, Bookings & Call Sheets' },
    { role: 'freelancer', label: 'Elena Rostova (1st AC Freelance)', department: 'Restricted Confirmed Shoots' }
  ];

  const navItems: { id: ActiveScreen; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'command-center', label: 'Command Center', icon: BarChart3 },
    { id: 'crm', label: 'BD / Pipeline', icon: Target },
    { id: 'clients', label: 'Client 360', icon: Briefcase },
    { id: 'projects', label: 'Project Control', icon: FolderGit2 },
    { id: 'shoots', label: 'Shoot Manager', icon: Clapperboard },
    { id: 'calendar', label: 'Team Calendar', icon: Calendar, badge: 'Live' },
    { id: 'team', label: 'Team & Resources', icon: Users },
    { id: 'kpi', label: 'KPI Engine', icon: Shield },
    { id: 'finance', label: 'Profitability & Finance', icon: DollarSign },
    { id: 'ai', label: 'AI Intelligence', icon: Sparkles },
    { id: 'spec-hub', label: 'Vendor Spec Hub', icon: FileCode2 },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d0e] border-b border-[#22252a]">
      {/* Top operational bar */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-[#e50914] flex items-center justify-center text-white shadow-lg shadow-[#e50914]/20 font-mono font-bold text-sm tracking-tighter">
            TCS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white tracking-tight text-base font-sans">THE CREATIVE STORY</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-[#1f2329] text-[#9ba3af] border border-[#2b313a]">
                OS 2026.09
              </span>
            </div>
            <div className="text-[11px] text-[#717b88] flex items-center gap-2">
              <span>Dubai, UAE</span>
              <span>•</span>
              <span className="font-mono text-[#9ba3af]">GST UTC+4</span>
            </div>
          </div>
        </div>

        {/* Global Action Tools: Quick Action, Integrations, Playbook, Filter toggle, Role Switcher, Alerts & AI launcher */}
        <div className="flex items-center gap-2">
          {/* Global Quick Action Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowQuickActionDropdown(!showQuickActionDropdown)}
              className="px-3 py-1.5 rounded-md bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-[#e50914]/20 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Action</span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {showQuickActionDropdown && (
              <div className="absolute left-0 sm:right-0 sm:left-auto mt-2 w-64 rounded-xl bg-[#141619] border border-[#2b313c] shadow-2xl py-2 z-50 animate-fadeIn">
                <div className="px-3 py-1 text-[10px] font-mono uppercase text-[#717b88] border-b border-[#22262d]">
                  Add Operational Data
                </div>
                
                <button
                  onClick={() => {
                    setShowQuickActionDropdown(false);
                    setShowCreateProjectModal(true);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1f232b] flex items-center gap-2.5 transition-colors"
                >
                  <FolderPlus className="w-4 h-4 text-[#e50914]" />
                  <div>
                    <div className="font-bold">Create New Project</div>
                    <div className="text-[10px] text-[#717b88]">Add project, set contract value & margin</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowQuickActionDropdown(false);
                    setActiveScreen('shoots');
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1f232b] flex items-center gap-2.5 transition-colors"
                >
                  <Clapperboard className="w-4 h-4 text-sky-400" />
                  <div>
                    <div className="font-bold">Schedule Shoot Day</div>
                    <div className="text-[10px] text-[#717b88]">Assign location, crew call, permit #</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowQuickActionDropdown(false);
                    setActiveScreen('calendar');
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1f232b] flex items-center gap-2.5 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <div>
                    <div className="font-bold">Book Crew into Calendar</div>
                    <div className="text-[10px] text-[#717b88]">Check availability & add booking</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowQuickActionDropdown(false);
                    setActiveScreen('projects');
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1f232b] flex items-center gap-2.5 transition-colors"
                >
                  <UploadCloud className="w-4 h-4 text-purple-400" />
                  <div>
                    <div className="font-bold">Upload Permit / File</div>
                    <div className="text-[10px] text-[#717b88]">DFPC permit, police NOC, brief</div>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setShowQuickActionDropdown(false);
                    setActiveScreen('crm');
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-white hover:bg-[#1f232b] flex items-center gap-2.5 transition-colors border-t border-[#22262d] mt-1 pt-1.5"
                >
                  <Target className="w-4 h-4 text-amber-400" />
                  <div>
                    <div className="font-bold">New BD Opportunity</div>
                    <div className="text-[10px] text-[#717b88]">Pipeline RFP & pitch proposal</div>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Integrations Hub Button */}
          <button
            onClick={() => setShowIntegrationsModal(true)}
            className="px-2.5 py-1.5 rounded-md bg-[#141619] border border-[#262b33] hover:border-[#3a414e] text-xs text-[#a1abb8] hover:text-white flex items-center gap-1.5 transition-all"
            title="Connected Accounts: Teamup, Xero, DFPC, Frame.io, WhatsApp"
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Integrations</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {connectedIntegrationsCount}
            </span>
          </button>

          {/* Operational Playbook (Who Does What) Button */}
          <button
            onClick={() => setShowWorkflowModal(true)}
            className="px-2.5 py-1.5 rounded-md bg-[#141619] border border-[#262b33] hover:border-[#3a414e] text-xs text-[#a1abb8] hover:text-white flex items-center gap-1.5 transition-all"
            title="Who does what, data paths, and operating playbook"
          >
            <HelpCircle className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden xl:inline">Operating Guide</span>
          </button>

          {/* Global Filter Toggle */}
          <button
            onClick={() => setShowFilterBar(!showFilterBar)}
            className={`px-2.5 py-1.5 rounded-md text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              showFilterBar || filters.clientId !== 'all' || filters.period !== 'month'
                ? 'bg-[#1e2229] border-[#e50914] text-white'
                : 'bg-[#141619] border-[#262b33] text-[#9ba3af] hover:text-white hover:border-[#353c47]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Scope</span>
            <span className="font-mono text-[10px] text-[#e50914] uppercase font-bold">[{filters.period}]</span>
          </button>

          {/* Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleDropdown(!showRoleDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#141619] border border-[#262b33] hover:border-[#3a414e] text-xs text-white transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <div className="text-left hidden md:block">
                <div className="text-[10px] text-[#717b88] uppercase font-mono leading-none">Simulate Role</div>
                <div className="font-semibold text-[12px]">{currentUser.roleTitle.split('&')[0]}</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#717b88]" />
            </button>

            {showRoleDropdown && (
              <div className="absolute right-0 mt-2 w-72 rounded-lg bg-[#141619] border border-[#282d36] shadow-2xl py-2 z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-[#717b88] border-b border-[#22262d]">
                  Role-Based Access Simulation
                </div>
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      setCurrentUserRole(r.role);
                      setShowRoleDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex flex-col gap-0.5 transition-colors ${
                      currentUser.role === r.role ? 'bg-[#222730] text-white' : 'text-[#a1abb8] hover:bg-[#1b1e24] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between font-medium">
                      <span>{r.label}</span>
                      {currentUser.role === r.role && <span className="text-[#e50914] text-[10px] font-mono">ACTIVE</span>}
                    </div>
                    <div className="text-[10px] text-[#6b7582]">{r.department}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Proactive Alerts Bell */}
          <div className="relative">
            <button
              onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
              className="relative p-2 rounded-md bg-[#141619] border border-[#262b33] hover:border-[#3a414e] text-[#a1abb8] hover:text-white transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unresolvedAlerts.length > 0 && (
                <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-mono font-bold flex items-center justify-center text-white ${
                  criticalCount > 0 ? 'bg-[#e50914]' : 'bg-amber-500'
                }`}>
                  {unresolvedAlerts.length}
                </span>
              )}
            </button>

            {showAlertsDropdown && (
              <div className="absolute right-0 mt-2 w-84 sm:w-96 rounded-lg bg-[#141619] border border-[#282d36] shadow-2xl py-2 z-50">
                <div className="px-4 py-2 border-b border-[#22262d] flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">Active Operational Alerts</span>
                  <span className="text-[10px] font-mono text-[#e50914] uppercase">{unresolvedAlerts.length} Pending</span>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-[#1e2229]">
                  {unresolvedAlerts.length === 0 ? (
                    <div className="p-4 text-center text-xs text-[#717b88]">All operations running smoothly with zero active exceptions.</div>
                  ) : (
                    unresolvedAlerts.map(alert => (
                      <div key={alert.id} className="p-3 hover:bg-[#181b20] transition-colors flex flex-col gap-1.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${
                              alert.severity === 'critical' ? 'bg-[#e50914]' : 'bg-amber-400'
                            }`} />
                            <span className="text-xs font-semibold text-white">{alert.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-[#6b7582]">{alert.timestamp.split(' ')[1]}</span>
                        </div>
                        <p className="text-[11px] text-[#9ba3af] leading-relaxed">{alert.description}</p>
                        <div className="flex items-center justify-between pt-1">
                          <button
                            onClick={() => {
                              setShowAlertsDropdown(false);
                              navigateToRecord(alert.entityType as any, alert.entityId);
                            }}
                            className="text-[11px] text-[#e50914] hover:underline font-medium"
                          >
                            Inspect {alert.entityCode} →
                          </button>
                          <button
                            onClick={() => resolveAlert(alert.id)}
                            className="text-[10px] text-[#717b88] hover:text-white flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Dismiss
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* AI Intelligence Quick Launcher */}
          <button
            onClick={() => setActiveScreen('ai')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md ${
              activeScreen === 'ai'
                ? 'bg-[#e50914] text-white shadow-[#e50914]/30'
                : 'bg-gradient-to-r from-[#20252d] to-[#171a1f] text-white border border-[#2e3540] hover:border-[#e50914]/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e50914]" />
            <span>AI Intel</span>
          </button>
        </div>
      </div>

      {/* Primary Module Navigation Tabs */}
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-[#1b1e24] bg-[#0f1114]">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveScreen(item.id)}
              className={`px-3.5 py-2.5 text-xs font-medium whitespace-nowrap flex items-center gap-2 border-b-2 transition-all ${
                isActive
                  ? 'border-[#e50914] text-white bg-[#15181c]'
                  : 'border-transparent text-[#8a94a2] hover:text-white hover:bg-[#121417]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#e50914]' : 'text-[#6b7582]'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Global Filter Bar (Expandable) */}
      {showFilterBar && (
        <div className="bg-[#121418] border-t border-b border-[#22262d] px-4 sm:px-6 py-2.5">
          <div className="max-w-[1720px] mx-auto flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-[#717b88] font-mono text-[11px] uppercase">
              <Filter className="w-3.5 h-3.5 text-[#e50914]" /> Scope:
            </div>

            {/* Period */}
            <div className="flex items-center rounded bg-[#181b20] border border-[#282e37] p-0.5">
              {(['day', 'week', 'month', 'quarter', 'year'] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setFilters(prev => ({ ...prev, period: p }))}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase transition-colors ${
                    filters.period === p ? 'bg-[#e50914] text-white font-bold' : 'text-[#848e9c] hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Client Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#6b7582]">Client:</span>
              <select
                value={filters.clientId}
                onChange={e => setFilters(prev => ({ ...prev, clientId: e.target.value }))}
                className="bg-[#181b20] border border-[#282e37] text-white rounded px-2 py-1 text-xs focus:outline-none focus:border-[#e50914]"
              >
                <option value="all">All Clients (6 Enterprise / Growth)</option>
                {clients.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Reset */}
            {(filters.clientId !== 'all' || filters.period !== 'month') && (
              <button
                onClick={() => setFilters({ period: 'month', clientId: 'all', department: 'all', employeeId: 'all', projectType: 'all', status: 'all' })}
                className="text-[11px] text-[#e50914] hover:underline ml-auto"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Global Modals */}
      <CreateProjectModal 
        isOpen={showCreateProjectModal}
        onClose={() => setShowCreateProjectModal(false)}
      />

      <IntegrationsHubModal
        isOpen={showIntegrationsModal}
        onClose={() => setShowIntegrationsModal(false)}
      />

      <WorkflowPlaybookModal
        isOpen={showWorkflowModal}
        onClose={() => setShowWorkflowModal(false)}
      />
    </header>
  );
};
