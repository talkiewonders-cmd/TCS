import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  AlertCircle, 
  Calendar,
  Sparkles,
  ShieldCheck,
  Clapperboard,
  FileCheck2,
  DollarSign
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { Project, ProjectStatus } from '../../types/operatingPlatform';

interface ProjectMilestoneTrackerProps {
  project: Project;
}

const STAGES: { status: ProjectStatus; label: string; pct: number; description: string }[] = [
  { status: 'Pre-Production', label: '1. Pre-Production', pct: 20, description: 'Creative brief, shotlist, preliminary budget & crew holds' },
  { status: 'Active Shoots', label: '2. Active Shoots', pct: 50, description: 'DFPC permits approved, kit dispatched, principal photography' },
  { status: 'Post-Production', label: '3. Post-Production', pct: 75, description: 'Rushes ingested, offline edit, DaVinci color grading & sound mix' },
  { status: 'Client Review', label: '4. Client Review', pct: 90, description: 'First cut review via Frame.io, revisions round 1 & 2' },
  { status: 'Delivered & Invoiced', label: '5. Master Delivered', pct: 95, description: 'Final 4K ProRes masters delivered, final VAT invoice issued' },
  { status: 'Completed & Closed', label: '6. Closed', pct: 100, description: 'All vendor POs reconciled, final project gross margin audited' }
];

export const ProjectMilestoneTracker: React.FC<ProjectMilestoneTrackerProps> = ({ project }) => {
  const { updateProjectStatus, currentUser } = usePlatform();

  const currentStageIndex = STAGES.findIndex(s => s.status === project.status);
  const activeStage = STAGES[currentStageIndex] || STAGES[0];

  const handleAdvance = (nextStatus: ProjectStatus) => {
    updateProjectStatus(project.id, nextStatus);
  };

  return (
    <div className="p-4 rounded-xl bg-[#141619] border border-[#23272e] space-y-4">
      {/* Header with Progress Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
              <Clapperboard className="w-4 h-4 text-[#e50914]" />
              Production Lifecycle & Milestone Progress
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#20252e] text-[#a1abb8] border border-[#2d3441]">
              Phase {currentStageIndex + 1} of 6
            </span>
          </div>
          <p className="text-xs text-[#717b88] mt-0.5">
            {activeStage.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentStageIndex < STAGES.length - 1 && (
            <button
              onClick={() => handleAdvance(STAGES[currentStageIndex + 1].status)}
              className="px-3 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-[#e50914]/20"
            >
              <span>Advance to {STAGES[currentStageIndex + 1].label.split('. ')[1]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Visual Stepper Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-1">
        {STAGES.map((st, idx) => {
          const isDone = idx < currentStageIndex;
          const isCurrent = idx === currentStageIndex;
          const isFuture = idx > currentStageIndex;

          return (
            <button
              key={st.status}
              onClick={() => handleAdvance(st.status)}
              className={`p-2.5 rounded-lg text-left transition-all border flex flex-col justify-between min-h-[72px] ${
                isCurrent 
                  ? 'bg-[#241316] border-[#e50914] text-white shadow-lg' 
                  : isDone
                  ? 'bg-[#181b20] border-emerald-900/60 text-emerald-400'
                  : 'bg-[#121417] border-[#22272e] text-[#636c7a] hover:border-[#353c48] hover:text-[#a1abb8]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold">
                  {idx + 1}.0
                </span>
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : isCurrent ? (
                  <span className="w-2 h-2 rounded-full bg-[#e50914] animate-ping" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-[#2f3540]" />
                )}
              </div>
              <div className="text-xs font-bold leading-tight mt-1">
                {st.label.split('. ')[1]}
              </div>
              <div className="text-[9px] font-mono opacity-80 mt-0.5">
                {isDone ? 'Completed' : isCurrent ? 'Active Phase' : 'Upcoming'}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
