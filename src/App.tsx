import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  Copy, 
  Download, 
  Trash2, 
  Plus, 
  Twitter, 
  MessageSquare, 
  Layers, 
  Quote, 
  Edit3, 
  X,
  FileText,
  AlertCircle,
  TrendingUp,
  Award,
  BookOpen,
  RefreshCw,
  ArrowRight,
  Lock,
  Mail,
  Settings,
  ExternalLink,
  User,
  LogOut,
  Clock,
  ShieldCheck,
  Linkedin,
  Star,
  Share2,
  FileSpreadsheet
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import UserProfileModal from "./components/UserProfileModal";
import AuthScreen from "./components/AuthScreen";
import LandingPage from "./components/LandingPage";
import NetworkAndPageLoader from "./components/NetworkAndPageLoader";
import AboutPage from "./components/AboutPage";
import VaultAndAnalyticsBoard from "./components/VaultAndAnalyticsBoard";
import html2canvas from "html2canvas";

// Types
interface CustomTone {
  id: string;
  name: string;
  keywords: string;
  isCustom: boolean;
}

interface GeneratedAssets {
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
}

// Pre-defined system tones
const SYSTEM_TONES: CustomTone[] = [
  { id: "bold", name: "Bold", keywords: "Punchy, aggressive, highly authoritative, active verbs, directly challenges conventional wisdom, high urgency.", isCustom: false },
  { id: "story", name: "Story-driven", keywords: "Weaves a vivid emotional narrative, paints a dark starting obstacle, details the step-by-step breakthrough, builds suspense.", isCustom: false },
  { id: "data", name: "Data-first", keywords: "Ultra-precise, prioritize strict conversions and percentage rates, highlights explicit timeframes, uses analytical phrasing, highly objective.", isCustom: false },
  { id: "conversational", name: "Conversational", keywords: "Warm, witty, highly friendly, uses casual phrasing (like writing to a close developer friend), transparent, self-deprecating.", isCustom: false },
  { id: "professional", name: "Professional", keywords: "Polished and highly credible enterprise-ready voice, structured syntax, authoritative jargon suitable for high-net-worth clients.", isCustom: false }
];

// Example library of client wins
interface ExampleScenario {
  id: string;
  title: string;
  industry: string;
  creatorName: string;
  clientType: string;
  service: string;
  problem: string;
  solution: string;
  result: string;
  timeframe: string;
}

const EXAMPLE_SCENARIOS: ExampleScenario[] = [
  {
    id: "cold-outreach",
    title: "⚡ Cold Email: 1% to 14.2% Reply Rate",
    industry: "B2B SaaS Growth",
    creatorName: "Arjun Shah",
    clientType: "AI SaaS Founder",
    service: "Triple-pass Cold Email outreach implementation & copy strategy",
    problem: "Outreach founder was spending 3+ hours daily manually looking up dead leads. General template emails resulted in a freezing 1% reply rate and severe outbound channel burnout.",
    solution: "Analyzed audience intent loops, segmented ideal decision-makers using data triggers, and implemented a personalized triple-pass sequence focused strictly on addressing immediate bottlenecks.",
    result: "System response rate skyrocketed from 1% to 14.2% within 7 days, booking 9 validated demo calls in week one and securing $7,800 in high-margin contracts.",
    timeframe: "7 Days"
  },
  {
    id: "notion-systems",
    title: "🧠 Notion OS: Onboarding 5 Days to 25 Min",
    industry: "Creative Agencies",
    creatorName: "Liam Cooper",
    clientType: "Digital Creative Agency",
    service: "Notion Systems Workspace Implementation & Automated Client Portal Hub",
    problem: "Fragmented client onboarding stretching over 5 frustrating days with mismatched emails, scattered PDF checklists, and lost client assets leading to critical delay on first project sprint.",
    solution: "Engineered a centralized, self-serve client Portal on Notion integrated with automatic milestone checklists, secure file drop boxes, and transparent daily development trackers.",
    result: "Slashed client onboarding overhead from 5 days to 25 minutes. Decreased onboarding coordination emails by 65% and improved first-milestone prompt sign-off rating to 96%.",
    timeframe: "3 Weeks"
  },
  {
    id: "cro-landing",
    title: "🛒 D2C CRO: Surged Conversion Rates by 180%",
    industry: "E-commerce & Retail",
    creatorName: "Sophia Vance",
    clientType: "D2C Footwear Boutique",
    service: "Mobile Conversion Rate Optimization & Visual Page Redesign",
    problem: "Strong ad clicks but a crushing 82% mobile cart abandonment rate. Product descriptions were massive unreadable text walls and lacked trust indicators at high-friction purchase fields.",
    solution: "Reformatted layouts into a mobile-first swipeable benefit stack, added inline proof tags, shortened form checkouts, and integrated a 3-second rapid guest checkout pathway.",
    result: "Vastly reduced checkout abandonment from 82% to 49%. Total store mobile conversion rates surged by 180%, capturing an immediate $14,500 in automated product revenue.",
    timeframe: "14 Days"
  },
  {
    id: "corporate-storytelling",
    title: "💼 High-Authority executive branding: 18 leads",
    industry: "Enterprise AI Consulting",
    creatorName: "Elena Rossi",
    clientType: "Executive Enterprise Consultant",
    service: "High-Authority Corporate Storytelling advisory system",
    problem: "Zero organic inbound consulting flow. Sits on 15+ years of complex corporate turnaround strategy, but their LinkedIn presence sounded like a dry resume sheet, getting zero attention.",
    solution: "Curated a story-driven daily content pipeline translating legacy multi-million dollar corporate turnarounds into bite-sized, incredibly tactical playbooks.",
    result: "Gained 3,200 active enterprise followers, generated 18 high-intent executive discovery leads, and successfully closed two $15,000 elite retainer advisory opportunities.",
    timeframe: "30 Days"
  },
  {
    id: "platform-postgres",
    title: "🚀 DB Tuner: Lag 4.6s to 120ms (97% speedup)",
    industry: "EdTech Infrastructure",
    creatorName: "Chloe Tan",
    clientType: "EdTech Platform CTO",
    service: "PostgreSQL Database Sharding & Caching Optimization",
    problem: "High-latency page crashes during critical student rush hours (8 AM - 10 AM). Server latency averaged a slow 4.6 seconds, triggering 35% student bounce rates on interactive courses.",
    solution: "Implemented efficient table re-indexing structures, set up a micro-second Redis caching tier for high-volume endpoints, and refactored heavy SQL write queries.",
    result: "Average API system latency dropped from 4.6s to a lightning-fast 120ms. Completely neutralized peak school crash events and maintained a peak uptime rate of 99.98%.",
    timeframe: "48 Hours"
  },
  {
    id: "seo-cluster",
    title: "🔍 SEO Revamp: 8K to 125K Monthly Clicks",
    industry: "SaaS & Organic SEO",
    creatorName: "Clara Oswald",
    clientType: "B2B DevTools Startup",
    service: "Topic Clustering & Internal Link Architecture Redesign",
    problem: "Blog was producing low-quality high-volume articles receiving zero traffic. Search rankings stalled on Google's page 3 behind massive corporate competitors with raw authority.",
    solution: "Consolidated 80 disconnected articles into 4 high-authority semantic content clusters, rewrote thin posts into comprehensive technical guides, and automated high-context internal linking.",
    result: "Monthly organic clicks surged from 8,000 to over 125,000 within 90 days. Captured primary rank spots for 45 high-intent developer keywords, driving 450+ automated lead sign-ups.",
    timeframe: "90 Days"
  },
  {
    id: "paid-ads-sandbox",
    title: "📣 Meta Ads: 1.4x to 4.8x ROAS Scale-up",
    industry: "D2C Paid Traffic",
    creatorName: "Marcus Sterling",
    clientType: "Activewear Apparel Brand",
    service: "Paid Ads Creative Sandbox Framework & Direct-Response Testing",
    problem: "Daily ad spend of $2,000 was bleeding cash at a scraping 1.4x ROAS. Ad copy sounded overly polished/corporate, and ad creatives suffered quick exhaustion within 3 days of launch.",
    solution: "Launched a sandbox framework to rapid-test organic UGC hooks, structured a direct-reponse copy matrix addressing key micro-objections, and routed winning creatives to scaled budget sets.",
    result: "ROAS stabilized from a freezing 1.4x to a robust 4.8x average over 30 days. Scaled daily spend to $5,500 with zero decay, netting an extra $162,000 in monthly profits.",
    timeframe: "30 Days"
  },
  {
    id: "email-copywriting",
    title: "✉️ Email List: Recaptured $34K Dormant Sales",
    industry: "Subscription Wellness",
    creatorName: "Danielle Frost",
    clientType: "Subscription Tea & Wellness",
    service: "Daily Storytelling Email Sequences & Reactivation Strategy",
    problem: "Dormant list of 22,000 subscribers sitting silent for 6 months with high unsubscribe rates. Standard corporate promotions generated under $800 whenever sporadically broadcasted.",
    solution: "Drafted a 5-part micro-story reactivation campaign, segmented lists into active and sleepy buyers, and introduced a raw daily text email sequence building conversational hype.",
    result: "Uncovered $34,800 in recaptured sales in two weeks. Email open rates jumped from 11% to a highly engaging 38.5% with less than 0.2% spam complaints.",
    timeframe: "14 Days"
  }
];

const CURATED_XP_QUOTES = [
  "Thread hook metrics earn 3.8× higher click-through on X. Save nothing for the end.",
  "X algorithms prioritize direct links less of late. Write native high-value text to build elite organic authority.",
  "The highest conversion wins are written in high contrast: define a painful problem first, then make your metrics shine.",
  "Social proof is the greatest ROI action. A single detailed customer screenshot yields more authority than 50 self-praising threads.",
  "Cold DMs must feel human, not templated. A personalized question beats a 300-word corporate summary.",
  "When detailing results, exact percentages like 14.2% sound significantly more real and trustworthy than rounded 15% claims.",
  "Pin your top-performing client win thread to your profile. New prospective clients always click the pinned item.",
  "The best testimonials detail the internal emotional transformation as much as the external financial performance."
];

const CONVERSION_FACTS = [
  {
    fact: "Adding a single high-quality testimonial on landing pages has been shown to increase total conversions by up to 34%.",
    metric: "+34% Conversions",
    source: "Copywriting Index"
  },
  {
    fact: "Case studies formatted in direct customer story narrative increase average session engagement time by up to 40%.",
    metric: "+40% Read Engagement",
    source: "Content Science Studies"
  },
  {
    fact: "Headline optimization focusing on precise numerical metrics ('from 8K to 125K') boosts organic search click-through ratings by 65%.",
    metric: "+65% Click Performance",
    source: "SEO Topic Cluster Data"
  },
  {
    fact: "𝕏 threads offering a clean, modular 'before & after' progression score as much as 2.3x more bookmarks and bookmarks-to-views.",
    metric: "2.3x Metric Growth",
    source: "Creator Sandbox Analytics"
  },
  {
    fact: "Using active direct-response verbs ('Recapture', 'Unlock', 'Automate') instead of passive verbs in call-to-actions boosts signup rates by 18%.",
    metric: "+18% CTR Uplift",
    source: "Conversion Benchmarks"
  },
  {
    fact: "Short personalized direct messages (DMs) that stay under 120 words see a 22% higher response rate than generic summaries.",
    metric: "+22% Human Response",
    source: "Conversational Outreach"
  },
  {
    fact: "Detailed client testimonials describing internal emotional transformations convert up to 1.5x better than general dry performance reports.",
    metric: "1.5x Trust Factor",
    source: "Social Direct Response"
  },
  {
    fact: "Using a dedicated, custom-calibrated AI tone matching your industry keywords produces 3.2x more context-dense, high-value assets.",
    metric: "3.2x Content Density",
    source: "AI Copy Efficiency Trials"
  }
];

// Extract the raw product permalink/slug from standard or custom Gumroad product URLs
const extractGumroadPermalink = (url: string): string => {
  try {
    const trimmed = url.trim();
    if (!trimmed) return "receipts-copywriter";
    
    // If it's already just a slug
    if (!trimmed.includes("/") && !trimmed.includes(".")) {
      return trimmed;
    }

    // Parse standard formats: https://gumroad.com/l/permalink or https://creator.gumroad.com/l/permalink 
    const match = trimmed.match(/\/l\/([^/?#\s]+)/i);
    if (match && match[1]) {
      return match[1];
    }
    
    // Fallback if URL is formatted differently
    const lastPart = trimmed.split("/").pop();
    if (lastPart) {
      return lastPart.split("?")[0].split("#")[0];
    }
    
    return "receipts-copywriter";
  } catch (e) {
    return "receipts-copywriter";
  }
};

export default function App() {
  // Dark mode & Profile modal states
  const [isDarkMode] = useState<boolean>(true);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem("receipts_current_user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return null;
  });

  const [showAuthMode, setShowAuthMode] = useState<"landing" | "login" | "signup">("landing");
  const [showAboutPage, setShowAboutPage] = useState<boolean>(false);

  // Sync dark class on mount and state changes - strictly dark mode only
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
    localStorage.setItem("receipts_dark_mode", "true");
  }, []);

  // Navigation & Steps state
  const [step, setStep] = useState<number>(1);
  const [tickerIndex, setTickerIndex] = useState<number>(0);
  const [factIndex, setFactIndex] = useState<number>(0);

  // Gumroad monetization tracking states
  const [generationCount, setGenerationCount] = useState<number>(() => {
    const val = localStorage.getItem("receipts_generation_count");
    return val ? parseInt(val, 10) : 0;
  });
  const [isPurchased, setIsPurchased] = useState<boolean>(() => {
    return localStorage.getItem("receipts_gumroad_verified") === "true";
  });
  const [licenseKey, setLicenseKey] = useState<string>(() => {
    return localStorage.getItem("receipts_license_key") || "";
  });
  const [gumroadProductUrl, setGumroadProductUrl] = useState<string>(() => {
    return localStorage.getItem("receipts_gumroad_product_url") || 
      ((import.meta as any).env?.VITE_GUMROAD_PRODUCT_URL as string) || 
      "https://gumroad.com/l/receipts-copywriter";
  });
  const [isPaywallOpen, setIsPaywallOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [paywallGuideTab, setPaywallGuideTab] = useState<"simulate" | "prodGuide">("simulate");
  const [hasClaimedReceipt, setHasClaimedReceipt] = useState<boolean>(() => {
    return localStorage.getItem("receipts_has_claimed_receipt") === "true" || localStorage.getItem("receipts_gumroad_verified") === "true";
  });
  const [isAutoVerifyEnabled, setIsAutoVerifyEnabled] = useState<boolean>(() => {
    return localStorage.getItem("receipts_auto_verify") === "true";
  });
  const [isPurchaseDetected, setIsPurchaseDetected] = useState<boolean>(false);
  const [isCheckingPurchase, setIsCheckingPurchase] = useState<boolean>(false);
  const [hasClickedClaimReceipts, setHasClickedClaimReceipts] = useState<boolean>(() => {
    return localStorage.getItem("receipts_clicked_claim") === "true";
  });
  
  // Page loading & network diagnostics
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isNetworkSlow, setIsNetworkSlow] = useState<boolean>(false);
  const [isOffline, setIsOffline] = useState<boolean>(() => typeof navigator !== 'undefined' ? !navigator.onLine : false);
  const [loaderTriggerKey, setLoaderTriggerKey] = useState<number>(0);
  const [loaderTitle, setLoaderTitle] = useState<string>("");
  const [loaderSubtitle, setLoaderSubtitle] = useState<string>("");
  
  // Verification loading states
  const [tempLicenseInput, setTempLicenseInput] = useState<string>("");
  const [tempProductUrlInput, setTempProductUrlInput] = useState<string>("");
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verifySuccessMsg, setVerifySuccessMsg] = useState<string>("");
  const [verifyErrorMsg, setVerifyErrorMsg] = useState<string>("");

  // Form inputs (restored from local storage for offline progress resilience)
  const [creatorName, setCreatorName] = useState<string>(() => {
    return localStorage.getItem("receipts_creator_name") || "";
  });
  const [clientType, setClientType] = useState<string>(() => {
    return localStorage.getItem("receipts_client_type") || "";
  });
  const [service, setService] = useState<string>(() => {
    return localStorage.getItem("receipts_service") || "";
  });
  const [industry, setIndustry] = useState<string>(() => {
    return localStorage.getItem("receipts_industry") || "";
  });
  
  const [problem, setProblem] = useState<string>(() => {
    return localStorage.getItem("receipts_problem") || "";
  });
  const [solution, setSolution] = useState<string>(() => {
    return localStorage.getItem("receipts_solution") || "";
  });
  
  const [result, setResult] = useState<string>(() => {
    return localStorage.getItem("receipts_result") || "";
  });
  const [timeframe, setTimeframe] = useState<string>(() => {
    return localStorage.getItem("receipts_timeframe") || "";
  });

  // Tone management
  const [customTones, setCustomTones] = useState<CustomTone[]>(() => {
    const saved = localStorage.getItem("receipts_custom_tones");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedToneId, setSelectedToneId] = useState<string>(() => {
    return localStorage.getItem("receipts_selected_tone_id") || "bold";
  });
  const [newToneName, setNewToneName] = useState<string>("");
  const [newToneKeywords, setNewToneKeywords] = useState<string>("");
  const [isAddingTone, setIsAddingTone] = useState<boolean>(false);

  const [workspaceTab, setWorkspaceTab] = useState<"builder" | "myAssets">("builder");
  const [assetLogs, setAssetLogs] = useState<any[]>(() => {
    const saved = localStorage.getItem("receipts_generation_logs");
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  });

  // Generation result states
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingText, setLoadingText] = useState<string>("Reading your case win...");
  const [generatedResults, setGeneratedResults] = useState<GeneratedAssets | null>(null);
  const [generationError, setGenerationError] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");

  // Copy Feedback state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Modal Editing & Preview State
  const [editingAssetKey, setEditingAssetKey] = useState<keyof GeneratedAssets | null>(null);
  const [tempEditedText, setTempEditedText] = useState<string>("");
  const [activeXTweetIndex, setActiveXTweetIndex] = useState<number>(0);
  const [activeTemplateTitle, setActiveTemplateTitle] = useState<string | null>(null);
  const [tempQuote, setTempQuote] = useState<string>("");
  const [tempInsight, setTempInsight] = useState<string>("");

  // States for interactive reviews and ratings adjustments
  const [tempReviewAuthorName, setTempReviewAuthorName] = useState<string>("");
  const [tempReviewAuthorDesignation, setTempReviewAuthorDesignation] = useState<string>("");
  const [tempReviewRating, setTempReviewRating] = useState<number>(5);
  const [tempReviewTitle, setTempReviewTitle] = useState<string>("");
  const [tempReviewBody, setTempReviewBody] = useState<string>("");
  const [tempReviewTeaser, setTempReviewTeaser] = useState<string>("");
  const [tempReviewMetrics, setTempReviewMetrics] = useState<{ label: string; score: number }[]>([]);

  // Curated Quotes ticker rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % CURATED_XP_QUOTES.length);
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  // Live conversion facts rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => (prev + 1) % CONVERSION_FACTS.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Fetch configured environment variables from backend on initial mount
  useEffect(() => {
    fetch("/api/config")
      .then((res) => {
        if (!res.ok) throw new Error("Config endpoint unresponsive");
        return res.json();
      })
      .then((data) => {
        if (data && data.gumroadProductUrl) {
          // If local storage is empty OR contains the default stale placeholder, OR the server has configured a dynamic override
          const storedUrl = localStorage.getItem("receipts_gumroad_product_url");
          const defaultDemoUrl = "https://gumroad.com/l/receipts-copywriter";
          
          if (!storedUrl || storedUrl === defaultDemoUrl || data.gumroadProductUrl !== defaultDemoUrl) {
            setGumroadProductUrl(data.gumroadProductUrl);
            localStorage.setItem("receipts_gumroad_product_url", data.gumroadProductUrl);
          }
        }
      })
      .catch((err) => console.warn("Optional server config loader:", err));
  }, []);

  // Sync custom tones to localstorage
  useEffect(() => {
    localStorage.setItem("receipts_custom_tones", JSON.stringify(customTones));
  }, [customTones]);

  // Sync form inputs to localstorage to avoid losing user progress
  useEffect(() => {
    localStorage.setItem("receipts_creator_name", creatorName);
    localStorage.setItem("receipts_client_type", clientType);
    localStorage.setItem("receipts_service", service);
    localStorage.setItem("receipts_industry", industry);
    localStorage.setItem("receipts_problem", problem);
    localStorage.setItem("receipts_solution", solution);
    localStorage.setItem("receipts_result", result);
    localStorage.setItem("receipts_timeframe", timeframe);
    localStorage.setItem("receipts_selected_tone_id", selectedToneId);
  }, [creatorName, clientType, service, industry, problem, solution, result, timeframe, selectedToneId]);

  // Synchronize with backend database to automatically restore premium status for active emails
  useEffect(() => {
    if (currentUser && currentUser.email && isAutoVerifyEnabled) {
      const syncPremiumStatus = async () => {
        try {
          const res = await fetch("/api/pro-users");
          if (res.ok) {
            const proUsers = await res.json();
            const matched = proUsers.find(
              (u: any) => (u?.email || "").toLowerCase() === (currentUser?.email || "").toLowerCase()
            );
            if (matched) {
              if (!isPurchased || !currentUser.isPurchased) {
                console.log(`[SYNC_PRO] Automatically restoring lifetime pro for: ${currentUser.email}`);
                setIsPurchased(true);
                setLicenseKey(matched.licenseKey || "");
                localStorage.setItem("receipts_gumroad_verified", "true");
                localStorage.setItem("receipts_license_key", matched.licenseKey || "");

                const updatedUser = {
                  ...currentUser,
                  isPurchased: true,
                  licenseKey: matched.licenseKey || ""
                };
                setCurrentUser(updatedUser);
                localStorage.setItem("receipts_current_user", JSON.stringify(updatedUser));

                // Sync with local users list
                const usersStr = localStorage.getItem("receipts_registered_users");
                if (usersStr) {
                  try {
                    const usersList = JSON.parse(usersStr);
                    const index = usersList.findIndex((u: any) => (u?.email || "").toLowerCase() === (currentUser?.email || "").toLowerCase());
                    if (index !== -1) {
                      usersList[index] = updatedUser;
                      localStorage.setItem("receipts_registered_users", JSON.stringify(usersList));
                    }
                  } catch (e) {}
                }
              }
            }
          }
        } catch (err) {
          console.error("Failed to sync backend premium status:", err);
        }
      };
      
      syncPremiumStatus();
    }
  }, [currentUser]);

  const checkPurchaseStatus = async () => {
    if (!currentUser || !currentUser.email) return;
    setIsCheckingPurchase(true);
    try {
      const res = await fetch("/api/pro-users");
      if (res.ok) {
        const proUsers = await res.json();
        const matched = proUsers.find(
          (u: any) => (u?.email || "").toLowerCase() === (currentUser?.email || "").toLowerCase()
        );
        if (matched) {
          setIsPurchaseDetected(true);
          setHasClaimedReceipt(true);
          setIsPurchased(true);
          setLicenseKey(matched.licenseKey || "");
          localStorage.setItem("receipts_gumroad_verified", "true");
          localStorage.setItem("receipts_license_key", matched.licenseKey || "");
          
          const updatedUser = {
            ...currentUser,
            isPurchased: true,
            licenseKey: matched.licenseKey || ""
          };
          setCurrentUser(updatedUser);
          localStorage.setItem("receipts_current_user", JSON.stringify(updatedUser));
          
          if (!tempLicenseInput) {
            setTempLicenseInput(matched.licenseKey || "");
          }
        } else {
          setIsPurchaseDetected(false);
        }
      }
    } catch (e) {
      console.warn("Check purchase state fetch error:", e);
    } finally {
      setIsCheckingPurchase(false);
    }
  };

  useEffect(() => {
    if (isPaywallOpen) {
      checkPurchaseStatus();
    }
  }, [isPaywallOpen]);

  // Real-time network health diagnostics
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    const checkConnectionSpeed = () => {
      const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      if (conn) {
        const isSlow = conn.saveData || ["slow-2g", "2g", "3g"].includes(conn.effectiveType) || conn.rtt > 400;
        setIsNetworkSlow(!!isSlow);
      }
    };

    checkConnectionSpeed();

    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      conn.addEventListener("change", checkConnectionSpeed);
    }

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (conn) {
        conn.removeEventListener("change", checkConnectionSpeed);
      }
    };
  }, []);

  // Save customized product URL locally
  const handleSaveProductUrl = (url: string) => {
    const trimmed = url.trim();
    if (!trimmed) {
      setVerifyErrorMsg("Please enter a valid Gumroad product page URL.");
      return;
    }
    setGumroadProductUrl(trimmed);
    localStorage.setItem("receipts_gumroad_product_url", trimmed);
    setVerifySuccessMsg("Gumroad product link saved successfully!");
    setVerifyErrorMsg("");
    setTimeout(() => {
      setVerifySuccessMsg("");
      setIsSettingsOpen(false);
      setIsPaywallOpen(false);
    }, 1500);
  };

  // Gumroad License Activating Logic
  const handleVerifyLicense = async (keyToVerify: string, productUrl: string) => {
    if (!keyToVerify.trim()) {
      setVerifyErrorMsg("Please enter a license key first.");
      return;
    }
    
    setIsVerifying(true);
    setVerifyErrorMsg("");
    setVerifySuccessMsg("");
    
    const permalink = extractGumroadPermalink(productUrl);
    
    try {
      const response = await fetch("/api/verify-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: keyToVerify.trim(),
          productPermalink: permalink,
          email: currentUser?.email || ""
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsPurchased(true);
        setIsPurchaseDetected(true);
        setLicenseKey(keyToVerify.trim());
        setGumroadProductUrl(productUrl);
        setHasClaimedReceipt(true);
        setIsAutoVerifyEnabled(true);
        localStorage.setItem("receipts_gumroad_verified", "true");
        localStorage.setItem("receipts_license_key", keyToVerify.trim());
        localStorage.setItem("receipts_gumroad_product_url", productUrl);
        localStorage.setItem("receipts_has_claimed_receipt", "true");
        localStorage.setItem("receipts_auto_verify", "true");

        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            isPurchased: true,
            licenseKey: keyToVerify.trim()
          };
          setCurrentUser(updatedUser);
          localStorage.setItem("receipts_current_user", JSON.stringify(updatedUser));
          
          const usersStr = localStorage.getItem("receipts_registered_users");
          if (usersStr) {
            try {
              const usersList = JSON.parse(usersStr);
              const index = usersList.findIndex((u: any) => (u?.email || "").toLowerCase() === (currentUser?.email || "").toLowerCase());
              if (index !== -1) {
                usersList[index] = updatedUser;
                localStorage.setItem("receipts_registered_users", JSON.stringify(usersList));
              }
            } catch (e) {}
          }
        }
        
        setVerifySuccessMsg(data.message || "License successfully activated! Pro features unlocked.");
        
        // Brief visual delay for delightful experience, then close modals
        setTimeout(() => {
          setIsPaywallOpen(false);
          setIsSettingsOpen(false);
          setVerifySuccessMsg("");
        }, 2000);
      } else {
        setVerifyErrorMsg(data.error || "Verification failed. Check your product link and license code.");
      }
    } catch (err: any) {
      console.error(err);
      setVerifyErrorMsg("Connection error: " + (err.message || "Please try again."));
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDeactivateLicense = () => {
    setIsPurchased(false);
    setLicenseKey("");
    localStorage.removeItem("receipts_gumroad_verified");
    localStorage.removeItem("receipts_license_key");
    setVerifySuccessMsg("License key disconnected. Returned to Trial Mode.");
    setTimeout(() => setVerifySuccessMsg(""), 3000);
  };

  // Helper to trigger the beautiful loading state transition (opening a page/receipt)
  const startTransition = (callback: () => void, title?: string, subtitle?: string) => {
    setLoaderTriggerKey(Math.random());
    setLoaderTitle(title || "");
    setLoaderSubtitle(subtitle || "");
    setIsPageLoading(true);
    setTimeout(() => {
      callback();
      setIsPageLoading(false);
    }, 1100);
  };

  // Handle example selection and pre-population
  const selectExample = (ex: ExampleScenario) => {
    startTransition(() => {
      setCreatorName(ex.creatorName);
      setClientType(ex.clientType);
      setService(ex.service);
      setIndustry(ex.industry);
      setProblem(ex.problem);
      setSolution(ex.solution);
      setResult(ex.result);
      setTimeframe(ex.timeframe);
      setActiveTemplateTitle(ex.title);
      
      // Auto navigate to step 2 to show the filled context
      setStep(2);
    }, 
    "Loading Success Case Scenario",
    ex.title ? `Pre-populating workflow for '${ex.title}'...` : "Configuring target audience and industry profile..."
    );
  };

  // Add custom tone logic
  const handleAddTone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newToneName.trim() || !newToneKeywords.trim()) return;

    const newTone: CustomTone = {
      id: "custom_" + Date.now(),
      name: newToneName.trim(),
      keywords: newToneKeywords.trim(),
      isCustom: true
    };

    setCustomTones((prev) => [...prev, newTone]);
    setSelectedToneId(newTone.id);
    setNewToneName("");
    setNewToneKeywords("");
    setIsAddingTone(false);
  };

  const handleDeleteTone = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomTones((prev) => prev.filter((t) => t.id !== id));
    if (selectedToneId === id) {
      setSelectedToneId("bold");
    }
  };

  const getActiveTone = (): CustomTone => {
    const all = [...SYSTEM_TONES, ...customTones];
    return all.find((t) => t.id === selectedToneId) || SYSTEM_TONES[0];
  };

  const triggerValidationError = (msg: string) => {
    setValidationError(msg);
    setTimeout(() => {
      setValidationError((prev) => prev === msg ? "" : prev);
    }, 5000);
  };

  const validateStep = (current: number) => {
    setValidationError("");
    if (current === 1) {
      if (!creatorName.trim()) {
        triggerValidationError("Please provide the Creator/Brand Name first.");
        return false;
      }
      if (!service.trim()) {
        triggerValidationError("Please specify the Service/Product delivered first.");
        return false;
      }
    }
    if (current === 2) {
      if (!problem.trim()) {
        triggerValidationError("Please describe the before scenario or client struggles.");
        return false;
      }
      if (!solution.trim()) {
        triggerValidationError("Please describe what custom solution was built.");
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      const nextTitle = step === 1 
        ? "Defining Project Challenges" 
        : step === 2 
        ? "Formulating Evidence Metrics" 
        : "Analyzing Output Tone";
      const nextSubtitle = step === 1 
        ? "Mapping client pain points and target solution parameters..." 
        : step === 2 
        ? "Connecting outcomes to physical business receipts..." 
        : "Parsing key metrics to select writing tone...";

      startTransition(() => {
        setStep((prev) => Math.min(prev + 1, 4));
      }, nextTitle, nextSubtitle);
    }
  };

  const handlePrevStep = () => {
    startTransition(() => {
      setStep((prev) => Math.max(prev - 1, 1));
    }, 
    "Reverting Form Progress", 
    `Returning to Step ${step - 1} for revision...`
    );
  };

  const handleGoToStep = (num: number) => {
    // Check if the user is allowed to skip directly (basic step progression validation)
    if (num > step) {
      for (let i = step; i < num; i++) {
        if (!validateStep(i)) return;
      }
    }
    const stepName = num === 1 
      ? "Creator Basics" 
      : num === 2 
      ? "The Challenge & Solution" 
      : num === 3 
      ? "Results & Timeframe" 
      : "Generate Receipts Output";

    startTransition(() => {
      setStep(num);
    }, 
    `Navigating to Step ${num}`, 
    `Configuring parameters for Step ${num}: ${stepName}...`
    );
  };

  // Generate assets API call
  const generateAssets = async () => {
    setGenerationError("");

    // Monetization trial check
    const trialsUsed = generationCount >= 1;
    if (!isPurchased && trialsUsed) {
      setTempLicenseInput(licenseKey);
      setTempProductUrlInput(gumroadProductUrl);
      setIsPaywallOpen(true);
      return;
    }

    if (!result.trim()) {
      triggerValidationError("Please provide the Key Metric/Result. That's the heart of your proof!");
      return;
    }

    setStep(4);
    setStatus("loading");
    setLoadingProgress(10);
    
    const activeIndustry = industry.trim() || "SaaS";
    const activeClient = clientType.trim() || "B2B targets";
    const activeService = service.trim() || "SaaS products";
    const activeCreator = creatorName.trim() || "modern users";
    const activeMetric = result.trim() || "metrics";

    setLoadingText(`Deconstructing ${activeIndustry} client metrics & credentials...`);

    // Simulate real-time progress steps for beautiful loading immersion
    const intervalsText = [
      { p: 25, t: `Drafting attention-grabbing 𝕏/Twitter thread hooks for "${activeService}"...` },
      { p: 48, t: `Polishing high-conversion 𝕏 thread stories focusing on ${activeMetric}...` },
      { p: 65, t: `Composing low-friction personalized Cold DMs targeting ${activeClient}...` },
      { p: 80, t: `Authoring proof-dense landing page blurb for ${activeCreator}...` },
      { p: 92, t: `Structuring authentic client POV testimonial quote based on "${timeframe || 'record time'}"...` },
      { p: 98, t: `Synthesizing organic ${activeIndustry} distribution tips & marketing advice...` }
    ];

    let stepIdx = 0;
    const progressTimer = setInterval(() => {
      if (stepIdx < intervalsText.length) {
        setLoadingProgress(intervalsText[stepIdx].p);
        setLoadingText(intervalsText[stepIdx].t);
        stepIdx++;
      }
    }, 900);

    try {
      const activeTone = getActiveTone();
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorName,
          clientType,
          service,
          industry,
          problem,
          solution,
          result,
          timeframe,
          toneName: activeTone.name,
          toneKeywords: activeTone.keywords
        })
      });

      clearInterval(progressTimer);

      if (!response.ok) {
        let errorMsg = "We are currently experiencing an issue processing your request with the backend copywriting model. We are working on it. Please try again shortly.";
        try {
          const errData = await response.json();
          if (errData && errData.error) {
            errorMsg = errData.error;
          }
        } catch (jsonErr) {}
        throw new Error(errorMsg);
      }

      const rawData = await response.json();
      setGeneratedResults(rawData);
      setLoadingProgress(100);
      setStatus("success");

      // Save complete record to assetLogs array
      const logRecordId = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);
      const newLogRecord = {
        id: logRecordId,
        date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        month: new Date().toLocaleDateString("en-US", { month: "long" }),
        timestamp: Date.now(),
        creatorName,
        clientType,
        service,
        industry,
        problem,
        solution,
        result,
        timeframe,
        tone: activeTone.name,
        assets: rawData
      };

      setAssetLogs(prev => {
        const next = [newLogRecord, ...prev];
        localStorage.setItem("receipts_generation_logs", JSON.stringify(next));
        return next;
      });

      // Post activity record to backend database
      fetch("/api/record-activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: currentUser?.email || "anonymous-trial@domain.com",
          userName: currentUser?.fullName || "Anonymous Trial Profile",
          action: "Generated Copywriting Layout Assets",
          details: `Client Win: ${clientType} (${service}) yielding ${result}`
        })
      }).catch((e) => console.warn(e));

      // Increment and persist free trial count
      const nextCount = currentUser?.hasUsedTrial ? generationCount : generationCount + 1;
      setGenerationCount(nextCount);
      localStorage.setItem("receipts_generation_count", nextCount.toString());

      if (currentUser) {
        const updatedUser = {
          ...currentUser,
          hasUsedTrial: true
        };
        setCurrentUser(updatedUser);
        localStorage.setItem("receipts_current_user", JSON.stringify(updatedUser));
        
        // Sync with users list
        const usersStr = localStorage.getItem("receipts_registered_users");
        if (usersStr) {
          try {
            const usersList = JSON.parse(usersStr);
            const index = usersList.findIndex((u: any) => (u?.email || "").toLowerCase() === (currentUser?.email || "").toLowerCase());
            if (index !== -1) {
              usersList[index] = updatedUser;
              localStorage.setItem("receipts_registered_users", JSON.stringify(usersList));
            }
          } catch (e) {}
        }
      }
    } catch (err: any) {
      clearInterval(progressTimer);
      console.error(err);
      setGenerationError(err.message || "We are currently experiencing an issue processing your request with the backend copywriting model. We are working on it. Please try again shortly.");
      setStatus("error");
    }
  };

  // Helper utility to export as file
  const triggerDownload = (filename: string, text: string) => {
    const element = document.createElement("a");
    const file = new Blob([text], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Helper to copy text with UI visual feedback
  const handleCopyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }).catch((err) => {
      console.warn("Copied failed", err);
    });
  };

  // Deep edit modal state management
  const openEditModal = (key: keyof GeneratedAssets) => {
    setEditingAssetKey(key);
    if (!generatedResults) return;

    if (key === "xThread") {
      setTempEditedText(generatedResults.xThread.join("\n\n---\n\n"));
      setActiveXTweetIndex(0);
    } else if (key === "testimonial") {
      setTempQuote(generatedResults.testimonial.quote);
      setTempInsight(generatedResults.testimonial.creatorInsight);
      setTempEditedText(JSON.stringify(generatedResults.testimonial, null, 2));
    } else if (key === "postingTips") {
      setTempEditedText(generatedResults.postingTips.join("\n"));
    } else if (key as string === "reviewRatingAsset") {
      const asset = generatedResults.reviewRatingAsset || {
        overallRating: 5,
        metrics: [
          { label: "Outreach Return Ratio", score: 9 },
          { label: "Pipeline Acceleration", score: 9 },
          { label: "Retention Multiplier", score: 10 }
        ],
        title: "Spectacular Proof Integration",
        body: "Our conversion rates skyrocketed by more than 3.4x in less than two weeks. Exceptional tool!",
        authorName: creatorName || "John Doe",
        authorDesignation: "CEO & Growth Lead",
        socialShareTeaser: "Incredible client win details verified by Receipts AI!"
      };
      setTempReviewAuthorName(asset.authorName || creatorName || "Arjun Shah");
      setTempReviewAuthorDesignation(asset.authorDesignation || "Growth Lead @ SaaS");
      setTempReviewRating(asset.overallRating || 5);
      setTempReviewTitle(asset.title || "Spectacular Proof Integration");
      setTempReviewBody(asset.body || "Our conversion rates skyrocketed by 3.4x in two weeks.");
      setTempReviewTeaser(asset.socialShareTeaser || "Incredible client win details!");
      setTempReviewMetrics(asset.metrics ? asset.metrics.map(m => ({ ...m })) : [
        { label: "Outreach Return Ratio", score: 9 },
        { label: "Pipeline Acceleration", score: 9 },
        { label: "Retention Multiplier", score: 10 }
      ]);
      setTempEditedText(JSON.stringify(asset, null, 2));
    } else {
      setTempEditedText((generatedResults[key] as string) || "");
    }
  };

  const handleApplyLinkedInFormatting = (type: "bold" | "bold_unicode" | "bullet" | "arrow_bullet" | "check_bullet" | "header_1" | "header_2" | "header_border") => {
    const textarea = document.getElementById("linkedin-textarea-editor") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    const selectedText = text.substring(start, end);

    let replacement = "";
    if (type === "bold") {
      replacement = `**${selectedText || "Phrase"}**`;
    } else if (type === "bold_unicode") {
      // Direct Unicode conversion to mathematical bold sans-serif
      const sansSerifBoldRange: { [key: string]: string } = {
        'A': '𝗔', 'B': '𝗕', 'C': '𝗖', 'D': '𝗗', 'E': '𝗘', 'F': '𝗙', 'G': '𝗚', 'H': '𝗛', 'I': '𝗜', 'J': '𝗝',
        'K': '𝗞', 'L': '𝗟', 'M': '𝗠', 'N': '𝗡', 'O': '𝗢', 'P': '𝗣', 'Q': '𝗤', 'R': '𝗥', 'S': '𝗦', 'T': '𝗧',
        'U': '𝗨', 'V': '𝗩', 'W': '𝗪', 'X': '𝗫', 'Y': '𝗬', 'Z': '𝗭',
        'a': '𝗮', 'b': '𝗯', 'c': '𝗰', 'd': '𝗱', 'e': '𝗲', 'f': '𝗳', 'g': '𝗴', 'h': '𝗵', 'i': '𝗶', 'j': '𝗷',
        'k': '𝗸', 'l': '𝗹', 'm': '𝗺', 'n': '𝗻', 'o': '𝗼', 'p': '𝗽', 'q': '𝗾', 'r': '𝗿', 's': '𝘀', 't': '𝘁',
        'u': '𝘂', 'v': '𝘃', 'w': '𝘄', 'x': '𝘅', 'y': '𝘆', 'z': '𝘇',
        '0': '𝟬', '1': '𝟭', '2': '𝟮', '3': '𝟯', '4': '𝟰', '5': '𝟱', '6': '𝟲', '7': '𝟳', '8': '𝟴', '9': '𝟵'
      };
      replacement = (selectedText || "Phrase").split('').map(char => sansSerifBoldRange[char] || char).join('');
    } else if (type === "bullet") {
      replacement = selectedText 
        ? selectedText.split("\n").map(l => l.startsWith("• ") ? l : `• ${l}`).join("\n")
        : "• Bullet point";
    } else if (type === "arrow_bullet") {
      replacement = selectedText 
        ? selectedText.split("\n").map(l => l.startsWith("➥ ") ? l : `➥ ${l}`).join("\n")
        : "➥ Bullet point";
    } else if (type === "check_bullet") {
      replacement = selectedText 
        ? selectedText.split("\n").map(l => l.startsWith("✓ ") ? l : `✓ ${l}`).join("\n")
        : "✓ Bullet point";
    } else if (type === "header_1") {
      replacement = `📌 ${selectedText ? selectedText.toUpperCase() : "HEADER 1"}\n`;
    } else if (type === "header_2") {
      replacement = `🚀 ${selectedText ? selectedText.toUpperCase() : "HEADER 2"}\n`;
    } else if (type === "header_border") {
      const boldTitle = selectedText ? selectedText.toUpperCase() : "HEADING SECTION";
      replacement = `━━━ ${boldTitle} ━━━\n`;
    }

    const nextText = text.substring(0, start) + replacement + text.substring(end);
    setTempEditedText(nextText);

    // Refocus the textarea and set the selection
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + replacement.length);
    }, 50);
  };

  const handleSaveModalChanges = () => {
    if (!generatedResults || !editingAssetKey) return;

    const updated = { ...generatedResults };

    if (editingAssetKey === "xThread") {
      // Split by custom marker or fallback linebreaks
      const splitArr = tempEditedText.split(/\n+---\n+/).map((t) => t.trim()).filter(Boolean);
      updated.xThread = splitArr.length > 0 ? splitArr : tempEditedText.split("\n\n").map((t) => t.trim()).filter(Boolean);
    } else if (editingAssetKey === "testimonial") {
      updated.testimonial = {
        quote: tempQuote.trim() || generatedResults.testimonial.quote,
        creatorInsight: tempInsight.trim() || generatedResults.testimonial.creatorInsight
      };
    } else if (editingAssetKey === "postingTips") {
      updated.postingTips = tempEditedText.split("\n").map((t) => t.trim()).filter(Boolean);
    } else if (editingAssetKey as string === "reviewRatingAsset") {
      updated.reviewRatingAsset = {
        overallRating: tempReviewRating,
        metrics: tempReviewMetrics,
        title: tempReviewTitle,
        body: tempReviewBody,
        authorName: tempReviewAuthorName,
        authorDesignation: tempReviewAuthorDesignation,
        socialShareTeaser: tempReviewTeaser
      };
    } else {
      // Direct string fields (coldDm, landingBlurb)
      (updated[editingAssetKey] as string) = tempEditedText;
    }

    setGeneratedResults(updated);
    setEditingAssetKey(null);
  };

  const handleDownloadSingleAsset = (name: string, content: string) => {
    const dateStr = new Date().toISOString().split("T")[0];
    triggerDownload(`receipts_${name}_${dateStr}.txt`, content);
  };

  const handleDownloadProofPlate = async () => {
    const el = document.getElementById("social-proof-plate");
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { backgroundColor: '#020617', scale: 2 });
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `review-plate-${Date.now()}.png`;
      a.click();
    } catch (err) {
      console.error("Failed to download proof plate", err);
    }
  };

  // Auto parsing numbers from results metric to build a stunning visual chart!
  const getParsedGrowthMultiplier = (): { displayMultiplier: string; hasData: boolean; beforeLabel: string; afterLabel: string; percentage: number } => {
    if (!result) return { displayMultiplier: "10x", hasData: false, beforeLabel: "1%", afterLabel: "14%", percentage: 70 };
    
    // Find numbers or conversion indicators e.g., "1% -> 14.2%" or "Reply rate 1% → 14%"
    const match = result.match(/(\d+(?:\.\d+)?)\s*%\s*(?:→|->|to)\s*(\d+(?:\.\d+)?)\s*%/i);
    if (match) {
      const before = parseFloat(match[1]);
      const after = parseFloat(match[2]);
      if (before > 0 && after > before) {
        const mult = (after / before).toFixed(1);
        return {
          displayMultiplier: `${mult}x Higher`,
          hasData: true,
          beforeLabel: `${before}%`,
          afterLabel: `${after}%`,
          percentage: Math.min((before / after) * 100, 100)
        };
      }
    }

    // Try parsing pure metrics improvement like "10 leads to 142 leads"
    const numberMatches = result.match(/(\d+)\s+to\s+(\d+)/i) || result.match(/(\d+)\s*→\s*(\d+)/i);
    if (numberMatches) {
      const before = parseInt(numberMatches[1], 10);
      const after = parseInt(numberMatches[2], 10);
      if (before > 0 && after > before) {
        const mult = (after / before).toFixed(1);
        return {
          displayMultiplier: `${mult}x Yield`,
          hasData: true,
          beforeLabel: `${before}`,
          afterLabel: `${after}`,
          percentage: Math.min((before / after) * 100, 100)
        };
      }
    }

    // Default aesthetic mock values based on service keywords
    return {
      displayMultiplier: "Supercharged",
      hasData: false,
      beforeLabel: "Standard Base",
      afterLabel: "Optimal Peak",
      percentage: 25
    };
  };

  const chartInfo = getParsedGrowthMultiplier();

  // Reset the tool's form
  const handleResetForm = () => {
    startTransition(() => {
      setCreatorName("");
      setClientType("");
      setService("");
      setIndustry("");
      setProblem("");
      setSolution("");
      setResult("");
      setTimeframe("");
      setGeneratedResults(null);
      setStatus("idle");
      setStep(1);
      setActiveTemplateTitle(null);
    }, 
    "Clearing Copy Workspace", 
    "Resetting all input parameters and historical context to blank..."
    );
  };

  if (showAboutPage) {
    return (
      <AboutPage
        isDarkMode={isDarkMode}
        onBack={() => setShowAboutPage(false)}
      />
    );
  }

  if (!currentUser) {
    if (showAuthMode === "landing") {
      return (
        <LandingPage
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => {}}
          onNavigateToAuth={(isSignUp, customTitle, customSubtitle) => {
            const title = customTitle || (isSignUp ? "Opening Free Trial Portal" : "Establishing Sign-in Route");
            const subtitle = customSubtitle || (isSignUp
              ? "Preparing secure enrollment gateway and custom trial configurations..."
              : "Locating credential secure keys and initializing session handshake...");
            startTransition(() => {
              setShowAuthMode(isSignUp ? "signup" : "login");
            }, title, subtitle);
          }}
          onNavigateToAbout={() => setShowAboutPage(true)}
        />
      );
    }

    return (
      <AuthScreen 
        onAuthSuccess={(user) => {
          startTransition(() => {
            setCurrentUser(user);
            const userTrialsVal = user.free_trials_used !== undefined ? user.free_trials_used : (user.hasUsedTrial ? 1 : 0);
            setGenerationCount(userTrialsVal);
            localStorage.setItem("receipts_generation_count", userTrialsVal.toString());

            if (user.isPurchased) {
              setIsPurchased(true);
              setLicenseKey(user.licenseKey || "");
              localStorage.setItem("receipts_gumroad_verified", "true");
              localStorage.setItem("receipts_license_key", user.licenseKey || "");
            } else {
              setIsPurchased(false);
              setLicenseKey("");
              localStorage.setItem("receipts_gumroad_verified", "false");
              localStorage.setItem("receipts_license_key", "");
            }
          }, "Initializing Proof-Copy Workspace", `Establishing secure credentials for ${user.fullName}... Allocating core copywriter parameters...`);
        }} 
        isDarkMode={isDarkMode} 
        onToggleDarkMode={() => {}} 
        isSignUpInitial={showAuthMode === "signup"}
        onBackToLanding={() => {
          startTransition(() => {
            setShowAuthMode("landing");
          }, "Returning to Home", "Resetting auth pathways and reloading landing highlights...");
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col selection:bg-indigo-100 selection:text-indigo-950">
      
      {/* Real-time Ticker Bar */}
      <div className="bg-white border-b border-slate-200 py-3 px-6 flex items-center gap-3 shadow-xs">
        <span className="text-[10px] tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-200 uppercase font-bold px-2.5 py-1 rounded">𝕏 Insider Insight</span>
        <div className="flex-1 overflow-hidden h-5 relative flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p 
              key={`ticker-${tickerIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="text-xs text-slate-600 font-medium text-left w-full italic truncate"
            >
              "{CURATED_XP_QUOTES[tickerIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-[1240px] w-full mx-auto px-4 md:px-8 py-8 flex-1 flex flex-col">
        
        {/* Editorial Top Branded Banner */}
        <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end border-b border-slate-200 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 select-none">
              <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-xl text-white shadow-xs group overflow-hidden">
                <Award className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white font-sans">
                    Receipts
                  </h1>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-xs font-bold text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/35">
                    AI
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded ml-1">v2.1</span>
                </div>
                <span className="text-[9px] font-bold text-indigo-650 dark:text-indigo-400 uppercase tracking-widest font-mono block mt-0.5">
                  Proof-to-Copy
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 mt-2 font-normal">
              Stop bragging. Show proof. Turn client wins into 4 copy-pasteable high-conversion assets in 5 mins.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Account Profile */}
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-xs hover:shadow-sm select-none"
              title="Open User Profile"
              type="button"
            >
              {currentUser?.avatarUrl ? (
                <img src={currentUser.avatarUrl} alt="" className="w-4 h-4 rounded-full object-cover" />
              ) : (
                <User className="w-3.5 h-3.5 text-indigo-500" />
              )}
              <span>{currentUser?.fullName ? currentUser.fullName : "My Profile"}</span>
            </button>

            {/* Premium Logout Feature */}
            <button
              onClick={() => {
                localStorage.removeItem("receipts_current_user");
                localStorage.removeItem("receipts_generation_count");
                setGenerationCount(0);
                setCurrentUser(null);
                setLicenseKey("");
                setIsPurchased(false);
                localStorage.removeItem("receipts_gumroad_verified");
                localStorage.removeItem("receipts_license_key");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-rose-600 hover:text-rose-700 hover:border-rose-200 transition-all cursor-pointer shadow-xs hover:shadow-sm select-none"
              title="Log Out of secure credential session"
              type="button"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>

            {isPurchased ? (
              <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs select-none">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pro Lifetime Active</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/40 px-3 py-1.5 rounded-lg text-xs font-bold shadow-xs cursor-pointer select-none hover:bg-amber-100/50 dark:hover:bg-amber-950/60 transition-all"
                onClick={() => {
                  setTempLicenseInput(licenseKey);
                  setTempProductUrlInput(gumroadProductUrl);
                  setVerifyErrorMsg("");
                  setVerifySuccessMsg("");
                  setIsPaywallOpen(true);
                }}
                title="Click to activate with Gumroad license key"
              >
                <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Trial: {generationCount >= 1 ? "1" : "0"}/1 Output</span>
              </div>
            )}
            
            {typeof window !== 'undefined' && window.location.search.includes('admin=true') && (
              <button
                onClick={() => {
                  setTempLicenseInput(licenseKey);
                  setTempProductUrlInput(gumroadProductUrl);
                  setVerifyErrorMsg("");
                  setVerifySuccessMsg("");
                  setIsSettingsOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 hover:text-slate-950 transition-all cursor-pointer shadow-xs hover:shadow-sm select-none"
              >
                <Settings className="w-3.5 h-3.5 text-slate-500" />
                <span>Customize Gumroad Link</span>
              </button>
            )}
          </div>
        </header>

        {/* Workspace Tab Selector Menu */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1.5 mb-8 overflow-x-auto select-none">
          <button
            onClick={() => setWorkspaceTab("builder")}
            className={`py-3 px-5 text-xs font-black uppercase tracking-wider cursor-pointer flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              workspaceTab === "builder"
                ? "text-indigo-600 border-indigo-600"
                : "text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Active Campaign Builder</span>
          </button>
          
          <button
            onClick={() => setWorkspaceTab("myAssets")}
            className={`py-3 px-5 text-xs font-black uppercase tracking-wider cursor-pointer flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              workspaceTab === "myAssets"
                ? "text-indigo-600 border-indigo-600"
                : "text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>My Assets</span>
          </button>
        </div>

        {workspaceTab === "builder" && (
          <>
            {/* Quickstart Scenario Library Bar */}
            {step < 4 && (
          <section className="mb-10 bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm relative overflow-hidden">
            <div className="absolute right-[-40px] top-[-30px] opacity-10 blur-xl w-48 h-48 bg-indigo-500 rounded-full"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs tracking-wider uppercase font-bold text-indigo-600">
                Example Client Win Library — select to pre-populate / explore
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
              {EXAMPLE_SCENARIOS.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => selectExample(ex)}
                  className="p-3 text-left rounded-lg bg-slate-50 border border-slate-200 hover:border-indigo-305 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all group flex flex-col justify-between h-[105px] overflow-hidden shadow-xs cursor-pointer"
                >
                  <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight group-hover:text-indigo-650 transition-colors">
                    {ex.title}
                  </p>
                  <div className="mt-2 flex items-center justify-between w-full border-t border-slate-200/60 pt-1.5">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-medium font-mono">
                      {ex.industry.split(" ")[0]}
                    </span>
                    <span className="text-[9px] text-indigo-600 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic Multi-Step Setup Panel */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Main Forms / Progress Navigation */}
          {step < 4 && (
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
              
              {/* Step Navigation Pills */}
              <nav className="flex items-center justify-between border-b border-slate-200 pb-1 gap-1 w-full overflow-x-auto">
                {[
                  { n: 1, label: "Your Identity & Context" },
                  { n: 2, label: "The Struggle (Before & After)" },
                  { n: 3, label: "The Hard Metric Results" }
                ].map((sObj) => (
                  <button
                    key={sObj.n}
                    onClick={() => handleGoToStep(sObj.n)}
                    className={`flex items-center gap-2 py-3 px-3 uppercase text-xs tracking-wider border-b-2 font-bold transition-all whitespace-nowrap cursor-pointer ${
                      step === sObj.n
                        ? "text-indigo-600 border-indigo-600"
                        : step > sObj.n 
                        ? "text-slate-500 border-slate-200 hover:text-indigo-600"
                        : "text-slate-400/60 border-transparent cursor-not-allowed"
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] border font-sans font-extrabold ${
                      step === sObj.n ? "border-indigo-600 bg-indigo-600 text-white" : step > sObj.n ? "border-emerald-500 bg-emerald-550 text-emerald-600 bg-emerald-50" : "border-slate-300 text-slate-400"
                    }`}>
                      {step > sObj.n ? "✓" : sObj.n}
                    </span>
                    <span>{sObj.label}</span>
                  </button>
                ))}
              </nav>

              {activeTemplateTitle && (
                <div className="bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 rounded-xl px-4.5 py-3 flex items-center justify-between shadow-xs">
                  <span className="text-xs text-indigo-900 font-bold flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-650 animate-pulse" /> Loaded Template: <span className="text-indigo-950 font-extrabold">{activeTemplateTitle}</span>
                  </span>
                  <button
                    onClick={handleResetForm}
                    className="text-[10px] bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                  >
                    Clear Template
                  </button>
                </div>
              )}

              {/* Steps Layout */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-8 shadow-sm min-h-[420px] flex flex-col justify-between">
                
                {validationError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs px-4 py-3 rounded-lg flex items-center gap-2 mb-6 font-semibold shadow-xs animate-pulse">
                    <span className="text-sm">⚠️</span>
                    <span>{validationError}</span>
                  </div>
                )}
                
                {/* STEP 1: Context Core */}
                {step === 1 && (
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-6">
                        <span className="text-[10px] tracking-widest text-indigo-600 uppercase font-bold">Step 1 of 3</span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1">Define the win scope</h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Personalized background variables produce razor-sharp social proof.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-700 uppercase tracking-wider font-bold flex items-center gap-1">
                            Your Elite Name / Brand <span className="text-indigo-600">*</span>
                          </label>
                          <input
                            type="text"
                            value={creatorName}
                            onChange={(e) => setCreatorName(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                            placeholder="e.g. Arjun Shah"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-700 uppercase tracking-wider font-bold">
                            Client Persona/Target Type
                          </label>
                          <input
                            type="text"
                            value={clientType}
                            onChange={(e) => setClientType(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-550 transition-all font-medium"
                            placeholder="e.g. Early-Stage SaaS Founder"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-5">
                        <label className="text-xs text-slate-700 uppercase tracking-wider font-bold flex items-center gap-1">
                          Product or Customized Service Delivered <span className="text-indigo-600">*</span>
                        </label>
                        <input
                          type="text"
                          value={service}
                          onChange={(e) => setService(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                          placeholder="e.g. automated triple-pass cold outreach setup"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-700 uppercase tracking-wider font-bold">
                          Client Industry / Niche
                        </label>
                        <input
                          type="text"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium"
                          placeholder="e.g. B2B AI Tooling & CRM"
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-8 flex justify-end">
                      <button
                        onClick={handleNextStep}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors px-6 py-3 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        <span>Describe Struggle</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Before & After */}
                {step === 2 && (
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-6">
                        <span className="text-[10px] tracking-widest text-indigo-600 uppercase font-bold">Step 2 of 3</span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1">Shattering of before & after</h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Contrast drives copywriting. Express the deep pain versus your breakthrough solution.
                        </p>
                      </div>

                      <div className="flex flex-col gap-1.5 mb-5">
                        <label className="text-xs text-slate-700 uppercase tracking-wider font-bold flex items-center justify-between gap-1">
                          <span>What were they struggling with? (Before) <span className="text-indigo-600">*</span></span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">Pain details</span>
                        </label>
                        <textarea
                          rows={4}
                          value={problem}
                          onChange={(e) => setProblem(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium resize-none"
                          placeholder="e.g. Doing hours of tedious manual lead discovery. Sending boring copy with an exhausting 1% reply rate. Total channel burnout."
                        />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs text-slate-700 uppercase tracking-wider font-bold flex items-center justify-between gap-1">
                          <span>What did you execute? (Solution) <span className="text-indigo-600">*</span></span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">Unique mechanics</span>
                        </label>
                        <textarea
                          rows={4}
                          value={solution}
                          onChange={(e) => setSolution(e.target.value)}
                          className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium resize-none"
                          placeholder="e.g. Revamped targeting hooks, filtered list parameters with custom API triggers, and deployed a triple-pass intent email campaign."
                        />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center">
                      <button
                        onClick={handlePrevStep}
                        className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors px-5 py-3 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xs"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Go Back</span>
                      </button>

                      <button
                        onClick={handleNextStep}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors px-6 py-3 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-sm"
                      >
                        <span>Key Metrics</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Results & Tone */}
                {step === 3 && (
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="mb-6">
                        <span className="text-[10px] tracking-widest text-indigo-600 uppercase font-bold">Step 3 of 3</span>
                        <h2 className="text-2xl font-bold text-slate-900 mt-1">The key outcome & tone selection</h2>
                        <p className="text-xs text-slate-500 mt-1">
                          Exact numbers build unshakeable trust. Add your timeframe and select or create customized voice tones.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-700 uppercase tracking-wider font-bold flex items-center gap-1">
                            Key Metric Outcome / Result <span className="text-indigo-600">*</span>
                          </label>
                          <textarea
                            rows={3}
                            value={result}
                            onChange={(e) => setResult(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium resize-none shadow-xs"
                            placeholder="e.g. Reply rate shot from 1% to 14.2%. Logged 9 business demo bookings. Sparked $7,800 contracts."
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs text-slate-700 uppercase tracking-wider font-bold">
                            Timeframe <span className="text-slate-400 font-bold">(optional)</span>
                          </label>
                          <input
                            type="text"
                            value={timeframe}
                            onChange={(e) => setTimeframe(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-500 transition-all font-medium shadow-xs"
                            placeholder="e.g. 7 days, 3 weeks, 48 hours"
                          />
                        </div>
                      </div>

                      {/* Tone Section */}
                      <div className="mb-2">
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs text-slate-700 uppercase tracking-wider font-bold">
                            Tone and Writing style
                          </label>
                          <button
                            type="button"
                            onClick={() => setIsAddingTone(!isAddingTone)}
                            className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1 font-extrabold cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Create Custom Tone</span>
                          </button>
                        </div>

                        {/* Custom Tone Form Expansion */}
                        {isAddingTone && (
                          <motion.form 
                            onSubmit={handleAddTone}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            className="bg-slate-50 border border-indigo-200 rounded-lg p-5 mb-4 shadow-xs"
                          >
                            <h4 className="text-xs uppercase tracking-wider text-indigo-700 font-bold mb-3 flex items-center gap-1">
                              <Sparkles className="w-3.5 h-3.5" /> Create saved custom tone
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              <div className="md:col-span-1">
                                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Tone Name</span>
                                <input
                                  type="text"
                                  value={newToneName}
                                  onChange={(e) => setNewToneName(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-indigo-500"
                                  placeholder="e.g. Indie Sarcastic"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <span className="text-[10px] text-slate-500 uppercase font-bold block mb-1">Keywords / Prompt Guide</span>
                                <input
                                  type="text"
                                  value={newToneKeywords}
                                  onChange={(e) => setNewToneKeywords(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-md px-3 py-1.5 text-xs text-slate-950 font-medium focus:outline-none focus:border-indigo-500"
                                  placeholder="e.g. extremely casual, humorous, highly transparent, skepticism focused"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-3">
                              <button
                                type="button"
                                onClick={() => setIsAddingTone(false)}
                                className="text-xs text-slate-600 px-3 py-1 border border-slate-200 bg-white hover:bg-slate-50 rounded-md cursor-pointer font-bold"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={!newToneName.trim() || !newToneKeywords.trim()}
                                className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold px-4 py-1.5 rounded-md cursor-pointer shadow-xs disabled:opacity-45 disabled:cursor-not-allowed transition-all"
                              >
                                Save Tone
                              </button>
                            </div>
                          </motion.form>
                        )}

                        {/* Tone Selector pills */}
                        <div className="flex flex-wrap gap-2">
                          {(() => {
                            const seenIds = new Set<string>();
                            const uniqueAllTones = [...SYSTEM_TONES, ...customTones].filter(t => {
                              if (!t?.id || seenIds.has(t.id)) return false;
                              seenIds.add(t.id);
                              return true;
                            });
                            return uniqueAllTones.map((t) => (
                              <button
                                key={t.id}
                                onClick={() => setSelectedToneId(t.id)}
                                className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 border transition-all cursor-pointer ${
                                  selectedToneId === t.id
                                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <span>{t.name}</span>
                                {t.isCustom && (
                                  <span
                                    onClick={(e) => handleDeleteTone(t.id, e)}
                                    className={`p-0.5 rounded-full hover:bg-black/10 flex items-center justify-center ${
                                      selectedToneId === t.id ? "text-indigo-100 hover:text-white" : "text-slate-400 hover:text-slate-600"
                                    }`}
                                    title="Delete Custom Tone"
                                  >
                                    <X className="w-3 h-3" />
                                  </span>
                                )}
                              </button>
                            ));
                          })()}
                        </div>
                        
                        {/* Selected Tone Preview Explanation */}
                        <div className="mt-3.5 text-[11px] text-slate-500 italic font-mono leading-relaxed">
                          Selected Voice Rules: {getActiveTone().keywords}
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-6 mt-8 flex justify-between items-center">
                      <button
                        onClick={handlePrevStep}
                        className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors px-5 py-3 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-wider cursor-pointer shadow-xs"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Go Back</span>
                      </button>

                      <button
                        onClick={generateAssets}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white transition-colors px-7 py-3 rounded-lg flex items-center gap-2 font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>Pull My Receipts ↗</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* RIGHT: System sidebar advice */}
          {step < 4 && (
            <aside className="col-span-1 lg:col-span-4 flex flex-col gap-6">
              
              {/* Formula explanation */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                <h3 className="text-xs uppercase tracking-wider text-indigo-700 font-bold mb-3 flex items-center gap-1">
                  💡 The 4 Conversion Pillars
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-indigo-600 font-extrabold w-5">01</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">𝕏 Thread Core</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-sans">
                        Fills out 4–5 stacked posts. Leading with exact metric results up-front ensures a massive organic virality.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-indigo-600 font-extrabold w-5">02</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Hyper-personalized DM</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-sans">
                        A non-salesy, low-risk sequence tailored specifically to engage prospective ideal target companies.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-indigo-600 font-extrabold w-5">03</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Landing Blurb social proof</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-sans">
                        A punchy 60–80 words module layout with zero filler. Easily dropped onto custom pricing blocks or header panels.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-xs text-indigo-600 font-extrabold w-5">04</span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Client-POV Testimonial</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-normal font-sans">
                        A genuine client review style combined with a sharp creator strategy design.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic conversion calculator box */}
              <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm relative overflow-hidden">
                <div className="absolute right-0 bottom-0 opacity-5 text-indigo-600">
                  <TrendingUp className="w-32 h-32" />
                </div>
                <h3 className="text-xs uppercase tracking-wider text-indigo-700 font-bold mb-2">
                  📈 Simulated Retention Metric
                </h3>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                  Using receipts / evidence instead of generic claims generally yields a <strong className="text-slate-800 font-bold">2.8× increase</strong> in user conversation retention on X.
                </p>
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold block">Estimated CTR Boost</span>
                    <span className="text-lg font-mono font-bold text-indigo-605 text-indigo-600">+140%</span>
                  </div>
                  <div className="border-l border-slate-200 h-8 mx-2"></div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-wider font-extrabold block">Prospect reply state</span>
                    <span className="text-lg font-mono font-bold text-indigo-600">Natural Inbound</span>
                  </div>
                </div>
              </div>

            </aside>
          )}

          {/* GENERATION OUTPUT & WRITING PHASE */}
          {step === 4 && (
            <div className="col-span-1 lg:col-span-12 w-full mt-2">
              
              {/* LOADING PHASE */}
              {status === "loading" && (
                <div className="bg-white border border-slate-200 rounded-xl p-10 md:p-16 text-center max-w-xl mx-auto shadow-sm">
                  <div className="relative w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-slate-100"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-indigo-600 animate-spin"></div>
                    <Sparkles className="w-8 h-8 text-indigo-600" />
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2">Engraving High-Proof Receipts</h3>
                  <p className="text-xs text-indigo-600 mb-8 font-mono">{loadingText}</p>
                  
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200/50">
                    <div 
                      className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${loadingProgress}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-500 mt-2 block font-mono font-bold">{loadingProgress}% Synchronized</span>
                </div>
              )}

              {/* ERROR STATE */}
              {status === "error" && (
                <div className="bg-white border border-rose-200 rounded-xl p-10 text-center max-w-lg mx-auto shadow-sm">
                  <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto mb-4 text-rose-600">
                    <AlertCircle className="w-6 h-6 text-rose-500" />
                  </div>
                  <h3 className="text-base font-extrabold text-rose-600 mb-1">Receipt Extraction Interrupted</h3>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    {generationError || "We are currently experiencing an issue processing your request with the backend copywriting model. We are working on it. Please try again shortly."}
                  </p>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold transition-all px-4 py-2 text-xs rounded-lg uppercase tracking-wider cursor-pointer shadow-xs"
                    >
                      ← Back & Adjust Fields
                    </button>
                    <button
                      onClick={generateAssets}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all px-4 py-2 text-xs rounded-lg uppercase tracking-wider cursor-pointer shadow-xs"
                    >
                      Retry Generation
                    </button>
                  </div>
                </div>
              )}

              {/* SUCCESS OUTPUT */}
              {status === "success" && generatedResults && (
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-8"
                >
                  {/* Top Dashboard Head */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
                    <div>
                      <span className="text-[10px] tracking-widest text-indigo-600 uppercase font-bold">Case Metadata</span>
                      <div className="flex flex-wrap items-center mt-1.5 gap-x-4 gap-y-1">
                        <span className="text-xs text-indigo-705 font-mono font-bold text-slate-500">Creator: <span className="text-slate-900 font-sans font-extrabold">{creatorName}</span></span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-indigo-705 font-mono font-bold text-slate-500">Service: <span className="text-slate-900 font-sans font-extrabold">{service}</span></span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs text-indigo-705 font-mono font-bold text-slate-500">Tone Rule: <span className="text-indigo-600 font-sans font-extrabold uppercase">{getActiveTone().name}</span></span>
                        {timeframe && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-indigo-750 font-mono font-bold text-slate-500">Timeframe: <span className="text-slate-900 font-sans font-extrabold">{timeframe}</span></span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <button
                      onClick={handleResetForm}
                      className="text-xs border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all px-4 py-2.5 rounded-lg font-bold uppercase tracking-wider cursor-pointer shadow-xs"
                    >
                      New Case Receipt →
                    </button>
                  </div>

                  {/* Dynamic Before/After Comparative Transformation Block (Priceless Visual Details!) */}
                  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-indigo-500/5 blur-xl rounded-full"></div>
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <span className="text-[10px] text-indigo-600 uppercase tracking-widest font-bold">Evidence Scale</span>
                        <h3 className="text-xl font-bold text-slate-900 mt-1">Comparison Graph</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-xl">
                          Your case win metric suggests a massive baseline performance spike. Here's how it visuals on standard landing conversions:
                        </p>
                      </div>

                      <div className="w-full md:w-80 flex flex-col gap-3">
                        {/* Before metric bar */}
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-[11px] font-mono font-bold text-slate-400">
                            <span>Prior Setup ({chartInfo.beforeLabel})</span>
                            <span>Baseline</span>
                          </div>
                          <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
                            <div className="bg-rose-500 h-full rounded" style={{ width: `${chartInfo.percentage}%` }}></div>
                          </div>
                        </div>

                        {/* After metric bar */}
                        <div className="flex flex-col gap-1">
                          <div className="flex justify-between text-[11px] font-mono font-bold text-indigo-600">
                            <span>Receipt Boost ({chartInfo.afterLabel})</span>
                            <span className="font-extrabold">{chartInfo.displayMultiplier}</span>
                          </div>
                          <div className="w-full bg-slate-100 h-3 rounded overflow-hidden">
                            <div className="bg-indigo-600 h-full rounded" style={{ width: "100%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ASSETS PORTFOLIO GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* ASSET 1: X Thread */}
                    <div 
                      onClick={() => openEditModal("xThread")}
                      className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative"
                    >
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded bg-slate-900 text-white">
                              <Twitter className="w-3.5 h-3.5" />
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">𝕏 Native Case Thread</h4>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditModal("xThread"); }}
                              className="text-[10px] text-indigo-600 hover:text-indigo-700 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 rounded transition-all font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" /> Preview & Edit
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCopyText("xThread", generatedResults.xThread.join("\n\n")); }}
                              className={`text-[10px] px-2.5 py-1 rounded transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
                                copiedKey === "xThread" ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
                              }`}
                            >
                              {copiedKey === "xThread" ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Thread Text Preview */}
                        <div className="space-y-3.5 max-h-72 overflow-y-auto pr-2 font-mono text-xs text-slate-600 leading-relaxed">
                          {(generatedResults.xThread || []).map((tweet, i) => (
                            <div key={`tweet-disp-${i}`} className="p-3.5 bg-slate-50 border border-slate-200/60 rounded-lg relative">
                              <span className="absolute right-2.5 top-2.5 text-[9px] text-indigo-600/50 font-extrabold font-sans">Post {i+1}</span>
                              <p className="whitespace-pre-wrap font-sans">{tweet}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-mono font-bold group-hover:text-indigo-650 transition-colors">
                          {(generatedResults.xThread || []).length} stacked tweets · Click to edit
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadSingleAsset("x_thread", (generatedResults.xThread || []).join("\n\n")); }}
                          className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Export .txt
                        </button>
                      </div>
                    </div>

                    {/* ASSET 2: Cold DM Script */}
                    <div 
                      onClick={() => openEditModal("coldDm")}
                      className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded bg-blue-50 text-blue-600 border border-blue-100">
                              <MessageSquare className="w-3.5 h-3.5" />
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Personalized Cold DM</h4>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditModal("coldDm"); }}
                              className="text-[10px] text-indigo-600 hover:text-indigo-700 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 rounded transition-all font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" /> Preview & Edit
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCopyText("coldDm", generatedResults.coldDm); }}
                              className={`text-[10px] px-2.5 py-1 rounded transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
                                copiedKey === "coldDm" ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
                              }`}
                            >
                              {copiedKey === "coldDm" ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* DM Copy Preview */}
                        <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-lg text-sm text-slate-705 leading-relaxed max-h-72 overflow-y-auto pr-2 font-sans font-medium">
                          <p className="whitespace-pre-wrap">{generatedResults.coldDm}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-mono font-bold group-hover:text-indigo-650 transition-colors">
                          {generatedResults.coldDm.split(/\s+/).length} words · Click to edit
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadSingleAsset("cold_dm", generatedResults.coldDm); }}
                          className="text-[10px] text-indigo-605 text-indigo-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Export .txt
                        </button>
                      </div>
                    </div>

                    {/* ASSET 3: Landing Page Blurb */}
                    <div 
                      onClick={() => openEditModal("landingBlurb")}
                      className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded bg-violet-50 text-violet-600 border border-violet-100">
                              <Layers className="w-3.5 h-3.5" />
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Landing Page Module</h4>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditModal("landingBlurb"); }}
                              className="text-[10px] text-indigo-600 hover:text-indigo-700 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 rounded transition-all font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" /> Preview & Edit
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCopyText("landingBlurb", generatedResults.landingBlurb); }}
                              className={`text-[10px] px-2.5 py-1 rounded transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
                                copiedKey === "landingBlurb" ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
                              }`}
                            >
                              {copiedKey === "landingBlurb" ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Landing Page Copy */}
                        <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-lg font-sans text-sm text-slate-705 leading-relaxed max-h-72 overflow-y-auto pr-2 font-medium">
                          <p className="whitespace-pre-wrap leading-relaxed">{generatedResults.landingBlurb}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-mono font-bold group-hover:text-indigo-650 transition-colors">
                          {generatedResults.landingBlurb.split(/\s+/).length} words · Click to edit
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadSingleAsset("landing_blurb", generatedResults.landingBlurb); }}
                          className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Export .txt
                        </button>
                      </div>
                    </div>

                    {/* ASSET 4: Testimonial POV */}
                    <div 
                      onClick={() => openEditModal("testimonial")}
                      className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded bg-amber-50 text-amber-600 border border-amber-100">
                              <Quote className="w-3.5 h-3.5" />
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Client POV Review Card</h4>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditModal("testimonial"); }}
                              className="text-[10px] text-indigo-600 hover:text-indigo-700 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 rounded transition-all font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" /> Preview & Edit
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCopyText("testimonial", `"${generatedResults.testimonial.quote}"\n\n→ Creator insight: ${generatedResults.testimonial.creatorInsight}`); }}
                              className={`text-[10px] px-2.5 py-1 rounded transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
                                copiedKey === "testimonial" ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
                              }`}
                            >
                              {copiedKey === "testimonial" ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Testimonial Copy Display */}
                        <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                          <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-lg">
                            <p className="font-sans italic text-sm text-slate-900 leading-relaxed font-semibold">
                              "{generatedResults.testimonial.quote}"
                            </p>
                          </div>
                          <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg">
                            <span className="text-[10px] uppercase font-bold text-slate-100 block font-sans mb-1">→ Direct Creator Strategy</span>
                            <p className="text-xs text-white font-sans leading-relaxed">
                              {generatedResults.testimonial.creatorInsight}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-sans font-bold group-hover:text-indigo-650 transition-colors">
                          POV narrative format · Click to edit
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadSingleAsset("testimonial", `"${generatedResults.testimonial.quote}"\n\n→ Creator insight: ${generatedResults.testimonial.creatorInsight}`); }}
                          className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Export .txt
                        </button>
                      </div>
                    </div>

                    {/* ASSET 5: LinkedIn Outreach Conversion Post */}
                    <div 
                      onClick={() => openEditModal("linkedinPost" as any)}
                      className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded bg-blue-600 text-white flex items-center justify-center">
                              <Linkedin className="w-3.5 h-3.5" />
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">LinkedIn Authority Article</h4>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => { e.stopPropagation(); openEditModal("linkedinPost" as any); }}
                              className="text-[10px] text-indigo-600 hover:text-indigo-700 border border-slate-200 bg-white hover:bg-slate-50 px-2.5 py-1 rounded transition-all font-bold flex items-center gap-1 cursor-pointer shadow-xs"
                            >
                              <Edit3 className="w-3 h-3" /> Preview & Edit
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); handleCopyText("linkedinPost", generatedResults.linkedinPost || ""); }}
                              className={`text-[10px] px-2.5 py-1 rounded transition-all font-bold cursor-pointer flex items-center gap-1.5 ${
                                copiedKey === "linkedinPost" ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "text-slate-600 hover:text-slate-900 border border-slate-200 bg-white"
                              }`}
                            >
                              {copiedKey === "linkedinPost" ? (
                                <>
                                  <Check className="w-3.5 h-3.5" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>

                        {/* LinkedIn copy content layout display */}
                        <div className="p-4 bg-sky-50/20 border border-sky-100 rounded-lg text-slate-800 font-sans text-xs leading-relaxed max-h-72 overflow-y-auto pr-2">
                          <p className="whitespace-pre-wrap font-medium">{generatedResults.linkedinPost || "High conversion LinkedIn post is loading..."}</p>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] text-slate-500 font-sans font-bold group-hover:text-indigo-650 transition-colors">
                          {(generatedResults.linkedinPost || "").split(/\s+/).length} words · Click to edit
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDownloadSingleAsset("linkedin_post", generatedResults.linkedinPost || ""); }}
                          className="text-[10px] text-indigo-600 hover:underline flex items-center gap-1 font-bold cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Export .txt
                        </button>
                      </div>
                    </div>

                    {/* ASSET 6: Social Review rating Graphic card */}
                    <div 
                      onClick={() => openEditModal("reviewRatingAsset" as any)}
                      className="bg-white border border-slate-200 hover:border-indigo-400 rounded-xl p-5 md:p-6 shadow-sm flex flex-col justify-between group transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 relative overflow-hidden"
                    >
                      <div>
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                          <div className="flex items-center gap-2">
                            <span className="p-1.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center">
                              <Star className="w-3.5 h-3.5 fill-emerald-550 fill-current" />
                            </span>
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Shareable Social Proof Plate</h4>
                          </div>
                          
                          <button
                            onClick={(e) => { 
                              e.stopPropagation(); 
                              handleCopyText("socialShareTeaser", generatedResults.reviewRatingAsset?.socialShareTeaser || "");
                            }}
                            className={`text-[10px] px-2.5 py-1.5 rounded transition-all font-bold cursor-pointer flex items-center gap-1.5 border ${
                              copiedKey === "socialShareTeaser" ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "text-slate-600 hover:text-slate-900 border-slate-200 bg-white"
                            }`}
                          >
                            <Share2 className="w-3 h-3" />
                            <span>{copiedKey === "socialShareTeaser" ? "Teaser Copied!" : "X Auto Post Copy"}</span>
                          </button>
                        </div>

                        {/* Interactive Premium TrustPilot graphic Mockup */}
                        {generatedResults.reviewRatingAsset ? (
                          <>
                            <div id="social-proof-plate" className="p-5 rounded-xl bg-slate-950 text-white select-none relative shadow-lg">
                              
                              {/* Five stars header */}
                              <div className="flex items-center justify-between mb-3.5 border-b border-slate-800 pb-2.5">
                                <div className="flex items-center gap-1 text-amber-500">
                                  {[...Array(Math.floor(generatedResults.reviewRatingAsset.overallRating || 5))].map((_, i) => (
                                    <Star key={`star-${i}`} className="w-4 h-4 fill-current text-amber-400" />
                                  ))}
                                  <span className="text-xs font-mono font-bold text-slate-300 ml-1.5">({generatedResults.reviewRatingAsset.overallRating}/5)</span>
                                </div>
                                <span className="text-[9px] uppercase font-mono tracking-wider text-slate-400 font-extrabold bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">Verified Client Hub</span>
                              </div>

                              {/* Title review copy */}
                              <h5 className="text-[13px] font-extrabold text-white mb-2 leading-snug font-sans italic">
                                "{generatedResults.reviewRatingAsset.title}"
                              </h5>
                              <p className="text-xs text-slate-300 leading-relaxed line-clamp-3 mb-4 font-normal">
                                "{generatedResults.reviewRatingAsset.body}"
                              </p>

                              {/* Gauges list */}
                              <div className="space-y-2 border-t border-slate-800/85 pt-3.5 mb-2.5">
                                {(generatedResults.reviewRatingAsset.metrics || []).map((m: any, idx: number) => (
                                  <div key={`view-metric-${idx}`} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[9px] font-mono font-extrabold uppercase tracking-wide text-slate-450">
                                      <span>{m.label}</span>
                                      <span className="text-emerald-450 font-black">{m.score}/10</span>
                                    </div>
                                    <div className="w-full bg-slate-850 h-1.5 rounded-full overflow-hidden">
                                      <div className="bg-emerald-500 h-full rounded" style={{ width: `${m.score * 10}%` }} />
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {/* User details footer */}
                              <div className="flex items-center gap-2.5 border-t border-slate-850 pt-3 mt-3">
                                <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-[10px] font-black uppercase text-white shadow-xs overflow-hidden">
                                  {(generatedResults.reviewRatingAsset.authorName || "JD").substring(0, 2)}
                                </div>
                                <div className="leading-tight">
                                  <p className="text-[11px] font-bold text-white mb-0.5">{generatedResults.reviewRatingAsset.authorName}</p>
                                  <p className="text-[9px] text-slate-400 font-mono font-semibold">{generatedResults.reviewRatingAsset.authorDesignation}</p>
                                </div>
                              </div>

                            </div>
                            
                            <button
                              onClick={(e) => { e.stopPropagation(); handleDownloadProofPlate(); }}
                              className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-[11px] uppercase tracking-wider py-2.5 px-4 rounded-lg transition-all cursor-pointer shadow-sm flex items-center justify-center gap-1.5 font-sans"
                            >
                              <Download className="w-3.5 h-3.5" /> Download Review as PNG
                            </button>
                          </>
                        ) : (
                          <div className="p-8 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-400">
                            Custom visual rating widget outline loading...
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-500">
                        <span>⭐ Star Rating design with interactive gauges</span>
                        <span className="text-indigo-650 font-bold">X Layout Frame</span>
                      </div>
                    </div>

                  </div>

                  {/* Curated AI Posting Tips Box (Tailored to Case Study!) */}
                  <section className="bg-indigo-50/10 border border-indigo-100/60 rounded-xl overflow-hidden shadow-sm mt-3.5">
                    <div className="bg-indigo-50/40 border-b border-indigo-100/60 px-5 py-3.5 flex items-center gap-2 select-none">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse"></span>
                      <h4 className="text-xs uppercase tracking-wider text-indigo-900 font-black">
                        💡 Curated AI Posting Tips Bar — calibrated for {creatorName}
                      </h4>
                    </div>
                    <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(generatedResults.postingTips || []).map((tip, idx) => {
                        const colonIdx = tip.indexOf(":");
                        const hasColon = colonIdx !== -1;
                        return (
                          <div key={`tip-${idx}`} className="flex gap-3 bg-white border border-indigo-100/40 p-4 rounded-xl items-start shadow-xs shadow-indigo-900/[0.01]">
                            <span className="font-sans font-black text-xl text-indigo-600 leading-none">{idx + 1}</span>
                            <p className="text-xs text-slate-805 text-slate-800 dark:text-slate-100 leading-relaxed font-semibold">
                              {hasColon ? (
                                <>
                                  <strong className="text-slate-900 dark:text-white font-extrabold">{tip.substring(0, colonIdx + 1)}</strong>
                                  {tip.substring(colonIdx + 1)}
                                </>
                              ) : tip}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  {/* Live-Updating Insights & Process Another Win Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mt-6">
                    
                    {/* Live Copywriting Insights Ticker (2/3 cols) */}
                    <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 md:p-6 flex flex-col justify-between relative overflow-hidden group shadow-sm text-white">
                      
                      {/* Subtly animated decorative background glow */}
                      <div className="absolute top-0 right-0 w-36 h-36 bg-indigo-600/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />
                      
                      <div>
                        {/* Header Info */}
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                          <div className="flex items-center gap-2 select-none">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">Live Copywriting Insights</span>
                          </div>
                          
                          <button 
                            onClick={() => setFactIndex((prev) => (prev + 1) % CONVERSION_FACTS.length)}
                            className="text-[10px] font-bold text-indigo-400 hover:text-white bg-slate-850 hover:bg-slate-800 border border-slate-750 px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1.5"
                          >
                            <RefreshCw className="w-2.5 h-2.5" /> Next Fact
                          </button>
                        </div>

                        {/* Fact Body with animation trigger key to force re-render/smooth state fade */}
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center min-h-[56px]">
                          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono font-extrabold text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-center">
                            {CONVERSION_FACTS[factIndex].metric}
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                            {CONVERSION_FACTS[factIndex].fact}
                          </p>
                        </div>
                      </div>

                      {/* Fact Footer */}
                      <div className="mt-4 pt-3 border-t border-slate-800/50 flex justify-between items-center text-[10px] text-slate-500 font-mono select-none">
                        <span>Source: <strong className="text-slate-400">{CONVERSION_FACTS[factIndex].source}</strong></span>
                        <span>Auto-cycles every 8s</span>
                      </div>
                    </div>

                    {/* "Process Another Win" Action Block (1/3 cols) */}
                    <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 border border-indigo-850 text-white rounded-xl p-5 md:p-6 flex flex-col justify-between gap-4 shadow-sm items-start">
                      <div>
                        <h4 className="text-xs font-extrabold uppercase tracking-widest text-indigo-300">Continuous Growth</h4>
                        <p className="text-[11px] text-indigo-200/90 leading-relaxed mt-2">
                          Ready to turn your next client milestone or campaign breakthrough into high-performing conversion copy?
                        </p>
                      </div>
                      <button
                        onClick={() => handleResetForm()}
                        className="w-full bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 text-slate-900 font-extrabold text-xs uppercase tracking-wider py-3.5 px-4 rounded-lg transition-all cursor-pointer shadow-md hover:shadow-lg flex items-center justify-center gap-1.5 group font-sans border border-purple-200"
                      >
                        Process Another Win
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                  </div>

                </motion.div>
              )}

            </div>
          )}

        </div>
        </>
        )}

        {workspaceTab === "myAssets" && (
          <VaultAndAnalyticsBoard 
            logs={assetLogs}
            onDeleteLog={(id) => {
              const updated = assetLogs.filter(l => l.id !== id);
              setAssetLogs(updated);
              localStorage.setItem("receipts_generation_logs", JSON.stringify(updated));
            }}
            onSelectHistoricalResult={(assets) => {
              setGeneratedResults(assets);
              setStatus("success");
              setWorkspaceTab("builder");
            }}
          />
        )}

      </div>

      {/* FOOTER */}
      <footer className="mt-16 py-8 border-t border-slate-200 bg-white text-center text-xs text-slate-500 flex flex-col items-center gap-2 select-none">
        <p>© 2026 Receipts AI. Designed as a specialist tool for conversion copywriters. Powered by Gemini Pro models.</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowAboutPage(true)}
            className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors cursor-pointer"
          >
            ℹ️ About Receipts (Manifesto)
          </button>
          <span className="text-slate-300">|</span>
          <a
            href="https://www.linkedin.com/in/jagriti-thakur/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 hover:text-indigo-700 font-bold transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Linkedin className="w-3.5 h-3.5" /> Connect on LinkedIn
          </a>
        </div>
      </footer>

      {/* --- THE MASTER EDITING MODAL WINDOW (PREVIEW & EDIT) --- */}
      <AnimatePresence>
        {editingAssetKey && generatedResults && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl w-full max-w-5.5xl h-[85vh] flex flex-col shadow-xl overflow-hidden"
            >
              
              {/* Modal header */}
              <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between select-none">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-slate-900 text-white flex items-center justify-center">
                    <Edit3 className="w-3.5 h-3.5" />
                  </span>
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">
                    Editing Asset: {editingAssetKey === "xThread" ? "𝕏 Native Thread Framework" : editingAssetKey === "coldDm" ? "Cold DM Sequence" : editingAssetKey === "landingBlurb" ? "Landing Page Proof Block" : editingAssetKey === "linkedinPost" ? "Premium LinkedIn Post Asset" : (editingAssetKey as string) === "reviewRatingAsset" ? "Visual Client Review Board" : "Client POV Testimonial"}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingAssetKey(null)}
                  className="text-slate-500 hover:text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 p-1.5 rounded-lg transition-all cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal body (Vitals split: Editor vs Live Mockup Preview) */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                
                {/* Left side: Interactive Editor */}
                <div className="p-5 border-r border-slate-200 flex flex-col gap-4 overflow-y-auto w-full">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-extrabold">Copywriting Editor Zone</span>
                    
                    {editingAssetKey === "xThread" && (
                      <span className="text-[10px] text-slate-500 italic font-mono">
                        Note: Separate tweets with <strong className="text-indigo-600">---</strong> on a new line.
                      </span>
                    )}
                  </div>

                  {editingAssetKey === "testimonial" ? (
                    <div className="flex-1 flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-xs font-bold text-slate-705 text-slate-700 uppercase tracking-wider block">1. Client POV Quote Narrative</label>
                        <textarea
                          value={tempQuote}
                          onChange={(e) => setTempQuote(e.target.value)}
                          rows={6}
                          className="w-full flex-1 bg-slate-50 border border-slate-200 p-4 text-xs font-sans text-slate-900 leading-relaxed rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white resize-none"
                          placeholder="Client story POV statement..."
                        />
                      </div>
                      <div className="flex flex-col gap-1.5 flex-1">
                        <label className="text-xs font-bold text-slate-705 text-slate-700 uppercase tracking-wider block">2. Behind-The-Scenes Strategy Takeaway</label>
                        <textarea
                          value={tempInsight}
                          onChange={(e) => setTempInsight(e.target.value)}
                          rows={6}
                          className="w-full flex-1 bg-slate-50 border border-slate-200 p-4 text-xs font-sans text-slate-900 leading-relaxed rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white resize-none"
                          placeholder="Behind-the-scenes creator strategy insight..."
                        />
                      </div>
                    </div>
                  ) : (editingAssetKey as string) === "reviewRatingAsset" ? (
                    <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1">
                      <span className="text-[10px] text-indigo-600 tracking-wider font-extrabold uppercase font-mono">Dynamic Core Visual Editor</span>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Author Name</label>
                          <input
                            type="text"
                            value={tempReviewAuthorName}
                            onChange={(e) => setTempReviewAuthorName(e.target.value)}
                            className="bg-slate-50 border border-slate-200 p-2 text-xs font-sans text-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Author Title</label>
                          <input
                            type="text"
                            value={tempReviewAuthorDesignation}
                            onChange={(e) => setTempReviewAuthorDesignation(e.target.value)}
                            className="bg-slate-50 border border-slate-200 p-2 text-xs font-sans text-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Trust Value (1-5 Stars)</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            step="0.1"
                            value={tempReviewRating}
                            onChange={(e) => setTempReviewRating(parseFloat(e.target.value) || 5)}
                            className="bg-slate-50 border border-slate-200 p-2 text-xs font-mono text-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Feature Header Title</label>
                          <input
                            type="text"
                            value={tempReviewTitle}
                            onChange={(e) => setTempReviewTitle(e.target.value)}
                            className="bg-slate-50 border border-slate-200 p-2 text-xs font-sans text-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 font-bold"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Review Narrative (Full Body)</label>
                        <textarea
                          rows={3}
                          value={tempReviewBody}
                          onChange={(e) => setTempReviewBody(e.target.value)}
                          className="bg-slate-50 border border-slate-200 p-3 text-xs font-sans text-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 resize-none font-medium leading-relaxed"
                        />
                      </div>

                      <div className="flex flex-col gap-1.5 font-sans">
                        <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Verified Performance Indicators (1-10)</label>
                        <div className="space-y-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                          {tempReviewMetrics.map((m, idx) => (
                            <div key={`edit-metric-${idx}`} className="flex gap-2 items-center justify-between">
                              <span className="text-[10px] font-bold text-slate-600 block min-w-[130px]">{m.label}:</span>
                              <input
                                type="range"
                                min="1"
                                max="10"
                                step="1"
                                value={m.score}
                                onChange={(e) => {
                                  const updatedMetrics = [...tempReviewMetrics];
                                  updatedMetrics[idx].score = parseInt(e.target.value, 10);
                                  setTempReviewMetrics(updatedMetrics);
                                }}
                                className="flex-1 accent-indigo-600 h-1 cursor-pointer bg-slate-300 rounded"
                              />
                              <span className="text-xs font-mono font-bold text-indigo-600 min-w-[20px] text-right">{m.score}/10</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[10px] uppercase font-extrabold text-slate-400 font-mono">Social Sharing Teaser Quote</label>
                        <textarea
                          rows={2}
                          value={tempReviewTeaser}
                          onChange={(e) => setTempReviewTeaser(e.target.value)}
                          className="bg-slate-50 border border-slate-200 p-2 text-xs font-sans text-slate-900 rounded-lg focus:outline-none focus:border-indigo-500 resize-none font-medium"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex flex-col gap-2.5">
                      {editingAssetKey === "linkedinPost" && (
                        <div className="flex flex-wrap items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                          <span className="text-[10px] font-bold text-slate-500 mr-1.5 uppercase tracking-wide font-mono">Format Toolbar:</span>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("bold")}
                            className="p-1 px-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 rounded text-[10px] font-extrabold text-slate-700 hover:text-indigo-600 transition-colors cursor-pointer"
                            title="Wrap selected text in **bold** tags"
                          >
                            **B** Bold Tags
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("bold_unicode")}
                            className="p-1 px-2.5 bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-350 rounded text-[10px] font-black text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                            title="Convert selection to Unicode Bold (Native LinkedIn feed look!)"
                          >
                            𝘁𝗵𝗶𝘀 Bold Unicode
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("bullet")}
                            className="p-1 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-700 cursor-pointer"
                            title="Prepend • to each line"
                          >
                            • Bullet
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("arrow_bullet")}
                            className="p-1 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-705 cursor-pointer"
                            title="Prepend ➥ to each line"
                          >
                            ➥ Arrow
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("check_bullet")}
                            className="p-1 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-705 cursor-pointer"
                            title="Prepend ✓ to each line"
                          >
                            ✓ Check
                          </button>
                          <div className="h-4 w-px bg-slate-200 mx-1"></div>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("header_1")}
                            className="p-1 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-800 cursor-pointer"
                            title="Wrap in 📌 Header"
                          >
                            📌 H1
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("header_2")}
                            className="p-1 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-800 cursor-pointer"
                            title="Wrap in 🚀 Header"
                          >
                            🚀 H2
                          </button>
                          <button
                            type="button"
                            onClick={() => handleApplyLinkedInFormatting("header_border")}
                            className="p-1 px-2 bg-white hover:bg-slate-100 border border-slate-200 rounded text-[10px] font-bold text-slate-800 cursor-pointer"
                            title="━━━ HEADER ━━━"
                          >
                            ━━ Banner
                          </button>
                        </div>
                      )}
                      
                      <textarea
                        id={editingAssetKey === "linkedinPost" ? "linkedin-textarea-editor" : "standard-textarea-editor"}
                        value={tempEditedText}
                        onChange={(e) => setTempEditedText(e.target.value)}
                        rows={15}
                        className="flex-1 bg-slate-50 border border-slate-200 p-4 text-xs font-mono text-slate-900 leading-relaxed rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white resize-none overflow-y-auto"
                        placeholder="Enter your customized copy text here..."
                      />
                    </div>
                  )}

                  {/* Word count block */}
                  <div className="bg-slate-50 border border-slate-200 py-2.5 px-3.5 rounded-lg flex items-center justify-between text-[11px] text-slate-500 font-bold font-mono">
                    {editingAssetKey === "testimonial" ? (
                      <span>Combined Length: <strong>{(tempQuote.split(/\s+/).filter(Boolean).length) + (tempInsight.split(/\s+/).filter(Boolean).length)}</strong> words</span>
                    ) : (editingAssetKey as string) === "reviewRatingAsset" ? (
                      <span>Overall Score: <strong>{tempReviewRating.toFixed(1)} / 5.0 Stars</strong></span>
                    ) : (
                      <span>Length: <strong>{tempEditedText.split(/\s+/).filter(Boolean).length}</strong> words</span>
                    )}
                    {editingAssetKey === "testimonial" ? (
                      <span>Characters: <strong>{tempQuote.length + tempInsight.length}</strong></span>
                    ) : (editingAssetKey as string) === "reviewRatingAsset" ? (
                      <span>Indicators: <strong>{tempReviewMetrics.length}</strong></span>
                    ) : (
                      <span>Characters: <strong>{tempEditedText.length}</strong></span>
                    )}
                  </div>

                </div>

                {/* Right side: Stunning live visual mockup preview screen */}
                <div className="p-5 bg-slate-100 flex flex-col gap-4 overflow-y-auto">
                  <span className="text-[10px] text-indigo-600 tracking-wider font-extrabold uppercase">
                    🚀 Live Device Render Mockup
                  </span>

                  {/* Mockup Render: Twitter/X Stack */}
                  {editingAssetKey === "xThread" && (
                    <div className="flex-1 flex flex-col gap-3 min-h-[300px]">
                      
                      {/* Tweet Selection Index bar */}
                      <div className="flex gap-1 overflow-x-auto pb-1.5 border-b border-slate-200">
                        {tempEditedText.split(/\n+---\n+/).filter(Boolean).map((_, idx) => (
                          <button
                            key={`btn-tweet-${idx}`}
                            onClick={() => setActiveXTweetIndex(idx)}
                            className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                              activeXTweetIndex === idx ? "bg-indigo-650 bg-indigo-600 text-white" : "bg-white text-slate-500 border border-slate-200 hover:text-slate-755"
                            }`}
                          >
                            Post {idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Display Selected Tweet in Stunning Twitter UI template! */}
                      {(() => {
                        const tweets = tempEditedText.split(/\n+---\n+/).filter(Boolean);
                        const tweetText = tweets[activeXTweetIndex] || tweets[0] || "(Empty)";
                        const cleanHandle = (creatorName || "").replace(/\s+/g, "").toLowerCase();

                        return (
                          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
                            {/* Header row */}
                            <div className="flex items-center gap-3 mb-3 select-none">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-700 flex items-center justify-center text-white font-extrabold text-sm border border-slate-105">
                                {creatorName.charAt(0) || "C"}
                              </div>
                              <div className="leading-tight">
                                <span className="font-bold text-sm text-slate-900 hover:underline flex items-center gap-1">
                                  {creatorName || "Your Brand"}
                                  <span className="w-3.5 h-3.5 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[8px] font-sans font-extrabold" title="Verified Creator">✓</span>
                                </span>
                                <span className="text-[11px] text-slate-400 font-medium">@{cleanHandle || "brand"}</span>
                              </div>
                            </div>
                            
                            {/* Tweet body */}
                            <p className="whitespace-pre-wrap text-sm text-slate-800 leading-relaxed break-words font-sans">
                              {tweetText}
                            </p>

                            {/* Timestamp Mock */}
                            <div className="mt-4 pt-3.5 border-t border-slate-100 text-[11px] text-slate-400 select-none font-mono">
                              6:42 PM · May 19, 2026 · <strong className="text-slate-700">5.8K</strong> Views
                            </div>

                            {/* Tweet Metrics bar */}
                            <div className="mt-2.5 flex justify-between text-slate-400 text-xs pt-2 border-t border-slate-100 select-none font-sans">
                              <span>💬 12</span>
                              <span>🔁 43</span>
                              <span>❤️ 192</span>
                              <span>🔖 88</span>
                            </div>
                          </div>
                        );
                      })()}

                      <span className="text-[10px] text-slate-400 text-center italic mt-auto font-mono">
                        Edits sync inside mockup instantly. Use (---) on its own line to add a split.
                      </span>

                    </div>
                  )}

                  {/* Mockup Render: Cold DM Bubbles */}
                  {editingAssetKey === "coldDm" && (
                    <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                        
                        {/* Target head bar */}
                        <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                            P
                          </div>
                          <div>
                            <span className="block text-xs font-bold text-slate-900">Ideal Client Prospect</span>
                            <span className="text-[9px] text-emerald-600 font-bold">Active now</span>
                          </div>
                        </div>

                        {/* Speech body */}
                        <div className="p-4 flex flex-col gap-4 h-[250px] justify-end bg-slate-50">
                          <div className="self-end bg-indigo-600 text-white text-xs px-3.5 py-2.5 rounded-tl-xl rounded-tr-xl rounded-bl-xl max-w-[85%] whitespace-pre-wrap leading-relaxed font-sans shadow-xs">
                            {tempEditedText}
                          </div>
                          <span className="text-[9px] text-slate-400 text-right font-mono self-end">Delivered</span>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* Mockup Render: Landing Page Blurb Component */}
                  {editingAssetKey === "landingBlurb" && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="bg-white text-slate-900 p-6 rounded-2xl max-w-md shadow-sm border border-slate-200 relative overflow-hidden font-sans">
                        <div className="absolute top-0 left-0 right-0 h-[6px] bg-indigo-650 bg-indigo-600"></div>
                        <span className="font-mono text-[9px] text-slate-400 tracking-widest uppercase font-extrabold block mb-1">What our system accomplished</span>
                        <h4 className="text-xl font-bold text-slate-950 mb-3">Case Outcome Snapshot</h4>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap leading-relaxed">
                          {tempEditedText}
                        </p>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                          <span>Validated by Receipts AI</span>
                          <span className="text-indigo-600">★ Verified proof</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mockup Render: Testimonial POV */}
                  {editingAssetKey === "testimonial" && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full flex flex-col gap-4 font-sans text-slate-900">
                        <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-xs relative">
                          <span className="text-6xl text-indigo-100 font-serif absolute left-2 top-2 select-none">“</span>
                          <p className="italic text-sm text-slate-800 relative z-10 leading-relaxed pt-2 font-semibold whitespace-pre-wrap">
                            {tempQuote || "Testimonial text placeholder..."}
                          </p>
                          <div className="mt-4 flex items-center gap-2 select-none">
                            <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] text-slate-600 font-bold">
                              C
                            </span>
                            <span className="text-[11px] text-slate-500 font-bold">Verified Customer Review</span>
                          </div>
                        </div>

                        {tempInsight && (
                          <div className="bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-700 block">Strategic Insight Takeaway</span>
                            <p className="text-xs text-slate-600 leading-relaxed mt-1 whitespace-pre-wrap">
                              {tempInsight}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Mockup Render: Premium LinkedIn Post Card */}
                  {editingAssetKey === "linkedinPost" && (
                    <div className="flex-1 flex flex-col justify-center w-full">
                      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm font-sans text-slate-900 max-w-lg mx-auto w-full text-left">
                        {/* LinkedIn Header */}
                        <div className="flex items-center gap-3 mb-4 select-none">
                          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-700 flex items-center justify-center text-white font-extrabold text-sm border">
                            {creatorName ? creatorName.substring(0, 2).toUpperCase() : "JT"}
                          </div>
                          <div className="leading-tight">
                            <span className="font-extrabold text-xs text-slate-900 hover:underline flex items-center gap-1 cursor-pointer">
                              {creatorName || "Jagriti Thakur"}
                              <span className="text-[10px] text-blue-600 font-extrabold" title="Verified Professional">🏆 1st</span>
                            </span>
                            <span className="text-[10px] text-slate-500 block">Lead Architect & Copy Consultant · 2w · Edited</span>
                          </div>
                        </div>

                        {/* LinkedIn Post Text Body with markdown bold format conversions */}
                        <p className="text-xs text-slate-800 leading-relaxed whitespace-pre-wrap break-words font-sans">
                          {(() => {
                            const parts = tempEditedText.split(/(\*\*[^*]+\*\*)/g);
                            return parts.map((part, i) => {
                              if (part.startsWith("**") && part.endsWith("**")) {
                                return <strong key={`part-strong-${i}`} className="font-extrabold text-indigo-700">{part.slice(2, -2)}</strong>;
                              }
                              return <span key={`part-span-${i}`}>{part}</span>;
                            });
                          })()}
                        </p>

                        {/* Social Interactions mock */}
                        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 select-none font-bold font-mono">
                          <span>❤️ 1,230 Likes · 💬 142 Comments</span>
                          <span className="text-blue-600">✦ Verified Asset</span>
                        </div>
                        
                        {/* LinkedIn native action bar mock */}
                        <div className="mt-2.5 pt-2 border-t border-slate-100 flex justify-between text-slate-500 text-[11px] font-bold select-none px-2 font-sans overflow-hidden">
                          <span className="hover:text-blue-600 cursor-pointer">👍 Like</span>
                          <span className="hover:text-blue-600 cursor-pointer">💬 Comment</span>
                          <span className="hover:text-blue-600 cursor-pointer">🔁 Repost</span>
                          <span className="hover:text-blue-600 cursor-pointer">📤 Send</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Mockup Render: Custom Review & Ratings visual card */}
                  {editingAssetKey === "reviewRatingAsset" && (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full max-w-md bg-slate-950 text-white rounded-2xl p-6 shadow-xl border border-slate-850 relative overflow-hidden font-sans text-left">
                        
                        {/* Glowing backdrop circle */}
                        <div className="absolute right-[-40px] top-[-30px] w-40 h-40 bg-indigo-500/10 blur-3xl rounded-full"></div>
                        
                        {/* Overall star rating & Trust emblem */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-[10px] font-mono font-black uppercase text-indigo-400 tracking-widest block mb-0.5">Verified Case Success Review</span>
                            <div className="flex items-center gap-1 mt-1">
                              {/* Calculate dynamic star representation */}
                              {(() => {
                                const stars = [];
                                const roundedRating = Math.round(tempReviewRating);
                                for (let i = 1; i <= 5; i++) {
                                  stars.push(
                                    <span key={`prev-star-${i}`} className={`text-sm ${i <= roundedRating ? "text-amber-400" : "text-slate-700"}`}>★</span>
                                  );
                                }
                                return stars;
                              })()}
                              <span className="text-[11px] font-bold font-mono text-slate-300 ml-1.5 font-sans">({tempReviewRating.toFixed(1)}/5.0)</span>
                            </div>
                          </div>
                          
                          <div className="bg-indigo-600/35 border border-indigo-500/30 px-3 py-1 rounded-full text-[9px] uppercase font-mono font-bold text-indigo-300 flex items-center gap-1 select-none">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span>MFA Verified Proof</span>
                          </div>
                        </div>

                        {/* Custom Title heading */}
                        <h4 className="text-sm font-black text-slate-100 tracking-tight leading-snug mt-1 italic">
                          "{tempReviewTitle || "Outstanding Campaign Performance!"}"
                        </h4>

                        {/* Review Body */}
                        <p className="text-[11px] text-slate-400 mt-2 leading-relaxed whitespace-pre-wrap italic leading-relaxed">
                          "{tempReviewBody || "Highly strategic execution..."}"
                        </p>

                        {/* Live Metrical scores block */}
                        {tempReviewMetrics && tempReviewMetrics.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-slate-800 space-y-2">
                            <span className="text-[9px] uppercase tracking-wider text-slate-500 font-extrabold block mb-1">Metrical Performance Ratios</span>
                            {tempReviewMetrics.map((metric, idx) => (
                              <div key={`disp-metric-${idx}`} className="space-y-1">
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="text-slate-400 font-bold">{metric.label}</span>
                                  <span className="text-indigo-400 font-bold font-mono">{metric.score} / 10</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                                  <div 
                                    className="bg-indigo-500 h-full rounded-full"
                                    style={{ width: `${metric.score * 10}%` }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Profile Info Row */}
                        <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-850 to-slate-705 bg-slate-800 border border-slate-750 flex items-center justify-center text-[10px] font-black uppercase text-indigo-400 select-none">
                              {tempReviewAuthorName ? tempReviewAuthorName.substring(0, 2).toUpperCase() : "JT"}
                            </div>
                            <div className="leading-tight">
                              <span className="text-[11px] font-extrabold text-slate-200 block">{tempReviewAuthorName || "John Doe"}</span>
                              <span className="text-[9px] text-slate-500 block font-medium">{tempReviewAuthorDesignation || "Growth Lead"}</span>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-[9px] font-mono font-bold text-slate-500 block uppercase">Outreach Response</span>
                            <span className="text-[11px] font-mono font-black text-emerald-400">14.2% Boost Rate</span>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                </div>

              </div>

              {/* Modal footer actions */}
              <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between select-none">
                <button
                  onClick={() => handleDownloadSingleAsset(editingAssetKey, tempEditedText)}
                  className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-705 text-slate-700 px-4 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors uppercase tracking-wider cursor-pointer shadow-xs"
                >
                  <Download className="w-4 h-4" /> Download Text (.txt)
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingAssetKey(null)}
                    className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                  >
                    Discard Edits
                  </button>
                  <button
                    onClick={handleSaveModalChanges}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 text-xs font-extrabold rounded-lg uppercase tracking-wider transition-all shadow-md cursor-pointer"
                  >
                    Save & Apply Changes
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}

        {/* Dynamic Gumroad Monetization Paywall Modal */}
        {isPaywallOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full shadow-2xl overflow-y-auto max-h-[85vh] font-sans text-slate-850 dark:text-slate-100 flex flex-col"
            >
              {/* Premium Branding Header */}
              <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white px-6 py-6 text-center relative overflow-hidden shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />
                <div className="w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-extrabold tracking-tight">Unlock Lifetime Pro Version</h3>
                <p className="text-xs font-semibold text-indigo-200/90 mt-1 max-w-sm mx-auto leading-relaxed">
                  Unlock unlimited receipt designs and high-performing copy edits for a one-time payment of $15.
                </p>
              </div>
              
              {/* Paywall body - no nested scroll scroll lockouts */}
              <div className="p-5 space-y-5 bg-slate-50 dark:bg-slate-950/40">
                
                {/* Benefits grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-1">
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs bg-indigo-50 dark:bg-indigo-950/50 leading-none p-1 rounded select-none">✓</span>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100">Infinite Social Proofs</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">Generate threads, cold DM scripts, and landing page blurbs without caps.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs bg-indigo-50 dark:bg-indigo-950/50 leading-none p-1 rounded select-none">✓</span>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100">Unlimited Custom Tones</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">Save custom brand guidelines, lingo, and industry keywords.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs bg-indigo-50 dark:bg-indigo-950/50 leading-none p-1 rounded select-none">✓</span>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100">Premium HTML Mockups</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">Surgically edit generated results inside device viewports.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold text-xs bg-indigo-50 dark:bg-indigo-950/50 leading-none p-1 rounded select-none">✓</span>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-900 dark:text-slate-100">Priority AI Inference</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal">Run lightning-fast calibrations using dedicated high-speed lanes.</p>
                    </div>
                  </div>
                </div>

                {/* Gumroad Action CTA */}
                <div className="pt-1 select-none space-y-2">
                  <a
                    href={gumroadProductUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    onClick={() => {
                      setHasClickedClaimReceipts(true);
                      localStorage.setItem("receipts_clicked_claim", "true");
                    }}
                    className="w-full bg-slate-900 dark:bg-indigo-600 hover:bg-slate-850 dark:hover:bg-indigo-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 rounded-xl shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-1.5 group cursor-pointer"
                  >
                    <span>Claim my Receipts</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 text-center leading-relaxed px-1">
                    ⚠️ <strong className="font-bold text-slate-700 dark:text-slate-200">Important Note:</strong> Please use your registered email ID <code className="font-mono bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded text-indigo-700 dark:text-indigo-300 font-bold">{currentUser?.email || "the one you signed in with"}</code> to make the purchase, as this automatic synchronization system cross-verifies purchaser records to activate your Lifetime Pro status instantly.
                  </p>
                </div>

                {/* Verification Field Form */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
                  
                  {/* Status Indicator Bar */}
                  <div className="flex justify-between items-center bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
                    <div className="text-left">
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-400">Payment Status</p>
                      <p className="text-xs font-bold text-slate-800 dark:text-slate-100">
                        {isPurchaseDetected ? "✅ Purchase Verified" : "⏳ Pending Verification"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={checkPurchaseStatus}
                      disabled={isCheckingPurchase}
                      className="text-[10px] font-bold uppercase bg-indigo-50 hover:bg-indigo-100 border border-indigo-150 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/60 transition-all px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3 h-3 ${isCheckingPurchase ? 'animate-spin' : ''}`} />
                      <span>{isCheckingPurchase ? 'Searching...' : 'Sync Pro Status'}</span>
                    </button>
                  </div>

                  {/* Auto-sync Option (Simplified and Clean with no tech lingo) */}
                  <div className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                    isAutoVerifyEnabled 
                      ? "bg-indigo-50/60 dark:bg-indigo-950/25 border-indigo-200/50 dark:border-indigo-900/40" 
                      : "bg-slate-100/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800"
                  }`}>
                    <div className="flex-1 pr-3 text-left">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[11px] font-bold text-slate-800 dark:text-slate-100">Restore Pro Workspace on Login</span>
                        {!isPurchaseDetected && (
                          <span className="text-[8px] font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-400 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                            🔒 Available after purchase
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                        Keep your premium assets and custom generation settings automatically synchronized across all your devices.
                      </p>
                    </div>
                    <button
                      type="button"
                      disabled={!isPurchaseDetected}
                      onClick={() => {
                        const nextVal = !isAutoVerifyEnabled;
                        setIsAutoVerifyEnabled(nextVal);
                        localStorage.setItem("receipts_auto_verify", nextVal ? "true" : "false");
                      }}
                      className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden ${
                        !isPurchaseDetected ? "opacity-30 cursor-not-allowed bg-slate-300 dark:bg-slate-800" : isAutoVerifyEnabled ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-xs transition duration-205 ease-in-out ${
                          isAutoVerifyEnabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Activate Purchased License Key */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-500 dark:text-slate-400">
                      Activate Purchased License Key:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        disabled={false}
                        placeholder="Enter 8-Character Key (e.g. ABCDEFGH)"
                        value={tempLicenseInput}
                        onChange={(e) => setTempLicenseInput(e.target.value)}
                        className="flex-1 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-lg px-3.5 py-2 text-xs font-mono tracking-tight text-slate-800 dark:text-white placeholder-slate-400 disabled:opacity-50 disabled:bg-slate-100 dark:disabled:bg-slate-900 outline-hidden focus:border-indigo-500 transition-colors"
                      />
                      <button
                        onClick={() => handleVerifyLicense(tempLicenseInput, gumroadProductUrl)}
                        disabled={isVerifying}
                        className="bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-slate-300 dark:disabled:bg-indigo-900 text-white font-extrabold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center min-w-[125px]"
                      >
                        {isVerifying ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          "Verify & Unlock"
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Custom Sandbox Simulator Trigger */}
                  <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-xl text-center space-y-2">
                      <p className="text-[10px] text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                        ⚡ Testing in Developer Sandbox? Click below to instantly simulate receiving your Gumroad payment confirmation email, which automatically deposits money to PayPal and registers a live license in our database.
                      </p>

                      <button
                        type="button"
                        onClick={async () => {
                          setVerifyErrorMsg("");
                          setVerifySuccessMsg("");
                          setIsVerifying(true);
                          try {
                            const emailToWebhook = currentUser?.email || "Jagguu232000@gmail.com";
                            const webhookRes = await fetch("/api/gumroad-webhook", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ email: emailToWebhook })
                            });
                            const webhookData = await webhookRes.json();
                            if (webhookRes.ok && webhookData.success) {
                              setVerifySuccessMsg(`Checkout simulated! Created sandbox key: ${webhookData.licenseKey}. Running secure API verification handshake...`);
                              setTempLicenseInput(webhookData.licenseKey);
                              // Immediately auto-verify to simulate successful verification loop instantly
                              await handleVerifyLicense(webhookData.licenseKey, gumroadProductUrl);
                            } else {
                              setVerifyErrorMsg(webhookData.error || "Failed to trigger purchase webhook simulator.");
                              setIsVerifying(false);
                            }
                          } catch (webhookErr) {
                            setVerifyErrorMsg("Could not connect to webhook simulator endpoint.");
                            setIsVerifying(false);
                          }
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white font-black text-[10px] uppercase tracking-wider py-2.5 rounded-xl transition-all cursor-pointer shadow-xs inline-flex items-center justify-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Simulate checkout confirmation email</span>
                      </button>
                    </div>
                  </div>

                  {/* Alerts */}
                  {verifyErrorMsg && (
                    <p className="text-xs text-rose-600 font-semibold mt-2.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/50 p-2.5 rounded-lg text-left">
                      ⚠ {verifyErrorMsg}
                    </p>
                  )}
                  {verifySuccessMsg && (
                    <p className="text-xs text-emerald-700 dark:text-emerald-405 dark:text-emerald-400 font-semibold mt-2.5 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 p-2.5 rounded-lg text-left">
                      ✓ {verifySuccessMsg}
                    </p>
                  )}
                </div>
              </div>

              {/* Modal footer back out */}
              <div className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center select-none text-[11px] text-slate-500 dark:text-slate-400 shrink-0">
                <span className="font-mono">Live API Authentication</span>
                <button
                  onClick={() => setIsPaywallOpen(false)}
                  className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 font-extrabold transition-colors cursor-pointer uppercase tracking-wider text-[10px]"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* White-Label Settings Dialog */}
        {isSettingsOpen && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden font-sans"
            >
              <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2 select-none">
                  <Settings className="w-4.5 h-4.5 text-indigo-455 text-indigo-400" />
                  <h3 className="font-bold text-sm">Gumroad Whitelabel Configuration</h3>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4">
                <div>
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-indigo-600 mb-1">Interactive white-label setup</h4>
                  <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                    Set up your own custom Gumroad product URL to collect payments directly under your name when users click "Purchase Pro".
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-1">
                  <div>
                    <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Your Gumroad Product Page URL:
                    </label>
                    <input
                      type="url"
                      placeholder="https://gumroad.com/l/your-permalink"
                      value={tempProductUrlInput}
                      onChange={(e) => setTempProductUrlInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 outline-hidden transition-colors"
                    />
                    <span className="block text-[10px] text-slate-400 mt-1 font-mono">
                      Parsed Permalink: <strong className="text-indigo-600 font-bold">{extractGumroadPermalink(tempProductUrlInput)}</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase font-extrabold tracking-wider text-slate-500 mb-1.5">
                      Buyer License Key:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter license key to verify"
                      value={tempLicenseInput}
                      onChange={(e) => setTempLicenseInput(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 rounded-lg px-3.5 py-2.5 text-xs font-mono text-slate-800 outline-hidden transition-colors"
                    />
                  </div>
                </div>

                {isPurchased ? (
                  <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-lg flex items-center justify-between text-xs text-emerald-805 text-emerald-800 font-semibold shadow-xs">
                    <div>
                      <span className="font-bold">✓ Pro Lifetime Licensed</span>
                      <p className="text-[10px] text-emerald-600 mt-0.5 font-mono">Key: {(licenseKey || "").substring(0, 12)}...</p>
                    </div>
                    <button
                      onClick={handleDeactivateLicense}
                      className="text-[10px] font-extrabold uppercase text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/50 transition-all px-2.5 py-1.5 rounded-md border border-rose-200 cursor-pointer shadow-xs font-sans"
                    >
                      Disconnect
                    </button>
                  </div>
                ) : (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/40 p-3.5 rounded-lg text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5 font-semibold">
                    <Lock className="w-5 h-5 text-amber-500 dark:text-amber-400 block shrink-0 mt-0.5" />
                    <div>
                      <span>Trial Mode active ({Math.min(generationCount, 1)} / 1 Output Consumed)</span>
                      <p className="text-[10px] text-amber-700/90 dark:text-amber-400/80 mt-1 leading-relaxed">
                        To test, type `GUMROAD-TEST-ACTIVE-KEY` and click "Save & Verify License" below.
                      </p>
                    </div>
                  </div>
                )}

                {/* Alert Messages inside configuration */}
                {verifyErrorMsg && (
                  <p className="text-xs text-rose-600 font-semibold bg-rose-50 border border-rose-100 p-2.5 rounded-lg">
                    ⚠ {verifyErrorMsg}
                  </p>
                )}
                {verifySuccessMsg && (
                  <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 p-2.5 rounded-lg">
                    ✓ {verifySuccessMsg}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex gap-2 justify-end select-none">
                <button
                  onClick={() => handleSaveProductUrl(tempProductUrlInput)}
                  className="mr-auto bg-indigo-50 hover:bg-indigo-100 text-indigo-700 hover:text-indigo-800 font-extrabold text-xs uppercase tracking-wider py-2.5 px-4 rounded-lg border border-indigo-200 hover:border-indigo-300 transition-all cursor-pointer"
                >
                  Save URL Only
                </button>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 text-xs font-extrabold uppercase tracking-wider py-2.5 px-4 rounded-lg transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => handleVerifyLicense(tempLicenseInput, tempProductUrlInput)}
                  disabled={isVerifying}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white text-xs font-extrabold uppercase tracking-wider py-2.5 px-5 rounded-lg transition-all shadow-md cursor-pointer flex items-center justify-center min-w-[130px]"
                >
                  {isVerifying ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    "Save & Verify Key"
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* User Account Profile Modal Dialog */}
        <UserProfileModal 
          isOpen={isProfileOpen} 
          onClose={() => setIsProfileOpen(false)} 
          isDarkMode={isDarkMode} 
          currentUser={currentUser}
          onProfileUpdate={(updatedUser) => {
            if (!updatedUser) {
              setCurrentUser(null);
              setIsPurchased(false);
              setLicenseKey("");
              localStorage.removeItem("receipts_current_user");
              return;
            }
            setCurrentUser(updatedUser);
            if (updatedUser.isPurchased) {
              setIsPurchased(true);
              setLicenseKey(updatedUser.licenseKey || "");
              localStorage.setItem("receipts_gumroad_verified", "true");
              localStorage.setItem("receipts_license_key", updatedUser.licenseKey || "");
            } else {
              setIsPurchased(false);
              setLicenseKey("");
              localStorage.setItem("receipts_gumroad_verified", "false");
              localStorage.setItem("receipts_license_key", "");
            }
          }}
        />
      </AnimatePresence>

      {/* Network health and screen transition loader */}
      <NetworkAndPageLoader 
        isLoading={isPageLoading || status === "loading"} 
        isNetworkSlow={isNetworkSlow} 
        isOffline={isOffline} 
        triggerKey={loaderTriggerKey} 
        customTitle={status === "loading" ? "Engraving Proof-Based Copy" : loaderTitle}
        customSubtitle={status === "loading" ? loadingText : loaderSubtitle}
      />

    </div>
  );
}
