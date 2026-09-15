import React, { useState, useMemo } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Search, 
  Plus, 
  SlidersHorizontal, 
  Eye, 
  EyeOff, 
  Lock, 
  X, 
  Check, 
  AlertTriangle, 
  Film, 
  Layers, 
  CalendarDays, 
  List, 
  Grid3X3, 
  Edit3, 
  Trash2, 
  Sparkles,
  RefreshCw,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { 
  CREATIVE_STORY_SUBCALENDARS, 
  INITIAL_TEAMUP_EVENTS, 
  TeamupEvent, 
  TeamupSubCalendar 
} from '../../data/teamupCalendarData';
import { usePlatform } from '../../context/PlatformContext';

type TeamupViewMode = 'day' | 'week' | 'month' | 'scheduler' | 'agenda';

export const TeamupCalendarView: React.FC = () => {
  const { navigateToRecord } = usePlatform();

  // Calendar State
  const [events, setEvents] = useState<TeamupEvent[]>(INITIAL_TEAMUP_EVENTS);
  const [viewMode, setViewMode] = useState<TeamupViewMode>('week');
  const [currentDate, setCurrentDate] = useState<string>('2026-09-16'); // Wednesday of key shoot week
  const [selectedSubCalendarIds, setSelectedSubCalendarIds] = useState<string[]>(
    CREATIVE_STORY_SUBCALENDARS.map(s => s.id)
  );
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [calendarFilterQuery, setCalendarFilterQuery] = useState<string>('');

  // Modal State for Event Creation / Editing
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingEventId, setEditingEventId] = useState<string | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState<string>('');
  const [formSubCalendars, setFormSubCalendars] = useState<string[]>(['albin', 'anas']);
  const [formStartDate, setFormStartDate] = useState<string>('2026-09-16');
  const [formEndDate, setFormEndDate] = useState<string>('2026-09-16');
  const [formStartTime, setFormStartTime] = useState<string>('08:00');
  const [formEndTime, setFormEndTime] = useState<string>('18:00');
  const [formAllDay, setFormAllDay] = useState<boolean>(false);
  const [formLocation, setFormLocation] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formProjectCode, setFormProjectCode] = useState<string>('PRJ-26-081');

  // Mini Calendar Month Navigation
  const [miniCalendarMonth, setMiniCalendarMonth] = useState<number>(8); // 8 = September (0-indexed)
  const [miniCalendarYear, setMiniCalendarYear] = useState<number>(2026);

  // Days of current week based on currentDate
  const weekDays = useMemo(() => {
    // Standard week for Sep 14-20, 2026
    return [
      { date: '2026-09-14', dayName: 'Mon', dayNum: '14' },
      { date: '2026-09-15', dayName: 'Tue', dayNum: '15' },
      { date: '2026-09-16', dayName: 'Wed', dayNum: '16', isToday: true },
      { date: '2026-09-17', dayName: 'Thu', dayNum: '17' },
      { date: '2026-09-18', dayName: 'Fri', dayNum: '18' },
      { date: '2026-09-19', dayName: 'Sat', dayNum: '19' },
      { date: '2026-09-20', dayName: 'Sun', dayNum: '20' }
    ];
  }, []);

  // Time slots for Day and Week views (06:00 to 22:00)
  const timeSlots = useMemo(() => {
    const slots: string[] = [];
    for (let h = 6; h <= 22; h++) {
      const hh = h < 10 ? `0${h}` : `${h}`;
      slots.push(`${hh}:00`);
    }
    return slots;
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter(evt => {
      // Must match at least one selected sub-calendar
      const matchesSubCalendar = evt.subCalendarIds.some(id => selectedSubCalendarIds.includes(id));
      if (!matchesSubCalendar) return false;

      // Match search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesLoc = evt.location?.toLowerCase().includes(query) || false;
        const matchesDesc = evt.description?.toLowerCase().includes(query) || false;
        const matchesCrew = evt.subCalendarIds.some(cid => {
          const sub = CREATIVE_STORY_SUBCALENDARS.find(s => s.id === cid);
          return sub ? sub.name.toLowerCase().includes(query) || sub.role.toLowerCase().includes(query) : false;
        });
        if (!matchesTitle && !matchesLoc && !matchesDesc && !matchesCrew) return false;
      }

      return true;
    });
  }, [events, selectedSubCalendarIds, searchQuery]);

  // Sub-calendars list matching filter query in sidebar
  const visibleSubCalendars = useMemo(() => {
    return CREATIVE_STORY_SUBCALENDARS.filter(sub =>
      sub.name.toLowerCase().includes(calendarFilterQuery.toLowerCase()) ||
      sub.role.toLowerCase().includes(calendarFilterQuery.toLowerCase())
    );
  }, [calendarFilterQuery]);

  // Conflict Detection for Form
  const detectedConflicts = useMemo(() => {
    if (!isModalOpen) return [];
    return events.filter(evt => {
      if (modalMode === 'edit' && evt.id === editingEventId) return false;
      if (evt.startDate !== formStartDate) return false;

      // Check sub-calendar overlap
      const sharedSubs = evt.subCalendarIds.filter(id => formSubCalendars.includes(id));
      if (sharedSubs.length === 0) return false;

      // Check time overlap
      if (formAllDay || evt.allDay) return true;
      if (evt.startTime && evt.endTime && formStartTime && formEndTime) {
        return formStartTime < evt.endTime && formEndTime > evt.startTime;
      }
      return false;
    });
  }, [isModalOpen, modalMode, editingEventId, events, formStartDate, formSubCalendars, formAllDay, formStartTime, formEndTime]);

  // Sub-calendar toggle handlers
  const toggleSubCalendar = (id: string) => {
    setSelectedSubCalendarIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const selectAllSubCalendars = () => {
    setSelectedSubCalendarIds(CREATIVE_STORY_SUBCALENDARS.map(s => s.id));
  };

  const clearAllSubCalendars = () => {
    setSelectedSubCalendarIds([]);
  };

  // Open modal for new event
  const handleOpenCreateModal = (presetDate?: string, presetTime?: string) => {
    setModalMode('create');
    setEditingEventId(null);
    setFormTitle('');
    setFormSubCalendars(['albin', 'anas']);
    setFormStartDate(presetDate || currentDate);
    setFormEndDate(presetDate || currentDate);
    setFormStartTime(presetTime || '08:00');
    setFormEndTime('18:00');
    setFormAllDay(false);
    setFormLocation('Studio Stage A, Creative Story Hub');
    setFormDescription('');
    setFormProjectCode('PRJ-26-081');
    setIsModalOpen(true);
  };

  // Open modal for editing event
  const handleOpenEditModal = (evt: TeamupEvent) => {
    setModalMode('edit');
    setEditingEventId(evt.id);
    setFormTitle(evt.title);
    setFormSubCalendars(evt.subCalendarIds);
    setFormStartDate(evt.startDate);
    setFormEndDate(evt.endDate);
    setFormStartTime(evt.startTime || '08:00');
    setFormEndTime(evt.endTime || '18:00');
    setFormAllDay(evt.allDay);
    setFormLocation(evt.location || '');
    setFormDescription(evt.description || '');
    setFormProjectCode(evt.projectCode || '');
    setIsModalOpen(true);
  };

  // Save Event
  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (modalMode === 'create') {
      const newEvt: TeamupEvent = {
        id: `evt-custom-${Date.now()}`,
        title: formTitle,
        subCalendarIds: formSubCalendars.length > 0 ? formSubCalendars : ['albin'],
        startDate: formStartDate,
        endDate: formEndDate,
        startTime: formAllDay ? undefined : formStartTime,
        endTime: formAllDay ? undefined : formEndTime,
        allDay: formAllDay,
        location: formLocation,
        description: formDescription,
        projectCode: formProjectCode,
        status: 'Confirmed'
      };
      setEvents(prev => [newEvt, ...prev]);
    } else if (modalMode === 'edit' && editingEventId) {
      setEvents(prev =>
        prev.map(evt =>
          evt.id === editingEventId
            ? {
                ...evt,
                title: formTitle,
                subCalendarIds: formSubCalendars,
                startDate: formStartDate,
                endDate: formEndDate,
                startTime: formAllDay ? undefined : formStartTime,
                endTime: formAllDay ? undefined : formEndTime,
                allDay: formAllDay,
                location: formLocation,
                description: formDescription,
                projectCode: formProjectCode
              }
            : evt
        )
      );
    }
    setIsModalOpen(false);
  };

  // Delete Event
  const handleDeleteEvent = (id: string) => {
    setEvents(prev => prev.filter(evt => evt.id !== id));
    setIsModalOpen(false);
  };

  // Navigation handlers
  const handleNavToday = () => {
    setCurrentDate('2026-09-16');
  };

  const handleNavPrev = () => {
    // Move back 7 days
    const current = new Date(currentDate);
    current.setDate(current.getDate() - 7);
    setCurrentDate(current.toISOString().split('T')[0]);
  };

  const handleNavNext = () => {
    // Move forward 7 days
    const current = new Date(currentDate);
    current.setDate(current.getDate() + 7);
    setCurrentDate(current.toISOString().split('T')[0]);
  };

  // Helper to get sub-calendar details
  const getSubCalendar = (id: string): TeamupSubCalendar | undefined => {
    return CREATIVE_STORY_SUBCALENDARS.find(s => s.id === id);
  };

  // Days in mini calendar
  const miniCalendarDays = useMemo(() => {
    // 30 days of September 2026
    const days: { day: number; dateStr: string; isCurrentMonth: boolean }[] = [];
    // Sep 1, 2026 is a Tuesday (padding Monday with Aug 31)
    days.push({ day: 31, dateStr: '2026-08-31', isCurrentMonth: false });
    for (let i = 1; i <= 30; i++) {
      const dStr = i < 10 ? `0${i}` : `${i}`;
      days.push({ day: i, dateStr: `2026-09-${dStr}`, isCurrentMonth: true });
    }
    // Pad end of month to fill 5 weeks (35 days)
    for (let i = 1; i <= 4; i++) {
      days.push({ day: i, dateStr: `2026-10-0${i}`, isCurrentMonth: false });
    }
    return days;
  }, []);

  return (
    <div className="bg-[#0f1115] border border-[#23272e] rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[820px]">
      {/* ========================================================= */}
      {/* TEAMUP TOP CONTROL BAR */}
      {/* ========================================================= */}
      <div className="bg-[#14161b] border-b border-[#23272e] px-4 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className={`p-1.5 rounded-md border text-xs flex items-center gap-1.5 transition-colors ${
              showSidebar 
                ? 'bg-[#222732] border-[#363f50] text-white' 
                : 'bg-[#181a1f] border-[#292e38] text-[#8a94a2] hover:text-white'
            }`}
            title="Toggle Calendars Sidebar"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline font-medium">Sidebar</span>
          </button>

          <button
            onClick={handleNavToday}
            className="px-3 py-1.5 rounded-md bg-[#181a1f] hover:bg-[#222630] border border-[#292e38] text-xs font-semibold text-white transition-colors"
          >
            Today
          </button>

          <div className="flex items-center rounded-md bg-[#181a1f] border border-[#292e38] p-0.5">
            <button
              onClick={handleNavPrev}
              className="p-1 text-[#8a94a2] hover:text-white transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNavNext}
              className="p-1 text-[#8a94a2] hover:text-white transition-colors"
              title="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-sm font-bold text-white font-sans ml-2 flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#e50914]" />
            <span>
              {viewMode === 'day' ? 'Wednesday, Sep 16, 2026' :
               viewMode === 'month' ? 'September 2026' :
               'Sep 14 – Sep 20, 2026'}
            </span>
            <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
              LIVE TEAMUP ENGINE
            </span>
          </div>
        </div>

        {/* Center: Search Events Bar */}
        <div className="relative min-w-[220px] max-w-xs flex-1">
          <Search className="w-3.5 h-3.5 text-[#6b7582] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search events, crew, location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#181b21] border border-[#2b313d] text-white text-xs rounded-lg pl-8 pr-7 py-1.5 focus:outline-none focus:border-[#e50914] placeholder-[#555f6e]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#717b88] hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right: View Mode Switcher + Add Event */}
        <div className="flex items-center gap-2.5">
          {/* Teamup View Buttons */}
          <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
            {(
              [
                { id: 'day', label: 'Day' },
                { id: 'week', label: 'Week' },
                { id: 'month', label: 'Month' },
                { id: 'scheduler', label: 'Scheduler' },
                { id: 'agenda', label: 'Agenda' }
              ] as const
            ).map(v => (
              <button
                key={v.id}
                onClick={() => setViewMode(v.id)}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  viewMode === v.id
                    ? 'bg-[#e50914] text-white shadow'
                    : 'text-[#8a94a2] hover:text-white'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleOpenCreateModal()}
            className="px-3 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-[#e50914]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN WORKSPACE: SIDEBAR + CALENDAR VIEW GRID */}
      {/* ========================================================= */}
      <div className="flex-1 flex overflow-hidden">
        {/* ======================================================= */}
        {/* LEFT COLLAPSIBLE TEAMUP SIDEBAR */}
        {/* ======================================================= */}
        {showSidebar && (
          <aside className="w-72 bg-[#121418] border-r border-[#23272e] flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
            {/* 1. Mini Datepicker Calendar */}
            <div className="p-3 border-b border-[#22272e]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  September 2026
                </span>
                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setCurrentDate('2026-09-07')}
                    className="p-1 rounded text-[#717b88] hover:text-white hover:bg-[#1a1d24]"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={() => setCurrentDate('2026-09-21')}
                    className="p-1 rounded text-[#717b88] hover:text-white hover:bg-[#1a1d24]"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-mono text-[#626d7c] mb-1">
                <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-0.5 text-center text-xs font-mono">
                {miniCalendarDays.map((d, idx) => {
                  const isSelectedDate = d.dateStr === currentDate;
                  const isCurrentWeekDay = weekDays.some(w => w.date === d.dateStr);
                  return (
                    <button
                      key={idx}
                      onClick={() => setCurrentDate(d.dateStr)}
                      className={`h-6 rounded flex items-center justify-center text-[11px] transition-colors ${
                        isSelectedDate 
                          ? 'bg-[#e50914] text-white font-bold' 
                          : isCurrentWeekDay 
                          ? 'bg-[#222732] text-white font-medium' 
                          : d.isCurrentMonth 
                          ? 'text-[#9ba4b1] hover:bg-[#1a1d24] hover:text-white' 
                          : 'text-[#414854]'
                      }`}
                    >
                      {d.day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Sub-Calendars Header & Search */}
            <div className="p-3 pb-2">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#e50914]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Calendars ({selectedSubCalendarIds.length}/{CREATIVE_STORY_SUBCALENDARS.length})
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-mono">
                  <button
                    onClick={selectAllSubCalendars}
                    className="text-[#8a94a2] hover:text-white px-1.5 py-0.5 rounded hover:bg-[#1d2128]"
                  >
                    All
                  </button>
                  <span className="text-[#3a424e]">|</span>
                  <button
                    onClick={clearAllSubCalendars}
                    className="text-[#8a94a2] hover:text-white px-1.5 py-0.5 rounded hover:bg-[#1d2128]"
                  >
                    None
                  </button>
                </div>
              </div>

              {/* Filter sub-calendars input */}
              <div className="relative mb-2">
                <Search className="w-3 h-3 text-[#626d7c] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter calendars..."
                  value={calendarFilterQuery}
                  onChange={e => setCalendarFilterQuery(e.target.value)}
                  className="w-full bg-[#181b21] border border-[#282e38] text-white text-[11px] rounded-md pl-7 pr-2.5 py-1 focus:outline-none focus:border-[#e50914] placeholder-[#555f6e]"
                />
              </div>
            </div>

            {/* 3. The 20 Teamup Sub-Calendars Pills List */}
            <div className="flex-1 px-3 space-y-1.5 pb-4">
              {visibleSubCalendars.map(sub => {
                const isChecked = selectedSubCalendarIds.includes(sub.id);
                // Count events for this sub-calendar
                const subEventCount = events.filter(e => e.subCalendarIds.includes(sub.id)).length;

                return (
                  <div
                    key={sub.id}
                    className="flex items-center gap-1.5 group select-none"
                  >
                    {/* Eye toggle button */}
                    <button
                      type="button"
                      onClick={() => toggleSubCalendar(sub.id)}
                      className="p-1 text-[#6b7582] hover:text-white rounded hover:bg-[#1c2028] transition-colors"
                      title={isChecked ? 'Hide on calendar' : 'Show on calendar'}
                    >
                      {isChecked ? (
                        <Eye className="w-3.5 h-3.5 text-white" />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-[#505966]" />
                      )}
                    </button>

                    {/* Teamup's signature colored pill */}
                    <div
                      onClick={() => toggleSubCalendar(sub.id)}
                      style={{
                        backgroundColor: isChecked ? sub.bgHex : '#1e222a',
                        borderColor: isChecked ? sub.borderHex : '#2d333e',
                        opacity: isChecked ? 1 : 0.45
                      }}
                      className="flex-1 px-2.5 py-1.2 rounded-md border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all hover:brightness-110 shadow-sm"
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Lock
                          className="w-3 h-3 shrink-0"
                          style={{ color: isChecked ? sub.textHex : '#8a94a2' }}
                        />
                        <span
                          className="truncate text-[11px] tracking-tight"
                          style={{ color: isChecked ? sub.textHex : '#8a94a2' }}
                        >
                          {sub.name}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {subEventCount > 0 && (
                          <span
                            className="text-[9px] font-mono px-1 rounded bg-black/25"
                            style={{ color: isChecked ? sub.textHex : '#717b88' }}
                          >
                            {subEventCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        )}

        {/* ======================================================= */}
        {/* RIGHT CALENDAR VIEW AREA */}
        {/* ======================================================= */}
        <main className="flex-1 flex flex-col overflow-x-auto bg-[#101216]">
          {/* VIEW 1: WEEK VIEW (TEAMUP STYLE WITH TIMED GRID) */}
          {viewMode === 'week' && (
            <div className="flex-1 flex flex-col min-w-[950px] overflow-y-auto custom-scrollbar">
              {/* Day Header Row */}
              <div className="sticky top-0 z-20 bg-[#14161b] border-b border-[#23272e] flex">
                <div className="w-16 shrink-0 border-r border-[#23272e] p-2 text-center text-[10px] font-mono text-[#626d7c] uppercase">
                  Time
                </div>
                {weekDays.map(d => (
                  <div
                    key={d.date}
                    className={`flex-1 border-r border-[#23272e] p-2 text-center transition-colors ${
                      d.isToday ? 'bg-[#1b1e26]' : ''
                    }`}
                  >
                    <div className="text-[11px] uppercase font-bold text-[#8a94a2]">
                      {d.dayName}
                    </div>
                    <div
                      className={`text-sm font-bold mt-0.5 inline-block w-7 h-7 leading-7 rounded-full ${
                        d.isToday ? 'bg-[#e50914] text-white shadow' : 'text-white'
                      }`}
                    >
                      {d.dayNum}
                    </div>
                  </div>
                ))}
              </div>

              {/* All-Day Events Strip (Teamup Signature) */}
              <div className="bg-[#121419] border-b border-[#23272e] flex min-h-[34px]">
                <div className="w-16 shrink-0 border-r border-[#23272e] px-1 py-1.5 text-[9px] font-mono text-[#626d7c] text-center uppercase">
                  All-Day
                </div>
                <div className="flex-1 grid grid-cols-7 divide-x divide-[#23272e]">
                  {weekDays.map(d => {
                    const allDayEvts = filteredEvents.filter(
                      e => e.startDate === d.date && e.allDay
                    );
                    return (
                      <div key={d.date} className="p-1 space-y-1 min-h-[32px]">
                        {allDayEvts.map(evt => {
                          const primarySub = getSubCalendar(evt.subCalendarIds[0]);
                          return (
                            <div
                              key={evt.id}
                              onClick={() => handleOpenEditModal(evt)}
                              style={{
                                backgroundColor: primarySub?.bgHex || '#e50914',
                                borderColor: primarySub?.borderHex || '#b80710'
                              }}
                              className="px-2 py-1 rounded text-[10px] font-semibold text-white border shadow-sm cursor-pointer hover:brightness-110 truncate"
                              title={evt.title}
                            >
                              {evt.title}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hourly Timed Grid (06:00 to 22:00) */}
              <div className="flex-1 flex relative">
                {/* Time labels column */}
                <div className="w-16 shrink-0 border-r border-[#23272e] bg-[#111317]">
                  {timeSlots.map(time => (
                    <div
                      key={time}
                      className="h-16 border-b border-[#1c1f26] pr-2 pt-1 text-right text-[10px] font-mono text-[#626d7c]"
                    >
                      {time}
                    </div>
                  ))}
                </div>

                {/* 7 Days Columns */}
                <div className="flex-1 grid grid-cols-7 divide-x divide-[#1c1f26] relative">
                  {weekDays.map(d => {
                    // Get timed events on this day
                    const dayEvents = filteredEvents.filter(
                      e => e.startDate === d.date && !e.allDay
                    );

                    return (
                      <div
                        key={d.date}
                        className={`relative ${d.isToday ? 'bg-[#14171e]/40' : ''}`}
                      >
                        {/* 1-hour background row grid lines */}
                        {timeSlots.map(time => (
                          <div
                            key={time}
                            onClick={() => handleOpenCreateModal(d.date, time)}
                            className="h-16 border-b border-[#1a1d24] hover:bg-[#1e222b]/50 cursor-pointer transition-colors"
                          />
                        ))}

                        {/* Placed Event Cards */}
                        {dayEvents.map(evt => {
                          const primarySub = getSubCalendar(evt.subCalendarIds[0]);
                          // Calculate vertical offset and height
                          const startHour = evt.startTime
                            ? parseInt(evt.startTime.split(':')[0], 10) +
                              parseInt(evt.startTime.split(':')[1], 10) / 60
                            : 8;
                          const endHour = evt.endTime
                            ? parseInt(evt.endTime.split(':')[0], 10) +
                              parseInt(evt.endTime.split(':')[1], 10) / 60
                            : startHour + 2;

                          const topPx = Math.max(0, (startHour - 6) * 64);
                          const heightPx = Math.max(36, (endHour - startHour) * 64);

                          return (
                            <div
                              key={evt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditModal(evt);
                              }}
                              style={{
                                top: `${topPx}px`,
                                height: `${heightPx}px`,
                                backgroundColor: primarySub?.bgHex || '#e50914',
                                borderColor: primarySub?.borderHex || '#a5060f'
                              }}
                              className="absolute left-1 right-1 rounded-md p-2 border shadow-lg text-white cursor-pointer hover:brightness-110 hover:z-30 transition-all flex flex-col justify-between overflow-hidden"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                  <span className="text-[10px] font-mono font-bold opacity-90">
                                    {evt.startTime} – {evt.endTime}
                                  </span>
                                  {evt.projectCode && (
                                    <span className="text-[9px] font-mono px-1 rounded bg-black/30">
                                      {evt.projectCode}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs font-bold leading-tight line-clamp-2">
                                  {evt.title}
                                </div>
                                {evt.location && (
                                  <div className="text-[10px] opacity-85 truncate flex items-center gap-1 mt-1">
                                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                                    <span>{evt.location}</span>
                                  </div>
                                )}
                              </div>

                              {/* Crew pill avatars at bottom */}
                              <div className="flex flex-wrap items-center gap-1 mt-1 pt-1 border-t border-white/20">
                                {evt.subCalendarIds.slice(0, 4).map(cid => {
                                  const sub = getSubCalendar(cid);
                                  return (
                                    <span
                                      key={cid}
                                      className="text-[9px] px-1 py-0.2 rounded bg-black/40 font-mono"
                                    >
                                      {sub?.name || cid}
                                    </span>
                                  );
                                })}
                                {evt.subCalendarIds.length > 4 && (
                                  <span className="text-[9px] opacity-80 font-mono">
                                    +{evt.subCalendarIds.length - 4}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: SCHEDULER VIEW (TEAMUP SIGNATURE RESOURCE TIMELINE) */}
          {viewMode === 'scheduler' && (
            <div className="flex-1 overflow-auto custom-scrollbar p-4 space-y-2">
              <div className="bg-[#14161b] border border-[#23272e] rounded-lg p-3 text-xs flex flex-wrap items-center justify-between gap-2 text-[#8a94a2]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#e50914]" />
                  <span className="text-white font-bold">Teamup Production Scheduler</span>
                  <span>— Simultaneous view of all 20 crew channels side-by-side</span>
                </div>
                <span className="text-emerald-400 font-mono text-[11px]">
                  Week 38 (Sep 14 - Sep 20, 2026)
                </span>
              </div>

              <div className="bg-[#14161b] border border-[#23272e] rounded-xl overflow-hidden min-w-[900px]">
                {/* Header Days Row */}
                <div className="grid grid-cols-8 border-b border-[#23272e] bg-[#111317] text-xs font-mono">
                  <div className="p-3 border-r border-[#23272e] font-semibold text-[#8a94a2]">
                    Sub-Calendar
                  </div>
                  {weekDays.map(d => (
                    <div
                      key={d.date}
                      className={`p-3 text-center border-r border-[#23272e] ${
                        d.isToday ? 'bg-[#1c202a] text-[#e50914]' : 'text-white'
                      }`}
                    >
                      <div className="text-[10px] uppercase text-[#717b88]">{d.dayName}</div>
                      <div className="text-sm font-bold mt-0.5">{d.dayNum}</div>
                    </div>
                  ))}
                </div>

                {/* Sub-Calendar Rows */}
                <div className="divide-y divide-[#1e222a]">
                  {visibleSubCalendars
                    .filter(sub => selectedSubCalendarIds.includes(sub.id))
                    .map(sub => {
                      const subEvents = filteredEvents.filter(e =>
                        e.subCalendarIds.includes(sub.id)
                      );

                      return (
                        <div key={sub.id} className="grid grid-cols-8 hover:bg-[#181b22] transition-colors">
                          {/* Channel / Crew label */}
                          <div className="p-3 border-r border-[#23272e] flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full shrink-0"
                                  style={{ backgroundColor: sub.bgHex }}
                                />
                                <span className="font-bold text-white text-xs">{sub.name}</span>
                              </div>
                              <div className="text-[10px] text-[#6b7582] truncate max-w-[120px] mt-0.5">
                                {sub.role}
                              </div>
                            </div>
                            <span className="text-[9px] font-mono px-1 rounded bg-[#1e232c] text-[#8a94a2]">
                              {sub.type}
                            </span>
                          </div>

                          {/* Days cells */}
                          {weekDays.map(d => {
                            const dayEvts = subEvents.filter(e => e.startDate === d.date);

                            return (
                              <div
                                key={d.date}
                                onClick={() => handleOpenCreateModal(d.date)}
                                className={`p-1.5 border-r border-[#23272e] min-h-[64px] cursor-pointer hover:bg-[#202530]/50 transition-colors ${
                                  d.isToday ? 'bg-[#151820]/40' : ''
                                }`}
                              >
                                <div className="space-y-1">
                                  {dayEvts.map(evt => (
                                    <div
                                      key={evt.id}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleOpenEditModal(evt);
                                      }}
                                      style={{
                                        backgroundColor: sub.bgHex,
                                        borderColor: sub.borderHex
                                      }}
                                      className="p-1.5 rounded border text-white text-[10px] font-semibold cursor-pointer shadow-sm hover:brightness-110"
                                    >
                                      <div className="font-mono text-[9px] opacity-90">
                                        {evt.allDay ? 'All Day' : `${evt.startTime} - ${evt.endTime}`}
                                      </div>
                                      <div className="truncate mt-0.5">{evt.title}</div>
                                      {evt.location && (
                                        <div className="text-[8px] opacity-75 truncate mt-0.5">
                                          {evt.location}
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 3: MONTH VIEW (FULL MONTH 7x5 GRID) */}
          {viewMode === 'month' && (
            <div className="flex-1 flex flex-col min-w-[900px] overflow-y-auto custom-scrollbar">
              {/* Day names */}
              <div className="grid grid-cols-7 bg-[#14161b] border-b border-[#23272e] text-center text-xs font-mono text-[#8a94a2] py-2">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>

              {/* 5-Week Grid */}
              <div className="flex-1 grid grid-cols-7 grid-rows-5 divide-x divide-y divide-[#1f232b] bg-[#101216]">
                {miniCalendarDays.map((d, idx) => {
                  const dayEvents = filteredEvents.filter(e => e.startDate === d.dateStr);

                  return (
                    <div
                      key={idx}
                      onClick={() => handleOpenCreateModal(d.dateStr)}
                      className={`p-1.5 min-h-[110px] flex flex-col justify-between cursor-pointer hover:bg-[#181b22] transition-colors ${
                        d.dateStr === '2026-09-16' ? 'bg-[#1a1d26]' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-mono font-semibold ${
                            d.dateStr === '2026-09-16'
                              ? 'text-[#e50914]'
                              : d.isCurrentMonth
                              ? 'text-white'
                              : 'text-[#444c58]'
                          }`}
                        >
                          {d.day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-[9px] font-mono px-1 rounded bg-[#202530] text-[#8a94a2]">
                            {dayEvents.length} evts
                          </span>
                        )}
                      </div>

                      <div className="space-y-1 mt-1 overflow-y-auto max-h-[90px] pr-0.5 custom-scrollbar">
                        {dayEvents.map(evt => {
                          const primarySub = getSubCalendar(evt.subCalendarIds[0]);
                          return (
                            <div
                              key={evt.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleOpenEditModal(evt);
                              }}
                              style={{
                                backgroundColor: primarySub?.bgHex || '#e50914',
                                borderColor: primarySub?.borderHex || '#a5060f'
                              }}
                              className="px-1.5 py-0.5 rounded text-[10px] font-semibold text-white border shadow-sm truncate hover:brightness-110"
                              title={evt.title}
                            >
                              {!evt.allDay && evt.startTime && (
                                <span className="opacity-80 font-mono mr-1">{evt.startTime}</span>
                              )}
                              {evt.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 4: AGENDA VIEW */}
          {viewMode === 'agenda' && (
            <div className="flex-1 p-6 max-w-4xl mx-auto w-full overflow-y-auto custom-scrollbar space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#23272e]">
                <div>
                  <h3 className="text-base font-bold text-white">Upcoming Production Agenda</h3>
                  <p className="text-xs text-[#8a94a2]">Chronological shoot schedule & confirmed resource bookings</p>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded border border-emerald-800">
                  {filteredEvents.length} Active Events
                </span>
              </div>

              {/* Group events by date */}
              {Array.from(new Set(filteredEvents.map(e => e.startDate)))
                .sort()
                .map(dateStr => {
                  const evtsOnDate = filteredEvents.filter(e => e.startDate === dateStr);
                  const isKeyDate = dateStr === '2026-09-16';

                  return (
                    <div key={dateStr} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${isKeyDate ? 'bg-[#e50914]' : 'bg-[#3b82f6]'}`} />
                        <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">
                          {dateStr}
                        </h4>
                        {isKeyDate && (
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-950 text-red-400 border border-red-800">
                            KEY SHOOT DAY
                          </span>
                        )}
                      </div>

                      <div className="space-y-2.5 pl-4 border-l border-[#22272e]">
                        {evtsOnDate.map(evt => {
                          const primarySub = getSubCalendar(evt.subCalendarIds[0]);

                          return (
                            <div
                              key={evt.id}
                              onClick={() => handleOpenEditModal(evt)}
                              className="bg-[#14161b] hover:bg-[#191c22] border border-[#23272e] hover:border-[#384252] rounded-xl p-4 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-2">
                                  <span
                                    style={{ backgroundColor: primarySub?.bgHex || '#e50914' }}
                                    className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-white shadow-sm"
                                  >
                                    {evt.allDay ? 'All Day' : `${evt.startTime} – ${evt.endTime}`}
                                  </span>

                                  {evt.projectCode && (
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e222a] text-[#9ba4b1] border border-[#2c333f]">
                                      {evt.projectCode}
                                    </span>
                                  )}

                                  <span className="text-[10px] font-mono text-emerald-400 font-semibold uppercase">
                                    {evt.status || 'Confirmed'}
                                  </span>
                                </div>

                                <h5 className="text-sm font-bold text-white">{evt.title}</h5>

                                {evt.location && (
                                  <div className="flex items-center gap-1.5 text-xs text-[#8a94a2]">
                                    <MapPin className="w-3.5 h-3.5 text-[#e50914] shrink-0" />
                                    <span>{evt.location}</span>
                                  </div>
                                )}

                                {evt.description && (
                                  <p className="text-xs text-[#717b88] line-clamp-2">
                                    {evt.description}
                                  </p>
                                )}

                                {/* Sub-calendar pills */}
                                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                                  {evt.subCalendarIds.map(cid => {
                                    const sub = getSubCalendar(cid);
                                    if (!sub) return null;
                                    return (
                                      <span
                                        key={cid}
                                        style={{ backgroundColor: sub.bgHex, color: sub.textHex }}
                                        className="text-[10px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm"
                                      >
                                        <Lock className="w-2.5 h-2.5" />
                                        {sub.name}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenEditModal(evt);
                                  }}
                                  className="px-3 py-1.5 rounded-lg bg-[#1a1d24] hover:bg-[#252a34] border border-[#2f3644] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-[#8a94a2]" />
                                  <span>Edit</span>
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* VIEW 5: DAY VIEW */}
          {viewMode === 'day' && (
            <div className="flex-1 flex flex-col min-w-[700px] overflow-y-auto custom-scrollbar p-4">
              <div className="bg-[#14161b] border border-[#23272e] rounded-xl p-4 mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">Daily Shoot Dispatch: Wednesday, Sep 16, 2026</h3>
                  <p className="text-xs text-[#8a94a2]">High-density call sheet timeline across Dubai stages and desert units</p>
                </div>
                <button
                  onClick={() => handleOpenCreateModal('2026-09-16')}
                  className="px-3 py-1.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Dispatch Event</span>
                </button>
              </div>

              {/* Day Time Stack */}
              <div className="bg-[#14161b] border border-[#23272e] rounded-xl divide-y divide-[#1e2229]">
                {timeSlots.map(time => {
                  const slotEvents = filteredEvents.filter(e => {
                    if (e.startDate !== '2026-09-16') return false;
                    if (e.allDay) return time === '06:00';
                    return e.startTime && e.startTime.startsWith(time.split(':')[0]);
                  });

                  return (
                    <div key={time} className="flex min-h-[56px] hover:bg-[#181b22] transition-colors">
                      <div className="w-20 shrink-0 p-3 border-r border-[#23272e] text-xs font-mono text-[#626d7c] font-semibold">
                        {time}
                      </div>
                      <div className="flex-1 p-2 flex flex-wrap gap-2 items-center">
                        {slotEvents.map(evt => {
                          const primarySub = getSubCalendar(evt.subCalendarIds[0]);
                          return (
                            <div
                              key={evt.id}
                              onClick={() => handleOpenEditModal(evt)}
                              style={{
                                backgroundColor: primarySub?.bgHex || '#e50914',
                                borderColor: primarySub?.borderHex || '#a5060f'
                              }}
                              className="px-3 py-2 rounded-lg text-white border shadow-md cursor-pointer hover:brightness-110 flex items-center gap-3"
                            >
                              <div>
                                <div className="text-xs font-bold">{evt.title}</div>
                                <div className="text-[10px] opacity-85 flex items-center gap-2 mt-0.5">
                                  <span>{evt.startTime} – {evt.endTime}</span>
                                  {evt.location && <span>• {evt.location}</span>}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* TEAMUP EVENT EDIT / CREATE MODAL */}
      {/* ========================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14161b] border border-[#282d38] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-[#181b21] border-b border-[#23272e] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CalendarIcon className="w-5 h-5 text-[#e50914]" />
                <h3 className="text-base font-bold text-white">
                  {modalMode === 'create' ? 'Create Teamup Event' : 'Edit Teamup Event'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8a94a2] hover:text-white p-1 rounded-md hover:bg-[#222730]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {/* Conflict Radar Notification inside Modal */}
              {detectedConflicts.length > 0 && (
                <div className="bg-[#261316] border-l-4 border-l-[#e50914] border border-[#481d22] rounded-xl p-3.5 text-xs text-red-200">
                  <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-[#e50914] mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    Double-Booking Conflict Detected!
                  </div>
                  <div>
                    {detectedConflicts.map(c => (
                      <div key={c.id}>
                        • Already booked on <strong>{c.title}</strong> ({c.startTime} - {c.endTime}).
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SHT-26-402: Chalhoub Autumn Perfume Commercial"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#e50914]"
                />
              </div>

              {/* Assigned Sub-Calendars (Teamup signature multi-calendar selector) */}
              <div>
                <label className="block text-xs font-semibold text-[#8a94a2] mb-1.5 uppercase tracking-wider">
                  Assigned Sub-Calendars (Team Members / Channels) *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1.5 max-h-44 overflow-y-auto custom-scrollbar p-2 bg-[#111317] rounded-lg border border-[#22272e]">
                  {CREATIVE_STORY_SUBCALENDARS.map(sub => {
                    const isSelected = formSubCalendars.includes(sub.id);
                    return (
                      <div
                        key={sub.id}
                        onClick={() => {
                          setFormSubCalendars(prev =>
                            isSelected ? prev.filter(id => id !== sub.id) : [...prev, sub.id]
                          );
                        }}
                        style={{
                          backgroundColor: isSelected ? sub.bgHex : '#1a1d24',
                          borderColor: isSelected ? sub.borderHex : '#282f3c',
                          color: isSelected ? sub.textHex : '#8a94a2'
                        }}
                        className={`px-2 py-1.5 rounded-md border text-xs font-semibold flex items-center justify-between cursor-pointer transition-all ${
                          isSelected ? 'ring-1 ring-white/50 shadow' : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <span className="truncate text-[11px]">{sub.name}</span>
                        {isSelected && <Check className="w-3 h-3 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* All-Day Toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="allDayCheckbox"
                  checked={formAllDay}
                  onChange={e => setFormAllDay(e.target.checked)}
                  className="w-4 h-4 rounded bg-[#181b21] border-[#2b313d] text-[#e50914] focus:ring-[#e50914]"
                />
                <label htmlFor="allDayCheckbox" className="text-xs font-medium text-white cursor-pointer">
                  All-Day Event
                </label>
              </div>

              {/* Dates & Times */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={e => setFormStartDate(e.target.value)}
                    className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formEndDate}
                    onChange={e => setFormEndDate(e.target.value)}
                    className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                {!formAllDay && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={formStartTime}
                        onChange={e => setFormStartTime(e.target.value)}
                        className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={formEndTime}
                        onChange={e => setFormEndTime(e.target.value)}
                        className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Location & Project Code */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                    Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Al Marmoom Desert or Studio Stage A"
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value)}
                    className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                    Project Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PRJ-26-081"
                    value={formProjectCode}
                    onChange={e => setFormProjectCode(e.target.value)}
                    className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#e50914]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#8a94a2] mb-1 uppercase tracking-wider">
                  Description / Call Sheet Notes
                </label>
                <textarea
                  rows={3}
                  placeholder="Call times, equipment packages, lens setup notes, client briefing..."
                  value={formDescription}
                  onChange={e => setFormDescription(e.target.value)}
                  className="w-full bg-[#181b21] border border-[#2b313d] text-white rounded-lg p-3 text-xs focus:outline-none focus:border-[#e50914]"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#23272e] flex items-center justify-between">
                {modalMode === 'edit' && editingEventId ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(editingEventId)}
                    className="px-3.5 py-2 rounded-lg bg-red-950 hover:bg-red-900 border border-red-800 text-red-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Event</span>
                  </button>
                ) : (
                  <div />
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-[#181b21] hover:bg-[#222730] border border-[#2c333f] text-[#8a94a2] hover:text-white text-xs font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-bold shadow-lg shadow-[#e50914]/25 transition-all"
                  >
                    {modalMode === 'create' ? 'Create Event' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
