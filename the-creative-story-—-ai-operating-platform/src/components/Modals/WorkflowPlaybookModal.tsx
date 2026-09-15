import React, { useState } from 'react';
import { 
  X, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Calendar, 
  DollarSign, 
  Clapperboard, 
  Target, 
  FolderGit2,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { OPERATIONAL_ROLES_PLAYBOOK } from '../../data/integrationsData';
import { UserRole } from '../../types/operatingPlatform';

interface WorkflowPlaybookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WorkflowPlaybookModal: React.FC<WorkflowPlaybookModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, setCurrentUserRole } = usePlatform();
  const [selectedRole, setSelectedRole] = useState<string>(currentUser.role);

  if (!isOpen) return null;

  const currentPlaybook = OPERATIONAL_ROLES_PLAYBOOK.find(r => r.roleId === selectedRole) || OPERATIONAL_ROLES_PLAYBOOK[0];

  const handleSimulate = (roleId: string) => {
    setSelectedRole(roleId);
    setCurrentUserRole(roleId as UserRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#141619] border border-[#2a2f38] rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#22272f] flex items-center justify-between bg-[#101215]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e50914] flex items-center justify-center text-white font-mono font-bold text-sm">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-white tracking-tight">Operating Playbook: Who Does What in TCS</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
                  RACI Matrix & Data Paths
                </span>
              </div>
              <p className="text-xs text-[#717b88]">Clear division of responsibility: Deals, Projects, Teamup Calendar, DFPC Permits & Xero Accounts</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#717b88] hover:text-white hover:bg-[#1f232b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Layout: Sidebar Role Tabs + Main Responsibility View */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
          {/* Left Column: Role Selector */}
          <div className="w-full md:w-72 border-r border-[#22272f] bg-[#101215] p-3 space-y-1.5 shrink-0">
            <div className="px-3 py-2 text-[10px] font-mono uppercase text-[#717b88] tracking-wider">
              Select Operating Role
            </div>
            {OPERATIONAL_ROLES_PLAYBOOK.map(role => (
              <button
                key={role.roleId}
                onClick={() => handleSimulate(role.roleId)}
                className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1 border ${
                  selectedRole === role.roleId
                    ? 'bg-[#1b1f26] border-[#e50914] text-white shadow-lg'
                    : 'border-transparent text-[#8a94a2] hover:bg-[#16181d] hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{role.assignedPerson}</span>
                  <span 
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold"
                    style={{ backgroundColor: `${role.color}20`, color: role.color }}
                  >
                    {role.badge}
                  </span>
                </div>
                <div className="text-[11px] text-[#717b88]">{role.roleTitle}</div>
                {currentUser.role === role.roleId && (
                  <div className="text-[10px] font-mono text-[#e50914] flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3" /> Currently Active Persona
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Right Column: Deep Breakdown */}
          <div className="flex-1 p-6 space-y-5 bg-[#141619] overflow-y-auto max-h-[65vh]">
            {/* Active Role Header */}
            <div className="p-4 rounded-xl bg-[#181b21] border border-[#262b34] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{currentPlaybook.assignedPerson}</h3>
                  <span 
                    className="text-[10px] font-mono px-2 py-0.5 rounded font-bold"
                    style={{ backgroundColor: `${currentPlaybook.color}20`, color: currentPlaybook.color }}
                  >
                    {currentPlaybook.roleTitle}
                  </span>
                </div>
                <div className="text-xs text-[#717b88] mt-1">{currentPlaybook.department}</div>
              </div>

              <button
                onClick={() => setCurrentUserRole(currentPlaybook.roleId as UserRole)}
                className="px-3 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold transition-colors shrink-0"
              >
                Simulate This Persona
              </button>
            </div>

            {/* Responsibility Pillars */}
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Primary Operational Responsibilities (Who Does What)
                </h4>
                <div className="space-y-2">
                  {currentPlaybook.primaryResponsibilities.map((resp, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#181b21] border border-[#23272e] text-xs text-[#c4cbd4] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e50914] shrink-0 mt-1.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Daily Operating Rhythm */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-400" />
                  Daily Operating Workflow
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {currentPlaybook.dailyWorkflow.map((flow, i) => (
                    <div key={i} className="p-3 rounded-lg bg-[#121417] border border-[#22272e] text-xs">
                      <div className="font-bold text-[#e50914] font-mono text-[10px] uppercase mb-1">
                        Step {i + 1}
                      </div>
                      <p className="text-[11px] text-[#9ba3af] leading-relaxed">{flow}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Permissions */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  System Permissions & Actions in Platform
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentPlaybook.systemPermissions.map((perm, i) => (
                    <span key={i} className="px-2.5 py-1 rounded-md bg-[#1e222a] border border-[#2b313a] text-xs text-[#a1abb8]">
                      ✓ {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#22272f] bg-[#101215] flex items-center justify-between">
          <div className="text-xs text-[#717b88]">
            Switching persona in the header applies live role-based visibility filters across the entire studio.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1f232b] hover:bg-[#2a303a] text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
