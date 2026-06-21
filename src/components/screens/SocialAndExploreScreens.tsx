import { AppScreen } from "../../types";
import { useState } from "react";
import { VDB } from "../../utils/db";
import { Search, Compass, MessageSquare, Plus, UserPlus, PhoneCall, Sparkles, Code, Image as ImageIcon, ArrowLeft, Globe, Star, Users, MapPin, ChevronRight, User } from "lucide-react";

interface ScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
}

// ══════════ 1. DASHBOARD SCREEN ══════════
export function DashboardScreen({ setScreen, showToast }: ScreenProps) {
  const [searchVal, setSearchVal] = useState("");

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Topbar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 sticky top-0 bg-slate-950/70 backdrop-blur-md z-20">
          <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350">
            <ArrowLeft size={22} className="text-cyan-400" />
          </button>
          <div className="relative">
            <button onClick={() => setScreen(AppScreen.ACTIVITY)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350">
              <span className="w-5 h-5 block text-center">🔔</span>
            </button>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
          </div>
        </div>

        {/* Hero */}
        <div className="px-6 py-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-100 font-rajdhani uppercase bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Veltrixa Dashboard
          </h1>
          <p className="mt-1 text-xs text-slate-500 font-light">What shall we explore today?</p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mx-4 my-5 bg-white/5 border border-white/10 rounded-2xl py-1 pl-4 pr-1 focus-within:border-cyan-500/40 transition-all">
          <Search size={18} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search anything..."
            className="flex-1 bg-transparent py-2.5 text-sm text-slate-200 outline-none placeholder:text-slate-600 font-sans"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setScreen(AppScreen.AI_CHAT)}
          />
          <button
            onClick={() => setScreen(AppScreen.AI_CHAT)}
            className="w-9 h-9 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-[0_2px_10px_rgba(155,93,229,0.4)]"
          >
            <Sparkles size={14} className="text-white" />
          </button>
        </div>

        {/* Popular AI Tools */}
        <div className="flex items-center justify-between px-6 mb-3">
          <h2 className="text-sm font-semibold tracking-wide text-slate-300">Popular AI Tools</h2>
          <button onClick={() => showToast("Loading tools roster...")} className="text-xs text-cyan-400 font-medium hover:text-pink-500 transition-colors">
            See all
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 px-4 mb-6">
          <div
            onClick={() => setScreen(AppScreen.AI_CHAT)}
            className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5 hover:translate-y-[-2px] hover:border-purple-500/30 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              <MessageSquare size={19} />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-slate-200">AI Chat</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Conversations with Gemini</div>
            </div>
          </div>

          <div
            onClick={() => setScreen(AppScreen.AI_CHAT)}
            className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5 hover:translate-y-[-2px] hover:border-cyan-500/30 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400">
              <Sparkles size={19} />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-slate-200">Creative Spark</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Write stories, plots & more</div>
            </div>
          </div>

          <div
            onClick={() => setScreen(AppScreen.AI_CHAT)}
            className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex flex-col gap-2.5 hover:translate-y-[-2px] hover:border-pink-500/30 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-500">
              <Code size={19} />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">Code Helper</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Debug & explain scripts</div>
            </div>
          </div>

          <div
            onClick={() => showToast("Image Creator coming soon")}
            className="bg-slate-900 border border-white/20 rounded-2xl p-4 flex flex-col gap-2.5 hover:translate-y-[-2px] hover:border-green-500/30 hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <ImageIcon size={19} />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide text-slate-200">Image Creator</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Bring ideas to life</div>
            </div>
          </div>
        </div>

        {/* Today's Picks */}
        <div className="px-6 mb-3 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-slate-300">Today's Picks</h2>
          <button onClick={() => showToast("Loading daily reads...")} className="text-xs text-cyan-400">See all</button>
        </div>

        <div
          onClick={() => showToast("Opening 'The Future of Humanity'")}
          className="mx-4 rounded-2xl overflow-hidden cursor-pointer relative h-[150px] bg-gradient-to-r from-indigo-950 via-slate-950 to-slate-950 border border-purple-500/20 hover:scale-[1.01] transition-all"
        >
          {/* Neon overlays */}
          <div className="absolute inset-0 bg-radial-at-cl-tr from-purple-500/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-radial-at-bl from-cyan-500/15 via-transparent" />

          {/* Rating */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1 bg-black/50 backdrop-blur-md rounded-lg px-2.5 py-1 text-xs text-amber-400 font-bold">
            <Star size={12} fill="currentColor" />
            4.8
          </div>

          <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/85 to-transparent">
            <div className="text-base font-bold text-white tracking-wide">The Future of Humanity</div>
            <div className="text-[11px] text-slate-350 mt-0.5">A journey beyond the stars</div>
            <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5">
              {/* mini avatars */}
              <div className="flex -space-x-1.5 grayscale opacity-80">
                <div className="w-4.5 h-4.5 rounded-full bg-cyan-400 border border-black" />
                <div className="w-4.5 h-4.5 rounded-full bg-purple-500 border border-black" />
                <div className="w-4.5 h-4.5 rounded-full bg-pink-500 border border-black" />
              </div>
              <span className="text-[10px] text-slate-500 flex items-center gap-1">
                ⏱️ 12 min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bottom-nav">
        <button onClick={() => setScreen(AppScreen.MAIN)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Home</span>
        </button>

        <button onClick={() => setScreen(AppScreen.EXPLORE)} className="nav-item">
          <Search size={19} className="text-slate-500 hover:text-cyan-400 transition-all" />
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Explore</span>
        </button>

        <button onClick={() => setScreen(AppScreen.DASHBOARD)} className="nav-fab shadow-[0_0_15px_rgba(6,182,212,0.6)] !bg-cyan-500">
          <Plus size={22} className="text-white hover:scale-110 transition-all font-bold" />
        </button>

        <button onClick={() => setScreen(AppScreen.GROUPS)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Chats</span>
        </button>

        <button onClick={() => setScreen(AppScreen.PROFILE)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Profile</span>
        </button>
      </div>
    </div>
  );
}

// ══════════ 2. EXPLORE SCREEN ══════════
export function ExploreScreen({ setScreen, showToast }: ScreenProps) {
  const [activeTab, setActiveTab] = useState<'for_you' | 'ai_tools' | 'community' | 'learning'>('for_you');
  const [joined, setJoined] = useState<Record<string, boolean>>(() => VDB.getJoinedCommunities());

  const communities = [
    { id: "galactic", name: "Galactic Explorers", count: "8.2K members", color: "bg-cyan-500/10 text-cyan-400" },
    { id: "creators", name: "AI Creators Hub", count: "5.7K members", color: "bg-purple-500/12 text-purple-400" },
    { id: "coders", name: "Code Wizards", count: "6.1K members", color: "bg-pink-500/10 text-pink-500" },
  ];

  const publicCommunities = [
    { id: "galactic", name: "Galactic Explorers", desc: "For aerospace tech, orbital design, and telemetry systems.", count: "8.2K members", color: "bg-cyan-500/10 text-cyan-400" },
    { id: "creators", name: "AI Creators Hub", desc: "Share prompting frameworks, image presets, and custom workflows.", count: "5.7K members", color: "bg-purple-500/12 text-purple-400" },
    { id: "coders", name: "Code Wizards Guild", desc: "Discuss full-stack patterns, database models, and systems engineering.", count: "6.1K members", color: "bg-pink-500/10 text-pink-500" },
    { id: "quantum", name: "Quantum Computing Lab", desc: "Exchanging views on quantum state circuits, logic gates, and qubits.", count: "4.3K members", color: "bg-amber-500/10 text-amber-500" },
    { id: "cybersec", name: "Cyber Security Force", desc: "Securing web endpoints, firewalls, threat analysis, and pen-testing.", count: "7.1K members", color: "bg-emerald-500/10 text-emerald-400" },
  ];

  const aiTools = [
    {
      id: "assistant",
      name: "Gemini Smart Copilot",
      desc: "Instant conversational guidance, writing drafts, and smart actions.",
      usecase: "General AI helper",
      rating: "4.9",
      icon: "✨",
      users: "24K active",
      target: AppScreen.NEW_CHAT,
    },
    {
      id: "coder",
      name: "CodeGen Pro",
      desc: "Full context block generator with strict syntactic type safety enforcement.",
      usecase: "Development tool",
      rating: "4.8",
      icon: "💻",
      users: "18K active",
      target: AppScreen.AI_CHAT,
    },
    {
      id: "synth",
      name: "SynthArt Canvas",
      desc: "Bespoke high-fidelity illustrations, vectors, and design presets.",
      usecase: "Creative design",
      rating: "4.9",
      icon: "🎨",
      users: "15K active",
      target: AppScreen.AI_ASSISTANT_INTRO,
    },
    {
      id: "insights",
      name: "Deep Query Analyzer",
      desc: "Parse server statistics, database schemas, and render instant visual charts.",
      usecase: "Analytics",
      rating: "4.7",
      icon: "📊",
      users: "12K active",
      target: AppScreen.DASHBOARD,
    }
  ];

  const learningCourses = [
    { id: "p1", title: "Prompt Engineering Foundations", level: "Beginner", duration: "1.5 hrs", rating: "4.9", category: "AI Models" },
    { id: "p2", title: "Refining High-Contrast Interface Aesthetics", level: "Advanced", duration: "3 hrs", rating: "4.8", category: "UI/UX" },
    { id: "p3", title: "Working with Vector Context Datastores", level: "Intermediate", duration: "2.5 hrs", rating: "4.9", category: "Big Data" },
  ];

  const handleJoin = (id: string, name: string) => {
    setJoined((prev) => {
      const isJoined = !prev[id];
      showToast(isJoined ? `You joined ${name}!` : `Left ${name}`);
      const updated = { ...prev, [id]: isJoined };
      VDB.setJoinedCommunities(updated);
      return updated;
    });
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Topbar */}
        <div className="px-6 pt-5 pb-3 sticky top-0 bg-slate-950/70 backdrop-blur-md z-20">
          <h1 className="text-xl font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Explore</h1>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mx-4 mb-4 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus-within:border-cyan-500/40 transition-all font-sans">
          <Search size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder={
              activeTab === "ai_tools"
                ? "Search specialized AI agents..."
                : activeTab === "community"
                ? "Search public channels..."
                : "Search topics, people, or AI tools..."
            }
            className="flex-1 bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Tab-row */}
        <div className="flex gap-2 px-4 mb-5 overflow-x-auto scrollbar-none font-sans">
          <button
            onClick={() => setActiveTab('for_you')}
            className={`rounded-full py-1.5 px-3.5 text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              activeTab === 'for_you'
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                : "bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setActiveTab('ai_tools')}
            className={`rounded-full py-1.5 px-3.5 text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              activeTab === 'ai_tools'
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                : "bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
            }`}
          >
            AI Tools
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`rounded-full py-1.5 px-3.5 text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              activeTab === 'community'
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                : "bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
            }`}
          >
            Community
          </button>
          <button
            onClick={() => {
              setActiveTab('learning');
              showToast("Opening Learning courses hub!");
            }}
            className={`rounded-full py-1.5 px-3.5 text-xs font-semibold shrink-0 cursor-pointer transition-all ${
              activeTab === 'learning'
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-[0_0_12px_rgba(0,212,255,0.3)]"
                : "bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
            }`}
          >
            Learning
          </button>
        </div>

        {/* DYNAMIC CONTENT CONTAINER BASED ON ACTIVE TAB */}
        {activeTab === 'for_you' && (
          <div>
            {/* Featured Communities */}
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400 font-sans">Featured Communities</h2>
              <button onClick={() => setActiveTab('community')} className="text-xs text-cyan-400">See all</button>
            </div>

            <div className="flex flex-col gap-2.5 px-4 mb-6">
              {communities.map((comm) => (
                <div
                  key={comm.id}
                  className="flex items-center gap-3.5 p-3.5 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/20 transition-all font-sans"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${comm.color}`}>
                    <Users size={19} />
                  </div>
                  <div className="flex-1 min-width-0">
                    <div className="text-sm font-semibold tracking-wide text-slate-200">{comm.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{comm.count}</div>
                  </div>
                  <button
                    onClick={() => handleJoin(comm.id, comm.name)}
                    className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      joined[comm.id]
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/18"
                    }`}
                  >
                    {joined[comm.id] ? "Joined" : "Join"}
                  </button>
                </div>
              ))}
            </div>

            {/* Trending tech topics */}
            <div className="flex items-center justify-between px-4 mb-3">
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400 font-sans">Trending Topics</h2>
              <button onClick={() => showToast("Trending directory loaded")} className="text-xs text-cyan-400">See all</button>
            </div>

            <div className="flex flex-col gap-2 px-4 font-sans">
              <div
                onClick={() => showToast("Opening Quantum Computing board...")}
                className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/20 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-500/15 flex items-center justify-center text-pink-400 shrink-0">
                    ⚛️
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Quantum Computing</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">12.5K views</div>
                  </div>
                </div>
                <span className="text-slate-500 text-xs">➔</span>
              </div>

              <div
                onClick={() => showToast("Opening Space Technology briefing...")}
                className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 rounded-2xl hover:border-cyan-500/20 cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
                    🚀
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">Space Technology</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">9.8K views</div>
                  </div>
                </div>
                <span className="text-slate-500 text-xs">➔</span>
              </div>
            </div>
          </div>
        )}

        {/* AI TOOLS TAB CONTENT SCREEN */}
        {activeTab === 'ai_tools' && (
          <div className="flex flex-col gap-3 px-4 font-sans">
            <div className="mb-1">
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400">Available AI Models & Tools</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Access advanced generative systems instantly.</p>
            </div>

            {aiTools.map((tool) => (
              <div
                key={tool.id}
                className="p-4 bg-slate-900/80 border border-white/5 rounded-2xl hover:border-cyan-500/20 transition-all flex flex-col gap-3.5 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-transparent blur-xl" />
                
                <div className="flex items-start gap-3">
                  <span className="text-2xl p-1 shrink-0">{tool.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-semibold text-slate-200 truncate">{tool.name}</div>
                      <span className="text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20 shrink-0">
                        {tool.usecase}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
                      ⭐ {tool.rating}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {tool.users}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setScreen(tool.target);
                      showToast(`Launching ${tool.name}!`);
                    }}
                    className="py-1 px-3.5 text-xs font-bold bg-cyan-500 text-slate-950 rounded-xl hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                  >
                    Launch
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* COMMUNITY TAB CONTENT SCREEN */}
        {activeTab === 'community' && (
          <div className="flex flex-col gap-3 px-4 font-sans">
            <div className="mb-1">
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400">All Public Communities</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Explore active community boards and spaces.</p>
            </div>

            {publicCommunities.map((comm) => (
              <div
                key={comm.id}
                className="p-4 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/20 transition-all flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shrink-0 font-bold">
                      #
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{comm.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{comm.count}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleJoin(comm.id, comm.name)}
                    className={`py-1 px-3.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      joined[comm.id]
                        ? "bg-green-500/10 text-green-400 border border-green-500/30"
                        : "bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/18"
                    }`}
                  >
                    {joined[comm.id] ? "Joined" : "Join"}
                  </button>
                </div>

                <p className="text-xs text-slate-400 leading-relaxed pl-1">
                  {comm.desc}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* LEARNING TAB CONTENT SCREEN */}
        {activeTab === 'learning' && (
          <div className="flex flex-col gap-3 px-4 font-sans">
            <div className="mb-1">
              <h2 className="text-xs font-bold tracking-wider uppercase text-slate-400">Learning Paths & Academies</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Master system design, logic, and core networks.</p>
            </div>

            {learningCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => showToast(`Opening course: ${course.title}`)}
                className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-cyan-500/20 cursor-pointer transition-all flex flex-col gap-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 bg-white/5 text-slate-400 rounded border border-white/5">
                    {course.category}
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    ⭐ {course.rating}
                  </span>
                </div>

                <h3 className="text-xs font-semibold text-slate-100 mt-1 leading-normal">
                  {course.title}
                </h3>

                <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-2">
                  <span>📶 {course.level}</span>
                  <span>•</span>
                  <span>⏱️ {course.duration}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bottom-nav">
        <button onClick={() => setScreen(AppScreen.MAIN)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Home</span>
        </button>

        <button className="nav-item active">
          <Search size={19} className="text-cyan-400" />
          <span className="text-[10px] mt-1 font-semibold tracking-wider">Explore</span>
        </button>

        <button onClick={() => setScreen(AppScreen.DASHBOARD)} className="nav-fab shadow-[0_4px_20px_rgba(155,93,229,0.5)]">
          <Plus size={22} className="text-white" />
        </button>

        <button onClick={() => setScreen(AppScreen.GROUPS)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Chats</span>
        </button>

        <button onClick={() => setScreen(AppScreen.PROFILE)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Profile</span>
        </button>
      </div>
    </div>
  );
}

interface GroupsScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
  setActiveDm?: (dm: { name: string; avatarColor: string; lastMsg: string; status: string } | null) => void;
  activeTab?: "groups" | "personal";
  setActiveTab?: (tab: "groups" | "personal") => void;
  setSelectedProfileUser?: (user: { name: string; avatarColor: string } | null) => void;
}

// ══════════ 3. GROUPS LIST SCREEN ══════════
export function GroupsScreen({ setScreen, showToast, setActiveDm, activeTab = "groups", setActiveTab, setSelectedProfileUser }: GroupsScreenProps) {
  const [localActiveTab, setLocalActiveTab] = useState<"groups" | "personal">("groups");
  const currentTab = setActiveTab ? activeTab : localActiveTab;
  const updateTab = setActiveTab || setLocalActiveTab;

  const myGroups = [
    { id: "innovators", name: "AI Innovators", members: "12.4K members", badge: 3, time: "10:30 AM", col: "bg-cyan-500/10 text-cyan-400", target: AppScreen.GROUP_CHAT_2 },
    { id: "enthusiasts", name: "Space Enthusiasts", members: "9.8K members", badge: 8, time: "Yesterday", col: "bg-purple-500/12 text-purple-400", target: AppScreen.GROUP_CHAT },
  ];

  const discoverGroups = [
    { id: "designers", name: "Design Masters", members: "6.2K members", col: "bg-pink-500/10 text-pink-500" },
    { id: "devs", name: "Developers Hub", members: "15.6K members", col: "bg-green-500/10 text-green-400" },
  ];

  const personalChats = [
    { id: "sophia", name: "Sophia Carter", status: "Active 5m ago", badge: 0, time: "12:15 PM", col: "bg-pink-500/10 text-pink-400", target: AppScreen.AI_CHAT, lastMsg: "Hey, are you free for a call?" },
    { id: "ai_helper", name: "AI Assistant", status: "AI Solution Bot", badge: 3, time: "10:30 AM", col: "bg-purple-500/15 text-purple-400", target: AppScreen.AI_CHAT, lastMsg: "How can I help you improve?" },
    { id: "spark", name: "Creative Spark AI", status: "Writing Bot", badge: 2, time: "Yesterday", col: "bg-cyan-500/10 text-cyan-400", target: AppScreen.AI_CHAT, lastMsg: "Write a sci-fi story about space..." },
    { id: "code_helper", name: "Code Assistant AI", status: "Dev Bot", badge: 1, time: "May 20", col: "bg-pink-500/15 text-pink-400", target: AppScreen.AI_CHAT, lastMsg: "Explain this code snippet." },
    { id: "ethan", name: "Ethan Walker", status: "Offline", badge: 0, time: "May 18", col: "bg-teal-500/10 text-teal-400", target: AppScreen.AI_CHAT, lastMsg: "I've uploaded the project files!" },
  ];

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 flex-1 text-center font-rajdhani uppercase">Chats & Channels</h1>
          <button onClick={() => showToast(currentTab === "groups" ? "Create community channel coming soon" : "Start a direct chat coming soon")} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <Plus size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mx-4 my-2.5 bg-white/5 border border-white/10 rounded-2xl py-2 px-4 focus-within:border-cyan-500/40 transition-all">
          <Search size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder={currentTab === "groups" ? "Search groups & channels..." : "Search direct messages..."}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Tab switch */}
        <div className="flex p-1 mx-4 my-2 bg-slate-900 border border-white/5 rounded-xl">
          <button
            onClick={() => updateTab("groups")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentTab === "groups"
                ? "bg-purple-500 text-white shadow-[0_2px_10px_rgba(155,93,229,0.3)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Communities
          </button>
          <button
            onClick={() => updateTab("personal")}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
              currentTab === "personal"
                ? "bg-purple-500 text-white shadow-[0_2px_10px_rgba(155,93,229,0.3)]"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Direct Messages
          </button>
        </div>

        {currentTab === "groups" ? (
          <div className="animate-fade-in">
            {/* Group lists */}
            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold px-6 mt-4 mb-2">My Groups</div>
            <div className="flex flex-col gap-2.5 px-4 mb-5">
              {myGroups.map((g) => (
                <div
                  key={g.id}
                  onClick={() => setScreen(g.target)}
                  className="flex items-center justify-between p-3 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/30 cursor-pointer shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${g.col}`}>
                      <Users size={19} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-slate-200">{g.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{g.members}</div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5">
                    <span className="text-[10px] text-slate-500">{g.time}</span>
                    {g.badge > 0 && (
                      <span className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_8px_rgba(155,93,229,0.5)]">
                        {g.badge}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold px-6 mt-4 mb-2">Discover Groups</div>
            <div className="flex flex-col gap-2.5 px-4">
              {discoverGroups.map((g) => (
                <div
                  key={g.id}
                  onClick={() => showToast(`Request to join ${g.name} sent`)}
                  className="flex items-center justify-between p-3 bg-slate-900 border border-white/5 rounded-2xl hover:border-cyan-500/30 cursor-pointer shadow-md transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${g.col}`}>
                      <Users size={19} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold tracking-wide text-slate-200">{g.name}</div>
                      <div className="text-xs text-slate-500 mt-1">{g.members}</div>
                    </div>
                  </div>
                  <button className="py-1 px-3.5 rounded-lg border border-cyan-500/30 text-cyan-400 text-[10.5px] font-bold">
                    Join
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Personal chats list */}
            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold px-6 mt-4 mb-2">People Chats & DMs</div>
            <div className="flex flex-col gap-2.5 px-4">
              {personalChats.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveDm?.({ name: c.name, avatarColor: c.col, lastMsg: c.lastMsg, status: c.status });
                    setScreen(c.target);
                  }}
                  className="flex items-center justify-between p-3 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/30 cursor-pointer shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (setSelectedProfileUser) {
                          setSelectedProfileUser({ name: c.name, avatarColor: c.col });
                        }
                        setScreen(AppScreen.USER_PROFILE);
                      }}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${c.col} hover:scale-105 active:scale-95 transition-all`}
                    >
                      <User size={19} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold tracking-wide text-slate-200 truncate">{c.name}</div>
                      <div className="text-xs text-slate-400 mt-1 truncate">{c.lastMsg}</div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1.5 ml-2.5 shrink-0">
                    <span className="text-[10px] text-slate-500">{c.time}</span>
                    {c.badge > 0 ? (
                      <span className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_8px_rgba(0,212,255,0.5)]">
                        {c.badge}
                      </span>
                    ) : (
                      <span className="text-[9px] text-emerald-400 font-medium">{c.status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="bottom-nav">
        <button onClick={() => setScreen(AppScreen.MAIN)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-300">Home</span>
        </button>

        <button onClick={() => setScreen(AppScreen.EXPLORE)} className="nav-item">
          <Search size={19} className="text-slate-500" />
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Explore</span>
        </button>

        <button onClick={() => setScreen(AppScreen.DASHBOARD)} className="nav-fab shadow-[0_4px_20px_rgba(155,93,229,0.5)]">
          <Plus size={22} className="text-white" />
        </button>

        <button className="nav-item active">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider">Chats</span>
        </button>

        <button onClick={() => setScreen(AppScreen.PROFILE)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Profile</span>
        </button>
      </div>
    </div>
  );
}

// ══════════ 4. ADD FRIENDS SCREEN ══════════
export function AddFriendsScreen({ setScreen, showToast }: ScreenProps) {
  const [searchVal, setSearchVal] = useState("");
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const candidates = [
    { id: "ethan", name: "Ethan Walker", user: "@ethan.walker" },
    { id: "isabella", name: "Isabella Reed", user: "@isareed.art" },
    { id: "noah", name: "Noah Brooks", user: "@noah.brooks" },
    { id: "olivia", name: "Olivia Bennett", user: "@olivia.bennett" },
  ];

  const handleAdd = (id: string, name: string) => {
    setAdded((prev) => {
      const isAdded = !prev[id];
      showToast(isAdded ? `Friend request sent to ${name}!` : `Cancelled request to ${name}`);
      return { ...prev, [id]: isAdded };
    });
  };

  const filteredCandidates = candidates.filter(
    (c) =>
      c.name.toLowerCase().includes(searchVal.toLowerCase()) ||
      c.user.toLowerCase().includes(searchVal.toLowerCase())
  );

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => history.back()} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Add Friends</h1>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mx-4 my-3 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus-within:border-cyan-500/40 transition-all">
          <Search size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search by username or email"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none"
          />
        </div>

        {/* QR Code trigger */}
        <div
          onClick={() => showToast("Simulating QR Scanner camera capture...")}
          className="mx-4 my-4 flex items-center gap-3.5 p-4 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
            🔳
          </div>
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-slate-200">Scan QR Code</h3>
            <p className="text-xs text-slate-500 mt-1">Add friends instantly via camera</p>
          </div>
        </div>

        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-semibold px-6 mt-4 mb-2">People You May Know</div>
        <div className="flex flex-col gap-2.5 px-4 mb-4">
          {filteredCandidates.map((cand) => (
            <div
              key={cand.id}
              className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/20 transition-all font-sans"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-800 to-indigo-950 flex items-center justify-center shrink-0 border border-purple-500/20 text-slate-350">
                  👤
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-wide text-slate-200">{cand.name}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{cand.user}</div>
                </div>
              </div>
              <button
                onClick={() => handleAdd(cand.id, cand.name)}
                className={`py-1.5 px-4 rounded-xl text-xs font-bold transition-all ${
                  added[cand.id]
                    ? "bg-green-500/12 text-green-400 border border-green-500/30 pointer-events-none"
                    : "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-md active:scale-95 hover:opacity-90"
                }`}
              >
                {added[cand.id] ? "Added" : "Add"}
              </button>
            </div>
          ))}
          {filteredCandidates.length === 0 && (
            <p className="text-xs text-slate-550 text-center py-6 font-light">No matching profiles found</p>
          )}
        </div>

        {/* Invite link copy */}
        <div
          onClick={() => showToast("Invite link copied to clipboard!")}
          className="mx-4 p-4 bg-slate-900 border border-white/10 rounded-2xl flex items-center justify-between cursor-pointer hover:border-purple-500/3s transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400 shrink-0">
              🔗
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-slate-200">Invite Friends</h3>
              <p className="text-xs text-slate-500 mt-1">Copy unique Veltrixa invite link</p>
            </div>
          </div>
          <span className="text-slate-500">➔</span>
        </div>
      </div>
    </div>
  );
}
