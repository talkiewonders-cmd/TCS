import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  Download, 
  Filter, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText,
  Building2,
  Users
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const FinanceView: React.FC = () => {
  const { projects, clients, users, navigateToRecord } = usePlatform();

  const [dimension, setDimension] = useState<'project' | 'client' | 'producer' | 'bd'>('project');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Overall Financial Aggregates
  const totalRevenue = projects.reduce((a, b) => a + b.totalProjectRevenueAED, 0);
  const totalCommitted = projects.reduce((a, b) => a + b.totalCommittedCostAED, 0);
  const totalActual = projects.reduce((a, b) => a + b.totalActualCostAED, 0);
  const totalForecastCost = projects.reduce((a, b) => a + b.totalForecastCostAED, 0);
  const totalGrossProfit = totalRevenue - totalForecastCost;
  const blendedMarginPercent = totalRevenue > 0 ? (totalGrossProfit / totalRevenue) * 100 : 0;

  // Invoicing & Aged Receivables
  const allMilestones = projects.flatMap(p => p.billingMilestones.map(m => ({ ...m, projectCode: p.code, clientName: p.clientName })));
  const collectedMilestones = allMilestones.filter(m => m.status === 'Collected');
  const overdueMilestones = allMilestones.filter(m => m.status === 'Overdue');
  const pendingMilestones = allMilestones.filter(m => m.status === 'Pending' || m.status === 'Invoiced');

  const totalCollectedAED = collectedMilestones.reduce((a, b) => a + b.amountAED, 0);
  const totalOverdueAED = overdueMilestones.reduce((a, b) => a + b.amountAED, 0);
  const totalInvoicedAED = allMilestones.filter(m => m.status !== 'Pending').reduce((a, b) => a + b.amountAED, 0);

  const handleExportCSV = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Finance Header */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold text-white tracking-tight">Profitability & Financial Intelligence</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              AED OPERATIONAL AUDIT
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Comprehensive gross margin control: True project revenue, direct committed vendor costs, aging debt, and multi-dimensional P&L slicing.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-3.5 py-2 rounded-lg bg-[#181b20] border border-[#2d333f] hover:border-emerald-500 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-400" />
          <span>{downloadSuccess ? 'Statement Exported (CSV)' : 'Export Financial Statement'}</span>
        </button>
      </div>

      {/* Top High-Contrast Financial Ledger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4">
          <div className="text-xs text-[#8a94a2]">Total Project Portfolio Revenue</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">AED {totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 mt-1">Inclusive of approved variations</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4">
          <div className="text-xs text-[#8a94a2]">Forecast Direct Costs</div>
          <div className="text-2xl font-bold font-mono text-[#8a94a2] mt-1">AED {totalForecastCost.toLocaleString()}</div>
          <div className="text-[10px] text-[#717b88] mt-1">Actual (AED {totalActual.toLocaleString()}) + Committed + FTC</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4">
          <div className="text-xs text-[#8a94a2]">Blended Gross Profit</div>
          <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">AED {totalGrossProfit.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 mt-1">{blendedMarginPercent.toFixed(1)}% Gross Margin</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4">
          <div className="text-xs text-[#8a94a2]">Overdue Receivables (14+ Days)</div>
          <div className="text-2xl font-bold font-mono text-[#e50914] mt-1">AED {totalOverdueAED.toLocaleString()}</div>
          <div className="text-[10px] text-[#e50914] mt-1">1 overdue client invoice requires collection</div>
        </div>
      </div>

      {/* Multi-Dimensional Slice & Ledger View */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#20242c]">
          <div>
            <h3 className="text-sm font-semibold text-white">Profitability Breakdown by Operational Dimension</h3>
            <p className="text-[11px] text-[#717b88]">Slice company performance across accounts, projects, and department leads</p>
          </div>

          {/* Dimension Selector */}
          <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
            {(['project', 'client', 'producer', 'bd'] as const).map(dim => (
              <button
                key={dim}
                onClick={() => setDimension(dim)}
                className={`px-3 py-1 rounded font-medium capitalize transition-colors ${
                  dimension === dim ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
                }`}
              >
                By {dim}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Dimension Table */}
        <div className="overflow-x-auto">
          {dimension === 'project' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                  <th className="pb-2.5 font-normal">Project Code & Title</th>
                  <th className="pb-2.5 font-normal">Client</th>
                  <th className="pb-2.5 font-normal text-right">Revenue (AED)</th>
                  <th className="pb-2.5 font-normal text-right">Forecast Cost</th>
                  <th className="pb-2.5 font-normal text-right">Gross Profit</th>
                  <th className="pb-2.5 font-normal text-right">Gross Margin %</th>
                  <th className="pb-2.5 font-normal text-right">Target</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26]">
                {projects.map(p => (
                  <tr 
                    key={p.id} 
                    onClick={() => navigateToRecord('project', p.id)}
                    className="hover:bg-[#181b21] cursor-pointer"
                  >
                    <td className="py-3 text-white font-medium">
                      <div className="font-mono text-[#e50914] text-[11px]">{p.code}</div>
                      <div>{p.title}</div>
                    </td>
                    <td className="py-3 text-[#9ba3af]">{p.clientName}</td>
                    <td className="py-3 font-mono text-right text-white">{p.totalProjectRevenueAED.toLocaleString()}</td>
                    <td className="py-3 font-mono text-right text-[#8a94a2]">{p.totalForecastCostAED.toLocaleString()}</td>
                    <td className="py-3 font-mono text-right font-bold text-white">{p.forecastGrossProfitAED.toLocaleString()}</td>
                    <td className="py-3 font-mono text-right">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                        p.forecastGrossMarginPercent < 30 
                          ? 'bg-red-950 text-red-400 border border-red-800' 
                          : 'bg-emerald-950 text-emerald-400'
                      }`}>
                        {p.forecastGrossMarginPercent}%
                      </span>
                    </td>
                    <td className="py-3 font-mono text-right text-[#717b88]">{p.targetMarginPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {dimension === 'client' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                  <th className="pb-2.5 font-normal">Client Account</th>
                  <th className="pb-2.5 font-normal">Industry & Tier</th>
                  <th className="pb-2.5 font-normal text-right">Total Won Revenue</th>
                  <th className="pb-2.5 font-normal text-right">Gross Profit</th>
                  <th className="pb-2.5 font-normal text-right">Average Margin %</th>
                  <th className="pb-2.5 font-normal text-right">Active Films</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26]">
                {clients.map(c => (
                  <tr 
                    key={c.id}
                    onClick={() => navigateToRecord('client', c.id)}
                    className="hover:bg-[#181b21] cursor-pointer"
                  >
                    <td className="py-3 text-white font-medium">
                      <div className="font-mono text-[#e50914] text-[11px]">{c.code}</div>
                      <div>{c.name}</div>
                    </td>
                    <td className="py-3 text-[#9ba3af]">{c.industry} ({c.tier})</td>
                    <td className="py-3 font-mono text-right font-bold text-white">AED {c.totalWonRevenueAED.toLocaleString()}</td>
                    <td className="py-3 font-mono text-right text-emerald-400">AED {c.totalGrossProfitAED.toLocaleString()}</td>
                    <td className="py-3 font-mono text-right font-bold text-white">{c.averageMarginPercent}%</td>
                    <td className="py-3 font-mono text-right text-[#8a94a2]">{c.activeProjectsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {dimension === 'producer' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                  <th className="pb-2.5 font-normal">Line Producer</th>
                  <th className="pb-2.5 font-normal text-right">Projects Managed</th>
                  <th className="pb-2.5 font-normal text-right">Total Production Value</th>
                  <th className="pb-2.5 font-normal text-right">Total Cost</th>
                  <th className="pb-2.5 font-normal text-right">Blended Gross Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26]">
                {['usr-4', 'usr-6'].map(prodId => {
                  const prodUser = users.find(u => u.id === prodId)!;
                  const prodsProjects = projects.filter(p => p.producerId === prodId);
                  const prodRev = prodsProjects.reduce((a, b) => a + b.totalProjectRevenueAED, 0);
                  const prodCost = prodsProjects.reduce((a, b) => a + b.totalForecastCostAED, 0);
                  const prodGP = prodRev - prodCost;
                  const prodMargin = prodRev > 0 ? ((prodGP / prodRev) * 100).toFixed(1) : '0';

                  return (
                    <tr key={prodId} className="hover:bg-[#181b21]">
                      <td className="py-3 text-white font-medium flex items-center gap-2">
                        <img src={prodUser.avatar} alt={prodUser.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{prodUser.name}</span>
                      </td>
                      <td className="py-3 font-mono text-right text-white">{prodsProjects.length}</td>
                      <td className="py-3 font-mono text-right text-white">AED {prodRev.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right text-[#8a94a2]">AED {prodCost.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right font-bold text-emerald-400">{prodMargin}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}

          {dimension === 'bd' && (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                  <th className="pb-2.5 font-normal">Commercial Lead</th>
                  <th className="pb-2.5 font-normal text-right">Won Revenue MTD</th>
                  <th className="pb-2.5 font-normal text-right">Gross Profit Attributed</th>
                  <th className="pb-2.5 font-normal text-right">Target Quota</th>
                  <th className="pb-2.5 font-normal text-right">Quota Achievement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26]">
                {users.filter(u => u.role === 'bd').map(bdUser => {
                  const won = bdUser.id === 'usr-2' ? 540000 : 0;
                  const gp = bdUser.id === 'usr-2' ? 228500 : 0;
                  const target = 350000;
                  const pct = Math.round((won / target) * 100);

                  return (
                    <tr key={bdUser.id} className="hover:bg-[#181b21]">
                      <td className="py-3 text-white font-medium flex items-center gap-2">
                        <img src={bdUser.avatar} alt={bdUser.name} className="w-6 h-6 rounded-full object-cover" />
                        <span>{bdUser.name}</span>
                      </td>
                      <td className="py-3 font-mono text-right font-bold text-emerald-400">AED {won.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right text-white">AED {gp.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right text-[#8a94a2]">AED {target.toLocaleString()}</td>
                      <td className="py-3 font-mono text-right font-bold text-emerald-400">{pct}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Aged Debt & Cashflow Collection Schedule */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Aged Receivables & Cashflow Schedule</h3>
            <p className="text-[11px] text-[#717b88]">Tracking invoiced milestones against client payment terms</p>
          </div>
          <span className="font-mono text-xs text-[#8a94a2]">Total Invoiced: AED {totalInvoicedAED.toLocaleString()}</span>
        </div>

        <div className="space-y-3">
          {allMilestones.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-[#181b20] border border-[#262b34] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <div className="font-semibold text-white">{m.title}</div>
                <div className="text-[11px] text-[#717b88] font-mono mt-0.5">
                  Project: {m.projectCode} • Client: {m.clientName} • Due {m.dueDate} {m.invoiceNumber && `• ${m.invoiceNumber}`}
                </div>
              </div>

              <div className="flex items-center gap-4 font-mono">
                <span className="text-white font-bold">AED {m.amountAED.toLocaleString()}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                  m.status === 'Collected' 
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                    : m.status === 'Overdue' 
                    ? 'bg-red-950 text-red-400 border border-red-800' 
                    : 'bg-[#1e2229] text-[#9ba3af]'
                }`}>
                  {m.status} {m.agingDays && `(+${m.agingDays}d)`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
