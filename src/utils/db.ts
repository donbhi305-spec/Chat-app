import { ChatMessage, CallLog, SavedFile, ActivityLog, UserProfileData } from "../types";

// Default seed data for a rich, interactive Veltrixa universe
// Since the prompt instructs us to make everything fully functional, mutable, and persistent,
// we prepopulate these as editable seed records so the user starts with an active ecosystem
// which they can completely modify, override, append, or delete.

const DEFAULT_USER_PROFILE: UserProfileData = {
  displayName: "Veltrixa Explorer",
  email: "guest_explorer@veltrixa.network",
  username: "@veltrixa.explorer",
  bio: "Quantum network operator, digital artisan, and workspace architect. Securing cloud run modules on the fly. 🛰️🌌",
  location: "Sector 7G (Orbital Hub)",
  website: "https://veltrixa.network"
};

const DEFAULT_CHATS: Record<string, ChatMessage[]> = {
  "Sophia Carter": [
    { id: "s1", sender: "Sophia", text: "Welcome to Veltrixa network nodes! I've mapped the custom ThreeJS orbital grids.", time: "10:15 AM" },
    { id: "s2", sender: "user", text: "Looks amazing, Sophia! Thanks for the clean setup.", time: "10:16 AM" },
    { id: "s3", sender: "Sophia", text: "Always happy to assist. Let me know if you want to explore coordinate telemetry graphs next!", time: "10:17 AM" }
  ],
  "AI Assistant": [
    { id: "ai1", sender: "bot", text: "Greetings Explorer. Veltrixa Core systems are online and fully synched with Gemini.", time: "09:00 AM" }
  ],
  "Creative Spark AI": [
    { id: "cs1", sender: "bot", text: "Stellar imagination matrix engaged. Send me a sci-fi prompt or storyline to manifest futuristic lore!", time: "Yesterday" }
  ],
  "Code Assistant AI": [
    { id: "cd1", sender: "bot", text: "Code Assistant ready. Paste any syntactic algorithms or system schemas to analyze optimization steps.", time: "May 20" }
  ],
  "Ethan Walker": [
    { id: "e1", sender: "Ethan", text: "Hey! Did you see the new quantum ledgers on the stellar net?", time: "May 18" },
    { id: "e2", sender: "user", text: "Yes, Ethan, just reviewing the cryptographic blocks now.", time: "May 18" },
    { id: "e3", sender: "Ethan", text: "Super cool, isn't it? Talk to you later!", time: "May 19" }
  ],
  "AI Innovators": [
    { id: "g1_1", sender: "Sophia", text: "Nice work on the visual loader rings! The depth fields look superb.", time: "10:15 AM" },
    { id: "g1_2", sender: "Liam", text: "Agreed. Adding responsive vector grids handles expansion beautifully.", time: "10:18 AM" }
  ],
  "Space Enthusiasts": [
    { id: "g2_1", sender: "Maya", text: "Did anyone catch the stellar launch windows telemetry data yesterday?", time: "Yesterday" },
    { id: "g2_2", sender: "Alex", text: "Yes! Peak velocity crossed coordinates safely on schedule.", time: "Yesterday" }
  ]
};

const DEFAULT_CALLS: CallLog[] = [
  { id: "call1", name: "Sophia Carter", type: "incoming", time: "10:30 AM" },
  { id: "call2", name: "Liam Johnson", type: "outgoing", time: "Yesterday" },
  { id: "call3", name: "Maya Patel", type: "missed", time: "Yesterday" },
  { id: "call4", name: "Ethan Walker", type: "incoming", time: "May 20" }
];

const DEFAULT_FILES: SavedFile[] = [
  { id: "f1", name: "galactic_nebula_chart.pdf", size: "14.5 MB", format: "pdf", date: "Today", category: "documents" },
  { id: "f2", name: "quantum_node_loader.ts", size: "348 KB", format: "code", date: "Yesterday", category: "documents" },
  { id: "f3", name: "interstellar_mission_log.txt", size: "1.2 MB", format: "doc", date: "May 20", category: "documents" },
  { id: "f4", name: "three_js_background_visualizer.tsx", size: "520 KB", format: "code", date: "May 18", category: "documents" }
];

const DEFAULT_ACTIVITIES: ActivityLog[] = [
  { id: "act1", type: "replies", title: "Sophia Carter replied to your plot idea", body: "Check the Galactic Explorers channel for feedback.", time: "10 mins ago", unread: true },
  { id: "act2", type: "mentions", title: "New login parsed from Chrome browser", body: "Server IP matches your standard session location.", time: "2 hrs ago", unread: false },
  { id: "act3", type: "reactions", title: "Billing subscription confirmed", body: "Premium plan renewal is scheduled for next month.", time: "Yesterday", unread: false },
  { id: "act4", type: "mentions", title: "Liam Johnson mentioned you in Developers Hub", body: "Can you review the Three.js canvas loader script?", time: "May 20", unread: false }
];

// Helper to interact with browser local storage keys
const getStorageJSON = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading key ${key} from local storage`, e);
    return fallback;
  }
};

const setStorageJSON = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing key ${key} to local storage`, e);
  }
};

// Central Database Accessors
export const VDB = {
  // Profiles & Relations (Follow, Likes)
  getUserProfile: (): UserProfileData => {
    return getStorageJSON<UserProfileData>("vlx_db_profile", DEFAULT_USER_PROFILE);
  },
  setUserProfile: (profile: UserProfileData) => {
    setStorageJSON("vlx_db_profile", profile);
  },
  
  // Likes and follows trackers (per username / entity mapped)
  getLikesCount: (targetName: string, initialLikes: number): number => {
    return getStorageJSON<number>(`vlx_db_likes_${targetName}`, initialLikes);
  },
  setLikesCount: (targetName: string, likes: number) => {
    setStorageJSON(`vlx_db_likes_${targetName}`, likes);
  },
  getLikeStatus: (targetName: string): boolean => {
    return getStorageJSON<boolean>(`vlx_db_liked_${targetName}`, false);
  },
  setLikeStatus: (targetName: string, hasLiked: boolean) => {
    setStorageJSON(`vlx_db_liked_${targetName}`, hasLiked);
  },
  getFollowingStatus: (targetName: string): boolean => {
    return getStorageJSON<boolean>(`vlx_db_following_${targetName}`, false);
  },
  setFollowingStatus: (targetName: string, following: boolean) => {
    setStorageJSON(`vlx_db_following_${targetName}`, following);
  },

  // Groups/Communities Directory Status
  getJoinedCommunities: (): Record<string, boolean> => {
    return getStorageJSON<Record<string, boolean>>("vlx_db_joined_comm", {
      "galactic": true, // Default joines
      "creators": false,
      "coders": true
    });
  },
  saveJoinedCommunities: (joined: Record<string, boolean>) => {
    setStorageJSON("vlx_db_joined_comm", joined);
  },

  // Calls logs
  getCalls: (): CallLog[] => {
    return getStorageJSON<CallLog[]>("vlx_db_calls", DEFAULT_CALLS);
  },
  addCall: (call: Omit<CallLog, "id">) => {
    const calls = VDB.getCalls();
    const newCall: CallLog = {
      ...call,
      id: "call_" + Date.now() + "_" + Math.floor(Math.random() * 1000)
    };
    setStorageJSON("vlx_db_calls", [newCall, ...calls]);
    return newCall;
  },
  deleteCall: (id: string) => {
    const calls = VDB.getCalls();
    const remaining = calls.filter(c => c.id !== id);
    setStorageJSON("vlx_db_calls", remaining);
  },
  clearCalls: () => {
    setStorageJSON("vlx_db_calls", []);
  },

  // Files logs
  getFiles: (): SavedFile[] => {
    return getStorageJSON<SavedFile[]>("vlx_db_files", DEFAULT_FILES);
  },
  addFile: (file: Omit<SavedFile, "id" | "date">) => {
    const files = VDB.getFiles();
    const newFile: SavedFile = {
      ...file,
      id: "file_" + Date.now() + "_" + Math.floor(Math.random() * 100),
      date: "Today"
    };
    setStorageJSON("vlx_db_files", [newFile, ...files]);
    return newFile;
  },
  deleteFile: (id: string) => {
    const files = VDB.getFiles();
    const remaining = files.filter(f => f.id !== id);
    setStorageJSON("vlx_db_files", remaining);
  },

  // Activity logs / Notifications
  getActivities: (): ActivityLog[] => {
    return getStorageJSON<ActivityLog[]>("vlx_db_activities", DEFAULT_ACTIVITIES);
  },
  setActivities: (activities: ActivityLog[]) => {
    setStorageJSON("vlx_db_activities", activities);
  },
  addActivity: (activity: Omit<ActivityLog, "id" | "time" | "unread">) => {
    const activities = VDB.getActivities();
    const newAct: ActivityLog = {
      ...activity,
      id: "act_" + Date.now(),
      time: "Just now",
      unread: true
    };
    setStorageJSON("vlx_db_activities", [newAct, ...activities]);
    return newAct;
  },
  markActivityRead: (id: string) => {
    const activities = VDB.getActivities();
    const updated = activities.map(act => act.id === id ? { ...act, unread: false } : act);
    setStorageJSON("vlx_db_activities", updated);
  },
  deleteActivity: (id: string) => {
    const activities = VDB.getActivities();
    const remaining = activities.filter(act => act.id !== id);
    setStorageJSON("vlx_db_activities", remaining);
  },
  clearAllActivities: () => {
    setStorageJSON("vlx_db_activities", []);
  },

  // Conversation/Chat threads persistence
  getChatHistory: (chatId: string): ChatMessage[] => {
    const chatsMap = getStorageJSON<Record<string, ChatMessage[]>>("vlx_db_chats", DEFAULT_CHATS);
    return chatsMap[chatId] || [];
  },
  saveChatHistory: (chatId: string, messages: ChatMessage[]) => {
    const chatsMap = getStorageJSON<Record<string, ChatMessage[]>>("vlx_db_chats", DEFAULT_CHATS);
    chatsMap[chatId] = messages;
    setStorageJSON("vlx_db_chats", chatsMap);
  },
  clearChatHistory: (chatId: string) => {
    const chatsMap = getStorageJSON<Record<string, ChatMessage[]>>("vlx_db_chats", DEFAULT_CHATS);
    chatsMap[chatId] = [];
    setStorageJSON("vlx_db_chats", chatsMap);
  },
  getAllChatsMap: (): Record<string, ChatMessage[]> => {
    return getStorageJSON<Record<string, ChatMessage[]>>("vlx_db_chats", DEFAULT_CHATS);
  }
};
