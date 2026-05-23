import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  FileText, 
  Heart, 
  HelpCircle, 
  Check, 
  ChevronDown, 
  MessageSquare, 
  PlayCircle, 
  Users, 
  Zap, 
  Info,
  TrendingUp,
  Award,
  Lock,
  RefreshCw,
  X,
  Mail,
  Twitter,
  Linkedin
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LandingPageProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigateToAuth: (isSignUp: boolean, customTitle?: string, customSubtitle?: string) => void;
  onNavigateToAbout?: () => void;
}

export default function LandingPage({ isDarkMode, onToggleDarkMode, onNavigateToAuth, onNavigateToAbout }: LandingPageProps) {
  const [activeTab, setActiveTab] = useState<"features" | "testimonials" | "faq">("features");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [demoRunCount, setDemoRunCount] = useState<number>(() => {
    const val = localStorage.getItem("receipts_demo_run_count");
    return val ? parseInt(val, 10) : 0;
  });
  const [isAuthPopupOpen, setIsAuthPopupOpen] = useState<boolean>(false);

  // About & Contact Us states
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  
  const handleOpenAbout = () => {
    if (onNavigateToAbout) {
      onNavigateToAbout();
    } else {
      setIsAboutModalOpen(true);
    }
  };
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);
  const [contactName, setContactName] = useState<string>("");
  const [contactEmail, setContactEmail] = useState<string>("");
  const [contactMessage, setContactMessage] = useState<string>("");
  const [isSubmittingContact, setIsSubmittingContact] = useState<boolean>(false);
  const [contactSuccessMessage, setContactSuccessMessage] = useState<string>("");
  const [contactError, setContactError] = useState<string>("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setContactError("Please fill out your name, your email, and the message.");
      return;
    }
    setContactError("");
    setContactSuccessMessage("");
    setIsSubmittingContact(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setContactSuccessMessage("Message sent successfully! Your message was routed securely to artistinhealing.");
        setContactName("");
        setContactEmail("");
        setContactMessage("");
      } else {
        setContactError(data.error || "Failed to submit message. Please try again.");
      }
    } catch (err: any) {
      setContactError("Network error. Please try again later.");
    } finally {
      setIsSubmittingContact(false);
    }
  };

  // Simulated interactive steps to demonstrate how "Receipts" works
  const [demoInput, setDemoInput] = useState<string>("Increased search traffic by 120% in 3 months using programmatic SEO files.");
  const [demoFramework, setDemoFramework] = useState<"pas" | "bab">("bab");
  const [demoResult, setDemoResult] = useState<string>("");
  const [isDemoGenerating, setIsDemoGenerating] = useState<boolean>(false);

  const handleSimulateDemo = () => {
    if (demoRunCount >= 1) {
      setIsAuthPopupOpen(true);
      return;
    }
    setIsDemoGenerating(true);
    setDemoResult("");
    setTimeout(() => {
      if (demoFramework === "bab") {
        setDemoResult(
          `🚀 **[Before]** We struggled to rank on Google and spent hours writing blog post outlines that gathered zero organic clicks.\n\n` +
          `🎯 **[After]** An automated system that ranks for thousands of long-tail keywords on autopilot while we sleep.\n\n` +
          `⚡ **[Bridge]** Discover how we leveraged programmatics to boost our search visibility by **120% in under 90 days**—and how you can replicate the exact same setup in 10 minutes.`
        );
      } else {
        setDemoResult(
          `🔴 **[Problem]** You are wasting massive budgets on paid ads because your organic search distribution is practically dead.\n\n` +
          `🔥 **[Agitate]** Every day you wait is another day your competitors acquire high-intent customers for pennies, leaving you with stagnant signup charts.\n\n` +
          `✅ **[Solution]** Deploy our programmatic SEO playbook to achieve a **120% surge in organic traffic in just 3 months**—bringing in thousands of free qualified leads with cold-hard evidence.`
        );
      }
      const nextRunCount = demoRunCount + 1;
      setDemoRunCount(nextRunCount);
      localStorage.setItem("receipts_demo_run_count", nextRunCount.toString());
      setIsDemoGenerating(false);
    }, 800);
  };

  const faqData = [
    {
      q: "What exactly is a 'Receipt' in marketing?",
      a: "A 'receipt' is cold, hard proof of your success. It can be a metric (e.g., 'saved $5,000 in server costs'), a timeline ('accomplished in 2 weeks'), or customer feedback. Receipts is designed to transform these boring raw facts into highly persuasive, proven SaaS frameworks."
    },
    {
      q: "Who is this copywriting system built for?",
      a: "It is specifically structured for SaaS Founders, Growth Marketers, Lead Generation Agencies, and Freelance Copywriters who want high-converting landing page headlines, pitch decks, cold emails, and social proof advertisements that are mathematically backed by actual business results."
    },
    {
      q: "How does the Free Single Output Trial work?",
      a: "Every new verified account instantly receives 1x free output trial! Simply register your email and mobile phone number to secure your account, complete the automated validation checklist, and immediately generate copy. No credit cards or upfront fees required."
    },
    {
      q: "How much does the unlimited lifetime access cost?",
      a: "Receipts is available for lifetime access at a $15 one-time payment for Lifetime Pro Access. This grants you infinite high-conversion copy generations, unlimited custom copy tones, and saves all your marketing drafts forever. There are absolutely no recurring or hidden monthly subscriptions."
    },
    {
      q: "What copywriting frameworks does the app support?",
      a: "Out-of-the-box it formats your evidence into Problem-Agitate-Solve (PAS), Before-After-Bridge (BAB), Hook-Story-Offer (HSO), and Attention-Interest-Desire-Action (AIDA) structures tailored for premium conversion."
    }
  ];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-950"
    }`}>
      
      {/* Upper Navigation Header */}
      <header id="landing-header" className={`border-b sticky top-0 z-40 backdrop-blur-md px-6 py-4 flex items-center justify-between ${
        isDarkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-slate-200"
      }`}>
        <div id="brand-logo-panel" className="flex items-center gap-2.5 select-none">
          <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl text-white shadow-md shadow-indigo-500/15 overflow-hidden group">
            <Award className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="font-extrabold tracking-tight text-md">Receipts</span>
              <span className="px-1.5 py-0.5 text-[9px] font-black rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/35">
                AI
              </span>
              <span className="text-[9px] font-mono text-slate-500 font-bold bg-slate-200/50 dark:bg-slate-800 px-1.5 py-0.5 rounded ml-1">v2.1</span>
            </div>
            <span className="text-[9px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest font-mono block mt-1">
              Proof-to-Copy
            </span>
          </div>
        </div>

        {/* Center Navigation Links - Smooth Scrolling */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 select-none">
          <button 
            type="button"
            onClick={() => {
              const el = document.getElementById("landing-demo-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Playground
          </button>
          <button 
            type="button"
            onClick={() => {
              setActiveTab("features");
              const el = document.getElementById("tabs-navigation-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Features
          </button>
          <button 
            type="button"
            onClick={() => {
              setActiveTab("testimonials");
              const el = document.getElementById("tabs-navigation-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            Testimonials
          </button>
          <button 
            type="button"
            onClick={() => {
              setActiveTab("faq");
              const el = document.getElementById("tabs-navigation-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button 
            type="button"
            onClick={handleOpenAbout}
            className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            About
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <button
            id="nav-signin-btn"
            type="button"
            onClick={() => onNavigateToAuth(false, "Restoring Creator Workspace", "Locating secure session credentials and initializing dashboard...")}
            className={`px-4 py-2 text-xs font-extrabold uppercase tracking-wider rounded-xl border cursor-pointer hover:scale-[1.02] transition-all ${
              isDarkMode 
                ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200" 
                : "bg-white border-slate-300 hover:bg-slate-100 text-slate-755"
            }`}
          >
            Sign In
          </button>

          <button
            id="nav-signup-btn"
            type="button"
            onClick={() => onNavigateToAuth(true, "Calibrating Free Trial Portal", "Configuring custom proof frameworks and preparing trial credits...")}
            className="px-5 py-2 bg-indigo-600 hover:bg-indigo-705 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md shadow-indigo-600/15 cursor-pointer hover:scale-[1.02]"
          >
            Get Free Trial
          </button>
        </div>
      </header>

      {/* Hero Welcome Banner Section */}
      <section id="landing-hero-section" className="relative pt-16 pb-14 px-6 max-w-7xl mx-auto text-center overflow-hidden">
        {/* Abstract background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 dark:bg-indigo-500/[0.03] rounded-full blur-3xl pointer-events-none" />

        <div className="relative inline-flex items-center gap-2 bg-indigo-605/10 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider mb-6 border border-indigo-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Stop Lying on Landing Pages. Back Your Copy with Solid Evidence.</span>
        </div>

        <h1 id="hero-heading" className="text-4xl md:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight">
          Turn Raw Customer Metrics Into{" "}
          <span className="text-indigo-600 dark:text-indigo-450 drop-shadow-xs bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 bg-clip-text text-transparent">
            Persuasive SaaS Copy
          </span>
        </h1>
        
        <p id="hero-subtext" className="text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-5 leading-relaxed font-normal">
          Receipts identifies your business credentials, audits performance statistics, and structures proven copywriting frameworks like PAS & BAB to convert cold visitors with mathematically sound evidence.
        </p>

        <div id="hero-buttons-wrapper" className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            id="hero-primary-cta"
            type="button"
            onClick={() => onNavigateToAuth(true, "Inscribing Free Trial License", "Setting up your proof credentials and preparing copywriting templates...")}
            className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg hover:scale-[1.02] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <span>Create Account & Claim Free Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <button
            id="hero-secondary-cta"
            type="button"
            onClick={() => onNavigateToAuth(false, "Restoring Creator Workspace", "Retrieving credentials and restoring campaigns...")}
            className={`w-full sm:w-auto px-8 py-4 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer ${
              isDarkMode 
                ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800 text-slate-200" 
                : "bg-white border-slate-300 hover:bg-slate-100 text-slate-700"
            }`}
          >
            Sign In with Credentials
          </button>
        </div>

        <div id="hero-trust-indicators" className="flex items-center justify-center gap-6 mt-12 text-slate-400 dark:text-slate-500 text-[10px] font-extrabold uppercase tracking-wider font-mono">
          <span className="flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-indigo-500" /> Fact-Based Metric Aligner</span>
          <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-indigo-500" /> No-Fluff Copy Blueprints</span>
          <span className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-indigo-500" /> Instant Copy-Paste Ready</span>
        </div>
      </section>

      {/* Interactive Walkthrough Demonstration (Usage section) */}
      <section id="landing-demo-section" className={`border-y py-16 px-6 ${
        isDarkMode ? "bg-slate-950/40 border-slate-850" : "bg-slate-100/50 border-slate-200"
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[9px] uppercase font-mono tracking-widest font-extrabold text-indigo-600 block mb-1">
              Live Interactive Playground
            </span>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              See How It Works in 3 Steps
            </h2>
            <p className="text-xs text-slate-500 mt-2">
              Experience the core logic. Type a success story or performance metric below to translate.
            </p>
          </div>

          <div id="interactive-demo-card" className={`rounded-3xl border p-6 md:p-8 transition-all grid grid-cols-1 md:grid-cols-2 gap-8 ${
            isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}>
            
            {/* Step form input pane */}
            <div id="demo-playground-controls" className="flex flex-col justify-between gap-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded">
                  Step 1: Write Raw Success Proof
                </span>
                <p className="text-[11px] text-slate-400 mt-1 mb-2">Write any raw metric, win, or accomplishment your product earned.</p>
                <textarea
                  id="playground-input"
                  rows={3}
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  className={`w-full rounded-xl p-3.5 text-xs outline-hidden transition-all resize-none border ${
                    isDarkMode 
                      ? "bg-slate-850 border-slate-700 text-slate-100 focus:border-indigo-500" 
                      : "bg-slate-50 border-slate-300 text-slate-800 focus:border-indigo-500 focus:bg-white"
                  }`}
                  placeholder="e.g. Cut cloud billing costs by 35% in 30 days while speeding up query processes by 3x."
                />
              </div>

              <div>
                <span className="text-[10px] font-extrabold uppercase bg-indigo-100 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded">
                  Step 2: Choose SaaS Angle
                </span>
                <p className="text-[11px] text-slate-400 mt-1 mb-2.5">What storytelling perspective fits best?</p>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    id="btn-frame-bab"
                    type="button"
                    onClick={() => setDemoFramework("bab")}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      demoFramework === "bab"
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold"
                        : isDarkMode ? "border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-400" : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span className="block text-xs uppercase font-extrabold">Before-After-Bridge (BAB)</span>
                    <span className="block text-[8px] opacity-80 mt-0.5">Focuses on transition and ultimate relief.</span>
                  </button>

                  <button
                    id="btn-frame-pas"
                    type="button"
                    onClick={() => setDemoFramework("pas")}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                      demoFramework === "pas"
                        ? "border-indigo-500 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 font-bold"
                        : isDarkMode ? "border-slate-800 bg-slate-850 hover:bg-slate-800 text-slate-400" : "border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600"
                    }`}
                  >
                    <span className="block text-xs uppercase font-extrabold">Problem-Agitate-Solve (PAS)</span>
                    <span className="block text-[8px] opacity-80 mt-0.5">Creates pain tension then resolves with proof.</span>
                  </button>
                </div>
              </div>

              <button
                id="btn-simulate-win"
                type="button"
                onClick={handleSimulateDemo}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <Zap className="w-4 h-4 animate-pulse" />
                <span>Step 3: Simulate Copy Transformation</span>
              </button>
            </div>

            {/* Step live visual output preview */}
            <div id="demo-playground-preview" className={`rounded-2xl border flex flex-col p-5 select-none ${
              isDarkMode ? "bg-slate-950 border-slate-850" : "bg-slate-50 border-slate-200"
            }`}>
              <div className="flex items-center justify-between border-b pb-3 mb-4 border-slate-200 dark:border-slate-800">
                <div id="demo-mock-tab" className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] uppercase font-mono font-bold text-slate-400 ml-2">PERSUASIVE OUTPUT SCHEMAS</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 font-mono">100% Copy-ready</span>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {isDemoGenerating ? (
                    <div className="flex flex-col items-center justify-center py-14 gap-2 animate-pulse">
                      <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
                      <span className="text-xs text-slate-500 font-extrabold tracking-wide uppercase">Structuring copy wins...</span>
                    </div>
                  ) : demoResult ? (
                    <div className="text-xs text-slate-700 dark:text-slate-350 leading-relaxed space-y-3 font-sans whitespace-pre-wrap animate-fade-in pr-2">
                      {demoResult.split("\n\n").map((para, i) => {
                        return (
                          <p key={`demo-para-${i}`}>
                            {para.startsWith("🚀") || para.startsWith("🎯") || para.startsWith("⚡") || para.startsWith("🔴") || para.startsWith("🔥") || para.startsWith("✅") ? (
                              <span>
                                <strong className="text-indigo-650 dark:text-indigo-400">{para.split(" ")[0] + " " + para.split(" ")[1]}</strong>
                                {para.substring(para.indexOf(" ") + para.split(" ")[1].length + 1)}
                              </span>
                            ) : (
                              para
                            )}
                          </p>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
                      <PlayCircle className="w-10 h-10 text-slate-350 dark:text-slate-600 mb-2.5" />
                      <span className="block text-xs font-bold text-slate-600 dark:text-slate-400">Copy Canvas Empty</span>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 max-w-xs mt-1">
                        Click "Simulate Copy Transformation" to run the mock input through your selected marketing layout instantly!
                      </p>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4 mt-6 border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400 text-[10px] font-extrabold uppercase tracking-wide">Ready to claim your free trial?</span>
                  <button
                    id="playground-cta-btn"
                    type="button"
                    onClick={() => onNavigateToAuth(true, "Unlocking Account", "Importing your playground insights to your permanent trial workspace...")}
                    className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-indigo-700 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Claim Free Custom Output Run</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section (Features, Testimonials, FAQ) */}
      <section id="tabs-navigation-section" className="py-16 px-6 max-w-7xl mx-auto">
        <div id="tabs-menu-wrapper" className="flex items-center justify-center border-b border-slate-200 dark:border-slate-800 mb-10 select-none pb-0.5">
          <div className="flex gap-1 md:gap-4 md:px-2">
            <button
              id="tab-btn-features"
              type="button"
              onClick={() => setActiveTab("features")}
              className={`pb-4 px-3 md:px-6 text-xs font-black uppercase tracking-widest relative cursor-pointer font-sans transition-all ${
                activeTab === "features" 
                  ? "text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-205"
              }`}
            >
              <span>Features of the Tools</span>
              {activeTab === "features" && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-indigo-600" 
                />
              )}
            </button>
            <button
              id="tab-btn-testimonials"
              type="button"
              onClick={() => setActiveTab("testimonials")}
              className={`pb-4 px-3 md:px-6 text-xs font-black uppercase tracking-widest relative cursor-pointer font-sans transition-all ${
                activeTab === "testimonials" 
                  ? "text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-205"
              }`}
            >
              <span>Authentic Testimonials</span>
              {activeTab === "testimonials" && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-indigo-600" 
                />
              )}
            </button>
            <button
              id="tab-btn-faq"
              type="button"
              onClick={() => setActiveTab("faq")}
              className={`pb-4 px-3 md:px-6 text-xs font-black uppercase tracking-widest relative cursor-pointer font-sans transition-all ${
                activeTab === "faq" 
                  ? "text-indigo-600 dark:text-indigo-400" 
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-205"
              }`}
            >
              <span>FAQ</span>
              {activeTab === "faq" && (
                <motion.div 
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-indigo-600" 
                />
              )}
            </button>
          </div>
        </div>

        {/* Tab Content Display Panels connected to ActiveTab state */}
        <div id="tabs-interactive-container" className="min-h-[380px]">
          <AnimatePresence mode="wait">
            {activeTab === "features" && (
              <motion.div
                id="panel-features-block"
                key="features"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Feature Card 1 */}
                <div id="feat-card-1" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805 hover:border-slate-700" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/55 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2 font-sans">1. Metric Proof-to-PAS Aligner</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Pushes your cold data, stats, and retention numbers through the standard Problem-Agitate-Solve copywriting schema. This converts simple database metrics into emotional customer purchasing urgency instantly.
                  </p>
                </div>

                {/* Feature Card 2 */}
                <div id="feat-card-2" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805 hover:border-slate-700" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/55 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2 font-sans">2. Multi-SaaS Tone Adapters</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Whether you target enterprise developers who favor clean cold technical reasoning, or early founders who lean into casual playfulness—Receipts automatically adjusts grammar, tone keywords, and display styling boundaries.
                  </p>
                </div>

                {/* Feature Card 3 */}
                <div id="feat-card-3" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805 hover:border-slate-700" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/55 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2 font-sans">3. Before-After-Bridge (BAB) Loops</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Transforms standard "dry" descriptions into narrative lines containing standard customer setups, immediate pain reliefs, and bridging loops loaded with the specific percent figures you provided in workspace.
                  </p>
                </div>

                {/* Feature Card 4 */}
                <div id="feat-card-4" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805 hover:border-slate-700" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/55 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2 font-sans">4. Safe Account Shield</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Secures your generated SaaS copy drafts, profile avatars, and custom industry tones behind a virtual phone MFA verification handshake. Your business intellectual accomplishments are protected locally.
                  </p>
                </div>

                {/* Feature Card 5 */}
                <div id="feat-card-5" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805 hover:border-slate-700" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/55 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2 font-sans">5. Multi-Channel Assets & Tracker</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Instantly save perfect campaigns, custom brand lingo, and industry presets in your local workspace. Pivot, re-export, and analyze performance across platforms without any database complex configuration.
                  </p>
                </div>

                {/* Feature Card 6 */}
                <div id="feat-card-6" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805 hover:border-slate-700" : "bg-white border-slate-200 hover:border-indigo-200"
                }`}>
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-950/55 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold mb-4">
                    <Award className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-sm mb-2 font-sans">6. 100% Copy-Paste Ready</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                    Tidy output alignment makes it instant and dead simple to drop your generated marketing copy right into Framer widgets, Webflow page nodes, custom code files, or cold sales outreach.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "testimonials" && (
              <motion.div
                id="panel-testimonials-block"
                key="testimonials"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {/* Testimonial 1 */}
                <div id="testimonial-card-1" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md relative duration-300 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 select-none">
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Marcus Thorne" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">Marcus Thorne</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1 py-0.5 rounded font-mono uppercase tracking-wider">Verified Sync</span>
                        </div>
                        <span className="block text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Principal Copywriter, ConversionLab</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 text-xs mb-3">★ ★ ★ ★ ★</div>
                    <p className={`text-xs leading-relaxed font-normal italic ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      "I was highly skeptical at first because generic AI tools write extremely bland marketing headlines. But Receipts forces you to declare structural evidence first. Linking our raw trial signup velocity to a PAS framework let us write a landing page value proposition in 5 minutes that increased signup conversion by <strong>21.4%</strong> with zero extra tweaking."
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Target: B2B Marketers</span>
                    <span className="text-emerald-500 font-bold">Passed Verification</span>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div id="testimonial-card-2" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md relative duration-300 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 select-none">
                      <img 
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Priya Sharma" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">Priya Sharma</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1 py-0.5 rounded font-mono uppercase tracking-wider">Verified Customer</span>
                        </div>
                        <span className="block text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Lead SEO & Growth, ScaleFlow Inc.</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 text-xs mb-3">★ ★ ★ ★ ★</div>
                    <p className={`text-xs leading-relaxed font-normal italic ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      "We run programmatic SEO templates across 40+ category nodes. Translating raw analytics spikes (like <strong>'+140% traffic clickrate'</strong>) into compelling 'Before-After-Bridge' loops used to require endless human editing sessions. This tool structures the narrative so beautifully we copy-pasted the copy straight into our Framer designs."
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Target: Organic Search</span>
                    <span className="text-emerald-500 font-bold">Passed Verification</span>
                  </div>
                </div>

                {/* Testimonial 3 */}
                <div id="testimonial-card-3" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md relative duration-300 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 select-none">
                      <img 
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Tyler Vance" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">Tyler Vance</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1 py-0.5 rounded font-mono uppercase tracking-wider">Premium Life</span>
                        </div>
                        <span className="block text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Founder, AuthGuard Security</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 text-xs mb-3">★ ★ ★ ★ ★</div>
                    <p className={`text-xs leading-relaxed font-normal italic ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      "As a technical programmer, writing marketing taglines is usually absolute torture for me. With Receipts, I literally just typed in our main security testing parameters—specifically that we eliminated <strong>99.8% of brute force vectors</strong>. The engine gave us a brilliant Hook-Story-Offer statement that completely resonated with enterprise leads. Absolute lifesaver."
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Target: Tech Buyers</span>
                    <span className="text-emerald-500 font-bold">Passed Verification</span>
                  </div>
                </div>

                {/* Testimonial 4 */}
                <div id="testimonial-card-4" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md relative duration-300 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 select-none">
                      <img 
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Chloe Dubois" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">Chloe Dubois</span>
                          <span className="text-[8px] bg-indigo-500/10 text-indigo-600 dark:text-indigo-450 font-bold px-1 py-0.5 rounded font-mono uppercase tracking-wider">Agency Owner</span>
                        </div>
                        <span className="block text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Digital Acquisition, RetailSync</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 text-xs mb-3">★ ★ ★ ★ ★</div>
                    <p className={`text-xs leading-relaxed font-normal italic ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      "Our acquire team split-tested our manually made copy against the Before-After-Bridge outputs from Receipts on cold sales outreach representing <strong>12,000 corporate leads</strong>. The verified metric copy achieved a <strong>34% higher reply rate</strong> because it led with mathematically proven success cases instead of vague claims. The Gumroad key was a incredible investment."
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Target: Cold Outreach</span>
                    <span className="text-emerald-500 font-bold">Passed Verification</span>
                  </div>
                </div>

                {/* Testimonial 5 */}
                <div id="testimonial-card-5" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md relative duration-300 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 select-none">
                      <img 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Hiroshi Tanaka" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">Hiroshi Tanaka</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1 py-0.5 rounded font-mono uppercase tracking-wider">Active Trial</span>
                        </div>
                        <span className="block text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Solo Indie Hacker, FormSprout</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 text-xs mb-3">★ ★ ★ ★ ★</div>
                    <p className={`text-xs leading-relaxed font-normal italic ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      "I love the absolute elegance of this UX. You draft your credential details, configure your specific business facts, and get high-impact headlines centered entirely on historical truth. The virtual phone MFA keeps my copy concepts safe locally. Pure quality."
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Target: Bootstrappers</span>
                    <span className="text-emerald-500 font-bold">Passed Verification</span>
                  </div>
                </div>

                {/* Testimonial 6 */}
                <div id="testimonial-card-6" className={`p-6 rounded-2xl border transition-all hover:translate-y-[-4px] hover:shadow-md relative duration-300 flex flex-col justify-between ${
                  isDarkMode ? "bg-slate-950/40 border-slate-805" : "bg-white border-slate-200"
                }`}>
                  <div>
                    <div className="flex items-center gap-3.5 mb-4 select-none">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&h=120&q=80" 
                        alt="Natalie Brooks" 
                        className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/10 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="block text-xs font-extrabold text-slate-800 dark:text-slate-200">Natalie Brooks</span>
                          <span className="text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-1 py-0.5 rounded font-mono uppercase tracking-wider">Power User</span>
                        </div>
                        <span className="block text-[9px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono">Freelance Conversion Copywriter</span>
                      </div>
                    </div>
                    <div className="flex gap-0.5 text-amber-500 text-xs mb-3">★ ★ ★ ★ ★</div>
                    <p className={`text-xs leading-relaxed font-normal italic ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      "Clients hire me to deliver results, not generic generic AI fluff. Receipts keeps me honest and highly focused, generating strong structures centered around real verified accomplishments. It saves me at least 10 working hours every single week."
                    </p>
                  </div>
                  <div className="border-t pt-3 mt-4 flex items-center justify-between text-[9px] font-mono text-slate-400">
                    <span>Target: Client Deliverables</span>
                    <span className="text-emerald-500 font-bold">Passed Verification</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "faq" && (
              <motion.div
                id="panel-faq-block"
                key="faq"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="max-w-4xl mx-auto flex flex-col gap-3.5"
              >
                {faqData.map((item, index) => {
                  const isOpen = activeFaq === index;
                  return (
                    <div
                      id={`faq-item-container-${index}`}
                      key={`faq-${index}`}
                      className={`rounded-2xl border transition-all overflow-hidden ${
                        isDarkMode 
                          ? isOpen ? "bg-slate-950 border-indigo-500/40" : "bg-slate-950/40 border-slate-805 hover:border-slate-700" 
                          : isOpen ? "bg-white border-indigo-500/40 shadow-xs" : "bg-white border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      <button
                        id={`faq-trigger-${index}`}
                        type="button"
                        onClick={() => setActiveFaq(isOpen ? null : index)}
                        className="w-full text-left p-4.5 flex items-center justify-between font-extrabold text-xs tracking-tight text-slate-800 dark:text-slate-203 cursor-pointer select-none"
                      >
                        <span>{item.q}</span>
                        <ChevronDown className={`w-4 h-4 text-indigo-500 transition-all duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="p-4.5 pt-0 border-t border-slate-100 dark:border-slate-850/50 text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-normal">
                              {item.a}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Double Call-to-Action Footer Section */}
      <section id="landing-footer-cta" className={`border-t py-16 px-6 text-center relative overflow-hidden ${
        isDarkMode ? "bg-slate-950/20 border-slate-850" : "bg-slate-100/30 border-slate-200"
      }`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">
            Activate Your SaaS Headline Copy Engine Right Now
          </h2>
          
          <p className="text-xs text-slate-500 max-w-lg mx-auto mb-8 leading-relaxed font-normal">
            No long commitment cycles or custom hosting configurations. Verify your identity credentials online, leverage your 1x free usage credit, and structure beautiful marketing results safely.
          </p>

          <div id="footer-actions-wrap" className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            {/* Action 1: Sign up */}
            <button
              id="footer-primary-cta"
              type="button"
              onClick={() => onNavigateToAuth(true, "Calibrating Free Trial Portal", "Accelerating secure endpoint connections for your custom output run...")}
              className="w-full py-4.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md cursor-pointer hover:scale-[1.015]"
            >
              🚀 Create Account & Claim Trial
            </button>

            {/* Action 2: Sign in */}
            <button
              id="footer-secondary-cta"
              type="button"
              onClick={() => onNavigateToAuth(false, "Restoring Creator Workspace", "Handshaking credentials to restore past campaigns...")}
              className={`w-full py-4.5 rounded-xl border text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer hover:scale-[1.015] ${
                isDarkMode 
                  ? "bg-slate-800 border-slate-705 hover:bg-slate-700 text-slate-205" 
                  : "bg-white border-slate-300 hover:bg-slate-100 text-slate-705"
              }`}
            >
              🔑 Sign in to Account
            </button>
          </div>

          <p className="text-[10px] text-slate-400 mt-6 select-none font-mono tracking-wide">
            PRO ACCESS LIFETIME RESTORE SCHEMAS WITH COMPLIANT LICENSE CODE SYNC
          </p>
        </div>
      </section>

      {/* Interactive Login/Signup Popup Modal to Reveal Results */}
      <AnimatePresence>
        {isAuthPopupOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 relative"
            >
              <button
                type="button"
                onClick={() => setIsAuthPopupOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900 flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400 shadow-sm">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                
                <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-slate-100">
                  Unlock Copywriting Engine Insights
                </h3>
                
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  You have experienced the live copy transformation engine hook! To unlock custom passport outputs, persistent draft histories, and create complete copywriting assets tailored with <strong>PAS & BAB formulas</strong>, enroll in our free trial or sign in now.
                </p>
                
                <div className="space-y-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAuthPopupOpen(false);
                      onNavigateToAuth(
                        true, 
                        "Unlocking Account", 
                        "Configuring free trial credentials..."
                      );
                    }}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md cursor-pointer hover:scale-[1.01]"
                  >
                    🚀 Claim Free Trial (1x Run Included)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAuthPopupOpen(false);
                      onNavigateToAuth(
                        false, 
                        "Restoring Campaign Handshake", 
                        "Decrypting session keys to reconnect previously generated copywriting assets..."
                      );
                    }}
                    className={`w-full py-3 rounded-xl border text-xs font-extrabold uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.01] ${
                      isDarkMode 
                        ? "bg-slate-800 border-slate-705 hover:bg-slate-700 text-slate-205" 
                        : "bg-white border-slate-300 hover:bg-slate-100 text-slate-705"
                    }`}
                  >
                    🔑 Sign In with Credentials
                  </button>
                </div>
                
                <p className="text-[9px] text-slate-400/80 dark:text-slate-505 mt-4 select-none font-mono">
                  ONE-CLICK LIFETIME ACTIVATION VIA GUMROAD RULE CHECK
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden p-6 relative text-slate-100"
            >
              <button
                type="button"
                onClick={() => setIsAboutModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-4 text-left">
                <div className="w-10 h-10 rounded-2xl bg-indigo-950/50 border border-indigo-900/50 flex items-center justify-center text-indigo-450 shadow-sm">
                  <Info className="w-5 h-5" />
                </div>
                
                <h3 className="text-xl font-black tracking-tight">
                  About Receipts AI
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  Receipts AI is an ultra-focused copywriting engine designed to eliminate the fluffy, hype-driven jargon from marketing copy. We believe that true conversion comes from <strong>verifiable metrics</strong> and real client transformations.
                </p>

                <div className="border border-slate-800 bg-slate-950/50 rounded-xl p-4 text-xs space-y-3">
                  <div className="flex items-start gap-2.5">
                    <span className="text-sm">🎯</span>
                    <div>
                      <h4 className="font-bold text-slate-205">Fact-Based Over Lazy Hype</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">We feed metric-driven social proof directly to advanced models to extract proof-based copywriting assets instantly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-sm">⚡</span>
                    <div>
                      <h4 className="font-bold text-slate-205">The Triple-Pillar Output</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Generate perfectly aligned X Threads, cold DMs, landing summaries, and strategic client testimonial cards on the fly.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <span className="text-sm">💡</span>
                    <div>
                      <h4 className="font-bold text-slate-205">Account Setup</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">Empower creators to lock in high-impact headlines constructed completely on historically verified results.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAboutModalOpen(false)}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Got It
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Contact Us Modal */}
      <AnimatePresence>
        {isContactModalOpen && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full shadow-2xl overflow-hidden p-6 relative text-slate-100"
            >
              <button
                type="button"
                onClick={() => setIsContactModalOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-all cursor-pointer"
                aria-label="Close form"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-left">
                <div className="w-10 h-10 rounded-2xl bg-indigo-950/50 border border-indigo-900/50 flex items-center justify-center mb-4 text-indigo-400 shadow-sm">
                  <Mail className="w-5 h-5" />
                </div>
                
                <h3 className="text-xl font-black tracking-tight text-white">
                  Send a Secure Message
                </h3>
                
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Have a question, feedback, or need help? Send us a direct secure message and we will respond back within 24-48 hours.
                </p>

                {contactSuccessMessage ? (
                  <div className="bg-emerald-950/30 border border-emerald-800/60 rounded-xl p-4.5 mt-4 text-emerald-400 text-xs">
                    <p className="font-bold flex items-center gap-1.5 mb-1 text-emerald-300">
                      ✨ Message Dispatched!
                    </p>
                    <p className="text-[11px] leading-relaxed opacity-90">{contactSuccessMessage}</p>
                    <button
                      type="button"
                      onClick={() => {
                        setContactSuccessMessage("");
                        setIsContactModalOpen(false);
                      }}
                      className="mt-3.5 w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-extrabold uppercase tracking-widest rounded-lg transition-all cursor-pointer"
                    >
                      Close Window
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4 mt-5">
                    {contactError && (
                      <div className="p-3 bg-red-950/25 border border-red-900/50 text-red-400 rounded-lg text-xs font-semibold">
                        ⚠️ {contactError}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block font-mono">
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="e.g. Creator John"
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-colors font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block font-mono">
                        Your Return Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        placeholder="john@yourdomain.com"
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-colors font-medium"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="contact-message" className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block font-mono">
                        Your Message / Feedback
                      </label>
                      <textarea
                        id="contact-message"
                        required
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Write your suggestions or questions here..."
                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 focus:outline-hidden focus:border-indigo-500 transition-colors font-medium resize-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsContactModalOpen(false)}
                        className="px-4 py-2.5 border border-slate-800 bg-slate-950/50 hover:bg-slate-800 text-slate-400 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmittingContact}
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center min-w-[120px]"
                      >
                        {isSubmittingContact ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer Meta Credits */}
      <footer id="landing-fineprint" className={`px-6 py-10 border-t text-center text-[10px] text-slate-450 dark:text-slate-500 font-mono flex flex-col items-center gap-6 ${
        isDarkMode ? "border-slate-850" : "border-slate-250"
      }`}>
        <div id="footer-links-row" className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-extrabold uppercase tracking-wider select-none">
          <button 
            type="button" 
            onClick={handleOpenAbout}
            className="hover:text-indigo-400 transition-colors cursor-pointer"
          >
            ℹ️ About Receipts
          </button>
          
          <button 
            type="button" 
            onClick={() => {
              setContactSuccessMessage("");
              setContactError("");
              setIsContactModalOpen(true);
            }}
            className="hover:text-indigo-400 transition-colors cursor-pointer"
          >
            ✉️ Contact Us
          </button>
          
          <a
            href="https://x.com/promptpanda23?s=21" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <Twitter className="w-3.5 h-3.5 text-sky-450" /> Connect on X
          </a>

          <a
            href="https://www.linkedin.com/in/jagriti-thakur/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5 text-indigo-500" /> Connect on LinkedIn
          </a>
        </div>

        <div className="space-y-1">
          <p>© 2026 Receipts-Copywriter Systems Inc. All human-centric rights reserved.</p>
          <p className="opacity-70">
            Powered by Gemini Model Real-Time Intelligence & Dual Handshake MFA Validation.
          </p>
        </div>
      </footer>
    </div>
  );
}
