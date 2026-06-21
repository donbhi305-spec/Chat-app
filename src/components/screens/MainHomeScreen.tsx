import { AppScreen, UserProfileData } from "../../types";
import { Menu, Bell, Star, MessageSquare, Compass, PhoneCall, Plus, User, Users } from "lucide-react";

interface MainHomeProps {
  user: UserProfileData;
  setScreen: (scr: AppScreen) => void;
  triggerLogout: () => void;
  showToast: (msg: string) => void;
}

export default function MainHomeScreen({ user, setScreen, triggerLogout, showToast }: MainHomeProps) {
  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-purple-500 via-cyan-400 to-transparent z-10" />

      {/* Content wrapper */}
      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 sticky top-0 bg-slate-950/70 backdrop-blur-md z-20">
          <button
            onClick={() => showToast("Main menu shortcut: Use the bottom center '+' button to access your Dashboard! 📊")}
            className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 hover:text-cyan-400 transition-all font-light"
          >
            <Menu size={22} />
          </button>
          <div className="relative">
            <button
              onClick={() => setScreen(AppScreen.ACTIVITY)}
              className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 hover:text-cyan-400 transition-all"
            >
              <Bell size={22} />
            </button>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-[0_0_6px_#f72585]" />
          </div>
        </div>

        {/* Hero */}
        <div className="px-6 py-2 flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
              Hi, {user.displayName.split(" ")[0]} <span className="animate-wiggle">👋</span>
            </h1>
            <p className="mt-1 text-xs text-slate-500 font-light tracking-wide">Welcome back! Ready to explore?</p>
          </div>
          <div
            onClick={() => setScreen(AppScreen.PROFILE)}
            className="w-[50px] h-[50px] rounded-full border-2 border-purple-500 overflow-hidden cursor-pointer relative bg-slate-900 flex items-center justify-center shrink-0 hover:scale-105 active:scale-95 transition-all shadow-[0_0_12px_rgba(155,93,229,0.4)]"
          >
            <User size={24} className="text-purple-400" />
            <div className="absolute inset-[-3px] rounded-full border border-dashed border-transparent animate-spin-ring" />
          </div>
        </div>

        {/* Plan card */}
        <div
          onClick={() => setScreen(AppScreen.SUBSCRIPTION)}
          className="mx-4 my-6 bg-gradient-to-br from-purple-500/15 to-cyan-500/8 border border-purple-500/30 rounded-2xl p-4.5 flex items-center justify-between relative overflow-hidden cursor-pointer hover:translate-y-[-2px] hover:shadow-[0_8px_32px_rgba(155,93,229,0.2)] transition-all"
        >
          <div className="relative z-10">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Your Plan</div>
            <div className="text-xl font-rajdhani font-bold flex items-center gap-1.5 uppercase text-slate-200">
              Premium
              <span className="w-5 h-5 rounded-full bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center text-[10px] text-white shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                ⭐
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Valid until 24 May 2026</div>
          </div>

          <div className="w-[90px] h-[60px] relative shrink-0 flex items-end justify-between">
            <div className="flex items-end gap-1.5 h-12 w-full">
              <div className="w-1.5 h-[30%] bg-gradient-to-t from-purple-500/30 to-cyan-400/60 rounded-t" />
              <div className="w-1.5 h-[55%] bg-gradient-to-t from-purple-500/30 to-cyan-400/60 rounded-t" />
              <div className="w-1.5 h-[40%] bg-gradient-to-t from-purple-500/30 to-cyan-400/60 rounded-t" />
              <div className="w-1.5 h-[80%] bg-gradient-to-t from-purple-500/30 to-cyan-400/60 rounded-t" />
              <div className="w-1.5 h-[60%] bg-gradient-to-t from-purple-500/30 to-cyan-400/60 rounded-t" />
            </div>
            <div className="absolute right-0 bottom-0 w-11 h-11 filter drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] animate-float">
              <svg viewBox="0 0 44 44" fill="none">
                <defs>
                  <linearGradient id="dg" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#00d4ff" />
                    <stop offset="1" stopColor="#9b5de5" />
                  </linearGradient>
                </defs>
                <polygon points="22,4 40,18 22,40 4,18" stroke="url(#dg)" strokeWidth="1.5" fill="rgba(155,93,229,0.08)" />
              </svg>
            </div>
          </div>
        </div>

        {/* Quick Access */}
        <div className="flex items-center justify-between px-6 mb-3">
          <h2 className="text-sm font-semibold tracking-wide text-slate-300">Quick Access</h2>
          <button onClick={() => showToast("Features configured successfully")} className="text-xs text-cyan-400 font-medium hover:text-pink-500 transition-colors">
            See all
          </button>
        </div>

        <div className="grid grid-cols-4 gap-2.5 px-4 mb-6">
          <div
            onClick={() => setScreen(AppScreen.AI_ASSISTANT_INTRO)}
            className="bg-white/5 border border-white/5 hover:border-purple-500/40 hover:bg-purple-500/5 hover:shadow-[0_8px_24px_rgba(155,93,229,0.15)] rounded-2xl p-3 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
              💬
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">AI Portal</span>
          </div>

          <div
            onClick={() => setScreen(AppScreen.EXPLORE)}
            className="bg-white/5 border border-white/5 hover:border-cyan-500/40 hover:bg-cyan-500/5 hover:shadow-[0_8px_24px_rgba(0,212,255,0.15)] rounded-2xl p-3 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              🧭
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">Explore</span>
          </div>

          <div
            onClick={() => setScreen(AppScreen.FILES)}
            className="bg-white/5 border border-white/5 hover:border-pink-500/40 hover:bg-pink-500/5 hover:shadow-[0_8px_24px_rgba(247,37,133,0.15)] rounded-2xl p-3 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center text-pink-400">
              📁
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">Library</span>
          </div>

          <div
            onClick={() => setScreen(AppScreen.CALLS)}
            className="bg-white/5 border border-white/5 hover:border-green-500/40 hover:bg-green-500/5 hover:shadow-[0_8px_24px_rgba(74,222,128,0.15)] rounded-2xl p-3 flex flex-col items-center gap-1.5 cursor-pointer active:scale-95 transition-all text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 text-lg">
              📞
            </div>
            <span className="text-[10px] text-slate-500 font-semibold tracking-wider">Calls</span>
          </div>
        </div>

        {/* Active Communities */}
        <div className="flex items-center justify-between px-6 mb-3">
          <h2 className="text-sm font-semibold tracking-wide text-slate-300">Active Communities</h2>
          <button onClick={() => setScreen(AppScreen.GROUPS)} className="text-xs text-cyan-400 font-medium hover:text-pink-500 transition-colors">
            View all
          </button>
        </div>

        <div className="flex flex-col gap-2.5 px-4 animate-fade-in">
          {/* AI Innovators Active Group */}
          <div
            onClick={() => setScreen(AppScreen.GROUP_CHAT_2)}
            className="bg-white/5 border border-white/5 hover:border-purple-500/25 hover:translate-x-1.5 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer group transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/30 group-hover:scale-105 transition-all text-cyan-400">
              <Users size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-semibold tracking-wide text-slate-200 text-ellipsis overflow-hidden">AI Innovators</span>
                <span className="text-[10px] text-slate-500">10:30 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 text-ellipsis overflow-hidden whitespace-nowrap">
                  <span className="text-purple-400 font-medium mr-1 font-sans">Alex:</span>
                  Have you tried the new model?
                </span>
                <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_8px_rgba(155,93,229,0.5)]">
                  3
                </div>
              </div>
            </div>
          </div>

          {/* Space Enthusiasts Active Group */}
          <div
            onClick={() => setScreen(AppScreen.GROUP_CHAT)}
            className="bg-white/5 border border-white/5 hover:border-cyan-500/25 hover:translate-x-1.5 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer group transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-purple-500/12 flex items-center justify-center shrink-0 border border-purple-500/30 group-hover:scale-105 transition-all text-purple-400">
              <Users size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-sm font-semibold tracking-wide text-slate-200 text-ellipsis overflow-hidden">Space Enthusiasts</span>
                <span className="text-[10px] text-slate-500">Yesterday</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 text-ellipsis overflow-hidden whitespace-nowrap">
                  <span className="text-cyan-400 font-medium mr-1 font-sans">Elena:</span>
                  Beautiful launch video!
                </span>
                <div className="w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center text-[9px] font-bold text-white shadow-[0_0_8px_rgba(0,212,255,0.5)]">
                  8
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Nav Bar */}
      <div className="bottom-nav">
        <button className="nav-item active">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider">Home</span>
        </button>

        <button onClick={() => setScreen(AppScreen.EXPLORE)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Explore</span>
        </button>

        <button onClick={() => setScreen(AppScreen.DASHBOARD)} className="nav-fab shadow-[0_4px_20px_rgba(155,93,229,0.5),0_0_0_4px_rgba(155,93,229,0.1)]">
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
