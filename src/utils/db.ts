import { ChatMessage, CallLog, SavedFile, ActivityLog, UserProfileData } from "../types";

// Default seed data for a rich, interactive Veltrixa universe
// Since the prompt instructs us to make everything fully functional, mutable, and persistent,
// we prepopulate these as editable seed records so the user starts with an active ecosystem
// which they can completely modify, override, append, or delete.

const DEFAULT_USER_PROFILE: UserProfileData = {
  displayName: "New User",
  email: "",
  username: "@username",
  bio: "",
  location: "",
  website: ""
};

const DEFAULT_CHATS: Record<string, ChatMessage[]> = {};

const DEFAULT_CALLS: CallLog[] = [];

const DEFAULT_FILES: SavedFile[] = [];

const DEFAULT_ACTIVITIES: ActivityLog[] = [];

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
