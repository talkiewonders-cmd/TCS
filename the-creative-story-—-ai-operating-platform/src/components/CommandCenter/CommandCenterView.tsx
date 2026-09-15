import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Calendar, 
  Clapperboard, 
  ArrowUpRight, 
  ArrowDownRight, 
  Users, 
  FileText, 
  Clock, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Building2,
  PieChart
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const CommandCenterView: React.FC = () => {
  const { 
    projects, 
    opportunities, 
    shoots, 
    bookings, 
    alerts, 
    clients, 
    users,
    filters,
    navigateToRecord,
    setActiveScreen,
    resolveAlert,
    resolveBookingConflict
  } = usePlatform();

  // Filter-aware calculations
  const filteredProjects = projects.filter(p => {
    if (filters.clientId !== 'all' && p.clientId !== filters.clientId) return false;
    return true;
  });

  const wonOpps = opportunities.filter(o => o.stage === 'Won');
  const activePipelineOpps = opportunities.filter(o => !['Won', 'Lost', 'On Hold'].includes(o.stage));
  
  const totalWonRevenueMTD = wonOpps.reduce((acc, o) => acc + (o.actualWonValueAED || o.estimatedValueAED), 0);
  const totalPipelineValue = activePipelineOpps.reduce((acc, o) => acc + o.estimatedValueAED, 0);
  const totalWeightedPipeline = activePipelineOpps.reduce((acc, o) => acc + o.weightedValueAED, 0);

  // Profitability
  const activeProjects = filteredProjects.filter(p => !['Completed & Closed'].includes(p.status));
  const totalActiveRevenue = activeProjects.reduce((acc, p) => acc + p.totalProjectRevenueAED, 0);
  const totalForecastCost = activeProjects.reduce((acc, p) => acc + p.totalForecastCostAED, 0);
  const totalGrossProfit = totalActiveRevenue - totalForecastCost;
  const blendedGrossMargin = totalActiveRevenue > 0 ? (totalGrossProfit / totalActiveRevenue) * 100 : 0;

  // Billing
  const allMilestones = filteredProjects.flatMap(p => p.billingMilestones);
  const totalInvoiced = allMilestones.filter(m => m.status !== 'Pending').reduce((acc, m) => acc + m.amountAED, 0);
  const totalCollected = allMilestones.filter(m => m.status === 'Collected').reduce((acc, m) => acc + m.amountAED, 0);
  const totalOverdue = allMilestones.filter(m => m.status === 'Overdue').reduce((acc, m) => acc + m.amountAED, 0);
  const totalOutstanding = totalInvoiced - totalCollected;

  // Highest & Lowest Margin Projects
  const sortedByMargin = [...activeProjects].sort((a, b) => b.forecastGrossMarginPercent - a.forecastGrossMarginPercent);
  const highestMarginProject = sortedByMargin[0];
  const lowestMarginProject = sortedByMargin[sortedByMargin.length - 1];

  // Upcoming shoots this week
  const upcomingShoots = shoots.filter(s => s.status === 'Scheduled');
  const hasConflict = bookings.some(b => b.hasConflict);

  return (
    <div className="space-y-6 pb-12">
      {/* Executive Command Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141619] border border-[#23272e] rounded-xl p-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Executive Command Center</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              SEPTEMBER 2026
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Single-pane operating visibility: Connecting BD acquisition, production schedules, committed costs, and margin protection.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveScreen('calendar')}
            className="px-3 py-2 rounded-lg bg-[#181b21] hover:bg-[#232832] border border-[#2b3340] text-white text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Creative Story Team Calendar</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </button>
          <button
            onClick={() => setActiveScreen('ai')}
            className="px-3.5 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-[#e50914]/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Executive Briefing</span>
          </button>
        </div>
      </div>

      {/* Critical Exception Banner (if any) */}
      {hasConflict && (
        <div className="bg-[#1c1214] border-l-4 border-l-[#e50914] border border-[#381a1e] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#e50914] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Critical Operational Conflict: Sofia Rossi (DP) & Arri Mini LF Double-Booked
              </div>
              <div className="text-xs text-[#d18d94] mt-0.5">
                Simultaneously booked on SHT-26-401 (Al Marmoom Desert) and SHT-26-405 (Chalhoub Stage A) on Sep 16, 2026.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => resolveBookingConflict('bkg-2', 'reschedule')}
              className="px-3 py-1.5 rounded bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold transition-colors"
            >
              Auto-Reschedule to Sep 18
            </button>
            <button
              onClick={() => navigateToRecord('conflict', 'sht-405')}
              className="px-3 py-1.5 rounded bg-[#2b171a] border border-[#4a2226] text-white text-xs font-medium hover:bg-[#381e22]"
            >
              Inspect Conflict
            </button>
          </div>
        </div>
      )}

      {/* Row 1: Key Commercial & Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue Won MTD */}
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col justify-between hover:border-[#323842] transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8a94a2]">
            <span>Revenue Won (MTD)</span>
            <span className="font-mono text-emerald-400 flex items-center text-[11px]">
              <ArrowUpRight className="w-3.5 h-3.5" /> +154% of Quota
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              AED {totalWonRevenueMTD.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#717b88] mt-0.5">
              Target: AED 350,000 | 2 Won Deals
            </div>
          </div>
          <div className="pt-2 border-t border-[#1d2127] flex items-center justify-between text-[11px]">
            <span className="text-[#8a94a2]">Active Pipeline:</span>
            <span className="font-mono text-white font-medium">AED {totalPipelineValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 2: Blended Gross Profit & Margin */}
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col justify-between hover:border-[#323842] transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8a94a2]">
            <span>Blended Gross Profit</span>
            <span className={`font-mono text-[11px] px-1.5 py-0.5 rounded font-bold ${
              blendedGrossMargin >= 40 ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
            }`}>
              {blendedGrossMargin.toFixed(1)}% GP
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              AED {totalGrossProfit.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#717b88] mt-0.5">
              Active Portfolio Revenue: AED {totalActiveRevenue.toLocaleString()}
            </div>
          </div>
          <div className="pt-2 border-t border-[#1d2127] flex items-center justify-between text-[11px]">
            <span className="text-[#8a94a2]">Target Margin:</span>
            <span className="font-mono text-white">40.0% Standard</span>
          </div>
        </div>

        {/* Card 3: Billing & Overdue Collections */}
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col justify-between hover:border-[#323842] transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8a94a2]">
            <span>Collections & Invoicing</span>
            {totalOverdue > 0 && (
              <span className="font-mono text-[#e50914] text-[11px] font-bold">
                1 Overdue Invoice
              </span>
            )}
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              AED {totalCollected.toLocaleString()}
            </div>
            <div className="text-[11px] text-[#717b88] mt-0.5">
              Invoiced: AED {totalInvoiced.toLocaleString()} | Outstanding: AED {totalOutstanding.toLocaleString()}
            </div>
          </div>
          <div className="pt-2 border-t border-[#1d2127] flex items-center justify-between text-[11px]">
            <span className="text-[#8a94a2]">Overdue (14 days):</span>
            <span className="font-mono text-[#e50914] font-bold">AED {totalOverdue.toLocaleString()}</span>
          </div>
        </div>

        {/* Card 4: Production Operations & Shoots */}
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col justify-between hover:border-[#323842] transition-colors">
          <div className="flex items-center justify-between text-xs text-[#8a94a2]">
            <span>Operations & Shoots</span>
            <span className="font-mono text-sky-400 text-[11px]">
              {upcomingShoots.length} Shoots This Week
            </span>
          </div>
          <div className="my-2">
            <div className="text-2xl font-bold font-mono text-white tracking-tight">
              {activeProjects.length} Active Films
            </div>
            <div className="text-[11px] text-[#717b88] mt-0.5">
              100% Permits Cleared with Dubai Film Comm.
            </div>
          </div>
          <div className="pt-2 border-t border-[#1d2127] flex items-center justify-between text-[11px]">
            <span className="text-[#8a94a2]">Camera Utilization:</span>
            <span className="font-mono text-emerald-400 font-medium">88.5% Billable</span>
          </div>
        </div>
      </div>

      {/* Row 2: Two Column Grid (Commercial & Margin Intelligence + Operational Radar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Commercial Pipeline & Margin Divergence */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Projects Profitability Matrix */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Active Projects Profitability & Margin Health</h3>
                <p className="text-[11px] text-[#717b88]">Real-time comparison of contract value, committed direct costs, and forecast GP%</p>
              </div>
              <button
                onClick={() => setActiveScreen('projects')}
                className="text-xs text-[#e50914] hover:underline font-medium flex items-center gap-1"
              >
                Project Control Center <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                    <th className="pb-2.5 font-normal">Code & Project</th>
                    <th className="pb-2.5 font-normal">Client</th>
                    <th className="pb-2.5 font-normal text-right">Revenue (AED)</th>
                    <th className="pb-2.5 font-normal text-right">Forecast Cost</th>
                    <th className="pb-2.5 font-normal text-right">Forecast GP</th>
                    <th className="pb-2.5 font-normal text-right">Margin %</th>
                    <th className="pb-2.5 font-normal text-right">Target</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b1f26]">
                  {activeProjects.map(p => {
                    const isLowMargin = p.forecastGrossMarginPercent < p.targetMarginPercent;
                    const isSevere = p.forecastGrossMarginPercent < 30;
                    return (
                      <tr 
                        key={p.id} 
                        onClick={() => navigateToRecord('project', p.id)}
                        className="hover:bg-[#181b21] cursor-pointer transition-colors"
                      >
                        <td className="py-3 font-medium text-white">
                          <div className="font-mono text-[#e50914] text-[11px]">{p.code}</div>
                          <div className="truncate max-w-[220px]">{p.title}</div>
                        </td>
                        <td className="py-3 text-[#9ba3af]">{p.clientName.split(' ')[0]}</td>
                        <td className="py-3 font-mono text-right text-white">
                          {p.totalProjectRevenueAED.toLocaleString()}
                        </td>
                        <td className="py-3 font-mono text-right text-[#8a94a2]">
                          {p.totalForecastCostAED.toLocaleString()}
                        </td>
                        <td className="py-3 font-mono text-right font-medium text-white">
                          {p.forecastGrossProfitAED.toLocaleString()}
                        </td>
                        <td className="py-3 font-mono text-right">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            isSevere 
                              ? 'bg-red-950 text-red-400 border border-red-800' 
                              : isLowMargin 
                              ? 'bg-amber-950 text-amber-400' 
                              : 'bg-emerald-950 text-emerald-400'
                          }`}>
                            {p.forecastGrossMarginPercent}%
                          </span>
                        </td>
                        <td className="py-3 font-mono text-right text-[#717b88]">
                          {p.targetMarginPercent}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Margin alert box */}
            {lowestMarginProject && lowestMarginProject.forecastGrossMarginPercent < 30 && (
              <div className="mt-4 p-3 rounded-lg bg-[#221517] border border-[#4a2228] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[#e50914]">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>
                    <strong>Margin Alert:</strong> {lowestMarginProject.code} ({lowestMarginProject.title}) is compressing to {lowestMarginProject.forecastGrossMarginPercent}% due to unbudgeted talent costs.
                  </span>
                </div>
                <button
                  onClick={() => navigateToRecord('project', lowestMarginProject.id)}
                  className="text-white hover:underline text-[11px] shrink-0 ml-2 font-medium"
                >
                  Adjust Budget / Variation →
                </button>
              </div>
            )}
          </div>

          {/* BD Attribution & High-Value Pipeline */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Commercial Attribution & Pipeline Velocity</h3>
                <p className="text-[11px] text-[#717b88]">Revenue generated by Commercial / Account leads with split attribution</p>
              </div>
              <button
                onClick={() => setActiveScreen('crm')}
                className="text-xs text-[#e50914] hover:underline font-medium flex items-center gap-1"
              >
                BD & CRM Pipeline <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* BD Leaderboard */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#8a94a2] uppercase">Top Commercial Producers (MTD)</div>
                {users.filter(u => u.role === 'bd').map(bdUser => {
                  const won = wonOpps.filter(o => o.primaryOwnerId === bdUser.id)
                    .reduce((acc, o) => acc + (o.actualWonValueAED || o.estimatedValueAED), 0);
                  const pipeline = activePipelineOpps.filter(o => o.primaryOwnerId === bdUser.id)
                    .reduce((acc, o) => acc + o.estimatedValueAED, 0);

                  return (
                    <div key={bdUser.id} className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <img src={bdUser.avatar} alt={bdUser.name} className="w-8 h-8 rounded-full object-cover border border-[#353c48]" />
                        <div>
                          <div className="text-xs font-semibold text-white">{bdUser.name}</div>
                          <div className="text-[10px] text-[#717b88]">{bdUser.roleTitle}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-xs font-bold text-emerald-400">AED {won.toLocaleString()} won</div>
                        <div className="text-[10px] text-[#717b88]">Pipeline: AED {pipeline.toLocaleString()}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* High Probability Closing Deals */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#8a94a2] uppercase">Immediate Closers (Next 14 Days)</div>
                {activePipelineOpps.slice(0, 2).map(opp => (
                  <div key={opp.id} className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[#e50914]">{opp.code}</span>
                      <span className="font-mono text-[11px] text-emerald-400 font-semibold">{opp.probabilityPercent}% Prob.</span>
                    </div>
                    <div className="text-xs font-semibold text-white truncate">{opp.title}</div>
                    <div className="flex items-center justify-between text-[11px] text-[#8a94a2]">
                      <span>AED {opp.estimatedValueAED.toLocaleString()}</span>
                      <span>Owner: {opp.primaryOwnerName.split(' ')[0]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Operational Schedule, Shoots, and Quick Approvals */}
        <div className="space-y-6">
          {/* Live Shoot Radar */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Clapperboard className="w-4 h-4 text-[#e50914]" />
                <h3 className="text-sm font-semibold text-white">Live Shoot Radar</h3>
              </div>
              <button
                onClick={() => setActiveScreen('shoots')}
                className="text-xs text-[#e50914] hover:underline"
              >
                Shoot Manager →
              </button>
            </div>

            <div className="space-y-3 mt-4">
              {shoots.map(shoot => {
                const isConflictShoot = shoot.id === 'sht-405' && !shoot.callSheetApproved;
                return (
                  <div 
                    key={shoot.id}
                    onClick={() => navigateToRecord('shoot', shoot.id)}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      isConflictShoot 
                        ? 'bg-[#221417] border-[#4f2026] hover:border-[#e50914]' 
                        : 'bg-[#181b20] border-[#252a32] hover:border-[#38404e]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono text-[#e50914] font-medium">{shoot.code}</span>
                      <span className="font-mono text-[#9ba3af]">{shoot.shootDate}</span>
                    </div>
                    <div className="text-xs font-semibold text-white">{shoot.shootTitle}</div>
                    <div className="text-[11px] text-[#717b88] mt-1 flex items-center gap-2">
                      <span>{shoot.logistics.locationName.split('(')[0]}</span>
                      <span>•</span>
                      <span>Call {shoot.callTime}</span>
                    </div>

                    {isConflictShoot ? (
                      <div className="mt-2 text-[10px] font-mono text-[#e50914] bg-[#2d161a] p-1.5 rounded flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>CREW CONFLICT: Sofia Rossi double-booked</span>
                      </div>
                    ) : (
                      <div className="mt-2 text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        <span>Call Sheet Dispatched & Permitted</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Approvals & Action Decisions */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <h3 className="text-sm font-semibold text-white mb-3">Executive Decisions Awaiting Action</h3>
            <div className="space-y-2.5">
              <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] text-xs">
                <div className="flex items-center justify-between font-medium text-white mb-1">
                  <span>Chalhoub Variation Request</span>
                  <span className="text-[#e50914] font-mono">+AED 35,000</span>
                </div>
                <p className="text-[11px] text-[#8a94a2] mb-2">
                  Restore gross margin from 19.6% back to 34% by invoicing international talent buyout.
                </p>
                <button
                  onClick={() => navigateToRecord('project', 'prj-086')}
                  className="w-full py-1.5 rounded bg-[#20242c] hover:bg-[#2a303b] text-white text-[11px] font-medium transition-colors"
                >
                  Review Project Economics →
                </button>
              </div>

              <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] text-xs">
                <div className="flex items-center justify-between font-medium text-white mb-1">
                  <span>Overdue Collection Notice</span>
                  <span className="text-amber-400 font-mono">AED 137,500</span>
                </div>
                <p className="text-[11px] text-[#8a94a2] mb-2">
                  Emaar Address Grand final milestone (INV-2026-077-2) is 14 days overdue.
                </p>
                <button
                  onClick={() => navigateToRecord('invoice', 'prj-077')}
                  className="w-full py-1.5 rounded bg-[#20242c] hover:bg-[#2a303b] text-white text-[11px] font-medium transition-colors"
                >
                  View Invoice & Client Ledger →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
