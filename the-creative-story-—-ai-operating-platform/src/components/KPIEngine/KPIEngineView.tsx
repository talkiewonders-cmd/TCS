import React, { useState } from 'react';
import { 
  Shield, 
  Award, 
  Sliders, 
  CheckCircle2, 
  HelpCircle, 
  Target, 
  TrendingUp, 
  Users, 
  DollarSign, 
  FileCode2,
  ChevronDown
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { UserRole } from '../../types/operatingPlatform';

export const KPIEngineView: React.FC = () => {
  const { kpiScorecards, users, projects, opportunities } = usePlatform();

  const [selectedRoleTab, setSelectedRoleTab] = useState<'bd' | 'producer' | 'creative'>('bd');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const roleDefinitions = {
    bd: {
      title: 'Business Development & Commercial Account Lead KPIs',
      description: 'Measures net new revenue won, gross profit generated, pipeline velocity, and conversion efficiency.',
      targetRole: 'bd' as UserRole,
      kpis: [
        { name: 'Won Revenue (MTD)', target: 'AED 350,000', weight: '35%', formula: 'SUM(Opportunities.actualWonValue where primaryOwner = user)' },
        { name: 'Gross Profit Generated', target: 'AED 140,000', weight: '30%', formula: 'SUM(Opportunities.wonGP attributed by split %)' },
        { name: 'Win Rate %', target: '50.0%', weight: '15%', formula: '(Won Count ÷ Total Decided Deals) × 100' },
        { name: 'Pipeline Health & Follow-up', target: '100% Active (<10d)', weight: '20%', formula: 'Percentage of active deals with updated next-action within 10 days' }
      ]
    },
    producer: {
      title: 'Line Producer & Production Control KPIs',
      description: 'Measures project delivery predictability, direct cost control, gross margin protection, and client approval turnaround.',
      targetRole: 'producer' as UserRole,
      kpis: [
        { name: 'Budget Control Variance %', target: '≤ 0.0%', weight: '35%', formula: '((Total Forecast Cost − Approved Budget) ÷ Approved Budget) × 100' },
        { name: 'Gross Margin Protection', target: '≥ 40.0%', weight: '25%', formula: 'Blended actual GP% of all projects managed by producer' },
        { name: 'On-Time Master Delivery', target: '100.0%', weight: '20%', formula: '(Deliverables completed on or before approved delivery date) ÷ total' },
        { name: 'Permit & Call Sheet Compliance', target: '100.0%', weight: '20%', formula: 'Call sheets dispatched ≥ 24 hours before call with cleared DFTC permits' }
      ]
    },
    creative: {
      title: 'Creative Director, Cinematographer & Post KPIs',
      description: 'Measures billable day utilization, technical delivery compliance, controlled rework/retakes, and artistic quality score.',
      targetRole: 'creative' as UserRole,
      kpis: [
        { name: 'Billable Capacity Utilization %', target: '≥ 75.0%', weight: '40%', formula: '(Confirmed billable shoot/edit days ÷ monthly capacity days) × 100' },
        { name: 'Delivery Reliability & Version Control', target: '≥ 90.0%', weight: '30%', formula: '(Projects delivered within ≤ 2 client revision rounds) ÷ total projects' },
        { name: 'Gear & Safe Set Compliance', target: '100.0%', weight: '15%', formula: 'Zero equipment damage incidents and timely kit return check-in' },
        { name: 'Artistic Execution Rating', target: '4.8 / 5.0', weight: '15%', formula: 'Internal Creative Director & Client Stakeholder peer review score' }
      ]
    }
  };

  const activeDef = roleDefinitions[selectedRoleTab];
  const matchingScorecards = kpiScorecards.filter(k => k.roleCategory === selectedRoleTab);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Role-Specific KPI Engine & Attribution Rules</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              GOVERNANCE ENGINE
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Role-tailored performance formulas with mathematical transparency and direct audit drill-down to master operational records.
          </p>
        </div>

        {/* Role Category Switcher */}
        <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
          <button
            onClick={() => setSelectedRoleTab('bd')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              selectedRoleTab === 'bd' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            BD / Commercial
          </button>
          <button
            onClick={() => setSelectedRoleTab('producer')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              selectedRoleTab === 'producer' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            Producers
          </button>
          <button
            onClick={() => setSelectedRoleTab('creative')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              selectedRoleTab === 'creative' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            Crew / Creative / Post
          </button>
        </div>
      </div>

      {/* Role KPI Architecture Overview Card */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#20242c]">
          <div>
            <h2 className="text-base font-bold text-white">{activeDef.title}</h2>
            <p className="text-xs text-[#8a94a2] mt-0.5">{activeDef.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
              Formula Model: Active September 2026
            </span>
          </div>
        </div>

        {/* KPI Formula Table */}
        <div className="mt-5">
          <div className="text-xs font-mono uppercase text-[#717b88] mb-3">Mathematical Evaluation Framework</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeDef.kpis.map((kpi, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#181b20] border border-[#262b34] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{kpi.name}</span>
                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-[#1f242d] text-[#e50914] font-bold">
                    {kpi.weight} Weight
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#8a94a2] font-mono">
                  <span>Target Benchmark:</span>
                  <span className="text-white font-bold">{kpi.target}</span>
                </div>
                <div className="pt-2 border-t border-[#20242b] text-[10px] font-mono text-[#717b88]">
                  <span className="text-[#9ba3af]">Relational Query:</span> {kpi.formula}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Employee Performance Drill-downs */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-white">Live September 2026 Achievement Scorecards</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {matchingScorecards.map(sc => {
            const user = users.find(u => u.id === sc.userId);
            return (
              <div key={sc.id} className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#20242c]">
                  <div className="flex items-center gap-3">
                    {user && <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-[#2b313d]" />}
                    <div>
                      <div className="text-sm font-bold text-white">{sc.userName}</div>
                      <div className="text-xs text-[#717b88]">{sc.roleTitle}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[10px] font-mono text-[#717b88] uppercase">Composite Score</div>
                    <div className="text-lg font-mono font-bold text-emerald-400">{sc.overallScorePercent}%</div>
                  </div>
                </div>

                {/* Score breakdown metrics */}
                <div className="space-y-3">
                  {sc.metrics.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{m.name}</span>
                        <span className="font-mono text-emerald-400 font-bold">{m.achievementPercent}%</span>
                      </div>

                      <div className="w-full bg-[#121417] h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${Math.min(m.achievementPercent, 100)}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-[#717b88]">
                        <span>Actual: <strong className="text-white">{m.actual.toLocaleString()} {m.unit}</strong></span>
                        <span>Target: {m.target.toLocaleString()} {m.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
