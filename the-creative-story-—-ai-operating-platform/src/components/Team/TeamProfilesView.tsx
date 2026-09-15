import React, { useState, useMemo } from 'react';
import { 
  Users, 
  Camera, 
  ShieldCheck, 
  Lock, 
  Eye, 
  Calendar, 
  Award, 
  TrendingUp,
  FolderGit2,
  CheckCircle2,
  Layers,
  Search,
  Filter,
  Sparkles,
  Clock,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Wrench,
  MapPin,
  Check,
  AlertCircle
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { CREATIVE_STORY_SUBCALENDARS, TeamupSubCalendar } from '../../data/teamupCalendarData';
import { User, EquipmentResource } from '../../types/operatingPlatform';
import { CrewAvailabilityRadar } from './CrewAvailabilityRadar';

type TeamTab = 'teamup-crew' | 'availability-radar' | 'personnel' | 'equipment';

export const TeamProfilesView: React.FC = () => {
  const { 
    users = [], 
    equipment = [], 
    currentUser, 
    kpiScorecards = [], 
    bookings = [], 
    projects = [],
    setActiveScreen,
    navigateToRecord 
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<TeamTab>('teamup-crew');
  const [selectedUserId, setSelectedUserId] = useState<string>(users[0]?.id || '');
  const [selectedCrewId, setSelectedCrewId] = useState<string>(CREATIVE_STORY_SUBCALENDARS[0]?.id || 'albin');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [equipmentCategoryFilter, setEquipmentCategoryFilter] = useState<string>('all');

  // Check if current user is authorized to view confidential internal cost rates
  const canViewFinancialRates = currentUser ? ['founder', 'finance'].includes(currentUser.role) : false;

  // Selected User for Core Staff tab
  const selectedUser: User | undefined = users.find(u => u.id === selectedUserId) || users[0];
  const userScorecard = selectedUser ? kpiScorecards.find(k => k.userId === selectedUser.id) : undefined;
  const userBookings = selectedUser ? bookings.filter(b => b.resourceId === selectedUser.id) : [];

  // Selected Teamup Sub-Calendar Member for Crew tab
  const selectedCrewMember: TeamupSubCalendar = 
    CREATIVE_STORY_SUBCALENDARS.find(c => c.id === selectedCrewId) || CREATIVE_STORY_SUBCALENDARS[0];

  // Filtered Creative Story 20 Crew Channels
  const filteredCrew = useMemo(() => {
    return CREATIVE_STORY_SUBCALENDARS.filter(member => {
      const matchesSearch = searchQuery.trim() === '' || 
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (member.upcomingAssignment && member.upcomingAssignment.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || member.currentStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  // Filtered Core Staff Users
  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = searchQuery.trim() === '' ||
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (u.skills && u.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesStatus = statusFilter === 'all' || u.activeStatus === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // Filtered Equipment Fleet
  const filteredEquipment = useMemo(() => {
    return equipment.filter(eq => {
      const matchesSearch = searchQuery.trim() === '' ||
        eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = equipmentCategoryFilter === 'all' || eq.category === equipmentCategoryFilter;
      const matchesStatus = statusFilter === 'all' || eq.currentStatus === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [equipment, searchQuery, equipmentCategoryFilter, statusFilter]);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Team, Crew & Resource Fleet</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              20 CREATIVE STORY CHANNELS
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Production roster, on-set talent assignments, internal day cost rates, camera gear fleet, and KPI scorecards.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex flex-wrap items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
          <button
            onClick={() => { setActiveTab('availability-radar'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'availability-radar' ? 'bg-[#e50914] text-white shadow font-bold' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Live Availability Radar (Who is Free)</span>
          </button>
          <button
            onClick={() => { setActiveTab('teamup-crew'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'teamup-crew' ? 'bg-[#e50914] text-white shadow' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Creative Story Crew ({CREATIVE_STORY_SUBCALENDARS.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('personnel'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'personnel' ? 'bg-[#e50914] text-white shadow' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Core Staff & KPIs ({users.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('equipment'); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'equipment' ? 'bg-[#e50914] text-white shadow' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Equipment Fleet ({equipment.length})</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#121417] border border-[#21252d] rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] max-w-md">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 text-[#626c7a] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={
                activeTab === 'teamup-crew' ? 'Search 20 crew channels or assignments...' :
                activeTab === 'personnel' ? 'Search personnel, skills, or role...' :
                'Search equipment name, code, or location...'
              }
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#181b21] border border-[#292f3b] text-white text-xs rounded-lg pl-9 pr-3 py-1.5 focus:outline-none focus:border-[#e50914] placeholder-[#555e6c]"
            />
          </div>
        </div>

        {/* Status / Category Dropdowns */}
        <div className="flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5 bg-[#181b21] border border-[#292f3b] rounded-lg px-2.5 py-1 text-[#8a94a2]">
            <Filter className="w-3 h-3 text-[#e50914]" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
            >
              <option value="all" className="bg-[#181b21] text-white">All Statuses</option>
              {activeTab === 'teamup-crew' ? (
                <>
                  <option value="On Shoot" className="bg-[#181b21] text-white">On Shoot</option>
                  <option value="Available" className="bg-[#181b21] text-white">Available</option>
                  <option value="In Studio" className="bg-[#181b21] text-white">In Studio</option>
                  <option value="Edit Suite" className="bg-[#181b21] text-white">Edit Suite</option>
                  <option value="Off / Holiday" className="bg-[#181b21] text-white">Off / Holiday</option>
                </>
              ) : activeTab === 'personnel' ? (
                <>
                  <option value="Available" className="bg-[#181b21] text-white">Available</option>
                  <option value="On Shoot" className="bg-[#181b21] text-white">On Shoot</option>
                  <option value="Booked" className="bg-[#181b21] text-white">Booked</option>
                </>
              ) : (
                <>
                  <option value="Available" className="bg-[#181b21] text-white">Available</option>
                  <option value="Booked On Set" className="bg-[#181b21] text-white">Booked On Set</option>
                  <option value="In Maintenance" className="bg-[#181b21] text-white">In Maintenance</option>
                </>
              )}
            </select>
          </div>

          {activeTab === 'equipment' && (
            <div className="flex items-center gap-1.5 bg-[#181b21] border border-[#292f3b] rounded-lg px-2.5 py-1 text-[#8a94a2]">
              <Camera className="w-3 h-3 text-[#e50914]" />
              <span>Category:</span>
              <select
                value={equipmentCategoryFilter}
                onChange={e => setEquipmentCategoryFilter(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="all" className="bg-[#181b21] text-white">All Categories</option>
                <option value="Camera System" className="bg-[#181b21] text-white">Camera System</option>
                <option value="Cinema Lenses" className="bg-[#181b21] text-white">Cinema Lenses</option>
                <option value="Lighting & Astera" className="bg-[#181b21] text-white">Lighting & Astera</option>
                <option value="Grip & Dolly" className="bg-[#181b21] text-white">Grip & Dolly</option>
                <option value="Audio & Wireless" className="bg-[#181b21] text-white">Audio & Wireless</option>
                <option value="DIT & Monitoring" className="bg-[#181b21] text-white">DIT & Monitoring</option>
              </select>
            </div>
          )}

          <button
            onClick={() => setActiveScreen('calendar')}
            className="px-3 py-1.5 rounded-lg bg-[#1a1d24] hover:bg-[#242933] border border-[#2f3542] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-[#e50914]" />
            <span>Open Calendar</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 0: LIVE CREW AVAILABILITY RADAR */}
      {/* ========================================================================= */}
      {activeTab === 'availability-radar' && (
        <CrewAvailabilityRadar />
      )}

      {/* ========================================================================= */}
      {/* TAB 1: CREATIVE STORY 20 SUB-CALENDAR CHANNELS (TEAMUP ROSTER) */}
      {/* ========================================================================= */}
      {activeTab === 'teamup-crew' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: 20 Channels Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono uppercase text-[#717b88] px-1 pb-1">
              <span>Crew Channels ({filteredCrew.length})</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Active Roster</span>
            </div>

            <div className="space-y-1.5 max-h-[640px] overflow-y-auto pr-1 custom-scrollbar">
              {filteredCrew.map(member => {
                const isSelected = member.id === selectedCrewMember.id;
                return (
                  <div
                    key={member.id}
                    onClick={() => setSelectedCrewId(member.id)}
                    style={{
                      backgroundColor: isSelected ? member.bgHex : '#14161a',
                      borderColor: isSelected ? member.borderHex : '#23272e'
                    }}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-2 shadow-sm hover:brightness-110 ${
                      isSelected ? 'ring-2 ring-white/50 text-white' : 'text-[#a1abb7] hover:border-[#353d4b]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                        style={{ backgroundColor: member.bgHex }}
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                          <span>{member.name}</span>
                          <span 
                            style={{ 
                              color: isSelected ? '#ffffff' : member.textHex,
                              backgroundColor: isSelected ? 'rgba(0,0,0,0.3)' : member.bgHex 
                            }}
                            className="text-[9px] font-mono px-1 rounded uppercase font-semibold"
                          >
                            {member.type}
                          </span>
                        </div>
                        <div className={`text-[11px] truncate mt-0.5 ${isSelected ? 'text-white/90' : 'text-[#717b88]'}`}>
                          {member.role}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        member.currentStatus === 'On Shoot' 
                          ? isSelected ? 'bg-black/30 text-white' : 'bg-emerald-950 text-emerald-400'
                          : member.currentStatus === 'In Studio'
                          ? isSelected ? 'bg-black/30 text-white' : 'bg-sky-950 text-sky-400'
                          : member.currentStatus === 'Edit Suite'
                          ? isSelected ? 'bg-black/30 text-white' : 'bg-purple-950 text-purple-400'
                          : isSelected ? 'bg-black/30 text-white' : 'bg-[#1f232a] text-[#8a94a2]'
                      }`}>
                        {member.currentStatus}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Selected Crew Member Profile & Active Assignments */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crew Member Header Card */}
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#20242c]">
                <div className="flex items-start gap-4">
                  <div 
                    style={{ backgroundColor: selectedCrewMember.bgHex }}
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold font-mono shadow-lg border border-white/20 shrink-0"
                  >
                    {selectedCrewMember.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-white">{selectedCrewMember.name}</h2>
                      <span 
                        style={{ backgroundColor: selectedCrewMember.bgHex, color: selectedCrewMember.textHex }}
                        className="text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase shadow-sm"
                      >
                        {selectedCrewMember.colorName}
                      </span>
                    </div>
                    <div className="text-xs text-[#e50914] font-medium mt-0.5">{selectedCrewMember.role}</div>
                    <div className="text-xs text-[#717b88] mt-1 font-mono">
                      Channel Type: {selectedCrewMember.type.toUpperCase()} • Timezone: Asia/Dubai (GST)
                    </div>
                  </div>
                </div>

                {/* Status Indicator & Calendar Switcher */}
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded text-xs font-mono uppercase font-bold flex items-center gap-1.5 ${
                      selectedCrewMember.currentStatus === 'On Shoot' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      selectedCrewMember.currentStatus === 'In Studio' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                      selectedCrewMember.currentStatus === 'Edit Suite' ? 'bg-purple-950 text-purple-400 border border-purple-800' :
                      'bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]'
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      {selectedCrewMember.currentStatus}
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveScreen('calendar')}
                    className="text-[11px] text-[#e50914] hover:underline font-mono flex items-center gap-1 mt-1"
                  >
                    View in Teamup Calendar <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Current Assignment Callout */}
              <div className="py-4 border-b border-[#20242c]">
                <div className="text-[11px] font-mono uppercase text-[#717b88] mb-2 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>Current Production Call Sheet & Assignment</span>
                </div>
                <div className="bg-[#181b21] border border-[#262c37] rounded-lg p-3.5 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white">
                      {selectedCrewMember.upcomingAssignment || 'General Availability on Standby'}
                    </div>
                    <div className="text-[11px] text-[#8a94a2] mt-1 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-[#e50914]" />
                      <span>Dubai Production Hub & Studio Stage A</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#13151a] text-emerald-400 border border-emerald-900 shrink-0">
                    DISPATCH CONFIRMED
                  </span>
                </div>
              </div>

              {/* Quick Details Grid */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#181b20] border border-[#242933] rounded-lg p-3">
                  <div className="text-[10px] text-[#717b88] font-mono uppercase">Role Specialization</div>
                  <div className="text-white font-semibold mt-1">{selectedCrewMember.role}</div>
                </div>
                <div className="bg-[#181b20] border border-[#242933] rounded-lg p-3">
                  <div className="text-[10px] text-[#717b88] font-mono uppercase">Calendar ID</div>
                  <div className="text-white font-mono font-semibold mt-1">teamup-{selectedCrewMember.id}</div>
                </div>
                <div className="bg-[#181b20] border border-[#242933] rounded-lg p-3">
                  <div className="text-[10px] text-[#717b88] font-mono uppercase">Roster Group</div>
                  <div className="text-emerald-400 font-mono font-semibold mt-1 capitalize">{selectedCrewMember.type} Channel</div>
                </div>
              </div>
            </div>

            {/* Production Operating Guidelines */}
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 text-xs space-y-3">
              <div className="flex items-center gap-2 text-white font-bold">
                <Sparkles className="w-4 h-4 text-[#e50914]" />
                <span>Call Sheet & Shoot Protocol for {selectedCrewMember.name}</span>
              </div>
              <p className="text-[#8a94a2] leading-relaxed text-[11px]">
                Assignments for {selectedCrewMember.name} are synchronized with the live Teamup calendar. Overlapping events in the calendar trigger automated conflict warnings to avoid double-booking on production days.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono">
                <button
                  onClick={() => setActiveScreen('calendar')}
                  className="px-3 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Open {selectedCrewMember.name}'s Calendar Schedule</span>
                </button>
                <button
                  onClick={() => setActiveScreen('shoots')}
                  className="px-3 py-1.5 rounded-lg bg-[#181b21] hover:bg-[#222731] border border-[#2a313d] text-white font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <FolderGit2 className="w-3.5 h-3.5 text-[#e50914]" />
                  <span>Go to Shoot Manager</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CORE PERSONNEL, ROLES, RATES & KPI SCORECARDS */}
      {/* ========================================================================= */}
      {activeTab === 'personnel' && selectedUser && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Personnel Selector */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase text-[#717b88] px-1">Talent Roster ({filteredUsers.length})</div>
            {filteredUsers.map(u => {
              const isSelected = u.id === selectedUser.id;
              const isLead = u.role === 'founder' || u.role === 'bd';
              return (
                <div
                  key={u.id}
                  onClick={() => setSelectedUserId(u.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected 
                      ? 'bg-[#181b21] border-[#e50914] shadow-lg shadow-black/40' 
                      : 'bg-[#141619] border-[#23272e] hover:border-[#353c48]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={u.avatar} 
                      alt={u.name} 
                      className="w-9 h-9 rounded-full object-cover border border-[#2e3541]" 
                    />
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{u.name}</span>
                        {u.employmentType === 'freelancer' && (
                          <span className="text-[9px] font-mono px-1 rounded bg-[#20252e] text-[#8a94a2]">FREELANCE</span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#717b88]">{u.roleTitle}</div>
                    </div>
                  </div>

                  <div className="text-right font-mono text-[11px]">
                    <span className="text-emerald-400 font-bold">{u.kpiScore || 90}%</span>
                    <div className="text-[9px] text-[#6b7582]">KPI Score</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right 2 Columns: Selected User Profile & Scorecard */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Main Card */}
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-5 border-b border-[#20242c]">
                <div className="flex items-start gap-4">
                  <img 
                    src={selectedUser.avatar} 
                    alt={selectedUser.name} 
                    className="w-16 h-16 rounded-xl object-cover border-2 border-[#2b313d]" 
                  />
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedUser.name}</h2>
                    <div className="text-xs text-[#e50914] font-medium mt-0.5">{selectedUser.roleTitle}</div>
                    <div className="text-xs text-[#717b88] mt-1 font-mono">
                      {selectedUser.department} • Capacity: {selectedUser.capacityDaysPerMonth || 22} days/mo
                    </div>
                  </div>
                </div>

                {/* Confidential Internal Cost Rate (Role Guarded) */}
                <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] text-right font-mono">
                  <div className="text-[10px] text-[#717b88] uppercase flex items-center justify-end gap-1">
                    {!canViewFinancialRates && <Lock className="w-3 h-3 text-[#e50914]" />}
                    <span>Internal Direct Cost</span>
                  </div>
                  {canViewFinancialRates ? (
                    <>
                      <div className="text-sm font-bold text-white mt-0.5">
                        AED {(selectedUser.dailyCostRateAED || 0).toLocaleString()}/day
                      </div>
                      <div className="text-[10px] text-[#717b88]">
                        AED {(selectedUser.hourlyCostRateAED || 0).toLocaleString()}/hour base
                      </div>
                    </>
                  ) : (
                    <div className="text-xs font-mono text-[#6b7582] mt-1">RESTRICTED (FINANCE ONLY)</div>
                  )}
                </div>
              </div>

              {/* Skills Tags */}
              <div className="py-4 border-b border-[#20242c]">
                <div className="text-[11px] font-mono uppercase text-[#717b88] mb-2">Core Competencies & Capabilities</div>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedUser.skills || []).map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded bg-[#1b1e24] border border-[#272c36] text-xs text-[#9ba3af]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Upcoming Bookings for this User */}
              <div className="pt-4">
                <div className="text-xs font-mono uppercase text-[#717b88] mb-3">
                  Active Bookings ({userBookings.length} assignments)
                </div>
                {userBookings.length === 0 ? (
                  <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] text-xs text-[#717b88]">
                    No active production bookings assigned for this cycle. Available for allocation.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {userBookings.map(b => (
                      <div key={b.id} className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-white">{b.projectTitle || b.notes}</div>
                          <div className="text-[11px] text-[#717b88] font-mono">
                            {b.date} • Role: {b.roleOrCategory}
                          </div>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                          b.status === 'Confirmed' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* KPI Performance Scorecard */}
            {userScorecard && (
              <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-semibold text-white">September 2026 KPI Performance Scorecard</h3>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-[#8a94a2]">Composite Score:</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                      {userScorecard.compositeScore}%
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {(userScorecard.metrics || []).map((m, idx) => {
                    const achievement = m.achievementRatePercent || 0;
                    const isExceeded = achievement >= 100;
                    return (
                      <div key={idx} className="p-3.5 rounded-lg bg-[#181b20] border border-[#262b34] text-xs space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-white">{m.name}</span>
                            <span className="text-[10px] font-mono text-[#717b88] ml-2">Weight: {m.weightPercent}%</span>
                          </div>
                          <span className={`font-mono font-bold ${isExceeded ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {achievement}% of Target
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full bg-[#121417] h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${isExceeded ? 'bg-emerald-500' : 'bg-[#e50914]'}`}
                            style={{ width: `${Math.min(achievement, 100)}%` }}
                          />
                        </div>

                        <div className="flex items-center justify-between text-[11px] font-mono text-[#8a94a2]">
                          <span>Target: <strong className="text-white">{(m.targetValue || 0).toLocaleString()} {m.unit}</strong></span>
                          <span>Actual: <strong className="text-emerald-400">{(m.actualValue || 0).toLocaleString()} {m.unit}</strong></span>
                        </div>

                        {m.formulaExplanation && (
                          <div className="text-[10px] text-[#717b88] italic pt-1 border-t border-[#20242b]">
                            Formula logic: {m.formulaExplanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: CAMERA, LIGHTING & AUDIO FLEET INVENTORY */}
      {/* ========================================================================= */}
      {activeTab === 'equipment' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Camera Packages, Lenses & Lighting Fleet</h3>
              <p className="text-[11px] text-[#717b88]">Internal kit inventory, replacement values, daily rental chargebacks, and active dispatch</p>
            </div>
            <span className="font-mono text-xs text-[#8a94a2]">{filteredEquipment.length} Fleet Items</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#22272f] text-[#717b88] font-mono uppercase text-[10px] bg-[#121417]">
                  <th className="py-3 px-4 font-normal">Asset Code</th>
                  <th className="py-3 px-4 font-normal">Equipment Name</th>
                  <th className="py-3 px-4 font-normal">Category</th>
                  <th className="py-3 px-4 font-normal text-right">Internal Day Rate</th>
                  <th className="py-3 px-4 font-normal text-right">Replacement Value</th>
                  <th className="py-3 px-4 font-normal">Current Location</th>
                  <th className="py-3 px-4 font-normal text-right">Dispatch Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1b1f26]">
                {filteredEquipment.map(eq => (
                  <tr key={eq.id} className="hover:bg-[#181b21] transition-colors">
                    <td className="py-3 px-4 font-mono text-[#e50914] font-semibold">{eq.code}</td>
                    <td className="py-3 px-4 text-white font-medium">{eq.name}</td>
                    <td className="py-3 px-4 text-[#8a94a2]">{eq.category}</td>
                    <td className="py-3 px-4 font-mono text-right font-bold text-white">
                      AED {(eq.dailyRateAED || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-right text-[#8a94a2]">
                      AED {(eq.replacementValueAED || 0).toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-emerald-400 font-mono flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-[#717b88] shrink-0" />
                      <span>{eq.location}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        eq.currentStatus === 'Available' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        eq.currentStatus === 'Booked On Set' ? 'bg-sky-950 text-sky-400 border border-sky-800' :
                        'bg-amber-950 text-amber-400 border border-amber-800'
                      }`}>
                        {eq.currentStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

