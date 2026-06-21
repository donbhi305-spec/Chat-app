import { useState } from "react";
import { AppScreen, SavedFile, ActivityLog } from "../../types";
import { ArrowLeft, User, MessageSquare, PhoneCall, Heart, Award, Bell, Eye, Star, FileText, CheckCircle, Clock } from "lucide-react";

interface ScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
}

interface UserProfileScreenProps {
  setScreen: (scr: AppScreen) => void;
  showToast: (msg: string) => void;
  profileUser?: { name: string; avatarColor?: string } | null;
  onBack?: () => void;
}

const otherUsersData: Record<string, {
  name: string;
  avatar: string;
  username: string;
  bio: string;
  posts: number;
  likes: number;
  sectors: string;
  col: string;
  verified: boolean;
  credentials: { icon: "award" | "star"; title: string; year: string }[];
}> = {
  "Sophia Carter": {
    name: "Sophia Carter",
    avatar: "👩‍🚀",
    username: "@sophia.carter",
    bio: "Astrophysicist & AI Engineer. Love building cosmic systems and analyzing quantum algorithms. 🛰️🌌",
    posts: 842,
    likes: 245,
    sectors: "12.5K",
    col: "bg-pink-500/10 text-pink-400",
    verified: true,
    credentials: [
      { icon: "award", title: "Cosmic Architecture Laureate", year: "2026" },
      { icon: "star", title: "Alpha Systems Pioneer", year: "Veteran" }
    ]
  },
  "AI Assistant": {
    name: "AI Assistant",
    avatar: "🤖",
    username: "@veltrixa.assistant",
    bio: "Official AI Assistant of Veltrixa. Designed for sleek conversation, cybernetic tasks, and instant knowledge delivery. 🧠✨",
    posts: 12050,
    likes: 9999,
    sectors: "120K",
    col: "bg-purple-500/15 text-purple-400",
    verified: true,
    credentials: [
      { icon: "award", title: "Core Intelligence Engine", year: "AI" },
      { icon: "star", title: "Quantum Multi-Core Network", year: "v3.5" }
    ]
  },
  "Creative Spark AI": {
    name: "Creative Spark AI",
    avatar: "🎨",
    username: "@creative.spark",
    bio: "Generative AI specializing in creative writing, sci-fi plots, futuristic lore, and digital canvas ideas. ✍️🌠",
    posts: 4210,
    likes: 3500,
    sectors: "45K",
    col: "bg-cyan-500/10 text-cyan-400",
    verified: true,
    credentials: [
      { icon: "award", title: "Literary Spark Processor", year: "Creative" }
    ]
  },
  "Code Assistant AI": {
    name: "Code Assistant AI",
    avatar: "💻",
    username: "@code.helper",
    bio: "Bespoke development agent trained to parse syntactic blocks, debug complex stacks, and design clean systems. 🛠️⚡",
    posts: 15400,
    likes: 12800,
    sectors: "98K",
    col: "bg-pink-500/15 text-pink-400",
    verified: true,
    credentials: [
      { icon: "star", title: "Type-Safe Paradigm Guardian", year: "Code" }
    ]
  },
  "Ethan Walker": {
    name: "Ethan Walker",
    avatar: "👨‍💻",
    username: "@ethan.dev",
    bio: "Quantum system administrator & gamer. Building distributed ledgers on the stellar net. 🎮🛸",
    posts: 142,
    likes: 89,
    sectors: "1.2K",
    col: "bg-teal-500/10 text-teal-400",
    verified: false,
    credentials: [
      { icon: "star", title: "Quantum Net Cadet", year: "2025" }
    ]
  }
};

// ══════════ 1. SOPHIA CARTER USER PROFILE SCREEN ══════════
export function UserProfileScreen({ setScreen, showToast, profileUser, onBack }: UserProfileScreenProps) {
  const [following, setFollowing] = useState(false);

  const selectedName = profileUser?.name || "Sophia Carter";
  const userDetails = otherUsersData[selectedName] || otherUsersData["Sophia Carter"];

  const [likes, setLikes] = useState(userDetails.likes);
  const [hasLiked, setHasLiked] = useState(false);

  const [prevName, setPrevName] = useState(selectedName);
  if (selectedName !== prevName) {
    setPrevName(selectedName);
    setLikes(userDetails.likes);
    setHasLiked(false);
    setFollowing(false);
  }

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      showToast(`Profile liked! ${userDetails.name} has been notified.`);
    }
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => onBack ? onBack() : setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">User Profile</h1>
          <button onClick={handleLike} className={`p-1.5 rounded-full hover:bg-white/5 shrink-0 ${hasLiked ? "text-pink-500" : "text-slate-500"}`}>
            <Heart size={18} fill={hasLiked ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Hero Cards */}
        <div className="flex flex-col items-center px-6 py-6 border-b border-white/5">
          <div className="relative w-28 h-28 mb-4">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 p-[2px] animate-spin-ring">
              <div className="w-full h-full rounded-full bg-slate-950" />
            </div>
            <div className="absolute inset-2 rounded-full overflow-hidden bg-slate-900 border border-purple-500/20 flex items-center justify-center">
              <span className="text-4xl">{userDetails.avatar}</span>
            </div>
            {userDetails.verified && (
              <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center border-2 border-slate-950 text-[10px] text-white font-bold">
                ✔
              </div>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <h2 className="text-lg font-bold text-slate-100 tracking-wide">{userDetails.name}</h2>
            {userDetails.verified && (
              <span className="text-[10px] bg-gradient-to-r from-cyan-400 to-purple-500/8 border border-cyan-500/30 px-1.5 py-0.5 rounded-md text-white font-bold tracking-widest uppercase">
                Verif
              </span>
            )}
          </div>
          <div className="text-xs text-cyan-400 font-medium tracking-wide mt-1">{userDetails.username}</div>
          <p className="text-xs text-slate-400 font-light text-center mt-3 max-w-[280px] leading-relaxed">
            {userDetails.bio}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 bg-slate-900/60 border border-white/5 rounded-2xl mx-4 py-4 px-3 my-5">
          <div className="text-center">
            <div className="text-sm font-bold font-rajdhani text-slate-100">{userDetails.posts}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Posts</div>
          </div>
          <div className="text-center border-x border-slate-800">
            <div className="text-sm font-bold font-rajdhani text-slate-100">{likes}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Likes</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold font-rajdhani text-slate-100">{userDetails.sectors}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Sectors</div>
          </div>
        </div>

        {/* User Badges */}
        {userDetails.credentials && userDetails.credentials.length > 0 && (
          <>
            <div className="text-[11px] text-slate-500 uppercase tracking-widest font-bold px-6 mb-2">Verified Credentials</div>
            <div className="flex flex-col gap-2 mx-4 mb-5">
              {userDetails.credentials.map((cred, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    {cred.icon === "award" ? (
                      <Award size={16} className="text-cyan-400" />
                    ) : (
                      <Star size={16} className="text-purple-400 animate-pulse" />
                    )}
                    <span className="text-xs font-semibold text-slate-200">{cred.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{cred.year}</span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3.5 px-4">
          <button
            onClick={() => {
              setFollowing(!following);
              showToast(following ? `Unfollowed ${userDetails.name}` : `Following ${userDetails.name}!`);
            }}
            className={`py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
              following
                ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 text-green-400"
                : "bg-gradient-to-r from-cyan-400 to-purple-500 hover:opacity-95 text-white shadow-lg active:scale-95"
            }`}
          >
            {following ? "✔ Following" : "Follow"}
          </button>
          <button
            onClick={() => {
              setScreen(AppScreen.AI_CHAT);
            }}
            className="py-3 bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-xl text-xs font-bold tracking-wider text-slate-350 uppercase transition-all flex items-center justify-center gap-1.5"
          >
            <MessageSquare size={13} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════ 2. RECENT ACTIVITY SCREEN ══════════
export function ActivityScreen({ setScreen, showToast }: ScreenProps) {
  const activities: ActivityLog[] = [
    { id: "act1", type: "replies", title: "Sophia Carter replied to your plot idea", body: "Check the Galactic Explorers channel for feedback.", time: "10 mins ago", unread: true },
    { id: "act2", type: "mentions", title: "New login parsed from Chrome browser", body: "Server IP matches your standard session location.", time: "2 hrs ago", unread: false },
    { id: "act3", type: "reactions", title: "Billing subscription confirmed", body: "Premium plan renews is scheduled for next month.", time: "Yesterday", unread: false },
    { id: "act4", type: "mentions", title: "Liam Johnson mentioned you in Developers Hub", body: "Can you review the Three.js canvas loader script?", time: "May 20", unread: false },
  ];

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Notifications</h1>
        </div>

        {/* Activity Feed */}
        <div className="flex flex-col gap-2.5 px-4 my-3">
          {activities.map((a) => (
            <div
              key={a.id}
              onClick={() => showToast(`Opening activity detail: ${a.title}`)}
              className={`p-4 rounded-2xl border cursor-pointer hover:scale-[1.01] transition-all flex gap-3 ${
                a.unread
                  ? "bg-purple-950/15 border-purple-500/40 shadow-[0_0_12px_rgba(155,93,229,0.1)] animate-bounce-subtle"
                  : "bg-slate-900 border-white/5"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {a.unread ? (
                  <div className="w-8.5 h-8.5 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Bell size={15} className="animate-wiggle" />
                  </div>
                ) : (
                  <div className="w-8.5 h-8.5 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                    <CheckCircle size={15} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-width-0">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-xs font-bold text-slate-200">{a.title}</span>
                  {a.unread && (
                    <div className="w-2 h-2 rounded-full bg-pink-500 shrink-0 shadow-[0_0_6px_#f72585]" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400 font-light mt-1.5 leading-relaxed">{a.body}</p>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-2">
                  <Clock size={10} />
                  <span>{a.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══════════ 3. SAVED FILES LIBRARY SCREEN ══════════
export function FilesScreen({ setScreen, showToast }: ScreenProps) {
  const [search, setSearch] = useState("");

  const files: SavedFile[] = [
    { id: "f1", name: "galactic_nebula_chart.pdf", size: "14.5 MB", format: "pdf", date: "Today" },
    { id: "f2", name: "quantum_node_loader.ts", size: "348 KB", format: "code", date: "Yesterday" },
    { id: "f3", name: "interstellar_mission_log.txt", size: "1.2 MB", format: "doc", date: "May 20" },
    { id: "f4", name: "three_js_background_visualizer.tsx", size: "520 KB", format: "code", date: "May 18" },
  ];

  const filteredFiles = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Library Docs</h1>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mx-4 my-3 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus-within:border-cyan-500/40 transition-all">
          <Eye size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search saved file cache..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none"
          />
        </div>

        {/* Files feed */}
        <div className="flex flex-col gap-2.5 px-4 mb-4">
          {filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => showToast(`Simulating secure decryption of file: ${file.name}`)}
              className="flex items-center justify-between p-3.5 bg-slate-900 border border-white/5 rounded-2xl hover:border-cyan-500/20 cursor-pointer shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20 text-cyan-400 font-mono text-[10px] group-hover:bg-cyan-500/15">
                  {file.format.toUpperCase()}
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide text-slate-200 text-ellipsis overflow-hidden break-all max-w-[200px]">{file.name}</div>
                  <div className="text-[10px] text-slate-500 mt-1 flex gap-2">
                    <span>{file.size}</span>
                    <span>•</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              </div>
              <span className="text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1.5 transition-all text-xs">➔</span>
            </div>
          ))}
          {filteredFiles.length === 0 && (
            <p className="text-xs text-slate-600 text-center py-6">No matching documents cached.</p>
          )}
        </div>
      </div>
    </div>
  );
}
