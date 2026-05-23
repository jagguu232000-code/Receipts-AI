import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Search, 
  Trash2, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  TrendingUp, 
  Briefcase, 
  Copy, 
  Check, 
  Linkedin, 
  Twitter, 
  Quote, 
  Star, 
  ExternalLink,
  MessageSquare,
  FileText
} from "lucide-react";

interface LogRecord {
  id: string;
  date: string;
  time: string;
  month: string;
  timestamp: number;
  creatorName: string;
  clientType: string;
  service: string;
  industry: string;
  problem: string;
  solution: string;
  result: string;
  timeframe: string;
  tone: string;
  assets: {
    xThread: string[];
    coldDm: string;
    landingBlurb: string;
    testimonial: {
      quote: string;
      creatorInsight: string;
    };
    postingTips: string[];
    linkedinPost?: string;
    reviewRatingAsset?: {
      overallRating: number;
      metrics: { label: string; score: number }[];
      title: string;
      body: string;
      authorName: string;
      authorDesignation: string;
      socialShareTeaser: string;
    };
  };
}

interface VaultAndAnalyticsBoardProps {
  logs: LogRecord[];
  onDeleteLog: (id: string) => void;
  onSelectHistoricalResult: (assets: any) => void;
}

export default function VaultAndAnalyticsBoard({ logs, onDeleteLog, onSelectHistoricalResult }: VaultAndAnalyticsBoardProps) {
  const safeLogs = Array.isArray(logs) ? logs : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("all");
  const [selectedTone, setSelectedTone] = useState("all");
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Derive key metrics
  const totalCampaigns = safeLogs.length;
  const totalAssets = totalCampaigns * 6; // 6 assets per campaign (Thread, DM, Blurb, Testimonial, Tips, LinkedIn, Review)
  
  // Calculate top industry targeted
  const industries = safeLogs.map(l => l.industry).filter(Boolean);
  const indCount: { [key: string]: number } = {};
  industries.forEach(ind => { indCount[ind] = (indCount[ind] || 0) + 1; });
  const topIndustry = Object.keys(indCount).reduce((a, b) => indCount[a] > indCount[b] ? a : b, "N/A");

  // Calculate parsed average multiplier boost
  const multipliers = safeLogs.map(l => {
    const num = parseFloat((l?.result || "").replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 5 : num > 200 ? 5 : num; // fallback sanitizer
  });
  const avgBoost = multipliers.length > 0 
    ? (multipliers.reduce((sum, val) => sum + val, 0) / multipliers.length).toFixed(1)
    : "8.5";

  // Filter logs
  const filteredLogs = safeLogs.filter(log => {
    const matchesSearch = 
      (log?.creatorName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log?.clientType || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log?.service || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log?.result || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log?.industry || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesIndustry = selectedIndustry === "all" || log?.industry === selectedIndustry;
    const matchesTone = selectedTone === "all" || (log?.tone || "").toLowerCase() === selectedTone.toLowerCase();

    return matchesSearch && matchesIndustry && matchesTone;
  });

  const uniqueIndustries = Array.from(new Set(safeLogs.map(l => l?.industry).filter(Boolean)));
  const uniqueTones = Array.from(new Set(safeLogs.map(l => l?.tone).filter(Boolean)));

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full space-y-8">
      
      {/* 1. KEY METRICS BENTO CONTAINER */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-400 font-mono">Total Campaigns Logged</span>
            <p className="text-3xl font-black text-slate-900 mt-1">{totalCampaigns}</p>
            <p className="text-xs text-slate-500 mt-1">Unique client proof case runs</p>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
            <Calendar className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-400 font-mono">Total High-Conv Assets</span>
            <p className="text-3xl font-black text-emerald-600 mt-1">{totalAssets}</p>
            <p className="text-xs text-slate-500 mt-1">Ready-to-copy social outputs</p>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-400 font-mono">Avg Calculated Boost Lift</span>
            <p className="text-3xl font-black text-indigo-650 text-indigo-700 mt-1">{avgBoost}x</p>
            <p className="text-xs text-slate-500 mt-1">Dynamic campaign baseline height</p>
          </div>
          <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-400 font-mono">Dominant Industry Focus</span>
            <p className="text-lg font-extrabold text-slate-800 tracking-tight truncate max-w-[150px] mt-2 block">{topIndustry}</p>
            <p className="text-xs text-slate-500 mt-1">Highest frequency segment</p>
          </div>
          <div className="p-3 bg-amber-50 border border-amber-150 rounded-xl text-amber-600">
            <Briefcase className="w-6 h-6" />
          </div>
        </div>

      </section>

      {/* 2. FILTERS AND UTILITIES BAR */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row items-center gap-4">
        
        {/* Search input */}
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-450 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search campaign log by client, service, result, or industry keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-medium text-slate-800"
          />
        </div>

        {/* Filters dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          
          {/* Industry Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-550">
            <span className="font-bold whitespace-nowrap">Segment:</span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="text-xs font-bold text-slate-705 border border-slate-200 bg-white rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All Industries</option>
              {uniqueIndustries.map((ind, idx) => (
                <option key={`${ind}-${idx}`} value={ind}>{ind}</option>
              ))}
            </select>
          </div>

          {/* Tone Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-550">
            <span className="font-bold whitespace-nowrap">Tone:</span>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="text-xs font-bold text-slate-705 border border-slate-200 bg-white rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="all">All Tones</option>
              {uniqueTones.map((tone, idx) => (
                <option key={`${tone}-${idx}`} value={tone}>{tone}</option>
              ))}
            </select>
          </div>

        </div>

      </section>

      {/* 3. DYNAMIC SEQUENTIAL TIMELINE STREAM */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <h3 className="text-xs uppercase font-extrabold tracking-wider text-slate-500 font-mono">
            Chronological Generation Stream ({filteredLogs.length} cases found)
          </h3>
          <span className="text-[10px] text-slate-400 font-mono">Data synced with local security parameters</span>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-12 text-center text-slate-500">
            <Clock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h4 className="text-xs font-black uppercase text-slate-700">No Asset Logs found matching search criteria</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Synthesize a client case win using the "Active Copy Builder" tab to instantly generate your copy logs!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {(() => {
              const seenLogIds = new Set<string>();
              const uniqueFilteredLogs = filteredLogs.filter(l => {
                if (!l?.id || seenLogIds.has(l.id)) return false;
                seenLogIds.add(l.id);
                return true;
              });
              return uniqueFilteredLogs.map((log) => {
                const isExpanded = expandedLogId === log.id;
                
                return (
                  <div 
                    key={log.id} 
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition-all flex flex-col group hover:border-purple-400"
                  >
                  
                  {/* Log Header bar */}
                  <div 
                    onClick={() => setExpandedLogId(isExpanded ? null : log.id)}
                    className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 cursor-pointer group-hover:bg-purple-50/20 transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      {/* Date Badge */}
                      <div className="bg-slate-100 border border-slate-250 p-2.5 rounded-xl text-center min-w-[70px] select-none">
                        <span className="text-[8px] tracking-wider uppercase font-black text-slate-400 block leading-none font-mono">Month</span>
                        <span className="text-xs font-black text-slate-800 mt-0.5 block leading-none">{(log.month || "UNK").substring(0, 3)}</span>
                        <span className="text-[9px] tracking-widest font-mono text-indigo-600 mt-1.5 block leading-none font-bold">
                          {log.date.split(",")[0].trim().split(" ").slice(-1)[0]}
                        </span>
                      </div>

                      <div className="space-y-1 text-left">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-xs font-black text-slate-900">
                            {log.clientType} Case win
                          </h4>
                          <span className="text-[9px] uppercase font-mono font-bold bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded">
                            {log.industry}
                          </span>
                          <span className="text-[9px] uppercase font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                            {log.tone} Tone
                          </span>
                        </div>
                        
                        <p className="text-xs text-slate-500 font-semibold line-clamp-1 max-w-xl">
                          {log.creatorName} · {log.service} yielded <strong className="text-emerald-600">{log.result}</strong> in {log.timeframe}
                        </p>
                        
                        {/* Clock Stamp & Contained Assets Displays */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:gap-4 mt-1.5">
                          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 font-bold">
                            <Clock className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Generated: {(() => {
                              if (log.timestamp) {
                                try {
                                  const d = new Date(log.timestamp);
                                  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " at " + d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
                                } catch (e) {}
                              }
                              return `${log.date} at ${log.time}`;
                            })()}</span>
                          </div>

                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[9px] uppercase tracking-wider font-mono font-black text-slate-400">Campaign Elements:</span>
                            {log.assets.linkedinPost && (
                              <span className="inline-flex items-center gap-1 text-[9px] bg-blue-50 text-blue-700 border border-blue-100 rounded px-1.5 py-0.5 font-bold" title="LinkedIn Post Asset">
                                <Linkedin className="w-2.5 h-2.5" /> Post
                              </span>
                            )}
                            {log.assets.xThread && log.assets.xThread.length > 0 && (
                              <span className="inline-flex items-center gap-1 text-[9px] bg-slate-50 text-slate-700 border border-slate-200 rounded px-1.5 py-0.5 font-bold" title="Twitter/X Thread">
                                <Twitter className="w-2.5 h-2.5" /> Thread
                              </span>
                            )}
                            {log.assets.coldDm && (
                              <span className="inline-flex items-center gap-1 text-[9px] bg-indigo-50 text-indigo-700 border border-indigo-100 rounded px-1.5 py-0.5 font-bold" title="Social DM">
                                <MessageSquare className="w-2.5 h-2.5 text-indigo-650" /> Cold DM
                              </span>
                            )}
                            {log.assets.landingBlurb && (
                              <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-100 rounded px-1.5 py-0.5 font-bold" title="Landing Pitch">
                                <FileText className="w-2.5 h-2.5" /> Pitch
                              </span>
                            )}
                            {log.assets.reviewRatingAsset && (
                              <span className="inline-flex items-center gap-1 text-[9px] bg-amber-50 text-amber-700 border border-amber-100 rounded px-1.5 py-0.5 font-bold" title="Client Star Review Plate">
                                <Star className="w-2.5 h-2.5 fill-current text-amber-500" /> Review
                              </span>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t border-slate-100 pt-3 md:pt-0 md:border-0">
                      
                      {/* Push to active viewer */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectHistoricalResult(log.assets);
                          alert("Campaign assets loaded successfully into your Active Copy Builder! Switch tabs to view and edit.");
                        }}
                        className="text-[10px] text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/70 py-1.5 px-3 rounded-lg font-extrabold transition-all cursor-pointer flex items-center gap-1 shadow-xs border border-indigo-100"
                      >
                        <Sparkles className="w-3 h-3" /> Load Assets
                      </button>

                      {/* Delete record */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm("Are you sure you want to permanently delete this logged copywriting asset from local storage history?")) {
                            onDeleteLog(log.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-all cursor-pointer"
                        title="Delete asset log entries"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Expand indicator */}
                      <span className="p-1 text-slate-450">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </div>

                  </div>

                  {/* Expanded asset lists panel */}
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      className="border-t border-slate-150 border-slate-200 bg-slate-50/50 p-5 md:p-6 space-y-6"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        
                        {/* Col 1: LinkedIn Authority outline */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 shadow-xs">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-mono flex items-center gap-1.5"><Linkedin className="w-3 h-3 text-blue-650" /> LinkedIn Article Asset</span>
                            <button
                              onClick={() => handleCopyText(`li-${log.id}`, log.assets.linkedinPost || "")}
                              className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1 py-1 px-2.5 bg-slate-50 rounded"
                            >
                              {copiedId === `li-${log.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === `li-${log.id}` ? "Copied" : "Copy"}</span>
                            </button>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed max-h-52 overflow-y-auto whitespace-pre-wrap italic">
                            {log.assets.linkedinPost || "No LinkedIn Asset rendered in this campaign log."}
                          </p>
                        </div>

                        {/* Col 2: Cold DM Outline */}
                        <div className="bg-white border border-slate-200 rounded-xl p-4.5 space-y-3 shadow-xs">
                          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                            <span className="text-[10px] uppercase font-black tracking-wider text-slate-400 font-mono flex items-center gap-1.5"><MessageSquare className="w-3 h-3 text-indigo-500" /> Outreach sequence</span>
                            <button
                              onClick={() => handleCopyText(`dm-${log.id}`, log.assets.coldDm)}
                              className="text-[10px] font-bold text-indigo-600 hover:underline flex items-center gap-1 py-1 px-2.5 bg-slate-50 rounded"
                            >
                              {copiedId === `dm-${log.id}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === `dm-${log.id}` ? "Copied" : "Copy"}</span>
                            </button>
                          </div>
                          <p className="text-xs text-slate-700 leading-relaxed max-h-52 overflow-y-auto whitespace-pre-wrap italic">
                            {log.assets.coldDm}
                          </p>
                        </div>

                      </div>

                      {/* Social proof asset row */}
                      {log.assets.reviewRatingAsset && (
                        <div className="p-4 rounded-xl bg-slate-900 text-white max-w-xl border border-slate-850">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => <Star key={`stat-star-${i}`} className="w-3.5 h-3.5 fill-current" />)}
                              <span className="text-[10px] font-bold text-slate-300">({log.assets.reviewRatingAsset.overallRating}/5)</span>
                            </div>
                            <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Verified Plate Graphics View</span>
                          </div>
                          <h5 className="text-[11px] font-extrabold italic text-slate-100">"{log.assets.reviewRatingAsset.title}"</h5>
                          <p className="text-[10px] text-slate-350 leading-relaxed mt-1 line-clamp-2">"{log.assets.reviewRatingAsset.body}"</p>
                        </div>
                      )}

                    </motion.div>
                  )}
                </div>
              );
            });
          })()}
          </div>
        )}
      </section>

    </div>
  );
}
