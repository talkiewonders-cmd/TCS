import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  Search, 
  Filter, 
  DollarSign, 
  Users, 
  Kanban, 
  Table as TableIcon, 
  Calendar,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Opportunity, OpportunityStage } from '../../types/operatingPlatform';

export const CRMView: React.FC = () => {
  const { 
    opportunities, 
    clients, 
    users, 
    updateOpportunityStage, 
    convertOpportunityToProject, 
    addOpportunity,
    navigateToRecord,
    setActiveScreen
  } = usePlatform();

  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [showNewOppModal, setShowNewOppModal] = useState(false);

  // New Opp Form State
  const [newTitle, setNewTitle] = useState('');
  const [newClientId, setNewClientId] = useState(clients[0]?.id || '');
  const [newEstimatedValue, setNewEstimatedValue] = useState(250000);
  const [newProbability, setNewProbability] = useState(50);
  const [newStage, setNewStage] = useState<OpportunityStage>('Brief Received');
  const [newScope, setNewScope] = useState('');
  const [newExpectedClose, setNewExpectedClose] = useState('2026-10-15');
  const [newPrimaryOwnerId, setNewPrimaryOwnerId] = useState('usr-2');

  const STAGES: OpportunityStage[] = [
    'Lead',
    'Qualified',
    'Brief Received',
    'Proposal',
    'Negotiation',
    'Won',
    'Lost',
    'On Hold'
  ];

  const filteredOpps = opportunities.filter(opp => {
    if (stageFilter !== 'all' && opp.stage !== stageFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.code.toLowerCase().includes(q) ||
        opp.clientName.toLowerCase().includes(q) ||
        opp.primaryOwnerName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalPipeline = opportunities
    .filter(o => !['Won', 'Lost', 'On Hold'].includes(o.stage))
    .reduce((acc, o) => acc + o.estimatedValueAED, 0);

  const weightedPipeline = opportunities
    .filter(o => !['Won', 'Lost', 'On Hold'].includes(o.stage))
    .reduce((acc, o) => acc + o.weightedValueAED, 0);

  const wonRevenue = opportunities
    .filter(o => o.stage === 'Won')
    .reduce((acc, o) => acc + (o.actualWonValueAED || o.estimatedValueAED), 0);

  const handleCreateOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    addOpportunity({
      title: newTitle,
      clientId: newClientId,
      estimatedValueAED: Number(newEstimatedValue),
      probabilityPercent: Number(newProbability),
      stage: newStage,
      scope: newScope || 'Commercial campaign with 4K hero film, sound design, and social cutdowns.',
      expectedCloseDate: newExpectedClose,
      primaryOwnerId: newPrimaryOwnerId
    });

    setShowNewOppModal(false);
    setNewTitle('');
    setNewScope('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Pipeline Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141619] border border-[#23272e] rounded-xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Business Development & CRM Pipeline</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              SEP 2026
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Single-entry source of truth from lead to won project. Marking any deal "Won" immediately provisions a Project in Project Control.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowNewOppModal(true)}
            className="px-3.5 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#e50914]/20 transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Opportunity</span>
          </button>
        </div>
      </div>

      {/* Commercial Summary Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#8a94a2]">Unweighted Active Pipeline</div>
            <div className="text-xl font-bold font-mono text-white mt-1">AED {totalPipeline.toLocaleString()}</div>
            <div className="text-[10px] text-[#717b88]">Across 4 active negotiations/proposals</div>
          </div>
          <div className="p-3 rounded-lg bg-[#1a1d22] text-[#8a94a2]">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#8a94a2]">Weighted Probability Pipeline</div>
            <div className="text-xl font-bold font-mono text-emerald-400 mt-1">AED {weightedPipeline.toLocaleString()}</div>
            <div className="text-[10px] text-[#717b88]">Factoring closing confidence weights</div>
          </div>
          <div className="p-3 rounded-lg bg-[#1a1d22] text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs text-[#8a94a2]">Closed Won Revenue (MTD)</div>
            <div className="text-xl font-bold font-mono text-white mt-1">AED {wonRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-emerald-400">Converted to Live Production Projects</div>
          </div>
          <div className="p-3 rounded-lg bg-emerald-950 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and View Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#141619] border border-[#23272e] rounded-xl p-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#717b88]" />
            <input
              type="text"
              placeholder="Search opportunity title, client, or code..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#181b20] border border-[#2a2f38] text-xs text-white placeholder-[#5d6673] focus:outline-none focus:border-[#e50914]"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg bg-[#181b20] border border-[#2a2f38] p-0.5 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
                viewMode === 'kanban' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" />
              <span>Pipeline Board</span>
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded flex items-center gap-1.5 font-medium transition-colors ${
                viewMode === 'table' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline View (Kanban or Table) */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
          {['Lead', 'Brief Received', 'Proposal', 'Negotiation', 'Won'].map((stageName) => {
            const stageOpps = filteredOpps.filter(o => o.stage === stageName);
            const stageSum = stageOpps.reduce((acc, o) => acc + o.estimatedValueAED, 0);

            return (
              <div key={stageName} className="bg-[#121417] border border-[#23272e] rounded-xl p-3.5 flex flex-col min-w-[280px]">
                {/* Column Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#20242b] mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${
                      stageName === 'Won' ? 'bg-emerald-400' : stageName === 'Negotiation' ? 'bg-[#e50914]' : 'bg-[#9ba3af]'
                    }`} />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{stageName}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1c1f25] text-[#8a94a2]">
                      {stageOpps.length}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-[#8a94a2]">
                    AED {(stageSum / 1000).toFixed(0)}k
                  </span>
                </div>

                {/* Cards in Column */}
                <div className="space-y-3 flex-1">
                  {stageOpps.length === 0 ? (
                    <div className="p-4 text-center text-xs text-[#525a66] border border-dashed border-[#1f232a] rounded-lg">
                      No deals currently in {stageName}
                    </div>
                  ) : (
                    stageOpps.map(opp => (
                      <div
                        key={opp.id}
                        className={`p-3.5 rounded-lg border transition-all ${
                          opp.isStale 
                            ? 'bg-[#211416] border-[#4a1c22] hover:border-[#e50914]' 
                            : 'bg-[#181b20] border-[#262b34] hover:border-[#3a424f]'
                        }`}
                      >
                        {/* Stale Badge */}
                        {opp.isStale && (
                          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-mono text-[#e50914] bg-[#2e171b] px-2 py-0.5 rounded border border-[#4d1d23]">
                            <AlertTriangle className="w-3 h-3 shrink-0" />
                            <span>11 DAYS INACTIVE — STALE DEAL</span>
                          </div>
                        )}

                        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                          <span className="text-[#e50914] font-medium">{opp.code}</span>
                          <span className="text-[#8a94a2]">{opp.probabilityPercent}% Prob.</span>
                        </div>

                        <h4 className="text-xs font-semibold text-white mb-1 leading-snug">{opp.title}</h4>
                        <div className="text-[11px] text-[#8a94a2] truncate mb-2">{opp.clientName}</div>

                        <div className="p-2 rounded bg-[#121417] border border-[#20242b] mb-2.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-[#717b88]">Est. Value:</span>
                            <span className="font-mono font-bold text-white">AED {opp.estimatedValueAED.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-[#717b88] mt-0.5">
                            <span>Weighted:</span>
                            <span className="font-mono text-emerald-400">AED {opp.weightedValueAED.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Revenue attribution split */}
                        <div className="text-[10px] text-[#717b88] border-t border-[#20242b] pt-2 mb-2 flex items-center justify-between">
                          <span>Attribution:</span>
                          <span className="font-medium text-white">
                            {opp.contributors.map(c => `${c.userName.split(' ')[0]} (${c.splitPercentage}%)`).join(' / ')}
                          </span>
                        </div>

                        {/* Next action */}
                        <div className="text-[10px] text-[#8a94a2] bg-[#14171b] p-1.5 rounded mb-3">
                          <div className="text-[9px] uppercase font-mono text-[#5f6875]">Next Action ({opp.nextActionDate}):</div>
                          <div className="truncate text-white">{opp.nextActionNote}</div>
                        </div>

                        {/* Stage Controls & Won Conversion Button */}
                        <div className="pt-2 border-t border-[#20242b] flex items-center justify-between gap-2">
                          {opp.stage !== 'Won' ? (
                            <>
                              <select
                                value={opp.stage}
                                onChange={e => updateOpportunityStage(opp.id, e.target.value as OpportunityStage)}
                                className="bg-[#121417] border border-[#2a2f38] text-[11px] text-[#9ba3af] rounded px-2 py-1 focus:outline-none focus:border-[#e50914]"
                              >
                                {STAGES.map(s => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>

                              <button
                                onClick={() => convertOpportunityToProject(opp.id)}
                                className="px-2.5 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
                              >
                                <span>Mark Won</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => opp.convertedProjectId && navigateToRecord('project', opp.convertedProjectId)}
                              className="w-full py-1 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[11px] font-mono flex items-center justify-center gap-1 hover:bg-emerald-900"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>View Linked Project →</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-[#141619] border border-[#23272e] rounded-xl overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px] bg-[#121417]">
                <th className="py-3 px-4 font-normal">Code & Title</th>
                <th className="py-3 px-4 font-normal">Client</th>
                <th className="py-3 px-4 font-normal">Owner & Splits</th>
                <th className="py-3 px-4 font-normal text-right">Value (AED)</th>
                <th className="py-3 px-4 font-normal text-right">Prob %</th>
                <th className="py-3 px-4 font-normal">Stage</th>
                <th className="py-3 px-4 font-normal">Next Action</th>
                <th className="py-3 px-4 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1b1f26]">
              {filteredOpps.map(opp => (
                <tr key={opp.id} className="hover:bg-[#181b21] transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-mono text-[#e50914] text-[11px]">{opp.code}</div>
                    <div className="font-medium text-white">{opp.title}</div>
                  </td>
                  <td className="py-3 px-4 text-[#9ba3af]">{opp.clientName}</td>
                  <td className="py-3 px-4">
                    <div className="text-white font-medium">{opp.primaryOwnerName}</div>
                    <div className="text-[10px] text-[#717b88]">
                      {opp.contributors.map(c => `${c.userName.split(' ')[0]} ${c.splitPercentage}%`).join(', ')}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-right font-bold text-white">
                    {opp.estimatedValueAED.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-mono text-right text-emerald-400">
                    {opp.probabilityPercent}%
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                      opp.stage === 'Won' 
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                        : 'bg-[#1e2229] text-[#9ba3af] border border-[#2b313a]'
                    }`}>
                      {opp.stage}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-[200px]">
                    <div className="text-[10px] text-[#717b88] font-mono">{opp.nextActionDate}</div>
                    <div className="truncate text-[#9ba3af]">{opp.nextActionNote}</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {opp.stage !== 'Won' ? (
                      <button
                        onClick={() => convertOpportunityToProject(opp.id)}
                        className="px-2.5 py-1 rounded bg-[#e50914] hover:bg-[#c90812] text-white text-[11px] font-medium"
                      >
                        Mark Won →
                      </button>
                    ) : (
                      <button
                        onClick={() => opp.convertedProjectId && navigateToRecord('project', opp.convertedProjectId)}
                        className="text-emerald-400 hover:underline font-mono text-[11px]"
                      >
                        View Project →
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Opportunity Modal */}
      {showNewOppModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#141619] border border-[#2a2f38] rounded-2xl w-full max-w-xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#22262d] mb-4">
              <h3 className="text-base font-bold text-white">Log New Production Opportunity</h3>
              <button
                onClick={() => setShowNewOppModal(false)}
                className="text-[#717b88] hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOpportunity} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#8a94a2] mb-1 font-medium">Opportunity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Burj Crown 4K Global Brand Film"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#8a94a2] mb-1 font-medium">Client Account</label>
                  <select
                    value={newClientId}
                    onChange={e => setNewClientId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white focus:outline-none focus:border-[#e50914]"
                  >
                    {clients.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[#8a94a2] mb-1 font-medium">Commercial Owner</label>
                  <select
                    value={newPrimaryOwnerId}
                    onChange={e => setNewPrimaryOwnerId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white focus:outline-none focus:border-[#e50914]"
                  >
                    {users.filter(u => u.role === 'bd').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.roleTitle})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#8a94a2] mb-1 font-medium">Est. Contract (AED)</label>
                  <input
                    type="number"
                    step="10000"
                    value={newEstimatedValue}
                    onChange={e => setNewEstimatedValue(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white font-mono focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <div>
                  <label className="block text-[#8a94a2] mb-1 font-medium">Probability (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newProbability}
                    onChange={e => setNewProbability(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white font-mono focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <div>
                  <label className="block text-[#8a94a2] mb-1 font-medium">Initial Stage</label>
                  <select
                    value={newStage}
                    onChange={e => setNewStage(e.target.value as OpportunityStage)}
                    className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white focus:outline-none focus:border-[#e50914]"
                  >
                    {STAGES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#8a94a2] mb-1 font-medium">Production Scope & Deliverables</label>
                <textarea
                  rows={3}
                  placeholder="Cinematography requirements, camera package, number of shoot days, deliverables..."
                  value={newScope}
                  onChange={e => setNewScope(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#181b20] border border-[#2a2f38] text-white focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#22262d]">
                <button
                  type="button"
                  onClick={() => setShowNewOppModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#1a1d22] hover:bg-[#252a32] text-[#8a94a2] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white font-semibold shadow-lg shadow-[#e50914]/20"
                >
                  Create Opportunity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
