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
  return `-- 1. CHATS Table Schema
CREATE TABLE IF NOT EXISTS public.veltrixa_chats (
  id TEXT PRIMARY KEY,
  chat_id TEXT NOT NULL,
  sender TEXT NOT NULL,
  text TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Policies
ALTER TABLE public.veltrixa_chats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-write access for demo" ON public.veltrixa_chats FOR ALL USING (true) WITH CHECK (true);

-- 2. CALLS Table Schema
CREATE TABLE IF NOT EXISTS public.veltrixa_calls (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  time TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Policies
ALTER TABLE public.veltrixa_calls ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-write access for demo" ON public.veltrixa_calls FOR ALL USING (true) WITH CHECK (true);

-- 3. FILES Table Schema
CREATE TABLE IF NOT EXISTS public.veltrixa_files (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  size TEXT NOT NULL,
  format TEXT NOT NULL,
  date TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Policies
ALTER TABLE public.veltrixa_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-write access for demo" ON public.veltrixa_files FOR ALL USING (true) WITH CHECK (true);

-- 4. ACTIVITY_LOGS Table Schema
CREATE TABLE IF NOT EXISTS public.veltrixa_activities (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  time TEXT NOT NULL,
  unread BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS & Policies
ALTER TABLE public.veltrixa_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read-write access for demo" ON public.veltrixa_activities FOR ALL USING (true) WITH CHECK (true);
`;
}
