import React, { useState } from 'react';
import { 
  FolderGit2, 
  DollarSign, 
  Calendar, 
  Users, 
  FileText, 
  Clapperboard, 
  AlertTriangle, 
  CheckCircle2, 
  Plus, 
  ChevronRight, 
  ExternalLink,
  Clock,
  ShieldCheck,
  TrendingDown,
  Layers,
  Sparkles
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { ProjectMilestoneTracker } from './ProjectMilestoneTracker';
import { ProjectDocumentsPermits } from './ProjectDocumentsPermits';
import { CreateProjectModal } from '../Modals/CreateProjectModal';

export const ProjectControlView: React.FC = () => {
  const { 
    projects, 
    selectedProjectId, 
    setSelectedProjectId, 
    addProjectVariation, 
    navigateToRecord,
    setActiveScreen
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'deliverables' | 'documents' | 'decisions'>('overview');
  const [showVariationModal, setShowVariationModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [variationAmount, setVariationAmount] = useState(35000);
  const [variationReason, setVariationReason] = useState('Additional international talent usage rights (MENA + Europe)');

  const project = projects.find(p => p.id === selectedProjectId) || projects[0];

  const handleApplyVariation = (e: React.FormEvent) => {
    e.preventDefault();
    if (variationAmount <= 0) return;
    addProjectVariation(project.id, Number(variationAmount), variationReason);
    setShowVariationModal(false);
  };

  const isLowMargin = project.forecastGrossMarginPercent < project.targetMarginPercent;
  const isCriticalMargin = project.forecastGrossMarginPercent < 30;

  return (
    <div className="space-y-6 pb-12">
      {/* Project Selector Bar */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#e50914] flex items-center justify-center text-white font-mono font-bold text-sm">
            {project.code.split('-').pop()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[#e50914] font-bold">{project.code}</span>
              <h1 className="text-base font-bold text-white tracking-tight">{project.title}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
                {project.status}
              </span>
            </div>
            <div className="text-xs text-[#8a94a2] mt-0.5">
              Client: <strong className="text-white">{project.clientName}</strong> | Account Lead: {project.accountOwnerName} | Line Producer: {project.producerName}
            </div>
          </div>
        </div>

        {/* Project Switcher Dropdown & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={project.id}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
          >
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.code} — {p.title} ({p.status})</option>
            ))}
          </select>

          <button
            onClick={() => setShowCreateModal(true)}
            className="px-3 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-[#e50914]/20"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>

          <button
            onClick={() => setShowVariationModal(true)}
            className="px-3 py-2 rounded-lg bg-[#1e222a] border border-[#313845] hover:border-[#e50914] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#e50914]" />
            <span>Variation Order</span>
          </button>
        </div>
      </div>

      {/* Visual Lifecycle & Milestone Progress Tracker */}
      <ProjectMilestoneTracker project={project} />

      {/* Margin / Overrun Warning Banner (if applicable) */}
      {isCriticalMargin && (
        <div className="bg-[#241316] border-l-4 border-l-[#e50914] border border-[#4a1c22] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#e50914] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Margin Compression Alert: Forecast Margin at {project.forecastGrossMarginPercent}% (Target: {project.targetMarginPercent}%)
              </div>
              <div className="text-xs text-[#d18d94] mt-0.5">
                Talent and location budget line items have exceeded planned pre-production estimates. Add an approved client variation or re-forecast post-production scope.
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowVariationModal(true)}
            className="px-3 py-1.5 rounded bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold shrink-0"
          >
            Issue Client Variation (+AED)
          </button>
        </div>
      )}

      {/* Primary KPI Ribbon for this Project */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Contract / PO Value</div>
          <div className="text-base font-mono font-bold text-white mt-1">AED {project.contractValueAED.toLocaleString()}</div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Base Signed PO</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Approved Variations</div>
          <div className="text-base font-mono font-bold text-sky-400 mt-1">
            +AED {project.approvedVariationsAED.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Billable Scope Additions</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Total Revenue</div>
          <div className="text-base font-mono font-bold text-white mt-1">AED {project.totalProjectRevenueAED.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Final Invoiced Base</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Committed / Actual Cost</div>
          <div className="text-base font-mono font-bold text-[#8a94a2] mt-1">
            AED {project.totalCommittedCostAED.toLocaleString()}
          </div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Forecast: AED {project.totalForecastCostAED.toLocaleString()}</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Forecast Gross Profit</div>
          <div className="text-base font-mono font-bold text-emerald-400 mt-1">AED {project.forecastGrossProfitAED.toLocaleString()}</div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Revenue − Direct Costs</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Forecast Gross Margin</div>
          <div className={`text-base font-mono font-bold mt-1 ${isCriticalMargin ? 'text-[#e50914]' : isLowMargin ? 'text-amber-400' : 'text-emerald-400'}`}>
            {project.forecastGrossMarginPercent}%
          </div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Target: {project.targetMarginPercent}%</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1 border-b border-[#22272f] text-xs font-medium">
        {[
          { id: 'overview', label: 'Commercial & Team' },
          { id: 'budget', label: 'Internal Budget Control' },
          { id: 'deliverables', label: 'Deliverables Matrix' },
          { id: 'documents', label: 'Documents & Permits' },
          { id: 'decisions', label: 'Decision Audit Log' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#e50914] text-white font-semibold'
                : 'border-transparent text-[#8a94a2] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Commercial & Team Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Milestones Table */}
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm font-semibold text-white">Billing & Cashflow Milestones</h3>
                  <p className="text-[11px] text-[#717b88]">Payment stages tied to deliverables and shoot dates</p>
                </div>
                <span className="font-mono text-xs text-[#8a94a2]">
                  Total: AED {project.billingMilestones.reduce((a, b) => a + b.amountAED, 0).toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                      <th className="pb-2 font-normal">Milestone</th>
                      <th className="pb-2 font-normal text-right">%</th>
                      <th className="pb-2 font-normal text-right">Amount (AED)</th>
                      <th className="pb-2 font-normal">Due Date</th>
                      <th className="pb-2 font-normal">Invoice #</th>
                      <th className="pb-2 font-normal text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1b1f26]">
                    {project.billingMilestones.map(m => (
                      <tr key={m.id}>
                        <td className="py-3 text-white font-medium">{m.title}</td>
                        <td className="py-3 font-mono text-right text-[#8a94a2]">{m.percentage}%</td>
                        <td className="py-3 font-mono text-right font-bold text-white">
                          {m.amountAED.toLocaleString()}
                        </td>
                        <td className="py-3 font-mono text-[#8a94a2]">{m.dueDate}</td>
                        <td className="py-3 font-mono text-[#717b88]">{m.invoiceNumber || '—'}</td>
                        <td className="py-3 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            m.status === 'Collected' 
                              ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                              : m.status === 'Overdue' 
                              ? 'bg-red-950 text-red-400 border border-red-800' 
                              : 'bg-[#1e2229] text-[#9ba3af]'
                          }`}>
                            {m.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Shoots Linked to this Project */}
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Clapperboard className="w-4 h-4 text-[#e50914]" />
                  <h3 className="text-sm font-semibold text-white">Scheduled Shoots ({project.shootCount} Production Days)</h3>
                </div>
                <button
                  onClick={() => setActiveScreen('shoots')}
                  className="text-xs text-[#e50914] hover:underline"
                >
                  Shoot Manager →
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-white">Main Principal Photography</div>
                  <div className="text-[11px] text-[#717b88] mt-0.5">
                    Dates: {project.shootStartDate} to {project.shootEndDate} | Dubai Film Commission Permit Cleared
                  </div>
                </div>
                <button
                  onClick={() => setActiveScreen('shoots')}
                  className="px-3 py-1.5 rounded bg-[#1f242d] hover:bg-[#2b333f] text-white text-[11px] font-medium"
                >
                  View Call Sheet →
                </button>
              </div>
            </div>
          </div>

          {/* Key Team Leads */}
          <div className="space-y-4">
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <h3 className="text-sm font-semibold text-white mb-4">Assigned Department Leads</h3>
              <div className="space-y-3 text-xs">
                <div className="p-2.5 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#717b88] uppercase">Account Lead</div>
                    <div className="font-semibold text-white mt-0.5">{project.accountOwnerName}</div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Commercial</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#717b88] uppercase">Line Producer</div>
                    <div className="font-semibold text-white mt-0.5">{project.producerName}</div>
                  </div>
                  <span className="text-[10px] font-mono text-sky-400">Production</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#717b88] uppercase">Creative Director</div>
                    <div className="font-semibold text-white mt-0.5">{project.creativeDirectorName}</div>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">Creative</span>
                </div>

                <div className="p-2.5 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#717b88] uppercase">Lead Editor / Colorist</div>
                    <div className="font-semibold text-white mt-0.5">{project.leadEditorName}</div>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400">Post</span>
                </div>
              </div>
            </div>

            {/* Production Dates Milestone Card */}
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 text-xs">
              <h3 className="text-sm font-semibold text-white mb-3">Master Schedule Timeline</h3>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="flex items-center justify-between text-[#8a94a2]">
                  <span>Project Kickoff:</span>
                  <span className="text-white">{project.startDate}</span>
                </div>
                <div className="flex items-center justify-between text-[#8a94a2]">
                  <span>Principal Shoots:</span>
                  <span className="text-white">{project.shootStartDate} – {project.shootEndDate}</span>
                </div>
                <div className="flex items-center justify-between text-[#8a94a2]">
                  <span>Master Film Delivery:</span>
                  <span className="text-emerald-400 font-bold">{project.deliveryDate}</span>
                </div>
                <div className="flex items-center justify-between text-[#8a94a2]">
                  <span>Final Milestone Invoice:</span>
                  <span className="text-white">{project.finalInvoiceDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Internal Budget Control Breakdown */}
      {activeTab === 'budget' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-sm font-semibold text-white">Internal Budget Control & Cost Variance</h3>
              <p className="text-[11px] text-[#717b88]">Approved budget, committed vendor POs, actual costs incurred, and forecast-to-complete</p>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#8a94a2]">Allocated: AED {project.totalAllocatedBudgetAED.toLocaleString()}</span>
              <span className="text-emerald-400">Forecast Total: AED {project.totalForecastCostAED.toLocaleString()}</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                  <th className="pb-2.5 font-normal">Cost Category</th>
                  <th className="pb-2.5 font-normal text-right">Allocated Budget</th>
                  <th className="pb-2.5 font-normal text-right">Committed POs</th>
                  <th className="pb-2.5 font-normal text-right">Actual Cost</th>
                  <th className="pb-2.5 font-normal text-right">Forecast to Complete</th>
                  <th className="pb-2.5 font-normal text-right">Total Forecast</th>
                  <th className="pb-2.5 font-normal text-right">Variance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26]">
                {project.budgetCategories.map(b => {
                  const totalCategoryCost = b.actualCostAED + b.forecastToCompleteAED;
                  const variance = b.allocatedBudgetAED - totalCategoryCost;
                  return (
                    <tr key={b.id} className="hover:bg-[#181b21]">
                      <td className="py-3 text-white font-medium">{b.category}</td>
                      <td className="py-3 font-mono text-right text-white">{b.allocatedBudgetAED.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right text-[#8a94a2]">{b.committedCostAED.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right text-[#8a94a2]">{b.actualCostAED.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right text-[#8a94a2]">{b.forecastToCompleteAED.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right font-bold text-white">{totalCategoryCost.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right">
                        <span className={variance < 0 ? 'text-[#e50914] font-bold' : 'text-emerald-400'}>
                          {variance >= 0 ? `+AED ${variance.toLocaleString()}` : `-AED ${Math.abs(variance).toLocaleString()}`}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Deliverables Matrix */}
      {activeTab === 'deliverables' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Master Deliverables Matrix & Review Links</h3>
              <p className="text-[11px] text-[#717b88]">Formats, durations, language tracks, and versions</p>
            </div>
            <span className="text-xs font-mono text-[#8a94a2]">{project.deliverables.length} Deliverable Assets</span>
          </div>

          <div className="space-y-3">
            {project.deliverables.map(del => (
              <div key={del.id} className="p-4 rounded-lg bg-[#181b20] border border-[#262b34] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{del.title}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af]">
                      {del.format}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af]">
                      {del.duration}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#717b88] mt-1.5 flex flex-wrap items-center gap-3 font-mono">
                    <span>Due: <strong className="text-white">{del.dueDate}</strong></span>
                    <span>•</span>
                    <span>Languages: {del.languagesAndSubtitles.join(', ')}</span>
                    <span>•</span>
                    <span>Aspect Ratio: {del.aspectRatio}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-semibold ${
                    del.status === 'Approved & Dispatched' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-sky-950 text-sky-400'
                  }`}>
                    {del.status} (v{del.versionCount})
                  </span>
                  {del.reviewLink && (
                    <a
                      href={del.reviewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[#20252e] hover:bg-[#2b323e] text-white text-[11px] flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Review</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Documents & Permits */}
      {activeTab === 'documents' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
          <ProjectDocumentsPermits project={project} />
        </div>
      )}

      {/* Tab 5: Decision Audit Log */}
      {activeTab === 'decisions' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Audit Trail & Major Project Decisions</h3>
          <div className="space-y-3">
            {project.decisionLog.map(d => (
              <div key={d.id} className="p-3.5 rounded-lg bg-[#181b20] border border-[#262b34] text-xs">
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-semibold text-white">{d.title}</span>
                  <span className="font-mono text-[#717b88]">{d.timestamp}</span>
                </div>
                <p className="text-[#8a94a2] leading-relaxed mb-2">{d.details}</p>
                <div className="text-[10px] text-[#5e6774] flex items-center justify-between">
                  <span>Authorized by: <strong>{d.author}</strong></span>
                  <span className="font-mono text-[#e50914]">{d.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Variation Order Modal */}
      {showVariationModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141619] border border-[#2a2f38] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#22262d] mb-4">
              <h3 className="text-base font-bold text-white">Authorize Project Variation Order</h3>
              <button
                onClick={() => setShowVariationModal(false)}
                className="text-[#717b88] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyVariation} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8a94a2] mb-1">Target Project</label>
                <div className="p-2.5 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white font-mono">
                  {project.code} — {project.title}
                </div>
              </div>

              <div>
                <label className="block text-[#8a94a2] mb-1 font-medium">Approved Variation Amount (AED)</label>
                <input
                  type="number"
                  step="5000"
                  required
                  value={variationAmount}
                  onChange={e => setVariationAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white font-mono text-sm focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div>
                <label className="block text-[#8a94a2] mb-1 font-medium">Variation Commercial Scope & Reason</label>
                <textarea
                  rows={3}
                  required
                  value={variationReason}
                  onChange={e => setVariationReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="p-3 rounded-lg bg-[#1c1f26] border border-[#2c3340] text-[11px] text-[#9ba3af]">
                Will immediately recalculate project contract value to <strong className="text-white font-mono">AED {(project.totalProjectRevenueAED + Number(variationAmount)).toLocaleString()}</strong> and restore gross margin protection.
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#22262d]">
                <button
                  type="button"
                  onClick={() => setShowVariationModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#1a1d22] hover:bg-[#252a32] text-[#8a94a2]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white font-semibold shadow-lg shadow-[#e50914]/20"
                >
                  Approve Variation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Project Creation Modal */}
      <CreateProjectModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
    </div>
  );
};
