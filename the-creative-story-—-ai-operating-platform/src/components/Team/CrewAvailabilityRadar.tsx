import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Filter,
  Plus,
  AlertCircle,
  Clapperboard,
  Sparkles
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

interface CrewChannelStatus {
  id: string;
  name: string;
  role: string;
  color: string;
  status: 'Free / Available' | 'On Shoot' | 'In Studio' | 'Edit Suite' | 'On Leave';
  currentProject?: string;
  projectCode?: string;
  location?: string;
  callTime?: string;
  phone: string;
  dailyRateAED: number;
}

const TCS_20_CHANNELS: CrewChannelStatus[] = [
  { id: 'albin', name: 'Albin', role: 'Director of Photography (DOP)', color: '#3b82f6', status: 'On Shoot', currentProject: 'Emirates NBD Brand Film', projectCode: 'TCS-26-081', location: 'Studio City Stage A', callTime: '06:00 GST', phone: '+971 50 112 3451', dailyRateAED: 4500 },
  { id: 'ali', name: 'Ali', role: 'Chief Gaffer / Lighting', color: '#10b981', status: 'On Shoot', currentProject: 'Emirates NBD Brand Film', projectCode: 'TCS-26-081', location: 'Studio City Stage A', callTime: '06:00 GST', phone: '+971 50 112 3452', dailyRateAED: 3200 },
  { id: 'anas', name: 'Anas', role: 'Production Sound Recordist', color: '#f59e0b', status: 'On Shoot', currentProject: 'Emirates NBD Brand Film', projectCode: 'TCS-26-081', location: 'Studio City Stage A', callTime: '06:30 GST', phone: '+971 50 112 3453', dailyRateAED: 2800 },
  { id: 'ehsan', name: 'Ehsan', role: 'Steadicam & Camera Operator', color: '#ec4899', status: 'Free / Available', phone: '+971 50 112 3454', dailyRateAED: 3600 },
  { id: 'faiyaj', name: 'Faiyaj', role: 'Key Grip & Rigging Lead', color: '#8b5cf6', status: 'Free / Available', phone: '+971 50 112 3455', dailyRateAED: 2600 },
  { id: 'fouad', name: 'Fouad', role: '1st AC / Focus Puller', color: '#06b6d4', status: 'In Studio', currentProject: 'Zeiss Supreme Prime Kit Check', location: 'Al Quoz HQ Stage', callTime: '10:00 GST', phone: '+971 50 112 3456', dailyRateAED: 2400 },
  { id: 'freelancer', name: 'Freelancer Pool', role: 'External Verified Specialists', color: '#64748b', status: 'Free / Available', phone: '+971 50 112 3457', dailyRateAED: 2200 },
  { id: 'idris', name: 'Idris Dawa', role: 'Production Coordinator / Permits', color: '#14b8a6', status: 'Free / Available', phone: '+971 50 112 3458', dailyRateAED: 2000 },
  { id: 'lafi', name: 'Lafi', role: 'Sparks / Lighting Tech', color: '#f97316', status: 'On Shoot', currentProject: 'Chalhoub Beauty Reel', projectCode: 'TCS-26-082', location: 'Downtown Dubai Studio', callTime: '07:00 GST', phone: '+971 50 112 3459', dailyRateAED: 1800 },
  { id: 'lama', name: 'Lama', role: 'Lead HMU & Styling Lead', color: '#a855f7', status: 'On Shoot', currentProject: 'Chalhoub Beauty Reel', projectCode: 'TCS-26-082', location: 'Downtown Dubai Studio', callTime: '06:30 GST', phone: '+971 50 112 3460', dailyRateAED: 2800 },
  { id: 'lambo', name: 'Lambo', role: 'Digital Imaging Tech (DIT)', color: '#eab308', status: 'In Studio', currentProject: 'RAK Ceramics Rushes Ingestion', location: 'Studio DIT Bay 2', callTime: '09:00 GST', phone: '+971 50 112 3461', dailyRateAED: 2600 },
  { id: 'mica', name: 'Mica', role: 'Production Assistant', color: '#6366f1', status: 'Free / Available', phone: '+971 50 112 3462', dailyRateAED: 1500 },
  { id: 'mike', name: 'Mike', role: 'DCAA Certified Drone Pilot', color: '#ef4444', status: 'Free / Available', phone: '+971 50 112 3463', dailyRateAED: 3500 },
  { id: 'ronald', name: 'Ronald', role: 'Best Boy Electric', color: '#84cc16', status: 'On Shoot', currentProject: 'Emirates NBD Brand Film', projectCode: 'TCS-26-081', location: 'Studio City Stage A', callTime: '06:00 GST', phone: '+971 50 112 3464', dailyRateAED: 2000 },
  { id: 'saif', name: 'Saif', role: 'Art Director & Set Dresser', color: '#d946ef', status: 'Free / Available', phone: '+971 50 112 3465', dailyRateAED: 3000 },
  { id: 'shaban', name: 'Shaban', role: 'Transport & Fleet Logistics', color: '#0ea5e9', status: 'On Shoot', currentProject: 'Emirates NBD Production Sprinter', location: 'Studio City Stage A', callTime: '05:30 GST', phone: '+971 50 112 3466', dailyRateAED: 1600 },
  { id: 'shan', name: 'Shan', role: 'Lead Colorist & Offline Editor', color: '#f43f5e', status: 'Edit Suite', currentProject: 'Aldar Living Documentary Final Grade', projectCode: 'TCS-26-083', location: 'DaVinci Suite 1', callTime: '09:30 GST', phone: '+971 50 112 3467', dailyRateAED: 3800 },
  { id: 'varuna', name: 'Varuna', role: 'Line Producer & Floor Manager', color: '#10b981', status: 'On Shoot', currentProject: 'Emirates NBD Brand Film', projectCode: 'TCS-26-081', location: 'Studio City Stage A', callTime: '05:45 GST', phone: '+971 50 112 3468', dailyRateAED: 3600 },
  { id: 'waqar', name: 'Waqar', role: 'Sound Designer & Atmos Mix', color: '#3b82f6', status: 'Edit Suite', currentProject: 'Chalhoub Luxury Sound Design', location: 'Atmos 7.1 Suite', callTime: '10:00 GST', phone: '+971 50 112 3469', dailyRateAED: 3200 }
];

interface CrewAvailabilityRadarProps {
  onSelectCrewForBooking?: (crewName: string, role: string) => void;
}

export const CrewAvailabilityRadar: React.FC<CrewAvailabilityRadarProps> = ({ onSelectCrewForBooking }) => {
  const { setActiveScreen, addBooking, selectedProjectId, projects } = usePlatform();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookedFeedback, setBookedFeedback] = useState<string | null>(null);

  const filteredCrew = TCS_20_CHANNELS.filter(crew => {
    const matchesStatus = filterStatus === 'all' || crew.status === filterStatus;
    const matchesSearch = crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          crew.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (crew.currentProject && crew.currentProject.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const freeCount = TCS_20_CHANNELS.filter(c => c.status === 'Free / Available').length;
  const onShootCount = TCS_20_CHANNELS.filter(c => c.status === 'On Shoot').length;
  const studioEditCount = TCS_20_CHANNELS.filter(c => c.status === 'In Studio' || c.status === 'Edit Suite').length;

  const handleQuickBook = (crew: CrewChannelStatus) => {
    const proj = projects.find(p => p.id === selectedProjectId) || projects[0];
    addBooking({
      resourceId: crew.id,
      resourceName: crew.name,
      roleOrCategory: crew.role,
      date: new Date().toISOString().slice(0, 10),
      projectId: proj.id,
      projectCode: proj.code,
      projectTitle: proj.title,
      notes: `Quick booked via Crew Availability Radar for ${proj.title}.`
    });

    setBookedFeedback(`Booked ${crew.name} for ${proj.code}! Added to Teamup Calendar.`);
    setTimeout(() => setBookedFeedback(null), 3500);

    if (onSelectCrewForBooking) {
      onSelectCrewForBooking(crew.name, crew.role);
    }
  };

  return (
    <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-4">
      {/* Header with KPI Counts */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-[#e50914]" />
              Live Crew Availability Radar (Who is Free & Working)
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2b313b]">
              Today • GST UTC+4
            </span>
          </div>
          <p className="text-xs text-[#717b88] mt-0.5">
            Instant dispatch status for all 20 Creative Story crew sub-calendars with 1-click shoot booking
          </p>
        </div>

        {/* Status Counters */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <strong>{freeCount}</strong> Free Now
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#241316] text-[#e50914] border border-[#4a1c22] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#e50914]" />
            <strong>{onShootCount}</strong> On Shoot
          </span>
          <span className="px-2.5 py-1 rounded-md bg-purple-950/80 text-purple-300 border border-purple-800 flex items-center gap-1.5">
            <strong>{studioEditCount}</strong> Studio/Edit
          </span>
        </div>
      </div>

      {/* Booking confirmation feedback toast */}
      {bookedFeedback && (
        <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{bookedFeedback}</span>
          </div>
          <button 
            onClick={() => setActiveScreen('calendar')}
            className="text-[11px] underline font-bold hover:text-white"
          >
            View on Calendar →
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
        <div className="relative flex-1 w-full">
          <Search className="w-3.5 h-3.5 text-[#717b88] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search crew member, skill, or current location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#181b20] border border-[#2a2f38] text-white text-xs rounded-lg pl-9 pr-3 py-2 focus:outline-none focus:border-[#e50914]"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All 20 Crew' },
            { id: 'Free / Available', label: '🟢 Free' },
            { id: 'On Shoot', label: '🔴 On Shoot' },
            { id: 'In Studio', label: '🟡 Studio' },
            { id: 'Edit Suite', label: '🟣 Edit Suite' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilterStatus(btn.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                filterStatus === btn.id
                  ? 'bg-[#e50914] text-white font-bold'
                  : 'bg-[#181b20] border border-[#282d36] text-[#8a94a2] hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Crew Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredCrew.map(crew => {
          const isFree = crew.status === 'Free / Available';
          const isOnShoot = crew.status === 'On Shoot';

          return (
            <div 
              key={crew.id}
              className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                isFree 
                  ? 'bg-[#181b20] border-[#292f3a] hover:border-emerald-700/60' 
                  : isOnShoot
                  ? 'bg-[#1b1718] border-[#382124]'
                  : 'bg-[#181b21] border-[#282c35]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm"
                      style={{ backgroundColor: crew.color }}
                    >
                      {crew.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{crew.name}</div>
                      <div className="text-[11px] text-[#717b88]">{crew.role}</div>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold ${
                    isFree 
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                      : isOnShoot
                      ? 'bg-red-950 text-red-400 border border-red-800'
                      : 'bg-purple-950 text-purple-300 border border-purple-800'
                  }`}>
                    {crew.status}
                  </span>
                </div>

                {/* Status details / Location */}
                <div className="mt-2.5 text-[11px] space-y-1">
                  {isOnShoot ? (
                    <div className="p-2 rounded bg-[#201517] border border-[#3e1d21] text-[#e0a6ab]">
                      <div className="font-semibold text-white flex items-center gap-1">
                        <Clapperboard className="w-3 h-3 text-[#e50914]" />
                        {crew.currentProject}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] text-[#b07d83] mt-0.5">
                        <span>{crew.location}</span>
                        <span>•</span>
                        <span>Call: {crew.callTime}</span>
                      </div>
                    </div>
                  ) : crew.currentProject ? (
                    <div className="p-2 rounded bg-[#1c1a22] border border-[#32273d] text-[#cbb6e5]">
                      <div className="font-semibold text-white">{crew.currentProject}</div>
                      <div className="text-[10px] text-[#9b89b4] mt-0.5">{crew.location} • {crew.callTime}</div>
                    </div>
                  ) : (
                    <div className="text-[#657181] flex items-center gap-1.5 py-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Available for immediate shoot dispatch</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Actions: Rate & Book Button */}
              <div className="pt-2 border-t border-[#22272e] flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-[#717b88]">
                  Rate: <strong className="text-[#a1abb8]">AED {crew.dailyRateAED}</strong>/day
                </span>

                {isFree ? (
                  <button
                    onClick={() => handleQuickBook(crew)}
                    className="px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-[11px] font-bold flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Book for Shoot</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveScreen('calendar')}
                    className="text-[11px] text-[#717b88] hover:text-white flex items-center gap-1"
                  >
                    <Calendar className="w-3 h-3" />
                    <span>View Schedule</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
