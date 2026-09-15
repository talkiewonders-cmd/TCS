import React, { useState } from 'react';
import { 
  FolderGit2, 
  X, 
  DollarSign, 
  Calendar, 
  User, 
  ShieldCheck, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Briefcase
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({ isOpen, onClose }) => {
  const { clients, users, addProject, currentUser } = usePlatform();

  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState(clients[0]?.id || 'cli-1');
  const [serviceType, setServiceType] = useState<'Commercial Campaign' | 'Brand Film' | 'Social Video Suite' | 'Documentary' | 'Corporate Series'>('Commercial Campaign');
  const [contractValueAED, setContractValueAED] = useState<number>(180000);
  const [targetMarginPercent, setTargetMarginPercent] = useState<number>(42);
  const [producerId, setProducerId] = useState('usr-4'); // Maya Rayyan
  const [creativeDirectorId, setCreativeDirectorId] = useState('usr-1'); // Tariq Al Mansoor
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [shootStartDate, setShootStartDate] = useState('2026-10-12');
  const [deliveryDate, setDeliveryDate] = useState('2026-11-05');
  const [heroDeliverable, setHeroDeliverable] = useState('16:9 4K Cinema Master (60s)');
  const [socialDeliverable, setSocialDeliverable] = useState('9:16 Social Cutdowns Suite (3x 15s)');

  if (!isOpen) return null;

  const estimatedTotalCost = Math.round(contractValueAED * (1 - targetMarginPercent / 100));
  const estimatedGrossProfit = contractValueAED - estimatedTotalCost;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const selectedClient = clients.find(c => c.id === clientId) || clients[0];
    const producer = users.find(u => u.id === producerId);
    const cd = users.find(u => u.id === creativeDirectorId);

    addProject({
      title: title.trim(),
      clientId: selectedClient.id,
      clientName: selectedClient.name,
      serviceType,
      contractValueAED: Number(contractValueAED),
      targetMarginPercent: Number(targetMarginPercent),
      accountOwnerId: currentUser.id,
      accountOwnerName: currentUser.name,
      producerId,
      producerName: producer ? producer.name : 'Maya Rayyan',
      creativeDirectorId,
      creativeDirectorName: cd ? cd.name : 'Tariq Al Mansoor',
      startDate,
      shootStartDate,
      shootEndDate: shootStartDate,
      deliveryDate,
      deliverables: [
        {
          id: `del-${Date.now()}-1`,
          projectId: '',
          title: heroDeliverable,
          format: '16:9 4K Master',
          duration: '60s',
          languagesAndSubtitles: ['Arabic', 'English'],
          status: 'Pre-Production',
          dueDate: deliveryDate,
          versionCount: 1,
          aspectRatio: '16:9'
        },
        {
          id: `del-${Date.now()}-2`,
          projectId: '',
          title: socialDeliverable,
          format: '9:16 Reel',
          duration: '15s',
          languagesAndSubtitles: ['Arabic', 'English'],
          status: 'Pre-Production',
          dueDate: deliveryDate,
          versionCount: 1,
          aspectRatio: '9:16'
        }
      ]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#141619] border border-[#2a2f38] rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#22272f] flex items-center justify-between bg-[#101215]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#e50914] flex items-center justify-center text-white font-mono font-bold text-sm">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Create New Production Project</h2>
              <p className="text-xs text-[#717b88]">Initializes budget categories, milestone billing, and Teamup crew booking</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#717b88] hover:text-white hover:bg-[#1f232b] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Section 1: Core Details */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-white mb-1.5">
                Project Title <span className="text-[#e50914]">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Emirates NBD Future Banking Brand Film"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-3.5 py-2.5 text-xs focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#a1abb8] mb-1.5">Client Account</label>
                <select
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                >
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.industry})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#a1abb8] mb-1.5">Production Service Type</label>
                <select
                  value={serviceType}
                  onChange={e => setServiceType(e.target.value as any)}
                  className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                >
                  <option value="Commercial Campaign">Commercial Campaign</option>
                  <option value="Brand Film">Brand Film</option>
                  <option value="Social Video Suite">Social Video Suite</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Corporate Series">Corporate Series</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Commercial & Budget Economics */}
          <div className="p-4 rounded-xl bg-[#181b20] border border-[#262b34] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#e50914]" />
                Commercial Budget & Gross Margin Target
              </span>
              <span className="text-[10px] font-mono text-[#717b88]">Auto-calculates direct cost ceiling</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-[#8a94a2] mb-1">Contract / PO Value (AED)</label>
                <input
                  type="number"
                  min="10000"
                  step="5000"
                  value={contractValueAED}
                  onChange={e => setContractValueAED(Number(e.target.value))}
                  className="w-full bg-[#121417] border border-[#2f3540] text-white font-mono text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
                />
              </div>

              <div>
                <label className="block text-[11px] text-[#8a94a2] mb-1">Target Gross Margin (%)</label>
                <input
                  type="number"
                  min="20"
                  max="70"
                  step="1"
                  value={targetMarginPercent}
                  onChange={e => setTargetMarginPercent(Number(e.target.value))}
                  className="w-full bg-[#121417] border border-[#2f3540] text-white font-mono text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
                />
              </div>
            </div>

            {/* Calculated Breakdown Strip */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#22272e] text-center">
              <div className="bg-[#121417] rounded-lg p-2">
                <div className="text-[10px] text-[#717b88]">Revenue (Base PO)</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5">AED {contractValueAED.toLocaleString()}</div>
              </div>
              <div className="bg-[#121417] rounded-lg p-2">
                <div className="text-[10px] text-[#717b88]">Max Cost Budget</div>
                <div className="text-xs font-mono font-bold text-[#f59e0b] mt-0.5">AED {estimatedTotalCost.toLocaleString()}</div>
              </div>
              <div className="bg-[#121417] rounded-lg p-2">
                <div className="text-[10px] text-[#717b88]">Target Gross Profit</div>
                <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">AED {estimatedGrossProfit.toLocaleString()} ({targetMarginPercent}%)</div>
              </div>
            </div>
          </div>

          {/* Section 3: Leadership & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#a1abb8] mb-1.5">Line Producer</label>
              <select
                value={producerId}
                onChange={e => setProducerId(e.target.value)}
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.roleTitle.split('&')[0]})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#a1abb8] mb-1.5">Creative Director / DP</label>
              <select
                value={creativeDirectorId}
                onChange={e => setCreativeDirectorId(e.target.value)}
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
              >
                {users.map(u => (
                  <option key={u.id} value={u.id}>{u.name} ({u.roleTitle.split('&')[0]})</option>
                ))}
              </select>
            </div>
          </div>

          {/* Section 4: Schedule Milestone Dates */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] text-[#8a94a2] mb-1">Project Kickoff</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#8a94a2] mb-1">Target Shoot Date</label>
              <input
                type="date"
                value={shootStartDate}
                onChange={e => setShootStartDate(e.target.value)}
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#e50914]"
              />
            </div>

            <div>
              <label className="block text-[11px] text-[#8a94a2] mb-1">Final Delivery</label>
              <input
                type="date"
                value={deliveryDate}
                onChange={e => setDeliveryDate(e.target.value)}
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#e50914]"
              />
            </div>
          </div>

          {/* Section 5: Key Deliverables */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#a1abb8]">Primary Deliverables Scope</label>
            <div className="space-y-2">
              <input
                type="text"
                value={heroDeliverable}
                onChange={e => setHeroDeliverable(e.target.value)}
                placeholder="Hero film deliverable..."
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
              />
              <input
                type="text"
                value={socialDeliverable}
                onChange={e => setSocialDeliverable(e.target.value)}
                placeholder="Social adaptations..."
                className="w-full bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-[#22272e] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-[#8a94a2] hover:text-white hover:bg-[#1e2229] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#e50914]/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Initialize Project & Allocations</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
