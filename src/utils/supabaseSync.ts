import { getSupabaseClient } from "./supabase";
import { VDB } from "./db";
import { ChatMessage, CallLog, SavedFile, ActivityLog } from "../types";

export const SupabaseSync = {
  getIsConnected: (): boolean => {
    return getSupabaseClient() !== null;
  },

  // Dynamic status check (pings the database to check if table is accessible)
  testConnection: async (): Promise<{ success: boolean; message: string }> => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return { success: false, message: "Credentials not specified. Please verify the URL and anon key." };
    }
    try {
      // Try to read a dummy query or count chats table
      const { error } = await supabase.from("veltrixa_chats").select("id").limit(1);
      if (error) {
        if (error.code === "PGRST116" || error.code === "42P01") {
          return { 
            success: true, 
            message: "Connected to Supabase successfully! Note: Table 'veltrixa_chats' does not exist yet. Click 'Run Setup Script' in Supabase to create the schema." 
          };
        }
        return { success: false, message: `Connected to API, but table query returned error: ${error.message}` };
      }
      return { success: true, message: "Connection verified! Tables ready. Real-time syncing is active." };
    } catch (err: any) {
      return { success: false, message: `Network error: ${err.message || err}` };
    }
  },

  // --- CHATS SYNC ---
  pullChats: async (chatId: string): Promise<ChatMessage[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return VDB.getChatHistory(chatId);

    try {
      const { data, error } = await supabase
        .from("veltrixa_chats")
        .select("*")
        .eq("chat_id", chatId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const formatted: ChatMessage[] = data.map((row: any) => ({
          id: row.id,
          sender: row.sender,
          text: row.text,
          time: row.time
        }));
        VDB.saveChatHistory(chatId, formatted);
        return formatted;
      }
    } catch (err) {
      console.warn(`Supabase pullChats error: fall-back to offline VDB.`, err);
    }
    return VDB.getChatHistory(chatId);
  },

  pushChat: async (chatId: string, msg: ChatMessage): Promise<void> => {
    // Save to local storage first
    const local = VDB.getChatHistory(chatId);
    VDB.saveChatHistory(chatId, [...local, msg]);

    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.from("veltrixa_chats").insert({
        id: msg.id,
        chat_id: chatId,
        sender: msg.sender,
        text: msg.text,
        time: msg.time
      });
      if (error) throw error;
    } catch (err) {
      console.error("Supabase pushChat error:", err);
    }
  },

  clearChats: async (chatId: string): Promise<void> => {
    VDB.clearChatHistory(chatId);
    
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.from("veltrixa_chats").delete().eq("chat_id", chatId);
      if (error) throw error;
    } catch (err) {
      console.error("Supabase clearChats error:", err);
    }
  },

  // --- CALLS SYNC ---
  pullCalls: async (): Promise<CallLog[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return VDB.getCalls();

    try {
      const { data, error } = await supabase
        .from("veltrixa_calls")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted: CallLog[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          type: row.type as "incoming" | "outgoing" | "missed",
          time: row.time
        }));
        // Update local database seed with pulled entries
        localStorage.setItem("vlx_db_calls", JSON.stringify(formatted));
        return formatted;
      }
    } catch (err) {
      console.warn("Supabase pullCalls error: falling back to offline", err);
    }
    return VDB.getCalls();
  },

  pushCall: async (call: CallLog): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.from("veltrixa_calls").insert({
        id: call.id,
        name: call.name,
        type: call.type,
        time: call.time
      });
      if (error) throw error;
    } catch (err) {
      console.error("Supabase pushCall error:", err);
    }
  },

  deleteCall: async (id: string): Promise<void> => {
    VDB.deleteCall(id);
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      await supabase.from("veltrixa_calls").delete().eq("id", id);
    } catch (err) {
      console.error("Supabase deleteCall error:", err);
    }
  },

  clearCalls: async (): Promise<void> => {
    VDB.clearCalls();
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      await supabase.from("veltrixa_calls").delete().neq("id", "none");
    } catch (err) {
      console.error("Supabase clearCalls error:", err);
    }
  },

  // --- FILES SYNC ---
  pullFiles: async (): Promise<SavedFile[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return VDB.getFiles();

    try {
      const { data, error } = await supabase
        .from("veltrixa_files")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted: SavedFile[] = data.map((row: any) => ({
          id: row.id,
          name: row.name,
          size: row.size,
          format: row.format,
          date: row.date,
          category: row.category as "documents" | "videos" | "photos" | "links"
        }));
        localStorage.setItem("vlx_db_files", JSON.stringify(formatted));
        return formatted;
      }
    } catch (err) {
      console.warn("Supabase pullFiles error: falling back to offline", err);
    }
    return VDB.getFiles();
  },

  pushFile: async (file: SavedFile): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.from("veltrixa_files").insert({
        id: file.id,
        name: file.name,
        size: file.size,
        format: file.format,
        date: file.date,
        category: file.category
      });
      if (error) throw error;
    } catch (err) {
      console.error("Supabase pushFile error:", err);
    }
  },

  deleteFile: async (id: string): Promise<void> => {
    VDB.deleteFile(id);
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      await supabase.from("veltrixa_files").delete().eq("id", id);
    } catch (err) {
      console.error("Supabase deleteFile error:", err);
    }
  },

  // --- ACTIVITIES SYNC ---
  pullActivities: async (): Promise<ActivityLog[]> => {
    const supabase = getSupabaseClient();
    if (!supabase) return VDB.getActivities();

    try {
      const { data, error } = await supabase
        .from("veltrixa_activities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        const formatted: ActivityLog[] = data.map((row: any) => ({
          id: row.id,
          type: row.type as "replies" | "mentions" | "reactions",
          title: row.title,
          body: row.body,
          time: row.time,
          unread: row.unread
        }));
        VDB.setActivities(formatted);
        return formatted;
      }
    } catch (err) {
      console.warn("Supabase pullActivities error: falling back to offline", err);
    }
    return VDB.getActivities();
  },

  pushActivity: async (activity: ActivityLog): Promise<void> => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      const { error } = await supabase.from("veltrixa_activities").insert({
        id: activity.id,
        type: activity.type,
        title: activity.title,
        body: activity.body,
        time: activity.time,
        unread: activity.unread
      });
      if (error) throw error;
    } catch (err) {
      console.error("Supabase pushActivity error:", err);
    }
  },

  markActivityRead: async (id: string): Promise<void> => {
    VDB.markActivityRead(id);
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      await supabase.from("veltrixa_activities").update({ unread: false }).eq("id", id);
    } catch (err) {
      console.error("Supabase markActivityRead error:", err);
    }
  },

  deleteActivity: async (id: string): Promise<void> => {
    VDB.deleteActivity(id);
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      await supabase.from("veltrixa_activities").delete().eq("id", id);
    } catch (err) {
      console.error("Supabase deleteActivity error:", err);
    }
  },

  clearAllActivities: async (): Promise<void> => {
    VDB.clearAllActivities();
    const supabase = getSupabaseClient();
    if (!supabase) return;

    try {
      await supabase.from("veltrixa_activities").delete().neq("id", "none");
    } catch (err) {
      console.error("Supabase clearAllActivities error:", err);
    }
  }
};
