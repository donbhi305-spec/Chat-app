import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Mapped memory or localStorage keys for user-configured Supabase connection
const STORAGE_URL_KEY = "vlx_supabase_url";
const STORAGE_KEY_KEY = "vlx_supabase_anon_key";

// Prioritize environment variables, then custom UI-configured local storage fallbacks
export function getSupabaseCredentials() {
  const envUrl = (import.meta as any).env.VITE_SUPABASE_URL || "";
  const envKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || "";
  
  const localUrl = localStorage.getItem(STORAGE_URL_KEY) || "";
  const localKey = localStorage.getItem(STORAGE_KEY_KEY) || "";
  
  return {
    url: localUrl || envUrl || "",
    key: localKey || envKey || "",
    isCustom: !!(localUrl && localKey),
    isEnv: !!(envUrl && envKey)
  };
}

export function saveSupabaseCredentials(url: string, key: string) {
  if (url.trim() && key.trim()) {
    localStorage.setItem(STORAGE_URL_KEY, url.trim());
    localStorage.setItem(STORAGE_KEY_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_KEY_KEY);
  }
  // Re-initialize client
  _supabaseClient = null;
}

export function clearSupabaseCredentials() {
  localStorage.removeItem(STORAGE_URL_KEY);
  localStorage.removeItem(STORAGE_KEY_KEY);
  _supabaseClient = null;
}

let _supabaseClient: SupabaseClient | null = null;

// Lazy client generation to ensure it never crashes if variables are initially undefined
export function getSupabaseClient(): SupabaseClient | null {
  if (_supabaseClient) return _supabaseClient;
  
  const { url, key } = getSupabaseCredentials();
  
  if (!url || !key) {
    return null;
  }
  
  try {
    _supabaseClient = createClient(url, key, {
      auth: {
        persistSession: false // Let Firebase handle Authentication
      }
    });
    return _supabaseClient;
  } catch (err) {
    console.error("Failed to initialize Supabase client:", err);
    return null;
  }
}

// SQL Generator to make it instantly ready for user Copy-Pasting in Supabase console
export function generateSupabaseSQL(): string {
  return `-- ==========================================================
-- SUPABASE PRODUCTION DATABASE SCHEMA FOR CHAT VELTRIXA
-- (The full 24-table production schema is located in '/supabase_schema.sql' in your project root!)
-- ==========================================================

-- Key Active Tables for Realtime Syncing & Security Verification:

-- 1. profiles
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  followers_count INT DEFAULT 0,
  following_count INT DEFAULT 0,
  post_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access to profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow individual write access to own profile" ON public.profiles FOR ALL USING (auth.uid() = id);

-- 2. user_settings
CREATE TABLE IF NOT EXISTS public.user_settings (
  id UUID PRIMARY KEY,
  theme TEXT DEFAULT 'dark',
  notifications_enabled BOOLEAN DEFAULT true,
  offline_mode BOOLEAN DEFAULT false,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow individual access to settings" ON public.user_settings FOR ALL USING (auth.uid() = id);

-- 3. conversations & messages
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  is_group BOOLEAN DEFAULT false,
  group_name TEXT,
  last_message_text TEXT,
  last_message_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID NOT NULL,
  text TEXT NOT NULL,
  image_url TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. posts & communities
CREATE TABLE IF NOT EXISTS public.communities (
  id TEXT PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  avatar_url TEXT,
  members_count INT DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
`;
}
