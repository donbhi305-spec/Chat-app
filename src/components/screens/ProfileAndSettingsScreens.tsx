import React, { useState } from "react";
import { motion } from "motion/react";
import { AppScreen, UserProfileData, SavedFile, ActivityLog } from "../../types";
import { 
  ArrowLeft, Edit, BadgeCheck, Star, ShieldAlert, Bell, Eye, MessageSquare, Paintbrush, 
  Globe, HelpCircle, Heart, LogOut, Check, ChevronRight, MapPin, Send, Trash2, Shield,
  Settings, Award, Bookmark, Zap, CheckCircle, Compass, FileText, Database, HardDrive, Info
} from "lucide-react";

interface ProfileProps {
  user: UserProfileData;
  setUser: (u: UserProfileData) => void;
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string, type?: string) => void;
  triggerLogout: () => void;
}

interface ScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
}

// ══════════ 1. PROFILE SCREEN ══════════
export function ProfileScreen({ user, setScreen, showToast }: Omit<ProfileProps, "setUser" | "triggerLogout">) {
  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Profile</h1>
          <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <Settings size={18} className="text-cyan-400 transition-transform duration-300 hover:rotate-45" />
          </button>
        </div>

        {/* User Card */}
        <div className="flex flex-col items-center px-6 py-4">
          <div className="relative w-28 h-28 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[2px] animate-spin-ring">
              <div className="w-full h-full rounded-full bg-slate-950" />
            </div>
            <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-900 border border-purple-500/30 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
            <div className="absolute bottom-1.5 right-1.5 w-7.5 h-7.5 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center border-2 border-slate-950 shadow-lg text-white text-xs">
              ⭐
            </div>
          </div>

          <h2 className="text-lg font-bold text-slate-100 font-sans tracking-wide">{user.displayName}</h2>
          <div className="text-xs text-cyan-400 font-medium tracking-wide mt-1">{user.username}</div>
          <p className="text-xs text-slate-400 font-light text-center mt-3 max-w-[280px] leading-relaxed">{user.bio}</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-5 items-center bg-slate-900/60 border border-white/5 rounded-2xl mx-4 py-4 px-3 mb-5">
          <div className="text-center col-span-1.5">
            <div className="text-lg font-bold font-rajdhani text-slate-100">128</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Chats</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800 m-auto" />
          <div className="text-center col-span-1.5">
            <div className="text-lg font-bold font-rajdhani text-slate-100">48</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Following</div>
          </div>
          <div className="h-8 w-[1px] bg-slate-800 m-auto" />
          <div className="text-center col-span-1.5">
            <div className="text-lg font-bold font-rajdhani text-slate-100">1.2K</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Friends</div>
          </div>
        </div>

        {/* Premium Badge Card */}
        <div
          onClick={() => setScreen(AppScreen.SUBSCRIPTION)}
          className="mx-4 bg-gradient-to-r from-cyan-500/10 to-purple-500/12 border border-cyan-500/30 rounded-2xl p-4 flex items-center gap-3.5 cursor-pointer hover:translate-y-[-2px] hover:shadow-lg transition-all"
        >
          <div className="w-11 h-11 rounded-full bg-cyan-500/12 flex items-center justify-center shrink-0">
            🔳
          </div>
          <div className="flex-1 min-width-0">
            <h3 className="text-sm font-semibold tracking-wide text-slate-200">Premium Member</h3>
            <p className="text-xs text-slate-500 mt-1">Valid until 24 May 2026</p>
          </div>
          <ChevronRight size={16} className="text-slate-500" />
        </div>

        {/* Navigation settings and sub-screens */}
        <div className="flex flex-col gap-2 mt-5 px-4">
          <div
            onClick={() => setScreen(AppScreen.SUBSCRIPTION)}
            className="flex items-center justify-between p-4 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/30 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <Star size={16} className="text-purple-400" />
              <span className="text-sm font-medium tracking-wide">My Plan</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">Premium</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>

          <div
            onClick={() => setScreen(AppScreen.ACHIEVEMENTS)}
            className="flex items-center justify-between p-4 bg-slate-900 border border-white/5 rounded-2xl hover:border-cyan-400/30 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <BadgeCheck size={16} className="text-cyan-400" />
              <span className="text-sm font-medium tracking-wide">Achievements</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">12 Badges</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>

          <div
            onClick={() => setScreen(AppScreen.SAVED_ITEMS)}
            className="flex items-center justify-between p-4 bg-slate-900 border border-white/5 rounded-2xl hover:border-pink-500/30 cursor-pointer transition-all"
          >
            <div className="flex items-center gap-3">
              <Bookmark size={16} className="text-pink-500" />
              <span className="text-sm font-medium tracking-wide">Saved Items</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-slate-500">34 Items</span>
              <ChevronRight size={15} className="text-slate-500" />
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
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Explore</span>
        </button>

        <button onClick={() => setScreen(AppScreen.DASHBOARD)} className="nav-fab shadow-[0_4px_20px_rgba(155,93,229,0.5)]">
          <span className="text-white text-xl">+</span>
        </button>

        <button onClick={() => setScreen(AppScreen.GROUPS)} className="nav-item">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider text-slate-400">Chats</span>
        </button>

        <button className="nav-item active">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.58-7 8-7s8 3 8 7z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider">Profile</span>
        </button>
      </div>
    </div>
  );
}

// ══════════ 2. EDIT PROFILE SCREEN ══════════
export function EditProfileScreen({ user, setUser, setScreen, showToast }: ProfileProps) {
  const [name, setName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [location, setLocation] = useState(user.location);
  const [website, setWebsite] = useState(user.website);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setUser({
        ...user,
        displayName: name,
        username: username,
        bio,
        location,
        website,
      });
      setSaving(false);
      showToast("Profile updated successfully!", "ok");
      setScreen(AppScreen.PROFILE);
    }, 1000);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Edit Profile</h1>
          <button onClick={handleSave} disabled={saving} className="text-sm font-semibold text-cyan-400 hover:text-pink-500 disabled:opacity-50">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Edit Avatar */}
        <div className="flex justify-center py-6">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/60 animate-spin-ring" />
            <div className="absolute inset-1.5 rounded-full overflow-hidden bg-slate-900 border border-purple-500/30 flex items-center justify-center">
              <span className="text-3xl">👤</span>
            </div>
            <button
              onClick={() => showToast("Avatar photo upload coming soon")}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg border-2 border-slate-950"
            >
              📷
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-4 px-4.5">
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">
              <span>Bio</span>
              <span className="lowercase font-normal">{bio.length}/120</span>
            </div>
            <textarea
              maxLength={120}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/40 min-h-[64px] resize-none leading-relaxed"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Location</label>
            <div className="relative">
              <input
                type="text"
                placeholder="City, Country"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/40"
              />
              <MapPin size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Website</label>
            <input
              type="text"
              placeholder="yourwebsite.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 outline-none focus:border-cyan-500/40"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest px-1">Social Associations</label>
            <div className="flex gap-2">
              <button onClick={() => showToast("Twitter link coming soon")} className="w-11 h-11 bg-white/5 hover:border-cyan-400/40 border border-white/10 rounded-xl flex items-center justify-center text-sky-400 text-sm">
                🐤
              </button>
              <button onClick={() => showToast("GitHub link coming soon")} className="w-11 h-11 bg-white/5 hover:border-cyan-400/40 border border-white/10 rounded-xl flex items-center justify-center text-slate-200 text-sm">
                😺
              </button>
              <button onClick={() => showToast("LinkedIn link coming soon")} className="w-11 h-11 bg-white/5 hover:border-cyan-400/40 border border-white/10 rounded-xl flex items-center justify-center text-blue-500 text-sm">
                💼
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════ 3. SETTINGS MAIN SCREEN ══════════
export function SettingScreen({ user, setScreen, showToast, triggerLogout }: Omit<ProfileProps, "setUser">) {
  const [notifOn, setNotifOn] = useState(true);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.PROFILE)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Settings</h1>
        </div>

        {/* Group Account */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2">Account</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div onClick={() => setScreen(AppScreen.EDIT_PROFILE)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Edit Profile</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div onClick={() => setScreen(AppScreen.ACCOUNT_SECURITY)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Account & Security</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div onClick={() => setScreen(AppScreen.PRIVACY)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Privacy</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <span onClick={() => setScreen(AppScreen.NOTIFICATIONS)} className="text-sm font-medium cursor-pointer hover:text-cyan-400">Notifications</span>
            <button
              onClick={() => {
                setNotifOn(!notifOn);
                showToast(notifOn ? "Notifications disabled" : "Notifications enabled");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${notifOn ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${notifOn ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
          <div onClick={() => setScreen(AppScreen.LANGUAGE)} className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer animate-fade-in">
            <span className="text-sm font-medium">Language</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">English</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2">Preferences</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div onClick={() => setScreen(AppScreen.DATABASE_SYNC)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium text-cyan-400">Database & Sync (Supabase)</span>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Config</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>
          <div onClick={() => setScreen(AppScreen.CHAT_PREFERENCES)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Chat Preferences</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div onClick={() => setScreen(AppScreen.DATA_STORAGE)} className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Data & Storage</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
        </div>

        {/* Support */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2">Support</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div onClick={() => setScreen(AppScreen.HELP_CENTER)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Help Center</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div onClick={() => setScreen(AppScreen.FEEDBACK)} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Send Feedback</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div onClick={() => setScreen(AppScreen.ABOUT_APP)} className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">About App</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">v2.1.0</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>
        </div>

        {/* Quit */}
        <button
          onClick={triggerLogout}
          className="mx-4 mt-6 py-3.5 rounded-xl border border-red-500/20 bg-red-500/5 hover:bg-red-500/12 text-sm text-red-400 font-bold tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>
    </div>
  );
}

// ══════════ 4. ACCOUNT SECURITY SCREEN ══════════
export function AccountSecurityScreen({ setScreen, showToast }: ScreenProps) {
  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Account & Security</h1>
        </div>

        {/* Security Summary Card */}
        <div className="m-4 bg-gradient-to-r from-green-500/10 to-cyan-500/8 border border-green-500/25 rounded-2xl p-4.5 flex items-center gap-4">
          <div className="w-11 h-11 bg-green-500/12 rounded-xl flex items-center justify-center text-green-400 shrink-0">
            🛡️
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-200">
              Your account is <span className="text-green-400 font-bold">Secure</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">Last login: Today, just now</p>
          </div>
        </div>

        {/* Security Settings Options */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2">Security</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div onClick={() => showToast("Change password trigger coming soon")} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Change Password</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
          <div onClick={() => showToast("2FA coming soon")} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Two-Factor Authentication</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500 font-bold text-green-450 mr-1">On</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>
          <div onClick={() => showToast("Loading device audit logs...")} className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Login Devices</span>
            <ChevronRight size={15} className="text-slate-500" />
          </div>
        </div>

        {/* Device Linking Section */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2">Device Signature Link</div>
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl mx-4 p-4 font-sans">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-300">Device Signature</span>
            <span className="text-[11px] text-cyan-400 font-mono font-bold bg-cyan-950/40 px-2 py-0.5 border border-cyan-800/30 rounded-md">
              {localStorage.getItem("veltrixa_device_id") || "VLX-DEV-SIMULATOR"}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2.5 leading-relaxed">
            This workspace instance is digitally locked & bound onto this physical client device signature. Secure virtual guest accounts are strictly prohibited from relocating across nodes.
          </p>
        </div>

        {/* Account Info */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2">Account</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5 text-sm">
            <span className="font-medium">Phone Number</span>
            <span className="text-xs text-slate-500">Not set</span>
          </div>
          <div onClick={() => showToast("Permanent deletions are disabled during preview")} className="flex items-center justify-between p-4 hover:bg-red-500/5 text-red-400 cursor-pointer">
            <span className="font-semibold">Delete Account</span>
            <span className="text-xs text-red-400">➔</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════ 5. CHAT PREFERENCES SCREEN ══════════
export function ChatPreferencesScreen({ setScreen, showToast }: ScreenProps) {
  const [enterToSend, setEnterToSend] = useState(true);
  const [downloadMedia, setDownloadMedia] = useState(true);
  const [smartReplies, setSmartReplies] = useState(true);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Chat Preferences</h1>
        </div>

        {/* Chat Behavior */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2 font-sans">Chat Behavior</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <span className="text-sm font-medium">Enter to send messages</span>
            <button
              onClick={() => {
                setEnterToSend(!enterToSend);
                showToast(enterToSend ? "Press Send Button enabled" : "Enter key enabled");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${enterToSend ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${enterToSend ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium">Auto-download media files</span>
            <button
              onClick={() => setDownloadMedia(!downloadMedia)}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${downloadMedia ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${downloadMedia ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {/* Advanced AI Settings */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2 font-sans">Advanced AI</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden animate-slide-in">
          <div className="flex items-center justify-between p-4 select-none">
            <span className="text-sm font-medium">Generative smart replies</span>
            <button
              onClick={() => setSmartReplies(!smartReplies)}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${smartReplies ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${smartReplies ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {/* Wipe history button */}
        <button
          onClick={() => showToast("Simulated Chat cache wiped successfully!")}
          className="mx-4 mt-6 py-3.5 w-[calc(100%-32px)] border border-red-500/20 bg-red-500/5 hover:bg-red-500/12 text-sm text-red-500 font-bold rounded-xl cursor-pointer transition-all"
        >
          Clear Chat History
        </button>
      </div>
    </div>
  );
}

// ══════════ 6. MEMBERSHIP SUBSCRIPTION SCREEN ══════════
export function SubscriptionScreen({ setScreen, showToast }: ScreenProps) {
  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.PROFILE)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Subscription</h1>
        </div>

        {/* Hero Card */}
        <div className="m-4 bg-gradient-to-br from-cyan-500/15 via-purple-500/15 to-transparent border border-cyan-500/35 rounded-2xl p-5 flex gap-4">
          <div className="w-12 h-12 bg-cyan-500/15 rounded-xl flex items-center justify-center shrink-0">
            💎
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-100">Premium Plan</span>
              <span className="text-[10px] items-center bg-green-500/15 text-green-400 border border-green-500/30 font-bold px-2 py-0.5 rounded-md uppercase">
                Active
              </span>
            </div>
            <div className="text-lg font-rajdhani font-black text-slate-200 mt-1">$14.99/mo</div>
            <p className="text-[11px] text-slate-500 mt-1.5">Next billing date: Jun 24, 2026</p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2 font-sans">Premium Benefits</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 p-4 gap-3 text-xs leading-relaxed text-slate-300">
          <div className="flex gap-2">
            <span className="text-cyan-400">✔</span>
            <span>Unlimited server-side conversation turns using LLM engines</span>
          </div>
          <div className="flex gap-2">
            <span className="text-cyan-400">✔</span>
            <span>Ultra low latency streaming output</span>
          </div>
          <div className="flex gap-2">
            <span className="text-cyan-400">✔</span>
            <span>Figma, PDF and large file uploads up to 100MB capacity</span>
          </div>
          <div className="flex gap-2">
            <span className="text-cyan-400">✔</span>
            <span>Custom interstellar backgrounds & rotating nodes settings</span>
          </div>
        </div>

        <button
          onClick={() => showToast("Wired up to standard payments portal")}
          className="mx-4 mt-6 py-3.5 w-[calc(100%-32px)] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:opacity-90 text-sm font-bold tracking-wider font-rajdhani rounded-xl text-white uppercase"
        >
          Manage Plan Transactions
        </button>
      </div>
    </div>
  );
}

// ══════════ 7. PRIVACY SCREEN ══════════
export function PrivacyScreen({ setScreen, showToast }: ScreenProps) {
  const [profileVis, setProfileVis] = useState("Public");
  const [readReceipts, setReadReceipts] = useState(true);
  const [activeStatus, setActiveStatus] = useState(true);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Privacy settings</h1>
        </div>

        {/* Visibility */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2 font-sans">Visibility</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div 
            onClick={() => {
              const next = profileVis === "Public" ? "Contacts Only" : profileVis === "Contacts Only" ? "Private" : "Public";
              setProfileVis(next);
              showToast(`Profile visibility changed to ${next}`);
            }} 
            className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 cursor-pointer"
          >
            <span className="text-sm font-medium">Profile Visibility</span>
            <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-semibold">
              <span>{profileVis}</span>
              <ChevronRight size={14} className="text-slate-500" />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <div className="flex flex-col pr-4">
              <span className="text-sm font-medium">Read Receipts</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Let others see when you've read messages</span>
            </div>
            <button
              onClick={() => {
                setReadReceipts(!readReceipts);
                showToast(readReceipts ? "Read receipts disabled" : "Read receipts enabled");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer shrink-0 ${readReceipts ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${readReceipts ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex flex-col pr-4">
              <span className="text-sm font-medium">Show Activity Status</span>
              <span className="text-[10px] text-slate-500 mt-0.5">Show when you are active on the app</span>
            </div>
            <button
              onClick={() => {
                setActiveStatus(!activeStatus);
                showToast(activeStatus ? "Activity status hidden" : "Activity status visible");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer shrink-0 ${activeStatus ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${activeStatus ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>

        {/* Blocking */}
        <div className="text-[11px] text-slate-550 uppercase tracking-widest font-bold px-6 mt-4 mb-2 font-sans">Moderation</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div onClick={() => showToast("You have no blocked contacts.")} className="flex items-center justify-between p-4 hover:bg-white/5 cursor-pointer">
            <span className="text-sm font-medium">Blocked Contacts</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-slate-500">0 contacts</span>
              <ChevronRight size={15} className="text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════ 8. NOTIFICATIONS SCREEN ══════════
export function NotificationsScreen({ setScreen, showToast }: ScreenProps) {
  const [mentions, setMentions] = useState(true);
  const [replies, setReplies] = useState(true);
  const [sounds, setSounds] = useState(false);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Notifications</h1>
        </div>

        {/* Alert channels */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mt-4 mb-2 font-sans">Notification Channels</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl mx-4 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <span className="text-sm font-medium">Direct Mentions</span>
            <button
              onClick={() => {
                setMentions(!mentions);
                showToast(mentions ? "Mentions alerts off" : "Mentions alerts on");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${mentions ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${mentions ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <span className="text-sm font-medium">Group Replies</span>
            <button
              onClick={() => {
                setReplies(!replies);
                showToast(replies ? "Replies alerts off" : "Replies alerts on");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${replies ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${replies ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <span className="text-sm font-medium">App Sounds & Chimes</span>
            <button
              onClick={() => {
                setSounds(!sounds);
                showToast(sounds ? "Sounds muted" : "Sounds active");
              }}
              className={`w-11 h-6 rounded-full relative p-0.5 transition-colors cursor-pointer ${sounds ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${sounds ? "translate-x-5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════ 9. ACHIEVEMENTS SCREEN ══════════
export function AchievementsScreen({ setScreen, showToast }: ScreenProps) {
  const [filter, setFilter] = useState<"all" | "unlocked" | "locked">("all");

  const achievements = [
    {
      id: "first_contact",
      title: "First Contact",
      desc: "Initiated your first chat session with Gemini Smart Copilot",
      xp: 100,
      unlocked: true,
      date: "24 May 2026",
      icon: "🛰️",
      category: "unlocked",
    },
    {
      id: "infinite_explorer",
      title: "Infinite Explorer",
      desc: "Visited all main directories in the Explore feed",
      xp: 250,
      unlocked: true,
      date: "28 May 2026",
      icon: "🧭",
      category: "unlocked",
    },
    {
      id: "prompt_architect",
      title: "Prompt Architect",
      desc: "Send deep contextual prompts to the AI Agent system",
      xp: 500,
      unlocked: false,
      progress: { current: 34, target: 50 },
      icon: "🔮",
      category: "locked",
    },
    {
      id: "quantum_whisperer",
      title: "Quantum Whisperer",
      desc: "Configured local profile preferences and encryption details in Settings",
      xp: 350,
      unlocked: true,
      date: "02 June 2026",
      icon: "🔐",
      category: "unlocked",
    },
    {
      id: "galactic_socialite",
      title: "Galactic Socialite",
      desc: "Joined 3 or more collaborative guilds or design platforms",
      xp: 150,
      unlocked: false,
      progress: { current: 2, target: 3 },
      icon: "👥",
      category: "locked",
    },
    {
      id: "network_guru",
      title: "Network Guru",
      desc: "Connected a simulated database or cloud SQL storage layer",
      xp: 400,
      unlocked: false,
      progress: { current: 0, target: 1 },
      icon: "⚡",
      category: "locked",
    },
    {
      id: "alpha_builder",
      title: "Alpha Builder",
      desc: "Created a full-stack custom code block and initiated system compilation",
      xp: 600,
      unlocked: true,
      date: "10 June 2026",
      icon: "🏗️",
      category: "unlocked",
    },
  ];

  const filtered = achievements.filter((ach) => {
    if (filter === "unlocked") return ach.unlocked;
    if (filter === "locked") return !ach.unlocked;
    return true;
  });

  const totalXPValue = achievements.reduce((acc, curr) => acc + (curr.unlocked ? curr.xp : 0), 0);
  const totalMaxXPValue = achievements.reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.PROFILE)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Achievements</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* XP Level Box */}
        <div className="bg-gradient-to-br from-slate-900/90 to-purple-950/20 border border-white/5 rounded-2xl p-5 mx-4 mt-3 mb-5 shadow-inner">
          <div className="flex justify-between items-start mb-3.5">
            <div>
              <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest font-sans">Current Level</div>
              <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mt-1 font-rajdhani">
                LEVEL 12 • CAPTAIN
              </div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg px-2.5 py-1 text-[11px] font-bold text-cyan-400">
              {totalXPValue} XP
            </div>
          </div>

          <div className="w-full bg-slate-800/80 rounded-full h-2.5 overflow-hidden border border-white/5 relative">
            <div 
              style={{ width: `${(totalXPValue / totalMaxXPValue) * 100}%` }} 
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 transition-all duration-1000"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 font-medium">
            <span>Progress to Level 13</span>
            <span>{totalXPValue} / {totalMaxXPValue} Total XP</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex p-0.5 bg-slate-900/80 border border-white/5 rounded-xl mx-4 mb-5 font-sans gap-0.5">
          <button
            onClick={() => setFilter("all")}
            className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-lg cursor-pointer transition-all ${
              filter === "all" ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unlocked")}
            className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-lg cursor-pointer transition-all ${
              filter === "unlocked" ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Unlocked
          </button>
          <button
            onClick={() => setFilter("locked")}
            className={`flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wide rounded-lg cursor-pointer transition-all ${
              filter === "locked" ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-slate-950 font-extrabold" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Locked
          </button>
        </div>

        {/* List of achievements */}
        <div className="flex flex-col gap-3 px-4">
          {filtered.map((ach) => (
            <div
              key={ach.id}
              onClick={() => {
                if (ach.unlocked) {
                  showToast(`Achievement unlocked on ${ach.date}! (+${ach.xp} XP)`);
                } else {
                  showToast(`Unlock this badge by completing the objective!`);
                }
              }}
              className={`p-4 border rounded-2xl transition-all cursor-pointer relative overflow-hidden flex flex-col gap-3 group ${
                ach.unlocked 
                  ? "bg-slate-900/70 border-cyan-500/20 hover:border-cyan-500/45 hover:shadow-[0_0_15px_rgba(6,182,212,0.1)]" 
                  : "bg-slate-900/35 border-white/5 opacity-70 hover:opacity-90 hover:border-purple-500/15"
              }`}
            >
              {ach.unlocked && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-cyan-500/5 to-transparent blur-lg" />
              )}
              
              <div className="flex items-start gap-3.5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border text-lg relative ${
                  ach.unlocked 
                    ? "bg-gradient-to-br from-cyan-400/15 to-purple-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                    : "bg-slate-800 border-white/5 text-slate-550"
                }`}>
                  {ach.icon}
                  {ach.unlocked && (
                    <span className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-cyan-500 border-2 border-slate-950 flex items-center justify-center text-[7px] text-slate-950 font-bold">✓</span>
                  )}
                </div>

                <div className="flex-1 min-width-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`text-xs font-bold leading-none ${ach.unlocked ? "text-slate-200" : "text-slate-400"}`}>
                      {ach.title}
                    </h3>
                    <span className={`text-[9px] font-bold tracking-wide uppercase px-2 py-0.5 rounded border shrink-0 ${
                      ach.unlocked 
                        ? "bg-cyan-500/10 text-cyan-400 border-cyan-500/20" 
                        : "bg-white/5 text-slate-550 border-white/5"
                    }`}>
                      +{ach.xp} XP
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-2 leading-relaxed font-light font-sans">
                    {ach.desc}
                  </p>

                  {/* Progress info */}
                  {!ach.unlocked && ach.progress && (
                    <div className="mt-3 flex flex-col gap-1.5">
                      <div className="w-full bg-slate-800/60 rounded-full h-1 overflow-hidden relative">
                        <div 
                          style={{ width: `${(ach.progress.current / ach.progress.target) * 100}%` }}
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                        />
                      </div>
                      <div className="flex justify-between items-center text-[9px] text-slate-500 font-medium">
                        <span>Objective Progress</span>
                        <span>{ach.progress.current} / {ach.progress.target}</span>
                      </div>
                    </div>
                  )}

                  {ach.unlocked && (
                    <div className="text-[10px] text-cyan-500 mt-2.5 flex items-center gap-1 font-medium font-sans">
                      <span>✓ Unlocked:</span>
                      <span className="text-slate-500">{ach.date}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════ 10. SAVED ITEMS SCREEN ══════════
export function SavedItemsScreen({ setScreen, showToast }: ScreenProps) {
  const [activeTab, setActiveTab] = useState<"all" | "messages" | "images" | "docs">("all");
  const [search, setSearch] = useState("");

  const [savedItems, setSavedItems] = useState([
    {
      id: "sav1",
      type: "messages",
      title: "Cosmic inspiration excerpt",
      content: "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself.",
      meta: "Saved from Chat with Sophia",
      date: "Today, 14:20",
      format: "text",
    },
    {
      id: "sav2",
      type: "docs",
      title: "galactic_nebula_chart.pdf",
      content: "Analytical vector mappings of standard sub-nebula networks and star density registers.",
      meta: "14.5 MB • PDF document",
      date: "Yesterday, 11:45",
      format: "pdf",
    },
    {
      id: "sav3",
      type: "images",
      title: "Neon cyberpunk gateway",
      content: "Bespoke high-contrast creative design preset representing quantum space portals.",
      meta: "Saved from SynthArt Canvas",
      date: "12 June 2026",
      format: "png",
      imageUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&auto=format&fit=crop&q=60",
    },
    {
      id: "sav4",
      type: "docs",
      title: "three_js_background_visualizer.tsx",
      content: "Full TypeScript React script mapping vector matrix coordinates to visual canvas objects.",
      meta: "520 KB • Code script",
      date: "10 June 2026",
      format: "code",
    }
  ]);

  const removeSavedItem = (id: string, name: string) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== id));
    showToast(`Removed saved item: ${name}`);
  };

  const filteredItems = savedItems.filter((item) => {
    // Search filter
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.content.toLowerCase().includes(search.toLowerCase());
    
    // Tab filter
    if (activeTab === "all") return matchesSearch;
    return item.type === activeTab && matchesSearch;
  });

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.PROFILE)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Saved Items</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Search */}
        <div className="flex items-center gap-2 mx-4 my-3 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus-within:border-pink-500/40 transition-all font-sans">
          <Compass size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search bookmarks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Tab Row */}
        <div className="flex gap-2 px-4 mb-4 overflow-x-auto scrollbar-none">
          {["all", "messages", "images", "docs"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`rounded-full py-1.5 px-3.5 text-[10px] font-bold uppercase tracking-wider shrink-0 cursor-pointer transition-all ${
                activeTab === tab
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-slate-950 font-extrabold shadow-[0_0_12px_rgba(247,37,133,0.3)]"
                  : "bg-white/5 border border-white/5 hover:border-white/10 text-slate-400 hover:text-slate-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Saved List container */}
        <div className="flex flex-col gap-3 px-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-900/60 border border-white/5 rounded-2xl hover:border-pink-500/25 transition-all flex flex-col gap-3 relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className={`w-8.5 h-8.5 rounded-xl flex items-center justify-center shrink-0 border font-mono text-[9px] font-extrabold ${
                    item.type === "messages" 
                      ? "bg-purple-500/10 border-purple-500/20 text-purple-400"
                      : item.type === "images"
                      ? "bg-pink-500/10 border-pink-500/20 text-pink-400"
                      : "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
                  }`}>
                    {item.format.substring(0, 3).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-slate-200 truncate max-w-[200px]">{item.title}</h3>
                    <span className="text-[9px] text-slate-500 font-medium font-sans block mt-0.5">{item.meta}</span>
                  </div>
                </div>

                <button
                  onClick={() => removeSavedItem(item.id, item.title)}
                  className="p-1 rounded-lg text-slate-650 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                  title="Remove Bookmark"
                >
                  <Trash2 size={13.5} />
                </button>
              </div>

              {/* Saved snippet/data body rendering block */}
              <div 
                onClick={() => showToast(`Opening bookmark details: ${item.title}`)}
                className="bg-slate-950/40 border border-white/10 rounded-xl p-3 text-[11px] text-slate-400 leading-relaxed font-light cursor-pointer hover:bg-slate-950/70 transition-colors flex flex-col gap-2"
              >
                {item.type === "images" && item.imageUrl && (
                  <img 
                    src={item.imageUrl} 
                    referrerPolicy="no-referrer"
                    alt={item.title} 
                    className="w-full h-24 object-cover rounded-lg border border-white/10 mb-1" 
                  />
                )}
                <span>{item.content}</span>
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium pt-1">
                <span className="text-[10px]">Saved {item.date}</span>
                <span className="text-pink-400 hover:underline cursor-pointer text-[10px] font-bold" onClick={() => showToast(`Exporting ${item.title} layout successfully!`)}>Export</span>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-900/20 border border-dashed border-white/5 rounded-2xl">
              <span className="text-2xl opacity-40">🔖</span>
              <p className="text-xs text-slate-500 mt-2 font-medium">No saved {activeTab === "all" ? "" : activeTab + " "} items found in cache.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════ 11. LANGUAGE SCREEN ══════════
export function LanguageScreen({ setScreen, showToast }: ScreenProps) {
  const [activeLang, setActiveLang] = useState("en-US");
  const [search, setSearch] = useState("");
  const [autoDetect, setAutoDetect] = useState(true);

  const languages = [
    { code: "en-US", name: "English (United States)", native: "English", flag: "🇺🇸" },
    { code: "es-ES", name: "Español (España)", native: "Spanish", flag: "🇪🇸" },
    { code: "fr-FR", name: "Français (France)", native: "French", flag: "🇫🇷" },
    { code: "de-DE", name: "Deutsch (Deutschland)", native: "German", flag: "🇩🇪" },
    { code: "ja-JP", name: "日本語 (日本)", native: "Japanese", flag: "🇯🇵" },
    { code: "zh-CN", name: "简体中文 (中国)", native: "Chinese Simplified", flag: "🇨🇳" },
    { code: "pt-BR", name: "Português (Brasil)", native: "Portuguese", flag: "🇧🇷" },
    { code: "it-IT", name: "Italiano (Italia)", native: "Italian", flag: "🇮🇹" },
    { code: "ko-KR", name: "한국어 (대한민국)", native: "Korean", flag: "🇰🇷" },
  ];

  const filtered = languages.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.native.toLowerCase().includes(search.toLowerCase()) ||
      l.code.toLowerCase().includes(search.toLowerCase())
  );

  const selectLanguage = (code: string, name: string) => {
    setActiveLang(code);
    showToast(`Language set to ${name}`);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Language</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Toggle */}
        <div className="mx-4 mt-3 mb-4 bg-slate-900/60 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-slate-200">Auto-Detect Language</div>
            <div className="text-[10px] text-slate-500 mt-1">Adjust system layout dynamically to match local IP</div>
          </div>
          <button
            onClick={() => {
              setAutoDetect(!autoDetect);
              showToast(autoDetect ? "Auto-detect off" : "Auto-detect on");
            }}
            className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors cursor-pointer shrink-0 ${autoDetect ? "bg-gradient-to-r from-cyan-400 to-purple-500" : "bg-white/10"}`}
          >
            <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${autoDetect ? "translate-x-4.5" : "translate-x-0"}`} />
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mx-4 mb-4 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 focus-within:border-cyan-400/40 transition-all">
          <Compass size={14} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search languages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>

        {/* List */}
        <div className="flex flex-col mx-4 bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
          {filtered.map((l) => {
            const isSelected = activeLang === l.code;
            return (
              <div
                key={l.code}
                onClick={() => selectLanguage(l.code, l.name)}
                className={`flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors ${
                  isSelected ? "bg-cyan-500/5" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{l.flag}</span>
                  <div>
                    <span className="text-xs font-bold block text-slate-200">{l.name}</span>
                    <span className="text-[9px] text-slate-500 block font-normal">{l.native}</span>
                  </div>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.4)] flex items-center justify-center text-slate-950 font-bold text-[10px]">
                    ✓
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">No languages found matching search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════ 12. DATA & STORAGE SCREEN ══════════
export function DataStorageScreen({ setScreen, showToast }: ScreenProps) {
  const [cacheSize, setCacheSize] = useState(4.2);
  const [dbUsage, setDbUsage] = useState(0.18);
  const [lowData, setLowData] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [limitTokens, setLimitTokens] = useState(false);

  const clearCache = () => {
    if (cacheSize === 0) {
      showToast("Cache is already empty");
      return;
    }
    setCacheSize(0);
    showToast("Application cache space wiped successfully");
  };

  const clearDbSim = () => {
    setDbUsage(0.01);
    showToast("Simulated DB usage reset. Saved parameters purged.");
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Data & Storage</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12 px-4">
        {/* Storage Bar Indicator */}
        <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-4 mt-3 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <HardDrive size={15} className="text-indigo-400" />
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">Space Utilization</h2>
          </div>

          <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden border border-white/5 relative mb-2">
            <div
              style={{ width: `${((cacheSize + dbUsage) / 10) * 100}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 via-pink-500 to-cyan-400 rounded-full transition-all duration-300"
            />
          </div>

          <div className="flex justify-between items-center text-[10px] text-slate-500 font-medium">
            <span>Cache: {cacheSize.toFixed(2)} MB • DB: {dbUsage.toFixed(2)} MB</span>
            <span>Limit: 10.00 MB</span>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={clearCache}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[11px] font-bold text-slate-300 cursor-pointer transition-colors"
            >
              Clear Cache
            </button>
            <button
              onClick={clearDbSim}
              className="py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[11px] font-bold text-slate-300 cursor-pointer transition-colors"
            >
              Reset Data
            </button>
          </div>
        </div>

        {/* Network Usage metric block */}
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl p-4 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <Database size={15} className="text-pink-400" />
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-300">Network Telemetry</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">Messages Sent</span>
              <span className="text-sm font-bold text-slate-200 mt-1 block">158 Chats</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-[9px] text-slate-500 uppercase tracking-wider block">AISTUDIO Bandwidth</span>
              <span className="text-sm font-bold text-slate-100 mt-1 block">34.8 MB</span>
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-2 mb-2">Network Toggles</div>
        <div className="flex flex-col bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
          {/* Toggle 1 */}
          <div className="flex items-center justify-between p-4">
            <div>
              <div className="text-xs font-bold text-slate-200">Low Data Mode</div>
              <div className="text-[9px] text-slate-500 mt-1">Disables media visual loaders to conserve bandwidth</div>
            </div>
            <button
              onClick={() => {
                setLowData(!lowData);
                showToast(lowData ? "Low data mode disabled" : "Low data mode enabled");
              }}
              className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors cursor-pointer shrink-0 ${lowData ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${lowData ? "translate-x-4.5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Toggle 2 */}
          <div className="flex items-center justify-between p-4">
            <div>
              <div className="text-xs font-bold text-slate-200">Auto-Save Generated Media</div>
              <div className="text-[9px] text-slate-500 mt-1">Automatically push prompt illustrations to saved files</div>
            </div>
            <button
              onClick={() => {
                setAutoSave(!autoSave);
                showToast(autoSave ? "Auto-save disabled" : "Auto-save enabled");
              }}
              className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors cursor-pointer shrink-0 ${autoSave ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${autoSave ? "translate-x-4.5" : "translate-x-0"}`} />
            </button>
          </div>

          {/* Toggle 3 */}
          <div className="flex items-center justify-between p-4">
            <div>
              <div className="text-xs font-bold text-slate-200">Limit AI Token Response</div>
              <div className="text-[9px] text-slate-500 mt-1">Cap maximum conversational text replies to shorten outputs</div>
            </div>
            <button
              onClick={() => {
                setLimitTokens(!limitTokens);
                showToast(limitTokens ? "Token limits removed" : "Token limits activated");
              }}
              className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors cursor-pointer shrink-0 ${limitTokens ? "bg-gradient-to-r from-pink-500 to-purple-500" : "bg-white/10"}`}
            >
              <div className={`w-4.5 h-4.5 rounded-full bg-white shadow-md transform transition-transform ${limitTokens ? "translate-x-4.5" : "translate-x-0"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══════════ 13. HELP CENTER SCREEN ══════════
export function HelpCenterScreen({ setScreen, showToast }: ScreenProps) {
  const [search, setSearch] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs = [
    {
      id: "faq1",
      question: "How do I upgrade to Premium?",
      answer: "Go to your Profile tab and select the 'Upgrade Premium' banner. From there, you can choose the Galaxy Pro trial pass which unlocks direct API access, more custom avatars, and extended chat features.",
    },
    {
      id: "faq2",
      question: "Is my chat data encrypted?",
      answer: "Yes, all chat packets sent to the Google Gemini agent are insulated securely on standard sandboxed Node.js routing layers. No conversational history is shared or written outside your local workspace simulation.",
    },
    {
      id: "faq3",
      question: "Can I export my chat logs?",
      answer: "Absolutely! You can export saved chat items from your profile's Bookmark manager. Simply navigate to the 'Saved Items' screen and click 'Export' next to any archived chat snippet.",
    },
    {
      id: "faq4",
      question: "What model is the smart copilot using?",
      answer: "The copilot operates on Google's Gemini-3.5-flash paradigm, optimized for ultra-fast latency, high-density contextual reasoning, and zero performance over-allocation in mobile layouts.",
    },
  ];

  const filtered = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Help Center</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Support Banner card style */}
        <div className="mx-4 mt-3 mb-4 p-5 bg-gradient-to-br from-indigo-950/80 to-purple-950/30 border border-white/5 rounded-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/5 to-transparent blur-xl" />
          <div className="flex items-center gap-3 mb-2">
            <HelpCircle size={20} className="text-purple-400" />
            <h2 className="text-sm font-bold text-slate-200">Need Immediate Help?</h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed font-sans font-light">
            Our virtual assistants are primed for active developer consultations. Fire up questions on chat directly, or email technical logs.
          </p>
          <button
            onClick={() => {
              showToast("Opening immediate developer support gateway...");
            }}
            className="mt-4 px-4 py-2 bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-950 font-bold text-xs rounded-xl shadow-md cursor-pointer transition-opacity hover:opacity-90"
          >
            Contact Advisor
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 mx-4 mb-4 bg-white/5 border border-white/10 rounded-xl py-2.5 px-3.5 focus-within:border-purple-500/40 transition-all">
          <Compass size={14} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search help topics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
          />
        </div>

        {/* Accordions */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mb-2">Frequently Asked Questions</div>
        <div className="flex flex-col gap-2.5 px-4">
          {filtered.map((faq) => {
            const isExpanded = expandedFAQ === faq.id;
            return (
              <div
                key={faq.id}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "bg-slate-900/60 border-purple-500/35" : "bg-slate-900/30 border-white/5"
                }`}
              >
                <div
                  onClick={() => toggleFAQ(faq.id)}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-colors"
                >
                  <span className={`text-xs font-bold leading-snug pr-4 ${isExpanded ? "text-cyan-400" : "text-slate-300"}`}>
                    {faq.question}
                  </span>
                  <ChevronRight
                    size={14}
                    className={`text-slate-500 transform transition-transform shrink-0 ${isExpanded ? "rotate-90 text-cyan-400" : ""}`}
                  />
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4.5 pt-0.5 border-t border-white/5 animate-fade-in">
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light font-sans">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="p-8 text-center text-slate-550 text-xs bg-slate-900/20 rounded-2xl border border-dashed border-white/5">
              No matching FAQs discovered.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════ 14. FEEDBACK SCREEN ══════════
export function FeedbackScreen({ setScreen, showToast }: ScreenProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [category, setCategory] = useState("Bug");
  const [comments, setComments] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = ["Bug", "Suggestion", "Praise", "Other"];

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      showToast("Please tap a star rating before submitting!");
      return;
    }
    if (!comments.trim()) {
      showToast("Please write some brief commentary!");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      showToast("Feedback filed to our development core!");
    }, 1200);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">Feedback</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {success ? (
          <div className="p-8 text-center flex flex-col items-center justify-center h-full max-h-[600px] animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500/80 flex items-center justify-center text-slate-950 text-2xl font-bold shadow-[0_0_20px_rgba(34,211,238,0.4)] mb-5">
              ✓
            </div>
            <h2 className="text-lg font-bold text-slate-100 font-rajdhani tracking-wide uppercase">Feedback Received!</h2>
            <p className="text-xs text-slate-400 mt-3 max-w-[280px] leading-relaxed font-sans font-light">
              Your report has been successfully transmitted. We review raw developer comments on every release of AI Studio.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                setRating(0);
                setComments("");
                setEmail("");
                setScreen(AppScreen.SETTING);
              }}
              className="mt-8 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-slate-200 cursor-pointer transition-colors"
            >
              Back to Settings
            </button>
          </div>
        ) : (
          <form onSubmit={handleFeedbackSubmit} className="flex flex-col gap-5 px-4 mt-3">
            {/* Category Select */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Feedback Category</label>
              <div className="flex gap-2 shrink-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider rounded-xl cursor-pointer border transition-all ${
                      category === cat
                        ? "bg-purple-500/15 border-purple-500 text-purple-300"
                        : "bg-white/5 border-white/5 hover:border-white/10 text-slate-450"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Star Rating Panel */}
            <div className="flex flex-col gap-2.5 items-center p-4 bg-slate-900/40 border border-white/5 rounded-2xl">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rate of Experience</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const fillStar = hoverRating >= star || rating >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-all cursor-pointer transform ${
                        fillStar ? "scale-110 text-pink-400 drop-shadow-[0_0_8px_rgba(247,37,133,0.35)]" : "text-slate-700"
                      }`}
                    >
                      ★
                    </button>
                  );
                })}
              </div>
              <span className="text-[9px] text-slate-400 font-medium tracking-wide">
                {rating === 1 ? "Disappointed" : rating === 2 ? "Needs Improvements" : rating === 3 ? "Acceptable" : rating === 4 ? "Impressive" : rating === 5 ? "Sublime!" : "How would you rate us?"}
              </span>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Contact Email (Optional)</label>
              <input
                type="email"
                placeholder="developer@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs text-slate-200 outline-none focus:border-pink-500/30 transition-colors font-sans"
              />
            </div>

            {/* Commentary TextArea */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest pl-1">Message commentary</label>
              <textarea
                placeholder="Share your thoughts or elaborate on bugs encountered during compile actions..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                rows={45}
                className="w-full min-h-[120px] max-h-[180px] bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-xs text-slate-200 outline-none focus:border-pink-500/30 transition-colors font-sans leading-relaxed resize-none"
              />
            </div>

            {/* Glowing Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="mt-3 w-full py-3.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:opacity-90 disabled:opacity-50 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(247,37,133,0.15)] cursor-pointer transition-all flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                  MAPPING METADATA...
                </>
              ) : (
                "Submit Feedback"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ══════════ 15. ABOUT APP SCREEN ══════════
export function AboutAppScreen({ setScreen, showToast }: ScreenProps) {
  const [updating, setUpdating] = useState(false);
  const [versionText, setVersionText] = useState("v2.1.0");

  const runUpdateScan = () => {
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
      showToast("Updates scan complete: Software is up to date.");
    }, 1500);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
        <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase flex-1 text-center pr-6">About App</h1>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Futuristic App Logo Display */}
        <div className="flex flex-col items-center justify-center py-7 text-center relative overflow-hidden">
          <div className="w-18 h-18 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.25)] border border-cyan-400/25 mb-4 select-none relative group">
            <span className="text-2xl font-extrabold text-slate-950 font-rajdhani">G</span>
            <div className="absolute -inset-1 blur bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-600 opacity-20 group-hover:opacity-35 transition-opacity rounded-3xl" />
          </div>

          <h2 className="text-base font-bold text-slate-100 font-rajdhani tracking-wide uppercase">Gemini Copilot App</h2>
          <span className="text-[10px] text-cyan-400 font-mono tracking-widest mt-1 block">RELEASE CHIP • ALPHA 12</span>
        </div>

        {/* Build parameters and system summary */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mb-2">Build Parameters</div>
        <div className="flex flex-col mx-4 bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 mb-5 font-sans">
          <div className="flex justify-between items-center p-4">
            <span className="text-xs text-slate-400">Software Variant</span>
            <span className="text-xs font-semibold text-slate-200">2.1.0-ViteTS</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-xs text-slate-400">Target Framework</span>
            <span className="text-xs font-semibold text-slate-200">React 18.3 & Tailwind</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-xs text-slate-400">Container Port</span>
            <span className="text-xs font-mono text-cyan-400">3000 Active</span>
          </div>
          <div className="flex justify-between items-center p-4">
            <span className="text-xs text-slate-400">Build Timestamp</span>
            <span className="text-xs text-slate-350">June 2026 UTC</span>
          </div>
        </div>

        {/* System Status Monitoring Block */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mb-2">Systems Status</div>
        <div className="mx-4 p-4 bg-slate-900/35 border border-white/5 rounded-2xl flex flex-col gap-3 mb-5">
          <div className="flex items-center justify-between text-xs font-sans font-light text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Core API Core Thread
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-extrabold uppercase">ONLINE</span>
          </div>

          <div className="flex items-center justify-between text-xs font-sans font-light text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Sandbox Container Layer
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-extrabold uppercase">SECURE</span>
          </div>

          <div className="flex items-center justify-between text-xs font-sans font-light text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Local Persistent State
            </span>
            <span className="text-[10px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-extrabold uppercase">SYNCED</span>
          </div>
        </div>

        {/* Legal Attributions */}
        <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mb-2">Attributions & Legal</div>
        <div className="flex flex-col mx-4 bg-slate-900/60 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 mb-6">
          <div
            onClick={() => showToast("Showing Terms of Service parameters...")}
            className="flex justify-between items-center p-4 hover:bg-white/5 cursor-pointer text-xs"
          >
            <span className="text-slate-350">Terms of Service</span>
            <ChevronRight size={13.5} className="text-slate-500" />
          </div>
          <div
            onClick={() => showToast("Opening Privacy Principles document...")}
            className="flex justify-between items-center p-4 hover:bg-white/5 cursor-pointer text-xs"
          >
            <span className="text-slate-350">Privacy Principles</span>
            <ChevronRight size={13.5} className="text-slate-500" />
          </div>
          <div
            onClick={() => showToast("Open-Source credits list: React, Lucide, Tailwind, esbuild")}
            className="flex justify-between items-center p-4 hover:bg-white/5 cursor-pointer text-xs"
          >
            <span className="text-slate-350">Open-Source Disclosures</span>
            <ChevronRight size={13.5} className="text-slate-500" />
          </div>
        </div>

        {/* Action Button */}
        <div className="px-4">
          <button
            onClick={runUpdateScan}
            disabled={updating}
            className="w-full py-3 border border-white/15 hover:border-white/25 text-slate-200 text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-white/5 cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {updating ? (
              <>
                <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-200 border-t-transparent animate-spin" />
                SCANNING CHANNELS...
              </>
            ) : (
              "Check for Updates"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}


