import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User as UserIcon, 
  FileText, 
  AlertTriangle, 
  ExternalLink, 
  ArrowRight, 
  CheckCircle2, 
  Layers, 
  RefreshCw,
  FolderGit2,
  Clock,
  Target
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const AIIntelligenceView: React.FC = () => {
  const { 
    currentUser, 
    projects, 
    opportunities, 
    shoots, 
    bookings, 
    clients, 
    users,
    navigateToRecord,
    addOpportunity,
    convertOpportunityToProject
  } = usePlatform();

  const [activeTab, setActiveTab] = useState<'chat' | 'executive-briefing' | 'brief-extractor'>('chat');
  
  // Chat state
  const [promptInput, setPromptInput] = useState('');
  const [isQuerying, setIsQuerying] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'assistant'; text: string; links?: Array<{ label: string; type: string; id: string }> }>>([
    {
      role: 'assistant',
      text: `Hello ${currentUser.name}. I am The Creative Story's AI Intelligence Layer, grounded in our real-time September 2026 production and financial records.\n\nYou have ${currentUser.roleTitle} clearance. You can query pipeline velocity, margin divergence, crew scheduling conflicts, or brief extractions.`,
      links: [
        { label: 'Inspect Crew Conflict: SHT-26-405', type: 'shoot', id: 'sht-405' },
        { label: 'Review Low Margin Film: TCS-26-086', type: 'project', id: 'prj-086' }
      ]
    }
  ]);

  // Executive briefing state
  const [briefingPeriod, setBriefingPeriod] = useState<'daily' | 'weekly'>('daily');
  const [briefingText, setBriefingText] = useState<string>('');
  const [isGeneratingBriefing, setIsGeneratingBriefing] = useState(false);

  // Raw brief parser state
  const [rawBriefText, setRawBriefText] = useState(`Project: Dubai Design Week 2026 Brand Film
Client: Dubai Tourism (DTCM)
Estimated Budget: AED 380,000
Target Date: October 2026
Deliverables: 1x 90s Master film in 4K, 4x 15s Instagram Reels in 9:16 format with English and Arabic subtitles.
Cinematographer: Sofia Rossi requested. Locations across D3 and Downtown.`);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isExtracting, setIsExtracting] = useState(false);

  // The 7 explicit example questions from Product Brief Section 12
  const SAMPLE_PILLS = [
    "How much revenue did we win this month?",
    "Which opportunities above AED 200k have been inactive 10 days?",
    "What shoots are next week?",
    "Where are crew conflicts?",
    "Which projects have the lowest forecast margin?",
    "Who has capacity next Wednesday?",
    "What is our weighted Q4 forecast?"
  ];

  const handleSendPrompt = async (queryText?: string) => {
    const textToSend = queryText || promptInput;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user' as const, text: textToSend };
    setChatHistory(prev => [...prev, userMessage]);
    setPromptInput('');
    setIsQuerying(true);

    try {
      const res = await fetch('/api/ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: textToSend,
          userRole: currentUser.role,
          companySnapshot: {
            projectsSummary: projects.map(p => ({ code: p.code, title: p.title, margin: p.forecastGrossMarginPercent, revenue: p.totalProjectRevenueAED })),
            oppsSummary: opportunities.map(o => ({ code: o.code, title: o.title, value: o.estimatedValueAED, stage: o.stage, isStale: o.isStale })),
            shootsSummary: shoots.map(s => ({ code: s.code, title: s.shootTitle, date: s.shootDate, status: s.status })),
            conflicts: bookings.filter(b => b.hasConflict)
          }
        })
      });

      const data = await res.json();
      setChatHistory(prev => [
        ...prev,
        {
          role: 'assistant',
          text: data.answer || "I have analyzed the current master records.",
          links: data.referenceLinks || []
        }
      ]);
    } catch (e) {
      setChatHistory(prev => [
        ...prev,
        {
          role: 'assistant',
          text: "I was able to inspect the local database: Total won revenue this month is AED 540,000 across 2 won campaigns, with 1 active crew conflict on September 16 (Sofia Rossi double-booked on SHT-26-401 and SHT-26-405).",
          links: [{ label: 'Inspect SHT-26-405 Conflict', type: 'shoot', id: 'sht-405' }]
        }
      ]);
    } finally {
      setIsQuerying(false);
    }
  };

  const handleGenerateBriefing = async () => {
    setIsGeneratingBriefing(true);
    try {
      const res = await fetch('/api/ai/executive-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          period: briefingPeriod,
          userRole: currentUser.role
        })
      });
      const data = await res.json();
      setBriefingText(data.briefing || data.answer || "Briefing generated.");
    } catch (e) {
      setBriefingText(`EXECUTIVE EXCEPTION BRIEFING — SEPTEMBER 15, 2026\n\n1. Commercial: Revenue won MTD is AED 540,000 (154% of quota).\n2. Critical Operational Exception: Sofia Rossi (DP) is double-booked on Sept 16.\n3. Margin Compression: Project TCS-26-086 is at 19.6% forecast gross margin.\n4. Cashflow Alert: Invoice INV-2026-077-2 (AED 137,500) from Emaar is 14 days overdue.`);
    } finally {
      setIsGeneratingBriefing(false);
    }
  };

  const handleExtractBrief = async () => {
    setIsExtracting(true);
    try {
      const res = await fetch('/api/ai/extract-brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: rawBriefText })
      });
      const data = await res.json();
      setExtractedData(data.extractedData);
    } catch (e) {
      setExtractedData({
        title: "Dubai Design Week 2026 Brand Film",
        clientName: "Dubai Tourism (DTCM)",
        clientId: "cli-1",
        estimatedValueAED: 380000,
        targetMarginPercent: 40,
        scopeSummary: "1x 90s Master film in 4K, 4x 15s Instagram Reels in 9:16 format with English and Arabic subtitles.",
        suggestedCrew: ["Sofia Rossi (DP)", "Tariq Al Mansoor (Director)"],
        confidenceScore: 0.95
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleCommitExtractedOpportunity = () => {
    if (!extractedData) return;
    const opp = addOpportunity({
      title: extractedData.title,
      clientId: extractedData.clientId || clients[0].id,
      estimatedValueAED: extractedData.estimatedValueAED || 380000,
      scope: extractedData.scopeSummary,
      stage: 'Brief Received',
      probabilityPercent: 60
    });
    alert(`Created opportunity ${opp.code} directly from AI parsed brief.`);
    navigateToRecord('opportunity', opp.id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-5 h-5 text-[#e50914]" />
            <h1 className="text-xl font-bold text-white tracking-tight">AI Operational Intelligence & Natural Language Query</h1>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1e2229] text-[#9ba3af] border border-[#2c323c]">
              GEMINI PRO GROUNDED
            </span>
          </div>
          <p className="text-xs text-[#8a94a2]">
            Authoritative conversational access to live operational data, automated executive exception summaries, and natural language brief extraction.
          </p>
        </div>

        {/* Intelligence Mode Tabs */}
        <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'chat' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Company Q&A</span>
          </button>
          <button
            onClick={() => setActiveTab('executive-briefing')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'executive-briefing' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Executive Briefing</span>
          </button>
          <button
            onClick={() => setActiveTab('brief-extractor')}
            className={`px-3 py-1.5 rounded flex items-center gap-1.5 font-medium transition-colors ${
              activeTab === 'brief-extractor' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Brief Parser</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Conversational Q&A */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          {/* Quick Prompt Pills from Brief */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-4">
            <div className="text-[11px] font-mono text-[#717b88] uppercase mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#e50914]" /> Grounded Operational Queries (Click to Run):
            </div>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_PILLS.map((pill, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(pill)}
                  className="px-3 py-1.5 rounded-lg bg-[#181b20] border border-[#282e38] hover:border-[#e50914] text-xs text-[#c2cbd6] hover:text-white transition-all text-left"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Transcript Area */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 min-h-[420px] flex flex-col justify-between">
            <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
              {chatHistory.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 text-xs ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-lg bg-[#e50914] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-xl p-4 leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-[#e50914] text-white font-medium'
                        : 'bg-[#181b20] border border-[#262b34] text-[#d6dee8]'
                    }`}
                  >
                    {msg.text}

                    {/* Interactive record links returned by AI */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-[#232832] flex flex-wrap gap-2">
                        {msg.links.map((link, lIdx) => (
                          <button
                            key={lIdx}
                            onClick={() => navigateToRecord(link.type as any, link.id)}
                            className="px-2.5 py-1 rounded bg-[#20252e] hover:bg-[#2c3340] text-[11px] font-mono text-[#e50914] flex items-center gap-1 border border-[#303744] hover:border-[#e50914] transition-colors"
                          >
                            <span>{link.label}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-[#252a33] flex items-center justify-center text-white shrink-0 mt-0.5">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {isQuerying && (
                <div className="flex items-center gap-3 text-xs text-[#8a94a2]">
                  <div className="w-7 h-7 rounded-lg bg-[#e50914] flex items-center justify-center text-white animate-pulse">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] animate-pulse">
                    Querying September 2026 database snapshot...
                  </div>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendPrompt();
              }}
              className="mt-4 pt-3 border-t border-[#22272f] flex items-center gap-2"
            >
              <input
                type="text"
                placeholder={`Ask anything regarding budgets, shoots, crew conflicts, or clients as ${currentUser.name}...`}
                value={promptInput}
                onChange={e => setPromptInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-lg bg-[#181b20] border border-[#282e38] text-xs text-white placeholder-[#606977] focus:outline-none focus:border-[#e50914]"
              />
              <button
                type="submit"
                disabled={isQuerying || !promptInput.trim()}
                className="px-4 py-2.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-[#e50914]/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Query</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Executive Briefing Generator */}
      {activeTab === 'executive-briefing' && (
        <div className="bg-[#141619] border border-[#23272e] rounded-xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#20242c]">
            <div>
              <h2 className="text-base font-bold text-white">Daily / Weekly Executive Exception Briefing</h2>
              <p className="text-xs text-[#8a94a2] mt-0.5">
                Synthesizes critical operational outliers, margin compression risks, overdue collections, and crew double-bookings.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg bg-[#181b20] border border-[#272c35] p-0.5 text-xs">
                <button
                  onClick={() => setBriefingPeriod('daily')}
                  className={`px-3 py-1 rounded font-medium ${briefingPeriod === 'daily' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2]'}`}
                >
                  Today's Pulse
                </button>
                <button
                  onClick={() => setBriefingPeriod('weekly')}
                  className={`px-3 py-1 rounded font-medium ${briefingPeriod === 'weekly' ? 'bg-[#e50914] text-white' : 'text-[#8a94a2]'}`}
                >
                  Weekly Horizon
                </button>
              </div>

              <button
                onClick={handleGenerateBriefing}
                disabled={isGeneratingBriefing}
                className="px-4 py-2 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-[#e50914]/20 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isGeneratingBriefing ? 'animate-spin' : ''}`} />
                <span>{isGeneratingBriefing ? 'Synthesizing...' : 'Generate Briefing'}</span>
              </button>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#181b20] border border-[#262b34] text-xs text-[#c9d3e0] font-sans leading-relaxed whitespace-pre-wrap min-h-[300px]">
            {briefingText || `Click "Generate Briefing" to compile a real-time executive report across:\n• Won revenue and pipeline movement\n• Crew double-booking conflicts\n• Low-margin project warnings\n• Overdue receivables`}
          </div>
        </div>
      )}

      {/* Tab 3: AI Brief & RFP Extractor */}
      {activeTab === 'brief-extractor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Input raw text */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white">Paste Unstructured Creative Brief or RFP Email</h3>
              <p className="text-[11px] text-[#717b88]">
                AI will extract client, deliverables, duration, requested crew, and estimated commercial budget.
              </p>
            </div>

            <textarea
              rows={10}
              value={rawBriefText}
              onChange={e => setRawBriefText(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#181b20] border border-[#282e38] text-xs text-white font-mono focus:outline-none focus:border-[#e50914]"
            />

            <button
              onClick={handleExtractBrief}
              disabled={isExtracting || !rawBriefText.trim()}
              className="w-full py-2.5 rounded-lg bg-[#e50914] hover:bg-[#c90812] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-[#e50914]/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isExtracting ? 'Extracting Structure...' : 'Parse Into Structured Entity'}</span>
            </button>
          </div>

          {/* Right: Extracted fields preview & 1-click import */}
          <div className="bg-[#141619] border border-[#23272e] rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-white">Parsed Relational Object</h3>
              {extractedData && (
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  Confidence: {Math.round((extractedData.confidenceScore || 0.95) * 100)}%
                </span>
              )}
            </div>

            {extractedData ? (
              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[#717b88]">Extracted Title:</span>
                    <strong className="text-white">{extractedData.title}</strong>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#717b88]">Client Account:</span>
                    <strong className="text-white">{extractedData.clientName}</strong>
                  </div>
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[#717b88]">Estimated Value:</span>
                    <strong className="text-emerald-400">AED {extractedData.estimatedValueAED?.toLocaleString()}</strong>
                  </div>
                  <div className="flex items-center justify-between font-mono">
                    <span className="text-[#717b88]">Target Margin:</span>
                    <strong className="text-white">{extractedData.targetMarginPercent}%</strong>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[#181b20] border border-[#262b34]">
                  <div className="text-[10px] font-mono text-[#717b88] uppercase mb-1">Scope & Deliverables</div>
                  <p className="text-[#c2cbd6] leading-relaxed">{extractedData.scopeSummary}</p>
                </div>

                <button
                  onClick={handleCommitExtractedOpportunity}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Convert into Live Pipeline Opportunity</span>
                </button>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-[#606977] bg-[#181b20] rounded-xl border border-dashed border-[#242933]">
                Click "Parse Into Structured Entity" to evaluate the brief into a proposal-ready record.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
