import { useState, useEffect } from "react";
import { AppScreen, SavedFile, ActivityLog } from "../../types";
import { ArrowLeft, MessageSquare, Heart, Award, Bell, Eye, Star, CheckCircle, Clock, Plus } from "lucide-react";
import { SupabaseSync } from "../../utils/supabaseSync";

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

// ══════════ 1. DYNAMIC USER PROFILE SCREEN (SUPABASE POWERED) ══════════
export function UserProfileScreen({ setScreen, showToast, profileUser, onBack }: UserProfileScreenProps) {
  const [following, setFollowing] = useState(false);
  const selectedName = profileUser?.name || "Explorer";

  const [dbUser, setDbUser] = useState({
    name: selectedName,
    avatar: "👤",
    username: `@${selectedName.toLowerCase().replace(/\s+/g, "")}`,
    bio: "Connecting credentials...",
    posts: 0,
    likes: 0,
    sectors: "0",
    verified: false,
    col: "bg-cyan-500/10 text-cyan-400",
    credentials: [] as { icon: string; title: string; year: string }[]
  });

  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadUserProfile() {
      setLoading(true);
      try {
        const { getSupabaseClient } = await import("../../utils/supabase");
        const supabase = getSupabaseClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .or(`display_name.eq."${selectedName}",username.eq."${selectedName}"`)
            .limit(1)
            .maybeSingle();

          if (!error && data) {
            setDbUser({
              name: data.display_name || data.username || selectedName,
              avatar: data.avatar_url || "👤",
              username: data.username || `@${selectedName.toLowerCase().replace(/\s+/g, "")}`,
              bio: data.bio || "No bio has been added to this profile.",
              posts: data.post_count || 0,
              likes: data.followers_count || 0,
              sectors: "Alpha Node",
              verified: data.followers_count > 10,
              col: "bg-cyan-500/10 text-cyan-400",
              credentials: []
            });
            setLikes(data.followers_count || 0);
            return;
          }
        }
      } catch (err) {
        console.warn("Could not fetch user profile from public.profiles table: ", err);
      } finally {
        setLoading(false);
      }

      // Safe clean empty-state fallback (Never show mock/plagiarized datasets)
      setDbUser({
        name: selectedName,
        avatar: "👤",
        username: `@${selectedName.toLowerCase().replace(/\s+/g, "")}`,
        bio: "Profile bio is empty.",
        posts: 0,
        likes: 0,
        sectors: "0",
        verified: false,
        col: "bg-cyan-500/10 text-cyan-400",
        credentials: []
      });
      setLikes(0);
    }

    loadUserProfile();
  }, [selectedName]);

  const handleLike = () => {
    if (hasLiked) {
      setLikes(likes - 1);
      setHasLiked(false);
    } else {
      setLikes(likes + 1);
      setHasLiked(true);
      showToast(`Logged like count update! ${dbUser.name} has been notified.`);
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
              <span className="text-4xl">{dbUser.avatar}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <h2 className="text-sm font-bold text-slate-100 tracking-wide">{dbUser.name}</h2>
            {dbUser.verified && (
              <span className="text-[10px] bg-gradient-to-r from-cyan-400 to-purple-500/8 border border-cyan-500/30 px-1.5 py-0.5 rounded-md text-white font-bold tracking-widest uppercase">
                Verif
              </span>
            )}
          </div>
          <div className="text-xs text-cyan-400 font-medium tracking-wide mt-1">{dbUser.username}</div>
          <p className="text-xs text-slate-450 font-light text-center mt-3 max-w-[280px] leading-relaxed">
            {dbUser.bio}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 bg-slate-900/60 border border-white/5 rounded-2xl mx-4 py-4 px-3 my-5">
          <div className="text-center">
            <div className="text-sm font-bold font-rajdhani text-slate-100">{dbUser.posts}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Posts</div>
          </div>
          <div className="text-center border-x border-slate-800">
            <div className="text-sm font-bold font-rajdhani text-slate-100">{likes}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Likes</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-bold font-rajdhani text-slate-100">{dbUser.sectors}</div>
            <div className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold mt-1">Status</div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 gap-3.5 px-4 mt-6">
          <button
            onClick={() => {
              setFollowing(!following);
              showToast(following ? `Unfollowed ${dbUser.name}` : `Following ${dbUser.name}!`);
            }}
            className={`py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
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
            className="py-3 bg-white/5 border border-white/10 hover:border-cyan-400/40 rounded-xl text-xs font-bold tracking-wider text-slate-350 uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <MessageSquare size={13} />
            Message
          </button>
        </div>
      </div>
    </div>
  );
}

// ══════════ 2. RECENT ACTIVITY SCREEN (SUPABASE FLUID FEED) ══════════
export function ActivityScreen({ setScreen, showToast }: ScreenProps) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchLogs() {
      setLoading(true);
      try {
        const data = await SupabaseSync.pullActivities();
        setActivities(data || []);
      } catch (err) {
        console.warn("Offline fallback for activities active.");
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  const handleClear = async () => {
    try {
      await SupabaseSync.clearAllActivities();
      setActivities([]);
      showToast("Cleared activity cache!");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Notifications</h1>
          </div>
          {activities.length > 0 && (
            <button
              onClick={handleClear}
              className="text-xs text-red-400 hover:text-red-300 transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Activity Feed */}
        <div className="flex flex-col gap-2.5 px-4 my-3">
          {activities.map((a) => (
            <div
              key={a.id}
              onClick={() => showToast(`Opening notification: ${a.title}`)}
              className={`p-4 rounded-2xl border cursor-pointer hover:scale-[1.01] transition-all flex gap-3 ${
                a.unread
                  ? "bg-purple-950/15 border-purple-500/40 shadow-[0_0_12px_rgba(155,93,229,0.1)]"
                  : "bg-slate-900 border-white/5"
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {a.unread ? (
                  <div className="w-8.5 h-8.5 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                    <Bell size={15} />
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

          {!loading && activities.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-2xl text-slate-600 mb-4">
                🔔
              </div>
              <h3 className="text-sm font-bold text-slate-350 tracking-wide font-rajdhani uppercase">All Clear!</h3>
              <p className="text-xs text-slate-500 mt-2 max-w-[240px] leading-relaxed">
                No new alerts or log mentions mapped to this cloud workspace coordinate.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ══════════ 3. SAVED FILES LIBRARY SCREEN (SUPABASE INTEGRATION) ══════════
export function FilesScreen({ setScreen, showToast }: ScreenProps) {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState<SavedFile[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchFiles() {
      setLoading(true);
      try {
        const data = await SupabaseSync.pullFiles();
        setFiles(data || []);
      } catch (err) {
        console.warn("Offline fallback for files active.");
      } finally {
        setLoading(false);
      }
    }
    fetchFiles();
  }, []);

  const handleUploadSimulate = async () => {
    const names = ["workspace_security_auth.pem", "matrix_quantum_nodes.bin", "telemetry_coordinate_logs.json", "three_js_mesh_loader.ts"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const formats = ["key", "bin", "json", "code"];
    const format = formats[names.indexOf(randomName)];

    const newFile: SavedFile = {
      id: "f_" + Date.now(),
      name: randomName,
      size: `${(Math.random() * 8 + 0.5).toFixed(1)} MB`,
      format: format,
      date: "Just Now",
      category: "documents"
    };

    try {
      await SupabaseSync.pushFile(newFile);
      setFiles([newFile, ...files]);
      showToast(`Logged file node insertion: ${randomName}`);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredFiles = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="screen w-full max-w-[420px] h-full max-h-[860px] bg-slate-950/85 backdrop-blur-2xl border border-purple-500/25 rounded-[36px] flex flex-col overflow-hidden relative shadow-[0_0_60px_rgba(155,93,229,0.12)] font-sans">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-10" />

      <div className="flex-1 overflow-y-auto scrollbar-none pb-12">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-3 bg-slate-950/70 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setScreen(AppScreen.MAIN)} className="p-1.5 rounded-full hover:bg-white/5 text-slate-350 shrink-0">
              <ArrowLeft size={18} />
            </button>
            <h1 className="text-base font-bold tracking-tight text-slate-100 font-rajdhani uppercase">Library Docs</h1>
          </div>
          <button
            onClick={handleUploadSimulate}
            className="p-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30 transition-all cursor-pointer"
            title="Upload Document Node"
          >
            <Plus size={15} />
          </button>
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 mx-4 my-3 bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus-within:border-cyan-500/40 transition-all">
          <Eye size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            placeholder="Search saved file cache..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-600"
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
                  {(file.format || "bin").toUpperCase()}
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
          {!loading && filteredFiles.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-white/5 flex items-center justify-center text-xl text-slate-600 mb-4">
                📂
              </div>
              <h3 className="text-xs font-bold text-slate-350 tracking-wide font-rajdhani uppercase">Library Empty</h3>
              <p className="text-[11px] text-slate-500 mt-1.5 max-w-[200px] leading-relaxed">
                Click + at the top right to upload a secure document node.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
