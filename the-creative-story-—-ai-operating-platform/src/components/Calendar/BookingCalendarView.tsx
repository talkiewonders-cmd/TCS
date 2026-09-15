import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Users, 
  Camera, 
  Filter, 
  RefreshCw, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink,
  ShieldAlert,
  SlidersHorizontal,
  Sparkles
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { TeamupCalendarView } from './TeamupCalendarView';

export const BookingCalendarView: React.FC = () => {
  const { 
    bookings, 
    users, 
    equipment, 
    currentUser, 
    resolveBookingConflict, 
    navigateToRecord 
  } = usePlatform();

  // Active view: default to 'teamup' (our native Teamup calendar clone)
  const [viewMode, setViewMode] = useState<'teamup' | 'resource-gantt' | 'my-bookings'>('teamup');
  const [resourceFilter, setResourceFilter] = useState<'all' | 'crew' | 'equipment'>('all');
  const [showResolvedSuccess, setShowResolvedSuccess] = useState(false);

  const hasActiveConflict = bookings.some(b => b.hasConflict);

  // Filter bookings based on active user role if viewing "My Bookings"
  const myBookings = bookings.filter(b => b.resourceId === currentUser.id);

  const handleQuickResolve = (bookingId: string, action: 'reschedule' | 'reassign') => {
    resolveBookingConflict(bookingId, action);
    setShowResolvedSuccess(true);
    setTimeout(() => setShowResolvedSuccess(false), 4000);
  };

  // Calendar dates for September 2026 week 38 (Sep 14 - Sep 20)
  const DATES = [
    { date: '2026-09-14', day: 'Mon', dayNum: '14' },
    { date: '2026-09-15', day: 'Tue', dayNum: '15' },
    { date: '2026-09-16', day: 'Wed', dayNum: '16', isKeyDate: true },
    { date: '2026-09-17', day: 'Thu', dayNum: '17' },
    { date: '2026-09-18', day: 'Fri', dayNum: '18' },
    { date: '2026-09-19', day: 'Sat', dayNum: '19' },
    { date: '2026-09-20', day: 'Sun', dayNum: '20' }
  ];

  // Combined resource list
  const allResources = [
    ...users.map(u => ({ id: u.id, name: u.name, type: 'crew' as const, sub: u.roleTitle, isFreelance: u.isFreelancer })),
    ...equipment.map(e => ({ id: e.id, name: e.name, type: 'equipment' as const, sub: `${e.category} (${e.serialNumber})`, isFreelance: false }))
  ].filter(r => {
    if (resourceFilter === 'crew') return r.type === 'crew';
    if (resourceFilter === 'equipment') return r.type === 'equipment';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Calendar Top Header */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarIcon className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Team Calendar & Master Bookings</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              NATIVE TEAMUP ENGINE
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Creative Story Team internal production operating calendar with 20 crew channels, multi-view scheduling, and double-booking conflict radar.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
            <button
              onClick={() => setViewMode('teamup')}
              className={`px-3 py-1.5 rounded font-medium transition-all flex items-center gap-1.5 ${
                viewMode === 'teamup' ? 'bg-[#e50914] text-white shadow' : 'text-[#8a94a2] hover:text-white'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5" />
              <span>Team Calendar (Teamup Engine)</span>
            </button>
            <button
              onClick={() => setViewMode('resource-gantt')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                viewMode === 'resource-gantt' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
              }`}
            >
              Resource Gantt
            </button>
            <button
              onClick={() => setViewMode('my-bookings')}
              className={`px-3 py-1.5 rounded font-medium transition-colors ${
                viewMode === 'my-bookings' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
              }`}
            >
              My Bookings ({myBookings.length})
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Conflict Resolution Banner */}
      {hasActiveConflict ? (
        <div className="bg-[#241316] border-l-4 border-l-[#e50914] border border-[#4a1c22] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-[#e50914] shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-white uppercase tracking-wider">
                Conflict Radar: Sofia Rossi (DP) Double-Booked on September 16, 2026
              </div>
              <div className="text-xs text-[#d18d94] mt-0.5">
                Overlapping between SHT-26-401 (Al Marmoom Desert - 05:00 Call) and SHT-26-405 (Chalhoub Stage A - 08:00 Call).
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleQuickResolve('bkg-2', 'reschedule')}
              className="px-3 py-1.5 rounded bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold shadow-md shadow-[#e50914]/20 transition-all"
            >
              Resolve: Reschedule SHT-405 to Sep 18
            </button>
            <button
              onClick={() => handleQuickResolve('bkg-2', 'reassign')}
              className="px-3 py-1.5 rounded bg-[#1c2028] border border-[#303744] hover:bg-[#252b36] text-white text-xs font-medium"
            >
              Reassign to Tariq Al Mansoor
            </button>
          </div>
        </div>
      ) : showResolvedSuccess ? (
        <div className="bg-emerald-950 border border-emerald-800 text-emerald-300 px-4 py-3 rounded-xl text-xs flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Conflict successfully resolved. Sofia Rossi's schedule is cleared with zero overlaps across Dubai sets.
          </span>
          <span className="font-mono text-[10px] uppercase text-emerald-400">CALENDAR RE-INDEXED</span>
        </div>
      ) : null}

      {/* VIEW 1: OUR OWN NATIVE TEAMUP-IDENTICAL CALENDAR */}
      {viewMode === 'teamup' && (
        <TeamupCalendarView />
      )}

      {/* VIEW 2: INTERNAL RESOURCE GANTT DISPATCH */}
      {viewMode === 'resource-gantt' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl overflow-hidden">
          {/* Gantt Filter Header */}
          <div className="p-3.5 border-b border-[#22272f] flex flex-wrap items-center justify-between gap-3 bg-[#111316]">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-[#717b88]">Filter Resources:</span>
              <div className="flex items-center rounded bg-[#181b20] border border-[#272c35] p-0.5 text-[11px]">
                {(['all', 'crew', 'equipment'] as const).map(f => (
                  <button
                    key={f}
                    onClick={() => setResourceFilter(f)}
                    className={`px-2.5 py-0.5 rounded capitalize font-medium ${
                      resourceFilter === f ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs font-mono text-[#8a94a2] flex items-center gap-3">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#e50914]" /> Conflict</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-600" /> Confirmed Shoot</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-600" /> Tentative Hold</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#2c323c]" /> Unavailable/Leave</span>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-[#22272f] text-[11px] font-mono text-[#717b88] bg-[#131518]">
                  <th className="py-3 px-4 w-64 border-r border-[#22272f] font-normal">Resource Name & Role</th>
                  {DATES.map(d => (
                    <th key={d.date} className={`py-3 px-2 text-center font-normal border-r border-[#22272f] ${d.isKeyDate ? 'bg-[#1a1517] text-[#e50914]' : ''}`}>
                      <div className="uppercase text-[10px]">{d.day}</div>
                      <div className="text-sm font-bold text-white mt-0.5">{d.dayNum}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26] text-xs">
                {allResources.map(resource => {
                  const resourceBookings = bookings.filter(b => b.resourceId === resource.id);

                  return (
                    <tr key={resource.id} className="hover:bg-[#181b21] transition-colors">
                      {/* Resource Column */}
                      <td className="py-3 px-4 border-r border-[#22272f]">
                        <div className="font-semibold text-white truncate">{resource.name}</div>
                        <div className="text-[10px] text-[#717b88] truncate">{resource.sub}</div>
                      </td>

                      {/* Day Columns */}
                      {DATES.map(d => {
                        const dayBookings = resourceBookings.filter(b => b.date === d.date);
                        const hasConflictToday = dayBookings.some(b => b.hasConflict);

                        return (
                          <td key={d.date} className={`py-2 px-1 border-r border-[#22272f] align-middle ${d.isKeyDate ? 'bg-[#181517]' : ''}`}>
                            <div className="space-y-1">
                              {dayBookings.map(b => (
                                <div
                                  key={b.id}
                                  onClick={() => b.shootId && navigateToRecord('shoot', b.shootId)}
                                  className={`p-1.5 rounded text-[10px] font-mono cursor-pointer transition-all ${
                                    b.hasConflict
                                      ? 'bg-red-950 text-red-300 border border-red-800 font-bold animate-pulse'
                                      : b.status === 'Confirmed'
                                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                      : b.status === 'Tentative Hold'
                                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                      : 'bg-[#20242b] text-[#8a94a2]'
                                  }`}
                                >
                                  <div className="truncate font-semibold">{b.projectCode || b.notes}</div>
                                  <div className="truncate text-[9px] opacity-80">{b.roleOrType}</div>
                                </div>
                              ))}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: MY BOOKINGS (Restricted crew / talent view) */}
      {viewMode === 'my-bookings' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Personal Schedule for {currentUser.name}</h3>
              <p className="text-[11px] text-[#717b88]">Your confirmed and tentative call sheets across upcoming shoots</p>
            </div>
            <span className="font-mono text-xs text-emerald-400">{myBookings.length} Booked Days</span>
          </div>

          <div className="space-y-3">
            {myBookings.length === 0 ? (
              <div className="p-6 text-center text-xs text-[#6b7582] bg-[#181b20] rounded-lg">
                No bookings assigned to your profile in this period.
              </div>
            ) : (
              myBookings.map(b => (
                <div
                  key={b.id}
                  onClick={() => b.shootId && navigateToRecord('shoot', b.shootId)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    b.hasConflict ? 'bg-[#221416] border-[#521e25]' : 'bg-[#181b20] border-[#262b34] hover:border-[#e50914]'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#e50914] font-bold">{b.date}</span>
                      <span className="text-xs font-semibold text-white">{b.projectTitle || b.notes}</span>
                      <span className="font-mono text-[10px] text-[#717b88]">({b.projectCode})</span>
                    </div>
                    <div className="text-[11px] text-[#8a94a2] mt-1">
                      Assigned Role: <strong className="text-white">{b.roleOrType}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                      b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                    }`}>
                      {b.status}
                    </span>
                    {b.shootId && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigateToRecord('shoot', b.shootId!);
                        }}
                        className="text-xs text-[#e50914] hover:underline font-medium"
                      >
                        Call Sheet →
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
