import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RefreshCw, WifiOff, AlertTriangle, Sparkles, BookOpen, Clock, Zap } from "lucide-react";

// Curated engaging copywriting, SaaS conversion, and marketing psychology facts
const DYNAMIC_FACTS = [
  "Headline metrics (e.g. '+14.2% reply rate') receive up to 3.8x higher CTR than rounded estimates (e.g. '+15%'). Precision creates trust.",
  "Including exactly one high-context customer testimonial on your main landing page can increase signup conversions by up to 34%.",
  "Case studies and social proof formatted in natural story narrative double the average time users spend engaging with your content.",
  "Writing copy using active verbs like 'Recapture' or 'Automate' instead of passive phrases hikes sign-up clicks by 18%.",
  "The 'Hook, Story, Offer' framework dates back to peak print-advertising eras but remains the single highest-converting layout for SaaS landing pages.",
  "Shorter personalized cold outreaches (under 120 words) get on average a 22% higher reply rate than long corporate summaries.",
  "Human brains process visual indicators, social proofs, and graphical comparisons up to 60,000 times faster than raw text blocks.",
  "Social proof is the strongest landing page asset. A single detailed customer dashboard capture earns more trust than 100 blind promises.",
  "Addressing immediate user bottlenecks first in your header copy (called 'leading with the headache') reduces visitor bounce rate by 42%.",
  "The 'Before-After-Bridge' framework keeps visitors reading because it instantly establishes a current painful baseline before drawing a superior ideal future.",
  "People recall stories up to 22 times more easily than generic features or dry lists of software integrations. Narrate your metrics.",
  "A 1-second delay in page response times can reduce conversion rate efficiency by 7%. Keep your static code light.",
  "Social proof with exact names and real profile images converts 1.5x better than anonymous general endorsements as humans seek verifiable evidence.",
  "Adding risk-reversal micro-text ('No credit card required', 'Get instant workspace setup') near checkout buttons lifts conversions by 15%.",
  "When testing multi-step workflows, showing a dynamic loading bar in progress state maintains user engagement rates above 88%."
];

interface NetworkAndPageLoaderProps {
  isLoading: boolean;
  isNetworkSlow: boolean;
  isOffline: boolean;
  onFinishedTransition?: () => void;
  triggerKey?: string | number; // To cycle facts on every new load
  customTitle?: string;
  customSubtitle?: string;
}

export default function NetworkAndPageLoader({
  isLoading,
  isNetworkSlow,
  isOffline,
  onFinishedTransition,
  triggerKey,
  customTitle,
  customSubtitle
}: NetworkAndPageLoaderProps) {
  const [currentFact, setCurrentFact] = useState("");

  // Update fact whenever loader gets activated or screen/triggerKey changes
  useEffect(() => {
    if (isLoading || isNetworkSlow || isOffline) {
      const randomIndex = Math.floor(Math.random() * DYNAMIC_FACTS.length);
      setCurrentFact(DYNAMIC_FACTS[randomIndex]);
    }
  }, [isLoading, isNetworkSlow, isOffline, triggerKey]);

  // If none of the conditions are met, render nothing
  if (!isLoading && !isNetworkSlow && !isOffline) {
    return null;
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 bg-slate-900/90 backdrop-blur-md select-none text-white overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full bg-slate-950 border border-slate-800 p-8 rounded-2xl shadow-2xl flex flex-col items-center text-center space-y-6"
        >
          {/* Status Badge Header */}
          <div className="flex items-center gap-2">
            {isOffline ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-rose-500/10 border border-rose-500/25 rounded-full text-[10px] font-mono font-bold text-rose-400 uppercase tracking-widest animate-pulse">
                <WifiOff className="w-3.5 h-3.5" /> Offline Mode
              </span>
            ) : isNetworkSlow ? (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/25 rounded-full text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest animate-pulse">
                <AlertTriangle className="w-3.5 h-3.5" /> Slow Connection
              </span>
            ) : (
              <span className="flex items-center gap-1.5 px-3 py-1 bg-indigo-500/10 border border-indigo-500/25 rounded-full text-[10px] font-mono font-bold text-indigo-400 uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-indigo-400" /> Connecting Server
              </span>
            )}
          </div>

          {/* Core Loading Indicator animation */}
          <div className="relative flex items-center justify-center py-6">
            <div className="absolute w-24 h-24 rounded-full border border-indigo-550 border-indigo-500/10 animate-ping" />
            <div className="absolute w-16 h-16 rounded-full border border-indigo-500/20 animate-pulse" />
            
            <div className="relative bg-slate-900 border border-slate-800 rounded-full p-4 flex items-center justify-center shadow-lg">
              {isOffline ? (
                <WifiOff className="w-8 h-8 text-rose-500" />
              ) : isNetworkSlow ? (
                <RefreshCw className="w-8 h-8 text-amber-500 animate-[spin_3s_linear_infinite]" />
              ) : (
                <RefreshCw className="w-8 h-8 text-indigo-550 text-indigo-500 animate-spin" />
              )}
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1.5">
            <h3 className="text-sm font-extrabold tracking-tight uppercase text-slate-100">
              {isOffline 
                ? "Waiting for internet..." 
                : isNetworkSlow 
                ? "Unsteady Network Detected" 
                : (customTitle || "Calibrating Copy Engine")}
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">
              {isOffline 
                ? "Please check your network signal. The system will resume automatically." 
                : isNetworkSlow 
                ? "Connecting under low-signal conditions. Showing optimized previews." 
                : (customSubtitle || "Importing receipt credentials and applying copywriting structures...")}
            </p>
          </div>

          {/* Fact Display divider */}
          <div className="w-full border-t border-slate-800/80 pt-5 text-left space-y-2.5">
            <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-1.5 font-mono select-none">
              <BookOpen className="w-3.5 h-3.5" /> Receipts Insight
            </span>
            <div className="bg-slate-900/50 border border-slate-800/40 p-4 rounded-xl min-h-[64px] flex items-center justify-center">
              <p className="text-xs text-slate-350 text-slate-300 leading-relaxed font-normal italic">
                "{currentFact}"
              </p>
            </div>
          </div>

          {/* Dismiss button/status indicator */}
          {(isNetworkSlow || isOffline) && (
            <div className="w-full text-[10px] font-mono text-slate-500 flex items-center justify-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Checking network status continuously...</span>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
