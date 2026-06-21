import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { AppScreen } from "../../types";
import { 
  ArrowLeft, Database, Key, CheckCircle, AlertTriangle, RefreshCw, Terminal, 
  Copy, Check, Trash2, Code, ShieldAlert, Cpu, Layers, HardDrive, Network
} from "lucide-react";
import { 
  getSupabaseCredentials, 
  saveSupabaseCredentials, 
  clearSupabaseCredentials, 
  generateSupabaseSQL 
} from "../../utils/supabase";
import { SupabaseSync } from "../../utils/supabaseSync";
import { auth } from "../../utils/firebase";

interface DatabaseSyncScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string, type?: string) => void;
}

export default function DatabaseSyncScreen({ setScreen, showToast }: DatabaseSyncScreenProps) {
  // Credentials state
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [configSource, setConfigSource] = useState({ isCustom: false, isEnv: false });

  // Connection testing state
  const [testing, setTesting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<{
    success: boolean | null;
    message: string;
  }>({ success: null, message: "Connection untested. Click 'Test Connection'." });

  // Active sync count status
  const [counts, setCounts] = useState({ chats: 0, calls: 0, files: 0, activities: 0 });
  const [loadingCounts, setLoadingCounts] = useState(false);

  // Copied SQL flag
  const [copiedSql, setCopiedSql] = useState(false);

  // Load initial credentials and stats
  useEffect(() => {
    const creds = getSupabaseCredentials();
    setSupabaseUrl(creds.url);
    setSupabaseKey(creds.key);
    setConfigSource({ isCustom: creds.isCustom, isEnv: creds.isEnv });
    
    // Auto-test if credentials present
    if (creds.url && creds.key) {
      testCurrentConnection();
      queryActiveCounts();
    }
  }, []);

  const testCurrentConnection = async () => {
    setTesting(true);
    setConnectionStatus({ success: null, message: "Pinging database remote network nodes..." });
    const res = await SupabaseSync.testConnection();
    setConnectionStatus({ success: res.success, message: res.message });
    setTesting(false);
    if (res.success) {
      showToast("Supabase node connected perfectly!", "ok");
      queryActiveCounts();
    } else {
      showToast("Failed to verify Supabase connection.", "error");
    }
  };

  const handleSaveCredentials = () => {
    if (!supabaseUrl.trim() || !supabaseKey.trim()) {
      showToast("Please enter both Supabase URL and Anon Key!");
      return;
    }
    saveSupabaseCredentials(supabaseUrl, supabaseKey);
    const creds = getSupabaseCredentials();
    setConfigSource({ isCustom: creds.isCustom, isEnv: creds.isEnv });
    showToast("Supabase credentials configured & stored locally!", "ok");
    testCurrentConnection();
  };

  const handleClearCredentials = () => {
    clearSupabaseCredentials();
    setSupabaseUrl("");
    setSupabaseKey("");
    setConfigSource({ isCustom: false, isEnv: false });
    setConnectionStatus({ success: null, message: "Credentials cleared. Using virtual offline Sandbox." });
    setCounts({ chats: 0, calls: 0, files: 0, activities: 0 });
    showToast("Supabase custom endpoints removed.");
  };

  const queryActiveCounts = async () => {
    setLoadingCounts(true);
    try {
      const activeChats = await SupabaseSync.pullChats("AI Assistant");
      const activeCalls = await SupabaseSync.pullCalls();
      const activeFiles = await SupabaseSync.pullFiles();
      const activeActivities = await SupabaseSync.pullActivities();
      setCounts({
        chats: activeChats.length,
        calls: activeCalls.length,
        files: activeFiles.length,
        activities: activeActivities.length
      });
    } catch (err) {
      console.warn("Failed querying remote row counts:", err);
    } finally {
      setLoadingCounts(false);
    }
  };

  const handleCopySql = () => {
    const sql = generateSupabaseSQL();
    navigator.clipboard.writeText(sql);
    setCopiedSql(true);
    showToast("SQL Setup script copied to clipboard!", "ok");
    setTimeout(() => setCopiedSql(false), 3000);
  };

  // Firebase Auth snapshot
  const currentUser = auth.currentUser;

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-cyan-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(6,182,212,0.12)]">
      {/* Visual glowing frame notches */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      {/* Sticky Header */}
      <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20 border-b border-white/5">
        <button onClick={() => setScreen(AppScreen.SETTING)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0 cursor-pointer">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-sm font-bold tracking-widest text-slate-100 font-rajdhani uppercase">Database & Sync Hub</h1>
        <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
          <Database size={14} />
        </div>
      </div>

      {/* Main Scroller Content */}
      <div className="flex-1 overflow-y-auto scrollbar-none px-5 py-4 space-y-5 pb-10">
        
        {/* Connection Mode HUD */}
        <div className="bg-slate-900/70 border border-white/5 rounded-2xl p-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/5 to-transparent rounded-full pointer-events-none" />
          
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">Operation Engine</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
              configSource.isCustom || configSource.isEnv
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-amber-500/10 text-amber-500 border border-amber-500/25"
            }`}>
              {configSource.isCustom || configSource.isEnv ? "SUPABASE REAL-TIME ACTIVE" : "LOCAL SANDBOX DEMO"}
            </span>
          </div>

          <h3 className="text-sm font-bold tracking-wide mt-2 text-slate-200">
            {configSource.isCustom || configSource.isEnv 
              ? "Linked to Supabase Storage Node" 
              : "Virtual SQLite Sandbox (Local Only)"}
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            {configSource.isCustom || configSource.isEnv
              ? "All actions, chat messages, and documents are instantly written and streamed directly to your cloud project database."
              : "No connection keys configured. Using reactive client-side database seeds that persist dynamically in local storage."}
          </p>
        </div>

        {/* FIREBASE AUTH SECURITY SNAPSHOT */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Network size={13} strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest font-rajdhani text-indigo-400">Firebase Authentication</h4>
              <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">User Identity Node</p>
            </div>
          </div>

          {currentUser ? (
            <div className="space-y-1.5 text-xs bg-slate-950/60 rounded-xl p-3 border border-white/5 font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">PROVIDER:</span>
                <span className="text-slate-350 font-bold uppercase">firebase_auth_email</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">EMAIL:</span>
                <span className="text-cyan-400 truncate max-w-[140px]" title={currentUser.email || ""}>
                  {currentUser.email}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">UID:</span>
                <span className="text-slate-400 truncate max-w-[120px]" title={currentUser.uid}>
                  {currentUser.uid}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">STATE:</span>
                <span className="text-emerald-400 font-bold">● SIGNED_IN</span>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-red-500/5 border border-red-500/15 rounded-xl flex items-center gap-3">
              <ShieldAlert size={16} className="text-red-400" />
              <div className="text-xs text-slate-400 leading-tight">
                No active Firebase profile has logged in. Authentication is operating in Guest Session layout.
              </div>
            </div>
          )}
        </div>

        {/* SUPABASE KEY CONFIGURATION LAYOUT */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Key size={13} />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest font-rajdhani text-cyan-400">Supabase Endpoints</h4>
                <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold">Target Cloud Data Service</p>
              </div>
            </div>
            
            {(configSource.isCustom) && (
              <button 
                onClick={handleClearCredentials}
                className="text-[10px] text-pink-500 font-semibold flex items-center gap-1.5 px-2 py-1 rounded bg-pink-500/5 hover:bg-pink-500/10 border border-pink-500/15 cursor-pointer"
              >
                <Trash2 size={10} />
                Reset
              </button>
            )}
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wide mb-1.5">Supabase URL</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="https://your-project.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wide mb-1.5">Anon API Key</label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                  className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500/40 font-mono"
                />
              </div>
            </div>

            <button 
              onClick={handleSaveCredentials}
              className="w-full py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 rounded-xl text-xs font-bold text-white transition-all shadow-md shadow-cyan-500/5 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu size={13} />
              Set Active Config
            </button>
          </div>
        </div>

        {/* CONNECTION STATUS HUD */}
        {(supabaseUrl && supabaseKey) && (
          <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-4 space-y-3">
            <h4 className="text-[10px] uppercase font-semibold text-slate-500 tracking-wide">Sync Handshake Node Status</h4>
            
            <div className="p-3 bg-slate-950/50 rounded-xl border border-white/5 space-y-2">
              <div className="flex items-start gap-2.5">
                {connectionStatus.success === true ? (
                  <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                ) : connectionStatus.success === false ? (
                  <AlertTriangle size={15} className="text-pink-500 shrink-0 mt-0.5" />
                ) : (
                  <RefreshCw size={14} className="text-cyan-400 shrink-0 mt-0.5 animate-spin" />
                )}
                
                <div className="text-xs">
                  <span className={`font-bold uppercase block tracking-wider text-[10px] ${
                    connectionStatus.success === true ? "text-emerald-400" : connectionStatus.success === false ? "text-pink-500" : "text-cyan-450"
                  }`}>
                    {connectionStatus.success === true ? "SUCCESS ONLINE" : connectionStatus.success === false ? "VERIFICATION FAILED" : "CONNECTING..."}
                  </span>
                  <p className="text-slate-400 mt-1 leading-relaxed text-[11px] font-mono whitespace-pre-wrap">
                    {connectionStatus.message}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={testCurrentConnection}
                disabled={testing}
                className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-semibold text-slate-300 border border-white/5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <RefreshCw size={11} className={testing ? "animate-spin" : ""} />
                Test Latency
              </button>
              
              <button
                onClick={queryActiveCounts}
                disabled={loadingCounts}
                className="flex-1 py-1.5 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-semibold text-slate-300 border border-white/5 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <Layers size={11} className={loadingCounts ? "animate-spin" : ""} />
                Fetch Row Metrics
              </button>
            </div>
          </div>
        )}

        {/* REMOTE ROW COUNTERS METRICS */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4">
          <h4 className="text-xs font-bold uppercase tracking-widest font-rajdhani text-purple-400 mb-3">Sync Matrix Tables Map</h4>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-slate-500 text-[10px]">chats table:</span>
              <span className="text-slate-100 font-bold mt-1 text-sm">
                {loadingCounts ? "..." : counts.chats} <span className="text-[10px] font-normal text-slate-500">rows</span>
              </span>
            </div>
            
            <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-slate-500 text-[10px]">calls table:</span>
              <span className="text-slate-100 font-bold mt-1 text-sm">
                {loadingCounts ? "..." : counts.calls} <span className="text-[10px] font-normal text-slate-500">rows</span>
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-slate-500 text-[10px]">files table:</span>
              <span className="text-slate-100 font-bold mt-1 text-sm">
                {loadingCounts ? "..." : counts.files} <span className="text-[10px] font-normal text-slate-500">rows</span>
              </span>
            </div>

            <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5 flex flex-col justify-between">
              <span className="text-slate-500 text-[10px]">activities table:</span>
              <span className="text-slate-100 font-bold mt-1 text-sm">
                {loadingCounts ? "..." : counts.activities} <span className="text-[10px] font-normal text-slate-500">rows</span>
              </span>
            </div>
          </div>
        </div>

        {/* SCHEMA SQL CONSOLE BLOCK */}
        <div className="bg-slate-900/40 border border-white/5 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Code size={13} className="text-cyan-400" />
              <h4 className="text-xs font-bold uppercase tracking-widest font-rajdhani text-slate-200">Database Schema Script</h4>
            </div>
            
            <button
              onClick={handleCopySql}
              className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-white/5 hover:bg-white/10 border border-white/10 text-slate-350 cursor-pointer flex items-center gap-1"
            >
              {copiedSql ? <Check size={10} className="text-emerald-400" /> : <Copy size={10} />}
              {copiedSql ? "Copied" : "Copy SQL"}
            </button>
          </div>
          
          <p className="text-xs text-slate-500 leading-normal">
            To use your own remote Supabase database, copy the setup SQL script, go to your <strong className="text-slate-400">Supabase Console &gt; SQL Editor</strong>, paste and run it! This creates all target tables safely.
          </p>

          <div className="bg-slate-950/90 border border-white/5 rounded-xl p-3 text-[10px] font-mono text-slate-400 max-h-36 overflow-y-auto scrollbar-none select-text">
            <pre className="whitespace-pre">{generateSupabaseSQL()}</pre>
          </div>
        </div>

      </div>

    </div>
  );
}
