import React, { useState } from 'react';
import { 
  Clapperboard, 
  MapPin, 
  Clock, 
  Users, 
  Camera, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Printer, 
  Send, 
  CheckCircle2, 
  DollarSign, 
  ExternalLink,
  ChevronRight,
  Sun,
  AlertCircle
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const ShootManagerView: React.FC = () => {
  const { 
    shoots, 
    selectedShootId, 
    setSelectedShootId, 
    updateCallSheetApproval,
    resolveBookingConflict,
    navigateToRecord 
  } = usePlatform();

  const [showCallSheetModal, setShowCallSheetModal] = useState(false);
  const [notificationSent, setNotificationSent] = useState(false);

  const shoot = shoots.find(s => s.id === selectedShootId) || shoots[0];

  if (!shoot) {
    return (
      <div className="p-12 text-center text-[#8a94a2] bg-[#141619] border border-[#23272e] rounded-xl">
        <Clapperboard className="w-8 h-8 text-[#e50914] mx-auto mb-2 opacity-60" />
        <p className="text-sm font-medium text-white">No active shoots available.</p>
      </div>
    );
  }

  const isConflictShoot = shoot.id === 'sht-405' && !shoot.callSheetApproved;

  const handleNotifyTeam = () => {
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3500);
  };

  const scheduleTimeline = [
    { time: shoot.callTime, activity: 'Crew Call, Set Safety Briefing & Kit Inspection', department: 'All Departments' },
    { time: '06:00 AM', activity: 'Lighting Rigging & Camera Rehearsal with Stand-ins', department: 'Camera & Grip' },
    { time: '08:00 AM', activity: 'Principal Photography - Scene 1 / Master Shots', department: 'Director & DP' },
    { time: '01:00 PM', activity: 'Hot Lunch Break & Media Card Backup / DIT Ingest', department: 'Production' },
    { time: '02:00 PM', activity: 'Scene 2 Coverage & Extreme Macro Close-ups', department: 'Camera & Talent' },
    { time: '05:30 PM', activity: 'Golden Hour Cinematography / Hero Sequences', department: 'Camera & Drone' },
    { time: shoot.wrapTime, activity: 'Director Wrap, Kit Breakdown & Hard Drive Handover', department: 'All Crew' },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Shoot Selector */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clapperboard className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Shoot Manager & Digital Call Sheets</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              PRODUCTION LOGISTICS
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            End-to-end set operations: Location permits, crew call times, camera packages, shoot economics, and digital call sheets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <select
            value={shoot.id}
            onChange={e => setSelectedShootId(e.target.value)}
            className="bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[#e50914]"
          >
            {shoots.map(s => (
              <option key={s.id} value={s.id}>{s.code} — {s.shootTitle} ({s.shootDate})</option>
            ))}
          </select>

          <button
            onClick={() => setShowCallSheetModal(true)}
            className="px-3.5 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-[#e50914]/20 transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Digital Call Sheet</span>
          </button>
        </div>
      </div>

      {/* Conflict Warning on SHT-26-405 */}
      {isConflictShoot && (
        <div className="bg-[#241316] border-l-4 border-l-[#e50914] border border-[#4a1c22] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#e50914] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Crew & Equipment Conflict: Sofia Rossi (DP) and Arri Mini LF double-booked
              </div>
              <div className="text-xs text-[#d18d94] mt-0.5">
                Sofia is simultaneously required on SHT-26-401 (Al Marmoom Desert) and this shoot (Chalhoub Stage A) on Sep 16.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => resolveBookingConflict('bkg-2', 'reschedule')}
              className="px-3 py-1.5 rounded bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold"
            >
              Reschedule to Sep 18
            </button>
            <button
              onClick={() => resolveBookingConflict('bkg-2', 'reassign')}
              className="px-3 py-1.5 rounded bg-[#1f242e] border border-[#353e4d] text-white text-xs font-medium hover:bg-[#2a323f]"
            >
              Assign Alternate DP
            </button>
          </div>
        </div>
      )}

      {/* Notification Toast Confirmation */}
      {notificationSent && (
        <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-4 py-2.5 rounded-lg text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Dispatched instant SMS & Calendar invitations to {shoot.crew?.length || 0} crew members with call times and location PIN.
          </span>
          <span className="font-mono text-[10px] uppercase text-emerald-400">STATUS: DELIVERED</span>
        </div>
      )}

      {/* Shoot Meta Summary Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Project Code</div>
          <div 
            onClick={() => navigateToRecord('project', shoot.projectId)}
            className="text-sm font-mono font-bold text-[#e50914] mt-1 cursor-pointer hover:underline flex items-center gap-1"
          >
            {shoot.projectCode} <ExternalLink className="w-3 h-3" />
          </div>
          <div className="text-[10px] text-[#717b88] mt-0.5 truncate">{shoot.clientName}</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Shoot Date</div>
          <div className="text-sm font-mono font-bold text-white mt-1">{shoot.shootDate}</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">{shoot.status}</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Call & Wrap Time</div>
          <div className="text-sm font-mono font-bold text-white mt-1">{shoot.callTime} – {shoot.wrapTime}</div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Production Call Schedule</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Direct Budget</div>
          <div className="text-sm font-mono font-bold text-white mt-1">AED {(shoot.estimatedShootCostAED || 0).toLocaleString()}</div>
          <div className="text-[10px] text-[#717b88] mt-0.5">Committed: AED {(shoot.committedShootCostAED || 0).toLocaleString()}</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Location Permit</div>
          <div className="text-sm font-mono font-bold text-emerald-400 mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> {shoot.logistics?.permitStatus || 'Approved'}
          </div>
          <div className="text-[10px] text-[#717b88] mt-0.5 font-mono">{shoot.logistics?.permitNumber || 'N/A'}</div>
        </div>

        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-3.5">
          <div className="text-[11px] text-[#717b88]">Call Sheet Status</div>
          <div className={`text-sm font-mono font-bold mt-1 ${shoot.callSheetApproved ? 'text-emerald-400' : 'text-amber-400'}`}>
            {shoot.callSheetApproved ? 'Dispatched' : 'Pending Approval'}
          </div>
          <div className="text-[10px] text-[#717b88] mt-0.5 font-mono">{shoot.lastCallSheetUpdate?.split(' ')[0] || shoot.shootDate}</div>
        </div>
      </div>

      {/* Main Grid: Crew & Equipment vs Logistics & Economics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Crew Assignment & Equipment Package */}
        <div className="lg:col-span-2 space-y-6">
          {/* Crew Manifest Table */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Assigned Crew Manifest ({shoot.crew.length} Personnel)</h3>
                <p className="text-[11px] text-[#717b88]">Department roles, call times, and confirmation status</p>
              </div>
              <button
                onClick={handleNotifyTeam}
                className="px-3 py-1.5 rounded bg-[#1e222a] border border-[#313845] hover:border-emerald-500 text-white text-xs flex items-center gap-1.5 transition-colors"
              >
                <Send className="w-3 h-3 text-emerald-400" />
                <span>Notify Crew</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px]">
                    <th className="pb-2 font-normal">Role</th>
                    <th className="pb-2 font-normal">Crew Member</th>
                    <th className="pb-2 font-normal">Call Time</th>
                    <th className="pb-2 font-normal">Contact Phone</th>
                    <th className="pb-2 font-normal text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1b1f26]">
                  {shoot.crew.map(c => (
                    <tr key={c.memberId || c.role} className="hover:bg-[#181b21]">
                      <td className="py-3 font-medium text-white">{c.role}</td>
                      <td className="py-3 text-[#9ba3af] font-semibold">{c.memberName}</td>
                      <td className="py-3 font-mono text-white">{c.callTime}</td>
                      <td className="py-3 font-mono text-[#717b88]">{c.contactNumber}</td>
                      <td className="py-3 text-right">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          c.status === 'Confirmed' 
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                            : 'bg-amber-950 text-amber-400 border border-amber-800'
                        }`}>
                          {c.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Camera, Sound & Lighting Equipment Package */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white">Equipment Package Manifest</h3>
                <p className="text-[11px] text-[#717b88]">Internal kit allocations & third-party rental packages</p>
              </div>
              <Camera className="w-4 h-4 text-[#e50914]" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {shoot.equipment.map(eq => (
                <div key={eq.id} className="p-3.5 rounded-lg bg-[#181b20] border border-[#262b34] text-xs flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{eq.description}</div>
                    <div className="text-[10px] text-[#717b88] font-mono mt-0.5">
                      {eq.category} • {eq.supplier} • AED {eq.dailyCostAED.toLocaleString()}/day
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                    eq.status === 'Reserved' || eq.status === 'On Set' ? 'bg-emerald-950 text-emerald-400' : 'bg-sky-950 text-sky-400'
                  }`}>
                    {eq.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Location, Security & Logistics */}
        <div className="space-y-6">
          {/* Location & Safety Dossier */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 text-xs">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-[#e50914]" />
              <h3 className="text-sm font-semibold text-white">Location & Safety Intelligence</h3>
            </div>

            <div className="space-y-3">
              <div>
                <div className="text-[10px] font-mono text-[#717b88] uppercase">Set Location</div>
                <div className="font-bold text-white mt-0.5">{shoot.logistics.locationName}</div>
                <div className="text-[11px] text-[#8a94a2]">{shoot.logistics.locationAddress}</div>
                <div className="text-[10px] font-mono text-[#e50914] mt-1">{shoot.logistics.locationAccessNotes}</div>
              </div>

              <div className="pt-2 border-t border-[#20242b]">
                <div className="text-[10px] font-mono text-[#717b88] uppercase">Nearest Emergency Hospital</div>
                <div className="font-semibold text-white mt-0.5">{shoot.logistics.nearestHospital}</div>
                <div className="text-[11px] font-mono text-emerald-400">Direct Emergency: {shoot.logistics.hospitalPhone} (Police 999 / Amb 998)</div>
              </div>

              <div className="pt-2 border-t border-[#20242b]">
                <div className="text-[10px] font-mono text-[#717b88] uppercase">Weather Forecast</div>
                <div className="text-white mt-0.5 flex items-center justify-between">
                  <span>{shoot.logistics.weatherForecast}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#20242b]">
                <div className="text-[10px] font-mono text-[#717b88] uppercase">Catering & Parking Logistics</div>
                <div className="text-[#8a94a2] mt-0.5 leading-relaxed">
                  {shoot.logistics.cateringPlan} {shoot.logistics.parkingNotes}
                </div>
              </div>
            </div>
          </div>

          {/* Shoot Cost Control Card */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 text-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-white">Shoot Day Cost Control</h3>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="space-y-2.5 font-mono text-[11px]">
              <div className="flex items-center justify-between text-[#8a94a2]">
                <span>Estimated Shoot Cost:</span>
                <span className="text-white">AED {(shoot.estimatedShootCostAED || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#8a94a2]">
                <span>Committed Costs:</span>
                <span className="text-white">AED {(shoot.committedShootCostAED || 0).toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[#8a94a2]">
                <span>Overtime Hours:</span>
                <span className="text-white">{shoot.overtimeHours || 0} hours</span>
              </div>
              <div className="pt-2 border-t border-[#20242b] flex items-center justify-between text-white font-bold">
                <span>Total Committed & OT:</span>
                <span className="text-emerald-400">AED {((shoot.committedShootCostAED || 0) + (shoot.overtimeCostAED || 0)).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#20242b] flex items-center justify-between">
              <span className="text-[11px] text-[#717b88]">Call Sheet Action</span>
              <button
                onClick={() => updateCallSheetApproval(shoot.id, !shoot.callSheetApproved)}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  shoot.callSheetApproved
                    ? 'bg-[#1f242e] text-[#9ba3af] hover:text-white'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                }`}
              >
                {shoot.callSheetApproved ? 'Unlock Call Sheet' : 'Approve & Lock Call Sheet'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable / Formatted Digital Call Sheet Modal */}
      {showCallSheetModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0f1013] border border-[#2f3542] rounded-2xl w-full max-w-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8">
            {/* Call Sheet Top Brand Banner */}
            <div className="flex items-start justify-between border-b-2 border-[#e50914] pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-white bg-[#e50914] px-2 py-0.5 rounded">
                    OFFICIAL CALL SHEET
                  </span>
                  <span className="font-mono text-xs text-[#9ba3af]">{shoot.code}</span>
                </div>
                <h2 className="text-xl font-bold text-white tracking-tight">{shoot.shootTitle}</h2>
                <div className="text-xs text-[#8a94a2] mt-0.5">
                  Project: <strong className="text-white">{shoot.projectCode}</strong> | Client: {shoot.clientName}
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <div className="text-white font-bold">{shoot.shootDate}</div>
                <div className="text-[#e50914] font-bold text-sm mt-0.5">GENERAL CALL: {shoot.callTime}</div>
                <div className="text-[#717b88]">EST. WRAP: {shoot.wrapTime}</div>
              </div>
            </div>

            {/* Set Location & Emergency Hospital */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#15171b] border border-[#262b35] rounded-xl p-4 text-xs">
              <div>
                <div className="text-[10px] font-mono text-[#e50914] uppercase font-bold">Location & Access</div>
                <div className="text-white font-bold mt-1">{shoot.logistics.locationName}</div>
                <div className="text-[#8a94a2]">{shoot.logistics.locationAddress}</div>
                <div className="text-[11px] font-mono text-[#9ba3af] mt-1">{shoot.logistics.locationAccessNotes}</div>
              </div>

              <div>
                <div className="text-[10px] font-mono text-[#e50914] uppercase font-bold">Emergency & Safety</div>
                <div className="text-white font-bold mt-1">{shoot.logistics.nearestHospital}</div>
                <div className="text-[#8a94a2]">Tel: {shoot.logistics.hospitalPhone} (DFTC Permit: {shoot.logistics.permitNumber})</div>
                <div className="text-[11px] text-[#9ba3af] mt-1">{shoot.logistics.weatherForecast}</div>
              </div>
            </div>

            {/* Day's Shooting Schedule Timeline */}
            <div>
              <div className="text-xs font-mono uppercase text-[#717b88] mb-2 font-bold">Production Schedule</div>
              <div className="space-y-1.5 text-xs font-mono">
                {scheduleTimeline.map((item, idx) => (
                  <div key={idx} className="p-2 rounded bg-[#15171b] border border-[#222731] flex items-center justify-between">
                    <span className="text-[#e50914] font-bold">{item.time}</span>
                    <span className="text-white flex-1 px-4">{item.activity}</span>
                    <span className="text-[#8a94a2] text-[11px]">{item.department}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Crew Call Times */}
            <div>
              <div className="text-xs font-mono uppercase text-[#717b88] mb-2 font-bold">Crew Call Times</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-[#222731] text-[#717b88] uppercase text-[10px]">
                      <th className="pb-1.5 font-normal">Role</th>
                      <th className="pb-1.5 font-normal">Name</th>
                      <th className="pb-1.5 font-normal">Call Time</th>
                      <th className="pb-1.5 font-normal text-right">Contact Phone</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c2027]">
                    {shoot.crew.map(c => (
                      <tr key={c.memberId || c.role}>
                        <td className="py-2 text-[#8a94a2]">{c.role}</td>
                        <td className="py-2 text-white font-semibold">{c.memberName}</td>
                        <td className="py-2 text-emerald-400 font-bold">{c.callTime}</td>
                        <td className="py-2 text-right text-[#9ba3af]">{c.contactNumber}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-[#22262d]">
              <div className="text-[11px] text-[#717b88]">
                {shoot.callSheetApproved ? '✓ Verified & Cleared by Line Producer' : '⚠ Call Sheet Draft awaiting final sign-off'}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCallSheetModal(false)}
                  className="px-4 py-2 rounded-lg bg-[#1a1d22] hover:bg-[#252a32] text-white text-xs"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 rounded-lg bg-[#20252e] hover:bg-[#2a313e] text-white text-xs font-semibold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
