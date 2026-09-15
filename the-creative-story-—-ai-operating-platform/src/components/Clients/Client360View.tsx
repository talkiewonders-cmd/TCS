import React, { useState } from 'react';
import { 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles, 
  ChevronRight, 
  DollarSign, 
  FolderGit2, 
  AlertTriangle, 
  CheckCircle2, 
  FileText,
  UserCheck,
  TrendingUp
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const Client360View: React.FC = () => {
  const { 
    clients, 
    projects, 
    opportunities, 
    selectedClientId, 
    setSelectedClientId,
    navigateToRecord
  } = usePlatform();

  const [generatingAi, setGeneratingAi] = useState(false);
  const [aiDossier, setAiDossier] = useState<Record<string, string>>({});

  const activeClient = clients.find(c => c.id === selectedClientId) || clients[0];

  // Relational data linked to this client
  const clientProjects = projects.filter(p => p.clientId === activeClient.id);
  const clientOpps = opportunities.filter(o => o.clientId === activeClient.id);

  // Invoices
  const clientMilestones = clientProjects.flatMap(p => p.billingMilestones.map(m => ({ ...m, projectCode: p.code, projectTitle: p.title })));
  const paidMilestones = clientMilestones.filter(m => m.status === 'Collected');
  const overdueMilestones = clientMilestones.filter(m => m.status === 'Overdue');
  const pendingMilestones = clientMilestones.filter(m => m.status === 'Pending' || m.status === 'Invoiced');

  const totalCollectedAED = paidMilestones.reduce((acc, m) => acc + m.amountAED, 0);
  const totalOverdueAED = overdueMilestones.reduce((acc, m) => acc + m.amountAED, 0);

  const handleGenerateAiSummary = async () => {
    setGeneratingAi(true);
    try {
      const prompt = `Generate a strategic commercial and risk assessment dossier for client "${activeClient.name}" (${activeClient.industry}).
Won revenue to date: AED ${activeClient.totalWonRevenueAED.toLocaleString()}, Average gross margin: ${activeClient.averageMarginPercent}%.
Active projects: ${clientProjects.map(p => `${p.code} (${p.title}, margin: ${p.forecastGrossMarginPercent}%)`).join(', ')}.
Active opportunities: ${clientOpps.map(o => `${o.code} (${o.title}, value: AED ${o.estimatedValueAED})`).join(', ')}.
Provide:
1. Executive Relationship Health
2. Margin & Profitability Trends
3. Operational & Delivery Risks
4. Q4 Commercial Upsell Opportunities.`;

      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, userRole: 'founder', companySnapshot: { client: activeClient, projects: clientProjects, opps: clientOpps } })
      });
      const data = await res.json();
      setAiDossier(prev => ({ ...prev, [activeClient.id]: data.answer || activeClient.aiSummary || 'Dossier generated.' }));
    } catch (e) {
      setAiDossier(prev => ({ ...prev, [activeClient.id]: activeClient.aiSummary || 'Relationship healthy. Focus on closing Q4 pipeline.' }));
    } finally {
      setGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Client 360 Header */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Client 360 & Commercial Dossier</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              ACCOUNT INTELLIGENCE
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Comprehensive client portfolio view: Historical gross margin, live WIP productions, billing status, and AI strategic dossier.
          </p>
        </div>

        <button
          onClick={handleGenerateAiSummary}
          disabled={generatingAi}
          className="px-3.5 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#e50914]/20 transition-all disabled:opacity-50"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{generatingAi ? 'Generating Dossier...' : 'AI Strategic Summary'}</span>
        </button>
      </div>

      {/* Two Column Layout: Client Selector & Detail Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Client List Card Selector */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#717b88] px-1">Client Accounts ({clients.length})</div>
          {clients.map(client => {
            const isSelected = client.id === activeClient.id;
            return (
              <div
                key={client.id}
                onClick={() => setSelectedClientId(client.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-[#181b21] border-[#e50914] shadow-lg shadow-black/40' 
                    : 'bg-[#141619] border-[#23272e] hover:border-[#353c48]'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono text-[#e50914]">{client.code}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded uppercase font-semibold ${
                    client.tier === 'Enterprise' ? 'bg-amber-950 text-amber-300' : 'bg-[#1e2229] text-[#9ba3af]'
                  }`}>
                    {client.tier}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-white mb-1 truncate">{client.name}</h4>
                <div className="text-[11px] text-[#717b88] mb-3">{client.industry}</div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#1d2127] text-[10px] font-mono">
                  <div>
                    <span className="text-[#6b7582]">Lifetime Won:</span>
                    <div className="text-white font-bold">AED {(client.totalWonRevenueAED / 1000).toFixed(0)}k</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[#6b7582]">Avg Margin:</span>
                    <div className="text-emerald-400 font-bold">{client.averageMarginPercent}%</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Selected Client 360 Full View */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Account Profile Header Card */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#20242c]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs text-[#e50914] font-bold">{activeClient.code}</span>
                  <h2 className="text-lg font-bold text-white">{activeClient.name}</h2>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#8a94a2] mt-2">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#717b88]" /> {activeClient.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5 text-[#717b88]" /> Relationship Owner: <strong className="text-white">{activeClient.relationshipOwnerName}</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                  activeClient.riskRating === 'Low' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                }`}>
                  Risk Rating: {activeClient.riskRating}
                </span>
              </div>
            </div>

            {/* Lifetime Commercial Scorecard */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-b border-[#20242c]">
              <div>
                <div className="text-[11px] text-[#717b88]">Total Revenue Won</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">AED {activeClient.totalWonRevenueAED.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#717b88]">Gross Profit Generated</div>
                <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">AED {activeClient.totalGrossProfitAED.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-[11px] text-[#717b88]">Average Gross Margin</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">{activeClient.averageMarginPercent}%</div>
              </div>
              <div>
                <div className="text-[11px] text-[#717b88]">Projects Completed / Active</div>
                <div className="text-lg font-bold font-mono text-white mt-0.5">{activeClient.totalProjectsCount} ({activeClient.activeProjectsCount} Live)</div>
              </div>
            </div>

            {/* Stakeholder Contacts */}
            <div className="pt-4">
              <div className="text-xs font-mono uppercase text-[#717b88] mb-3">Key Stakeholder Contacts</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeClient.contacts.map((contact, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] text-xs">
                    <div className="flex items-center justify-between font-semibold text-white mb-0.5">
                      <span>{contact.name}</span>
                      {contact.isPrimary && <span className="text-[10px] font-mono text-[#e50914]">PRIMARY</span>}
                    </div>
                    <div className="text-[11px] text-[#8a94a2] mb-2">{contact.role}</div>
                    <div className="space-y-1 text-[11px] text-[#717b88] font-mono">
                      <div className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> {contact.email}</div>
                      <div className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {contact.phone}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Client Dossier Card */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#e50914]" />
                <h3 className="text-sm font-semibold text-white">AI Relationship Dossier & Commercial Advisory</h3>
              </div>
              <span className="text-[10px] font-mono text-[#717b88]">Auto-Grounding on Master Records</span>
            </div>

            <div className="p-4 rounded-lg bg-[#181b20] border border-[#262b34] text-xs text-[#c2cbd6] leading-relaxed whitespace-pre-wrap font-sans">
              {aiDossier[activeClient.id] || activeClient.aiSummary || 'Click "AI Strategic Summary" to evaluate relationship performance, current deliverables, and margin health.'}
            </div>
          </div>

          {/* Active Work In Progress (Projects & Shoots) */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-white">Current Projects & Scopes</h3>
              <span className="text-xs text-[#717b88]">{clientProjects.length} Records</span>
            </div>

            <div className="space-y-3">
              {clientProjects.length === 0 ? (
                <div className="p-4 text-center text-xs text-[#6b7582] bg-[#181b20] rounded-lg">
                  No active projects currently in production for this client.
                </div>
              ) : (
                clientProjects.map(proj => (
                  <div
                    key={proj.id}
                    onClick={() => navigateToRecord('project', proj.id)}
                    className="p-3.5 rounded-lg bg-[#181b20] border border-[#262b34] hover:border-[#e50914] cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#e50914] font-bold">{proj.code}</span>
                        <span className="text-xs font-semibold text-white">{proj.title}</span>
                      </div>
                      <div className="text-[11px] text-[#717b88] mt-1">
                        Status: <strong className="text-white">{proj.status}</strong> | Producer: {proj.producerName}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                      <div>
                        <div className="text-[10px] text-[#6b7582]">Revenue</div>
                        <div className="text-white font-bold">AED {proj.totalProjectRevenueAED.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#6b7582]">Forecast Margin</div>
                        <div className={`font-bold ${proj.forecastGrossMarginPercent < 30 ? 'text-[#e50914]' : 'text-emerald-400'}`}>
                          {proj.forecastGrossMarginPercent}%
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#717b88]" />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Billing & Collections Statement */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Invoicing & Collections Statement</h3>
                <p className="text-[11px] text-[#717b88]">Milestones, payment compliance, and aged debt</p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-emerald-400">Collected: AED {totalCollectedAED.toLocaleString()}</span>
                {totalOverdueAED > 0 && <span className="text-[#e50914] font-bold">Overdue: AED {totalOverdueAED.toLocaleString()}</span>}
              </div>
            </div>

            <div className="space-y-2">
              {clientMilestones.map((m, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{m.title}</div>
                    <div className="text-[10px] text-[#717b88] font-mono">
                      {m.projectCode} • Due {m.dueDate} {m.invoiceNumber && `• ${m.invoiceNumber}`}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-white font-bold">AED {m.amountAED.toLocaleString()}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                      m.status === 'Collected' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : m.status === 'Overdue' 
                        ? 'bg-red-950 text-red-400 border border-red-800' 
                        : 'bg-[#1e2229] text-[#9ba3af]'
                    }`}>
                      {m.status} {m.agingDays && `(${m.agingDays}d)`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
