export enum AppScreen {
  AUTH = "AUTH",
  MAIN = "MAIN", // Home
  DASHBOARD = "DASHBOARD",
  EXPLORE = "EXPLORE",
  PROFILE = "PROFILE",
  EDIT_PROFILE = "EDIT_PROFILE",
  SETTING = "SETTING",
  ACCOUNT_SECURITY = "ACCOUNT_SECURITY",
  NOTIFICATIONS = "NOTIFICATIONS",
  PRIVACY = "PRIVACY",
  CHAT_PREFERENCES = "CHAT_PREFERENCES",
  SUBSCRIPTION = "SUBSCRIPTION",
  FILES = "FILES",
  CALLS = "CALLS",
  ACTIVITY = "ACTIVITY",
  ADD_FRIENDS = "ADD_FRIENDS",
  AI_ASSISTANT_INTRO = "AI_ASSISTANT_INTRO",
  AI_CHAT = "AI_CHAT",
  GROUP_CHAT = "GROUP_CHAT", // For Space Enthusiasts
  GROUP_CHAT_2 = "GROUP_CHAT_2", // For AI Innovators
  VOICE_CALL = "VOICE_CALL",
  VIDEO_CALL = "VIDEO_CALL",
  MEDIA = "MEDIA",
  NEW_CHAT = "NEW_CHAT",
  GROUPS = "GROUPS",
  USER_PROFILE = "USER_PROFILE",
  ACHIEVEMENTS = "ACHIEVEMENTS",
  SAVED_ITEMS = "SAVED_ITEMS",
  LANGUAGE = "LANGUAGE",
  DATA_STORAGE = "DATA_STORAGE",
  HELP_CENTER = "HELP_CENTER",
  FEEDBACK = "FEEDBACK",
  ABOUT_APP = "ABOUT_APP"
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  time: string;
  avatarColor?: string;
}

export interface UserProfileData {
  displayName: string;
  email: string;
  username: string;
  bio: string;
  location: string;
  website: string;
}

export interface CallLog {
  id: string;
  name: string;
  type: "incoming" | "outgoing" | "missed";
  time: string;
}

export interface SavedFile {
  id: string;
  name: string;
  size: string;
  type?: string;
  format: string;
  date: string;
  category?: "documents" | "videos" | "photos" | "links";
}

export interface ActivityLog {
  id: string;
  type: "mentions" | "replies" | "reactions";
  name?: string;
  title?: string;
  text?: string;
  body?: string;
  time: string;
  unread?: boolean;
}
