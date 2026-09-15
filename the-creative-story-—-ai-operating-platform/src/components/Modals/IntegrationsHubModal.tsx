import React, { useState } from 'react';
import { 
  X, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  DollarSign, 
  ShieldCheck, 
  Clapperboard, 
  MessageSquare, 
  ExternalLink,
  Zap,
  ArrowRight,
  Database,
  Cloud,
  Check
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface IntegrationsHubModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const IntegrationsHubModal: React.FC<IntegrationsHubModalProps> = ({ isOpen, onClose }) => {
  const { integrations, syncIntegration, toggleIntegration } = usePlatform();
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'accounts' | 'data-flow' | 'paths'>('accounts');

  if (!isOpen) return null;

  const handleSync = async (id: string) => {
    setSyncingId(id);
    await syncIntegration(id);
    setSyncingId(null);
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Calendar': return <Calendar className="w-5 h-5 text-emerald-400" />;
      case 'DollarSign': return <DollarSign className="w-5 h-5 text-amber-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-sky-400" />;
      case 'Clapperboard': return <Clapperboard className="w-5 h-5 text-purple-400" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-green-400" />;
      default: return <Database className="w-5 h-5 text-[#e50914]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#141619] border border-[#2a2f38] rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#22272f] flex items-center justify-between bg-[#101215]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 font-bold">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">Connected Accounts & Data Integrations</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  All Systems Online
                </span>
              </div>
              <p className="text-xs text-[#717b88]">Bi-directional live feeds with Teamup, Xero ERP, DFPC Permits, Frame.io & WhatsApp</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#717b88] hover:text-white hover:bg-[#1f232b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 border-b border-[#22272f] bg-[#121418] flex items-center gap-4 text-xs font-medium">
          <button
            onClick={() => setActiveTab('accounts')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'accounts' ? 'border-[#e50914] text-white font-semibold' : 'border-transparent text-[#717b88] hover:text-white'
            }`}
          >
            Connected Services (5 Active)
          </button>
          <button
            onClick={() => setActiveTab('data-flow')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'data-flow' ? 'border-[#e50914] text-white font-semibold' : 'border-transparent text-[#717b88] hover:text-white'
            }`}
          >
            Data Flow & Architecture Paths
          </button>
          <button
            onClick={() => setActiveTab('paths')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'paths' ? 'border-[#e50914] text-white font-semibold' : 'border-transparent text-[#717b88] hover:text-white'
            }`}
          >
            How Data Enters TCS Platform
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 max-h-[68vh] overflow-y-auto space-y-4">
          {activeTab === 'accounts' && (
            <div className="space-y-3">
              {integrations.map(intg => {
                const isSyncing = syncingId === intg.id || intg.status === 'syncing';
                return (
                  <div 
                    key={intg.id} 
                    className="p-4 rounded-xl bg-[#181b21] border border-[#272c35] hover:border-[#353c48] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 rounded-xl bg-[#121417] border border-[#252a33] shrink-0 mt-0.5">
                        {getIcon(intg.iconName)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-bold text-white">{intg.name}</h3>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e222a] text-[#a1abb8]">
                            {intg.category}
                          </span>
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 ${
                            intg.status === 'connected' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                              : 'bg-amber-950 text-amber-400 border border-amber-800'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${intg.status === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                            {intg.status === 'connected' ? 'Connected' : 'Sync Required'}
                          </span>
                        </div>
                        <p className="text-xs text-[#8a94a2] mt-1 leading-relaxed">
                          {intg.description}
                        </p>
                        <div className="text-[11px] text-[#5e6875] mt-1.5 flex flex-wrap items-center gap-2 font-mono">
                          <span>Account: <strong className="text-[#a1abb8]">{intg.authEmailOrId}</strong></span>
                          <span>•</span>
                          <span>Synced: <span className="text-[#a1abb8]">{intg.lastSync}</span></span>
                          <span>•</span>
                          <span className="text-[#e50914]">{intg.syncedRecordsCount} records</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleSync(intg.id)}
                        disabled={isSyncing}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          isSyncing 
                            ? 'bg-[#222730] text-[#717b88] cursor-not-allowed' 
                            : 'bg-[#20252e] hover:bg-[#2c333f] text-white border border-[#323946]'
                        }`}
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin text-[#e50914]' : 'text-[#8a94a2]'}`} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'data-flow' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#181b21] border border-[#272c35] space-y-3">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#e50914]" />
                  Integrated Master Data Architecture
                </h3>
                <p className="text-xs text-[#8a94a2] leading-relaxed">
                  Every record in the operating platform is tied to a central <strong className="text-white">Project Code (e.g. TCS-26-081)</strong>. 
                  This links CRM opportunities, Teamup calendar shoot bookings, DFPC permits, Frame.io rushes, and Xero financial invoices into a unified timeline.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                      Teamup Production Calendar
                    </div>
                    <p className="text-[11px] text-[#717b88] mt-1">
                      Pulls and pushes dates for the 20 crew sub-calendars. If a crew member is double-booked on a shoot date, the platform triggers an immediate conflict alert.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                      Xero Cloud Accounting
                    </div>
                    <p className="text-[11px] text-[#717b88] mt-1">
                      Synchronizes billing milestones (50% mobilization, 25% first cut, 25% final delivery). Automatically computes 5% UAE FTA VAT and tracks overdue days.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                      DFPC Government Permitting
                    </div>
                    <p className="text-[11px] text-[#717b88] mt-1">
                      Direct tracking of Dubai Film Commission permits, DCAA drone clearances, and Dubai Police traffic closure NOCs with status validation before shoot calls.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-green-400" />
                      WhatsApp Dispatch Gateway
                    </div>
                    <p className="text-[11px] text-[#717b88] mt-1">
                      Dispatches approved call sheets directly to the 20 crew members' mobile phones with GPS location pins, hospital contacts, and call times.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'paths' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#181b21] border border-[#272c35]">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
                  Step-by-Step Data Entry Paths in TCS Platform
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <span className="w-6 h-6 rounded-full bg-[#e50914] text-white text-xs font-bold flex items-center justify-center shrink-0">1</span>
                    <div>
                      <div className="text-xs font-bold text-white">How a Project is Added</div>
                      <p className="text-xs text-[#8a94a2] mt-0.5">
                        Either click <strong className="text-white">+ Quick Action → New Project</strong> in the top header, or mark an opportunity as <strong className="text-white">"Won"</strong> in the CRM pipeline to automatically generate a project with all budget line items pre-allocated.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <span className="w-6 h-6 rounded-full bg-[#e50914] text-white text-xs font-bold flex items-center justify-center shrink-0">2</span>
                    <div>
                      <div className="text-xs font-bold text-white">How Files & Permits Are Uploaded</div>
                      <p className="text-xs text-[#8a94a2] mt-0.5">
                        Open any project in <strong className="text-white">Project Control → Documents & Permits</strong>. Drag & drop permits (DFPC, DCAA, Police NOCs, Call sheets). Set the permit status, reference number, and validity date for automated compliance checks.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <span className="w-6 h-6 rounded-full bg-[#e50914] text-white text-xs font-bold flex items-center justify-center shrink-0">3</span>
                    <div>
                      <div className="text-xs font-bold text-white">How Crew is Booked & Who is Free</div>
                      <p className="text-xs text-[#8a94a2] mt-0.5">
                        Check the <strong className="text-white">Crew Availability Radar</strong> to see who is Free vs. On Set today. Click <strong className="text-white">Book Crew</strong> to assign crew members to shoot dates on the Teamup production calendar.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-[#121417] border border-[#22272e]">
                    <span className="w-6 h-6 rounded-full bg-[#e50914] text-white text-xs font-bold flex items-center justify-center shrink-0">4</span>
                    <div>
                      <div className="text-xs font-bold text-white">How Financial Accounts & Invoices Are Handled</div>
                      <p className="text-xs text-[#8a94a2] mt-0.5">
                        In <strong className="text-white">Profitability & Finance</strong>, Finance Lead Karim Farouk audits project cost variances and clicks <strong className="text-white">Sync Xero</strong> to reconcile collected bank deposits and issue VAT invoices.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#22272f] bg-[#101215] flex items-center justify-between">
          <div className="text-xs text-[#717b88] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>5 cloud integrations synchronized with Dubai Studio City local instance</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1f232b] hover:bg-[#2a303a] text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
