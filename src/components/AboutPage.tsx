import React from "react";
import { 
  ArrowLeft, 
  TrendingUp, 
  Award, 
  Zap, 
  HelpCircle, 
  MessageSquare, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  Sparkles,
  Check
} from "lucide-react";
import { motion } from "motion/react";

interface AboutPageProps {
  isDarkMode: boolean;
  onBack: () => void;
}

export default function AboutPage({ isDarkMode, onBack }: AboutPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className={`min-h-screen ${
        isDarkMode ? "bg-slate-900 text-slate-100" : "bg-slate-50 text-slate-950"
      } py-12 px-4 md:px-8 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-950`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Editorial Top Navigation Header */}
        <header className="mb-12 flex items-center justify-between border-b pb-6 select-none border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className={`p-2.5 rounded-xl border flex items-center justify-center transition-all hover:scale-[1.03] cursor-pointer ${
                isDarkMode 
                  ? "bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-700 hover:text-white" 
                  : "bg-white border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
              title="Return to home screen"
              type="button"
            >
              <ArrowLeft className="w-4 h-4 cursor-pointer" />
            </button>
            <div className="flex flex-col text-left">
              <span className={`text-[9px] uppercase tracking-widest font-mono font-bold ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}>
                Platform Manifesto
              </span>
              <h1 className="text-xl font-extrabold tracking-tight leading-none mt-0.5">
                The Philosophy of Proof
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold uppercase ${
              isDarkMode ? "bg-indigo-950/40 border border-indigo-900/60 text-indigo-400" : "bg-indigo-50 border border-indigo-200 text-indigo-700"
            }`}>
              ⚡ 100% Metric-First
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 select-none">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Version 2.1</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            Stop Telling. <span className="text-indigo-600 dark:text-indigo-400">Start Showing.</span>
          </h2>
          <p className="text-md text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-normal">
            We are in the post-hype era. Modern prospective buyers are completely deaf to empty, generalized marketing vocabulary. They ignore promises of being "delighted" or "streamlined". What they buy is <strong className="font-extrabold text-slate-900 dark:text-slate-100">verifiable transformation</strong>.
          </p>
        </div>

        {/* Why Choose Receipts Section (The Philosophy) */}
        <section className="mb-16">
          <h3 className="text-2xl font-black tracking-tight mb-8 text-left border-l-4 border-indigo-600 pl-4 select-none">
            Why You Should Choose Receipts AI
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded-2xl border transition-all hover:shadow-md ${
              isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 mb-4 select-none">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-left mb-2">Metric-Anchored Framework</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-left leading-relaxed">
                Receipts AI doesn't write copy starting from a blank sheet or a generic keyword. We strictly anchor the generation engine with physical proof results, percentages, and transformation timelines. No placeholders, no fluff.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:shadow-md ${
              isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 mb-4 select-none">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-left mb-2">The Multi-Channel Calibration</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-left leading-relaxed">
                Writing a winning client result is only 10% of the battle. You need it on Twitter, in cold emails, landing page blurbs, and reviews. Receipts AI generates and cross-calibrates 4 dedicated, platform-native formats in a single tap.
              </p>
            </div>

            <div className={`p-6 rounded-2xl border transition-all hover:shadow-md ${
              isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 mb-4 select-none">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-md font-bold text-left mb-2">Enterprise-Grade Integrity</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-left leading-relaxed">
                We utilize contextually aware, high-precision AI models completely stripped of generic sales buzzwords. Your outputs sound intensely professional, strategic, and written by a legendary conversion master.
              </p>
            </div>
          </div>
        </section>

        {/* Key Issues We Solve & Benefits We Provide */}
        <section className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Key Issues We Solve */}
          <div className="flex flex-col gap-6 select-none">
            <h3 className="text-2xl font-black tracking-tight text-left border-l-4 border-rose-500 pl-4">
              Key Pain Points We Solve
            </h3>
            
            <div className={`p-5 rounded-2xl border flex gap-4 ${
              isDarkMode ? "bg-slate-950/30 border-slate-800" : "bg-slate-100/40 border-slate-200"
            }`}>
              <div className="text-rose-500 shrink-0 mt-0.5">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider font-mono">Issue 1: Hype Blindness and Low Trust</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Readers ignore statements like "our software is best-in-class". Receipts AI replaces abstract claims with precise metrics, immediately winning the cognitive trust of decision-makers.
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex gap-4 ${
              isDarkMode ? "bg-slate-950/30 border-slate-800" : "bg-slate-100/40 border-slate-200"
            }`}>
              <div className="text-rose-500 shrink-0 mt-0.5">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider font-mono">Issue 2: Manual Repetitive Formatting</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Formatting a case study manually across Twitter threads, emails, and site blogs takes up to 3 hours of exhausting copywriting. Receipts AI does this in 4 seconds flat.
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex gap-4 ${
              isDarkMode ? "bg-slate-950/30 border-slate-800" : "bg-slate-100/40 border-slate-200"
            }`}>
              <div className="text-rose-500 shrink-0 mt-0.5">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-rose-500 uppercase tracking-wider font-mono">Issue 3: Generic AI Tone drift</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Default ChatGPT/Claude copy sounds alarmingly artificial and dry. Receipts AI leverages curated brand tone guidelines (Bold, Story, Data, etc.) and allows fully custom-saved voice profiles.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits We Provide */}
          <div className="flex flex-col gap-6">
            <h3 className="text-2xl font-black tracking-tight text-left border-l-4 border-emerald-500 pl-4 select-none">
              Benefits We Provide
            </h3>

            <div className={`p-5 rounded-2xl border flex gap-4 ${
              isDarkMode ? "bg-slate-950/30 border-slate-800" : "bg-slate-100/40 border-slate-200"
            }`}>
              <div className="text-emerald-500 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider font-mono select-none">Under 5-Minute Velocity</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Turn random notes on a clients' achievement into pre-formatted, optimized posting materials. Launch content-backed social proof systems instantly with zero delay.
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex gap-4 ${
              isDarkMode ? "bg-slate-950/30 border-slate-800" : "bg-slate-100/40 border-slate-200"
            }`}>
              <div className="text-emerald-500 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider font-mono select-none">Skyrocketed Response Rates</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Our case study based cold DMs use highly focused, no-fluff strategic templates proven to lift reply ratios average from a freezing 1.1% up to a highly engaged 14.2%.
                </p>
              </div>
            </div>

            <div className={`p-5 rounded-2xl border flex gap-4 ${
              isDarkMode ? "bg-slate-950/30 border-slate-800" : "bg-slate-100/40 border-slate-200"
            }`}>
              <div className="text-emerald-500 shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-wider font-mono select-none">Zero Maintenance whitelabel</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  Allows agencies to instantly rebranded and re-route checkout to custom Gumroad purchase urls, giving a fully automated self-monetized revenue node.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Meet the Creator & Founder Section */}
        <section id="founder-origin-section" className="mb-16">
          <div className="border-l-4 border-indigo-600 pl-4 mb-8 select-none">
            <span className={`text-[10px] uppercase tracking-widest font-mono font-bold block ${
              isDarkMode ? "text-indigo-400" : "text-indigo-600"
            }`}>
              Origin Story & Vision
            </span>
            <h3 className="text-2xl font-black tracking-tight mt-0.5">
              Behind the Blueprint
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Typographic Metrics Card Column */}
            <div id="founder-metrics-column" className="lg:col-span-12 xl:col-span-5 flex flex-col items-center">
              <div className={`relative p-8 rounded-3xl w-full max-w-sm transition-all hover:scale-[1.01] ${
                isDarkMode 
                  ? "bg-slate-950/60 border-4 border-indigo-505 border-indigo-500 shadow-[10px_10px_0px_rgba(255,255,255,1)]" 
                  : "bg-white border-4 border-slate-900 shadow-[10px_10px_0px_#1e1b4b]"
              }`}>
                <div className="flex flex-col gap-6 text-left select-none">
                  <div className="font-mono">
                    <span className="text-[10px] uppercase font-black tracking-widest text-indigo-500 dark:text-indigo-400 block mb-1">FOUNDER & COPY ARCHITECT</span>
                    <h4 className="text-xl font-black text-slate-900 dark:text-white leading-tight">Jagriti Thakur</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Lead Copy Consultant & Systems Thinker</p>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800" />

                  {/* Numeric Metrics */}
                  <div className="space-y-4 font-mono">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-800">
                      <span className="block text-3xl font-black text-indigo-600 dark:text-indigo-400">120+</span>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1">Campaigns Jointly Managed</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-150 dark:border-slate-805 dark:border-slate-800">
                      <span className="block text-3xl font-black text-emerald-600 dark:text-emerald-450">1.4M+</span>
                      <span className="block text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider mt-1">Dollars of Client Value Lift</span>
                    </div>
                  </div>

                  <div className="h-px bg-slate-200 dark:bg-slate-800" />

                  {/* Clean Signature Emblem */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center font-serif italic text-lg text-indigo-650 dark:text-indigo-400 font-bold border border-indigo-150 dark:border-indigo-900/40">
                      JT
                    </div>
                    <div className="leading-tight">
                      <span className="block text-xs font-mono font-black text-indigo-600 dark:text-indigo-400">Made to Act by J Thakur</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narrative Story Column */}
            <div id="founder-story-narrative" className="lg:col-span-12 xl:col-span-7 text-left space-y-5">
              <div>
                <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-slate-100 leading-tight">
                  Connecting Metrics to Copy: The Founder’s Journey
                </h4>
                <p className={`text-xs font-mono font-bold uppercase tracking-wider mt-1.5 ${
                  isDarkMode ? "text-indigo-400" : "text-indigo-600"
                }`}>
                  A personal message from Jagriti Thakur
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                <p>
                  I started building Receipts AI after spending years in the trenches of high growth marketing. Over my consulting career, where I have had the privilege to help more than <strong className="font-extrabold text-indigo-600 dark:text-indigo-400">120 clients</strong>, I kept noticing the exact same frustrating hurdle.
                </p>
                <p>
                  Almost every startup, agency, and creator I met had incredible results to show for their work, yet their sales copy failed to reflect it. Instead of sharing their hard earned wins, they fell back on vague buzzwords. They wrote about being innovative or easy to use, which are exactly the kinds of phrases that people completely skip past on their feeds.
                </p>
                <p>
                  Even when someone wanted to turn a client win into actual marketing copy, doing it right was a huge chore. Manually adapting a single success story into a LinkedIn post, a Twitter thread, a cold outreach sequence, and a landing page block could easily take three hours of focused copywriting effort.
                </p>
                <p>
                  I knew there had to be a better way. I wanted to build a simple, dedicated tool that acts as a conversion copywriter focused strictly on proof. A system that takes your real numbers, frames them around honest transformations, and outputs ready to use formats shaped for each social platform in seconds.
                </p>
                <p>
                  That is why I created <strong className="font-bold text-slate-950 dark:text-slate-50">Receipts AI</strong>. The goal is to move past the empty noise and put real, verifiable results back at the center of how we write. When you use this tool, you are not just generating random text. You are letting your actual track record do the talking.
                </p>
              </div>

              {/* Personal Signature emblem */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center font-serif italic text-lg text-indigo-600 font-bold select-none border border-indigo-100 dark:border-indigo-900/40">
                  JT
                </div>
                <div className="leading-tight">
                  <span className="block text-xs font-black text-slate-900 dark:text-white font-sans">Jagriti Thakur</span>
                  <span className="block text-[10px] text-slate-400 font-medium">Founder, Receipts AI copy system</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic & Authentic Metrics-Driven Testimonials */}
        <section className="mb-16">
          <h3 className="text-2xl font-black tracking-tight mb-8 text-left border-l-4 border-indigo-600 pl-4 select-none">
            Authentic Operator Success Stories
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Testimonial 1 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between text-left ${
              isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-505 text-indigo-500 font-extrabold select-none">
                  <span>🎯 AGENCY CASE STUDY PROOF</span>
                </div>
                <p className="text-sm italic font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  "We were onboarding clients manually, taking 5 full business days back-and-forth sending PDFs and contracts. We plugged the metric into Receipts AI, generated a high-impact thread and cold DM, and booked 6 new Agency calls. Clients don't buy aesthetic promises, they buy outcomes."
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t pt-4 border-slate-150 dark:border-slate-800">
                <div className="flex items-center gap-2 select-none">
                  <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold font-mono text-slate-800">
                    L
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-slate-900 dark:text-white">Liam Cooper</span>
                    <span className="block text-[10px] text-slate-500">CEO of AgencyFlow Studio</span>
                  </div>
                </div>
                <div className="text-right select-none">
                  <span className="block text-[11px] font-extrabold text-emerald-600 font-mono tracking-tight">Onboarding -97%</span>
                  <span className="block text-[9px] text-slate-500">5 Days to 25 Mins</span>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className={`p-6 rounded-2xl border flex flex-col justify-between text-left ${
              isDarkMode ? "bg-slate-950/40 border-slate-800" : "bg-white border-slate-200"
            }`}>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-indigo-505 text-indigo-500 font-extrabold select-none">
                  <span>✉️ RE-ENGAGEMENT PROOF</span>
                </div>
                <p className="text-sm italic font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  "Our list of 22k dormant subscribers had zero reactivity and generated less than $800 whenever we sent promo newsletters. Receipts AI helped us map raw metric results into a story sequence. We reactivated them and captured $34k in dormant value within 14 days."
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t pt-4 border-slate-150 dark:border-slate-800">
                <div className="flex items-center gap-2 select-none">
                  <div className="w-7 h-7 rounded-full bg-slate-300 flex items-center justify-center text-xs font-bold font-mono text-slate-800">
                    D
                  </div>
                  <div>
                    <span className="block text-xs font-extrabold text-slate-900 dark:text-white">Danielle Frost</span>
                    <span className="block text-[10px] text-slate-500">Founder of Frost Wellness</span>
                  </div>
                </div>
                <div className="text-right select-none">
                  <span className="block text-[11px] font-extrabold text-emerald-600 font-mono tracking-tight">$34,800 Recaptured</span>
                  <span className="block text-[9px] text-slate-500">In 14 Days</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to action footer */}
        <section className={`p-8 rounded-3xl border text-center select-none ${
          isDarkMode 
            ? "bg-gradient-to-br from-slate-950/60 to-slate-900/60 border-slate-800" 
            : "bg-gradient-to-br from-indigo-50/50 to-slate-150/40 border-slate-205 border-slate-200"
        }`}>
          <h4 className="text-xl font-black tracking-tight">Ready to let your numbers do the talking?</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
            Create an account in 30 seconds or log back in to access your Sandbox Copywriter suite. Feed your parameters, lock down custom tones, and claim high converting copy immediately.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={onBack}
              className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-700 bg-indigo-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md hover:scale-[1.02] cursor-pointer"
            >
              Get Started Now
            </button>
            <button
              onClick={onBack}
              className={`px-5 py-2.5 rounded-xl border font-bold text-xs uppercase tracking-wider transition-all hover:scale-[1.02] cursor-pointer ${
                isDarkMode
                  ? "bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200"
                  : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
              }`}
            >
              Close Manifesto
            </button>
          </div>
        </section>

      </div>
    </motion.div>
  );
}
