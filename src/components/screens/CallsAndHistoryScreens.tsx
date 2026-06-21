import { useState, useEffect } from "react";
import { AppScreen, CallLog, SavedFile, ActivityLog } from "../../types";
import { 
  ArrowLeft, PhoneCall, Phone, Video, MoreVertical, X, Award, MapPin, 
  Trash2, Search, FileText, Play, ExternalLink, Calendar, CheckSquare,
  Plus
} from "lucide-react";

interface ScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
  activeCall?: any;
  setActiveCall: (call: any) => void;
}

// ══════════ 1. RECENT CALLS SCREEN ══════════
export function CallsScreen({ setScreen, showToast, setActiveCall }: ScreenProps) {
  const [activeTab, setActiveTab] = useState<"all" | "missed" | "outgoing" | "incoming">("all");

  const calls: CallLog[] = [
    { id: "call1", name: "Sophia Carter", type: "incoming", time: "10:30 AM" },
    { id: "call2", name: "Liam Johnson", type: "outgoing", time: "Yesterday" },
    { id: "call3", name: "Maya Patel", type: "missed", time: "Yesterday" },
    { id: "call4", name: "Ethan Walker", type: "incoming", time: "May 20" },
    { id: "call5", name: "Noah Brooks", type: "outgoing", time: "May 20" },
  ];

  const handleStartCall = (name: string, type: "voice" | "video") => {
    setActiveCall({ type, name });
    setScreen(type === "voice" ? AppScreen.VOICE_CALL : AppScreen.VIDEO_CALL);
  };

  const filteredCalls = calls.filter((c) => activeTab === "all" || c.type === activeTab);

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Calls</h1>
        </div>

        {/* Tab row */}
        <div className="flex gap-4 border-b border-white/5 px-6 pb-2.5 mb-3">
          {(["all", "missed", "outgoing", "incoming"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs font-semibold capitalize pb-1 relative cursor-pointer ${
                activeTab === tab ? "text-slate-100" : "text-slate-550"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-11px] left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500" />
              )}
            </button>
          ))}
        </div>

        {/* Call Lists */}
        <div className="flex flex-col gap-1 px-4">
          {filteredCalls.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 rounded-2xl hover:border-purple-500/15 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-purple-500/20 text-slate-400 text-sm font-semibold">
                  👤
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-300">{c.name}</div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-slate-500">
                    <span className="text-[10.5px]">
                      {c.type === "incoming" && "📥 Incoming"}
                      {c.type === "outgoing" && "📤 Outgoing"}
                      {c.type === "missed" && "❌ Missed"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-550">{c.time}</span>
                <button
                  onClick={() => handleStartCall(c.name, "voice")}
                  className="w-8.5 h-8.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center shrink-0 transition-colors"
                >
                  <Phone size={15} />
                </button>
              </div>
            </div>
          ))}
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

        <button className="nav-item active">
          <svg className="w-[19px] h-[19px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="text-[10px] mt-1 font-semibold tracking-wider">Calls</span>
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

// ══════════ 2. VOICE CALL SCREEN ══════════
export function VoiceCallScreen({ setScreen, showToast, activeCall, setActiveCall }: ScreenProps) {
  const [seconds, setSeconds] = useState(0);
  const [muted, setMute] = useState(false);
  const [speakerOn, setSpeakerOn] = useState(false);

  useEffect(() => {
    const inter = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(inter);
  }, []);

  const formatTimer = (sec: number) => {
    const mins = String(Math.floor(sec / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleEndCall = () => {
    showToast("Call ended successfully");
    setActiveCall(null);
    setScreen(AppScreen.CALLS);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col justify-between overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-5">
        <h1 className="text-xs uppercase tracking-widest font-rajdhani font-bold text-slate-500">Voice Call</h1>
        <button onClick={() => showToast("Features loaded successfully")} className="p-1 rounded-full text-slate-500">
          <MoreVertical size={16} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 py-10">
        {/* Glowing floating Avatar */}
        <div className="relative w-36 h-36 mb-6">
          <div className="absolute inset-[-14px] rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/20 blur-md animate-orb-pulse" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[2px] animate-spin-ring">
            <div className="w-full h-full bg-slate-950 rounded-full" />
          </div>
          <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-900 border border-purple-500/20 flex items-center justify-center">
            <span className="text-5xl">👤</span>
          </div>
        </div>

        <h2 className="text-xl font-bold Tracking-wide text-slate-100">{activeCall?.name || "Sophia Carter"}</h2>
        <div className="flex items-center gap-1.5 mt-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-md" />
          <span className="text-xs text-green-400 font-medium">Active Line</span>
        </div>
        <div className="text-sm font-semibold font-sans mt-3 text-slate-400 tracking-wide tabular-nums">
          {formatTimer(seconds)}
        </div>

        {/* Waves animation */}
        <div className="flex items-center gap-1 h-9 mt-8 w-28 opacity-80 justify-center">
          <div className="w-1 bg-cyan-400 rounded" style={{ animation: "voiceWave 0.8s ease-in-out infinite alternate" }} />
          <div className="w-1 bg-cyan-400 rounded" style={{ animation: "voiceWave 1.0s ease-in-out infinite alternate 0.2s" }} />
          <div className="w-1 bg-cyan-400 rounded" style={{ animation: "voiceWave 1.3s ease-in-out infinite alternate 0.1s" }} />
          <div className="w-1 bg-cyan-400 rounded" style={{ animation: "voiceWave 0.9s ease-in-out infinite alternate 0.3s" }} />
          <div className="w-1 bg-cyan-400 rounded" style={{ animation: "voiceWave 1.1s ease-in-out infinite alternate 0.05s" }} />
        </div>

        {/* Buttons Panel */}
        <div className="flex gap-5 mt-10">
          <button
            onClick={() => {
              setMute(!muted);
              showToast(muted ? "Microphone unmuted" : "Microphone muted");
            }}
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-100 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/5 flex items-center justify-center shrink-0 transition-all ${muted ? "bg-gradient-to-r from-red-500 to-pink-500 border-transparent text-white" : ""}`}>
              🎤
            </div>
            <span className="text-[10.5px] font-semibold">{muted ? "Muted" : "Mute"}</span>
          </button>

          <button
            onClick={() => {
              setSpeakerOn(!speakerOn);
              showToast(speakerOn ? "Speaker off" : "Speaker on");
            }}
            className="flex flex-col items-center gap-1.5 text-slate-500 hover:text-slate-100 transition-colors"
          >
            <div className={`w-12 h-12 rounded-full border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/5 flex items-center justify-center shrink-0 transition-all ${speakerOn ? "bg-gradient-to-r from-cyan-400 to-purple-500 border-transparent text-white" : ""}`}>
              🔊
            </div>
            <span className="text-[10.5px] font-semibold">Speaker</span>
          </button>

          <button onClick={() => showToast("Simulating key entry dialogue...")} className="flex flex-col items-center gap-1.5 text-slate-500">
            <div className="w-12 h-12 rounded-full border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-500/5 flex items-center justify-center shrink-0 transition-all">
              🎹
            </div>
            <span className="text-[10.5px] font-semibold">Keypad</span>
          </button>
        </div>

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="mt-8 w-14 h-14 rounded-full bg-gradient-to-br from-red-500 to-pink-600 hover:opacity-90 active:scale-95 flex items-center justify-center shrink-0 shadow-[0_6px_24px_rgba(239,68,68,0.5)] cursor-pointer"
        >
          <Phone className="text-white transform rotate-[135deg]" size={22} />
        </button>
      </div>
    </div>
  );
}

// ══════════ 3. VIDEO CALL SCREEN ══════════
export function VideoCallScreen({ setScreen, showToast, activeCall, setActiveCall }: ScreenProps) {
  const [seconds, setSeconds] = useState(514); // starts at 08:34 representation
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    const inter = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(inter);
  }, []);

  const formatTimer = (sec: number) => {
    const mins = String(Math.floor(sec / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleEndCall = () => {
    showToast("Video call ceased successfully");
    setActiveCall(null);
    setScreen(AppScreen.CALLS);
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] rounded-[36px] overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      {/* simulated main video backgrounds */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 z-0">
        <div className="absolute inset-0 bg-radial-at-cl-tr from-purple-500/25 via-transparent" />
        <div className="absolute inset-0 bg-radial-at-bl from-cyan-500/25 via-transparent" />
      </div>

      <div className="absolute top-[80px] left-[18px] z-20 bg-black/45 backdrop-filter backdrop-blur-md rounded-lg px-3 py-1 font-sans text-xs text-white">
        {formatTimer(seconds)}
      </div>

      {/* Mini PiP selfie self-views */}
      <div className="absolute top-[80px] right-[18px] z-20 w-22 h-30 rounded-2xl border border-white/25 shadow-2xl bg-slate-900/90 overflow-hidden cursor-pointer flex items-center justify-center">
        <div className="absolute inset-0 bg-radial-at-tr from-cyan-500/20" />
        <span className="text-xl">🤵</span>
      </div>

      {/* Top action bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pb-10 pt-5 bg-gradient-to-b from-black/60 to-transparent">
        <button onClick={handleEndCall} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
          ⬅
        </button>
        <span className="text-sm font-semibold font-rajdhani uppercase tracking-wide text-white">{activeCall?.name || "Sophia Carter"}</span>
        <button onClick={() => showToast("Rotating camera index...")} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
          🔁
        </button>
      </div>

      {/* Centered caller card overlay when cameraOff */}
      {cameraOff && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm animate-[panelIn_0.3s]">
          <span className="text-5xl mb-2">👤</span>
          <span className="text-xs text-slate-500">Camera Off</span>
        </div>
      )}

      {/* Controls HUD row */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <button
            onClick={() => setMuted(!muted)}
            className="flex flex-col items-center gap-1.5 text-slate-350"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/20 transition-all ${muted ? "bg-red-500 border-transparent text-white" : "bg-black/40"}`}>
              🎤
            </div>
            <span className="text-[10px] font-medium">Mute</span>
          </button>

          <button
            onClick={() => setCameraOff(!cameraOff)}
            className="flex flex-col items-center gap-1.5 text-slate-355"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center border border-white/20 transition-all ${cameraOff ? "bg-red-500 border-transparent text-white" : "bg-black/40"}`}>
              📹
            </div>
            <span className="text-[10px] font-medium">Video</span>
          </button>

          <button
            onClick={() => handleEndCall()}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-550 flex items-center justify-center shrink-0 shadow-lg active:scale-95 transition-all"
          >
            <PhoneCall size={20} className="text-white rotate-[135deg]" />
          </button>
        </div>
      </div>
    </div>
  );
}
