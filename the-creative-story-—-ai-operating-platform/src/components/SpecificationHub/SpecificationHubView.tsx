import React, { useState } from 'react';
import { 
  FileCode2, 
  CheckCircle2, 
  ShieldCheck, 
  Layers, 
  DollarSign, 
  Clock, 
  Database, 
  Cpu, 
  Server, 
  ChevronDown, 
  ChevronRight,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const SpecificationHubView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'answers' | 'architecture' | 'delivery' | 'commercials'>('answers');
  const [expandedQ, setExpandedQ] = useState<number | null>(0);

  const vendorQuestions = [
    {
      q: "1. Proposed Architecture and Technology Stack: What frontend, backend, database, and hosting architecture do you recommend for a responsive web platform?",
      a: "Modern decoupled, full-stack TypeScript architecture:\n• Frontend: React 18+ with Vite, Tailwind CSS, Motion animations, and IBM Plex typography.\n• Backend: Node.js Express API layer with strict relational schema validation.\n• Database: Relational PostgreSQL (Cloud SQL) or Firestore with hardened role-based security rules.\n• Hosting: Containerized on Google Cloud Run or AWS ECS (Dubai me-central-1 region) behind NGINX reverse proxy with automated SSL, CDN edge caching, and zero cold-starts.\n• AI: Server-side Google Gemini 2.5 Pro grounded strictly in company database snapshots."
    },
    {
      q: "2. Build vs. Buy / Framework Recommendation: Custom web application vs. low-code / ERP framework?",
      a: "A custom web application built on modern production-grade primitives (Vite + React + Node + PostgreSQL) is strongly recommended over off-the-shelf ERPs (Odoo/Salesforce/Monday). Production company workflows require specialized single-pane call sheets, complex DP/crew double-booking conflict algorithms, attribution split calculation, and margin divergence alerts. Monolithic ERPs create unnecessary bloat, rigid data silos, and excessive per-seat recurring license costs."
    },
    {
      q: "3. AI Architecture: What LLM, retrieval/grounding approach, prompt architecture, and data privacy safeguards do you propose?",
      a: "• Model: Google Gemini 2.5 Pro via @google/genai SDK (server-side only).\n• Grounding: Inverted relational context injection where JSON snapshots of master projects, shoots, and bookings are parsed into the system prompt at invocation.\n• Privacy & Security: Enterprise zero-data-retention policy; company operational data is never used to train foundational models.\n• Role-Guardrails: System prompt dynamically checks caller's role (Founder vs. Freelancer) and strips confidential cost rates, talent day fees, and contractor margins before context generation."
    },
    {
      q: "4. Resource / Calendar Engine: How will you build the master booking calendar and double-booking conflict warning logic?",
      a: "• Calendar Engine: Custom high-performance timeline and resource Gantt view rendered with CSS Grid and virtualized row scrolling.\n• Conflict Detection Algorithm: Real-time SQL / state query: `SELECT * FROM Bookings WHERE resource_id = :id AND date = :date AND status IN ('Confirmed', 'Tentative Hold')`.\n• Resolution Engine: Whenever a conflict is detected, the UI immediately displays a prominent red alert with one-click automated actions to reassign to qualified alternate crew or shift the shoot date to an open day."
    },
    {
      q: "5. Financial and Margin Calculation Logic: How will you calculate gross profit, forecast costs, and margin variance reliably?",
      a: "Relational calculation formulas enforced server-side:\n• Total Revenue = Approved PO Contract Value + Approved Variations.\n• Committed Costs = Purchase Orders Issued to external vendors/freelancers.\n• Actual Costs = Incurred receipts + internal staff day-rate allocations.\n• Forecast Cost = Actual + Committed + Forecast-to-Complete.\n• Gross Profit = Total Revenue − Total Forecast Cost.\n• Gross Margin % = (Gross Profit ÷ Total Revenue) × 100.\n• Margin Variance = Forecast Margin % − Target Margin % (Triggers red warning badge if < 30% or variance < -5%)."
    },
    {
      q: "6. Integration Strategy: How do you plan to handle Google Workspace / Microsoft 365, accounting software, and cloud storage?",
      a: "• Calendar: Two-way synchronization via Google Calendar API and Microsoft Graph API using OAuth 2.0 webhooks.\n• Document Storage: Direct integration with Google Drive / AWS S3 for media deliverables, PDF call sheets, and signed contracts.\n• Accounting/ERP: Webhook and REST API connectors for Xero and QuickBooks Online to sync invoices and payment status (0-30d, 31-60d, 60d+ aged debt)."
    },
    {
      q: "7. Security, Governance, and Access Control: How will role-based access control and confidentiality be enforced?",
      a: "• Least-privilege RBAC: 6 defined system roles (Founder, BD, Producer, Finance, Creative, Freelancer).\n• Field-Level Data Masking: Internal day rates, margins, and cost-per-hour are completely omitted from API responses for Creative and Freelancer roles.\n• Audit Logging: Immutable event logging for every budget modification, variation order approval, call sheet dispatch, and stage transition.\n• Session Management: JWT HttpOnly cookies with CSRF token protection and session expiry."
    },
    {
      q: "8. Data Hosting & UAE Compliance: Where will the application be hosted, and how will it comply with UAE data laws?",
      a: "• Regional Cloud Hosting: AWS Middle East (UAE / me-central-1 Dubai) or Google Cloud Dammam/Qatar data centers, ensuring compliance with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection.\n• Encryption: AES-256 at rest and TLS 1.3 in transit with automated daily geo-redundant backups."
    },
    {
      q: "9. Phased Delivery Roadmap: What is the recommended timeline across Discovery, Core OS, Calendar, Financials, and AI?",
      a: "• Phase 0: Discovery & Final Relational Schema Finalization (Weeks 1–2)\n• Phase 1: Core OS, CRM Pipeline, and Client 360 (Weeks 3–6)\n• Phase 2: Master Booking Calendar, Conflict Engine, and Shoot Manager (Weeks 7–10)\n• Phase 3: Project Control Center, Internal Budgeting & Role KPIs (Weeks 11–14)\n• Phase 4: AI Intelligence Layer, Brief Extraction, and UAT Go-Live (Weeks 15–16)"
    },
    {
      q: "10. Commercial Quotation & Ongoing Support: What is the fixed build fee, hosting, AI API usage, and maintenance SLA?",
      a: "• Complete Core Build: AED 185,000 fixed-price turnkey implementation.\n• Cloud Infrastructure: ~AED 1,200 – 1,800/month (AWS/GCP Cloud Run + Managed PostgreSQL + S3 CDN).\n• Gemini AI Tokens: ~AED 350 – 600/month based on ~15,000 executive and brief extraction queries.\n• SLA Support & Enhancements: AED 4,500/month for 99.9% uptime guarantee, 4-hour critical incident response, and monthly feature iteration."
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Spec Header */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileCode2 className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">Vendor-Ready Technical Specification & Proposal Hub</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              RFP SPECIFICATION 2026
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Comprehensive technical architecture, UAE data compliance, phased milestones, and complete responses to the 10 vendor criteria.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
          <button
            onClick={() => setActiveSection('answers')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeSection === 'answers' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            Vendor Q&A (10/10)
          </button>
          <button
            onClick={() => setActiveSection('architecture')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeSection === 'architecture' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            System Architecture
          </button>
          <button
            onClick={() => setActiveSection('delivery')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeSection === 'delivery' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            16-Week Delivery
          </button>
          <button
            onClick={() => setActiveSection('commercials')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              activeSection === 'commercials' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            Commercials & SLA
          </button>
        </div>
      </div>

      {/* Section 1: The 10 Vendor Questions & Formal Answers */}
      {activeSection === 'answers' && (
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase text-[#717b88] px-1">
            Formal Responses to Product Brief Section 22 Vendor Requirements
          </div>

          {vendorQuestions.map((item, idx) => {
            const isExpanded = expandedQ === idx;
            return (
              <div
                key={idx}
                className="bg-[#141619] border border-[#23272e] rounded-xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedQ(isExpanded ? null : idx)}
                  className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-[#181b21] transition-colors"
                >
                  <span className="text-xs font-bold text-white leading-relaxed">{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#717b88] shrink-0 mt-0.5 transition-transform ${isExpanded ? 'rotate-180 text-[#e50914]' : ''}`} />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-[#1e2229] bg-[#111316] text-xs text-[#c2cbd6] leading-relaxed whitespace-pre-wrap font-mono">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Section 2: Architecture & Relational Topology */}
      {activeSection === 'architecture' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400">
                <Server className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Full-Stack Application</h3>
              </div>
              <p className="text-xs text-[#8a94a2] leading-relaxed">
                Decoupled React 18 frontend with Node.js Express server running TypeScript natively via TSX and bundled via ESBuild.
              </p>
              <div className="text-[11px] font-mono text-[#717b88]">
                • Vite HMR Dev Server<br/>
                • Tailored Dark Theme<br/>
                • RESTful /api/* Endpoints
              </div>
            </div>

            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-sky-400">
                <Database className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Relational Data Model</h3>
              </div>
              <p className="text-xs text-[#8a94a2] leading-relaxed">
                Zero data duplication. Opportunities convert cleanly to Projects; Projects parent Shoots; Shoots allocate Bookings and Equipment.
              </p>
              <div className="text-[11px] font-mono text-[#717b88]">
                • Strict Foreign Key Integrity<br/>
                • Real-time Double Booking Locks<br/>
                • Automatic Margin Calculation
              </div>
            </div>

            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-3">
              <div className="flex items-center gap-2 text-[#e50914]">
                <Cpu className="w-5 h-5" />
                <h3 className="text-sm font-bold text-white">Gemini AI Intelligence</h3>
              </div>
              <p className="text-xs text-[#8a94a2] leading-relaxed">
                Server-side Google GenAI SDK grounding user questions directly against master database JSON snapshots without data leakage.
              </p>
              <div className="text-[11px] font-mono text-[#717b88]">
                • Natural Language Inverted Index<br/>
                • Raw Creative Brief Parser<br/>
                • Role-Restricted Cost Stripping
              </div>
            </div>
          </div>

          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6">
            <h3 className="text-sm font-bold text-white mb-3">Relational Entity Flow</h3>
            <div className="p-4 rounded-xl bg-[#111316] border border-[#22272f] font-mono text-xs text-[#9ba3af] leading-loose">
              [Lead / Opportunity: OPP-101]<br/>
              &nbsp;&nbsp;└── (Mark As Won Action) ──► [Project Control: TCS-26-081]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Billing Milestones: 50% Mobilization / 25% Rough Cut / 25% Delivery]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Cost Control: Pre-Production, Crew, Equipment, Locations, Post]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── [Shoots: SHT-26-401]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Bookings: Crew & Freelancer Shifts with Double-Booking Radar]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── [Equipment: Camera Fleet Packages & Day Rates]<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── [Digital Call Sheet: Permits, Hospital, Schedule, Map Coordinates]
            </div>
          </div>
        </div>
      )}

      {/* Section 3: 16-Week Phased Delivery */}
      {activeSection === 'delivery' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6 space-y-6">
          <div>
            <h2 className="text-base font-bold text-white">Phased Delivery & Implementation Roadmap</h2>
            <p className="text-xs text-[#8a94a2] mt-0.5">Turnkey execution from architecture kickoff to production cutover</p>
          </div>

          <div className="space-y-4">
            {[
              { phase: 'Phase 0', title: 'Discovery, Relational Schema & Prototype Verification', duration: 'Weeks 1 – 2', deliverables: 'Detailed schema specification, role permissions definition, UI component tokens, and clickthrough verification.' },
              { phase: 'Phase 1', title: 'Core OS, CRM Pipeline & Client 360', duration: 'Weeks 3 – 6', deliverables: 'Opportunity Kanban board, attribution split engine, automatic Won → Project conversion, and client historical portfolio dossiers.' },
              { phase: 'Phase 2', title: 'Master Calendar, Conflict Engine & Shoot Manager', duration: 'Weeks 7 – 10', deliverables: 'Resource Gantt timeline, double-booking radar algorithm, digital call sheet builder, SMS/Email dispatch, and emergency safety dossiers.' },
              { phase: 'Phase 3', title: 'Project Control, Budget Variance & Role KPIs', duration: 'Weeks 11 – 14', deliverables: 'Budget categories, variation orders (+AED), aged receivables statement, and role-specific mathematical KPI engine.' },
              { phase: 'Phase 4', title: 'AI Intelligence Layer, Brief Extraction & Go-Live', duration: 'Weeks 15 – 16', deliverables: 'Gemini natural language Q&A, executive exception briefing, unstructured brief parser, UAT sign-off, and staff training.' }
            ].map((p, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-[#181b20] border border-[#262b34] text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#e50914] bg-[#29171a] px-2 py-0.5 rounded border border-[#4a1d23]">
                      {p.phase}
                    </span>
                    <span className="font-bold text-white text-sm">{p.title}</span>
                  </div>
                  <span className="font-mono text-emerald-400 text-[11px]">{p.duration}</span>
                </div>
                <p className="text-[#8a94a2] leading-relaxed mt-1">{p.deliverables}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section 4: Commercials & SLA */}
      {activeSection === 'commercials' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <div className="text-xs text-[#8a94a2]">Fixed Platform Build Fee</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">AED 185,000</div>
              <div className="text-[10px] text-emerald-400 mt-1">Turnkey Phase 0 to Phase 4</div>
            </div>

            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <div className="text-xs text-[#8a94a2]">Hosting & Cloud Infrastructure</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">~AED 1,400<span className="text-xs text-[#717b88]">/mo</span></div>
              <div className="text-[10px] text-[#8a94a2] mt-1">AWS UAE Dubai me-central-1</div>
            </div>

            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <div className="text-xs text-[#8a94a2]">Gemini AI Token Allowance</div>
              <div className="text-2xl font-bold font-mono text-white mt-1">~AED 450<span className="text-xs text-[#717b88]">/mo</span></div>
              <div className="text-[10px] text-[#8a94a2] mt-1">15,000+ grounded queries/mo</div>
            </div>

            <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5">
              <div className="text-xs text-[#8a94a2]">Enterprise Maintenance SLA</div>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">AED 4,500<span className="text-xs text-[#717b88]">/mo</span></div>
              <div className="text-[10px] text-emerald-400 mt-1">99.9% Uptime & 4h Incident SLA</div>
            </div>
          </div>

          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6 text-xs space-y-3">
            <h3 className="text-sm font-bold text-white">UAE Data Governance & Regulatory Warranty</h3>
            <p className="text-[#8a94a2] leading-relaxed">
              All client contracts, project rate cards, billing milestones, and personnel data remain exclusively stored in UAE-domiciled data centers complying with UAE Federal Decree-Law No. 45 of 2021 on Personal Data Protection. Zero operational data is transferred across jurisdictions or shared with external model trainers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
